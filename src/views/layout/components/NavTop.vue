<template>
  <div class="nav-top">
    <!-- logo -->
    <div class="logo-avtart" @click="gotoHome">后台管理系统</div>

    <el-row :gutter="20" class="nav">
      <!-- 导航列表 -->
      <el-col :span="10">
        <div class="nav-top-list" v-if="navBarList[0]">
          <!-- 导航组件 -->
          <el-menu
           :default-active="navBarList[0].menuId"
            class="el-menu-demo"
            mode="horizontal"
            @select="selectFn"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
          >
            <el-menu-item
              class="el-element-item"
              v-for="(item,index) in navTree"
              :key="index"
              :index="item.menuId"
            >{{item.menuName}}</el-menu-item>
          </el-menu>

        </div>
      </el-col>

      <!-- 头像 -->
      <el-col class="right" :span="14">
        <!-- 角色 -->
        <span class="inform">
          {{ userInfo.roleNames }}
        </span>
        <!-- 头像 -->
        <el-avatar class="avtarImg" :src="avatarImg"></el-avatar>

        <div class="user-avtar">
          <el-dropdown class="avatar-container" trigger="click">
            <!--头像  -->
            <span class="el-dropdown-link" style="color：#fff">
              {{ userInfo.userName }}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <!-- 下拉框 -->
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <div @click="navTo('/home')">
                <el-dropdown-item  >首页</el-dropdown-item>
              </div>
              <!-- <div @click="navTo('/home')">
                <el-dropdown-item divided >个人中心</el-dropdown-item>
              </div> -->
              <div @click="handleChange">
                <el-dropdown-item divided >修改密码</el-dropdown-item>
              </div>
              <div @click="logout">
                <el-dropdown-item divided >退出</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapState, mapMutations } from "vuex";

export default {
  naem:'navtop',
  data() {
    return {
      avatarImg: require("@/assets/images/avatar01.jpg"),
    };
  },

  computed: {
    ...mapState({
      navTree: state => state.menu.treeMenuList,
      navBarList:state => state.menu.navBarList,       //导航栏数组
      userInfo:state => state.user.userInfo            //用户信息
    })
  },

  //组件创建的时候获取路由的数组
  created() {

  },
  
  methods: {
    ...mapMutations(['SET_SIDE_LIST']),
    navTo(path){
      this.$router.push({ path })
    },
    // 根据父级id查找侧边栏点击导航 选择顶部导航时重定向到第一项
    selectFn(menuId) {

      //根据menuId筛选出侧边导航栏
      let sliderTree = this.navTree.filter((item,index)=>{
        return item.menuId == menuId  
      })
      this.SET_SIDE_LIST(sliderTree[0]);      //保存当前选中项的侧边栏菜单;

      var obj = this.getMenuSrc(sliderTree[0].children[0])
  
      // 通过菜单URL跳转至指定路由
      this.$router.push('/'+obj.menuSrc)
    },
    // 返回顶级菜单下第一级子菜单
    getMenuSrc(obj){
      let temp;
      if(obj.children&&obj.children.length>0){
        temp = obj.children[0]
        this.getMenuSrc(temp)
        return temp
      }else{
        return obj
      }
    },
    // 回到首页
    gotoHome() {
      this.$router.push({ path: "/home" });
    },
    // 退出登录
    logout() {
       this.$store.dispatch('LogOut').then((res) => {
         if(res.retCode==='000000'){
           this.$message({
              message:'退出成功',
              type:'success',
              duration:2000
            })
            this.$router.push('/login')
         }
        // location.reload()    // 为了重新实例化vue-router对象 避免bug
      })
    },
    // 修改密码
    handleChange(){
      this.$emit('onPwd')
    }
  }
};
</script>

<style lang="scss" scoped>

.el-menu-demo {
  width: 100%;
  background-color: transparent;
  border-bottom: none;
  .el-element-item {
    font-size: 15px;
    border-bottom: none;
  }
}
.nav-top {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #304156;
  z-index: 1000;
  &:after {
    display: table;
    width: 100%;
    height: 1px;
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    box-shadow: inset 0 1px 0 #50627f;
  }
  // logo
  .logo-avtart {
    width: 200px;
    height: 100%;
    font-size: 18px;
    color: rgb(191, 203, 217);
    padding-left: 20px;
    line-height: 60px;
    letter-spacing: 0.1em;
  }

  // 导航
  .nav {
    position: absolute;
    left: 200px;
    top: 0;
    width: calc(100% - 200px);
    //   顶部导航列表
    .nav-top-list {
      height: 100%;
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: relative;
    
      .avtarImg {
        display: inline-block;
        line-height: 60px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 60px;
      }
      // 角色
      .inform {
        color: #fff;
        margin-right: 40px;
      }
      //用户头像的操作
      .user-avtar {
        
        .avatar-container {
          height: 60px;
          line-height: 60px;
          color: #fff;
          /deep/ .el-dropdown-link {
            cursor: pointer;
            
            padding: 20px;
            padding-right: 0;
            position: relative;
            .el-icon-caret-bottom {
              display: inline-block;
              height: 60px;
              color: #fff;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
