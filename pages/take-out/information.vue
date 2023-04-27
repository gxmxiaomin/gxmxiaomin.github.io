<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>消息中心</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth">
					<text>已读</text>
					<image src="../../static/images/qingchu.png" mode=""></image>
				</view>
			</view>

			<view class="box">
				<view @click="uni.navigateTo({
					url:'./shop-chat-page'
				})" class="box-1" v-for="item in list">
					<image src="../../static/images/hot_cover.png" mode=""></image>
					<view class="box-2">
						<view class="title">
							<view>{{item.name}}</view>
							<view>{{item.shijian}}</view>
						</view>
						<view class="hint">
							<view>{{item.info}}</view>
							<view>{{item.time}}</view>
						</view>
					</view>
					<view class="" style="width: 95%;height: 1rpx;background-color: #f4f4f4;margin: auto;margin-top: 15rpx;"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '果蔬(文华路店)',
					info: '西红柿🍅今天刚到店',
					shijian: '12：23',
					time:'1'
				},{
					name: '果蔬(文华路店)',
					info: '土豆🥔今天刚到店',
					shijian: '10：13',
					time:'1'
				},{
					name: '果蔬(文华路店)',
					info: '茄子🍆今天刚到店',
					shijian: '10：02',
					time:'1'
				},{
					name: '果蔬(文华路店)',
					info: '西兰花🥦今天刚到店',
					shijian: '9：15',
					time:'1'
				},{
					name: '果蔬(文华路店)',
					info: '黄瓜🥒今天刚到店',
					shijian: '9：30',
					time:'1'
				}]
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	.top-bar {
		height: 180rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		background-image: linear-gradient(#509bfc, #95c0f8);
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
			flex: 3;
			height: 100%;
		}

		.bar-right {
			flex: 1;
			height: 100%;

			.city-rigth {
				color: #FFF;
				font-size: 24rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
					vertical-align: middle;
					margin-top: -5rpx;
				}
			}
		}

		.box {
			background-color: #fff;
			width: 100%;
			position: absolute;
			top: 160rpx;
			border-radius: 20rpx 20rpx 0 0;

			.box-1 {
				margin: 30rpx 0 20rpx 20rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				.box-2 {
					display: inline-block;
					width: 82%;
					position: relative;
					top: -16rpx;
					left: 20rpx;

					.title {
						view {
							&:nth-child(1) {
								display: inline-block;
								font-size: 32rpx;
							}

							&:nth-child(2) {
								display: inline-block;
								font-size: 24rpx;
								color: #aaa;
								float: right;
							}
						}
					}

					.hint {
						view {
							&:nth-child(1) {
								display: inline-block;
								font-size: 22rpx;
								color: #9c9c9c;

							}

							&:nth-child(2) {
								display: inline-block;
								font-size: 22rpx;
								color: #fff;
								padding: 0 10rpx;
								border-radius: 50%;
								background-color: red;
								float: right;
							}
						}
					}
				}
			}
		}
	}
</style>
