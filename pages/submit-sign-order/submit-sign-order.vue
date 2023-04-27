<template>
	<view>
		<view class="view-order">

			<view class="view-address" v-if="!addressInfo" @click="uni.navigateTo({
				url:'../market-add-address/market-add-address'
			})">
				<image class="image-address" src="../../static/images/dizhi.png"></image>
				<text class="text-add">请添加收货地址</text>
				<image class="image-fanhui" src="../../static/images/arrow_right.png"></image>
			</view>

			<view class="view-address" v-else @click="uni.navigateTo({
				url:'../market-address/market-address'
			})">
				<image class="image-address" src="../../static/images/dizhi.png"></image>
				<view class="view-details">
					<view class="view-contact">{{addressInfo.consigneeName}} {{addressInfo.consigneePhone}}</view>
					<view class="view-place">{{addressInfo.consigneeAddress}}</view>
				</view>
				<image class="image-fanhui" src="../../static/images/arrow_right.png"></image>
			</view>

			<view class="view-gap"></view>

			<view class="view-shop">
				<view class="view-top">
					<image :src="data.goodsImg" mode=""></image>
					<view class="view-info">
						<view>{{data.goodsName}}</view>
						<view class="">x1</view>
					</view>
				</view>
				<view class="view-bottom">
					<text>配送方式</text>
					<text>快递包邮</text>
				</view>
				<view class="view-bottom"></view>

				<!-- <view class="view-product">
					<image class="image-shop" :src="cover"></image>
					<text class="text-shopList">{{shopInfo.goodsName}}</text>
					<view class="view-price">
						<text>x1</text>
					</view>
				</view> -->
			</view>

			<view class="view-settlement">
				<view class="view-submit" @click="postOrder">确认领取</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: "",
				value: 0,
				noteValue: "",
				addressInfo: {},
				shopInfo: {},
				shopGoodid: '', //关联商品id
				bgoods: [], //商品规格id
				shopPrice: '', //商品单价
				storeType: '',
				cover: '',
				guigeName: '',
				guigeType: '',

				goodsType: '',
				id: '',
				data: {},
				addressId: '',
			}
		},
		onLoad(option) {
			let data = JSON.parse(decodeURIComponent(option.data))
			this.id = data.id
			this.goodsType = 1
			this.data = data
			console.log(this.data);
		},
		onShow() {
			this.getDefaultaddress()
		},
		methods: {
			// 点击提交订单
			async postOrder() {
				let res = await this.http.post('/app/userScores/exchangeScoreGoods', {
					scoreGoodsId: this.id,
					goodsType: this.goodsType,
					userAddressId: this.addressId,
				});
				if (res.code == 200) {
					this.$toast('兑换成功')
					uni.navigateTo({
						url: '../receive-success/receive-success'
					})
				} else {
					this.$toast(res.msg);
				}
			},

			// 初始化获取默认收货地址
			async getDefaultaddress() {
				let res = await this.http.get('/app/address/default', {});
				console.log('地址信息', res);
				if (res.code == 200) {
					this.addressInfo = res.data
					this.addressId = res.data.id
				} else {
					this.$toast(res.msg);
				}
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
			}
		}
	}
</script>

<style lang="scss">
	.view-order {
		.view-settlement {
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			height: 98rpx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;

			.view-submit {
				margin: 0 auto;
				width: 620rpx;
				height: 80rpx;
				text-align: center;
				background: #4A9AFF;
				border-radius: 40rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 80rpx;
			}

			.view-total {
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				margin-left: 135rpx;

				text {
					color: #FF0000 !important;
				}
			}
		}

		.view-gap {
			height: 20rpx;
			background-color: #F7F7F7;
		}

		.view-shop {
			background-color: #FFFFFF;
			padding: 30rpx;

			.view-top {
				display: flex;
				border-bottom: 1px solid #eee;
				padding-bottom: 30rpx;

				image {
					width: 160rpx;
					height: 160rpx;
					margin-right: 20rpx;
				}

				.view-info {
					display: flex;
					flex-direction: column;

					>view {
						&:first-child {
							font-size: 28rpx;
							color: #333333;
						}

						&:last-child {
							color: #999999;
							font-size: 28rpx;
							margin-top: 20rpx;
						}
					}
				}
			}

			.view-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 26rpx 0;

				>text {
					font-size: 28rpx;

					&:first-child {
						color: #999999;
					}

					&:last-child {
						color: #333333;
					}
				}
			}

			.view-total {
				text-align: right;
				margin-top: 60rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left: auto;

				text {
					font-size: 32rpx;
					color: #333333;
					font-weight: bold;
				}
			}

			.text-name {
				font-size: 28rpx;
				color: #666666;
			}

			.view-calculation {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 40rpx;

				/deep/.u-number-box {
					.u-number-box__input {
						width: 80rpx !important;
						background-color: #F2F3F5 !important;
						font-size: 28rpx !important;
						font-family: Arial;
						font-weight: 400;
						color: #333333 !important;
					}

					.u-number-box__minus,
					.u-number-box__plus {
						width: 32rpx;
						background-color: #FFFFFF !important;
						transform: scale(0.83);
					}

					.u-icon__icon {
						font-size: 24rpx !important;
						font-weight: 400 !important;
						color: #333333 !important;
					}
				}
			}

			.view-product {
				display: flex;

				.image-shop {
					width: 160rpx;
					height: 160rpx;
				}

				.text-shopList {
					font-size: 28rpx;
					margin: 0 20rpx;
					flex-grow: 1;
					flex-shrink: 1;
				}

				.view-price {
					margin-left: auto;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-end;

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
						margin-top: 40rpx;
						background: rgba(74, 154, 255, 0.1);
						border-radius: 20rpx;
						font-size: 20rpx;
						font-weight: 400;
						color: #4A9AFF;
						line-height: 40rpx;
						text-align: center;
					}
				}
			}
		}

		.view-address {
			height: 160rpx;
			display: flex;
			align-items: center;
			padding: 30rpx;
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
