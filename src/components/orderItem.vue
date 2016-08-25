<template>
<li class="item-content"  v-for="sku in skus" @click="gotoDetail(sku)">
    <div class="item-inner">
        <div class="order-pro-info">
            <img :src="sku.img">
            <div class="pro-msg">
                <h4 v-text="sku.name"></h4>
                <div class="sc">
                    <span  v-for="sc in sku.sku">
                        <span v-text="$key+':'"></span><span class="sc-val" v-text="sc"></span>
                    </span>
                </div>
                <div class="price">
                    <span v-text="'¥'+sku.price.toFixed(2)"></span>
                    <span class="pro-num" v-text="'x'+sku.num"></span>
                </div>
            </div>
        </div>
    </div>
    
</li>
</template>

<script>
export default {
    props : {
        islink:false,
        skus:[]
    },
    methods: {
        gotoDetail (sku) {
            if (this.islink == false) return;
            this.$route.router.go({
                name:'item',
                params:{item_id:sku.product_id}
            });
        }
    }
}
</script>

<style scoped>
.order-pro-info img {width:25%; float: left;}
.pro-msg {width: 70%; float: left; margin-left: 10px;}
.pro-msg h4 {width: 100%; font-weight:400; font-size: 0.75rem; margin: 0 0 5px; padding: 0; line-height: 20px;}
.pro-msg .sc {font-size: 12px;}
.sc-val {margin-right: 10px;}
.pro-msg .price {color: #FF6A66; margin-top: 5px;}
.price .pro-num {float: right;}

.order-other-msg {
    width: 100%;
    height: 40px;
    float: left;
}

</style>