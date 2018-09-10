<template>
    <div class="border-top film-detail-container" v-loading="loading">
        <div class="bg-white p-v-sm">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm">中文名称:</div>
                    <div class="col-xs-4 p-v-sm">{{data.title}}</div>
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm">英文名称:</div>
                    <div class="col-xs-4 p-v-sm">{{data.en_name}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">上映时间:</div>
                    <div class="col-xs-4  p-v-sm">{{data.release_date}}</div>
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm">时长/分钟:</div>
                    <div class="col-xs-4 p-v-sm">{{data.length}}</div>
                </div>
                <div class="row">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">国家:</div>
                    <div class="col-xs-4 p-v-sm">{{data.zone}}</div>
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">语言:</div>
                    <div class="col-xs-4 p-v-sm">{{data.language}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">导演:</div>
                    <div class="col-xs-4 p-v-sm">{{data.director}}</div>
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm">影片分类:</div>
                    <div class="col-xs-4 p-v-sm">{{data.class}}</div>
                </div>
                <div class="row">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">演员:</div>
                    <div class="col-xs-4 p-v-sm">{{data.actor}}</div>
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">编剧:</div>
                    <div class="col-xs-4 p-v-sm">{{data.screenwriter}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">封面(横向):</div>
                    <div class="col-xs-4 p-v-sm"><a class="img1-container" :href="data.picurl" target="_blank"><img :src="data.picurl" alt="" style="width: 80px;"></a></div>
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">封面(纵向):</div>
                    <div class="col-xs-4 p-v-sm"><a class="img1-container" :href="data.cover" target="_blank"><img :src="data.cover" alt="" style="width: 80px;"></a></div>
                </div>
                <div class="row">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">影片描述:</div>
                    <div class="col-xs-10 p-v-sm">{{data.information}}</div>
                </div>
                <div class="row bg-f9">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">是否最新上映:</div>
                    <div class="col-xs-10 p-v-sm">{{data.is_new==1? '是': '否'}}</div>
                </div>
                <div class="row">
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">是否自有内容:</div>
                    <div class="col-xs-4 p-v-sm">{{data.is_private==1? '是': '否'}}</div>
                    <div class="col-xs-2 p-o-n text-right film-add-name p-v-sm contry-p-r">是否收费:</div>
                    <div class="col-xs-4 p-v-sm">{{data.is_charge==1? '收费': '不收费'}}</div>
                </div>
            </div>

            <div class="row">
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">MP4视频地址:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['11']?vidourl['11'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">ISO文件地址:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['14']?vidourl['14'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">加密视频 360P:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['21']?vidourl['21'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">加密视频 480P:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['22']?vidourl['22'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">加密视频 720P:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['23']?vidourl['23'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">加密视频 1080P:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['24']?vidourl['24'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">转码视频 360P:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['51']?vidourl['51'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">转码视频 480P:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['52']?vidourl['52'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">转码视频 720P:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['53']?vidourl['53'].videourl:''}}
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="row col-sm-12 p-n">
                        <div class="col-xs-12 col-sm-3 text-right film-add-name line-height-40 p-n">转码视频 1080P:</div>
                        <div class="col-xs-12 col-sm-9 p-r-lg text-wrap p-sm">
                            {{vidourl['54']?vidourl['54'].videourl:''}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="clear p-o-md h-43" v-if="urlinfo.iso_info && urlinfo.iso_info.Audio">
                <div class="p-v-sm text-lg text-bold border-bottom">音频</div>
                <div class="lk-table m-t-sm">
                    <ul class="table-thead clear">
                        <li class="col-xs-2">音频轨道</li>
                        <li class="col-xs-2">语言</li>
                        <li class="col-xs-3">中文语言</li>
                        <li class="col-xs-3">备注</li>
                        <li class="col-xs-2">是否默认</li>
                    </ul>
                    <ul class="table-tbody clear" v-for="(item, index) in urlinfo.iso_info.Audio">
                        <li class="col-xs-2 over-omit" :title="item.typeorder">{{item.typeorder}}</li>
                        <li class="col-xs-2 over-omit" :title="item.Language">{{item.Language}}</li>
                        <li class="col-xs-3 over-omit" :title="item.Language_val">{{item.Language_zh}}</li>
                        <li class="col-xs-3 over-omit" :title="item.remark">{{item.remark}}</li>
                        <li class="col-xs-2 over-omit" :title="item.default==1?'是':'否'">{{item.default==1?'是':'否'}}</li>
                    </ul>
                </div>
            </div>

            <div class="clear p-o-md h-43" v-if="urlinfo.iso_info && urlinfo.iso_info.Text">
                <div class="p-v-sm text-lg text-bold border-bottom">字幕</div>
                <div class="lk-table m-t-sm">
                    <ul class="table-thead clear">
                        <li class="col-xs-2">字幕轨道</li>
                        <li class="col-xs-2">语言</li>
                        <li class="col-xs-3">中文语言</li>
                        <li class="col-xs-3">备注</li>
                        <li class="col-xs-2">是否默认</li>
                    </ul>
                    <ul class="table-tbody clear" v-for="(item, index) in urlinfo.iso_info.Text">
                        <li class="col-xs-2 over-omit":title="item.typeorder">{{item.typeorder}}</li>
                        <li class="col-xs-2 over-omit":title="item.Language">{{item.Language}}</li>
                        <li class="col-xs-3 over-omit":title="item.Language_val">{{item.Language_zh}}</li>
                        <li class="col-xs-3 over-omit":title="item.remark">{{item.remark}}</li>
                        <li class="col-xs-2 over-omit":title="item.default==1?'是':'否'">{{item.default==1?'是':'否'}}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="p-o-md m-t-md">
                <div class="p-v-sm text-lg text-bold border-bottom">海报</div>
                <!--         <div><a href="javascript:;" class="btn bg-blue1 text-white">海报(纵向)</a></div> -->
                <div class="lk-table m-t-sm">
                    <ul class="table-thead clear">
                        <li class="col-xs-4">海报名称</li>
                        <li class="col-xs-4">海报图片</li>
                        <li class="col-xs-4">海报尺寸</li>
                    </ul>
                    <ul class="table-tbody clear" v-for="item in posters">
                        <li class="col-xs-4">{{item.name}}</li>
                        <li class="col-xs-4"><a :href="item.image" target="_blank"><img :src="item.image" alt="" width="70%"></a></li>
                        <li class="col-xs-4">{{item.size}}</li>
                    </ul>
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
    import SubHeader from '../common/subheader'
    import Selection from '@/components/Select'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import api from '@/api'
    import format from '@/tools/format'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'
    export default {
        props: ['id'],
        data: () => ({
            data: '',
            loading: false,
            posters: [],
            urlinfo: {
                iso_info: {}
            },
            vidourl: {
                '11': {},
                '14': {},
                '21': {},
                '22': {},
                '23': {},
                '24': {},
                '51': {},
                '52': {},
                '53': {},
                '54': {}
            },
            value: [],
            value1: '',
            content: ''
        }),
        components: {
            SubHeader,
            Selection,
            SelectCheckbox,
            quillEditor
        },
        computed: {},
        methods: {
            getData () {
                this.loading = true
                this.$http.get(api.films.detail, {
                    params: {
                        id: this.id
                    }
                }).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.data = res.data.data.row
                        this.posters = res.data.data.posters
                        this.urlinfo  = res.data.data.urlinfo
                        this.vidourl = res.data.data.vidourl
                        // 数据处理
                        this.posters = this.posters.map(val => {
                            return {
                                name: val.all.split(',')[0],
                                image: val.all.split(',')[1],
                                size: val.all.split(',')[2],
                                encrypt: val.all.split(',')[3]
                            }
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                }).catch(err => {
                    this.loading = false
                })
            },
            // 图片上传
            handlePreview () {
            },
            handleRemove () {
            },
            handleExceed () {
            }
        },
        created () {
            this.getData()
        },
        watch: {
            id (val) {
                if (val) {
                    this.getData()
                }
            }
        }
    }
</script>
<style>
    .film-detail-container .lk-table .table-tbody li {
        padding: 10px 0;
    }
    .film-add-container {
        border-top: 4px solid #3691f5;
    }

    .film-add {
        padding: 30px;
    }

    .contry-p-r {
        padding-right: 10px;
    }

    .add-upload-btn {
        height: 40px;
        line-height: 26px;
    }

    .p-r-82 {
        padding-right: 82px;
    }

    .pos-upload {
        position: absolute;
        right: 0;
        top: -1px;
    }

    @media (max-width: 768px) {
        .film-add-name {
            text-align: left;
        }

        .film-add {
            padding: 10px;
        }

        .m-t-md.film-add-container {
            margin-top: 10px;
        }

        .contry-p-r {
            padding-right: 0px;
        }
    }
</style>
