/*
 * @Author       : liqiao
 * @Date         : 2023-10-26 22:30:48
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-10-27 16:26:54
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/utils/mapFun.js
 */
window.display_polyline = function (pl) {
  //创建 MultiPolyline显示折线
  var polylineLayer = new TMap.MultiPolyline({
      id: 'polyline-layer', //图层唯一标识
      map: map, //绘制到目标地图
      //折线样式定义
      styles: {
          style_blue: new TMap.PolylineStyle({
              color: '#3777FF', //线填充色
              width: 6, //折线宽度
              borderWidth: 5, //边线宽度
              borderColor: '#FFF', //边线颜色
              lineCap: 'round', //线端头方式
          }),
      },
      //折线数据定义
      // geometries: [
      //     {
      //         id: 'pl_1', //折线唯一标识，删除时使用
      //         styleId: 'style_blue', //绑定样式名
      //         paths: pl,
      //     },
      // ],
      geometries: [
        {
          id: 'erasePath',
          styleId: 'style_blue',
          paths: [
            new TMap.LatLng(39.98481500648338, 116.30571126937866),
            new TMap.LatLng(39.982266575222155, 116.30596876144409),
            new TMap.LatLng(39.982348784165886, 116.3111400604248),
            new TMap.LatLng(39.978813710266024, 116.3111400604248),
            new TMap.LatLng(39.978813710266024, 116.31699800491333),
          ],
        },
      ],
  });
};

window.mapCallbackFun = function (ret) {
  //从结果中取出路线坐标串
  var coors = ret.result.routes[0].polyline,
      pl = [];
  //坐标解压（返回的点串坐标，通过前向差分进行压缩，因此需要解压）
  var kr = 1000000;
  for (var i = 2; i < coors.length; i++) {
      coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
  }
  //将解压后的坐标生成LatLng数组
  for (var i = 0; i < coors.length; i += 2) {
      pl.push(new TMap.LatLng(coors[i], coors[i + 1]));
  }
  window.display_polyline(pl); //显示路线
};
