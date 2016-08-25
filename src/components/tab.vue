<template>
<div>
    <div class="buttons-tab">
        <a v-for="tab in tabs" href="#{{$key}}" class="tab-link button" 
           v-text="tab.name" :class="{'active':tab.categroy == 1}"
           @click="activeTab($key)">
        </a>
    </div>
    <div class="tabs">
        <div v-for="stab in tabs" :id="$key" class="tab" 
            :class="{'active':stab.categroy == 1}" >
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        active_tab : '',
        tabs : []
    },
    ready () {
        this.initTabfix();
    },
    methods: {
        initTabfix () {
            var h = $('.buttons-tab').offset().top, self = this;
            if(h < 1){
                setTimeout(function(){self.initTabfix()}, 100);
                return;
            }
            $('.buttons-tab').fixedTab({offset:0}); 
        },
        activeTab (key) {
            this.active_tab = key;
        }
    }
}
</script>

<style>
</style>