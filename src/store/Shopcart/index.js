import {
  reqCartList,
  reqDeleteCartById,
  reqUpdateCheckedById
} from '@/api';

// Shopcart 仓库
const state = {
  cartList: []
};
const actions = {
  // 获取购物车列表数据
  async getCartList({
    commit
  }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit('GETCARTLIST', result.data);
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({
    commit
  }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 修改购物车某一个产品的选中状态
  async updateCheckedById({
    commit
  }, {
    skuId,
    isChecked
  }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({
    dispatch,
    getters
  }) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
      // 将每一次返回的 Promise 添加到数组当中
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
  // 修改全部产品的状态
  updateAllCartIsChecked({
    dispatch,
    state
  }, isChecked) {
    // 数组
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked
      });
      PromiseAll.push(promise);
    });
    // 返回最终结果
    return Promise.all(PromiseAll);
  }
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
};

export default {
  state,
  actions,
  mutations,
  getters
}