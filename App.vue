<script>
	let WebIM = (wx.WebIM = require("./utils/WebIM")["default"]);
	let timer = null
	let errTimer = null
	let showTimer = null
	export default {
		data() {
			return {
				info: {},
				version: '', // 当前应用版本号
				netWork: '', //手机端的网络信号
			};
		},
		onLaunch() {
			uni.setTabBarItem({
				index: 1,
				visible: false
			})
			uni.setTabBarItem({
				index: 2,
				visible: false
			})
			uni.setTabBarItem({
				index: 3,
				visible: false
			})
			console.log('App Launch')
			if (uni.getStorageSync("imUserName")) {
				this.IM.login(uni.getStorageSync("imUserName"))
			}
			uni.$on("signOut", (msg) => {
				uni.removeStorageSync("imUserName")
				if (timer) {
					console.log("清空定时器")
					clearTimeout(timer)
				}
			})
			WebIM.conn.listen({
				onOpened: () => {
					console.log("webIM打开")
					this.recon()
				},
				onOnline: () => {
					console.log("webIM已上线")
					this.recon()
				}, //本机网络连接成功
				onOffline: () => {
					console.log("webIM已掉线")
					if (errTimer) return
					errTimer = setTimeout(() => {
						this.loginIM()
					}, 1000 * 20)
				},
				onError: (err) => {
					// console.log('IM出错',err)
					console.log("im出现错误", err)
					// if(err.type == 28) {
					// 	if(errTimer) return
					// 	errTimer = setTimeout(()=>{
					// 		this.loginIM()
					// 	},1000 * 20)
					// }
				},
				onTextMessage: (message) => {
					console.log("IM文字消息", message);
					uni.$emit('havNewMsg', message)
					if (uni.getStorageSync("nowChatUser")) {
						if (message.from === uni.getStorageSync("nowChatUser")) {
							uni.$emit("newMsg", message)
						} else {
							uni.$emit("refreshSessionList", true)
						}
					} else {
						uni.$emit("refreshSessionList", true)
					}
				},
				onEmojiMessage: (message) => {
					uni.$emit('havNewMsg', message)
					console.log("IMemoji消息", message);
					console.log('Emoji');
					let data = message.data;
					this.$toast(data)
					for (let item of message.data) {
						console.log(item)
					}
				}, //收到表情消息
				onPictureMessage: (message) => {
					uni.$emit('havNewMsg', message)
					console.log("IM图片消息", message);
					if (uni.getStorageSync("nowChatUser")) {
						if (message.from === uni.getStorageSync("nowChatUser")) {
							uni.$emit("newMsg", message)
						} else {
							uni.$emit("refreshSessionList", true)
						}
					} else {
						uni.$emit("refreshSessionList", true)
					}
				}, //收到图片消息
				onAudioMessage: (message) => {
					uni.$emit('havNewMsg', message)
					console.log("IM音频消息", message);
					if (uni.getStorageSync("nowChatUser")) {
						if (message.from === uni.getStorageSync("nowChatUser")) {
							uni.$emit("newMsg", message)
						} else {
							uni.$emit("refreshSessionList", true)
						}
					} else {
						uni.$emit("refreshSessionList", true)
					}
				},
				onCustomMessage: (message) => {
					uni.$emit('havNewMsg', message)
					console.log("IM自定义消息", message);
					if (uni.getStorageSync("nowChatUser")) {
						if (message.from === uni.getStorageSync("nowChatUser")) {
							uni.$emit("newMsg", message)
						} else {
							uni.$emit("refreshSessionList", true)
						}
					} else {
						uni.$emit("refreshSessionList", true)
					}
				},
				onClosed: () => {
					console.log("IM已关闭")
				},
			});

			console.log('App Launch结束')
		},
		methods: {
			autoupdate(url) {
				console.log('111111')

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
			},
			//自动更新

			async gpostappends() {
				let that = this
				let res = await this.http.post('/app/update/version', {
					apptype: 1,
					type: 0,
				})
				if (res.code === 200) {
					console.log('aaa')
					if (res.data.versionCode > this.version && this.netWork == 'wifi') {
						console.log('bbbb')
						let downloadUrl = res.data.url //存放apk文件
						let isForced = res.data.isForced //是否强制更新 0 否  1 是
						let a = res.data.versionContent.split(';')
						console.log(res, '333333333333333')
						if (res.data.isForced === 0) {
							// 弹窗遮罩层
							let maskLayer = new plus.nativeObj.View("maskLayer", { //先创建遮罩层
								top: '0px',
								left: '0px',
								height: '100%',
								width: '100%',
								backgroundColor: 'rgba(0,0,0,0.5)'
							});
							// uni.showModal({
							// 	title: '发现新版本，是否更新',
							// 	content: a[0] + '' + a[1],
							// 	success(res) {
							// 		if (res.confirm) {

							// 			console.log(res.confirm, '用户点击了取消')
							// 			that.autoupdate(downloadUrl);
							// 		} else if (res.cancel) {
							// 			console.log(res.cancel, '用户点击了取消22222')
							// 		}
							// 	},
							// })
						} else {
							uni.showModal({
								title: "版本更新",
								content: a[0] + '' + a[1],
								showCancel: false,
								success(ress) {
									if (ress.confirm) {
										console.log('用户点击了确定111')
										// that.autoupdate(res.data.url);
									}
								}
							})
						}


					}

				}

			},
			//确定下载

			//暂时注销，以后再打开
			// async checkUpdate() {
			// 	let update = uni.getSystemInfoSync().platform
			// 	if (uni.getSystemInfoSync().platform == 'android') {
			// 		console.log(update)
			// 		console.log('安卓 安卓 安卓 安卓')
			// 		let res = await this.http.get('/app/userHome/checkUpdate', {
			// 			name: 'userApp',
			// 			version: this.version
			// 		});
			// 		console.log('检查更新', res);
			// 		if (res.code == 200 && res.data.update) {
			// 			uni.showModal({ //提醒用户更新
			// 				title: "更新提示",
			// 				content: '发现新版本，是否更新',
			// 				success: (res) => {
			// 					if (res.confirm) {
			// 						plus.runtime.openURL("https://www.pgyer.com/WR3W")
			// 					} else {
			// 						console.log('取消 取消 取消 取消 取消 取消 取消')
			// 					}
			// 				}
			// 			})
			// 		}
			// 	} else if (uni.getSystemInfoSync().platform == 'ios'){
			// 		let res = await this.http.get('/app/userHome/checkUpdate', {
			// 			name: 'iosApp',
			// 			version: this.version
			// 		});
			// 		console.log('检查更新', res);


			// 		if (res.code == 200 && res.data.update) {
			// 			uni.showModal({ //提醒用户更新
			// 				title: "更新提示",
			// 				content: '发现新版本，是否更新',
			// 				success: (res) => {
			// 					if (res.confirm) {
			// 						console.log('苹果 ios 苹果 ios')
			// 						//在App Store Connect中的App Store下的app信息，可找到appleId
			// 						let appleId = 1617937435
			// 						plus.runtime.launchApplication({
			// 							action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
			// 						}, function(e) {
			// 							console.log('Open system default browser failed: ' + e
			// 								.message);
			// 						});
			// 					} else {
			// 						console.log('取消 取消 取消 取消 取消 取消 取消')
			// 					}
			// 				}
			// 			})
			// 		}
			// 	}
			// },

			// async checkUpdate() {
			// 	// #ifdef APP-PLUS
			// 	let res = await this.http.get('/app/userHome/checkUpdate', {
			// 		name: 'userApp',
			// 		version: this.version
			// 	});
			// 	console.log('检查更新', res);
			// 	// console.log(res);
			// 	if (res.code == 200 && res.data.update) {
			// 		uni.showModal({ //提醒用户更新
			// 			title: "更新提示",
			// 			content: '发现新版本，是否更新',
			// 			success: (res) => {
			// 				if (res.confirm) {


			// 					//如果是安卓直接更新下载
			// 					if (uni.getSystemInfoSync().platform == 'android') {
			// 						console.log('安卓 安卓 安卓 安卓')
			// 						// uni.navigateTo({
			// 						// 	url: '../web-view/web-view?url=https://www.pgyer.com/WR3W'
			// 						// })
			// 						plus.runtime.openURL("https://www.pgyer.com/WR3W")
			// 						//如果是ios跳转到app store
			// 					} else {
			// 						console.log('苹果 ios 苹果 ios')
			// 						//在App Store Connect中的App Store下的app信息，可找到appleId
			// 						let appleId = 1617937435
			// 						plus.runtime.launchApplication({
			// 							action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
			// 						}, function(e) {
			// 							console.log('Open system default browser failed: ' + e
			// 								.message);
			// 						});
			// 					}



			// 					// uni.navigateTo({
			// 					// 	url: '../web-view/web-view?url=https://www.pgyer.com/WR3W'
			// 					// })
			// 					// plus.runtime.openURL(res.data.pkgUrl);
			// 				} else {
			// 					console.log('取消 取消 取消 取消 取消 取消 取消')
			// 				}
			// 			}
			// 		})
			// 	}
			// 	// #endif
			// },

			recon() { //保证im一直在线
				if (timer) clearTimeout(timer)
				console.log("保持在线")
				timer = setTimeout(async () => {
					if (uni.getStorageSync('imUserName')) {
						let res = await this.IM.fetchUserInfoById(uni.getStorageSync(
							'imUserName'))
						console.log("获取到的用户信息", res)
						this.recon()
					}
				}, 1000 * 60)
			},

			async loginIM() {
				if (uni.getStorageSync('imUserName')) {
					let res = await this.IM.login(uni.getStorageSync('imUserName'))
					console.log("环信的登录结果", res)
					showTimer = false
				}
			},
		},
		async onShow() {
			let that = this
			//自动更新
			uni.getSystemInfo({ //获取当前版本号以及名称
				success(res) {
					that.version = res.appVersionCode
					// if (res.platform == 'android') {
					// that.gpostappends()
					// }
				}
			});
			uni.getNetworkType({ //获取手机的网络信号
				success(res) {
					that.netWork = res.networkType
				}
			});


			console.log('App Show')
			if (showTimer) return
			showTimer = true
			that.loginIM()

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */

	.u-navbar {

		.u-navbar__content {
			width: 100% !important;
		}

		.u-navbar__content__title {
			color: #fff !important;
		}

		.uicon-arrow-left {
			color: #fff !important;
		}

		.u-navbar__content__right__text {
			color: #fff !important;
		}
	}


	.u-load-more-wrap {
		margin-bottom: 30rpx !important;
	}

	page {
		background-color: #FFFFFF;
	}

	:not(not) {
		flex-shrink: 0;
		box-sizing: border-box;
		word-break: break-all;
	}

	.flex-grow {
		flex-grow: 1;
		flex-shrink: 1;
	}

	// ::v-deep .uni-modal {
	// 	background-color: blue;
	// 	z-index: 999999999999;
	// }
</style>