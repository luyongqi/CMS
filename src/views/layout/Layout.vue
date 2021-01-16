<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:12
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-16 11:02:50
--> 
<template>
  <div class="app-wrapper" :class="classObj">
    <el-container>
      <!-- 头部 -->
      <NavTop @onPwd="pwdChange"></NavTop>

      <el-container>
        <!-- 侧边栏 -->
        <sidebar class="sidebar-container"></sidebar>

        <!-- 主体内容 -->
        <el-main>
            <div class="main-container">
              <navbar></navbar>
              <app-main class="app-container"></app-main>
            </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 修改密码弹框 -->
    <el-dialog
    title="修改密码"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="deptId" >
            <el-input
            class="input-item"
            v-model.trim="form.userName"
            autocomplete="off"
            disabled
            ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="loginPass">
            <el-input
            class="input-item"
            v-model.trim="form.loginPass"
            autocomplete="off"
            type="password"
            placeholder="填写新密码"
            ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newLoginPass">
            <el-input
            class="input-item"
            v-model.trim="form.newLoginPass"
            autocomplete="off"
            type="password"
            placeholder="填写确认密码"
            ></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, NavTop } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import store from '@/store'
import {mapState, mapMutations } from 'vuex'
import { getNavBarList } from '@/utils/common'
import { changePwd } from '@/api/manage'
import { getUserId } from '@/utils/auth'

export default {
  name: "layout",
  components: {
    Navbar,             //二级navbar 放页面当前位置的
    Sidebar,            //左侧导航
    AppMain,            //内容组件
    NavTop              //顶部的顶级导航
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      withoutAnimation: state => state.app.withoutAnimation,
      treeMenuList: state => state.menu.treeMenuList,
      menuList:state => state.menu.menuList,
      collapse: state => state.app.collapse,
      userInfo: state => state.user.userInfo
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
    menuList(newVal,oldVal){
      this.getBreadcrumb()
    }
  },
  data(){
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.newLoginPass !== '') {
            this.$refs.form.validateField('newLoginPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.loginPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      form:{
        userName:'',    //用户名称
        userId:'',              //用户id 
        loginPass:'',          //新密码
        newLoginPass:''        //新密码确认
      },
      dialogFormVisible:false,
      rules: {
          loginPass:[
             { validator: validatePass, trigger: 'blur' }
          ],
          newLoginPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
    }
  },
  created() {
    this.form.userName = this.userInfo.userName
    if(this.menuList.length>2){         //和watch配合同时使用，当  menuList 获取较慢时执行watch中的getBreadcrumb方法，反之执行create中的getBreadcrumb方法 
      this.getBreadcrumb()
    }   
  },
  methods:{
    ...mapMutations(['SET_SIDE_LIST','SET_NAV_LIST']),
    // 设置当前路径页面navbar
    getBreadcrumb(){ 
      let arr = getNavBarList(this.menuList,this.$route.meta.index);
      this.$store.commit('SET_NAV_LIST',arr)
      this.setSideMenuList(arr[0].menuId)
    },
    // 页面刷新时，根据顶部菜单路由的name设置侧边栏 
    setSideMenuList(menuId){     
      //根据name 筛选出侧边栏导航菜单
      let sideMenuList = this.treeMenuList.filter((item,index)=>{
        return item.menuId == menuId  
      })

      this.SET_SIDE_LIST(sideMenuList[0])  
    },
    // 修改密码
    pwdChange(){
      this.dialogFormVisible = true
    },
    // 关闭修改密码弹框
    close(){
      this.$refs["form"].resetFields();
      this.dialogFormVisible = false;
    },
    // 保存数据
    save() {
        this.$refs["form"].validate(async (valid) => {
            if (valid) {
                this.form.userId = getUserId();                       //设置用户id
                const res = await changePwd(this.form);
                if(!res) return;
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.$emit("fetchData");
                this.close();
            } else {
                return false;
            }
        });
    },
  }
};
</script>

<style lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    margin-top:60px;
  }
  .app-container {
    padding: 20px;
  }
  .el-main{
    padding-top: 0;
  }
  .input-item{
    width:80%;
  }
</style>
