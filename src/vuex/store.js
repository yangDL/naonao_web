import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    is_index : true,
    base_tags: {},
    skus:[],
    address: {},
    express_addr: {},
    order_info: {}
}

const mutations = {
    IS_INDEX    (state, b) {state.is_index = !!b},
    BASE_TAGS   (state, tags) {state.base_tags = tags},
    SKU         (state, skus)  {state.skus = skus},
    UPDATE_ADDR (state, addr) {state.address = addr},
    EXPRESS_ADDR(state, addr) {state.express_addr = addr},
    ORDER_INFO  (state, order_info) {state.order_info = order_info}
}

export default new Vuex.Store({
    state, mutations
})
