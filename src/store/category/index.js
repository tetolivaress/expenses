import firebase from 'firebase/app'
import 'firebase/auth'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/store/db'

export default {
  state: {
    categories: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.isLoading = payload
    },
    ...vuexfireMutations
  },
  actions: {
    bindCategories: firestoreAction(async ({ bindFirestoreRef, commit }) => {
      commit('setLoading', true)
      const { uid } = firebase.auth().currentUser
      const categories = db.collection('categories').where('userId', '==', uid)
      return bindFirestoreRef('categories', categories)
    }),
    addCategory: firestoreAction((context, payload) => {
      console.log(context.state)
      return db.collection('categories').add({
        name: payload,
        userId: context.state.user.id
      })
    }),
    removeCategory: firestoreAction((context, category) => {
      db.collection('categories')
        .doc(category.id)
        .delete()
    })
  }
}
