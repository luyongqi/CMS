<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-23 10:12:33
--> 
<template>
    <div class="user-management">
        <!-- 搜索 -->
        <el-form :inline="true" ref="form" size="small" :model="listQuery" class="demo-form-inline">
            <el-form-item label="工单名称">
                <el-input v-model="listQuery.workName" placeholder="填写工单名称"></el-input>
            </el-form-item>
            <el-form-item label="工作负责人">
                <el-input v-model="listQuery.workManager" placeholder="填写工作负责人"></el-input>
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
                <span>工单管理</span>
                <el-button size="mini" @click="handleEdit" class="btn-add">新增</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :data="orderList" @selection-change="handleSelectionChange" highlight-current-row  v-loading="isLoading" >
                    <el-table-column fixed type="selection" width="60" align="center"></el-table-column>
                    <el-table-column fixed label="序号" type="index" prop="xh" width="50"  align="center"></el-table-column>
                    <el-table-column fixed label="工单编号"  prop="workId" align="center"></el-table-column>
                    <el-table-column fixed label="工单名称"  prop="workName" align="center"></el-table-column>
                    <el-table-column fixed label="负责人"  prop="workManagerName" align="center"></el-table-column>
            
                    <el-table-column fixed label="操作者"  prop="createdUser"  align="center"></el-table-column>
                    <el-table-column fixed label="工作说明"  prop="workNote"  align="center"></el-table-column>
                    <el-table-column fixed label="更新时间"  align="center">
                        <template slot-scope="scope">{{scope.row.updatedAt | formatCreateTime}}</template>
                    </el-table-column>
                    <el-table-column fixed="left" label="审核状态"  align="center">
                        <template slot-scope="scope">
                            <el-tag 
                                :type="scope.row.status=='0'?'':scope.row.status=='1'?'warning':scope.row.status=='2'||scope.row.status=='4'||scope.row.status=='9'?'danger':scope.row.status=='3'?'success':''" 
                                disable-transitions
                            >{{scope.row.status | verifyStatusFilter}}</el-tag>
                            <!-- <p>
                                <el-button type="text" @click="handleShowVerifyDetail(scope.$index, scope.row)">
                                    审核详情
                                </el-button>
                            </p> -->
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click.stop="navToDetail(scope.row)">
                                详情
                            </el-button> 
                            <el-button  size="text" :disabled="scope.row.status=='0'||scope.row.status=='2'||scope.row.status=='4'?false:true"  @click.stop="handleEdit(scope.row)">
                                编辑
                            </el-button> 
                            <el-button  size="text" :disabled="scope.row.status=='9'" @click.stop="handleDel(scope.row)">
                                删除
                            </el-button> 
                            <el-button  size="text"  @click.stop="handleCopy(scope.row)">
                                复制
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
                    :page-sizes="[5,10,20,25]" 
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
import { getWorkList, getWorkInfo, delWork } from '@/api/manage';
import Edit from "./components/OrdEdit";
import { formatDate } from '@/utils/date'
import { getUserId } from '@/utils/auth'
export default {
    components:{ Edit },
    data(){
        return{
            listQuery: {
                type:'',                                  //用户类型（1.工单创建者 2.工单审批者 3，工单批准者 缺省查看所有数据）
                status: '',                               //  审核状态( 0 未审核 1 审核通过 2拒绝 3二级审核通过 4 二级审核拒绝 )
                pageSize: 10,                             // 分页（每页个数）
                pageNo: 0,                                // 当前页
                order: '',                                // 默认创建时间倒序排列
                workName:'',                              //工作名称
                workManager:'',                           //工作负责人
                order:''                                  //排序
            },
            currentPage:1,
            totalNum:0,
            orderList:[],                     //部门列表
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
     filters: {
        formatCreateTime(time) {               //格式化时间
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        },
        verifyStatusFilter(value) {          //格式化审核状态
            if (value === '0') {
            return '未审核';
            } else if(value === '1'){
            return '待二次审核';
            } else if(value === '2'){
            return '一审未通过';
            } else if(value === '3'){
            return '审核通过';
            } else if(value === '4'){
            return '审核未通过';
            }else if(value === '9'){
            return '工单失效';
            }
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
        // 新增、编辑
        handleEdit(row) {
            if (row.id) {       //有row时为编辑状态
                this.$refs["edit"].showEdit(row);    
            } else {
                this.$refs["edit"].showEdit();
            }
        },
        // 复制
        handleCopy(row){
            row.id = '' 
            this.$refs["edit"].showEdit(row); 
        },
        // 删除
        async handleDel(row){
            const res = await delWork({
                ids:[row.id+''],
                userId:getUserId()
            })
            if(res.retCode === '000000'){
                this.fetchData();
                this.$message({
                    type:"success",
                    message:'删除成功',
                    duration: 3000
                })
            }
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
                message: '请选择要操作的工单',
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
                    delWork({
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
            this.$router.push({ path:'/sys/orderDetail', query:{id:row.id} })
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
            this.isLoading = true;                          //显示Loading
            const res = await getWorkList(this.listQuery)   //查询列表
            this.totalNum = res.data.totalNum;              //总条数
            this.orderList =  res.data.list;                //部门列表   
            this.orderList.forEach( item => {  
                item.workUsers = item.workUsers.split(';')
            });                
            this.isLoading = false;                         //隐藏loading
        }, 
        
        // 选择表格
        handleSelectionChange(val) {
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