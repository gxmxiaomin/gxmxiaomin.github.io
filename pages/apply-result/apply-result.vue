<template>
	<view class="view-apply-result">
		<view class="view-result">
			<u-icon name="checkmark-circle-fill" size="100rpx" color="#4A9AFF"></u-icon>
			<text class="text-result">报名信息提交成功</text>
			<text class="text-desc">请在报名结束后 查看排课表</text>
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
	.view-apply-result {
		display: flex;
		flex-direction: column;

		.view-result {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 130rpx;

			.text-result {
				font-size: 24rpx;
				color: #333;
				margin: 28rpx 0;
			}

			.text-desc {
				font-size: 32rpx;
				color: #FC6129;
			}

		}
	}
</style>
