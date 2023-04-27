<template>
	<view class="page_view">
		<view class="top_bar">
			<view>
				<u-icon name="arrow-left" color="#515151" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view>
				<text>反馈详情</text>
			</view>
			<view></view>
		</view>
		
		<view class="page_content">
			<view class="page_card">
				<view class="card_title">
					<text>功能异常</text>
				</view>
				<view class="card_content">
					<text>1.我在使用的过程中发现支付的时候有卡顿、页面
						存在闪屏等问题。
						2.我在使用的过程中发现支付的时候有卡顿、页面
						存在闪屏等问题。
						3.我在使用的过程中发现支付的时候有卡顿、页面
						存在闪屏等问题。
						4.我在使用的过程中发现支付的时候有卡顿、页面
						存在闪屏等问题。
						5.我在使用的过程中发现支付的时候有卡顿、页面
						存在闪屏等问题。
						6.我在使用的过程中发现支付的时候有卡顿、页面
						存在闪屏等问题。
					</text>
				</view>
				<view class="img_list">
					<image :src="img" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
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
	box-sizing: border-box;
	padding: 0 20rpx;
	padding-top: var(--status-bar-height);
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 36rpx;
	color: #333333;
	font-family: PingFang-SC;
	font-weight: Regular;
}
.page_content {
	width: 100%;
	min-height: calc(100vh - var(--status-bar-height) - 44px);
	background-color: #F1F1F1;
	box-sizing: border-box;
	padding: 30rpx;
}

.page_card {
	width: 100%;
	padding: 25rpx;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 20rpx;
	.card_title {
		font-size: 32rpx;
		color: #333333;
	}
	.card_content {
		margin-top: 30rpx;
		width: 100%;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.img_list {
		margin-top: 20rpx;
		width: 100%;
		image{
			width: 100%;
		}
	}
}
</style>
