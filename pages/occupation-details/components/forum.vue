<template>
	<view>
		<view class="box" v-for="item in schoolFurom">
			<view class="box-1">
				<image :src="item.headUrl" mode=""></image>
				<view class="box-1-text">
					<view class="box-1-text1">{{item.nickName}}
						<text>校长</text>
					</view>
					<view class="box-1-text2">
						<text>{{item.createTime}}</text>
						<text>{{item.city}}</text>
					</view>
				</view>
			</view>

			<view class="box-2">
				<text>{{item.title}}</text>
				<view class="box-2-1">
					<image :src="imgurl" mode="" v-for="(imgurl, imgIndex) in item.videoCover.split(',')"
						:key="imgIndex"></image>
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
				images: 'https://img2.baidu.com/it/u=1572613686,938558453&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=400'
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
		background: #FFF;

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

			view {}

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
				display: flex;
				flex-flow: row wrap;
				justify-content: space-around;

				image {
					width: 20%;
					height: 140rpx;
					border-radius: 10rpx;
				}
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
			bottom: 10rpx;

			.flow {
				display: inline-block;
				position: relative;
				margin-left: 80%;
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

						font-size: 22rpx;
						padding: 0 20rpx 0 20rpx;
						background: #4a9dfd;
						color: #fff;
						border-radius: 20rpx;

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
					margin-top: 20rpx;

					&:nth-child(2) {
						// margin-top: -10rpx;
						margin: 0 0 10rpx 0;
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
