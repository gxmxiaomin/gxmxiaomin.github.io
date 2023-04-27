<template>
	<view class="view-container">
		<view class="view-skilltime">
			<view class="view-skillBlocks" v-for="(item,index) in timeList" :key="index" v-show="item.timeType!==0"
				:class="timeId==item.id&&item.timeType===2?'view-skillBlock':''" @click="selects(index)">{{item.startTime}}<text
					v-text="item.timeType==2?'正在疯抢':'即将开始'"></text></view>
		</view>
		<u-tabs v-if="classList.length!==0" :list="classList" :activeStyle="{color: '#4A9AFF',fontSize:'28rpx'}"
			:inactiveStyle="{color:'#666666',fontSize:'28rpx'}" @click="xunaze">
		</u-tabs>
		<view class="view-inner">
			<view class="view-list-item" v-for="(item,index) in shopList" :key="index" @click="uni.navigateTo({
				url:'../seckill-details/seckill-details?id='+item.id
			})">
				<image :src="item.image" mode=""></image>
				<view class="view-info">
					<view class="view-name">
						{{item.title}}
					</view>
					<view class="view-progress">
						<u-line-progress height="10" :percentage="item.remainingStockRatio" activeColor="#4A9AFF"
							:showText="false">
						</u-line-progress>
						<text>已抢{{item.remainingStockRatio}}%</text>
					</view>
					<view class="view-price">
						<text>￥{{item.price}}</text>
						<text class="original-price">￥{{item.otPrice}}</text>
						<view class="view-status" v-text="item.remainingStockRatio>=100?'已抢完':'马上抢'"></view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" loadmoreText="点击加载更多" @loadmore="()=>{
				pageNum++
				getshopList()
			}" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeId: '', //选择的时段id
				list1: [],
				classList: [],
				classId: '',
				timeList: [],
				shopList: [],
				pageNum: 1,
				loadmoreStatus: 'loadmore'

			};
		},
		async onShow(){
			await this.getTime()
			await this.getList()
			await this.getshopList()
		},
		methods: {
			// 选择时间段
			async selects(index) {
				await this.getTime()
				console.log(index)
				let item = this.timeList[index]
				if (item.timeType === 1) {
					this.$toast('还未开始！')
					return
				}
				this.timeId = item.id
				this.pageNum = 1
				this.shopList = []
				this.getshopList()
			},
			xunaze(e) {
				this.classId = e.id
				this.pageNum = 1
				this.shopList = []
				this.getshopList()
			},
			// 秒杀时间段
			async getTime() {
				let res = await this.http.get('/app/storeSeckillConfig/listAll', {});
				if (res.code == 200) {
					this.timeList = res.data
					this.timeId = res.data.find(item => item.timeType===2)?.id || ''
				} else {
					this.$toast(res.msg)
				}
			},
			// 秒杀分类
			async getList() {
				let res = await this.http.get('/app/seckillGoodsType/list', {});
				if (res.code == 200) {
					this.classList = res.data
					this.classId = res.data[0].id
				} else {
					this.$toast(res.msg)
				}
			},
			// 商品列表
			async getshopList() {
				this.loadmoreStatus = 'loading'
				let res = await this.http.get('/app/yxStoreSeckill/list', {
					timeId: this.timeId,
					goodsTypeId: this.classId,
					pageNum: this.pageNum,
					pageSize: 10
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.pageNum, 10, this.shopList, res.data)
					this.shopList = list
					this.loadmoreStatus = status
				} else {
					this.$toast(res.msg)
				}
			},

		}

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}


	.view-container {

		.view-skilltime {
			display: flex;
			overflow-x: scroll;
			padding: 0rpx 30rpx;
			background-color: #FFFFFF;
			border-bottom: 2rpx solid #EFEFEF;

			.view-skillBlocks {
				height: 60rpx;
				display: inline-block;
				color: #999999;
				background-color: #F1F2F1;
				border-radius: 10rpx 10rpx 0px 0px;
				line-height: 60rpx;
				text-align: center;
				padding: 0rpx 30rpx;
				margin-right: 20rpx;
				font-size: 30rpx;
			}

			.view-skillBlock {
				height: 60rpx;
				display: inline-block;
				color: #FFFFFF;
				background: #4A9AFF;
				border-radius: 10rpx 10rpx 0px 0px;
				line-height: 60rpx;
				text-align: center;
				padding: 0rpx 30rpx;
				font-size: 30rpx;
			}
		}

		.u-tabs {
			background-color: #FFFFFF;
		}

		.view-inner {
			background-color: #F7F7F7;
			padding: 30rpx 30rpx;

			.view-banner {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-size: 100%;
				background-repeat: no-repeat;
				padding: 30rpx;
				margin-bottom: 30rpx;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
				}

				.text-1 {
					font-size: 36rpx;
					font-weight: 500;
					color: #FFFFFF;
					flex-grow: 1;
				}

				.text-2 {
					font-size: 28rpx;
					font-weight: 400;
					color: #FFFFFF;
				}

				.view-banner-info {
					display: flex;
					font-size: 32rpx;
					font-family: Impact;
					color: #FFFFFF;


					text {
						display: block;
						width: 80rpx;
						height: 40rpx;
						background: #F7F7F7;
						border-radius: 20rpx;
						color: #E73B14;
						text-align: center;
						line-height: 40rpx;
						margin: 0 7rpx;
					}
				}

			}

			.view-list-item {
				width: 100%;
				padding: 30rpx;
				display: flex;
				background-color: #FFFFFF;
				margin-bottom: 30rpx;
				border-radius: 10rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}

				.view-info {
					flex-grow: 1;
					flex-shrink: 1;
					display: flex;
					flex-direction: column;

					.view-name {
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						color: #333333;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						margin-bottom: 20rpx;
					}

					.view-progress {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 20rpx;

						.u-line-progress {
							flex-grow: 1;
							flex-shrink: 1;
						}

						text {
							margin-left: 20rpx;
							font-size: 24rpx;
							color: #4A9AFF;
						}
					}

					.view-price {
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;

						text {
							font-size: 36rpx;
							font-weight: 600;
							color: #FF0000;
						}

						.original-price {
							font-size: 20rpx;
							text-decoration: line-through;
							color: #999999;
						}

						.view-status {
							position: relative;
							left: 30rpx;
							width: 159rpx;
							height: 50rpx;
							background: linear-gradient(90deg, #4A9AFF 0%, #3388F2 100%);
							border-radius: 25rpx 0px 0px 25rpx;
							font-size: 28rpx;
							font-weight: 600;
							color: #FFFFFF;
							line-height: 50rpx;
							text-align: center;
						}
					}

				}
			}
		}
	}
</style>
