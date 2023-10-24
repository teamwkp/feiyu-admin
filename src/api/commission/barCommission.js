import request from '@/utils/request'

// 查询电池佣金策略列表
export function listBarCommission(query) {
  return request({
    url: '/commission/barCommission/list',
    method: 'get',
    params: query
  })
}

// 查询电池佣金策略详细
export function getBarCommission(id) {
  return request({
    url: '/commission/barCommission/' + id,
    method: 'get'
  })
}

// 新增电池佣金策略
export function addBarCommission(data) {
  return request({
    url: '/commission/barCommission',
    method: 'post',
    data: data
  })
}

// 修改电池佣金策略
export function updateBarCommission(data) {
  return request({
    url: '/commission/barCommission',
    method: 'put',
    data: data
  })
}

// 删除电池佣金策略
export function delBarCommission(id) {
  return request({
    url: '/commission/barCommission/' + id,
    method: 'delete'
  })
}

// 导出电池佣金策略
export function exportBarCommission(query) {
  return request({
    url: '/commission/barCommission/export',
    method: 'get',
    params: query
  })
}