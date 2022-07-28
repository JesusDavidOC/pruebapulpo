import Vue from 'vue';
import VueRouter from 'vue-router';
import PrincipalView from '../views/PrincipalView.vue';
import LoginView from '../views/LoginView.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: PrincipalView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.fullPath != '/login') {
    let token = window.localStorage.getItem('userToken');
    if (!token) {
      console.log("daaaa")
      next('/login');
    }
  }
  next();

});


export default router
