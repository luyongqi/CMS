<!--
 * @Description: 
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-12-30 13:53:39
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="menuName">
            <el-input
            v-model.trim="form.menuName"
            autocomplete="off"
            maxlength="10"
            show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item prop="toMenuId" label="上级菜单" >
            <el-cascader v-model="selectId" :options="selectTreeMenuList" :props="{checkStrictly: true,value:'menuId',label:'menuName'}" filterable clearable @change="changeFn">
                <template slot-scope="{data}">
                    <span>{{ data.menuName }}</span>
                </template>
            </el-cascader>
        </el-form-item>
        <el-form-item label="菜单路径" prop="menuSrc">
            <el-input
            v-model.trim="form.menuSrc"
            autocomplete="off"
            maxlength="100"
            show-word-limit
            ></el-input>
        </el-form-item>
        <!-- <el-form-item label="子页面" prop="subpage">
            <el-input
            v-model.trim="form.subpage"
            autocomplete="off"
            maxlength="100"
            show-word-limit
            ></el-input>
        </el-form-item> -->
        <el-form-item label="菜单图标" prop="menuIcon">
            <el-input
            v-model.trim="form.menuIcon"
            autocomplete="off"
            maxlength="100"
            show-word-limit
            ></el-input>
        </el-form-item>
        <!-- <el-form-item label="菜单类型" prop="menuType">
            <el-select v-model="form.menuType"   placeholder="请选择">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width:100%"
              ></el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="排序" prop="menuSort">
            <el-input
            v-model.trim="form.menuSort"
            type="number"
            autocomplete="off"
            maxlength="100"
            show-word-limit
            ></el-input>
        </el-form-item>
     
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addMenu } from "@/api/manage";
  import { mapState, mapActions } from 'vuex'
  import { getUserId } from '@/utils/auth'
  
  export default {
    name: "UntilManagementEdit",
    data() {
      return {
        selectId:'0',           //默认选中上级菜单id
        form: {
            toMenuId:'0',       //上级单位id  
            menuName:'',        //菜单名称
            menuId:'',          //菜单id
            menuSrc:'',         //菜单路径
            menuIcon:'',        //菜单图标
            menuSort:'',        //菜单序号
            menuType:'0',        //菜单类型
            subpage:''          //子页面
        },
        typeList:[              //角色类型列表
          { label:'一级', value:'01' },
          { label:'二级', value:'11' },
          { label:'三级', value:'21' },
          { label:'四级', value:'31' },
        ],
        rules: {
          menuName: [
            { required: true, trigger: "blur", message: "请输入单位名称" },
          ],
          toMenuId: [
            { required: true, trigger: "change", message: "请选择菜单上级菜单" },
          ],
          menuSrc: [
            { required: true, trigger: "blur", message: "请填写菜单路径" },
          ],
          menuType: [
            { required: true, trigger: "change", message: "请选择菜单类型" },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    computed:{
        ...mapState({
          selectTreeMenuList: state => state.menu.selectTreeMenuList    //选择上级菜单树
        })
    },
    created() { 
       
    },
    methods: {
   
        // 显示编辑弹框
        showEdit(row) {
            if (!row) {
              this.title = "添加";
            } else {
              this.title = "编辑";
              this.selectId = row.toMenuId;
              this.form = Object.assign({}, row);
            }
            this.dialogFormVisible = true;
        },
        // 关闭并重置form
        close() {
            this.$refs["form"].resetFields();
            this.form = this.$options.data().form;
            this.dialogFormVisible = false;
        },
        //选择的上级单位
        changeFn(data){
            let navId = data[data.length-1]
            this.form.toMenuId = navId; //上级id
        },
        // 保存数据
        save() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    this.form.userId = getUserId();                       //设置用户id
                    const res = await addMenu(this.form);
                    if(!res) return;
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.$emit("fetchData");
                    this.close();
                } else {
                    return false;
                }
            });
        },
    },
  };
</script>
<style lang="scss" scoped>
    
</style>