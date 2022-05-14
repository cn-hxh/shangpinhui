// 引入一级路由组件
// import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder';

export default [{
    path: '/home',
    // 路由懒加载
    component: () => import('@/pages/Home'),
    meta: {
      footerShow: true
    }
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: Search,
    meta: {
      footerShow: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      footerShow: false
    }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      footerShow: false
    }
  },
  {
    path: '/detail/:skuid',
    name: 'detail',
    component: Detail,
    meta: {
      footerShow: false
    }
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
    meta: {
      footerShow: true
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: {
      footerShow: true
    }
  },
  {
    path: '/trade',
    component: Trade,
    meta: {
      footerShow: true
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if (from.path == '/shopcart') {
        next();
      } else {
        // 其它的路由组件而来，停留在当前
        next(false);
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: {
      footerShow: true
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: {
      footerShow: true
    }
  },
  {
    path: '/center',
    component: Center,
    meta: {
      footerShow: true
    },
    // 二级路由组件
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]