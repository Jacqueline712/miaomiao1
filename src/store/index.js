import Vue from 'vue'
import Vuex from 'vuex'
// 引用同个目录下的city
import city from './city'

Vue.use(Vuex)

export default new Vuex.Store({
	// 状态
  state: {
  },
  // 突变体
  mutations: {
  },
  // 动作
  actions: {
  },
  // 模块
  modules: {
	  city
  }
})
