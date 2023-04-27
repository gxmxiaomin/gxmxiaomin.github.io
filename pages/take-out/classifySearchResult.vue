<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<u-search placeholder="请输入要搜索蔬菜的关键字" v-model="searchValue" height="70" :show-action="false"></u-search>
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth" @click="">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<view class="back"></view>

		<view class="box-result">
			<view class="tabs">
				<view @click="opition = 1" class="t1" :style="{color:(opition == 1?'#00aaff':'')}">热卖</view>
				<view @click="opition = 2" class="t2" :style="{color:(opition == 2?'#00aaff':'')}">销量</view>
				<view @click="opition = 3" class="t3" :style="{color:(opition == 3?'#00aaff':'')}">价格</view>
			</view>

			<view @click="uni.navigateTo({
				url:'./commodityDetails'
			})" class="box" v-for="item in list" :key="item.id">
				<view class="box-1">
					<view class="tag"> <text>1折</text> </view>
					<image class="img-1" src="../../static/images/hot_cover.png" mode=""></image>
					<view class="title">
						<view class="title-1">{{item.name}}</view>
						<view class="title-2">{{item.serve}}</view>
						<view class="title-3">{{item.sales}}</view>
						<view class="title-4"> <text>￥{{item.newPrice}}</text> <text>{{item.price}}</text> </view>
					</view>
					<view class="btn">
						<image v-if="item.quantity != 0" @click.stop="item.quantity != 0 ? item.quantity-- : ''"
							class="img-1" src="../../static/images/jian.svg" mode=""></image>
						<view v-if="item.quantity != 0">{{item.quantity}}</view>
						<image @click.stop="item.quantity++" class="img" src="../../static/images/icon_add.png" mode="">
						</image>
					</view>
				</view>
			</view>

			<view class="view-cart">
				<image class="image-cart" @click="uni.navigateTo({
				url:''
			})" src="@/static/images/cart.png" mode=""></image>
				<u-badge bgColor="#FF6D42" max="99" :value="cartNum" showZero :absolute="true" :offset="[8,8]">
				</u-badge>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartNum:2,
				show: true,
				opition: 1,
				list: [{
					name: '整果西红柿一个500g',
					serve: '外红内甜、沙瓤细腻、软糯多汁',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 1,
					quantity: 0,
				}, {
					name: '整果西红柿一个500g',
					serve: '外红内甜、沙瓤细腻、软糯多汁',
					sales: '月销1989',
					price: '￥133.9',
					newPrice: '99.9',
					id: 2,
					quantity: 0,
				}, {
					name: '整果西红柿一个500g',
					serve: '外红内甜、沙瓤细腻、软糯多汁',
					sales: '月销1989',
					price: '￥19.9',
					newPrice: '12.9',
					id: 3,
					quantity: 0,
				}, {
					name: '整果西红柿一个500g',
					serve: '外红内甜、沙瓤细腻、软糯多汁',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 4,
					quantity: 0,
				}, {
					name: '整果西红柿一个500g',
					serve: '外红内甜、沙瓤细腻、软糯多汁',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 5,
					quantity: 0,
				}, {
					name: '整果西红柿一个500g',
					serve: '外红内甜、沙瓤细腻、软糯多汁',
					sales: '月销1989',
					price: '￥10.9',
					newPrice: '8.9',
					id: 6,
					quantity: 0,
				}, {
					name: '整果西红柿一个500g',
					serve: '外红内甜、沙瓤细腻、软糯多汁',
					sales: '月销1989',
					price: '￥21.9',
					newPrice: '19.9',
					id: 7,
					quantity: 0,
				}],
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	.top-bar {
		height: 160rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#74ea68, #b1f7aa);
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFF;
		}

		.bar-left {
			flex: 1;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 1;
			height: 100%;

			.city-rigth {
				color: #FFF;
				font-size: 30rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
					vertical-align: middle;
					margin-top: -5rpx;
				}
			}
		}
	}

	.back {
		height: 100rpx;
		background-image: linear-gradient(#b1f7aa, #b9f8b2);
		margin-top: 100rpx;
	}

	.box-result {
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		z-index: 9;
		background-color: #FFF;
		position: relative;
		top: -20rpx;

		.tabs {
			width: 80%;
			margin: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			justify-content: center;
			justify-content: space-between;
			justify-content: space-around;

			view {
				margin-top: 20rpx;
				display: inline-block;
				color: #9d9d9d;
			}
		}

		.box {
			margin-bottom: 30rpx;

			.box-1 {
				.tag {
					display: inline-block;
					width: 100rpx;
					padding: 0 20rpx;
					background: #fb7a4c;
					border-radius: 20rpx 0 20rpx 0;
					position: relative;
					display: flex;
					top: 190rpx;
					z-index: 9;
					font-size: 22rpx;
					color: #FFF;

					text {
						display: inline-block;
						margin: auto;
					}
				}

				width: 95%;
				height: 190rpx;
				margin: auto;
				// border: 1rpx solid darkcyan;

				.img-1 {
					height: 98%;
					width: 190rpx;
					border-radius: 10rpx;
				}

				.title {
					display: inline-block;
					width: 350rpx;
					margin-left: 20rpx;
					position: relative;
					bottom: 20rpx;

					.title-1 {
						position: relative;
						bottom: 20rpx;
					}

					.title-2 {
						color: #9f9f9f;
						font-size: 24rpx;
						position: relative;
						bottom: 15rpx;
					}

					.title-3 {
						color: #9f9f9f;
						font-size: 24rpx;
						position: relative;
						bottom: 10rpx;
					}

					.title-4 {
						text {
							&:nth-child(1) {
								color: #fc612a;
								font-size: 32rpx;
							}

							&:nth-child(2) {
								color: #9f9f9f;
								font-size: 24rpx;
								text-decoration: line-through;
							}
						}
					}
				}

				.btn {
					display: inline-block;
					z-index: 9;
					float: right;
					position: relative;
					top: 130rpx;
					display: flex;

					.img-1 {
						width: 46rpx;
						height: 46rpx;
						position: relative;
						bottom: 4rpx;
					}

					.img {
						width: 40rpx;
						height: 40rpx;
					}

					view {
						display: inline-block;
						min-width: 40rpx;
						text-align: center;
					}
				}
			}
		}

		.view-cart {
			position: fixed;
			right: 0;
			bottom: 100rpx;

			image {
				width: 140rpx;
				height: 140rpx;
			}
		}
	}
</style>
