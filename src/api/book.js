import request from '@/utils/request'

// 添加电子书
export function bookCreate(book) {
  return request({
    url: '/book/create',
    method: 'post',
    data: book
  })
}

// 读取某电子书信息
export function bookGet(fileName) {
  return request({
    url: '/book/get',
    method: 'get',
    params: { fileName }
  })
}

// 更新电子书
export function bookUpdate(book) {
  return request({
    url: '/book/update',
    method: 'post',
    data: book
  })
}

// 获取电子书分类列表
export function bookGetCategory() {
  return request({
    url: '/book/getCategory',
    method: 'get'
  })
}

// 获取电子书列表
export function bookGetList(param) {
  return request({
    url: '/book/getList',
    method: 'get',
    params: param
  })
}

// 删除电子书
export function bookDelete(book) {
  return request({
    url: '/book/delete',
    method: 'post',
    data: book
  })
}
