import Vue from 'vue'
import moment from 'moment'
import vueMoment from 'vue-moment'

Vue.use('moment/locale/es')
Vue.use(vueMoment)

moment.locale('es')
export default vueMoment
