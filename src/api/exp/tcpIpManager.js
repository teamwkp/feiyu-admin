import request from '@/utils/request'

// 查询tcp服务器管理列表
export function listTcpIpManager(query) {
  return request({
    url: '/exp/tcpIpManager/list',
    method: 'get',
    params: query
  })
}

// 查询tcp服务器管理详细
export function getTcpIpManager(id) {
  return request({
    url: '/exp/tcpIpManager/' + id,
    method: 'get'
  })
}

// 新增tcp服务器管理
export function addTcpIpManager(data) {
  return request({
    url: '/exp/tcpIpManager',
    method: 'post',
    data: data
  })
}

// 修改tcp服务器管理
export function updateTcpIpManager(data) {
  return request({
    url: '/exp/tcpIpManager',
    method: 'put',
    data: data
  })
}

// 删除tcp服务器管理
export function delTcpIpManager(id) {
  return request({
    url: '/exp/tcpIpManager/' + id,
    method: 'delete'
  })
}

// 导出tcp服务器管理
export function exportTcpIpManager(query) {
  return request({
    url: '/exp/tcpIpManager/export',
    method: 'get',
    params: query
  })
}