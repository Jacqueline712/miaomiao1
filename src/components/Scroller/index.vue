<template>
	<div class = "wrapper" ref="wrapper">
		<!-- 配置成全局的组件 -->
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default{
		name:'scroller',
		props:{
			handleToScroll:{
				type:Function,
				default:function(){}
			},
			handleToTouchEnd:{
				type:Function,
				default:function(){}
			}
		},
		mounted(){
			var scroll = new BScroll(this.$refs.wrapper,{
				tap : true,
				probeType:1
			});
			
			this.scroll = scroll;
			
			// 回调函数
			scroll.on('scroll',(pos)=>{
				this.handleToScroll(pos);
			});
			scroll.on('touchEnd',(pos)=>{
				this.handleToTouchEnd(pos);
			});
		},
		methods:{
			handleToDetail(){
				console.log('handleToDetail');
			},
			toScrollTop(y){
				this.scroll.scrollTo(0,y);
			}
		}
		
	}
</script>

<style scoped>
	.wrapper{
		height:100%;
	}
</style>
