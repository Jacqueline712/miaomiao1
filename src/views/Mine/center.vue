<template>
	<div id = "main">
		<div class = "gradient">
			<div class = "personal_set">
				<i class = "iconfont iconicon-test" @touchstart="handleToSetting"></i>
				<!-- <router-link tag = "i" to = "/mine/setting" class = "iconfont iconicon-test"></router-link> -->
			</div>
			<div class = "personal_center">
				<div class = "personal_center_child">
					<!-- 这个name跟接口上的配置相对应 -->
					<input type = "file" name = "file" value = "上传头像" @change = "handleToUpload">
					<img :src="$store.state.user.userHead">
				</div>
				<div class = "personal_center_child">
					<!-- <div v-model="username" >{{username}}</div> -->
					<div>{{$store.state.user.name}}</div>
					<div>
						<div v-if = "$store.state.user.isAdmin"><i class = "iconfont iconqiyeguanli_yuangongguanli"></i>  用户身份：管理员<a href="/admin" target="_b">   进入管理后台</a></div>
						<div v-else>用户身份：普通会员</div>
						<!-- <i class = "iconfont iconhuiyuan"> -->
					</div>
					
				</div>
				<div class = "personal_center_child">
					<!-- <i class = "iconfont icondayuhao"></i> -->
					>
				</div>
			</div>
			<div class = "personal_fans">
				<li>
					<i>23</i>
					<p>关注</p>
				</li>
				<li>
					<i>690</i>
					<p>粉丝</p>
				</li>
				<li>
					<i>1</i>
					<p>话题</p>
				</li>
				<li>
					<i>32</i>
					<p>影评</p>
				</li>
			</div>
		</div>
		<div class = "gradient_body">
			<div class = "gradient_body_mine">
					<li>
						<i class = "iconfont iconxiaoxi"></i>
						<p>我的消息</p>
					</li>
					<li>
						<i class = "iconfont icondianyingpiao"></i>
						<p>我的影票</p>
					</li>
					<li>
						<i class = "iconfont iconqianbao"></i>
						<p>我的钱包</p>
					</li>
					<li>
						<i class = "iconfont iconyouhuiquan"></i>
						<p>我的优惠券</p>
					</li>
			</div>
			<div class = "gradient_body_client">
					<li>
						<p>想看的电影</p>
						<i> > </i>
					</li>
					<li>
						<p>关注的影院</p>
						<i> > </i>
					</li>
					<li>
						<p>看过的电影</p>
						<i> > </i>
					</li>
					<li>
						<p>商城订单</p>
						<i> > </i>
					</li>
					<li>
						<p>帮助反馈</p>
						<i> > </i>
					</li>
					<li>
						<p>关于我们</p>
						<i> > </i>
					</li>
			</div>
		</div>
		<Tabbar/>
	</div>
</template>

<script>
	import axios from 'axios'
	import Tabbar from '@/components/Tabbar'
	import { messageBox } from '@/components/js'
	
	export default{
		name:'center',
		data(){
			return{
				username:''
			}
		},
		methods:{
			handleToSetting(){
				this.axios.get('/api3/users/getUser').then((res)=>{
					var status = res.data.status;
					// console.log(res);
					if(status === 0){
						this.$router.push('/mine/setting')
					}
				});
			},
			
			// handleToLogout(){
			// 	this.axios.get('/api3/users/logout').then((res)=>{
			// 		var status = res.data.status;
			// 		// console.log(res);
			// 		if(status === 0){
			// 			this.$router.push('/mine/login')
			// 		}
			// 	});
			// },
			handleToUpload(ev){
				var file = ev.target.files[0];
				var param = new FormData();
				param.append('file' , file , file.name);
				var config = {
					headers:{
						'Content-Type' : 'mutipart/form-data'
					}
				};
				
				this.axios.post('/api3/users/uploadUserHead' , param , config).then((res)=>{
					var status = res.data.status;
					var This = this;
					if(status === 0){
						messageBox({
							title:'信息',
							content:'上传头像成功',
							ok:'确定',
							// 成功之后，改新的头像
							handleOk(){
								This.$store.commit('user/USER_NAME',{
									name : This.$store.state.user.name,
									isAdmin :This.$store.state.user.isAdmin,
									// 后面的随机数表示再次修改时做缓存
									userHead : res.data.data.userHead + '?' + Math.random()
								});
							}
						});
					}else{
						messageBox({
							title:'信息',
							content:'上传头像失败',
							ok:'确定',
						});
					}
				});
			}
		},
			
		// 获取登录信息，做前置守卫
		beforeRouteEnter (to, from, next) {
		    axios.get('/api3/users/getUser').then((res)=>{
		    	var status = res.data.status;
		    	// console.log(res);
		    	if(status === 0){
		    		next(vm => {
						localStorage.setItem('name' , res.data.data.username);
						localStorage.setItem('isAdmin' , res.data.data.isAdmin);
		    			vm.$store.commit('user/USER_NAME',{
							name : res.data.data.username , 
							isAdmin : res.data.data.isAdmin,
							userHead : res.data.data.userHead
							});
		    		});
		    	}else{
		    		next('/mine/login');
		    	}
		    });
		  },
		components:{
			Tabbar
		}
	}
	
</script>

<style lang="scss" scoped>
	.gradient{
		width:100%;
		height:35%;
		background-image: linear-gradient(90deg, #F9B93A, #FFAA80);
		position: fixed;
		color: white;
	}
	
	.personal_set{
		width:100%;
		height:20%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	.personal_set i{
		width: 10%;
		color: white;
		font-size: 20px;
		
	}
	
	.personal_center{
		width:100%;
		height:35%;
		display: flex;
		flex-direction: space-around;
		justify-content: center;
		align-items: center;
	}
	
	.personal_center .personal_center_child{
		display: flex;
		justify-content: center;
	}
	
	.personal_center .personal_center_child:nth-child(1){
		width:30%;
	}
	
	.personal_center .personal_center_child:nth-child(1) img{
		width:60px;
		height:60px;
		border-radius: 30px;
		border: 1px #FFFFFF solid;
	}
	
	.personal_center .personal_center_child:nth-child(1) input{
		width:60px;
		height:60px;
		border-radius: 30px;
		border: 1px #FFFFFF solid;
		position:absolute;
		opacity:0;
	}
	
	.personal_center .personal_center_child:nth-child(2){
		width:52%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	
	.personal_center .personal_center_child:nth-child(2) a{
		color:#f9f9f9;
	}
	
	.personal_center .personal_center_child:nth-child(3){
		width:18%;
		font-weight: bold;
	}
	
	.personal_fans{
		width:100%;
		height:35%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
	}
	
	.personal_fans i{
		font-size:24px;
	}
	
	.personal_fans p{
		font-size:16px;
	}
	
	.gradient_body{
		width:100%;
		height:61%;
		position: fixed;
		background: #fefefe;
		// background: #ffaaff;
		border-radius: 20px 20px 0 0;
		// margin-top: 55%;、
		bottom: 7.5%;
	}
	
	.gradient_body .gradient_body_mine{
		width:100%;
		height:20%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
	}
	
	.gradient_body .gradient_body_mine li{
		width:25%;
	}
	
	.gradient_body .gradient_body_mine li p{
		margin-top:8%;
		font-size: 16px;
	}
	
	.gradient_body .gradient_body_mine li i{
		color:#F9B93A;
	}
	
	.gradient_body .gradient_body_client{
		width:100%;
		height:80%;
	}
	
	.gradient_body .gradient_body_client li{
		height:15%;
		
	}
	
	.gradient_body .gradient_body_client li p{
		display: inline-block;
		width:85%;
		margin: 0 4%;
		font-size: 16px;
	}
	.gradient_body .gradient_body_client li i{
		display: inline-block;
	}
</style>
