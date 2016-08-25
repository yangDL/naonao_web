<template>
<div class="pro-info">
    <div class="pro-info-d">
        <img :src="img.src" :width="img.width" :height="img.height" />
        <div class="pro-price" v-text="img.price"></div>
    </div>
    <h4 v-text="img.title"></h4>
</div>
</template>

<script>
export default {
    props: {
        img : {}
    },
    ready () {
        $('.pro-info').width(this.img.width);
    }
}
</script>

<style>
.pro-info {float: left; margin: 10px;}
.pro-info-d {position: relative; width: 100%;}
.pro-price {
    height: 20px;
    font-size: 14px;
    position: absolute;
    right: 5px;
    bottom:5px;
}
.pro-info h4 {font-size: 14px; font-weight: normal; margin: 0;}
</style>