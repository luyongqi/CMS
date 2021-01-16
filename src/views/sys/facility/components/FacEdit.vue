<!--
 * @Description: 添加部门
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-16 10:30:42
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属部门" prop="deptId" class="input-type">
            <el-select v-model="form.deptId"  placeholder="请选择所属部门">
              <el-option
                v-for="item in deptList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName">
            <el-input
            v-model.trim="form.deviceName"
            autocomplete="off"
            maxlength="100"
            show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="deviceModel">
            <el-input
            v-model.trim="form.deviceModel"
            autocomplete="off"
            ></el-input>
        </el-form-item>
        <!-- <el-form-item prop="status" label="是否启用">
            <el-radio-group v-model="form.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
        </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getDeptList, addDevice } from "@/api/manage";
  import { mapState, mapActions } from 'vuex'
  import { getUserId } from '@/utils/auth'
  export default {
    name: "DepEdit",
    data() {
      return {
        form: {       
          deptId:'',            //所属部门id
          deviceModel:'',       //设备型号 
          deviceName:'',        //设备名称
          status:'1'
        },
        deptList:[],            //所属部门列表
        rules: {
          deptId:[
            { required: true, message: '请选择所属部门', trigger: 'change' }
          ],
          deviceName: [
            { required: true, trigger: "blur", message: "请输入设备名称" },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
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
        this.getDeparttList()
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
        // 获取所属部门列表
        async getDeparttList(){
           const res = await getDeptList({
              status: '1',                              //  0：停用 1：正常
              pageSize: 1000,                        // 分页（每页个数）
              pageNo: 0,                             // 当前页
              order: ''                              // 默认创建时间倒序排列
           })
           this.deptList =  res.data.list
        },
        // 保存数据
        save() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    this.form.userId = getUserId();                       //设置用户id
                    const res = await addDevice(this.form);
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