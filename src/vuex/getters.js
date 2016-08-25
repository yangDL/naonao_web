export const getIndex   = state => {return state.is_index}
export const baseTags   = state => {return state.base_tags} //基本标签信息

export const getSkus     = state => {return state.skus}  //用户选择购买的商品sku

export const getUpdateAddr  = state => {return state.address} //需要更新地址的信息
export const getExpressAddr = state => {return state.express_addr} //寄送地址

export const getOrderInfo   = state => {return state.order_info} //订单状态信息
