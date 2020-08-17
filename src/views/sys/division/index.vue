<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-15 11:56:32
--> 
<template>
    <div class="user-management">
        <!-- 标题 -->
        <el-card class="operate-container" shadow="never" >
            <div slot="header">
                <i class="iconfont iconjiaoseguanli2"></i>
                <span>部门管理</span>
                <el-button size="mini" @click="handleEdit" class="btn-add">新增</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :data="deptList" @selection-change="selectChangeFn" highlight-current-row  v-loading="isLoading" >
                    <el-table-column fixed label="序号" type="index" width="50" prop="xh" align="center"></el-table-column>
                    <el-table-column fixed label="部门编号"  prop="deptId" align="center"></el-table-column>
                    <el-table-column fixed label="部门名称"  prop="deptName"  align="center"></el-table-column>
                    <el-table-column fixed label="操作人"  prop="updatedUser"  align="center"></el-table-column>
                    <el-table-column fixed label="创建时间"  prop="createdAt" align="center"></el-table-column>
                    <el-table-column fixed label="更新时间"  prop="updatedAt" align="center"></el-table-column>
                    <el-table-column fixed="left" label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag>{{scope.row.status=='0'?'停用':'正常'}}</el-tag>
                        </template>
                    </el-table-column>
                   
                    <el-table-column fixed="left" label="操作" width="250" align="center">
                        <template slot-scope="scope">
                            <el-button   size="mini" @click.stop="navTo(scope.row)">
                                添加设备
                            </el-button> 
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
import { getDeptList, getDeptInfo, delDept } from '@/api/manage';
import Edit from "./components/DepEdit";
import { formatDate } from '@/utils/date'
export default {
    components:{ Edit },
    data(){
        return{
            pageSize:10,
            pageNo:0,
            currentPage:1,
            totalNum:0,
            deptList:[],         //部门列表
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
                delDept({
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
        // 跳转至设备管理
        navTo(row){
            this.$router.push({path:'/sys/facility',query:{row}})
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
            const res = await getDeptList({
                status: '1',                              //  0：停用 1：正常
                pageSize: this.pageSize,                  // 分页（每页个数）
                pageNo: this.pageNo,                      // 当前页
                order: ''                                 // 默认创建时间倒序排列
            })
           
            this.totalNum = res.data.totalNum;            //总条数
            this.deptList =  res.data.list;               //部门列表   
            this.deptList.forEach( item => {
                item.createdAt = formatDate(new Date(Number(item.createdAt)), "yyyy-MM-dd hh:mm");
                item.updatedAt = formatDate(new Date(Number(item.updatedAt)), "yyyy-MM-dd hh:mm");
            });                
            this.isLoading = false;                       //隐藏loading
        }, 

        //部门信息详情
        async getInfo(){
            var res = await getDeptInfo({
                id: '',            //单位id
            })
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