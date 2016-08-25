<template>
<div class="content">
    <div id="duozhu-bg">
        <img id="duozhu-cover">
        <div class="duozhu-back">
            <span class="icon iconfont icon-back pull-left open-panel" data-panel=".panel-left"></span>           
        </div>
        <div class="duozhu-like">与你的相似度<strong>52</strong>%</div>
        <div id="duozhu-avatar"><img src="assets/c.png"></div>
    </div>
    <div class="duozhu-self">
        
        <div class="duozhu-fans">1关注的人， 266粉丝</div>
        <div id="duozhu-concern"><a href="#" class="button button-big button-round">+ 关注</a></div>
        <h4 class="duozhu-name">玉城Tina</h4>
        <div class="duozhu-interest"><span>设计师</span>|<span>白羊座</span>|<span>吃肉, 睡觉, 打游戏</span></div>
        <p class="duozhu-say">撑着油纸伞，独自、 彷徨在悠长，悠长、又寂寥的雨巷，我希望逢着一个丁香一样的结着愁怨的姑娘。</p>
        <div class="duozhu-buy">
            <li><img class="buy-img" src="assets/c.png"></li>
            <li><img class="buy-img" src="assets/c.png"></li>
            <li><img class="buy-img" src="assets/c.png"></li>
            <li><img class="buy-img" src="assets/c.png"></li>
        </div>
    </div>
    <div class="duozhu-keep">
        <h3 class="keep-word">收藏商品</h3>
        <div class="duozhu-pros" v-for="img in imgs">
            <pro-info :img='img'></pro-info>
        </div>
    </div>
</div>
</template>
<script>
import proInfo from './components/proinfo'

export default {
    components : {proInfo},
    data () {
        return {
            imgs: []
        }
    },
    ready () {
        this.set_css();
    },
    methods: {
        set_css: function(){
            var w = $('#duozhu-bg').width(), h = w*0.526, bh = h/8, avaw = w * 0.173;
            $('#duozhu-bg').height(h);
            $('#duozhu-cover').attr('src', '../static/duozhu_cover.jpg');
            $('.duozhu-back').css({'top':bh});
            $('.duozhu-like').css({'top':bh});
            $('.duozhu-self').css('top', h-(avaw-10));
            $('#duozhu-avatar img').css({'width':avaw,'height':avaw});
            $('.duozhu-buy').height(w/3-5);
            $('.buy-img').width(w/3-10);
            var img = {
                src:'https://img.alicdn.com/imgextra/i1/83927870/TB2ESJYsFXXXXb.XXXXXXXXXXXX_!!83927870.jpg',
                width: w/2 - 20,
                height: w/2 - 20,
                price: '￥233.00',
                title: '素白已然-棉麻半身裙文艺范开叉裙'
            };
            this.imgs.push(img);
            var img2 = {
                src:'https://img.alicdn.com/imgextra/i1/83927870/TB2ESJYsFXXXXb.XXXXXXXXXXXX_!!83927870.jpg',
                width: w/2 - 20,
                height: w/2 - 20,
                price: '￥233.00',
                title: '素黑已然-棉麻半身裙文艺范开叉裙'
            };
            this.imgs.push(img2);
        }
    }
}
</script>

<style>

#duozhu-bg {width: 100%; position: relative;}
#duozhu-bg #duozhu-cover {height: 100%; width: 100%; background: #f4f4f4; border: none;}
.duozhu-back {position: absolute; left: 3.33%;}
.duozhu-back span {font-size:24px;}
.duozhu-like { 
    width: 61%; 
    height: 60px;
    line-height: 60px;
    position: absolute; 
    left: 50%;
    margin-left: -30.5%;
    text-align: center;
    border-radius: 15px;
    font-size: 20px;
    background: rgba(255,255,255, 0.8);
}

.duozhu-like strong {
    margin-left: 10px;
    font-size: 28px;
    font-weight:normal;
    font-family: AkzidenzGrotesk;
}

#duozhu-avatar {position: absolute; width: 100%; bottom: -10px;}

#duozhu-avatar img {display:block;border-radius: 100%; padding: 2px; background: #fff; margin: 0 auto;}

.duozhu-self {width: 100%; left: 0; border-bottom: 1px solid #ccc; margin-bottom: 15px; padding-top:10px; background: #fff;}

.duozhu-fans {width: 100%;height: 30px;line-height: 30px;text-align: center;}
#duozhu-concern {width: 100px; margin: 5px auto;}
#duozhu-concern a {width: 100px; border-color: #e6d5c1; color: #e6d5c1; height: 35px; line-height: 35px;}
.duozhu-name { font-size: 24px; font-weight: normal; width: 100%; text-align:center; margin:15px 0 5px;}
.duozhu-interest {width: 100%; font-size: 14px; color: #cececb; text-align: center;}
.duozhu-interest span {margin: 0 10px;}
.duozhu-say { width: 90%; margin: 10px auto 10px; font-size: 14px;}
.duozhu-buy {width:100%; margin: 15px 0; overflow: hidden;}
.duozhu-buy li {list-style: none; float: left;margin: 0 5px;}
.duozhu-keep {width: 100%; background: #fff; overflow: hidden;}
.duozhu-keep h3.keep-word {
    width: 100%; 
    margin:0; 
    height: 50px; 
    text-align: center; 
    font-weight: normal; 
    color: #777; 
    line-height: 50px; 
    border-top: 1px solid #ccc; 
    border-bottom: 1px solid #ccc;
}
</style>