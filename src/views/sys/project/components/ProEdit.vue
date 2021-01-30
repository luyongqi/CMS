<!--
 * @Description: 添加部门
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-30 11:29:37
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属设备" prop="deviceId" class="input-type">
            <el-select v-model="form.deviceId" placeholder="请选择所属设备">
              <el-option
                v-for="item in devList"
                :key="item.deviceId"
                :label="item.deviceName"
                :value="item.deviceId"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="itemName">
            <el-input
            v-model.trim="form.itemName"
            autocomplete="off"
            maxlength="100"
            show-word-limit
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
  import { getDeviceList, addProject } from "@/api/manage";
  import { mapState, mapActions } from 'vuex'
  import { getUserId } from '@/utils/auth'

  export default {
    name: "DepEdit",
    data() {
      return {
        form: {       
          deviceId:'',            //所属设备id 
          itemName:'',            //项目名称
          status:'1'
        },
        devList:[],              //所属设备列表
        rules: {
          deviceId:[
            { required: true, message: '请选择所属设备', trigger: 'change' }
          ],
          itemName: [
            { required: true, trigger: "blur", message: "请输入项目名称" },
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
        this.getDevList()
    },
    methods: {
   
        // 显示编辑弹框
        showEdit(type,row) {
            if (type==='add') {
              this.title = "添加";
              this.form.deviceId = row
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
        // 获取所属设备列表
        async getDevList(){
           const res = await getDeviceList({
              status: '1',                              //  0：停用 1：正常
              pageSize: 1000,                        // 分页（每页个数）
              pageNo: 0,                             // 当前页
              order: ''                              // 默认创建时间倒序排列
           })
           this.devList =  res.data.list
        },
        // 保存数据
        save() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    this.form.userId = getUserId();                       //设置用户id
                    const res = await addProject(this.form);
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