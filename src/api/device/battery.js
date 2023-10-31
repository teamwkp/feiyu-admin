/*
 * @Author       : liqiao
 * @Date         : 2023-10-31 13:57:32
 * @LastEditors  : liqiao
 * @LastEditTime : 2023-10-31 14:07:54
 * @Description  : Do not edit
 * @FilePath     : /feiyu-admin/src/api/device/battery.js
 */
import request from "@/utils/request";

// 查询电池列表
export function listBattery(query) {
  return request({
    url: "/device/battery/list",
    method: "get",
    params: query,
  });
}

// 查询电池详细
export function getBattery(id) {
  return request({
    url: "/device/battery/" + id,
    method: "get",
  });
}

// 新增电池
export function addBattery(data) {
  return request({
    url: "/device/battery",
    method: "post",
    data: data,
  });
}

// 修改电池
export function updateBattery(data) {
  return request({
    url: "/device/battery",
    method: "put",
    data: data,
  });
}

// 删除电池
export function delBattery(id) {
  return request({
    url: "/device/battery/" + id,
    method: "delete",
  });
}

// 导出电池
export function exportBattery(query) {
  return request({
    url: "/device/battery/export",
    method: "get",
    params: query,
  });
}
// 下载电池导入模板
export function importTemplate() {
  return request({
    url: "/device/battery/importTemplate",
    method: "get",
  });
}

// bms信息
export function getBmsInfo(batterySn) {
  return request({
    url: `/device/battery/bmsInfo?batterySn=${batterySn}`,
    method: "get",
  });
}

// 查看地图轨迹
export function mapInfo(query) {
  return request({
    url: "/device/battery/mapInfo",
    method: "get",
    params: query,
  })
}
