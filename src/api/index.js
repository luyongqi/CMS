/*
 * @Author: 卢勇其
 * @Date: 2020-05-25 14:41:05
 * @LastEditors: your name
 * @LastEditTime: 2020-07-07 16:09:31
 */ 
import axios from 'axios';

// 全局设置
const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 15000,    // 请求超时时间
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
});

// request拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求，检查 sessionStorage 中是否有 token,如果有放在headers中
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {};
    const token =  userInfo.token || '';
    if( token !== '' ){
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let { response } = error;
    if(response&&response.status === 401) {
      // 清除缓存
      window.sessionStorage.removeItem('userInfo');
      window.location.href = "/login";
      return Promise.reject(error.response);
    }
  }
)

export default instance

