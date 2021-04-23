import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/iconfont/iconfont.css'
import 'lib-flexible'

import axios from 'axios'
// 可以通过this的方式引入action
Vue.prototype.axios = axios;

Vue.filter('setWH',(url , arg)=>{
	return url.replace(/w\.h/,arg);
})

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

// import { MessageBox } from 'mint-ui'
import { messageBox } from '@/components/js'
Vue.component('MessageBox',messageBox)
// Vue.prototype.$messagebox = MessageBox


import VueAwesomeSwiper from 'vue-awesome-swiper'
// 安装swiper
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
