<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: your name
 * @LastEditTime: 2020-07-31 16:58:45
--> 
<template>
    <div class="role-management">
        <!-- 标题 -->
        <el-card class="operate-container" shadow="never" >
            <div slot="header">
                <i class="iconfont iconjiaoseguanli2"></i>
                <span>角色管理</span>
                <el-button size="mini" @click="addFn" class="btn-add">新增</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :header-cell-style="{fontWeight:'bold',color:'#474747'}" :data="role.roleList" @selection-change="selectChangeFn" @current-change="handleLine" highlight-current-row  v-loading="role.roleListLoading">
                    <el-table-column fixed label="角色名称" width="200" prop="code" align="center"></el-table-column>
                    <el-table-column fixed label="角色标志"  prop="roleType" width="200" align="center"></el-table-column>
                    <el-table-column fixed label="备注"  prop="descripe"></el-table-column>
                    <el-table-column fixed label="更新者"  prop="updateUser"></el-table-column>
                    <el-table-column fixed label="更新时间"  prop="updateTime"></el-table-column>
                    <el-table-column fixed="left" label="操作" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click.stop="editRowFn(0,scope.row)">
                                <i class="iconfont iconbianji"></i> 编辑
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
                    :page-sizes="resetArr" 
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum">
                    </el-pagination>
                </div>
            </div>
        </el-card>
        <!--编辑弹框-->
        <el-dialog
        title="新增角色"
        :visible.sync="dialogVisible" width="30%">
        <el-form :model="dictionaryKey" ref="reasonForm" label-width="150px">
            <el-form-item label="角色名称：">
            <el-input v-model="dictionaryKey.dictKeyName" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="角色标志">
            <el-input v-model="dictionaryKey.dictKeyDesc" class="input-width"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageSize:5,
            pageNo:0,
            currentPage:1,
            totalNum:0,
            resetArr:[],
            role:{},
            dialogVisible:false,            //是否显示弹框 
            dictionaryKey:{}
        }
    },
    methods:{
        // 新增
        addFn(){
            this.dialogVisible=true;
        },
        // 确定新增
        handleConfirm(){
            
        },
         //选择某一项
        selectChangeFn(data){
     
        },
        //点击某一行触发 
        handleLine(row) {
           
        },
        //修改某一项
        editRowFn(type,data){
           
        },
        handleSizeChange(val) {
            
        },
        handleCurrentChange(val) {
           
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