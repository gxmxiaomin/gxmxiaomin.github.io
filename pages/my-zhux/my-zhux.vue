<template>
	<view class="view-container">
		<!-- 	<view class="view-title">重置登录密码
		</view> -->
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
		</view>
		<button @click="brnsg" class="u-reset-button">确认注销</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
			};
		},
		onLoad() {
			let lis = uni.getStorageSync('userInfo')
			console.log(lis, '555')
			this.phone = lis.phoneNum
		},
		methods: {
			async getCode() {
				const res = await this.http.post('/app/user/getCode', {
					phone: this.phone
				})
				if (res.code == 200) {
					this.$toast("验证码发送成功");
					this.$refs.buttonCode.start();
				} else {
					this.$toast(res.msg);
				}
			},
			brnsg() {
				let then = this
				console.log(then.phone, '77')
				if (!then.phone) {
					then.$toast("请输入手机号");
					return;
				}
				if (then.phone.length != 11) {
					then.$toast("手机号格式不正确");
					return;
				}
				if (!then.code) {
					then.$toast("请输入验证码");
					return;
				}
				uni.showModal({
					title: '温馨提醒',
					content: '有关该账号的所有数据全部清空，账号注销之后该手机号将无法访问沐星辰旗下所有APP，请谨慎操作',
					success: function(res) {
						if (res.confirm) {
							then.clides()
							console.log('用户点击确定');
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async clides() {
				let res = await this.http.post('/app/userInfo/userLogOutInfo', {
					code: this.code
				});
				if (res.code === 200) {
					uni.clearStorageSync('token');
					this.$toast('注销成功')
					uni.redirectTo({
						url: '../login/login'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
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