// 用户相关请求模块

import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证码，每个手机号每分钟1次
export const sendSms = mobile => {
  return request({
    method: 'POST',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
      // Authorization: 'Bearer cdd3fad3-693f-4bdb-8c55-34885f7a6ff7'
      // 注意: 该接口需要授权才能访问
      // Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}