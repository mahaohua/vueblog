import router from "./router"

// 路由判断登录，根据路由配置文件的参数（路由权限拦截）
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    const token = localStorage.getItem("token");
    console.log("-------------" + token);
    if (token) {  // 判断当前的token是否存在
      if (to.path == '/login') {
      } else {
        next();
      }
    } else {
      next({
        path: '/login'
      });
    }
  } else {
    next();
  }
})
