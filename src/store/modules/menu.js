/*
 * @Author: 卢勇其
 * @Date: 2020-07-12 11:57:10
 * @LastEditors: your name
 * @LastEditTime: 2020-07-12 16:13:58
 */ 
const menu = {
    state: {
        menuList:[],          //全部菜单
        sideMenuList: []      //侧边菜单
    },
    mutations: {
        SET_MENU(state,menuList){
            state.menuList = menuList
        },
        SET_SIDE_LIST(state,sideList){
            state.sideMenuList = sideList
        }
    },
    actions: {
        getMenuList( { commit }, menuList ){
            commit('SET_MENU', menuList)
        }
    }
}

export default menu