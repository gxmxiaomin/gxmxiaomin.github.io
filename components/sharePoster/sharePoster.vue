<template>
	<view class="poster">
		<canvas canvas-id="firstCanvas" id="firstCanvas" :style="'height:' + screenHeight + 'px;width:' + screenWidth + 'px'"></canvas>
	</view>
</template>

<script>
	export default {
		name:"sharePoster",
		data() {
			return {
				screenWidth: 375,
				screenHeight: 820,
				codeImg: '',
				userInfo: {},
			};
		},
		mounted() {
			this.userInfo = uni.getStorageSync('userInfo')||{}
		},
		
		methods: {
			drow() {
				let src = require('@/static/share/shareBg.jpg')
				let img = require('@/static/share/bg.jpeg')
				let hear = require('@/static/share/hard.jpeg')
				const ctx = uni.createCanvasContext('firstCanvas')
				// const pattern = ctx.createPattern(src, 'repeat-x')
				// ctx.fillStyle = pattern
				// ctx.fillRect(0, 0, this.screenWidth, this.screenHeight)
				ctx.drawImage( src, 0, 0, this.screenWidth, this.screenHeight)
				ctx.drawImage( this.codeImg||img, 40, 710, 90, 90)
				ctx.drawImage( this.userInfo.headUrl||hear, 260,715, 70, 70)
				ctx.draw()
			},
			
			goShare(shareType, shareTypes) {
				console.log(this.codeImg)
				// #ifdef APP
				console.log("??????")
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  fileType: 'png',
				  width: this.screenW,
				  height: this.screenH,
				  destWidth: this.screenW,
				  destHeight: this.screenH,
				  canvasId: 'firstCanvas',
				  success: res=> {
					  uni.share({
					  	provider: shareType,
						scene: shareTypes,
					  	type: 2,
					  	imageUrl: res.tempFilePath,
						href: this.codeImg,
						title: '邀请',
					  	success: res=> {
							this.$emit('confirm')
					  		console.log("success:" + JSON.stringify(res));
					  	},
					  	fail: function (err) {
					  		console.log("fail:" + JSON.stringify(err));
					  	}
					  });
				  } 
				})
				// #endif
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.poster{
		width: 100%;
		height: 100vh;
	}
#firstCanvas{
	width: 750rpx;
	height: 1640rpx;
}
</style>