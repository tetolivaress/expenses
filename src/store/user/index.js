import firebase from 'firebase/app'
import 'firebase/auth'
import router from '../../router'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
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
            commit('setLoading', false)
            router.push({ path: '/' })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            // commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          ({ user }) => {
            console.log(user)
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
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
