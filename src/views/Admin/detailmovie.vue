<template>
	<div>
		<div class = "detail_title">
			《{{tableData.nm}}》详情页
		</div>
		<el-table
		    :data="tableData_arr"
		    border
		    style="width: 100%">
			<el-table-column
			  prop="id"
			  label="电影ID">
			</el-table-column>
		    <el-table-column
		      prop="nm"
		      label="电影名称">
		    </el-table-column>
			<el-table-column
			  prop="enm"
			  label="英文名">
			</el-table-column>
			<el-table-column
			  prop="ver"
			  label="是否3D">
			</el-table-column>
			<el-table-column
			  prop="cat"
			  label="电影类型">
			</el-table-column>
			<el-table-column
			  prop="star"
			  label="主演">
			</el-table-column>
		    <el-table-column
		      prop="dra"
		      label="电影简介"
			  show-overflow-tooltip>
		    </el-table-column>
		    <el-table-column
		      prop="sc"
		      label="观众评分">
		    </el-table-column>
			<el-table-column
			  prop="pubDesc"
			  label="上映时间">
			</el-table-column>
			<el-table-column
			  prop="dur"
			  label="播放时长">
			  <template slot-scope = "scope">
			  	{{scope.row.dur}}分钟
			  </template>
			</el-table-column>
			<el-table-column
			  prop="wish"
			  label="实时口碑">
			  <template slot-scope = "scope">
			  	{{scope.row.wish}}人想看
			  </template>
			</el-table-column>
		  </el-table>
		  <!-- 分页器 -->
		 <!-- <el-pagination class = "page"
		    background
			layout = "prev,pager,next"
			:page-size = "1"
			:current-page.sync="currentPage"
		    :total="tableData.length">
		  </el-pagination> -->
	</div>
</template>

<script>
	export default{
		name:'detailmovie',
		data(){
			return {
				tableData_arr: [],
				tableData:{},
				movieId:'',
				// currentPage:2,
				// pageSize:1
			}
		},
		// props: ['this.$route.params.movieId'],
		// computed:{
		// 	nowtableData(){
		// 		// return this.tableData.slice( (this.currentPage - 1)*this.pageSize , this.currentPage*this.pageSize) || []
		// 	}
		// },
		mounted(){
			this.movieId = this.$route.params.id;
			console.log(this.movieId);
			this.axios.get('/ajax/detailmovie?movieId='+ this.movieId).then((res) => {
				var msg = res.statusText;
				console.log(msg)
				if (msg === 'OK') {
					// console.log(this.$route.params.movieId); 
					console.log(res.data);
					this.tableData = res.data.detailMovie;
					// console.log(this.tableData.nm);
				}
				var tableData_arr = [];
					tableData_arr.push(this.tableData);
					this.tableData_arr = tableData_arr;
				  // console.log(tableData_arr);
			});
			
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		margin-top:20px;
	}
	.detail_title{
		margin-bottom:10px;
	}
</style>
