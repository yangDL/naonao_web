<template>
<div class="content">
    <header class="bar bar-nav">
        <!--<span class="icon iconfont icon-close pull-left" @click="goBack"></span>-->
        <h1 class="title">注册</h1>
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
                            <input @focus="isInput=true" @blur="isInput=false" type="password" v-model="password" placeholder="不少于8位的密码">
                        </div>
                        <span v-show="!ispwd" class="input-tip">*</span>
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
                            <input @focus="isInput=true" @blur="isInput=false" type="password" v-model="pwd2" placeholder="请再次输入您的密码">
                        </div>
                        <span v-show="!ispwd2" class="input-tip">*</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="item-content">
                    <div class="item-inner">
                        <div class="item-title label">
                            <label class="icon iconfont icon-icon"></label>
                        </div>
                        <div class="item-input">
                            <input @focus="isInput=true" @blur="isInput=false" type="text" v-model="code" placeholder="手机短信验证码">
                        </div>
                        <a class="button code-btn" @click="getCode" v-text="code_status">获取验证码</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="login-btn">
        <a class="button" @click="toActive">注册</a>
        <div class="login-tip">
            <a class="to-reg" v-link="{name:'login'}">前往登录</a>
        </div>
    </div>
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
            password:'',
            pwd2:'',
            code:'',
            code_time:300,
            code_status:'验证码',
            isphone : true,
            ispwd:true,
            ispwd2:true,
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
            var user = cache.get('naonao::user');
            if (user && user.basic && user.basic.userid){
                this.$route.router.go({path:'/square'});
            }
        }
    },
    watch : {
        'telephone' (n, o){
            if(!this.telephone || !util.is_phone(this.telephone)){
                this.isphone = false;
            }else{
                this.isphone = true;
            }
        },
        'password' (n, o) {
            this.ispwd = this.password.length < 8 ?  false : true;
        },
        'pwd2' (n, o){
            this.ispwd2 = (this.password == this.pwd2); 
        }
    },
    methods: {
        toActive () {
            try{
                cache.set('naonao::pass', 'true');
            }catch(e){
                alert('您可能设置了无痕模式，导致本网站无法运行~');
                return;
            } 
            var self = this;
            if(!this.telephone || !this.isphone || !this.ispwd || !this.ispwd2 || !this.code){
                $.alert('输入信息有误，请检查下');
                return;
            }
            var data = {
                telephone: this.telephone, 
                password:hex_md5(kp+this.password), 
                nickname:this.telephone
            };
            util.ajax('get', '/user/verify_code', {telephone:this.telephone, code:this.code}, function(resp){
                util.ajax('get', '/user/register', data, function(resp){
                    var res = resp.data.response;
                    self.$route.router.go({path:'/login'});
                }, false);
            }, false);
            
        },
        countdown () {
            var self = this;
            setTimeout(function(){
                if(self.code_time > 0){
                    self.code_time--;
                    var fen = parseInt(self.code_time/60), sec = parseInt(self.code_time % 60);
                    fen = fen > 10 ? fen : '0'+fen;
                    sec = sec > 10 ? sec : '0'+sec;
                    self.code_status = fen +':'+ sec;
                    self.countdown();
                }else{
                    self.code_time = 300;
                    self.code_status = '验证码'
                }
            }, 1000);
        },
        getCode () {
            if(this.code_time != 300)
                return;
            var self = this;
            if(!this.telephone || !this.isphone){
                $.alert('输入手机格式有误，请检查下');
                return;
            }
            this.countdown();
            console.log('get code');
            util.ajax('get', '/user/get_registration_code', {telephone:this.telephone}, function(resp){
                $.alert('已发送至您的手机,有效期5分钟');
                return;
            }, false);
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
    .code-btn {border-color: #FF6A66; color: #FF6A66;}
</style>