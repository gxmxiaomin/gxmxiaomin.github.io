<template>
	<view class="view-swiper-details">
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()">返回</text> -->
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>详情</text>
			</view>
			<view class="bar-right bare-cell">
				<text @click="isshow()">分享</text>
			</view>
		</view>
		<view style="margin-top: 120rpx;">{{data.advertiseTitle}}</view>
		<u-parse class="text-content" :content="data.advertiseContent"></u-parse>


		<u-popup :show="show" @close="close" @open="console.log('open')" :round="10" mode="bottom">
			<view class="view-content-d">
				<view class="view-top">
					— 分享至 —
				</view>
				<view class="view-bottom">
					<view class="view-one" @click="share(1)">
						<image class="image" src="../../static/images/weixin-2.png"></image>
						<text class="view-name">微信</text>
					</view>
					<view class="view-one" @click="share(2)">
						<image class="image" src="../../static/images/pengyouquan.png"></image>
						<text class="view-name">朋友圈</text>
					</view>
					<view class="view-one" @click="share(3)">
						<image class="image" src="../../static/images/weibo.png"></image>
						<text class="view-name">微博</text>
					</view>
					<view class="view-one" @click="share(4)">
						<image class="image" src="../../static/images/qq.png"></image>
						<text class="view-name">QQ</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		convertTree
	} from '../../utils/tree.js';
	import {
		DownloadMethods
	} from '@/static/js/configUrl.js';
	export default {
		data() {
			return {
				data: [],
				id: '',
				isShare: false,
				show: false,
				invitationCode:''
			}
		},
		onLoad(val) {
			this.id = val.id
			this.invitationCode = val.invitationCode
			this.getSwiperDetails();
			this.isShare = option.isShare || false
		},
		methods: {
			isshow() {
				DownloadMethods(this.isShare, this.show = true, this.invitationCode)
			},
			
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
				let info = '活动'
			
				console.log(this.ids)
				uni.share({
					provider: shareType,
					scene: shareTypes,
					href:this.shareUrlList.swiperUrl({
						id: this.id
					}),
					title: info,
					imageUrl:'',
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


			async getSwiperDetails() {
				let res = await this.http.get('/app/userHome/homeBannerInfo', {
					bannerId: this.id
				})
				console.log(res);
				if (res.code == 200) {
					this.data = res.data;
				}
			},

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

		}
	}
</script>

<style lang="scss">
	.view-content-d {
		box-sizing: border-box;
		padding: 0 50rpx;
	
		.view-top {
			height: 30rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 28rpx;
			text-align: center;
			margin-bottom: 44rpx;
			margin-top: 44rpx;
		}
	
		.view-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 108rpx;
	
			.view-one {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
	
				image {
					width: 87rpx;
					height: 87rpx;
					margin-bottom: 26rpx;
				}
			}
		}
	}
	.top-bar {
		height: 120rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		background-color: #fff;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.bar-left {
			flex: 2;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 2;
			height: 100%;
		}
	}

	.view-share {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: #f3f3f3;
		width: 750rpx;
		height: 180rpx;
		padding: 0 10rpx;
		flex-direction: column;
		align-items: center;

		.view-title {
			text-align: center;
			display: block;
			margin: 50rpx auto;
		}

		.view-locat {
			width: 750rpx;
			height: 60rpx;
			flex-direction: row;
			align-items: center;
			// margin-top: 66rpx;
			display: flex;

			.image {
				width: 87rpx;
				height: 87rpx;
			}

			.text-name {
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				margin-top: 14rpx;
				display: block;
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
				}

				view {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}
			}
		}

	}

	.view-swiper-details {
		padding: 30rpx;

		view {
			&:first-child {
				font-weight: 500;
				font-size: 36rpx;
				margin-bottom: 20rpx;
			}

			&:last-child {
				line-height: 1.5;
				letter-spacing: 1rpx;
			}
		}
	}
</style>
