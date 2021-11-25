// 请求模块

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 接口的基准路径
})

export default request


// 请求拦截器
request.interceptors.request.use(function(config) {
  // 请求发起会经过这里
  // config配置对象：本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 这里务必返回config，否则请求出不去
  return config
}, function(error) {
  // 如果请求出错了（还未发出去）会进入这里
  return Promise.reject(error)
})

// 响应拦截器