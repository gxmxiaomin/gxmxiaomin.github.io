<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">

			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth">
					<image src="../../static/images/news.png" mode=""></image>
					<text></text>
				</view>
			</view>
		</view>
		<view class="back"></view>

		<view class="info">
			<image src="../../static/logo.png" mode=""></image>
			<view class="info-2">
				<view class="title-1"> <text>沙特⚽</text>
					<image src="../rech-text/images/tupian.png" mode=""></image>
				</view>
				<view class="title-2">想做一个开心的干饭人！！！</view>
			</view>
		</view>

		<view class="info-1">
			<view class="text">
				<view class="">￥0.00</view>
				<view class="">红包</view>
			</view>
			<view class="text" @click="uni.navigateTo({
				url:'./ticket'
			})">
				<view class="">3</view>
				<view class="">优惠券</view>
			</view>
			<view class="text" @click="uni.navigateTo({
				url:'./shop-star-page'
			})">
				<view class="">30</view>
				<view class="">收藏</view>
			</view>
		</view>

		<view class="myForm">
			<view class="view-module">
				<text class="text-title">我的订单</text>
				<text class="text-img" @click="uni.navigateTo({
					url:'./order-form?id=' + 1
				})">全部订单 <image src="../../static/images/arrow_right.png" mode=""></image> </text>
				<view class="view-grid">
					<view class="view-item" @click="uni.navigateTo({
					url:'./order-form?id=' + 2
				})">
						<image src="../../static/images/take-out/my/daifukuan.png"></image>
						<text>待付款</text>
					</view>
					<view class="view-item" @click="uni.navigateTo({
					url:'./order-form?id=' + 3
				})">
						<image src="../../static/images/take-out/my/daipeisong.png"></image>
						<text>待配送</text>
					</view>
					<view class="view-item" @click="uni.navigateTo({
					url:'./order-form?id=' + 4
				})">
						<image src="../../static/images/take-out/my/peisongzhong.png"></image>
						<text>配送中</text>
					</view>
					<view class="view-item" @click="uni.navigateTo({
					url:'./order-form?id=' + 5
				})">
						<image src="../../static/images/take-out/my/daipingjia.png"></image>
						<text>待评价</text>
					</view>
				</view>
			</view>
		</view>

		<view class="card">
			<view class="card-1">
				<view class="text">
					<view class="">果蔬</view>
					<view class="">本月销量第一</view>
					<view class="">进入店铺</view>
				</view>
				<view class="img">
					<image src="../../static/logo_old.png" mode=""></image>
				</view>
			</view>

			<view class="card-2">
				<view class="text">
					<view class="">果蔬</view>
					<view class="">本月销量第一</view>
					<view class="">进入店铺</view>
				</view>
				<view class="img">
					<image src="../../static/logo_old.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="tool">
			<view class="view-module">
				<text class="text-title">常见工具</text>
				<view class="view-grid">
					<view class="view-item" @click="uni.navigateTo({
						url:'./site'
					})">
						<image src="../../static/images/take-out/my/dizhi.png"></image>
						<text>地址管理</text>
					</view>
					<view class="view-item">
						<image src="../../static/images/take-out/my/kefu.png"></image>
						<text>在线客服</text>
					</view>
					<view class="view-item" @click="uni.navigateTo({
						url:'./shop-after-sales'
					})">
						<image src="../../static/images/take-out/my/shouhou.png"></image>
						<text>售后服务</text>
					</view>
					<view class="view-item" @click="uni.navigateTo({
						url:'./shop-feedback'
					})">
						<image src="../../static/images/take-out/my/yijian.png"></image>
						<text>意见反馈</text>
					</view>
					<view class="view-item" @click="uni.navigateTo({
						url:'/pages/take-out/shop-browse-records'
					})">
						<image src="../../static/images/take-out/my/zuji.png"></image>
						<text>足迹管理</text>
					</view>
					<view class="view-item">
						<image src="../../static/images/take-out/my/yaoqinghaoyou.png"></image>
						<text>邀请好友</text>
					</view>
				</view>
			</view>
		</view>


		<u-tabbar :value="value6" @change="name => value6 = name" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home" @click="click1(1)"></u-tabbar-item>
			<u-tabbar-item text="分类" @click="click1(2)">
				<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/images/fenlei.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/images/fenlei2.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item text="购物车" @click="click1(3)">
				<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/images/gouwuche2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/images/gouwuche.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="click1(4)"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value6: 3
			}
		},

		methods: {
			click1(e) {
				console.log(e)
				if (e == 1) {
					uni.redirectTo({
						url: './take-out'
					});
				} else if (e == 2) {
					uni.redirectTo({
						url: '/pages/take-out/classify'
					});
				} else if (e == 3) {
					uni.redirectTo({
						url: '/pages/take-out/gouwuche'
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.top-bar {
		height: 120rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		// background-image: linear-gradient(#579efc, #b1cff3);
		background-color: #378efd;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			// position: relative;
			position: relative;
			top: 40rpx;
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

			.center {
				.text {
					display: inline-block;
					margin-left: 50rpx;
					font-size: 30rpx;
				}

				// .xian {
				// 	display: inline-block;
				// 	width: 80rpx;
				// 	height: 10rpx;
				// 	background-color: #FFF;
				// 	position: relative;
				// 	top: -30rpx;
				// 	left: 20rpx;
				// }
			}
		}

		.bar-right {
			flex: 1;
			height: 100%;

			.city-rigth {
				image {
					width: 40rpx;
					height: 45rpx;
					position: absolute;
				}

				text {
					display: inline-block;
					width: 15rpx;
					height: 15rpx;
					text-align: center;
					background: red;
					border-radius: 50%;
					margin-left: 20rpx;
					position: relative;
					top: -20rpx;
					// position: absolute;
					// top: -8rpx;
				}
			}
		}
	}

	.back {
		height: 630rpx;
		background-color: #378efd;
		margin-top: 60rpx;
		border-radius: 0 0 30% 30%;
	}

	.info {
		position: absolute;
		top: 160rpx;

		image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			margin-left: 20rpx;
		}

		.info-2 {
			display: inline-block;
			position: relative;
			top: -40rpx;

			.title-1 {
				display: inline-block;
				margin-left: 20rpx;
				margin-bottom: 10rpx;

				text {
					font-size: 36rpx;
					color: #FFF;
				}

				image {
					width: 40rpx;
					height: 40rpx;
					position: relative;
					top: 10rpx;
				}
			}

			.title-2 {
				// display: inline-block;
				margin-left: 20rpx;
				font-size: 26rpx;
				color: #FFF;
			}
		}
	}

	.info-1 {
		position: relative;
		top: -330rpx;

		view {
			// display: inline-block;
			text-align: center;
		}

		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		justify-content: center;
		justify-content: space-between;
		justify-content: space-around;

		.text {
			view {
				&:nth-child(1) {
					font-size: 36rpx;
					color: #FFF;
				}

				&:nth-child(2) {
					color: #adcbfe;
					font-size: 26rpx;
				}
			}
		}
	}

	.myForm {
		position: relative;
		top: -330rpx;

		.view-module {
			margin: auto;
			margin-top: 30rpx;
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx 20rpx;
			display: flex;
			flex-direction: column;

			.text-title {
				font-size: 36rpx;
				font-weight: 500;
				color: #333333;
			}

			.text-img {
				font-size: 26rpx;
				color: #aaa;
				text-align: right;
				margin-top: -38rpx;

				image {
					width: 15rpx;
					height: 20rpx;
					margin-left: 10rpx;
				}
			}

			.view-grid {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

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
	}

	.card {
		position: relative;
		top: -300rpx;
		display: flex;
		/* 项目在容器中换行显示 */
		flex-wrap: wrap;
		justify-content: flex-end;
		justify-content: center;
		justify-content: space-between;
		justify-content: space-around;

		.card-1 {
			display: inline-block;
			width: 45%;
			height: 160rpx;
			background-color: #04bba0;
			border-radius: 20rpx;

			.text {
				display: inline-block;
				margin: 20rpx 0 0 20rpx;

				view {
					&:nth-child(1) {
						color: #FFF;
					}

					&:nth-child(2) {
						color: #c5eae2;
						font-size: 26rpx;
					}

					&:nth-child(3) {
						display: inline-block;
						color: #04bba0;
						background-color: #FFF;
						border-radius: 20rpx;
						font-size: 22rpx;
						padding: 2rpx 10rpx;
						margin-top: 10rpx;
					}
				}
			}

			.img {
				display: inline-block;
				position: relative;
				top: 10rpx;
				left: 20rpx;

				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
		}

		.card-2 {
			display: inline-block;
			width: 45%;
			height: 160rpx;
			background-color: #49adec;
			border-radius: 20rpx;

			.text {
				display: inline-block;
				margin: 20rpx 0 0 20rpx;

				view {
					&:nth-child(1) {
						color: #FFF;
					}

					&:nth-child(2) {
						color: #c5eae2;
						font-size: 26rpx;
					}

					&:nth-child(3) {
						display: inline-block;
						color: #49adec;
						background-color: #FFF;
						border-radius: 20rpx;
						font-size: 22rpx;
						padding: 2rpx 10rpx;
						margin-top: 10rpx;
					}
				}
			}

			.img {
				display: inline-block;
				position: relative;
				top: 10rpx;
				left: 20rpx;

				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
		}
	}

	.tool {
		position: relative;
		top: -300rpx;

		.view-module {
			margin: auto;
			margin-top: 30rpx;
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx 20rpx;
			display: flex;
			flex-direction: column;

			.text-title {
				font-size: 36rpx;
				font-weight: 500;
				color: #333333;
			}

			.view-grid {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

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
	}

	.u-page__item__slot-icon {
		width: 35rpx;
		height: 35rpx;
	}
</style>
