<template>
	<el-container>
	  <el-header>觅影网管理后台，欢迎：{{$store.state.user.nm}}
	  <div class="city-selected">
		<div class="city-name" @mouseenter="handleToCityListEnter($event)" ref = "city_name"  v-bind:style="city_name">
			<span class = "citynm">{{ $store.state.city.nm }}</span>
			<span class='caret'><i class="iconfont iconxiangxia"></i></span>
		</div>
	  </div>
	  </el-header>
	  <div class="city_sort" ref="city_sort" v-show="isShow" @mouseout = "leaveCitySort($event)" style = "">
	  	<div v-for="item in cityList" :key="item.index">
	  		<span class="city_index">{{item.index}}</span>
	  		<ul class="clearfix">
	  			<li v-for="(itemList,index) in item.list" :key="itemList.id" @mouseenter="active(itemList.id)" :class="{'active':currentSort==itemList.id}" @click="handleToCity(itemList.nm , itemList.id) " >{{itemList.nm}}</li>
	  		</ul>
	  	</div>
	  </div>
	  <el-container>
	    <el-aside width="200px">
			<el-menu default-active="1">
			  <el-menu-item index="1">
				<i class="el-icon-menu"></i>
				<router-link slot="title" tag = "span" to = "/admin/users">用户管理</router-link>
			  </el-menu-item>
			  
			  <el-submenu index="2">
			    <template slot="title">
			      <i class="el-icon-location"></i>
			      <!-- <router-link slot="title" tag = "span" to = "/admin/movie">电影管理</router-link> -->
				  <span slot = "title">电影管理</span>
			    </template>
			    <el-menu-item-group>
			      <!-- <template slot="title">分组一</template> -->
				  <el-menu-item index="2-1">
					  <router-link slot="title" tag = "span" to = "/admin/nowplaying">正在热映</router-link>
				  </el-menu-item>
				  <el-menu-item index="2-2">
					<router-link slot="title" tag = "span" to = "/admin/comingsoon">即将上映</router-link>
				  </el-menu-item>
				  <!-- <el-menu-item index="2-3">
				  	<router-link slot="title" tag = "span" to = "/admin/detailmovie">电影详情页</router-link>
					<span>电影详情页</span>
				  </el-menu-item> -->
			    </el-menu-item-group>
			  </el-submenu>
			  
			  <el-menu-item index="3">
				<i class="el-icon-setting"></i>
				<router-link slot="title" tag = "span" to = "/admin/cinema">影院管理</router-link>
			  </el-menu-item>
			  
			  <el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<router-link slot="title" tag = "span" to = "/admin/service">影院服务</router-link>
			  </el-menu-item>
			
			</el-menu>
			  
		</el-aside>
	    <el-main>
			<router-view />
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'admin',
		data(){
			return{
				cityList: [],
				activeIndex:'1',
				isShow:false,
				currentSort:0,
				city_name:{
					background:'transparent'
				}
			}
		},
		mounted() {
			var cityList = window.localStorage.getItem('cityList');
			// var hotList = window.localStorage.getItem('hotList');
		
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
							// hotList
						} = this.formatCityList(cities);
						this.cityList = cityList;
						// this.hotList = hotList;
						// loacalStorage为本地存储 JSON下转化为字符串
						window.localStorage.setItem('cityList', JSON.stringify(cityList));
						// window.localStorage.setItem('hotList', JSON.stringify(hotList));
					}
				});
			}
			
			this.axios.get('/api/getLocation').then((res)=>{
				var msg = res.data.msg;
				if(msg === 'ok'){
					var nm = res.data.data.nm;
					var id = res.data.data.id;
				}
			});
		},
		methods:{
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
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
				// console.log(id);
				this.isShow = !this.isShow;
				window.localStorage.setItem('nowNm', nm);
				window.localStorage.setItem('nowId', id);
				this.nowplaying = true;
				this.cityId = id;
				var id = id;
				// this.$router.push('/admin/nowPlaying');
				this.$router.push({name: "nowplaying", params: {id}});
				console.log(nm , id);
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
				// this.isShow = !this.isShow;
			}
		},
		beforeRouteEnter(to , from , next){
			axios.get('/api3/admin').then((res)=>{
				var status = res.data.status;
				if(status === 0){
					next();
				}else{
					next('mine/login')
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.el-header, .el-footer {
	    background-color: #B3C0D1;
	    color: #333;
	    // text-align: center;
		padding-left:60px;
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
	  
	  body > .el-container {
	    margin-bottom: 40px;
	  }
	  
	  .el-container:nth-child(5) .el-aside,
	  .el-container:nth-child(6) .el-aside {
	    line-height: 260px;
	  }
	  
	  .el-container:nth-child(7) .el-aside {
	    line-height: 320px;
	  }
	  
	  .el-menu-demo{
		  margin-right:300px;
	  }
	  
	  .el-submenu{
		  background-color: #B3C0D1;
	  }
	  
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
	  	// margin-left:1000px;
		right:2.65%;
		z-index:99999;
		position: fixed;
		margin-top: 60px;
		background-color: #fff;
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
