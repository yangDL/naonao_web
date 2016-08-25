<template>
<div>
    <header class="bar bar-nav top-bar">
        <span class="icon iconfont icon-back pull-left" @click="goBack"></span>
        <h1 class="title">确认订单</h1>
    </header>
    <div  class="content">
        <div class="list-block" @click="changeAddr">
            <ul>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-dingwei"></i></div>
                <div class="item-inner">
                    <div class="express-info">
                        <span class="name" v-text="addr.name"></span>
                        <span class="phone" v-text="addr.telephone"></span>
                        <div class="address" v-text="addr.addr || addr.province+addr.city+addr.country+' '+addr.address"></div>
                    </div>
                </div>
            </li>
            </ul>
        </div>
        <div class="list-block">
            <ul>
                <order-item :skus="skus" :islink="false"></order-item>
            </ul>
        </div>
        <div class="list-block">
            <ul>
            <li class="item-content">
                <div class="item-inner">
                    <div class="count">
                        <div class="c-row"><span class="c-title">运费</span><span class="c-val">包邮</span></div>
                        <div class="c-row"><span class="c-title">税金</span><span class="c-val">暂不缴税</span></div>
                        <div class="c-row">
                            <span class="c-title">合计(含运费)</span>
                            <span class="c-val price" v-text="'¥'+total_price.toFixed(2)"></span>
                        </div>
                    </div>
                </div>
            </li>
            </ul>
        </div>
        <div class="list-block">
            <ul>
            <li class="item-content">
                <div class="item-inner">
                    <div class="count">
                        <div class="c-row"><span class="c-title">优惠</span><span class="c-val">下载挠挠app享受最大优惠</span></div>
                    </div>
                </div>
            </li>
            </ul>
        </div>
    </div>
    <div class="pay-btn">
        <div class="pay-num"><span>实付款:</span><span class="price" v-text="'¥'+total_price.toFixed(2)"></span></div>
        <a @click="toPay">微信支付</a>
    </div>
</div>
</template>

<script>
import {util} from './assets/js/util.js'
import {getSkus, getExpressAddr} from './vuex/getters'
import {setExpressAddr, setIndex, setSkus} from './vuex/actions'

import orderItem from './components/orderItem'

export default {
    vuex: {
        getters : {
            skus : getSkus,
            addr : getExpressAddr,
        },
        actions : {
            setExpressAddr, setIndex, setSkus
        }
    },
    components:{orderItem},
    data () {
        return {
            code : '',
            total_price:0
        }
    },
    ready () {
        var self = this;
        if(this.$route.params.order_id == 0){
            util.ajax('get', '/user/get_default_address', {}, function(resp){
                self.setExpressAddr(resp.data.response);
            });
        }
        var pingppjs = "http://7xo44t.com1.z0.glb.clouddn.com/pingpp.js";
        var pppScript = document.createElement('script');
        pppScript.src = pingppjs;
        $('body').append(pppScript);
    },
    route : { 
        data (transition) {
            var self = this;
            this.setIndex(false);
            this.getOrder(this.$route.params.order_id);
            if(this.$route.query.code && !transition.from.path){   
                var data = {
                    orderid: this.$route.query.orderid,
                    channel:5,
                    code:this.$route.query.code
                };
                util.ajax('get', '/pay/pre_pay', data, function(resp){
                    var charge = resp.data.response;
                    pingpp.createPayment(charge, function(result, error){
                        if (result == "success") {
                            self.$route.router.go({name:'pay_success'});
                        } else if (result == "fail") {
                            alert('获取支付信息失败, result:'+result+' err:'+JSON.stringify(error));
                        } else if (result == "cancel") {
                            $.alert('支付已取消');
                        }
                    })
                });
                return;
            }
            if(!transition.from.path){
                this.$route.router.go({name:'my_order'});
            }
            if(this.$route.params.order_id == 0){
                console.log(this.$route.params.order_id);
                this.total_price = 0;
                for (var i in this.skus){
                    var sku = this.skus[i];
                    this.total_price += sku.price * sku.num;
                }
                
            }  
        }
    },
    methods: {
        goBack () {
            if(this.$route.query.code){
                history.go(-2);
            }else{
                history.back();
            }
        },
        changeAddr () {
            this.$route.router.go({
                name:'address',
                query: {order_id:this.$route.params.order_id}
            })
        },
        getOrder (order_id) {
            if(order_id == 0) return;
            
            var self = this, skus = [];
            util.ajax('get', '/order/order_detail', {order_id:order_id}, function(resp){
                var res = resp.data.response;
                self.setSkus(res.sku_list);
                self.setExpressAddr({
                    name        :res.delivery_info.receiver_name || '',
                    telephone   :res.delivery_info.receiver_telephone || '',
                    addr        :res.delivery_info.receiver_addr || '请选择地址'
                });
                self.total_price = 0;
                for (var i in res.sku_list){
                    var sku = res.sku_list[i];
                    self.total_price += sku.price * sku.num;
                }
            });
        },
        toPay () {
            if(!util.is_wx()){
                $.alert('请在微信中打开');
                return;
            }
            if(!this.addr.telephone || !this.addr.name){
                $.alert('请选择送达地址');
                return;
            }
            var self = this, sku_list = [];
            for(var i in this.skus){
                var sku = this.skus[i];
                sku_list.push(sku.sku_id+':'+sku.num+':'+ (sku.source_uid || 0));
            }
            var data = {
                orderid: this.$route.params.order_id,
                channel:5,
                url:window.document.location.href.toString()
            };
            if(data.orderid != 0){
                self.wx_pay(data);
            }else{
                util.ajax('get', '/order/gen_order', {sku_list:sku_list.join('|')}, function(resp){
                    var order = resp.data.response; 
                    console.log(order);
                    data.orderid = order.order_id;
                    var addr_data = {
                        order_id: data.orderid,
                        address_id: self.addr.id
                    }
                    util.ajax('get', '/order/update_address', addr_data, function(resp){
                        self.wx_pay(data);
                    });
                });
            }
        },
        wx_pay (data) {
            console.log(data);
            util.ajax('get', '/pay/wxpub_code', data, function(resp){
                location.href = resp.data.response.url;
                return;
            });
        }
    }
}
</script>

<style scoped>
.list-block .item-inner {margin-left:5px;}
.icon-dingwei {color:#FF6A66}
.express-info,.pro-info, .count {width: 100%; overflow: hidden;}
span.name {float: left; margin-bottom: 5px;}
span.phone {float: right;}
.address {width: 100%; float: left;}
</style>
<style>
.pay-btn {
    width: 100%; height: 50px; line-height: 50px; text-align: center; 
    position: fixed;position:device-fix‌​ed; bottom: 0; border-top: 1px solid #ccc;
}
.pay-num {width: 60%; float: left; background: #fff; font-size: 14px; color: #000;font-weight: 400;}
.pay-num .price {color: #FF6A66; font-size: 18px;}
.pay-btn a {width: 40%; float: left; background: #353557; color: #fff;} 
.count .c-row { width: 100%; float: left; font-size: 16px; margin-top:5px;}
.c-title {float: left;}
.c-val {float: right; color: #999;}
.c-row .price {color: #FF6A66; font-weight: 400;}
</style>