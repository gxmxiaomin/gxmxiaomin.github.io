<template>
	<view class="view-container">
		<view class="view-order-list">
			<view class="view-order-item" v-for="(item,index) in orderLists" :key="index" @click="uni.navigateTo({
				url:'../after-the-details/after-the-details?id='+item.id
			})">
				<view class="view-head">
					<view class="view-order-id">
						<image src="../../static/images/dianpu.png" mode=""></image>
						{{item.orderItems[0].storeName}}
					</view>
					<view class="view-status" v-for="after in  item.orderItems">
						<text v-if="after.afterSale==0" class="">正常</text>
						<text v-if="after.afterSale==1" class="">已评价</text>
						<text v-if="after.afterSale==2" class="">待处理</text>
						<text v-if="after.afterSale==3" class="">已拒绝</text>
						<text v-if="after.afterSale==4" class="">已同意</text>
					</view>
				</view>
				<view class="view-order-item-child">
					<view class="view-body">
						<image class="image-item-img" :src="item?item.orderItems[0].goodsCoverImg.split(',')[0]:''" mode=""></image>
						<view class="view-info">
							<view class="view-top">
								<view class="view-name">
									{{item.orderItems[0].goodsName}}
								</view>
								<view class="view-price">
									￥{{item.orderItems[0].sellingPrice}}
								</view>
							</view>
							<view class="view-spec">
								<view class="" v-for="list in item.normValue">{{list.normName}}{{list.normValue}}</view>
								<view class="view-num">
									x{{item.orderItems[0].goodsCount}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="view-item-total">
					共{{item.orderItems[0].goodsCount}}件，共计<text>￥{{item.orderItems[0].sellingPrice*item.orderItems[0].goodsCount}}</text>
				</view>
				<view class="view-details">
					<text>查看详情</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderLists:[],
				orderList: []
			};
		},
		onShow() {
			this.getorderList()
		},
		methods:{
			async getorderList(){
				let res=await this.http.get('/app/order/refundOrderList',{
					type:1,
					pageSize:10,
					pageNum:1,
					userType:2,
				});
				if(res.code==200){
					this.orderLists = res.rows
					this.cover=this.getCover(res.rows.goodsImg);
				}else{
					// this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-container {

		.view-order-list {
			background: #F8F8F8;
			color: #333333;
			padding: 30rpx 0;

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
					.view-order-id{
						display: flex;
						align-items: center;
						image{
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
	.view-details{
		margin-right: 0;
		margin-bottom: 10rpx;
		text-align: right;
		text{
			padding: 0 10rpx;
			height: 52rpx;
			background: #4A9AFF;
			border-radius: 26rpx;
			
			font-size: 28rpx;
			color: #FFFFFF;
			line-height: 6rpx;
		}
	}
</style>
