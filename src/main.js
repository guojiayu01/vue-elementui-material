// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import echarts from 'echarts'
import bmap from 'vue-baidu-map'
import './assets/normalize.css'
import store from './store/store'




var axios = require('axios')
axios.defaults.baseURL = 'http://47.95.196.248:8080/materils_v2.0'
// axios.defaults.baseURL = 'http://192.168.0.113:8080/materils_v2.0'

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false


Vue.use(bmap,{
  ak : 'ybm7GO5cyZOsVS80dLuzBCKi306RfUrz'
})
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
