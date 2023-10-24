import request from '@/utils/request'

// 查询租金和电费列表
export function listExpenses(query) {
  return request({
    url: '/commission/expenses/list',
    method: 'get',
    params: query
  })
}

// 查询租金和电费详细
export function getExpenses(id) {
  return request({
    url: '/commission/expenses/' + id,
    method: 'get'
  })
}

// 新增租金和电费
export function addExpenses(data) {
  return request({
    url: '/commission/expenses',
    method: 'post',
    data: data
  })
}

// 修改租金和电费
export function updateExpenses(data) {
  return request({
    url: '/commission/expenses',
    method: 'put',
    data: data
  })
}

// 删除租金和电费
export function delExpenses(id) {
  return request({
    url: '/commission/expenses/' + id,
    method: 'delete'
  })
}

// 导出租金和电费
export function exportExpenses(query) {
  return request({
    url: '/commission/expenses/export',
    method: 'get',
    params: query
  })
}