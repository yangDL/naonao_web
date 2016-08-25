<template>
<div>
    <header class="bar bar-nav top-bar">
        <span class="icon iconfont icon-back pull-left" v-link="{name:'address'}"></span>
        <span class="keep pull-right" @click="add_addr">保存</span>
        <h1 class="title">添加新地址</h1>
    </header>
    <div class="content">
        <edit-addr :pcc.sync="pcc" :idcard.sync="idcard" :addr.sync="addr"></edit-addr>
    </div>
</div>

</template>

<script>
import {util} from './assets/js/util.js'
import editAddr from './components/edit_addr'
export default {
    data () {
        return {
            pcc:'',
            idcard: {
                card_no:'',
                pic1:'',
                pic2:''
            },
            addr : {
                name: "",
                telephone: "",
                zipcode: "",
                province: "",
                city: "",
                country: "",
                address: ""
            }
        }
    },
    components : {editAddr},
    methods: {
        add_addr () {
            var self = this;
            for (var i in this.addr){
                if (this.addr[i] == ''){
                    $.alert('请完善相关信息');
                    return false;
                }
            }
            util.ajax('post', '/user/add_address', this.addr, function(resp){
                $.alert('添加新地址成功');
            });
            if(this.idcard.card_no){
                util.ajax('post', '/user/save_idcard', this.idcard, function(resp){
                    return;
                });
            }
        }
    }
    
}

</script>

<style scoped>
.keep {font-size: 16px; line-height: 2.2rem; display: block; height: 2.2rem; width: 40px; position: relative; z-index: 20;}
</style>