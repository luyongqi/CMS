<template>
  <div class="login">
    <el-card class="login-form-layout">
        <el-form autoComplete="on"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">后台管理系统</h2>
        <el-form-item prop="username">
          <el-input name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名称">
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入登录密码">
              <span slot="prefix">
                <svg-icon icon-class="password" class="color-main"></svg-icon>
              </span>
              <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;text-align: center">
          <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import  {mapState} from 'vuex'
  import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if(value.length<=0){
          callback(new Error('用户名不能小于1位'))
        }else{
           callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('密码不能小于1位'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        dialogVisible:false,
        supportDialogVisible:false
      }
    },
    props:{
        showFlag:{
            type:Boolean,
            default:true,
        }
    },
    computed:{
   
    },
    created() {
      this.loginForm.username = getCookie("username");
      this.loginForm.password = getCookie("password");
      if(this.loginForm.username === undefined||this.loginForm.username==null||this.loginForm.username===''){
        this.loginForm.username = 'admin';
      }
      if(this.loginForm.password === undefined||this.loginForm.password==null){
        this.loginForm.password = '';
      }
    },
    methods: {
        changeComponent(){
            this.$emit('update:showFlag',!this.showFlag)
        },
        // 显示密码
        showPwd() {
            if (this.pwdType === 'password') {
              this.pwdType = ''
            } else {
              this.pwdType = 'password'
            }
        },
        // 登录
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
              if (valid) {
                this.loading = true;
                this.$store.dispatch('Login', this.loginForm).then(() => {
                  this.loading = false;
                  setCookie("username",this.loginForm.username,30);
                  setCookie("password",this.loginForm.password,30);
                  this.$router.push('/')
                }).catch(() => {
                  this.loading = false
                })
              } else {
                return false
              } 
            })
        },
    }
  }
</script>

<style scoped lang="scss">

    .login{
        width: 100%;
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
    }
   .login-form-layout {
      width: 500px; 
      .title{
        overflow: hidden;
        position: relative;
        .title-left{
            float: left;
            font-size: 14px;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
        }
        .title-right{
            float: right;
            font-size: $fontSizeBase
        }
    }

    .login-title {
        text-align: center;
        line-height: 1.15;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        font-weight: bold;
    }
    .color-main {
      color: #409eff;
    }

  }

</style>
