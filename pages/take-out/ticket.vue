<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image class="img" style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
				<view @click="opition = 1" class="text" :style="{color:(opition == 1?'':'#fddacf')}">全部</view>
			</view>
			<view class="bar-center bare-cell">
				<text>优惠券</text>
				<view @click="opition = 2" class="text" :style="{color:(opition == 2?'':'#fddacf')}">未使用</view>
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth" @click="">
				</view>
				<view @click="opition = 3" class="text-center" :style="{color:(opition == 3?'':'#fddacf')}">已使用</view>
			</view>
		</view>
		<view class="back"></view>
		
		<view class="box" v-show="opition == 1">
			<view style="height: 10rpx;"></view>
			<view class="ticket-1">
				<view class="text-1">店铺专享</view>
				<view class="text-name">10 <text>元</text> </view>
				<view class="text-2">
					<view class="">新人优惠券</view>
					<view class="text-2-2"> <text>本店铺新人购买商品尊享该券</text> <text>立即使用</text> </view>
					<view class="">有效期至：2022-11-09</view>
				</view>
				<view style="height: 1rpx; background-color: #f1ebe9;margin-top: 40rpx;"></view>
				<view class="text-3">
					<image src="../../static/logo.png" mode=""></image>
					<text>果蔬(文华路店)</text>
				</view>
			</view>
			
			<view class="ticket-2">
				<view class="text-1">店铺专享</view>
				<view class="text-name">10 <text>元</text> </view>
				<view class="text-2">
					<view class="">新人优惠券</view>
					<view class="text-2-2"> <text>本店铺新人购买商品尊享该券</text> <text>已使用</text> </view>
					<view class="">有效期至：2022-11-09</view>
				</view>
				<view style="height: 1rpx; background-color: #f1ebe9;margin-top: 40rpx;"></view>
				<view class="text-3">
					<image src="../../static/logo.png" mode=""></image>
					<text>果蔬(文华路店)</text>
				</view>
			</view>
		</view>
		
		<!-- optiion == 2 -->
		<view class="box" v-show="opition == 2">
			<view style="height: 10rpx;"></view>
			<view class="ticket-1">
				<view class="text-1">店铺专享</view>
				<view class="text-name">10 <text>元</text> </view>
				<view class="text-2">
					<view class="">新人优惠券</view>
					<view class="text-2-2"> <text>本店铺新人购买商品尊享该券</text> <text>立即使用</text> </view>
					<view class="">有效期至：2022-11-09</view>
				</view>
				<view style="height: 1rpx; background-color: #f1ebe9;margin-top: 40rpx;"></view>
				<view class="text-3">
					<image src="../../static/logo.png" mode=""></image>
					<text>果蔬(文华路店)</text>
				</view>
			</view>
		</view>
		
		<!-- opition ==3 -->
		<view class="box" v-show="opition == 3">
			<view style="height: 10rpx;"></view>
			<view class="ticket-2">
				<view class="text-1">店铺专享</view>
				<view class="text-name">10 <text>元</text> </view>
				<view class="text-2">
					<view class="">新人优惠券</view>
					<view class="text-2-2"> <text>本店铺新人购买商品尊享该券</text> <text>已使用</text> </view>
					<view class="">有效期至：2022-11-09</view>
				</view>
				<view style="height: 1rpx; background-color: #f1ebe9;margin-top: 40rpx;"></view>
				<view class="text-3">
					<image src="../../static/logo.png" mode=""></image>
					<text>果蔬(文华路店)</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				opition:1
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	.top-bar {
		height: 180rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#fc8860, #f9bea9);
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			// margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFF;
			left: 10rpx;
		}

		.bar-left {
			flex: 1;
			height: 100%;

			.text {
				position: relative;
				top: 60rpx;
				right: 10rpx;
			}
			
			.img {
				position: relative;
				left: 10rpx;
			}
		}

		.bar-center {
			flex: 5;
			height: 100%;
			
			text{
				font-size: 36rpx;
			}
			
			.text {
				position: absolute;
				top: 120rpx;
			}
		}

		.bar-right {
			flex: 1;
			height: 100%;

			.city-rigth {
				color: #FFF;
				font-size: 30rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
					vertical-align: middle;
					margin-top: -5rpx;
				}
			}
			
			.text-center {
				position: relative;
				top: 60rpx;
				right: 10rpx;
			}
		}
	}

	.back {
		height: 100rpx;
		background-image: linear-gradient(#fba485, #f8ccbd);
		margin-top: 100rpx;
	}
	
	.box {
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		z-index: 9;
		background-color: #FFF;
		position: relative;
		top: -20rpx;
		
		.ticket-1 {
			width: 95%;
			margin: auto;
			margin-top: 20rpx;
			background-color: #f2e6e2;
			height: 320rpx;
			border-radius: 20rpx;
			
			.text-1 {
				// display: inline-block;
				width: 140rpx;
				height: 40rpx;
				text-align: center;
				color: #FFF;
				font-size: 27rpx;
				// padding: 2rpx 10rpx;
				border-radius: 0 0 16rpx 16rpx;
				background-color: #f67848;
			}
			
			.text-name {
				display: inline-block;
				color: #f67848;
				font-size: 60rpx;
				font-weight: 500;
				margin-left: 20rpx;
				
				text {
					color: #f67848;
					font-size: 30rpx;
				}
			}
			
			.text-2 {
				position: relative;
				top: 20rpx;
				left: 50rpx;
				view {
					&:nth-child(1) {
						font-size: 38rpx;
						font-weight: 500;
						color: black;
					}
				}
				display: inline-block;
				font-size: 26rpx;
				color: #a2a1a1;
				
				.text-2-2 {
					text {
						&:nth-child(2) {
							display: inline-block;
							border-radius: 30rpx;
							color: #FFF;
							background-color: #f67848;
							font-size: 26rpx;
							padding: 5rpx 15rpx;
							// margin-left: 20rpx;
							margin-left: 60rpx;
						}
					}
				}
			}
			
			.text-3 {
				margin-top: 30rpx;
				margin-left: 20rpx;
				image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					vertical-align: middle;
				}
				text {
					display: inline-block;
					font-size: 28rpx;
					margin-left: 10rpx;
				}
			}
		}
		
		.ticket-2 {
			width: 95%;
			margin: auto;
			margin-top: 20rpx;
			background-color: #e8e8e8;
			height: 320rpx;
			border-radius: 20rpx;
			
			.text-1 {
				// display: inline-block;
				width: 140rpx;
				height: 40rpx;
				text-align: center;
				color: #FFF;
				font-size: 27rpx;
				// padding: 2rpx 10rpx;
				border-radius: 0 0 16rpx 16rpx;
				background-color: #999999;
			}
			
			.text-name {
				display: inline-block;
				color: #999999;
				font-size: 60rpx;
				font-weight: 500;
				margin-left: 20rpx;
				
				text {
					color: #999999;
					font-size: 30rpx;
				}
			}
			
			.text-2 {
				position: relative;
				top: 20rpx;
				left: 50rpx;
				view {
					&:nth-child(1) {
						font-size: 38rpx;
						font-weight: 500;
						color: black;
						color: #999999;
					}
				}
				display: inline-block;
				font-size: 26rpx;
				color: #999999;
				
				.text-2-2 {
					text {
						&:nth-child(2) {
							display: inline-block;
							border-radius: 30rpx;
							color: #FFF;
							background-color: #999999;
							font-size: 26rpx;
							padding: 5rpx 15rpx;
							// margin-left: 20rpx;
							margin-left: 60rpx;
						}
					}
				}
			}
			
			.text-3 {
				margin-top: 30rpx;
				margin-left: 20rpx;
				image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					vertical-align: middle;
				}
				text {
					display: inline-block;
					font-size: 28rpx;
					margin-left: 10rpx;
					color: #999999;
				}
			}
		}
	}
</style>
