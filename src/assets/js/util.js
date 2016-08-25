import Vue from 'vue'
//import Resource from 'vue-resource'
import Router from 'vue-router'
import cache from './cache.js'
//Vue.use(Resource);
Vue.use(Router);
var router = new Router()

/*
Vue.http.interceptors.push((request, next) => {
    $.showPreloader();
    next((response) => {
        $.hidePreloader();
        return response
    });
});
*/

var base_url = 'http://dev.naonaome.com';
var kp = '6c0f56ad5d374551ae801920d72bf512';
var util = {
    /*
    ajax : function(method, url, data, callback, auth){
        url = util.gen_url(url, auth);
        if (!url) return;
        var opt = method.toLowerCase() == 'get' ? {params:data} : data;
        Vue.http[method.toLowerCase()](url, opt).then(
            (resp) => {
                if(resp.data.response_header.status != 0){
                    alert(resp.data.response_header.error_info);
                    return;
                }
                callback && callback(resp);
            }, 
            (resp) => {
                $.alert('请求数据失败!');
                return;
            }
        );
    },
    */
    ajax : function(method, url, data, callback, auth){
        url = util.gen_url(url, auth);
        if (!url) return;
        $.ajax({
            type : method,
            url  : url,
            data : data,
            dataType    : 'json',
            contentType : 'application/json',
            success : function(resp, status){
                if(resp.response_header.status != 0){
                    alert(resp.response_header.error_info);
                    return;
                }
                resp.data = resp;
                callback && callback(resp);
            },
            error : function(resp){
                $.alert('请求数据失败!');
            },
            beforeSend : function(){
                $.showPreloader();
            },
            complete : function(xhr, status){
                $.hidePreloader();
            }
        })
    },
    
    gen_url: function(raw_url, auth){
        var url = base_url + raw_url;
        if(auth === false){
            return url;
        }
        var user = cache.get('naonao::user');
        if (!user || !user.basic || !user.basic.userid){
            //location.href = '/login?redirect='+encodeURIComponent(location.href.toString());
            console.log(url);
            var redirect = encodeURIComponent(location.href.toString());
            console.log(redirect);
            router.go({
                path:'/login', 
                query:{redirect:redirect}
            })
            return false;
        }
        var sp = url.indexOf('?') != -1 ? '&' : '?';
        return url+sp+'userid='+user.basic.userid+'&'+'token='+user.basic.token;
    },
    is_int: function(str){
        var reg = /^(-|\+)?\d+$/ ;
        return reg.test(str);
    },
    is_phone: function(str){
        if(!str) return false;
        var reg = /^(1[35678][0-9]{9})$/;
        return reg.test(str);
    },
    is_wx: function(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    query_str : function(){
        var url = window.document.location.href.toString();
        var u = url.split("?"), query_string = {};
        if (typeof(u[1]) == "string") {
            u = u[1].split("&");
            for (var i in u) {
                var j = u[i].split("=");
                query_string[j[0]] = j[1];
            }
        }
        return query_string;
    }
}
Date.prototype.format = function(format) {
   var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
   };
   if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   for (var k in date) {
          if (new RegExp("(" + k + ")").test(format)) {
                 format = format.replace(RegExp.$1, RegExp.$1.length == 1
                        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
          }
   }
   return format;
}

export {util, kp}
