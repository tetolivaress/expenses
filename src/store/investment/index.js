import firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '@/store/db'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    investments: [],
    selectedDate: moment(), // .subtract(1, 'months').endOf('month').format('MM')
    selectedMonth: moment().format('MM - YYYY')
  },
  mutations: {
    CHANGE_MONTH (state, payload) {
      state.selectedMonth = payload
    },
    RESET (state) {
      state.expenses = []
    }
  },
  getters: {
    invested: ({ investments, selectedMonth }) => {
      return investments
        .filter(({ date }) => selectedMonth === moment(date).format('MM - YYYY'))
        .map(investment => Number(investment.amount))
        .reduce((acc, current) => acc + current, 0)
        .toFixed(2)
    },
    sortedInvestments: ({ investments, selectedMonth }, { invested }, rootState) => {
      return investments
    },
    withoutCategory: ({ investments }) => investments.filter(investment => !investment.categoryId),
    months: ({ investment }) => [...new Set(investment.map(({ date }) => {
      return { id: moment(date).format('MM - YYYY'), name: moment(date).format('MMMM - YYYY') }
    }))]
  },
  actions: {
    bindInvestments: firestoreAction(async ({ bindFirestoreRef, commit }) => {
      try {
        const { uid } = firebase.auth().currentUser
        const investments = db.collection('investments').where('userId', '==', uid)
        return bindFirestoreRef('investments', investments)
      } catch (error) {
        console.log(error)
      }
    }),
    addInvestment: firestoreAction(({ commit }, payload) => {
      commit('loading/SET_LOADING', true, { root: true })
      return db.collection('investments').add(payload)
    }),
    removeInvestment: firestoreAction(({ commit }, investment) => {
      commit('loading/SET_LOADING', true, { root: true })
      db.collection('investments')
        .doc(investment.id)
        .delete()
        .then(() => commit('loading/SET_LOADING', false, { root: true }))
    }),
    updateInvestment: firestoreAction((context, investment) => {
      console.log(investment)
      db.collection('investments')
        .doc(investment.id)
        .update({
          description: investment.description,
          amount: investment.amount,
          date: investment.date
        })
        .then(() => {
          console.log('investment updated!')
        })
    })
  }
}
