<template>
	<view class="hot-list-view">
		<view class="top-title">
			<text>实时热榜</text>
		</view>
		<view class="top-btns">
			<view class="top-btn-cell" :class="{'isCurrent':currentBtn == 0}" @click="selectBtn(0)">
				<text>热榜</text>
			</view>
			<view class="top-btn-cell" :class="{'isCurrent':currentBtn == 1}" @click="selectBtn(1)">
				<text>本地榜</text>
			</view>
			<view class="top-btn-cell" :class="{'isCurrent':currentBtn == 2}" @click="selectBtn(2)">
				<text>教育榜</text>
			</view>
		</view>
		
		<view class="message-lists" id="hotDom">
			<view class="list-line" v-for="item in hotNum" :key="item">
				<view class="index">
					<text :style="item <= 3? 'color:#f00':''">{{item}}</text>
				</view>
				<view class="line-text">
					<text>长征六号运载火箭发射成功</text>
				</view>
			</view>
			<view class="loading-more" @click="hotNum+=5">
				<text>展开更多</text>
				<u-icon name="play-right-fill" size="18" class="icon-rotate"></u-icon>
			</view>
			<view class="line-max"></view>
		</view>
		
		
		<view class="message-lists" id="cityDom">
			<view class="show-info">
				<text class="current-city">郑州榜</text>
				<image :src="require('@/static/imgs/outher/change-city.png')" mode="" class="change-city"></image>
			</view>
			<view class="list-line" v-for="item in cityNum" :key="item">
				<view class="index">
					<text :style="item <= 3? 'color:#f00':''">{{item}}</text>
				</view>
				<view class="line-text">
					<text>长征六号运载火箭发射成功</text>
				</view>
			</view>
			<view class="loading-more" @click="cityNum+=5">
				<text>展开更多</text>
				<u-icon name="play-right-fill" size="18" class="icon-rotate"></u-icon>
			</view>
			<view class="line-max"></view>
		</view>
		
		<view class="message-lists" id="editDom">
			<view class="show-info">
				<text class="current-city">教育榜</text>
			</view>
			<view class="list-line" v-for="item in editNum" :key="item">
				<view class="index">
					<text :style="item <= 3? 'color:#f00':''">{{item}}</text>
				</view>
				<view class="line-text">
					<text>长征六号运载火箭发射成功</text>
				</view>
			</view>
			<view class="loading-more" @click="editNum+=5">
				<text>展开更多</text>
				<u-icon name="play-right-fill" size="12" color="#757575" class="icon-rotate"></u-icon>
			</view>
		</view>	
		
	</view>
	
</template>

<script>
	export default {
		name:"hotList",
		props:{
			list:{
				type: Array,
				default: [],
				required: true,
				validator: function(value) {
					return Array.isArray(value)
				}
			}
		},
		data() {
			return {
				currentBtn: 0,
				viewDom: '',
				hotNum: 10,
				cityNum:5,
				editNum:5
			};
		},
		methods: {
			selectBtn(index) {
				this.currentBtn = index
				switch(index) {
					case 0:
						console.log("0")
						this.viewDom = 'hotDom'
						break
					case 1:
						console.log("1")
						this.viewDom = 'cityDom'
						break
					case 2:
						console.log("2")
						this.viewDom = 'editDom'
						break
				}
			},
			reset() {
				this.hotNum = 10
				this.cityNum = 5
				this.editNum = 5
			}
		}
	}
</script>

<style lang="scss" scoped>
.hot-list-view {
	width: 100%;
	.top-title {
		width: 100%;
		height: 150rpx;
		background-color: #4A9AFF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 60rpx;
		font-family: Milky-Han-Term-CN-Bold-Italic;
		color: #FFFFFF;
	}
	.top-btns {
		width: 100%;
		display: flex;
		position: sticky;
		background-color: #FFFFFF;
		// top: calc( 44px + 80rpx + var(--status-bar-height) );
		top: 0;
		.top-btn-cell {
			width: 112rpx;
			height: 60rpx;
			border-radius: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1rpx solid rgba(0, 0, 0, 0.05);
			font-size: 28rpx;
			color: #515151;
			margin: 10rpx 10rpx;
		}
		.isCurrent {
			color: #6bcdf7;
			border: 1rpx solid rgba(103, 105, 255, 0.05);
		}
	}
}

.loading-more {
	width: 100%;
	height: 70rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #515151;
	font-family: PingFang-SC-Medium;
	font-weight: Medium;
	font-size: 28rpx;
	.icon-rotate {
		// margin-left: 10rpx;
		transform: rotate(90deg) scale(0.5);
	}
}

.line-max {
	height: 10rpx;
	width: 100%;
	background-color: rgba(172, 172, 172, 0.5);
}

.show-info {
	padding: 20rpx 20rpx 0 20rpx;
	display: flex;
	justify-content: space-between;
	.current-city {
		font-size: 32rpx;
		font-family: PingFang-SC-Bold;
		color: #333333;
	}
	.change-city {
		width: 164rpx;
		height: 60rpx;
	}
}

.message-lists {
	.list-line {
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		display: flex;
		align-items: center;
		min-height: 80rpx;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
		.index {
			width: 26rpx;
			height: 32rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.line-text {
			margin-left: 20rpx;
			font-size: 32rpx;
			font-family: PingFang-SC-Bold;
			color: #333333;
		}
	}
}

</style>