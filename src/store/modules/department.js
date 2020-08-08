/*
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:52:31
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-08 14:49:25
 */ 

const company = {
    state: {
       deptList:[],                //单位列表
    },
    getters: {
     
    },
    mutations: {
      SET_DEPT_LIST: (state, list) => {
        state.deptList = list
      },
    },
  
    actions: {
       
    }
  }
  
  export default company
  