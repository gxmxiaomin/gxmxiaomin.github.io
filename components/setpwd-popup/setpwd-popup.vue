<template>
	<u-popup :show="show" mode="center" round="30rpx" @close="show=false">
		<view class="view-content">
			<image src="../../static/images/setpwd-img.png" mode=""></image>
			<text class="text-tips">请先设置支付密码</text>
			<view class="view-btn" @click="uni.navigateTo({
					url: '../modify-pay-pwd/modify-pay-pwd'
				})">
				去设置 >
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "setpwd-popup",
		data() {
			return {
				show: false
			};
		}
	}
</script>

<style lang="scss" scoped>
	.view-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 570rpx;
		padding: 30rpx 30rpx 60rpx;

		.text-tips {
			font-size: 32rpx;
			font-family: PingFang SC;
			color: #333333;
			margin-bottom: 100rpx;
		}

		image {
			width: 379rpx;
			height: 287rpx;
		}

		.view-btn {
			text-align: center;
			line-height: 80rpx;
			width: 450rpx;
			height: 80rpx;
			background: #4A9AFF;
			border-radius: 999rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
