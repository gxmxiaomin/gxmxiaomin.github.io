<template>
	<view class="chat-sound-wrap" @click="playAudio">
		<image class="icon" src="/static/images/audio.png"></image>
		<text class="duration">{{ duration }}</text>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext(); //音频

	export default {
		props: {
			data: {
				type: Object,
				default: () => {}
			},
			url: {
				type: String,
				default: ""
			},
			duration: {
				type: Number,
				default: 0
			},
			right: Boolean
		},
		data() {
			return {
				playing: false,
			}
		},
		beforeDestroy() {
			if (this.playing) {
				this.endAudio();
			}
		},
		methods: {
			playAudio() {
				innerAudioContext.src = this.url

				this.$nextTick(() => {
					innerAudioContext.play();
					this.$emit("play")
					innerAudioContext.onPlay(() => {
						console.log('onPlay')
						this.playing = true
					})
					innerAudioContext.onEnded(() => {
						this.$emit("end")
						this.playing = false
					})
				});
			},
			endAudio() {
				innerAudioContext.stop()
				innerAudioContext.onStop(() => {
					console.log('onStop')
				})
			}
		}
	}
</script>

<style lang="scss">
	.chat-sound-wrap {
		display: flex;
		height: 40rpx;
		background-color: white;
		width: 80rpx;
		border-radius: 8rpx;
		justify-content: flex-start;
		flex-direction: row;
		align-items: center;

		.duration {
			font-size: 14rpx;
			margin-left: 6rpx;
			color: #000000;
		}

		.icon {
			width: 18rpx;
			height: 18rpx;
			margin-left: 10rpx;
		}

		&.chat-sound-right-wrap {
			// background-color: #1E89FF;

			.icon {
				width: 18rpx;
				height: 18rpx;
				margin-right: 10rpx;
				transform: rotate(-110edg);
			}
		}
	}
</style>
