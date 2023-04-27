<template>
	<view class="view-container">
		<view class="view-info">
			<view class="view-info-item">
				<!-- 订单编号:1245649841431 -->
				订单编号: {{orderInfo.orderNo}}
			</view>
			<view class="view-info-item">
				<!-- 快递公司:申通快递 -->
				快递公司: {{orderInfo.expressName}}
			</view>
		</view>
		<view class="view-step-list">
			<view class="view-step-item" v-for="(item,index) in stepList">
				<view class="view-step-icon">
					<view class="view-dot">

					</view>
					<view class="view-line" v-if="index<stepList.length-1"></view>
				</view>
				<view class="view-step-right">
					<text class="text-title">
						{{item.status}}
					</text>
					<text class="text-content">
						{{item.context}}
					</text>
					<text class="text-time">{{item.ftime}}</text>
				</view>

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				stepList: [{
					status:"已发货",
					context:"您的商品已发货",
					ftime:'2012-11-12'
				},{
					status:"已发货",
					context:"您的商品已发货",
					ftime:'2012-11-12'
				},{
					status:"已发货",
					context:"您的商品已发货",
					ftime:'2012-11-12'
				},],
				orderInfo: {},
			};
		},
		onLoad(data) {
			this.id = data.id;
		},
		onShow() {
			this.queryInfo();
			this.getOrderInfo()
		},
		methods: {
			//订单详情
			async getOrderInfo() {
				await this.http.get('/app/order/info', {
					id: this.id
				}).then(res => {
					if (res.code == 200) {
						this.orderInfo = res.data
					}else{
						this.$toast(res.msg)
					}
				})
			},
			async queryInfo() {
				// let res = await this.http.get('/insurance/app/express/queryTrack', {
				// 	orderId: this.id,
				// });
				let res = await this.http.get('/app/express/queryTrack', {
					orderId: this.id,
				});
				if (res.code == 200) {
					if (res.data.status == 200) {
						this.stepList = res.data.data;
					}
				} else {
					this.$toast(res.msg);
				}
			},
		},
	}
</script>

<style lang="scss">
	.view-container {
		background-color: #F8F8F8;

		.view-info {
			padding: 20rpx 30rpx;
			background-color: #FFFFFF;

			.view-info-item {
				font-size: 30rpx;
				font-weight: bold;
				line-height: 50rpx;
			}
		}

		.view-step-list {
			display: flex;
			flex-direction: column;
			padding: 30rpx;
		}

		.view-step-item {
			display: flex;
			flex-direction: row;
		}

		.view-step-title {
			display: flex;
			flex-direction: row;
		}

		.view-step-icon {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 15rpx;
		}

		.view-step-right {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			flex-shrink: 1;
			margin-bottom: 30rpx;

			.text-title {
				font-size: 29rpx;
				font-weight: bold;
				color: #333333;
			}

			.text-content {
				font-size: 24rpx;
				font-weight: bold;
				color: #666666;
				margin-top: 20rpx;
			}

			.text-time {
				font-size: 23rpx;
				font-weight: 500;
				color: #999999;
				margin-top: 20rpx;
			}
		}

		.view-line {
			width: 4rpx;
			flex-grow: 1;
			flex-shrink: 1;
			background: #FE7803;
		}

		.view-dot {
			width: 30rpx;
			height: 30rpx;
			background-color: #FE7803;
			border-radius: 50%;
		}
	}
</style>
