// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
import store from './store/index';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;
fastclick.attach(document.body);

// 使用vue懒加载插件
Vue.use(VueLazyLoad, {
	loading: require('common/images/default.jpg')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});