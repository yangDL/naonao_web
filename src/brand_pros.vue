<template>
<div>
    <header class="bar bar-nav top-bar">
        <span class="icon iconfont icon-back pull-left" @click="goBack"></span>
        <h1 class="title" v-text="brand.title"></h1>
    </header>
    <div class="content">
        <div class="brand-pro-row">
            <div class="card" v-for="(index, pro) in brand.content.products" v-if="index%2 == 0" @click="toDetail(pro)">
                <div valign="bottom" class="card-header color-white no-border no-padding">
                    <img class='card-cover' :src="pro.img" alt="">
                    <div class="brand-pro-price" v-text="'￥'+pro.price.toFixed(2)"></div>
                </div>
                <div class="card-content">
                    <div v-text="pro.name"></div>
                </div>
            </div>
        </div>
        <div class="brand-pro-row">
            <div class="card" v-for="(index, pro) in brand.content.products" v-if="index%2 == 1" @click="toDetail(pro)">
                <div valign="bottom" class="card-header color-white no-border no-padding">
                    <img class='card-cover' :src="pro.img" alt="">
                    <div class="brand-pro-price" v-text="'￥'+pro.price.toFixed(2)"></div>
                </div>
                <div class="card-content">
                    <div v-text="pro.name"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {setIndex} from './vuex/actions'
import {util} from './assets/js/util.js'
export default {
    data () {
        return {
            brand:{},
        }
    },
    route : {
        data () {
            this.setIndex(true);
            this.brandPros(this.$route.params.brand_id);
        }
    },
    vuex : {
        actions: {setIndex}
    },
    methods : {
        goBack () {
            history.back();  
        },
        brandPros (id) {
            var self = this;
            util.ajax('get', '/magazine/get_magazine', {id:id}, function(resp){
                self.brand =  resp.data.response;
            });
        },
        toDetail (pro) {
            this.$route.router.go({
                name:'item',
                params:{item_id:pro.id},
                query:{redirect: encodeURIComponent(location.href.toString())}
            });  
        }
    }
}
</script>

<style scoped>
.content {margin-bottom: 20px;}
.brand-pro-row {width: 50%; float: left;}
.card {width: 92%; margin: 15px 0 0 5%;}

.card-header {position: relative;}
.brand-pro-price {
    height: 30px;
    position: absolute; 
    bottom: 0; 
    left: 0; 
    right: 0;
    font-size: 16px;
    text-align: right;
    line-height: 30px;
    padding-right: 10px;
    color: #fff;
    background: -webkit-linear-gradient(right, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0) 100%);
    background: -moz-linear-gradient(left, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0) 100%);
    background: -o-linear-gradient(left, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0) 100%);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(0,0,0,0.2)), to(rgba(255,255,255,0)));
    background: linear-gradient(to left, rgba(0,0,0,0.4) 0%, rgba(255,255,255,0) 100%);
}
.card-content div {
    width: 90%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    margin:0 auto;
}
</style>