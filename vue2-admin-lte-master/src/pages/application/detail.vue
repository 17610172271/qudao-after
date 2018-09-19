<template>
    <div class="border-top film-detail-container" v-loading="loading">
        <div class="bg-white p-v-sm">
            <div class="container-fluid">
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">应用类别:</div>
                    <div class="col-xs-4  p-v-sm">{{data.apptype}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">网站域名:</div>
                    <div class="col-xs-4  p-v-sm">{{data.weburl}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">应用名称:</div>
                    <div class="col-xs-4  p-v-sm">{{data.webname}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">应用行业:</div>
                    <div class="col-xs-4  p-v-sm">{{data.industry}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">网站logo:</div>
                    <div class="col-xs-4 p-v-sm"><a class="img1-container" :href="data.weblogo" target="_blank"><img :src="data.weblogo" alt="" style="width: 80px;"></a></div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">应用简介:</div>
                    <div class="col-xs-4  p-v-sm">{{data.appdesc}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">版权证明:</div>
                    <div class="col-xs-4 p-v-sm"><a class="img1-container" :href="data.certificate" target="_blank"><img :src="data.certificate" alt="" style="width: 80px;"></a></div>
                </div>

            </div>

            <!--<div class="p-t-md text-center">-->
                <!--<button class="btn bg-blue1 text-white m-r-sm">确定</button>-->
                <!--<button class="btn bg-gray1 text-white">取消</button>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: ['data', 'show'],
        data: () => ({
            loading: true
        }),
        methods: {
        },
        mounted () {
            if (this.show) {
                let that = this
                setTimeout(() => {
                    that.loading = false
                }, 800)
            } else {
                this.loading = true
            }
        },
        watch: {
            show (val) {
                if (val) {
                    let that = this
                    setTimeout(() => {
//                        alert(1)
                        that.loading = false
                    }, 800)
                } else {
                    this.loading = true
                }
            }
        }
    }
</script>
<style>

</style>
