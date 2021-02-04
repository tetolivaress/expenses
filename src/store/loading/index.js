export default {
  namespaced: true,
  state: {
    isLoading: false
  },
  mutations: {
    SHOW_LOADING (state) {
      state.loading.isLoading = true
    },
    HIDE_LOADING (state) {
      state.loading.isLoading = false
    }
  }
}
