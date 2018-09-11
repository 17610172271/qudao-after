<template>
    <!-- Content Wrapper. Contains page content -->
    <div id="content-wrap" ref="containerWrap" class="content-wrapper">
        <section class="content ">
            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'va-content-wrap',
        mounted () {
            let that = this
            var h = document.documentElement.clientHeight || document.body.clientHeight
            this.$refs.containerWrap.style.height = h + 'px'
            window.addEventListener('resize', function () {
                var h = document.documentElement.clientHeight || document.body.clientHeight
                that.$refs.containerWrap.style.height = h + 'px'
            })
        }
    }
</script>

<style>
    #content-wrap {
        padding-top: 50px;
        overflow: auto;
    }
    .page-enter-active, .page-leave-active {
        transition: opacity 0.5s, transform 0.5s;
    }

    .page-enter, .page-leave-to {
        opacity: 0;
    }
</style>
