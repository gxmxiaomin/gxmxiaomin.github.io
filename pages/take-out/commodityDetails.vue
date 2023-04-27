<template>
	<view class="box">
		<view class="view-content" :style="'top: -'+height+'px;'">
			<view class="function-button">
				<view @click="uni.navigateBack()" class="fanhui">
					<image src="../../static/images/details1.png" mode=""></image>
				</view>
				<!-- <image class="fanhui" src="../../static/images/fh.png" mode=""></image> -->
				<image class="right" src="../../static/images/gwc.png" mode=""></image>
				<image class="right" src="../../static/images/zhuanfa.png" mode=""></image>
			</view>
			<u-swiper :list="schoolImg" height="384" @change="e =>currentBannerNum = e.current" :circular="true"
				indicatorStyle="right: 20rpx">
				<view slot="indicator" class="indicator-num">
					<text class="indicator-num__text">{{ currentBannerNum + 1 }}/{{ schoolImg.length }}</text>
				</view>
			</u-swiper>

			<view class="decorate"></view>


			<view class="box-1 view-desc">
				<view style="height: 20rpx;"></view>
				<view class="title-1">
					<text>无暇大美女一只100斤</text>
					<text>月销9999+</text>
				</view>
				<view class="title-2">老品种、口感好</view>
				<view class="title-3">
					<view class="jdt">
						<view class=""></view>
					</view>
					<text class="name">剩余1只</text>
				</view>
				<view class="title-4">
					<text>￥8.9</text>
					<text>￥13.9</text>
				</view>
				<view class="title-5">
					<view>陕西</view>
					<view>S级</view>
					<view>安全证书</view>
				</view>
				<view style="height: 20rpx;"></view>
			</view>


			<view style="margin-top:30rpx;" class="view-desc box-2">
				<view class="guige">
					<text>规格</text>
					<text>1个</text>
					<image class="image-2" src="../../static/images/arrow_right.png"></image>
				</view>
				<view class="peisong">
					<text>配送</text>
					<text>立即下单，预计30-50分钟后送达</text>
				</view>
				<view class="youhui">
					<text>优惠</text>
					<text>新人专享券；满200减30</text>
				</view>
				<view style="height: 10rpx;"></view>
			</view>


			<view class="box-3">
				<view class="pinglun">
					<text class="lankuai"></text>
					<view class="pl"> <text>评论</text> <text>(4800)</text> </view>
				</view>

				<view class="score-comment">
					<view class="cla">非常新鲜(200)</view>
					<view>服务非常棒(120)</view>
					<view>整洁(10)</view>
					<view>性价比贼高(220)</view>
					<view>可甜可甜(170)</view>
				</view>
				<view style="height: 1rpx; width: 95%; margin: auto;background-color: #f8f8f8;margin-top: 30rpx;">
				</view>
				<view class="comment" v-for="item in schoolevaluate">
					<image :src="item.headUrl" mode=""></image>
					<view class="box-1-text">
						<view>{{item.nickName}}</view>
						<view class="box-1-text2">
							<text>{{item.createTime}}</text>
							<text>{{item.number}}浏览</text>
						</view>
					</view>
					<view class="">
						{{item.content}}
					</view>
				</view>
				<view style="height: 10rpx;"></view>
			</view>

			<view class="box-4">
				<view class="detail">
					<text class="lankuai"></text>
					<view class="sp"> <text>商品详情</text></view>
				</view>

				<view class="detail-img">
					<image :src="img" mode=""></image>
				</view>
			</view>

			<!-- 底部固定 -->
			<view class="footer">
				<view class="cell">
					<image class="kefu" src="@/static/images/kefu.svg" mode=""></image>
					<text>客服</text>
				</view>
				<view class="cell">
					<!-- <u-icon name="star-fill" size="24" color="#e6c715" v-if="schoolcollect"></u-icon> -->
					<u-icon name="star" size="24"></u-icon>

					<text>收藏</text>
				</view>
				<view class="btn">
					<u-button text="加入购物车" type="primary" shape=""></u-button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: 'https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/09/15/d7b5132d33294362be19db1674809170.jpg',
				schoolevaluate: [{
					content: "太新鲜了吧，好喜欢啊！！！这是我网购最好的一次， 会一直回购冲冲冲！！！ ",
					createTime: "11.15 20:22",
					praise: '105',
					number: '2214',
					nickName: "山药",
					headUrl: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/10/24/7c8206df13de4fb2b8a6a5169da7d052.jpg",
				}],
				currentBannerNum: 0,
				scrollTop: 0,
				height: '',
				schoolImg: [
					'https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/09/15/d7b5132d33294362be19db1674809170.jpg',
					'https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/09/15/d7b5132d33294362be19db1674809170.jpg'
				]
			}
		},

		created() {
			uni.getSystemInfo({
				complete: (res) => {
					this.height = res.statusBarHeight;
					console.log(this.height);
				}
			})
		},

		methods: {
			onPageScroll(e) {
				this.scrollTop = e.scrollTop
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.box {
		.view-content {
			position: relative;

			.indicator-num {
				padding: 2rpx 0;
				background-color: #378efd;
				border-radius: 100rpx;
				width: 80rpx;
				@include flex;
				justify-content: center;
				margin-bottom: 30rpx;

				&__text {
					color: #FFFFFF;
					font-size: 22rpx;
				}

			}

			.function-button {
				width: 100%;
				// background-color: #838383;
				position: absolute;
				top: 60rpx;
				z-index: 9;
				position: fixed;

				.right {
					width: 50rpx;
					height: 50rpx;
					float: right;
					margin-right: 20rpx;
				}

				.fanhui {
					width: 50rpx;
					height: 50rpx;
					background-color: #666666;
					border-radius: 50%;
					float: left;
					margin-left: 20rpx;
					text-align: center;
					
					image {
						width: 18rpx;
						height: 28rpx;
						margin-top: 12rpx;
					}
				}
			}
		}

		.decorate {
			height: 30rpx;
			width: 100%;
			background-color: #f1f1f1;
			border-radius: 20rpx 20rpx 0 0;
			position: relative;
			bottom: 20rpx;
		}

		.view-desc {
			width: 95%;
			margin: auto;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			padding: 0 30rpx;
			// margin-bottom: 20rpx;
			position: relative;
			bottom: 20rpx;

		}

		.box-1 {
			.title-1 {
				text {
					&:nth-child(1) {}

					&:nth-child(2) {
						color: #a8a8a8;
						font-size: 24rpx;
						// text-align: right;
						float: right;
						margin-top: 10rpx;
					}
				}
			}

			.title-2 {
				color: #a8a8a8;
				font-size: 24rpx;
			}

			.title-3 {
				margin-top: -10rpx;

				.jdt {
					display: inline-block;
					width: 400rpx;
					height: 10rpx;
					background-color: #f1f1f1;
					border-radius: 10rpx;

					view {
						width: 300rpx;
						height: 10rpx;
						background-color: #378efd;
						border-radius: 10rpx;
					}
				}

				.name {
					display: inline-block;
					color: #378efd;
					font-size: 22rpx;
					margin-left: 10rpx;
				}
			}

			.title-4 {
				text {
					&:nth-child(1) {
						color: #fc6935;
						font-size: 36rpx;
					}

					&:nth-child(2) {
						color: #a8a8a8;
						font-size: 24rpx;
						text-decoration: line-through;
					}
				}
			}

			.title-5 {

				display: flex;
				/* 项目在容器中换行显示 */
				flex-wrap: wrap;
				justify-content: flex-end;
				justify-content: center;
				justify-content: space-between;
				// justify-content: space-around;

				view {
					display: inline-block;
					color: #a8a8a8;
					font-size: 24rpx;
				}
			}
		}

		.box-2 {
			.guige {
				// margin-top: 40rpx;
				position: relative;
				top: 8rpx;
			}

			view {
				margin-bottom: 15rpx;

				text {
					&:nth-child(1) {
						color: #a8a8a8;
						font-size: 26rpx;
					}

					&:nth-child(2) {
						font-size: 26rpx;
						display: inline-block;
						margin-left: 15rpx;
					}
				}

				.image-2 {
					width: 12rpx;
					height: 20rpx;
					float: right;
					margin-top: 20rpx;
				}
			}
		}

		.box-3 {
			width: 95%;
			margin: auto;
			border-radius: 20rpx;
			background-color: #FFFFFF;

			.pinglun {
				position: relative;
				top: 20rpx;

				.lankuai {
					display: inline-block;
					width: 8rpx;
					height: 30rpx;
					background-color: #378efd;
				}

				.pl {
					display: inline-block;

					text {
						&:nth-child(1) {
							display: inline-block;
							margin-left: 20rpx;
						}

						&:nth-child(2) {
							font-size: 26rpx;
							color: #a8a8a8;
							display: inline-block;
							margin-left: 10rpx;
						}
					}
				}
			}

			.score-comment {
				margin-top: 20rpx;
				min-height: 100rpx;
				padding: 0 30rpx;

				.cla {
					font-size: 24rpx;
					margin: 20rpx 10rpx 0 0rpx;
					display: inline-block;
					padding: 5rpx 20rpx 5rpx 20rpx;
					background: #9bc6fe;
					border-radius: 40rpx;
					color: #edf4fe;
				}

				view {
					font-size: 24rpx;
					margin: 20rpx 10rpx 0 0rpx;
					display: inline-block;
					padding: 5rpx 20rpx 5rpx 20rpx;
					background: #f1f1f1;
					border-radius: 40rpx;
					color: #a0a0a0;
				}
			}

			.comment>image {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 10rpx;
				border-radius: 50%;
				// margin-top: 20rpx;
			}

			.comment {
				// border-top: 1rpx solid #f3f0f3;
				margin: 20rpx 0 40rpx 20rpx;

				.box-1-text {
					height: 100rpx;

					.box-1-text2 {

						text {
							&:nth-child(2) {
								// margin-left: 40rpx;
								display: inline-block;
								position: relative;
								right: -340rpx;
							}
						}
					}

					display: inline-block;
					margin: 20rpx 0 0 20rpx;

					view {
						font-size: 30rpx;
						// position: relative;
						// margin-top: 10rpx;
						padding: 0 0 10rpx 0;

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

		.box-4 {
			width: 95%;
			margin: auto;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			margin-top: 30rpx;

			.detail {
				position: relative;
				top: 20rpx;

				.lankuai {
					display: inline-block;
					width: 8rpx;
					height: 30rpx;
					background-color: #378efd;
				}

				.sp {
					display: inline-block;

					text {
						display: inline-block;
						margin-left: 20rpx;
					}
				}
			}

			.detail-img {
				margin-top: 30rpx;

				image {
					width: 100%;
				}
			}
		}

		.footer {
			.view-item {
				display: flex;
				padding: 0 14rpx;
				align-items: center;
				flex-direction: column;
			}

			.image {
				width: 38rpx;
				height: 38rpx;
				margin-top: 10rpx;
			}

			.text-collect {
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
				display: block;
				text-align: center;
				margin-top: 15rpx;
			}

			width: 100vw;
			height: 100rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			justify-content: space-around;

			.cell {
				width: 100rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				text {
					font-size: 24rpx;
					color: #838383;
				}

				.kefu {
					width: 43rpx;
					height: 43rpx;
					margin-top: 8rpx;
				}
			}

			.btn {
				margin-right: 2rpx;
				width: 60%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
