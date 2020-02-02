import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreationCompte from "../views/CreationCompte";
import Connexion from "../views/Connexion";
import ListeMembres from "../views/ListeMembres";
import CreationConversation from "../views/CreationConversation";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/creationcompte',
    name: 'CreationCompte',
    component: CreationCompte
  },
  {
    path: '/listemembres',
    name: "ListeMembres",
    component: ListeMembres
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/creationconversation',
    name: 'CreationConversation',
    component: CreationConversation
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
