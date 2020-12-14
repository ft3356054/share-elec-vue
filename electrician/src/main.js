import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 加载全局样式
import './assets/common.scss'
// rem适配
import './libs/rem.js';
// 引用 组件自动化注册
import comPlugins from './plugins/registryComponents'
Vue.use(comPlugins)
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3, //高度比 //高度比
    // 加载失败时，镜像的 src  error
  error: 'dist/error.png',
     // 在加载图像的时候
  loading: 'dist/loading.gif',
  attempt: 1, //尝试次数
  listenEvents: [ 'scroll' ]  //你想监听的事件
})
import axios from "axios"
// 引用地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.BASE_URL
/* eslint-disable no-new */
VueAMap.initAMapApiLoader({
  key: 'b4ea20b01a3b0bfccaf8d72153915391',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.AMapManager', 'AMap.Marker'],
  v: '1.4.4',
  uiVersion: '1.0' // ui版本
})

// import { Uploader, Button, Rate,Tab,Tabs,Badge,Dialog,search  } from "vant";

// Vue.use(Uploader)
// Vue.use(Button)
// Vue.use(Rate)
// Vue.use(Tab)
// Vue.use(Tabs)
// Vue.use(Badge)
// Vue.use(Dialog )
// Vue.use(search)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





