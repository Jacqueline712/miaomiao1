<template>
	<div id="main">
		<Header />
		<div id="content">
			<div class="movie_menu">
				<div class="hot_swtich">
					<router-link tag="div" to="/movie/nowPlaying" class="hot_item">
						<div>正在热映</div>
						<div class = "active_border_width"></div>
					</router-link>
					
					<router-link tag="div" to="/movie/comingSoon" class="hot_item">
						<div>即将上映</div>
						<div class = "active_border_width"></div>
					</router-link>
				</div>
			</div>
			<!-- 做二级路由渲染  keep-alive表示加一个缓存-->
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		<Tabbar />
		<router-view name = "detail" />
	</div>
</template>

<script>
	import Tabbar from '@/components/Tabbar'
	import Header from '@/components/Header'
	import {messageBox} from '@/components/js'

	export default {
		name: 'Ticket',
		components: {
			Tabbar,
			Header
		},
		mounted(){
			setTimeout(()=>{
				this.axios.get('/api/getLocation').then((res)=>{
					var msg = res.data.msg;
					if(msg === 'ok'){
						var nm = res.data.data.nm;
						var id = res.data.data.id;
						if(this.$store.state.city.id == id){return;}
						messageBox({
							title:'定位',
							content:nm,
							cancel:'取消',
							ok:'切换定位',
							handleOk(){
								window.localStorage.setItem('nowNm',nm);
								window.localStorage.setItem('nowId',id);
								window.location.reload();
							}
						});
					}
				});
			},2000);
		}
	}
</script>

<style lang="scss" scoped>
	#content {
		flex: 1;
		overflow: auto;
		margin-bottom: 52px;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	#content .movie_menu {
		width: 100%;
		height: 45px;
		// border-bottom: 1px solid #f0f0f0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: white;
		z-index: 10;
	}

	.movie_menu .hot_swtich {
		width:100%;
		height: 100%;
		display: flex;
		justify-content:space-around;
		line-height: 45px;
	}

	.movie_menu .hot_item {
		font-size: 15px;
		color: #666;
		margin: 0 12px;
		font-weight: 700;
		display:flex;
		flex-direction:column;
		justify-content:space-around;
	}
	
	.movie_menu .hot_item div:nth-child(1){
		height:90%;
	}

	.movie_menu .hot_item.router-link-active {
		color: #faa700;
		// border-bottom: 2px #ef4238 solid;
	}
	
	.movie_menu .hot_item.router-link-active .active_border_width{
		width:35px;
		height:3px;
		margin-left:20%;
		background:#faa700;
	}
	
	
	// .active_border_width{
	// 	width:50px;
	// 	height:10px;
	// 	background:#ef4238;
	// }
</style>
