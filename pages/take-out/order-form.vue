<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>我的订单</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
				</view>
			</view>

			<!-- <view class=""> -->
			<view class="ipt">
				<view class="btn">搜索</view>
				<u-search placeholder="请输入要搜索的商品" v-model="searchValue" height="70" :show-action="false"></u-search>

				<!-- <u-tabs :scrollable='false' :list="list4" lineColor="#FFF" :activeStyle="{
				            color: '#3b90fd',
				            fontWeight: 'bold',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#afafaf',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
				</u-tabs> -->
				<view class="tabs">
					<view @click="style = i.id" :class="{'stateStyle1': style == i.id}" v-for="i in list4">{{i.name}}
						<text v-if="i.count != 0">{{i.count}}</text>
					</view>
				</view>
			</view>
			<view class="bug"></view>
			<!-- </view> -->
		</view>

		<view style="height: 260rpx;"></view>
		<order @goView='goView' :item="i" v-for="i in lists"></order>
	</view>
</template>

<script>
	import order from "./components/order-form/order-form.vue"
	export default {
		components: {
			order
		},
		data() {
			return {
				searchValue:'',
				show: false,
				style: 1,
				list4: [{
					name: '全部',
					id: 1,
					count: 0
				}, {
					name: '待付款',
					id: 2,
					count: 1
				}, {
					name: '待配送',
					id: 3,
					count: 1
				}, {
					name: '配送中',
					id: 4,
					count: 1
				}, {
					name: '待评价',
					id: 5,
					count: 1
				}],
				// list:'',
				//全部  待付款1  待配送2  配送中3  待评价4
				list: [{
					state: 1,
					orderFormTime: '2022.11.08 &nbsp; 8:02',
					img: 'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890',
					orderNumber: '15555555555',
					shop: 'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890',
					shopName: '果蔬(文化路店)'
				}, {
					state: 2,
					orderFormTime: '2022.11.08 &nbsp; 8:02',
					img: 'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890',
					orderNumber: '15555555555',
					shop: 'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890',
					shopName: '果蔬(文化路店)'
				}, {
					state: 3,
					orderFormTime: '2022.11.08 &nbsp; 8:02',
					img: 'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890',
					orderNumber: '15555555555',
					shop: 'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890',
					shopName: '果蔬(文化路店)'
				}, {
					state: 4,
					orderFormTime: '2022.11.08 &nbsp; 8:02',
					img: 'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890',
					orderNumber: '15555555555',
					shop: 'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890',
					shopName: '果蔬(文化路店)'
				}]
			}
		},
		
		onLoad(options) {
			console.log(options)
			this.style = options.id
		},

		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			goView(){
				uni.navigateTo({
					url:'./wait-for-payment'
				})
			}
		},
		
		computed:{
			lists() {
				if(this.style == 1) {
					return this.list
				} else {
					return this.list.filter(value => value.state == this.style-1)
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.top-bar {
		height: 280rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		// background-image: linear-gradient(#579efc, #b1cff3);
		background-color: #FFF;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: -60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.bar-left {
			flex: 2;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 2;
			height: 100%;
		}

		.ipt {
			position: absolute;
			top: 120rpx;
			border-radius: 50%;
			width: 95%;

			.btn {
				display: inline-block;
				padding: 5rpx 20rpx;
				color: #FFF;
				font-size: 22rpx;
				background: #2679F7;
				border-radius: 20rpx;
				position: absolute;
				top: 15rpx;
				right: 6%;
			}

			.tabs {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-end;
				justify-content: center;
				justify-content: space-between;
				justify-content: space-around;
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #999999;

				view {
					// flex: 1;
				}

				text {
					display: inline-block;
					width: 30rpx;
					height: 30rpx;
					border-radius: 50%;
					margin-left: 5rpx;
					text-align: center;
					line-height: 30rpx;
					position: relative;
					top: -10rpx;
					background-color: #2679F7;
					color: #FFF;
					font-size: 20rpx;
				}

				.stateStyle1 {
					color: #378EFD;
					font-size: 32rpx;
				}
			}
		}

		.bug {
			background-color: #f1f1f1;
			height: 30rpx;
			position: absolute;
			top: 260rpx;
			width: 100%;
			border-radius: 20rpx 20rpx 0 0;
		}

		.u-badge--error[data-v-2b1712d8] {
			background-color: #3b90fd;
		}
	}

	.nav-card {
		margin-top: 120rpx;
	}
</style>
