<template>
	<view>
		<view class="box" @click="$emit('goView')">
			<view class="text-title">
				<text>订单时间：{{item.orderFormtime}}</text>
				<text :style="{color:(state == '已完成'?'#aaa':'#378EFD')}">{{state}}</text>
			</view>
			<view class="thing">
				<view class="">
					<image v-for="i in 6" :src="item.img" mode=""></image>
				</view>
			</view>
			<view class="text-title-2">
				<text>订单编号:{{item.orderNumber}}</text>
				<text @click.stop="skip">{{orderForm}}</text>
				<text @click.stop="click">{{cancel}}</text>
			</view>
			<view style="height: 1rpx;background-color: #f3f3f3;width: 95%;margin: auto;margin-top: 10rpx;"></view>
			<view class="merchant">
				<image :src="item.shop" mode=""></image>
				<text>{{item.shopName}}</text>
			</view>
			<view style="height: 20rpx;"></view>

			<u-popup :show="show" :round="8" mode="center" @close="close" @open="open">
				<view class="popup">
					<view class="title"> <text>提示</text>
						<image @click="show = false" src="../../../../static/images/icon_close.png" mode=""></image>
					</view>
					<view class="text">
						{{popup}}
					</view>
					<view class="btn">
						<view @click="show = false">取消</view>
						<view>确定</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item'],
		data() {
			return {
				show: false,
			}
		},

		methods: {
			click() {
				if (this.item.state == 4) {
					uni.navigateTo({
						url:''
					})
				} else {
					this.show = true
				}
			},
			skip(){
				if(this.item.state == 4){
					uni.navigateTo({
						url:'./comment'
					})
				}
			}
		},

		computed: {
			state() {
				if (this.item.state == 1) {
					return '待付款'
				}
				if (this.item.state == 2) {
					return '待配送'
				}
				if (this.item.state == 3) {
					return '预计12:30送达'
				}
				if (this.item.state == 4) {
					return '已完成'
				}
			},

			orderForm() {
				if (this.item.state == 1) {
					return '去付款'
				}
				if (this.item.state == 2) {
					return '崔配送'
				}
				if (this.item.state == 3) {
					return '联系骑手'
				}
				if (this.item.state == 4) {
					return '去评价'
				}
			},

			popup() {
				if (this.item.state == 1) {
					return '是否确定取消订单'
				}
				if (this.item.state == 2) {
					return '该订单待配送是否确定要取消订单'
				}
				if (this.item.state == 3) {
					return '该订单正在配送中不能取消订单'
				}
			},
			
			cancel() {
				if(this.item.state == 4) {
					return '再来一单'
				} else {
					return '取消订单'
				}
			}
		}
	}
</script>

<style lang="scss">
	.box {
		width: 95%;
		margin: auto;
		border-radius: 15rpx;
		margin-top: 30rpx;
		background-color: #FFF;

		.text-title {
			text {
				&:nth-child(1) {
					color: #aaa;
					font-size: 26rpx;
					display: inline-block;
					margin: 20rpx 0 0 20rpx;
				}

				&:nth-child(2) {
					display: inline-block;
					color: #378EFD;
					float: right;
					margin: 20rpx 20rpx 0 0;
					font-size: 28rpx;
					font-weight: Medium;
				}
			}
		}

		.thing {
			view {
				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 15rpx;
					margin: 20rpx 0 0 20rpx;
				}

				// overflow-x: auto;
				// display: -webkit-box;
				// -webkit-overflow-scrolling: touch;
				overflow-x: auto;
				display: -webkit-box;
				-webkit-overflow-scrolling: touch;
				margin: 0.1rem 0.1rem;
				display: flex;
			}
		}

		.text-title-2 {
			margin-top: 50rpx;

			text {
				&:nth-child(1) {
					color: #aaa;
					font-size: 26rpx;
					display: inline-block;
					margin-left: 20rpx;
				}

				&:nth-child(2) {
					display: inline-block;
					padding: 5rpx 20rpx;
					color: #FFF;
					background-color: #378efd;
					border-radius: 20rpx;
					float: right;
					font-size: 24rpx;
					margin-right: 20rpx;
				}

				&:nth-child(3) {
					display: inline-block;
					padding: 5rpx 20rpx;
					color: #999999;
					background-color: #f1f1f1;
					border-radius: 20rpx;
					float: right;
					font-size: 24rpx;
					margin-right: 20rpx;
				}
			}
		}

		.merchant {
			margin: 10rpx 0 0 20rpx;

			image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				vertical-align: middle;
			}

			text {
				font-size: 24rpx;
				display: inline-block;
				margin-left: 10rpx;
			}
		}

		.popup {
			width: 610rpx;
			height: 360rpx;

			.title {
				margin-top: 30rpx;
				text-align: center;

				text {
					display: inline-block;
					margin-left: 20rpx;
					font-size: 36rpx;
					font-weight: 500;
				}

				image {
					width: 30rpx;
					height: 30rpx;
					float: right;
					margin-right: 20rpx;
				}
			}

			.text {
				text-align: center;
				margin-top: 50rpx;
				font-size: 32rpx;
				font-weight: 500;
			}

			.btn {
				margin-top: 70rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-end;
				justify-content: center;
				justify-content: space-between;
				justify-content: space-around;

				view {
					display: inline-block;
					padding: 5rpx 50rpx;
					border-radius: 10rpx;

					&:nth-child(1) {
						background-color: #e0e0e0;
						font-size: 28rpx;
						font-weight: 500;
					}

					&:nth-child(2) {
						background-color: #378EFD;
						color: #FFF;
						font-size: 28rpx;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
