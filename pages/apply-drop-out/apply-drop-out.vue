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
						<view class="view-number">
							<text @click="reduce">-</text>
							<input type="number" :value="total" @input="countVal" />
							<text @click="add">+</text>
						</view>
					</view>
					<view class="view-total">
						<text>合计费用</text>
						<text class="text-number">￥989.1</text>
					</view>
				</view>
			</view>
		</view>
		<view class="view-reason">
			<u--textarea v-model="value1" 
			placeholder="请输入申请原因" count></u--textarea>
		</view>
		<view class="view-button" @click="uni.navigateTo({
					url:'../apply-agree/apply-agree'
				})">
			<button >确认申请</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: '',
				total: 1,
			}
		},
		methods: {
			// 减
			reduce() {
				if (this.total <= 1) {
					uin.showToast({
						title: "数值不能小于1",
						icon: "none"
					})
					return;
				}
				this.total = this.total - 1;
			},
			// 加
			add() {
				if (this.total >= 9) {
					uni.showToast({
						title: "数值不能大于9",
						icon: "none"
					})
					return;
				}
				this.total = this.total + 1;
			},
			// 数值检测
			countVal(e) {
				this.total = e.detail.value;
				if (this.total == 0) {
					this.total = 1
				}
			},

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
				margin-top: 30rpx;
				display: flex;
				flex-direction: column;
				.view-calculation{
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
					line-height: 40rpx;
					.text-refund{
						display: flex;
						flex-direction: row;
						flex-grow: 1;
						flex-shrink: 1;
					}
					
					.view-number{
							display: flex;
							flex-direction: row;
							align-items: center;
							text{
								height: 36rpx;
								width: 36rpx;
								text-align: center;
								line-height: 36rpx;
								background: #EEEEEE;
								border-radius: 50%;
							}
							input{
								margin: 0 20rpx;
								background: #EEEEEE;
								border-radius: 7rpx;
								font-size: 28rpx;
								width: 70rpx;
								text-align: center;
								color: #333333;
								line-height: 40rpx;
							}
						}
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
				
				.view-total{
					margin-top: 20rpx;
				}
			}
		}
	}

	.view-reason {
		margin-top: 30rpx;
		margin-left: 30rpx;
		
		/deep/.u-textarea{
			width: 690rpx;
			height: 333rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			border: none;
			padding: 30rpx;
		}
	}

	.view-button {
		margin: 0 90rpx;
		margin-top: 450rpx;

		button {
			background-color: #4A9AFF;
			border-radius: 44rpx;
			color: #FFFFFF;
		}
	}
</style>
