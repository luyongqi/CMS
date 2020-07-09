/*
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:52:13
 * @LastEditors: your name
 * @LastEditTime: 2020-07-09 09:56:08
 */ 
import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'             
           
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
  }
})

export default store
