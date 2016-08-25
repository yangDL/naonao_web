<template>
<div class="maga-list">
    <ul  v-if="key == 'advice'">
        <li v-for="maga in magas">
            <a :href="maga.content">
                <img :src="maga.img">
                <h4 v-text="maga.title"></h4>
                <div class="user-info">
                    <span v-text="maga.author"></span>|<span v-text="maga.publish_time"></span>
                </div>
            </a>
            
        </li>
    </ul>
    <ul  v-if="key == 'brand'">
        <li v-for="maga in magas">
            <a v-link="{name:'brand_pros', params:{brand_id:maga.id}}">
                <img :src="maga.img">
                <h4 v-text="maga.title"></h4>
                <div class="user-info">
                    <span v-text="maga.publish_time"></span>
                </div>
            </a>
            
        </li>
    </ul>
    <ul v-if="key == 'duozhu'">
        <li v-for="maga in magas">
            <a class="maga-duozhu">
                <img :src="maga.extra_info.background">
                <div class="introduce" v-text="maga.extra_info.introduce"></div>
                <div class="d-info">
                    <img :src="maga.avatar">
                    <div class="di">
                        <span v-text="maga.create_time"></span>
                        <span class="di-nick" v-text="decodeURI(maga.nickname)"></span>
                    </div>
                    <!--<div class="di-btn"><a href="#" class="button button-big button-round">+ 关注</a></div>-->
                </div>
            </a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props : {
        key: '',
        magas : []
    }
}
</script>

<style scoped>
.maga-list {overflow: hidden; background: #fff;}
.maga-list li {list-style: none; width: 100%; margin: 20px 0; padding:2% 3%;  border-bottom: 1px solid #F4F4F4;}
.maga-list li img { width: 100%;}
.maga-list h4 {
    margin:10px 0 5px; 
    text-align: center; 
    color: #555; 
    font-weight: normal;
    font-size: 18px;
    letter-spacing: 1px;
}
.maga-list .user-info {
    height: 25px;
    text-align: center;
    font-size: 12px;
    color: #999;
}
.maga-list .user-info span {margin:0 5px;}

.introduce {
    width: 100%;
    line-height: 30px;
    font-size: 0.75rem;
    color: #575754;
    margin-top: 15px;
    text-align: center;
}
.d-info {width: 100%; overflow: hidden; margin-top: 10px;}
.maga-list .d-info img {float: left; width: 50px; height: 50px; border-radius: 100%; border: 1px solid #C9B27B;}
.di {float: left; margin-left: 10px;}
.di span {display: block; font-size: 14px; color: #babab3; line-height: 20px; margin-top: 3px;}
.di span.di-nick { font-size: 18px; color: #C9B27B;}
.di-btn {float: right; margin-top: 5px;}
.di-btn a {width: 100px; border-color: #e6d5c1; color: #e6d5c1; height: 40px; line-height: 40px;}
</style>