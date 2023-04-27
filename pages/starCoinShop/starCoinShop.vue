<template>
	<view class="view-container">
		<view :style="{background: 'url('+bg+')'}" class="bg">
			<view style="display: block; transform:translateY(70rpx);"><text style="color: aliceblue;">我的余额</text>
			</view>
			<view style="transform:translateY(70rpx);"><text style="color: aliceblue;">{{id}}</text></view>
		</view>
		<!-- <view style="color: aliceblue; position: absolute;top: 70rpx;left: 41%; z-index:1;">我的余额</view>
		<view style="color: aliceblue; position: absolute;top: 110rpx;left: 42%;z-index:1;">999</view> -->
		<!-- <image style="width: 100%;height: 230rpx;" src="../../static/images/xbbenjing.png" mode=""></image> -->
		<view class="view-list">
			<view class="view-list-content">
				<view class="biaoti">
					<image style="width: 40rpx;height: 40rpx;position: relative;top: 7rpx; right: 10rpx;" src="../../static/images/kehuan.png" mode=""></image>
					我能兑换<text  @click="uni.navigateTo({
					url:'../exchange/exchange'
				})" style="position: relative;left: 140rpx;font-size: 26rpx;color: #a3a3a3;">查看更多></text>
				</view>
				<view class="view-list-item" v-for="(item,index) in exchange.slice(0,4)" :key="index" @click="uni.navigateTo({
					url:'../starCoinShopDetails/starCoinShopDetails?id='+item.id
				})">
					<image :src="item.goodsCover" mode=""></image>
					<view class="view-info">
						<view class="view-name">
							{{item.goodsName}}
						</view>
						<view class="view-num">
							价值：{{item.originalPrice}}元
						</view>
						<view class="view-price">
							{{item.sellPrice}}<text class="text">星币</text>
						</view>
					</view>
				</view>
				<!-- <u-loadmore :status="loadmoreStatus" @loadmore="()=>{
					page++
					getList()
					return ''
				}" /> -->
			</view>
		</view>


		<view class="view-list">
			<view class="view-list-content">
				<view class="biaoti">
					<image style="width: 40rpx;height: 40rpx;position: relative;top: 7rpx; right: 10rpx;" src="../../static/images/haowu.png" mode=""></image>
					好物推荐<text  @click="uni.navigateTo({
					url:'../productList/productList'
				})" style="position: relative;left: 140rpx;font-size: 26rpx;color: #a3a3a3;">查看更多></text>
				</view>
				<view class="view-list-item" v-for="(item,index) in productList.slice(0,2)" :key="index" @click="uni.navigateTo({
					url:'../starCoinShopDetails/starCoinShopDetails?id='+item.id
				})">
					<image :src="item.goodsCover" mode=""></image>
					<view class="view-info">
						<view class="view-name">
							{{item.goodsName}}
						</view>
						<view class="view-num">
							价值：{{item.originalPrice}}元
						</view>
						<view class="view-price">
							{{item.sellPrice}}<text class="text">星币</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="view-list">
			<view class="view-list-content">
				<view class="biaoti">
					<image style="width: 40rpx;height: 40rpx;position: relative;top: 7rpx; right: 10rpx;" src="../../static/images/quanbu.png" mode=""></image>
					<text style="display: inline-block;margin-right: 50rpx;">全部商品</text>
				</view>
				<view class="view-list-item" v-for="(item,index) in productList" :key="index" @click="uni.navigateTo({
					url:'../starCoinShopDetails/starCoinShopDetails?id='+item.id
				})">
					<image :src="item.goodsCover" mode=""></image>
					<view class="view-info">
						<view class="view-name">
							{{item.goodsName}}
						</view>
						<view class="view-num">
							价值：{{item.originalPrice}}元
						</view>
						<view class="view-price">
							{{item.sellPrice}}<text class="text">星币</text>
						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				exchange:{}, //我能兑换
				// recommend:{},//好物推荐
				bg: require('../../static/images/xbbenjing.png'),
				title: '',
				id: '',
				productList: {}, //全部商品
				// value:'', //传过来的星币
			};
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
			return ''
		},
		onLoad(option) {
			this.title = option.name
			this.id = option.id
			console.log(this.id)
		},
		mounted() {

		},
		methods: {
			leftClick() {
				uni.navigateBack({})
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/userScores/scoreGoodsList", {
					pageNum: this.page,
					pageSize: this.pageSize,
					storeType: this.id,
				});
				console.log('商品列表：', res)
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.productList, res.rows);
					this.loadmoreStatus = status;
					this.productList = list
					console.log(this.productList)
					this.exchange = this.productList.filter(value => value.sellPrice<=this.id)
					console.log(111111111)
					console.log(this.exchange)
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.biaoti {
		// background-color: #4A9AFF;
		width: 100%;
		text-align: center;
		
		// margin-top: 30rpx;
		margin: 30rpx 0 20rpx 60rpx;
	}

	.bg {
		width: 100%;
		height: 230rpx;
		background-size: cover !important;
		// padding-top: var(--status-bar-height);
		text-align: center;
		border-bottom-left-radius: 5%;
		border-bottom-right-radius: 5%;
	}

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
		background-color: #ededed;
		width: 100%;
		font-family: PingFang SC;

		.view-list {
			// margin-top: -20rpx;
			// width: 100%;
			background-color: #ededed;
			// padding: 0 30rpx 30rpx 30rpx;
			// margin-bottom: 20rpx;

			.view-list-content {
				transform: translateY(-20rpx);
				border-radius: 20rpx;
				margin: auto;
				margin-bottom: 30rpx;
				width: 92%;
				display: flex;
				// justify-content: space-between;
				flex-wrap: wrap;
				// background: red;///////////////
				background: #FFFFFF;


				.view-list-item {
					margin-top: 20rpx;
					width: 50%;
					flex-shrink: 1;
					// margin-bottom: 30rpx;
					// background-color: #FFFFFF;

					image {
						width: 330rpx;
						height: 330rpx;
					}

					.view-info {
						padding: 20rpx;

						.view-price {
							font-size: 32rpx;
							font-weight: bold;
							color: #FF0000;
							line-height: 40rpx;
							float: left;
							padding: 5rpx 0 40rpx 0;

							.text {
								font-size: 24rpx;
							}
						}

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
							width: 180rpx;
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
