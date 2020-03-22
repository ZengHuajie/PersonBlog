import Vue from 'vue';
// 引入组件element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 导入处理时间的函数
import timeUtil from './util/timeUtil';
Vue.prototype.timeUtil = timeUtil;

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


import App from './App';
import router from './router';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
