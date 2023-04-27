<template>
	<view class="view-container">
		<view class="view-msg">
			<view class="view-msg-title">
				<image src="../../static/images/shijian.png" mode=""></image>
				<image src="../../static/images/shijian.png" v-if="orderInfo.orderStatus==1||orderInfo.orderStatus==2||orderInfo.orderStatus==3"  mode=""></image>
				<image src="../../static/images/guanbi-quxiao-guanbi.png" v-if="orderInfo.orderStatus==4" mode=""></image>
				<image src="../../static/images/complete.png"  v-if="orderInfo.orderStatus==5" mode=""></image>
				<text class="text-msg1" v-if="orderInfo.orderItems[0].afterSale==2">待处理</text>
				<text class="text-msg1" v-if="orderInfo.orderItems[0].afterSale==4">已同意</text>
				<text class="text-msg1" v-if="orderInfo.orderItems[0].afterSale==3">已拒绝</text>
				<!-- <text class="text-msg1" v-if="orderInfo.orderStatus==1">已同意</text> -->
				<!-- <text class="text-msg1" v-if="orderInfo.orderStatus==2">已拒绝</text> -->
			</view>
			<view class="view-msg-after">
				售后原因：{{orderInfo.orderItems[0].refundDesc}}
			</view>
		</view>
		
		<view class="view-address">
			<view class="view-user-info">
				<view class="view-user-name">
					<image src="../../static/images/dianpu.png" mode=""></image>
					{{orderInfo.userName}}
				</view>
				<view class="view-user-phone">
					{{orderInfo.userPhone}}
				</view>
			</view>
			<view class="view-address-info">
				<image src="../../static/images/weizhi.png" mode=""></image>
				地址:{{orderInfo.userAddress}}
			</view>
		</view>
		<view class="view-inner">
			<view class="view-order-list">
				<!-- <view class="view-order-list-title">
					{{data.name}}
				</view> -->
				<view class="view-order-item" v-for="(item,index) in orderInfo.orderItems" :key="index">
					<view class="view-body">
						<image class="image-item-img" :src="schoolImg" mode=""></image>
						<view class="view-info">
							<view class="view-top">
								<view class="view-name">
									{{item.goodsName}}
								</view>
								<view class="view-price">
									￥{{item.sellingPrice}}
								</view>
							</view>
							<view class="view-spec" v-if="item.normValue!=''">
								{{item.normValue[0].normName}}:{{item.normValue[0].normValue}}
								<view class="view-num">
									x{{item.goodsCount}}
								</view>
							</view>
						</view>
					</view>
					<view class="view-options">
						商品总价<text>￥{{orderInfo.totalPrice}}</text>
					</view>
					<view class="view-total-price">
						合计: <text>￥{{orderInfo.totalPrice}}</text>
					</view>
				</view>

			</view>
			<view class="view-details">
				<view class="view-details-title">
					订单信息
				</view>
				<view class="view-details-item">
					<view class="view-details-name">
						订单编号:
					</view>
					<text>{{orderInfo.orderNo}}</text>
				</view>
				<view class="view-details-item">
					<view class="view-details-name">
						支付时间:
					</view>
					<text>{{orderInfo.createTime}}</text>
				</view>
				<view class="view-details-item">
					<view class="view-details-name">
						支付方式:
					</view>
					<text v-if="orderInfo.payType==1">微信支付</text>
					<text v-if="orderInfo.payType==2">支付宝支付</text>
					<text v-if="orderInfo.payType==3">余额支付</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				schoolImg: '',
				showModal: false,
				orderInfo: [],
				orderItems:[],
				
				payType: 'balance',
				data: {
					name: "万代官方旗舰店",
					totalNum: 2,
					totalPrice: 349.00,
					couponPrice: 10,
					children: [{
						name: "商品名商品名商品名商品名商品名商品名商品名商品名",
						price: 349.00,
						spec: "规格规格规格1",
						num: 2
					}, {
						name: "商品名商品名商品名商品名商品名商品名商品名商品名",
						price: 999.00,
						spec: "规格规格规格2",
						num: 1
					}, {
						name: "商品名商品名商品名商品名商品名商品名商品名商品名",
						price: 759.00,
						spec: "规格规格规格2",
						num: 4
					}, ]
				}
			};
		},
		onLoad(options) {
			this.id = options.id
			if (this.orderInfo.payType == 1) {
				this.payType = 'wxpay'
			}
			if (this.orderInfo.payType == 2) {
				this.payType = 'alipay'
			}
			if (this.orderInfo.payType == 3) {
				this.payType = 'balance'
			}
		},
		async mounted() {
			await this.getInfo()
		},
		methods: {
			async getInfo() {
				let res = await this.http.get("/app/order/info", {
					id: this.id
				})
				console.log('获取信息:',res);
				if (res.code === 200) {
					this.orderInfo = res.data
					this.orderItems = res.data.orderItems
					this.schoolImg = this.getCover(res.data.orderItems[0].goodsCoverImg);
				}
	
			},
		}
	}
</script>

<style lang="scss" scoped>
	.view-container {
		background: #F8F8F8;
		padding-bottom: 160rpx;

		.view-msg {
			padding: 0 30rpx;
			height: 250rpx;
			background: #188cfa;
			color: #FFFFFF;
			// display: flex;
			// flex-direction: column;
			// justify-content: center;
			// align-items: center;
			display: flex;
			flex-direction: column;
			// flex-direction: row;
			align-items: center;
			justify-content: center;
			image{
				width: 40rpx;
				height: 40rpx;
			}
			.view-msg-title{
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.view-msg-after{
				font-size: 28rpx;
				color: #FFFFFF;
				margin-top: 20rpx;
			}
			.text-msg1 {
				font-size: 36rpx;
				font-weight: bold;
				margin-left: 15rpx;
				// margin-bottom: 20rpx;
			}

			.text-msg2 {
				font-size: 28rpx;
				font-weight: 500;
			}
		}

		.view-address {
			position: relative;
			top: -20rpx;
			padding: 0 60rpx;
			height: 180rpx;
			background: #FFFFFF;
			margin-bottom: 10rpx;
			font-weight: 500;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 28rpx;
			border-radius: 20rpx 20rpx 0 0;

			.view-user-info {
				display: flex;
				margin-bottom: 20rpx;
				font-weight: bold;

				.view-user-name {
					display: flex;
					align-items: center;
					image{
						margin-right: 13rpx;
						width: 28rpx;
						height: 27rpx;
					}
					margin-right: 34rpx;
				}
			}

			.view-address-info {
				image{
					margin-right: 13rpx;
					width: 27rpx;
					height: 28rpx;
				}
				font-size: 24rpx;
				color: #666666;
			}
		}

		.view-inner {
			padding: 0 30rpx;

			.view-order-list {
				padding: 30rpx;
				border-radius: 20rpx;
				overflow: hidden;
				background-color: #FFFFFF;
				margin-bottom: 40rpx;

				.view-tuikuan {
					width: 180rpx;
					height: 60rpx;
					background: #FFFFFF;
					border: 2rpx solid #999999;
					border-radius: 34rpx;
					text-align: center;
					line-height: 60rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #999999;
					margin-left: auto;
					margin-top: 40rpx;
				}

				.view-order-list-title {
					font-size: 28rpx;
					font-weight: 500;
					margin-bottom: 40rpx;
				}

				.view-order-item {
					display: flex;
					flex-direction: column;
					margin-bottom: 30rpx;

					.view-body {
						width: 100%;
						display: flex;

						.image-item-img {
							width: 180rpx;
							height: 180rpx;
							margin-right: 20rpx;
						}

						.view-info {
							display: flex;
							flex-direction: column;
							flex-grow: 1;
							flex-shrink: 1;

							.view-top {
								display: flex;
								justify-content: space-between;
								margin-bottom: 20rpx;
								font-size: 28rpx;

								.view-name {
									flex-grow: 1;
									flex-shrink: 1;
									font-weight: 500;
								}

								.view-price {
									color: red;
									font-weight: bold;
								}
							}

							.view-spec {
								display: flex;
								justify-content: space-between;
								font-size: 24rpx;
								font-weight: 500;
								color: #999999;
								margin-bottom: 10rpx;
							}
							
							.view-service{
								
								width: 156rpx;
								height: 52rpx;
								background: #FFFFFF;
								border: 1rpx solid #999999;
								border-radius: 26rpx;
								
								font-size: 28rpx;
								color: #999999;
								line-height: 6rpx;
								display: flex;
								align-items: center;
								justify-content: space-around;
							}
							
							.view-item-buttons {
								display: flex;
								justify-content: flex-end;

								.view-item-button {
									width: 140rpx;
									height: 40rpx;
									border: 2rpx solid #999999;
									border-radius: 24rpx;
									text-align: center;
									line-height: 40rpx;
									font-size: 24rpx;
									font-weight: 500;
									color: #999999;
								}
							}


						}
					}
				}

				.view-options {
					display: flex;
					justify-content: space-between;
					font-size: 26rpx;
					font-weight: 500;
					color: #999999;
					margin-bottom: 10rpx;
				}

				.view-total-price {
					font-size: 26rpx;
					font-weight: 500;
					color: #999999;
					text-align: right;
					margin-top: 20rpx;

					text {
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
						margin-left: 10rpx;
					}
				}
			}
		}

		.view-details {
			height: 300rpx;
			padding: 30rpx;
			background: #FFFFFF;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.view-details-title {
				font-size: 30rpx;
				color: #333333;
				font-weight: bold;
				margin-bottom: 20rpx;
			}

			.view-details-item {
				display: flex;
				margin-bottom: 15rpx;

				.view-details-name {
					width: 150rpx;
				}

				text {
					flex-shrink: 1;
					color: #999999;
				}
			}
		}

		.view-bottom {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 108rpx;
			background: #FFFFFF;
			padding: 0 30rpx;

			.view-button {
				width: 180rpx;
				height: 60rpx;
				background: #FFFFFF;
				border: 2rpx solid #999999;
				border-radius: 34rpx;
				text-align: center;
				line-height: 60rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #999999;
				margin-left: 30rpx;
			}

			.view-color-button {
				background-color: #188cfa;
				color: #FFFFFF;
				border: none;
			}
		}

		/deep/ .u-modal {
			width: 600rpx !important;
			height: 264rpx;
			background: #FFFFFF;
			border-radius: 24rpx;

			.u-modal__content {
				padding-top: 80rpx !important;
				border-bottom: 2rpx solid #EFEFEF;

				.u-modal__content__text {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					text-align: center;
				}
			}

			.u-line {
				display: none;
			}

			.u-modal__button-group__wrapper__text {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-weight: 500;
			}

			.u-modal__button-group__wrapper--cancel {
				border-right: 1rpx solid #EFEFEF;
			}

			.u-modal__button-group__wrapper--confirm {
				border-left: 1rpx solid #EFEFEF;
			}
		}
	}
</style>
