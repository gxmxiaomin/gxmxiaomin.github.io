<template>
	<scroll-view scroll-y="true" class="com_view">
		<view class="com_content">
			<view class="com_card">
				<view class="com_line">
					<view class="com_left">
						<u-icon name="map-fill" :color="textColor" size="24"></u-icon>
						<text style="margin-left: 10rpx;">郑州市金水区文化路85号</text>
					</view>
					<u-icon name="phone" :color="textColor" size="28"></u-icon>
				</view>
				
				<scroll-view scroll-x="true" class="com_scroll_box">
					<view class="com_scroll_content">
						<image :src="img" mode="" v-for="item in 10" :key="item"></image>
					</view>
				</scroll-view>
				
				<view class="com_line" style="margin-top: 30rpx;">
					<view class="com_left">
						<u-icon name="file-text" :color="textColor" size="24"></u-icon>
						<text style="margin-left: 10rpx;">食品安全证书</text>
					</view>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
			
			<view class="com_card" style="margin-top: 30rpx;">
				<view class="com_line">
					<view class="com_left">
						<u-icon name="clock-fill" :color="textColor" size="24"></u-icon>
						<text style="margin-left: 10rpx;">营业时间：0:00-24:00</text>
					</view>
				</view>
				<view class="com_line" style="margin-top: 30rpx;">
					<view class="com_left">
						<u-icon name="phone-fill" :color="textColor" size="24"></u-icon>
						<text style="margin-left: 10rpx;">配送时间：0:00-24:00</text>
					</view>
				</view>
			</view>
			
			<view class="com_card" style="margin-top: 30rpx;">
				<view class="com_line">
					<view class="com_left">
						<u-icon name="volume" :color="textColor" size="24"></u-icon>
						<text style="margin-left: 10rpx;">公告：为迎接双11购物节，本店铺今日...</text>
					</view>
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
				<view class="com_line" style="margin-top: 30rpx;">
					<view class="com_left">
						<u-icon name="coupon" :color="textColor" size="24"></u-icon>
						<text style="margin-left: 10rpx;">新人专享券；满200减30</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props:['textColor'],
		data() {
			return {
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
			};
		}
	}
</script>

<style lang="scss" scoped>
.com_view {
	width: 100%;
	height: 100%;
	.com_content {
		width: 100%;
		min-height: 100%;
		// background-color: #98ff78;
		font-family: PingFang-SC;
		font-weight: Medium;
	}
}

.com_card {
	width: 100%;
	min-height: 160rpx;
	border-radius: 15rpx;
	box-shadow: 5rpx 5rpx 5rpx rgba(236, 148, 84, 0.2);
	background-color: #fff;
	box-sizing: border-box;
	padding: 20rpx;
	color: #333333;
	font-size: 28rpx;
	.com_line {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.com_left {
			display: flex;
			align-items: center;
		}
	}
}

.com_scroll_box {
	width: 100%;
	height: 150rpx;
	margin-top: 30rpx;
	.com_scroll_content{
		min-width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}
}
</style>
