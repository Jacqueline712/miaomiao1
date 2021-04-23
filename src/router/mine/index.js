export default{
	path:'/mine',
	// 采用按需载入,箭头函数
	// 在vue中@表示src目录
	component:() => import('@/views/Mine'),
	children:[
		{
			path:'center',
			component:()=>import('@/views/Mine/center.vue')
			// children:[
			// 	{
			// 		path:'setting',
			// 		component:()=>import('@/components/Setting')
			// 	}
			// ]
		},
		{
			path:'login',
			component:()=>import('@/components/Login')
		},
		{
			path:'register',
			component:()=>import('@/components/Register')
		},
		{
			path:'findpassword',
			component:()=>import('@/components/FindPassword')
		},
		{
			path:'setting',
			component:()=>import('@/components/Setting')
		},
		{
			path:'/mine',
			redirext:'login'
		}
	]
}