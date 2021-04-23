<template>
	<div class = "login_body">
		
		<div class = "loading">
			<Loading />
		</div>
		<div class = "hello">
			<p>您好，</p>
			<p>欢迎来到觅影。</p>
		</div>
		<div class = "login">
			<div>
				<input v-model="username" class="login_text" type="text" placeHolder="账户名/手机号/Email">
			</div>
			<div>
				<input v-model="password" class="login_text" type="password" placeHolder="请输入您的密码">
			</div>
			<!-- <div>
				<input v-model="verifyImg" class="login_text" type="text" placeHolder="验证码"><img @touchstart = "handleToVerifyImg" src="/api3/users/verifyImg">
			</div> -->
		</div>
		<div class = "forget_password">
			<router-link to = "/mine/findpassword"><a href="">忘记密码？</a></router-link>
		</div>
		<div class="login_btn">
			<input type="submit" value="登录" @touchstart="handleToLogin">
		</div>
		<div class="isregister">
			<p class="noaccount">还没有账号？<router-link class="register_now" to="/mine/register">立即注册</router-link></p>
		</div>
		<div class = "third_party">
			<li><i class="iconfont iconqq"></i></li>
			<li><i class="iconfont iconwechat-fill"></i></li>
			<li><i class = "iconfont iconweibo"></i></li>
		</div>
	</div>
</template>

<script>
	// import { MessageBox } from 'mint-ui'
	import { messageBox } from '@/components/js'
	// import axios from 'axios'
	
	export default{
		name:'Login',
		data(){
			return{
				username:'',
				password:'',
				verifyImg:''
			}
		},
		methods:{
			handleToLogin(){
				this.axios.post('/api3/users/login',{
					username : this.username,
					password : this.password,
					verifyImg : this.verifyImg
				}).then((res)=>{
					// console.log(res);
					var status = res.data.status;
					var This = this;
					if(status === 0){
						messageBox({
							title: '登录',
							content: '登录成功',
							ok: '确定',
							//登录后跳转到个人中心
							handleOk() {
								This.$router.push('/mine/center');
							}
						});
					}else{
						messageBox({
							title: '登录',
							content: res.data.msg,
							ok: '确定'
						});
					}
					// console.log(res);
				});
			},
			handleToVerifyImg(ev){
				ev.target.src = '/api3/users/verifyImg?' + Math.random();
			}
		}
	}
</script>

<style lang="scss" scoped>
.loading{
	height:100px;
	position: relative;
	margin-left: -250px;
}
.login_body{
	left:15px;
	right:15px;
}

// .login_body .login{
// 	width:100%;
// 	height:120px;
// }

.login_body .login .login_text{
	width:80%;
	height:40px;
	border:1px #EEEEF0 solid;
	border-radius: 20px;
	// 针对文字
	padding-left:10px;
	outline: none;
}

.login_body .hello{
	height:65px;
	font-size:24px;
	color: black;
	font-family:"Microsoft YaHei";
	// font-weight: bold;
}

.login_body .forget_password{
	text-align:right;
}

.login_body .forget_password a{
	color: #858585;
	text-decoration: none;
}

.login_body .login_btn{
	height: 50px;
	margin:25px 30px ;
}

.login_body .login_btn input{
	width: 100%;
	height: 100%;
	background: #FE5D6F;
	border-radius: 40px;
	border: 2px #fe5670 solid;
	// display: block;
	color: white;
	font-size: 20px;
	box-shadow: 3px 5px 8px #E38D9B;
	outline: none;
	
}

.login_body .isregister{
	display: flex;
	justify-content: center;
	margin: -10px auto;
	font-size:16px;
}

.login_body .isregister .register_now{
	text-decoration: none;
	color: #fd426e;
	font-weight: bold;
}

.login_body .third_party{
	width:100%;
	position: fixed;
	margin:0 auto;
	bottom: 40px;
}

.login_body .third_party li{
	flex:1;
	width:33%;
	// list-style: none;
	display: flex;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}

.login_body .third_party i{
	font-size:44px;
}

.hello,.login_text,.forget_password{
	margin:10px 30px;
}
</style>
