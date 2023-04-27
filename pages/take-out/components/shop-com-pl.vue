<template>
	<scroll-view scroll-y="true" class="com_view">
		<view class="com_content">
			<view class="top_line">
				<view class="com_line_left">
					<text :style="'color:'+textColor">5.0</text>
					<view class="com_star" v-for="item in 5" :key="item">
						<u-icon name="star-fill" :color="textColor" size="16"></u-icon>
					</view>
				</view>
				<view class="com_line_right">
					<text>9058条评论</text>
				</view>
			</view>
			
			<view class="com_label_box" :style="'--textColor:' + textColor">
				<text v-for="item in 5" :key="item" :class="{'select_label': item == 1}">非常新鲜(200）</text>
			</view>
			
			<view class="com_pl_box" v-for="(item,index) in 2" :key="item">
				<view class="com_user_box">
					<image :src="img" mode=""></image>
					<view class="com_user">
						<text style="font-size: 32rpx;color: #333333;">芋头</text>
						<text style="font-size: 24rpx;color: #999;">08.09 14：25</text>
					</view>
					<text class="com_browse">859次浏览</text>
				</view>
				
				<view class="com_pl_content">
					<text>水果也太新鲜了吧，好喜欢啊！！！这是我网购买水蜜 桃最好吃的一次，会一直回购冲冲冲！！！</text>
				</view>
				
				<view class="com_pl_bottom">
					<view class="com_bottom_cell">
						<u-icon name="thumb-up" color="#333" size="16"></u-icon>
						<text>16</text>
					</view>
					<view class="com_bottom_cell">
						<u-icon name="star" color="#333" size="16"></u-icon>
						<text>16</text>
					</view>
					
					<view class="com_bottom_hf">
						<text>回复</text>
					</view>
				</view>
				
				<view class="com_hf_box" :style="'--textColor:' + textColor">
					<view class="com_hf_line">
						<text class="com_hf_name">大闪回复:</text>
						<text class="com_hf_content">是啊是啊，我也一直在回购，真的是大爱</text>
					</view>
					<view class="com_hf_line" >
						<text class="com_hf_name">月光之下:</text>
						<text class="com_hf_content">我也一直在回购</text>
					</view>
					<view class="com_hf_more">
						<text>展开更多评论</text>
					</view>
				</view>
			</view>
			
			<view class="com_pl_more" :style="'--textColor:' + textColor">
				<text>展开更多评论</text>
			</view>
			
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props:['textColor'],
		data() {
			return {
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
			};
		}
	}
</script>

<style lang="scss">
.com_view {
	width: 100%;
	height: 100%;
	font-family: PingFang-SC;
	font-weight: Regular;
	.com_content {
		width: 100%;
		min-height: 100%;
		padding: 20rpx;
		padding-bottom: 50rpx;
	}
}

.top_line {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	.com_line_left {
		display: flex;
		align-items: baseline;
		text {
			color: #EB9251;
			font-weight: bold;
			font-size: 66rpx;
			margin-right: 20rpx;
		}
	}
	.com_line_right {
		font-size: 24rpx;
		color: #999;
		font-weight: Regular;
	}
}

.com_label_box {
	display: flex;
	flex-wrap: wrap;
	text{
		line-height: 40rpx;
		height: 40rpx;
		padding: 0 10rpx;
		background-color: #F1F1F1;
		border-radius: 35rpx;
		color: #999999;
		font-size: 24rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}
	.select_label {
		// background-color: #EB9251;
		background-color: var(--textColor);
		color: #fff;
	}
}

.com_pl_box {
	width: 100%;
	min-height: 300rpx;
	margin-top: 30rpx;
	.com_user_box {
		width: 100%;
		height: 70rpx;
		position: relative;
		display: flex;
		align-items: center;
		image {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}
		.com_user {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
			
		}
		.com_browse {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);
			font-size: 24rpx;
			color: #999;
		}
	}
	.com_pl_content {
		margin-top: 30rpx;
		font-size: 26rpx;
		color: #333333;
		line-height: 32rpx;
	}
	
	.com_pl_bottom {
		margin-top: 20rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		position: relative;
		.com_bottom_cell {
			display: flex;
			color: #333333;
			font-size: 24rpx;
			margin-right: 30rpx;
			text{
				margin-left: 10rpx;
			}
		}
		.com_bottom_hf {
			position: absolute;
			top: 50%;
			right: 30rpx;
			transform: translateY(-50%);
			color: #333333;
			font-size: 24rpx;
			height: 40rpx;
			line-height: 40rpx;
			padding: 0 20rpx;
			border-radius: 40rpx;
			background-color: #F1F1F1;
			letter-spacing: 2rpx;
		}
	}
}

.com_hf_box {
	width: 100%;
	min-height: 100rpx;
	background-color: #F1F1F1;
	margin-top: 30rpx;
	padding: 20rpx;
	
	.com_hf_line {
		line-height: 32rpx;
		font-size: 24rpx;
		color: #999;
		.com_hf_name {
			// color: #EB9251;
			color: var(--textColor);
			font-weight: 600;
		}
		.com_hf_content {
			margin-left: 10rpx;
		}
	}
	.com_hf_more {
		width: 100%;
		text-align: center;
		font-size: 26rpx;
		// color: #EB9251;
		color: var(--textColor);
		font-weight: 600;
		margin-top: 20rpx;
	}
}

.com_pl_more {
	width: 100%;
	height: 70rpx;
	line-height: 70rpx;
	border-radius: 10rpx;
	text-align: center;
	// color: #EB9251;
	color: var(--textColor);
	font-size: 32rpx;
	font-weight: 600;
	margin-top: 30rpx;
	background-color: #F1F1F1;
}

</style>
