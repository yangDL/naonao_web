import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import Login from './login'
import Register from './register'

import Magazine from './magazine'
import duozhu from './duozhu'
import brand_pros from './brand_pros'

import user from './user'

import square from './square'
import squareItem from './squareItem'
import item from './detail'

import order from './order'
import my_order from './my_order'

import pay_success from './pay_success'

import address from './address'
import add_address from './add_address'
import update_address from './update_address'

import cart from './cart'

import active from './active'

import pullToRefresh from './directives/pullToRefresh'
import infiniteScroll from './directives/infiniteScroll'

import pro from './pro'
import resp from './resp'

Vue.use(Router)

Vue.directive('pullToRefresh', pullToRefresh)
Vue.directive('infiniteScroll', infiniteScroll)

const router = new Router({
    history:false,
    saveScrollPosition:true
})

router.map({
    '/': {component: Login},
    '/login': {
        name : 'login',
        component: Login
    },
    '/magazine': {component: Magazine},
    '/duozhu': {component:duozhu},
    '/brand_pros/:brand_id': {
        name:'brand_pros',
        component:brand_pros
    },
    
    '/square': {
        name:'square',
        component:square
    },
    '/user': {component:user},
    '/squareItem/:order_id': {
        name : 'squareItem',
        component:squareItem
    },
    '/item/:item_id': {
        name : 'item',
        component:item
    },
    '/register': {
        name : 'register',
        component: Register
    },
    '/order/:order_id':{
        name: 'order',
        component:order
    },
    '/my_order':{
        name: 'my_order',
        component:my_order
    },
    '/address':{
        name:'address',
        component:address
    },
    '/add_address':{
        name:'add_address',
        component:add_address
    },
    '/update_address':{
        name:'update_address',
        component:update_address
    },
    '/cart':{
        name:'cart',
        component:cart
    },
    '/pay_success': {
        name:'pay_success',
        component:pay_success
    },
    '/active' : {
        component:active
    },
    '/pro' : {
        component:pro
    },
    '/resp' : {
        component:resp
    },
    
})
router.start(App, '#app')
window.router = router