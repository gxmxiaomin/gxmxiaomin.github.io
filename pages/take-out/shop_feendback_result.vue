<template>
	<view class="page_view">
		<view class="top_bar">
			<view>
				<u-icon name="arrow-left" color="#515151" size="24"></u-icon>
			</view>
			<view class="page_title">
				<text>反馈成功</text>
			</view>
			<view></view>
		</view>
		<view class="page_content">
			<image :src="require('@/static/images/take-out/feedBack-success.png')" mode=""></image>
			<text class="title">反馈成功</text>
			<text class="tip">感谢您对我们的关注与支持，我们会认真处理您的反馈，尽快修复和完善相关功能。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.page_view {
	width: 100%;
	height: 100vh;
	position: relative;
	font-family: PingFang-SC;
	font-weight: Medium;
}
.top_bar {
	width: 100%;
	height: calc(var(--status-bar-height) + 44px);
	padding: 0 20rpx;
	padding-top: var(--status-bar-height);
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 36rpx;
	color: #333333;
}
.page_content {
	position: absolute;
	top: calc(var(--status-bar-height) + 44px + 224rpx);
	left: 50%;
	transform: translateX(-50%);
	width: 512rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	image {
		width: 100%;
		height: 400rpx;
	}
	.title {
		font-size: 36rpx;
		color: #333333;
		margin-top: 30rpx;
	}
	.tip {
		font-size: 24rpx;
		color: #999;
		font-weight: Regular;
		letter-spacing: 2rpx;
		margin-top: 20rpx;
	}
	
}
</style>
