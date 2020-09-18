<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:22
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-18 09:13:27
--> 
<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="!collapse"></hamburger>

    <el-breadcrumb class="app-breadcrumb" separator="/">  
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in navBarList" :key="item.menuId">
          <span v-if="item.redirect==='noredirect'||index==navBarList.length-1" class="no-redirect">{{item.menuName}}</span>
          <span v-else> {{item.menuName}}</span>
          <!-- <router-link v-else :to="{name:item.menuSrc}">{{item.menuName}}</router-link> -->
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Hamburger from './Hamburger'

export default {
  name:'navbar',
  data(){
    return {
      
    }
  },
   watch: {
    $route() {
      
    }
  },
  components: {
    Hamburger
  },
  computed: {
    ...mapState({
      collapse: state => state.app.collapse,
      navBarList:state => state.menu.navBarList       //导航栏数组
    })
  },
  
  // 初始化数据
  created() {
  
  },
  methods: {
    ...mapMutations(['SET_COLLAPSE_STATUS']),
   
    // 切换侧边栏展开或收缩
    toggleSideBar() {
      this.SET_COLLAPSE_STATUS()
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
.app-breadcrumb.el-breadcrumb {
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
  /*fade*/
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>

