<template>
	<view>
		<ice-statusbar color="#ffffff"></ice-statusbar>
		<ice-navbar>
			<view class="view-navBar">
				<image class="image-left" src="../../static/images/left.png" @click="uni.navigateBack({})"></image>
				<u-search :show-action="true" actionText="搜索" v-model="val" :animation="true" @search="custom" @clear="()=>{
					searchMode = false
					val = ''
					pageNum=1
					list=[]
				}">
				</u-search>
			</view>
		</ice-navbar>
		<view class="view-history" v-if="!searchMode&&historyList.length>0">
			<view class="view-title">
				<view class="view-history-title">
					<image src="../../static/images/history.png" mode=""></image>
					<text class="text-history">历史搜索</text>
				</view>
				<image class="image-clear" @click="clearHistory" src="../../static/images/clear.png"></image>
			</view>
			<view class="view-list">
				<view class="view-item" @click="()=>{
					val=item
					pageNum=1
					list=[]
					custom()
					return ''
				}" v-for="(item,index) in historyList" :key="index">{{item}}</view>
			</view>
		</view>
		<view class="view-search-list" v-if="searchMode&&list.length>0">
			<view class="view-list-content">
				<view class="view-list-item" v-for="(item,index) in list" :key="index" @click="uni.navigateTo({
					url:'../market-product-details/market-product-details?id='+item.id
				})">
					<image :src="item?item.goodsImg.split(',')[0]:''" mode=""></image>
					<view class="view-info">
						<view class="view-name">{{item.goodsDesc}}</view>
						<view class="view-num">销量{{item.stockNum}}</view>
						<view class="view-price">
							<text class="text-price"><text class="text-label">￥</text>{{item.sellPrice}}</text>
							<text class="text-original-price">￥{{item.originalPrice}}</text>
							<image src="@/static/images/add.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore v-if="searchMode" :status="loadmoreStatus" @loadmore="()=>{
				page++
				getHistory()
				return ''
			}" />
		<view class="view-goods" v-if="!searchMode">
			<view class="view-goods-title">
				<image src="../../static/images/tuijian.png" mode=""></image>
				<text>商品推荐</text>
			</view>
			<view class="view-goods-list">
				<view class="view-goods-item" v-for="(goods,index) in recommend" :key="index" @click="()=>{
					val=goods.configValue
					pageNum=1
					list=[]
					custom()
					return ''
				}">
					{{goods.configValue}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				types: 1,
				val: '',
				historyList: [], //搜索历史
				recommend: [], //商品推荐
				list: [],
				loadmoreStatus: 'loadmore',
				pageNum: 1,
				searchMode: false,
			}
		},
		onShow() {
			this.getHistory()
			this.getRecommend()
		},
		methods: {
			chenge(ids) {
				this.types = ids
			},
			custom() {
				this.searchMode = true
				this.getList()

			},
			async getHistory() {
				let res = await this.http.get('/app/goods/goodsSearchHistory', {})
				if (res.code == 200) {
					this.historyList = res.data
				}
			},
			async clearHistory() {
				await this.$alert('清空历史记录');
				let res = await this.http.get('/app/goods/goodsDeleteSearchHistory', {});
				if (res.code == 200) {
					this.getHistory();
					this.$toast(res.msg);
				} else {
					this.$toast(res.msg);
				}
			},
			async getList() {
				this.loadmoreStatus = 'loading'
				let res = await this.http.get('/app/goods/list', {
					pageNum: this.pageNum,
					pageSize: 10,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
					goodsName: this.val,
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.pageNum, 10, this.list, res.rows)
					this.list = list
					this.loadmoreStatus = status
					this.getHistory()

				} else {
					this.$toast(res.msg);
				}
			},
			// 商品推荐
			async getRecommend() {
				let res = await this.http.post('/app/userHome/systemConfigurationList', {
					configOptionId: 184
				})
				console.log('111111111111111111', res);
				if (res.code == 200) {
					this.recommend = res.data
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 20rpx;
		max-width: 100%;

		.view-item {
			background: #F6F8F9;
			border-radius: 10rpx;
			padding: 10rpx 30rpx;
			margin-left: 20rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			margin-top: 30rpx !important;

			&:first-child {
				margin-left: 0rpx;
			}
		}
	}


	.view-history {
		margin-top: 20rpx;
		padding: 0 30rpx;
		margin-bottom: 50rpx;

		.view-history-title {
			display: flex;
			align-items: center;

			image {
				width: 34rpx;
				height: 34rpx;
			}

			text {
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}

		.view-list {
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.view-item {
				background: #F6F8F9;
				border-radius: 10rpx;
				padding: 10rpx 30rpx;
				margin-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;

				&:first-child {
					margin-left: 0rpx;
				}
			}
		}

		.view-title {
			display: flex;
			align-items: center;

			.image-clear {
				width: 20rpx;
				height: 23rpx;
				margin-left: auto;
			}
		}
	}

	.view-search-list {
		width: 100%;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		margin-top: 30rpx;


		.view-list-head {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 30rpx 0;

			.view-list-title {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
			}

			text {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}

		.view-list-content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.view-list-item {
				width: 330rpx;
				flex-shrink: 1;
				margin-bottom: 30rpx;


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
						font-weight: bold;
						color: #333333;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
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

	.view-navBar {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;

		.u-search {
			margin-left: 27rpx !important;
		}

		.image-left {
			width: 16rpx;
			height: 28rpx;
		}
	}

	.view-goods {
		padding: 30rpx;

		.view-goods-title {
			display: flex;
			align-items: center;

			image {

				width: 34rpx;
				height: 34rpx;
			}

			text {
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #333333;
				line-height: 6rpx;
			}

		}

		.view-goods-list {
			margin-top: 20rpx;
			justify-content: space-between;
			flex-wrap: wrap;
			max-width: 100%;

			display: flex;

			.view-goods-item {

				display: flex;

				height: 50rpx;
				background: #F8F8F8;
				border-radius: 25rpx;

				padding: 0 20rpx;
				font-size: 28rpx;
				color: #666666;
				line-height: 6rpx;

				align-items: center;
				justify-content: space-around;
			}
		}

	}
</style>
