<template>
<div>
    <header class="bar bar-nav top-bar">
        <span class="icon iconfont icon-back pull-left" v-link="{name:'address'}"></span>
        <span class="keep pull-right" @click="update_addr">更新</span>
        <h1 class="title">添加新地址</h1>
    </header>
    <div class="content">
        <edit-addr :pcc.sync="pcc" :idcard="false" :addr.sync="addr"></edit-addr>
    </div>
</div>

</template>

<script>
import {util} from './assets/js/util.js'
import editAddr from './components/edit_addr'
import {getUpdateAddr} from './vuex/getters'

export default {
    data () {
        return {
            pcc:''
        }
    },
    vuex : {
        getters : {
            addr:getUpdateAddr
        }
    },
    route : {
        data (){
            var addr = this.addr;
            this.pcc = addr.province+' '+addr.city+' '+addr.country;
        }
    },
    components : {editAddr},
    methods: {
        update_addr () {
            console.log(JSON.stringify(this.addr));
            var self = this;
            for (var i in this.addr){
                if (this.addr[i] === ''){
                    $.alert('请完善相关信息');
                    return false;
                }
            }
            util.ajax('post', '/user/update_address', this.addr, function(resp){
                $.alert('更新地址成功');
            });
        }
    }
    
}

</script>

<style scoped>
.keep {font-size: 16px; line-height: 2.2rem; display: block; height: 2.2rem; width: 40px; position: relative; z-index: 20;}
</style>