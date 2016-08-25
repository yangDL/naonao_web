<template>
<div class="content">
    <header class="bar bar-nav">
        <h1 class="title">NicoJa</h1>
    </header>
    <div class="user-info">
        <div class="user-avatar"><img src="assets/c.png"></div>
        <div class="user-rmb">
            <span class="rmb-info">有0人购买 我的收益：0 RMB</span>
            <span class="user-say">心如止水， 万物皆为精灵</span>
        </div>
        <div class="user-interest row">
            <div class="col-33"><span class="u-num">0</span><span class="u-label">收藏夹</span></div>
            <div class="col-33">
                <span class="left-hr"></span>
                <div class="user-see">
                    <span class="u-num">0</span>
                    <span class="u-label">关注</span>
                </div>
                <span class="left-hr right-hr"></span>
            </div>
            <div class="col-33"><span class="u-num">0</span><span class="u-label">粉丝</span></div>
        </div>
    </div>
    <div class="list-block">
        <ul>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-home"></i></div>
                <div class="item-inner">
                    <div class="item-title">我的提问</div>
                </div>
            </li>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-qianbi"></i></div>
                <div class="item-inner">
                    <div class="item-title">我的回答</div>
                </div>
            </li>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-news"></i></div>
                <div class="item-inner">
                    <div class="item-title">我的评论</div>
                </div>
            </li>
        </ul>
    </div>
    <div class="list-block">
        <ul>
            <li class="item-content item-link" v-link="{name:'my_order'}">
                <div class="item-media"><i class="icon iconfont icon-red"></i></div>
                <div class="item-inner">
                    <div class="item-title">我的订单</div>
                </div>
            </li>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-cart"></i></div>
                <div class="item-inner">
                    <div class="item-title">购物车</div>
                </div>
            </li>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-coupon"></i></div>
                <div class="item-inner">
                    <div class="item-title">优惠券</div>
                </div>
            </li>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-order"></i></div>
                <div class="item-inner">
                    <div class="item-title">我的身材信息</div>
                </div>
            </li>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-news"></i></div>
                <div class="item-inner">
                    <div class="item-title">我的成长</div>
                </div>
            </li>
            <li class="item-content item-link">
                <div class="item-media"><i class="icon iconfont icon-setting"></i></div>
                <div class="item-inner">
                    <div class="item-title">设置</div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<style scoped>
.user-info {width: 100%; overflow: hidden; margin: 44px 0 15px; padding-bottom: 10px; background: #fff; border-bottom: 1px solid #ccc;}
.user-avatar {width: 30%; float: left;}
.user-avatar img {width: 70%; height: 70%; border-radius: 100%; padding: 2px; background: #f4f4f4; margin: 10px 15%;}
.user-rmb {width: 70%; float: left; margin: 19px 0;}
.user-rmb span {float: left;}
.rmb-info {font-size: 14px; padding: 3px 10px; border: 1px solid #C9B27B; border-radius: 5px; color: #C9B27B;}
.user-say {font-size: 12px; color: #ccc; margin-top: 8px;}
.user-interest {width: 100%; margin-top: 20px; text-align: center; font-size: 14px;}
.user-interest span {float: left;}
.user-interest .u-label {width: 100%;}
.user-interest .u-num {font-family: AkzidenzGrotesk; font-size: 24px; width: 100%;}
.user-see {width: 97%; float: left;}
.left-hr {float: left; width: 1px; height: 30px; background: #ccc; margin-top: 15px;}
.right-hr {float: right;}
</style>
<style scoped>
.list-block {margin:0 0 15px; font-size: 16px;}
.list-block .item-media .iconfont {font-size: 18px;}
</style>