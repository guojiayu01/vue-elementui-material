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

axios.defaults.baseURL = 'http://127.0.0.1:8080/materils_v2.0'

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



// router.beforeEach((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     if(JSON.parse(localStorage.getItem('islogin'))){ //判断本地是否存在access_token
//       next();
//     }else {
//       next({
//         path:'/home/first'
//       })
//     }
//   }
//   else {
//     next();
  
//   }
//   /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
//   if(to.fullPath == "/login"){
//     if(JSON.parse(localStorage.getItem('islogin'))){
//       next({
//         path:from.fullPath
//       });
//     }else {
//       next();
//     }
//   }
// });


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next();
    } else {
      next({
        path: "/"//指向为你的登录界面
      });
    }
  } else {
    next();
  }

  if (to.fullPath === "/") {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});
