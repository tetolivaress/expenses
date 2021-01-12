import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    expenses: [
      {
        asd: 213423
      }
    ]
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindExpenses: firestoreAction(({ bindFirestoreRef }) => {
      // db.collection('expenses')
      //   .get()
      //   .then((doc) => {
      //     doc.forEach((s) => {
      //       console.log(s.data())
      //     })
      //   })

      return bindFirestoreRef('expenses', db.collection('expenses'))
    }),
    addExpense: firestoreAction((context, payload) => {
      // return the promise so we can await the write
      return db.collection('expenses').add(payload)
    })
  },
  modules: {
  }
})
