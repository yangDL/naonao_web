<template>
<div>
    <header class="bar bar-nav  top-bar">
        <span class="icon iconfont icon-back pull-left" @click="goBack"></span>
        <div class="ask-user">
            <img :src="asker.userinfo.avatar">
            <div v-text="decodeURI(asker.userinfo.nickname)"></div>
        </div>
    </header>
    <div class="content" id="content">
        <div class="ask-info">
            <div class="sad-desc" v-text="decodeURI(asker.orderinfo.content)"></div>
            <div class="sad-tag">
                <span v-text="tagName('category', asker.orderinfo.category)"></span>
                <span class="span-hr">|</span>
                <span v-text="tagName('scene', asker.orderinfo.scene)"></span>
                <span class="span-hr">|</span>
                <span v-text="tagName('style', asker.orderinfo.style)"></span>
                <span class="span-time" v-text="new Date(asker.orderinfo.create_time*1000).format('yyyy-MM-dd h:m:s')"></span>
            </div>
        </div>
        <div class="ask-op" v-if="false">
            <div class="ao-keep">
                <span class="icon iconfont icon-wujiaoxing"></span>
                <span>收藏15</span>
            </div>
            <div class="ao-edit">
                <span>写答案</span>
                <span class="icon iconfont icon-qianbi"></span>
            </div>
        </div>
        <div class="answer-list" v-for="ans in answers">
            <div class="card facebook-card">
                <div class="card-header no-border">
                  <div class="facebook-avatar">
                      <img :src="ans.user.url" width="100%">
                  </div>
                  <div class="facebook-name" v-text="decodeURI(ans.user.name)"></div>
                </div>
                <div class="card-content">
                    <div class="answer-word" v-text="decodeURI(ans.content)"></div>
                    <div class="answer-pro" v-if="!!ans.product" v-link="{name:'item', params:{item_id:ans.product.id}, query:{sourceid:source_uid}}">
                        <div class="answer-proimg"><img :src="ans.product.img" width="100%"></div>
                        <div class="answer-proinfo">
                            <span class="answer-title" v-text="ans.product.title"></span>
                            <span class="answer-brand" v-text="ans.product.brand"></span>
                            <span class="answer-price" v-text="'￥'+ans.product.price.toFixed(2)"></span>
                        </div>
                    </div>
                    <div class="answer-links">
                        <div class="row">
                          <div class="col-33 link-one" v-for="link in ans.links">
                              <img :src="link" width="100%"  @click="pbOpen(ans)">
                          </div>
                        </div>
                    </div>
                    <div class="answer-say" v-for="comment in ans.comments.list">
                        <span class="answer-who" v-text="decodeURI(comment.nickname)"></span> ：<span v-text="decodeURI(comment.content)"></span>
                    </div>
                </div>
                <div class="card-footer">
                    <a class="link" @click="zan(ans)">
                        <span class="icon iconfont icon-zan-copy" :class="{'zan-click':ans.is_like}"></span>
                        <span class="zan-num" v-text="ans.like_cnt" :class="{'zan-click':ans.is_like}"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {util} from './assets/js/util.js'
import {baseTags} from './vuex/getters'
export default {
    data () {
        return {
            liking: false,
            order_id:0,
            scroll:0,
            source_uid:0,
            answers : [],
            asker: {
                userinfo: {},
                orderinfo: {}
            }
        }
    },
    vuex: {
        getters: {
            tags    : baseTags
        }
    },
    ready () {
        var self = this;
        $.init();
        $("#content").on('scroll',function(){
            self.scroll = $('#content').scrollTop();
        });
    },
    route : {
        data (transtion) {
            if(this.order_id != this.$route.params.order_id){
                this.order_id = this.$route.params.order_id;
                this.getAsker();
            }
            this.source_uid = this.$route.query.sourceid || 0;
            if(transtion.from.name == 'item'){
                this.$nextTick(function(){
                    $('#content').scrollTop(this.scroll);
                }) 
            }            
        }
    },
    methods : {
        getAsker () {
            var self = this;
            util.ajax('get', '/publish/order_basic', {order_id:this.$route.params.order_id}, function(resp){
                var asker = resp.data.response;
                self.asker = asker;
                self.getOrder(self.reImgHeight);
            })
        },
        getOrder (callback) {
            var self = this;
            util.ajax('get', '/publish/get_answers', {order_id:this.$route.params.order_id}, function(resp){
                var answers = resp.data.response;
                for(var i in answers){
                    var obj = answers[i];
                    if(obj.links.length)
                        obj.pb = $.photoBrowser({photos : obj.links});
                }
                self.answers = answers;
                self.$nextTick(function(){
                    callback && callback();
                });
            });
        },
        tagName (key, id) {
            var tags = this.tags[key], name = '';
            for (var i in tags){
                var obj = tags[i];
                if (obj.id == id) return obj.name;
            }
        },
        reImgHeight () {
            
            $('.link-one').height($('.link-one').width()/1.5);
            $('.answer-proimg').height($('.answer-proimg').width());
            $('.answer-proimg').each(function(){
                var img = $(this).find('img'),  w = img.width(), h = img.height();
                if(w > h) img.height(w);
            });
        },
        zan (ans) {
            var self = this;
            if (this.liking == true) return;
            this.liking = true;
            ans.is_like = !ans.is_like;
            if(ans.is_like){
                util.ajax('get', '/publish/like_answer', {answer_id:ans.answer_id}, function(resp){  
                    ans.like_cnt++;
                    self.liking = false;
                })
            }else{
                util.ajax('get', '/publish/unlike_answer', {answer_id:ans.answer_id}, function(resp){
                    ans.like_cnt--;
                    self.liking = false;
                })
            }
        },
        pbOpen(ans) {
            var pb = ans.pb;
            pb.close = function () {
                pb.opened = false;
                if (!pb.swiperContainer || pb.swiperContainer.length === 0) {
                    return;
                }
                if (pb.params.onClose) {
                    pb.params.onClose(pb);
                }
                pb.attachEvents(true);
                if (pb.params.type === 'standalone') {
                    pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () {
                        pb.container.remove();
                    });
                }
                pb.swiper.destroy();
                pb.swiper = pb.swiperContainer = pb.swiperWrapper = pb.slides = undefined;
                //pb.swiper = pb.swiperContainer = pb.swiperWrapper = pb.slides = gestureSlide = gestureImg = gestureImgWrap = undefined;
            };
            pb.open();
        },
        goBack () {
            if(document.referrer.indexOf('login') != -1){
                this.$route.router.go({path:'/square'});
                return;
            }
            history.back();
        }
    }
}
</script>

<style scoped>
header {height: 50px;}
.icon-back {width:36px;height: 50px; line-height: 35px; text-align: left;}
.ask-user {width: 100%; height: 36px; line-height: 36px; margin: 8px 0; text-align: center; position: relative;}
.ask-user img {width: 36px; height: 36px; border-radius: 100%; position: absolute; right: 0;}
.ask-user div {color: #000; overflow: hidden; height: 36px; margin-right: 36px;}
.ask-info {background: #fff; width: 100%; padding: 0 4%; overflow: hidden; border-bottom: 1px solid #f1f1f1;}
.ask-info .sad-desc {width: 100%; overflow: hidden; margin:20px auto 10px; color: #575754; font-weight: 500; line-height: 25px;}
.ask-info .sad-tag {width: 100%; margin: 10px 0 10px;font-size: 12px;}
.sad-tag span {color: #999;}
.span-hr {margin: 0 10px;}
.span-time {float: right;}
.ask-op {width: 100%; height: 60px; overflow: hidden; padding:0 4%; background: #fff;font-size: 16px; letter-spacing: 1px;}
.ao-keep span {float: left; margin: 17px 0 0 10px; color:#999;}
.ao-keep span.icon-wujiaoxing {color: #e6d5c1;font-size: 35px; margin:0;}
.ao-edit span {float: right;  margin-top: 18px;}
.ao-edit span.icon-qianbi {color: #ff6a66; font-size: 30px; margin-top: 7px; margin-right: 10px;}

.answer-list {
    width: 100%;
    overflow: hidden;
    margin: 10px 0;
    background: #fff;;
}
.answer-list .card {box-shadow:none; margin: 0;padding: 0;}
.card-header {padding:10px 4%; }
.facebook-avatar {border-radius: 100%; width: 30px; height: 30px;}
.facebook-avatar img { border-radius: 100%;}
.facebook-name {height: 30px; line-height: 30px;}
.answer-word {width: 100%; margin-bottom: 5px;  padding: 0 4%; overflow: hidden;}
.answer-pro {width: 92%; overflow:hidden; background: #Fafafa; border:  1px dashed #D2CED0; margin:0 4% 15px;}
.answer-proimg {width: 25%; float: left; overflow: hidden;}
.answer-proinfo {width: 75%; float: left; padding:0 10px;}
.answer-proinfo span {width: 100%; float: left; margin: 0; padding-top: 3px;}
.answer-title {font-weight: 500;}
.answer-brand {font-size: 12px;}
.answer-price {font-weight: bold;}

.answer-links {width: 100%; padding: 0 4%; overflow: hidden; margin:0 0 10px;}
.answer-links .link-one { overflow: hidden; margin-bottom: 10px;}
.answer-say {width: 100%; overflow: hidden; margin: 5px 0; font-size: 12px;  padding: 0 4%;}
.answer-say .answer-who {color: #FF6A66;}
.facebook-card .card-footer {background: #fff; margin-top: 10px;}
.icon-zan-copy {font-size: 20px; }
.zan-num {margin-left: 10px; font-size: 16px;}
.zan-click {color:#FF6A66;}
</style>