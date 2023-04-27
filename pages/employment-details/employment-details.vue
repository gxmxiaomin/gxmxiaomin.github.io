<template>
	<view class="view-container">
		<ice-statusbar></ice-statusbar>
		<ice-navbar>
			<view class="view-nav">
				<image class="image1" src="@/static/images/left.png" mode="" @click="uni.navigateBack({
				
			})"></image>
				<view class="view-service">
					<image class="image2" src="@/static/images/serve.png" mode=""></image>
					<text style="color: #000000;">在线客服</text>
				</view>
			</view>
		</ice-navbar>
		<view class="view-content">
			<view class="view-item">
				<view class="view-top">
					<text class="text-title">{{infoMessage.positionName}}</text>
					<text class="text-price">{{infoMessage.salary}}k</text>
				</view>
				<view class="view-center">
					<text class="text-item" v-for="(taps,index) in employ" :key="index">{{taps}}</text>
				</view>
				<view class="view-bottom">
					<text class="text-name">{{infoMessage.companyName}}</text>
					<view class="text-company">{{infoMessage.description}}</view>
					<text class="text-distance">距我{{(infoMessage.goodAtDirection/1000).toFixed(2)}}km</text>
				</view>
			</view>
			<view class="view-gap"></view>
			<view class="view-details">
				<text class="view-title">职位要求</text>
				<view class="view-info" v-html="infoMessage.detailedIntroduction">
				</view>
			</view>
			<view class="view-button-bottom">
				<view class="view-bottom-item" @click="Gocollect()">
					<image v-if="true" src="@/static/images/collect2.png" mode=""></image>
					<image v-else src="@/static/images/shoucang.png"></image>
					<text>收藏</text>
				</view>
				<!-- <view class="view-bottom-item" @click="show = true"> -->
					<view class="view-bottom-item" @click="Goshare()">
					<image src="@/static/images/share.png" mode=""></image>
					<text>分享</text>
				</view>
				<!-- <view class="view-button" @click="uni.navigateTo({
					url:'../employment-file-upload/employment-file-upload?id='+ids
				})"> -->
				<view class="view-button" @click="Gobm()">
					点击报名
				</view>
			</view>
		</view>
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
				info: "1.职位要求，2.职位要求",
				ids: "",
				show: false,
				infoMessage: [],
				employ: [],
				shareTypes: 'WXSceneSession',
				isShare: false,
			};
		},
		onLoad(option) {
			this.ids = option.id
			this.isShare = option.isShare || false
			console.log(">>>>>>>>>>>>>", this.isShare)
			this.getInfo()
		},
		methods: {
			Gocollect(){
				DownloadMethods(this.isShare)
			},
			
			Goshare(){
					DownloadMethods(this.isShare,this.show=true)
				
			},
			Gobm(){
				DownloadMethods(this.isShare,uni.navigateTo({
					url:'../employment-file-upload/employment-file-upload?id='+this.ids
				}))
				
			},
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
				let that = this;
				uni.share({
					provider: shareType,
					scene: this.shareTypes,
					type: 0,
					href:this.shareUrlList.employmentUrl({
						id: this.ids
					}),
					// href: "http://47.103.30.184:9227/h5/index.html#/pages/employment/employment",
					title: this.infoMessage.positionName,
					summary: this.infoMessage.companyAddrest,
					// imageUrl: this.infoMessage.logoImgUrl,
					success: function(res) {
						that.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			
			// 转发成功获取积分
			async getIntegral() {
				let res = await this.http.post('/app/forum/topic/rePostTopic', {
					topicId: this.ids,
					platform:''
				});
				if (res.code == 200) {
					
				} else {
					this.$toast(res.msg);
				}
			},
			
			close() {
				this.show = false
			},
			async getInfo() {
				let res = await this.http.get('/app/employmentPosition/info', {
					id: this.ids
				});
				if (res.code == 200) {
					this.infoMessage = res.data
					this.employ = this.strToArray(res.data.jobRequirements);
					console.log(this.infoMessage)
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.view-share {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: #FFFFFF;
		width: 750rpx;
		height: 460rpx;
		flex-direction: column;
		align-items: center;
		padding-top: 45rpx;

		.view-title {
			text-align: center;
			display: block;
			margin: 0 auto;
		}

		.view-locat {
			width: 750rpx;
			flex-direction: row;
			align-items: center;
			margin-top: 86rpx;
			display: flex;

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
				text-align: center;
			}

			.view-item {
				flex: 1;
				flex-direction: column;
				align-items: center;

				&:first-child {
					margin-left: 0rpx;
				}

				image {
					width: 86rpx;
					height: 86rpx;
					margin: 0 auto;
					display: block;
				}

				view {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					text-align: center;
				}
			}
		}

	}

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

	.view-content {
		.view-item {
			width: 100%;
			border-bottom: 1px solid #F7F7F7;
			padding: 40rpx 30rpx;
			display: flex;
			flex-direction: column;

			.view-top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 40rpx;

				.text-title {
					color: #333333;
				}

				.text-price {
					color: #FF0000;
				}
			}

			.view-center {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				margin: 20rpx 0;

				.text-item {
					font-size: 24rpx;
					color: #666666;
					line-height: 40rpx;
					padding: 14rpx;
					background-color: #F6F6F6;
					margin-bottom: 10rpx;
					margin-right: 20rpx;
				}

				&:last-child {
					margin-right: 0;
				}
			}

			.view-bottom {
				display: flex;
				align-items: center;

				.text-company {
					width: 50rpx;
					height: 30rpx;
					background-color: #007AFF;
					color: #FFFFFF;
					text-align: center;
					line-height: 30rpx;
					font-size: 16rpx;
					margin-right: 30rpx;
				}

				.text-name {
					font-size: 28rpx;
					color: #666666;
					line-height: 40rpx;
					margin-right: 10rpx;
				}

				image {
					width: 44rpx;
					height: 28rpx;
				}

				.text-distance {
					flex: 1;
					text-align: right;
					font-size: 24rpx;
					color: #999999;
					line-height: 40rpx;
				}
			}
		}

		.view-gap {
			background-color: #F7F7F7;
			height: 10rpx;
		}

		.view-details {
			padding: 30rpx;

			.view-title {
				font-size: 36rpx;
				font-weight: 500;
				line-height: 40rpx;
				color: #333333;
			}

			.view-info {
				margin: 30rpx 0;
			}

			image {
				width: 100%;
				min-height: 360rpx;
				background-color: pink;
			}
		}

		.view-button-bottom {
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
				width: 450rpx;
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
	}
</style>
