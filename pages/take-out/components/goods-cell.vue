<template>
	<view class="com_view">
		<image :src="img" mode=""></image>
		<text class="goods_name">【整根】芹菜一根500g</text>
		<text class="goods_labels">季节菜、口感好</text>
		<text class="goods_num">月销1239</text>
		<view class="price_box">
			<text class="goods_now">￥8.9</text>
			<text class="goods_old">￥13.9</text>
		</view>
		<text class="card_time">11.19  19:23</text>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
			}
		}
	}
</script>

<style lang="scss">
	.com_view{
		width: 100%;
		min-height: 280rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		position: relative;
		image {
			width: 180rpx;
			height: 180rpx;
			border-radius: 10rpx;
			position: absolute;
			top: 30rpx;
			left: 30rpx;
		}
		.goods_name {
			position: absolute;
			left: 220rpx;
			top: 40rpx;
			font-size: 28rpx;
			color: #333;
		}
		.goods_labels {
			position: absolute;
			left: 220rpx;
			top: 85rpx;
			font-size: 20rpx;
			color: #999999;
		}
		.goods_num {
			position: absolute;
			left: 220rpx;
			top: 120rpx;
			color: #999999;
			font-size: 20rpx;
		}
		.price_box {
			position: absolute;
			left: 220rpx;
			top: 160rpx;
			.goods_now {
				color: #FC6129;
				font-size: 28rpx;
			}
			.goods_old {
				font-size: 20rpx;
				color: #999999;
			}
		}
		.card_time {
			position: absolute;
			left: 30rpx;
			top: 228rpx;
			color: #999999;
			font-size: 24rpx;
		}
		
	}
</style>