<template>
	<view>
		<view class="commodity">
			<view @click="uni.navigateTo({url:'./store'})" class="commodity-single">
				<image src="../../../../static/images/hot_cover.png" mode=""></image>
				<view class="commodity-text">
					<view class="text-1"> <text>果蔬(文化路)</text> <text>
							<image src="../../../../static/images/Informationservice.png" mode=""></image> 5.0
						</text> </view>
					<view class="text-2"> <text>起送￥50</text> <text>免费配送</text> <text>30分钟 1.0km</text> </view>
					<view class="text-3"> <text>月销1999</text> <text>本月果蔬店排名第一</text> </view>
					<view class="text-4"> <text>放心购</text> <text>随心退</text> </view>
				</view>
			</view>

			<view class="commoditys">
				<view @click="uni.navigateTo({
				url:'./commodityDetails'
			})" class="commoditys-single" v-for="item in list">
					<image src="../../../../static/images/hot_cover.png" mode=""></image>
					<view class="title">{{item.name}}</view>
					<view class="price"> <text>￥{{item.price}}</text> <text>￥{{item.newprice}}</text> </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		data() {
			return {
			// 	images: 'https://img2.baidu.com/it/u=1572613686,938558453&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=400'
			};
		},

		// created() {
		// 	setTimeout(() => {
		// 		console.log('接收到的参数', this.list)
		// 	}, 500)
		// },

		methods: {},
	}
</script>

<style lang="scss">
	.commodity {
		width: 95%;
		// height: 400rpx;
		margin: auto;
		border-radius: 10rpx;
		background-color: #FFF;
		margin-top: 20rpx;

		.commodity-single {
			width: 95%;
			height: 200rpx;
			// border: 1rpx solid black;
			margin-top: 20rpx;
			margin: auto;

			image {
				height: 160rpx;
				width: 160rpx;
			}

			.commodity-text {
				display: inline-block;
				margin-left: 20rpx;
				margin-top: 20rpx;

				.text-1 {
					text {
						&:nth-child(1) {
							display: inline-block;
							position: relative;
							top: 10rpx;
							font-size: 36rpx;
							font-weight: 500;
						}

						&:nth-child(2) {
							font-size: 36rpx;
							display: inline-block;
							position: relative;
							left: 210rpx;
							color: #fc6129;

							image {
								width: 30rpx;
								height: 30rpx;
							}
						}
					}
				}

				.text-2 {
					text {
						&:nth-child(1) {
							font-size: 26rpx;
							color: #aaa;
							display: inline-block;
							position: relative;
							// top: -10rpx;
						}

						&:nth-child(2) {
							font-size: 26rpx;
							display: inline-block;
							position: relative;
							left: 40rpx;
							color: #aaa;
							// top: -10rpx;
						}

						&:nth-child(3) {
							font-size: 26rpx;
							display: inline-block;
							position: relative;
							left: 120rpx;
							// top: -10rpx;
							color: #aaa;
						}
					}
				}

				.text-3 {
					text {
						&:nth-child(1) {
							font-size: 26rpx;
							color: #aaa;
							display: inline-block;
							position: relative;
							top: -10rpx;
						}

						&:nth-child(2) {
							font-size: 26rpx;
							display: inline-block;
							position: relative;
							left: 40rpx;
							color: #378efd;
							top: -10rpx;
						}
					}
				}

				.text-4 {
					text {
						display: inline-block;
						position: relative;
						font-size: 26rpx;
						padding: 1rpx 20rpx;
						color: #fff;
						background-color: #9bc6fe;
						border-radius: 30rpx;
						top: -10rpx;
						margin-right: 20rpx;
					}
				}
			}
		}

		.commoditys {
			padding-bottom: 20rpx;
			// border: 1rpx solid blueviolet;
			overflow-x: auto;
			display: -webkit-box;
			-webkit-overflow-scrolling: touch;
			// margin: 0.5rem 0.5rem;
			margin-left: 20rpx;
			display: flex;
			// flex-wrap: nowrap;

			.commoditys-single {
				display: inline-block;
				margin: 20rpx 20rpx 0 0;
				// border: 1rpx solid black;
				width: 160rpx;
				height: 300rpx;

				image {
					width: 160rpx;
					height: 160rpx;
				}

				.title {
					font-size: 32rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.price {
					text {
						&:nth-child(1) {
							color: #fc6129;
						}

						&:nth-child(2) {
							color: #aaa;
							font-size: 24rpx;
							display: inline-block;
							float: right;
							margin-top: 12rpx;
							text-decoration: line-through;
						}
					}
				}
			}
		}
	}
</style>
