<template>
	<view v-if="schoolDync.dync.length > 0">
		<view class="" v-for="item in schoolDync.dync">
			<view class="box" @click="DownloadMethods(isShare,uni.navigateTo({
					url: '../../pages/juvenile/juvenile-Details?id=' + item.id + '&targetId=' + item.userId
				}),invitationCode)">
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
						<image :src="i" mode="" v-for="i in item.videoCover.split(',')"></image>
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
				<view @click="show = true" class="tb1">
					<image src="@/static/images/zhuanfa.svg" mode=""></image>
					<text>{{item.forward}}</text>
				</view>
				<view @click.stop="collect(item.id)" class="tb1">
					<image src="@/static/images/shoucang.png" mode=""></image>
					<text>{{collection}}</text>
				</view>
				<view class="tb1">
					<image src="@/static/images/xiaoxi.svg" mode=""></image>
					<text>{{item.comment}}</text>
				</view>
				<view @click.stop="goods(item.id)" class="tb1">
					<image src="@/static/images/praise.png" mode=""></image>
					<text>{{item.fabulous}}</text>
				</view>
			</view>
			
			<u-popup :show="show" @close="show = false" @open="console.log('open')" :round="10" mode="bottom">
				<view class="view-content-d">
					<view class="view-top">
						— 分享至 —
					</view>
					<view class="view-bottom">
						<view class="view-one" @click="share('weixin','WXSceneSession',item)">
							<image src="@/static/images/informationdetails1.png" mode=""></image>
							<view class="view-name">
								微信
							</view>
						</view>
						<view class="view-one" @click="share('weixin', 'WXSceneTimeline',item)">
							<image src="@/static/images/informationdetails4.png" mode=""></image>
							<view class="view-name">
								朋友圈
							</view>
						</view>
						<view class="view-one" @click="shareQQ(item)">
							<image src="@/static/images/informationdetails3.png" mode=""></image>
							<view class="view-name">
								QQ
							</view>
						</view>
						<view class="view-one" @click="share('sinaweibo',item)">
							<image src="@/static/images/informationdetails2.png" mode=""></image>
							<view class="view-name">
								微博
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
	<view v-else class="none">
		暂无动态
	</view>
</template>

<script>
	export default {
		props: ['schoolDync', 'isShare', 'invitationCode'],
		data() {
			return {
				show: false,
				images: [],
			};
		},

		created() {
			setTimeout(() => {
				console.log('active接收到的参数', this.schoolDync)
			}, 50)
		},

		methods: {
			//分享
			share(provider = 'sinaweibo', scene = '',e) {
				console.log("分享的结果为", provider, scene)
				let img = this.videoCover || ''
				if (img == '') img =
					'https://img0.baidu.com/it/u=2725915437,1236608227&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
				else img = img.split(',')[0]
				uni.share({
					provider: provider,
					scene: scene,
					type: 0,
					title: e.title,
					imageUrl: img,
					href: this.shareUrlList.postUrls({
						id: e.id,
						targetId: e.userId
					}),
					success: (res) => {
						console.log("success:" + JSON.stringify(res));
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			
			// qq分享文字
			shareQQ(e) {
				let img = this.videoCover || ''
				if (img == '') img =
					'https://img0.baidu.com/it/u=2725915437,1236608227&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
				else img = img.split(',')[0]
				uni.share({
					provider: 'qq',
					type: 1,
					title: e.title,
					summary: e.title,
					imageUrl: img,
					href: this.shareUrlList.postUrls({
						id: e.id,
						targetId: e.userId
					}),
					success: (res) => {
						console.log("success:" + JSON.stringify(res));
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			
			async collect(id) {
				const res = await this.http.post('/app/School/insertForumCollection', {
					id: id
				})
				console.log("收藏的结果", res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						message: res.msg,
						type: 'success'
					})
				} else {
					this.$refs.uToast.show({
						message: '收藏失败',
						type: 'error'
					})
					return
				}
			
				if (!this.dync.shou) {
					this.dync.shou = true
				} else {
					this.dync.shou = null
				}
			},
			
			async goods(id) {
				const res = await this.http.get('/app/School/vote', {
					id: id
				})
				console.log('点赞的结果为', res)
				if (res.code == 200) {
					this.$refs.uToast.show({
						message: res.msg,
						type: 'success'
					})
				} else {
					this.$refs.uToast.show({
						message: res.msg,
						type: 'error'
					})
					return
				}
				if (!this.dync.dian) {
					this.dync.fabulous += 1
					this.dync.dian = 1
				} else {
					this.dync.fabulous -= 1
					this.dync.dian = null
				}
			},
			transmit() {
				console.log('111')
			}
		},
	}
</script>

<style lang="scss">
	.none {
		color: #aaa;
		text-align: center;
	}

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
	
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
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
</style>
