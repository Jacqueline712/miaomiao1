import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(VueRouter)

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes:[
	  
//   ]
// })

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
	movieRouter,
	cinemaRouter,
	mineRouter
  ]
})
