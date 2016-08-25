export default {
    bind() {
        let el = $(this.el)
        el.on('scroll', () => {
            let height = parseFloat(el.height())
            let scrollTop = parseFloat(el.scrollTop())
            let totalHeight = height + scrollTop
            if(el[0].scrollHeight - totalHeight <= 3) {
                this.vm[this.expression]()
            }
        })
    }
}