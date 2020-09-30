<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-28 10:29:50
--> 
<template>
    <div class="user-management">
        <!-- 标题 -->
        <el-card class="operate-container" shadow="never" >
            <div slot="header">
                <i class="iconfont iconjiaoseguanli2"></i>
                <span>工单数据列表</span>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :data="orderList"  highlight-current-row  v-loading="isLoading" >
                    <el-table-column fixed label="序号" type="index" prop="xh" width="50"  align="center"></el-table-column>
                    <el-table-column fixed label="工单编号"  prop="workId" align="center"></el-table-column>
                    <el-table-column fixed label="工单名称"  prop="workName" align="center"></el-table-column>
                    <el-table-column fixed label="工单负责人"  prop="workManagerName" align="center"></el-table-column>
                    <el-table-column fixed label="工作成员"  prop="workUserNames" align="center"></el-table-column>
                    <el-table-column fixed="left" label="数据审核状态"  align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.dataStatus | verifyStatusFilter}}</p>
                        </template>
                    </el-table-column>
                     <el-table-column fixed label="申请时间"  prop="updatedAt" align="center"></el-table-column>
                     <!-- <el-table-column fixed label="处理时间"  prop="auditedAt" align="center"></el-table-column> -->
                    <el-table-column fixed="left" label="操作"  align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" :disabled="scope.row.dataStatus==''" @click.stop="navToDetail(scope.row)">
                                查看详情
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
    
    </div>
</template>

<script>
import { getWorkDataList,getWorkDataInfo } from '@/api/manage';
import { formatDate } from '@/utils/date'
import { getUserId } from '@/utils/auth'

export default {
    data(){
        return{
            listQuery: {
                type: '',                                 // 用户类型（2.工单数据审批者 3，工单数据批准者 缺省查看所有数据）
                dataStatus:'',                            //工单数据审核状态( 0待审 1 审核通过 2拒绝 3二级审核通过 4 二级审核拒绝 8部分数据上传)
                pageSize: 10,                             // 分页（每页个数）
                pageNo: 0,                                // 当前页
                order: ''                                 // 默认创建时间倒序排列
            },
            currentPage:1,
            totalNum:0,
            orderList:[],                     //工单列表
            isLoading:true,
        }
    },
    computed:{
        
    },
    filters: {
      verifyStatusFilter(value) {
        if (value === '0') {
          return '未审核';
        } else if(value === '1'){
          return '待二次审核';
        } else if(value === '2'){
          return '一审未通过';
        } else if(value === '3'){
          return '二审通过';
        } else if(value === '4'){
          return '二审未通过';
        }else{
            return 'N/A'
        }
      }
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
        // 跳转至详情页
        navToDetail(row){
            this.$router.push({ path:'/sys/orderDataDetail', query:{id:row.id} })
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
            this.isLoading = true;                        // 显示Loading
            this.listQuery.userId = getUserId();              // 用户id
            const res = await getWorkDataList(this.listQuery)
           
            this.totalNum = res.data.totalNum;             //总条数
            this.orderList =  res.data.list;               //部门列表   
            this.orderList.forEach( item => {
                item.createdAt = formatDate(new Date(Number(item.createdAt)), "yyyy-MM-dd hh:mm");
                item.updatedAt = formatDate(new Date(Number(item.updatedAt)), "yyyy-MM-dd hh:mm");
                item.auditedAt = item.auditedAt?formatDate(new Date(Number(item.auditedAt)), "yyyy-MM-dd hh:mm"):'N/A'
                item.workDeviceIds = item.workDeviceIds.split(';')
                item.workUsers = item.workUsers.split(';')
            });                
            this.isLoading = false;                       //隐藏loading
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