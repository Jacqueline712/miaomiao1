export default{
	path:'/movie',
	// 采用按需载入,箭头函数
	// 在vue中@表示src目录
	component:() => import('@/views/Movie'),
	children:[
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
			path:'detail/1/:movieId',
			components:{
				default:()=>import('@/components/NowPlaying'),
				// 引入到movie下name为detail的位置上
				detail:()=>import('@/views/Movie/detail')
			},
			props:{
				detail:true
			}
		},
		{
			path:'detail/2/:movieId',
			components:{
				// 在过度情况下显示的还是当前页面
				default:()=>import('@/components/ComingSoon'),
				// 引入到movie下name为detail的位置上
				detail:()=>import('@/views/Movie/detail')
			},
			props:{
				detail:true
			}
		},
		{
			path:'/movie',
			redirect:'nowPlaying'
		}
	]
}