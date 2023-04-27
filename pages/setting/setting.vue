<template>
	<view>
		<u-popup :show="show1" mode="center" :closeable="closeables" @close="closes">
			<view class="my-centers">
				<!-- <image style="width: 200px;height: 200px;" src="../../static/images/banben2.png" mode=""></image> -->
				<view class="tents">
					<view style="margin-bottom: 3px;color: #000000;font-weight: 1000;font-size: 20px;">
						新版本来袭
					</view>
					<view style="color: #909090;font-size: 15px;margin: 4px 0;" v-for="(item,index) in listyy"
						:key="index">{{item}}</view>
					<!-- <view style="margin: 5px 0;color: #909090;font-size: 10px;">{{listyy[1]}}</view> -->
					<u-button class="btn" text="立即更新" @click="gxtye"></u-button>
				</view>

			</view>
		</u-popup>
		<!-- 进度条 -->
		<u-popup :show="show2" mode="center">
			<view class="progress">
				<view class="app">
					<text style="font-size: 20px;">升级app</text>
				</view>
				<view class="update">
					<text>正在为您更新，请耐心等待</text>
				</view>
				<view class="lineProgress">
					<u-line-progress :percentage="progress" activeColor="red"></u-line-progress>
				</view>
			</view>
		</u-popup>
		<view style="margin-top: 20rpx;background-color: #ffffff;">

			<view class="view-item" @click="uni.navigateTo({
				url:'../account-safety/account-safety'
			})">
				<text class="text-label">账号与安全</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
		<!-- 	<view class="view-item" @click="uni.navigateTo({
			url:'../number-binding/number-binding'
		})">
				<text class="text-label">账号绑定</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view> -->
		</view>
		<view style="margin-top: 20rpx;background-color: #ffffff;">
			<view class="view-item" @click="zhifu">
				<text class="text-label">支付设置</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
			<view class="view-item" @click="shoev">
				<text class="text-label">收获地址管理</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
		</view>

		<view style="margin-top: 20rpx;background-color: #ffffff;">
			<view class="view-item" @click="uni.navigateTo({
				url:'../intimate-set/intimate-set'
			})">
				<text class="text-label">隐私设置</text>
				<view class="flex-grow">

				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
			<view class="view-item" @click="yisfcde">
				<text class="text-label">私密空间设置</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>

			<view class="view-item" @click="showClearCache=true">
				<text class="text-label">清除缓存</text>
				<view class="flex-grow">
				</view>
				<text class="text-value">{{storageSize}}</text>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
			<!-- <view class="view-item">
				<text>消息免打扰</text>
				<view class="flex-grow">
				</view>
				<view>
					<u-switch v-model="msgNotTip" @change="messageStatuChange"></u-switch>
				</view>
			</view> -->
		</view>
		<view style="margin-top: 20rpx;background-color: #ffffff;">
			<view class="view-item" @click="checkUpdate">
				<text class="text-label">当前版本</text>
				<view class="flex-grow"></view>
				<text class="text-value">{{versionse || '已最新版本'}} <text v-if="update" class="hongdian"></text> </text>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
		</view>

		<view class="view-goOut">
			<button class="u-reset-button" @click="logout">退出登录</button>
		</view>
		<u-popup @close="showClearCache=false" mode="bottom" round="20rpx" borderRadius="20rpx" :show="showClearCache">
			<view class="view-popup-clear-cache">
				<text class="text-title">确定清除缓存？</text>
				<text class="text-second-title">清除缓存不会丢失您的数据</text>
				<view class="view-button-group">
					<button @click="showClearCache=false">暂不清除</button>
					<button @click="clearStorage" class="active">确认清除</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				closeables: true,
				//下载进度
				show1: false,
				show2: false,
				progress: 0, //进度
				update: false,
				showClearCache: false,
				storageSize: '',
				shiming: '未实名',
				zizhi: '未认证',
				sta: '',
				// msgNotTip: false
				//当前手机信号
				netWork: '',
				version: '', //版本号
				lit: [], //存放数据
				listyy: [],
				versionse: '', //版本
				versionCodedes: '', //本地版本
				userInfos: '', //用户状态
			};
		},
		onShow() {

		},
		onLoad() {

			let then = this
			then.userInfos = uni.getStorageSync('userInfo')
			console.log(then.userInfos, 'token')
			// then.show1 = true
			// then.getVersion()
			// this.getRenZheng();
			// this.msgNotTip = uni.getStorageSync("msgNotTip")||false
			//自动更新
			uni.getSystemInfo({ //获取当前版本号以及名称
				success(res) {
					then.version = res.appVersionCode
					if (res.platform == 'android') {
						then.gpostappends()
						console.log(then.version, 'aaaaaa', res)
					}
				}
			});
			setTimeout(() => {
				plus.runtime.getProperty(plus.runtime.appid, (info) => {
					// info.versionCode
					console.log(info, '666')
					then.versionCodedes = info.versionCode
					if (then.lit.versionCode > info.versionCode) {
						then.versionse = info.version
						this.update = true
					}
				})
			}, 500)
			uni.getNetworkType({ //获取手机的网络信号
				success(res) {
					then.netWork = res.networkType
				}
			});
		},
		methods: {
			//关系取消按钮
			closes() {
				this.show1 = false
			},
			//自动更新
			async gpostappends() {
				let that = this
				let res = await this.http.post('/app/update/version', {
					apptype: 1,
					type: 0,
				})
				if (res.code === 200) {
					that.lit = res.data
					console.log(that.lit, 'dddddddddddddddddddd')
					that.listyy = res.data.versionContent.split(';')
				}

			},
			// 检查更新
			checkUpdate() {
				let then = this
				console.log('11111111111111111111')
				plus.runtime.getProperty(plus.runtime.appid, (info) => {
					// console.log( '接口',, '本地')
					if (then.lit.versionCode > info.versionCode) {
						this.show1 = true
						console.log('/////')
					}
				})
			},
			// // 检查更新
			// async checkUpdates() {

			// 	let res = await this.http.get('/app/userHome/checkUpdate', {
			// 		name: 'userApp',
			// 		version: this.version
			// 	});
			// 	console.log('检查更新', res);
			// 	this.update = res.data.update
			// 	console.log('是否更新', this.update);
			// },
			//点击立即更新
			gxtye() {
				let that = this
				if (that.versionCodedes < that.lit.versionCode) {
					that.show1 = true
					let downloadUrl = that.lit.url //存放apk文件
					let isForced = that.lit.isForced //是否强制更新 0 否  1 是
					if (isForced === 0) {
						that.autoupdate(downloadUrl)
						that.show1 = false
					} else {
						that.autoupdate(downloadUrl)
						that.show1 = false
						this.closeables = false
					}
				}
			},


			//更新
			autoupdate(url) {
				let thats = this
				let dtask = plus.downloader.createDownload(url, {}, function(d, status) {
					// 下载完成 
					if (status == 200) {
						plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(
							error) {
							uni.showToast({
								title: '安装失败',
								mask: false,
								duration: 1500
							});
						})
					} else {
						uni.showToast({
							title: '更新失败',
							mask: false,
							duration: 1500
						});
					}
				});
				dtask.start();
				dtask.addEventListener('statechanged', function(task, status) {
					console.log(task.state, 1111)
					console.log(this, 'this')
					if (task.state == 3) {
						thats.show1 = false
						thats.show2 = true
						thats.progress = parseInt(task.downloadedSize / task.totalSize * 100)

					}
					if (task.state == 4) {
						thats.show = false
					}
				})
			},

			//支付设置
			zhifu() {
				if (this.userInfos != 0) {
					uni.navigateTo({
						url: '../payment-set/payment-set'
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			//收获地址
			shoev() {
				if (this.userInfos != 0) {
					uni.navigateTo({
						url: '../market-address/market-address'
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			//隐私空间设置
			yisfcde() {
				if (this.userInfos != 0) {
					uni.navigateTo({
						url: '../private-space-set/private-space-set'
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			// 消息免打扰的状态改变
			// messageStatuChange() {
			// 	console.log("改变的状态是", this.msgNotTip)
			// 	if(this.msgNotTip) uni.setStorageSync("msgNotTip", true)
			// 	else uni.setStorageSync("msgNotTip", false)
			// },
			// async getRenZheng() {
			// 	let that = this;
			// 	let res = await that.http.post('/app/userInfo/selectUserPerfectInformation', {});
			// 	console.log(res);
			// 	if (res.code == 200 && res.data != null) {
			// 		console.log(res);
			// 		this.getAuditStatus(res.data.auditStatus);
			// 		this.sta = res.data.auditStatus;
			// 	}
			// },


			// // 获取当前版本号
			// getVersion() {
			// 	// #ifdef APP-PLUS
			// 	plus.runtime.getProperty(plus.runtime.appid, (res) => {
			// 		console.log(res, '222233333333333333')
			// 		this.version = res.version;
			// 		this.name = res.name;
			// 		this.checkUpdates()
			// 	});
			// 	// #endif
			// 	uni.getSystemInfo({ //获取当前版本号以及名称
			// 		success(res) {
			// 			console.log(res, '66666666666666666')
			// 			this.version = res.appVersionCode
			// 		}
			// 	});
			// },

			// 账号注销
			clickAccountCancellation() {
				let that = this;
				uni.showModal({
					title: '账号注销',
					content: '确定注销账号吗？',
					success(res) {
						if (res.confirm) {
							that.accountCancellation();
						}
					}
				})
			},

			async accountCancellation() {
				let res = await this.http.post('/app/userInfo/userLogOutInfo');
				console.log('账号注销', res);
				if (res.code == 200) {
					uni.clearStorageSync('token');
					this.$toast('注销成功')
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},

			async logout() {
				await this.$alert('确认退出登录？')
				uni.closeSocket({
					complete: (res) => {
						console.log(res)
					}
				})
				uni.reLaunch({
					url: '../login/login'
				})
				let res = await this.IM.logout()
				uni.$emit('signOut', "退出登录")
				uni.removeStorageSync("IMuserInfo")
				uni.removeStorageSync('token');
				uni.removeStorageSync("userInfo")
				uni.removeStorageSync("imUserName")
				uni.removeStorageSync('backgroundImg')
				uni.removeStorageSync('form')
			},
			getStorageSize() {
				let that = this;
				uni.getStorageInfo({
					success(res) {
						let size = res.currentSize;
						if (size < 1024) {
							that.storageSize = size + ' B';
						} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
							that.storageSize = Math.floor(size / 1024 * 100) / 100 + ' KB';
						} else if (size / 1024 / 1024 >= 1) {
							that.storageSize = Math.floor(size / 1024 / 1024 * 100) / 100 + ' M';
						}
					}
				})
			},
			clearStorage() {
				this.showClearCache = false;
				let that = this;
				let userInfo = JSON.parse(JSON.stringify(uni.getStorageSync('userInfo')));
				let token = JSON.parse(JSON.stringify(uni.getStorageSync('token')))
				uni.showModal({
					title: '提示',
					content: '确定清除缓存吗？',
					confirmText: '立即清除',
					success(res) {
						if (res.confirm) {
							uni.clearStorageSync();
							that.getStorageSize();
							uni.showToast({
								title: '清除成功'
							})
							uni.setStorageSync('userInfo', userInfo);
							uni.setStorageSync("token", token)
						}
					}
				})
			},
			// getAuditStatus(status) {
			// 	var that = this;
			// 	if (status == 0) {
			// 		that.shiming = '未实名';
			// 		that.zizhi = '未实名';
			// 	}
			// 	if (status == 1) {
			// 		that.shiming = '审核中';
			// 		that.zizhi = '未实名';
			// 	}
			// 	if (status == 2) {
			// 		that.shiming = '审核失败';
			// 		that.zizhi = '未实名';
			// 	}
			// 	if (status == 3) {
			// 		that.shiming = '审核成功';
			// 		that.zizhi = '未实名';
			// 	}
			// 	if (status == 4) {
			// 		that.shiming = '审核成功';
			// 		that.zizhi = '审核中';
			// 	}
			// 	if (status == 5) {
			// 		that.shiming = '审核成功';
			// 		that.zizhi = '审核失败';
			// 	}
			// 	if (status == 6) {
			// 		that.shiming = '审核成功';
			// 		that.zizhi = '审核成功';
			// 	}
			// },
			// ziZhiRenZheng() {
			// 	if (this.sta == 0) {
			// 		this.$toast('未实名认证')
			// 		return false;
			// 	}
			// 	if (this.sta == 1) {
			// 		this.$toast('实名认证审核中，无法进行资质认证')
			// 		return false;
			// 	}
			// 	if (this.sta == 2) {
			// 		this.$toast('实名认证失败，无法进行资质认证')
			// 		return false;
			// 	}
			// 	uni.navigateTo({
			// 		url: '../number-qualifications/number-qualifications'
			// 	})
			// }
			// async clearCahce(){
			// 	this.$toast("清理成功");
			// 	this.showClearCache=false;
			// },
		},
	}
</script>

<style lang="scss" scoped>
	.my-centers {
		position: relative;
		width: 289px;
		height: 320px;
		border-radius: 20px !important;
		background-size: 450px 600px;
		background-position: 51% 50%;
		background-repeat: no-repeat;
		flex-shrink: 0;
		filter: alpha(Opacity=80);
		-moz-opacity: 0.5;
		opacity: 1;
		background-image: url(../../static/images/banben2.png);

		.tents {

			text-align: center;
			// position: absolute;
			margin-top: 150px;
		}

		.btn {

			width: 160px;
			height: 35px;

			border-radius: 20px;
			background-color: #2578f9;
			border: 1px solid #2578f9;
			color: #fff;
			top: 20px;
			// bottom: 2px;
			// left: 68px;
		}
	}

	::v-deep .u-popup__content {
		border-radius: 20px !important;
		background-color: transparent;
	}

	::v-deep .u-icon--right {
		margin-top: 25px;
	}

	.progress {
		width: 289px;
		height: 320rpx;
		background-color: #fff;
		border-radius: 10px;

		.app {
			width: 40%;
			margin: 20rpx auto;
		}

		.update {
			width: 70%;
			margin: 10rpx auto;
		}

		.lineProgress {
			width: 90%;
			margin: 20px auto 0px;
		}
	}

	page {

		background-color: #e8e8e8;

	}

	.view-goOut {
		height: 88rpx;
		background: #F6F6F6;
		border-radius: 44rpx;
		line-height: 88rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: 50% !important;
		font-size: 32rpx;
		font-weight: 400;
		color: #999999;
	}

	.view-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx;

		.text-label {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
		}

		.text-value {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			margin-right: 20rpx;
		}

		.hongdian {
			display: inline-block;
			width: 18rpx;
			height: 18rpx;
			background: red;
			border-radius: 50%;
		}

		.image-arrow {
			width: 12rpx;
			height: 20rpx;
		}
	}

	.view-popup-clear-cache {
		width: 750rpx;
		height: 528rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		display: flex;
		flex-direction: column;
		padding: 60rpx;


		.text-title {
			font-size: 36rpx;
			font-weight: 500;
			color: #333333;
			margin-bottom: 15rpx;
		}

		.text-second-title {
			font-size: 28rpx;
			font-weight: 400;
			color: #999999;
			margin-bottom: 90rpx;
		}

		.view-button-group {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			button {
				width: 267rpx;
				height: 70rpx;
				line-height: 70rpx;
				background: #FFFFFF;
				border: 1rpx solid #999999;
				border-radius: 35rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;

				&.active {
					border-color: #1D37BD;
					color: #1D37BD;
				}
			}
		}
	}
</style>