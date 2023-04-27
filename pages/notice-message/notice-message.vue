<template>
	<view class="view-message-container">
		<view class="view-message-item">
			<view class="view-title">
				<view>
					{{NoticeList.noticeTitle}}
				</view>
				<text>{{NoticeList.createTime}}</text>
			</view>
			<view class="view-content">
				<u-parse :content="NoticeList.noticeContent"></u-parse>
			</view>
		</view>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ids: '',
				NoticeList: [],
			}
		},
		onLoad(option) {
			this.ids = option.id
			this.getNotice()
			this.messageShowTip.showTextMessage(this)
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		methods: {
			// 首页平台公告
			async getNotice() {
				let res = await this.http.get('/app/userHome/homeBulletinInfo', {
					id: this.ids
				});
				if (res.code == 200) {
					this.NoticeList = res.data
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-message-container {
		padding: 30rpx;
		display: flex;
		flex-direction: column;

		.view-message-item {
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 0 auto 30rpx;
			padding: 30rpx;

			.view-title {
				width: 100%;
				margin: 0 auto;
				padding-bottom: 30rpx;
				border-bottom: 1px solid #EFEFEF;

				view {
					font-size: 32rpx;
					color: #333333;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				text {
					font-size: 24rpx;
					color: #999999;
				}
			}

			.view-content {
				padding-top: 30rpx;
			}
		}
	}
</style>
