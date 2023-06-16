export default function checkAuth(next, isLogin) {
  if (isLogin.value) {
    next();
    return;
  } else {
    next("/auth/signin");
    return;
  }
}
