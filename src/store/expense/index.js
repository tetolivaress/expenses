import firebase from 'firebase/app'
import 'firebase/auth'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/store/db'

export default {
  namespaced: true,
  state: {
    expenses: []
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
    bindExpenses: firestoreAction(async ({ bindFirestoreRef, commit }) => {
      try {
        commit('loading/SHOW_LOADING')
        const { uid } = firebase.auth().currentUser
        const expenses = db.collection('expenses').where('userId', '==', uid)
        return bindFirestoreRef('expense/expenses', expenses)
      } catch (error) {
        console.log(error)
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
}
