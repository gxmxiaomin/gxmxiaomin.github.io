<template>
	<view class="view-container">
		<ice-statusbar></ice-statusbar>
		<ice-navbar>
			<view class="view-nav">
				<image class="image1" src="@/static/images/left.png" mode="" @click="uni.navigateBack({
				
			})"></image>
			</view>
		</ice-navbar>
		<view class="view-content">
			<view class="view-file">
				<text class="text-title">请上传简历文档</text>
				<text class="text-tip">仅支持.docx</text>
				<view class="view-upload" v-if="submit">
					<image class="image-docx" src="../../static/images/docx.png" mode=""></image>
					<text class="text-success-title">杨晶晶-书法老师-简历.docx</text>
					<text class="text-success">上传成功</text>
				</view>
				<view class="view-upload" v-else>
					<image class="image-upload" src="../../static/images/applyfor.png" mode=""></image>
					<text class="text-title">点击上传合同文件</text>
				</view>
			</view>
			<view class="view-gap"></view>
			<view class="view-form">
				<view class="view-form-item">
					<view class="view-item-name">
						姓名
					</view>
					<view class="view-input">
						<input type="text" v-model="form.name" placeholder="请输入" />
					</view>
				</view>
				<view class="view-form-item">
					<view class="view-item-name">
						电话
					</view>
					<view class="view-input">
						<input type="text" v-model="form.phone" placeholder="请输入" />
					</view>
				</view>
				<view class="view-form-item">
					<view class="view-item-name">
						邮箱号
					</view>
					<view class="view-input">
						<input type="text" v-model="form.email" placeholder="请输入" />
					</view>
				</view>
			</view>
		</view>
		<view class="view-bottom">
			<button class="u-reset-button" v-if="submit">提交资料</button>
			<button class="u-reset-button closed" v-else>提交资料</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: "",
					phone: "",
					email: ""
				},
				submit: false,
			};
		}
	}
</script>

<style lang="scss">
	.view-nav {
		width: 100%;
		height: 88rpx;
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 99;
		padding: 0 30rpx;

		.image1 {
			width: 16rpx;
			height: 28rpx;
		}
	}

	.view-content {
		.view-file {
			display: flex;
			flex-direction: column;
			align-items: center;

			.text-title {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
			}

			.text-tip {
				font-size: 24rpx;
				color: #FF0000;
				margin: 20rpx 0 40rpx;
			}

			.view-upload {
				width: 400rpx;
				height: 400rpx;
				background: #FFFFFF;
				border: 1px solid #999999;
				border-radius: 7rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.image-upload {
					width: 124rpx;
					height: 76rpx;
					margin-bottom: 30rpx;
				}

				.text-title {
					font-size: 32rpx;
					color: #4A9AFF;
				}

				.image-docx {
					width: 100rpx;
					height: 124rpx;
				}

				.text-success-title {
					font-size: 20rpx;
					font-weight: 500;
					color: #A6ACBA;
					margin: 20rpx 0 40rpx;
				}

				.text-success {
					font-size: 28rpx;
					color: #A7ADBB;
				}
			}
		}

		.view-gap {
			background-color: #F7F7F7;
			height: 10rpx;
			margin-top: 70rpx;
		}

		.view-form {
			width: 100%;
			padding: 30rpx;

			.view-form-item {
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.view-item-name {
					font-size: 32rpx;
					color: #333333;
					margin-right: 31rpx;
				}

				.view-input {
					width: 540rpx;
					flex-shrink: 1;
					height: 80rpx;
					background: #F6F6F6;
					border-radius: 10rpx;
					padding: 0 30rpx;
					display: flex;
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

	}

	.view-bottom {
		width: 100%;
		position: fixed;
		bottom: 10rpx;
		display: flex;
		justify-content: center;

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

		.closed {
			background: #CCCCCC;
		}
	}
</style>
