import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    TC: [],
    NC: [],
    TD: [],
    ND: [],
    TR: [],
    AC: [],
    CR: []
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    SET_TC_ACTION ({dispatch, commit}, data) {
      commit('SET_TC_ACTION_MUTATION', data)
    },
    // eslint-disable-next-line no-unused-vars
    SET_NC_ACTION ({dispatch, commit}, data) {
      commit('SET_NC_ACTION_MUTATION', data)
    },
    // eslint-disable-next-line no-unused-vars
    SET_TD_ACTION ({dispatch, commit}, data) {
      commit('SET_TD_ACTION_MUTATION', data)
    },
    // eslint-disable-next-line no-unused-vars
    SET_ND_ACTION ({dispatch, commit}, data) {
      commit('SET_ND_ACTION_MUTATION', data)
    },
    // eslint-disable-next-line no-unused-vars
    SET_TR_ACTION ({dispatch, commit}, data) {
      commit('SET_TR_ACTION_MUTATION', data)
    },
    // eslint-disable-next-line no-unused-vars
    SET_AC_ACTION ({dispatch, commit}, data) {
      commit('SET_AC_ACTION_MUTATION', data)
    },
    // eslint-disable-next-line no-unused-vars
    SET_CR_ACTION ({dispatch, commit}, data) {
      commit('SET_CR_ACTION_MUTATION', data)
    }
  },
  mutations: {
    SET_TC_ACTION_MUTATION (state, data) {
      state.TC = data
    },
    SET_NC_ACTION_MUTATION (state, data) {
      state.NC = data
    },
    SET_TD_ACTION_MUTATION (state, data) {
      state.TD = data
    },
    SET_ND_ACTION_MUTATION (state, data) {
      state.ND = data
    },
    SET_TR_ACTION_MUTATION (state, data) {
      state.TR = data
    },
    SET_AC_ACTION_MUTATION (state, data) {
      state.AC = data
    },
    SET_CR_ACTION_MUTATION (state, data) {
      state.CR = data
    }
  },
  modules: {
  }
})
