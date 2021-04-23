s<template>
	<div class="search_body">
		<div class="search_input">
			<div class="search_input_wrapper">
				<i class="iconfont iconsousuo"></i>
				<input type="text" v-model="message" placeholder="搜电影、搜影院">
			</div>
			
			<div class = "cancel-btn" @touchstart = "handleToReturn">
				取消
			</div>
		</div>
		<div class="search_result">
			<h3>电影/电视剧/综艺</h3>
			<ul>
				<li v-for="item in moviesList" :key="item.id">
					<div class="img"><img :src="item.img | setWH('128.180')"></div>
					<div class="info">
						<p>
							<span>{{item.nm}}</span>
							<!-- <img v-if="item.ver = 0" src="@/assets/image/maxs.png"> -->
							<span>{{item.sc}}</span>
						</p>
						<p>{{item.enm}}</p>
						<p>{{item.cat}}</p>
						<p>{{item.rt}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Search',
		data() {
			return {
				message: '',
				moviesList: []
			}
		},
		// 百度axios终止多次请求
		methods: {
			// vue axios请求频繁时取消上一次请求
			// 方法一触发 就停止上一次请求，执行新的请求 而不会一直缓存一直加载导致负荷
			cancelRequest() {
				if (typeof this.source === 'function') {
					this.source('终止请求')
				}
			},
			handleToReturn(){
				this.$router.push('/movie/nowPlaying');
			}
		},
		//watch可以监听到message等字段
		watch: {
			message(newVal) {
				var that = this;
				var cityId = this.$store.state.city.id;
				this.cancelRequest();
				// clearTimeout();
				// setTimeout();
				// onabort();
				// 函数反抖策略
				this.axios.get('/api/searchList?cityId=' + cityId + '&kw=' + newVal, {
					// 第二个参数
					cancelToken: new this.axios.CancelToken(function executor(c) {
						that.source = c;
					})
				}).then((res) => {
					// console.log(newVal);
					var msg = res.data.msg;
					var movies = res.data.data.movies;
					if (msg && movies) {
						this.moviesList = res.data.data.movies.list;
						// console.log(res.data);
					}
				}).catch((err) => {
					if (this.axios.isCancel(err)) {
						console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
					} else {
						//handle error
						// console.log(err);
					}
				});
			}
		}
	}
</script>

<style scoped>
	#content .search_body {
		flex: 1;
		overflow: auto;
	}

	.search_body .search_input {
		padding: 9.5px 15px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		justify-content: space-between;
	}

	.search_body .search_input_wrapper {
		width:calc(100% - 60px);
		padding: 0 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		background-color: #fff;
		display: flex;
		line-height: 20px;
	}

	.search_body .search_input_wrapper i {
		font-size: 16px;
		padding: 4px 0;
	}

	.search_body .search_input_wrapper input {
		border: none;
		font-size: 13px;
		color: #333;
		padding: 4px 0;
		outline: none;
		margin-left: 5px;
		width: 100%;
	}
	.search_body .cancel-btn{
		width:43px;
		text-align: right;
		font-size:14px;
		line-height:30px;
	}

	.search_body .search_result h3 {
		font-size: 15px;
		color: #999;
		padding: 9px 15px;
		border-bottom: 1px solid #e6e6e6;
	}

	.search_body .search_result li {
		border-bottom: 1px #c9c9c9 dashed;
		padding: 10px 15px;
		box-sizing: border-box;
		display: flex;
	}

	.search_body .search_result .img {
		width: 60px;
		float: left;
	}

	.search_body .search_result .img img {
		width: 100%;
	}

	.search_body .search_result .info {
		float: left;
		margin-left: 15px;
		flex: 1;
	}

	.search_body .search_result .info p {
		height: 22px;
		display: flex;
		line-height: 22px;
		font-size: 12px;
	}

	.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
		font-size: 18px;
		flex: 1;
	}

	.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
		font-size: 16px;
		color: #fc7103;
	}
</style>
