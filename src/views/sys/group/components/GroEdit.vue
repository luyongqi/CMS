<!--
 * @Description: 添加部门
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-11 14:55:06
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分组名称" prop="groupName">
            <el-input
            v-model.trim="form.groupName"
            autocomplete="off"
            maxlength="10"
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
  import { addGroup } from "@/api/manage";
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "StfEdit",
    data() {
      return {
        form: {       
          groupName:'',             //分组名称
        },

        rules: {
          groupName: [
            { required: true, trigger: "blur", message: "请填写分组名称" },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
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
                    this.form.userId = 'admin';                       //设置操作人id
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