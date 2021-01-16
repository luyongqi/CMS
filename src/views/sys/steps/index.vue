<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-15 18:38:49
--> 
<template>
    <div class="user-management">
        <!-- 搜索 -->
        <el-form :inline="true" ref="form" size="small" :model="listQuery" class="demo-form-inline">
            <el-form-item label="步骤名称">
                <el-input v-model="listQuery.stepName" placeholder="填写步骤名称"></el-input>
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
                <span>步骤管理</span>
                <el-button size="mini" @click="handleEdit" class="btn-add">新增</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :data="stepList" @selection-change="selectChangeFn" highlight-current-row  v-loading="isLoading" >
                     <el-table-column fixed type="selection" width="60" align="center"></el-table-column>
                    <el-table-column fixed label="序号" type="index" prop="xh" width="50"  align="center"></el-table-column>
                    <el-table-column fixed label="步骤id"  prop="stepId" align="center"></el-table-column>
                    <el-table-column fixed label="步骤名称"  prop="stepName" align="center"></el-table-column>
                    <el-table-column fixed label="所属设备"  prop="deviceName" align="center"></el-table-column>
                    <el-table-column fixed label="所属项目"  prop="itemName" align="center"></el-table-column>
                    <el-table-column fixed label="步骤内容"  prop="stepContent" align="center"></el-table-column>
                    <el-table-column fixed label="输入框类型"   align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.stepInputType | formStepType }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed label="操作人"  prop="updatedUser"  align="center"></el-table-column>
                    <!-- <el-table-column fixed label="创建时间"  prop="createdAt" align="center"></el-table-column> -->
                    <el-table-column fixed label="更新时间"  prop="updatedAt" align="center"></el-table-column>
                    <el-table-column fixed="left" label="状态"  align="center">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status=='0'?'danger':''">{{scope.row.status=='0'?'停用':'正常'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="操作" width="160" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" @click.stop="handleEdit(scope.row)">
                                编辑
                            </el-button> 
                            <el-button size="mini"  @click.stop="handleForbid(scope.row)">
                                {{scope.row.status=='0'?'启用':'禁用'}}
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
       
    </div>
</template>

<script>
import { getStepList, getStepInfo, delStep, isForbidStep } from '@/api/manage';
import Edit from "./components/StaEdit";
import { formatDate } from '@/utils/date'
import { getUserId } from '@/utils/auth'
export default {
    components:{ Edit },
    data(){
        return{
            listQuery: {
                stepName:'',                               //步骤名称
                pageSize: 10,                             // 分页（每页个数）
                pageNo: 0,                                // 当前页
                status: '',                              //  0：停用 1：正常
                order: ''                                 // 默认创建时间倒序排列
            },
            operateType: null,                //操作
            multipleSelection: [],            //已选择的选项
            operates: [
                {
                    label: "删除",
                    value: "delete"
                },
            ],
            currentPage:1,
            totalNum:0,
            stepList:[],         //部门列表
            isLoading:true
        }
    },
    computed:{
        
    },
    created(){
       this.fetchData();
    },
    // 过滤器
    filters: {
        formStepType(type) {
            return type=='1'?'文本框':type=='2'?'数值框':type=='5'?'单选框':type=='7'?'多选框':type=='9'?'文件/图片':'';
        }
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
        // 新增、编辑
        handleEdit(row) {
            if (row.id) {       //有row时为编辑状态
                this.$refs["edit"].showEdit(row);    
            } else {
                this.$refs["edit"].showEdit();
            }
        },
        // 删除步骤
        async handleDel(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( () => {
                delStep({
                    ids:[ row.id+'' ],               //单位id
                    userId:getUserId()                   //用户id
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
        // 是否禁用
        async handleForbid(row){
            var str = row.status=='1'?'禁用':'启用'
            this.$confirm(`此操作将${str}该步骤, 是否继续?`, '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( () => {
                isForbidStep({
                    id:row.id,               //单位id
                    status:row.status=='1'?'0':'1',       //0-停用 1-正常
                    userId:getUserId()                   //用户id
                }).then( (res) =>　{
                    if(res.retCode==="000000"){
                        this.$message({
                            type: 'success',
                            message: `${str}成功!`
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
                    message: '请选择要操作的步骤',
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
                        delStep({
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
        // 跳转至详情页
        navToDetail(row){
            this.$router.push({ path:'/sys/steps/stepDetail', query:{row} })
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
        //获取部门列表
        async fetchData(){
            this.isLoading = true;                        //显示Loading
            const res = await getStepList(this.listQuery)
           
            this.totalNum = res.data.totalNum;            //总条数
            this.stepList =  res.data.list;               //部门列表   
            this.stepList.forEach( item => {
                item.createdAt = formatDate(new Date(Number(item.createdAt)), "yyyy-MM-dd hh:mm");
                item.updatedAt = formatDate(new Date(Number(item.updatedAt)), "yyyy-MM-dd hh:mm");
            });                
            this.isLoading = false;                       //隐藏loading
        }, 

        //部门信息详情
        async getInfo(){
            var res = await getStepInfo({
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