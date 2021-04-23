<template>
	<div id = "main">
		<div id="content">
			<keep-alive>
				<router-view />
			</keep-alive>
			<!-- <Login /> -->
		</div>
		<!-- <Tabbar /> -->
	</div>
</template>

<script>
	// import Tabbar from '@/components/Tabbar'
	import Login from '@/components/Login'
	
	export default{
		name:'Mine',
		// components:{
		// 	// Tabbar,
		// 	Login
		// }
	}
</script>

<style lang="scss" scoped>
#content .login_body{  
	width:100%;
}
</style>
