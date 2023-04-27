<template>
	<view class="input-pwd">
		<view class="view-content">
			<view class="view-title">请设置6位纯数字隐私密码</view>
			<view class="view-input">
				<u-code-input v-model="password" size="50" focus dot color="#5996F5" borderColor="#5996F5"
					:maxlength="6" @change="change"></u-code-input>
			</view>
			<view class="view-btn" @click="confirm">确认</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: ''
			};
		},
		methods: {
			change(e) {
				console.log(e);
			},
			async confirm() {
				if (this.password.length != 6) {
					this.$toast('请设置6位纯数字密码')
					return
				}
				let res = await this.http.post('/app/userInfo/settingSpacePassword', {
					password: this.password
				});
				console.log(res);
				if (res.code == 200) {
					this.$toast('设置成功')
					setTimeout(() => {
						uni.navigateBack({
							
						})
					}, 500)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input-pwd {
		.view-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 60rpx 30rpx;
			position: relative;

			.view-input {
				margin: 100rpx 0;
				height: 200rpx;

				/deep/.u-code-input__item {
					border-radius: 10rpx !important;
				}

				/deep/.u-code-input__item__dot {
					width: 40rpx;
					height: 40rpx;
					background-color: #4A9AFF;
				}

				.text-check {
					display: block;
					margin: 30rpx auto 0;
					text-align: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #FF0000;
				}

			}

			.view-btn {
				width: 630rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 999rpx;
				text-align: center;
				line-height: 80rpx;
				color: #fff;
			}

			.view-title {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				font-size: 36rpx;
				font-weight: 600;
				color: #333333;

				.view-close {
					position: absolute;
					top: 60rpx;
					right: 30rpx;
					width: 26rpx;
					height: 26rpx;

					image {
						width: 26rpx;
						height: 26rpx;
					}
				}
			}
		}
	}
</style>
