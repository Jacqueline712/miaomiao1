<template>
	<footer id = "footer">
		<ul>
			<router-link tag = "li" to="/page">
			<i class ="iconfont iconshouye"></i>
				<p>首页</p>
			</router-link>
			<router-link tag = "li" to="/movie">
			<i class ="iconfont icondianyingyuan"></i>
				<p>电影</p>
			</router-link>
			<router-link tag = "li" to="/cinema">
			<i class ="iconfont iconxingqiu"></i>
				<p>影院</p>
			</router-link>
			<router-link tag = "li" to="/mine/center">
			<i class ="iconfont iconwode"></i>
				<p>我的</p>
			</router-link>
		</ul>
	</footer>
</template>

<script>
	export default{
		name:'Tabbar'
	}
</script>

<style lang="scss" scoped>
#footer{
	width:100%;
	height:52px;
	background:#FEFEFE;
	border-top:2px #FDFBFE solid;
	position:fixed;
	left:0;
	bottom:0;
	z-index:100;
}

#footer ul{
	margin: 0;
	padding:0;
	display: flex;
	text-align: center;
	height:52px;
	align-items:center;
}

#footer ul li{
	flex:1;
	height:40px;
	// 去掉 ·
	list-style: none;
}

#footer ul li.router-link-active{
	color:#F9B93A;
}

#footer ul li i{
	font-size: 24px;
}

#footer ul p{
	margin:auto 0;
	font-size: 12px;
	color:#6F6F71;
	line-height:18px;
}
</style>
