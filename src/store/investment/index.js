import firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '@/store/db'

export default {
  namespaced: true,
  state: {
    investments: []
  },
  getter: {
    invested: ({ investments }) => {
      return investments
        .map(expense => Number(expense.amount))
        .reduce((acc, current) => acc + current, 0)
        .toFixed(2)
    }
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
    })
  }
}
