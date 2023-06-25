// Composables
import { createRouter, createWebHistory } from "vue-router";
import authMiddleware from "@/middlewares/auth";

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
  {
    path: "/products",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Products",
        component: () => import("@/views/product/Product.vue"),
      },
      {
        path: "add",
        name: "ProductAdd",
        component: () => import("@/views/product/ProductAdd.vue"),
      },
    ],
  },
  {
    path: "/orders",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Orders",
        component: () => import("@/views/order/Order.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  return authMiddleware(to, next);
});

export default router;
