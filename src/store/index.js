import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    expenses: [
      {
        description: 213423
      }
    ]
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindExpenses: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('expenses', db.collection('expenses'))
    }),
    addExpense: firestoreAction((context, payload) => {
      // return the promise so we can await the write
      return db.collection('expenses').add(payload)
    }),
    removeExpense: firestoreAction((context, expense) => {
      db.collection('expenses')
        .doc(expense.id)
        .delete()
    })
  },
  modules: {
  }
})
