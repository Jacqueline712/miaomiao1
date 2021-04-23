<template>
	<div class="city_body">
		<div class = "header">
			<div class = "left">
				<i class = "iconfont iconshanchu" @touchstart = "handleToReturn"></i>
			</div>
			<div class = "title">
				当前城市 - {{ $store.state.city.nm }}
			</div>
		</div>
		<div class = "search-city-input">
			<div class = "input-wrap">
				<i class = "iconfont iconsousuo"></i>
				<input type = "text" placeholder="输入城市名或拼音" class = "search-input">
			</div>
		</div>
		<Loading v-if="isLoading"></Loading>
		<div v-else class="city_list">
			<Scroller ref = "city_list">
				<!-- 热门城市 -->
				<div>
					<div class="city_hot">
						<h2>GPS定位你所在城市</h2>
						<ul class="clearfix">
							<li @tap="handleToCity(currentCity , currentId)">{{ currentCity }}</li>
						</ul>
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm , item.id)">{{item.nm}}</li>
						</ul>
					</div>
					<!-- 城市分类 -->
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm , itemList.id)">{{itemList.nm}}</li>
							</ul>
						</div>
					</div>
				</div>
			</Scroller>
		</div>
		<!-- 索引 -->
		<div class="city_index">
			<ul>
				<li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'City',
		data() {
			return {
				cityList: [],
				hotList: [],
				isLoading: true,
				currentCity:'定位失败',
				currentId:''
			}
		},
		mounted() {
			var cityList = window.localStorage.getItem('cityList');
			var hotList = window.localStorage.getItem('hotList');

			if (cityList && hotList) {
				// JSON.parse 解析字符串
				this.cityList = JSON.parse(cityList);
				this.hotList = JSON.parse(hotList);
				this.isLoading = false;
			} else {
				this.axios.get('/api/cityList').then((res) => {
					// 判断是否有获取一个数据
					// console.log(res);
					// 做一个判断
					var msg = res.data.msg;
					if (msg === 'ok') {
						this.isLoading = false;
						var cities = res.data.data.cities;
						// 分成的结构
						//[{index : 'A' ,list : [ {nm : '阿城' , id : 123} ] }]
						// 格式化cities
						// 把返回的结果级映射到页面当中
						var {
							cityList,
							hotList
						} = this.formatCityList(cities);
						this.cityList = cityList;
						// console.log(this.cityList);
						this.hotList = hotList;
						// loacalStorage为本地存储 JSON下转化为字符串
						window.localStorage.setItem('cityList', JSON.stringify(cityList));
						window.localStorage.setItem('hotList', JSON.stringify(hotList));
					}
				});
			}
			
			this.axios.get('/api/getLocation').then((res)=>{
				var msg = res.data.msg;
				if(msg === 'ok'){
					var nm = res.data.data.nm;
					var id = res.data.data.id;
					this.currentCity = nm;
					this.currentId = id;
				}
			});
		},
		methods: {
			formatCityList(cities) {
				// 城市分类
				var cityList = [];
				// 热门城市
				var hotList = [];

				for (var i = 0; i < cities.length; i++) {
					if (cities[i].isHot === 1) {
						hotList.push(cities[i]);
					}
				}

				for (var i = 0; i < cities.length; i++) {
					// substring两者都为小写
					// substring字符串的获取，第一个字母
					var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
					if (toCom(firstLetter)) { //新添加index（索引）
						cityList.push({
							index: firstLetter,
							list: [{
								nm: cities[i].nm,
								id: cities[i].id
							}]
						});
					} else { //累加到已有的index中
						for (var j = 0; j < cityList.length; j++) {
							if (cityList[j].index === firstLetter) {
								cityList[j].list.push({
									nm: cities[i].nm,
									id: cities[i].id
								});
							}
						}
					}
				}
				// 对ABCDE顺序进行排序
				cityList.sort((n1, n2) => {
					if (n1.index > n2.index) {
						return 1;
					} else if (n1.index < n2.index) {
						return -1;
					} else {
						return 0;
					}
				});
				// 函数toCom接收到firstLetter
				function toCom(firstLetter) {
					for (var i = 0; i < cityList.length; i++) {
						if (cityList[i].index === firstLetter) {
							return false;
						}
					}
					return true;
				}
				return {
					cityList,
					hotList
				}
				// console.log(cityList);
				// console.log(hotList);
			},
			handleToIndex(Index) {
				var h2 = this.$refs.city_sort.getElementsByTagName('h2');
				// 简单的改变滚动条的位置
				// this.$refs.city_sort.parentNode.scrollTop = h2[Index].offsetTop;
				this.$refs.city_list.toScrollTop(-h2[Index].offsetTop);
			},
			handleToCity(nm, id) {
				this.$store.commit('city/CITY_INFO', {
					nm,
					id
				});
				window.localStorage.setItem('nowNm', nm);
				window.localStorage.setItem('nowId', id);
				this.$router.push('/movie/nowPlaying');
			},
			handleToReturn(){
				this.$router.push('/movie/nowPlaying');
			}

		}
	}
</script>

<style scoped>
	#content .city_body {
		margin-top: 45px;
		display: flex;
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		background: #fff;
	}
	
	.city_body .header{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:44px;
		overflow: hidden;
		margin:0;
		padding:0;
		z-index:300;
		background: #fff;
	}
	
	.city_body .header .left{
		width:14%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.city_body .header div{
		float: left;
		height: 44px;
	}
	
	.city_body .header .title{
		width:72%;
		text-align: center;
		font-size:17px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.city_body .header .left i{
		font-size:22px;
	}
	
	.city_body .search-city-input{
		z-index:2000;
		height:49px;
		width:100%;
		/* padding:9.5px 15px; */
		background: #f4f4f4;
		position: fixed;
		top:44px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.city_body .search-city-input .input-wrap{
		background-color: #fff;
		border-radius: 3px;
		width:90%;
		height:30px;
		display: flex;
		align-items: center;
		
	}
	
	.city_body .search-city-input .input-wrap i{
		width:15%;
		font-size:18px;
		color:#797d82;
		text-align: center;
	}
	
	.city_body .search-city-input .input-wrap .search-input{
		width:80%;
		height:30px;
		border:none;
		outline: none;
		background: transparent;
	}
	
	

	.city_body .city_list {
		flex: 1;
		overflow: auto;
		padding-top: 94px;
		width:95%;
		height:600px;
	}

	.city_body .city_list::-webkit-scrollbar {
		background-color: transparent;
		width: 0;
	}

	.city_body .city_hot {
		padding-left: 15px;
		
	}

	.city_body .city_hot h2 {
		line-height: 35px;
		font-size: 13px;
		color:#797d82;
		font-weight: normal;
	}
	
	.city_body .city_hot ul{
		display: flex;
		justify-content: flex-start;
		align-items:center;
		flex-wrap:wrap;
		
	}
	
	.city_body .city_hot ul li {
		float: left;
		background: #F4F4F4;
		width: calc((100% - 33px)/3.1);
		margin-bottom: 15px;
		margin-left: 3%;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
		color:#191a1b;
		font-size:14px;
	}

	.city_body .city_sort div h2 {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		background: #f4f4f4;
		font-weight: normal;
	}

	.city_body .city_sort ul {
		padding-left: 20px;
		margin-top: 10px;
	}

	.city_body .city_sort ul li {
		line-height: 48px;
		font-size: 14px;
		color:#191a1b;
		border-bottom:1px solid #ededed;
		font-family: 'Microsoft YaHei';
	}

	.city_body .city_index {
		position: fixed;
		z-index: 1999;
		width: 20px;
		font-size:14px;
		/* line-height: ; */
		text-align: center;
		margin-top: 94px;
		color: #2c3e50;
		display: flex;
		flex-direction: column;
		justify-content: center;
		top:0;
		bottom:0;
		right:0;
	}
</style>
