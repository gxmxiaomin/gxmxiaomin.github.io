<template>
	<view class="view-container">

		<ice-statusbar :color="scrollTop<300?'rgba(0,0,0,0)':'#FFFFFF'"></ice-statusbar>
		<ice-navbar bgColor="rgba(0,0,0,0)" height="0rpx">
			<view class="view-nav" v-if="scrollTop<300">
				<image class="image1" src="@/static/images/31fanhui1.png" mode="" @click="uni.navigateBack({})"></image>
				<view class="view-service" @click="uni.navigateTo({
					url:'../service/service'
				})">
					<image class="image2" src="@/static/images/serve2.png" mode=""></image>
					<text>在线客服</text>
				</view>
			</view>
			<view class="view-nav" v-else style="background-color: #FFFFFF;">
				<image class="image1" src="@/static/images/left.png" mode="" @click="uni.navigateBack({
				
			})"></image>
				<view class="view-service">
					<image class="image2" src="@/static/images/serve.png" mode=""></image>
					<text style="color: #000000;">在线客服</text>
				</view>
			</view>
		</ice-navbar>

		<view class="view-content" :style="'top: -'+height+'px;'">
			<u-swiper :list="schoolImg" height="384" @change="e =>currentBannerNum = e.current" :circular="true"
				indicatorStyle="right: 20rpx">
				<view slot="indicator" class="indicator-num">
					<text class="indicator-num__text">{{ currentBannerNum + 1 }}/{{ schoolImg.length }}</text>
				</view>
			</u-swiper>

			<view class="view-desc">
				<view class="view-skill" :style="'background-image: url('+bg+');'">
					<image class="image-skill" src="@/static/images/clock2.png"></image>
					<view class="view-rush-buy-price">
						<view class="view-price">
							<text>￥</text><text class="text-price">{{schoolInfo.price}}</text>
						</view>
						<text class="view-original-price">原价￥{{schoolInfo.otPrice}}</text>
					</view>
				</view>

				<view class="view-product-name">{{schoolInfo.title}}</view>

				<!-- <view class="view-spec">
					<text class="view-spec-title">规格</text>
					<view class="view-spec-name" @click="showPop=true" v-html="spec?spec:'请选择规格'"></view>
					<image src="@/static/images/arrow_right.png" mode=""></image>
				</view> -->

			</view>
			<view class="view-comments">
				<view class="view-comments-head">
					<view class="view-comments-title">
						商品评论
					</view>
					<view class="view-rate">
						综合评分<text>{{score}}</text>
					</view>
					<view class="view-seemore" @click="uni.navigateTo({
					url:'../market-comments/market-comments'
				})">查看全部<image src="@/static/images/arrow_right.png" mode=""></image>
					</view>
				</view>
				<view class="view-comments-content" v-for="item in noticeList">
					<view class="view-content-head">
						<image :src="item.headUrl" mode=""></image>
						<view class="view-name">
							<text>{{item.nickName}}</text>
							<view class="view-ratebox">
								<ice-star v-model="item.productScore"></ice-star>
							</view>
						</view>
					</view>
					<view class="view-comments-info">
						{{item.comment}}
					</view>
					<view class="view-comments-imagelist">
						<image :src="list" mode="" v-for="(list,index) in item.pics" :key="index">
						</image>
					</view>
					<view class="view-comments-uptime">
						发布时间：{{item.createTime}}
					</view>
				</view>
			</view>
			<view class="view-product-details-info">
				<text>商品详情</text>
				<view class="view-product-details-content">
					<image :src="img" mode="widthFix" v-for="(img,i) in schoolImg"></image>
				</view>
			</view>


		</view>

		<view class="view-bottom">
			<!-- 		<view class="view-bottom-item" @click="postCollect">
				<image v-if="schoolInfo.collect" src="@/static/images/collect2.png" mode=""></image>
				<image v-else src="@/static/images/collect1.png"></image>
				<text>收藏</text>
			</view> -->
			<!-- <view class="view-bottom-item">
				<image src="@/static/images/shoucang.png" mode=""></image>
				<text>收藏</text>
			</view> -->
			<view class="view-bottom-item" @click="show=true">
				<image src="@/static/images/share.png" mode=""></image>
				<text>分享</text>
			</view>
			<view class="view-button" style="background-color: #2462ED;"
				@click="addCart(schoolInfo.id,schoolInfo.storeId)">
				加入购物车
			</view>
			<view class="view-button" @click="uni.navigateTo({
				url:'../skill-order/skill-order?id='+id+'&storeType='+schoolInfo.storeType+'&seckill='+num
			})">
				立即购买
			</view>
		</view>
		<u-popup :show="showPop" @close="showPop=false" round="10">
			<view class="view-pop">
				<image class="image-pop-close" src="@/static/images/close.png" mode="" @click="showPop=false"></image>
				<view class="pop-top">
					<image :src="schoolInfo.image" mode=""></image>
					<view class="pop-info">
						<view class="price">
							<text>￥{{schoolInfo.price}}</text>
							<text class="original-price">￥{{schoolInfo.otPrice}}</text>
						</view>
						<view class="pop-desc">
							{{schoolInfo.goodsName}}
						</view>
					</view>
				</view>
				<view class="" v-for="classify in schoolInfo.bgoodsNormList">
					<view class="view-pop-title">
						{{classify.normName}}
					</view>
					<view class="pop-spec-list">
						<view class="view-spec-item" :class="specIndex===index?'view-spec-active':''"
							v-for="(item,index) in classify.children" :key="index" @click="()=>{
								specIndex=index
								spec=item.normValue
								specId = item.id
								return ''
							}">
							{{item.normValue}}
						</view>
					</view>
				</view>
				<view class="view-pop-title">
					数量<u-number-box v-model="num" :min="0" @change="numChange"></u-number-box>
				</view>
			</view>
		</u-popup>

		<u-popup :show="show" :round="10" mode="bottom" @close="show=false">
			<view class="view-share">
				<text class="view-title">— 分享至 —</text>
				<view class="view-locat">
					<view class="view-item" @click="share(1)">
						<image class="image" src="../../static/images/weixin-2.png"></image>
						<text class="text-name">微信</text>
					</view>
					<view class="view-item" @click="share(2)">
						<image class="image" src="../../static/images/pengyouquan.png"></image>
						<text class="text-name">朋友圈</text>
					</view>
					<view class="view-item" @click="share(3)">
						<image class="image" src="../../static/images/weibo.png"></image>
						<text class="text-name">微博</text>
					</view>
					<view class="view-item" @click="share(4)">
						<image class="image" src="../../static/images/qq.png"></image>
						<text class="text-name">QQ</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false, // 显示/隐藏分享弹窗
				scrollTop: 0,
				showPop: false,
				currentBannerNum: 0,
				bg: require("@/static/images/market-product-detail1.png"),
				specIndex: 0,
				spec: "",
				specId: '',
				num: 1,
				height: "",
				schoolInfo: {},
				schoolImg: [],
				score: '',
				id: '',
				noticeList: [],
				storeId: '',
				businessInfo: {}, //商家信息
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		onShow() {
			this.getScore() // 获取评论分数
			this.getNoticeList() // 获取评论列表
		},
		onLoad(option) {
			this.id = option.id
			this.getShopList() // 获取商品信息
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
			share(val) {
				switch (val) {
					case 1:
						this.fenxiang('weixin', 'WXSceneSession')
						break;
					case 2:
						this.fenxiang('weixin', 'WXSceneTimeline')
						break;
					case 3:
						this.fenxiang('sinaweibo', '')
						break;
					case 4:
						this.fenxiang('qq', '')
						break;
				}
			},
			fenxiang(shareType, shareTypes) {
				uni.share({
					provider: shareType,
					scene: shareTypes,
					type: 0,
					href: `http://47.103.30.184:9227/goodsInfoH5/index.html#/pages/seckill-details/seckill-details?id=${this.id}`,
					title: this.schoolInfo.title,
					// summary: this.messages.schoolTitle,
					imageUrl: this.schoolImg[0],
					success: (res) => {
						this.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

			// 转发成功获取积分
			async getIntegral() {
				let res = await this.http.post('/app/forum/topic/rePostTopic', {
					topicId: this.ids,
					platform: ''
				});
				console.log('转发成功获取积分', res);
				if (res.code == 200) {

				} else {
					this.$toast(res.msg);
				}
			},

			// 添加购物车
			addCart(val, storeId) {
				if (this.num == 0) {
					this.showPop = true
					this.$toast('请先选择商品数量');
				} else {
					this.postAddCart(storeId)
				}
			},

			// 添加购物车
			async postAddCart(storeId) {
				let res = await this.http.postJson('/app/car/save', {
					addNum: this.num,
					goodsId: this.id,
					normValueId: this.specId,
					storeId: storeId,
				});
				if (res.code == 200) {
					this.$toast(res.msg)
					this.showPop = false
				} else {
					this.$toast(res.msg);
				}
			},

			// 收藏
			async postCollect() {
				let res = await this.http.post('/app/userHomeNavigation/collectOrUnCollect', {
					parentId: this.id,
					typeId: 0,
				});
				if (res.code == 200) {
					if (res.data == 1) {
						this.$toast("收藏成功")
						this.getShopList()
					} else {
						this.$toast("取消收藏")
						this.getShopList()
					}
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取评论列表
			async getNoticeList() {
				let res = await this.http.get('/app/storeProductReply/listSeckillReply', {
					goodsId: this.id,
					replyType: 2,
					pageNum: 1,
					pageSize: 1,
				});
				if (res.code == 200) {
					this.noticeList = res.rows
					for (let item of res.rows) {
						if (item.pics) {
							item.pics = this.strToArray(item.pics)
						} else {
							item.pics = item.pics
						}
					}
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取商品信息
			async getShopList() {
				let res = await this.http.get('/app/yxStoreSeckill/secKillInfo', {
					id: this.id
				});
				console.log('商品信息', res);
				if (res.code == 200) {
					this.storeId = res.data.storeId
					this.schoolInfo = res.data
					this.schoolImg = this.strToArray(res.data.images);
					for (let item of this.schoolImg) {
						if (item == '') {
							this.schoolImg = this.schoolImg.splice(0, this.schoolImg.length - 1)
						} else {
							this.schoolImg = this.schoolImg
						}
					}
					console.log(this.schoolImg)
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取评论分数
			async getScore() {
				let res = await this.http.get('/app/storeProductReply/replyCompositeSkillScore', {
					goodsId: this.id,
					replyType: 2,
				});
				if (res.code == 200) {
					this.score = res.data
				} else {
					this.$toast(res.msg);
				}
			},
			numChange() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}

	.view-share {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: #FFFFFF;
		width: 750rpx;
		height: 450rpx;
		padding: 45rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.view-title {
			text-align: center;
			display: block;
			margin: 0 auto;
		}

		.view-locat {
			width: 750rpx;
			display: flex;
			align-items: center;
			margin-top: 86rpx;

			.image {
				width: 87rpx;
				height: 87rpx;
			}

			.text-name {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				margin-top: 14rpx;
				display: block;
			}

			.view-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				&:first-child {
					margin-left: 0rpx;
				}

				image {
					width: 86rpx;
					height: 86rpx;
				}

				view {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}
			}
		}

	}

	.view-container {
		width: 100%;
		font-family: PingFang SC;

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
							color: #FFFFFF;
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
			margin-bottom: 20rpx;

			.view-skill {
				width: 100%;
				height: 111rpx;
				background-size: cover;
				display: flex;
				align-items: center;
				padding: 0rpx 30rpx;

				.view-rush-buy-price {
					display: flex;
					padding: 30rpx 0rpx;

					.view-price {
						font-size: 40rpx;
						font-weight: bold;
						color: #FFFFFF;
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

				.image-skill {
					width: 70rpx;
					height: 70rpx;
				}
			}

			.view-product-name {
				padding: 30rpx;
				color: #333333;
				border-bottom: 1px solid #EFEFEF;
			}

			.view-spec {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				padding: 30rpx;

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

		.view-product-details-info {
			width: 100%;
			padding: 30rpx;
			margin-bottom: 100rpx;
			background-color: #FFFFFF;
			font-size: 0;

			.view-product-details-content {
				padding-top: 20rpx;
			}

			text {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
				margin-bottom: 20rpx;
			}

			image {
				// margin-top: 30rpx;
				width: 100%;
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
