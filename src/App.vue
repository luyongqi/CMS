<!--
 * @Author: 卢勇其
 * @Date: 2020-07-07 11:55:16
 * @LastEditors: your name
 * @LastEditTime: 2020-07-10 10:44:04
--> 
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import rem from '@/assets/js/rem.js'
  export default {
    name: 'App',
    mounted(){
      rem.init()    //初始化rem
    }
  }
</script>

<style lang="scss">
  @import 'element-ui/lib/theme-chalk/index.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
