<!--
 * @Description: 添加部门
 * @Date: 2020-08-05 10:50:07
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-12-30 10:31:39
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="所属项目" prop="itemId" class="input-type">
            <el-select v-model="form.itemId"  placeholder="请选择所属项目">
              <el-option
                v-for="item in itemList"
                :key="item.itemId"
                :label="item.itemName"
                :value="item.itemId"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="步骤名称" prop="stepName">
            <el-input
            v-model.trim="form.stepName"
            autocomplete="off"
            maxlength="100"
            show-word-limit
            ></el-input>
        </el-form-item>
        <el-form-item prop="stepInputType" label="输入框类型">
            <el-select v-model="form.stepInputType"   placeholder="请选择输入框类型">
              <el-option
                v-for="item in inputList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width:100%"
              ></el-option>
            </el-select>
        </el-form-item>
        <!-- 选项框列表 -->
        <el-form-item v-if="(form.stepInputType=='5'||form.stepInputType=='7')&& optList.length>0">
             <el-tag
              v-for="(tag,index) in optList"
              :key="index"
              closable
              @close="delTag(index)"
              style="margin-right:10px"
              type="success"  
            >
              {{tag}}
            </el-tag>
        </el-form-item>
       
        <!-- 填写选项 -->
        <el-form-item
          label="选项内容"
          :prop="optContent"
          :rules="{
             message: '内容不能为空', trigger: 'blur'
          }"
          v-if="form.stepInputType=='5'||form.stepInputType=='7'"
        >
          <el-input v-model="optContent" style="width:79%" placeholder="请填写选项内容"></el-input>
          <el-button type="primary" @click.prevent="addOpt(optContent)">添加</el-button>
        </el-form-item>

        <el-form-item prop="stepInputMin" label="最小值" v-if="form.stepInputType=='2'">
            <el-input
            v-model.trim="form.stepInputMin"
            placeholder="请填写最小值(小数不能超过两位)"
            type="number"
            autocomplete="off"
            ></el-input>
        </el-form-item>
        <el-form-item prop="stepInputMax" label="最大值" v-if="form.stepInputType=='2'">
            <el-input
            v-model.trim="form.stepInputMax"
             placeholder="请填写最大值(小数不能超过两位)"
             type="number"
            autocomplete="off"
            ></el-input>
        </el-form-item>

        <el-form-item label="步骤内容" prop="stepContent">
            <el-input
              v-model.trim="form.stepContent"
              type="textarea"
              placeholder="请输入内容"
              maxlength="200"
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
  import { getProjectList, addStep } from "@/api/manage";
  import { mapState, mapActions } from 'vuex'
  import { getUserId } from '@/utils/auth'

  export default {
    name: "DepEdit",
    data() {
      // 自定义校验规则
      var validateMax = (rule, value, callback) => {
        if (value !== '') {
          /**
           * @description: 正则规则
                1、负号可以可无
                2、小数部分可有可无
                3、最多精确到2位小数即分位
                4、整数部分可以是0，整数部分最多9位
           */
          var reg = /^(-)?(([1-9]\d{0,8}(\.\d{1,2})?)|(0\.[1-9]\d?))$/; 
          if(!reg.test(value)){
            callback(new Error('请输入小数位不超过2位的数值！'));
          }else if(this.form.stepInputMin>value){
              callback(new Error('最大值不能小于最小值！'));
          }else{
            callback();
          }
        } 
      };
      var validateMin = (rule, value, callback) => {
        if (value !== '') {
          /**
           * @description: 正则规则
                1、负号可以可无
                2、小数部分可有可无
                3、最多精确到2位小数即分位
                4、整数部分可以是0，整数部分最多9位
           */
          var reg = /^(-)?(([1-9]\d{0,8}(\.\d{1,2})?)|(0\.[1-9]\d?))$/; 
          if(!reg.test(value)){
            callback(new Error('请输入小数位不超过2位的数值！'));
          }else{
            callback();
          }
        } 
      };
      return {
        form: {       
          itemId:'',              //所属项目id 
          stepName:'',            //步骤名称
          stepContent:'',         //步骤内容
          stepInputContent:"",    //输入框内容
          stepInputType:'',       //输入框类型
          stepInputMin:'',        //最小值
          stepInputMax:''         //最大值
        },
        inputList:[               //输入框类型
          { label:'文本框', value:'1' },
          { label:'数值框', value:'2' },
          { label:'单选框', value:'5' },
          { label:'多选框', value:'7' },
          { label:'文件/图片', value:'9' },
        ],            
        itemList:[],              //所属项目列表
        optContent:'',            //选项框值
        optList:[],               //选项列表
        rules: {
          itemId:[
            { required: true, message: '请选择所属项目', trigger: 'change' }
          ],
          stepName: [
            { required: true, trigger: "blur", message: "请输入步骤名称" },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          stepInputType:[
            { required: true, message: '请选择输入框类型', trigger: 'change' }
          ],
          stepInputMin: [             //自定义校验最小值
            { validator: validateMin, trigger: 'blur' }
          ],
          stepInputMax: [             //自定义校验最大值
            { validator: validateMax, trigger: 'blur' }
          ],
          stepContent:[
            { required: true, message: '请输入步骤内容', trigger: 'blur' }
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
      this.getProList()
    },
    methods: {
   
        // 显示编辑弹框
        showEdit(row) {
            if (!row) {
              this.title = "添加";
            } else {
              this.title = "编辑";
              this.form = Object.assign({}, row);
              this.optList = row.stepInputContent.split(';')  //初始化单选或多选框值
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
        // 获取所属项目列表
        async getProList(){
           const res = await getProjectList({
              status: '1',                              //  0：停用 1：正常
              pageSize: 1000,                          // 分页（每页个数）
              pageNo: 0,                               // 当前页
              order: ''                               // 默认创建时间倒序排列
           })
           this.itemList =  res.data.list
        },
        // 保存数据
        save() {
          this.$refs["form"].validate(async (valid) => {
              this.form.stepInputContent = this.optList.join(";")        //选项内容
              this.form.userId = getUserId();                            //设置用户id
              if((this.form.stepInputType=='5'||this.form.stepInputType=='7')&&this.optList.length==0){
                this.$message({
                  type:'warning',
                  message:'至少需要添加一个选项',
                  offset:120
                })
                return
              }
              if (valid) {
                  const res = await addStep(this.form);
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