<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.meta.index"
      :collapse="collapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened="true"
    > 
      <!-- 导航菜单组件 动态组件 -->
      <MenuTree v-for="(item,index) in sliderTree.children" :menu="item" :key="index"></MenuTree>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters , mapState } from 'vuex'
import MenuTree from './MenuTree'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { MenuTree, ScrollBar },
  computed: {
    ...mapState({
      sliderTree: state=>state.menu.sliderTree,
      collapse:state=>state.app.collapse
    }),
  },
   
  created(){
    
  },
  methods:{
 
  }
}
</script>
