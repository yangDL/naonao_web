<template>
<div class="content">
    <header class="bar bar-nav">
        <!--<span class="icon iconfont icon-close pull-left" @click="goBack"></span>-->
        <h1 class="title">登录</h1>
    </header>
    <div class="list-block">
        <ul>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">
                            <label class="icon iconfont icon-shouji"></label>
                        </div>
                        <div class="item-input">
                            <input @focus="isInput=true" @blur="isInput=false" type="text" v-model="telephone" placeholder="请输入您的手机号码">
                        </div>
                        <span v-show="!isphone" class="input-tip">*</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">
                            <label class="icon iconfont icon-mima-copy-copy"></label>
                        </div>
                        <div class="item-input">
                            <input @focus="isInput=true" @blur="isInput=false" type="password" v-model="password" placeholder="请输入您的密码">
                        </div>
                        <span v-show="!ispwd" class="input-tip">*</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="login-btn">
        <a class="button" @click="Login">登录</a>
        <div class="login-tip">
            <a class="to-reg" v-link="{name:'register'}">前往注册</a>
        </div>
        <!--
        <div class="login-tip">
            <a class="pwd-forget">忘记密码</a><a class="to-reg">注册挠挠</a>
        </div>
        -->
    </div>
    <!--
    <div class="fast-login" v-show="!isInput">
        <div class="fast-login-title">
            <div class="background-border"></div>
            <div class="fast-login-content">快速登录</div>
        </div>
        <div class="row" style="text-align: center; margin-left: 0;">
            <span class="icon iconfont icon-weixin" @click="wxLogin"></span>
            
            <div class="col-33"><span class="icon iconfont icon-weixin"></span></div>
            <div class="col-33"><span class="icon iconfont icon-qq"></span></div>
            <div class="col-33"><span class="icon iconfont icon-xinlang-copy"></span></div>
            
        </div>

    </div>
    -->
</div>
</template>
<script>
import {setIndex} from './vuex/actions'
import {util, kp} from './assets/js/util.js'
import cache from './assets/js/cache.js'
export default {
    data () {
        return {
            telephone : '',
            password : '',
            isphone : true,
            ispwd : true,
            isInput: false
        }
    },
    ready () {
        var user = cache.get('naonao::user');
        if (user && user.basic && user.basic.userid){
            this.$route.router.go({path:'/square'});
        }
    },
    vuex: {
        actions: {
            setIndex
        }
    },
    route: {
        data : function(){
            this.setIndex(false);
        }
    },
    watch : {
        'telephone': function(n, o){
            if(!this.telephone || !util.is_phone(this.telephone)){
                this.isphone = false;
            }else{
                this.isphone = true;
            }
        },
        'password': function(n, o) {
            this.ispwd = this.password.length < 6 ?  false : true;
        }
    },
    methods: {
        Login : function(){
            var self = this;
            if(!this.telephone || !this.isphone || !this.password || !this.ispwd){
                $.alert('请检查帐号和密码');
                return;
            }
            
            var data = {telephone: this.telephone, password:hex_md5(kp+this.password)};
            util.ajax('get', '/user/login', data, function(resp){ 
                var res = resp.data.response;
                console.log(res);
                try{
                    cache.set('naonao::user', res);
                }catch(e){
                    alert('您可能设置了无痕模式，导致web无法运行~');
                    return;
                }
                //self.$route.query.redirect ? alert('login:'+self.$route.query.redirect) : alert('login:/square');
                self.$route.query.redirect ? location.href = decodeURIComponent(self.$route.query.redirect)
                                           : self.$route.router.go({path:'/square'});
            }, false);
        },
        goBack () {
            if (this.$route.query.redirect){
                location.href = decodeURIComponent(this.$route.query.redirect);
            }else {
                history.back();
            }
        },
        wxLogin: function(){
            var self = this; 
            var url = 'https://open.weixin.qq.com/connect/qrconnect?'
            url += 'appid=wx9f1a57d2034d2d7e';
            url += '&redirect_uri='+encodeURIComponent('http://www.naonaome.com');
            url += '&response_type=code&scope=snsapi_login';
            url += '&state=STATE#wechat_redirect';
            
            console.log(url);
        }
    }
}
</script>
<style scoped>
.bar {background: #fff;}
    .title {font-weight: 400;}
    .icon-close {font-size: 20px; color: #777;}
    .list-block {  
        width: 90%;
        margin: 3.5rem auto 0;
        border:1px solid #ccc;
        border-radius: 8px;
        overflow: hidden;
    }
    .login-btn {width: 90%;margin: 1.2rem auto; font-size: 14px; letter-spacing: 1px; line-height: 1.4rem;}
    .fast-login {width: 90%; margin: 3rem auto; font-size: 12px; }
    
    .item-content {padding-right: 0.75rem;}
    .list-block .item-inner {padding: 5px 0;}
    .list-block .item-title.label {width: 40px;}
    .list-block .item-title.label label {font-size: 24px; color: #777;}
    .list-block .item-input input {font-size: 16px;}
    
    .login-btn a.button {border: none; background: #C9B27B; color:#fff; margin-bottom:8px; height: 1.5rem; line-height: 1.5rem; text-align: center;}
    .login-tip a{ color: #333;}
    a.pwd-forget {float: left;}
    a.to-reg {float: right;}
    
    .fast-login-title {position: relative; height: 20px; width: 100%; margin: 0.2rem 0;}
    .background-border {height: 1px; background: #ccc; position: absolute; top:10px; width: 100%;}
    .fast-login-content {
        width: 80px;
        height: 20px;
        line-height: 20px;
        background: #fff;
        text-align: center;
        position: absolute;
        margin-left: -40px;
        left: 50%;
    }
    .icon-weixin {font-size: 50px; color: #00bf93;}
    .icon-qq {font-size: 50px; color:#5a839f;}
    .icon-xinlang-copy {font-size: 50px; color: #f6a700;}
    .input-tip {line-height: 47px; color: red; font-size: 28px;}
</style>