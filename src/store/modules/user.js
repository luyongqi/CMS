/*
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:52:31
 * @LastEditors: your name
 * @LastEditTime: 2020-07-09 10:00:07
 */ 

const user = {
  state: {
    name:'',
    avatar:  '',
  },
  getters: {
    name(state){
       return state.name
    },
    avatar(state){
      return state.avatar
   },
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
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
    
  }
}

export default user
