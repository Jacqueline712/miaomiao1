<template>
	<div>
		<el-table
		    :data="tableData"
		    border
		    style="width: 100%">
			<el-table-column
			  prop="userHead"
			  label="用户头像">
			  <template slot-scope = "scope">
				<img class = "userHead" :src = "scope.row.userHead">
			  </template>
			</el-table-column>
		    <el-table-column
		      prop="date"
		      label="注册日期">
		    </el-table-column>
		    <el-table-column
		      prop="username"
		      label="用户姓名">
		    </el-table-column>
		    <el-table-column
		      prop="email"
		      label="用户邮箱">
		    </el-table-column>
			<el-table-column
			  label="操作">
			  <template slot-scope = "scope">
				  <el-button size = "small" @click = "handleToFreeze(scope.$index , scope.row)">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button>
				  <el-button size = "small" type = "danger" @click = "handleToDelete(scope.$index , scope.row)">删除</el-button>
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
		name:'users',
		data() {
		  return {
			tableData: [],
			currentPage:2,
			pageSize:4
		  }
		},
		mounted(){
			this.axios.get('/api3/admin/usersList').then((res)=>{
				var status = res.data.status;
				if(status === 0){
					// console.log(res);
					this.tableData = res.data.data.usersList;
				}
			})
		},
		computed:{
			nowtableData(){
				return this.tableData.slice( (this.currentPage - 1)*this.pageSize , this.currentPage*this.pageSize) || []
			}
		},
		methods:{
			handleToFreeze(index,row){
				// console.log(index , row);
				this.axios.post('/api3/admin/updateFreeze',{
					email:row.email,
					isFreeze:!row.isFreeze					
				}).then((res)=>{
					var status = res.data.status;
					if(status === 0){
						this.$alert('冻结操作已成功','信息',{
							confirmButtonText:'确定',
							callback:action=>{
								this.tableData[index].isFreeze = !row.isFreeze	
							}
						});
					}else{
							this.$alert('冻结操作失败','信息',{
							confirmButtonText:'确定'
						});
					}
				})
			},
			handleToDelete(index,row){
				this.axios.post('/api3/admin/deleteUser',{
					email:row.email
				}).then((res)=>{
					var status = res.data.status;
					if(status === 0){
						this.$alert('删除操作已成功','信息',{
							confirmButtonText:'确定',
							callback:action=>{
								this.tableData.splice(index,1);
							}
						});
					}else{
						this.$alert('删除操作失败','信息',{
							confirmButtonText:'确定'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		margin-top:20px;
	}
	.userHead{
		width:50px;
		height:50%;
		border-radius:50%;
		overflow:hidden;
	}
</style>
