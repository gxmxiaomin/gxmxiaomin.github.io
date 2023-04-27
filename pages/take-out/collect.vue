<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image class="img" style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>收藏</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth" @click="">
				</view>
			</view>
			<view class="text">
				<view @click="opition = 1" class="" :style="{color:(opition == 1 ? '#FFF' : '#91dacc')}">商品</view>
				<view style="display: inline-block;width: 160rpx;"></view>
				<view @click="opition = 2" class="" :style="{color:(opition == 2 ? '#FFF' : '#91dacc')}">店铺</view>
			</view>
		</view>

		<view class="back"></view>
		<view class="bug"></view>

		<view class="box" v-show="opition == 1">
			<view style="height: 20rpx;"></view>
			<CommodityTwo :width="width" :list="list"></CommodityTwo>
		</view>
		<view class="box-2" v-for="i in 5">
			<view style="height: 10rpx;"></view>
			<Shop  v-show="opition == 2" :list="list1"></Shop>
		</view>
	</view>
</template>

<script>
	import Shop from "./components/shop/shop.vue"
	import CommodityTwo from "./components/commodity/commodityTwo.vue"
	export default {
		components: {
			CommodityTwo,
			Shop
		},
		data() {
			return {
				opition: 1,
				width: '500',
				list1: [{
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}, {
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}, {
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}],
				list: [{
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 1,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥133.9',
					newPrice: '99.9',
					id: 2,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥19.9',
					newPrice: '12.9',
					id: 3,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 4,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 5,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥10.9',
					newPrice: '8.9',
					id: 6,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥21.9',
					newPrice: '19.9',
					id: 7,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥21.9',
					newPrice: '19.9',
					id: 8,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥21.9',
					newPrice: '19.9',
					id: 9,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥21.9',
					newPrice: '19.9',
					id: 10,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥21.9',
					newPrice: '19.9',
					id: 11,
					quantity: 0,
				}],
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
		height: 180rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#04bba0, #5cc8b1);
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFF;
			left: 10rpx;
		}

		.bar-left {
			flex: 1;
			height: 60%;
		}

		.bar-center {
			flex: 5;
			height: 60%;

			text {
				font-size: 36rpx;
			}
		}

		.bar-right {
			flex: 1;
			height: 60%;

			.city-rigth {
				color: #FFF;
				font-size: 30rpx;
			}
		}

		.text {
			position: absolute;
			top: 130rpx;

			// flex: 5;
			view {
				display: inline-block;
			}
		}
	}


	.back {
		height: 100rpx;
		background-image: linear-gradient(#5cc8b1, #5cc8b1);
		margin-top: 100rpx;
	}

	.bug {
		background-color: #f1f1f1;
		height: 20rpx;
		border-radius: 20rpx 20rpx 0 0;
		position: relative;
		top: -18rpx;
	}

	.box {
		width: 95%;
		margin: auto;
		background-color: #FFF;
		border-radius: 10rpx;
		// margin-top: 20rpx;
	}
	.box-2 {
		position: relative;
		top: -30rpx;
	}
</style>
