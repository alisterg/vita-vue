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
  {
    path: "/entrytype/create",
    component: () => import("../views/EntryTypeCreate.vue"),
  },
  {
    path: "/entrytype/list",
    component: () => import("../views/EntryTypeList.vue"),
  },
  {
    path: "/routine/create",
    component: () => import("../views/RoutineCreate.vue"),
  },
  {
    path: "/routine/list",
    component: () => import("../views/RoutineList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
