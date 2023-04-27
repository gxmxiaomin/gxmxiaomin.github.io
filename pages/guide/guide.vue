<template>
	<view>
		<view class="view-guide">
			<u-swiper ref="swiper" :list="bannerList" :indicator="true" :circular="false" :interval="1500"
				:autoplay="autoplay" @change="change" indicatorInactiveColor="rgba(255, 255, 255, 0.4)" height="100vh">
			</u-swiper>
			<view class="view-trip" v-if="guide!=1">
				<text @click="uni.switchTab({
						url:'../index/index'
				})" class="text-trip">跳过</text>
			</view>
			<view class="view-button" v-else>
				<button @click="goIndex()" class="u-reset-button button-text">进入App</button>
			</view>
			<image src="../../static/images/guide1.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [
					require('@/static/images/guide1.png'),
					require('@/static/images/guide2.png'),
					require('@/static/images/guide3.png'),
				],
				guide: 2,
			}
		},
		computed: {
			autoplay() {
				return this.guide !== 1
			}
		},
		onLoad() {
			console.log('引导页引导页引导页引导页')
			// setTimeout(function() {
			// 	// uni.setStorageSync('notFirstTime', true)
			// 	uni.switchTab({
			// 		url: '../index/index'
			// 	})
			// }, 4500)
		},
		methods: {
			change(index) {
				if (index.current == 2) {
					this.guide = 1
				} else {
					this.guide = 2
				}
			},
			goIndex() {
				uni.setStorageSync('notFirstTime',true)
				uni.switchTab({
						url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.view-guide {
		position: relative;
		height: 100vh;
		overflow-y: hidden;

		.view-trip {
			position: absolute;
			top: 102rpx;
			right: 33rpx;
			width: 133rpx;
			height: 60rpx;
			background: rgba(0, 0, 0, 0.2);
			border-radius: 10rpx;
			text-align: center;
			line-height: 60rpx;
			color: #FFFFFF;
		}

		.view-button {
			width: 630rpx;
			height: 80rpx;
			background: #4A9AFF;
			border-radius: 40rpx;
			position: absolute;
			bottom: 74rpx;
			z-index: 9999;
			margin: 0rpx 60rpx;

			.button-text {
				line-height: 80rpx;
				color: #FFFFFF;
			}

		}
	}
</style>
