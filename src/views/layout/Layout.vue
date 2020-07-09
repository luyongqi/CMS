<template>
  <div class="app-wrapper" :class="classObj">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <NavTop></NavTop>
      </el-header>

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
import {mapState } from 'vuex'
import { getNavBarList } from '@/utils/common'

export default {
  name: "layout",
  components: {
    Navbar, //二级navbar 放页面当前位置的
    Sidebar, //左侧导航
    AppMain, //内容组件
    NavTop //顶部的顶级导航
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      navTree: state => state.menu.navTree,
      collapse: state => state.app.collapse,
      menuList:state => state.menu.menuList,
      withoutAnimation: state => state.app.withoutAnimation
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
  },
  created() {
   this.getBreadcrumb()
  },
  methods:{
    // 设置当前路径页面navbar
    getBreadcrumb(){     
      let arr = getNavBarList(this.menuList,this.$route.meta.index);
      this.$store.commit('SET_NAV_LIST',arr)
      this.getSliderList(arr[0].menuId)
    },
     // 根据父级id查找侧边栏点击导航
    getSliderList(menuId) {
      //根据menuId筛选出侧边导航栏
      let sliderTree = this.navTree.filter((item,index)=>{
        return item.menuId == menuId  
      })
      this.$store.commit('SET_SLIDER_TREE',sliderTree[0]);      //保存当前选中项的侧边栏菜单;
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.el-main{
  padding-top: 0;
}
</style>
