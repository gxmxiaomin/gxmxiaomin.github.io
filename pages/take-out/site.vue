<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>地址管理</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
				</view>
			</view>
			<view class="bug"></view>
			<!-- </view> -->
		</view>
		<view style="height:calc(var(--status-bar-height) + 44px);"></view>

		<view class="box" v-for="item in list" :key="item.id">
			<view class="title">
				<view>{{item.name}}</view>
				<view>{{item.phone}}</view>
			</view>
			<view class="site">{{item.site}}</view>
			<view style="width: 95%;height: 1rpx;margin: auto;margin-top: 20rpx;background-color: #f1f1f1;"></view>
			<view class="operate">
				<view class="text-1">
					<view class="">
						<image :src="item.default ? '../../static/images/fuxuankuang2.png' : '../../static/images/fuxuankuang.png'" mode=""></image>
					</view>
					<text>默认地址</text>
				</view>

				<view class="text-2">
					<view class="" @click="uni.navigateTo({
						url:'./address?name=' + item.name + '&phone=' + item.phone + '&detailedSite=' + item.detailedSite + '&site=' + item.site
					})">
						<image src="../../static/images/bianji.png" mode=""></image>
					</view>
					<text>编辑</text>

					<view style="display: inline-block;width: 30rpx;"></view>

					<view class="">
						<image style="width: 90%;height: 90%;" src="../../static/images/clear.png" mode=""></image>
					</view>
					<text>删除</text>
				</view>
			</view>
		</view>

		<view class="btn" @click="uni.navigateTo({
			url:'./address'
		})">
			<u-button shape="circle" type="primary" text="添加收货地址"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '鱼头',
					phone: '15936874563',
					site:'河南省 郑州市 金水区',
					detailedSite: '河南省郑州市金水区东风路街道文博西路白庙社区白庙小区一号楼',
					default:true,
					id:1
				},{
					name: '鱼头',
					phone: '15936874563',
					site:'河南省 郑州市 金水区',
					detailedSite: '河南省郑州市金水区东风路街道文博西路白庙社区白庙小区一号楼',
					default:false,
					id:1
				},{
					name: '鱼头',
					phone: '15936874563',
					site:'河南省 郑州市 金水区',
					detailedSite: '河南省郑州市金水区东风路街道文博西路白庙社区白庙小区一号楼',
					default:false,
					id:1
				}]
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
		// height: 120rpx;
		height: calc(var(--status-bar-height) + 44px);
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
			margin-top: 20rpx;
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

		.bug {
			background-color: #f1f1f1;
			height: 30rpx;
			position: absolute;
			top: calc(var(--status-bar-height) + 40px);
			width: 100%;
			border-radius: 20rpx 20rpx 0 0;
		}

		.u-badge--error[data-v-2b1712d8] {
			background-color: #3b90fd;
		}
	}

	.box {
		padding: 20rpx;
		width: 95%;
		margin: auto;
		background-color: #FFF;
		border-radius: 10rpx;
		margin-top: 30rpx;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				&:nth-child(1) {
					font-size: 32rpx;
				}

				&:nth-child(2) {
					font-size: 28rpx;
				}
			}
		}

		.site {
			margin-top: 20rpx;
			font-size: 28rpx;
		}

		.operate {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
			font-size: 24rpx;

			.text-1 {
				view {
					display: inline-block;
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;

					image {
						width: 100%;
						height: 100%;
						vertical-align: middle;
						position: relative;
						top: -5rpx;
					}
				}
			}

			.text-2 {
				view {
					width: 30rpx;
					height: 30rpx;
					display: inline-block;
					margin-right: 10rpx;

					image {
						width: 100%;
						height: 100%;
						vertical-align: middle;
						position: relative;
						top: -5rpx;
					}
				}
			}
		}
	}

	.btn {
		width: 95%;
		position: fixed;
		bottom: 50rpx;
		left: 50%;
		transform: translateX(-50%);
		margin: auto;
	}
</style>
