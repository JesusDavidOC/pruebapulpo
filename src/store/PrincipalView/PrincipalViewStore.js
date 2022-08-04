import Vue from "vue";
export default {
  namespaced: true,
  state: {
    basics: {},
  },
  mutations: {
    setBasics(state, payload) {
      state.basics = payload;
    },
  },
  actions: {
  },
  getters: {
    getBasics(state) {
      return state.basics;
    },
  },
};
