<template>
	<view class="view-container">
		<view class="view-title">重置登录密码
		</view>
		<view class="view-form">
			<view class="view-form-item">
				<view class="view-name">
					手 机 号
				</view>
				<view class="view-line"></view>
				<input type="text" v-model="phone" placeholder="输入您的手机号" />
			</view>
			<view class="view-form-item">
				<view class="view-name">
					验 证 码
				</view>
				<view class="view-line"></view>
				<input type="text" v-model="code" placeholder="请输入验证码" />
				<ice-button-code @click="getCode" ref="buttonCode"></ice-button-code>
			</view>
			<view class="view-form-item">
				<view class="view-name">
					新 密 码
				</view>
				<view class="view-line"></view>
				<input :password="!showPassword" v-model="newPassword" placeholder="6-12位字母数字组合" />
				<u-icon @click="showPassword=!showPassword" :name="showPassword?'eye-fill':'eye-off'"></u-icon>
			</view>
			<view class="view-form-item">
				<view class="view-name">
					确认密码
				</view>
				<view class="view-line"></view>
				<input :password="!showPassword1" v-model="confirmPassword" placeholder="6-12位字母数字组合" />
				<u-icon @click="showPassword1=!showPassword1" :name="showPassword1?'eye-fill':'eye-off'"></u-icon>
			</view>
		</view>
		<button @click="resetPassword()" class="u-reset-button">确认重置</button>
		<!-- 客服电话 -->
		<view class="view-phone" @click="uni.makePhoneCall({
			phoneNumber:serviceTel
		})">
			客服电话:<text>{{serviceTel}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				code: "",
				newPassword: "",
				confirmPassword: "",
				showPassword: false,
				showPassword1: false,
				serviceTel: '', // 客服电话
			};
		},
		onShow() {
			this.getServicePhone()
		},
		methods: {
			// 获取客服电话
			async getServicePhone() {
				let res = await this.http.post('/app/userHome/platformAgreement?protocolType=platformPhone');
				console.log('获取客服电话', res);
				if (res.code == 200) {
					this.serviceTel = res.data.protocolContent;
				}
			},
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
			async resetPassword() {
				if (!this.phone) {
					this.$toast("请输入手机号");
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
				if (this.newPassword.length < 6) {
					this.$toast("密码至少6位");
					return;
				}
				if (this.newPassword != this.confirmPassword) {
					this.$toast("两次密码输入不一致");
					return;
				}
				let res = await this.http.post('/app/userInfo/resetPassword', {
					phone: this.phone,
					code: this.code,
					password: this.newPassword,
				});
				if (res.code == 200) {
					await this.$toast("修改成功");
					uni.navigateBack({

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
