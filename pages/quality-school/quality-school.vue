<template>
	<view>
		<view class="view-list ">
			<view class="view-item" v-for="item in 5" @click="uni.navigateTo({
				url:'../child-details/child-details'
			})">
				<image class="image-school" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
				<view class="view-brief">
					<view class="view-name">
						<text class="text-name">A&S艺术学校</text>
						<image class="image-rate" src="../../static/images/pingfen.png" mode=""></image>
						<text class="text-rate">4.9分</text>
					</view>
					<view class="view-content u-line-2">让每一个人都爱上学习，并从学习中受益。让每一个人都爱上学习，并从学习中受益。</view>
					<view class="view-address">
						<text class="text-address u-line-1">湖南省长沙市芙蓉区韶山北路...</text>
						<text class="text-distance">500m</text>
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

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.view-list {
		padding: 30rpx;
		.view-item {
			display: flex;
			margin-top: 60rpx;

			&:first-child {
				margin-top: 0rpx;
			}

			.view-brief {
				flex-grow: 1;
				flex-shrink: 1;
				margin-left: 20rpx;

				.view-address {
					margin-top: 25rpx;
					display: flex;

					.text-address {
						width: 340rpx;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
					}

					.text-distance {
						margin-left: auto;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
					}
				}

				.view-content {
					font-size: 28rpx;
					font-weight: bold;
					color: #666666;
					margin-top: 20rpx;
				}

				.view-name {
					display: flex;
					align-items: center;

					image {
						width: 19rpx;
						height: 19rpx;
						margin-left: 160rpx;
					}

					.text-name {
						font-size: 36rpx;
						font-weight: bold;
						color: #333333;
					}

					.text-rate {
						font-size: 24rpx;
						font-weight: 500;
						color: #FC6129;
						margin-left: 5rpx;
					}
				}
			}

			.image-school {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
