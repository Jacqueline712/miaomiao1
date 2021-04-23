<template>
	<div>
		<!-- <Loading v-if="isLoading"></Loading> -->
		<div >
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
			    <el-table-column
			      prop="nm"
			      label="电影名称">
				  <template slot-scope = "scope">
				  	<span class = "nowplaying_nm" @click = "handleToDetailMoive(scope.$index,scope.row)">{{scope.row.nm}}</span>
				  </template>
			    </el-table-column>
			    <el-table-column
			      prop="sc"
			      label="观众评分">
				  	{{0}}
			    </el-table-column>
			    <el-table-column
			      prop="star"
			      label="主要演员">
			    </el-table-column>
				<el-table-column
				  prop="comingTitle"
				  label="上映时间">
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
		  <el-pagination class = "page"
		    background
			layout = "prev,pager,next"
			:page-size = "4"
			 :current-page.sync="currentPage"
		    :total="tableData.length">
		  </el-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		name:'nowplaying',
		data(){
			return {
				tableData: [],
				currentPage:2,
				pageSize:4,
				isLoading:true,
				preCityId:-1
			}
		},
		computed:{
			nowtableData(){
				return this.tableData.slice( (this.currentPage - 1)*this.pageSize , this.currentPage*this.pageSize) || []
			},
			
		},
		mounted(){
			
			var cityId = this.$store.state.city.id;
			if (this.preCityId === cityId) {
				return;
			}
			this.cityId = this.$route.params.id;
			// console.log(cityId);
			this.axios.get('/ajax/movieOnInfoList?cityId=' + cityId).then(res=>{
				var msg = res.statusText;
				// console.log(msg)
				if(msg = 'OK'){
					// console.log(res.data.data.movieList);
					this.tableData = res.data.movieList;
					console.log(this.tableData);
					this.isLoading = false; 
				}
				
			});
			
			// this.axios.get('/ajax/mostExpected?ci=44&limit=10&offset=0&token=').then(res=>{
			// 	var msg = res.data.msg;
			// 	if(msg = 'ok'){
			// 		this.tableData = res.data.coming;
			// 		// console.log(this.movieList);
			// 		// this.isLoading = false; 
			// 	}
				
			// });
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
	.nowplaying_nm{
		cursor:pointer;
		color:#00aaff;
	}
	.loader{
		margin:auto 0;
		top:0%;
		bottom: 50%;
	}
</style>
