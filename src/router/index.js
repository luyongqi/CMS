/*
 * @Author: 卢勇其
 * @Date: 2020-07-07 11:55:16
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-15 14:30:22
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
    meta: {title: '首页', icon:'iconshouye'},
    children: [
      {
        path: 'home',
        name: 'homepage',
        component: () => import('@/views/home/index'),
        meta: {title: '我的工作台', icon:'iconshouye'},
      },
    ]
  },
  {
    path:'/sys',
    name:'sys',
    component: Layout,
    redirect: '/sys/user',
    meta: {title: '系统管理', icon:'iconshouye'},
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/sys/user'),
        meta: {title: '用户管理', icon:'iconyonghuguanli'},
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/sys/menu'),
        meta: {title: '菜单管理', icon:'iconjiaoseguanli'},
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/sys/roles'),
        meta: {title: '角色管理', icon:'iconjiaoseguanli'},
      },
      {
        path: 'business',
        name: 'business',
        component: () => import('@/views/sys/business'),
        meta: {title: '单位管理', icon:'icontubiao_qiyeguanli-copy'},
      },
      {
        path: 'division',
        name: 'division',
        component: () => import('@/views/sys/division'),
        meta: {title: '部门管理', icon:'iconbumenguanli'},
      },
      {
        path: 'facility',
        name: 'facility',
        component: () => import('@/views/sys/facility'),
        meta: {title: '设备管理', icon:'iconshebeiguanli'},
      },
     
      {
        path: 'project',
        name: 'project',
        component: () => import('@/views/sys/project'),
        meta: {title: '项目管理', icon:'iconziyuan'},
      },
      
      {
        path: 'steps',
        name: 'stepDetail',
        component: () => import('@/views/sys/steps'),
        meta: {title: '步骤管理', icon:'iconzhijianbuzhou'},
      },
      {
        path: 'steps/stepDetail',
        name: 'steps',
        component: () => import('@/views/sys/steps/stepDetail'),
        meta: {title: '步骤详情', icon:'iconzhijianbuzhou'},
        hidden:true
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/sys/group'),
        meta: {title: '分组管理', icon:'iconjiaoseguanli'},
      },
      {
        path: 'staff',
        name: 'staff',
        component: () => import('@/views/sys/staff'),
        meta: {title: '人员管理', icon:'iconjiaoseguanli'},
        children:[
          
        ]
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/sys/order'),
        meta: {title: '工单管理', icon:'icongongdanguanli'},
      },
      {
        path: 'orderAuth',
        name: 'orderAuth',
        component: () => import('@/views/sys/order/orderAuth'),
        meta: {title: '工单审核处理', icon:'icongongdanguanli'},
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/sys/order/orderDetail'),
        meta: {title: '工单审核详情', icon:'icongongdanguanli'},
        hidden:true
      },
      {
        path: 'orderDataList',
        name: 'orderDataList',
        component: () => import('@/views/sys/order/orderDataList'),
        meta: {title: '工单数据列表', icon:'icongongdanguanli'},
      },
    ]
  },
  {
    path: '*', 
    redirect: '/404',
    hidden: true
  }
]

const asyncMenu = [
  {
    path:'/',
    name:'home',
    component: Layout,
    redirect: '/home',
    meta: {title: '首页', icon:'iconshouye'},
    children: [
      {
        path: 'home',
        name: 'homepage',
        component: () => import('@/views/home/index'),
        meta: {title: '我的工作台', icon:'iconshouye'},
      },
    ]
  },
  {
    path:'/sys',
    name:'sys',
    component: Layout,
    redirect: '/sys/user',
    meta: {title: '系统管理', icon:'iconshouye'},
    children: [
      {
        name: 'apply',
        meta: {title: '权限管理', icon:'iconyonghuguanli'},
        children:[
          {
            name: 'user',
            meta: {title: '用户列表', icon:'iconyonghuguanli'},
          },
          {
            name: 'menu',
            meta: {title: '菜单列表', icon:'iconjiaoseguanli'},
          },
          {
            name: 'roles',
            meta: {title: '角色列表', icon:'iconjiaoseguanli'},
          },
        ]
      },
      
      {
        name: 'businessManage',
        meta: {title: '单位管理', icon:'icontubiao_qiyeguanli-copy'},
        children:[
          {
            name: 'business',
            meta: {title: '单位列表', icon:'icontubiao_qiyeguanli-copy'},
          },
          {
            name: 'division',
            meta: {title: '部门列表', icon:'iconbumenguanli'},
          },
          {
            name: 'facility',
            meta: {title: '设备列表', icon:'iconshebeiguanli'},
          },
        ]
      },
      
      {
        name: 'projectManage',
        meta: {title: '项目管理', icon:'iconziyuan'},
        children:[
          {
            name: 'project',
            meta: {title: '项目列表', icon:'iconziyuan'},
          },
          {
            name: 'stepDetail',
            meta: {title: '步骤列表', icon:'iconzhijianbuzhou'},
          },
        ]
      }, 
      {
        name: 'staffMange',
        meta: {title: '人员管理', icon:'iconjiaoseguanli'},
        children:[
          {
            name: 'group',
            meta: {title: '人员分组', icon:'iconjiaoseguanli'},
          },
          {
            name: 'staff',
            meta: {title: '人员列表', icon:'iconjiaoseguanli'},
          }
        ]
      },
      {
        name: 'orderManage',
        meta: {title: '工单管理', icon:'icongongdanguanli'},
        children:[
          {
            name: 'order',
            meta: {title: '工单列表', icon:'icongongdanguanli'},
          },
          {
            name: 'orderAuth',
            meta: {title: '工单审核处理', icon:'icongongdanguanli'},
          },
          {
            name: 'orderDataList',
            meta: {title: '工单数据列表', icon:'icongongdanguanli'},
          },
        ]
      },
      
    ]
  },
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
  const menu = asyncMenu.filter( v => {
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

export default router
