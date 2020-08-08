<template>
    <section>
        <el-select v-model="provinceAreaCode" placeholder="请选择" @change="getCity">
            <el-option
                v-for="(item,index) in provinceList"
                :key="index"
                :label="item.name"
                :value="item.code"
            >
                {{ item.name }}
            </el-option>
        </el-select>
        <el-select v-model="cityAreaCode" placeholder="请选择" @change="getArea">
            <el-option
                v-for="(item,index) in cityList"
                :key="index"
                :label="item.name"
                :value="item.code"
            >
                {{ item.name }}
            </el-option>
        </el-select>
        <el-select v-model="streetAreaCode" placeholder="请选择">
            <el-option
                v-for="(item,index) in areaList"
                :key="index"
                :label="item.name"
                :value="item.code"
            >
                {{ item.name }}
            </el-option>
        </el-select>
    </section>
</template>
<script>
    /**
     * 省市区三级联动组件
     */
    import { getProvinceList, getCityList, getCountyList } from '@/api/manage';
    
    export default {
        name: 'picker',
        props: {
            /**
             * 省编码
             */
            province: {
                type: String,
                required: false,
                default: () => null
            },
 
            /**
             * 市编码
             */
            city: {
                type: String,
                required: false,
                default: () => null
            },
 
            /**
             *  区编码
             */
            myArea: {
                type: String,
                required: false,
                default: () => null
            }
        },
        data() {
            return {
                loading: true,
                // 省list
                provinceList: [],
                // 市list
                cityList: [],
                // 区list
                areaList: [],
                // 省code
                provinceAreaCode: this.province,
                // 市code
                cityAreaCode: this.city,
                // 区code
                streetAreaCode: this.myArea
            }
        },
        watch: {
            /**
             * 监听省code
             * @param val
             */
            provinceAreaCode(val) {
                this.$emit('update:province', val)
            },
 
            /**
             * 监听市code
             * @param val
             */
            cityAreaCode(val) {
                this.$emit('update:city', val)
            },
 
            /**
             * 监听区code
             * @param val
             */
            streetAreaCode(val) {
                this.$emit('update:myArea', val)
            },
 
            /**
             * 监听省
             * @param val
             */
            province(val) {
                this.provinceAreaCode = val
                if (val) {
                    this.getCity(val)
                }
            },
 
            /**
             * 监听市
             * @param val
             */
            city(val) {
                this.cityAreaCode = val
                if (val) {
                    this.getArea(val)
                }
            },
 
            /**
             * 监听区
             * @param val
             */
            myArea(val) {
                this.streetAreaCode = val
            }
        },
        methods: {
            /**
             * 获取省
             */
            async getProvince() {
               const res = await getProvinceList()
               this.provinceList = res.data.provinces;
            },
 
            /**
             * 获取市
             * @param code
             */
            async getCity(code,flag=true) {
                if(flag){
                    this.cityAreaCode = '';
                    this.streetAreaCode = '';
                }
                const res = await getCityList({provinceCode:code})
                this.cityList = res.data.cities
            },
 
            /**
             * 获取地区
             * @param code
             */
              async getArea(code, flag=true) {
                if(flag){
                    this.streetAreaCode = '';
                }
                const res = await getCountyList({cityCode:code })
                this.areaList = res.data.counties
            },
           
        },
        created(){
            this.getProvince()
            if(this.province){
                this.getCity(this.province,false)
            }
            if(this.city){
                this.getArea(this.city,false)
            }
        },
        mounted() {

        },
    }
</script>
<style scoped>
    .el-form-item__content .el-select .el-input .el-input__inner{
        width: 120px;
    }
</style>
