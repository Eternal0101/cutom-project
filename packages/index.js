import customSet from "./custom-set";
const components=[customSet];
//定义install方法,接收Vue作为参数。如果使用use注册组件，则所有的组件都将被注册
const install = function(Vue){
    //判断是否安装
  if(install.installed)return
  //遍历注册全局组件
  components.map(component=>Vue.component(component.name,component));
};
//判断是否是直接引入组件
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue);
};
export default {
    install,
    customSet
}
