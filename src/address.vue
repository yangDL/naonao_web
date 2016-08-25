<template>
<div>
    <header class="bar bar-nav top-bar">
        <span class="icon iconfont icon-back pull-left" @click="goBack"></span>
        <h1 class="title">选择收货地址</h1>
    </header>
    <div class="content">
        <div class="list-block">
            <ul>
            <li class="item-content item-link" v-link="{name:'add_address'}">
                <div class="item-media"><i class="icon icon-f7"></i></div>
                <div class="item-inner">
                    <div class="item-title">添加新地址</div>
                </div>
            </li>
            </ul>
        </div>
        <div class="list-block" v-for="addr in addrs">
            <ul>
            <li class="item-content" @click="choose_addr(addr)">
                <div class="item-inner">
                    <div class="address-info">
                        <span class="name" v-text="addr.name"></span>
                        <span class="phone" v-text="addr.telephone"></span>
                        <div class="address" v-text="addr.province+addr.city+addr.country+' '+addr.address"></div>
                    </div>
                </div>
            </li>
            <li class="item-content">
                <div class="item-inner">
                    <span class="item-op" v-if="addr.is_default"><i class="iconfont icon-gougouh"></i>默认地址</span>
                    <span class="item-op" v-else @click="set_default(addr)"><i class="iconfont icon-unchecked"></i>设为默认</span>
                    <span class="item-op" @click="edit_addr(addr)"><i class="iconfont icon-bianji"></i>编辑</span>
                    <span class="item-op" @click="delete_addr(addr)"><i class="iconfont icon-lajitong-copy"></i>删除</span>
                </div>
            </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import {util} from './assets/js/util.js'
import {setUpdateAddr, setExpressAddr} from './vuex/actions'
import {} from './vuex/getters'
export default {
    data () {
        return {
            order_id:0,
            addrs : []
        }
    },
    vuex : {
        actions : {
            setUpdateAddr, setExpressAddr
        },
    },
    route: {
        data () {
            var self = this;
            this.order_id = this.$route.query.order_id;
            util.ajax('get', '/user/list_address', {}, function(resp){
                var addrs = resp.data.response;
                self.addrs = addrs;
            });
        }
    },
    methods: {
        goBack () {
            history.back();
        },
        set_default (addr) {
            if(addr.is_default == 1) return;
            var self = this;
            util.ajax('get', '/user/set_default_address', {address_id:addr.id}, function(resp){
                for(var i in self.addrs){
                    var obj = self.addrs[i];
                    if(obj.is_default == 1){
                        obj.is_default = 0;
                        break;
                    }
                }
                addr.is_default = 1;
            });
        },
        delete_addr (addr) {
            var self = this;
            var buttons1 = [
                {
                    text: '确认删除',bold: true,color: 'danger',
                    onClick: function() {
                        util.ajax('get', '/user/delete_address',{address_id:addr.id}, function(resp){
                            $.alert('删除地址成功');
                            self.addrs.$remove(addr);
                        })
                    }
                }
            ];
            var buttons2 = [{text: '取消',bg: 'danger'}];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        },
        edit_addr (addr) {
            this.setUpdateAddr(addr);
            this.$route.router.go({name:'update_address'});
        },
        update_order_addr (addr) {
            if(this.order_id > 0){
                var data = {
                    order_id: this.order_id,
                    address_id: addr.id
                }
                util.ajax('get', '/order/update_address', data, function(resp){
                    console.log('更新地址成功');
                });
            }
        },
        choose_addr (addr){
            this.setExpressAddr(addr);
            this.update_order_addr(addr);
            this.$route.router.go({
                name:'order',
                params:{order_id:this.order_id}
            });
        }
    }
}
</script>

<style scoped>
.list-block {margin: 10px 0 0; padding: 0;}
.address-info {margin:10px 5px 0 0; }
.name {float: left; margin-bottom: 10px; font-weight: 400;}
.phone {float: right; margin-right: 5px;}
.address {width:100%; overflow:hidden;color: #777; font-size: 16px;}
.item-op { font-size: 16px; line-height: 27px;}
.item-op i {margin-right: 5px; float: left;font-size: 20px;}
.item-op .icon-bianji {font-size: 18px;}
.icon-gougouh {color: #FF6A66;}
</style>