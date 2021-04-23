export default{
	path:'/city',
	// 采用按需载入,箭头函数
	// 在vue中@表示src目录
	component:() => import('@/components/City'),
	// children:[
	// 	{
	// 		path:'city',
	// 		component:()=>import('@/components/City')
	// 	},
	// 	{
	// 		path:'/city',
	// 		redirext:'nowPlaying'
	// 	}
	// ]
}