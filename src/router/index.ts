import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/StartPage.vue"),
  },
  {
    path: "/entry/create",
    component: () => import("../views/EntryCreate.vue"),
  },
  {
    path: "/entry/list",
    component: () => import("../views/EntryList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
