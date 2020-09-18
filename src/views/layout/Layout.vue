<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:12
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-17 18:08:51
--> 
<template>
  <div class="app-wrapper" :class="classObj">
    <el-container>
      <!-- 头部 -->
      <NavTop></NavTop>

      <el-container>
        <!-- 侧边栏 -->
        <sidebar class="sidebar-container"></sidebar>

        <!-- 主体内容 -->
        <el-main>
            <div class="main-container">
              <navbar></navbar>
              <app-main class="app-container"></app-main>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, NavTop } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import store from '@/store'
import {mapState, mapMutations } from 'vuex'
import { getNavBarList } from '@/utils/common'

export default {
  name: "layout",
  components: {
    Navbar,             //二级navbar 放页面当前位置的
    Sidebar,            //左侧导航
    AppMain,            //内容组件
    NavTop              //顶部的顶级导航
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      withoutAnimation: state => state.app.withoutAnimation,
      treeMenuList: state => state.menu.treeMenuList,
      menuList:state => state.menu.menuList,
      collapse: state => state.app.collapse,
    }),
    
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: this.collapse,
        withoutAnimation: this.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
    menuList(newVal,oldVal){
      this.getBreadcrumb()
    }
  },
  created() {
    if(this.menuList.length>2){         //和watch配合同时使用，当  menuList 获取较慢时执行watch中的getBreadcrumb方法，反之执行create中的getBreadcrumb方法 
      this.getBreadcrumb()
    }
   
  },
  methods:{
    ...mapMutations(['SET_SIDE_LIST','SET_NAV_LIST']),
    // 设置当前路径页面navbar
    getBreadcrumb(){ 
      let arr = getNavBarList(this.menuList,this.$route.meta.index);
      this.$store.commit('SET_NAV_LIST',arr)
      this.setSideMenuList(arr[0].menuId)
    },
    // 页面刷新时，根据顶部菜单路由的name设置侧边栏 
    setSideMenuList(menuId){     
      //根据name 筛选出侧边栏导航菜单
      let sideMenuList = this.treeMenuList.filter((item,index)=>{
        return item.menuId == menuId  
      })

      this.SET_SIDE_LIST(sideMenuList[0])  
    },
    
  }
};
</script>

<style lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    margin-top:60px;
  }
  .app-container {
    padding: 20px;
  }
  .el-main{
    padding-top: 0;
  }
</style>
