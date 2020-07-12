<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:22
 * @LastEditors: your name
 * @LastEditTime: 2020-07-12 18:10:55
--> 
<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="!collapse"></hamburger>
    <el-breadcrumb class="app-breadcrumb" separator="/">  
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.meta.title">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </el-menu>
</template>

<script>
import { mapGetters,mapState} from 'vuex'
import Hamburger from './Hamburger'

export default {
  data(){
    return {
      levelList: null           //当前位置导航
    }
  },
   watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  components: {
    Hamburger
  },
  computed: {
    
  },
  
  // 初始化数据
  created() {
    this.getBreadcrumb()
  },
  methods: {
   getBreadcrumb() {
     let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'home') {
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
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
</style>

