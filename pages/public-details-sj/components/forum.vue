<template>
	<view>
		<view class="box" v-for="item in schoolFurom">
			<view class="box-1">
				<view class="flow">
					<image src="../../../static/images/eye-closed.png" mode=""></image>
					<text>{{item.browse}}</text>
				</view>
				<image :src="item.headUrl" mode=""></image>
				<view class="box-1-text">
					<view class="box-1-text1">{{item.nickName}}
						<text style="color: black;">已认证:</text>
						<text>校长</text>
					</view>
					<view class="box-1-text2">
						<text>发表于{{item.createTime}}</text>
						<!-- <text>09:52:01</text> -->
						<text>{{item.city}}</text>
					</view>
				</view>
			</view>

			<view class="box-2">
				<text>{{item.title}}</text>
				<view class="box-2-1">
					<image :src="item.videoCover" mode=""></image>
				</view>
				<view class="box-2-2">
					<view class="">
						<text>芭比Q:</text>
						<text>感觉这个学校环境很好</text>
					</view>
					<view class="">
						<text>芭比Q:</text>
						<text>感觉这个学校环境很好</text>
					</view>
					<view class="box-2-3">
						点击查看180条回复
					</view>
				</view>
			</view>

			<view class="box-3">
				<view class="tb1">
					<image src="../../../static/images/zhuanfa.svg" mode=""></image>
					<text>{{item.forward}}</text>
				</view>
				<view class="tb1">
					<image src="../../../static/images/shoucang.png" mode=""></image>
					<text>{{item.collection}}</text>
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
		<u-loadmore :status="loadmoreStatus" loadingText="点击加载更多" @loadmore="()=>{
					$emit('test')
					return ''
				}" />
	</view>
</template>

<script>
	export default {
		props: ['schoolFurom'],
		data() {
			return {

			};
		},

		created() {
			setTimeout(() => {
				console.log('forum接收到的参数', this.schoolFurom)
			}, 50)
		},

		methods: {},
	}
</script>

<style lang="scss">
	.box {
		border-bottom: 1rpx solid #fdfbfd;

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

		.box-2 {
			position: relative;
			bottom: 40rpx;
			padding: 0 20rpx 0 20rpx;
			// margin: 0 40rpx 0 40rpx;

			// .box-2-text2 {
			// 	display: inline-block;
			// 	margin: 20rpx 0 20rpx 0 ;
			// }
		}

		.box-2 {
			.box-2-3 {
				color: #4a9dfd;
				margin-left: 20rpx;
				padding-bottom: 20rpx;
				font-size: 28rpx;
			}

			.box-2-1 {
				margin-top: 40rpx;
			}

			.box-2-2 {
				margin-top: 40rpx;
				border-radius: 10rpx;
				background: #f3f0f3;

				text {
					display: inline-block;
					padding: 10rpx 0 10rpx 20rpx;

					&:nth-child(1) {
						color: #4a9dfd;
						font-size: 28rpx;
					}

					&:nth-child(2) {
						font-size: 28rpx;
						// margin-left: 10rpx;
					}
				}
			}

		}

		.box-2>view>image {
			width: 100%;
		}

		// .box-2>view {
		// 	margin-top: 40rpx;
		// }

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
			// margin-bottom: 40rpx;
			position: relative;
			bottom: 40rpx;

			.flow {
				display: inline-block;
				position: relative;
				margin-left: 82%;
				top: 80rpx;
			}

			.flow>image {
				width: 20rpx;
				height: 20rpx;
				margin-right: 10rpx;
				margin-bottom: -5rpx;
			}

			.flow>text {
				display: inline-block;
				font-size: 20rpx;
			}

			// margin: 20rpx 0 0 20rpx;
			margin-left: 20rpx;

			.box-1-text {

				.box-1-text1 {
					text {
						font-size: 20rpx;
						display: inline-block;
						position: relative;
						bottom: 5rpx;
						left: 10rpx;

						&:nth-child(2) {
							font-size: 20rpx;
							padding: 0 10rpx 0 10rpx;
							background: #4a9dfd;
							color: #fff;
							border-radius: 20rpx;
						}
					}
				}


				.box-1-text2 {


					text {
						&:nth-child(2) {
							margin-left: 20rpx;
						}

						&:nth-child(3) {
							margin-left: 20rpx;
						}
					}
				}

				display: inline-block;
				margin: 20rpx 0 0 20rpx;

				view {
					font-size: 40rpx;
					color: #4a9dfd;
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
