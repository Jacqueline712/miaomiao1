<template>
	<div id="detailContainer" class="slide-enter-active">
		<header id="header">
			<i class="iconfont iconfanhui1" @touchstart="handleToBack"></i>
			<h1>影片详情</h1>
		</header>
		<Loading v-if="isLoading" />
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style = "{'background-image':'url('+ detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.img | setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<!-- 电影名称 -->
						<div>
							<h2>{{detailMovie.nm}}</h2>
						</div>
						<!-- 英文名 -->
						<p>{{detailMovie.enm}}</p>
						<p>评分：{{detailMovie.sc}}</p>
						<p>类型：{{detailMovie.cat}}</p>
						<p>主演：{{detailMovie.star}}</p>
						<p>{{detailMovie.pubDesc}} | {{detailMovie.dur}}分钟</p>
					</div>
				</div>
			</div>

			<div class="detail_intro">
				<!-- 简介 -->
				<div class = "title">
					<span>简介</span>
				</div>
				<div class = "intro">
					<p>{{detailMovie.dra}}</p>
				</div>
			</div>
			
			<div class = "praise">
				<div class = "top">实时口碑</div>
				<div class = "middle">
					<span>{{detailMovie.wish}}</span>
					<span>人想看</span>
				</div>
				<div class = "bottom"></div>
			</div>
			
			<div class = "photos">
				<div class = "title">
					<span>剧照</span>
				</div>
				<div class="detail_player swiper-container" ref="detail_player">
					<ul class="swiper-wrapper">
						<li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
							<div>
								<!-- 演职人员  wish 多少人想看 -->
								<img :src="item | setWH('140.127')" alt="">
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Detail',
		data() {
			return {
				detailMovie: [],
				isLoading: true
			}
		},
		props: ['movieId'],
		methods: {
			handleToBack() {
				this.$router.back();
			}
		},
		mounted() {
			// console.log(this.movieId);
			this.axios.get('/ajax/detailmovie?movieId=' + this.movieId).then((res) => {
				var msg = res.statusText;
				console.log(res.data.detailMovie);
				if (msg === 'OK') {
					// 注意位置关系
					this.isLoading = false;
					this.detailMovie = res.data.detailMovie;
					// console.log(res);
					this.$nextTick(()=>{
						new Swiper(this.$refs.detail_player,{
							slidesPerView:'auto',
							// 自由拖放
							freeMode:true,
							freeModeSticky:true
						});
					});

				}
			});
			
			// this.axios.get('/asgard/detailmovie?movieId=1298859').then((res) => {
			// 	var msg = res.data.msg;
			// 		console.log(res.data);
			// // 	if (msg === 'ok') {
			// // 		this.detailMovie = res.data;
			// // 		console.log(res.data)
			// // 		// console.log(res.data);
			// // 		this.$nextTick(()=>{
			// // 			new Swiper(this.$refs.detail_player,{
			// // 				slidesPerView:'auto',
			// // 				// 自由拖放
			// // 				freeMode:true,
			// // 				freeModeSticky:true
			// // 			});
			// // 		});
			
			// // 	}
			// });
		}
	}
</script>

<style lang="scss" scoped>
	#header {
		width: 100%;
		height: 50px;
		color: #fff;
		background-image: linear-gradient(90deg, #F9B93A, #FFAA80);
		border-bottom: 1px solid #F9B93A;
		position: relative;
	}

	#header h1 {
		font-size: 18px;
		text-align: center;
		line-height: 50px;
		font-weight: normal;
	}

	#header i {
		position: absolute;
		left: 5px;
		top: 50%;
		margin-top: -13px;
		font-size: 26px;
	}

	#detailContainer {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		min-height: 100%;
		background: white;
	}

	#detailContainer.slide-enter-active {
		animation: .3s slideMove;
	}

	@keyframes slideMove {
		0% {
			tranform: translateX(100%);
		}

		100% {
			transform: translateX(0);
		}
	}

	.contentDetail {
		display: block;
		margin-bottom: 0;
		// background:#401E1A;
		background:#401E1A;
		color:#fff;
		padding:15px 12px;
	}

	.detail_list {
		height: 200px;
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.detail_list .detail_list_bg {
		width: 100%;
		height: 100%;
		background: 0 40%;
		filter: blur(20px);
		background-size: cover;
		position: absolute;
		left: 0;
		top: 0;
	}

	.detail_list .detail_list_filter {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: #40454d;
		opacity: .55;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
	}

	.detail_list .detail_list_content {
		display: flex;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		box-shadow: 30px 30px 30px 30px hsla(0,0%,100%,0.3);
	}

	.detail_list .detail_list_img {
		width: 108px;
		height: 150px;
		border: solid 1px #f0f2f3;
		margin: 20px;
	}

	.detail_list .detail_list_img img {
		width: 100%;
		height: 100%;
	}

	.detail_list .detail_list_info {
		margin-top: 20px;
		display: flex;
		flex-direction:column;
		overflow: hidden;
	}

	.detail_list .detail_list_info h2 {
		font-size: 20px;
		color: white;
		font-weight: normal;
		line-height: 38px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.detail_list .detail_list_info p {
		color: white;
		line-height: 22px;
		font-size: 14px;
		color: #ccc;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	#content .detail_intro {
		padding: 10px;
		font-size:15px;
	}
	
	#content .detail_intro .title span{
		line-height:23px;
	}
	
	#content .detail_intro .intro p{
		
		text-align:justify;
		/* text-indent:30px; */
		line-height:23px;
		/* text-overflow:ellipsis; */
		/* word-wrap:break-word; */
		/* word-break:break-all; */
		overflow:hidden;
		margin-top:7px;
	}
	
	#content .praise{
		background-color: rgba(0,0,0,0.2);
		box-shadow: 0 0 3px 0 hsla(0,0%,100%,0.03);
		border-radius:10px;
		margin-top:15px;
		padding:10px 14px
	}
	#content .praise .top{
		font-size:14px;
	}
	
	#content .praise .middle{
		display: flex;justify-content: center;align-items: center;padding:12px 0;line-height:80px
	}
	
	#content .praise .middle span:nth-child(1){
		color:#ffbb29;font-size:30px;margin-right:3px
	}
	
	#content .praise .middle span:nth-child(2){
		font-size:22px;color:#fff;
	}
	
	#content .praise .bottom{
		padding-top:21px;border-top:1px solid rgba(240,240,240,0.2);
	}

	#content .detail_player {
		margin: 20px 10px;
	}

	.detail_player .swiper-slide {
		width: 70px;
		margin-right: 15px;
		text-align: center;
		font-size: 14px;
	}

	.detail_player .swiper-slide img {
		width: 100%;
		margin-bottom: 5px;
	}

	.detail_player .swiper-slide p:nth-of-type(2) {
		color: #999;
	}
	
	#content .photos{
		padding: 10px;
	}
	
	#content .photos .title span{
		font-size:15px;
		line-height:23px;
		
	}
</style>
