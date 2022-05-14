// 当前模块，进行数据接口统一管理
import request from './request';
import mockRequest from './mockAjax';

// 三级联动接口
export const reqCategoryList = () => {
  // 发请求并返回数据
  // request 函数的返回值是一个 Promise 对象，它成功的值是返回的数据
  return request({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
};

// 获取 banner（Home 首页轮播图接口）
export const reqGetBannerList = () => {
  return mockRequest.get('/banner');
}

// 获取 floor 数据
export const reqFloorList = () => mockRequest.get('/floor');

// 获取搜索模块的数据，请求方式 POST
export const reqGetSearchInfo = (params) => request({
  url: '/list',
  method: 'post',
  data: params
});

// 获取产品详情信息的接口
export const reqGoodsInfo = (skuid) => request({
  url: `/item/${skuid}`,
  method: 'get'
});

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuid, skuNum) => request({
  url: `cart/addToCart/${skuid}/${skuNum}`,
  method: 'post'
});

// 获取购物车列表数据接口
export const reqCartList = () => request({
  url: '/cart/cartList',
  method: 'get'
})

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId) => request({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
});

// 修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => request({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
});

// 获取验证码
export const reqGetCode = (phone) => request({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
});

// 用户注册
export const reqUserRegister = (data) => request({
  url: '/user/passport/register',
  data,
  method: 'post'
});

// 登录
export const reqUserLogin = (data) => request({
  url: '/user/passport/login',
  data,
  method: 'post'
});

// 获取用户信息【需要带着用户的 token 向服务器要用户信息】
export const reqUserInfo = () => request({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
});

// 退出登录
export const reqLogout = () => request({
  url: '/user/passport/logout',
  method: 'get'
});

// 获取用户地址信息
export const reqAddressInfo = () => request({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
});

// 获取商品清单
export const reqOrderInfo = () => request({
  url: '/order/auth/trade',
  method: 'get'
});

// 提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => request({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
});

// 获取支付信息
export const reqPayInfo = (orderId) => request({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
});

// 获取支付订单状态
export const reqPayStatus = (orderId) => request({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
});

// 获取个人中心的数据
export const reqMyOrderList = (page, limit) => request({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
});