/*
 * @Author: 卢勇其
 * @Date: 2020-07-07 11:55:16
 * @LastEditors: your name
 * @LastEditTime: 2020-07-09 10:09:01
 */ 
import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}; //阻止router跳转同一页面 加入历史栈中

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    },
    { 
      path: '/404', 
      component: () => import('@/views/404') 
    },
    {path: '*', redirect: '/404'}
  ]
})
