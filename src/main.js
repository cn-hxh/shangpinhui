import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入路由
import router from '@/router'

// 引入全局组件
// 三级联动组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'
// 注册
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
// ElementUI 注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入 vuex 仓库 store
import store from '@/store'

// 引入 MockServe.js-----mock 数据
import '@/mock/mockServe.js'

// 引入 Swiper 样式
import 'swiper/css/swiper.css'

// 统一接口 api 文件夹里面全部请求函数
import * as API from '@/api'

// 引入图片
import TP from '@/assets/logo.png'

// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: TP
})

// 引入自定义插件
import myPlugins from './plugins/myPlugins'
// 注册
Vue.use(myPlugins, {
  name: 'upper'
})

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 全局事件总线 $bus 配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由，当这里书写 router 的时候，组件实例身上都拥有 $route，$router 属性
  router,
  // 注册仓库，组件实例的身上会多一个 $store 属性
  store
}).$mount('#app')
