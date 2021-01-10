import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    expenses: []
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindExpenses: firestoreAction(async ({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`

      const ww = await bindFirestoreRef('expenses', db.collection('expenses'))
      console.log(ww)
      return ww
    })
  },
  modules: {
  }
})
