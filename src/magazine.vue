<template>
<div class="content infinite-scroll-bottom infinite-scroll" 
    v-infinite-scroll="loadMore" data-distance="100">
    <swiper :ads="ads"></swiper>
    <div class="buttons-tab">
        <a v-for="tab in tabs" href="#{{$key}}" class="tab-link button" v-text="tab.name" 
           :class="{'active':active_tab==$key}" @click="activeTab($key)">
        </a>
    </div>
    <div class="tabs">
        <div v-for="stab in tabs" :id="$key" class="tab" :class="{'active':active_tab==$key}">
            <maga :magas="tabs[$key].magas" :key="active_tab"></maga>
            <div class="infinite-scroll-preloader scroll-{{$key}}">
                <div class="preloader"></div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import maga from './components/maga'
import swiper from './components/swiper'
import {util} from './assets/js/util.js'
export default {
    components : {swiper, maga},
    data () {
        return {
            active_tab: 'advice',
            ads : [],
            tabs: {
                'advice': {name:'咨询', page_no:1, page_size:10, category:1, magas:[], loading:false},
                'brand' : {name:'品牌', page_no:1, page_size:10, category:2, magas:[], loading:false},
                'duozhu': {name:'舵主', page_no:1, page_size:10, category:3, magas:[], loading:false}
            }
        }
    },
    ready () {
        this.getAd();
        this.getMagazines();
        this.initTabfix();
        $.init();
    },
    methods: {
        activeTab (key) {
            if(this.active_tab == key) return;
            this.active_tab = key;
            if(this.tabs[key].magas.length > 0) return;
            if(key == 'duozhu') 
                return this.getDuozhu();
            else if (key == 'brand')
                return this.getBrands();
            else
                return this.getMagazines();   
        },
        initTabfix () {
            var h = $('.buttons-tab').offset().top, self = this;
            if(h < 1){
                setTimeout(function(){self.initTabfix()}, 100);
                return;
            }
            $('.buttons-tab').fixedTab({offset:0}); 
        },
        getMagazines (callback) {
            var self = this, tab = this.tabs[this.active_tab];
            var data = {
                page_no:tab.page_no, 
                page_size:tab.page_size
            };
            util.ajax('get', '/magazine/list_magazine', data, function(resp){
                var datas = resp.data.response, len = datas.length;
                if(len > 0){
                    tab.magas.push.apply(tab.magas, datas);
                    tab.page_no++;
                }
                callback && callback(len);
            });
        },
        getBrands (callback) {
            var self = this, tab = this.tabs[this.active_tab];
            var data = {
                page_no:tab.page_no, 
                page_size:tab.page_size
            };
            util.ajax('get', '/magazine/list_brands', data, function(resp){
                var datas = resp.data.response, len = datas.length;
                if(len > 0){
                    tab.magas.push.apply(tab.magas, datas);
                    tab.page_no++;
                }
                callback && callback(len);
            });
        },
        getDuozhu () {
            var self = this;
            var data = this.tabs[this.active_tab];
            util.ajax('get', '/magazine/recommand_users', {}, function(resp){
                data.magas= resp.data.response;
            });
        },
        getAd () {
            var self = this;
            util.ajax('get', '/magazine/list_banners', {}, function(resp){
                self.ads = resp.data.response;
            });
        },
        loadMore () {
            var self = this;
            var tab = this.tabs[this.active_tab];
            if(tab.loading) return;
            tab.loading = true;
            if(this.active_tab == 'duozhu'){
                $('.scroll-duozhu').html('客官、没有更多了~');
            }else if(this.active_tab == 'brand'){
                return this.getBrands(function(len){
                    len > 0 ? tab.loading = false : $('.scroll-'+self.active_tab).html('客官、没有更多了~'); 
                });
            }else{
                return this.getMagazines(function(len){
                    len > 0 ? tab.loading = false : $('.scroll-'+self.active_tab).html('客官、没有更多了~'); 
                });
            }
        }
    }
}

</script>

<style scoped>
.content {padding-bottom: 0px;}
</style>