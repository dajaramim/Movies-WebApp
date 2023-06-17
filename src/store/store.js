// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedMovie: null, // se almacenará aquí la película seleccionada
  },
  mutations: {
    SET_SELECTED_MOVIE(state, movie) {
        state.selectedMovie = movie;
      },
    },
    actions: {
        selectMovie({ commit }, movie) {
            commit('SET_SELECTED_MOVIE', movie);
          },
  }
})