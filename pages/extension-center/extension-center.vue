<template>
	<view class="page">
		<view class="view-header" :style="'background: url('+bgHeader+');'">
			<view class="view-navbar" :style="'margin-top: '+(statusBarHeight)+'rpx;'">
				<u-icon class="icon-back" @click="uni.navigateBack({
					
				})" name="arrow-left" color="#ffffff"></u-icon>
				<text class="text-title">推广中心</text>
			</view>

			<view class="view-money">
				<text class="text-label">我的佣金</text>
				<text class="text-money">{{commissionInfo.brokeragePrice}}</text>
			</view>

			<view class="view-withdraw" @click="uni.navigateTo({
				url:'../Withdrawals/Withdrawals'
			})">
				<image src="../../static/images/coin.png" mode=""></image>
				<text>去提现 &gt;</text>
			</view>
		</view>

		<view class="view-module">
			<view class="view-item" @click="uni.navigateTo({
				url:'../invite-friend/invite-friend'
			})" :style="'background: url('+bgInvite+');'">
				<text class="text-title">邀请好友</text>
				<text class="text-label">分享得佣金</text>
				<button class="u-reset-button button">查看详情 &gt;</button>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				url:'../my-group/my-group'
			})" :style="'background: url('+bgGroup+');'">
				<text class="text-title">我的团队</text>
				<text class="text-label">加入团队得佣金</text>
				<button class="u-reset-button button green">查看详情 &gt;</button>
			</view>
		</view>

		<view class="view-money-mudule">
			<view class="view-item" @click="uni.navigateTo({
				url:'../extension-bond/extension-bond'
			})">
				<text class="text-label">保证金/代理费提成</text>
				<text class="text-money">￥{{commissionInfo.securityDepositNum}}</text>
				<image src="../../static/images/arrow_more.png"></image>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				url:'../commission-details/commission-details'
			})">
				<text class="text-label">交易额提成</text>
				<text class="text-money">￥{{commissionInfo.transactionAmountNum}}</text>
				<image src="../../static/images/arrow_more.png"></image>
			</view>
		</view>
		<view class="view-list">
			<text class="text-title">佣金明细</text>

			<view class="view-item" v-for="(item,index) in schoolList">
				<view class="view-left">
					<text class="text-remark">{{item.title}}</text>
					<text class="text-time">{{item.createTime}}</text>
				</view>
				<view class="t
				ext-money"><text v-if="item.pm==1">+</text><text v-else>-</text>{{item.number}}</view>
			</view>
			<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
				page++
				getcommissionList()
				return ''
			}" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schoolList: [], //佣金明细
				commissionInfo: {}, //佣金详情
				bgHeader: require('@/static/images/bg_extension.png'),
				bgInvite: require('@/static/images/bg_invite.png'),
				bgGroup: require('@/static/images/bg_group.png'),
			};
		},
		onShow() {
			this.getcommissionList()
			this.getInfo()
		},
		methods: {
			async getInfo() {
				let res = await this.http.post('/app/userPersonalCenter/popularizeCenterInfo', {

				});
				if (res.code == 200) {
					this.commissionInfo = res.data
				} else {

				}
			},
			async getcommissionList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.post("/app/userPersonalCenter/commissionDetailsList", {
					pageNum: 1,
					pageSize: 10,
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.schoolList = list;
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

	.page {
		padding-top: 403rpx;
	}

	.view-header {
		height: 373rpx;
		display: flex;
		flex-direction: column;
		background-size: cover !important;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;

		.view-navbar {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: relative;

			.icon-back {
				position: absolute;
				left: 30rpx;
			}

			.text-title {
				font-size: 36rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.view-money {
			display: flex;
			flex-direction: column;
			margin-top: 65rpx;
			margin-left: 60rpx;

			.text-label {
				font-size: 28rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.5);
			}

			.text-money {
				font-size: 60rpx;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		.view-withdraw {
			position: absolute;
			bottom: 63rpx;
			right: 0;
			width: 221rpx;
			height: 70rpx;
			background: #FFFFFF;
			border: 1px solid #FFFFFF;
			border-radius: 10rpx 0px 0px 10rpx;
			padding-left: 23rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			image {
				width: 38rpx;
				height: 38rpx;
				margin-right: 10rpx;
			}

			text {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
			}
		}



	}

	.view-module {
		display: flex;
		flex-direction: row;
		align-items: center;

		.view-item {
			margin-left: 30rpx;
			width: 330rpx;
			height: 221rpx;
			background-size: cover !important;
			display: flex;
			flex-direction: column;
			padding: 30rpx;

			.text-title {
				font-size: 36rpx;
				font-weight: 500;
				color: #FFFFFF;
			}

			.text-label {
				margin-top: 10rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.5);
			}

			.button {
				width: 168rpx;
				height: 48rpx;
				line-height: 48rpx;
				background: #FFFFFF;
				border-radius: 24rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #4673F7;
				margin-left: 0;
				margin-top: 30rpx;

				&.green {
					color: #5ABEAF;
				}
			}
		}
	}

	.view-money-mudule {
		margin: 30rpx 0;
		display: flex;
		flex-direction: row;
		align-items: center;

		.view-item {
			margin-left: 30rpx;
			width: 330rpx;
			height: 149rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			position: relative;
			padding: 30rpx;

			.text-label {
				font-size: 24rpx;
				font-weight: 400;
				color: #666666;
				margin-bottom: 20rpx;
			}

			.text-money {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}

			image {
				width: 41rpx;
				height: 41rpx;
				position: absolute;
				right: 30rpx;
				bottom: 30rpx;
			}


		}
	}

	.view-list {
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;

		.text-title {
			font-size: 32rpx;
			font-weight: 500;
			color: #111734;
			margin-bottom: 30rpx;
		}

		.view-item {
			padding: 30rpx 0;
			display: flex;
			flex-direction: row;
			align-items: center;

			.view-left {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;

				.text-remark {
					font-size: 28rpx;
					font-weight: 400;
					color: #111734;
				}

				.text-time {
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 6rpx;
				}
			}

			.text-money {
				font-size: 28rpx;
				font-weight: 500;
				color: #FF6B35;
			}
		}
	}
</style>
