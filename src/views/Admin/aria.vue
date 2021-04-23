<template>
	<el-container>
		<el-header>
			觅影网管理后台，欢迎：{{$store.state.user.nm}}
			<div class="city-selected">
				<div class="city-name" @mouseenter="handleToCityListEnter($event)" ref = "city_name"  v-bind:style="city_name">
					<span class = "citynm">{{ $store.state.city.nm }}</span>
					<span class='caret'><i class="iconfont iconxiangxia"></i></span>
				</div>
			</div>

		</el-header>
		<!-- <div id="m-header">
		         <div class="right">
		             <i class="iconfont iconsousuo" :style="{'font-size': iSize}" @click.stop="didClickMenus"></i>
		             <ul :class="{active: isShow, none: !isShow}">
		                 <li class="item-top"></li>
		                 <li v-for="(item, index) in menus"
		                     :key="index" @click="didSelectItem(index)"
		                     :class="item.class">
							<p>{{item.name}}</p>
		                 </li>
		             </ul>
		         </div>
		     </div> -->

		<div class="city_sort" ref="city_sort" v-show="isShow" @mouseout = "leaveCitySort($event)">
			<div v-for="item in cityList" :key="item.index">
				<span class="city_index">{{item.index}}</span>
				<ul class="clearfix">
					<li v-for="(itemList,index) in item.list" :key="itemList.id" @click="handleToCity(itemList.nm , itemList.id) " @mouseenter="active(itemList.id)" :class="{'active':currentSort==itemList.id}">{{itemList.nm}}</li>
				</ul>
			</div>
		</div>

	</el-container>


</template>
<style scoped>
	.city-name{
		margin-right:18px;
		padding:0 5px;
		
	}
	.city-name .citynm{
		font-size:16px;
		margin-right:5px;
	}
	.city-name:hover{
		background: #fff;
		border-right:1px solid #999;
	}
	.citynmenter{
		margin-right:18px;
		padding:0 5px;
		font-size:16px;
		background: #fff;
		border-right:1px solid #999;
	}
	.city_sort {
		width: 400px;
		height: 400px;
		border: 1px solid #999;
		overflow-y: auto;
		border-top:none;
		margin-left:1000px;
	}

	.city_index {
		width: 20px;
		background-color: #eee;
		text-align: center;
		vertical-align: top;
		float: left;
		font-weight: bold;
		font-family: Arial;
		font-size: 16px;
		margin: 5px 2px;
	}

	.city_sort ul {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
		display: inline-block;
		margin-left: 9px
	}

	.city_sort ul li {
		display: flex;
		flex-direction: row;
		float: left;
		margin-right: 10px;
		cursor: pointer;
		line-height: 30px;
		font-size: 16px;
		font-family: 'Microsoft YaHei,Helvetica,Arial,sans-serif';
		padding:0 5px;
	}
	
	.active {
	    background: #B3C0D1;
		border-radius: 2px;
	}
</style>

<script>
	export default {
		data() {
			return {
				isShow:false,
				cityList: [],
				currentSort:0,
				city_name:{
					background:'transparent'
				}
			}
		},
		mounted() {
			var cityList = window.localStorage.getItem('cityList');

			if (cityList) {
				// JSON.parse 解析字符串
				this.cityList = JSON.parse(cityList);
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
						// loacalStorage为本地存储 JSON下转化为字符串
						window.localStorage.setItem('cityList', JSON.stringify(cityList));
						window.localStorage.setItem('hotList', JSON.stringify(hotList));
					}
				});
			}

			this.axios.get('/api/getLocation').then((res) => {
				var msg = res.data.msg;
				if (msg === 'ok') {
					var nm = res.data.data.nm;
					var id = res.data.data.id;
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
			handleToCity(nm, id) {
				this.$store.commit('city/CITY_INFO', {
					nm,
					id
				});
				window.localStorage.setItem('nowNm', nm);
				window.localStorage.setItem('nowId', id);
				var cityId = id;
				console.log(cityId);
				// this.$router.push('/movie/nowPlaying');
			},
			active(id) {
				   // console.log(id);
				   this.currentSort  = id;
			},
			handleToCityListEnter(e){
				this.isShow = !this.isShow;
				if(this.isShow = true){
					e.currentTarget.className = 'citynmenter';
					this.city_name.background = '#fff'
				}else{
					this.city_name.background = '#B3C0D1'
				}
			},
			leaveCitySort(){
				this.isShow = !this.isShow;
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		// text-align: center;
		padding-left: 60px;
		line-height: 60px;
		display: flex;
		justify-content: space-between;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
	}

	body>.el-container {
		margin-bottom: 40px;

	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	.el-menu-demo {
		margin-right: 300px;
	}

	.el-submenu {
		background-color: #B3C0D1;
	}


	#m-header {
		background-color: white;
		display: flex;
		padding: 1.08rem 1.6rem;

		.right {
			flex: 1;
			text-align: center;
			position: relative;
		}

		.none {
			display: none;
		}

		.active {
			position: absolute;
			background-color: #fff;
			border: 1px solid #d8d8d8;
			color: #000000;
			width: 3.68rem;
			height: 4.8rem;
			right: 0;
			top: 0;

			p {
				color: #000;
			}
		}

		.item-top {
			height: 0.5rem;
			// list-style-type: none;
		}

		.item-normal,
		.item-last {
			font-weight: 400;
			color: white;
			font-size: 0.45rem;
			padding-left: 0.48rem;
			padding-top: 0.2rem;
			padding-bottom: 0.2rem;
			text-align: left;
			position: relative;
			list-style-type: none;
			cursor: pointer;
		}

		.item-normal::after {
			content: "";
			width: calc(~"3.68rem - 0.48rem * 2");
			height: 1px;
			background-color: white;
			left: 0.48rem;
			position: absolute;
			bottom: 0;
		}
	}
</style>
