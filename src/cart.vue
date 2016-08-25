<template>
<div>
    <header class="bar bar-nav top-bar">
        <span class="icon iconfont icon-back pull-left" @click="goBack"></span>
        <h1 class="title">购物车</h1>
    </header>
    <div class="content">
        <div class="list-block" v-for="cart in carts">
            <ul>
            <li class="item-content">
                <div class="item-inner">
                    <div class="pro-info">
                        <img :src="cart.img">
                        <div class="pro-msg">
                            <h4 v-text="cart.name"></h4>
                            <div class="sc">
                                <span  v-for="sc in cart.sku">
                                    <span v-text="$key+':'"></span><span class="sc-val" v-text="sc"></span>
                                </span>
                            </div>
                            <div class="price">
                                <span v-text="'¥'+cart.price.toFixed(2)"></span>
                                <span class="pro-num" v-text="'x'+cart.num"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="opt-btn" @click="choose_cart(cart)" v-if="!cart.checked">
                    <span class="iconfont icon-unchecked"></span>
                </div>
                <div class="opt-btn" v-else  @click="choose_cart(cart)">
                    <span class="iconfont icon-gougouh"></span>
                </div>
            </li>
            </ul>
        </div>
    </div>
    <div class="pay-btn">
        <div class="pay-num">
            <div class="check-all">
                <div class="opt-btn" @click="check_all = carts_length" v-if="check_all != carts_length">
                    <span class="iconfont icon-unchecked"></span>全选
                </div>
                <div class="opt-btn" v-else  @click="check_all=0">
                    <span class="iconfont icon-gougouh"></span>全选
                </div>
            </div>
            <span class="price" v-text="'¥'+total_price.toFixed(2)"></span>
        </div>
        <a @click="buyNow">立即支付</a>
    </div>
</div>
</template>

<script>
import {util} from './assets/js/util.js'
import {setSkus, setIndex} from './vuex/actions'
export default {
    data () {
        return {
            check_all : 0,
            total_price: 0,
            carts_length:0,
            carts : []
        }
    },
    vuex : {
        actions: {setSkus, setIndex}
    },
    watch: {
        check_all (n, o) {
            var total_price = 0;
            if(n == this.carts_length){
                for(var i in this.carts){
                    var cart = this.carts[i];
                    cart.checked = true;
                    total_price += cart.price * cart.num;
                }
                this.total_price = total_price;
            }else if(n == 0){
                for(var i in this.carts){
                    var cart = this.carts[i];
                    cart.checked = false;
                }
                this.total_price = total_price;
            }
        }
    },
    route: {
        data (transition) {
            this.setIndex(false);
            var self = this;
            this.check_all = 0;
            util.ajax('get', '/cart/list_cart', {}, function(resp){
                var cart = resp.data.response;
                for(var i in cart.list)
                    cart.list[i].checked = false;
                self.carts = cart.list;
                if(cart.list && cart.list.length)
                    self.carts_length = cart.list.length;
            });
        }
    },
    methods : {
        choose_cart(cart) {
            cart.checked = !cart.checked;
            var price = cart.price * cart.num;
            if(cart.checked){
                this.total_price += price;
                this.check_all++;
            }else{
                this.total_price -= price;
                this.check_all--;
            }
        },
        goBack () {
            history.back();
        },
        buyNow () {
            var skus = [];     
            for (var i in this.carts){
                var cart = this.carts[i];
                if (cart.checked == false) continue; 
                skus.push(cart);
            }
            if(skus.length == 0){
                $.alert('请选择商品购买');
                return;
            }
            this.setSkus(skus);
            this.$route.router.go({
                name:'order',
                params:{order_id:0}
            });
        }
    }
}
</script>

<style scoped>
.list-block {margin: 10px 0 0; padding: 0;}
.pro-info img {width:25%; float: left;}
.pro-msg {width: 70%; float: left; margin-left: 10px;}
.pro-msg h4 {width: 100%; font-weight:400; font-size: 0.75rem; margin: 0 0 5px; padding: 0; line-height: 20px;}
.pro-msg .sc {font-size: 12px;}
.sc-val {margin-right: 10px;}
.pro-msg .price {color: #FF6A66; margin-top: 5px;}
.price .pro-num {float: right;}
.opt-btn span{margin-right: 10px; font-size: 20px; color: #ccc;}
.opt-btn .icon-gougouh {color: #FF6A66;}

.check-all {
    width: 30%;
    float: left;
    font-size: 16px;
}
.check-all span {float: left; margin: 1px 0px 0 10px;}
</style>