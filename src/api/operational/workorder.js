import request from '@/utils/request'

// 查询运维工单列表
export function listWorkorder(query) {
  return request({
    url: '/operational/workorder/list',
    method: 'get',
    params: query
  })
}

// 查询运维工单详细
export function getWorkorder(id) {
  return request({
    url: '/operational/workorder/' + id,
    method: 'get'
  })
}

// 新增运维工单
export function addWorkorder(data) {
  return request({
    url: '/operational/workorder',
    method: 'post',
    data: data
  })
}

// 修改运维工单
export function updateWorkorder(data) {
  return request({
    url: '/operational/workorder',
    method: 'put',
    data: data
  })
}

// 删除运维工单
export function delWorkorder(id) {
  return request({
    url: '/operational/workorder/' + id,
    method: 'delete'
  })
}

// 导出运维工单
export function exportWorkorder(query) {
  return request({
    url: '/operational/workorder/export',
    method: 'get',
    params: query
  })
}