// 对 axios 进行二次封装
import axios from "axios";

// 引入进度条
import nprogress from "nprogress";
// start：进度条开始  done：进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css'

// 在当前模块中引入 store
import store from "@/store";

// 利用 axios 对象的方法 create，去创建一个 axios 实例
const request = axios.create({
  // 基础路径，发请求的时候，路径当中会自动添加
  baseURL: 'http://gmall-h5-api.atguigu.cn/api'
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config) => {
  if (store.state.Detail.uuid_token) {
    // 给请求头添加一个字段
    config.headers.userTempId = store.state.Detail.uuid_token;
  }
  // 需要携带 token 带给服务器
  if (store.state.User.token) {
    config.headers.token = store.state.User.token;
  }
  nprogress.start();
  // config：配置对象，对象里面有一个属性很重要，headers 请求头
  return config;
});

// 响应拦截器
request.interceptors.response.use((res) => {
  nprogress.done();
  // 响应成功以后的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
  // res 是请求回来的数据，不过 axios 对他们进行了包装，它的 data 属性才是真正请求回来的数据
  return res.data; // 把请求回来的数据返回，让调用 request 方法时候能接收到数据。注意：如果设置响应拦截器，必须返回
}, (error) => {
  // 响应失败的回调函数
  return Promise.reject(new Error('faile'));
});

// 对外暴露
export default request;