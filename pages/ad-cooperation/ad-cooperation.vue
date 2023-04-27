<template>
	<view class="view-ad-cooperation" :style="'background:url('+bg+')'">
		<view class="view-ad-text">
			<text>广告</text>
			<text>合作</text>
		</view>
		<u--image class="view-desc" src="../../static/images/ad_btn.png" width="290rpx" height="60rpx"></u--image>
		<view class="view-content">
			<view class="view-item">
				<view class="view-title">
					<text>合作内容</text>
					<view></view>
				</view>
				<view class="view-details">
					<u--image class="view-imgs" src="../../static/images/ad_icon.png" width="20rpx" height="20rpx"></u--image>
					<view class="view-html">
						深度对接媒体Marketing API，与媒体后台全方位打通，提供跨账户批量操作、素材管理、数据分析等功能，显著提升优化师人效的效果广告智能投放平台。
					</view>
				</view>
				<view class="view-details">
					<u--image class="view-imgs" src="../../static/images/ad_icon.png" width="20rpx" height="20rpx"></u--image>
					<view class="view-html">
						需要开户投放头部媒体信息流广告，如:快手、巨量引擎、广点通等平台，同时因为投放应用下载/表单转化/电商而频次较高、体量较大的广告主及代理商。
					</view>
				</view>
			</view>
			<view class="connection">
				<u--image src="../../static/images/ad_bg2.png" width="520rpx" height="100rpx"></u--image>
			</view>
			<view class="view-item margin-top">
				<view class="view-title">
					<text>宣传图</text>
					<view></view>
				</view>
				<view class="view-details">
					<u--image src="../../static/images/publicity_figure.png" width="520rpx" height="200rpx"></u--image>
				</view>
			</view>
			<view class="connection">
				<u--image src="../../static/images/ad_bg2.png" width="520rpx" height="100rpx"></u--image>
			</view>
			<view class="view-item margin-top bg-white">
				<view class="view-title">
					<text class="color-blue">联系我们</text>
					<view></view>
				</view>
				<view class="view-details">
					<view class="">
						<text class="text-title">热线电话：</text>
						<text class="text-phone">0371-88888888</text>
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
				bg: require('@/static/images/ad_cooperation_bg.jpg'),
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.connection {
		display: flex;
		justify-content: center;
		margin: -30rpx auto 0;
	}

	.bg-white {
		background-color: #fff !important;
	}

	.color-blue {
		color: #4544C1;
		text-shadow: none;
	}

	.margin-top {
		margin-top: -36rpx;
	}

	.view-ad-cooperation {
		width: 750rpx;
		background-size: cover !important;
		padding-bottom: 80rpx;

		.view-ad-text {
			display: flex;
			flex-direction: column;
			color: #fff;
			font-size: 130rpx;
			font-weight: bold;
			padding: 110rpx 0 0 110rpx;

			text {
				text-shadow: #3635C0 6rpx 8rpx 0;
			}
		}

		.view-desc {
			margin: 20rpx 0 0 110rpx;
		}

		.view-content {
			width: 606rpx;
			margin: 76rpx auto 0;

			.view-item {
				border-radius: 20rpx;
				padding: 40rpx;
				background: #5268EF;
			}

			.view-title {
				color: #FFFFFF;
				line-height: 44rpx;
				text-shadow: #3635C0 6rpx 2rpx 0;
				margin-bottom: 30rpx;

				view {
					&:last-child {
						width: 150rpx;
						height: 14rpx;
						background: #FDC54B;
						border-radius: 7rpx;
						margin-top: -10rpx;
					}
				}
			}

			.view-details+.view-details {
				margin-top: 30rpx;
			}

			.view-details {
				display: flex;
				color: #fff;
				line-height: 30rpx;
				font-size: 20rpx;
				flex-wrap: wrap;
				.text-title {
					font-size: 22rpx;
					color: #4544C1;
				}

				.text-phone {
					background: #4544C1;
					padding: 4rpx 8rpx;
				}

				.view-imgs{
					margin-top: 5rpx;
					margin-right: 10rpx;
				}
				.view-html{
					width: 500rpx;
				}

				&:last-child {
					color: #FFFFFF;
				}
			}
		}
	}
</style>
