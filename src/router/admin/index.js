export default{
	path:'/admin',
	component:() => import('@/views/Admin'),
	 children:[
		 {
			path:'users',
			component:()=>import('@/views/Admin/users.vue')
		 },
		 {
			path:'cinema',
			component:()=>import('@/views/Admin/cinema.vue')
		 },
		 {
			path:'movie',
			component:()=>import('@/views/Admin/movie.vue')
		 },
		 {
			path:'nowplaying',
			name:'nowplaying',
			component:()=>import('@/views/Admin/nowplaying.vue')
		 },
		 {
		 	path:'detailmovie/:movieId',
		 			name:'detailmovie',
		 			component:()=>import('@/views/Admin/detailmovie.vue'),
		 	// components:{
		 	// 	// default:()=>import('@/views/Admin/nowplaying.vue'),
		 	// 	// 引入到movie下name为detailmovie的位置上
		 	// 	detailmovie:()=>import('@/views/Admin/detailmovie.vue')
		 	// },
		 	// props:{
		 	// 	detailmovie:true
		 	// },
		 			// meta: {
		 			// 	keepAlive: true
		 			// }
		 },
		 {
			path:'comingsoon',
			component:()=>import('@/views/Admin/comingsoon.vue')
		 },
		 {
			path:'service',
			component:()=>import('@/views/Admin/service.vue')
		 },
		 {
			path:'/admin',
			redirect:'users'
		 }
	 ]
}