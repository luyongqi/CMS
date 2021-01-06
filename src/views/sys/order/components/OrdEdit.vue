<!--
 * @Description: 添加部门
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-12-29 09:45:19
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="工单名称" prop="workName">
            <el-input
            v-model.trim="form.workName"
            autocomplete="off"
            maxlength="100"
            show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="workManager" class="input-type">
            <el-select v-model="form.workManager"  placeholder="请选择工作负责人">
              <el-option
                v-for="item in staffList"
                :key="item.workManager"
                :label="item.userName"
                :value="item.workManager"
              ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="工作成员" prop="workUsers" class="input-type">
            <el-select v-model="form.workUsers" multiple  placeholder="请选择工作成员">
              <el-option
                v-for="item in staffList"
                :key="item.workUsers"
                :label="item.userName"
                :value="item.workUsers"
              ></el-option>
            </el-select>
        </el-form-item>
        
        <el-form-item prop="workDeviceIds" label="工单步骤">
            <el-cascader
            v-model="form.workDeviceIds"
            placeholder="选择步骤"
            :options="devList"
            :props="{ multiple: true, value:'id',label:'name',children:'childer' }"
            filterable></el-cascader>
        </el-form-item>

        <el-form-item label="工作说明" prop="workNote">
            <el-input
              v-model.trim="form.workNote"
              type="textarea"
              placeholder="请输入工作说明"
              maxlength="200"
              show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="auditedUser" class="input-type">
            <el-select v-model="form.auditedUser"  placeholder="请选择工单审核人">
              <el-option
                v-for="item in staffList"
                :key="item.auditedUser"
                :label="item.userName"
                :value="item.auditedUser"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="批准人" prop="approvedUser" class="input-type">
            <el-select v-model="form.approvedUser"  placeholder="请选择工单批准人">
              <el-option
                v-for="item in staffList"
                :key="item.approvedUser"
                :label="item.userName"
                :value="item.approvedUser"
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
  import { getStaffList, getAllStepTreeList, addWorkOrder } from "@/api/manage";
  import { mapState, mapActions } from 'vuex'
  import { getUserId } from '@/utils/auth'

  export default {
    name: "DepEdit",
    data() {
  
      return {
        form: {       
          workName:'',            //工单名称
          workManager:'',         //负责人id
          workUsers:[],           //工作组成员
          workNote:"",            //工作说明
          workDeviceIds:[],       //设备列表
          auditedUser:'',         //审核人
          approvedUser:''         //批准人 
        },                          
        devList:[],                //设备类型       
        staffList:[],              //员工列表
        optContent:'',             //选项框值
        optList:[],                //选项列表
        rules: {
          workName:[
            { required: true, message: '请填写工单名称', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          workManager: [
            { required: true, trigger: "change", message: "请选择负责人" }, 
          ],
          workUsers:[
            { required: true, trigger: "change", message: "请选择工作组成员" }, 
          ],
          workDeviceIds:[
            { required: true, trigger: "change", message: "请选择设备" }, 
          ],
          workNote:[
            { required: true, message: '请输入工作说明', trigger: 'blur' }
          ],
          auditedUser: [
            { required: true, trigger: "change", message: "请选择审核人" }, 
          ],
          approvedUser: [
            { required: true, trigger: "change", message: "请选择批准人" }, 
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
      this.getStepTreeList() 
      this.getStfList()
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
            this.optList = [];            //单选或多选框的值
        },
        
        // 添加选项
        addOpt(val){
          if(val==''){
            this.$message({
              message: '填写的内容不能为空！',
              type: 'warning',
              offset:120
            })
            return
          }
          this.optList.push(val)
          this.optContent = ''
        },
        // 删除选项
        delTag(i){
          this.optList.splice(i,1)
        },
        // 获取员工列表
        async getStfList(){
           const res = await getStaffList({
              status: '1',                           //  0：停用 1：正常
              pageSize: 1000,                        // 分页（每页个数）
              pageNo: 0,                             // 当前页
              order: ''                              // 默认创建时间倒序排列
           })
           this.staffList =  res.data.list
           this.staffList.forEach((item)=>{
             item.workUsers = item.userId
             item.workManager = item.userId
             item.auditedUser = item.userId           //审核人
             item.approvedUser = item.userId          //批准人
           })
        },
        // 获取设备列表
        async getStepTreeList(){
           const res = await getAllStepTreeList({ })
           this.devList =  res.data.list
          //  this.devList.forEach((item)=>{
          //    item.workDeviceIds = item.deviceId
          //  })
        },
        // 保存数据
        save() {
          this.$refs["form"].validate(async (valid) => {
              this.form.userId = getUserId();                            //设置用户id  
              if (valid) {
                  const res = await addWorkOrder(this.form);
                  if(!res) return;
                  this.$message({
                      message: '保存成功',
                      type: 'success',
                      offset:120
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