<!--
 * @Author: 卢勇其
 * @Date: 2020-07-10 09:54:14
 * @LastEditors: your name
 * @LastEditTime: 2020-07-25 09:09:46
--> 
<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  }
}
</script>
