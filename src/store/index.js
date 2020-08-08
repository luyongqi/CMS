/*
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:52:13
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-08 14:48:00
 */ 
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app' 
import user from './modules/user'             
import menu from './modules/menu'  
import company from './modules/company'
import department from './modules/department'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    menu,
    company,               //单位
    department,            //部门
  }
})

export default store
