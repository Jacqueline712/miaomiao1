<template>
	<div id = "home">
		<div class = "page_search">
			<div class = "page_search_input">
				<div>
					<i class = "iconfont iconsousuo"></i>
					<input type="text" placeholder="请输入影片/影院/影人" >
				</div>
			</div>
			<div class = "page_search_calendar">
				<i class = "iconfont iconrili1"></i>
			</div>
		</div>
		
		<div class = "swiper-container" :key = "datalist.length" ref = "nav">
			<div class = "swiper-wrapper swiper-wrapper-nav">
				<div class = "swiper-slide swiper-slide-nav" v-for="(data,index) in datalist" :key = "index">
					<img :src = "data" />
				</div>
			</div>
			<div class="swiper-pagination" ></div>
		</div>
		<div class = "page_notice">
			<ul>
				<li>
					<div class = "circle">
						<i class = "iconfont iconicon-test1"></i>
					</div>
					<p>最新预告</p>
				</li>
				<li>
					<div class = "circle">
						<i class = "iconfont iconshishishuju"></i>
					</div>
					<p>实时票房</p>
				</li>
				<li>
					<div class = "circle">
						<i class = "iconfont iconguanjun"></i>
					</div>
					<p>历史榜单</p>
				</li>
				<li>
					<div class = "circle">
						<i class = "iconfont icongouwu-"></i>
					</div>
					<p>周边商城</p>
				</li>
			</ul>
		</div>
		
		<div class = "nowplaying">
			<div class = "nowplaying_nav">
				<span>正在热映</span>
				<span>全部 ({{total1}})<i class = "iconfont icondayuhao"></i></span>
			</div>
			<div class="nowplaying_player swiper-container" ref="nowplaying_player">
				<ul class="swiper-wrapper">
					<li v-for="data in nowPlayinglist" :key="data.id" class="swiper-slide">
						<!-- 演职人员 -->
						<img :src="data.img | setWH('66.90')"/>
						<p>{{data.nm}}</p>
						<p>影片评分：{{data.sc}}</p>
					</li>
				</ul>
			</div>
		</div>
		
		<div class = "comingsoon">
			<div class = "comingsoon_nav">
				<span>即将上映</span>
				<span>全部 ({{total2}})<i class = "iconfont icondayuhao"></i></span>
			</div>
			<div class="comingList_player swiper-container" ref="comingList_player">
				<ul class="swiper-wrapper">
					<li v-for="data in comingList" :key="data.id" class="swiper-slide">
						<div>
							<!-- 演职人员 -->
							<img :src="data.img | setWH('98.139')"/>
							<p>{{data.nm}}</p>
							<p>{{data.rt}}上映</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import swiper from '@/components/Swiper'
	import 'swiper/css/swiper.css'
	import Tabbar from '@/components/Tabbar/index.vue'
	
	export default{
		name:'Home',
		data(){
			return{
				datalist:[
						'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1260768271,674237971&fm=26&gp=0.jpg',
						'http://img4.imgtn.bdimg.com/it/u=3297027497,2148965799&fm=26&gp=0.jpg',
						'http://img.zcool.cn/community/016994592faac5a8012193a319f2bb.jpg',
						'http://img.zcool.cn/community/0124f95bd95f94a8012092521da3af.jpg@2o.jpg',
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588883965037&di=4b6735440f584b6aa787ef15603fcd7e&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D998447314%2C3295884595%26fm%3D214%26gp%3D0.jpg',
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588883996467&di=c54fab329f3db00940d9a42b0f52e676&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1618835167%2C1871579388%26fm%3D214%26gp%3D0.jpg',
						'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3489741595,639557983&fm=26&gp=0.jpg'
				],
				nowPlayinglist:[],
				total1:0,
				total2:0,
				comingList:[]
			}
		},
		components:{
			Tabbar,
			swiper
		},
		mounted(){
			// var cityId = this.$store.state.city.id;
			
			// this.axios.get('/api/movieOnInfoList?cityId='+cityId).then(res=>{
			// 	var msg = res.data.msg;
			// 	if(msg = 'ok'){
			// 		// console.log(res.data);
			// 		this.nowPlayinglist = res.data.data.movieList;
			// 		this.total1 = res.data.data.movieList.length;
			// 		// this.isLoading = false; 
			// 		this.$nextTick(()=>{
			// 			new Swiper(this.$refs.nowplaying_player,{
			// 				slidesPerView:'auto',
			// 				// 自由拖放
			// 				freeMode:true,
			// 				freeModeSticky:true
			// 			});
			// 		});
			// 	}
			// });
			
			this.axios.get('/ajax/mostExpected?ci=44&limit=10&offset=0&token=').then(res=>{
				var msg = res.data.msg;
				if(msg = 'ok'){
					this.nowPlayinglist = res.data.coming;
					this.total1 =  res.data.coming.length;
					// console.log(this.movieList);
					// this.isLoading = false; 
					this.$nextTick(()=>{
						new Swiper(this.$refs.nowplaying_player,{
							slidesPerView:'auto',
							// 自由拖放
							freeMode:true,
							freeModeSticky:true
						});
					});
				}
				
			});
			
			// this.axios.get('/api/movieComingList?cityId='+cityId).then(res=>{
			// 	var msg = res.data.msg;
			// 	if(msg = 'ok'){
			// 		// console.log(res.data);
			// 		this.comingList = res.data.data.comingList;
			// 		this.total2 = res.data.data.comingList.length;
			// 		// this.isLoading = false; 
			// 		// this.preCityId = cityId;nowplaying_player
			// 		this.$nextTick(()=>{
			// 			new Swiper(this.$refs.comingList_player,{
			// 				slidesPerView:'auto',
			// 				// 自由拖放
			// 				freeMode:true,
			// 				freeModeSticky:true
			// 			});
			// 		});
			// 	}
			// });
			
			this.axios.get('/ajax/comingList?ci=44&token=&limit=10').then(res=>{
				var msg = res.data.msg;
				if(msg = 'ok'){
					this.comingList = res.data.coming;
					this.total2 = res.data.coming.length;
					// console.log(res.data);
					this.$nextTick(()=>{
						new Swiper(this.$refs.comingList_player,{
							slidesPerView:'auto',
							// 自由拖放
							freeMode:true,
							freeModeSticky:true
						});
					});
				}
				
			});
			
			new Swiper(this.$refs.nav,{
				autoplay:true,//自动滑动
					speed:1000,//自动滑动开始到结束的时间（单位ms）
					loop:true,//开启循环
					loopedSlides:3,//在loop模式下使用slidesPerview:'auto',还需使用该参数设置所要用到的loop个数。
					slidesPerView:'auto',//设置slider容器能够同时显示的slides数量(carousel模式)。另外，支持'auto'值，会根据容器container的宽度调整slides数目。
					effect:'coverflow',//可以实现3D效果的轮播,
					pagination:'.swiper-pagination',//分页器
					centeredSlides:true,//设定为true时，active slide会居中，而不是默认状态下的居左。
					coverflow:{
						rotate:0,//slide做3d旋转时Y轴的旋转角度。默认50。
						stretch:100,//每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
						depth:150,//slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
						modifier:10,//depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
						slideShadows:false,//开启slide阴影。默认 true。
					},
					pagination: {
					  el: '.swiper-pagination'
					}
			});
			
			// window.onScroll=this.handleScroll();
		},
		methods:{
			handleScroll(){
				// console.log(111);
			},
			handleToSearch(){
				// this.$router.push('/search');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-slide-nav{
		// padding:0 10px;
		img{
			// padding-left:10%;
			width:96%;
			margin:0 auto;
			height:170px;
			border-radius: 5px;
		}
	}
	#content{ 
		flex:1; 
		overflow:hidden; 
		margin-bottom: 52px; 
		min-height:100%;
		position: relative;
		display: flex; 
		flex-direction:column;
	}
	.page_search{
		display:flex;
		height:55px;
		justify-content:center;
		align-items:center;
		.page_search_input{
			width:88%;
			display:flex;
			justify-content:center;
			div{
				width:95%;
				height:30px;
				background:#fafbfc;
				border-radius:50px;
				display:flex;
				justify-content: center;
				align-items:center;
			};
			i{
				width:10%;
			};
			input{
				background:#fafbfc;
				width:80%;
				height:30px;
				outline:none;
				border:none;
			};
		};
		.page_search_calendar{
			width:12%;
			text-align:center;
			i{
				font-size:24px;
			}
		};
	};
	.page_notice{
		height:100px;
		ul{
			height:100px;
			display:flex;
			justify-content:space-around;
			align-items:center;
			li{
				display:flex;
				flex-direction:column;
				align-items:center;
				div{
					text-align:center;
					display:flex;
					justify-content:center;
					align-items:center;
					i{
						color:#f9f9f9;
					}
				};
				.circle{
					width:40px;
					height:40px;
					background:#999;
					border-radius:50%;
					background-image: linear-gradient(0deg, #F9B93A, #FFAA80);
				};
				p{
					margin-top:8px;
					color:#7b7b7b;
					font-size:14px;
				}
			}
		}
	}
	.nowplaying{
		height:260px;
		margin-top:20px;
		.nowplaying_nav{
			height:12%;
			display:flex;
			justify-content:space-between;
			span{
				padding:0 15px;
			};
			span:nth-child(1){
				font-size:16px;
				font-weight:bold;
				font-family:'Microsoft YaHei'
			};
			span:nth-child(2){
				font-size:14px;
				i{
					padding-left:3px;
				}
			};
		};
	}
	.comingsoon{
		height:260px;
		margin-top:20px;
		.comingsoon_nav{
			height:12%;
			display:flex;
			justify-content:space-between;
			span{
				padding:0 15px;
			};
			span:nth-child(1){
				font-size:16px;
				font-weight:bold;
				font-family:'Microsoft YaHei'
			};
			span:nth-child(2){
				font-size:14px;
				i{
					padding-left:3px;
				}
			};
		};
	}
	#content .nowplaying_player {
		margin: 10px 10px;
	}
	
	.nowplaying_player .swiper-slide {
		width: 130px;
		// margin-right: 15px;
		// text-align: center;
		font-size: 14px;
		line-height:20px;
	}
	
	.nowplaying_player .swiper-slide img {
		// width: 100%;
		width:108px;
		height:150px;
		border-radius:3px;
		margin-bottom: 5px;
	}
	
	.nowplaying_player .swiper-slide p:nth-child(3) {
		color: #999;
	}
	
	.nowplaying_player .swiper-slide p{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	#content .comingList_player {
		margin: 10px 10px;
	}
	
	.comingList_player .swiper-slide {
		width: 130px;
		// margin-right: 15px;
		// text-align: center;
		font-size: 14px;
		overflow:hidden;
	}
	
	.comingList_player .swiper-slide img {
		// width: 100%;
		width:108px;
		height:150px;
		border-radius:3px;
		margin-bottom: 5px;
	}
	
	.comingList_player .swiper-slide p:nth-of-type(2) {
		color: #999;
	}
	
	.comingList_player .swiper-slide p{
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
</style>
