<template>
	<view class="content">
		<view class="view-contact">
			<view class="view-top">
				<view class="view-name">
					<text class="text-left">绘画创造世界</text>
					<text class="text-price">￥1099</text>
				</view>
				
				<view class="view-hour">
					<text>总课时：10</text>
					<text>已上课：1</text>
					<text>剩余课时：9</text>
				</view>
				<view class="view-refund">
					<view class="view-calculation">
						<text class="text-refund">退费课时</text>
						<text>9</text>
					</view>
					<view class="view-number">
						<text>合计费用</text>
						<text class="text-number">￥989.1</text>
					</view>
				</view>
			</view>
		</view>
		<view class="view-status">
			<text>申请状态</text>
			<view class="view-step-list">
				<view class="view-step-item" v-for="(item,index) in stepList">
					<view class="view-step-icon">
						<view class="view-dot">
			
						</view>
						<view class="view-line" v-if="index<stepList.length-1"></view>
					</view>
					<view class="view-step-right">
						<text class="text-time">
							10月19日 17:30开课
						</text>
						<text class="text-name">
							第一课时
						</text>
						<text class="text-time-group">上课时间：10月20日 17:30-18:30</text>
						<text class="text-context">课程反馈：孩子上课十分认真，想法很多，画画的色彩天赋也很好，配色十分和谐</text>
					</view>
			
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1,
				stepList:[{},{},],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.content {
		background-color: #F7F7F7;
	}

	.view-contact {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;

		.view-top {
			margin: 0 44rpx;
			padding: 39rpx 0rpx 29rpx 0rpx;

			.view-name {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.text-left {
					font-size: 40rpx;
					font-weight: 500;
					color: #333333;
					line-height: 21rpx;
					margin-bottom: 29rpx;
				}

				.text-price {
					font-size: 28rpx;
					font-weight: 500;
					color: #F68710;
					line-height: 21rpx;
				}
			}

			.view-hour {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				line-height: 32rpx;
				padding-bottom: 29rpx;
				border-bottom: 1rpx solid #EFEFEF;
			}

			.view-refund {
				display: flex;
				flex-direction: column;

				.view-calculation {
					display: flex;
					flex-direction: row;
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					margin: 20rpx 0;
				}
				view {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					.text-number {
						font-size: 28rpx;
						font-weight: 500;
						color: #F68710;
						line-height: 21rpx;
					}
				}
			}
		}
	}

	.view-status {
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 45rpx auto;
		background-color: #FFFFFF;
		padding: 30rpx;
		
		.view-step-list {
			margin: auto;
			margin-top: 30rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			
			.view-step-item {
				display: flex;
				flex-direction: row;
			}
			
			.view-step-title {
				display: flex;
				flex-direction: row;
			}
			
			.view-step-icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 15rpx;
			}
			
			.view-step-right {
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				flex-shrink: 1;
				margin-bottom: 30rpx;
			
				.text-name {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
				}
			
				.text-time-group {
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
					margin-top: 10rpx;
				}
			
				.text-time {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					margin-bottom: 20rpx;
				}
				
				.text-context{
					font-size: 24rpx;
					font-weight: 400;
					color: #333333;
					margin-top: 50rpx;
					margin-bottom: 30rpx;
				}
			}
			
			
			.view-line {
				width: 4rpx;
				flex-grow: 1;
				flex-shrink: 1;
				background: #4A9AFF;
			}
			
			.view-dot {
				width: 30rpx;
				height: 30rpx;
				background-color: #4A9AFF;
				border-radius: 50%;
			}
		}
	}
</style>
