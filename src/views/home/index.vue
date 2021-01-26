<!--
 * @Description: 首页
 * @Date: 2020-07-10 10:56:05
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-18 18:32:09
-->
<template>
  <div class="app-container">
      <span style="font-size:40px">欢迎</span>
      <span style="font-size:24px">您登录设备管理系统</span>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
   import { setPrefix} from '@/api/manage'
  export default {
    name: 'home',
    data() {
      return {

        loading: false,
        dataEmpty: false,
      }
    },
    computed:{
      ...mapState({
        userInfo:state=>state.user.userInfo
      }),
    },
    created(){
      console.log(this.userInfo, 2555)
    },
    methods:{
     
    }
  }
</script>

<style scoped>
  .app-container {

  }
</style>
