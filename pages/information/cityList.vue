<template>
	<view class="city-fourm-view">
		
		<!-- 底部的渐变区域背景 -->
		<view class="view-bg"></view>
		
		<view class="tianqi">
			<text style="font-size: 50rpx;">21°</text>
			<text style="font-size: 26rpx;margin-left: 20rpx;">阴</text>
			<text style="font-size: 26rpx;margin-left: 10rpx;">18°C - 23°</text>
		</view>
		
		<view class="change-city">
			<u-icon name="edit-pen" color="#fff" size="18"></u-icon>
			<text style="margin-left: 10rpx;">郑州</text>
		</view>
		
		<view class="city-top">
			<view class="city-top-cell">
				<view class="top-img">
					郑州热榜
				</view>
				<view class="top-index">
					<text>TOP1</text>
				</view>
				<view class="top-title">
					<text>郑州一公园内竟然出现怪鱼？</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style scoped lang="scss">
	.city-fourm-view {
		width: 100%;
		min-height: 220rpx;
		// background-color: #4A9AFF;
		background: linear-gradient(to bottom , #4A9AFF 50%, #1185FE , #fff );
		position: relative;
		padding: 30rpx;
		padding-top: 130rpx;
		// .view-bg{
		// 	position: absolute;
		// 	bottom: 0rpx;
		// 	left: 0;
		// 	width: 100%;
		// 	height: 120rpx;
		// 	z-index: 0;
		// }
	}
	

	.tianqi {
		position: absolute;
		top: 30rpx;
		left: 30rpx;
		color: #fff;
		font-family: PingFang-SC-Bold;
	}
	
	.change-city {
		position: absolute;
		top: 40rpx;
		right: 30rpx;
		min-width: 100rpx;
		height: 50rpx;
		border: 1rpx solid #fff;
		display: flex;
		align-items: center;
		color: #fff;
		border-radius: 50rpx;
		box-sizing: border-box;
		padding: 0 10rpx;
		font-size: 26rpx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
	}
	
	.city-top {
		width: 100%;
		background-color: #fff;
		padding: 26rpx;
		border-radius: 20rpx;
		.city-top-cell {
			width: 100%;
			height: 82rpx;
			position: relative;
			.top-img {
				width: 82rpx;
				height: 82rpx;
				border-radius: 5rpx;
				background: linear-gradient(to bottom, yellow, red);
				font-family: lianmengqiyilushuaizhengruiheiti-Regular;
				font-size: 28rpx;
				flex-wrap: wrap;
				color: #fff;
				font-weight: bold;
				box-sizing: border-box;
				padding: 3rpx 12rpx;
			}
			.top-index {
				position: absolute;
				top: 0;
				left: 100rpx;
				font-family: BarlowCondensed-SemiBold;
				font-weight: bold;
				font-size: 30rpx;
				background: linear-gradient(to right,  #fc8a3d, #fc5025);
				-webkit-background-clip: text;
				color: transparent;
			}
			.top-title {
				position: absolute;
				bottom: 0rpx;
				left: 100rpx;
				font-family: PingFang-SC;
				font-weight: Medium;
				font-size: 26rpx;
				color: #333333;
			}
		}
	}
</style>