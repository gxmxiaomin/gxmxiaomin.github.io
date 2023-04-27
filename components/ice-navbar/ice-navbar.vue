<template>
	<view class="ice-navbar" :style="'height:'+height+';'">
		<view class="navbar-bg" :style="'background-color:'+bgColor+';'">
			<view class="navbar" :style="'width: '+width+';'">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ice-navbar",
		props: {
			bgColor: {
				type: String,
				default: "#FFFFFF"
			},
			height: {
				typr: String,
				default:"88rpx"
			}
		},
		data() {
			return {
				width: '100%',
			};
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.width = menuButtonInfo.left + "px";
			// #endif
		},
	}
</script>

<style lang="scss" scoped>

	.navbar-bg {
		width: 100%;
		position: fixed;
		z-index: 99;
		height: 88rpx;
	}

	.navbar {
		height: 100%;
	}
</style>
