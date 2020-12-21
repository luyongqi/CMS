<!--
 * @Author: 卢勇其
 * @Date: 2020-07-07 11:55:16
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-11-26 10:38:17
--> 
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import rem from '@/assets/js/rem.js'
  import { setPrefix } from '@/api/manage.js'
  export default {
    name: 'App',
    mounted(){
      setPrefix()      //设置所有请求前缀（除登录页单位查询接口）
      rem.init()       //初始化rem
    }
  }
</script>

<style lang="scss">
  @import 'element-ui/lib/theme-chalk/index.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height:100%;
    min-width:100%;

  }
</style>
