<template>
	<view class="view-course">
		<view class="child-nav">
			<image class="image-fanhui" src="../../static/images/31fanhui1.png" @click="uni.navigateBack({})"></image>
			<view class="view-customer">
				<image class="image-customer" src="../../static/images/kefu.png" mode=""></image>
				<view class="text-customer">在线客服</view>
			</view>
		</view>
		<view class="view-swiper">
			<u-swiper :list="bannerList" :indicator="true" :circular="true" indicatorMode="dot"
				indicatorInactiveColor="rgba(255, 255, 255, 0.4)" height="767rpx"></u-swiper>
		</view>
		<view class="view-brief">
			<view class="view-item">
				<view class="view-item-name">{{list.courseName}}</view>
				<view class="view-price">
					<view class="view-oldprice">￥{{list.courseAmount}}</view>
					<text class="view-person">已有{{list.signUpNum}}人报名</text>
				</view>
				<!-- <view class="view-price">
					<view class="view-oldprice"></view>
					<text class="view-person">已有{{list.collectNum}}人收藏</text>
				</view> -->
			</view>
			<!-- <view class="view-specifications" @click="showSpecPopup = true">
				<text class="text-guige">规格</text>
				<text class="text-select">请选择规格</text>
				<image class="image-right" src="../../static/images/arrow_right.png"></image>
			</view> -->
		</view>
		<view class="view-rate">
			<view class="view-rate-title" @click="uni.navigateTo({
				url:'../school-comments/school-comments?id='+list.id
			})">
				<text class="text-rate">课程评论</text>
				<view class="text-score">综合评分<text>{{fraction}}分</text></view>
				<image class="image-fanhui" src="../../static/images/arrow_right.png" mode=""></image>
			</view>
			<view class="view-item" v-for="item in commentList">
				<view class="view-item-title">
					<image class="image-pic" :src="item.headUrl"></image>
					<view class="view-person">
						<text class="">{{item.nickName}}</text>
						<ice-star v-model="item.productScore"></ice-star>
					</view>
				</view>
				<view class="view-titles u-line-3">{{item.comment}}</view>
				<view class="view-shopIng">
					<image v-for="(image,index) in item.pics" :src="image"></image>
				</view>
				<view class="view-trip">
					<text class="">发布时间：{{item.createTime}}</text>
				</view>
			</view>
		</view>
		<view class="view-shopDetails">
			<text class="text-shopDetails">课程详情</text>
			<view class="view-content">
				<image class="" :src="list.courseDetailsImg"></image>
				<!-- <image class="" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
				<image class="" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
				<image class="" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image> -->
			</view>
		</view>
		<u-popup :show="show" @close="close" @open="open">
			<view class="view-share">
				<text class="view-title">— 分享至 —</text>
				<view class="view-locat">
					<view class="view-item" @click="share(1)">
						<image class="" src="../../static/images/weixin-2.png"></image>
						<view class="">微信</view>
					</view>
					<view class="view-item" @click="share(2)">
						<image class="" src="../../static/images/pengyouquan.png"></image>
						<view class="">朋友圈</view>
					</view>
					<view class="view-item" @click="share(3)">
						<image class="" src="../../static/images/weibo.png"></image>
						<view class="">微博</view>
					</view>
					<view class="view-item" @click="share(4)">
						<image class="" src="../../static/images/qq-1.png"></image>
						<view class="">QQ</view>
					</view>
				</view>
			</view>
		</u-popup>
		<view class="view-bottom">
			<view class="view-item" @click="collect">
				<image v-if="list.collect" src="@/static/images/collect2.png" mode=""></image>
				<image v-else src="@/static/images/shoucang.png"></image>
				<view class="view-collect">收藏</view>
			</view>
			<view class="view-item" @click="show = true">
				<image src="../../static/images/fenxiang.png"></image>
				<view class="view-collect">分享</view>
			</view>
			<view class="view-item">
				<button class="u-reset-button view-pay" @click="uni.navigateTo({
					url:'../course-message/course-message?id='+list.id
				})">购买课程</button>
			</view>
		</view>

		<!-- <u-popup :show="showSpecPopup" @close="showSpecPopup=false" round="10">
			<view class="view-pop">
				<image class="image-pop-close" src="@/static/images/close.png" mode="" @click="showSpecPopup=false">
				</image>
				<view class="pop-top">
					<image src="@/static/images/order-img.png" mode=""></image>
					<view class="pop-info">
						<view class="price">
							<text>￥129.00</text>
							<text class="original-price">￥99.00</text>
						</view>
						<view class="pop-desc">
							天文 哆啦A梦小学生上学文具礼盒套装电动
							铅笔刀橡皮擦桌面写作业清洁吸尘器儿童削
							笔器礼物自动转笔刀礼包
						</view>
					</view>
				</view>
				<view class="view-pop-title">
					种类
				</view>
				<view class="pop-spec-list">
					<view class="view-spec-item" :class="specIndex===index?'view-spec-active':''"
						v-for="(item,index) in specList" :key="index" @click="()=>{
								specIndex=index
								spec=item
								return ''
							}">
						{{item}}
					</view>
				</view>
				<view class="view-pop-title">
					数量<u-number-box v-model="num" @change="numChange"></u-number-box>
				</view>
			</view>
		</u-popup> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				show: false,
				showSpecPopup: false,
				specIndex: 0,
				specList: ["电池/电源线哆啦A梦礼盒-白色", "充电款礼盒蓝", "电池/电源线哆啦A梦礼盒-粉色", "充电素描款-白色"],
				num: 0,
				list: {},
				commentList: {},
				commentImg: [],
				bannerList: [],
				fraction: '',
				schoolInfo: '',
				shareTypes: 'WXSceneSession',
			}
		},
		onLoad(option) {
			this.val = option.id
		},
		async mounted() {
			await this.getfraction()
			await this.getCourse()
			await this.getcomment()
		},
		methods: {
			share(val) {
				if (val == 1) {
					this.fenxiang('weixin')
					this.shareTypes = 'WXSceneSession'
				} else if (val == 2) {
					this.fenxiang('weixin')
					this.shareTypes = 'WXSceneTimeline'
				} else if (val == 3) {
					this.fenxiang('sinaweibo')
					this.shareTypes = 'WXSceneSession'
				} else {
					this.fenxiang('qq')
					this.shareTypes = 'WXSceneSession'
				}

			},
			fenxiang(shareType) {
				uni.share({
					provider: shareType,
					scene: this.shareTypes,
					type: 0,
					href: "http://47.103.30.184:9227/h5/index.html#/pages/course/course",
					title: this.list.courseName,
					summary: this.list.courseDetails,
					imageUrl: this.list.courseDetailsImg,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// 收藏
			collect() {
				this.postCollect()
			},
			// 收藏
			async postCollect() {
				let res = await this.http.post('/app/userHomeNavigation/collectOrUnCollect', {
					parentId: this.val,
					typeId: 1,
				});
				if (res.code == 200) {
					if (res.data == 1) {
						this.$toast("收藏成功")
						this.getCourse()
					} else {
						this.$toast("取消收藏")
						this.getCourse()
					}
				} else {
					this.$toast(res.msg);
				}
			},
			// 商品详情
			async getCourse() {
				let res = await this.http.get("/app/userHomeNavigation/courseInfo", {
					courseId: this.val,
				});
				if (res.code == 200) {
					this.list = res.data;
					this.bannerList = this.strToArray(res.data.courseImg);
				} else {
					this.$toast(res.msg);
				}
			},
			// 获取评论
			async getcomment() {
				let res = await this.http.get('/app/storeProductReply/listUserReply', {
					goodsId: 5,
					pageNum: 1,
					pageSize: 10,
				});
				if (res.code == 200) {
					console.log(res)
					for (let item of res.rows) {
						if (item.pics) {
							item.pics = item.pics.split(',');
						} else {
							item.pics = [];
						}
					}
					this.commentList = res.rows


				} else {
					this.$toast(res.msg);
				}
			},
			// 评论综合分数
			async getfraction() {
				let res = await this.http.get('/app/storeProductReply/replyCompositeScore', {
					goodsId: 5,
				});
				if (res.code == 200) {
					this.fraction = res.data
				} else {
					this.$toast(res.msg);
				}
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
		}
	}
</script>

<style lang="scss">
	.view-ratebox {
		display: flex;

		image {
			width: 24rpx;
			height: 22rpx;
			margin-right: 9rpx;
		}
	}

	// /deep/.u-transition {
	// 	top: 72%;
	// }


	.view-share {
		width: 100%;
		padding: 45rpx;

		.view-title {
			text-align: center;
			display: block;
			margin: 0 auto;
		}

		.view-locat {
			width: 100%;
			margin-top: 86rpx;
			display: flex;

			.view-item {
				margin-left: 100rpx;

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

	.view-bottom {
		width: 100%;
		height: 98rpx;
		position: fixed;
		left: 0rpx;
		bottom: 0rpx;
		background-color: #FFFFFF;
		z-index: 999;
		display: flex;
		align-items: center;
		padding: 0rpx 30rpx;

		.view-item {
			width: 100rpx;
			padding: 14rpx;

			.view-pay {
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40rpx;
			}

			&:last-child {
				width: 450rpx;
				height: 70rpx;
				background: #4A9AFF;
				box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(19, 98, 198, 0.43);
				border-radius: 40rpx;
				margin-left: 45rpx;
			}

			image {
				width: 43rpx;
				height: 43rpx;
				margin: 0 auto;
				display: block;
			}

			.view-collect {
				margin-top: 8rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
				text-align: center;
			}
		}
	}

	.view-shopDetails {
		width: 100%;
		padding: 30rpx;

		.view-content {
			width: 100%;
			padding-bottom: 100rpx;

			image {
				height: 695rpx;
				width: 100%;

				&:first-child {
					margin-top: 30rpx;
				}
			}
		}

		.text-shopDetails {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
		}
	}

	.view-rate {
		border-top: 20rpx solid #F7F7F7;
		background-color: #FFFFFF;
		padding: 30rpx;

		.view-item {
			width: 100%;

			.view-trip {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				margin-top: 20rpx;
			}

			.view-shopIng {
				display: flex;

				image {
					width: 160rpx;
					height: 160rpx;
					margin-left: 20rpx;
					margin-top: 30rpx;

					&:first-child {
						margin-left: 0rpx;
					}
				}
			}

			.view-titles {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}

			.view-item-title {
				display: flex;
				margin-top: 30rpx;

				.view-person {
					margin-left: 20rpx;
				}

				.image-pic {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
			}
		}

		.view-rate-title {
			display: flex;
			align-items: center;

			.image-fanhui {
				width: 13rpx;
				height: 21rpx;
				margin-left: 20rpx;
			}

			.text-rate {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
			}

			.text-score {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				margin-left: 33rpx;

				text {
					color: #fF0000;
				}
			}

			.text-more {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				margin-left: auto;
			}
		}
	}

	.view-brief {
		padding: 30rpx;

		/deep/.u-transition {
			top: 45%;
		}

		.view-specifications {
			display: flex;
			align-items: center;
			padding: 30rpx 0rpx;

			.text-select {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #1E1E11;
				margin-left: 33rpx;
			}

			.text-guige {
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}

			.image-right {
				width: 13rpx;
				height: 21rpx;
				margin-left: auto;
			}
		}

		.view-item {
			.view-item-name {
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
			}

			.view-price {
				display: flex;
				margin-top: 29rpx;

				.view-person {
					width: 161rpx;
					height: 35rpx;
					background: rgba(74, 154, 255, 0.05);
					border: 1rpx solid #4A9AFF;
					border-radius: 3rpx;
					font-size: 20rpx;
					font-weight: bold;
					color: #4A9AFF;
					margin-left: auto;
					text-align: center;
				}

				.view-oldprice {
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF0000;

					text {
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						text-decoration: line-through;
						color: #999999;
					}
				}
			}
		}
	}

	.view-swiper {
		width: 100%;
		height: 767rpx;
	}

	.child-nav {
		position: fixed;
		top: 0;
		width: 100%;
		padding: var(--status-bar-height) 30rpx 20rpx;
		display: flex;
		align-items: center;
		z-index: 999;

		.image-fanhui {
			width: 16rpx;
			height: 28rpx;
		}

		.view-customer {
			margin-left: auto;

			.image-customer {
				width: 46rpx;
				height: 48rpx;
				margin: 0 auto;
				display: block;
			}

			.text-customer {
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
			}

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
					transform: scale();
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
</style>
