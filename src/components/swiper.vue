<template>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="ad in ads">
            <a :href="ad.content" :title="ad.title">
                <img :src="ad.bg_url" :title="ad.title" :alt="">
            </a>
        </div>
    </div>
    <div class="swiper-pagination"></div>
</div>
</template>

<script>
export default {
    props: {
        ads: []   
    },
    watch : {
        'ads' (n, o) {
            var len = n.length, sps = [], $sp = $('.swiper-pagination');
            for(var i=0; i < len; i++){
                sps.push('<span class="swiper-pag ination-bullet"></span>');
            }
            $sp.html(sps.join(''));
        }
    },
    ready () {
        this.initSwiper();
    },
    methods: {
        initSwiper () {  
            $(".swiper-container").swiper({
                centeredSlides:true,
                autoplayDisableOnInteraction : false,
                loop:true,
                observer:true,
                observeParents:true,
                autoplay: 2500
            });
        }
    }
}
</script>
<style scoped>
.swiper-container {padding: 0; width: 100%; overflow: hidden;}
.swiper-pagination {position: absolute; bottom: 0;}
.swiper-slide img {width: 100%; height: 100%;}
</style>