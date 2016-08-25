<template>
<div class="content">
    <div class="detail-bg">
        <div class="detail-tool">
            <span class="icon iconfont icon-back pull-left" @click="goBack"></span>
            <span class="icon iconfont icon-cart pull-right" @click="gotoCart"></span>
            <span class="icon iconfont icon-collect pull-right" @click="ILike" :class="{'like':islike}"></span>
        </div>
        <img :src="product.img" width="100%">
    </div>
    <div class="detail-info">
        <h3 v-text="product.title"></h3>
        <div class="np" v-text="'¥'+product.price.toFixed(2)"></div>
        <s class="op" v-text="'¥'+product.original_price.toFixed(2)"></s>
    </div>
    <div class="detail-desc">
        <p v-text="descs.desc"></p>
        <ul class="desc-imgs">
            <li v-for="img in descs.imgs">
                <img :src="img.url" width="100%">
            </li>
        </ul>
    </div>
    <div class="buttons-tab">
        <a href="#shop-explain" class="tab-link active">
            <span class="icon iconfont icon-gift-2"></span>
            <span class="span-text">购物说明</span>
        </a>
        <a href="#deal-explain" class="tab-link tab-last">
            <span class="icon iconfont icon-wuliukuaidi"></span>
            <span class="span-text">货物退换说明</span>
        </a>
    </div>
    <div class="tabs">
        <div class="tab active" id="shop-explain">
            <p><b>(1)</b>如商品由美国发货，一般时效为1-3个工作日完成备货，境外当地物流+国际物流+国内配送大概10-15个工作日，整体时长在15-20个工作日左右，如发生客观延迟因素，会及时告知；</p>
            <p>如商品由韩国发货，一般下单后，韩国需配货4-10个工作日发出，如遇热款配货慢日期会顺延。整体到货时长在7-14个工作日左右，如发生客观延迟因素，会及时告知；</p>
            <p>如商品由国内发货，一般下单后，当天完成配货后工作日发出，如遇热款配货慢日期会顺延。整体到货时长在5个工作日之内，如发生客观延迟因素，会及时告知；</p>
            <p><b>(2)</b>此商品非现货，存在缺货可能，下单后会第一时间进行确认；</p>
            <p><b>(3)</b>拍下后有可能会遇到砍单情况，如遇到砍单，我们会在第一时间联系你，可以选择让我再次采购或者退款。</p>
            <p><b>(4)</b>长距离运输有可能出现外包装破损或者商品轻微瑕疵情况，但不影响使用，另外下单时请注意尺码（美码是US码），海淘商品非质量问题不退不换，首次海淘者特别提醒；</p>
            <p><b>(5)</b>挠挠支持下单后1小时内无理由取消，超过1个小时后如需修改或者取消订单，请直接联系我进行确认；</p>
            <p><b>(6)</b>当发生极其小概率的被税情况时，需要你来支付税费；</p>
            <p><b>(7)</b>由于运费和被税的问题，海淘商品默认简易包装，如需商品原包装请与我联系，需要酌情补缴运费。</p>
        </div>
        <div class="tab" id="deal-explain">
            <p>国内品牌商品提供七天无理由退换货服务；国外品牌商品因代购的特殊性质，非质量问题不提供退换货服务。签收包裹前，若发现收到的物品受损、丢失、数量不够、物品不相符的情况，请直接拒签并与平台客服进行联系；</p>
            <b>以下情况可申请退货服务：</b>
            <p>1、实际收到的商品与订单商品的型号、尺码、颜色、样式等规格不符</p> 
            <p>2、到手商品发生破损、缺失等质量问题，影响正常使用。</p> 
            <p>3、包裹丢失；</p> 
            <b>以下情况不可申请退货服务：</b> 
            <p>1、由于运输过程中的不可阻抗因素，商品出现轻微磨损，但不影正常使用</p> 
            <p>2、自身原因（包括但不限于后悔购买，个人喜好，尺寸不合适等何其他原因）</p>
        </div>
    </div>
    <div class="detail-buy">
        <a class="custom"><span class="icon iconfont icon-kefu"></span></a>
        <a class="cart" @click="showSku(0)" v-if="!product.is_down">加入购物车</a>
        <a class="buy"  @click="showSku(1)" v-if="!product.is_down">立刻购买</a>
        <a class="outstock" v-if="product.is_down">已下架</a>
    </div>
</div>
<div class="popup popup-cart">
    <div class="content-block close-popup"></div>
    <div class="show-sku">
        <div class="sp-info">
            <div class="close-popup"><span class="icon iconfont icon-close"></span></div>
            <img :src="pro_sku.img">
            <div class="sp-desc">
                <div class="sp-price"><span v-text="'¥'+sku.info.price.toFixed(2)"></span></div>
                <div class="sp-title"><span v-text="pro_sku.name"></span></div>
                <div class="sp-stock"><span v-text="'库存：'+sku.info.stock+' 件'"></span></div>
            </div>
        </div>
        <div class="sku-list" v-for="dis in pro_sku.sku_display">
            <div class="sku-name" v-text="dis.name+'：'"></div>
            <div class="sku-opt">
                <li v-for="opt in dis.value">
                    <a v-text="opt" :class="{'active':opt == sku.info.sku_info[dis.name]}" @click="select_sku(dis.name, opt)"></a>
                </li>
            </div>
        </div>
        <div class="sku-num">
            <div class="sn-name">数量：</div>
            <div class="sn-op">
                <span class="icon iconfont icon-jian" @click="mudNum"></span>
                <span class="sn-num" v-text="sku.num"></span>
                <span class="icon iconfont icon-jia-2" @click="addNum"></span>
            </div>
        </div>
        <div class="a-btn" @click="buy_type == 0 ? addCart() : buyNow()"><a >确定</a></div>
    </div>
</div>
</template>

<script>
import {util} from './assets/js/util.js'
import {baseTags} from './vuex/getters'
import {setSkus, setIndex} from './vuex/actions'
export default {
    data () {
        return {
            islike  : false,
            buy_type: 0,
            product :{
                price:99999,
                original_price:99999
            },
            descs  :{},
            pro_sku:{
                sku_display:[],
                sku_list:[]
            },
            sku: {
                num: 1,
                img:'',
                name:'',
                product_id:'',
                source_uid:0,
                info:{
                    price:99999,
                    stock:0
                }
            }
        }
    },
    vuex : {
        actions : {setSkus, setIndex}
    },
    ready () {
        var h = $(window).height();
        $('.show-sku').css({'max-height':h*0.9});
    },
    route : {
        data () {
            this.setIndex(false);
            this.sku.source_uid = this.$route.query.sourceid;
            this.getItem();
        }
    },
    methods: {
        getItem () {
            var self = this;
            util.ajax('get', '/product/detail', {product_id:this.$route.params.item_id}, function(resp){
                var product = resp.data.response;
                self.product = product;
                self.descs = JSON.parse(product.detail_url);
            });
        },
        goBack () {
            history.back();
        },
        gotoCart () {
            this.$route.router.go({
                name:'cart'
            });
        },
        ILike () {
            var self = this;
            this.islike = !this.islike;
            if(this.islike){
                util.ajax('get', '/product/like', {product_id:this.$route.params.item_id}, function(resp){
                    console.log(self.islike);
                });
            }else{
                util.ajax('get', '/product/unlike', {product_id:this.$route.params.item_id}, function(resp){
                    console.log(self.islike);
                });
            }
        },
        showSku (type) {
            this.buy_type = type;
            var self = this;
            util.ajax('get', '/cart/sku_list', {product_id:this.$route.params.item_id}, function(resp){
                var pro_sku = resp.data.response;
                self.pro_sku = pro_sku;
                self.sku.name = pro_sku.name;
                self.sku.img = pro_sku.img;
                self.sku.info = $.extend(true, {}, pro_sku.sku_list[0]);
                self.$nextTick(function(){
                    $.popup('.popup-cart');
                    $(document).on('opened','.popup-cart', function () {
                        $('.modal-overlay-visible').remove();
                    });
                })
            })
        },
        mudNum () {
            this.sku.num = this.sku.num > 0 ? this.sku.num-1 : 0;
        },
        addNum () {
            var stock = this.sku.info.stock;
            this.sku.num = this.sku.num < stock ? this.sku.num+1 : stock;
        },
        select_sku (key, value){
            var info = $.extend(true, {}, this.sku.info.sku_info);
            info[key] = value;
            for (var i in this.pro_sku.sku_list){
                var _info = this.pro_sku.sku_list[i], is_opt = true;
                for(var j in info){
                    if(info[j] != _info.sku_info[j]){
                        is_opt = false;
                        break;
                    }
                }
                if(is_opt){
                    this.sku.info = _info;
                    return;
                }
            }
        },
        addCart () {
            var data = {
               sku_id:this.sku.info.sku_id, 
               num:this.sku.num, 
               source_uid:this.sku.source_uid
            };
            util.ajax('get', '/cart/add_cart', data, function(resp){
                $.closeModal();
                $.alert('添加购物车成功');
            });
        },
        buyNow () {
            var skus = [], sku = this.sku;
            skus.push({
                id  : 0,
                num : sku.num,
                name: sku.name,
                img : sku.img,
                sku : sku.info.sku_info,
                price   : sku.info.price,
                sku_id  : sku.info.sku_id,
                product_id  : sku.product_id,
                source_uid  : sku.source_uid
            });
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
.content {background: #F7F7F7;padding-bottom: 50px;}
.icon-cart {margin-left: 20px; margin-right: 10px;}
.detail-bg, .detail-info,.detail-desc {width: 100%;overflow: hidden;text-align: center; color: #575754;}
.detail-tool {
    width: 100%;
    height: 80px;
    position: fixed; top: 0; left: 0;
    padding: 10px;
    background: -webkit-linear-gradient(rgba(0,0,0,0.2) 0%, rgba(255,255,255,0) 100%);
    background: -moz-linear-gradient(rgba(0,0,0,0.2) 0%, rgba(255,255,255,0) 100%);
    background: -o-linear-gradient(rgba(0,0,0,0.2) 0%, rgba(255,255,255,0) 100%);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(0,0,0,0.2)), to(rgba(255,255,255,0)));
    background: linear-gradient(rgba(0,0,0,0.2) 0%, rgba(255,255,255,0) 100%); 
}
.detail-tool span {color: #fff; font-size: 24px;}
.detail-tool .like {color:#FF6A66;}
.detail-info {padding: 0 20px; margin:5px 0; border-bottom: 1px solid #eee;}
.detail-info h3 {width: 100%; line-height: 25px; margin: 0 0 5px 0; padding: 0; font-weight: 500; font-size: 16px;}
.detail-info .np {color: #FF6A66; font-weight: 500; font-size: 18px;}
.detail-info .op {color: #BAB3B3; font-size: 14px; display: block; margin-bottom: 20px;}
.detail-desc p {padding:0 10px; margin: 10px 0;}
.desc-imgs {padding: 0 15px 10px;}
.desc-imgs li {list-style: none;}

.buttons-tab {padding: 0 4%;background: none;}
.buttons-tab:after {height: 0px;}
a.tab-link {
    display: block;
    width: 50%;
    float: left;
    text-align: center;
    border:1px solid #eee;
    color: #ccc;
    background: #fff;
}
a.tab-last {border-left: none;}
a.tab-link.active {color: #FF6A66;}
.tab-link span {width: 100%; display: block; font-size:14px; margin: 2px 0; padding: 0;}
.tab-link span.icon {font-size: 20px; height: 23px; margin-bottom: 0;}

.tabs .tab {padding: 0 4%; width: 100%; font-size: 12px; color: #999; margin-bottom: 20px;}

.tab p {text-indent:2em; margin: 3px;}

.detail-buy {
    width: 100%;
    height: 50px;
    position: fixed;
    position:device-fix‌​ed;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 50px;
}
.detail-buy a {
    display: block;
    height: 50px;
    float: left;
    border-top:1px solid #eee;
    color: #353557;
    background: #fff;
    
}

.custom {width: 24%;}
.custom span {font-size: 30px; color: #FF6A66;}
.detail-buy .cart,.detail-buy .buy, .detail-buy .outstock {width: 38%; background: rgb(250,128,10); color: #fff;}
.detail-buy .buy {background: #FF6A66;}
.popup-cart {background: rgba(0,0,0, 0.4);}

.detail-buy .outstock {width: 76%; background: #ccc;}

.content-block {width: 100%; overflow: hidden; position: absolute; top: 0; bottom: 0; z-index: 1;}
.show-sku {width: 100%; position: absolute; bottom:0; left: 0; background: #fff; z-index: 2; overflow-y: auto;}
.show-sku .close-popup {font-size: 14px; height: 14px; color: #FF6A66; position: absolute; right: 10px; top: 5px;}
.sp-info {width: 100%; float: left; border-bottom: 1px solid #ccc;}
.sp-info img {width: 30%; padding:5px 10px; float: left;}
.sp-desc {float: left; width: 65%; margin-top: 5px;}
.sp-desc div {width: 100%; overflow: hidden;}
.sp-desc .sp-price {color: #FF6A66; font-weight: 400;}
.sp-desc .sp-title {font-size: 14px; color: #666;}
.sp-stock {font-size: 12px; color: #999;}
.sku-list, .sku-num {width: 100%; padding:5px 10px;overflow: hidden;}
.sku-list li {list-style: none; float: left;  min-width: 60px; text-align:center; margin: 5px;}
.sku-list a {color: #353557;padding:10px 10px 3px 7px;}
.sku-list a.active {border-bottom: 2px solid #FF6A66;}
.sku-name,.sn-name {font-size: 14px; color: #353557;}
.sku-opt {font-size: 14px;}
.sn-name {float: left;}
.sn-op {float: right; height: 30px; margin-right: 10px;font-size: 18px;}
.sn-num { width: 50px; height: 25px; line-height: 25px; text-align: center; display: inline-block;}
.sn-op .icon {font-size: 16px;}
.a-btn {width: 100%; height: 50px; text-align: center; background: #353557;}
.a-btn a {width: 100%; height: 100%; line-height: 50px; color: #fff;}
</style>