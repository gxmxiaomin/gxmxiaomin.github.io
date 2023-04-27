<template>
	<view>
		<ice-statusbar></ice-statusbar>
		<view class="view-container">
			<view class="view-uploads">
				<view class="view-uploads-title">
					请上传资料信息
				</view>
				<view class="view-uploads-tips">
					证书类型包含专业资格证、工作证明等有效证件
				</view>
				<view class="view-item-title" style="margin-top: 0;">
					营业执照
				</view>
				<ice-upload-image v-model="params.businessLicenseUrl" width="669rpx" height="404rpx"
					:defaultImage="require('@/static/images/upload-yingyezhizhao.png')"></ice-upload-image>
				<!-- 实名认证 -->
				<view class="view-form">
					<view></view>
					<view class="view-form-item">
						<view class="view-item-name">
							机构名称:
						</view>
						<view class="view-input">
							<input style="background: #F6F6F6; width:90%; padding-left: 40rpx; border-radius: 10rpx;"
								type="text" v-model="params.merchantsName" placeholder="请输入" />
						</view>
					</view>
				</view>
				<view class="view-select">
					<view class="view-item-name">
						选择身份
					</view>
					<view class="view-show-picker">
						<ice-selector v-model="params.identityType" :range="roleList" rangeKey="name"></ice-selector>
						<image src="@/static/images/down.png" mode=""></image>
					</view>
				</view>
				<button @click="submit" type="default" class="u-reset-button">提交审核</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roleList: [{
					name: '培训机构',
					id: 7,
				}, {
					name: '学校',
					id: 1,
				}, {
					name: '商家',
					id: 2,
				}, {
					name: '咨询师',
					id: 3,
				}, {
					name: '律师',
					id: 4,
				}, {
					name: '医生',
					id: 5,
				}, {
					name: '自媒体',
					id: 6,
				}, {
					name: '商家（网店）',
					id: 8,
				}, ],
				pic1: true,
				img: '',
				params: {
					merchantsName: "", //学校/机构名称
					businessLicenseUrl: "", //营业执照
					identityType: '',
					identity:''
				},
				identity: ''
			};
		},

		methods: {
			async submit() {
				var that = this;
				if (that.params.businessLicenseUrl == "") {
					return that.$toast("请添加营业执照");;
				}
				if (that.params.merchantsName == "") {
					return that.$toast("机构名称未添加");
				}
				console.log(this.params);
				if (this.params.identityType == "") {
					return that.$toast("请选择身份");
				} else if (this.params.identityType == 1) {
					that.params.identity = "学校"
				} else if (this.params.identityType == 2) {
					that.params.identity = "商家"
				} else if (this.params.identityType == 3) {
					that.params.identity = "咨询师"
				} else if (this.params.identityType == 4) {
					that.params.identity = "律师"
				} else if (this.params.identityType == 5) {
					that.params.identity = "医生"
				} else if (this.params.identityType == 6) {
					that.params.identity = "自媒体"
				} else if (this.params.identityType == 7) {
					that.params.identity = "培训机构"
				} else if (this.params.identityType == 8) {
					that.params.identity = "商家（网店）"
				}
				let res = await this.http.postJson('/app/userInfo/updateUserPerfectInformation', this.params);
				if (res.code == 200) {
					console.log(res);
					await this.$toast("提交成功");
					uni.navigateBack({ //返回
						delta: 1
					})
				} else {
					this.$toast(res.msg);
				}
			},
			// async submit() {
			// 	console.log(this.params);
			// 	let res = await this.http.postJson('/app/userInfo/updateUserPerfectInformation', this.params);
			// 	if (res.code == 200) {
			// 		console.log(res);
			// 		await this.$toast("提交成功");
			// 		uni.navigateBack({ //返回
			// 			delta: 1
			// 		})
			// 	} else {
			// 		this.$toast(res.msg);
			// 	}
			// },
			async logout() {
				uni.closeSocket({
					complete: (res) => {
						console.log(res)
					}
				})
				uni.removeStorageSync('token');
				uni.removeStorageSync('userInfo')
				uni.redirectTo({
					url: '../login/login'
				})
			}
		},
	}
</script>

<style lang="scss">
	.view-container .view-select[data-v-048e4f98] {
		padding-left: 0rpx;
		padding-right: 50rpx;
		width: 100%;
		display: flex;
		align-items: center;
		// margin: 18px 0;
		margin: 0rpx;
	}

	.view-select {
		// padding-right: 35rpx;
		padding: 0rpx;
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