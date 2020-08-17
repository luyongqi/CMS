<!--
 * @Description: 添加部门
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-08-11 15:26:40
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属部门" prop="deptId">
            <el-select v-model="form.deptId" placeholder="请选择所属部门">
              <el-option
                v-for="item in depList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="指定分组" prop="groupId" >
            <el-select v-model="form.groupId" placeholder="请选择所属分组">
              <el-option
                v-for="item in groupList"
                :key="item.groupId"
                :label="item.groupName"
                :value="item.groupId"
              ></el-option>
            </el-select>
        </el-form-item>  
        <el-form-item label="员工姓名" prop="userName">
            <el-input
            v-model.trim="form.userName"
            autocomplete="off"
            maxlength="10"
            show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="jobName">
            <el-input
            v-model.trim="form.jobName"
            autocomplete="off"
            ></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
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
  import { getDeptList, getGroupList, addStaff } from "@/api/manage";
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "StfEdit",
    data() {
      return {
        form: {       
          deptId:'',               //所属部门id 
          userName:'',             //员工姓名
          sex:'0',                 //性别 0-男 1-女
          groupId:'',              //分组id 
          jobName:''               //职务
        },
        depList:[],                //所属部门列表
        groupList:[],              //分组列表
        rules: {
          deptId:[
            { required: true, message: '请选择所属部门', trigger: 'change' }
          ],
          groupId:[
            { required: true, message: '请选择分组', trigger: 'change' }
          ],
          userName: [
            { required: true, trigger: "blur", message: "请填写员工姓名" },
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
        this.getDepList()     //获取部门列表
        this.getGroList()     //获取分组列表
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
        async getDepList(){
           const res = await getDeptList({
              status: '1',                           //  0：停用 1：正常
              pageSize: 1000,                        // 分页（每页个数）
              pageNo: 0,                             // 当前页
              order: ''                              // 默认创建时间倒序排列
           })
           this.depList =  res.data.list
        },
        // 获取指定分组列表
        async getGroList(){
           const res = await getGroupList({
              status: '1',                           //  0：停用 1：正常
              pageSize: 1000,                        // 分页（每页个数）
              pageNo: 0,                             // 当前页
              order: ''                              // 默认创建时间倒序排列
           })
           this.groupList =  res.data.list
        },
        // 保存数据
        save() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    this.form.opUserId = 'admin';                       //设置操作人id
                    const res = await addStaff(this.form);
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