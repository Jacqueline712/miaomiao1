<template>
	<div class="register_body">
		<div class="register_logo">
			<img src="../../assets/image/actions.png">
		</div>
		<div >
			<input v-model="email" class="register_text" type="text" placeHolder="Email">
		</div>
		<div>
			<input v-model="username" class="register_text" type="text" placeHolder="用户名">
		</div>
		<div>
			<input v-model="password" class="register_text" type="password" placeHolder="密码">
		</div>
		<div>
			<input class="register_text" type="password" placeHolder="确认密码">
		</div>
		<div class="register_verify">
			<input v-model="verify" class="register_text" type="text" placeHolder="验证码" ><button :disabled="disabled" @touchstart = "handleToVerify">{{verifyInfo}}</button>
			<!-- <input v-model="verify" class="register_text" type="text" placeHolder="验证码" ><button @touchstart = "handleToVerify">发送验证码</button> -->
		</div>
		<div class = "forget_password">
			<router-link to = "/mine/findpassword"><a href="">忘记密码？</a></router-link>
		</div>
		<div class="register_btn">
			<button @touchstart = "handleToRegister">注册</button>
		</div>
		<div class="islogin">
			<p class="haveaccount">已有账号！<router-link class="login_now" to="/mine/login">立即登录</router-link></p>
			
		</div>
	</div>
</template>

<script>
	import { messageBox } from '@/components/js/index.js'
	
	export default{
		name:'register',
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
				
				this.axios.get('/api3/users/verify?email='+this.email).then((res)=>{
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
			handleToRegister(){
				this.axios.post('/api3/users/register',{
					email:this.email,
					username:this.username,
					password:this.password,
					verify:this.verify
				}).then((res)=>{
					var status = res.data.status;
					var This = this;
					if(status === 0){
						messageBox({
							title:'注册',
							content:'用户注册成功',
							ok:'确定',
							handleOk(){
								This.$router.push('/mine/login');
							}
						});
					}else{
						messageBox({
							title:'注册',
							content:res.data.msg + ',请重新注册',
							ok:'确定'
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
	#content .register_body {
		width: 100%;
	}

	.register_body .register_logo{
		width:100%;
		height:200px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.register_body .register_logo img{
		width:45%;
	}
	
	.register_body .register_text {
		width: 80%;
		height: 40px;
		border: none;
		border-bottom: 0.5px #E6E6E6 solid;
		margin-bottom: 5px;
		outline: none;
		text-indent: 10px;
		margin:0 32px 5px 32px;
		
	}
	
	.register_body .register_btn {
		height: 50px;
		margin:25px 30px ;
	}

	.register_body .register_verify {
		position: relative;
	}

	.register_body .register_verify button {
		position: absolute;
		right: 45px;
		top: 5px;
		height: 28px;
		border: 1px #E5E5E5 solid;
		padding: 3px 10px;
		background: white;
		border-radius: 10px;
		outline: none;
		color:#858585;
	}
	
	.register_body .forget_password{
		width:90%;
		text-align:right;
	}
	
	.register_body .forget_password a{
		color: #858585;
		text-decoration: none;
	}
	
	.register_body .register_btn button {
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
	
	.register_body .islogin{
		display: flex;
		justify-content: center;
		margin: -14px auto;
		font-size:16px;
	}
	
	.register_body .islogin .login_now{
		text-decoration: none;
		color: #FE5D6F;
		font-weight: bold;
	}
</style>
