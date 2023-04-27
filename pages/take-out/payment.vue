<template>
	<view>
		<view class="box-1">
			<view class="box-1-1">
				<image class="img" src="../../static/images/location1.png" mode=""></image>
				<view class="">
					<text>白庙小区6号楼7005</text> <br>
					<text>芋头18325641895</text>
					<image src="../../static/images/gt.png" mode=""></image>
				</view>
				<view style="height: 1rpx;background-color: #f1f1f1;width: 95%; margin: auto;"></view>
			</view>

			<view class="box-1-2">
				<text>立即送出</text>
				<text>大约08:00送到</text>
				<view style="height: 20rpx;"></view>
			</view>
		</view>

		<view class="box-2">
			<view class="box-2-1">
				<text>百果园(文华路店)</text>
				<text>免费配送</text>
			</view>

			<view class="box-2-2" v-for="i in 2">
				<image src="../../static/share/bg.jpeg" mode=""></image>
				<view class="title">
					<view>整果西红柿一个500g</view>
					<view>规格：500g</view>
					<view>单位：x1</view>
				</view>
				<view class="price">￥9.9</view>
			</view>
			<view style="height: 20rpx;"></view>
			
			<view style="height: 1rpx; background-color: #f1f1f1;width: 95%;margin: auto;"></view>
			
			<view style="height: 20rpx;"></view>
			<!-- 需要配送费 -->
			<view class="peisongfei">
				<view class="box-2-1">
					<text>每日鲜蔬(文华路店)</text>
					<text>配送费￥5</text>
				</view>

				<view class="box-2-2">
					<image src="../../static/share/bg.jpeg" mode=""></image>
					<view class="title">
						<view>整果西红柿一个500g</view>
						<view>规格：500g</view>
						<view>单位：x1</view>
					</view>
					<view class="price">￥9.9</view>
				</view>
				<view style="height: 30rpx;"></view>
			</view>
		</view>
		

		<view class="box-3">
			<view style="height: 20rpx;"></view>
			<view class="box-3-1">
				<image class="img-1" src="../../static/images/alipay.png" mode=""></image>
				<text>支付宝</text>
				<image @click="selectZfb" class="img-2" :src="paymentMethod == 1 ? '../../static/images/xuanzhong.png' : '../../static/images/fuxuankuang.png'" mode=""></image>
			</view>
			<view style="height: 20rpx;"></view>
			<view class="box-3-1">
				<image class="img-1" src="../../static/images/weixin.png" mode=""></image>
				<text>微信</text>
				<image @click="selectWx" class="img-2" :src="paymentMethod == 2 ? '../../static/images/xuanzhong.png' : '../../static/images/fuxuankuang.png'" mode=""></image>
			</view>
			<view style="height: 20rpx;"></view>
		</view>

		<view class="box-4" @click="uni.navigateTo({
			url:'./remark'
		})">
			<text>订单备注</text>
			<image src="../../static/images/gt.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paymentMethod:''
			}
		},

		methods: {
			selectZfb(){
				this.paymentMethod = 1
			},
			selectWx() {
				this.paymentMethod = 2
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.box-1 {
		width: 95%;
		min-height: 200rpx;
		background-color: #FFF;
		margin: auto;
		margin-top: 20rpx;
		border-radius: 20rpx;

		.box-1-1 {
			.img {
				width: 40rpx;
				height: 40rpx;
				position: relative;
				top: -15rpx;
				left: 15rpx;
			}

			view {
				display: inline-block;
				position: relative;
				left: 20rpx;
				top: 20rpx;
				width: 90%;

				text {
					&:nth-child(1) {
						font-size: 30rpx;
					}

					&:nth-child(3) {
						color: #b0b0b0;
						font-size: 26rpx;
					}
				}

				image {
					width: 15rpx;
					height: 20rpx;
					float: right;
				}
			}
		}

		.box-1-2 {
			// margin-top: 20rpx;
			margin: 40rpx 20rpx 0 20rpx;

			text {
				&:nth-child(1) {}

				&:nth-child(2) {
					font-size: 26rpx;
					color: #5ba0fd;
					float: right;
				}
			}
		}
	}

	.box-2 {
		width: 95%;
		min-height: 200rpx;
		background-color: #FFF;
		margin: auto;
		margin-top: 20rpx;
		border-radius: 20rpx;

		.box-2-1 {
			margin: 20rpx 20rpx 0 20rpx;

			text {
				&:nth-child(1) {
					color: #b0b0b0;
					font-size: 26rpx;
					display: inline-block;
					margin-top: 20rpx;
				}

				&:nth-child(2) {
					color: #5ba0fd;
					font-size: 26rpx;
					float: right;
					display: inline-block;
					margin-top: 20rpx;
				}
			}
		}

		.box-2-2 {
			width: 94%;
			height: 160rpx;
			// border: 1rpx solid black;
			margin: auto;
			margin-top: 30rpx;
			margin-bottom: 20rpx;

			image {
				height: 100%;
				width: 160rpx;
				border-radius: 10rpx;
			}

			.title {
				display: inline-block;
				width: 400rpx;
				height: 99%;
				// border: 1rpx solid black;
				position: relative;
				bottom: 40rpx;
				left: 20rpx;

				view {
					margin-top: 10rpx;

					&:nth-child(1) {}

					&:nth-child(2) {
						color: #b0b0b0;
						font-size: 24rpx;
					}

					&:nth-child(3) {
						color: #b0b0b0;
						font-size: 24rpx;
					}
				}
			}

			.price {
				display: inline-block;
				color: #fc652e;

			}
		}
		
		.peisongfei {
			position: relative;
			top: -40rpx;
			.box-2-1 {
				// margin: 20rpx 20rpx 0 20rpx;
			
				text {
					&:nth-child(1) {
						color: #b0b0b0;
						font-size: 26rpx;
						display: inline-block;
						// margin-top: 20rpx;
					}
			
					&:nth-child(2) {
						color: #5ba0fd;
						font-size: 26rpx;
						float: right;
						display: inline-block;
						// margin-top: 20rpx;
					}
				}
			}
		}
	}

	.box-3 {
		width: 95%;
		// min-height: 200rpx;
		background-color: #FFF;
		margin: auto;
		margin-top: 30rpx;
		border-radius: 20rpx;

		.box-3-1 {
			margin: 0 20rpx 0 20rpx;

			.img-1 {
				width: 50rpx;
				height: 50rpx;
				vertical-align: middle;
			}

			.img-2 {
				width: 40rpx;
				height: 40rpx;
				float: right;
				margin-top: 10rpx;
			}

			text {
				display: inline-block;
				position: relative;
				top: 7rpx;
				left: 10rpx;
			}
		}
	}

	.box-4 {
		width: 95%;
		min-height: 80rpx;
		background-color: #FFF;
		margin: auto;
		margin-top: 30rpx;
		border-radius: 20rpx;

		text {
			line-height: 80rpx;
			display: inline-block;
			margin-left: 20rpx;
		}

		image {
			width: 15rpx;
			height: 20rpx;
			float: right;
			margin-top: 30rpx;
			margin-right: 20rpx;
		}
	}
</style>
