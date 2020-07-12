<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:32
 * @LastEditors: your name
 * @LastEditTime: 2020-07-12 18:01:33
--> 
<template>
  <el-submenu v-if="menu.children && menu.children.length > 0" :index="menu.name">
    <template slot="title">
      <i class="icon" :class="menu.meta.icon" ></i>
      <span slot="title">{{menu.meta.title}}</span>
    </template>
    <template v-if="menu.children">
      <MenuTree v-for="item in menu.children" :key="item.name" :menu="item"></MenuTree>
    </template>
  </el-submenu>

  <el-menu-item v-else :index="menu.name" class="submenu-title-noDropdown" @click="handleRoute(menu.name)">
    <i class="icon" :class="menu.meta.icon"></i>
    <span slot="title">{{menu.meta.title}}</span>
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
    handleRoute (name) {
      this.$router.push({name})
    }
  }
}
</script>

<style scoped lang="scss">
.icon{
    margin-right: 5px;
  }
</style>