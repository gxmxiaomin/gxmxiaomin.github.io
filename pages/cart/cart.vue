<template>
	<view>
		<!-- 顶部导航 -->
		<view class="view-nav-bar">
			<view class="view-nav">
				<image src="../../static/images/left.png" mode="" @click="uni.navigateBack({})"></image>
				<text class="text-title">购物车</text>
				<text class="text-edit" @click="isEdit = !isEdit">{{shopList.length>0?(isEdit?'完成':'编辑'):''}}</text>
			</view>
		</view>

		<view class="view-space"></view>

		<!-- 购物车商品 -->
		<view class="page" v-if="shopList.length>0">
			<view class="view-block" v-for="(item,shopIndex) in shopList" :key="shopIndex">

				<!-- 店铺 -->
				<view class="view-title">
					<image @click="clickStore(item)"
						:src="item.check?'../../static/images/check.png':'../../static/images/nocheck.png'"
						class="image-check"></image>
					<image class="image-shops" src="../../static/images/dianpu.png"></image>
					<text class="">{{item.storeName}}</text>
					<image class="image-right" src="../../static/images/right.png"></image>
				</view>

				<!-- 商品 -->
				<view class="view-item" v-for="(goods,cartIndex) in item.carList" :key="cartIndex" v-if="goods.goods">
					<image :src="goods.check?'../../static/images/check.png':'../../static/images/nocheck.png'"
						class="image-check" @click="clickGoods(item,goods)"></image>
					<image :src="goods.goods?goods.goods.goodsImg.split(',')[0]:''" class="image-cover"></image>
					<view class="view-right">
						<text class="text-name u-line-2">
							{{goods.goods.goodsDesc}}
						</text>
						<view class="view-tpye">
							<text class="text-spec"
								v-for="(spec,i) in goods.normValue">{{spec.normName}}:{{spec.normValue}}</text>
						</view>
						<view class="view-price-box">
							<text class="text-price">￥{{goods.goods.sellPrice}}</text>
							<u-number-box class="number-box" v-model="goods.addNum" :min="1" @change="(value)=>{
								update(goods.id,value.value)
							}"></u-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 购物车·空 -->
		<view class="view-no-data" v-if="shopList.length<=0">
			<image src="../../static/images/no_data.png" class="image-no-data"></image>
			<text class="text-no-data">空空如也~</text>
		</view>

		<!-- 底部栏 -->
		<view class="view-footer" v-if="shopList.length>0">
			<view class="view-all-select" @click="clickAll">
				<image :src="isAllSelect?'../../static/images/check.png':'../../static/images/nocheck.png'"
					class="image-check"></image>
				<text class="text-all-check">全选</text>
			</view>
			<view class="flex-grow"></view>
			<text v-if="!isEdit" class="text-label">共{{totalCount}}件，合计：</text>
			<text v-if="!isEdit" class="text-money">￥{{totalMoney}}</text>
			<button v-if="!isEdit" class="u-reset-button button-pay" @click="submit_order()">提交订单</button>
			<button @click="deletes()" v-if="isEdit" class="u-reset-button button-delete">删除</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit: false, // 是否编辑
				shopList: [], // 购物车列表
				allCheck: false, // 是否全选
				shopClick: '',
			};
		},
		onShow() {
			this.getCartList(); // 获取购物车列表
		},
		methods: {
			// 获取购物车列表
			async getCartList() {
				let res = await this.http.get('/app/car/list');
				if (res.code == 200) {
					for (let item of res.data) {
						this.$set(item, 'check', false)
						for (let childItem of item.carList) {
							if (childItem) {
								this.$set(childItem, 'check', false)
							}
						}
					}
					this.shopList = res.data;
					console.log('购物车列表:', this.shopList)
				} else {
					// this.$toast(res.msg);
					this.$toast('用户信息异常');
				}
			},

			// 点击店铺
			async clickStore(store) {
				console.log(store);
				store.check = !store.check;
				for (let item of store.carList) {
					if (store.check) {
						item.check = true;
					} else {
						item.check = false;
					}
				}
			},

			// 点击商品
			async clickGoods(store, goods) {
				console.log(store);
				console.log(goods);
				goods.check = !goods.check;
				let isAll = store.carList.every((item, index) => {
					if (item.check) {
						return true
					} else {
						return false
					}
				})
				if (isAll) {
					store.check = true;
				} else {
					store.check = false;
				}
			},

			async update(id, count) {
				return;
			},

			clickAll() {
				this.allCheck = !this.allCheck
				if (!this.allCheck) {
					for (let item of this.shopList) {
						for (let cart of item.carList) {
							cart.check = false;
						}
						item.check = false;
					}
				} else {
					for (let item of this.shopList) {
						for (let cart of item.carList) {
							cart.check = true;
						}
						item.check = true;
					}
				}
			},

			// 提交订单
			async submit_order() {

				let newArr = []
				this.shopList.forEach(item => {
					newArr.push({
						carList: item.carList,
						storeId: item.storeId,
						storeImg: item.storeImg,
						storeName: item.storeName
					})
				});
				newArr.map(n => n.carList = n.carList.filter(i => i.check));

				let goodsArr = []
				newArr.forEach(item => {
					if (item.carList.length !== 0) {
						goodsArr.push({
							carList: item.carList,
							storeId: item.storeId,
							storeImg: item.storeImg,
							storeName: item.storeName
						})
					}
				});
				console.log('已选中数组:', goodsArr);
				let isSelect = goodsArr.every(item => item.carList.length == 0)
				console.log(isSelect);
				if (isSelect) {
					this.$toast('至少选择一项')
					return
				}
				uni.navigateTo({
					url: '../cart-order/cart-order?goodsList=' + encodeURIComponent(JSON.stringify(goodsArr))
				})
			},

			// 删除商品
			async deletes() {
				let deleteArr = []
				for (let item of this.shopList) {
					for (let cart of item.carList) {
						if (cart.check) {
							deleteArr.push(cart.id);
						}
					}
				}
				console.log(deleteArr);
				if (deleteArr.length == 0) {
					this.$toast("请至少选择一项");
					return;
				}
				let res = await this.http.postJson('/app/car/delete', deleteArr)
				console.log('删除商品:', res);
				if (res.code == 200) {
					this.$toast("删除成功");
					this.getCartList();
				} else {
					this.$toast(res.msg);
				}
			},
		},
		computed: {
			// 是否全选
			isAllSelect() {
				return this.shopList.every((item, index) => {
					if (item.check) {
						return true
					} else {
						return false
					}
				})
			},

			checkIdList() {
				let idList = [];
				for (let item of this.shopList) {
					for (let cart of item.carList) {
						if (cart.check) {
							idList.push({
								shopId: cart.goods.id,
								shopNum: cart.addNum
							});
						}
					}
				}
				return idList;
			},

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


			// allCheck() {
			// 	let check = true;
			// 	for (let item of this.shopList) {
			// 		for (let cart of item.carList) {
			// 			if (!cart.check) {
			// 				check = false;
			// 			}
			// 		}
			// 	}
			// 	return check;
			// 	console.log(check)
			// },
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-nav-bar {
		padding-top: var(--status-bar-height);
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;

		.view-nav {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 88rpx;
			padding: 0 30rpx;
			position: relative;

			image {
				width: 18rpx;
				height: 30rpx;
			}

			.text-title {
				font-size: 34rpx;
				font-weight: bold;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.text-edit {
				font-size: 30rpx;
			}
		}
	}

	.view-space {
		margin-top: var(--status-bar-height);
		height: 88rpx;
	}

	.button-edit {
		margin-right: 30rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #FF454A;
	}

	/deep/.u-navbar__content__right__text {
		color: #333333 !important;
	}

	/deep/.u-icon__icon {
		color: #333333 !important;
	}

	/deep/.u-navbar__content__title {
		color: #333333 !important;
	}

	.page {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		padding-bottom: 120rpx !important;

		.view-block {
			background-color: #FFFFFF;
			padding: 30rpx;
			margin-top: 20rpx;
			border-radius: 10rpx;

			.view-title {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.image-check {
					width: 31rpx;
					height: 31rpx;
				}

				.image-shops {
					width: 39rpx;
					height: 37rpx;
					margin: 0 20rpx;
				}

				.image-right {
					width: 12rpx;
					height: 19rpx;
					margin-left: 20rpx;
				}
			}

			.view-item {
				background: #FFFFFF;
				border-radius: 13rpx;
				margin-bottom: 30rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				position: relative;

				.image-check {
					width: 31rpx;
					height: 31rpx;
				}

				.image-cover {
					width: 200rpx;
					height: 200rpx;
					margin: 0 20rpx;
					border-radius: 10rpx;
				}

				.view-right {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.text-name {
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
						margin-bottom: 10rpx;
					}

					.view-tpye {
						display: flex;
						align-items: center;
						margin: 5rpx 0 20rpx;

						.text-spec {
							padding: 3rpx 16rpx;
							background: rgba(74, 154, 255, 0.1);
							border-radius: 999rpx;
							font-size: 20rpx;
							color: #4A9AFF;
						}
					}

					.view-price-box {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.text-price {
							font-size: 32rpx;
							font-weight: bold;
							color: #EA4335;
						}

					}
				}
			}
		}

	}

	.view-no-data {
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;

		.image-no-data {
			width: 350rpx;
			height: 220rpx;
			margin-top: 180rpx;
			align-self: center;
		}

		.text-no-data {
			margin-top: 60rpx;
			align-self: center;
			font-size: 32rpx;
			font-weight: 500;
			color: #999999;
		}

		.view-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin-top: 50rpx;

			.view-indicator {
				margin-top: -8rpx;
				height: 8rpx;
				background: #00CCCE;
			}
		}

		.view-goods-list {
			display: flex;
			flex-wrap: wrap;

			.view-item {
				width: 330rpx;
				margin-right: 30rpx;
				background: #FFFFFF;
				margin-top: 30rpx;

				&:nth-child(2n) {
					margin-right: 0;
				}

				.image-avatar {
					width: 330rpx;
					height: 330rpx;
					border-radius: 20rpx 20rpx 0rpx 0rpx;
				}

				.text-name {
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					line-height: 54rpx;
					padding-left: 20rpx;
				}

				.view-price {
					font-size: 32rpx;
					font-weight: bold;
					color: #FF5348;
					line-height: 54rpx;
					padding-left: 20rpx;
				}
			}
		}

	}


	.view-footer {
		height: 98rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 30rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;

		.view-all-select {
			display: flex;
			align-items: center;
		}

		.image-check {
			width: 35rpx;
			height: 35rpx;
			margin-right: 15rpx;
		}

		.text-all-check {
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
		}

		.text-label {
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
		}

		.text-money {
			font-size: 37rpx;
			font-weight: bold;
			color: #FE5C7D;
		}

		.button-pay {
			width: 240rpx;
			height: 80rpx;
			background-color: #4A9AFF;
			border-radius: 40rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;
			margin-left: 30rpx;
			line-height: 80rpx;
		}

		.button-delete {
			width: 233rpx;
			height: 80rpx;
			background: #4A9AFF;
			border-radius: 40rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 80rpx;
		}
	}
</style>
