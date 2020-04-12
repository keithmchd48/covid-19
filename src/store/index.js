import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    TC: [],
    TD: [],
    TR: []
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    SET_TC_ACTION ({dispatch, commit}, data) {
      commit('SET_TC_ACTION_MUTATION', data)
    },
    // eslint-disable-next-line no-unused-vars
    SET_TD_ACTION ({dispatch, commit}, data) {
      commit('SET_TD_ACTION_MUTATION', data)
    },
    // eslint-disable-next-line no-unused-vars
    SET_TR_ACTION ({dispatch, commit}, data) {
      commit('SET_TR_ACTION_MUTATION', data)
    }
  },
  mutations: {
    SET_TC_ACTION_MUTATION (state, data) {
      state.TC = data
    },
    SET_TD_ACTION_MUTATION (state, data) {
      state.TD = data
    },
    SET_TR_ACTION_MUTATION (state, data) {
      state.TR = data
    }
  },
  modules: {
  }
})
