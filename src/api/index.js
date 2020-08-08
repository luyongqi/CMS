/*
 * @Author: 卢勇其
 * @Date: 2020-05-25 14:41:05
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-06 17:40:18
 */ 
import axios from 'axios';
import { Message } from 'element-ui'

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
    Message.closeAll(); //解决多次弹窗问题
    if(response.data.retCode==="000000"){  
       return response.data;  
    }else{
      Message({
        message: response.data.errInfo,
        type: 'error',
        duration: 1.5 * 1000,
        offset:150
      })
    } 
  },
  error => {
    let { response } = error;
    if(response&&response.status === 401) {
      // 清除缓存
      window.sessionStorage.removeItem('userInfo');
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

