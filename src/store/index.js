import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 引入小仓库
import Home from './Home';
import Search from './Search';
import Detail from './Detail';
import Shopcart from './Shopcart';
import User from './User';
import Trade from './Trade';

export default new Vuex.Store({
  modules: {
    Home,
    Search,
    Detail,
    Shopcart,
    User,
    Trade
  }
});