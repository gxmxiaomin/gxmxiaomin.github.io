<template>
	<view class="view-container">
		<view class="view-list-item" v-for="(item,index) in shopList" :key="index" @click="uni.navigateTo({
			url:'../market-shop-details/market-shop-details?id='+item.id
		})">
			<image :src="item.storeImg" mode=""></image>
			<view class="view-info">
				<view class="view-name">
					{{item.storeName}}
					<view class="view-level">
						Lv.5
					</view>
				</view>
				<view class="view-num">
					月销{{item.volume}}
				</view>
				<view class="view-text">
					<view class="view-desc">
						{{item.storeDesc}}
					</view>
					<view class="view-location">
						距你1.5km
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="loadmoreStatus" nomoreText="—— 这是我的底线 ——" @loadmore="()=>{
			page++
			getShopList()
			return ''
		}" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopList: [],
			};
		},
		onShow() {
			this.getShopList()
		},
		methods: {
			async getShopList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/goodsStore/list", {
					pageNum: this.page,
					pageSize: this.pageSize,
					isQualityStore: ''
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.shopList, res.rows);
					this.loadmoreStatus = status;
					this.shopList = list;
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-container {
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.view-list-item {
			width: 330rpx;
			flex-shrink: 1;
			margin-bottom: 40rpx;
			width: 100%;
			display: flex;

			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 20rpx;
			}

			.view-info {
				width: calc(100% - 160rpx);
				padding: 16rpx;

				.view-name {
					width: 100%;
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-bottom: 10rpx;
					display: flex;
					align-items: center;

					.view-level {
						width: 66rpx;
						height: 28rpx;
						background: #4A9AFF;
						border-radius: 14rpx;
						font-size: 20rpx;
						font-weight: bold;
						margin-left: 15rpx;
						color: #FFFFFF;
						text-align: center;
						line-height: 26rpx;
					}
				}

				.view-num {
					width: 180rpx;
					height: 30rpx;
					background: rgba(74, 154, 255, 0.05);
					border: 1px solid #4A9AFF;
					border-radius: 4rpx;
					font-size: 20rpx;
					color: #4A9AFF;
					line-height: 28rpx;
					text-align: center;
					margin-bottom: 10rpx;
				}

				.view-text {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					font-weight: bold;
					color: #666666;

					.view-desc {
						flex-shrink: 1;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.view-location {
						color: #999999;
						margin-left: 30rpx;
					}
				}
			}
		}
	}
</style>
