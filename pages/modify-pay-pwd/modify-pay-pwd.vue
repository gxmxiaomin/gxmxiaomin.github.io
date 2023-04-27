<template>
	<view class="view-container">
		<view class="view-title">请先验证手机号码</view>
		<view class="view-form">
			<view class="view-form-item">
				<view class="view-name">手机号</view>
				<view class="view-line"></view>
				<input type="text" v-model="phone" placeholder="输入您的手机号" />
			</view>
			<view class="view-form-item">
				<view class="view-name">验证码</view>
				<view class="view-line"></view>
				<input type="text" v-model="code" placeholder="请输入验证码" />
				<ice-button-code @click="getCode" ref="buttonCode"></ice-button-code>
			</view>
		</view>

		<button @click="codeLoginApi" class="u-reset-button">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				code: "",
				showPassword: false,
				checkboxValue1: [],
				// 基本案列数据
				checkboxList1: [{}, ],
				checkBox: 0,
				servicePhone: '', // 客服电话
				configValue: '',
			};
		},

		methods: {
			// 验证码登录
			async codeLoginApi() {
				if (!this.phone) {
					this.$toast("输入您的手机号");
					return;
				}
				if (this.phone.length != 11) {
					this.$toast("手机号格式不正确");
					return;
				}
				if (!this.code) {
					this.$toast("请输入验证码");
					return;
				}
				let res = await this.http.post('/app/user/fast', {
					phone: this.phone,
					code: this.code,
				});
				console.log('验证码登录', res);
				if (res.code == 200) {
					uni.navigateTo({
						url: '../pay-pwd/pay-pwd'
					})
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取验证码
			async getCode() {
				if (!this.phone) {
					this.$toast("请输入手机号");
					return;
				}
				if (this.phone.length != 11) {
					this.$toast("手机号格式不正确");
					return;
				}
				let res = await this.http.post('/app/user/getCode', {
					phone: this.phone,
				});
				if (res.code == 200) {
					this.$toast("验证码发送成功");
					this.$refs.buttonCode.start();
				} else {
					this.$toast(res.msg);
				}
			},
		},
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

	/deep/.u-checkbox {
		margin-bottom: 0rpx !important;
	}

	/deep/.u-checkbox__icon-wrap {
		width: 30rpx !important;
		height: 30rpx !important;
	}

	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 80rpx 57rpx 0;
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
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

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

		.view-options {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.view-forgot-password,
			.view-change-login {
				font-size: 28rpx;
				color: #333333;
				text-align: right;
				margin-top: 30rpx;
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
			margin: 70rpx 0 36rpx;
		}

		.view-have-account {
			font-size: 28rpx;
			color: #333333;
		}

		.view-other-login {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 40rpx 0 141rpx;

			.view-other-login-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				margin-bottom: 46rpx;
			}

			.view-other-login-icons {
				width: 100%;
				display: flex;
				justify-content: center;

				.view-other-login-icon-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 87rpx;
						height: 87rpx;
						margin: 0 70rpx;
						margin-bottom: 19rpx;
					}

					text {
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}

		.view-check {
			width: 100%;
			font-size: 24rpx;
			color: #999999;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;

			image {
				width: 31rpx;
				height: 31rpx;
				margin-right: 14rpx;
			}

			a {
				text-decoration: none;
				color: #4B9AFF;
			}
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
