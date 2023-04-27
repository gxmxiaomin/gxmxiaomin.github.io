<template>
	<view class="view-receive">
		<view class="view-content">
			<image src="../../static/images/dingdan_img_jiaoyichenggong.png" mode=""></image>
			<text>领取成功，礼物将尽快发给您，请耐心等待</text>
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
	.view-receive {
		padding: 30rpx;

		.view-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 50rpx;

			image {
				width: 433rpx;
				height: 333rpx;
			}

			text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
			}
		}
	}
</style>
