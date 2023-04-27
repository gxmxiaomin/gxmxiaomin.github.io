<template>

	<view>
		<view v-show="!flag">
			<u-loading-icon></u-loading-icon>
		</view>
		<view class="view-goods-container" v-show="flag">
			<view class="view-goods-list">
				<view class="view-goods-item" v-for="(item,index) in curriculums.data" @click="dbs(item)">
					<view class="view-goods-cover">
						<image :src="item.courseImg" mode=""></image>
					</view>
					<view class="view-goods-info">
						<view>
							{{item.courseName}}
						</view>
						<view class="text">
						
							<text style="">{{item.signUpNum}}加入学习</text>
						</view>
						<view>
						</view>
					</view>
				</view>
			</view>
			<view style="margin: 20px 0 0 60px" v-if="curriculums.code === 500">
				{{curriculums.msg}}
			</view>
		</view>
		
		<!-- 底部固定 -->
		<!-- <view class="footer">
			<view class="cell">
				<u-icon name="heart" size="24"></u-icon>
				<text>点赞</text>
			</view>
			<view class="cell">
				<u-icon name="star" size="24"></u-icon>
				<text>收藏</text>
			</view>
			<view class="cell">
				<u-icon name="share" size="24"></u-icon>
				<text>分享</text>
			</view>
			<view class="btn">
				<u-button text="点击报名" type="primary" shape="circle"></u-button>
			</view>
		</view> -->


	</view>
</template>

<script>
	export default {
		props: {
			flag: {
				type: Boolean,
			},
			curriculum: {
				type: Object,
				default: {},
				required: true,
				validator: function(value) {
					return true
				}
			},
			ids: {
				type: String
			}

		},
		data() {
			return {
				curriculums: []
			};
		},
		created() {

			setTimeout(() => {
				// console.log("test组件中接收到的参数", this.curriculum)
				this.curriculums = this.curriculum.course
			}, 1000)
			
		},
		mounted() {
			
		},
		methods: {
			dbs(item) {
				console.log(item,'5555555')
				uni.navigateTo({
					url: '../interest-course-details/interest-course-details?id=' + item.courseId + '&ids=' + this.ids + '&urls=' + item.courseImg +'&nums=' + item.signUpNum
				})
			}
		}
	}
</script>

<style lang="scss">
	.footer {
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
		}

		.btn {
			width: 40%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.view-goods-container {
		padding: 30rpx;
		// background-color: #F7F7F7;

		.view-goods-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-content: flex-start;


			.view-goods-item:last-child {
				margin-bottom: 100rpx;
			}

			.view-goods-item {
				display: flex;
				flex-direction: column;
				width: 340rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 30rpx;

				.view-goods-cover {
					width: 340rpx;
					height: 280rpx;

					image {
						border-radius: 20rpx;
						width: 100%;
						height: 100%;
					}
				}

				.view-goods-info {
					display: flex;
					flex-direction: column;
					padding: 12rpx;

					.text {
						text-align: right;

						.text-1 {

							display: inline-block;
							width: 200rpx;
							// background: #FC7F52;

						}
					}

					view {

						&:nth-child(1) {
							font-size: 30rpx;
						}

						&:nth-child(2) {
							// margin: 10rpx 0;

							text {
								font-size: 22rpx;
								color: #aaa;
								// padding: 0 60rpx 0 0;
							}
						}

						&:last-child {
							color: #FC7F52;

							text {
								&:last-child {
									font-family: 'PingFang-SC-Bold';
									font-size: 36rpx;
									margin-left: 6rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
