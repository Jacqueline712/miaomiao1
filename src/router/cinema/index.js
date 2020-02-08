export default{
	path:'/cinema',
	// 采用按需载入,箭头函数
	// 在vue中@表示src目录
	component:() => import('@/views/Cinema')
}