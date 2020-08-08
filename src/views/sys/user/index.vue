<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-07 09:12:48
--> 
<template>
    <div class="user-management">
        <el-card class="operate-container" shadow="never" >
            <div slot="header">
                <i class="iconfont iconjiaoseguanli2"></i>
                <span>用户管理</span>
                <el-button size="mini" @click="handleEdit" class="btn-add">新增</el-button>
            </div>
            <el-table
            v-loading="listLoading"
            border  
            fit
            :data="list"
            :element-loading-text="elementLoadingText"
            @selection-change="setSelectRows"
            >
                <el-table-column show-overflow-tooltip type="selection"></el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        prop="id"
                        label="id"
                    ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="username"
                    label="用户名"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="email"
                    label="邮箱"
                ></el-table-column>

                <el-table-column show-overflow-tooltip label="权限">
                    <template v-slot="{ row }">
                    <el-tag v-for="(item, index) in row.permissions" :key="index">
                        {{ item }}
                    </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    show-overflow-tooltip
                    prop="datatime"
                    label="修改时间"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    fixed="right"
                    label="操作"
                    width="200"
                >
                    <template v-slot="scope">
                    <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="handleDelete(scope.row)">
                        删除
                    </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination-container">
                <el-pagination
                background
                :current-page="queryForm.pageNo"
                :page-size="queryForm.pageSize"
                :layout="layout"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
            
        </el-card>

        <!-- 新增、编辑弹框 -->
        <edit ref="edit" @fetchData="fetchData"></edit>
    </div>
</template>

<script>
import { getUserList, delUser } from "@/api/manage";
import Edit from "./components/UserEdit";

export default {
    components:{ Edit },
    data(){
        return{
            list: null,
            listLoading: true,
            layout: "total, sizes, prev, pager, next, jumper",
            total: 0,
            selectRows: "",
            elementLoadingText: "正在加载...",
            queryForm: {
                pageNo: 1,
                pageSize: 10,
                username: "",
            },
        }
    },
    created() {
      this.fetchData();
    },
    methods:{
        // 获取某一行的值
        setSelectRows(val) {
            this.selectRows = val;
        },
        // 新增、编辑
        handleEdit(row) {
            if (row.id) {
            this.$refs["edit"].showEdit(row);
            } else {
            this.$refs["edit"].showEdit();
            }
        },
        //删除某行数据    
        handleDelete(row) {
            if (row.id) {
                this.$baseConfirm("你确定要删除当前项吗", null, async () => {
                    const { msg } = await delUser({ ids: row.id });
                    this.$baseMessage(msg, "success");
                    this.fetchData();
                });
            } else {
                if (this.selectRows.length > 0) {
                    const ids = this.selectRows.map((item) => item.id).join();
                    this.$baseConfirm("你确定要删除选中项吗", null, async () => {
                    const { msg } = await delUser({ ids });
                    this.$baseMessage(msg, "success");
                    this.fetchData();
                    });
                } else {
                    this.$baseMessage("未选中任何行", "error");
                    return false;
                }
            }
        },
        handleSizeChange(val) {
            this.queryForm.pageSize = val;
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.queryForm.pageNo = val;
            this.fetchData();
        },
        queryData() {
            this.queryForm.pageNo = 1;
            this.fetchData();
        },
        async fetchData() {
            this.listLoading = true;
            const { data } = await getUserList(this.queryForm);
            this.list = data.list;
            this.total = data.totalNum;
            setTimeout(() => {
                this.listLoading = false;
            }, 300);
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