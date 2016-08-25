<script>

import {util} from './assets/js/util.js'

export default {
    route : {
        data () {
            var querys = util.query_str();
            this.$route.router.go({name:'squareItem', params:{order_id:querys.respid}, query:{sourceid: querys.sourceid || 0}})
        }
    }
}
</script>