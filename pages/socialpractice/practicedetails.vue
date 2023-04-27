<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-one">
				<image src="/static/images/practicedetails2.png" mode="" @click="uni.navigateBack({
					delta:1
				})"></image>
				<view class="view-right">
					<image src="/static/images/practicedetails.png" mode="" @click="uni.navigateTo({
						url:'../service/service'
					})"></image>
				</view>
			</view>
			<view class="view-two">
				<view class="view-left">
					<view class="view-top">
						{{messInfo.name}}
					</view>
					<view class="view-bottom">
						{{messInfo.details}}
					</view>
				</view>
				<view class="view-right">
					¥{{messInfo.price}}
				</view>
			</view>
			<view class="view-three">
				<view class="view-left">
					<view class="view-top">
						活动时间：{{messInfo.createTime}}
					</view>
					<view class="view-bottom">
						具体位置：{{messInfo.address}}
					</view>
				</view>
				<image src="/static/images/practicedetails1.png" mode=""></image>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-one">
				已有{{messInfo.signUpNum}}人报名
			</view>
			<view class="view-two">
				活动内容
			</view>
			<view class="view-three">
				<view class="view-title">
					<view class="view-left">

					</view>
					<view class="view-right">
						{{messInfo.detailedIntroduction}}
					</view>
				</view>
				<view class="view-text">
					{{messInfo.details}}
				</view>
				<image src="" mode=""></image>
			</view>
		</view>
		<view class="view-content-d">
			<view class="view-left">
				<view class="view-left-a">
					<image src="/static/images/collect1.png" mode=""></image>
					<view class="view-name">
						收藏
					</view>
				</view>
				<view class="view-left-a">
					<image src="/static/images/fenxiang.png" mode=""></image>
					<view class="view-name">
						分享
					</view>
				</view>
			</view>
			<view class="view-right" @click="uni.navigateTo({ url:'./signup?peice='+messInfo.price })">
				立即报名
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messInfo:[],
				ids:'',
				a:'2022-09-28 00:00:00',
				b:'2022-09-8 11:16:17',
				c:'测试优惠卷'
			}
		},
		onLoad(option) {
			this.ids = option.id
			this.getInfo()
			console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@',option)
		},
		onShow() {
			// this.test()
		},
		methods: {
			async test() {
				let res = await this.http.post('/app/yxStoreCoupon/addStoreCoupon', {
					amount: 50,
					  couponPrice: 50,
					  couponTime: 100,
					  couponType: 1,
					  endTime: this.a,
					  id: 0,
					  isDel: 1,
					  peopleLimit: 2,
					  startTime: this.b,
					  status: 2,
					  storeId: 123,
					  title: this.c,
					  useMinPrice: 1
				});
				console.log('****************************************************')
				console.log(res)
			},
			
			//收藏
			// async collect() {
			// 	let res = await this.http.get('/app/userHomeNavigation/collectOrUnCollect', {
			// 		storeId:233
			// 		// userType: 2
			// 	});
			// 	console.log('****************************************************')
			// 	console.log(res)
			// },
			
			async getInfo(){
				let res = await this.http.get('/app/socialPractice/info', {
					id:this.ids
				});
				console.log(res)
				if (res.code == 200) {
					this.messInfo = res.data
				} else {
				
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-content {
		.view-content-a {
			width: 750rpx;
			height: 686rpx;
			background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.57) 100%);
			box-sizing: border-box;
			padding: 30rpx;

			.view-one {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 270rpx;

				image {
					width: 16rpx;
					height: 28rpx;
				}

				.view-right {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;

					image {
						width: 46rpx;
						height: 48rpx;
					}
				}
			}

			.view-two {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.8);
				margin-bottom: 40rpx;

				.view-left {
					.view-top {
						font-size: 40rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						margin-bottom: 25rpx;
					}
				}

				.view-right {
					height: 60rpx;
					background: #FFF9ED;
					border: 1rpx solid #FC6129;
					border-radius: 30rpx;
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FC6129;
					text-align: center;
					padding: 0rpx 28rpx;
				}
			}

			.view-three {
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.7);

				.view-bottom {
					width: 621rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap
				}

				image {
					width: 29rpx;
					height: 36rpx;
					margin-top: 20rpx;
				}
			}
		}

		.view-content-b {
			width: 750rpx;
			background: #FFFFFF;
			border-radius: 30rpx 30rpx 0px 0px;
			box-sizing: border-box;
			padding: 30rpx;
			margin-top: -20rpx;

			.view-one {
				width: 200rpx;
				height: 40rpx;
				background: rgba(74, 154, 255, 0.1);
				border: 1rpx solid #4A9AFF;
				border-radius: 20rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #4A9AFF;
				text-align: center;
				line-height: 40rpx;
				margin-bottom: 73rpx;
			}

			.view-two {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 29rpx;
			}

			.view-three {
				.view-title {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-bottom: 40rpx;

					.view-left {
						width: 16rpx;
						height: 16rpx;
						background: #4A9AFF;
						border-radius: 50%;
						margin-right: 12rpx;
					}
				}

				.view-text {
					width: 654rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-left: 28rpx;
					margin-bottom: 29rpx;
				}

				image {
					width: 690rpx;
					height: 400rpx;
					border-radius: 10rpx;
					background-color: #9ACAFC;
					margin-bottom: 29rpx;
				}
			}
		}

		.view-content-c {
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 0 30rpx;
			padding-bottom: 200rpx;

			.view-title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				margin-bottom: 29rpx;
			}

			.view-comment {

				.view-user {
					border-bottom: 1rpx solid #EFEFEF;

					.view-top {
						display: flex;
						align-items: center;
						margin-bottom: 26rpx;

						image {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							background-color: #9ACAFC;
							margin-right: 19rpx;
						}

						.view-information {
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;

							.view-name {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #666666;
							}
						}
					}

					.view-bottom {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						text-align: right;
						margin-bottom: 29rpx;
					}
				}
			}
		}

		.view-content-d {
			height: 98rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-around;
			position: fixed;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			padding: 11rpx 0rpx;
			.view-left {
				display: flex;
				align-items: center;
				margin-left: 35rpx;

				.view-left-a {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-right: 74rpx;

					image {
						width: 43rpx;
						height: 43rpx;
						margin-bottom: 10rpx;
					}
				}
			}

			.view-right {
				width: 450rpx;
				height: 80rpx;
				background: #4A9AFF;
				box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(19, 98, 198, 0.43);
				border-radius: 40rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
