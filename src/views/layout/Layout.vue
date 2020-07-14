<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:12
 * @LastEditors: your name
 * @LastEditTime: 2020-07-13 11:52:54
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
              <app-main></app-main>
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
      menuList: state => state.menu.menuList,
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
      this.setSideMenuList()
    },
  },
  created() {
   this.setSideMenuList()
  },
  methods:{
    ...mapMutations(['SET_SIDE_LIST']),
    // 页面刷新时，根据顶部菜单路由的name设置侧边栏 
    setSideMenuList(){     
      let topName = this.$route.matched[0].name;   //当前顶部菜单的路由对应的name
      //根据name 筛选出侧边栏导航菜单
      let sideMenuList = this.menuList.filter((item,index)=>{
        return item.name == topName  
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
  .el-main{
    padding-top: 0;
  }
</style>
