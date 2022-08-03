import Vue from 'vue'
import Vuex from 'vuex'
import alerts from './Alerts/alerts';
import user from './User/user';
import pvStore from './PrincipalView/PrincipalViewStore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alerts,
    user,
    pvStore
  }
})
