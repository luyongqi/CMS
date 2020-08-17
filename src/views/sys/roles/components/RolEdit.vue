<!--
 * @Description: 添加部门
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-12 14:33:52
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
            <el-input
            v-model.trim="form.roleName"
            autocomplete="off"
            maxlength="10"
            placeholder="系统管理员"
            show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
            <el-input
            v-model.trim="form.roleCode"
            autocomplete="off"
            maxlength="20"
            placeholder="admin"
            show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="roleType">
            <el-select v-model="form.roleType"   placeholder="请选择">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width:100%"
              ></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { addGroup } from "@/api/manage";
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "RolEdit",
    data() {
      return {
        form: {       
          roleName:'',             //角色名称
          roleCode:'',             //角色编码
          roleType:''              //角色类型
        },
        typeList:[              //角色类型列表
          { label:'管理', value:'01' },
          { label:'代理', value:'11' },
          { label:'商家', value:'21' },
          { label:'公众用户', value:'31' },
        ],
        rules: {
          roleName: [
            { required: true, trigger: "blur", message: "请填写角色名称" },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          roleCode: [
            { required: true, trigger: "blur", message: "请填写角色编码" },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          roleType: [
            { required: true, trigger: "change", message: "请选择角色类型" },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    computed:{
        ...mapState({
         
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

        // 保存数据
        save() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    this.form.userId = 'admin';                            //设置用户id
                    const res = await addGroup(this.form);
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