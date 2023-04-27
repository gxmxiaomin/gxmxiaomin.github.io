<template>
	<view class="view-content">
		<view class="view-content-a" @click="uni.navigateTo({
			url:'./applicationrecord'
		})">
			<view class="view-record">
				<view class="view-left">
					<view class="view-top">
						助学专项基金公益项目
					</view>
					<view class="view-bottom">
						申请时间：2021-10-21 16:23
					</view>
				</view>
				<view class="view-right">
					审核中
				</view>
			</view>
			<view class="view-button">
				查看详情 >
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
	.view-content {
		background-color: #F7F7F7;
		box-sizing: border-box;
		padding: 30rpx;

		.view-content-a {
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 30rpx;

			.view-record {
				display: flex;
				justify-content: space-between;

				.view-left {
					.view-top {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-bottom: 19rpx;
					}

					.view-bottom {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-bottom: 29rpx;
					}
				}

				.view-right {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FF0000;
				}
			}

			.view-button {
				width: 153rpx;
				height: 40rpx;
				background: #4A9AFF;
				border-radius: 20rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				line-height: 40rpx;
			}
		}
	}
</style>
