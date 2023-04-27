<template>
	<view class="view-container">
		<u-tabs class="tabs" :list="tabList" @click="toogleTab" :current="tabIndex"></u-tabs>
		<view class="view-order-list">
			<view class="view-order-item" v-for="(item,index) in orderList" :key="index">
				<view class="view-head">
					<view class="view-order-id">
						<image src="../../static/images/dianpu.png" mode=""></image>
						{{item.storeName}}
					</view>
					<view class="view-status">
						<text v-if="item.orderStatus==0">待付款</text>
						<text v-if="item.orderStatus==1">待发货</text>
						<text v-if="item.orderStatus==2">待收货</text>
						<text v-if="item.orderStatus==3">待评价</text>
						<text v-if="item.orderStatus==5">已完成</text>
						<text v-if="item.orderStatus==4">已取消</text>
					</view>
				</view>
				<view class="view-order-item-child" v-for="(childItem,childIndex) in item.orderItems" :key="childIndex">
					<view class="view-body" @click="uni.navigateTo({
					url:'../my-order-details/my-order-details?id='+item.id
				})">
						<image class="image-item-img" :src="childItem?childItem.goodsCoverImg.split(',')[0]:''" mode="">
						</image>
						<view class="view-info">
							<view class="view-top">
								<view class="view-name">
									{{childItem.goodsName}}
								</view>
								<view class="view-price">
									￥{{childItem.sellingPrice}}
								</view>
							</view>
							<view class="view-spec">
								<!-- {{childItem.spec}} -->
								<view class="view-num">
									x{{childItem.goodsCount}}
								</view>
							</view>
						</view>
					</view>
					<view class="view-item-total">
						共{{childItem.goodsCount}}件，共计<text>￥{{item.totalPrice}}</text>
					</view>

				</view>
				<view class="view-buttons">
					<view class="view-button" v-if="item.orderStatus==4||item.orderStatus==5"
						@click="postDelete(item.id)">
						删除订单
					</view>

					<view class="view-button" v-if="item.orderStatus==3" @click="uni.navigateTo({
						url:'../my-order-details/my-order-details?id='+item.id
					})">去评价</view>


					<view class="view-button" v-if="item.orderStatus==2" @click="uni.navigateTo({
						url:'../express/express?id='+item.id
					})">物流信息</view>
					<view class="view-button" v-if="item.orderStatus==2" @click="uni.navigateTo({
						url:'../my-order-details/my-order-details?id='+item.id
					})">确定收货</view>


					<view class="view-button" v-if="item.orderStatus==0 || item.orderStatus==1"
						@click="cancelOrder(item.id)">取消订单</view>
					<view class="view-button" v-if="item.orderStatus==1" @click="uni.navigateTo({
						url:'../my-order-details/my-order-details?id='+item.id
					})">
						提醒发货
					</view>
					<view class="view-button" v-if="item.orderStatus==0" @click="uni.navigateTo({
						url:'../my-order-details/my-order-details?id='+item.id
					})">付款</view>
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" loadmoreText="点击加载更多" @loadmore="()=>{
			pageNum++
			getOrderList()
			return ''
			}" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				tabList: [{
					name: '全部',
				}, {
					name: '待付款'
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				}, {
					name: '待评价'
				}],
				orderList: [],
				pageNum: 1,
				loamdmoreStatus: 'loadmore'
			};
		},
		onLoad(options) {
			this.tabIndex = Number(options.index)
		},
		onShow() {
			this.getOrderList(0)
		},
		async mounted() {
			await this.getOrderList(this.tabIndex)
		},
		methods: {
			// 取消订单
			async cancelOrder(ids) {
				let res = await this.http.postJson('/app/order/cancelOrder', {
					id: ids
				});
				if (res.code == 200) {
					this.$toast('已取消订单')
					this.getOrderList(0)
				} else {
					this.$toast(res.msg);
				}
			},
			toogleTab(item) {
				this.getOrderList(item.index)
			},
			// 删除订单
			async postDelete(ids) {
				let res = await this.http.postJson('/app/order/delete', {
					id: ids
				})
				if (res.code == 200) {
					this.$toast('已删除')
					this.getOrderList(0)
				} else {
					this.$toast(res.msg)
				}
			},
			// 获取订单列表
			async getOrderList(index) {
				index = index === 0 ? "" : index - 1
				let data = {
					pageNum: this.pageNum,
					pageSize: 10,
					orderStatus: index,
					orderType: 1
				}
				console.log(data);
				let res = await this.http.get("/app/order/list", data)
				console.log(res)
				if (res.code === 200) {
					let {
						status,
						list
					} = await this.$resPage(this.pageNum, 10, this.orderList, res.rows)
					this.orderList = list
					this.loadmoreStatus = status
				} else {
					// this.$toast(res.msg);
				}
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.view-container {

		.tabs {
			width: 100%;
			position: fixed;
			z-index: 10;
			background-color: #fff;

			/deep/.u-tabs__wrapper__scroll-view-wrapper {
				overflow-x: auto !important;
			}
		}

		.view-order-list {
			color: #333333;
			padding: 118rpx 0 30rpx;

			.view-order-item {
				background: #FFFFFF;
				margin-bottom: 30rpx;
				display: flex;
				flex-direction: column;
				padding: 0 30rpx;
				border-radius: 40rpx;

				.view-head {
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin-bottom: 40rpx;
					font-size: 28rpx;
					font-weight: 500;
					margin-top: 30rpx;

					.view-order-id {
						display: flex;
						align-items: center;

						image {
							margin-right: 13rpx;
							width: 27rpx;
							height: 28rpx;
						}

					}

					.view-status {
						font-size: 28rpx;
						font-weight: 500;
						color: #00CCCE;
					}
				}

				.view-order-item-child {
					.view-body {
						width: 100%;
						display: flex;
						margin-bottom: 20rpx;

						.image-item-img {
							width: 200rpx;
							height: 200rpx;
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
									width: 300rpx;
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
								margin-left: auto;
							}
						}
					}
				}

				.view-item-total {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
					margin-bottom: 20rpx;
					text-align: right;

					text {
						font-size: 26rpx;
						color: #333333;
					}
				}

				.view-buttons {
					width: 100%;
					display: flex;
					justify-content: flex-end;
					margin-bottom: 20rpx;

					.view-button {
						width: 140rpx;
						height: 48rpx;
						background: #FFFFFF;
						border: 2rpx solid #999999;
						border-radius: 24rpx;
						text-align: center;
						line-height: 44rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #999999;
						margin-left: 30rpx;
					}
				}
			}
		}
	}
</style>
