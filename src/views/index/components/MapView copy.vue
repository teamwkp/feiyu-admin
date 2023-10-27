<!--
 * @Author       : liqiao
 * @Date         : 2023-10-27 15:54:10
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-10-27 15:54:10
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/index/components/MapView copy.vue
-->
<!--
 * @Author       : liqiao
 * @Date         : 2023-10-26 20:58:18
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-10-26 22:34:00
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/views/index/components/MapView.vue
-->

<template>
  <div id="map_container"></div>
</template>

<script>
// import resize from "./mixins/resize";

export default {
  // mixins: [resize],
  props: {
    // className: {
    //   type: String,
    //   default: "chart",
    // },
  },
  data() {
    return {
      LatStart: 39.984039,
      LngStart: 116.30763,
      LatEnd: 39.977263,
      LngEnd: 116.337063,
    };
  },
  mounted() {
    this.TencentMap();
  },

  methods: {
    TencentMap() {
      var center = new TMap.LatLng(39.980619, 116.321277); //自己的定位纬度 经度
      window.map = new TMap.Map("map_container", {
        center: center, // 地图的中心地理坐标。
        zoom: 15, // 地地图缩放
        disableDefaultUI: true,
      });
      //WebServiceAPI请求URL（驾车路线规划默认会参考实时路况进行计算）
      var url = `https://apis.map.qq.com/ws/direction/v1/driving/?from=${this.LatStart},${this.LngStart}&to=${this.LatEnd},${this.LngEnd}&output=jsonp&callback=mapCallbackFun&key=4VUBZ-BVIC4-UKNUR-DRNVR-XCTF2-3RFYW`;
      //发起JSONP请求，获取路线规划结果
      this.jsonp_request(url);
      var marker = new TMap.MultiMarker({
        id: "marker-layer",
        map: map,
        styles: {
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
        geometries: [
          {
            id: "start",
            styleId: "start",
            position: new TMap.LatLng(this.LatStart, this.LngStart),
          },
          {
            id: "end",
            styleId: "end",
            position: new TMap.LatLng(this.LatEnd, this.LngEnd),
          },
        ],
      });
    },

    jsonp_request(url) {
      var script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
    },
  },

  beforeDestroy() {},
};
</script>
