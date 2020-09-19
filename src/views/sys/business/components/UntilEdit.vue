<!--
 * @Description: 
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-19 17:28:35
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="810px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="单位名称" prop="orgName">
            <el-input
            v-model.trim="form.orgName"
            autocomplete="off"
            maxlength="100"
            show-word-limit
            ></el-input>
        </el-form-item>

        <el-form-item prop="parentOrgId" label="上级单位" >
            <el-cascader v-model="selectId" :options="selectCompanyList" :props="{checkStrictly: true,value:'orgId',label:'orgName'}" filterable clearable @change="changeFn">
                <template slot-scope="{ data }">
                    <span>{{ data.orgName }}</span>
                </template>
            </el-cascader>
        </el-form-item>

        <el-form-item label="单位地址" prop="region">
            <picker
                ref="pick"
                :province.sync="form.province"
                :city.sync="form.city"
                :my-area.sync="form.region"
            ></picker>
        </el-form-item>
        <el-form-item prop="status" label="是否启用">
            <el-radio-group v-model="form.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addCompany } from "@/api/manage";
  import Picker from './Picker';
  import { mapState, mapActions } from 'vuex'
  import { getUserId } from '@/utils/auth'
  export default {
    name: "UntilManagementEdit",
    components:{ Picker },
    data() {
      return {
        selectId:'0',
        form: {
            parentOrgId:'0',    //上级单位id  
            orgName:'',        //单位名称
            province:'',       //省
            city:'',           //市
            region:'',         //区
            orgId:'',
            status:'1'           //  0-停用 1-正常
        },
        rules: {
          orgName: [
            { required: true, trigger: "blur", message: "请输入单位名称" },
          ],
          region: [
            { required: true, trigger: "blur", message: "请选择地址" },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    computed:{
        ...mapState({
            selectCompanyList: state => state.company.selectCompanyList        //选择上级单位列表
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
              this.selectId = row.parentOrgId;
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
            this.form.parentOrgId = navId; //上级id
        },
        // 保存数据
        save() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    this.form.userId = getUserId();                       //设置用户id
                    const res = await addCompany(this.form);
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