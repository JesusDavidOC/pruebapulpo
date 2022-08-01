import Vue from "vue";
export default {
  state: {},
  mutations: {},
  actions: {
    Success({}, payload) {
      let variant = "success";
      let delay = 5000;
      const msg = {
        title: payload.title,
        autoHideDelay: delay,
        appendToast: false,
        variant: variant,
        bodyClass: "progressToast",
      };
      payload.that.$bvToast.toast(payload.text, msg);
    },
    Error({}, payload) {
      let variant = "danger";
      let delay = 5000;
      const msg = {
        title: payload.title,
        autoHideDelay: delay,
        appendToast: false,
        variant: variant,
        bodyClass: "progressToast",
      };
      payload.that.$bvToast.toast(payload.text, msg);
    },
    Info({}, payload) {
      let variant = "info";
      let delay = 5000;
      const msg = {
        title: payload.title,
        autoHideDelay: delay,
        appendToast: false,
        variant: variant,
        bodyClass: "progressToast",
      };
      payload.that.$bvToast.toast(payload.text, msg);
    },
  },
  getters: {},
};
