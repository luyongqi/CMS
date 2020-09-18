<!--
 * @Description: 
 * @Date: 2020-09-18 11:22:15
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-18 15:07:00
-->
<template>
  <el-card class="form-container" shadow="never">
    <el-tree
      :data="menuTreeList"
      show-checkbox
      default-expand-all
      node-key="menuId"
      ref="tree"
      highlight-current
      v-loading="menuLoading"
      :props="defaultProps">
    </el-tree>
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>

  </el-card>
</template>

<script>
  import {getAllMenuList,getMenuRoleId,setMenuByRoleId} from '@/api/manage';
  import {treeList} from '@/utils/common'
  export default {
    name: "allocMenu",
    data() {
      return {
        menuTreeList: [],
        menuLoading:false,           //表格树内容是否显示加载中
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
        roleId:null
      };
    },
    created() {
      this.roleId = this.$route.query.roleId;
      this.treeList();                //获取树形结构的全部菜单
    //   this.getRoleMenu(this.roleId);
    },
    methods: {
        // 获取全部菜单并拼接成树形结构
        treeList() {
            this.menuLoading = true
            getAllMenuList().then(response => {
            this.menuTreeList = treeList(response.data);
            this.menuLoading = false
            });
        },
        // 根据角色id,获取该角色已经授权了的菜单
        getRoleMenu(roleId){
            if(!roleId) return
            getMenuRoleId({roleId}).then(response=>{
            let menuList = response.data;
            let checkedMenuIds=[];
            if(menuList!=null&&menuList.length>0){
                for(let i=0;i<menuList.length;i++){
                    let menu = menuList[i];
                    if(menu.toMenuId!=='0'){
                        checkedMenuIds.push(menu.menuId);
                    }
                }
            }
            this.$refs.tree.setCheckedKeys(checkedMenuIds);
            });
        },
        handleSave() {
            let checkedNodes = this.$refs.tree.getCheckedNodes();
            let checkedMenuIds=new Set();
            if(checkedNodes!=null&&checkedNodes.length>0){
            for(let i=0;i<checkedNodes.length;i++){
                let checkedNode = checkedNodes[i];
                checkedMenuIds.add(checkedNode.menuId);
                if(checkedNode.toMenuId!=='0'){
                checkedMenuIds.add(checkedNode.toMenuId);
                }
            }
            }
            this.$confirm('是否分配菜单？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(()=>{
            let params = new URLSearchParams();
            params.append("roleId",this.roleId);
            params.append("menuIds",Array.from(checkedMenuIds));
            setMenuByRoleId(params).then(response => {
                this.$message({
                message: '分配成功',
                type: 'success',
                duration: 1000
                });
                this.$router.back();
            })
            })
        },
        handleClear() {
            this.$refs.tree.setCheckedKeys([]);
        }
    }
  }
</script>

<style scoped>
</style>