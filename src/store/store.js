// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedEntity: null, // se almacenará aquí la entidad seleccionada
  },
  mutations: {
    // añado nueva entidad al state
    SET_SELECTED_ENTITY(state, entity) {
        state.selectedEntity = entity;
    },

    },
  actions: {
      /* uso desde afuera la mutation */
        selectEntity({ commit }, entity) {
            commit('SET_SELECTED_ENTITY', entity);
      },

  }
})