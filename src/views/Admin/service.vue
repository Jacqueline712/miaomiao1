<template>
	<div>
		<el-table
		    :data="cinemaList"
		    border
		    style="width: 100%">
			<el-table-column
			  prop="id"
			  label="影院ID(id)">
			</el-table-column>
			<el-table-column
			  prop="nm"
			  label="影院名称(nm)">
			</el-table-column>
		    <el-table-column
		      prop="tag.allowRefund"
		      label="改签(allowRefund)">
			  <template slot-scope = "scope">
			  	{{scope.row.tag.allowRefund == 1 ? '是' : '否'}}
			  </template>
		    </el-table-column>
		    <el-table-column
		      prop="tag.endorse"
		      label="退票(endorse)">
			  <template slot-scope = "scope">
			  	{{scope.row.tag.endorse == 1 ? '是' : '否'}}
			  </template>
		    </el-table-column>
			<el-table-column
			  prop="tag.sell"
			  label="折扣卡(sell)">
			  <template slot-scope = "scope">
			  	{{scope.row.tag.sell == 1 ? '是' : '否'}}
			  </template>
			</el-table-column>
			<el-table-column
			  prop="tag.snack"
			  label="小吃(snack)">
			  <template slot-scope = "scope">
			  	{{scope.row.tag.snack == 1 ? '是' : '否'}}
			  </template>
			</el-table-column>
		  </el-table>
	</div>
</template>

<script>
	export default{
		name:'service',
		data(){
			return{
				cinemaList: []
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
	}
</script>

<style lang="scss" scoped>
	
</style>
