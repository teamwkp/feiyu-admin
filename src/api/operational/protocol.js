import request from '@/utils/request'

// 查询协议内容列表
export function listProtocol(query) {
  return request({
    url: '/operational/protocol/list',
    method: 'get',
    params: query
  })
}

// 查询协议内容详细
export function getProtocol(id) {
  return request({
    url: '/operational/protocol/' + id,
    method: 'get'
  })
}

// 新增协议内容
export function addProtocol(data) {
  return request({
    url: '/operational/protocol',
    method: 'post',
    data: data
  })
}

// 修改协议内容
export function updateProtocol(data) {
  return request({
    url: '/operational/protocol',
    method: 'put',
    data: data
  })
}

// 删除协议内容
export function delProtocol(id) {
  return request({
    url: '/operational/protocol/' + id,
    method: 'delete'
  })
}

// 导出协议内容
export function exportProtocol(query) {
  return request({
    url: '/operational/protocol/export',
    method: 'get',
    params: query
  })
}