/*
 * @Author: 卢勇其
 * @Date: 2020-07-12 11:57:10
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-17 17:16:51
 */ 
const menu = {
    state: {
        menuList:[
            {
                menuIcon: "",
                menuId: "64f95101202b4594b2bad18fd425e804",
                menuName: "首页",
                menuSort: 0,
                menuSrc: "/home",
                menuType: "0",
                subpage: "",
                toMenuId: "0",
                treeNumber: 0, 
            },
            {
                menuIcon: "iconfont icondashu",
                menuId: "6f3dd69b32614bb6b293270eec3afb58",
                menuName: "我的控制台",
                menuSort: 0,
                menuSrc: "home",
                menuType: "1",
                subpage: "",
                toMenuId:"64f95101202b4594b2bad18fd425e804",
                treeNumber: 1,
            }
        ],          //全部菜单列表
        treeMenuList:[
            {
                menuIcon: "",
                menuId: "64f95101202b4594b2bad18fd425e804",
                menuName: "首页",
                menuSort: 0,
                menuSrc: "/home",
                menuType: "0",
                subpage: "",
                toMenuId: "0",
                treeNumber: 0,
                children:[
                    {
                        menuIcon: "iconfont icondashu",
                        menuId: "6f3dd69b32614bb6b293270eec3afb58",
                        menuName: "我的控制台",
                        menuSort: 0,
                        menuSrc: "home",
                        menuType: "1",
                        subpage: "",
                        toMenuId:"64f95101202b4594b2bad18fd425e804",
                        treeNumber: 1,
                        children:[]
                    }
                ]
            }
        ],      //全部菜单树结构列表 
        selectTreeMenuList:[], //选择上级菜单时的树结构菜单
        sideMenuList: [
            {
                menuIcon: "iconfont icondashu",
                menuId: "6f3dd69b32614bb6b293270eec3afb58",
                menuName: "我的控制台",
                menuSort: 0,
                menuSrc: "home",
                menuType: "1",
                subpage: "",
                toMenuId:"64f95101202b4594b2bad18fd425e804",
                treeNumber: 1,
                children:[]
            }
        ],         //侧边菜单
        navBarList:[],      //当前页面导航菜单 
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
        },
        SET_NAV_LIST(state,arr){           //设置当前页面导航菜单
            state.navBarList = arr
        },
    },
    actions: {
        getMenuList( { commit }, menuList ){
            commit('SET_All_MENU', menuList)
        }
    }
}

export default menu