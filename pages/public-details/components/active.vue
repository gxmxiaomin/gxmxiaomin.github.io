<template>
	<view>
		<view class="" v-for="item in schoolDync.dync">
			<view class="box">
				<view class="box-1">
					<image :src="item.headUrl" mode=""></image>
					<view class="box-1-text">
						<view>{{item.nickName}}</view>
						<view class="box-1-text2">
							<text>{{item.createTime}}</text>
							<text>{{item.city}}</text>
						</view>
					</view>
				</view>

				<view class="box-2">
					<text>{{item.title}}</text>
					<view>
						<image :src="i" mode=""  v-for="i in item.videoCover.split(',')"></image>
					</view>
				</view>
				<!-- <view class="box-2">
					<text>{{item.content}}</text>
					<view>
						<image :src="images" mode=""></image>
					</view>
				</view> -->
			</view>
			<view class="box-3">
				<view class="tb1">
					<image src="../../../static/images/zhuanfa.svg" mode=""></image>
					<text>{{item.forward}}</text>
				</view>
				<view class="tb1">
					<image src="../../../static/images/shoucang.png" mode=""></image>
					<text>{{collection}}</text>
				</view>
				<view class="tb1">
					<image src="../../../static/images/xiaoxi.svg" mode=""></image>
					<text>{{item.comment}}</text>
				</view>
				<view class="tb1">
					<image src="../../../static/images/praise.png" mode=""></image>
					<text>{{item.fabulous}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['schoolDync'],
		data() {
			return {
				images:[],
			};
		},

		created() {
			setTimeout(() => {
				console.log('active接收到的参数', this.schoolDync)
			}, 50)
		},

		methods: {},
	}
</script>

<style lang="scss">
	.box-3 {
		// width: 100%;
		display: flex;
		flex-flow: row wrap;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		justify-content: space-around;

		image {
			width: 30rpx;
			height: 30rpx;
		}

		view {
			// display: inline-block;
			// justify-content: space-around;
			// margin: 10rpx 20rpx 20rpx 20rpx;
		}

		.tb1 {
			text {
				font-size: 24rpx;
				display: inline-block;
				position: relative;
				bottom: 5rpx;
				left: 10rpx;
			}
		}
	}

	.box {

		
		.box-2 {
			position: relative;
			bottom: 20rpx;
			padding: 0 20rpx 0 20rpx;
			// margin: 0 40rpx 0 40rpx;

			// .box-2-text2 {
			// 	display: inline-block;
			// 	margin: 20rpx 0 20rpx 0 ;
			// }
		}

		.box-2>view {
			margin-top: 40rpx;
			display: flex;
			// flex-flow: row wrap;
			justify-content: space-around;
			
			image {
				width: 20%;
				height: 140rpx;
				border-radius: 10rpx;
			}
		}

		// .box-2>view>image {
		// 	width: 100%;
		// }

		.box-1>image {
			width: 100rpx;
			height: 100rpx;
			margin-bottom: 10rpx;
			border-radius: 50%;
			// margin-top: 20rpx;
		}

		.box-1 {
			margin: 0 0 0 20rpx;

			.box-1-text {

				.box-1-text2 {

					text {
						&:nth-child(2) {
							margin-left: 40rpx;
						}
					}
				}

				display: inline-block;
				margin: 20rpx 0 0 20rpx;

				view {
					font-size: 40rpx;
					// position: relative;
					margin-top: 20rpx;

					&:nth-child(2) {
						// margin-top: -10rpx;
						margin: 0 0 10rpx 0;
						// display: inline-block;
						// margin-bottom: 10rpx;
						position: relative;
						bottom: 20rpx;

					}
				}

				text {
					font-size: 24rpx;
					color: #aaa;
				}
			}
		}
	}
</style>
