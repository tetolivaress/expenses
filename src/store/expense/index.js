import firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '@/store/db'

export default {
  namespaced: true,
  state: {
    expenses: []
  },
  getters: {
    spent: ({ expenses }) => {
      return expenses.length
        ? expenses
          .map(expense => Number(expense.amount))
          .reduce((acc, current) => acc + current)
        : 'Aún no tienes nada Registrado'
    },
    sortedExpenses: ({ expenses }, { spent }, rootState) => {
      return rootState.category.categories.map(category => {
        return {
          expenses: expenses.filter(expense => category.id === expense.categoryId),
          category: category.name
        }
      })
    },
    withoutCategory: ({ expenses }) => expenses.filter(expense => !expense.categoryId)
  },
  actions: {
    bindExpenses: firestoreAction(async ({ bindFirestoreRef, commit }) => {
      try {
        const { uid } = firebase.auth().currentUser
        const expenses = db.collection('expenses').where('userId', '==', uid)
        return bindFirestoreRef('expenses', expenses)
      } catch (error) {
        console.log(error)
      }
    }),
    addExpense: firestoreAction(({ commit }, payload) => {
      commit('loading/SET_LOADING', true, { root: true })
      return db.collection('expenses').add(payload)
    }),
    removeExpense: firestoreAction(({ commit }, expense) => {
      commit('loading/SET_LOADING', true, { root: true })
      db.collection('expenses')
        .doc(expense.id)
        .delete()
        .then(() => commit('loading/SET_LOADING', false, { root: true }))
    }),
    updateExpense: firestoreAction((context, expense) => {
      console.log(expense)
      db.collection('expenses')
        .doc(expense.id)
        .update({
          description: expense.description,
          amount: expense.amount,
          date: expense.date,
          categoryId: expense.categoryId
        })
        .then(() => {
          console.log('expense updated!')
        })
    })
  }
}
