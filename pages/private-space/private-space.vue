<template>
	<view>
		<!-- 顶部栏 -->
		<view class="view-nav">
			<view class="view-nav-bar">
				<view class="view-back" @click="uni.navigateBack({})">
					<image src="../../static/images/back.png" mode=""></image>
				</view>
				<text>私密空间</text>
				<view class="view-more" @click="uni.navigateTo({
					url:'../private-space-more/private-space-more'
				})">
					<image src="../../static/images/nav_more.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="view-space"></view>

		<view class="view-private-space">
			<!-- 照片 -->
			<view class="view-item" @click="isCorrect?uni.navigateTo({
				url:'../photo-list/photo-list'
			}):$refs.inputRef.show = true">
				<view>
					<image class="img-cover" src="../../static/images/photo_bg.png" mode=""></image>
					<view class="view-info">
						<text>照片</text>
						<text>{{imgTotal}}文件</text>
					</view>
				</view>
				<view class="view-add" @click.stop="uploadImage">
					<image class="img-add" src="../../static/images/icon_add.png" mode=""></image>
				</view>
			</view>

			<!-- 视频 -->
			<view class="view-item" @click="isCorrect?uni.navigateTo({
				url:'../video-list/video-list'
			}):$refs.inputRef.show = true">
				<view>
					<image class="img-cover" src="../../static/images/video_bg.png" mode=""></image>
					<view class="view-info">
						<text>视频</text>
						<text>{{videoTotal}}文件</text>
					</view>
				</view>
				<view class="view-add" @click.stop="uploadVideo">
					<image class="img-add" src="../../static/images/icon_add.png" mode=""></image>
				</view>
			</view>
		</view>
		<image :src="src" mode=""></image>
		<input-pwd ref="setPwdRef" :isWarning="false" val="请设置6位纯数字" title="请先设置空间密码" @confirm="setPwd"></input-pwd>

		<input-pwd ref="inputRef" title="请输入空间密码" @confirm="loginSpace"></input-pwd>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgTotal: 0, // 照片数量
				videoTotal: 0, // 视频数量
				isCorrect: false, // 密码是否正确
				isSetPwd: '', // 是否设置空间密码
				src: ''
			}
		},
		async onLoad() {
			await this.checkSetPwd(); // 是否设置空间密码
			if (this.isSetPwd) {
				this.$nextTick(() => {
					this.$refs.inputRef.show = true
				})
			} else {
				this.$nextTick(() => {
					this.$refs.setPwdRef.show = true
				})
			}
		},
		onShow() {
			this.getPhotoCount();
			this.getVideoCount();
		},
		methods: {
			// 照片数量
			async getPhotoCount() {
				let res = await this.http.get('/app/userPrivateSpace/list', {
					type: 1,
					pageNum: this.page,
					pageSize: this.pageSize
				});
				console.log('照片数量', res);
				if (res.code == 200) {
					this.imgTotal = res.rows.length;
				} else {
					// this.$toast(res.msg);
				}
			},

			// 视频数量
			async getVideoCount() {
				let res = await this.http.get('/app/userPrivateSpace/list', {
					type: 2,
					pageNum: this.page,
					pageSize: this.pageSize
				});
				console.log('视频数量', res);
				if (res.code == 200) {
					this.videoTotal = res.rows.length;
				} else {
					// this.$toast(res.msg);
				}
			},

			// 是否设置空间密码
			async checkSetPwd() {
				let res = await this.http.get('/app/userInfo/isSettingSpacePassword');
				console.log('是否设置空间密码', res);
				if (res.code == 200) {
					this.isSetPwd = res.data;
				} else {
					// this.$toast(res.msg);
				}
			},

			// 设置空间密码
			async setPwd(e) {
				console.log(e);
				let res = await this.http.post('/app/userInfo/settingSpacePassword', {
					password: e
				});
				console.log('设置空间密码', res);
				if (res.code == 200) {
					if (res.data) {
						this.$refs.setPwdRef.show = false;
						this.$toast('设置成功');
					}
				} else {
					this.$toast(res.msg);
				}
			},

			// 登录空间
			async loginSpace(e) {
				if (e.length != 6) {
					this.$refs.inputRef.tips = '请输入6位密码'
					return
				}
				let res = await this.http.post('/app/userInfo/loginSpace', {
					password: e
				});
				console.log('登录空间', res);
				if (res.code == 200) {
					if (res.data) {
						this.$refs.inputRef.show = false;
						this.isCorrect = true;
						this.$toast('登录成功');
					} else {
						this.$refs.inputRef.tips = '密码错误，请重新输入'
						this.$refs.inputRef.value = ''
					}
				} else {
					this.$toast(res.msg);
				}
			},

			// 上传照片
			uploadImage() {
				if (!this.isCorrect) {
					this.$refs.inputRef.show = true;
					return
				}
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: async (result) => {
						console.log(result.tempFilePaths);

						let imgArr = [];
						for (let img of result.tempFilePaths) {
							let {
								data
							} = await this.http.upload(img);
							imgArr.push(data)
						}
						console.log(imgArr);

						let res = await this.http.post('/app/userPrivateSpace/uploadPrivateSpace', {
							type: 1,
							filesUrls: imgArr
						});
						console.log('上传结果', res);
						this.getPhotoCount();
					}
				})
			},

			// 上传视频
			uploadVideo() {
				if (!this.isCorrect) {
					this.$refs.inputRef.show = true;
					return
				}
				uni.chooseVideo({
					sourceType: ['album', 'camera'], //从相册选择
					success: async (result) => {
						console.log(result);
						console.log(result.tempFilePath);
						let {
							data
						} = await this.http.upload(result.tempFilePath);

						console.log(data);
						let res = await this.http.post('/app/userPrivateSpace/uploadPrivateSpace', {
							type: 2,
							filesUrls: data
						});
						console.log('上传结果', res);
						this.getVideoCount();
					}
				})
			},

			getNum(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-color: #fff;
		padding-top: var(--status-bar-height);

		.view-nav-bar {
			height: 88rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.view-back {
				width: 44rpx;
				height: 44rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 16rpx;
					height: 28rpx;
				}
			}

			.view-more {
				width: 44rpx;
				height: 44rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 7rpx;
					height: 31rpx;
				}
			}
		}
	}

	.view-space {
		margin-top: var(--status-bar-height);
		height: 88rpx;
	}

	.view-private-space {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30rpx;

		.view-item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 330rpx;
			height: 460rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;

			.view-info {
				display: flex;
				flex-direction: column;
				margin-top: 20rpx;

				text {
					&:first-child {
						font-size: 40rpx;
						font-weight: 600;
						color: #333333;
						margin-bottom: 10rpx;
					}

					&:last-child {
						font-size: 28rpx;
						color: #333333;
					}
				}
			}

			.img-cover {
				width: 270rpx;
				height: 200rpx;
			}

			.view-add {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}

			.img-add {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
</style>
