/*
 * @Author: 卢勇其
 * @Date: 2020-07-07 11:55:16
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-15 17:04:51
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import store from '@/store'
import { getToken,removeToken,getUserId } from '@/utils/auth'
import { getAllMenuList,getMenuByUser } from '@/api/manage';
import { treeList } from '@/utils/common'
import { setPrefix } from '@/api/manage'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}; //阻止router跳转同一页面 加入历史栈中
const whiteList = ['/login'] // 不重定向白名单
Vue.use(Router)

 //静态菜单
export const constantRouterMap = [     
  {
    path:'/',
  
    component: Layout,
    redirect: '/home',
    meta: {title: '首页', index:"64f95101202b4594b2bad18fd425e804"},
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        meta: {title: '我的工作台', index:'6f3dd69b32614bb6b293270eec3afb58'},
      },
      {
        path: 'sys/orderDetail',
        component: () => import('@/views/sys/order/orderDetail'),
        meta: {title: '工单审核详情', index:"f1973dbcf1c149b9832e352779663278"},
      },
      {
        path: 'sys/orderDataDetail',
        component: () => import('@/views/sys/order/orderDataDetail'),
        meta: {title: '工单数据详情', index:"12a040c3ec27492e8e25fa5acbf1df95"},
      },
      {
        path: 'sys/orderDataDetail1',
        component: () => import('@/views/sys/order/orderDataDetail1'),
        meta: {title: '工单数据详情', index:"8e312ec1b0574bc0abc13e194d7cace6"},
      },
      
      {
        path: 'sys/roles/allocMenu',
        component: () => import('@/views/sys/roles/allocMenu'),
        meta: {title: '分配菜单', index:"25b1c9a6b03749a4b279503c88a89dbf"},
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
  
  { 
    path: '/404', 
    component: () => import('@/views/404'),
  },
]

const router = new Router({
  routes: constantRouterMap
})

// 路由守卫
router.beforeEach((to, from, next)=>{
  // removeToken()       
  let  token = getToken(); 
  if(token){
    if(to.path === '/login'){                //token未失效时 重定向到主页
      next({path:'/home'})
    }else{
      // 加载动态菜单和路由 
      if(store.state.user.roles.length===0){
        setPrefix()             //防止刷新页面时 接口前缀是之前的默认值
        store.dispatch('GetInfo').then( res =>{   //拉取用户信息
          addDynamicMenuAndRoutes( to,from,next )
          next()
        }).catch((err)=>{
          store.dispatch( 'LogOut' ).then(()=>{
              Message.error(err || 'Verification failed, please login again')
              next({ path:'/home' })
          })
        })
      }else{
        next()
      }
    }
  } else{
   
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }

})
/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
  for(let j=0;j<dynamicRoutes.length; j++) {
    if(dynamicRoutes[j].name == '代码生成') {
      dynamicRoutes[j].component = Generator
      break
    }
  }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
  router.options.routes.push({
    path:'*',
    redirect:'/404'
  })
}

/**
* 加载动态菜单和路由
*/
function addDynamicMenuAndRoutes(to,from) {

  if( store.state.app.menuRouteLoaded ) {      //判断菜单和路由是否已存在 
    return
  }
  
  getMenuByUser({
    userId:getUserId()
  }).then(res => {             //获取所有菜单

    // 添加动态路由
    let dynamicRoutes = addDynamicRoutes(treeList(res.data))
 
    // 处理静态组件绑定路由
    handleStaticComponent(router, dynamicRoutes)

    router.addRoutes(router.options.routes)
    
    router.onReady(()=>{
      // 保存菜单树 
      store.commit('SET_TREE_MENU', treeList(res.data))

      // 保存加载状态
      store.commit('SET_ROUTE_LOAD_STATUS', true)

      // 保存菜单数组
      store.commit('SET_All_MENU',res.data)
    }) 
    
  }).catch(function(err) {
    
  })
}

/**
* 添加动态(菜单)路由
* @param {*} menuList 菜单列表
* @param {*} routes 递归创建的动态(菜单)路由
*/
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].menuSrc && /\S/.test(menuList[i].menuSrc)) {
       menuList[i].menuSrc = menuList[i].menuSrc.replace(/^\//, '')
       // 创建路由配置
       var route = {
         path: menuList[i].menuSrc,
         component: null,
        //  name: menuList[i].menuSrc,
         meta: {
           icon: menuList[i].menuIcon,
           index: menuList[i].menuId
         }
       }
      
      // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
      // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
      let array = menuList[i].menuSrc.split('/')
      let url = ''
      for(let i=0; i<array.length; i++) {
          url += array[i].substring(0,1) + array[i].substring(1) + '/'
      }
      url = url.substring(0, url.length - 1)
      route['component'] =  () => import(`@/views/${url}`)
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    
  }
  return routes
 }

export default router
