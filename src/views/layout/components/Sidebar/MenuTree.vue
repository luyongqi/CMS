<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:32
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-18 09:25:13
--> 
<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.menuId">
    <template slot="title">
      <i class="iconfont" :class="menu.menuIcon" ></i>
      <span slot="title">{{menu.menuName}}</span>
    </template>
    <template v-if="menu.children">
      <MenuTree v-for="item in menu.children" :key="item.menuId" :menu="item"></MenuTree>
    </template>
  </el-submenu>

  <el-menu-item v-else :index="menu.menuId" class="submenu-title-noDropdown" @click="handleRoute(menu)">
    <i class="iconfont" :class="menu.menuIcon"></i>
    <span slot="title">{{menu.menuName}}</span>
  </el-menu-item>
</template>

<script>

export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  created(){
    
  },
  methods: {
    handleRoute (menu) {
      this.$router.push('/'+menu.menuSrc)
    }
  }
}
</script>

<style scoped lang="scss">
.icon{
    margin-right: 5px;
  }
</style>