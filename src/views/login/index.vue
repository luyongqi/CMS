<!--
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:43:58
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-11-26 09:38:28
--> 
<template>
  <div>
    <!-- 背景图片 -->
    <img :src="login_center_bg" class="login-center-layout">

    <!-- 登录与注册组件 -->
    <transition name="fade" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <component :is="loginOrRegisterFlag?'Login':'Register'" :showFlag.sync="loginOrRegisterFlag"></component>
    </transition>

  </div>
</template>

<script>

  import login_center_bg from '@/assets/images/login_center_bg.jpg'; //图片背景
  import Register from './components/Register.vue'; //注册组件
  import Login from './components/Login.vue'; //登录组件

  export default {
    data() {
        return{
          login_center_bg, //背景图片
          loginOrRegisterFlag:true, //组件切换的flag 用来显示与隐藏登录和注册的
        }
    },
    watch:{
      loginOrRegisterFlag(strnew){
       
      }
    },
    components:{
      Register,
      Login,
    },
    created() {
     
    },
    methods: {
      changeLoginRegister(){
        this.loginOrRegisterFlag=!this.loginOrRegisterFlag; //切换登录和注册组件
      }
    }
  }
</script>

<style scoped lang="scss">

  .login-center-layout {
     position: fixed;
    width: 100%;
    height: 100%;
    display: block;
    object-fit:cover;
    z-index: -100; 
  }

</style>
