<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<u-search placeholder="请输入要搜索蔬菜的关键字" v-model="searchValue" height="70" :show-action="false"></u-search>
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth">
					<text>搜索</text>
					<!-- <image src="../../static/images/qingchu.png" mode=""></image> -->
				</view>
			</view>
		</view>

		<view class="back"></view>

		<view class="box">
			<Shop v-for="i in 9" :list="list1"></Shop>
		</view>
	</view>
</template>

<script>
	import Shop from "./components/shop/shop.vue"
	export default {
		components: {
			Shop
		},
		data() {
			return {
				list1: [{
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}, {
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}, {
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}],
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.back {
		height: 100rpx;
		background-image: linear-gradient(#83b4ef, #f1f1f1);
		margin-top: 150rpx;
	}

	.top-bar {
		height: 160rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#579efc, #89baf9);
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFF;
		}

		.bar-left {
			flex: 1;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 1;
			height: 100%;

			.city-rigth {
				color: #4796fc;
				font-size: 30rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
					vertical-align: middle;
					margin-top: -5rpx;
				}
			}
		}
	}

	.box {
		position: absolute;
		width: 100%;
		top: 140rpx;

		// .commodity {
		// 	width: 95%;
		// 	// height: 400rpx;
		// 	margin: auto;
		// 	border-radius: 10rpx;
		// 	background-color: #FFF;

		// 	.commodity-single {
		// 		width: 95%;
		// 		height: 200rpx;
		// 		// border: 1rpx solid black;
		// 		margin: auto;
		// 		margin-top: 30rpx;

		// 		image {
		// 			height: 160rpx;
		// 			width: 160rpx;
		// 		}

		// 		.commodity-text {
		// 			display: inline-block;
		// 			margin-left: 20rpx;
		// 			margin-top: 20rpx;

		// 			.text-1 {
		// 				text {
		// 					&:nth-child(1) {
		// 						display: inline-block;
		// 						position: relative;
		// 						top: 10rpx;
		// 						font-size: 36rpx;
		// 						font-weight: 500;
		// 					}

		// 					&:nth-child(2) {
		// 						font-size: 36rpx;
		// 						display: inline-block;
		// 						position: relative;
		// 						left: 220rpx;
		// 						color: #fc6129;

		// 						image {
		// 							width: 30rpx;
		// 							height: 30rpx;
		// 						}
		// 					}
		// 				}
		// 			}

		// 			.text-2 {
		// 				text {
		// 					&:nth-child(1) {
		// 						font-size: 26rpx;
		// 						color: #aaa;
		// 						display: inline-block;
		// 						position: relative;
		// 						// top: -10rpx;
		// 					}

		// 					&:nth-child(2) {
		// 						font-size: 26rpx;
		// 						display: inline-block;
		// 						position: relative;
		// 						left: 40rpx;
		// 						color: #aaa;
		// 						// top: -10rpx;
		// 					}

		// 					&:nth-child(3) {
		// 						font-size: 26rpx;
		// 						display: inline-block;
		// 						position: relative;
		// 						left: 130rpx;
		// 						// top: -10rpx;
		// 						color: #aaa;
		// 					}
		// 				}
		// 			}

		// 			.text-3 {
		// 				text {
		// 					&:nth-child(1) {
		// 						font-size: 26rpx;
		// 						color: #aaa;
		// 						display: inline-block;
		// 						position: relative;
		// 						top: -10rpx;
		// 					}

		// 					&:nth-child(2) {
		// 						font-size: 26rpx;
		// 						display: inline-block;
		// 						position: relative;
		// 						left: 40rpx;
		// 						color: #378efd;
		// 						top: -10rpx;
		// 					}
		// 				}
		// 			}

		// 			.text-4 {
		// 				text {
		// 					display: inline-block;
		// 					position: relative;
		// 					font-size: 26rpx;
		// 					padding: 1rpx 20rpx;
		// 					color: #fff;
		// 					background-color: #9bc6fe;
		// 					border-radius: 30rpx;
		// 					top: -10rpx;
		// 					margin-right: 20rpx;
		// 				}
		// 			}
		// 		}
		// 	}

		// 	.commoditys {
		// 		padding-bottom: 20rpx;
		// 		// border: 1rpx solid blueviolet;
		// 		overflow-x: auto;
		// 		display: -webkit-box;
		// 		-webkit-overflow-scrolling: touch;
		// 		// margin: 0.5rem 0.5rem;
		// 		margin-left: 20rpx;
		// 		display: flex;
		// 		// flex-wrap: nowrap;

		// 		.commoditys-single {
		// 			display: inline-block;
		// 			margin: 20rpx 20rpx 0 0;
		// 			// border: 1rpx solid black;
		// 			width: 160rpx;
		// 			height: 300rpx;

		// 			image {
		// 				width: 160rpx;
		// 				height: 160rpx;
		// 			}

		// 			.title {
		// 				font-size: 32rpx;
		// 				display: -webkit-box;
		// 				-webkit-box-orient: vertical;
		// 				-webkit-line-clamp: 2;
		// 				overflow: hidden;
		// 			}

		// 			.price {
		// 				text {
		// 					&:nth-child(1) {
		// 						color: #fc6129;
		// 					}

		// 					&:nth-child(2) {
		// 						color: #aaa;
		// 						font-size: 24rpx;
		// 						display: inline-block;
		// 						float: right;
		// 						margin-top: 12rpx;
		// 						text-decoration: line-through;
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}
</style>
