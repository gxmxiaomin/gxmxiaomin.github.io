<template>
	<view>
		<view class="view-order">
			<view class="view-address" v-if="addres==1">
				<image class="image-address" src="../../static/images/dizhi.png"></image>
				<text class="text-add">请添加收货地址</text>
				<image class="image-fanhui" src="../../static/images/arrow_right.png"></image>
			</view>
			<view class="view-address" v-else>
				<image class="image-address" src="../../static/images/dizhi.png"></image>
				<view class="view-details">
					<view class="view-contact">李说 181****0202</view>
					<view class="view-place">广州市越秀区东风中路268号1109</view>
				</view>
				<image class="image-fanhui" src="../../static/images/arrow_right.png"></image>
			</view>
			<view class="view-shop">
				<view class="view-product">
					<image class="image-shop" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
					<view class="view-name">
						<text class="text-name-title u-line-2">哆啦A梦小学生上学文具礼盒套装电动铅笔刀橡皮擦...</text>
						<view class="view-type">电池/电源线哆啦A梦礼盒</view>
					</view>
					<view class="view-price">
						<text class="text-price">￥129.9</text>
						<view class="view-number">x2</view>
					</view>
				</view>
				<view class="view-calculation">
					<text class="">购买数量：</text>
					<u-number-box v-model="value" @change="valChange"></u-number-box>
				</view>
				<view class="view-total">需支付：<text>¥129.00</text></view>
			</view>
			<view class="view-settlement">
				<view class="view-total">共1件，合计：<text>¥129.00</text></view>
				<button class="u-reset-button view-submit" @click="uni.navigateTo({
					url:'../pay-success/pay-success'
				})">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addres: 2,
				value: 0
			}
		},
		methods: {
			valChange(e) {
				console.log('当前值为: ' + e.value)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F7F7;
	}
	.view-order {
		.view-settlement{
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			height: 98rpx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			.view-submit{
				width: 280rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 40rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 80rpx;
			}
			.view-total{
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				margin-left: 135rpx;
				text{
					color: #FF0000!important;
				}
			}
		}
		.view-shop {
			background-color: #FFFFFF;
			padding: 30rpx;
			.view-total{
				text-align: right;
				margin-top: 60rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left: auto;
				text{
					color: #333333;
				}
			}
			.view-calculation{
				display: flex;
				margin-top: 40rpx;
				/deep/.u-number-box{
					margin-left: auto;
				}
			}
			.view-product {
				display: flex;

				.image-shop {
					width: 160rpx;
					height: 160rpx;
				}

				.view-price {
					margin-left: auto;

					.view-number {
						text-align: right;
						font-size: 28rpx;
						font-weight: 400;
						color: #999999;
					}

					.text-price {
						font-size: 40rpx;
						font-weight: bold;
						color: #FF0000;
					}
				}

				.view-name {
					width: 327rpx;
					margin-left: 20rpx;

					.text-name-title {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
					}

					.view-type {
						height: 40rpx;
						text-align: center;
						margin-top: 40rpx;
						background: rgba(74, 154, 255, 0.1);
						border-radius: 20rpx;
						font-size: 20rpx;
						font-weight: 400;
						color: #4A9AFF;
						line-height: 40rpx;
					}
				}
			}
		}

		.view-address {
			height: 160rpx;
			display: flex;
			align-items: center;
			padding: 30rpx;
			border-bottom: 20rpx solid #F7F7F7;
			background-color: #FFFFFF;
			.view-details {
				margin-left: 20rpx;

				.view-contact {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
				}

				.view-place {
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 10rpx;
				}
			}

			.image-address {
				width: 33rpx;
				height: 41rpx;
			}

			.text-add {
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
				margin-left: 25rpx;
			}

			.image-fanhui {
				width: 16rpx;
				height: 28rpx;
				margin-left: auto;
			}
		}
	}
</style>
