// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedEntity: null, // se almacenará aquí la entidad seleccionada
    selectedEntityType: null,
  },
  mutations: {
    SET_SELECTED_ENTITY(state, entity) {
        state.selectedEntity = entity;
    },

    },
    actions: {
        selectEntity({ commit }, entity) {
            commit('SET_SELECTED_ENTITY', entity);
      },

  }
})