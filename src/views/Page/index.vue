<template>
	<div id = "main">
		<div id = "content">
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		
		<Tabbar />
	</div>
</template>

<script>
	import Tabbar from '@/components/Tabbar'
	export default{
		name:'Homepage',
		components:{
			Tabbar
		}
	}
</script>

<style lang="scss" scoped>
	// .swiper-wrapper{
	// 	img{
	// 		height:170px;
	// 	}
	// }
	#content{ 
		flex: 1;
		overflow: auto;
		margin-bottom: 52px;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.page_search{
		display:flex;
		height:55px;
		justify-content:center;
		align-items:center;
		.page_search_input{
			width:88%;
			display:flex;
			justify-content:center;
			div{
				width:95%;
				height:30px;
				background:#fafbfc;
				border-radius:50px;
				display:flex;
				justify-content: center;
				align-items:center;
			};
			i{
				width:10%;
			};
			input{
				background:#fafbfc;
				width:80%;
				height:30px;
				outline:none;
				border:none;
			};
		};
		.page_search_calendar{
			width:12%;
			text-align:center;
			i{
				font-size:24px;
			}
		};
	};
	.page_notice{
		height:100px;
		ul{
			height:100px;
			display:flex;
			justify-content:space-around;
			align-items:center;
			li{
				display:flex;
				flex-direction:column;
				align-items:center;
				div{
					text-align:center;
					display:flex;
					justify-content:center;
					align-items:center;
					i{
						color:#f9f9f9;
					}
				};
				.circle{
					width:40px;
					height:40px;
					background:#999;
					border-radius:50%;
					background-image: linear-gradient(0deg, #F9B93A, #FFAA80);
				};
				p{
					margin-top:8px;
					color:#7b7b7b;
					font-size:14px;
				}
			}
		}
	}
	.nowplaying{
		height:260px;
		margin:0 auto;
		.nowplaying_nav{
			height:12%;
			display:flex;
			justify-content:space-between;
			span{
				padding:0 15px;
			};
			span:nth-child(1){
				font-size:16px;
				font-weight:bold;
				font-family:'Microsoft YaHei'
			};
			span:nth-child(2){
				font-size:14px;
				i{
					padding-left:3px;
				}
			};
		};
		.actorswiper{
			height:80%;
			overflow:hidden;
			.swiper-slide{
				display:flex;
				flex-direction:column;
				padding:0 15px;
				img{
					// float:left;
					width:100px;
					border-radius:2px;
				};
				h3{
					margin-top:5px;
				};
				h4{
					margin-top:2px;
					color:#a4a4a4;
				}
			}
		}
	}
	.comingsoon{
		height:260px;
		margin:0 auto;
		.comingsoon_nav{
			height:12%;
			display:flex;
			justify-content:space-between;
			span{
				padding:0 15px;
			};
			span:nth-child(1){
				font-size:16px;
				font-weight:bold;
				font-family:'Microsoft YaHei'
			};
			span:nth-child(2){
				font-size:14px;
				i{
					padding-left:3px;
				}
			};
		};
		.actorswiper{
			height:80%;
			overflow:hidden;
			.swiper-slide{
				display:flex;
				flex-direction:column;
				padding:0 15px;
				img{
					// float:left;
					width:100px;
					border-radius:5px;
				};
				h3{
					margin-top:5px;
				};
				h4{
					margin-top:2px;
					color:#a4a4a4;
				}
			}
		}
	}
	
	#content .comingList_player {
		margin: 20px 10px;
	}
	
	.comingList_player .swiper-slide {
		width: 130px;
		margin-right: 15px;
		text-align: center;
		font-size: 14px;
	}
	
	.comingList_player .swiper-slide img {
		width: 100%;
		margin-bottom: 5px;
	}
	
	.comingList_player .swiper-slide p:nth-of-type(2) {
		color: #999;
	}
</style>
