<template>
	<div class="cinema_body">
		<Loading v-if="isLoading"></Loading>
		<Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
			<ul>
				<li class="pullDown">{{pullDownMsg}}</li>
				<li v-for="item in cinemaList" :key="item.id">
					<div>
						<span>{{ item.nm }}</span>
						<span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
					</div> 
					<div class="address">
						<span>{{ item.addr }}</span>
						<span>{{ item.distance }}</span>
					</div>
					<div class="card">
						<div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class=" key | classCard ">{{ key | formatCard }}</div>
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'CiList',
		data() {
			return {
				cinemaList: [],
				pullDownMsg: '',
				isLoading: true,
				prevCityId: -1
			}
		},
		activated() {

			var cityId = this.$store.state.city.id;
			if (this.preCityId === cityId) {
				return;
			}
			this.isLoading = true;
			this.axios.get('/ajax/cinemaList?cityId=' + cityId).then((res) => {
				var that = this;
				var msg = res.data.msg;
				console.log(res.data);
				this.cinemaList = res.data.cinemas;
				this.isLoading = false;
				this.preCityId = cityId;
				// if (msg === 'ok') {
				// 	this.cinemaList = res.data.data.cinemas;
				// 	this.isLoading = false;
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
					// {
					// 	key: 'buyout',
					// 	value: ''
					// },
					// {
					// 	key: 'cityCardTag',
					// 	value: ''
					// },
					// {
					// 	key: 'deal',
					// 	value: ''
					// },
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
		methods: {
			handleToScroll(pos) {
				if (pos.y > 30) {
					this.pullDownMsg = '正在更新中...';
				}
				// console.log('正在更新中');
			},
			handleToTouchEnd(pos) {
				var cityId = this.$store.state.city.id;
				if (pos.y > 30) {
					this.axios.get('/ajax/cinemaList?cityId=' + cityId).then((res) => {
						var msg = res.data.msg;
						if (msg = 'ok') {
							this.pullDownMsg = '更新成功';
							setTimeout(() => {
								this.cinemaList = res.data.cinemas;
								this.pullDownMsg = '';
							}, 1000);
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loader {
		position: fixed;
	}

	#content .cinema_body {
		flex: 1;
		overflow: auto;
		height:500px;
	}

	.cinema_body ul {
		padding: 20px;
	}

	.cinema_body li {
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 20px;
	}
	
	.cinema_body li div:nth-child(1){
		display:flex;
		justify-content:space-between;
	}
	
	.cinema_body li div:nth-child(1) span{
		font-size: 15px;
	}

	.cinema_body div {
		margin-bottom: 10px;
	}

	.cinema_body ul li div:nth-child(1) .q {
		font-size: 10px;
		color: #f03d37;
	}

	.cinema_body .price {
		font-size: 18px;
	}

	.cinema_body .address {
		font-size: 13px;
		color: #666;
		display:flex;
		justify-content:space-between;
	}
	
	.cinema_body .address span:nth-of-type(1) {
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}

	.cinema_body .address span:nth-of-type(2) {
		float: right;
	}

	.cinema_body .card {
		display: flex;
	}

	.cinema_body .card div {
		padding: 0 3px;
		height: 15px;
		line-height: 15px;
		border-radius: 2px;
		color: #f90;
		border: 1px solid #f90;
		font-size: 13px;
		margin-right: 5px;
	}

	.cinema_body .card div.or {
		color: #f90;
		border: 1px solid #f90;
	}

	.cinema_body .card div.bl {
		color: #589daf;
		border: 1px solid #589daf;
	}

	.cinema_body .pullDown {
		margin: 0;
		padding: 0;
		margin-left: 40%;
		border: none;
		color: #bdc0c5;
		font-size: 18px;
	}
</style>
