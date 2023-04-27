<template>
	<view>
		<view class="view-list">
			<view class="view-item" v-for="(item,index) in noticeList">
				<view class="view-top">
					<text class="text-order">{{item.content}}</text>
				</view>
				<text class="text-time">{{item.createTime}}</text>
				<view class="view-commodity">
					<image :src="cover" mode=""></image>
					<text>{{item.goodsName}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList:[],
				cover:'',
			}
		},
		onLoad() {
			this.getNotice()
		},
		methods: {
			async  getNotice(){
				let res = await this.http.get('/app/userScores/exchangeScoreGoodsNotification', {
					pageNum: 1,
					pageSize: 10,
				});
				if (res.code == 200) {
					this.noticeList = res.rows
					for (let item of res.rows) {
						this.cover = this.getCover(item.goodsImg);
					}
				} else {
				
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}

	.view-list {
		display: flex;
		flex-direction: column;
		margin-top: 15rpx;
		background-color: #007AFF;

		.view-top {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.view-item {
			border-radius: 10rpx;
			padding: 30rpx;
			background-color: #FFFFFF;
			margin: 15rpx 30rpx 15rpx 30rpx;

			.text-order {
				font-size: 32rpx;
				font-weight: 600;
				color: #333333;
			}

			.text-time {
				font-size: 24rpx;
				color: #999999;
			}

			.view-commodity {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 37rpx 0 0 0;

				image {
					width: 120rpx;
					height: 120rpx;
					margin-right: 20rpx;
					border-radius: 16rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}
			}

			.view-bottom {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				padding-top: 29rpx;

				text {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}

				image {
					width: 11rpx;
					height: 19rpx;
				}
			}
		}
	}
</style>
