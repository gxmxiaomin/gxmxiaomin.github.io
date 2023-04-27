<template>
	<view class="view-activity-details">
		<!-- 报名信息 -->
		<view class="view-apply-info">
			<view>
				<text class="title">{{messageInfo.activitiesName}}</text>
				<text class="text-red" v-if="messageInfo.status==1">报名中</text>
				<text class="text-gray" v-else>报名结束</text>
			</view>
			<view v-if="messageInfo.signUpEndTime">
				<text>报名时间：{{ formatDate(messageInfo.signUpStartTime)+'-'+formatDate(messageInfo.signUpEndTime) }}</text>
			</view>
			<view>
				<text>报名人数：{{messageInfo.signUpTargetNumber}}人</text>
				<view class="view-apply-count">
					<text>已报名 {{messageInfo.signUpNumber}}人</text>
				</view>
			</view>
		</view>

		<!-- 活动图片·轮播图 -->
		<view class="view-activity-cover" v-if="!bannerList">
			<swiper class="swiper" autoplay :circular="true" :indicator-dots="true" indicator-active-color="#FFFFFF">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image :src="item.carouselImgUrl"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 活动内容 -->
		<view class="view-activity-content">
			<u-parse :content="messageInfo.activitiesContent"></u-parse>
		</view>

		<!-- 常见问题 -->
		<!-- <view class="view-activity-content">
			<text>常见问题</text>
			<view class="view-item">
				<view>
					<u-badge isDot bgColor="#4A9AFF"></u-badge>
				</view>
				<view>
					<text>
						{{messageInfo.activitiesContent}}
					</text>
				</view>
			</view>
		</view>
 -->
		<!-- 报名按钮 -->
		<!-- 	<view class="view-apply-btn">
			<u-button color="#4A9AFF" shape="circle" @click="uni.navigateTo({
				url:'../activity-apply/activity-apply'
			})" text="立即报名"></u-button>
		
		</view> -->

		<view class="view-content-d">
			<view class="view-left">
				<!-- <view class="view-left-a">
					<image src="/static/images/collect1.png" mode=""></image>
					<view class="view-name">
						收藏
					</view>
				</view> -->
				<view class="view-left-a" @click="open()">
					<image src="/static/images/fenxiang.png" mode=""></image>
					<view class="view-name">
						分享
					</view>
				</view>
			</view>
			<view class="view-right" @click="sendNotic">
				立即报名
			</view>
		</view>
		<!-- 分享 -->
		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
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
	import {
		DownloadMethods
	} from '@/static/js/configUrl.js';
	export default {

		data() {
			return {
				show: false,
				id: '',
				bannerList: [], // 轮播图
				messageInfo: [],
				invitationCode:''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.invitationCode = option.invitationCode
			this.isShare = option.isShare || false
			this.getInfo()
		},
		onShow() {
			// 获取轮播图
			this.getBannerList()
		},
		methods: {
			sendNotic() {
				DownloadMethods(this.isShare, this.sendNotics(), this.invitationCode)
			},
			sendNotics(){
				uni.navigateTo({ url:'../activity-apply/activity-apply' })
			},
			
			// 分享
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
				let that = this;
				uni.share({
					provider: shareType,
					scene: shareTypes,
					type: 0,
					href: this.shareUrlList.socialUrl({
						id: this.id
					}),
					title: this.messageInfo.activitiesName || "学校名字",
					summary: "学校名字",
					imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
					success: function(res) {
						that.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			close() {
				this.show = false
			},
			open() {
				this.show = true
			},
			// 获取轮播图
			async getBannerList() {
				let res = await this.http.get('/app/userHome/homeBannerList', {
					type: 6
				});
				console.log('获取轮播图', res);
				if (res.code == 200) {
					this.bannerList = res.data
				} else {
					this.$toast(res.msg);
				}
			},

			// 格式化时间
			formatDate(date) {
				let dateStr = date.split(' ')[0];
				while (dateStr.indexOf('-') !== -1) {
					dateStr = dateStr.replace('-', '.');
				}
				return dateStr;
			},

			async getInfo() {
				let res = await this.http.get('/app/platformActivities/info', {
					id: this.id
				});
				if (res.code == 200) {
					this.messageInfo = res.data
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-share {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		height: 409rpx;
		padding: 45rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.view-locat {
			display: flex;
			align-items: center;
			width: 100%;
			margin-top: 86rpx;

			.view-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 86rpx;
					height: 86rpx;
				}

				.text-name {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					margin-top: 14rpx;
				}
			}
		}
	}

	.view-content-d {
		width: 100%;
		height: 98rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 11rpx 0rpx;

		.view-left {
			display: flex;
			align-items: center;
			margin-left: 35rpx;

			.view-left-a {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-right: 74rpx;

				image {
					width: 43rpx;
					height: 43rpx;
					margin-bottom: 10rpx;
				}
			}
		}

		.view-right {
			width: 450rpx;
			height: 80rpx;
			background: #4A9AFF;
			box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(19, 98, 198, 0.43);
			border-radius: 40rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}
	}

	page {
		background-color: #F7F7F7;
		padding: 30rpx 0;
	}

	.view-activity-details {
		display: flex;
		flex-direction: column;
		align-items: center;

		.view-apply-info {
			display: flex;
			flex-direction: column;
			width: 690rpx;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 28rpx 30rpx;

			view {
				.title {
					display: inline-block;
					width: 520rpx;
				}
				&:first-child {
					display: flex;
					justify-content: space-between;
					font-size: 32rpx;
					margin-bottom: 30rpx;

					text {
						color: #000000;
						font-weight: bold;
					}

					.text-red {
						color: #EA3527;
					}

					.text-gray {
						color: #999999;
					}
				}

				&:nth-child(2) {
					text {
						font-size: 24rpx;
						color: #999999;
						line-height: 36rpx;
					}
				}

				&:last-child {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color: #999999;
					line-height: 36rpx;

					.view-apply-count {
						background: rgba(74, 154, 255, 0.05);
						border: 1px solid #4A9AFF;
						border-radius: 10rpx;

						text {
							color: #4A9AFF;
							font-size: 20rpx;
							margin: 2rpx 15rpx;
						}
					}
				}
			}
		}

		.view-activity-cover {
			margin-top: 30rpx;

			.swiper {
				height: 320rpx !important;
				width: 690rpx !important;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.view-activity-content+.view-activity-content {
			margin-bottom: 150rpx;
		}

		.view-activity-content {
			width: 690rpx;
			margin-top: 40rpx;
			margin-bottom: 200rpx;

			text {
				&:first-child {
					font-size: 32rpx;
					font-weight: 600;
					color: #333333;
					line-height: 36rpx;
				}
			}

			.view-item {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;

				view {
					&:first-child {
						width: 30rpx;
						padding-top: 12rpx;
					}

					&:last-child {
						display: flex;
						flex-direction: column;
						width: 660rpx;

						text {
							font-size: 24rpx;
							color: #333333;
							line-height: 36rpx;
							font-weight: normal;
						}
					}
				}
			}
		}

		.view-apply-btn {
			display: flex;
			align-items: center;
			width: 100%;
			height: 98rpx;
			background-color: #fff;
			padding: 0 60rpx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
