<template>
	<view class="view-content">
		<u-navbar safeAreaInsetTop placeholder fixed title="高考志愿填报" bgColor="#ffffff" @leftClick="uni.navigateBack({
			delta:1
		})">
			<image slot="right" src="/static/images/education1.png" class="image-qrcode" @click="uni.navigateTo({
						url:'../service/service'
					})">
			</image>
		</u-navbar>
		<view class="view-content-a">
			<view class="view-introduce">
				<image class="image-major" src="../../static/images/major.png"></image>
				<view class="view-one">
					<image src="/static/images/volunteer1.png" mode=""></image>
					<view class="view-name">
						优选志愿
					</view>
					<view class="view-remarks">
						在往年高考录取分数基础上，通过基于大数据分 析的独特算法，根据考生预估的高考分数或位次， 模拟筛选高校及专业，为考生填报志愿提
					</view>
				</view>
				<view class="view-one">
					<image src="/static/images/volunteer2.png" mode=""></image>
					<view class="view-name">
						智能甄选
					</view>
					<view class="view-remarks">
						基于往年录取分数，在心理测评的基础上，经过 数据分析和概率测算，按照高校或专业的录取可 能性，为考生快速甄选出不同录取难度的高
					</view>
				</view>
			</view>
			<view class="view-button" @click="uni.navigateTo({
				url:'../enrollinformation/enrollinformations'
			})">
				申请报名
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
	page{
		background-color: #172034;
	}
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
		background-image: url(../../static/images/volunteer.png);
		background-size: 100%;
		overflow: hidden;

		.view-introduce {
			width: 621rpx;
			height: 634rpx;
			margin: 0 auto;
			background-color: #314372;
			margin-top: 592rpx;
			border-radius: 30rpx;
			box-sizing: border-box;
			padding-left: 70rpx;
			color: #FFFFFF;
			position: relative;
			.image-major{
				position: absolute;
				right: -20rpx;
				top: -30rpx;
				width: 80rpx;
				height: 80rpx;
			}
			.view-one {
				margin-bottom: 35rpx;

				image {
					width: 97rpx;
					height: 45rpx;
					margin-top: 40rpx;
				}

				.view-name {
					width: 133rpx;
					height: 31rpx;
					font-size: 33rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					margin-bottom: 31rpx;
				}

				.view-remarks {
					width: 499rpx;
					height: 87rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}

		.view-button {
			width: 630rpx;
			height: 80rpx;
			background: #4A9AFF;
			border-radius: 40rpx;
			margin: 58rpx auto;
			text-align: center;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80rpx;
		}
	}
</style>
