export default{
	path:'/movie',
	// 采用按需载入,箭头函数
	// 在vue中@表示src目录
	// /依然是表示路径
	component:() =>import('@/views/Movie'),
	children : [
		{
			path:'city',
			component:()=>import('@/components/City')
		},
		{
			path:'nowPlaying',
			component:()=>import('@/components/NowPlaying')
		},
		{
			path:'comingSoon',
			component:()=>import('@/components/ComingSoon')
		},
		{
			path:'search',
			component:()=>import('@/components/Search')
		},
		{
			// 给路由初始化
			path:'/movie',
			redirect:'/movie/nowPlaying'
		}
	]
}