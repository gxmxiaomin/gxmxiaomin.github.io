<template>
	<view class="view-content">
		<u-navbar safeAreaInsetTop placeholder fixed title="" bgColor="#ffffff" @leftClick="uni.navigateBack({
			
		})">
			<image slot="right" src="/static/images/education1.png" class="image-qrcode">
			</image>
		</u-navbar>
		<view class="view-content-a">
			<view class="view-one" v-if="!isPay">
				本内容需要购买观看
			</view>
			<video class="video" :src="info.videoUrl" controls v-if="isPay"></video>
			<view class="view-two">
				{{info.videoName}}
			</view>
			<view class="view-three">
				<view class="view-left">
					¥{{info.sellPrice}}
				</view>
				<view class="view-right">
					<image src="" mode=""></image>
					<view>
						已有{{info.viewers}}人观看
					</view>
				</view>
			</view>
		</view>
		<view class="view-content-b">
			{{info.videoDesc}}
		</view>
		<view class="view-content-c">
			<view class="view-title">
				视频评价
			</view>
			<view class="view-comment" v-for="(item,index) in list">
				<view class="view-user">
					<view class="view-top">
						<image :src="item.headUrl" mode=""></image>
						<view class="view-information">
							<view class="view-name">
								{{item.nickName}}
							</view>
							<view class="view-time">
								{{item.createTime}}
							</view>
						</view>
					</view>
					<view class="view-bottom">
						{{item.commentsContent}}
					</view>
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
			page++
			queryEvaluateList()
			return ''
			}" />
		</view>
		<view class="view-content-d">
			<view class="view-left">
				<!-- <view class="view-left-a">
					<image src="/static/images/collect1.png" mode=""></image>
					<view class="view-name">
						收藏
					</view>
				</view> -->
				<!-- <view class="view-left-a" @click="show = true"> -->
				<view class="view-left-a" @click="Goshare()">
					<image src="/static/images/fenxiang.png" mode=""></image>
					<view class="view-name">
						分享
					</view>
				</view>
			</view>
			<!-- 	<view class="view-right" v-if="!isPay" @click="uni.navigateTo({
				url:'../video-course-pay/video-course-pay?id='+id+'&titalPrice='+info.sellPrice
			})"> -->
			<view class="view-right" v-if="!isPay" @click="Goshopvideo()">
				{{info.sellPrice}}元购买
			</view>
			<view class="view-right" v-if="isPay" @click="toEvaluate">
				{{isEvaluate?'已评价':'去评价'}}
			</view>
		</view>
		<u-popup :show="show" :round="10" mode="bottom" @close="close">
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
				id: 0,
				info: {},
				isPay: false,
				isEvaluate: false,
				list: [],
				show: false,
				shareTypes: 'WXSceneSession',
				isShare: false,
				invitationCode:''
			}
		},
		onLoad(data) {
			this.id = data.id;
			this.invitationCode = option.invitationCode
			this.isShare = data.isShare || false
			console.log(">>>>>>>>>>>>>", this.isShare)
		},
		onShow() {
			this.queryInfo();
			this.queryIsPay();
			this.queryIsEvaluate();
			this.page = 1;
			this.queryEvaluateList();
		},
		methods: {
			Goshare() {
				DownloadMethods(this.isShare, this.show = true, this.invitationCode)
			},
			Goshopvideo() {
				DownloadMethods(this.isShare, uni.navigateTo({
					url: '../video-course-pay/video-course-pay?id=' + this.id + '&titalPrice=' + this.info
						.sellPrice
				}), this.invitationCode)

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
					// href: "http://47.103.30.184:9227/h5/index.html",
					href: this.shareUrlList.videoScreenUrl({
						id: this.id,

					}),
					title: this.info.videoName,
					summary: this.info.videoDesc,
					imageUrl: this.info.videoCover,
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
				let submit = {
					topicId: this.ids,
					platform: ''
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.post('/app/forum/topic/rePostTopic', submit);
				if (res.code == 200) {

				} else {
					this.$toast(res.msg);
				}
			},

			async toEvaluate() {
				if (!this.isEvaluate) {
					uni.navigateTo({
						url: './evaluate?id=' + this.id
					})
				}
			},
			async queryEvaluateList() {

				this.loadmoreStatus = 'loading';
				let datas = {
					pageNum: this.page,
					pageSize: this.pageSize,
					id: this.id,
				}
				if (this.isShare) {
					datas.shareStatus = true
				}
				let res = await this.http.get('/app/familyEducation/payVideoComments', datas);
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
				} else {
					this.$toast(res.msg);
				}
			},
			async queryIsPay() {
				let submit = {
					payVideoId: this.id,
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/familyEducation/isPayVideo', submit);
				if (res.code == 200) {
					this.isPay = res.data;
				} else {
					this.$toast(res.msg);
				}
			},
			async queryIsEvaluate() {
				let submit = {
					payVideoId: this.id,
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/familyEducation/isEvaluation', submit);
				if (res.code == 200) {
					this.isEvaluate = res.data;
				} else {
					this.$toast(res.msg);
				}
			},
			close() {
				this.show = false
			},

			async queryInfo() {
				let submit = {
					id: this.id,
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/familyEducation/info', submit);
				console.log('信息', res);
				if (res.code == 200) {
					this.info = res.data;
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-share {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: #FFFFFF;
		width: 750rpx;
		height: 409rpx;
		padding: 45rpx;
		flex-direction: column;
		align-items: center;

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

	.view-content {
		background-color: #F7F7F7;

		/deep/.u-navbar {

			.uicon-arrow-left {
				color: #333333 !important;
			}

			.u-navbar__content__title {
				color: #333333 !important;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}

			.image-qrcode {
				width: 44rpx;
				height: 44rpx;
			}
		}

		.view-content-a {
			width: 750rpx;
			background: #FFFFFF;
			margin-bottom: 7rpx;

			.video {
				width: 100%;
			}

			.view-one {
				width: 750rpx;
				height: 480rpx;
				background: rgba(0, 0, 0, 0.5);
				text-align: center;
				line-height: 480rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F7F7F7;
				margin-bottom: 29rpx;
			}

			.view-two {
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				margin-bottom: 30rpx;
			}

			.view-three {
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding: 0 30rpx;
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FF0000;

				.view-right {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #999999;

					image {
						width: 23rpx;
						height: 23rpx;
						margin-right: 12rpx;
					}
				}
			}
		}

		.view-content-b {
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #FFFFFF;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			padding-bottom: 57rpx;
		}

		.view-content-c {
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 0 30rpx;
			padding-bottom: 200rpx;

			.view-title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				margin-bottom: 29rpx;
			}

			.view-comment {

				.view-user {
					border-bottom: 1rpx solid #EFEFEF;

					.view-top {
						display: flex;
						align-items: center;
						margin-bottom: 26rpx;

						image {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							background-color: #9ACAFC;
							margin-right: 19rpx;
						}

						.view-information {
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;

							.view-name {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #666666;
							}
						}
					}

					.view-bottom {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
						margin-bottom: 29rpx;
					}
				}
			}
		}

		.view-content-d {
			width: 750rpx;
			height: 98rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-around;
			position: fixed;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			padding-top: 11rpx;
			margin-bottom: 47rpx;

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
	}
</style>
