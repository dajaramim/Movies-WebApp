// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedEntity: null, // se almacenará aquí la película seleccionada
    selectedEntityType: null,
  },
  mutations: {
    SET_SELECTED_ENTITY(state, entity) {
        state.selectedEntity = entity;
    },
    SET_ENTITY_TYPE(state, payload) {
      state.selectedEntityType = payload;
    },
    },
    actions: {
        selectEntity({ commit }, entity) {
            commit('SET_SELECTED_ENTITY', entity);
      },
      selectEntityType({ commit }, entityType) {
        commit('SET_ENTITY_TYPE', entityType);
      },
  }
})