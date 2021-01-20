import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './db'
import user from './user'
import createPersistedState from 'vuex-persistedstate'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  plugins: [createPersistedState()],
  state: {
    expenses: [
      {
        description: '',
        amount: 0
      },
      {
        description: '',
        amount: 5
      }
    ]
  },
  getters: {
    spent: state => {
      return state.expenses.length
        ? state.expenses
          .map(expense => Number(expense.amount))
          .reduce((acc, current) => acc + current)
        : 'Aún no tienes nada Registrado'
    }
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindExpenses: firestoreAction(({ bindFirestoreRef }) => {
      const user = firebase.auth().currentUser
      console.log(user)
      return bindFirestoreRef('expenses', db.collection('expenses').where('userId', '==', user.uid))
    }),
    addExpense: firestoreAction((context, payload) => {
      // return the promise so we can await the write
      return db.collection('expenses').add(payload)
    }),
    removeExpense: firestoreAction((context, expense) => {
      db.collection('expenses')
        .doc(expense.id)
        .delete()
    }),
    updateExpense: firestoreAction((context, expense) => {
      console.log(expense)
      db.collection('expenses')
        .doc(expense.id)
        .update({ description: expense.description, amount: expense.amount })
        .then(() => {
          console.log('expense updated!')
        })
    })
  }
})
