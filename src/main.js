import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import { i18n } from './plugins/i18n'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueMoment, {
  moment
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
