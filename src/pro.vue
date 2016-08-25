<script>

import {util} from './assets/js/util.js'

export default {
    route : {
        data () {
            var querys = util.query_str();
            this.$route.router.go({name:'item', params:{item_id:querys.proid}, query:{sourceid: querys.sourceid || 0}})
        }
    }
}

</script>