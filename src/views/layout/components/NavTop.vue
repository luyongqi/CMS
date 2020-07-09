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
/***
 *  根据菜单的menuid 高亮顶部导航
 * 
  **/
import { mapMutations, mapGetters,mapState } from "vuex";
import { logoutNew } from "@/apiNew/user.js";
import { removeToken } from '@/utils/auth'
import { getIFramePath } from '@/utils/iframe'

export default {
  data() {
    return {
      avatarImg: require("@/assets/images/avatar01.jpg"),
    };
  },

  computed: {
    ...mapGetters(["avatar", "navTop"]),
    ...mapState({
      navTree: state=>state.menu.navTree,
      navBarList:state => state.menu.navBarList       //导航栏数组
    }),
  },

  //组件创建的时候获取路由的数组
  created() {
    
  },
  
  methods: {
    ...mapMutations([
      "SET_SLIDER_TREE",
    ]),

    // 根据父级id查找侧边栏点击导航 选择顶部导航时重定向到第一项
    selectFn(menuId) {
      //根据menuId筛选出侧边导航栏
      let sliderTree = this.navTree.filter((item,index)=>{
        return item.menuId == menuId  
      })
      this.SET_SLIDER_TREE(sliderTree[0]);      //保存当前选中项的侧边栏菜单;

      var obj = this.getMenuSrc(sliderTree[0].children[0])

      // 如果是嵌套页面，转换成iframe的path
      let path = getIFramePath(obj.menuSrc)
      if(!path) {
        path = obj.menuSrc
      }
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + path)
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
      logoutNew().then(res => {
        // location.reload(); //刷新页面
        this.$store.commit('SET_ROLES', '');
        removeToken()
        this.$router.push({ path: "/login" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-demo {
  width: 100%;
  height: 60px;
  background-color: transparent;
  border-bottom: none;
  .el-element-item {
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    border-bottom: none;
  }
}
.nav-top {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 60px;
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
