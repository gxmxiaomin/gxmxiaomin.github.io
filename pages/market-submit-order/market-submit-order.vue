<template>
	<view>
		<view class="view-order">
			<view class="view-address" v-if="!isAddress" @click="uni.navigateTo({
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
					<view class="view-name">
						<text class="text-name-title u-line-2">{{shopInfo.goodsDesc}}</text>
						<view class="view-type">{{guigeName}}:{{guigeType}}</view>
					</view>
					<view class="view-price">
						<text class="text-price">￥{{shopInfo.sellPrice}}</text>
					</view>
				</view>
				<view class="view-calculation">
					<text class="text-name">购买数量</text>
					<u-number-box :min="0" v-model="value" @change="valChange"></u-number-box>
				</view>
				<view class="view-calculation" v-if="false">
					<text class="text-name">店铺优惠</text>
					<view class="view-youhuijuan" @click="show = true">
						<view class="">店铺优惠券<text class="text-amt" v-if="">-{{titlePrices}}</text></view>
						<image class="image-fanhui" src="../../static/images/right.png"></image>
					</view>
				</view>
				<view class="view-note">
					<text class="text-note-title">订单备注</text>
					<input type="text" value="" placeholder="请填写商品备注"
						placeholder-style="font-size: 28rpx; color:#CCCCCC" />
				</view>

				<view class="view-total">
					需支付：<text>¥{{shopInfo.sellPrice*value-titlePrices<0?shopInfo.sellPrice*value:shopInfo.sellPrice*value-titlePrices}}</text>
				</view>

			</view>

			<!-- 底部栏 -->
			<view class="view-settlement">
				<view class="view-total">
					共{{value}}件，合计：<text>¥{{shopInfo.sellPrice*value-titlePrices<0?shopInfo.sellPrice*value:shopInfo.sellPrice*value-titlePrices}}</text>
				</view>
				<view class="view-btn">
					<button class="u-reset-button view-submit"
						@click="submitOrder(addressInfo.id,shopInfo.id,shopInfo.storeId)">提交订单</button>
				</view>
			</view>

			<!-- 选择优惠券 -->
			<u-popup :show="show" mode="bottom" :round="20" @close="close">
				<view class="view-choose-coupon">
					<view class="view-title">选择优惠券</view>

					<view class="view-list">
						<view class="view-item" v-for="(item,index) in qualityList" :key="index">
							<view class="view-coupon" v-if="item.type==3" :style="'background: url('+bgConpon+');'">
								<view class="view-left">
									<view class="view-amt">
										<text>￥</text>
										<text>{{item.couponPrice}}</text>
									</view>
									<view class="view-type">平台优惠券</view>
								</view>
								<view class="view-right">
									<text>满{{item.useMinPrice}}可用</text>
									<text>有效期至{{item.endTime}}</text>
								</view>
							</view>

							<view class="view-coupon" v-if="item.type==0" :style="'background: url('+bgConponBlue+');'">
								<view class="view-left">
									<view class="view-amt">
										<text>￥</text>
										<text>{{item.couponPrice}}</text>
									</view>
									<view class="view-type">店铺优惠券</view>
								</view>
								<view class="view-right">
									<text>满{{item.useMinPrice}}可用</text>
									<text>有效期至{{item.endTime}}</text>
								</view>
							</view>

							<view class="view-choose" @click="chooseCoupon(item)">
								<image src="../../static/images/check.png" mode="" v-if="item.select"></image>
								<image src="../../static/images/nocheck.png" mode="" v-else></image>
							</view>
						</view>
					</view>
					<view class="view-confirm" @click="confirm">确定</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAddress: false,
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
				show: false, // 选择优惠券(弹框)
				storeId: '',
				curriculum: 0,
				qualityList: [],
				bgConpon: require('@/static/images/conpon-s.png'),
				bgConponBlue: require('@/static/images/conpon-b.png'),
				titlePrices: 0,
				couponId: '',
			}
		},
		onLoad(option) {
			this.val = option.id
			this.value = option.numbers
			this.storeType = option.storeType
			console.log(this.val)
		},
		onShow() {
			this.getDefaultaddress()
			this.getShopInfo()
			this.getCoupnList()
		},
		methods: {
			// 确定选择优惠券
			confirm() {
				let obj = this.qualityList.find(item => item.select);
				console.log(obj);
				if (!obj) {
					this.couponId = '';
					this.titlePrices = 0;
					this.show = false;
				} else {
					this.show = false;
					this.couponId = obj.id;
					this.titlePrices = obj.couponPrice;
				}
			},

			// 选择优惠券
			chooseCoupon(item) {
				console.log(item);
				item.select = !item.select
				if (item.select) {
					for (let val of this.qualityList) {
						if (val.id != item.id) {
							val.select = false;
						}
					}
				}
			},

			close() {
				this.show = false
			},

			// 领取优惠券      
			receives(ids, reduce, zong) {
				this.couponId = ids
				this.titlePrices = reduce
				this.show = false
				if (this.shopInfo.sellPrice * this.value < zong) {
					this.$toast('优惠券不可用');
					this.titlePrices = '0'
				}
			},

			// 点击提交订单
			submitOrder(address, shop, storeId) {
				this.postOrder(address, shop, storeId)
			},

			async postOrder(address, shop, storeId) {
				console.log('￥￥￥￥￥￥￥￥￥￥')
				console.log(address)
				console.log(shop)
				console.log(storeId)
				console.log(this.storeType);
				console.log(this.storeType == 1);
				let res = await this.http.postJson('/app/order/save', {
					addressId: address,
					orderType: this.storeType == 1 ? 1 : 3,
					storeId: storeId,
					couponId: this.couponId,
					totalPrice: this.shopPrice * this.value,
					orderItems: [{
						goodsCount: this.value,
						goodsId: shop,
						normValueId: this.shopGoodid,
					}]
				});
				if (res.code == 200) {
					this.$toast(res.msg)
					var totalPrice = this.shopPrice * this.value - this.titlePrices
					uni.navigateTo({
						url: '../school-pay-success/school-pay-success?orderId=' + res.data + '&totalPrice=' +
							totalPrice
					})
				} else {
					// this.$toast(res.msg);
				}
			},

			// 初始化获取商品信息
			async getShopInfo() {
				let res = await this.http.get('/app/goods/info', {
					isShare: 1,
					id: this.val
				});
				if (res.code == 200) {
					this.shopInfo = res.data
					console.log('参数2获取商品信息',this.shopInfo)
					this.cover = this.getCover(res.data.goodsImg);
					this.shopPrice = res.data.sellPrice
					this.guigeName = res.data.bgoodsNormList[0].normName
					this.guigeType = res.data.bgoodsNormList[0].children[0].normValue
					this.storeId = res.data.storeId
					for (let item of res.data.bgoodsNormList) {
						for (let list of item.children) {
							this.bgoods += list.id + ','
						}
					}
					this.shopGoodid = this.bgoods
				} else {
					// this.$toast(res.msg);
				}
			},

			// 优惠券列表
			async getCoupnList() {
				let res = await this.http.get('/app/yxStoreCouponUser/list', {
					status: 0,
					storeId: this.storeId,
				});
				console.log('优惠券列表', res);
				if (res.code == 200) {
					for (let item of res.rows) {
						item.select = false;
					}
					this.qualityList = res.rows
				} else {
					// this.$toast(res.msg);
				}
			},

			// 初始化获取默认收货地址
			async getDefaultaddress() {
				let res = await this.http.get('/app/address/default', {});
				if (res.code == 200) {
					if (res.data == null) {
						this.isAddress = false
					} else {
						this.isAddress = true
						this.addressInfo = res.data
						console.log('参数1收获地址',this.addressInfo)
					}
				} else {
					// this.$toast(res.msg);
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

		.view-choose-coupon {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 750rpx;
			background: #FFFFFF;
			padding: 55rpx 30rpx;
			overflow-y: scroll;
			border-radius: 20rpx 20rpx 0 0;

			.view-confirm {
				width: 630rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 999rpx;
				text-align: center;
				line-height: 80rpx;
				color: #FFFFFF;
			}

			.view-title {
				font-size: 36rpx;
				color: #333333;
			}

			.view-list {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				margin: 40rpx 0 40rpx;

				.view-item {
					display: flex;
					align-items: center;
					border-radius: 10rpx;
					margin-bottom: 30rpx;

					.view-coupon {
						display: flex;
						align-items: center;
						width: 626rpx;
						height: 172rpx;
						margin-right: 30rpx;
						background-size: 100% 100% !important;
						background-repeat: no-repeat !important;
					}

					.view-left {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						height: 60rpx;
						color: #FFFFFF;
						width: 180rpx;
						height: 100%;

						.view-amt {
							margin-bottom: 10rpx;

							text {
								&:first-child {
									font-size: 24rpx;
								}

								&:last-child {
									font-size: 54rpx;
								}
							}
						}

						.view-type {
							font-size: 24rpx;
							color: #FFFFFF;
						}
					}

					.view-right {
						display: flex;
						flex-direction: column;
						padding: 0 30rpx;

						>text {
							&:first-child {
								font-size: 32rpx;
								color: #3D371E;
								margin-bottom: 20rpx;
							}

							&:last-child {
								font-size: 24rpx;
								color: #B6885D;
							}
						}
					}

					.view-choose {
						image {
							width: 34rpx;
							height: 34rpx;
						}
					}
				}
			}

		}

		.view-settlement {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 750rpx;
			height: 98rpx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0 30rpx;

			.view-btn {
				margin-left: 30rpx;
			}

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

				text {
					font-size: 40rpx !important;
					font-weight: bold !important;
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

				.view-youhuijuan {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333333;

					text {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #4A9AFF;
						margin-left: 10rpx;
					}

					.image-fanhui {
						width: 11rpx;
						height: 19rpx;
						margin-left: 10rpx;
					}
				}

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

	.view-note {
		margin-top: 30rpx;

		.text-note-title {
			font-size: 28rpx;
			color: #666666;
			line-height: 40rpx;
		}
	}
</style>
