import request from "@/utils/request";

// 查询设备日志记录
export const ajaxDeviceLogList = (params) =>
  request.get("/device/deviceLog/list", {params});
