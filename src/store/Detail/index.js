import {
  reqGoodsInfo,
  reqAddOrUpdateShopCart
} from '@/api';
import {
  getUUID
} from '@/utils/uuid_token.js';

// Detail 仓库
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
};
const actions = {
  // 获取产品信息的 action
  async getGoodInfo({
    commit
  }, skuid) {
    let result = await reqGoodsInfo(skuid);
    if (result.code === 200) {
      commit('GETGOODINFO', result.data);
    }
  },
  // 将产品添加到购物车中
  // 当前的这个函数，如果执行返回 Promise
  async addOrUpdateShopCart({
    commit
  }, {
    skuid,
    skuNum
  }) {
    // 加入购物车返回的结果
    let result = await reqAddOrUpdateShopCart(skuid, skuNum);
    // 服务器加入购物车成功
    if (result.code == 200) {
      return 'ok'
      // 服务器加入购物车失败
    } else {
      return Promise.reject(new Error('faile'));
    }
  }
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  }
};
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}