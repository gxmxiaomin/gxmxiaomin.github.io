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
				<view class="view-product">
					<image class="image-shop" :src="cover"></image>
					<text class="text-shopList">{{shopInfo.goodsName}}</text>
					<view v-if="show == 1" class="view-price">
						<text class="text-price">{{shopInfo.sellPrice}}星币</text>
						<text>x1</text>
					</view>
					<view v-else class="view-price">
						<text class="text-price">签到{{shopInfo.signNum}}天</text>
						<text>x1</text>
					</view>
				</view>
			</view>
			<view class="view-settlement">
				<view v-if="show == 1" class="view-total">共1件，合计：<text>{{shopInfo.sellPrice}}星币</text></view>
				<view v-if="show == 2" class="view-total">共1件，合计：<text>签到{{shopInfo.signNum}}天</text></view>
				<button class="u-reset-button view-submit"
					@click="submitOrder(shopInfo.id,addressInfo.id)">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: "111",
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
				val: '',
				show: '',
			}
		},
		onLoad(option) {
			console.log('@@@@@@@@@@@@@@@',option)
			this.val = option.id
			this.storeType = option.storeType
			this.goodsType = option.goodsType
			console.log(this.val)
		},
		onShow() {
			this.getDefaultaddress()
			this.getShopInfo()
		},
		methods: {
			// 点击提交订单
			submitOrder(shop, address) {
				console.log(shop,"----------------");
				console.log(address,"----------------");
				if(shop&&address) {
					this.postOrder(shop, address)
				}else {
					this.$toast("请输入您的地址信息");
				}
				
			},

			async postOrder(shop, address) {
				if (this.show == 1) {
					let res = await this.http.post('/app/userScores/exchangeScoreGoods', {
						scoreGoodsId: shop,
						goodsType: this.goodsType,
						userAddressId: address,
					});
					console.log(res)
					if (res.code == 200) {
						this.$toast(res.msg)
						setTimeout(() => {
							uni.navigateBack({

							})
						}, 500)
					} else {
						this.$toast(res.msg);
					}

				}else{
					console.log(this.show)
				}
			},

			// 初始化获取商品信息
			async getShopInfo() {
				console.log(this.val);
				let res = await this.http.get('/app/userScores/scoreGoodsInfo', {
					id: this.val
				});
				console.log(res)
				if (res.data) {
					this.show = 1
					if (res.code == 200) {
						this.shopInfo = res.data
						this.cover = this.getCover(res.data.goodsImg);
					} else {
						this.$toast(res.msg);
					}
				} else {
					let res = await this.http.get('/app/userScores/signProductInfo', {
						id: this.val
					});
					console.log(res)
					this.show = 2
					if (res.code == 200) {
						this.shopInfo = res.data
						this.cover = this.getCover(res.data.goodsImg);
					} else {
						this.$toast(res.msg);
					}
				}


			},
			// 初始化获取默认收货地址
			async getDefaultaddress() {
				let res = await this.http.get('/app/address/default', {});
				if (res.code == 200) {
					if(res.data==null) {
						this.$toast("请输入您的地址信息");
					}else {
						this.addressInfo = res.data
					}
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
