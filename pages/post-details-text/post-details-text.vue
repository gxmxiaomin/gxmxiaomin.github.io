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
				<text class="text-title">教育部答复！一批学校有望“升级”</text>
				<text>教育部日前公布《关于政协第十三届全国委员会
					第四次会议第0302号（教育类037号）提案答复
					的函》，对《关于加快解决技师学院纳入高等学
					校序列的提案》进行了答复。教育部明确，下一
					步将会同人力资源社会保障部，将指导支持办学
					规范、质量较高的技师学院尽快达到标准要求，
					按照高等学校设置制度规定，纳入高等学校序列。</text>
				<text>答复介绍，从学校分类上看，中职学校有四类：
					职业高中、普通中专、成人中专和技工学校。按
					照《职业教育法》等规定和国务院现行的“三定”
					方案，职业高中、普通中专和成人中专归教育部
					门管理，技工学校归人社部门管理。技工学校及
					就读学生与其他类型中等职业学校及就读学生享
					受平等的政策待遇和发展环境。</text>
				<!-- <view class="view-img">
					<image src="../../static/logo.png" mode=""></image>
				</view> -->
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
				show: false
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
			.text-title{
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
			margin-top: 20rpx;
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
