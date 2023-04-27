<template>
	<view class="page_view">
		<view class="top_bar">
			<view>
				<u-icon name="arrow-left" color="#515151" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view>
				<text>反馈记录</text>
			</view>
			<view></view>
		</view>
		
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="scroll-content">
				<view class="record_cell" v-for="item in 10" :key="item">
					<view class="card_title_box">
						<text class="card_title">功能异常</text>
						<view class="card_mode">
							<text style="margin-right: 10rpx;" @click="uni.navigateTo({
								url:'./shop-feedback-detial'
							})">查看详情</text>
							<u-icon name="arrow-right" color="#999" size="18"></u-icon>
						</view>
					</view>
					<view class="card_content">
						<text>哈吉斯的回复看见撒旦回复卡号是的疯狂金沙酒店和付款就啥都飞机啥的科技孵化安徽省对方就会看见撒旦回复撒撒娇抠脚大汉饭卡上的发士大夫看见哈萨克就爱上对方就哈师大发哈速度放缓ask东海防空喀什觉得很疯狂爱神的箭回复凯撒是</text>
					</view>
					<view class="card_time">
						<text>2022.08.26  18:02</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
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
	box-sizing: border-box;
	padding: 0 20rpx;
	padding-top: var(--status-bar-height);
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 36rpx;
	color: #333333;
	font-family: PingFang-SC-Medium;
	font-weight: Medium;
}
.scroll-box {
	width: 100%;
	height: calc(100vh - var(--status-bar-height) - 44px);
	.scroll-content {
		width: 100%;
		min-height: 100%;
		background-color: #F1F1F1;
		box-sizing: border-box;
		padding: 30rpx;
	}
}

.record_cell {
	width: 100%;
	box-sizing: border-box;
	padding: 26rpx;
	margin-bottom: 30rpx;
	background-color: #fff;
	border-radius: 20rpx;
	.card_title_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: Regular;
		.card_title {
			font-size: 32rpx;
			color: #333333;
		}
		.card_mode {
			font-size: 28rpx;
			color: #999;
			display: flex;
			align-items: center;
		}
	}
	.card_content {
		margin-top: 30rpx;
		width: 100%;
		font-weight: Regular;
		font-size: 28rpx;
		color: #333333;
		line-height: 36rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.card_time {
		font-size: 24rpx;
		color: #999;
		font-weight: Regular;
		margin-top: 40rpx;
	}
	
}
</style>
