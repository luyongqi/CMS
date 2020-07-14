<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:27
 * @LastEditors: your name
 * @LastEditTime: 2020-07-13 18:24:15
--> 
<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.name"
      :collapse="collapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="true"
    > 
      <!-- 导航菜单组件 动态组件 -->
      <MenuTree v-for="(item,index) in sideMenuList.children" :menu="item" :key="index"></MenuTree>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters , mapState } from 'vuex'
import MenuTree from './MenuTree'
import ScrollBar from './ScrollBar'

export default {
  components: { MenuTree, ScrollBar },
  data(){
    return {
      
    } 
  },
  computed: {
    ...mapState({
        sideMenuList: state => state.menu.sideMenuList, 
        collapse:state=>state.app.collapse
    }),
  },
  created(){

  },
  methods:{
   
  }
}
</script>
