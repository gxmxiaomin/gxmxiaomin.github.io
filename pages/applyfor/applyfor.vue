<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-one">
				请上传简历文档
			</view>
			<view class="view-two">
				仅支持.docx
			</view>
			<view class="view-three">
				<view class="view-exhibition">
					<image src="/static/images/applyfor.png" mode=""></image>
					<view class="view-name">
						点击上传合同文件
					</view>
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-line">
				<view class="view-left">
					姓名
				</view>
				<view class="view-right">
					<input type="text" value="" placeholder="请输入" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-left">
					电话
				</view>
				<view class="view-right">
					<input type="text" value="" placeholder="请输入" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-left">
					邮箱号
				</view>
				<view class="view-right">
					<input type="text" value="" placeholder="请输入" />
				</view>
			</view>

		</view>
		<view class="view-content-c">
			<view class="view-button">
				提交资料
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

		.view-content-a {
			width: 750rpx;
			height: 619rpx;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 2rpx;

			.view-one {
				height: 31rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-top: 30rpx;
				margin-bottom: 18.67rpx
			}

			.view-two {
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF0000;
				margin-bottom: 47.33rpx;
			}

			.view-three {
				width: 400rpx;
				height: 400rpx;
				background: #FFFFFF;
				border: 1rpx solid #999999;
				border-radius: 7rpx;

				.view-exhibition {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-top: 120rpx;

					image {
						width: 123rpx;
						height: 76rpx;
						margin-bottom: 30rpx;

					}

					.view-name {
						height: 31rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #4A9AFF;
					}
				}
			}
		}

		.view-content-b {
			width: 750rpx;
			height: 661rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 0 30rpx;
			padding-top: 60rpx;

			.view-line {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 19.33rpx;

				.view-left {
					height: 27rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.view-right {
					width: 575rpx;
					height: 80rpx;
					background: #F8F9FA;
					border-radius: 10rpx;

					input {
						margin-left: 29.87rpx;
						margin-top: 18rpx;
					}
				}
			}
		}

		.view-content-c {
			width: 750rpx;
			height: 98rpx;
			background: #FFFFFF;

			.view-button {
				width: 690rpx;
				height: 80rpx;
				background: #CCCCCC;
				border-radius: 40rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 36rpx;
				margin: 0 auto;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
