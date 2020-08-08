/*
 * @Author: 卢勇其
 * @Date: 2020-07-09 09:52:31
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-07 17:46:23
 */ 

const company = {
    state: {
       companyList:[],                //单位列表
       selectCompanyList:[],          //选择单位列表
       treeCompanyList:[],            //单位列表树结构
    },
    getters: {
     
    },
    mutations: {
      SET_List: (state, list) => {
        state.companyList = list
      },
      SET_SELECT_List: (state, list) => {
        state.selectCompanyList = list
      },
      SET_TREE_LIST(state, list){
         state.treeCompanyList = list
      }
    },
  
    actions: {
       
    }
  }
  
  export default company
  