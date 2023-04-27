<template>
	<view class="view-container">
		<view class="view-content">
			<view class="view-head">
				<text class="text-title">《档案模板》</text>
				<image @click="download" src="../../static/images/instructorapply.png" mode=""></image>
				<text class="text-info">请下载档案，在空白的位置填写相应的信息并上传</text>
			</view>
			<view class="view-file">
				<view class="view-upload" v-if="form.certificateUrl">
					<image class="image-docx" src="../../static/images/docx.png" mode=""></image>
					<text class="text-success-title">{{fileName}}</text>
					<text class="text-success">上传成功</text>
				</view>
				<view class="view-upload-button" v-if="form.certificateUrl" @click="upload">
					重新上传
				</view>
				<view class="view-upload" @click="upload" v-else>
					<image class="image-upload" src="../../static/images/applyfor.png" mode=""></image>
					<text class="text-title">点击上传文件</text>
				</view>
			</view>
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
						性别
					</view>
					<view class="view-input">
						<ice-selector v-model="form.sex" placeholder="请选择" :range="sexList" rangeKey="name">
						</ice-selector>
						<image src="../../static/images/right.png" mode=""></image>
					</view>
				</view>
				<view class="view-form-item">
					<view class="view-item-name">
						身份证号
					</view>
					<view class="view-input">
						<input type="text" v-model="form.idCardNumber" placeholder="请输入" />
					</view>
				</view>
			</view>
		</view>
		<view class="view-bottom">
			<button class="u-reset-button" @click="submit">上传档案</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: "",
					sex: "",
					certificateUrl: '',
					idCardNumber: '',
				},
				sexList: [{
					id: 1,
					name: "男"
				}, {
					id: 2,
					name: "女"
				}, ],
				templateUrl: '',
				fileName: '', //文件名
			};
		},
		onShow() {
			this.getFileUrl();
		},
		methods: {
			async submit() {
				if (!this.form.name) {
					this.$toast('请输入姓名')
					return
				}
				if (!this.form.sex) {
					this.$toast('请选择性别')
					return
				}
				if (!this.form.idCardNumber) {
					this.$toast('请输入身份证号')
					return
				}
				if (!this.form.certificateUrl) {
					this.$toast('请上传文件')
					return
				}
				let res = await this.http.postJson('/app/studentAssessment/certificateUpload', this.form);
				if (res.code == 200) {
					this.form = {
						name: "",
						sex: "",
						idCardNumber: '',
						certificateUrl: '',
					}
					await this.$toast('提交成功');
					return;
				} else {
					this.$toast(res.msg);
				}
			},
			async upload() {
				// #ifndef H5
				var filePicker = uni.requireNativePlugin("Yunzan-FilePicker");
				filePicker.chooseFile({}, async (result) => {
					if (result.code == 200) {
						this.fileName = result.data.split('/')[result.data.split('/').length - 1]
						let res = await this.http.upload(result.data);
						if (res.code == 200) {
							this.form.certificateUrl = res.data;
						} else {
							this.$toast(result.msg);
						}
					}

				})
				// #endif
				// #ifdef H5
				uni.chooseFile({
					count: 1,
					success: async (result) => {
						this.fileName = result.tempFiles[0].name
						let res = await this.http.upload(result.tempFilePaths[0]);
						if (res.code == 200) {
							this.status = 1;
							this.form.certificateUrl = res.data;
						} else {
							this.$toast(res.msg);
						}
					}
				});
				// #endif

			},
			async download() {
				uni.downloadFile({
					url: this.templateUrl,
					success: (result) => {
						uni.saveFile({
							tempFilePath: result.tempFilePath,
							success: (res) => {
								console.log(res)
								this.$toast("保存位置：" + res.savedFilePath);
							},
						})
					}
				})
			},
			async getFileUrl() {
				let res = await this.http.post('/app/userHome/platformAgreement', {
					protocolType: 'certificateTemplate'
				});
				if (res.code == 200) {
					this.templateUrl = res.data.protocolContent;
				} else {
					this.$toast(res.msg);
				}
			},
		},
	}
</script>

<style lang="scss">
	.view-content {
		padding-bottom: 200rpx;

		.view-head {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 30rpx;

			.text-title {
				font-weight: 500;
				color: #333333;
			}

			image {
				width: 36rpx;
				height: 36rpx;
			}

			.text-info {
				width: 100%;
				font-size: 26rpx;
				color: #F16109;
				margin-top: 10rpx;
			}
		}

		.view-file {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 30rpx solid #F7F7F7;
			width: 100%;
			height: 750rpx;

			.view-upload-button {
				width: 400rpx;
				height: 90rpx;
				background: #4A9AFF;
				border-radius: 10rpx;
				color: #FFFFFF;
				line-height: 90rpx;
				text-align: center;
				font-weight: 500;
				margin-top: 50rpx;
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
					width: 520rpx;
					flex-shrink: 1;
					height: 80rpx;
					background: #F6F6F6;
					border-radius: 10rpx;
					padding: 0 30rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					/deep/.ice-text {
						font-size: 28rpx;
					}

					image {
						width: 13rpx;
						height: 21rpx;
					}

					input {
						flex-grow: 1;
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
		height: 120rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;

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
