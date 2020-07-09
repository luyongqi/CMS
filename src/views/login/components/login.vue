<template>
  <div class="login">
    <el-card class="login-form-layout">
        <div slot="header" class="title">
            <span class="title-left">注册与登录</span>
            <el-button class="title-right" @click="changeComponent">去注册</el-button>
        </div>
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
            placeholder="请输入用户名/手机号">
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
            placeholder="请输入密码">
              <span slot="prefix">
                <svg-icon icon-class="password" class="color-main"></svg-icon>
              </span>
              <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"></svg-icon>
              </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
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
     
    },
    methods: {
        changeComponent(){
            this.$emit('update:showFlag',!this.showFlag)
        },
        showPwd() {
            if (this.pwdType === 'password') {
            this.pwdType = ''
            } else {
            this.pwdType = 'password'
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
              if (valid) {
                  
              }
            })
        },
    }
  }
</script>

<style scoped lang="scss">

    .login{
        width: 100%;
        position: absolute;
        left: 0;right: 0;
        top: 180px;
        margin: 0 auto;
        border-bottom: 100px solid transparent;
    }
   .login-form-layout {
        width: 800px;
        margin: 0 auto;
        border-top: 10px solid #409EFF;
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
