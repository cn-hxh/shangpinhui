// Vue 插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function (Vue, options) {
  Vue.directive(options.name, () => {
    console.log('执行');
  });
};

export default myPlugins;