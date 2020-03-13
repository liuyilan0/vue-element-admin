import request from '@/utils/request'

export function bookCreate(book) {
  return request({
    url: '/book/create',
    method: 'post',
    data: book
  })
}

export function bookGet(fileName) {
  return request({
    url: '/book/get',
    method: 'get',
    params: { fileName }
  })
}

export function bookUpdate(book) {
  return request({
    url: '/book/update',
    method: 'post',
    data: book
  })
}

export function bookDelete(data) {
  return request({
    url: '/book/delete',
    method: 'post',
    data
  })
}
