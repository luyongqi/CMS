/*
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:52:13
 * @LastEditors: your name
 * @LastEditTime: 2020-07-10 15:05:57
 */ 
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app' 
import user from './modules/user'             
import menu from './modules/menu'  

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    menu
  }
})

export default store
