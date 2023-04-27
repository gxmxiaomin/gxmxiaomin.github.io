<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>添加收货地址</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
				</view>
			</view>
			<view class="bug"></view>
			<!-- </view> -->
		</view>
		<view style="height:calc(var(--status-bar-height) + 44px);"></view>

		<view class="box">
			<view class="text">
				<view class="text-1">收货人</view>
				<view class="ipt">
					<input :value="name" placeholder="姓名" type="text">
				</view>
				<view class="text-2">+通讯录</view>
			</view>

			<view style="width: 95%;height: 1rpx;margin: auto;margin: 30rpx 0 20rpx 0;background-color: #f1f1f1;">
			</view>

			<view class="text">
				<view class="text-1">手机号码</view>
				<view class="ipt">
					<input :value="phone" placeholder="手机号" type="text">
				</view>
				<view class="text-2">+86 <image src="../../static/images/arrow_right.png" mode=""></image>
				</view>
			</view>

			<view style="width: 95%;height: 1rpx;margin: auto;margin: 30rpx 0 20rpx 0;background-color: #f1f1f1;">
			</view>

			<view class="text">
				<view class="text-1">选择地址</view>
				<view class="select-site">{{site || '省、市、区、街道'}}</view>
				<view class="text-2">
					<image src="../../static/images/arrow_right.png" mode=""></image>
				</view>
			</view>

			<view style="width: 95%;height: 1rpx;margin: auto;margin: 30rpx 0 20rpx 0;background-color: #f1f1f1;">
			</view>

			<view class="text">
				<view class="text-1">详细地址</view>
				<view class="ipt">
					<input :value="detailedSite" placeholder="小区名字/乡村名字" type="text">
				</view>
				<view class="text-site">
					<image src="../../static/images/location1.png" mode=""></image>
					定位
				</view>
			</view>

			<view style="width: 95%;height: 1rpx;margin: auto;margin: 80rpx 0 20rpx 0;background-color: #f1f1f1;">
			</view>

			<view class="view-item">
				<text>设为默认地址</text>
				<view class="flex-grow">
				</view>
				<view>
					<u-switch v-model="msgNotTip" @change="messageStatuChange"></u-switch>
				</view>
			</view>
		</view>

		<view class="btn">
			<u-button shape="circle" type="primary" text="保存"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgNotTip: true,
				name: '',
				phone: '',
				site: '',
				detailedSite: ''
			}
		},

		onLoad(options) {
			console.log(options)
			this.name = options.name
			this.phone = options.phone
			this.site = options.site
			this.detailedSite = options.detailedSite
		},

		methods: {
			messageStatuChange() {
				console.log("改变的状态")
			},
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

		.text {

			.text-1 {
				display: inline-block;
				font-size: 32rpx;
				width: 160rpx;
			}

			.select-site {
				display: inline-block;
				// color: #999999;
				font-size: 28rpx;
			}

			.ipt {
				display: inline-block;
				position: relative;
				top: 10rpx;
				// width: 60rpx;
			}

			.text-2 {
				display: inline-block;
				font-size: 28rpx;
				position: relative;
				float: right;
				top: 5rpx;
				color: #999999;

				image {
					width: 15rpx;
					height: 20rpx;
					margin-left: 10rpx;
				}
			}

			.text-site {
				display: inline-block;
				font-size: 24rpx;
				position: relative;
				float: right;
				top: 5rpx;
				color: #3b90fd;
				width: 60rpx;
				height: 100rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.view-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			// padding: 30rpx;

			.text-label {
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
			}

			.text-value {
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
				margin-right: 20rpx;
			}

			.image-arrow {
				width: 12rpx;
				height: 20rpx;
			}
		}
	}

	.btn {
		width: 95%;
		margin: auto;
		margin-top: 100rpx;
	}
</style>
