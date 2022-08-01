import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import VueResource from "vue-resource";
import VueToastr2 from "vue-toastr-2";
import "vue-toastr-2/dist/vue-toastr-2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// instance methods for alerts
Vue.prototype.$Success = (title, text, that) => {
  store.dispatch("Success", { title, text, that: that });
};
Vue.prototype.$Error = (title, text, that) => {
  store.dispatch("Error", { title, text, that: that });
};
Vue.prototype.$Info = (title, text, that) => {
  store.dispatch("Info", { title, text, that: that });
};

window.toastr = require("toastr");

Vue.use(VueToastr2);

Vue.use(VueResource);

Vue.config.productionTip = false;
//import "./assets/styles/app.scss";

Vue.use(BootstrapVue);

Vue.use(BootstrapVueIcons);

if (window.location.hostname == "localhost") {
  Vue.http.options.root = "http://localhost:8002";
  Vue.http.options.url = "http://localhost:8002";
}
Vue.http.interceptors.push((request, next) => {
  //Si ya hay una sesión activa en el localStorage entonces la valido y si es valida lo dejo entrar, sino, entonces lo mantengo en el login
  request.headers.set(
    "Authorization",
    "Bearer " + JSON.parse(localStorage.token)
  );
  request.headers.set("Accept", "application/json");
  next((res) => {
    if (res.status == 401) {
    } else if (res.status == 409) {
    }
  });
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
