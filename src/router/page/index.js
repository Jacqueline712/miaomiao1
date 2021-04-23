export default{
	path:'/page',
	// 采用按需载入,箭头函数
	// 在vue中@表示src目录
	component:() => import('@/views/Page'),
	children:[
		{
			path:'home',
			component:()=>import('@/components/Home')
		},
		{
			path:'/page',
			redirect:'home'
		}
	]
}