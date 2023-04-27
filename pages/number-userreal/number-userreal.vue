<template>
	<view>
		<ice-statusbar></ice-statusbar>
		<view class="view-container">
			<view class="view-uploads">
				<view class="view-uploads-title">
					请上传资料信息
				</view>
				<view class="view-uploads-tips">
					*请按照示例上传图片，并保持图片边框清晰<br>
					*一个账号仅限一次认证机会
				</view>
				<!-- 法人身份证 -->
				<view class="view-item-title" style="margin-top: 0;">
					法人身份证
				</view>

				<!-- <ice-upload-image v-model="params.idCardUrlFront" width="669rpx" height="404rpx"
					:defaultImage="require('@/static/images/upload-idcard-front.png')" @carScan="carScan"></ice-upload-image>
				<ice-upload-image v-model="params.idCardUrlReverse" width="669rpx" height="404rpx"
					:defaultImage="require('@/static/images/upload-idcard-backend.png')"></ice-upload-image> -->
				<view class="size">
					<image v-if="pic2" @click="upload2()" src="@/static/images/upload-idcard-front.png"></image>
					<image v-else @click="upload2()" :src="params.idCardUrlFront"></image>
				</view>
				<view class="size">
					<image v-if="pic3" @click="upload3()" src="@/static/images/upload-idcard-backend.png"></image>
					<image v-else @click="upload3()" :src="params.idCardUrlReverse"></image>
				</view>
				<!-- 法人身份证 -->
				<view class="view-form">
					<!-- 姓名 -->
					<view class="view-form-item">
						<view class="view-item-name">
							姓名:
						</view>
						<view class="view-input">
							<input disabled="disabled" type="text" v-model="params.legalPersonsName" />
						</view>
					</view>
					<!-- 住址 -->
					<view class="view-form-item">
						<view class="view-item-name">
							住址:
						</view>
						<view class="view-input">
							<input disabled="disabled" type="text" v-model="params.residenceAddress" />
						</view>
					</view>

					<view class="view-form-item">
						<view class="view-item-name">
							身份证号码:
						</view>
						<view class="view-input">
							<input disabled="disabled" type="text" v-model="params.idCardNumber" />
						</view>
					</view>
					<!-- 有效期 -->
					<view class="view-form">
						<view class="view-form-item">
							<view class="view-item-name">
								有效期:
							</view>
							<view class="view-input">
								<input disabled="disabled" type="text" v-model="params.city" />
							</view>
							<view class="view-item-name-z">
								至:
							</view>
							<view class="view-input">
								<input disabled="disabled" type="text" v-model="params.area" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<button @click="submit" type="default" class="u-reset-button">提交审核</button>
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
				params: {
					// address: '', // 住址
					// name: "", //姓名
					// num: "", // 身份证号码
					// endDate: "", //至
					// startDate: "", // 有效期
					// idCardUrlFront: "", //身份证 正
					// idCardUrlReverse: "", //身份证 反
					legalPersonsName: '', //法人姓名 用户姓名
					idCardNumber: '', // 身份证号码
					idCardUrlFront: "", // 身份证正面
					idCardUrlReverse: "", // 身份证反面
					residenceAddress: '', // 详细地址
					city: '', // 有效期开始
					area: '', // 有效期结束
				},
			};
		},
		methods: {
			async upload2() {
				var that = this
				uni.chooseImage({
					count: 1,
					success: async (result) => {
						let res = await that.http.upload(result.tempFilePaths[0]);
						if (res.code == 200) {
							that.pic2 = false;
							that.params.idCardUrlFront = res.data;
							var configure = "{'side':'face'}";
							var json = {
								"image": that.params.idCardUrlFront,
								"configure": configure
							};
							console.log(json)
							uni.request({
								url: 'http://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json', //测试api
								dataType: 'json',
								header: {
									'Authorization': 'APPCODE 5c4b19789a534b5c893670c8aa3e59f7' //APPCODE值
								},
								method: 'POST',
								data: JSON.stringify(json),
								success(res) {
									console.log(res);
									console.log('zheng')
									that.params.legalPersonsName = res.data.name
									that.params.residenceAddress = res.data.address
									that.params.idCardNumber = res.data.num
									console.log(that.params.idCardNumber)
								},
							})
							return;
						} else {
							that.$toast(res.msg);
						}
					},
				})
			},

			async upload3() {
				var that = this
				uni.chooseImage({
					count: 1,
					success: async (result) => {
						let res = await that.http.upload(result.tempFilePaths[0]);
						if (res.code == 200) {
							that.pic3 = false;
							that.params.idCardUrlReverse = res.data;
							var configure = "{'side':'back'}";
							var json = {
								"image": that.params.idCardUrlReverse,
								"configure": configure
							};
							console.log(json)
							uni.request({
								url: 'http://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json', //测试api
								dataType: 'json',
								header: {
									'Authorization': 'APPCODE 5c4b19789a534b5c893670c8aa3e59f7' //APPCODE值
								},
								method: 'POST',
								data: JSON.stringify(json),
								success(res) {
									console.log(res);
									console.log('fan')
									that.params.city = res.data.start_date
									that.params.area = res.data.end_date
									console.log(that.params.city)
								},
							})
							return;
						} else {
							that.$toast(res.msg);
						}
					},
				})
			},
			async submit() {
				var that = this;
				if (that.params.idCardUrlFront == "" || that.params.idCardUrlFront == null) {
					return this.$toast("请上传身份证");
				}
				if (that.params.idCardUrlReverse == "" || that.params.idCardUrlReverse == null) {
					return this.$toast("请上传身份证");
				}
				if (that.params.legalPersonsName == "" || that.params.legalPersonsName == null) {
					return this.$toast("姓名未添加，请上传有效身份证");
				}
				if (that.params.residenceAddress == "" || that.params.residenceAddress == null) {
					return this.$toast("住址未添加，请上传有效身份证");
				}
				if (that.params.idCardNumber == "" || that.params.idCardNumber == null) {
					return this.$toast("身份证号码未添加，请上传有效身份证");
				}
				if (that.params.area == "" || that.params.area == null) {
					return this.$toast("有效期未添加，请上传有效身份证");
				}
				if (that.params.city == "" || that.params.city == null) {
					return this.$toast("有效期未添加，请上传有效身份证");
				}
				let res = await this.http.postJson('/app/userInfo/userPerfectInformations', this.params);
				console.log(this.params)
				if (res.code == 200) {
					await this.$toast("提交成功");
					console.log(res)
					uni.navigateBack({ //返回
						delta: 1
					})
				} else {
					this.$toast(res.msg);
				}
			},
			// async submit() {
			// 	console.log(this.params);
			// 	let res = await this.http.postJson('/app/userInfo/userPerfectInformation', this.params);
			// 	if (res.code == 200) {
			// 		await this.$toast("提交成功");
			// 		console.log(res)
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