<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<u-tabs @click="click" :list="list4" lineWidth="45" lineColor="#FFF" :activeStyle="{
				            color: '#FFF',
				            fontWeight: 'bold',
				            transform: 'scale(1.35)'
				        }" :inactiveStyle="{
				            color: '#FFF',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
				</u-tabs>
				<!-- <view class="center"> <text class="text" @click="pitch = 1"
						:style="{fontSize:(pitch == 1?'40rpx':'30rpx')}">购物车 <br> <text v-show="pitch == 1" class="xian"></text> </text> <text class="text" @click="pitch = 2"
						:style="{fontSize:(pitch == 2?'40rpx':'30rpx')}">我常买 <br> <text v-show="pitch == 2" class="xian"></text> </text> </view> -->
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth">
					<text>删除</text>
				</view>
			</view>
			<view class="ipt">
				<image class="img-1" src="../../static/images/peisong.png" mode=""></image>
				<text class="text-1">立即送出</text>
				<view class="text-2">送至：白庙小区 <image src="../../static/images/gt.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="back"></view>

		<view v-show="index == 0">
			<view class="box-result">
				<view class="x1" v-for="item in list" :key="item.id">
					<image @click.stop="check(item)"
						:src="item.checked ? '../../static/images/fuxuankuang2.png' : '../../static/images/fuxuankuang.png'"
						mode=""></image>

					<view class="box">
						<view @click="uni.navigateTo({
						url:''
					})" class="box-1">
							<view class="box-1-1">
								<!-- <view class="tag"> <text>1折</text> </view> -->
								<image class="img-1" src="../../static/images/hot_cover.png" mode=""></image>
								<view class="title">
									<view class="title-1">{{item.name}}</view>
									<view class="title-2">{{item.serve}}</view>
									<view class="title-3">{{item.sales}}</view>
									<view class="title-4"> <text>￥{{item.newPrice}}</text> <text>{{item.price}}</text>
									</view>
								</view>
								<view class="btn">
									<image v-if="item.quantity != 0"
										@click.stop="item.quantity != 1 ? item.quantity-- : ''" class="img-1"
										src="../../static/images/jian.svg" mode=""></image>
									<view v-if="item.quantity != 0">{{item.quantity}}</view>
									<image @click.stop="item.quantity++" class="img"
										src="../../static/images/icon_add.png" mode="">
									</image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="cainiLike">
				<image class="img-1" src="../../static/images/love.png" mode=""></image>
				<text>猜你喜欢</text>
				<image class="img-2" src="../../static/images/love1.png" mode=""></image>
			</view>

			<view class="like">
				<view style="height: 20rpx;"></view>
				<CommodityTwo :width="width" :list="list"></CommodityTwo>
			</view>
		</view>
		
		<!-- index == 1 -->
		<view v-show="index == 1">
			<view class="box-result">
				<view style="height: 20rpx;"></view>
				<CommodityTwo :width="width" :list="list"></CommodityTwo>
				<CommodityTwo :width="width" :list="list"></CommodityTwo>
			</view>
		</view>
		
		<view v-show="index == 1" style="height: 60rpx;"></view>
		<view v-show="index == 0" style="height: 100rpx;"></view>

		<view class="shopping">
			<image @click="clickcheck()"
				:src="cha_status ? '../../static/images/fuxuankuang2.png' : '../../static/images/fuxuankuang.png'"
				mode=""></image>
			<view class="price">
				<text>{{cha_status ? '全不选' : '全选'}}</text>
			</view>
			<view class="sumup"> <text>共计:</text> <text>{{total.toFixed(1)}}</text> </view>
			<view class="qu" @click="uni.navigateTo({
				url:'./payment'
			})">去结算</view>
		</view>


		<u-tabbar :value="value6" @change="name => value6 = name" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home" @click="click1(1)"></u-tabbar-item>
			<u-tabbar-item text="分类" @click="click1(2)">
				<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/images/fenlei.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/images/fenlei2.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item text="购物车" @click="click1(3)">
				<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/images/gouwuche2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/images/gouwuche.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="click1(4)"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import CommodityTwo from "./components/commodity/commodityTwo.vue"
	export default {
		components: {
			CommodityTwo
		},
		data() {
			return {
				index: '0',
				// checkall: false,
				width: '500',
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
				}],
				list4: [{
					name: '购物车'
				}, {
					name: '我常买'
				}],
				value6: 2,
				pitch: 1,
				value: true,
				list: [{
					name: '整果西红柿一个500g',
					serve: '外红内甜、软糯多汁',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 1,
					quantity: 1,
					checked: false
				}, {
					name: '整果西红柿一个500g',
					serve: '外红内甜、软糯多汁',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 2,
					quantity: 1,
					checked: false
				}, {
					name: '整果西红柿一个500g',
					serve: '外红内甜、软糯多汁',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 3,
					quantity: 1,
					checked: false
				}],
			}
		},
		
		computed: {
		    total(){
		        return this.list.reduce((sum,value) => {
		            return sum + value.newPrice * value.quantity * value.checked
		        },0)
		    },
			cha_status() {
			  return this.list.every(value => value.checked)
			},
		},

		methods: {
			clickcheck() {
				if (this.cha_status) {
					this.list.forEach(value => {
					  value.checked = false
					})
				} else {
					this.list.forEach(value => {
					  value.checked = true
					})
				}
			},
			check(e) {
				if (e.checked) {
					e.checked = false
					// this.checkall = false
				} else {
					e.checked = true
					// this.checkall = true
				}
			},
			click(item) {
				console.log('item', item.index);
				this.index = item.index
			},

			click1(e) {
				console.log(e)
				if (e == 1) {
					// uni.switchTab({
					//     url: '/pages/take-out/classify'
					// });
					uni.redirectTo({
						url: './take-out'
					});
				} else if (e == 2) {
					uni.redirectTo({
						url: '/pages/take-out/classify'
					});
				}else if(e == 4) {
					 uni.redirectTo({
					     url: '/pages/take-out/my'   
					 });
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.top-bar {
		height: 240rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#579efc, #b1cff3);
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			position: relative;
			top: -40rpx;
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

			.center {
				.text {
					display: inline-block;
					margin-left: 50rpx;
					font-size: 30rpx;
				}

				.xian {
					display: inline-block;
					width: 80rpx;
					height: 10rpx;
					background-color: #FFF;
					position: relative;
					top: -30rpx;
					left: 20rpx;
				}
			}
		}

		.bar-right {
			flex: 1;
			height: 100%;

			.city-rigth {
				color: #FFF;
				font-size: 26rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
					vertical-align: middle;
					margin-top: -5rpx;
				}
			}
		}

		.ipt {
			height: 70rpx;
			width: 90%;
			margin: auto;
			background-color: #FFF;
			// position: absolute;
			position: fixed;
			top: 140rpx;
			border-radius: 35rpx;

			.img-1 {
				width: 60rpx;
				height: 45rpx;
				margin-top: 15rpx;
				margin-left: 20rpx;
			}

			.text-1 {
				color: #579efc;
				// line-height: 90rpx;
				position: relative;
				bottom: 15rpx;
				font-size: 26rpx;
				left: 10rpx;
			}

			.text-2 {
				display: inline-block;
				color: #a0a0a0;
				position: relative;
				font-size: 26rpx;
				float: right;
				top: 18rpx;
				right: 20rpx;

				image {
					width: 15rpx;
					height: 25rpx;
					position: relative;
					top: 5rpx;
					margin-left: 10rpx;
				}
			}
		}
	}

	.back {
		height: 100rpx;
		background-image: linear-gradient(#a8caf3, #f1f1f1);
		margin-top: 230rpx;
	}

	.box-result {
		width: 95%;
		margin: auto;
		// border-radius: 20rpx 20rpx 0 0;
		border-radius: 20rpx;
		z-index: 9;
		background-color: #FFF;
		position: relative;
		top: -90rpx;
		min-height: 200rpx;

		.x1 {
			width: 100%;
			margin: auto;
			height: 200rpx;
			// border: 1rpx solid black;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;

			image {
				width: 40rpx;
				height: 40rpx;
				margin: 0 10rpx 0 20rpx;
				// margin-left: 20rpx;
				// margin-right: 10rpx;
			}

			.box {
				display: inline-block;
				width: 96%;
				height: 160rpx;

				.box-1 {
					// margin-bottom: 30rpx;

					.box-1-1 {
						.tag {
							display: inline-block;
							width: 100rpx;
							padding: 0 20rpx;
							background: #fb7a4c;
							border-radius: 20rpx 0 20rpx 0;
							position: relative;
							display: flex;
							top: 150rpx;
							z-index: 9;
							font-size: 22rpx;
							color: #FFF;

							text {
								display: inline-block;
								margin: auto;
							}
						}

						width: 96%;
						height: 150rpx;

						.img-1 {
							height: 98%;
							width: 150rpx;
							border-radius: 10rpx;
							position: relative;
							right: 10rpx;
						}

						.title {
							display: inline-block;
							width: 310rpx;
							// margin-left: 5rpx;

							.title-1 {
								position: relative;
								top: 10rpx;
							}

							.title-2 {
								color: #9f9f9f;
								font-size: 24rpx;
								position: relative;
								top: 8rpx;
							}

							.title-3 {
								display: inline-block;
								color: #9f9f9f;
								font-size: 24rpx;
								position: relative;
								// bottom: 5rpx;
							}

							.title-4 {
								position: relative;
								bottom: 5rpx;

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
							width: 100rpx;
							right: 90rpx;

							.img-1 {
								width: 42rpx;
								height: 42rpx;
								position: relative;
								bottom: 4rpx;
								// right: 10rpx;
							}

							.img {
								width: 38rpx;
								height: 38rpx;
								// right: 10rpx;
							}

							view {
								display: inline-block;
								min-width: 20rpx;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}

	.cainiLike {
		position: relative;
		top: -60rpx;
		text-align: center;

		.img-1 {
			width: 60rpx;
			height: 50rpx;
			position: relative;
			top: 10rpx;
			right: 10rpx;
		}

		.img-2 {
			width: 35rpx;
			height: 30rpx;
			position: relative;
			top: 5rpx;
			left: 10rpx;
		}
	}

	.like {
		width: 95%;
		margin: auto;
		border-radius: 20rpx;
		// z-index: 9;
		background-color: #FFF;
		position: relative;
		min-height: 200rpx;
		top: -20rpx;
	}

	.shopping {
		background-color: #666666;
		height: 90rpx;
		width: 95%;
		border-radius: 50rpx;
		position: fixed;
		bottom: 120rpx;
		// bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%);
		margin: auto;
		font-size: 32rpx;
		// margin-top: 557rpx;
		z-index: 9;

		image {
			margin-left: 50rpx;
			margin-top: 20rpx;
			width: 50rpx;
			height: 50rpx;
			vertical-align: middle;
		}

		.price {
			display: inline-block;
			width: 100rpx;

			text {
				color: #FFF;
				font-size: 30rpx;
				font-weight: 500;
				display: inline-block;
				margin-left: 10rpx;
				position: relative;
				top: 15rpx;
			}
		}

		.sumup {
			display: inline-block;

			text {
				display: flex;
				right: -180rpx;

				&:nth-child(1) {
					color: #FFF;
					font-size: 26rpx;
					display: inline-block;
					margin-left: 30rpx;
					position: relative;
					top: 15rpx;
				}

				&:nth-child(2) {
					color: #f4612d;
					font-size: 38rpx;
					display: inline-block;
					margin-left: 10rpx;
					position: relative;
					top: 18rpx;
				}
			}
		}

		.qu {
			display: inline-block;
			padding: 5rpx 15rpx;
			border-radius: 25rpx;
			background-color: #FFF;
			color: #579efc;
			font-size: 26rpx;
			float: right;
			margin-top: 22rpx;
			margin-right: 20rpx;
		}
	}

	.u-page__item__slot-icon {
		width: 35rpx;
		height: 35rpx;
	}
</style>
