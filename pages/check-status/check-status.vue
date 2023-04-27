<template>
	<view class="view-container">
		<image class="image" src="@/static/images/checking.png" mode="" v-if="status==='checking'"></image>
		<image class="image" src="@/static/images/checked.png" mode="" v-if="status==='checked'"></image>
		<image class="image" src="@/static/images/check-failed.png" mode="" v-if="status==='failed'"></image>
		<view class="view-title" v-if="status==='checking'">
			信息审核中，请耐心等待...
		</view>
		<view class="view-title" v-if="status==='checked'">
			审核成功
		</view>
		<view class="view-title" v-if="status==='failed'">
			信息审核失败，请重新上传
		</view>
		<view class="view-msg" v-if="status==='failed'">
			失败原因：营业资质图片边界不清晰，文字模糊，<br>
			请上传清晰的图片
		</view>
		<button class="u-reset-button" v-if="status==='checking'" @click="uni.switchTab({
			url:'../index/index'
		})">进入APP</button>
		<button v-if="status==='failed'" class="u-reset-button" @click="uni.navigateTo({
			url:'../complete-information/complete-information'
		})">重新上传</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: "checking",
			};
		},
		onLoad(option) {
			this.status = option.status
		},
	}
</script>

<style lang="scss">
	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 30rpx;
		font-family: PingFang SC;

		.image {
			width: 533rpx;
			height: 433rpx;
			margin: 197rpx 0 73rpx;
		}

		.view-title {
			font-size: 36rpx;
			font-weight: 400;
			color: #333333;
			margin-bottom: 49rpx;
		}

		.view-msg {
			font-size: 28rpx;
			color: #F98A1E;
			text-align: center;
		}

		.u-reset-button {
			position: absolute;
			bottom: 26rpx;
			width: 633rpx;
			height: 90rpx;
			background: #4B9AFF;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 90rpx;
			text-align: center;
		}
	}
</style>
