import request from '@/utils/request'

export function bookCreate(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
