<template>
    <div class="address-link-container clear">
        <div class="address-item p-n m-b-sm">
            <el-select v-model="province" placeholder="请选择省" style="width: 110px;" @visible-change="selectProvince">
                <el-option
                    v-for="(item, key, index) in list"
                    :key="index"
                    :label="key"
                    @click="selectProvince"
                    :value="key">
                </el-option>
            </el-select>
            省
        </div>
        <div class="address-item p-n m-b-sm">
            <el-select v-model="city" placeholder="请选择市" style="width: 110px;" @visible-change="selectCity">
                <el-option
                    v-for="(item, key, index) in cityList"
                    :key="index"
                    :label="key"
                    @click="selectCity"
                    :value="key">
                </el-option>
            </el-select>
            市
        </div>
        <div class="address-item p-n m-b-sm">
            <el-select v-model="area" placeholder="请选择区" style="width: 110px;">
                <el-option
                    v-for="(item, index) in areaList"
                    :key="index"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            区/县
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import cityList from '../assets/city.json'
    export default {
        props: {
            value: ''
        },
        data: () => ({
            selectShow: false,
            province: '',
            city: '',
            area: '',
            list: '',
            cityList: '',
            areaList: ''
        }),
        methods: {
            selectProvince (val) {
                this.selectShow = val

            },
            selectCity (val) {
                this.selectShow = val
            }
        },
        mounted () {
            this.province = this.value.split('/')[0]
            this.city = this.value.split('/')[1]
            this.area = this.value.split('/')[2]
        },
        created () {
            this.list = cityList
        },
        watch: {
            value (val) {
                this.province = this.value.split('/')[0]
                this.city = this.value.split('/')[1]
                this.area = this.value.split('/')[2]
            },
            province (val) {
                if (this.selectShow) {
                    this.city = ''
                    this.area = ''
                }
                this.cityList = []
                this.areaList = []
                for (var key in this.list) {
                    if (val === key) {
                        this.cityList = this.list[key]
                    }
                }
                this.$emit('input', this.province + '/' + this.city + '/' + this.area)
            },
            city (val) {
                if (this.selectShow) {
                    this.area = ''
                }
                this.areaList = []
                for (var key in this.cityList) {
                    if (val === key) {
                        this.areaList = this.cityList[key]
                    }
                }
                this.$emit('input', this.province + '/' + this.city + '/' + this.area)
            },
            area (val) {
                this.$emit('input', this.province + '/' + this.city + '/' + this.area)
            }
        }
    }
</script>
<style>
    .address-item {
        min-width: 150px;
        float: left;
    }
</style>
