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
    showModal({}, payload) {
      payload.that.$refs[payload.ref].show();
    },
    hideModal({}, payload) {
      payload.that.$refs[payload.ref].hide();
    },
  },
  getters: {
    getBasics(state) {
      return state.basics;
    },
  },
};
