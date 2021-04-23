<template>
	<div>
		<el-table
		    :data="nowtableData"
		    border
		    style="width: 100%">
			<el-table-column
			  prop="cityId"
			  label="城市ID">
			  {{this.$store.state.city.id}}
			</el-table-column>
			<el-table-column
			  prop="cityNm"
			  label="城市">
			  {{this.$store.state.city.nm}}
			</el-table-column>
			<el-table-column
			  prop="id"
			  label="电影ID">
			</el-table-column>
			<!-- 2 -->
		    <el-table-column
		      prop="nm"
		      label="电影名称">
			  <template slot-scope = "scope">
			  	<span class = "comingsoon_nm" @click = "handleToDetailMoive(scope.$index,scope.row)">{{scope.row.nm}}</span>
			  </template>
		    </el-table-column>
			<!-- 3 -->
		    <el-table-column
		      prop="sc"
		      label="观众评分">
		    </el-table-column>
			<!-- 4 -->
		    <el-table-column
		      prop="star"
		      label="主要演员">
		    </el-table-column>
			<!-- 5 -->
			<el-table-column
			  prop="rt"
			  label="上映时间">
			</el-table-column>
			<!-- 6 -->
			<el-table-column
			  prop="wish"
			  label="实时口碑">
			  <template slot-scope = "scope">
			  	{{scope.row.wish}}人想看
			  </template>
			</el-table-column>
		  </el-table>
		  <!-- 分页器 -->
		  <el-pagination class = "page"
		    background
			layout = "prev,pager,next"
			:page-size = "4"
			:current-page.sync="currentPage"
		    :total="tableData.length">
		  </el-pagination>
	</div>
</template>

<script>
	export default{
		name:'comingsoon',
		data(){
			return {
				tableData: [],
				currentPage:2,
				pageSize:4
			}
		},
		computed:{
			nowtableData(){
				return this.tableData.slice( (this.currentPage - 1)*this.pageSize , this.currentPage*this.pageSize) || []
			}
		},
		mounted(){
			
			// var cityId = this.$store.state.city.id;
			// this.axios.get('/api/movieComingList?cityId='+cityId).then(res=>{
			// 	var msg = res.data.msg;
			// 	if(msg = 'ok'){
			// 		// console.log(res.data.data.movieList);
			// 		this.tableData = res.data.data.comingList;
			// 		// console.log(this.tableData);
			// 	}
				
			// });
			
			this.axios.get('/ajax/comingList?ci=10&token=&limit=10').then(res=>{
				var msg = res.statusText;
				// console.log(res)
				if(msg = 'OK'){
					this.tableData = res.data.coming;
					// console.log(res.data);
				}
				
			});
		},
		methods:{
			handleToDetailMoive(index,row){
				this.detailmovie = true;
				this.movieId = row.id;
				// console.log(this.movieId);
				var id = row.id;
				this.$router.push({name: "detailmovie", params: {id}});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		margin-top:20px;
	}
	.comingsoon_nm{
		cursor:pointer;
		color:#00aaff;
	}
</style>
