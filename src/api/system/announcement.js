import request from '@/utils/request'

// 查询系统公告列表
export function listAnnouncement(query) {
  return request({
    url: '/system/announcement/list',
    method: 'get',
    params: query
  })
}

// 查询系统公告详细
export function getAnnouncement(id) {
  return request({
    url: '/system/announcement/' + id,
    method: 'get'
  })
}

// 新增系统公告
export function addAnnouncement(data) {
  return request({
    url: '/system/announcement',
    method: 'post',
    data: data
  })
}

// 修改系统公告
export function updateAnnouncement(data) {
  return request({
    url: '/system/announcement',
    method: 'put',
    data: data
  })
}

// 删除系统公告
export function delAnnouncement(id) {
  return request({
    url: '/system/announcement/' + id,
    method: 'delete'
  })
}

// 导出系统公告
export function exportAnnouncement(query) {
  return request({
    url: '/system/announcement/export',
    method: 'get',
    params: query
  })
}