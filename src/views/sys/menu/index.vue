<!--
 * @Author: 卢勇其
 * @Date: 2020-07-13 16:24:29
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-15 17:06:05
--> 
<template>
    <div class="user-management">
        <!-- 标题 -->
        <el-card class="operate-container" shadow="never" >
            <div slot="header">
                <i class="iconfont iconjiaoseguanli2"></i>
                <span>菜单管理</span>
                <el-button size="mini" @click="handleEdit" class="btn-add">新增</el-button>
            </div>
            <div>
                <!-- 表格 -->
                <el-table border  fit :data="options" @selection-change="selectChangeFn" highlight-current-row row-key="menuId"  v-loading="isLoading" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <!-- <el-table-column fixed label="菜单编号"  prop="menuId" align="center"></el-table-column> -->
                    <el-table-column fixed label="菜单名称"  prop="menuName"  ></el-table-column>
                    <el-table-column fixed label="菜单路径"  prop="menuSrc" align="center"></el-table-column>
                     <el-table-column fixed label="菜单图标"  prop="menuIcon" align="center"></el-table-column>
                   <el-table-column fixed label="菜单类型"  prop="menuType" align="center"></el-table-column>
                    <el-table-column fixed="left" label="操作"  align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click.stop="handleEdit(scope.row)">
                                编辑
                            </el-button> 
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
       
        <!-- 新增、编辑弹框 -->
        <edit ref="edit" @fetchData="fetchData"></edit>
       
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getAllMenuList } from '@/api/manage';
import { treeList } from '@/utils/common'
import Edit from "./components/MenuEdit";
import { getUserId } from '@/utils/auth'
export default {
    components:{ Edit },
    data(){
        return{
            pageSize:1000,
            pageNo:0,
            currentPage:1,
            totalNum:0,
            isLoading:true,
            allMenuList:[]        //当前显示的菜单
        }
    },
    computed:{
        ...mapState({
            menuList: state => state.menu.menuList,               //全部菜单列表
            treeCompanyList: state => state.menu.treeCompanyList,       //菜单树 
        }),
        options(){
            if(this.menuList.length>0){
                //任何用到此数据的地方都需要判断 因为此数据是异步获取的
                let list=JSON.parse(JSON.stringify(this.allMenuList))
                list.forEach(item => {
                    item.value=item.menuId;      //适配value值;
                    item.label=item.menuName;    //适配label值;
                });
                list = treeList(list) //递归排序算法
                // this.SET_TREE_MENU(list)
                return list
            }
        }
    },
    created(){
       this.fetchData();
    },
    methods:{
        ...mapMutations(['SET_All_MENU','SET_TREE_MENU','SET_SELECT_TREE_MENU']),

        // 新增、编辑
        handleEdit(row) {
            if (row.menuId) {
                this.$refs["edit"].showEdit(row);    
            } else {
                this.$refs["edit"].selectId = ''        //新增是初始上级单位为无上级单位
                this.$refs["edit"].showEdit();
            }
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
        //获取所有菜单
        async fetchData(){
            this.isLoading = true;                            //显示Loading
            const res = await getAllMenuList({ })
            var selectMenuList =  JSON.parse(JSON.stringify(res.data));
            selectMenuList = treeList(selectMenuList)         //递归
            selectMenuList.unshift({menuName: '无上级菜单',toMenuId:'0',menuId:'0'});
            this.totalNum = res.data.totalNum;                //总条数

            this.SET_SELECT_TREE_MENU(selectMenuList)         //保存选择菜单
            // this.SET_All_MENU(res.data)                      //保存所有菜单
            this.allMenuList = res.data
            this.isLoading = false;                           //隐藏loading
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