<template>
<div>
    <div class="list-block">
        <ul>
        <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">收货人</div>
                <div class="item-input">
                  <input type="text" placeholder="姓名" v-model="addr.name">
                </div>
                <!--<span class="empty-tip" v-show="!addr.name">*</span>-->
              </div>
            </div>
        </li>
        <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">联系方式</div>
                <div class="item-input">
                  <input type="text" placeholder="手机号码" v-model="addr.telephone">
                </div>
                <!--<span class="empty-tip" v-show="!addr.telephone">*</span>-->
              </div>
            </div>
        </li>
        <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">邮政编码</div>
                <div class="item-input">
                  <input type="text" placeholder="邮政编码" v-model="addr.zipcode">
                </div>
                <!--<span class="empty-tip" v-show="!addr.zipcode">*</span>-->
              </div>
            </div>
        </li>
        <li class="item-content item-link">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
                <div class="item-title label">省/市/区</div>
                <div class="item-input">
                  <input type="text" id='city-picker' v-model="pcc">
                </div>
            </div>
        </li>
        <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-input">
                  <textarea placeholder="街道地址" v-model="addr.address"></textarea>
                </div>
                <!--<span class="empty-tip" v-show="!addr.address">*</span>-->
              </div>
            </div>
        </li>
        </ul>
    </div>
    <div class="ad-card" v-if="idcard">
        <p>身份证信息仅用于商品清关，挠挠平台将进行加密保存，不做任何其他用途。</p>
        <div class="list-block">
        <ul>
        <li>
            <div class="item-content">
              <div class="item-media"><i class="icon icon-form-name"></i></div>
              <div class="item-inner">
                <div class="item-title label">身份证</div>
                <div class="item-input">
                  <input type="text" placeholder="收件人身份证号" v-model="idcard.card_no">
                </div>
              </div>
            </div>
        </li>
        </ul>
        </div>
    </div>
</div>
<div id="toolbar-header" style="display: none;">
    <header class="bar bar-nav">
        <button class="button button-link pull-right close-picker">确定</button>
        <h1 class="title">选择收货地址</h1>
    </header>
</div>
</template>

<script>

export default {
    props: {
        pcc:'',
        idcard: {},
        addr : {}
    },
    ready () {
        var self = this;
        var cityjs = "http://g.alicdn.com/msui/sm/0.6.2/js/sm-city-picker.min.js";
        var cityScript = document.createElement('script');
        cityScript.src = cityjs;
        cityScript.onload = function(){
            $("#city-picker").cityPicker({
                toolbarTemplate: $('#toolbar-header').html()
            });
            $("#city-picker").click();
        }
        !$.fn.cityPicker && $('body').append(cityScript);
    },
    watch : {
        'pcc' (n, o) {
            let lists = n.split(' '), addr = this.addr;
            addr.province = lists[0];
            addr.city = lists[1];
            addr.country = lists[2];
            if (!addr.country){
                addr.province = lists[0];
                addr.city = lists[0];
                addr.country = lists[1];
            }
        }
    }
}

</script>

<style scoped>
.list-block {margin: 10px 0 0; padding: 0;}
.ad-card p {width: 100%;padding: 0 3%;color: #FF6A66;font-size: 12px; margin-top: 40px;}
.empty-tip {color: #FF6A66;}
</style>