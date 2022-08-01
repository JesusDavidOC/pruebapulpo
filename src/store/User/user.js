import Vue from "vue";
export default {
  state: {
    sesion: {},
  },
  mutations: {
    setSession({ state }, payload) {
      state.sesion = payload;
    },
  },
  actions: {},
  getters: {
    getSession({ state }) {
      return state.sesion;
    },
  },
};
