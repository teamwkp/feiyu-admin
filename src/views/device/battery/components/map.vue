<!-- <template>
  <div>map</div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style> -->

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
      // LatStart: 39.984039,
      // LngStart: 116.30763,
      // LatEnd: 39.977263,
      // LngEnd: 116.337063,
      mapObj: null,
      LatStart: 39.98481500648338,
      LngStart: 116.30571126937866,
      LatEnd: 39.978813710266024,
      LngEnd: 116.31699800491333,
      mapPath: [
        new TMap.LatLng(39.98481500648338, 116.30571126937866),
        new TMap.LatLng(39.982266575222155, 116.30596876144409),
        new TMap.LatLng(39.982348784165886, 116.3111400604248),
        new TMap.LatLng(39.978813710266024, 116.3111400604248),
        new TMap.LatLng(39.978813710266024, 116.31699800491333),
      ],
    };
  },
  mounted() {
    this.TencentMap();
  },

  methods: {
    TencentMap() {
      var center = new TMap.LatLng(this.LatStart, this.LngStart); //自己的定位纬度 经度
      window.map = new TMap.Map("map_container", {
        center: center, // 地图的中心地理坐标。
        zoom: 15, // 地地图缩放
        disableDefaultUI: true,
      });

      var path = this.mapPath;

      var polylineLayer = new TMap.MultiPolyline({
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
            // paths: this.mapPath,
            paths: path,
          },
        ],
      });

      var marker = new TMap.MultiMarker({
        // id: "marker-layer",
        map: map,
        styles: {
          "car-down": new TMap.MarkerStyle({
            width: 40,
            height: 40,
            anchor: {
              x: 20,
              y: 20,
            },
            faceTo: "map",
            rotate: 180,
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/car.png",
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
        geometries: [
          {
            id: "car",
            styleId: "car-down",
            position: new TMap.LatLng(this.LatStart, this.LngStart),
          },
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
      // 使用marker 移动接口， https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker
      marker.moveAlong(
        {
          car: {
            path,
            speed: 250,
          },
        },
        {
          autoRotation: true,
        }
      );
      marker.on("moving", (e) => {
        var passedLatLngs = e.car && e.car.passedLatLngs;
        if (passedLatLngs) {
          // 使用路线擦除接口 eraseTo, https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector
          polylineLayer.eraseTo(
            "erasePath",
            passedLatLngs.length - 1,
            passedLatLngs[passedLatLngs.length - 1]
          );
        }
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
