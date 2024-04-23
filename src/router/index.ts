// import {
//   createRouter,
//   createWebHistory,
//   type RouteRecordRaw,
// } from "vue-router";
// import { mainRouter } from "./mainRouter";

// const routes: Array<RouteRecordRaw> = [mainRouter];

// const router = createRouter({
//   history: createWebHistory("/"),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   if (to.path !== "/trademark/auditReject") {
//   } else {
//     next();
//   }
// });

// export default router;

import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { mainRouter } from "./mainRouter";
import { message } from "ant-design-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  mainRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    let loginStatus = window.sessionStorage.getItem("token") != null;
    if (!loginStatus) {
      message.error("请登陆后访问！");
      next("/login");
    } else {
      next();
    }
  }
});
export default router;
