export const setIndex   = ({dispatch}, b)       => { dispatch('IS_INDEX', b)}

export const setBaseTags= ({dispatch}, tags)    => { dispatch('BASE_TAGS', tags)}

export const setSkus     = ({dispatch}, skus)   => { dispatch('SKU', skus)}

export const setUpdateAddr  = ({dispatch}, addr) => {dispatch('UPDATE_ADDR', addr)}
export const setExpressAddr = ({dispatch}, addr) => {dispatch('EXPRESS_ADDR', addr)}

export const setOrderInfo   = ({dispatch}, order_info) => {dispatch('ORDER_INFO', order_info)}
