<template>
	<view @click="click" :disabled="disabled" class="button-code">{{getCodeText}}</view>
</template>

<script>
	export default {
		name: "ice-button-code",
		data() {
			return {
				timeCount: 60,
				getCodeText: '获取验证码',
				disabled: false,
			};
		},
		methods: {
			async click(){
				this.$emit("click","");
			},
			async start(){
				this.disabled = true;
				this.getCodeText = this.timeCount + "s";
				this.countDown();
				// this.$emit("handleSend","");
			},
			async countDown() {
				setTimeout(() => {
					if (this.timeCount > 1) {
						this.timeCount--;
						this.getCodeText = this.timeCount + "s";
						this.countDown();
					} else {
						this.timeCount = 60;
						this.disabled = false;
						this.getCodeText = '获取验证码';
					}
				}, 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.button-code {
		background-color: #FFFFFF;
		text-align: center;
		// border: 2rpx solid #999999;
		color: #009572;
		font-size: 32rpx;
	}
</style>
