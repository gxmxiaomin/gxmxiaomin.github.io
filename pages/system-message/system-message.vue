<template>
	<view>
		<view class="view-list" v-if="sysInfo.length != 0">
			<view class="view-item" v-for="item in sysInfo">
				<view class="view-top">
					<text class="text-title">{{item.noticeTitle}}</text>
					<text class="text-time">{{item.createTime}}</text>
				</view>
				<view class="view-center">
					<view class="vie" v-html="item.noticeContent"></view>
				</view>
			</view>
		</view>
		<view v-else class="none">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sysInfo: [],
			}
		},
		onShow() {
			this.getSystemMessage()
		},
		methods: {
			async getSystemMessage() {
				let res = await this.http.get('/app/userHome/notificationCenter/systemMessageList', {
					pageNum: 1,
					pageSize: 10,
				});
				if (res.code == 200) {
					this.sysInfo = res.rows
				} else {}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}

	.view-list {
		margin: 30rpx;

		.view-item {
			margin-bottom: 30rpx;
			padding: 30rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;

			.view-top {
				display: flex;
				flex-direction: column;

				.text-title {
					font-size: 32rpx;
					color: #333333;
				}

				text {
					font-size: 24rpx;
					color: #999999;
				}
			}

			.view-center {
				display: flex;
				align-items: center;
				padding: 30rpx 0;

				.vie {
					text-align: left;
					max-width: 600rpx;
					margin-left: 20rpx;
					font-size: 28rpx;
					color: #333333;

					>>>img {
						width: 20px;
						height: 20px;

					}
				}
			}
		}
	}

	.none {
		color: #aaa;
		font-size: 40rpx;
		text-align: center;
		margin-top: 400rpx;
	}

	::v-deep img {
		width: 200px !important;
		height: 200px !important;
		flex-shrink: 0;
	}
</style>