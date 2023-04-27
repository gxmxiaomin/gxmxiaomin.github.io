<template>
	<view class="view-content">
		<view class="view-content-a">
			<u-swiper :list="list"  @click="click"></u-swiper>
			<view class="view-navigation">
				<view class="view-navigation-content">
					<view class="view-top">
						<view class="view-left">
							<text class="text-name">学历提升</text>
							<text class="text-remarks">专注培训，放心备考</text>
						</view>
						<image src="/static/images/entranceguidance1.png" mode=""></image>
					</view>
					<view class="view-bottom" @click="uni.navigateTo({
						url:'../education/education'
					})">
						查看详情 >
					</view>
				</view>
				<view class="view-navigation-content view-navigation-content1">
					<view class="view-top">
						<view class="view-left">
							<text class="text-name text-name1">高考志愿填报</text>
							<text class="text-remarks text-remarks1">为考生志愿提供参考</text>
						</view>
						<image src="/static/images/entranceguidance2.png" mode=""></image>
					</view>
					<view class="view-bottom" @click="uni.navigateTo({
						url:'../volunteer/volunteer'
					})">
						查看详情 >
					</view>
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-title">
				最新资讯
			</view>
			<view class="view-content-b-a" v-for="(item,index) in infoList" @click="uni.navigateTo({
				url:'../informationdetails/informationdetails?id='+item.id
			})">
				<view class="view-left">

				</view>
				<view class="view-right">
					{{item.title}}
				</view>
			</view>
			<view class="view-tail">
				—— 我可是有底线的！ ——
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoList:[],
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				list:[],
			}
		},
		onLoad() {
			this.getEntrance()
			this.getBannerList()
		},
		methods: {
			// app/admissionGuidance/bannerList
			async getBannerList(){
				let res = await this.http.get('/app/admissionGuidance/bannerList', {
					pageNum:1,
					pageSize:10,
				});
				if (res.code == 200) {
					for (let item of res.data) {
						this.list.push(item.carouselImgUrl)
					}
					console.log(this.list)
				} else {
				
				}
			},
			async getEntrance(){
				let res = await this.http.get('/app/admissionGuidance/informationList', {
					pageNum:1,
					pageSize:10,
				});
				if (res.code == 200) {
					this.infoList = res.rows
				} else {
				
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-content {
		background-color: #F7F7F7;

		.view-content-a {
			box-sizing: border-box;
			padding: 30rpx;
			margin-bottom: 7rpx;
			width: 750rpx;
			height: 543rpx;
			background: #FFFFFF;
			.u-swiper__wrapper{
				height: 240rpx;
			}
			.view-rotation {
				width: 690rpx;
				height: 240rpx;
				margin-bottom: 30rpx;
				background-color: #007AFF;
			}

			.view-navigation {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 30rpx;
				.view-navigation-content {
					box-sizing: border-box;
					padding-left: 28rpx;
					padding-top: 31rpx;
					width: 330rpx;
					height: 213rpx;
					background: #D4EAE8;
					border-radius: 10rpx;

					.view-top {
						display: flex;
						align-items: center;
						margin-bottom: 38rpx;

						.view-left {
							display: flex;
							flex-direction: column;

							.text-name {
								height: 31rpx;
								font-size: 32rpx;
								font-family: HuXiaoBo;
								font-weight: normal;
								color: #3F6F6B;
								margin-bottom: 16rpx;
							}

							.text-remarks {
								height: 25rpx;
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 300;
								color: #3F6F6B;
							}

						}

						image {
							width: 73rpx;
							height: 73rpx;
						}
					}

					.view-bottom {
						font-size: 24rpx;
						text-align: center;
						color: #FFFFFF;
						border-radius: 50rpx;
						width: 160rpx;
						height: 40rpx;
						background: #3F6F6B;
						border-radius: 20rpx;
						font-family: PingFang SC;
						font-weight: 300;
						line-height: 40rpx;
					}
				}

				.view-navigation-content1 {
					background-color: #EAE3D4;

					.view-top {
						.view-left {
							.text-name {
								color: #6F5C3F;
							}

							.text-remarks {
								color: #6F5C3F;
							}
						}
					}

					.view-bottom {
						background-color: #6F5C3F;
					}
				}
			}
		}

		.view-content-b {
			box-sizing: border-box;
			padding-left: 30rpx;
			padding-top: 30rpx;
			width: 750rpx;
			height: 830rpx;
			background: #FFFFFF;

			.view-title {
				font-size: 36rpx;
				font-weight: bolder;
				margin-bottom: 26rpx;
			}

			.view-content-b-a {
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;

				.view-left {
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: #4A9AFF;
					margin-right: 21rpx;
				}

				.view-right {
					height: 28rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
				}
			}

			.view-tail {
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 36rpx;
				text-align: center;
				margin-top: 38rpx;
			}
		}
	}
</style>
