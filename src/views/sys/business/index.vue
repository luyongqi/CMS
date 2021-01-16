<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-16 11:56:02
--> 
<template>
    <div class="user-management">
        <!-- 搜索 -->
        <el-form :inline="true" ref="form" size="small" :model="listQuery" class="demo-form-inline">
            <el-form-item label="单位名称">
                <el-input v-model="listQuery.orgName" placeholder="填写单位名称"></el-input>
            </el-form-item>
            <el-form-item label="单位编号">
                <el-input v-model="listQuery.orgId" placeholder="填写单位编号"></el-input>
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
                <span>单位管理</span>
                <el-button size="mini" @click="handleEdit" class="btn-add">新增</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :data="list" @selection-change="selectChangeFn" highlight-current-row  v-loading="isLoading" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column fixed label="单位编号"  prop="orgId" align="center"></el-table-column>
                    <el-table-column fixed label="单位名称" prop="orgName" align="center"></el-table-column>
                    <el-table-column fixed label="单位地址"  prop="address" align="center">
                        <template slot-scope="scope">
                            <span>{{`${scope.row.provinceName}${scope.row.cityName}${scope.row.regionName}`}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="状态"  align="center">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status=='0'?'danger':''">{{scope.row.status=='0'?'停用':'正常'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="left" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click.stop="handleEdit(scope.row)">
                                编辑
                            </el-button> 
                            <el-button size="mini"  @click.stop="handleForbid(scope.row)">
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
import { mapState, mapMutations } from 'vuex'
import { getCompanyList,getCompanyDetail, delCompanyInfo, isForbidCompany} from '@/api/manage';
import { treeCompany } from '@/utils/common'
import { getUserId } from '@/utils/auth'
import Edit from "./components/UntilEdit";
export default {
    components:{ Edit },
    data(){
        return{
            listQuery: {
                orgName:'',                               // 单位名称
                orgId:'',                                 // 单位编号
                pageSize: 10,                             // 分页（每页个数）
                pageNo: 0,                                // 当前页
                status: '',                               // 0：停用 1：正常
                order: ''                                 // 默认创建时间倒序排列
            },
            currentPage:1,
            list:[],                               //单位列表
            totalNum:0,
            isLoading:true
        }
    },
    computed:{
        ...mapState({
            companyList: state => state.company.companyList,              //菜单列表
            treeCompanyList: state => state.company.treeCompanyList       //菜单树  
        }),
    },
    created(){
        this.fetchAllData();
        this.fetchData();
    },
    methods:{
        ...mapMutations(['SET_SELECT_List','SET_List','SET_TREE_LIST']),
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
            if (row.id) {
                this.$refs["edit"].showEdit(row);    
            } else {
                this.$refs["edit"].selectId = '0'        //新增是初始上级单位为无上级单位
                this.$refs["edit"].showEdit();
            }
        },
        // 是否禁用
        async handleForbid(row){
            var str = row.status=='1'?'禁用':'启用'
            this.$confirm(`此操作将${str}该单位, 是否继续?`, '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( () => {
                isForbidCompany({
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
        // 获取所有单位 列表
        async fetchAllData(){
                   //显示Loading
            const res = await getCompanyList({
                status: '',                              //  0：停用 1：正常
                pageSize: 10000,                         // 分页（每页个数）
                pageNo: 0,                               // 当前页
                order: ''                                // 默认创建时间倒序排列
            })
            var selectCompanyList =  JSON.parse(JSON.stringify(res.data.list));
            selectCompanyList = treeCompany(selectCompanyList) //递归
            selectCompanyList.unshift({orgName: '无上级单位',parentOrgId:'0',orgId:'0'});
             
            this.SET_SELECT_List(selectCompanyList)       //保存选择
            this.SET_List(res.data.list)                  //保存所有单位

        }, 
        //获取单位列表
        async fetchData(){
            this.isLoading = true;                        //显示Loading
            const res = await getCompanyList(this.listQuery)
            this.list = res.data.list;
            this.totalNum = res.data.totalNum;            //总条数         
            this.isLoading = false;                       //隐藏loading
        }, 

        //单位信息详情
        async getInfo(){
            var res = await getCompanyDetail({
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
        float: right;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>