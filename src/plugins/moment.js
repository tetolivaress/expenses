import Vue from 'vue'
import moment from 'moment'
import vueMoment from 'vue-moment'
require('moment/locale/es')

Vue.use(require('vue-moment'), {
  moment
})

moment.locale('es')
export default vueMoment
