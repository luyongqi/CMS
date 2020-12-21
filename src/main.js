/*
 * @Author: 卢勇其
 * @Date: 2020-07-07 11:55:16
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-11-26 09:21:05
 */ 
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'           // global css
import store from './store'
import '@/icons'                       // svg icon

Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
