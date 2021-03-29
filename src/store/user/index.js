import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      commit('SHOW_LOADING')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          ({ user }) => {
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
            commit('HIDE_LOADING')
            router.push({ path: '/' })
          }
        )
        .catch(
          error => {
            commit('HIDE_LOADING')
            // commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      // commit('SHOW_LOADING')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          ({ user }) => {
            // console.log(user)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
            router.push({ path: '/' })
          }
        )
        .catch(
          error => {
            // commit('setLoading', false)
            // commit('setError', error)
            console.log(error)
          }
        )
    },
    signInWithGoogle ({ commit }) {
      commit('loading/SET_LOADING', true, { root: true })
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(
          ({ user }) => {
            // console.log(user)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
            router.push({ path: '/' })
          })
        .catch(error => {
          commit('loading/SET_LOADING', false, { root: true })
          console.log(error)
        })
    },
    signUserInFacebook ({ commit }) {
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(
          ({ user }) => {
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
            router.push({ path: '/' })
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    logout ({ commit }) {
      commit('SHOW_LOADING')
      firebase.auth().signOut()
      commit('setUser', null)
      commit('expense/RESET', null, { root: true })
      // router.push({ path: '/login' })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
