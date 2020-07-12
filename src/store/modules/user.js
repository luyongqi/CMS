/*
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:52:31
 * @LastEditors: your name
 * @LastEditTime: 2020-07-10 14:55:14
 */ 

const user = {
  state: {
    username:'',
    avatar:  '',
    roles: ['admin']
  },
  getters: {
    username(state){
       return state.username
    },
    avatar(state){
      return state.avatar
   },
  },
  mutations: {
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // loginNew(username, userInfo.password).then(response => {
        //   const tokenStr = response.data.token;
        //   setToken(tokenStr)                                   //本地缓存token
        //   commit('SET_TOKEN', tokenStr)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const response = { 
          username:'admin',
          avatar:'头像',
          roles:['admin']
        }
        commit('SET_ROLES', response.roles)
        commit('SET_NAME', response.username)
        commit('SET_AVATAR', response.avatar)
        resolve(response)
        // getInfo().then(response => {
        //   const data = response.data
        //   if (data.roles && data.roles.length > 0) {    // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   commit('SET_NAME', data.username)
        //   commit('SET_AVATAR', data.icon)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
  }
}

export default user
