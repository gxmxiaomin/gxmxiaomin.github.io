<template>
	<view class="view-content">
		<u-navbar safeAreaInsetTop placeholder fixed title="学历提升" bgColor="#ffffff" @leftClick="uni.navigateBack({
			delta:1
		})">
			<image slot="right" src="/static/images/education1.png" class="image-qrcode" @click="uni.navigateTo({
						url:'../service/service'
					})">
			</image>
		</u-navbar>
		<view class="view-content-a">
			<view class="view-advantage">
				<view class="view-one">
					<view>

					</view>
					<text>教学优势</text>
					<view>

					</view>
				</view>
				<view class="view-two">
					<image src="/static/images/education2.png" mode=""></image>
					<view class="view-introduce">
						<view class="view-top">轻松入学</view>
						<view class="view-bottom">尚德AI学习法，学习无压力。边上课，尚德边为 你提供</view>
					</view>
				</view>
				<view class="view-two view-three">
					<image src="/static/images/education3.png" mode=""></image>
					<view class="view-introduce">
						<view class="view-top1">考试保障</view>
						<view class="view-bottom">尚德机构2021年特别推出培训费用损失保障。 考试不通过可按协议获得保障金补偿！</view>
					</view>
				</view>
			</view>
			<view class="view-remarks">
				自考本科早报名早取证，错过将浪费一年， 值得吗？
			</view>
			<view class="view-remarks">
				2022年本期中公教育考学历名额初审截止日：
			</view>
			<view class="view-remarks1">
				10月30日
			</view>
			<view class="view-submit" @click="uni.navigateTo({
				url:'../enrollinformation/enrollinformation'
			})">
				<view class="view-button">申请报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	/deep/.u-navbar {

		.uicon-arrow-left {
			color: #333333 !important;
		}

		.u-navbar__content__title {
			color: #333333 !important;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
		}

		.image-qrcode {
			width: 44rpx;
			height: 44rpx;
		}
	}

	.view-content-a {
		background-image: url(../../static/images/education4.png);
		overflow: hidden;
		padding-bottom: 100rpx;

		.view-advantage {
			width: 660rpx;
			height: 556rpx;
			background: #FFFFFF;
			border-radius: 21rpx;
			margin: 897rpx auto 0;
			box-sizing: border-box;
			padding: 49rpx 40rpx;

			.view-one {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 47rpx;

				text {
					height: 31rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #2B2B2B;
					line-height: 29rpx;
					margin: 0 35rpx;
				}

				view {
					width: 26rpx;
					height: 7rpx;
					background: #FD8148;
					border-radius: 3rpx;
				}
			}

			.view-two {
				width: 576rpx;
				height: 160rpx;
				background: #FFF6EC;
				border-radius: 11rpx;
				display: flex;
				align-items: center;
				padding: 33rpx 21rpx;
				margin-bottom: 41rpx;

				image {
					width: 73rpx;
					height: 73rpx;
					margin-right: 22rpx;
				}

				.view-introduce {
					.view-top {
						height: 27rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FD8148;
						line-height: 26rpx;
						margin-bottom: 16rpx;
					}

					.view-bottom {
						width: 415rpx;
						height: 45rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #4A3638;
						line-height: 26rpx;
					}
				}
			}

			.view-three {
				background-color: #ECEDFF;

				.view-top1 {
					height: 27rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #5988F5;
					line-height: 26rpx;
					margin-bottom: 16rpx;
				}
			}
		}

		.view-remarks {
			width: 583rpx;
			height: 69rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #DEE6F0;
			line-height: 39rpx;
			margin-left: 50rpx;
			margin-top: 42rpx;
		}

		.view-remarks1 {
			height: 69rpx;
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: 550;
			color: #DEE6F0;
			line-height: 39rpx;
			margin-top: 40rpx;
			margin-left: 50rpx;
		}

		.view-submit {
			width: 100%;
			height: 80rpx;
			position: fixed;
			bottom: 100rpx;

			.view-button {
				width: 630rpx;
				height: 80rpx;
				background: #FFFFFF;
				border-radius: 40rpx;
				text-align: center;
				line-height: 80rpx;
				margin: 70rpx auto;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;

			}
		}

	}
</style>
