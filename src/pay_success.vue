<template>

<header class="bar bar-nav top-bar">
    <span class="icon iconfont icon-order pull-right" v-link="{name:'my_order'}"></span>
    <h1 class="title">支付成功</h1>
</header>
<div class="content">
    <div class="list-block pay">
        <ul>
        <li class="item-content">
            <div class="item-inner">
                <div class="pay-tip">恭喜您，您已支付成功！</div>
            </div>
        </li>
        </ul>
    </div>
    <div class="list-block">
        <ul>
        <li class="item-content">
            <div class="item-media"><i class="icon iconfont icon-dingwei"></i></div>
            <div class="item-inner">
                <div class="express-info">
                    <span class="name" v-text="addr.name"></span>
                    <span class="phone" v-text="addr.telephone"></span>
                    <div class="address" v-text="addr.province+addr.city+addr.country+' '+addr.address"></div>
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
    <div class="pay-btn">
        <a v-link="{name:'my_order'}">查看订单</a>
    </div>
</div>

</template>

<script>
import orderItem from './components/orderItem'
import {getSkus, getExpressAddr} from './vuex/getters'

export default {
    vuex: {
        getters : {
            skus : getSkus,
            addr : getExpressAddr,
        }
    },
    components:{orderItem}
}
</script>

<style scoped>
.pay {margin-top: 20px;}
.pay-tip {width:100%;font-size: 20px; color: #FF6A66;text-align: center;}
.pay-btn a {width: 100%; background: #FF6A66;}
</style>