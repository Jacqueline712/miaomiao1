<template>
	<div class="movie_body" ref="movie_body">
		<!-- 在scroll on做了默认值 不写也没有关系-->
		<!-- <Loading v-if="isLoading"></Loading> -->
		<Scroller  :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
			<ul>
				<li class="pullDown">{{pullDownMsg}}</li>
				<li v-for="item in movieList" :key="item.id">
					<div class="pic_show" ><img :src="item.img | setWH('128.180')" @tap = "handleToDetail(item.id)"></div>
					<div class="info_list">
						<h2 @tap = "handleToDetail(item.id)">{{item.nm}}</h2>
						<!-- <p>观众评 <img v-if="item.version" src="@/assets/image/maxs.png"><span class="grade">{{item.sc}}</span></p> -->
						<p>观众评 <span class="grade">{{item.sc}}</span></p>
						<!-- <p>{{item.star}}</p> -->
						<p>上映时间：{{item.rt}}</p>
						<P>上映信息：{{item.showInfo}}</P>
					</div>
					<div class="btn_mall">
						购票
					</div>
				</li>
			</ul>
		</Scroller>
	
	</div>
</template>

<script>
	// import BScroll from 'better-scroll';
	import axios from 'axios';
	
	export default{
		name:'nowplaying',
		data(){
			return{
				movieList:[],
				pullDownMsg:'',
				isLoading:true,
				preCityId:-1,
				moreClassicList:[]
			}
		},
		activated(){
			// 拿ID
			var cityId = this.$store.state.city.id;
			// if (this.preCityId === cityId) {
			// 	return;
			// }
			
			// this.isLoading = true;
			// console.log(123);
			this.axios.get('/ajax/movieOnInfoList?cityId='+ cityId).then(res=>{
				var msg = res.data.msg;
				if(msg = 'ok'){
					console.log(res.data);
					this.movieList = res.data.movieList;
					this.isLoading = false; 
				}
			});
			// https://m.maoyan.com/ajax/movieOnInfoList?token=
			// this.axios.get('/ajax/mostExpected?ci=44&limit=10&offset=0&token=').then(res=>{
			// 	var msg = res.data.msg;
			// 	if(msg = 'ok'){
			// 		this.movieList = res.data.coming;
			// 		// console.log(this.movieList);
			// 		// this.isLoading = false; 
			// 	}
				
			// });
		},
		methods:{
			handleToDetail(movieId){
				// console.log(movieId);
				this.$router.push('/movie/detail/1/' + movieId);
			},
			handleToScroll(pos){
				// if(pos.y > 30){
				// 	this.pullDownMsg = '正在更新中...';
				// }
				// console.log('正在更新中');
			},
			handleToTouchEnd(pos){
				// if(pos.y > 30){
				// 	this.axios.get('/api/movieOnInfoList?cityId='+ cityId).then((res)=>{
				// 		var msg = res.data.msg;
				// 		if(msg = 'ok'){
				// 			this.pullDownMsg = '更新成功';
				// 			setTimeout(()=>{ 
				// 				this.movieList = res.data.data.films;
				// 				this.pullDownMsg = '';
				// 			},1000);
				// 		}
				// 	});
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loader{
		position:fixed;
	}
	
	#content .movie_body {
		flex: 1;
		overflow: auto;
		height:500px;
	}
	
	.movie_body ul {
		margin: 0 12px;
		overflow: hidden;
	}
	
	.movie_body ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e6e6e6 solid;
		padding-bottom: 10px;
	}
	
	.movie_body .pic_show {
		width: 64px;
		height: 90px;
	}
	
	.movie_body .pic_show img {
		width: 100%;
		border-radius:3px;
	}
	
	.movie_body .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}
	
	.movie_body .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.movie_body .info_list p {
		font-size: 13px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.movie_body .info_list .grade {
		font-weight: 700;
		color: #faaf00;
		font-size: 15px;
	}
	
	.movie_body .info_list img {
		width: 50px;
		position: absolute;
		right: 10px;
		top: 5px;
	}
	
	.movie_body .btn_mall,
	.movie_body .btn_pre {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
	}
	
	.movie_body .btn_pre {
		background-color: #3c9fe6;
	}
	
	.movie_body .pullDown {
		margin: 0;
		padding: 0;
		margin-left:40%;
		border: none;
		color:#bdc0c5;
		font-size:16px;
	}
</style>
