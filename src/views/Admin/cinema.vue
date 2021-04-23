<template>
	<div>
		<!-- 城市
		城市ID
		影院名称
		影院地址
		影院距离
		影院最低价格 -->
		<el-table
		    :data="cinemaList"
		    border
		    style="width: 100%">
			<el-table-column
			  prop="cityId"
			  label="城市">
			  {{this.$store.state.city.nm}}
			</el-table-column>
			<el-table-column
			  prop="id"
			  label="影院ID">
			</el-table-column>
		    <!-- <el-table-column
		      prop="nm"
		      label="城市">
			  <template slot-scope = "scope">
			  	<span class = "nowplaying_nm" @click = "handleToDetailMoive(scope.$index,scope.row)">{{scope.row.nm}}</span>
			  </template>
		    </el-table-column> -->
		    <el-table-column
		      prop="nm"
		      label="影院名称">
		    </el-table-column>
		    <el-table-column
		      prop="addr"
		      label="影院地址">
		    </el-table-column>
			<el-table-column
			  prop="distance"
			  label="影院距离">
			</el-table-column>
			<el-table-column
			  prop="sellPrice"
			  label="影院最低价格">
			  <template slot-scope = "scope">
			  	{{scope.row.sellPrice}}元起
			  </template>
			</el-table-column>
		  </el-table>
		
	</div>
</template>

<script>
	export default{
		name:'cinema',
		data(){
			return{
				cinemaList: [],
			}
		},
		mounted() {
		
			var cityId = this.$store.state.city.id;
			this.axios.get('/ajax/cinemaList?cityId=' + cityId).then((res) => {
				var that = this;
				var msg = res.data.msg;
				// console.log(res.data);
				this.cinemaList = res.data.cinemas;
				// if (msg === 'ok') {
				// 	this.cinemaList = res.data.cinemas;
				// }
			});
		},
		filters: {
			formatCard(key) {
				var card = [
					{
						key: 'allowRefund',
						value: '改签'
					},
					{
						key: 'endorse',
						value: '退'
					},
					{
						key: 'sell',
						value: '折扣卡'
					},
					{
						key: 'snack',
						value: '小吃'
					},
				];
				for (var i = 0; i < card.length; i++) {
					if (card[i].key === key) {
						return card[i].value;
					}
				}
				return '';
			},
			classCard(key) {
				var card = [{
						key: 'allowRefund',
						value: 'or'
					},
					{
						key: 'endorse',
						value: 'or'
					},
					{
						key: 'sell',
						value: 'bl'
					},
					{
						key: 'snack',
						value: 'bl'
					},
				];
				for (var i = 0; i < card.length; i++) {
					if (card[i].key === key) {
						return card[i].value;
					}
				}
				return '';
			}
		},
	}
</script>

<style lang="scss" scoped>
	
</style>
