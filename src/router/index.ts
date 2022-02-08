import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: () =>
      import(/* webpackChunkName: "Cadastro" */ "@/views/Cadastro.vue"),
  },
  {
    path: "/transparencia",
    name: "Transparência",
    component: () =>
      import(
        /* webpackChunkName: "Transparencia" */ "@/views/Transparencia.vue"
      ),
  },
  {
    path: "/agendamento",
    name: "Agendamento",
    component: () =>
      import(/* webpackChunkName: "Agendamento" */ "@/views/Agendamento.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
