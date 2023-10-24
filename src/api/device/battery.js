import request from '@/utils/request'

// 查询电池列表
export function listBattery(query) {
  return request({
    url: '/device/battery/list',
    method: 'get',
    params: query
  })
}

// 查询电池详细
export function getBattery(id) {
  return request({
    url: '/device/battery/' + id,
    method: 'get'
  })
}

// 新增电池
export function addBattery(data) {
  return request({
    url: '/device/battery',
    method: 'post',
    data: data
  })
}

// 修改电池
export function updateBattery(data) {
  return request({
    url: '/device/battery',
    method: 'put',
    data: data
  })
}

// 删除电池
export function delBattery(id) {
  return request({
    url: '/device/battery/' + id,
    method: 'delete'
  })
}

// 导出电池
export function exportBattery(query) {
  return request({
    url: '/device/battery/export',
    method: 'get',
    params: query
  })
}