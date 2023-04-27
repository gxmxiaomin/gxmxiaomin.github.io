<template>
	<view class="view-container">
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
						<!-- <view class="view-num">
							销量{{item.stockNum}}
						</view> -->
						<view class="view-price">
							<text class="text-price"><text class="text-label">￥</text>{{item.sellPrice}}</text>
							<text class="text-original-price">月售{{item.stockNum}}件</text> <!-- originalPrice -->
							<image src="@/static/images/ddd.png" mode=""></image>
						</view>
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
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				loadmoreStatus: 'loadmore',
				id: '',
				pageSize:20,
			};
		},
		onShow() {
			this.getList()
		},
		onReachBottom(){
			this.page++
			this.getList()
		},
		mounted() {

		},
		methods: {
			async getList() {
				this.loadmoreStatus = 'loading'
				let res = await this.http.get('/app/goods/list', {
					pageNum: this.page,
					pageSize: this.pageSize,
					isShowQuality: 0,
					storeType:1
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
					console.log(this.list)
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

	.view-container {
		background: #f7f7f7;
		width: 100%;
		font-family: PingFang SC;

		.view-list {
			width: 100%;
			padding: 30rpx;
			margin-bottom: 20rpx;

			.view-list-content {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
			
				.view-list-item {
					border-radius: 20rpx;
					background: #FFF;
					width: 330rpx;
					flex-shrink: 1;
					margin-bottom: 30rpx;
			
					.view-img {
						width: 330rpx;
						height: 330rpx;
						overflow: hidden;
					}
			
					image {
						width: 330rpx;
						height: 330rpx;
						border-radius: 10rpx;
					}
			
					.view-info {
						padding: 20rpx;
			
						.view-name {
							width: 100%;
							font-size: 28rpx;
							// font-weight: bold;
							color: #333333;
							// overflow: hidden;
							// white-space: nowrap;
							// text-overflow: ellipsis;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							margin-bottom: 10rpx;
						}
			
						.view-num {
							width: 120rpx;
							height: 30rpx;
							background: rgba(74, 154, 255, 0.05);
							border: 1px solid #4A9AFF;
							border-radius: 4rpx;
							font-size: 20rpx;
							font-weight: bold;
							color: #4A9AFF;
							line-height: 30rpx;
							text-align: center;
							margin: 20rpx 0rpx;
						}
			
						.view-price {
							display: flex;
							font-weight: bold;
							justify-content: space-between;
							align-items: flex-end;
			
							.text-price {
								font-size: 36rpx;
								color: #ff5539;
								font-weight: 200;
			
								.text-label {
									font-size: 24rpx;
								}
							}
			
							.text-original-price {
								font-size: 22rpx;
								// text-decoration: line-through;
								color: #CCCCCC;
								margin-right: 33rpx;
							}
			
							image {
								width: 32rpx;
								height: 12rpx;
								margin-bottom: 10rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
