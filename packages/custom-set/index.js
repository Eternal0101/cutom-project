//导入组件
import customSet from "./src/custom-set.vue";
//为组件提供install方法,供按需引入
customSet.install = function (Vue) {
    Vue.component(customSet.name,customSet);
};
//默认导出组件
export default customSet;
