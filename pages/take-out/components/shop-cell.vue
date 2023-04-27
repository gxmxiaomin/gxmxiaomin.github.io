<template>
	<view class="com-view">
		<view class="com-top-box">
			<image :src="img" mode=""></image>
			<text class="com-shop-name">果蔬(文化路店）</text>
			<view class="com-line com-price">
				<text>起送￥50 </text>
				<text style="margin-left: 20rpx;">免配送费 </text>
			</view>
			<view class="com-line com-status">
				<text>月销25283 </text>
				<text :style="'font-size: 24rpx;color:' + labelBg + ';margin-left: 20rpx;'">本月果蔬店排名第一 </text>
			</view>
			<view class="com-line com-label">
				<view class="com-label-cell" :style="'background-color:'+labelBg">
					<text>放心购</text>
				</view>
				<view class="com-label-cell" :style="'background-color:'+labelBg">
					<text>随心退</text>
				</view>
				<view class="com-label-cell" :style="'background-color:'+labelBg">
					<text>新人专享优惠</text>
				</view>
			</view>
			<text class="com-over-time">30分钟</text>
			<text class="com-dis">1.0km</text>
			<view class="com-start-box com-line">
				<u-icon name="star-fill" color="#e89b00" size="18"></u-icon>
				<text>5.0</text>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="com-scroll-box">
			<view class="com-scroll-content">
				<view class="com-card-cell" v-for="i in 10" :key="i">
					<view class="com-img-box">
						<image :src="img" mode=""></image>
					</view>
					<view class="com_cell_name">
						<text>【整果】西 红柿一个哈韩的是</text>
					</view>
					<view class="com_cell_price">
						<text style="font-size: 24rpx;color: #FC6129;">￥9.9</text>
						<text style="margin-left: 10rpx;font-size: 20rpx;color: #999;">￥19.9</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<view class="com-time" v-if="showTime">
			11.19  19:23
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showTime:{
				type: Boolean,
				default: true
			},
			labelBg:{
				type: String,
				default: '#A1C7F7'
			}
		},
		computed:{
			
		},
		data() {
			return {
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
			};
		}
	}
</script>

<style lang="scss">
.com-view {
	width: 100%;
	min-height: 510rpx;
	border-radius: 20rpx;
	background-color: #fff;
	margin-bottom: 30rpx;
	position: relative;
	padding: 30rpx;
	font-family: PingFang-SC;
	font-weight: Medium;
}

.com-top-box {
	width: 100%;
	height: 130rpx;
	position: relative;
	image {
		width: 130rpx;
		height: 130rpx;
		border-radius: 20rpx;
	}
	.com-shop-name {
		position: absolute;
		left: 150rpx;
		top: 0;
		font-size: 28rpx;
		color: #333;
	}
	.com-line {
		display: flex;
		align-items: center;
	}
	.com-price {
		position: absolute;
		left: 150rpx;
		top: 40rpx;
		font-size: 20rpx;
		color: #999999;
	}
	.com-status {
		position: absolute;
		left: 150rpx;
		top: 64rpx;
		font-size: 20rpx;
		color: #999999;
	}
	.com-label {
		position: absolute;
		left: 150rpx;
		bottom: 0;
	}
	.com-label-cell {
		height: 32rpx;
		line-height: 32rpx;
		border-radius: 32rpx;
		background-color: #378EFD;
		padding: 0 20rpx;
		margin-right: 20rpx;
		font-size: 20rpx;
		color: #fff;
	}
	.com-over-time {
		position: absolute;
		top: 44rpx;
		right: 80rpx;
		font-size: 20rpx;
		color: #999;
	}
	.com-dis {
		position: absolute;
		top: 46rpx;
		right: 0rpx;
		font-size: 20rpx;
		color: #999;
	}
	.com-start-box {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 30rpx;
		color: #FC6129;
	}
}

.com-scroll-box{
	margin-top: 20rpx;
	width: 100%;
	height: 270rpx;
	.com-scroll-content {
		height: 100%;
		min-width: 100%;
		display: flex;
		align-items: center;
	}
}

.com-card-cell {
	width: 150rpx;
	height: 100%;
	margin-right: 20rpx;
	display: flex;
	flex-direction: column;
	.com-img-box {
		width: 100%;
		height: 150rpx;
		position: relative;
		image{
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}
	}
	.com_cell_name {
		margin-top: 10rpx;
		width: 100%;
		font-size: 26rpx;
		line-height: 32rpx;
		color: #333333;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.com_cell_price {
		margin-top: 10rpx;
	}
}

.com-time {
	margin-top: 20rpx;
	width: 100%;
	display: flex;
	align-items: center;
	font-size: 24rpx;
	color: #999;
}

</style>
