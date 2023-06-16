// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("@/layouts/default/Blank.vue"),
    children: [
      {
        path: "signin",
        name: "SignIn",
        component: () => import("@/views/auth/SignIn.vue"),
      },
      {
        path: "signup",
        name: "SignUp",
        component: () => import("@/views/auth/SignUp.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
