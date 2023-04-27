<template>
	<view class="page">
		<ice-statusbar color="rbga(0,0,0,0)"></ice-statusbar>
		<ice-navbar bgColor="rbga(0,0,0,0)">
			<view class="view-head">
				<image class="image-back" :src="require('@/static/images/left-2.png')" mode="" @click="uni.switchTab({
					url:'../mine/mine'
				})"></image>
				<view class="view-title">星币</view>
				<image class="image-msg" @click="uni.navigateTo({
					url:'../starCoinrRule/starCoinrRule'
				})" src="../../static/images/jifenguize.png"></image>
			</view>
		</ice-navbar>
		<view class="view-header"
			:style="'background: url('+bgHeader+');height:calc(180px + '+uni.getSystemInfoSync().statusBarHeight+'px);'">
			<view class="view-money">
				<text class="text-label">星币数量</text>
				<text class="text-money">{{score}}</text>
			</view>
		</view>

		<view class="view-module">
			<view class="view-item" @click="uni.navigateTo({
				url:'../starCoinShop/starCoinShop'
			})" :style="'background: url('+bgInvite+');'">
				<text class="text-title">星币商城</text>
				<text class="text-label">小星币 大收获</text>
				<button class="u-reset-button button">查看详情 &gt;</button>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				url:'../starCoin-exchange/starCoin-exchange'
			})" :style="'background: url('+bgGroup+');'">
				<text class="text-title">兑换记录</text>
				<text class="text-label">星币兑换商品动态</text>
				<button class="u-reset-button button green">查看详情 &gt;</button>
			</view>
		</view>
		<view class="view-list">
			<text class="text-title">星币收支明细</text>

			<view class="view-item" v-for="(item,index) in scoresList" :key="index">
				<view class="view-left">
					<text class="text-remark">{{item.title}}</text>
					<text class="text-time">{{item.createTime}}</text>
				</view>

				<view class="view-content">
					<image class="image-icons" src="../../static/images/icon.png"></image>
					<view class="view-add">
						<text class="text-pm" v-if="item.pm==1">+</text>
						<text class="text-pm" v-else>-</text>
					</view>
					<view class="view-count">
						<text class="text-count">{{item.number}}</text>
					</view>
				</view>

				<!-- <image class="image-icons" src="../../static/images/icon.png"></image>
				<view class="text-money">
					<text v-if="item.pm==1">+</text>
					<text v-else>-</text>
					<view class="text-juli">{{item.number}}</view>
				</view> -->
			</view>
			<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
				pageNum++
				postStarCoin()
				return ''
			}" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgHeader: require('@/static/images/start-bg.png'),
				bgInvite: require('@/static/images/jifengou.png'),
				bgGroup: require('@/static/images/jilumian.png'),
				scoresList: [], //星币收支明细
				// starCoin:{},
				score: '', //星币数量
				loadmoreStatus: 'loadmore',
				pageNum: 1,
				// pageSize:10,

			};
		},
		onShow() {
			this.postStarCoin()
		},
		methods: {

			async postStarCoin() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/userScores/userSignInfo', {
					pageNum: this.pageNum,
					pageSize: 10
				});
				console.log('积分列表明细', res)
				if (res.code == 200) {
					this.score = res.data.score.score
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.scoresList, res.data.scoresInfo)
					this.loadmoreStatus = status;
					this.scoresList = list
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-content {
		display: flex;
		align-items: center;
		color: #F68F4A;
		font-family: Impact;

		.text-count {
			width: 100%;
			font-size: 34rpx;
			text-align: center;
		}

		.view-add {
			margin: 0 0 0 20rpx;
		}

		.view-count {
			min-width: 50rpx;
			text-align: center;
		}

		.image-icons {
			width: 28rpx;
			height: 28rpx;
			margin-left: auto;
		}
	}

	.view-head {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.image-back {
			width: 20rpx;
			height: 36rpx;
		}

		.view-title {
			width: 100%;
			height: 100%;
			display: flex;
			left: 0;
			justify-content: center;
			align-items: center;
			position: absolute;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			z-index: -1;
		}

		.image-msg {
			width: 43rpx;
			height: 43rpx;
		}
	}

	.view-header {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		background-size: cover !important;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;

		.view-money {
			display: flex;
			flex-direction: column;
			margin-left: 60rpx;
			margin-bottom: 60rpx;

			.text-label {
				font-size: 28rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.5);
			}

			.image-icons {
				width: 28rpx;
				height: 28rpx;
				margin-left: auto;
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
		padding-top: 300rpx;

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
				color: #FF711A;
				margin-left: 0;
				margin-top: 30rpx;

				&.green {
					color: #108AFB;
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

			.image-icons {
				width: 28rpx;
				height: 28rpx;
				margin-left: auto;
			}

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
				display: flex;

				.text-juli {
					text-align: center;
					display: block;
				}

				text {
					margin-left: 15rpx;
				}
			}
		}
	}
</style>
