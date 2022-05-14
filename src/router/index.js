import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';
import store from '@/store';
// 使用插件
Vue.use(VueRouter);
// 重写 $router.push 方法
// 1. 先把原来的 push 方法保存一份
let originPush = VueRouter.prototype.push;
// 2. 重写
// 第一个参数，原来的配置对象
// 第二个参数，成功的回调函数
// 第三个参数，失败的回调函数
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {}, () => {});
  }
};
// 重写 $router.replace 方法
// 1. 先把原来的 replace 方法保存一份
let originReplace = VueRouter.prototype.replace;
// 2. 重写
// 第一个参数，原来的配置对象
// 第二个参数，成功的回调函数
// 第三个参数，失败的回调函数
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => {}, () => {});
  }
};

// 配置路由
let router = new VueRouter({
  routes,
  scrollBehavior() {
    // 返回的这个 y=0，代表滚动条在最上方
    return {
      y: 0
    }
  }
});

// 全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {
  next();
  // 用户登录了，才会有 token，未登录一定不会有 token
  let token = store.state.User.token;
  // 用户的信息
  let name = store.state.User.userInfo.name;
  // 用户已经登录了
  if (token) {
    // 用户已经登录了
    if (to.path == '/login' || to.path == '/register') {
      next('/home');
    } else {
      // 登录了但去的不是 login
      // 如果用户名已有
      if (name) {
        next();
      } else {
        // 没有用户信息，派发 action 让仓库存储用户信息在跳转
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          // token 过期了，获取不到用户信息，从新登录
          // 清除 token
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {
    // 未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    // 未登录去上面这些路由-----强制跳到登录页面
    // 去的是这些路由（home|search|shopCart）-----放行
    let toPath = to.path;
    if (toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      // 把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' + toPath);
    } else {}
  }
})

export default router;