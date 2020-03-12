import request from '@/utils/request'

export function bookCreate(data) {
  return request({
    url: '/book/create',
    method: 'post',
    data
  })
}

export function bookUpdate(data) {
  return request({
    url: '/book/update',
    method: 'post',
    data
  })
}

export function bookDelete(data) {
  return request({
    url: '/book/delete',
    method: 'post',
    data
  })
}
