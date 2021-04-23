<template>
	<div id="main">
		<div class="setting_return">
			<div class = "return_center">
				<!-- <i class="iconfont iconfanhui" @touchstart="handleToReturn"></i> -->
				<router-link tag = "i" to = "/mine/center" class="iconfont iconfanhui"></router-link>
			</div>
			<div class = "return_center">
				<p>返回个人中心</p>
				<p>TURN BACK</p>
			</div>
		</div>

		<div class="setting_body">
			<div class="shadow_row">
				<div class="shadow">
					<i class = "iconfont iconrili"></i>
					<p>日历</p>
				</div>
				<div class="shadow">
					<i class = "iconfont iconxiugai"></i>
					<p>修改密码</p>
				</div>
			</div>
			<div class="shadow_row">
				<div class="shadow">
					<i class = "iconfont icontuichu" @touchstart="handleToLogout"></i>
					<p>退出登录</p>
				</div>
				<div class="shadow">
					<i class = "iconfont iconquerenzhuxiao"></i>
					<p>注销账户</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios'
	
	export default {
		name: 'Setting',
		data(){
			return{
				
			}
		},
		methods:{
			handleToLogout(){
				this.axios.get('/api3/users/logout').then((res)=>{
					var status = res.data.status;
					// console.log(res);
					if(status === 0){
						// 初始化
						localStorage.removeItem('name');
						localStorage.removeItem('isAdmin');
						localStorage.removeItem('userHead');
						this.$store.commit('user/USER_NAME',{ name:'' , isAdmin : false , userHead : ''})
						this.$router.push('/mine/login')
					}
				});
			},
			// handleToReturn(){
			// 	this.axios.get('/api3/users/getUser').then((res)=>{
			// 		var status = res.data.status;
			// 		// console.log(res);
			// 		if(status === 0){
			// 			this.$router.push('/mine/center')
			// 		}else{
			// 			this.$router.push('/mine/login')
			// 		}
			// 	});
			// }
		},
	}
</script>

<style lang="scss" scoped>
	.setting_return {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.setting_return .return_center{
		padding:0 2%;
		line-height:1.2;
	}
	
	.setting_return .return_center:nth-child(1){
		width:3%;
		padding: 0 5%;
	}
	
	.setting_return .return_center:nth-child(1) i{
		font-size: 24px;
		color: #009966;
	}
	
	.setting_return .return_center:nth-child(2) p:nth-child(1){
		font-size:24px;
		color: #009966;
		font-family: 'Microsoft YaHei';
	}
	
	.setting_return .return_center:nth-child(2) p:nth-child(2){
		font-size:16px;
		line-height: 1.5;
		color: #d0d0d0;
		font-family: 'Microsoft YaHei';
	}
	
	.setting_body{
		width:100%;
		height:320px;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex:1;
	}
	
	.setting_body .shadow_row{
		width:100%;
		height:50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		// background: #F5F2F0;
	}
	
	.setting_body .shadow_row .shadow{
		width: 43%;
		height:90%;
		background:#fff;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-radius: 5px;
		box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.1) ;
	}
	
	.setting_body .shadow_row .shadow i{
		font-size: 28px;
		color: orange;
	}
	
	.setting_body .shadow_row .shadow p{
		font-size: 16px;
		line-height: 2.5;
		color: #d0d0d0;
		// font-weight: bold;
	}

</style>
