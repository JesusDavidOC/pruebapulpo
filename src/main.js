import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue } from "bootstrap-vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

Vue.config.productionTip = false;
//import "./assets/styles/app.scss";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);


if (window.location.hostname == "localhost") {
  Vue.http.options.root = "http://localhost:8002";
  Vue.http.options.url = "http://localhost:8002";
}
Vue.http.interceptors.push((request, next) => {
  //Si ya hay una sesión activa en el localStorage entonces la valido y si es valida lo dejo entrar, sino, entonces lo mantengo en el login
  if (true) {
  }
  request.headers.set(
    "Authorization",
    "Bearer " + JSON.parse(localStorage.apiKey_lms)
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
