<template>
	<view>
		<view style="margin-top: 20rpx;background-color: #ffffff;">
			<view class="view-item">
				<text>消息免打扰</text>
				<view class="flex-grow">
				</view>
				<view>
					<u-switch v-model="msgNotTip" @change="messageStatuChange"></u-switch>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgNotTip: false
			};
		},
		onLoad() {
			this.msgNotTip = uni.getStorageSync("msgNotTip") || false
		},
		methods: {
			// 消息免打扰的状态改变
			messageStatuChange() {
				console.log("改变的状态是", this.msgNotTip)
				if (this.msgNotTip) uni.setStorageSync("msgNotTip", true)
				else uni.setStorageSync("msgNotTip", false)
			},
		}
	}
</script>

<style lang="scss">
	page {

		background-color: #e8e8e8;

	}

	.view-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx;

		.text-label {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
		}

		.text-value {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			margin-right: 20rpx;
		}

		.image-arrow {
			width: 12rpx;
			height: 20rpx;
		}
	}
</style>
