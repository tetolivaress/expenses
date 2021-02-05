import firebase from 'firebase/app'
import 'firebase/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '@/store/db'

export default {
  namespaced: true,
  state: {
    categories: null
  },
  actions: {
    bindCategories: firestoreAction(async ({ bindFirestoreRef, commit }) => {
      // commit('loading/SET_LOADING', true, { root: true })
      const { uid } = firebase.auth().currentUser
      const categories = db.collection('categories').where('userId', '==', uid)
      return bindFirestoreRef('categories', categories)
    }),
    addCategory: firestoreAction((context, payload) => {
      // console.log(context.state)
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
