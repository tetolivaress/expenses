import firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '@/store/db'

export default {
  namespaced: true,
  state: {
    categories: []
  },
  actions: {
    bindCategories: firestoreAction(async ({ bindFirestoreRef, commit }) => {
      // commit('loading/SET_LOADING', true, { root: true })
      const { uid } = firebase.auth().currentUser
      const categories = db.collection('categories').where('userId', '==', uid)
      return bindFirestoreRef('categories', categories)
    }),
    addCategory: firestoreAction((context, payload) => {
      context.commit('loading/SET_LOADING', true, { root: true })
      return db.collection('categories').add({
        name: payload,
        userId: context.rootState.user.user.id
      })
    }),
    removeCategory: firestoreAction(({ commit }, category) => {
      commit('loading/SET_LOADING', true, { root: true })
      db.collection('categories')
        .doc(category.id)
        .delete()
        .then(() => commit('loading/SET_LOADING', false, { root: true }))
    })
  }
}
