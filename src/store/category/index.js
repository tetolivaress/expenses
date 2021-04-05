import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
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

      if (!payload.file) {
        return db.collection('categories').add({
          name: payload.name,
          userId: context.rootState.user.user.id
        })
      }

      const refStorage = firebase.storage()
        .ref(`categoriesImages/${payload.file.name}`)
      const task = refStorage.put(payload.file)
      return task.on(
        'state_changed',
        ({ bytesRansferred }) => console.log(bytesRansferred),
        err => console.log(err),
        () => task.snapshot.ref.getDownloadURL()
          .then(url => {
            db.collection('categories').add({
              name: payload.name,
              url: url || '',
              userId: context.rootState.user.user.id
            })
          })
      )
    }),
    removeCategory: firestoreAction(({ commit }, category) => {
      commit('loading/SET_LOADING', true, { root: true })
      db.collection('categories')
        .doc(category.id)
        .delete()
        .then(() => commit('loading/SET_LOADING', false, { root: true }))
    }),
    updateCategory: firestoreAction(({ commit }, payload) => {
      if (!payload.file) {
        return db.collection('categories')
          .doc(payload.id)
          .update({ name: payload.name })
          .then(() => {
            console.log('category updated!')
          })
          .catch(error => console.error(error))
      }

      const refStorage = firebase.storage()
        .ref(`categoriesImages/${payload.file.name}`)
      const task = refStorage.put(payload.file)
      return task.on(
        'state_changed',
        ({ bytesRansferred }) => console.log(bytesRansferred),
        err => console.log(err),
        () => task.snapshot.ref.getDownloadURL()
          .then(url => {
            db.collection('categories')
              .doc(payload.id)
              .update({ name: payload.name, url })
          })
      )
    })
  }
}
