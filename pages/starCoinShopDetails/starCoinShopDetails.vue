<template>
	<view class="view-container">
		<ice-statusbar :color="scrollTop<300?'rgba(0,0,0,0)':'#FFFFFF'"></ice-statusbar>
		<ice-navbar bgColor="rgba(0,0,0,0)" height="0rpx">
		</ice-navbar>
		<view class="view-content" :style="'top: -'+height+'px;'">
			<u-swiper :list="bannerList" height="384" @change="e =>currentBannerNum = e.current" :circular="true"
				indicatorStyle="right: 20rpx">
				<view slot="indicator" class="indicator-num">
					<text class="indicator-num__text">{{ currentBannerNum + 1 }}/{{ bannerList.length }}</text>
				</view>
			</u-swiper>
			<view class="view-desc">
				<view class="view-product-name">{{storeId.goodsName}}</view>
				<view class="view-products">价值：{{storeId.originalPrice}}元</view>
				<view class="view-rush-buy-price">
					<view class="view-price">
						<text></text><text class="text-price">{{storeId.sellPrice}}星币</text>
					</view>
				</view>
			</view>
			<view class="view-product-details">
				<view class="view-product-details-title">
					商品详情
				</view>
				<view class="view-image" v-html="goodsInfo"></view>
			</view>
		</view>

		<view class="view-bottom">
			<button class="u-reset-button exchange" @click="uni.navigateTo({
				url:'../starCoinShop-order/starCoinShop-order?id='+storeId.id+'&goodsType=0'
			})">立即兑换</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				showPop: false,
				currentBannerNum: 0,
				specIndex: 0,
				spec: "",
				specId: '',
				specList: ["电池/电源线哆啦A梦礼盒-白色", "充电款礼盒蓝", "电池/电源线哆啦A梦礼盒-粉色", "充电素描款-白色"],
				num: 0,
				height: "",
				schoolInfo: {},
				schoolImg: [],
				score: '',
				id: '',
				noticeList: [],
				storeId: '',
				businessInfo: {}, //商家信息
				cover: '',
				bannerList: [],
				banner: [],
				goodsInfo: ''
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		onShow() {
			this.getShopList()
		},
		onLoad(option) {
			this.id = option.id
		},
		created() {
			uni.getSystemInfo({
				complete: (res) => {
					this.height = res.statusBarHeight;
					console.log(this.height);
				}
			})
		},
		methods: {

			// 获取商品信息
			async getShopList() {
				let res = await this.http.get('/app/userScores/scoreGoodsInfo', {
					id: this.id
				});
				if (res.code == 200) {
					this.storeId = res.data
					console.log(this.storeId)
					if (res.data.goodsImg) {
						this.banner.push(res.data.goodsImg.split(','))
						this.bannerList = this.banner[0]
					} else {
						this.banner = []
					}
					this.goodsInfo = res.data.goodsInfo.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
					console.log(this.bannerList)
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.view-rush-buy-price {
		display: flex;
		padding: 30rpx 0rpx;

		.view-price {
			font-size: 40rpx;
			font-weight: bold;
			color: #FF0000;
			line-height: 40rpx;
		}

		.view-original-price {
			font-size: 20rpx;
			font-weight: bold;
			text-decoration: line-through;
			color: #999999;
			line-height: 40rpx;
		}
	}

	.view-container {
		width: 100%;
		font-family: PingFang SC;
		background-color: #F7F7F7;

		.view-nav {
			width: 100%;
			height: 88rpx;
			position: fixed;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 99;
			padding: 0 30rpx;

			.image1 {
				width: 16rpx;
				height: 28rpx;
			}

			.view-service {
				display: flex;
				flex-direction: column;
				align-items: center;

				.image2 {
					width: 46rpx;
					height: 48rpx;
				}

				text {
					font-size: 24rpx;
					color: #FFFFFF
				}
			}
		}

		.indicator-num {
			padding: 2rpx 0;
			background-color: rgba(0, 0, 0, 0.3);
			border-radius: 100rpx;
			width: 80rpx;
			@include flex;
			justify-content: center;

			&__text {
				color: #FFFFFF;
				font-size: 12rpx;
			}
		}

		.view-content {
			position: relative;
		}

		.view-rush-buy {
			width: 100%;
			height: 110rpx;
			background: linear-gradient(90deg, #E1438F 0%, #E93560 100%);

			.view-rush-buy-inner {
				width: 100%;
				height: 100%;
				background-size: 100%;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				image {
					width: 70rpx;
					height: 70rpx;
					margin-right: 22rpx;
				}

				.view-rush-buy-price {
					width: 100%;
					display: flex;
					flex-direction: column;
					color: #FFFFFF;
					flex-grow: 1;

					text {
						font-size: 30rpx;
					}

					.view-price {
						display: flex;

						text {
							height: 48rpx;
							line-height: 60rpx;
						}

						.text-price {
							font-size: 48rpx;
							line-height: 48rpx;
						}
					}

					.view-original-price {
						font-size: 20rpx;
						line-height: 36rpx;
						opacity: 0.5;
					}
				}

				.view-rush-time {
					font-size: 24rpx;
					color: #E93560;

					.view-rush-timebox {
						display: flex;
						font-weight: bold;
						align-items: center;
						margin-top: 10rpx;

						text {
							margin: 0 4rpx;
							display: block;
							width: 36rpx;
							height: 44rpx;
							background: #E93560;
							border-radius: 4rpx;
							font-family: PingFang;
							color: #FFFFFF;
							line-height: 44rpx;
							text-align: center;
						}
					}
				}

			}

		}

		.view-desc {
			background-color: #FFFFFF;
			padding: 0 30rpx;
			margin-bottom: 20rpx;

			.view-products {
				font-size: 20rpx;
				color: #4A9AFF;
				line-height: 40rpx;
				display: inline-block;
				background: rgba(74, 154, 255, 0.05);
				border: 1rpx solid #4A9AFF;
				border-radius: 3rpx;
				padding: 4rpx 10rpx;
			}

			.view-product-name {
				padding: 30rpx 0;
				color: #333333;
			}

			.view-spec {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				padding: 30rpx 0;

				.view-spec-title {
					margin-right: 33rpx;
					color: #999999;
				}

				.view-spec-name {
					flex-grow: 1;
					color: #1E1E11;
				}

				image {
					width: 13rpx;
					height: 21rpx;
				}
			}
		}

		.view-comments {
			width: 100%;
			background-color: #FFFFFF;
			padding: 30rpx;
			margin-bottom: 20rpx;

			.view-comments-head {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.view-comments-title {
					margin-right: 33rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
				}

				.view-rate {
					flex-grow: 1;
					font-size: 24rpx;
					color: #999999;

					text {
						color: #FF6B35;
						margin-left: 6rpx;
					}
				}

				.view-seemore {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;

					image {
						width: 13rpx;
						height: 21rpx;
						margin-left: 20rpx;
					}
				}
			}

			.view-comments-content {
				.view-content-head {
					display: flex;
					align-items: center;
					margin: 40rpx 0 20rpx;

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						margin-right: 13rpx;
					}

					.view-name {
						display: flex;
						flex-direction: column;

						text {
							font-size: 28rpx;
							color: #999999;
						}

						.view-ratebox {
							display: flex;

							image {
								width: 24rpx;
								height: 22rpx;
								margin-right: 9rpx;
							}
						}
					}
				}

				.view-comments-info {
					font-size: 28rpx;
					color: #333333;
				}

				.view-comments-imagelist {
					display: flex;
					margin-top: 27rpx;
					overflow-x: hidden;

					image {
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}
				}

				.view-comments-uptime {
					margin: 20rpx 0 30rpx;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}

		.view-product-details {
			width: 100%;
			padding: 30rpx 30rpx 110rpx;
			background-color: #FFFFFF;

			.view-shop-intro {
				display: flex;
				margin-bottom: 50rpx;

				image {
					width: 140rpx;
					height: 140rpx;
					margin-right: 20rpx;
				}

				.view-shop-info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.view-shop-name {
						font-size: 36rpx;
						font-weight: bold;
						color: #333333;
					}

					.view-shop-desc {
						font-size: 24rpx;
						font-weight: bold;
						color: #666666;
					}

					.view-shop-button {
						width: 120rpx;
						height: 40rpx;
						background: #4A9AFF;
						border-radius: 20rpx;
						text-align: center;
						line-height: 40rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
				}
			}

			.view-product-details-title {
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 30rpx;
			}

			image {
				background-size: cover !important;
				width: 100%;
				height: 1044rpx;
			}
		}

		.view-bottom {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 30rpx 10rpx;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			z-index: 10080;

			.exchange {
				width: 630rpx;
				height: 80rpx;
				background: #4A9AFF;
				box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(19, 98, 198, 0.43);
				border-radius: 40rpx;
				font-size: 32rpx;
				color: #FFFFFF;
				line-height: 80rpx;
			}

			.view-bottom-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 24rpx;
				color: #333333;

				image {
					width: 43rpx;
					height: 43rpx;
					margin-bottom: 8rpx;
				}
			}

			.view-button {
				width: 220rpx;
				height: 80rpx;
				background: #4A9AFF;
				box-shadow: 0px 4rpx 12rpx 0px rgba(19, 98, 198, 0.43);
				border-radius: 40rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}


		.view-pop {
			width: 100%;
			padding: 40rpx 30rpx 380rpx;

			.image-pop-close {
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				top: 40rpx;
				right: 30rpx;
			}

			.pop-top {
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 40rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
				}

				.pop-info {
					flex-shrink: 1;
					flex-grow: 1;

					.price {
						font-size: 40rpx;
						font-weight: bold;
						color: #FF0000;

						.original-price {
							font-size: 20rpx;
							text-decoration: line-through;
							color: #999999;
							margin-left: 20rpx;
						}
					}

					.pop-desc {
						font-size: 24rpx;
						color: #666666;
					}
				}
			}

			.view-pop-title {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
				display: flex;
				margin-bottom: 20rpx;
				justify-content: space-between;
				align-items: center;

				/deep/.u-number-box {
					.u-number-box__input {
						width: 80rpx !important;
						background-color: #F2F3F5 !important;
						font-size: 28rpx !important;
						font-family: Arial;
						font-weight: 400;
						color: #333333 !important;
					}

					.u-number-box__minus,
					.u-number-box__plus {
						width: 32rpx;
						background-color: #FFFFFF !important;
						transform: scale(0.83);
					}

					.u-icon__icon {
						font-size: 24rpx !important;
						font-weight: 400 !important;
						color: #333333 !important;
					}
				}
			}

			.pop-spec-list {
				display: flex;
				flex-wrap: wrap;

				.view-spec-item {
					background: rgba(74, 154, 255, 0.1);
					border-radius: 30rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #111111;
					text-align: center;
					padding: 10rpx 30rpx;
					margin: 0 20rpx 20rpx 0;
				}

				.view-spec-active {
					color: #4A9AFF;
				}
			}
		}
	}
</style>
