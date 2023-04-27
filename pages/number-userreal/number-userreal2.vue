<template>
	<view>
		<ice-statusbar></ice-statusbar>
		<view class="view-container">
			<view class="view-uploads">
				<view class="view-uploads-title">
					资料信息
				</view>
				<view class="view-uploads-tips">
					*一个账号仅限一次认证机会
				</view>
				<!-- 法人身份证 -->
				<view class="view-item-title" style="margin-top: 0;">
					法人身份证
				</view>
				<view class="size">
					<image :src="idCardUrlFront"></image>
				</view>
				<view class="size">
					<image :src="idCardUrlReverse"></image>
				</view>
				<!-- 法人身份证 -->
				<view class="view-form">
					<!-- 姓名 -->
					<view class="view-form-item">
						<view class="view-item-name">
							姓名:
						</view>
						<view class="view-input">
							<input disabled="disabled" type="text" v-model="legalPersonsName" />
						</view>
					</view>
					<!-- 住址 -->
					<view class="view-form-item">
						<view class="view-item-name">
							住址:
						</view>
						<view class="view-input">
							<input disabled="disabled" type="text" v-model="residenceAddress" />
						</view>
					</view>

					<view class="view-form-item">
						<view class="view-item-name">
							身份证号码:
						</view>
						<view class="view-input">
							<input disabled="disabled" type="text" v-model="idCardNumber" />
						</view>
					</view>
					<!-- 有效期 -->
					<view class="view-form">
						<view class="view-form-item">
							<view class="view-item-name">
								有效期:
							</view>
							<view class="view-input">
								<input disabled="disabled" type="text" v-model="city" />
							</view>
							<view class="view-item-name-z">
								至:
							</view>
							<view class="view-input">
								<input disabled="disabled" type="text" v-model="area" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <button @click="submit" type="default" class="u-reset-button">提交审核</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic2: true,
				pic3: true,
				img: '',
				legalPersonsName: '', //法人姓名 用户姓名
				idCardNumber: '', // 身份证号码
				idCardUrlFront: "", // 身份证正面
				idCardUrlReverse: "", // 身份证反面
				residenceAddress: '', // 详细地址
				city: '', // 有效期开始
				area: '', // 有效期结束
			};
		},
		onShow() {
			this.submit()
		},
		methods: {
			async submit() {
				let res = await this.http.postJson('/app/userInfo/selectAuthentication');
				console.log(res.data[0])
				this.legalPersonsName = res.data[0].legalPersonsName
				this.idCardUrlFront = res.data[0].idCardUrlFront
				this.idCardUrlReverse = res.data[0].idCardUrlReverse
				this.idCardNumber = res.data[0].idCardNumber
				this.residenceAddress = res.data[0].residenceAddress
				this.city = res.data[0].city
				this.area = res.data[0].area
			},
		},
	}
</script>

<style lang="scss">
	.size>image {
		width: 669rpx;
		height: 404rpx;
	}

	.view-top {
		display: flex;
		align-items: center;
		padding: 30rpx;

		.view-title {
			width: 90%;
			position: absolute;
			text-align: center;
			z-index: -1;
		}
	}

	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		// padding: 0 30rpx;
		font-family: PingFang SC;

		.view-skip {
			position: fixed;
			top: 14rpx;
			right: 30rpx;
			width: 133rpx;
			height: 60rpx;
			background: rgba(0, 0, 0, 0.2);
			border-radius: 10rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			z-index: 999;
		}

		.view-select {
			padding: 0 30rpx;
			width: 100%;
			display: flex;
			align-items: center;
			margin: 30rpx 0;

			.view-item-name {
				font-size: 32rpx;
				color: #333333;
				margin-right: 31rpx;
			}

			.view-show-picker {
				width: 100%;
				flex-shrink: 1;
				height: 80rpx;
				background: #F6F6F6;
				border-radius: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 17rpx 0 30rpx;

				text {
					font-size: 28rpx;
					color: #333333
				}

				image {
					width: 22rpx;
					height: 13rpx;
				}
			}
		}

		.view-space {
			// width: 100vh;
			height: 20rpx;
			background: #F7F7F7;
		}

		.view-form {
			// padding: 0 30rpx;
			// border-top: 20rpx solid #F7F7F7;
			width: 100%;
			margin-bottom: 60rpx;

			.view-form-title {
				font-size: 40rpx;
				font-weight: 500;
				color: #333333;
				margin: 30rpx 0;
			}

			.view-form-item {
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.view-item-name {
					font-size: 32rpx;
					color: #333333;
					margin-right: 31rpx;
				}

				.view-item-name-z {
					font-size: 32rpx;
					color: #333333;
					margin-right: 56rpx;
				}

				.view-input {
					width: 80%;
					flex-shrink: 1;
					height: 80rpx;
					// background: #F6F6F6;
					border-radius: 10rpx;
					// padding: 0 30rpx;
					// display: flex;
					flex-direction: row;
					align-items: center;

					/deep/.ice-text {
						font-size: 28rpx;
					}

					input {
						height: 100%;

						.uni-input-placeholder {
							font-size: 28rpx;
							color: #999999;
						}
					}
				}
			}
		}

		.view-uploads {
			padding: 0 30rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 13rpx;

			.view-uploads-title {
				width: 100%;
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				margin-bottom: 8rpx;
			}

			.view-uploads-tips {
				width: 100%;
				font-size: 24rpx;
				color: #FC6129;
				line-height: 36rpx;
				margin-bottom: 25rpx;
			}

			.view-item-title {
				width: 100%;
				font-size: 32rpx;
				color: #333333;
				margin: 60rpx 0 32rpx;
			}

			.view-uploads-item {
				width: 669rpx;
				height: 404rpx;
				background-size: 669rpx 404rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 33rpx;
				border: 1px dashed #999999;

				image {
					width: 121rpx;
					height: 120rpx;
					margin-bottom: 39rpx;
				}
			}
		}

		.u-reset-button {
			width: 633rpx;
			height: 90rpx;
			background: #4B9AFF;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 90rpx;
			text-align: center;
			margin: 4rpx 0;
		}
	}
</style>
