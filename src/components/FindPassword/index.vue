<template>
	<div class="password_body">
		<div class="password_logo">
			<img src="../../assets/image/actions.png">
		</div>
		<div >
			<input v-model="email" class="password_text" type="text" placeHolder="Email">
		</div>
		<div>
			<input v-model="password" class="password_text" type="password" placeHolder="新密码">
		</div>
		<div>
			<input class="password_text" type="password" placeHolder="确认密码">
		</div>
		<div class="password_verify">
			<input v-model="verify" class="password_text" type="text" placeHolder="验证码"><button :disabled="disabled" @touchstart = "handleToVerify">{{verifyInfo}}</button>
			<!-- <input v-model="verify" class="password_text" type="text" placeHolder="验证码" ><button @touchstart = "handleToVerify">发送验证码</button> -->
		</div>
		<div class="password_btn">
			<button @touchstart = "handleToPassword">修改密码</button>
		</div>
		<div class="isLogin">
			<p class="haveaccount">已有账号？<router-link class="register_now" to="/mine/login">立即登录</router-link></p>
		</div>
	</div>
</template>

<script>
	import { messageBox } from '@/components/js'
	
	export default{
		name:'password',
		data(){
			return{
				email: '',
				username: '',
				password: '',
				verify: '',
				verifyInfo: '获取验证码',
				disabled: false
			}
		},
		methods:{
			handleToVerify(){
				if (this.disabled) {
					return;
				}
				
				this.axios.get('/api3/users/verify?email=' + this.email).then((res)=>{
					var status = res.data.status;
					var This = this;
					if(status === 0){
						messageBox({
							title:'验证码',
							content:'验证码已发送',
							ok:'确定',
							handleOk(){
								This.countDown();
							}
							
						});
					}else{
						messageBox({
							title:'验证码',
							content:'验证码发送失败',
							ok:'确定'
						});
					}
				});
			},
			handleToPassword(){
				this.axios.post('/api3/users/findPassword', {
					email: this.email,
					password: this.password,
					verify: this.verify
				}).then((res) => {
					var status = res.data.status;
					var This = this;
					if (status === 0) {
						messageBox({
							title: '修改',
							content: '修改密码成功',
							ok: '确定',
							handleOk() {
								This.$router.push('/mine/login');
							}
						});
					} else {
						messageBox({
							title: '修改',
							content: '修改密码失败',
							ok: '确定'
						});
					}
				});
			},
			countDown(){
				this.disabled = true;
				var count = 60;
				var timer = setInterval(()=>{
					count--;
					this.verifyInfo = '剩余' + count + '秒';
					if(count === 0 ){
						this.disabled = false;
						count = 60;
						this.verifyInfo = "发送验证码";
						clearInterval(timer);
					}
				},1000)
				// console.log(timer);
			}
		}
	}
</script>

<style scoped>
	#content .password_body {
		width: 100%;
	}

	.password_body .password_logo{
		width:100%;
		height:200px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.password_body .password_logo img{
		width:45%;
	}
	
	.password_body .password_text {
		width: 80%;
		height: 40px;
		border: none;
		border-bottom: 0.5px #E6E6E6 solid;
		margin-bottom: 5px;
		outline: none;
		text-indent: 10px;
		margin:0 32px 5px 32px;
	}
	
	.password_body .password_btn {
		height: 50px;
		margin:25px 30px ;
	}

	.password_body .password_verify {
		position: relative;
	}

	.password_body .password_verify button {
		position: absolute;
		right: 45px;
		top: 5px;
		height: 28px;
		border:none;
		border-left: 1px #E5E5E5 solid;
		padding: 3px 10px;
		background: white;
		/* border-radius: 10px; */
		outline: none;
		color:#858585;
	}
	
	.password_body .forget_password{
		margin-top:10px;
		width:90%;
		text-align:right;
	}
	
	.password_body .forget_password a{
		color: #858585;
		text-decoration: none;
	}
	
	.password_body .password_btn button {
		width: 100%;
		height: 100%;
		background: #FE5D6F;
		border-radius: 40px;
		border: none;
		display: block;
		color: white;
		font-size: 20px;
		outline: none;
		box-shadow: 3px 5px 8px #E38D9B;
	}
	
	.password_body .isLogin{
		display: flex;
		justify-content: center;
		margin: -12px auto;
		font-size:16px;
	}
	
	.password_body .isLogin .register_now{
		text-decoration: none;
		color: #FE5D6F;
		font-weight: bold;
	}
</style>
