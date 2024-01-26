import request from "@/utils/request";

// 查询换电柜列表
export function listCabinet(query) {
  return request({
    url: "/device/cabinet/list",
    method: "get",
    params: query,
  });
}

// 查询换电柜详细
export function getCabinet(id) {
  return request({
    url: "/device/cabinet/" + id,
    method: "get",
  });
}

// 获取机柜实时信息
export function getCabinetInfo(devId) {
  return request({
    url: "/device/cabinet/getCabinetRedisInfo?devId=" + devId,
    method: "get",
  });
}

// 开仓
export function openDoorFn(data) {
  return request({
    url: `/device/cabinet/openDoor?devId=${data.devId}&&boxSn=${data.boxSn}`,
    method: "post",
  });
}
// 禁用
export function fbidDoorFn(data) {
  return request({
    url: `/device/cabinet/updateDoor?devId=${data.devId}&&boxSn=${data.boxSn}&&status=${data.status}`,
    method: "post",
  });
}

// 新增换电柜
export function addCabinet(data) {
  return request({
    url: "/device/cabinet",
    method: "post",
    data: data,
  });
}

// 修改换电柜
export function updateCabinet(data) {
  return request({
    url: "/device/cabinet",
    method: "put",
    data: data,
  });
}

// 删除换电柜
export function delCabinet(id) {
  return request({
    url: "/device/cabinet/" + id,
    method: "delete",
  });
}

// 导出换电柜
export function exportCabinet(query) {
  return request({
    url: "/device/cabinet/export",
    method: "get",
    params: query,
  });
}
