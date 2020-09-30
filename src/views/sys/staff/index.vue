<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-24 09:52:44
--> 
<template>
    <div class="user-management">
        <!-- 搜索 -->
        <el-form :inline="true" ref="form" size="small" :model="listQuery" class="demo-form-inline">
            <el-form-item label="人员名称">
                <el-input v-model="listQuery.userName" placeholder="填写人员名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  size="small" type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button  size="small" type="warning" @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 标题 -->
        <el-card class="operate-container" shadow="never" >
            <div slot="header">
                <i class="iconfont iconjiaoseguanli2"></i>
                <span>人员管理</span>
                <el-button size="mini" @click="handleEdit" class="btn-add">新增</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :data="staffList" @selection-change="selectChangeFn" highlight-current-row  v-loading="isLoading" >
                    <el-table-column fixed type="selection" width="60" align="center"></el-table-column>
                    <el-table-column fixed label="序号" type="index" prop="xh" width="50"  align="center"></el-table-column>
                    <el-table-column fixed label="员工编号"  prop="userId" align="center"></el-table-column>
                    <el-table-column fixed label="员工姓名"  prop="userName" align="center"></el-table-column>
                    <el-table-column fixed="left" label="性别"  align="center">
                        <template slot-scope="scope">
                            <div>{{scope.row.sex=='0'?'男':'女'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed label="职务"  prop="jobName"  align="center"></el-table-column>
                    <el-table-column fixed label="所在部门"  prop="deptName"  align="center"></el-table-column>
                    <el-table-column fixed label="所在分组"  prop="groupName"  align="center"></el-table-column>
                    <el-table-column fixed label="创建时间"  align="center">
                        <template slot-scope="scope">{{scope.row.createdAt | formatCreateTime}}</template>
                    </el-table-column>
                    <el-table-column fixed label="更新时间" align="center">
                        <template slot-scope="scope">{{scope.row.updatedAt | formatCreateTime}}</template>
                    </el-table-column>
                    
                    <el-table-column fixed="left" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <!-- <el-button size="mini" type="text"  @click.stop="handleSetting(scope.row)">
                                设置账号密码
                            </el-button>  -->
                            <el-button size="mini" type="text"  @click.stop="handleEdit(scope.row)">
                                编辑
                            </el-button> 
                            <el-button size="mini" type="text" @click.stop="handleDel(scope.row)">
                               删除
                            </el-button> 
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 批量操作 -->
                <div class="batch-operate-container">
                    <el-select
                        size="small"
                        v-model="operateType" placeholder="批量操作">
                        <el-option
                            v-for="item in operates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button
                        style="margin-left: 20px"
                        class="search-button"
                        @click="handleBatchOperate()"
                        type="primary"
                        size="small">
                        确定
                    </el-button>
                </div>
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
        <!-- 设置账号密码弹框 -->
        <user-edit ref="userEdit" @fetchData="fetchData"></user-edit>
    </div>
</template>

<script>
import { getStaffList, getStaffInfo, delStaff } from '@/api/manage';
import Edit from "./components/StfEdit";
import UserEdit from "./components/UserEdit";
import { formatDate } from '@/utils/date'
import { getUserId } from '@/utils/auth'

export default {
    components:{ Edit,UserEdit },
    data(){
        return{  
            listQuery: {
                userName:'',                               //用户名称
                pageSize: 10,                             // 分页（每页个数）
                pageNo: 0,                                // 当前页
                status: '1',                              //  0：停用 1：正常
                order: ''                                 // 默认创建时间倒序排列
            },
            currentPage:1,
            totalNum:0,
            staffList:[],         //员工列表
            isLoading:true,
            operateType: null,                //操作
            multipleSelection: [],            //已选择的选项
            operates: [
                {
                    label: "删除",
                    value: "delete"
                },
            ],
        }
    },
    computed:{
        
    },
    filters:{
        formatCreateTime(time) {               //格式化时间
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        },
    },
    created(){
       this.fetchData();
    },
    methods:{
        // 搜索
        handleSearch() {
            this.listQuery.pageNo = 0
            this.fetchData();
        },
        // 重置搜索条件
        handleReset(){
            this.$refs["form"].resetFields();
            this.listQuery = this.$options.data().listQuery;
        },
        // 设置账号密码
        handleSetting(row){
            this.$refs["userEdit"].showEdit(row);  
        },
        // 新增、编辑
        handleEdit(row) {
            if (row.id) {
                this.$refs["edit"].showEdit(row);    
            } else {
                this.$refs["edit"].showEdit();
            }
        },
        // 删除人员
        async handleDel(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( () => {
                delStaff({
                    ids:[ row.id+'' ],               //单位id
                    userId:getUserId()                   //用户id
                }).then( (res) =>　{
                    if(res.retCode==="000000"){
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                             duration: 3000 
                        });
                        this.fetchData();     //刷新
                    }
                })  
            })  
        },
        // 批量操作
        handleBatchOperate() {
            if(this.operateType==null){
            this.$message({
                message: '请选择操作类型',
                type: 'warning',
                duration: 3000
            });
            return;
            }
            if(this.multipleSelection==null||this.multipleSelection.length<1){
            this.$message({
                message: '请选择要操作的员工',
                type: 'warning',
                duration: 3000
            });
            return;
            }
            this.$confirm('是否要进行该批量操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            let ids=[];
            for(let i=0;i<this.multipleSelection.length;i++){
                ids.push(this.multipleSelection[i].id+'');
            }

            switch (this.operateType) {
                case 'delete':
                    delStaff({
                        ids:ids,
                        userId:getUserId()
                    }).then( res => {
                        if(res.retCode==='000000'){
                            this.fetchData();
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                duration: 3000
                            });
                        } 
                    })
                break;
                default:
                break;
            }
            });
        },
        // 跳转至设备管理
        navTo(row){
            this.$router.push({path:'/sys/project',query:{row}})
        },
        //当前页码发生变化时
        handleCurrentChange(val){
            this.listQuery.pageNo = val-1;
            this.fetchData()
        },
        // 选择每页展示的条数
        handleSizeChange(val){
            this.listQuery.pageSize = val;
            this.fetchData()
        },
        //获取人员列表
        async fetchData(){
            this.isLoading = true;                        //显示Loading
            const res = await getStaffList(this.listQuery)
           
            this.totalNum = res.data.totalNum;            //总条数
            this.staffList =  res.data.list;               //员工列表                   
            this.isLoading = false;                       //隐藏loading
        }, 

        //人员详情
        async getInfo(){
            var res = await getStaffInfo({
                id: '',            //单位id
            })
        },
       
        // 选择表格
        selectChangeFn(val){
            this.multipleSelection = val;
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
   
    //批量
    .batch-operate-container{
        display: inline-block;
        margin-top: 20px;
    }
    .pagination-container {
        margin-top: 20px;
        margin-bottom:20px;
        float:right;
    }
</style>