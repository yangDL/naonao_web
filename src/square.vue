<template>
<div>
    <header class="bar bar-nav top-bar">
        <button class="button button-link button-nav pull-left" id="shaixuan" v-if="false">
            <span class="icon iconfont icon-shaixuan"></span><span class="shaixuan">筛选</span>
        </button>
        <a class="icon iconfont icon-tuichu pull-right" id="square-jia" @click="logout"></a>
        <h1 class="title">广场</h1>
    </header>
    <div distance="55" v-pull-to-refresh="refresh" v-infinite-scroll="loadMore" data-distance="100" class="infinite-scroll-bottom infinite-scroll">
        <v-layer></v-layer>
        <swiper :ads="ads"></swiper>
        <div class="hr"><span></span></div>
        <div class="square-ask" v-for="ask in asks"  v-link="{name: 'squareItem', params:{order_id:ask.orderinfo.order_id}}" 
             :id="'m'+ask.orderinfo.order_id" :name="'m'+ask.orderinfo.order_id">
            <div class="sa-detail">
                <div class="sad-tip"><span class="icon iconfont icon-yinhao-copy"></span><span>{{ask.answers.num}}个答案</span></div>
                <div class="sad-desc" v-text="decodeURI(ask.orderinfo.content)"></div>
                <div class="sad-tag">
                    <span v-text="tagName('category', ask.orderinfo.category)"></span>
                    <span class="span-hr">|</span>
                    <span v-text="tagName('scene', ask.orderinfo.scene)"></span>
                    <span class="span-hr">|</span>
                    <span v-text="tagName('style', ask.orderinfo.style)"></span>
                </div>
            </div>
            <div class="sa-img"><img :src="ask.orderinfo.order_img"></div>
        </div>
    </div>
</div>
</template>

<script>
import {baseTags} from './vuex/getters'
import {setIndex} from './vuex/actions'
import swiper from './components/swiper'
import VLayer from './components/PullToRefreshLayer'
import {util} from './assets/js/util.js'
import cache from './assets/js/cache.js'
export default {
    components : {swiper, VLayer},
    data () {
        return {
            start: 0,
            loading: false,
            scroll:800,
            ads : [],
            asks: []
        }
    },
    route: {
        data (transtion) {
            if(transtion.from.name == 'squareItem'){
                this.$nextTick(function(){
                    $('.content').scrollTop(this.scroll);
                }) 
            }
            this.setIndex(true);
        }
    },
    ready () {
        var self = this;
        this.getAd();
        this.getSquare(); 
        $.init();
        $(".content").on('scroll',function(){
            self.scroll = $('.content').scrollTop();
        });  
    },
    vuex: {
        getters: {
            tags: baseTags
        },
        actions: {
            setIndex
        }
    },
    methods: {
        getAd() {
            var self = this;
            util.ajax('get', '/publish/square_banners', {}, function(resp){
                self.ads = resp.data.response;  
            }, false);
        },
        getSquare(callback) {
            var self = this;
            util.ajax('get', '/publish/square', {start:self.start, size:20}, function(resp){
                var asks = resp.data.response.questions, len = asks.length;
                if(len > 0){
                    self.asks.push.apply(self.asks, asks)
                    self.start += 21;
                }else{
                    $.alert('客官、没有更多了~');
                }
                
                self.$nextTick(function(){
                    $('.sa-img').height($('.sa-img').width());
                    callback && callback(len);   
                });
            }, false);
        },
        tagName (key, id) {
            var tags = this.tags[key], name = '';
            for (var i in tags){
                var obj = tags[i];
                if (obj.id == id) return obj.name;
            }
        },
        refresh () {
            this.start = 0;
            this.asks = null;
            this.asks = [];
            this.getSquare(function(){
                $.pullToRefreshDone('.pull-to-refresh-content'); 
            });
        },
        loadMore () {
            var self = this;
            if(this.loading) return;
            this.loading = true;
            this.getSquare(function(len){
                if(len > 0)
                    self.loading = false;
            });
        },
        logout () {
            cache.remove('naonao::user');
            $.alert('帐号已退出');
            this.$route.router.go({
                name:'login', 
                query:{
                    redirect:encodeURIComponent(location.href.toString())
                }
            })
        }
    }
}
</script>

<style scoped>
.top-bar {position: fixed; top: 0; left: 0;}
.pull-left {font-weight: lighter; font-size: 12px; color: #777; float: left;}
.pull-left span {float: left; margin-top: 12px; margin-left: 4px;}
span.shaixuan {display: inline-block; margin-left: 2px; margin-top: 5px;}
.pull-right {color: #999; font-size: 24px;}

.square-ad {width: 100%;}
.square-ad img {width: 100%; height: 100%;}
.hr {width: 100%; height: 5px; background: #fff; border-bottom: 1px solid #ccc;}
.hr span {display: block; width: 25%; height: 5px; background: #fd6867;}
.square-ask {width: 100%; overflow: hidden; border-bottom: 1px solid #ccc; background: #fff;}
.sa-detail {width: 65%; float: left; padding-left: 15px; font-size: 14px; margin-right: 5%;}
.sa-img {width: 30%; float: left; overflow: hidden; height: 100%; margin: 15px auto;}
.sa-img img { width: 90%; margin: 0 auto;}
.sad-tip {width: 100%; height: 25px; font-size: 12px; margin-top: 5px; overflow: hidden;}
.sad-tip span {float: left; padding: 10px 0 0 5px;}
.sad-tip .icon-yinhao-copy {font-size: 22px; padding: 0;}
.sad-desc {
    width:100%; 
    margin: 8px 0;
    height:50px;
    line-height: 25px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
}
.sad-tag{ width: 100%; margin: 10px 0 5px;font-size: 12px;}
.sad-tag span {color: #999;}
.span-hr {margin: 0 10px;}
</style>