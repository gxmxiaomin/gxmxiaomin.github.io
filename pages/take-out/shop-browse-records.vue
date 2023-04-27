<template>
	<view class="page_view">
		<view class="top_bar">
			<view>
				<u-icon name="arrow-left" color="#515151" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="page_title">
				<text>足迹管理</text>
			</view>
			<view></view>
		</view>
		<view class="tab_list">
			<view class="list_cell" @click="current=0">
				<text :class="{'select_class': current==0}">商品</text>
			</view>
			<view class="list_cell" @click="current=1">
				<text :class="{'select_class': current==1}">店铺</text>
			</view>
		</view>
		
		<scroll-view scroll-y="true" class="scroll-box" v-show="current==0">
			<view class="scroll-content">
				
				<goodsCell v-for="i in 10" :key="i"></goodsCell>
				
			</view>
		</scroll-view>
		
		<scroll-view scroll-y="true" class="scroll-box" v-show="current==1">
			<view class="scroll-content">
				
				<shopCell v-for="item in 10" :key="item"></shopCell>
				
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import shopCell from './components/shop-cell.vue'
	import goodsCell from './components/goods-cell.vue'
	export default {
		components: { shopCell, goodsCell },
		data() {
			return {
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
				current:0
			};
		}
	}
</script>

<style lang="scss" scoped>
.page_view {
	width: 100%;
	height: 100vh;
	position: relative;
	font-family: PingFang-SC;
	font-weight: Medium;
}
.top_bar {
	width: 100%;
	height: calc(var(--status-bar-height) + 44px);
	box-sizing: border-box;
	padding: 0 20rpx;
	padding-top: var(--status-bar-height);
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 36rpx;
	color: #333333;
	font-family: PingFang-SC-Medium;
	font-weight: Medium;
}

.tab_list {
	width: 100%;
	display: flex;
	.list_cell {
		width: 50%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		color: rgba(57, 142, 254, 0.5);
		.select_class{
			color: rgba(57, 142, 254, 1);
		}
	}
}

.scroll-box {
	width: 100%;
	height: calc(100vh - var(--status-bar-height) - 44px - 88rpx);
	.scroll-content {
		width: 100%;
		min-height: 100%;
		background-color: #F1F1F1;
		box-sizing: border-box;
		padding: 30rpx;
	}
}

.card {
	width: 100%;
	min-height: 280rpx;
	border-radius: 20rpx;
	background-color: #fff;
	margin-bottom: 30rpx;
	position: relative;
	image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10rpx;
		position: absolute;
		top: 30rpx;
		left: 30rpx;
	}
	.goods_name {
		position: absolute;
		left: 220rpx;
		top: 40rpx;
		font-size: 28rpx;
		color: #333;
	}
	.goods_labels {
		position: absolute;
		left: 220rpx;
		top: 85rpx;
		font-size: 20rpx;
		color: #999999;
	}
	.goods_num {
		position: absolute;
		left: 220rpx;
		top: 120rpx;
		color: #999999;
		font-size: 20rpx;
	}
	.price_box {
		position: absolute;
		left: 220rpx;
		top: 160rpx;
		.goods_now {
			color: #FC6129;
			font-size: 28rpx;
		}
		.goods_old {
			font-size: 20rpx;
			color: #999999;
		}
	}
	.card_time {
		position: absolute;
		left: 30rpx;
		top: 228rpx;
		color: #999999;
		font-size: 24rpx;
	}
	
}

</style>
