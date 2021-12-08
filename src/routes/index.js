import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/views/home.vue"),
    },
    {
      path: "/data-sheet",
      component: () => import("@/views/data-sheet.vue"),
    },
    {
      path: "/about",
      component: () => import("@/views/about.vue"),
    },
    {
      path: "/contact",
      component: () => import("@/views/contact.vue"),
    },
  ],
});
