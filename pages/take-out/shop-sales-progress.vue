<template>
	<view class="page_view">
		<view class="top_bar">
			<view>
				<u-icon name="arrow-left" color="#515151" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="page_title">
				<text>售后进度</text>
			</view>
			<view></view>
		</view>
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="scroll-content">
				<view class="card notice">
					<text>公告：受疫情影响订单量大，商家会根据申请的时间 来处理，请您耐心等待</text>
				</view>
				
				<view class="card statu_box">
					<view class="box_title">
						<text>退款中</text>
					</view>
					<view class="progress_box">
						<!-- 进度总体 -->
						<view class="progress_bg">
							<!-- 进度填充 -->
							<view class="progress_fill" :style="'--len:'+ 1 +';'"></view>
							<!-- 进度提示 -->
							<view class="progress_tip" :style="'--len:'+ 1 +';'"></view>
						</view>
					</view>
					<view class="text_box">
						<view class="text_cell">
							<text class="text_title">取消订单</text>
							<text class="text_time">11.17 15:34</text>
						</view>
						<view class="text_cell">
							<text class="text_title">商家受理</text>
							<text class="text_time">11.17 15:34</text>
						</view>
						<view class="text_cell">
							<text class="text_title">退款成功</text>
							<text class="text_time">11.17 15:34</text>
						</view>
					</view>
				</view>
				
				<view class="card order_info_box">
					<view class="box_title">
						<text>订单信息</text>
					</view>
					<view class="shop_info">
						<view class="info_cell">
							<image :src="img" mode=""></image>
							<text>自然鲜(文化路店）</text>
						</view>
						<view class="info_cell">
							<u-icon name="photo" color="#2979ff" size="28"></u-icon>
							<text>联系商家</text>
						</view>
					</view>
					
					<!-- 商品 -->
					<scroll-view scroll-x="true" class="shop_scroll_box">
						<view class="shop_scroll_content">
							<view class="shop_cell" v-for="item in 10" :key="item">
								<image :src="img" mode=""></image>
								<view class="shop_title">
									<text>【整果】海 南鲜橙一整箱</text>
								</view>
								<view class="shop_price">
									<text>￥9.9</text>
								</view>
							</view>
						</view>
					</scroll-view>
					
					<view class="line_box">
						<view class="line_title">
							<text>退款原因</text>
						</view>
						<view class="line_value">
							<text>多拍，不想要了</text>
						</view>
					</view>
					<view class="line_box">
						<view class="line_title">
							<text>退款金额</text>
						</view>
						<view class="line_value">
							<text>￥299.5</text>
						</view>
					</view>
					
					<view class="line_box">
						<text class="line_value">订单编号:158597892</text>
					</view>
					<view class="line_box">
						<text class="line_value">订单时间：2022.11.07  12:02</text>
					</view>
					
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:0,
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
			};
		}
	}
</script>

<style lang="scss" scoped>
.page_view {
	width: 100%;
	height: 100%;
	font-family: PingFang-SC;
	font-weight: Medium;
}
.top_bar {
	width: 100%;
	height: calc(var(--status-bar-height) + 44px);
	padding: 0 20rpx;
	padding-top: var(--status-bar-height);
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 36rpx;
	color: #333333;
}

.scroll-box {
	width: 100%;
	height: calc(100vh - var(--status-bar-height) - 44px);
	.scroll-content {
		width: 100%;
		min-height: 100%;
		box-sizing: border-box;
		background-color: #F1F1F1;
		padding: 30rpx;
		.card {
			width: 100%;
			min-height: 100rpx;
			padding: 25rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			background-color: #fff;
		}
	}
}

.notice {
	font-size: 28rpx;
	color: #378EFD;
	letter-spacing: 2rpx;
	line-height: 40rpx;
}

.statu_box {
	margin-top: 30rpx;
	font-size: 36rpx;
	color: #378EFD;
	.progress_box {
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 50rpx;
		.progress_bg {
			width: 100%;
			height: 12rpx;
			background-color: #f1f1ff;
			border-radius: 12rpx;
			position: relative;
			.progress_fill {
				width: calc(100% * var(--len) / 2);
				height: 100%;
				border-radius: 12rpx;
				background-color: #378EFD;
			}
			.progress_tip {
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
				position: absolute;
				top: 50%;
				left: calc(100%  * var(--len) / 2);
				transform: translate(-50%, -50%);
				background-color: #378EFD;
			}
		}
	}
	
	.text_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.text_cell {
			display: flex;
			flex-direction: column;
			align-items: center;
			.text_title {
				font-weight: Regular;
				color: #999999;
				font-size: 28rpx;
			}
			.text_time {
				margin-top: 10rpx;
				font-weight: Regular;
				color: #999;
				font-size: 20rpx;
			}
		}
	}
}


.order_info_box{
	margin-top: 30rpx;
	.box_title {
		font-size: 32rpx;
		color: #333333;
	}
	.shop_info {
		box-sizing: border-box;
		padding: 30rpx 0;
		border-bottom: 1rpx solid rgba(167, 167, 167, 0.3);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		color: #333333;
		font-weight: Medium;
		.info_cell {
			display: flex;
			align-items: center;
			image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
			text{
				margin-left: 10rpx;
			}
		}
	}
	
	.shop_scroll_box {
		box-sizing: border-box;
		padding: 30rpx 0;
		width: 100%;
		border-bottom: 1rpx solid rgba(167, 167, 167, 0.3);
		.shop_scroll_content {
			min-width: 100%;
			display: flex;
			align-items: center;
			.shop_cell {
				width: 130rpx;
				min-height: 280rpx;
				margin-right: 30rpx;
				image{
					width: 130rpx;
					height: 130rpx;
					border-radius: 15rpx;
				}
				.shop_title {
					margin-top: 20rpx;
					width: 100%;
					font-size: 26rpx;
					color: #333333;
					font-weight: Regular;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.shop_price {
					margin-top: 20rpx;
					width: 100%;
					color: #FC6129;
					font-size: 26rpx;
					font-weight: Regular;
				}
			}
		}
	}
}

.line_box {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 30rpx;
	.line_title {
		font-size: 28rpx;
		color: #333333;
	}
	.line_value {
		max-width: 60%;
		font-size: 24rpx;
		color: #999999;
	}
}

</style>
