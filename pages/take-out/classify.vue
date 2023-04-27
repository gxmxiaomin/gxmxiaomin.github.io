<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view @click="uni.navigateTo({url:'./classifySearch'})" class="bar-center bare-cell">
				<u-search placeholder="请输入要搜索蔬菜的关键字" v-model="searchValue" height="70" disabled :show-action="false"></u-search>
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<view class="back"></view>
		<view class="box">
			<view class="follow-list">
				<view class="follow_cell" v-for="item in 4">
					<image src="../../static/logo.png" mode=""></image>
					<text class="follow-name">甜心水果</text>
				</view>
			</view>

			<view class="type">
				<view @click="cut(1)" :class="{'stateStyle1': style1 == 1}"> <text v-show="style1 == 1"></text> 热销推荐
				</view>
				<view @click="cut(2)" :class="{'stateStyle1': style1 == 2}"> <text v-show="style1 == 2"></text> 国产精品
				</view>
				<view @click="cut(3)" :class="{'stateStyle1': style1 == 3}"> <text v-show="style1 == 3"></text> 进口优惠
				</view>
				<view @click="cut(4)" :class="{'stateStyle1': style1 == 4}"> <text v-show="style1 == 4"></text> 限时特价
				</view>
				<view @click="cut(5)" :class="{'stateStyle1': style1 == 5}"> <text v-show="style1 == 5"></text> 冬季蔬菜
				</view>
				<view @click="cut(4)" :class="{'stateStyle1': style1 == 6}"> <text v-show="style1 == 6"></text> 夏季蔬菜
				</view>
				<view @click="cut(7)" :class="{'stateStyle1': style1 == 7}"> <text v-show="style1 == 7"></text> 秋季蔬菜
				</view>
				<view @click="cut(8)" :class="{'stateStyle1': style1 == 8}"> <text v-show="style1 == 8"></text> 春季蔬菜
				</view>
				<view @click="cut(9)" :class="{'stateStyle1': style1 == 9}"> <text v-show="style1 == 9"></text> 安心蔬菜
				</view>
				<view @click="cut(10)" :class="{'stateStyle1': style1 == 10}"> <text v-show="style1 == 10"></text>
					火锅专区</view>
				<view @click="cut(11)" :class="{'stateStyle1': style1 == 11}"> <text v-show="style1 == 11"></text>
					团购专区</view>
				<view @click="cut(12)" :class="{'stateStyle1': style1 == 12}"> <text v-show="style1 == 12"></text>
					国产精品</view>
				<view @click="cut(13)" :class="{'stateStyle1': style1 == 13}"> <text v-show="style1 == 13"></text>
					进口优惠</view>
				<view @click="cut(14)" :class="{'stateStyle1': style1 == 14}"> <text v-show="style1 == 14"></text>
					限时特价</view>
			</view>

			<view class="box-1">
				<image class="img" src="../../static/images/ui-bg.png" mode=""></image>

				<view class="box-2">
					<image src="../../static/images/ui-bg.png" mode=""></image>
					<image src="../../static/images/ui-bg.png" mode=""></image>
					<image src="../../static/images/ui-bg.png" mode=""></image>
				</view>

				<view class="box-3">
					<view
						style="height: 1rpx;width: 95%;background-color: #f8f8f8;margin: auto;margin: 30rpx 0 10rpx 0">
					</view>
					<view class="tabs">
						<u-tabs :list="list4" :activeStyle="{
										        color: '#3e91fd',
										        fontWeight: 'bold',
										        transform: 'scale(1.05)'
										    }" :inactiveStyle="{
										        color: '#999999',
										        transform: 'scale(1)'
										    }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
							<!-- <view slot="right" style="padding-left: 4px;" @tap="$u.toast('插槽被点击')">
											<text style="padding-right: 10rpx;color: #999999;">筛选</text>
										</view> -->
						</u-tabs>
					</view>
				</view>

				<view class="shangpin">

					<CommodityTwo :list="list"></CommodityTwo>

				</view>
				<view class="" style="height: 100rpx;"></view>
			</view>
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
				value6: 1,
				style1: 1,
				list4: [{
					name: '热卖'
				}, {
					name: '销量',
					// badge: {
					// 	isDot: true
					// }
				}, {
					name: '价格'
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
				}],
			}
		},

		methods: {
			cut(e) {
				this.style1 = e
			},
			click1(e) {
				console.log(e)
				if (e == 1) {
					uni.redirectTo({
						url: './take-out'
					})
				}else if(e == 3) {
					uni.redirectTo({
					    url: '/pages/take-out/gouwuche'   
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
		background-color: #eeeff1;
	}

	.top-bar {
		height: 160rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#579efc, #94bff4);
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
				color: #4796fc;
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
		background-image: linear-gradient(#83b4ef, #9ec5f7);
		margin-top: 100rpx;
	}

	.box {
		border-radius: 20rpx 20rpx 0 0;
		// text-align: center;
		width: 100%;
		// z-index: 9;
		background-color: #FFF;
		position: relative;
		top: -20rpx;

		.follow-list {
			border-bottom: #f1f1f1;
			width: 100%;
			min-height: 170rpx;
			box-sizing: border-box;
			padding: 10rpx 30rpx;
			display: flex;
			align-items: center;

			.follow_cell {
				margin-right: 20rpx;
				width: 100rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.follow-name {
					font-size: 26rpx;
					color: #515151;
					width: 100%;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical
				}
			}
		}

		.type {
			// background-color: #aaa;
			display: inline-block;
			width: 26%;
			border-right: 1rpx solid #f5f5f5;
			height: 1150rpx;
			overflow-y: auto;

			view {
				// display: inline-block;
				text-align: center;
				margin: 30rpx 0;
				color: #a1a1a1;

				text {
					display: inline-block;
					width: 6rpx;
					height: 30rpx;
					background-color: #4796fc;
					margin-right: 15rpx;
					position: relative;
					top: 5rpx;
				}

				// &:nth-child(1) {
				// 	color: #4796fc;
				// 	font-size: 34rpx;
				// }
			}
		}

		.box-1 {
			width: 73%;
			height: 1050rpx;
			overflow-y: auto;
			float: right;
			// margin: 30rpx 20rpx 0 0;

			.img {
				width: 96%;
				margin: 0 20rpx 0 10rpx;
				height: 260rpx;
				border-radius: 20rpx;
			}

			.box-2 {
				width: 98%;
				float: right;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-end;
				justify-content: center;
				justify-content: space-between;
				justify-content: space-around;


				image {
					width: 28%;
					height: 80rpx;
					border-radius: 10rpx;
					margin-right: 10rpx;
				}
			}

			.box-3 {
				width: 98%;
				float: right;
				.tabs {
					position: relative;
					z-index: 97;
				}
			}

			.shangpin {
				width: 99%;
				height: 1000rpx;
				float: right;
				overflow-y: auto;

				.tabs {
					position: relative;
					z-index: 99;
				}

			}
		}
	}

	.stateStyle1 {
		color: #4796fc !important;
		font-size: 34rpx;
	}

	.u-page__item__slot-icon {
		width: 35rpx;
		height: 35rpx;
	}
</style>
