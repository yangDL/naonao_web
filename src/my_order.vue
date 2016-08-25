<template>
<div>
    <header class="bar bar-nav top-bar">
        <h1 class="title">我的订单</h1>
    </header>
    <div v-infinite-scroll="loadMore" data-distance="100" class="infinite-scroll-bottom infinite-scroll content">
        <div class="buttons-tab">
            <a v-for="tab in tabs" href="#{{$key}}" class="tab-link button" v-text="tab.name" 
               @click="genTab($key)" :class="{'active':active==$key}">
            </a>
        </div>
        <div class="tabs">
            <div v-for="stab in tabs" :id="$key" class="tab"  :class="{'active':active==$key}">
                <div class="list-block" v-for="order in stab.orders">
                    <div class="order-time" v-text="order.create_time"></div>
                    <ul>
                        <order-item :skus="order.sku_list" :islink="true"></order-item>
                        <div class="card-footer">
                            <div class="pay-num">
                                <span>共付款:</span>
                                <span class="price" v-text="'¥'+order.total_price.toFixed(2)"></span>
                            </div>
                            <div class="my-order-pay" v-if="order.status==0">
                                <span>订单即将取消</span>
                                <a @click="gotoPay(order)">付款</a>
                            </div>
                            <div class="my-order-cancel" v-if="order.status==1">
                                <span>订单已取消</span>
                                <a @click="deleteOrder(order)">删除</a>
                            </div>
                            <div class="my-order-success" v-if="order.status==2">
                                <a class="btn-collect" @click="signOrder(order)">确认收货</a>
                            </div>
                            <div class="my-order-say" v-if="order.status==3">
                                <span class="rate-tip">前往挠挠APP评价</span>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {util} from './assets/js/util.js'
import orderItem from './components/orderItem'
import {setIndex} from './vuex/actions'
export default {
    data () {
        return {
            active:'all',
            tabs : {
                'all'   : {name:'全部', page_no:1, page_size:10, status:-1,  orders:[], loading:false},
                'prepay': {name:'等待付款', page_no:1, page_size:10, status:0,  orders:[], loading:false},
                'payed' : {name:'待收货', page_no:1, page_size:10, status:2,  orders:[], loading:false},
                'rate'  : {name:'完成', page_no:1, page_size:10, status:3,  orders:[], loading:false}
            }
        }
    },
    components: {orderItem},
    route : {
        data () {
            this.getOrderList();
            this.setIndex(true);
        }
    },
    vuex : {
        actions: {setIndex}
    },
    ready () {
        this.initTabfix();  
    },
    methods: {
        initTabfix () {
            var h = $('.buttons-tab').offset().top, self = this;
            if(h < 1){
                setTimeout(function(){self.initTabfix()}, 100);
                return;
            }
            $('.buttons-tab').fixedTab({offset:44}); 
        },
        genTab(key){
            if(this.active == key) return;
            this.active = key;
            if(this.tabs[key].orders.length > 0) return;
            return this.getOrderList();
        },
        getOrderList (callback) {
            var tab = this.tabs[this.active];
            var data = {
                page_no:tab.page_no, 
                page_size:tab.page_size, 
                status:tab.status
            };
            util.ajax('get', '/order/list_order', data, function(resp){
                var orders = resp.data.response, len = orders.length;
                if(len > 0){
                    tab.orders.push.apply(tab.orders, orders);
                    tab.page_no++;
                }
                callback && callback(len);
            });
        },
        gotoPay (order) {
            this.$route.router.go({
                name:'order',
                params:{order_id:order.order_id}
            });
        },
        signOrder (order) {
            var data = {order_id:order.order_id}, tab = this.tabs[this.active], self = this;
            var buttons1 = [
                {
                    text: '确认签收',bold: true,
                    onClick: function() {
                        util.ajax('get', '/order/sign_order', data, function(resp){
                            $.alert('签收订单成功');
                            if(self.active == 'all'){
                                order.status=3;
                            }else{
                                tab.orders.$remove(order);
                            }
                        })
                    }
                }
            ];
            var buttons2 = [{text: '取消',bg: 'danger'}];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        },
        deleteOrder(order) {
            var data = {order_id:order.order_id}, tab = this.tabs[this.active];
            var buttons1 = [
                {
                    text: '确认删除',bold: true, color: 'danger',
                    onClick: function() {
                        util.ajax('get', '/order/delete_order', data, function(resp){
                            $.alert('删除订单成功');
                            tab.orders.$remove(order);
                        })
                    }
                }
            ];
            var buttons2 = [{text: '取消',bg: 'danger'}];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        },
        loadMore () {
            var self = this;
            var tab = this.tabs[this.active];
            if(tab.loading) return;
            tab.loading = true;
            return this.getOrderList(function(len){
                len > 0 ? tab.loading = false : $.alert('没有更多了！');
            });
        }
    }
}
</script>

<style scoed>
.header { margin: 0;}
.buttons-tab {
    background: #fff;
    margin: 0;
}
.order-time {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #999;
    background: #fff;
}
.my-order-pay, .my-order-success, .my-order-say, .my-order-cancel {
    line-height: 30px;
    text-align: center;
    font-size: 12px;
}
.my-order-pay a, .my-order-cancel a {
    float:right; width: 50px; height: 25px; 
    text-align: center; line-height: 25px;
    background: #B5A06F; color: #fff;
    border-radius: 3px;
    margin-left: 5px;
}
.my-order-cancel a {background: #FF6A66;}
.my-order-success a, .my-order-say a {
    float: right;
    width: 60px;
    height: 30px;
    border-radius: 3px;
    margin-left: 5px;
    border:1px solid #353557;
    color: #353557;
   
}
.my-order-success .btn-collect {border-color: #FF6A66; color: #FF6A66;}

.rate-tip {color: #FF6A66; font-size: 14px;}
</style>