<template>
	<view>
		<view class="view-nav">
			<view class="view-nav-bar">
				<image src="../../static/images/practicedetails2.png" mode="" @click="uni.navigateBack({
					
				})"></image>
				<text>优质学校</text>
			</view>

			<view class="view-search">
				<text style="display: inline-block; width: 20rpx;"></text>
				<text class="site">郑州</text>
				<image class="img" src="../../static/images/xiasanjiao.png" mode=""></image>
				<input class="ipt" type="text" placeholder="请输入关键词搜索" :value="val">
			</view>
			
			<view class="Filter">筛选</view>
		</view>
		
		<view class="box">
			<view class="box-1">
				<view class="box-1-text">热搜</view>
				<image class="img" src="../../static/images/sousuopai.png" mode=""></image>
			</view>
			
			<view class="box-2">
				<view class="box-text">
					<text style="color: #f08c4a;">1</text>北京电子科技职业技术学院
				</view>
				
				<view class="box-text">
					<text style="color: #f08c4a;">1</text>北京市实验小学
				</view>
				
				<view class="box-text">
					<text style="color: #f08c4a;">1</text>河南广播电视台少儿艺术艺星钢琴合作基地
				</view>
				
				<view class="box-text">
					<text style="color: #f08c4a;">1</text>河南背小天使幼儿园
				</view>
				
				<view class="box-text">
					<text style="color: #f08c4a;">1</text>西华第一高级中学
				</view>
			</view>
			
			<view style="width: 100%;height: 1rpx;background: #f5f5f5;"></view>
			
			<view class="box-3">
				<view class="box-3-text">搜索历史</view>
			</view>
			
			<view class="box-2">
				<view class="box-text">
					北京电子科技职业技术学院
				</view>
				
				<view class="box-text">
					北京市实验小学
				</view>
				
				<view class="box-text">
					河南广播电视台少儿艺术艺星钢琴合作基地
				</view>
	
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		onHide() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.view-nav {
		padding-top: var(--status-bar-height);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-color: #3c88fa;
		height: 260rpx;

		.view-nav-bar {
			width: 100%;
			height: 88rpx;
			display: flex;
			align-items: center;
			padding: 0 26rpx;
			position: relative;

			text {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #fff;
			}

			image {
				width: 20rpx;
				height: 32rpx;
			}
		}
		
		.view-search {
			width: 80%;
			height: 60rpx;
			background: #FFF;
			border-radius: 30rpx;
			margin-left: 20rpx;
			display: inline-block;
			
			.site {
				// line-height: 60rpx;
				position: relative;
				top: -20rpx;
			}
			
			.img {
				width: 20rpx;
				height: 20rpx;
				top: -20rpx;
				left: 15rpx;
			}
			
			.ipt {
				display: inline-block;
				// background: #333333 !important;
				width: 70%;
				height: 60rpx;
				margin-left: 30rpx;
			}
		}
		
		.Filter {
			display: inline-block;
			margin-left: 30rpx;
			color: #FFF;
			position: relative;
			top: -15rpx;
		}
	}
	.box {
		margin-top: 280rpx;
		.box-1 {
			margin-left: 20rpx;
			.box-1-text {
				color: #a0a0a0;
				display: inline-block;
			}
			.img {
				margin-left: 20rpx;
				width: 60rpx;
				height: 30rpx;
			}
		}
		
		.box-2 {
			.box-text {
				display: inline-block;
				background: #f1f1f1;
				padding: 5rpx 30rpx;
				border-radius: 30rpx;
				font-size: 28rpx;
				margin: 20rpx 10rpx;
			}
		}
		.box-3 {
			margin: 30rpx 0;
			.box-3-text {
				margin-left: 20rpx;
				color: #a0a0a0;
				display: inline-block;
			}
		}
	}
</style>
