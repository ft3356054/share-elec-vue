import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './api/axios.js';
// import './apiconfig/uap.js'
Vue.prototype.$api = Api;
// Vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Toast } from 'vant';
// 将所有 Toast 的展示时长设置为 2000 毫秒
Toast.setDefaultOptions({ duration: 1000 });
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
axios.defaults.withCredentials=false
// 引用地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// axios.defaults.baseURL = process.env.BASE_URL
/* eslint-disable no-new */
// if(process.env.NODE_ENV === 'production'){
//   if(process.env.VUE_APP_FLAG === 'pro'){
//     axios.defaults.baseURL= "http://30.20.109.76:32265/"
//   }else{
//     axios.defaults.baseURL= "http://30.20.109.76:32265/"
//   }
// }
VueAMap.initAMapApiLoader({
  key: 'b4ea20b01a3b0bfccaf8d72153915391',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.AMapManager', 'AMap.Marker'],
  v: '1.4.4',
  uiVersion: '1.0' // ui版本
})
// 生成二维码
import qrcode from 'vue-qrcode-directive'
Vue.use(qrcode)
// vue-bus
import VueBus from 'vue-bus';
Vue.use(VueBus);

import './plugins/registryComponents.js'
// App.all("*",function(req,res,next){
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Headers","X-Requested-With,Content-Type");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
// })
// App.use("/",router)
// 打印当前的环境
// console.log(process.env.VUE_APP_URL,"环境")
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





