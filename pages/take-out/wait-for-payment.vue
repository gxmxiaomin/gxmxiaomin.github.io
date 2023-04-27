<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>等待付款，剩余19:59</text>
			</view>
			<view class="bar-right bare-cell">

			</view>
		</view>
		<view class="back"></view>

		<view class="box-result">
			<view class="title">订单信息</view>
			<view class="line_box">
				<view class="line_title">
					<text>收货人</text>
				</view>
				<view class="line_value">
					<text>鱼头 <image src="../../static/images/arrow_right.png" mode=""></image> </text>
				</view>
			</view>
			<view class="line_box">
				<view class="line_title">
					<text>联系方式</text>
				</view>
				<view class="line_value">
					<text>15555555555 <image src="../../static/images/arrow_right.png" mode=""></image> </text>
				</view>
			</view>
			<view class="line_box">
				<view class="line_title">
					<text>配送地址</text>
				</view>
				<view class="line_value">
					<text>北晨公寓A座 <image src="../../static/images/arrow_right.png" mode=""></image> </text>
				</view>
			</view>
			<view class="line_box">
				<view class="line_title">
					<text>备注</text>
				</view>
				<view class="line_value">
					<text>把商品放到门口 <image src="../../static/images/arrow_right.png" mode=""></image> </text>
				</view>
			</view>
		</view>


		<view class="card">
			<view class="order_info_box">
				<!-- <view class="box_title">
					<text>订单信息</text>
				</view> -->
				<view class="shop_info">
					<view class="info_cell">
						<image :src="img" mode=""></image>
						<text>自然鲜(文化路店）</text>
					</view>
					<view class="info_cell">
						<text class="time">大约23：59送达</text>
					</view>
				</view>

				<!-- 商品 -->
				<scroll-view scroll-x="true" class="shop_scroll_box">
					<view class="shop_scroll_content">
						<view class="shop_cell" v-for="item in 10" :key="item">
							<image :src="img" mode=""></image>
							<view class="shop_title">
								<text>【整果】海 南鲜橙一整箱</text>
							</view>
							<view class="shop_price">
								<text>￥9.9</text>
							</view>
						</view>
					</view>
				</scroll-view>

				<view class="line_box">
					<view class="line_title">
						<text>优惠券</text>
					</view>
					<view class="line_value">
						<text>无</text>
					</view>
				</view>
				<view class="line_box">
					<view class="line_title">
						<text>配送费</text>
					</view>
					<view class="line_value">
						<text>无</text>
					</view>
				</view>

				<view class="line_box">
					<view class="line_title">
						<text>配送费</text>
					</view>
					<view class="line_value">
						<text>￥20</text>
					</view>
				</view>

				<view class="line_box">
					<view class="line_title">
						<text>订单编号</text>
					</view>
					<view class="line_value">
						<text>124840995</text>
					</view>
				</view>

				<view class="line_box">
					<view class="line_title">
						<text>下单时间</text>
					</view>
					<view class="line_value">
						<text>2022.11.26 &nbsp; 13:37</text>
					</view>
				</view>
				<view style="width: 95%; height: 1rpx;background-color: #f1f1f1;margin: 30rpx 0;"></view>
				<view class="img">
					<view class="view-item">
						<image src="../../static/images/cha.png"></image>
						<text>取消订单</text>
					</view>
					<view class="view-item">
						<image src="../../static/images/shop.png"></image>
						<text>联系商家</text>
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
				img: 'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.top-bar {
		height: 160rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#579efc, #b1cff3);
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			position: relative;
			top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFF;
		}

		.bar-left {
			flex: 1;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;

			text {
				font-size: 36rpx;
				font-weight: 500;
			}
		}

		.bar-right {
			flex: 1;
			height: 100%;
		}
	}

	.back {
		height: 100rpx;
		background-image: linear-gradient(#b1cff3, #f1f1f1);
		margin-top: 158rpx;
	}

	.box-result {
		padding: 20rpx;
		width: 95%;
		margin: auto;
		// border-radius: 20rpx 20rpx 0 0;
		border-radius: 20rpx;
		z-index: 9;
		background-color: #FFF;
		position: relative;
		top: -90rpx;
		min-height: 200rpx;

		.line_box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;

			.line_title {
				font-size: 28rpx;
				color: #333333;
				font-weight: 500;
			}

			.line_value {
				max-width: 60%;
				font-size: 28rpx;
				color: #999999;
				font-weight: 500;

				text {
					image {
						width: 15rpx;
						height: 20rpx;
						vertical-align: middle;
						margin-left: 10rpx;
					}
				}
			}
		}

		.title {
			font-size: 32rpx;
			font-weight: 400;
		}
	}

	.card {
		width: 95%;
		margin: auto;
		min-height: 100rpx;
		padding: 25rpx;
		border-radius: 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		position: relative;
		top: -50rpx;
	}

	.order_info_box {
		// margin-top: 30rpx;

		.box_title {
			font-size: 32rpx;
			color: #333333;
		}

		.shop_info {
			box-sizing: border-box;
			padding: 10rpx 0 30rpx 0;
			border-bottom: 1rpx solid rgba(167, 167, 167, 0.3);
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			color: #333333;
			font-weight: Medium;

			.info_cell {
				display: flex;
				align-items: center;

				image {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
				}

				text {
					margin-left: 10rpx;
				}
				
				.time {
					margin-left: 10rpx;
					color: #378EFD;
					font-size: 24rpx;
				}
			}
		}

		.shop_scroll_box {
			box-sizing: border-box;
			padding: 30rpx 0;
			width: 100%;
			border-bottom: 1rpx solid rgba(167, 167, 167, 0.3);

			.shop_scroll_content {
				min-width: 100%;
				display: flex;
				align-items: center;

				.shop_cell {
					width: 130rpx;
					min-height: 280rpx;
					margin-right: 30rpx;

					image {
						width: 130rpx;
						height: 130rpx;
						border-radius: 15rpx;
					}

					.shop_title {
						margin-top: 20rpx;
						width: 100%;
						font-size: 26rpx;
						color: #333333;
						font-weight: Regular;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.shop_price {
						margin-top: 20rpx;
						width: 100%;
						color: #FC6129;
						font-size: 26rpx;
						font-weight: Regular;
					}
				}
			}
		}

		.line_box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 30rpx;

			.line_title {
				font-size: 28rpx;
				color: #333333;
				font-weight: 500;
			}

			.line_value {
				max-width: 60%;
				font-size: 28rpx;
				color: #999999;
				font-weight: 500;
			}
		}

		.img {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-end;
			justify-content: center;
			justify-content: space-between;
			justify-content: space-around;
			
			
			
			.view-item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 30rpx;

				image {
					width: 43rpx;
					height: 43rpx;
				}

				text {
					margin-top: 15rpx;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
