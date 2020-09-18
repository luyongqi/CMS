/*
 * @Author: 卢勇其
 * @Date: 2020-07-10 10:59:51
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-17 15:04:08
 */ 

const app = {
  state: {
    withoutAnimation: false,    //侧边栏收缩时动画
    collapse:false,              // 导航栏收缩状态
    menuRouteLoaded:false,        //菜单和路由是否加载
    device: 'desktop'            //当前设备是桌面  
  },
  getters: {
    collapse(state){// 对应着上面state
        return state.collapse
    },
    device(state){
      return state.device
   },
 },
 
  mutations: {
    // 切换收缩状态
    SET_COLLAPSE_STATUS(state){  
      state.collapse = !state.collapse
    },
    // 展开侧边栏
    OPEN_SIDEBAR: (state) =>{
      state.collapse = false;
    },
     // 改变菜单和路由的加载状态
    SET_ROUTE_LOAD_STATUS(state, menuRouteLoaded){  
      state.menuRouteLoaded = menuRouteLoaded;
    },
    // 关闭侧边栏
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.collapse = true;
      state.withoutAnimation = withoutAnimation;
    },
    // 切换设备
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    // 收起侧边栏
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    // 展开侧边栏
    OpenSideBar({ commit }){
      commit('OPEN_SIDEBAR')
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
