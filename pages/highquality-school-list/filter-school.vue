<template>
	<view>
		<view class="view-nav">
			<view class="view-nav-bar">
				<image src="../../static/images/practicedetails2.png" mode="" @click="uni.navigateBack({
							
						})"></image>
				<text>筛选</text>
			</view>
			<view class="perch"></view>
		</view>
		
		<view class="box">
			<view class="box-1">
				<view @click="cut(1)" :class="{'stateStyle1': currentBtn==1}" class="text-1"> <text :class="{'stateStyle2': currentBtn==1}">城市</text> </view>
				<view @click="cut(2)" :class="{'stateStyle1': currentBtn==2}" class="text-1"> <text :class="{'stateStyle2': currentBtn==2}">距离</text> </view>
				<view @click="cut(3)" :class="{'stateStyle1': currentBtn==3}" class="text-1"> <text :class="{'stateStyle2': currentBtn==3}">评分</text> </view>
				<view @click="cut(4)" :class="{'stateStyle1': currentBtn==4}" class="text-1"> <text :class="{'stateStyle2': currentBtn==4}">学费</text> </view>
			</view>
			
			<view class="box-2">
				<view class="type">城市要求</view>
				<view class="ipt">请输入城市</view>
				<view class="cut">
					<view class="cut-1">全国</view>
					<view class="cut-2">郑州市</view>
				</view>
				
				<view class="type">距离要求</view>
				<view class="cut">
					<view class="cut-1">不限</view>
					<view class="cut-2">由近到远</view>
				</view>
				
				<view class="type">评分要求</view>
				<view class="cut">
					<view class="cut-1">不限</view>
					<view class="cut-2">由高到低</view>
				</view>
				
				<view class="type">学费要求</view>
				<view class="cut">
					<view class="cut-1">不限</view>
					<view class="cut-2">由低到高</view>
					<view class="cut-3">由高到低</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentBtn:1,
			}
		},

		methods: {
			cut(e){
				this.currentBtn = e
			},
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
		height:160rpx;

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
	}
	.box {
		margin-top: 180rpx;
		.box-1 {
			display: inline-block;
			width: 160rpx;
			// background: darkcyan;
			// view {
			// 	border-left: 8rpx #4a9aff solid;
			// }
			
			.text-1 {
				text{
					display: inline-block;
					margin: 30rpx 30rpx;
				}
			}
		}
		
		.box-2 {
			display: inline-block;
			position: absolute;
			top: 180rpx;
			left: 200rpx;
			.type {
				font-size: 36rpx;
				margin-top: 30rpx;
			}
			.ipt {
				width: 500rpx;
				height: 60rpx;
				border: 1rpx solid #a5a5a5;
				border-radius: 30rpx;
				margin-top: 30rpx;
				color: #a5a5a5;
				padding: 3rpx 20rpx ;
			}
			.cut {
				margin-top: 50rpx;
				.cut-1 {
					margin-left: 30rpx;
					display: inline-block;
					padding: 15rpx 50rpx;
					// background: #3c88fa;
					border: 1rpx solid #3c88fa;
					color: #3c88fa;
				}
				
				.cut-2 {
					margin-left: 60rpx;
					display: inline-block;
					padding: 15rpx 50rpx;
					color: black;
					background: #f6f6f6;
				}
				.cut-3 {
					margin-left: 30rpx;
					display: inline-block;
					padding: 15rpx 50rpx;
					margin-top: 30rpx;
					color: black;
					background: #f6f6f6;
				}
			}
		}
	}
	
	.stateStyle2 {
		color: #4a9aff;
	}
	
	.stateStyle1 {
		border-left: 8rpx #4a9aff solid;
	}
</style>
