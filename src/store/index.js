import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import { vuexfireMutations } from 'vuexfire'
import category from '@/store/category'
import expense from '@/store/expense'
import income from '@/store/income'
import investment from '@/store/investment'
import loading from '@/store/loading'
import 'firebase/auth'

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    category,
    expense,
    income,
    investment,
    loading
  },
  mutations: {
    ...vuexfireMutations
  }
})
