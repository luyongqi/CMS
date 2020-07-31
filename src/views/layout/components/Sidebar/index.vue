<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:27
 * @LastEditors: your name
 * @LastEditTime: 2020-07-15 09:26:20
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
    > 
      <!-- 导航菜单组件 动态组件 -->
      <MenuTree v-for="(item) in sideMenuList.children" :menu="item" :key="item.name"></MenuTree>
    </el-menu>
  </scroll-bar>
</template>

<script>
/**
 * MenuTree组件的key值要为唯一的，否则点击顶部菜单时组件不会重新渲染
 */
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
  watch:{
    $route(){
     
    }
  },
  created(){
  
  },
  methods:{
   
  }
}
</script>
