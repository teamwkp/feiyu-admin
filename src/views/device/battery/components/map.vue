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
    <div id="map_container"></div>
  </div>
</template>

<script>
import resize from "@/views/dashboard/mixins/resize.js";
import { mapInfo } from "@/api/device/battery";
import electroMobileImg from "@/assets/images/electromobile3.png";
export default {
  mixins: [resize],
  props: {},
  data() {
    return {
      dateValue: null,
      latCenter: "",
      lngCenter: "",
      latStart: "",
      lngStart: "",
      latEnd: "",
      lngEnd: "",
      mapPath: [new TMap.LatLng(39.98481500648338, 116.30571126937866)],
      batterySn: this.$route.params && this.$route.params.devId,
      marker: null,
      mapObj: null,
      polylineLayer: null,
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
              .map((item) => new TMap.LatLng(item.latitude, item.longitude));
            this.resetMap(false);
          } else {
            this.latCenter = data.latitude || "";
            this.lngCenter = data.longitude || "";
            this.mapPath = [new TMap.LatLng(data.latitude, data.longitude)];
            this.resetMap(true);
          }
        } else {
          this.latCenter = data.latitude || "";
          this.lngCenter = data.longitude || "";
          this.mapPath = [new TMap.LatLng(data.latitude, data.longitude)];

          // this.mapPath = [];
          this.tencentMap();
        }
      }
    },

    tencentMap() {
      const center = new TMap.LatLng(
        this.latCenter || this.latStart,
        this.lngCenter || this.lngStart
      ); //自己的定位纬度 经度
      this.mapObj = new TMap.Map("map_container", {
        center: center, // 地图的中心地理坐标。
        zoom: 15, // 地地图缩放
        disableDefaultUI: true,
      });

      const path = this.mapPath;
      const map = this.mapObj;
      const that = this;
      this.polylineLayer = new TMap.MultiPolyline({
        map, // 绘制到目标地图
        // 折线样式定义
        styles: {
          style_blue: new TMap.PolylineStyle({
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
            // position: new TMap.LatLng(this.latStart, this.lngStart),
            position: this.mapPath[0],
          },
          {
            id: "end",
            styleId: "end",
            // position: new TMap.LatLng(this.latEnd, this.lngEnd),
            position: this.mapPath[this.mapPath.length - 1],
          },
        ];
        currGeometries = [currGeometries, ...otherParams];
      }

      this.marker = new TMap.MultiMarker({
        map: map,
        styles: {
          "car-down": new TMap.MarkerStyle({
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
          start: new TMap.MarkerStyle({
            width: 25,
            height: 35,
            anchor: { x: 16, y: 32 },
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png",
          }),
          end: new TMap.MarkerStyle({
            width: 25,
            height: 35,
            anchor: { x: 16, y: 32 },
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png",
          }),
        },
        geometries: currGeometries,
      });

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

      const center = new TMap.LatLng(
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
  .map_container {
    width: 100%;
    /* height: calc(100vh - 330px); */
  }
}
</style>
