<template>
	<view class="view-container">
		<view class="view-title">绑定手机号
		</view>
		<view class="view-form">
			<view class="view-form-item">
				<view class="view-name">
				    手 机 号
				</view>
				<view class="view-line"></view>
				<input type="text" v-model="newPhone" placeholder="输入您的新手机号" />
			</view>
			<view class="view-form-item">
				<view class="view-name">
					验 证 码
				</view>
				<view class="view-line"></view>
				<input type="text" v-model="code" placeholder="请输入验证码" />
				<ice-button-code @click="getCode" ref="buttonCode"></ice-button-code>
			</view>
			
		</view>
		<button @click="resetPassword()" class="u-reset-button">确认</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newPhone: "", //新手机号
				code: "", //验证码
			};
		},
		onShow() {
			// this.getServicePhone()
		},
		methods: {
			async getCode() {
				if (!this.newPhone) {
					this.$toast("请输入手机号");
					return;
				}
				if (this.newPhone.length != 11) {
					this.$toast("手机号格式不正确");
					return;
				}
				let res = await this.http.post('/app/user/getCode', {
					phone: this.newPhone,
				});
				if (res.code == 200) {
					this.$toast("验证码发送成功");
					this.$refs.buttonCode.start();
				} else {
					this.$toast(res.msg);
				}
			},
			async resetPassword() {
				if (!this.newPhone) {
					this.$toast("请输入手机号");
					return;
				}
				if (this.newPhone.length != 11) {
					this.$toast("手机号格式不正确");
					return;
				}
				if (!this.code) {
					this.$toast("请输入验证码");
					return;
				}
				let res = await this.http.post('/app/user/bindingPhone', {
					phone: this.newPhone,
					code: this.code,
				});
				if (res.code == 200) {
					await this.$toast("绑定成功");
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.view-phone {
		position: fixed;
		bottom: 60rpx;
		font-size: 24rpx;
		color: #999999;

		text {
			margin-left: 10rpx;
			color: #4B9AFF;
			text-decoration: none;
		}
	}

	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 98rpx 57rpx 0;
		font-family: PingFang SC;

		.view-title {
			width: 100%;
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 40rpx;
			margin-bottom: 106rpx;
		}

		.view-form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;

			.view-form-item {
				width: 100%;
				height: 110rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #F7F9FA;

				.view-name {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					width: 112rpx;
					text-align: justify;
					align-items: center;
				}

				.view-line {
					width: 1px;
					height: 40rpx;
					background: #EFEFEF;
					margin: 0 30rpx;
				}

				uni-input {
					flex-grow: 1;
					flex-shrink: 1;
				}

				.uni-input-placeholder {
					font-size: 28rpx;
					font-weight: 400;
					color: #CCCCCC;
				}

				/deep/.button-code {
					font-size: 28rpx;
					font-weight: 500;
					color: #4B9AFF;
					text-decoration: underline;
				}

				image {
					width: 33rpx;
					height: 27rpx;
				}
			}
		}

		.u-reset-button {
			width: 100%;
			height: 90rpx;
			background: #4B9AFF;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 90rpx;
			text-align: center;
			margin: 94rpx 0 36rpx;
		}

		.view-service {
			font-size: 24rpx;
			color: #999999;

			a {
				margin-left: 10rpx;
				color: #4B9AFF;
				text-decoration: none;
			}
		}
	}
</style>
