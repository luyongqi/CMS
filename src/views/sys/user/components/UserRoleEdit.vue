<!--
 * @Description: 
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-19 17:24:14
-->
<template>
   <el-dialog
      title="分配角色"
      :visible.sync="allocDialogVisible"
      width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色" prop="permissions">
            <el-select v-model="form.roleIds" multiple placeholder="请选择" size="small" style="width: 80%">
                <el-option
                v-for="item in allRoleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
  import { getRoleList,allocUserRole } from "@/api/manage";
  import { getUserId } from '@/utils/auth'
  export default {
    name: "UserRoleEdit",
    data() {
      return {
        form: {
            userId:'',                                           //需分配角色的用户
            roleIds: [],                                         //角色id
            opUserId:getUserId()||''                             //操作人
        },
        rules: {
          roleIds: [
            { required: true, trigger: "blur", message: "请选择角色" },
          ],
        },
        allocDialogVisible: false,             //弹框的显示隐藏
        allRoleList:[],                        //角色列表
      };
    },
    created() {
         this.getAllRoleList();
    },
    methods: {
        showEdit(row) {
            this.form.userId = row.userId;
            this.allocDialogVisible = true;
        },
        //  获取角色列表
        getAllRoleList() {
            getRoleList().then(response => {
            this.allRoleList = response.data;
            });
        },
        close() {
            this.$refs["form"].resetFields();
            this.form = this.$options.data().form;
            this.allocDialogVisible = false;
        },
        handleAllocDialogConfirm() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    const { retCode,errInfo }= await allocUserRole(this.form);
                    if(retCode==="000000"){
                        this.$message({
                            message: '角色分配成功',
                            type: 'success',
                            duration: 3000
                        })
                    }
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