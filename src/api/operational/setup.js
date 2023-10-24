import request from '@/utils/request'

// 查询运营配置列表
export function listSetup(query) {
  return request({
    url: '/operational/setup/list',
    method: 'get',
    params: query
  })
}

// 查询运营配置详细
export function getSetup(id) {
  return request({
    url: '/operational/setup/' + id,
    method: 'get'
  })
}

// 新增运营配置
export function addSetup(data) {
  return request({
    url: '/operational/setup',
    method: 'post',
    data: data
  })
}

// 修改运营配置
export function updateSetup(data) {
  return request({
    url: '/operational/setup',
    method: 'put',
    data: data
  })
}

// 删除运营配置
export function delSetup(id) {
  return request({
    url: '/operational/setup/' + id,
    method: 'delete'
  })
}

// 导出运营配置
export function exportSetup(query) {
  return request({
    url: '/operational/setup/export',
    method: 'get',
    params: query
  })
}