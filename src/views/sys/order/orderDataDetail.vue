<!--
 * @Description: 
 * @Date: 2020-08-13 17:53:23
 * @LastEditors: luyongqi
 * @LastEditTime: 2021-01-11 14:05:03
-->
<template>
    <div class="detail-container">
        
        <!-- 工作数据 -->
        <el-card shadow="never">
            <div style="margin-top: 20px">
                <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
                <span class="font-small">步骤信息</span>
            </div>
            <div v-for="dev in devList" :key="dev.deviceId">
                <div class="table-layout">
                    <!-- 第一行显示名称 -->
                    <el-row>
                        <el-col :span="4" class="table-cell-title">设备名称</el-col>
                        <el-col :span="4" class="table-cell">{{dev.deviceName}}</el-col>
                        <el-col :span="4" class="table-cell-title">设备编号</el-col>
                        <el-col :span="4" class="table-cell">{{dev.deviceId}}</el-col>
                        <el-col :span="4" class="table-cell-title">设备型号</el-col>
                        <el-col :span="4" class="table-cell">{{dev.deviceModel}}</el-col>
                    </el-row>
                 
                    <!-- 第二行显示具体项目和步骤 -->
                    <el-row>
                        <el-col :span="24" style="border-bottom: 1px solid #DCDFE6;">
                            <div v-for="(item,i) in dev.items" :key="item.itemId" class="step-content">
                                <span class="item-name">项目 {{i+1}}/{{dev.items.length}}： {{item.itemName}} </span>
                                <!-- 步骤 -->
                                <div v-for="(step,k) in item.steps" :key="step.stepId" class="step-item">
                                    <div>{{k+1}}.{{step.stepName}}：{{step.stepContent}}</div>
                                    <!-- 文本框 '1'-->
                                    <div class="step-indent" v-if="step.stepInputType==='1'">
                                        <el-input placeholder="请填写内容" :value="step.filedValue" style="width:250px"></el-input>
                                    </div>
                                    <!-- 数字值 '2'-->
                                    <div class="step-indent" v-if="step.stepInputType==='2'">
                                        <div>数值范围：{{step.stepInputMin}}~{{step.stepInputMax}}</div>
                                        <el-input placeholder="请输入数值" :value="step.filedValue" style="width:250px"></el-input>
                                    </div>
                                    <!-- 单选 '5'-->
                                    <div class="step-indent" v-if="step.stepInputType==='5'">
                                        <el-radio :label='c' :value="step.filedValue" v-for="(c,j) in step.stepInputContent.split(';')" :key='j'>{{c}}</el-radio>
                                    </div>
                                    <!-- 多选 '7'-->
                                    <div class="step-indent" v-if="step.stepInputType==='7'">
                                        <el-checkbox-group :value="step.filedValue.split(';')">
                                            <el-checkbox :label='c' v-for="(c,j) in step.stepInputContent.split(';')" :key='j'>{{c}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                    <!-- 图片/文件 '9'-->
                                    <div class="step-indent" v-if="step.stepInputType==='9'">
                                        <el-upload
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            list-type="picture-card"
                                            :file-list="step.filedValue"
                                            disabled
                                            :on-preview="handlePictureCardPreview"
                                            :on-remove="handleRemove">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
                
        </el-card>

        <!-- 工单信息 -->
        <el-card shadow="never" class="standard-margin">
            <span class="font-title-medium">工单信息</span>
            <div class="form-container-border">
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">服务单号</el-col>
                    <el-col class="form-border font-small"  :span="18">{{orderReturnApply.id}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="form-border form-left-bg font-small">工单编号</el-col>
                    <el-col class="form-border font-small" :span="18">
                        {{orderReturnApply.workId}}
                    </el-col>
                </el-row>
                 <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">工单名称</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.workName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">审核状态</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.dataStatus | formatStatus}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">申请时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.updatedAt | formatTime}}</el-col>
                </el-row>
               
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">工单负责人</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.workManagerName}}</el-col>
                </el-row>
               
                <!-- <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">工作组成员</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.workUserNames}}</el-col>
                </el-row> -->
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">工单说明</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.workNote}}</el-col>
                </el-row>
                 
            </div>
            <!-- 处理信息  待审核时不展示-->
             <div class="form-container-border" v-show="orderReturnApply.dataStatus!=='0'">
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理人员</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.dataAuditedUserName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.dataAuditedAt | formatTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理备注</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.dataAuditedNote}}</el-col>
                </el-row>
            </div>

            <div class="form-container-border" v-show="orderReturnApply.dataStatus>2">
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理人员</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.dataApprovedUserName}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.dataApprovedAt | formatTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理备注</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.dataApprovedNote}}</el-col>
                </el-row>
            </div>

            <!-- 处理备注 -->
            <div class="form-container-border" v-show="orderReturnApply.dataStatus==='0'||orderReturnApply.dataStatus==='1'">
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6" style="height:71px;line-height:51px">处理备注</el-col>
                    <el-col class="form-border font-small" :span="18">
                        <el-input  size="small" type="textarea" v-model="updateStatusParam.reason" style="width:400px;margin-left: 10px"></el-input>
                    </el-col>
                </el-row>
            </div>
            <!-- 工单审核 -->
            <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.dataStatus==='0'">
                <el-button type="primary" size="small" @click="handleUpdateStatus('1')">确认审核</el-button>
                <el-button type="danger" size="small" @click="handleUpdateStatus('2')">拒绝审核</el-button>
            </div>
            <!-- 二次审核 -->
            <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.dataStatus==='1'">
                <el-button type="primary" size="small" @click="handleUpdateStatus('3')">确认审核</el-button>
                <el-button type="danger" size="small" @click="handleUpdateStatus('4')">拒绝审核</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getWorkDataInfo, setWorkDataAuth } from '@/api/manage';
import { formatDate } from '@/utils/date'
import { getUserId } from '@/utils/auth'
import { imgUrl } from  '@/config'

const defaultWorkApply = {       //工单详细信息
    id: null,                    //服务id
    workId: null,                //工单id 
    workName: null,              //工单名称
    workManagerName: null,       //负责人名称
    dataAuditedUserName:null,    //工单数据审核人
    dataAuditedNote:null,        //审核备注
    dataAuditedAt:null,          //审核时间
    dataApprovedUserName:null,   //批准人
    dataApprovedNote:null,       //批准人备注
    dataApprovedAt:null,         //批准时间
    workNote:null,                //工单说明
    dataStatus:null               //工单数据状态
};
  const defaultUpdateStatusParam = {       //审核信息
    id:'',                         //工单id
    reason: '',                    //处理备注
    status: '0'
  };
export default {
    data(){
        return {
            imgUrl,                //图片ip
            id:null,        //服务id
            orderReturnApply: Object.assign({},defaultWorkApply),    //工单信息
            updateStatusParam: Object.assign({}, defaultUpdateStatusParam),    //审核处理
            devList:[]        //设备列表  
        }
    },
    created(){
        const id = this.$route.query.id
        this.id = id 
        this.fetchData(id)
    },
    filters: {
      formatStatus(value) {           //格式化审核状态
        if (value === '0') {
          return '未审核';
        } else if(value === '1'){
          return '待二次审核';
        } else if(value === '2'){
          return '一审未通过';
        } else if(value === '3'){
          return '审核通过';
        } else if(value === '4'){
          return '审核未通过';
        }
      },
       formatTime(time) {             //格式化时间
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods:{
        // 跳转至设备列表
        navTo(row){
            this.$router.push({ path:'/sys/facility', query:{id:row.deviceId} })
        },
        //获取部门列表
        async fetchData(id){
            const res = await getWorkDataInfo({ id })
            if(res.retCode === '000000'){
                this.orderReturnApply = res.data.detail
                 this.devList = res.data.detail.list      //该工单所有步骤信息
                this.devList.forEach((item)=>{
                    item.items.forEach((step)=>{
                        step.steps.forEach((s)=>{
                            if(s.stepInputType==='9'){
                                var arr = s.filedValue.split(',')
                                s.filedValue =  arr.map(p=>{
                                    return {url:`${imgUrl}${p}`}
                                })  
                            }
                            
                        })
                    })
                })
            }else{
                this.$message({
                    type: 'error',
                    message: res.errInfo,
                    duration:1000
                });
            }
        }, 
        // 修改工单审核状态
        handleUpdateStatus(status){
            this.updateStatusParam.status=status;
            this.updateStatusParam.id = this.id
             this.updateStatusParam.userId = getUserId()          //审核人
            if((status==='2'||status==='4')&&(this.updateStatusParam.reason===null||this.updateStatusParam.reason==='')){
                this.$message({
                    message: '请填写拒绝审核的处理备注！',
                    type: 'error',
                    offset:200
                });
                return
            }
            this.$confirm(status==='2'||status==='4'?'是否要进行拒绝审核操作?':'是否要进行同意审核操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                setWorkDataAuth(this.updateStatusParam).then(response=>{
                    if(response.retCode==="000000"){    
                        this.$message({
                            type:'success',
                            message:'操作成功',
                            duration:3000
                        })
                        this.$router.back();              //返回上一页
                    }
                });
            }).catch(()=>{

            });
        }
    }
}
</script>
<style lang="scss" scope>
    .font-title-medium {
        font-size: 16px;
        color: #303133;
    }
    .detail-container {
        // position: absolute;
        // left: 0;
        // right: 0;
        width: 1080px;
        padding: 35px 35px 15px 35px;
        margin: 20px auto;
    }
    .standard-margin {
        margin-top: 15px;
    }
    .form-border {
        border-right: 1px solid #DCDFE6;
        border-bottom: 1px solid #DCDFE6;
        padding: 10px;
    }
    .form-container-border {
        border-left: 1px solid #DCDFE6;
        border-top: 1px solid #DCDFE6;
        margin-top: 15px;
    }
    .form-left-bg {
        background: #F2F6FC;
    }
    .font-small {
        font-size: 14px;
        line-height: 20px;
        color: #606266;
        min-height: 41px;
    }
    .workData{
        .title{
            line-height: 20px;
        }
        .content{
            margin-top:10px;
            & span{
                margin-right: 20px;
            }
        }
    }
    // 步骤信息
    .table-layout {
        margin-top: 20px;
        border-left: 1px solid #DCDFE6;
        border-top: 1px solid #DCDFE6;
        .table-cell {
            line-height: 20px;
            border-right: 1px solid #DCDFE6;
            border-bottom: 1px solid #DCDFE6;
            padding: 10px;
            font-size: 14px;
            color: #606266;
            text-align: center;
            overflow: hidden;
        }
        .table-cell-title {
            line-height: 20px;
            border-right: 1px solid #DCDFE6;
            border-bottom: 1px solid #DCDFE6;
            padding: 10px;
            background: #F2F6FC;
            text-align: center;
            font-size: 14px;
            color: #303133;
        }
        // 步骤内容
        .step-content:first-child{
            padding-top: 20px;
        }
        .step-content{
            border-right: 1px solid #DCDFE6;
            padding: 0 60px;
            padding-bottom: 20px;
            line-height: 30px;
            font-size: 14px;
            .item-name{
                margin-right: 15px;
                font-weight: bold;
                font-size:15px;
            }
            .step-item{
                margin-top: 10px;
                .step-indent{
                    margin-left: 15px;
                }
                & /deep/ .el-upload--picture-card{
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                }
                 & /deep/ .el-upload-list--picture-card .el-upload-list__item{
                    width: 80px;
                    height: 80px;
                }
            } 
        }
    }
</style>