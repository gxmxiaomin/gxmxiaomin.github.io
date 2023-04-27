<template>
	<view>
		<view class="view-order">

			<!-- 地址信息 -->
			<view class="view-address" v-if="addres==1">
				<image class="image-address" src="../../static/images/dizhi.png"></image>
				<text class="text-add">请添加收货地址</text>
				<image class="image-fanhui" src="../../static/images/arrow_right.png"></image>
			</view>
			<view class="view-address" v-else @click="uni.navigateTo({url:'/pages/market-address/market-address'})">
				<image class="image-address" src="../../static/images/dizhi.png"></image>
				<view class="view-details">
					<view class="view-contact">{{addressInfo.consigneeName}} {{addressInfo.consigneePhone}}</view>
					<view class="view-place">{{addressInfo.consigneeAddress}}</view>
				</view>
				<image class="image-fanhui" src="../../static/images/arrow_right.png"></image>
			</view>

			<!-- 商品列表 -->
			<view class="view-shops">
				<view class="view-shop" v-for="(store,index) in shopList" :key="index">

					<view class="view-title">
						<image class="image-business" src="../../static/images/dianpu.png"></image>
						<text class="text-title">{{store.storeName}}</text>
						<image class="image-fanhui" src="../../static/images/arrow_right.png" mode=""></image>
					</view>

					<view class="view-product" v-for="(item,i) in store.carList" :key="i">
						<view class="view-shangpin">
							<image class="image-shop" :src="item.goods.goodsCover.split(',')[0]"></image>
							<view class="view-name">
								<text class="text-name-title u-line-2">{{item.goods.goodsDesc}}</text>
								<text class="view-type"
									v-for="(spec,i) in item.normValue">{{spec.normName}}:{{spec.normValue}}</text>

								<view class="view-price">
									<text class="text-price">￥{{item.goods.sellPrice}}</text>
									<!-- <u-number-box v-model="item.salesNum" @change="valChange"></u-number-box> -->
									<text class="text-numbers">x{{item.addNum}}</text>
								</view>
							</view>
						</view>
						<view class="view-total">
							共{{item.addNum}}件，需支付：<text>¥{{item.goods.sellPrice*item.addNum}}</text>
						</view>
					</view>

				</view>

			</view>
			<view class="view-settlement">
				<view class="view-total">共{{totalCount}}件，合计：<text>¥{{totalMoney}}</text></view>
				<button class="u-reset-button view-submit" @click="submitOrder(addressInfo.id,)">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addres: 2,
				salesNum: 1,
				addressInfo: [],
				shopList: [],
				cover: '',
				messageList: [],
			}
		},
		mounted() {
			
		},
		onLoad(option) {
			console.log(option);
			let goodsList = JSON.parse(decodeURIComponent(option.goodsList))
			console.log(goodsList);
			this.shopList = goodsList;
			// for (let list of this.messageList) {
			// 	this.getShopInfo(list)
			// }
			// console.log(this.messageList)
		},
		async onShow() {
			if(this.addressInfo == [] || this.addressInfo ==''){
			await this.getDefaultaddress()
			}else {
				return
			}
			let that = this
			uni.$on('updateData', function(data) {
				console.log(data.value)
				that.addressInfo = data.value
			})
		},
		computed: {
			checkNum() {
				let count = 0;
				for (let item of this.shopList) {
					count += item.shopNum;
				}
				return count;
			},
			totalPrice() {
				let total = 0;
				for (let list of this.shopList) {
					total += list.sellPrice * list.shopNum
				}
				return total;
			},
			checkTotal() {

			}
		},
		methods: {

			// 提交订单
			submitOrder() {
				let arr = []
				for (let list of this.shopList) {
					for (let item of list.carList) {
						var orderItems = {
							goodsCount: item.addNum,
							goodsId: item.goodsId,
							normValueId: item.normValueId
						};
						arr.push(orderItems);
					}
				}
				console.log(arr);



				// var arrList = []
				// for (let list of this.shopList) {
				// 	var orderItems = {
				// 		goodsCount: list.carList.addNum,
				// 		goodsId: list.carList.goodsId,
				// 		normValueId: list.carList.normValueId
				// 	};
				// 	arrList.push(orderItems);
				// }
				// console.log(arrList);
				this.postOrder(arr)
			},

			// 提交订单
			async postOrder(arrList) {
				let info = {
					addressId: this.addressInfo.id,
					orderType: this.shopList[0].carList[0].goods.storeType,
					storeId: this.shopList[0].storeId,
					couponId: this.couponId,
					totalPrice: this.totalMoney,
					orderItems: arrList
				}
				console.log(info);
				let res = await this.http.postJson('/app/order/save', info);
				if (res.code == 200) {
					this.$toast(res.msg)
					uni.navigateTo({
						url: '../school-pay-success/school-pay-success?orderId=' + res.data + '&totalPrice=' +
							this.totalMoney
					})
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取用户信息
			async getShopInfo(item) {
				let res = await this.http.get('/app/goods/info', {
					isShare: 1,
					id: item.shopId
				});
				if (res.code == 200) {
					// this.shopInfo = res.data
					var arr = res.data
					arr.shopNum = item.shopNum

					this.shopList.push(arr)
					this.cover = this.getCover(res.data.goodsImg);
					console.log(this.shopList)
				} else {
					this.$toast(res.msg);
				}
			},

			// 初始化获取默认收货地址
			async getDefaultaddress() {
				let res = await this.http.get('/app/address/default', {});
				console.log(res)
				if (res.code == 200) {
					this.addressInfo = res.data
					console.log(this.addressInfo);
				} else {
					this.$toast(res.msg);
				}
			},

			valChange(e) {
				console.log('当前值为: ' + e.value)
			}
		},
		computed: {
			// 总数量
			totalCount() {
				let count = 0;
				for (let item of this.shopList) {
					for (let cart of item.carList) {
						if (cart.check) {
							console.log(cart)
							count += cart.addNum;
						}
					}
				}
				return count;
			},

			// 总价
			totalMoney() {
				let money = 0;
				for (let item of this.shopList) {
					for (let cart of item.carList) {
						if (cart.check) {
							money += cart.goods.sellPrice * cart.addNum;
						}
					}
				}
				return money.toFixed(2);
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

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

		.view-shops {
			background-color: #F7f7f7;
			padding: 30rpx;
			padding-bottom: 110rpx !important;

			.view-shop {
				background-color: #FFFFFF;
				padding: 15rpx;
				border-radius: 10rpx;
				margin-top: 20rpx;

				&:first-child {
					margin-top: 0rpx;
				}

				.view-title {
					display: flex;
					align-items: center;

					.image-business {
						width: 39rpx;
						height: 37rpx;
					}

					.text-title {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #111111;
						margin-left: 15rpx;
						letter-spacing: 1rpx;
					}

					.image-fanhui {
						width: 9rpx;
						height: 16rpx;
						margin-left: 10rpx;
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
						color: #333333;
					}
				}

				.view-calculation {
					display: flex;
					margin-top: 40rpx;

					/deep/.u-number-box {
						margin-left: auto;
					}
				}

				.view-product {
					margin-top: 30rpx;

					.view-shangpin {
						width: 100%;
						display: flex;

						.image-shop {
							width: 180rpx;
							height: 180rpx;
						}

						.view-price {
							margin-left: auto;
							display: flex;
							margin-top: 10rpx;

							/deep/.u-number-box__minus {
								width: 42rpx;
								height: 48rpx !important;
							}

							/deep/.u-number-box__plus {
								width: 42rpx;
								height: 48rpx !important;
							}

							/deep/.u-icon__icon {
								font-size: 24rpx !important;
							}

							/deep/.u-number-box__input {
								width: 42rpx !important;
								height: 40rpx !important;
							}

							.text-numbers {
								font-size: 14px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999999;
								margin-left: auto;
							}

							.u-number-box {
								margin-left: auto;
							}

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
					}


					.view-name {
						flex-grow: 1;
						flex-shrink: 1;
						margin-left: 20rpx;

						.text-name-title {
							font-size: 28rpx;
							font-weight: 400;
							color: #333333;
						}

						.view-type {
							margin-top: 10rpx;
							display: inline-block;
							padding: 3rpx 30rpx;
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
