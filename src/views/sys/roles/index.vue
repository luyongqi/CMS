<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-12 14:18:25
--> 
<template>
    <div class="user-management">
        <!-- 标题 -->
        <el-card class="operate-container" shadow="never" >
            <div slot="header">
                <i class="iconfont iconjiaoseguanli2"></i>
                <span>角色管理</span>
                <el-button size="mini" @click="handleEdit" class="btn-add">新增</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :data="RolList" @selection-change="selectChangeFn" highlight-current-row  v-loading="isLoading" >
                    <el-table-column fixed label="序号" type="index" prop="xh" width="50"  align="center"></el-table-column>
                    <el-table-column fixed label="角色编号" width="200" prop="roleId" align="center"></el-table-column>
                    <el-table-column fixed label="角色名称"  prop="roleName" align="center"></el-table-column>
                    <el-table-column fixed label="角色编码"  prop="roleCode" align="center"></el-table-column>
                    <el-table-column fixed label="角色类型"  prop="roleType" align="center"></el-table-column>
                    <el-table-column fixed label="操作人"  prop="updatedUser" align="center"></el-table-column>
                    <el-table-column fixed label="创建时间"  prop="createdAt" align="center"></el-table-column>
                    <el-table-column fixed label="更新时间"  prop="updatedAt" align="center"></el-table-column>
                    
                    <el-table-column fixed="left" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click.stop="handleEdit(scope.row)">
                                编辑
                            </el-button> 
                            <el-button size="mini" disabled @click.stop="handleDel(scope.row)">
                                {{scope.row.status=='0'?'启用':'禁用'}}
                            </el-button> 
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination-container">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,15,20,25]" 
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
                    </el-pagination>
                </div>
            </div>
        </el-card>
       
        <!-- 新增、编辑弹框 -->
        <edit ref="edit" @fetchData="fetchData"></edit>
       
    </div>
</template>

<script>
import { getAllRoleList, addRole } from '@/api/manage';
import Edit from "./components/RolEdit";
import { formatDate } from '@/utils/date'
export default {
    components:{ Edit },
    data(){
        return{
            pageSize:10,
            pageNo:0,
            currentPage:1,
            totalNum:0,
            RolList:[],          //分组列表
            isLoading:true
        }
    },
    computed:{
        
    },
    created(){
       this.fetchData();
    },
    methods:{
    
        // 新增、编辑
        handleEdit(row) {
            if (row.id) {
                this.$refs["edit"].showEdit(row);    
            } else {
                this.$refs["edit"].showEdit();
            }
        },
        // 删除单位
        async handleDel(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( () => {
                addRole({
                    ids:[ row.id+'' ],               //单位id
                    userId:'admin'                   //用户id
                }).then( (res) =>　{
                    if(res.retCode==="000000"){
                        this.$message({
                            type: 'success',
                            message: '删除成功!' 
                        });
                        this.fetchData();     //刷新
                    }
                })  
            })  
        },
     
        //当前页码发生变化时
        handleCurrentChange(val){
            this.pageNo = val-1;
            this.fetchData()
        },
        // 选择每页展示的条数
        handleSizeChange(val){
            this.pageSize = val;
            this.fetchData()
        },
        //获取部门列表
        async fetchData(){
            this.isLoading = true;                        //显示Loading
            const res = await getAllRoleList({
                status: '1',                              //  0：停用 1：正常
                pageSize: this.pageSize,                  // 分页（每页个数）
                pageNo: this.pageNo,                      // 当前页
                order: ''                                 // 默认创建时间倒序排列
            })
           
            this.totalNum = res.data.totalNum;            //总条数
            this.RolList =  res.data.list;               //分组列表   
            this.RolList.forEach( item => {
                item.createdAt = formatDate(new Date(Number(item.createdAt)), "yyyy-MM-dd hh:mm");
                item.updatedAt = formatDate(new Date(Number(item.updatedAt)), "yyyy-MM-dd hh:mm");
            });                
            this.isLoading = false;                       //隐藏loading
        }, 

        // 选择表格
        selectChangeFn(){

        },
        
    }
}
</script>

<style scoped lang="scss">
    .iconbianji{
      font-size: 12px;
      margin-right: 10px;
    }
    .btn-add{
        position: absolute;
        right: 20px;
        top:15px;
    }
    .iconjiaoseguanli2{
        margin-right: 0;
    }
    .operate-container{
        position: relative;
        margin-bottom: 20px;
    }
   
    .pagination-container {
        margin-top: 20px;
    }
</style>