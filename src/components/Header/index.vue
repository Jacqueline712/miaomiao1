<template>
	<header id="header">
		<!-- <slot></slot> <h1>{{ title }}</h1> -->
		<div class = "header_city">
			<i class = "iconfont iconweizhi"></i>
			<router-link tag="span" to="/city">{{ $store.state.city.nm }}</router-link>
		</div>
		<div class = "header_movie_cinema">
			<div>
				<button>{{  title }}</button>
			</div>
			<!-- <div>
				<button>影院</button>
			</div> -->
		</div>
		<div class = "header_search">
			<router-link tag="i" to="/search" class = "iconfont iconsousuo"></router-link>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		props:{
			title:{
				type:String,
				// 初始值
				default:'电影Movie'
			}
		}
	}
</script>

<style lang="scss" scoped>
	#header {
		width: 100%;
		height: 50px;
		/* color: #fff; */
		/* background: #e54847; */
		// border-bottom: 1px solid #e54847;
		position: relative;
		display: flex;
		// justify-content: space-around;
		align-items:center;
		.header_city{
			width:20%;
			display:flex;
			justify-content:center;
			span{
				font-size:16px;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
			}
			i{
				font-size:18px;
			}
		}
		.header_movie_cinema{
			width:65%;
			display:flex;
			flex-direction:row;
			justify-content:center;
			div:nth-child(1) button{
				background-image: linear-gradient(180deg, #F9B93A, #FFAA80);
				width:100px;
				height:30px;
				border:none;
				border-radius:10px;
				color:#fff;
				outline:none;
			};
			// div:nth-child(2) button{
			// 	background:#fff;
			// 	width:60px;
			// 	height:30px;
			// 	border:none;
			// 	border-radius:0 20px 20px 0;
			// 	color:#faa700;
			// 	border:1px solid #f9a600;
			// }
			
		}
		.header_search{
			width:15%;
			display:flex;
			justify-content:center;
			i{
				font-size:18px;
			}
		}
	}

	#header h1 {
		font-size: 18px;
		text-align: center;
		/* 类似于垂直居中 */
		line-height: 50px;
		/* 字体粗重 */
		font-weight: normal;
	}

	#header i {
		/* left: 5px;
		top: 50%;
		margin-top: -13px;
		font-size: 26px; */
	}
</style>
