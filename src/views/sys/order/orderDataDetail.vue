<!--
 * @Description: 
 * @Date: 2020-08-13 17:53:23
 * @LastEditors: luyongqi
 * @LastEditTime: 2020-09-19 17:37:17
-->
<template>
    <div class="detail-container">
        
        <!-- 工作数据 -->
        <el-card shadow="never">
            <span class="font-title-medium">工单数据</span>
            <div class="form-container-border" v-for="item in devList" :key="item.deviceId">
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="4">设备名称</el-col>
                    <el-col class="form-border font-small" :span="4">{{item.deviceName}}</el-col>
                    <el-col class="form-border form-left-bg font-small" :span="4">设备编号</el-col>
                    <el-col class="form-border font-small" :span="4">{{item.deviceId}}</el-col>
                    <el-col class="form-border form-left-bg font-small" :span="4">设备型号</el-col>
                    <el-col class="form-border font-small" :span="4">{{item.deviceModel}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border font-small workData" :span="24">
                        <div class="title">工序数据</div>
                        <div class="content" v-for="p in item.fileds" :key="p.filedName">
                           <span>步骤名称：{{p.filedNameNote}} </span>
                           <span>步骤数据：{{p.filedValue}}</span>
                        </div>
                    </el-col>
                </el-row>
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
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.status | formatStatus}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">申请时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.updatedAt | formatTime}}</el-col>
                </el-row>
               
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">工单负责人</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.workManagerName}}</el-col>
                </el-row>
               
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">工作组成员</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.workUserNames}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">工单说明</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.workNote}}</el-col>
                </el-row>
                 
            </div>
            <!-- 处理信息  待审核时不展示-->
             <div class="form-container-border" v-show="orderReturnApply.status!=='0'">
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理人员</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.auditedUser}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.auditedAt | formatTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理备注</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.auditedNote}}</el-col>
                </el-row>
            </div>

            <div class="form-container-border" v-show="orderReturnApply.status>2">
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理人员</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.approvedUser}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理时间</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.approvedAt | formatTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6">处理备注</el-col>
                    <el-col class="form-border font-small" :span="18">{{orderReturnApply.approvedNote}}</el-col>
                </el-row>
            </div>

            <!-- 处理备注 -->
            <div class="form-container-border" v-show="orderReturnApply.status==='0'||orderReturnApply.status==='1'">
                <el-row>
                    <el-col class="form-border form-left-bg font-small" :span="6" style="height:71px;line-height:51px">处理备注</el-col>
                    <el-col class="form-border font-small" :span="18">
                        <el-input  size="small" type="textarea" v-model="updateStatusParam.reason" style="width:400px;margin-left: 10px"></el-input>
                    </el-col>
                </el-row>
            </div>
            <!-- 工单审核 -->
            <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status==='0'">
                <el-button type="primary" size="small" @click="handleUpdateStatus('1')">确认审核</el-button>
                <el-button type="danger" size="small" @click="handleUpdateStatus('2')">拒绝审核</el-button>
            </div>
            <!-- 二次审核 -->
            <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status==='1'">
                <el-button type="primary" size="small" @click="handleUpdateStatus('3')">确认审核</el-button>
                <el-button type="danger" size="small" @click="handleUpdateStatus('4')">拒绝审核</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getWorkDataInfo, setWorkStatus } from '@/api/manage';
import { formatDate } from '@/utils/date'
import { getUserId } from '@/utils/auth'
const defaultWorkApply = {       //工单详细信息
    auditedAt: null,             //一次审核时间
    auditedNote: null,           //一次审核处理备注
    auditedUser: null,           //审核人
    createdAt: null,             //工单创建时间
    createdUser: null,           //工单创建人
    id: null,                    //服务id
    status: null,                //审核状态 0-待审核 1-通过 2-未通过 3-待二次审
    updatedAt: null,             //工单修改时间
    updatedUser: null,           //修改人
    workDeviceIds:null,          //工作设备id 
    workDeviceNames: null,       //工作设备名称
    workId: null,                //工单id 
    workManager: null,           //工单负责人id
    workManagerName: null,       //负责人名称
    workName: null,              //工单名称
    workNote: null,              //工单说明
    workUserNames: null,         //工作组成员名称
    workUsers: null              //工作组成员id
};
  const defaultUpdateStatusParam = {       //审核信息
    id:'',                         //工单id
    reason: '',                    //处理备注
    status: '0'
  };
export default {
    data(){
        return {
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
                this.orderReturnApply.workUserNames = this.orderReturnApply.workUserNames.replace(/;/g,"、")
                this.devList = res.data.detail.workDeviceIds      //该工单设备列表
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
                setWorkStatus(this.updateStatusParam).then(response=>{
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
    
</style>