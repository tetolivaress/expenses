import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import category from '@/store/category'
import expense from '@/store/expense'
import loading from '@/store/loading'
import 'firebase/auth'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    category,
    expense,
    loading
  },
  plugins: [createPersistedState()]
})
