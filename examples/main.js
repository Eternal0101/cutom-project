import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import ElementUI from 'element-ui';
import './assets/css/element-variables.scss';
import customSet from './../packages/index';
Vue.use(ElementUI);
Vue.use(customSet);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
