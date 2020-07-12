/*
 * @Author: 卢勇其
 * @Date: 2020-07-07 11:55:16
 * @LastEditors: your name
 * @LastEditTime: 2020-07-12 18:00:15
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import store from '@/store'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}; //阻止router跳转同一页面 加入历史栈中

Vue.use(Router)

 //静态菜单
export const constantRouterMap = [     
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true
  },
 
  { 
    path: '/404', 
    component: () => import('@/views/404'),
    hidden: true 
  },
]

//动态菜单
export const asyncRouterMap = [            
  {
    path:'/',
    name:'home',
    component: Layout,
    redirect: '/home',
    meta: {title: '首页', icon:'home'},
    children: [
      {
        path: '/home',
        name: 'homepage',
        component: () => import('@/views/home/index'),
        meta: {title: '我的工作台', icon:'home'},
      },
    ]
  },
  
  {
    path: '*', 
    redirect: '/404',
    hidden: true
  }
]

const router = new Router({
  routes: constantRouterMap.concat(asyncRouterMap)
})

// 路由守卫
router.beforeEach((to, from, next)=>{
  if( store.state.menu.menuList.length===0 ){
    let list = getMenuList() 

    store.dispatch('getMenuList',list)
  }

  next()
})

// 根据动态路由筛选菜单
function getMenuList(){
  const menu = asyncRouterMap.filter( v => {
    if( v.hidden !== undefined && v.hidden === true ){
      return false
    }else{
      if( v.children && v.children.length > 0 ){
        v.children = v.children.filter( child => {
          if(child.hidden !== undefined && child.hidden === true){
            return false
          }
          return child  
        })
      }       
    }
    return true
  })
  return menu
}

//根据当前的路由name,获取

export default router
