/*
 * @Author: 卢勇其
 * @Date: 2020-07-12 11:57:10
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-13 10:30:14
 */ 
const menu = {
    state: {
        menuList:[],          //全部菜单列表
        treeMenuList:[],      //全部菜单树结构列表 
        selectTreeMenuList:[], //选择上级菜单时的树结构菜单
        sideMenuList: []      //侧边菜单
    },
    mutations: {
        SET_All_MENU(state,menuList){
            state.menuList = menuList
        },
        SET_TREE_MENU(state,menuList){
            state.treeMenuList = menuList
        },
        SET_SELECT_TREE_MENU(state,list){
            state.selectTreeMenuList = list
        },
        SET_SIDE_LIST(state,sideList){
            state.sideMenuList = sideList
        }
    },
    actions: {
        getMenuList( { commit }, menuList ){
            commit('SET_All_MENU', menuList)
        }
    }
}

export default menu