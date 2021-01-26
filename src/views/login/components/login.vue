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
        <el-form-item prop="orgCode">
            <el-input name="orgCode"
            type="text"
            v-model="loginForm.orgCode"
            autoComplete="on"
            placeholder="请填写单位编号">
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
  import { setPrefix,checkIsOrg } from '@/api/manage'
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
      var checkOrg = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('单位编号不能为空'));
        }
        var reg = /^[0-9]*$/
        if (!reg.test(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',       //用户名
          password: '',       //密码
          orgCode: ''         //单位编号
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          orgCode: [{required: true, trigger: 'blur', validator: checkOrg}],
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
      localStorage.setItem('preFix','/000')                //防止刷新登录时localStorage中preFix值与初始化值不一致
      setPrefix()
  
      this.loginForm.username = getCookie("username");
      this.loginForm.password = getCookie("password");
      if(this.loginForm.username === undefined||this.loginForm.username==null||this.loginForm.username===''){
        this.loginForm.username = 'admin';
      }
      if(this.loginForm.password === undefined||this.loginForm.password==null){
        this.loginForm.password = '';
      }
      let this_ = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          this_.handleLogin();
        }
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
            var that = this
            this.$refs.loginForm.validate(valid => {
              if (valid) {
                this.loading = true;
                //先校验填写的单位编号是否存在
                checkIsOrg({
                  orgCode:this.loginForm.orgCode
                }).then( res => {
                  localStorage.setItem('preFix',this.loginForm.orgCode)
                  setPrefix()                              //修改所有请求前缀
                  
                  // 校验成功后登录
                  that.$store.dispatch('Login', that.loginForm).then(() => {
                    that.loading = false;
                    setCookie("username",that.loginForm.username,30);
                    setCookie("password",that.loginForm.password,30);
                    that.$router.push('/')
                  }).catch(() => {
                    that.loading = false
                  })
                },()=>{
                  that.loading = false
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
