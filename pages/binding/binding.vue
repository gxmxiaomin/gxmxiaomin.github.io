<template>
	<view>
		<view class="view-binding">
			<image class="image-bg" src="../../static/images/5c02bd128f6b1.png"></image>
			<view class="view-content">
				<view class="view-title">
					<text>—— 绑定成功 ——</text>
				</view>
				<view class="view-person">
					<image class="image-person" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
					<text class="text-person">用户昵称</text>
				</view>
				<view class="view-invitation">
					<image class="image-invitation" src="../../static/images/youhuijuan.png"></image>
					<view class="view-code">
							<text class="view-codes">你的专属邀请码</text>
							<image class="image-code" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
							<text class="view-trip">这是您的专属邀请码，发送给好友，好友下载并绑定你的邀请码，你可获得丰厚的奖励。</text>
					</view>
				</view>
				<view class="view-share">
					<button class="button-share">分享我的邀请码</button>
				</view>
				<view class="view-last-trip">您的专属邀请码在 个人中心-推广中心-邀请好友 中</view>
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
	.view-binding{
		width: 100%;
		position: relative;
		.view-last-trip{
			font-size: 24rpx;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			margin-top: 50rpx;
		}
		.view-share{
			width: 100%;
			margin-top: 50rpx;
			.button-share{
				width: 633rpx;
				height: 80rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 8rpx 19rpx 0rpx #2470D1;
				border-radius: 40rpx;
				font-size: 28rpx;
				line-height: 80rpx;
				font-weight: 500;
				color: #333333;
			}
		}
		.view-content{
			width: 100%;
			position: absolute;
			top: 0rpx;
			padding-top: 75rpx;
			.view-invitation{
				margin-top: 40rpx;
				position: relative;
				.view-code{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					padding: 57rpx;
					.view-codes{
						font-size: 32rpx;
						font-weight: 400;
						color: #333333;
						display: block;
						text-align: center;
					}
					.image-code{
						width: 393rpx;
						height: 393rpx;
						display: block;
						margin: 0 auto;
						margin-top: 18rpx!important;
					}
					.view-trip{
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
						display: block;
						padding: 0rpx 82rpx;
						flex-wrap: wrap;
						margin-top: 37rpx;
					}
				}
				.image-invitation{
					width: 610rpx;
					height: 719rpx;
					margin: 0 auto;
					display: block;
				}
			}
			.view-person{
				margin-top: 27rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.image-person{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
				.text-person{
					margin-left: 18rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
			.view-title{
				text{
					display: block;
					margin: 0 auto;
					text-align: center;
					font-size: 48rpx;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}
		.image-bg{
			width: 100%;
			height: 100vh;
		}
	}
</style>
