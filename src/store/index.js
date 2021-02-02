import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/store/db'
import user from '@/store/user'
import category from '@/store/category'
import firebase from 'firebase/app'
import 'firebase/auth'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    category
  },
  plugins: [createPersistedState()],
  state: {
    expenses: [],
    isLoading: false
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
    setLoading (state, payload) {
      state.isLoading = payload
    },
    ...vuexfireMutations
  },
  actions: {
    bindExpenses: firestoreAction(async ({ bindFirestoreRef, commit }) => {
      try {
        commit('setLoading', true)
        const { uid } = await firebase.auth().currentUser
        const expenses = await db.collection('expenses').where('userId', '==', uid)
        return bindFirestoreRef('expenses', expenses)
      } catch (error) {
        console.log(error)
      } finally {
        // commit('setLoading', false)
      }
    }),
    addExpense: firestoreAction((context, payload) => {
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
