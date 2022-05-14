import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api';

// Home 仓库
const state = {
  // home 仓库中存储三级菜单的数据
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // Floor 组件的数据
  floorList: []
};
const actions = {
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data);
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data);
    }
  },
  // 获取 floor 数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data);
    }
  }
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  }
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters
}