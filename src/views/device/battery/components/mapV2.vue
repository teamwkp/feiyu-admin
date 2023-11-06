<!--
 * @Author       : liqiao
 * @Date         : 2023-11-06 12:07:16
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-11-06 12:07:17
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/device/battery/components/map copy.vue
-->
<template>
  <div class="map-content">
    <div class="search__content">
      <span class="demonstration">选择时间查询轨迹：</span>
      <el-date-picker
        v-model="dateValue"
        type="date"
        placeholder="选择日期"
        @change="changeDate"
      >
      </el-date-picker>
      <el-button type="primary" @click="queryOperate">查询</el-button>
    </div>
    <div class="map_location">具体位置：{{ detailLocation }}</div>

    <div id="map_container"></div>
  </div>
</template>

<script>
import resize from "@/views/dashboard/mixins/resize.js";
import { mapInfo } from "@/api/device/battery";
import electroMobileImg from "@/assets/images/electromobile3.png";
import axios from "axios";

export default {
  mixins: [resize],
  props: {},
  data() {
    props: ["changeActive"];
    return {
      dateValue: null,
      latCenter: "",
      lngCenter: "",
      latStart: "",
      lngStart: "",
      latEnd: "",
      lngEnd: "",
      mapPath: [new qq.maps.LatLng(39.98481500648338, 116.30571126937866)],
      batterySn: this.$route.params && this.$route.params.devId,
      marker: null,
      mapObj: null,
      polylineLayer: null,
      mapInfoData: null,
      detailLocation: "",
    };
  },
  watch: {
    // dateValue: {
    //   handler(val) {
    //     this.mapInfoOperate(true);
    //   },
    // },
  },
  mounted() {
    this.mapInfoOperate();

    // TODO:
    this.$nextTick(() => {
      // window.document
      //   .getElementById("query_btn")
      //   .addEventListener("click", () => {
      //     console.log(
      //       "🚀 ~ file: map.vue:311 ~ map.event.addListener ~ infoWindow:"
      //     );
      //   });
    });
  },

  methods: {
    async mapInfoOperate(isReset) {
      const time = this.dateValue ? this.dateValue.getTime() : undefined;
      const res = await mapInfo({ batterySn: this.batterySn, time });

      if (Number(res.code) === 200) {
        const data = res.data;
        if (isReset) {
          if (Array.isArray(data)) {
            const center = data[data.length - 1];
            this.latCenter = center.latitude;
            this.lngCenter = center.longitude;

            this.mapPath = data
              .reverse()
              .map((item) => new qq.maps.LatLng(item.latitude, item.longitude));
            this.resetMap(false);
          } else {
            this.latCenter = data.latitude || "";
            this.lngCenter = data.longitude || "";
            this.mapPath = [new qq.maps.LatLng(data.latitude, data.longitude)];
            this.mapInfoData = data;
            this.resetMap(true);
          }
        } else {
          this.latCenter = data.latitude || "";
          this.lngCenter = data.longitude || "";
          this.mapPath = [new qq.maps.LatLng(data.latitude, data.longitude)];
          this.mapInfoData = data;
          // this.mapPath = [];
          this.tencentMap();
        }
      }
    },

    getLocalOperate() {
      axios({
        method: "get",
        url: "https://apis.map.qq.com/ws/geocoder/v1",
        params: {
          // TODO:
          key: "4VUBZ-BVIC4-UKNUR-DRNVR-XCTF2-3RFYW",
          location: "39.984154,116.307490",
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    tencentMap() {
      const center = new qq.maps.LatLng(
        this.latCenter || this.latStart,
        this.lngCenter || this.lngStart
      ); //自己的定位纬度 经度
      this.mapObj = new qq.maps.Map("map_container", {
        center: center, // 地图的中心地理坐标。
        zoom: 15, // 地地图缩放
        disableDefaultUI: true,
      });
      const mapInfoData = this.mapInfoData;

      const path = this.mapPath;
      const map = this.mapObj;
      const that = this;
      this.polylineLayer = new qq.maps.MultiPolyline({
        map, // 绘制到目标地图
        // 折线样式定义
        styles: {
          style_blue: new qq.maps.PolylineStyle({
            color: "#3777FF", // 线填充色
            width: 4, // 折线宽度
            borderWidth: 2, // 边线宽度
            borderColor: "#FFF", // 边线颜色
            lineCap: "round", // 线端头方式
            eraseColor: "rgba(190,188,188,1)",
          }),
        },
        geometries: [
          {
            id: "erasePath",
            styleId: "style_blue",
            paths: path,
          },
        ],
      });

      let currGeometries = [
        {
          id: "car",
          styleId: "car-down",
          position: this.mapPath[0],
        },
      ];

      if (this.mapPath.length > 1) {
        const otherParams = [
          {
            id: "start",
            styleId: "start",
            // position: new qq.maps.LatLng(this.latStart, this.lngStart),
            position: this.mapPath[0],
          },
          {
            id: "end",
            styleId: "end",
            // position: new qq.maps.LatLng(this.latEnd, this.lngEnd),
            position: this.mapPath[this.mapPath.length - 1],
          },
        ];
        currGeometries = [currGeometries, ...otherParams];
      }

      this.marker = new qq.maps.MultiMarker({
        map: map,
        styles: {
          "car-down": new qq.maps.MarkerStyle({
            // width: 52.5,
            // height: 30,
            width: 55,
            height: 55,
            anchor: {
              x: 20,
              y: 20,
            },
            faceTo: "map",
            src: electroMobileImg,
          }),
          start: new qq.maps.MarkerStyle({
            width: 25,
            height: 35,
            anchor: { x: 16, y: 32 },
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png",
          }),
          end: new qq.maps.MarkerStyle({
            width: 25,
            height: 35,
            anchor: { x: 16, y: 32 },
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png",
          }),
        },
        geometries: currGeometries,
      });

      //TODO：初始化infoWindow
      const infoWindow = new qq.maps.InfoWindow({
        map: map,
        position: that.mapPath[0],
        offset: { x: 0, y: -32 }, //设置信息窗相对position偏移像素
      });
      infoWindow.close(); //初始关闭信息窗关闭
      //监听标注点击事件
      this.marker.on("click", function (evt) {
        console.log("🚀 ~ file: map.vue:223 ~ evt:", evt);
        //设置infoWindow
        infoWindow.open(); //打开信息窗
        infoWindow.setPosition(evt.geometry.position); //设置信息窗位置
        // infoWindow.setContent(evt.geometry.position.toString()); //设置信息窗内容
        infoWindow.setContent(
          `<div style='width:360px;padding:0 20px;'><div style='width:100%;display:flex;font-weight:500;margin-bottom:6px;'>${
            mapInfoData.batterySn
          }</div><div style='width:100%;display:flex;margin-bottom:6px;'><span>设备号码：</span><span style='color:#666;'>${
            mapInfoData.batterySn
          }</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>设备状态：</span><span style='color:#666;'>${
            Number(mapInfoData.motionState) === 0
              ? "移动"
              : Number(mapInfoData.motionState) === 1
              ? "静止"
              : Number(mapInfoData.motionState) === 2
              ? "存储"
              : Number(mapInfoData.motionState) === 3
              ? "休眠"
              : ""
          }</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>SOC电量：</span><span style='color:#666;'>${
            mapInfoData.soc
          }%</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>电池电压：</span><span style='color:#666;'>${(
            Number(mapInfoData.voltage) / 100
          ).toFixed(
            4
          )}V</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>放电电流：</span><span style='color:#666;'>
            ${
              Number(mapInfoData.current) < 0
                ? (Number(mapInfoData.current) / 100).toFixed(4)
                : "--"
            }
            A</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>充电电流：</span><span style='color:#666;'>
              ${
                Number(mapInfoData.current) >= 0
                  ? (Number(mapInfoData.current) / 100).toFixed(4)
                  : "--"
              }A</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>通信时间：</span><span style='color:#666;'>${that.getTimeStrByDate(
            mapInfoData && mapInfoData.recodeTime,
            "date"
          )}
            </span></div></div>`
          // <div style='width:100%;display:flex;'><span style='display:inline-block;width:56px;height:26px;line-height:26px;text-align:center;color:#1990ff;border:1px solid #1990ff;border-radius: 4px;cursor:pointer;' id="query_btn">查询</span></div>
        ); //设置信息窗内容
      });

      this.getLocalOperate();
      // this.marker.moveAlong(
      //   {
      //     car: {
      //       path,
      //       speed: 250,
      //     },
      //   },
      //   {
      //     autoRotation: true,
      //   }
      // );
      // const that = this;
      // this.marker.on("moving", (e) => {
      //   var passedLatLngs = e.car && e.car.passedLatLngs;
      //   if (passedLatLngs) {
      //     // 使用路线擦除接口 eraseTo, https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector
      //     that.polylineLayer.eraseTo(
      //       "erasePath",
      //       passedLatLngs.length - 1,
      //       passedLatLngs[passedLatLngs.length - 1]
      //     );
      //   }
      // });
    },

    jsonp_request(url) {
      var script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
    },

    changeDate(e) {
      // console.log("🚀 ~ file: map.vue:173 ~ changeDate ~ e:", e, e.getTime());
    },
    queryOperate() {
      this.mapInfoOperate(true);
    },

    // 重置
    resetMap(noData) {
      const map = this.mapObj;
      const mapInfoData = this.mapInfoData;

      this.marker && this.marker.stopMove && this.marker.stopMove();
      // if (isMoving) return;
      const that = this;

      // const path = this.mapPath;
      this.polylineLayer &&
        this.polylineLayer.setGeometries &&
        this.polylineLayer.setGeometries([
          {
            id: "path1",
            styleId: "style_blue",
            paths: that.mapPath,
          },
          {
            id: "path2",
            styleId: "style_blue",
            paths: that.mapPath,
          },
        ]);

      if (noData) {
        this.marker &&
          this.marker.setGeometries &&
          this.marker.setGeometries([
            {
              id: "car",
              styleId: "car-down",
              position: that.mapPath[0],
            },
          ]);

        //TODO：初始化infoWindow
        const infoWindow = new qq.maps.InfoWindow({
          map: map,
          position: that.mapPath[0],
          offset: { x: 0, y: -32 }, //设置信息窗相对position偏移像素
        });
        infoWindow.close(); //初始关闭信息窗关闭
        //监听标注点击事件
        this.marker.on("click", function (evt) {
          //设置infoWindow
          infoWindow.open(); //打开信息窗
          infoWindow.setPosition(evt.geometry.position); //设置信息窗位置
          // infoWindow.setContent(evt.geometry.position.toString()); //设置信息窗内容
          infoWindow.setContent(
            `<div style='width:360px;padding:0 20px;'><div style='width:100%;display:flex;font-weight:500;margin-bottom:6px;'>${
              mapInfoData.batterySn
            }</div><div style='width:100%;display:flex;margin-bottom:6px;'><span>设备号码：</span><span style='color:#666;'>${
              mapInfoData.batterySn
            }</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>设备状态：</span><span style='color:#666;'>${
              Number(mapInfoData.motionState) === 0
                ? "移动"
                : Number(mapInfoData.motionState) === 1
                ? "静止"
                : Number(mapInfoData.motionState) === 2
                ? "存储"
                : Number(mapInfoData.motionState) === 3
                ? "休眠"
                : ""
            }</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>SOC电量：</span><span style='color:#666;'>${
              mapInfoData.soc
            }%</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>电池电压：</span><span style='color:#666;'>${(
              Number(mapInfoData.voltage) / 100
            ).toFixed(
              4
            )}V</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>放电电流：</span><span style='color:#666;'>
              ${
                Number(mapInfoData.current) < 0
                  ? (Number(mapInfoData.current) / 100).toFixed(4)
                  : "--"
              }A</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>充电电流：</span><span style='color:#666;'>
              ${
                Number(mapInfoData.current) >= 0
                  ? (Number(mapInfoData.current) / 100).toFixed(4)
                  : "--"
              }A</span></div><div style='width:100%;display:flex;margin-bottom:6px;'><span>通信时间：</span><span style='color:#666;'>${that.getTimeStrByDate(
              mapInfoData && mapInfoData.recodeTime,
              "date"
            )}
            </span></div></div>`
            // <div style='width:100%;display:flex;'><span style='display:inline-block;width:56px;height:26px;line-height:26px;text-align:center;color:#1990ff;border:1px solid #1990ff;border-radius: 4px;cursor:pointer;' id="mapInfoBtn">查询</span></div>
          ); //设置信息窗内容
          // TODO：
          // console.log(
          //   "🚀 ~ file: map.vue:405 ~ new qq.maps.event:",
          //   infoWindow.content_changed
          // );

          // infoWindow.content_changed(function () {
          //   console.log(
          //     "🚀 ~ file: map.vue:311 ~ map.event.addListener ~ infoWindow:"
          //   );
          //   window.document
          //     .getElementById("mapInfoBtn")
          //     .addEventListener("click", () => {
          //       console.log(
          //         "🚀 ~ file: map.vue:311 ~ map.event.addListener ~ infoWindow:"
          //       );
          //     });
          // });
        });

        qq.maps.event.addListener(map, "zoom_changed", function (e) {});
        console.log("🚀 ~ file: map.vue:421 ~ zoom_changed:");

        // // 信息窗口的内容变更事件
        // infoWindow.addListener("content_changed", function () {
        //   console.log(
        //     "🚀 ~ file: map.vue:311 ~ map.event.addListener ~ infoWindow:",
        //     infoWindow
        //   );
        // });

        // 这里需要加一个延时，给DOM元素的加载预留时间
        // 	setTimeout(function() {
        // 	// 这里判断一下id为btn的元素是否已经绑定过了点击事件，避免重复绑定导致点击一次触发两次点击事件
        // 	var objEvt = $._data($("#btn")[0], "events");
        // 	if (objEvt && objEvt.click) return;
        // 	// 为信息窗口中自定id为btn的元素绑定点击事件
        // 	$('#btn').on('click', function() {
        // 		alert('更多内容');
        // 	})
        //  }, 400)
        // });
      } else {
        this.marker.setGeometries([
          // ...currGeometries,
          // {
          //   id: "car",
          //   styleId: "car-down",
          //   position: that.mapPath[0],
          // },
          {
            id: "start",
            styleId: "start",
            position: that.mapPath[0],
          },
          {
            id: "end",
            styleId: "end",
            position: that.mapPath[that.mapPath.length - 1],
          },
        ]);
      }

      const center = new qq.maps.LatLng(
        this.latCenter || this.latStart,
        this.lngCenter || this.lngStart
      );
      this.mapObj.easeTo({
        center: center,
        zoom: 15,
        rotation: 0,
        pitch: 0,
      });

      // const path = this.mapPath;
      // this.marker.moveAlong(
      //   {
      //     car: {
      //       path,
      //       speed: 250,
      //     },
      //   },
      //   {
      //     autoRotation: true,
      //   }
      // );
      // this.marker.on("moving", (e) => {
      //   var passedLatLngs = e.car && e.car.passedLatLngs;
      //   if (passedLatLngs) {
      //     that.polylineLayer.eraseTo(
      //       "erasePath",
      //       passedLatLngs.length - 1,
      //       passedLatLngs[passedLatLngs.length - 1]
      //     );
      //   }
      // });
    },
    getTimeStrByDate(currDate, type, connector) {
      if (!currDate) {
        return "";
      }
      const connectorCurr = connector || "-";
      const date = new Date(currDate);
      const y = date.getFullYear();
      const M = date.getMonth() + 1;
      const d = date.getDate();
      const H = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      let currTime = "";
      if (type === "date") {
        currTime =
          y +
          connectorCurr +
          (M < 10 ? "0" + M : M) +
          connectorCurr +
          (d < 10 ? "0" + d : d) +
          " " +
          (H < 10 ? "0" + H : H) +
          ":" +
          (m < 10 ? "0" + m : m) +
          ":" +
          (s < 10 ? "0" + s : s);
      } else {
        currTime =
          " " +
          (H < 10 ? "0" + H : H) +
          ":" +
          (m < 10 ? "0" + m : m) +
          ":" +
          (s < 10 ? "0" + s : s);
      }
      return currTime;
      // return y + '-' + (M < 10 ? ('0' + M) : M) + '-' + (d < 10 ? ('0' + d) : d) + " " + (H < 10 ? ('0' + H) : H) + ":" + (m < 10 ? ('0' + m) : m) + ":" + (s < 10 ? ('0' + s) : s);
    },
  },

  beforeDestroy() {},
};
</script>

<style lang="scss" scope>
.map-content {
  box-sizing: border-box;
  width: 100%;
  /* height: calc(100vh - 330px); */
  padding-bottom: 30px;

  .search__content {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 20px 0 10px 20px;
    button {
      margin-left: 20px;
    }
  }
  .map_location {
    margin-bottom: 10px;

    color: #1990ff;
  }
  .map_container {
    width: 100%;
    /* height: calc(100vh - 330px); */
  }
}
</style>
