<!--
 * @Description: 
 * @Date: 2020-09-18 11:22:15
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-23 09:52:51
-->
<template>
  <el-card class="form-container" shadow="never">
  
    <div class="menu-header">
      <span><B>角色菜单授权</B></span>
    </div>

    <el-tree 
        :data="menuData" 
        size="mini" 
        show-checkbox 
        node-key="menuId" 
        :props="defaultProps"
        style="width: 100%;pading-top:20px;"
        ref="menuTree" 
        default-expand-all
        v-loading="menuLoading" 
        element-loading-text="拼命加载中" 
        :check-strictly="true"
        @check-change="handleMenuCheckChange">
    </el-tree>

    <div style="padding-left:24px;padding-top:20px;padding-bottom:20px;">
        <el-checkbox v-model="checkAll" @change="handleCheckAll" :disabled="roleId == ''"><b>全选</b></el-checkbox>
    </div>
    <div class="bottom" >
        <el-button type="primary" size="small"  :disabled="roleId===''" :loading="authLoading" @click="submitAuthForm" >保存</el-button>
        <el-button size="small" :disabled="roleId===''" @click="resetSelection">重置</el-button>
    </div>
  </el-card>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { getAllMenuList,getMenuRoleId,setMenuByRoleId } from '@/api/manage';
  import { treeList } from '@/utils/common'
  import { getUserId } from '@/utils/auth'
  
  export default {
    name: "allocMenu",
    data() {
      return {
        checkAll: false,
        authLoading: false,
        menuLoading:false,           //表格树内容是否显示加载中
        menuAllList:[],              //所有菜单 （非tree结构）
        menuData:[],                //所有菜单  (tree结构)
        currentRoleMenuIds:[],      //当前角色授权id列表   修改菜单权限时 要发送的内容
        currentRoleMenus:[],        //当前角色已授权的菜单列表
        // menuTreeList: [],
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
        roleId:null
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.findTreeData()
     
    },
    mounted(){
        
    },
    methods: {
      // 获取所有菜单数据
      findTreeData: function () {
          this.menuLoading = true
          getAllMenuList().then(res => {        //获取所有菜单
              this.menuAllList = res.data;  
              this.menuData = treeList(res.data)
              this.menuLoading = false;
              this.handleRoleSelectChange(this.roleId);
          }).catch(function(err) {

          })	
      },
      //根据角色获取菜单
      handleRoleSelectChange(roleId) {
          if(!roleId) {
              return
          }
          getMenuRoleId({        //根据角色获取菜单
              roleId
          }).then(res=>{ 
              let arr = res.data;    
              this.currentRoleMenuIds = arr;
              
              //根据menuIds数组 初始化菜单授权列表
              let currentRoleMenus =  [];      
              this.menuAllList.forEach( item => {
                  arr.forEach( p => {
                      if(item.menuId === p ){
                          currentRoleMenus.push(item)
                      }
                  })
              })
              this.currentRoleMenus = currentRoleMenus;
              this.$refs.menuTree.setCheckedNodes(currentRoleMenus)                  
          })
      },
      // 树节点选择监听
      handleMenuCheckChange(data, check, subCheck) {
          if(check) {
              // 节点选中时同步选中父节点
              let toMenuId = data.toMenuId
              this.$refs.menuTree.setChecked(toMenuId, true, false)
          } else {
              // 节点取消选中时同步取消选中子节点
              if(data.children != null) {
                  data.children.forEach(element => {
                      this.$refs.menuTree.setChecked(element.menuId, false, false)
                  });
              }
          }
      },
      // 重置选择
      resetSelection() {
          this.checkAll = false
          this.$refs.menuTree.setCheckedNodes(this.currentRoleMenus)
      },
      // 全选操作
      handleCheckAll() {
          if(this.checkAll) {
              let allMenus = []
              this.checkAllMenu(this.menuData, allMenus)
              this.$refs.menuTree.setCheckedNodes(allMenus)
          } else {
              this.$refs.menuTree.setCheckedNodes([])
          }
      },
      // 递归全选
      checkAllMenu(menuData, allMenus) {
          menuData.forEach(menu => {
              allMenus.push(menu)
              if(menu.children) {
                  this.checkAllMenu(menu.children, allMenus)
              }
          });
      },
      // 角色菜单授权提交
      submitAuthForm() {
          let that = this
          let roleId = this.roleId;
          // if('admin' == this.selectRole.name) {
          //     this.$message({message: '超级管理员拥有所有菜单权限，不允许修改！', type: 'error'})
          //     return
          // }
        
          this.authLoading = true
          let checkedNodes = this.$refs.menuTree.getCheckedNodes(false, true)
          let roleMenuIds = []       //要发送的角色授权菜单id列表  
          
          for(let i=0, len=checkedNodes.length; i<len; i++) {
              roleMenuIds.push(checkedNodes[i].menuId)
          }
          if(roleMenuIds.length==0){
             this.$message({message: '请选择要授权的菜单！', type: 'error'}) 
             this.authLoading = false; 
             return
          }
          // 提交授权菜单
          setMenuByRoleId({
              roleId,
              menuIds:roleMenuIds
          }).then(res=>{
                if(res.retCode=="000000"){
                    this.$confirm('菜单分配成功，是否要返回上一页?', '提示', {
                        confirmButtonText: '返回',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // window.location.reload()      //重新加载页面
                        this.$router.back(-1)
                    })
                }else{
                    this.$message({ message:'角色授权失败',type:'error',duration:3000})
                }
                this.authLoading = false 
          })
      },
          
    }
  }
</script>

<style scoped lang="scss">
  .form-container{
   
    .menu-header {
        padding-left: 8px;
        padding-bottom: 15px;
        text-align: left;
        font-size: 16px;
        color: rgb(20, 89, 121);   
    }
    .bottom{
      padding-right:15px;
      text-align: center;
      padding-bottom:20px;
    }
  }
    
</style>