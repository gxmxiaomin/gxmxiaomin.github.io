<template>
	<view>
		<view class="view-success">
			<view class="view-show">
				<image class="chenggong" src="../../static/images/cgenggong.png"></image>
				<text class="text-price">￥{{price}}</text>
				<text class="text-trip">支付成功</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:'',
			}
		},
		onLoad(optipon) {
			console.log(optipon);
			this.price = optipon.total
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.view-success{
		padding-top: 86rpx;
		.view-show{
			width: 100%;
			.chenggong{
				width: 87rpx;
				height: 87rpx;
				display: block;
				margin: 0 auto;
			}
			.text-price{
				font-size: 60rpx;
				font-weight: 500;
				color: #333333;
				margin-top: 20rpx;
				text-align: center;
				display: block;
				margin-bottom: 25rpx;
			}
			.text-trip{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF0000;
				display: block;
				text-align: center;
			}
		}
	}
</style>
