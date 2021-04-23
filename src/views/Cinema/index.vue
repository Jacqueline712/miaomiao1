<template>
	<div id="main">
		<Header title = "影院Cinema"/>
		<div id="content">
			<div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont iconxiangxia"></i>
				</div>
				<div class="brand_swtich">
					APP订票 <i class="iconfont iconxiangxia"></i>
				</div>
				<div class="feature_switch">
					最近去过 <i class="iconfont iconxiangxia"></i>
				</div>
			</div>
			<CiList />
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		<Tabbar />
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import Tabbar from '@/components/Tabbar'
	import CiList from '@/components/CiList'
	
	export default{
		name:'Cinema',
		components:{
			Tabbar,
			Header,
			CiList
		}
	}
</script>

<style lang="scss" scoped>
	#content {
		flex: 1;
		overflow: auto;
		margin-bottom: 50px;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	
	#content .cinema_menu{ 
		width: 100%; 
		height: 45px; 
		border-bottom:1px solid #f6f6f6; 
		display: flex; 
		justify-content:space-around; 
		align-items:center; 
		background:white;
	}
	
	.cinema_menu div{
		font-size:14px;
	}
	.cinema_menu div i{
		font-size:12px;
		padding-left:2px;
	}

</style>
