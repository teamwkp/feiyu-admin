import request from '@/utils/request'

// 查询租车佣金策略列表
export function listCarCommission(query) {
  return request({
    url: '/commission/carCommission/list',
    method: 'get',
    params: query
  })
}

// 查询租车佣金策略详细
export function getCarCommission(id) {
  return request({
    url: '/commission/carCommission/' + id,
    method: 'get'
  })
}

// 新增租车佣金策略
export function addCarCommission(data) {
  return request({
    url: '/commission/carCommission',
    method: 'post',
    data: data
  })
}

// 修改租车佣金策略
export function updateCarCommission(data) {
  return request({
    url: '/commission/carCommission',
    method: 'put',
    data: data
  })
}

// 删除租车佣金策略
export function delCarCommission(id) {
  return request({
    url: '/commission/carCommission/' + id,
    method: 'delete'
  })
}

// 导出租车佣金策略
export function exportCarCommission(query) {
  return request({
    url: '/commission/carCommission/export',
    method: 'get',
    params: query
  })
}