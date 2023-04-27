<template>
	<view>
		<view class="view-list">
			<view class="view-item">
				<view class="view-left">
					<image src="../../static/logo.png" mode=""></image>
					<view class="">
						<text class="text-title">雁翎宇旗舰店</text>
						<text class="u-line-1">小姐姐，你好呀，猜您是不是想咨询一...</text>
					</view>
				</view>
				<view class="view-right">
					<text>3</text>
				</view>
			</view>
			<view class="view-item" v-for="(item,index) in 2">
				<view class="view-left">
					<image src="../../static/logo.png" mode=""></image>
					<view class="">
						<text class="text-title">艾梦</text>
						<text class="u-line-1">欢迎光临艾梦，很高兴为您服务</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.top {
		padding: 54rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-around;

		view {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 80rpx;
				height: 80rpx;
			}

			text {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				line-height: 21rpx;
			}
		}

	}

	.view-list {
		margin-top: 30rpx;
		background-color: #FFFFFF;

		.view-item {
			margin: 0 30rpx;
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #EFEFEF;

			.view-left {
				display: flex;
				align-content: center;
				view {
					margin-left: 22rpx;
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					flex-shrink: 1;

					text {
						max-width: 500rpx;
						margin-top: 12rpx;
						font-size: 28rpx;
						color: #999999;
						line-height: 30rpx;
					}

					.text-title {
						margin-bottom: 22rpx;
						font-size: 32rpx;
						color: #333333;
						line-height: 21rpx;
					}
				}
			}

			image {
				width: 100rpx;
				height: 100rpx;
			}

		}

		.view-right {
			text {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 40rpx;
				height: 40rpx;
				background: #EA3527;
				border-radius: 50%;

				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 21rpx;
			}
		}
	}
</style>
