/*
 * @Author: 卢勇其
 * @Date: 2020-07-07 16:13:30
 * @LastEditors: your name
 * @LastEditTime: 2020-07-07 16:16:20
 */ 
import instance  from './index.js'

// 登录
export const login = (data) => instance.post(`/admin/login`, data)     //登录