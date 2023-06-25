import { useAuthStore } from "@/store/auth";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default async function (
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();
  const isLogin = authStore.checkAuth();

  console.log("authMiddleware", isLogin);

  if (to.name === "SignIn" || to.name === "SignUp") {
    if (isLogin) {
      return next({ name: "Home" });
    }
    return next();
  }

  if (!isLogin) {
    return next({ name: "SignIn" });
  }

  return next();
}
