<template>
<div>
    <header class="bar bar-nav top-bar">
        <h1 class="title">我的优惠券</h1>
    </header>
    <div class="content">
        <div class="coupon">
            <div class="card" v-for="coupon in coupons" v-if="coupon.type == 3" @click="getCodeImg(coupon)">
                <div class="card-content">
                    <div class="card-content-inner">
                        <div class="coupon-info">
                            <div class="coupon-money"><span v-text="coupon.amount"></span>元</div>
                            <div class="coupon-name">
                                <span class="coupon-name-n">活动代金券</span>
                                <span v-text="'有效期至'+coupon.end_time"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="coupon-tip" v-if="!is_geted">
                <p>尚未获取活动优惠券，点击下面按钮即可获得活动优惠券！</p>
                <a class="button button-big" @click="receiveCoupon">获取优惠券 </a>
            </div>
            <div class="coupon-tip" v-if="is_used">
                <p style="color: #FF6A66;">优惠券已使用，祝您玩得愉快</p>
            </div>
        </div>
    </div>
</div>
<div class="popup popup-coupon">
    <div class="coupon-code">
        <div class="coupon-title">
            <span>活动优惠券</span>
            <div class="close-popup"><span class="icon iconfont icon-close"></span></div>
        </div>
        <img :src="show_code" width="100%" height="100%" />
    </div>
</div>
</template>

<script>

import {util} from './assets/js/util.js'
import cache from './assets/js/cache.js'

export default {
    data () {
        return {
            is_geted: false,
            is_used: false,
            show_code: '',
            coupons : []
        }
    },
    route: {
        data () {
            this.getCoupons();
        }
    },
    methods : {
        getCoupons () {
            var self = this;
            util.ajax('get', '/coupon/list_coupon', {}, function(resp){
                var coupons = resp.data.response;
                for(var i in coupons){
                    var coupon = coupons[i];
                    if(coupon.type == 3){
                        self.is_geted = true;
                        break;
                    }
                }
                var user = cache.get('naonao::user');
                var recv = cache.get('naonao::active::coupon::'+user.basic.userid) || {};
                if(!self.is_geted && recv.is_recv){
                    self.is_geted = true;
                    self.is_used = true;
                }
                self.coupons = coupons;
            })
        },
        getCodeImg (coupon) {
            var self = this;
            util.ajax('get', '/activity/gen_qrcode', {coupon_id:coupon.id}, function(resp){
                var data = resp.data.response;
                self.show_code = data.url; 
                self.$nextTick(function(){
                    $.popup('.popup-coupon', true);
                    $(document).unbind('opened').on('opened','.popup-coupon', function () {
                        var h = $('body').height(), ch = $('.coupon-code').height();
                        $('.coupon-code').css({'margin-top':(h-ch-40)/2})
                        $('.modal-overlay-visible').remove();
                    });
                    $(document).unbind('close').on('close', '.popup-coupon', function(){
                        self.is_geted = false;
                        self.getCoupons();
                    })
                })
            })
        },
        receiveCoupon () {
            var self = this;
            util.ajax('get', '/activity/recv_coupon', {}, function(resp){
                var user = cache.get('naonao::user');
                cache.set('naonao::active::coupon::'+user.basic.userid, {is_recv:true});
                self.getCoupons();
            })
        }
    }
}
</script>

<style scoped>
.coupon {
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
}
.card {
    border-left: 8px solid #FF6A66;
}

.coupon-info {
    width: 100%;
    height: 60px;
    overflow: hidden;
    line-height: 60px;
    text-align: center;
}
.coupon-money {
    width: 30%;
    height: 60px;
    overflow: hidden;
    float: left;
    font-size: 16px;
    border-right: 1px dashed #ccc;
}
.coupon-money span {
    font-family: AkzidenzGrotesk;
    font-size: 34px;
    margin-right: 5px;
}

.coupon-name {
    width: 70%;
    height: 60px;
    overflow: hidden;
    float: left;
}
.coupon-name span {
    float: left;
    width: 100%;
    height: 30px;
    line-height: 30px;
}
.coupon-name-n {color: #FF6A66; font-size: 18px; font-weight: 400;}

.coupon-tip {
    width: 70%;
    overflow: hidden;
    margin: 20% auto;
    text-align: center;
}
.button {
    background: #FF6A66;
    color: #Fff;
    border-color: #FF6A66;
}
.popup-coupon {
    background: rgba(0,0,0, 0.4);
}
.coupon-code {
    width: 70%;
    overflow: hidden;
    margin: 0 auto;
    background: #fff;
    padding: 10px;
    border-radius: 8px;   
}
.coupon-title {
    width: 100%;
    height: 30px;
    margin: 5px 0;
    overflow: hidden;
    text-align: center;
    line-height: 30px;
    position: relative;
}
.close-popup {
    position: absolute;
    right: 8px;
    top: 0;
}
</style>