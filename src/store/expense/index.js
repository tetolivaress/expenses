import firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '@/store/db'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    expenses: [],
    selectedDate: moment() // .subtract(1, 'months').endOf('month').format('MM')
  },
  mutations: {
    CHANGE_MONTH ({ selectedDate }, payload) {
      selectedDate = payload
    }
  },
  getters: {
    spent: ({ expenses, selectedDate }) => {
      return expenses.length
        ? expenses
          .filter(expense => moment(selectedDate).format('MM') === moment(expense.date).format('MM'))
          .map(expense => Number(expense.amount))
          .reduce((acc, current) => acc + current)
          .toFixed(2)
        : 0
    },
    sortedExpenses: ({ expenses, selectedDate }, { spent }, rootState) => {
      return rootState.category.categories.map(category => {
        return {
          expenses: expenses.filter(expense => category.id === expense.categoryId && moment(selectedDate).format('MM') === moment(expense.date).format('MM')),
          category: category.name
        }
      })
    },
    withoutCategory: ({ expenses }) => expenses.filter(expense => !expense.categoryId),
    months: ({ expenses }) => [...new Set(expenses.map(({ date }) => moment(date).format('MMMM')))]
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
