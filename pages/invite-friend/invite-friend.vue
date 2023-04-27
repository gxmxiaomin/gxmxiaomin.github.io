<template>
	<view class="share-page">
		<view class="page" :style="'background: url('+bg+');'">
			<!-- <text class="text-title">邀请下级赚大额提成</text> -->
			<!-- <view class="view-line">
		
			</view> -->
			<!-- <text class="text-tips">仅可邀请学校、商家、代理</text>
			<text class="text-rule">邀请学校、商家进行注册，注册成功后其成为你的下级；
				其产生的保证金费用或交易额，你都将收取3%的提成佣金。</text> -->
			<view class="poster-box">
				<SharePoster ref="shareCom" codeImg='codeImg' @confirm='getIntegral'></SharePoster>
			</view>
		
			<view class="view-qrcode" :style="'background: url('+bgQrcode+');'">
				<text class="text-name">邀请推广二维码</text>
				<image :src="codeImg" class="image-qrcode"></image>
				<view class="view-text">
					<text>这是您的专属邀请码，发送给好友， 好友下载并绑定你的邀请码，你可获得丰厚的奖励。</text>
				</view>
			</view>
			<view class="view-partner">
				<text class="text-share-title">—— 分享到以下平台 ——</text>
				<view class="view-share">
					<view class="view-item" @click="share(4)">
						<image src="../../static/images/qq.png" mode=""></image>
						<text>QQ</text>
					</view>
					<view class="view-item" @click="share(1)">
						<image src="../../static/images/wechat.png" mode=""></image>
						<text>微信</text>
					</view>
					<view class="view-item" @click="share(2)">
						<image src="../../static/images/wechat_circle.png" mode=""></image>
						<text>朋友圈</text>
					</view>
					<view class="view-item" @click="share(3)">
						<image src="../../static/images/weibo.png" mode=""></image>
						<text>微博</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SharePoster from '@/components/sharePoster/sharePoster.vue'
	export default {
		data() {
			return {
				codeImg: '',
				bg: require('@/static/images/bg_share_page.png'),
				bgQrcode: require('@/static/images/bg_qrcode.png'),
				shareTypes: 'WXSceneSession',
			};
		},
		components: { SharePoster },
		onShow() {
			this.getImg()
		},
		methods: {
			gogogo() {
				// this.$refs.shareCom.goShare('xw支付')
			},
			share(val) {
				if (val == 1) {
					this.shareTypes = 'WXSceneSession'
					this.fenxiang('weixin')
				} else if (val == 2) {
					this.shareTypes = 'WXSceneTimeline'
					this.fenxiang('weixin')
				} else if (val == 3) {
					this.shareTypes = 'WXSceneSession'
					this.fenxiang('sinaweibo')
				} else {
					this.shareTypes = 'WXSceneSession'
					this.fenxiang('qq')
				}
			},
			fenxiang(shareType) {
				this.$refs.shareCom.goShare(shareType, this.shareTypes)
			},

			// 转发成功获取积分
			async getIntegral() {
				let user = uni.getStorageSync('user')
				console.log(user)
				let res = await this.http.post('/app/forum/topic/rePostTopic', {
					// topicId: this.ids,
					topicId: uni.getStorageSync('userInfo').id,
					platform: '',
					userInfo: uni.getStorageSync('userInfo')
				});
				console.log(21323123213, res);
				if (res.code == 200) {

				} else {
					this.$toast('取消分享');
					console.log(1111111111)
				}
			},

			async getImg() {
				let res = await this.http.get('/app/userInfo/userInvitationCode', {});
				if (res.code == 200) {
					this.codeImg = res.data
					this.$refs.shareCom.codeImg = res.data
					this.$refs.shareCom.drow()
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	
	.share-page{
		position: relative;
		width: 100%;
		height: 100%;
		// overflow: hidden;
		.poster-box{
			width: 100%;
			height: 100vh;
			position: fixed;
			top: 0;
			left: 0;
			z-index: -1;
		}
	}

	.page {
		height: 100%;
		overflow-y: auto;
		background-size: cover !important;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.text-title {
		margin-top: 86rpx;
		font-size: 48rpx;
		font-weight: 500;
		color: #FFFFFF;
	}

	.view-line {
		width: 169rpx;
		height: 9rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		margin-top: 32rpx;
	}

	.text-tips {
		margin-top: 20rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
		opacity: 0.5;
	}

	.text-rule {
		margin-top: 70rpx;
		width: 628rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 40rpx;
		text-align: center;
	}

	.view-qrcode {
		width: 650rpx;
		height: 872rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 70rpx;
		background-size: cover !important;
		margin-bottom: 60rpx;

		.view-text {
			margin-top: 100rpx;
			max-width: 546rpx;

			text {
				font-size: 28rpx;
				color: #333333;
				line-height: 40rpx;
			}
		}

		.text-name {
			margin-top: 54rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
		}

		.image-qrcode {
			margin-top: 50rpx;
			width: 350rpx;
			height: 350rpx;
		}


	}

	.view-partner {
		height: 338rpx;
		background: #FFFFFF;
		padding: 0 56rpx;
		margin-bottom: 50rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.text-share-title {
			margin-top: 60rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
		}

		.view-share {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 50rpx;
			margin-bottom: 70rpx;

			.view-item {
				margin-right: 64rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				&:nth-child(4n) {
					margin-right: 0;
				}

				image {
					width: 87rpx;
					height: 87rpx;
					margin-bottom: 20rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}
			}
		}
	}
</style>
