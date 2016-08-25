<template>
    <div class="page page-current">
        <bar v-if="isIndex">
            <bar-item path="/magazine" label="播报" icon="weibiaoti5"></bar-item>
            <bar-item path="/square" label="广场" icon="pointer29"></bar-item>
            <bar-item path="/my_order" label="订单" icon="jingdeng"></bar-item>
            <bar-item path="/active" label="活动券" icon="coupon"></bar-item>
        </bar>
        <router-view keep-alive></router-view>
    </div>
</template>

<script>
import Bar from './components/Bar'
import BarItem from './components/BarItem'
import store from './vuex/store'
import {getIndex} from './vuex/getters'
import {setBaseTags} from './vuex/actions'
import {util} from './assets/js/util.js'
export default {
    store,
    components: {
        Bar,
        BarItem
    },
    vuex: {
        getters: {
            isIndex: getIndex
        },
        actions: {
            setBaseTags
        }
    },
    ready () {
        var self = this;
        util.ajax('get', '/config/get_base_configs', {}, function(resp){
            var tags = resp.data.response;
            self.setBaseTags(tags);
        }, false);
    }
}
</script>

<style>
body {background: #f4f4f4; font-family: "微软雅黑"; font-weight: lighter; max-width: 876px; margin: 0 auto;}
.content {padding-bottom: 50px;}
ul {margin: 0; padding: 0;}
.fade-transition {transition: opacity .1s ease;}
.fade-enter, .fade-leave {opacity: 0.1;}
.content {-webkit-overflow-scrolling: touch;}
.list-block {margin: 0 0 10px; border-bottom: 1px solid #eee;}
.bar-tab .tab-item.active, .bar-tab .tab-item:active {color: #FF6A66;}
.buttons-tab .button.active {color: #FF6A66; border-color: #FF6A66;}
</style>
