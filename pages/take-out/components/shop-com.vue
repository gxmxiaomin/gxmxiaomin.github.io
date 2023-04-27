<template>
	<view class="com_view">
		<!-- 左边的工作条 -->
		<scroll-view scroll-y="true" class="com_left_scroll_box">
			<view class="com_scroll_content" :style="'--textColor:' + textColor">
				<view class="com_left_line" v-for="(item,index) in 20" :key="item" @click="current=index">
					<text :class="{'com_active_label': index==current}">热销推荐</text>
					<view class="com_left_tip" v-show="index==current"></view>
				</view>
			</view>
		</scroll-view>
		<!-- 右边的滚动条 -->
		<scroll-view scroll-y="true" class="com_right_scroll_box">
			<view class="com_scroll_content">
				
				<view class="com_select_box">
					<view class="com_select_cell">
						<text>热卖</text>
					</view>
					<view class="com_select_cell">
						<text>销量</text>
					</view>
					<view class="com_select_cell">
						<text>价格</text>
					</view>
				</view>
				
				<view class="com_right_line" v-for="item in 10" :key="item">
					<view class="com_img_box">
						<image :src="img" mode=""></image>
					</view>
					
					<view class="com_shop_info">
						<text class="com_shop_title">【整果】陕西红富士500g</text>
						<text>沙瓤细腻、软糯多汁</text>
						<text>月销1239</text>
						<view>
							<text style="font-size: 24rpx;color: #FC6129;">￥9.9</text>
							<text>￥19.9</text>
						</view>
						
						<view class="add_box">
							<u-icon name="minus-circle-fill" size="18" color="#888" @click="changeCount(item, -1)" v-show="(count[item]||{}).value>0"></u-icon>
							<text v-show="(count[item]||{}).value>0">{{ (count[item]||{}).value }}</text>
							<u-icon name="plus-circle-fill" :color="textColor" @click="changeCount(item, 1)" size="18"></u-icon>
						</view>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
		<!-- 总价的盒子 -->
		<view class="all_box" v-show="countGoods>0">
			
			<view class="box_cell" :style="'--textColor:' + textColor">
				<view class="car_box">
					<u-icon name="car" :color="textColor" size="36"></u-icon>
					<text>{{ countGoods }}</text>
				</view>
				<text class="all_price">￥{{countPrice}}</text>
				<text style="color: #eee;margin-left: 10rpx;">免配送费</text>
			</view>
			
			
			<view class="box_cell">
				<text style="letter-spacing: 2rpx;">￥50起</text>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		props:['textColor'],
		data() {
			return {
				count:{},
				current: 0,
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
			};
		},
		computed:{
			countGoods() {
				let count = 0
				Object.keys(this.count).forEach(key=>{
					count += this.count[key].value
				})
				return count
			},
			
			countPrice() {
				let count = 0
				Object.keys(this.count).forEach(key=>{
					count += this.count[key].value * this.count[key].price
				})
				return count.toFixed(2)
			}
		},
		methods:{
			changeCount(item, value){
				let key = item+""
				if(!this.count[key]) {
					this.$set(this.count, key, {value:0,price:9.9})
				}
				let obj = {
					value: this.count[key].value + value,
					price: this.count[key].price
				}
				this.$set(this.count, key, obj)
			}
		}
	}
</script>

<style lang="scss">
.com_view {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	.com_left_scroll_box {
		width: 150rpx;
		border-right: 1rpx solid rgba(170, 170, 170, 0.5);
	}
	.com_right_scroll_box {
		width: calc(100% - 150rpx);
	}
	.com_scroll_content {
		width: 100%;
		min-height: 100%;
	}
}

.com_left_line {
	height: 70rpx;
	padding: 20rpx;
	padding-right: 0;
	line-height: 30rpx;
	font-size: 28rpx;
	color: #999;
	font-family: PingFang-SC;
	font-weight: Bold;
	position: relative;
	.com_left_tip {
		width: 5rpx;
		height: 30rpx;
		// background-color: #55aaff;
		background-color: var(--textColor);
		position: absolute;
		top: 20rpx;
		left: 0;
		transition: 0.3s;
	}
	.com_active_label {
		// color: #55aaff;
		color: var(--textColor);
		transition: 0.3s;
	}
}

.com_select_box {
	position: sticky;
	top: 0;
	width: 100%;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-around;
	color: #999999;
	font-size: 24rpx;
	height: 80rpx;
	z-index: 9999;
}

.com_right_line {
	width: 100%;
	min-height: 160rpx;
	padding: 5rpx 10rpx;
	position: relative;
	// background-color: #55aaff;
	display: flex;
	align-items: center;
	.com_img_box {
		width: 150rpx;
		height: 150rpx;
		position: relative;
		image {
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}
	}
	.com_shop_info {
		width: calc(100% - 150rpx - 10rpx);
		height: 100%;
		margin-left: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		line-height: 32rpx;
		font-size: 20rpx;
		color: #999;
		font-family: PingFang-SC;
		font-weight: Regular;
		.com_shop_title {
			font-size: 26rpx;
			color: #333333;
		}
		.add_box {
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			display: flex;
			align-items: center;
			text {
				margin: 0 10rpx;
				color: #888;
			}
		}
	}
}

.all_box {
	width: calc(100% - 40rpx);
	box-sizing: border-box;
	padding: 0 20rpx;
	height: 90rpx;
	border-radius: 90rpx;
	background-color: rgba(88, 88, 88, 0.7);
	position: fixed;
	bottom: 40rpx;
	left: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.box_cell {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #fff;
		.all_price {
			font-size: 32rpx;
			font-family: PingFang-SC;
			font-weight: Bold;
			color: var(--textColor);
			margin-left: 20rpx;
			margin-right: 10rpx;
		}
	}
	.car_box {
		width: 90rpx;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		text{
			position: absolute;
			top: 0;
			right: 0;
			min-width: 34rpx;
			height: 34rpx;
			line-height: 24rpx;
			padding: 5rpx;
			text-align: center;
			border-radius: 50%;
			background-color: var(--textColor);
			font-size: 24rpx;
		}
	}

}
</style>
