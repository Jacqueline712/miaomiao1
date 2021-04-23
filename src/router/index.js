import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}
import mineRouter from './mine'
import pageRouter from './page'
import cinemaRouter from './cinema'
import movieRouter from './movie'
import adminRouter from './admin'
import cityRouter from './city'
import searchRouter from './search'
import ariaRouter from './aria'

Vue.use(VueRouter);

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes:[

//   ]
// })

export default new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	base: 'maizuo',
	routes: [
		mineRouter,
		pageRouter,
		cinemaRouter,
		movieRouter,
		adminRouter,
		cityRouter,
		searchRouter,
		ariaRouter,
		{
			path: '/*',
			// 找不到则跳转到这个页面
			redirect: '/mine/login'
		}
	]
})
