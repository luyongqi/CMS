/*
 * @Author: 卢勇其
 * @Date: 2020-05-25 14:41:05
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-21 09:07:19
 */ 
import axios from 'axios';
import { Message } from 'element-ui'
import store from '../store'
import { getToken,removeToken,removesetUserId } from '@/utils/auth'

// 全局设置
const instance = axios.create({
    timeout: 15000,    // 请求超时时间
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// request拦截器
instance.interceptors.request.use(
  config => {
    // 判断token是否有值
    if( store.state.user.token){
      config.headers['Authorization'] = 'bearer '+ getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
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
    // Message.closeAll(); //解决多次弹窗问题
    if(response.data.retCode==="000000"){  
       return response.data;  
    }else if(response.data.retCode==="000401"){
      removeToken()
      Message({
        message: response.data.errInfo,
        type: 'error',
        duration: 3000
      })
      window.location.href = "/login";
    }else{
      Message({
        message: response.data.errInfo,
        type: 'error',
        duration: 3000
      })
    } 
  },
  error => {
    let { response } = error;
    if(response&&response.status === 401) {
      // 清除缓存
      removesetUserId()                   //移除cookie中的userId
      window.location.href = "/login";
      return Promise.reject(error.response);
    }else{
      Message({
        message: '系统内部错误！',
        type: 'error',
        duration: 1.5 * 1000,
        offset:150
      })
    }
  }
)

export default instance

