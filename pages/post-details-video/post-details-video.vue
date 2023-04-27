<template>
	<view>
		<view class="view-information">
			<view class="view-user">
				<view class="view-userNickname">
					<image src="../../static/logo.png" mode=""></image>
					<view>
						<text class="text-name">代英伦</text>
						<text>2020-08-09 17:43</text>
					</view>
				</view>
				<view class="view-follow">+关注</view>
			</view>

			<view class="view-substance">
				<text>靠一份工资真的很难实现财务自由
					不鼓励大家辞职，但鼓励你们可以做斜杠青年
					通过副业多赚一份收入</text>
				<view class="view-video" :style="'background:url('+bg+')'">
					<view class="view-img">
						<image src="../../static/images/suspend.png" mode=""></image>
						<image src="../../static/images/broadcast.png" mode=""></image>
					</view>
				</view>
				<view class="view-schedule">
					<view>
						<text>05:21</text>
						<view class="view-line">
							<view class="view-line2">
								
							</view>
						</view>
						<text>10:20</text>
					</view>
					<!-- <u-line-progress height="5"  :percentage="30" activeColor="#FFFFFF" ></u-line-progress> -->
				</view>
				<view class="view-label">
					<text>#教育</text>
				</view>
			</view>
		</view>
		<view class="view-content">
			<view class="view-content-a">
			</view>
			<view class="view-content-b">
				<view class="view-summary">
					<view class="view-line">

					</view>
					<text>全部评论（27）</text>
				</view>
				<view class="view-comment" v-for="(item,index) in 6">
					<view class="view-top">
						<image src="" mode=""></image>
						<view class="view-information">
							<view class="view-name">
								用户昵称
							</view>
							<view class="view-remarks">
								<view class="view-left">
									20小时前
								</view>
								<view class="view-right">
									回复
								</view>
							</view>
						</view>
					</view>
					<view class="view-bottom">
						这里是评价内容这里是评价内容这里是评价内容这里是 评价内容这里是评价内容
					</view>
				</view>
				<view class="view-tail">
					已经没有更多内容了～
				</view>
			</view>
			<view class="view-content-c">
				<view class="view-left">
					<input type="text" value="" placeholder="评论..." />
				</view>
				<view class="view-right">
					<view class="view-one">
						<u-icon name="thumb-up" size="20"></u-icon>
						<text>30</text>
					</view>
					<view class="view-one">
						<u-icon name="star" size="20"></u-icon>
						<text>收藏</text>
					</view>
					<view class="view-one" @click="show = true">
						<u-icon name="share" size="20"></u-icon>
						<text>分享</text>
					</view>
				</view>
			</view>
			<u-popup :show="show" @close="show = false" @open="console.log('open')" :round="10" mode="bottom">
				<view class="view-content-d">
					<view class="view-top">
						— 分享至 —
					</view>
					<view class="view-bottom">
						<view class="view-one">
							<image src="/static/images/informationdetails1.png" mode=""></image>
							<view class="view-name">
								微信
							</view>
						</view>
						<view class="view-one">
							<image src="/static/images/informationdetails4.png" mode=""></image>
							<view class="view-name">
								朋友圈
							</view>
						</view>
						<view class="view-one">
							<image src="/static/images/informationdetails3.png" mode=""></image>
							<view class="view-name">
								QQ
							</view>
						</view>
						<view class="view-one">
							<image src="/static/images/informationdetails2.png" mode=""></image>
							<view class="view-name">
								微博
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				bg:require('@/static/images/5c02bd128f6b1.png')
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.view-information {
		.view-user {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx;

			.view-userNickname {
				display: flex;
				align-items: center;

				view {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					.text-name {
						font-size: 28rpx;
						color: #666666;
						line-height: 61rpx;
					}

					text {
						font-size: 24rpx;
						color: #999999;
						line-height: 41rpx;
					}
				}

				image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.view-follow {
				width: 140rpx;
				height: 60rpx;
				background: #4A9AFF;
				border-radius: 30rpx;


				font-size: 28rpx;
				color: #FFFFFF;
				line-height: 36rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
		}

		.view-substance {
			margin: 30rpx;
			display: flex;
			flex-direction: column;
			.view-video{
				height: 389rpx;
				border-radius: 30rpx;
				background-size: cover !important;
				
				display: flex;
				align-items: center;
				justify-content: space-around;
				
				.view-img{
					display: flex;
					image{
						width: 47rpx;
						height: 47rpx;
						margin-left: 30rpx;
					}
				}
			}
			
			.view-schedule{
				margin-top: -70rpx;
				view{
					display: flex;
					align-items: center;
					justify-content: space-around;
					text{
						font-size: 28rpx;
						color: #FFFFFF;
						line-height: 48rpx;
					}
					.view-line{
						width: 428rpx;
						height: 5rpx;
						background: rgba(255, 255, 255, 0.5);
						border-radius: 3rpx;
						.view-line2{
							position: absolute;
							left: 150rpx;
							width: 175rpx;
							height: 5rpx;
							background: #FFFFFF;
							border-radius: 3rpx;
						}
					}
				}
			}
			.text-title {
				font-size: 36rpx;
				color: #333333;
				line-height: 48rpx;
			}

			text {
				font-size: 32rpx;
				color: #333333;
				line-height: 48rpx;
			}

			.view-img {
				image {
					width: 690rpx;
					height: 387rpx;
					border-radius: 10rpx;
				}
			}

			image {
				margin-top: 10rpx;
				width: 218rpx;
				height: 218rpx;
				border-radius: 10rpx;
			}
		}

		.view-label {
			width: 20%;
			margin-top: 50rpx;
			background: #EDEDED;
			border-radius: 20rpx;

			text {
				display: flex;
				align-items: center;
				justify-content: space-around;
				// padding: 27rpx;
				font-size: 20rpx;
				color: #666666;

			}
		}
	}

	.view-content {
		background-color: #F7F7F7;

		.view-content-a {
			box-sizing: border-box;
			padding: 37rpx 30rpx;
			margin-bottom: 20rpx;
			width: 750rpx;

			background: #FFFFFF;

			.view-title {
				width: 666rpx;
				height: 77rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 47rpx;
				margin-bottom: 30rpx;
			}

			.view-time {
				width: 133rpx;
				height: 19rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #999999;
				line-height: 48rpx;
				margin-bottom: 58rpx;
			}

			.view-text {
				width: 691rpx;
				height: 268rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 48rpx;
			}
		}

		.view-content-b {
			box-sizing: border-box;
			padding-left: 30rpx;
			padding-top: 39rpx;
			width: 750rpx;
			height: 543rpx;
			background: #FFFFFF;

			.view-summary {
				width: 690rpx;
				height: 60rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 48rpx;
				border-bottom: 1rpx solid #EFEFEF;
				margin-bottom: 30rpx;
				display: flex;
				align-items: center;

				.view-line {
					width: 11rpx;
					height: 32rpx;
					background: #4A9AFF;
					border-radius: 5rpx;
				}

				text {
					margin-left: 20rpx;
				}
			}

			.view-comment {
				border-bottom: 1rpx solid #EFEFEF;
				margin-bottom: 36rpx;

				.view-top {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;

					image {
						background-color: #007AFF;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						margin-right: 17rpx;
					}

					.view-information {
						.view-name {
							height: 27rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #666666;
							line-height: 21rpx;
							margin-bottom: 12rpx;
						}

						.view-remarks {
							display: flex;
							align-items: center;
							font-size: 20rpx;
							height: 19rpx;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #4A9AFF;
							line-height: 21rpx;

							.view-left {
								color: #999999;
								margin-right: 28rpx;
							}
						}
					}
				}

				.view-bottom {
					width: 670rpx;
					height: 69rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 42rpx;
					margin-bottom: 46rpx;
				}
			}

			.view-tail {
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 42rpx;
				text-align: center;
			}
		}

		.view-content-c {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 98rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 14rpx 30rpx;
			background-color: #FFFFFF;

			.view-left {
				width: 451rpx;
				height: 70rpx;
				background: #F7F7F7;
				border-radius: 35rpx;

				input {
					margin-left: 20rpx;
					margin-top: 20rpx;
					height: 27rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 42rpx;
				}
			}

			.view-right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 42rpx;

				.view-one {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}
		}

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
	}
</style>
