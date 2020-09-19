/*
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:52:31
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-19 17:23:12
 */ 
import { login, logout, getUserInfo } from '@/api/manage'
import { getToken, setToken, removeToken, setUserId, getUserId } from '@/utils/auth'
import md5 from 'js-md5';

const user = {
  state: {
    token: getToken(),
    userInfo:'',         //用户信息
    roles: []
  },
  getters: {
    
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = md5(userInfo.password);          //md5加密后的密码
      return new Promise((resolve, reject) => {
        login({
          loginName:username,
          loginPass: userInfo.password,                  //未加密的密码
          service:'adminSys',
        }).then(response => {
          const tokenStr = response.data.token;
          const userId = response.data.userInfo.userId
          setToken(tokenStr)                                 //本地缓存token
          setUserId(userId)
          // sessionStorage.setItem("userId", response.data.userInfo.userId);   //本地保存用户id
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // let userId = sessionStorage.getItem("userId")
        let userId = getUserId();              //cookie中获取userId
        getUserInfo({userId}).then(response => {
          const data = response.data
          // if (data.roles && data.roles.length > 0) {    // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          commit('SET_ROLES', ['admin'])
          commit('SET_USERINFO', data.detail)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
     // 登出
     LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout({}).then((res) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
