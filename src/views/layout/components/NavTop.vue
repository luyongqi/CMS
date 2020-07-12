<template>
  <div class="nav-top">
    <!-- logo -->
    <div class="logo-avtart" @click="gotoHome">后台管理系统</div>

    <el-row :gutter="20" class="nav">
      <!-- 导航列表 -->
      <el-col :xs="18" :sm="18" :md="18" :lg="21" :xl="21">
        <div class="nav-top-list">
          <!-- 导航组件 -->
          <el-menu
           :default-active="$route.matched[0].name"
            class="el-menu-demo"
            mode="horizontal"
            @select="selectFn"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
          >
            <el-menu-item
              class="el-element-item"
              v-for="(item,index) in menuList"
              :key="index"
              :index="item.name"
            >{{item.meta.title}}</el-menu-item>
          </el-menu>

        </div>
      </el-col>

      <!-- 头像 -->
      <el-col class="right" :xs="6" :sm="6" :md="6" :lg="3" :xl="3">
        <el-badge class="msg">
          <i class="iconfont iconyouxiang"></i>
        </el-badge>
        <el-badge  class="inform">
          <i class="iconfont iconxiaoxi"></i>
        </el-badge>
        <div class="user-avtar">
          <el-dropdown class="avatar-container" trigger="click">
            <!--头像  -->
            <span class="el-dropdown-link">
              <el-avatar class="avtarImg" :src="avatarImg"></el-avatar>
              <i class="el-icon-caret-bottom"></i>
            </span>
            <!-- 下拉框 -->
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <router-link class="inlineBlock" to="/home">
                <el-dropdown-item>首页</el-dropdown-item>
              </router-link>
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
  data() {
    return {
      avatarImg: require("@/assets/images/avatar01.jpg"),
    };
  },

  computed: {
    ...mapState({
      menuList: state => state.menu.menuList
    })
  },

  //组件创建的时候获取路由的数组
  created() {
    console.log(this.$route)
  },
  
  methods: {
    ...mapMutations(['SET_SIDE_LIST']),

    selectFn(name){
      //根据name 筛选出侧边栏导航菜单
      let sideMenuList = this.menuList.filter((item,index)=>{
        return item.name == name  
      })
      this.SET_SIDE_LIST(sideMenuList[0])  
    },
    // 回到首页
    gotoHome() {
      this.$router.push({ path: "/home" });
    },
    // 退出登录
    logout() {
       this.$router.push({ path: "/login" });
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
  z-index: 3000;
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
      // 消息
      .msg {
        cursor: pointer;
        margin-right: 40px;
        .iconyouxiang {
          color: rgb(191, 203, 217);
          font-size: 18px;
        }
      }
      // 通知
      .inform {
        cursor: pointer;
        margin-right: 90px;
        .iconxiaoxi {
          color: rgb(191, 203, 217);
          font-size: 20px;
        }
      }
      //用户头像的操作
      .user-avtar {
        .avatar-container {
          height: 60px;
          line-height: 60px;
          .el-dropdown-link {
            cursor: pointer;
            height: 60px;
            position: relative;
            .avtarImg {
              display: inline-block;
              line-height: 60px;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 20px;
            }
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
