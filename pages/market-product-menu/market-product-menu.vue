<template>
	<view class="view-container">
		<view class="view-wapper">
			<u-navbar :title="title" safeAreaInsetTop fixed @rightClick="rightClick" @leftClick="leftClick">
			</u-navbar>
		</view>
		<view class="view-list">
			<view class="view-list-content">
				<view class="view-list-item" v-for="(item,index) in list" :key="index" @click="uni.navigateTo({
					url:'../market-product-details/market-product-details?id='+item.id
				})">
					<image :src="item?item.goodsImg.split(',')[0]:''" mode=""></image>
					<view class="view-info">
						<view class="view-name">{{item.goodsDesc}}</view>
						<view class="view-name">
							{{item.goodsName}}
						</view>
						<view class="view-num">
							销量{{item.stockNum}}
						</view>
						<view class="view-price">
							<text class="text-price"><text class="text-label">￥</text>{{item.sellPrice}}</text>
							<text class="text-original-price">￥{{item.originalPrice}}</text>
							<image src="@/static/images/add.png" mode=""></image>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadmoreStatus" loadingText="点击加载更多" @loadmore="()=>{
					page++
					getList()
					return ''
				}" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				list: [],
				page: 1,
				loadmoreStatus: 'loadmore',
				id: '',
			};
		},
		onShow() {
			this.getList()
		},
		onLoad(option) {
			this.title = option.name
			this.id = option.id
		},
		mounted() {

		},
		methods: {
			leftClick() {
				uni.navigateBack({})
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/goods/list", {
					pageNum: this.page,
					pageSize: 10,
					storeType: this.id,
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, 10, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}

	.view-wapper {
		width: 100%;
		height: 98rpx;
	}

	/deep/.u-navbar .uicon-arrow-left {
		color: #333333 !important;
	}

	/deep/.u-navbar__content__title {
		color: #333333 !important;
	}

	.view-container {
		width: 100%;
		font-family: PingFang SC;

		.view-list {
			width: 100%;

			padding: 30rpx;
			margin-bottom: 20rpx;
			margin-top: 50rpx;

			.view-list-content {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.view-list-item {
					width: 330rpx;
					flex-shrink: 1;
					margin-bottom: 30rpx;
					background-color: #FFFFFF;

					image {
						width: 330rpx;
						height: 330rpx;
					}

					.view-info {
						padding: 20rpx;

						.view-name {
							width: 100%;
							font-size: 28rpx;
							font-weight: bold;
							color: #333333;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							margin-bottom: 10rpx;
						}

						.view-num {
							width: 140rpx;
							height: 34rpx;
							background: rgba(74, 154, 255, 0.05);
							border: 1px solid #4A9AFF;
							border-radius: 4rpx;
							font-size: 24rpx;
							font-weight: bold;
							color: #4A9AFF;
							line-height: 30rpx;
							text-align: center;
							margin-bottom: 10rpx;
						}

						.view-price {
							display: flex;
							font-weight: bold;
							justify-content: space-between;
							align-items: flex-end;

							.text-price {
								font-size: 28rpx;
								color: #FF0000;

								.text-label {
									font-size: 24rpx;
								}
							}

							.text-original-price {
								font-size: 24rpx;
								text-decoration: line-through;
								color: #CCCCCC;
								margin-right: 33rpx;
							}

							image {
								width: 32rpx;
								height: 32rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
