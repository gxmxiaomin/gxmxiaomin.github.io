<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>发表评价</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
				</view>
			</view>
			<view class="bug"></view>
			<!-- </view> -->
		</view>
		
		<view style="height:calc(var(--status-bar-height) + 44px);"></view>
		
		<view class="box" v-for="i in 2">
			<view class="title">
				<view>你对商家的菜品满意吗?</view>
				<view>已对商家匿名</view>
			</view>
			<view class="hotel">
				<image src="../../static/logo.png" mode=""></image>
				<view class="text">
					<view>果蔬(文化路店)</view>
					<image v-for="i in 4" src="../../static/images/start2.png" mode=""></image>
					<image src="../../static/images/shoucangxiao-hei.png" mode=""></image>
				</view>
			</view>
			
			<scroll-view scroll-y="true" class="scroll-box">
				<view class="scroll_content">
					<view class="card">
						<u--textarea v-model="textValue" placeholder="对商家的商品进行评价" height="200" style="background-color: #f1f1f1;height: 400rpx;"></u--textarea>
						<view class="img_area">
							<view class="img_list">
								
								<view class="img_cell upLoad_box">
									<u-icon name="plus" color="#515151" size="32"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textValue:"",
				phone:"",
				show: false,
				imgList:['https://img1.baidu.com/it/u=2155912277,1796243231&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=499'],
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}
.top-bar {
		// height: 120rpx;
		height: calc(var(--status-bar-height) + 44px);
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		// background-image: linear-gradient(#579efc, #b1cff3);
		background-color: #FFF;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.bar-left {
			flex: 2;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 2;
			height: 100%;
		}

		.bug {
			background-color: #f1f1f1;
			height: 30rpx;
			position: absolute;
			top: calc(var(--status-bar-height) + 40px);
			width: 100%;
			border-radius: 20rpx 20rpx 0 0;
		}

		.u-badge--error[data-v-2b1712d8] {
			background-color: #3b90fd;
		}
	}
	
	.box {
		padding: 20rpx;
		width: 95%;
		margin: auto;
		background-color: #FFF;
		min-height: 400rpx;
		border-radius: 10rpx;
		margin-top: 30rpx;
		
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			view {
				&:nth-child(1) {
					font-size: 32rpx;
				}
				&:nth-child(2) {
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
		
		.hotel {
			margin-top: 20rpx;
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			.text {
				display: inline-block;
				position: relative;
				top: -20rpx;
				left: 10rpx;
				
				view {
					font-size: 28rpx;
					margin-left: 10rpx;
				}
				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 10rpx;
				}
			}
		}
		
		.scroll-box {
			margin-top: 10rpx;
			width: 100%;
			// height: calc(100vh - var(--status-bar-height) - 44px);
			background-color: #fff;
			.scroll_content {
				width: 100%;
				min-height: 100%;
				// padding: 25rpx;
			}
		}
		
		.card {
			width: 100%;
			min-height: 88rpx;
			border-radius: 20rpx;
			background-color: #F1F1F1;
			box-sizing: border-box;
			padding: 20rpx;
			.img_area {
				width: 100%;
				color: #333333;
				font-size: 32rpx;
				font-family: PingFang-SC-Regular;
				font-weight: 600;
				padding-left: 10rpx;
				position: absolute;
				top: 300rpx;
			}
			.img_list {
				margin-top: 20rpx;
				width: 100%;
				height: 120rpx;
				display: flex;
				
				.img_cell {
					width: 120rpx;
					height: 120rpx;
					position: relative;
					top: -20rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.upLoad_box {
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #fff;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
