<template>
	<view>
		<view v-for="i in list" :key="i.id" class="commodity-single" @click="uni.navigateTo({
			url:'./commodityDetails'
		})">
			<view class="tag"> <text>1折</text> </view>
			<image src="../../../../static/images/hot_cover.png" mode=""></image>
			<view class="commodity-text">
				<view class="text-1"> <text>{{i.name}}</text></view>
				<view class="text-2"> <text>{{i.serve}}</text> </view>
				<view class="text-3"> <text>{{i.sales}}</text> </view>
				<view class="text-4"> <text>￥{{i.newPrice}}</text> <text>{{i.price}}</text></view>
				<view class="text-5">
					<image v-if="i.quantity != 0" @click.stop="i.quantity != 0 ? i.quantity-- : ''" class="img-1"
						src="../../../../static/images/jian.svg" mode=""></image>
					<view>{{i.quantity}}</view>
					<image @click.stop="i.quantity++" class="img" src="../../../../static/images/icon_add.png" mode="">
					</image>
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
	.commodity-single {
		position: relative;
		top: -50rpx;
		width: 95%;
		height: 170rpx;
		margin: auto;

		image {
			height: 150rpx;
			width: 150rpx;
		}

		.tag {
			display: inline-block;
			width: 100rpx;
			background: #fb7a4c;
			border-radius: 20rpx 0 20rpx 0;
			position: relative;
			display: flex;
			top: 180rpx;
			z-index: 9;
			font-size: 22rpx;
			color: #FFF;

			text {
				display: inline-block;
				margin: auto;
			}
		}

		.commodity-text {
			display: inline-block;
			margin-left: 20rpx;
			margin-top: 10rpx;

			.text-1 {
				text {
					&:nth-child(1) {
						display: inline-block;
						width: 340rpx;
						// overflow: hidden;
						// Text-overflow:ellipsis;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						position: relative;
						top: 50rpx;
						left: -4rpx;
						font-size: 32rpx;
						font-weight: 500;
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
						top: 10rpx;
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
						// top: -10rpx;
					}
				}
			}

			.text-4 {
				// display: inline-block;
				// width: 180rpx;

				text {

					// display: inline-block;
					&:nth-child(1) {
						display: inline-block;
						// width: 110rpx;
						position: relative;
						font-size: 34rpx;
						color: #fc7d4f;
						top: -10rpx;
						// margin-right: 20rpx;
					}

					&:nth-child(2) {
						display: inline-block;
						// width: 90rpx;
						position: relative;
						font-size: 24rpx;
						color: #aaa;
						top: -10rpx;
						text-decoration: line-through;
						// margin-right: 20rpx;
					}
				}
			}

			.text-5 {
				display: inline-block;
				// right: 10rpx;
				z-index: 9;
				float: right;
				position: relative;
				top: -50rpx;
				display: flex;

				.img-1 {
					width: 46rpx;
					height: 46rpx;
					position: relative;
					bottom: 4rpx;
				}

				.img {
					width: 40rpx;
					height: 40rpx;
					// position: relative;
					// float: right;
					// z-index: 9;
				}

				view {
					display: inline-block;
					min-width: 40rpx;
					text-align: center;
					// font-size: 26rpx;
				}
			}
		}
	}
</style>
