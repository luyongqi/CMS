<template>
  <el-submenu v-if="menu.children && menu.children.length >= 1" :index="menu.menuId">
    <template slot="title">
      <i class="icon" :class="menu.menuIcon" ></i>
      <span slot="title">{{menu.menuName}}</span>
    </template>
    <template v-if="menu.children">
      <MenuTree v-for="item in menu.children" :key="item.menuId" :menu="item"></MenuTree>
    </template>
  </el-submenu>

  <el-menu-item v-else :index="menu.menuId" class="submenu-title-noDropdown" @click="handleRoute(menu)">
    <i class="icon" :class="menu.menuIcon"></i>
    <span slot="title">{{menu.menuName}}</span>
  </el-menu-item>
</template>

<script>
import { getIFramePath } from '@/utils/iframe'
export default {
  name: 'MenuTree',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRoute (menu) {
      // 如果是嵌套页面，转换成iframe的path
      let path = getIFramePath(menu.menuSrc)
      if(!path) {
        path = menu.menuSrc
      }
      // 通过菜单URL跳转至指定路由
      this.$router.push("/" + path)
    }
  }
}
</script>

<style scoped lang="scss">
.icon{
    margin-right: 5px;
  }
</style>