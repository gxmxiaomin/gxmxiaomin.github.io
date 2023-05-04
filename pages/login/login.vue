<template>
	<view class="view-container">
		<view class="view-title" v-html="codeLogin?'验证码登录':'账号密码登录'">
		</view>
		<view class="view-form">
			<view class="view-form-item">
				<view class="view-name" v-html="codeLogin?'手&nbsp;机&nbsp;号':'账&nbsp;&nbsp;&nbsp&nbsp;&nbsp;号'"></view>
				<view class="view-line"></view>
				<input type="number" v-model="phone" placeholder="输入您的手机号" />
			</view>
			<view class="view-form-item" v-if="codeLogin===true">
				<view class="view-name">
					验 证 码
				</view>
				<view class="view-line"></view>
				<input type="text" v-model="code" placeholder="请输入验证码" />
				<ice-button-code @click="getCode" ref="buttonCode"></ice-button-code>
			</view>
			<view class="view-form-item" v-if="codeLogin===false && !web">
				<view class="view-name">
					密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码
				</view>
				<view class="view-line"></view>
				<input :password="!showPassword" v-model="newPassword" placeholder="6-12位字母数字组合" />
				<u-icon @click="showPassword=!showPassword" :name="showPassword?'eye-fill':'eye-off'"></u-icon>
			</view>
		</view>
		<view class="view-options" v-if="!web">
			<view class="view-forgot-password" @click="uni.navigateTo({
				url:'../reset-password/reset-password'
			})" v-html="codeLogin?'':'忘记密码?'">
			</view>
			<view class="view-change-login" @click="codeLogin=!codeLogin" v-html="codeLogin?'账号密码登录':'验证码登录'">
			</view>
		</view>
		<!-- :loading="loading" -->
		<button @click="login" class="u-reset-button">{{signText}}</button>
		<view v-if="!web" class="view-have-account" @click="uni.navigateTo({
			url:'../register/register'
		})">暂无账号，去注册 >
		</view>

		<view class="view-other-login" v-if="false">
			<view class="view-other-login-title">
				— 第三方登录 —
			</view>
			<view class="view-other-login-icons">
				<view class="view-other-login-icon-item" @click="kaifa(1)">
					<image src="@/static/images/wechat.png" mode=""></image>
					<text>微信登录</text>
				</view>
				<view class="view-other-login-icon-item" @click="kaifa(2)">
					<image src="@/static/images/qq.png" mode=""></image>
					<text>QQ登录</text>
				</view>
			</view>
		</view>
		<!-- <view class="view-check">
			<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
				<u-checkbox :customStyle="{marginBottom: '8rpx'}" v-for="(item, index) in checkboxList1" :key="index"
					:label="item.name" :name="item.name">
				</u-checkbox>
			</u-checkbox-group>
			勾选即代表同意<text @click="uni.navigateTo({
				url:'../useragreement/useragreement'
			})">《用户注册协议》</text><text @click="uni.navigateTo({
				url:'../agreement/agreement'
			})">《隐私协议》</text>
		</view> -->

		<!-- 客服电话 -->
		<!-- <view class="view-phone" @click="uni.makePhoneCall({
			phoneNumber:servicePhone
		})">
			客服电话:<text>{{servicePhone}}</text>
		</view> -->

		<view class="view-phone">
			<view class="view-check">
				<u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
					<u-checkbox :customStyle="{marginBottom: '8rpx'}" :checked = 'true' v-for="(item, index) in checkboxList1"
						:key="index" :label="item.name" :name="item.name">
					</u-checkbox>
				</u-checkbox-group>
				勾选即代表同意<text @click="uni.navigateTo({
							url:'../useragreement/useragreement'
						})">《用户注册协议》</text><text @click="uni.navigateTo({
							url:'../agreement/agreement'
						})">《隐私协议》</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeLogin: true, //验证码登录
				phone: "",
				code: "",
				newPassword: "",
				confirmPassword: "",
				showPassword: false,
				checkboxValue1: [],
				// 基本案列数据
				checkboxList1: [{}, ],
				checkBox: 0,
				servicePhone: '', // 客服电话
				configValue: '',
				// loading: false,
				signText: '登录',
				test: '',
				web:null,
				incode:null,
			};
		},
		onLoad(option) {
			let _this = this
			if(option.web){
				this.web = option.web
				this.incode = option.invitationCode
			}
			let user = uni.getStorageSync('userNumber') || {}
			_this.phone = user.phone || ''
			_this.newPassword = user.newPassword || ''
		},
		onShow() {
			// this.getServicePhone() // 获取客服电话
			// this.checkStatus()
		},
		methods: {
			// 获取客服电话
			async getServicePhone() {
				let res = await this.http.post('/app/userHome/platformAgreement?protocolType=platformPhone');
				console.log('获取客服电话', res);
				if (res.code == 200) {
					this.servicePhone = res.data.protocolContent;
				}
			},

			async checkStatus() {
				let res = await this.http.post('/app/userHome/systemConfigurationInformation?key=appleLoginIsShowWX');
				console.log(res);
				if (res.code == 200) {
					this.configValue = res.data.configValue;
				}
			},

			kaifa(code) {
				// this.$toast("功能正在开发中...")
				if (code == 1) {
					this.denglu('weixin')
				} else {
					this.denglu('qq')
				}
			},
			denglu(typeds) {
				var that = this
				uni.login({
					provider: typeds,
					success: res => {
						let openId = res.authResult.openid;
						uni.getUserInfo({
							provider: typeds,
							success: async infoRes => {
								console.log(infoRes)
								let paramData = {
									openid: infoRes.userInfo.openId,
									nickname: infoRes.userInfo.nickName,
									sex: infoRes.userInfo.gender,
									avatarUrl: infoRes.userInfo.avatarUrl,
									unionid: infoRes.userInfo.unionId,
									deviceId: ''
								}
								var paramDataJson = JSON.stringify(paramData)
								console.log('###########', paramDataJson)
								let res = await that.http.post('/app/user/weixinLogin', {
									loginRequest: paramDataJson
								});
								// console.log(res)
								if (res.code == 200) {
									uni.setStorageSync("token", res.data.token);
									this.queryUserInfo()
									// uni.switchTab({
									// 	url: '../index/index'
									// })
									// this.loginIM()
									// this.connectSocket()
								} else {}
							}
						});
					},
					fail: (errMsg) => {
						console.log('用户取消了授权');
						uni.hideLoading();
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			checkboxChange(n) {
				console.log(n);
				this.checkBox = n.length
			},
			// 登录
			async login() {
				uni.setStorageSync('userNumber', {
					phone: this.phone,
					newPassword: this.newPassword
				})

				// this.loading = true
				this.signText = '登录中...'
				if (this.codeLogin) {
					this.codeLoginApi();
					return;
				}
				if (!this.phone) {
					this.$toast("输入您的账号或者手机号");
					// this.loading = false
					this.signText = '登录'
					return;
				}
				// if (this.phone.length != 11) {
				// 	this.$toast("手机号格式不正确");
				// 	return;
				// }
				if (this.newPassword.length < 6) {
					this.$toast("密码最少6位");
					this.loading = false
					this.signText = '登录'
					return;
				}
				// if (this.checkBox = 1) {
				// 	this.$toast("请勾选隐私协议");
				// 	this.loading = false
				// 	this.signText = '登录'
				// 	return;
				// }
				let res = await this.http.postJson('/app/user/appLogin', {
					username: this.phone,
					password: this.newPassword,
					appType: 1
				});
				this.loading = false
				this.signText = '登录'
				console.log(res);
				if (res.code == 200) {
					uni.setStorageSync("token", res.data.token);
					
					// jia 增加 用来获取 微信是否绑定
					// uni.setStorageSync("isw", res.data.uid);
				
					await this.queryUserInfo()
				} else {
					this.$toast(res.msg);
				}
			},

			//邀请码
			async aaa(id) {
				let res = await this.http.get('/app/userInfo/getInvitationCode')
				// , {
				// 	userId: id
				// },
				// );
				// let res = this.http.get('/app/userInfo/userInvitationCode')
				this.test = res.data[0].invitationCode
				// this.test = 98268
				console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', this.test)
				uni.setStorageSync("invitationCode", this.test);
			},

			// 验证码登录
			async codeLoginApi() {
				if (!this.phone) {
					this.$toast("输入您的账号或者手机号");
					this.loading = false
					this.signText = '登录'
					return;
				}
				if (this.phone.length != 11) {
					this.$toast("手机号格式不正确");
					this.loading = false
					this.signText = '登录'
					return;
				}
				if (!this.code) {
					this.$toast("请输入验证码");
					this.loading = false
					this.signText = '登录'
					return;
				}
				if (this.checkBox != 1) {
					this.$toast("请勾选隐私协议");
					this.loading = false
					this.signText = '登录'
					return;
				}
				if(this.web){
					var res = await this.http.post('/app/user/h5CodeLogin',{
						phone: this.phone,
						code: this.code,
						invitationCode:this.incode,
					})
				}else{
					var res = await this.http.post('/app/user/fast', {
						phone: this.phone,
						code: this.code,
					});
				}
				console.log('验证码登录', res);
				alert(JSON.stringify(res),'验证码登录')
				if (res.code == 200) {
					uni.setStorageSync("token", res.data.token);
					await this.queryUserInfo()
					// this.$toast('登录成功');
					// await this.loginIM()
					// // await this.checkAuditStatus()
					// uni.switchTab({
					// 	url: '../index/index'
					// })
					// this.connectSocket()
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取验证码
			async getCode() {
				if (!this.phone) {
					this.$toast("请输入手机号");
					return;
				}
				if (this.phone.length != 11) {
					this.$toast("手机号格式不正确");
					return;
				}
				let res = await this.http.post('/app/user/getCode', {
					phone: this.phone,
				});
				if (res.code == 200) {
					this.$toast("验证码发送成功");
					this.$refs.buttonCode.start();
				} else {
					this.$toast(res.msg);
				}
			},

			//登录环信
			async loginIM(userInfo) {
				// let userInfo = uni.getStorageSync("userInfo")
				console.log('***********')
				await this.IM.logout()
				// console.log(a)
				let userName = String(userInfo.userName)
				uni.setStorageSync('imUserName', userName)
				let resLoginIM = await this.IM.login(userName)
				console.log('00000000000000000000')
				//如果环信IM账号未注册，就先注册再登录
				if (resLoginIM.code === 500) {
					console.log('11111111111111111111')
					let resRegIM = await this.IM.register(userName)
					if (resRegIM.code === 200) {
						console.log('2222222222222222222')
						let resReLoginIM = await this.IM.login(userName)
						if (resReLoginIM.code === 200) {
							console.log('3333333333333333333')
							uni.setStorageSync("imUserName", userName)
							this.$toast('登录成功');
							// 判断审核状态
							// await this.checkAuditStatus()
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					}
				} else {
					console.log('444444444444444444')
					uni.setStorageSync("imUserName", userName)
				}
				let data = {
					nickname: userInfo.nickName,
					avatarurl: userInfo.headUrl,
					sign: "用户"
				}
				console.log('5555555555')
				let setIMnickName = await this.IM.updateUserInfo(data)
				console.log('666666666666666')
			},

			//获取用户信息
			async queryUserInfo() {
				let res = await this.http.get('/app/userInfo/getInfo', {});
				console.log('!!!!!!!!!!', res)
				this.aaa(res.data.id)
				if (res.data.phoneNum == '' || res.data.phoneNum.length != 11) {
					uni.navigateTo({
						url: '/pages/phoneNum/phoneNum'
					})
				} else if (res.code == 200) {
					uni.setStorageSync("userInfo", res.data)
					this.$toast('登录成功');
					// 判断审核状态
					// await this.checkAuditStatus()
					// await this.IM.logout()
					this.loginIM(res.data)
					console.log('---------------')
					if(this.web){
						uni.navigateBack({})
					}else{
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
					
				} else {
					this.$toast(res.msg);
				}
			},

			//连接socket
			connectSocket() {
				uni.connectSocket({
					url: "ws://47.103.30.184:9227/app/imServer/" + uni.getStorageSync("userInfo")
						.id,
					success: (res) => {
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.view-phone {
		// position: fixed;
		// bottom: 60rpx;
		// font-size: 24rpx;
		// color: #999999;
		margin-top: 80% !important;
		font-size: 24rpx;
		color: #999999;
		// text {
		// 	margin-left: 10rpx;
		// 	color: #4B9AFF;
		// 	text-decoration: none;
		// }
	}

	/deep/.u-checkbox {
		margin-bottom: 0rpx !important;
	}

	/deep/.u-checkbox__icon-wrap {
		width: 30rpx !important;
		height: 30rpx !important;
	}

	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 178rpx 57rpx 0;
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
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

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

		.view-options {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.view-forgot-password,
			.view-change-login {
				font-size: 28rpx;
				color: #333333;
				text-align: right;
				margin-top: 30rpx;
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
			margin: 70rpx 0 36rpx;
		}

		.view-have-account {
			font-size: 28rpx;
			color: #333333;
		}

		.view-other-login {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 40rpx 0 141rpx;

			.view-other-login-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				margin-bottom: 46rpx;
			}

			.view-other-login-icons {
				width: 100%;
				display: flex;
				justify-content: center;

				.view-other-login-icon-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 87rpx;
						height: 87rpx;
						margin: 0 70rpx;
						margin-bottom: 19rpx;
					}

					text {
						font-size: 24rpx;
						color: #999999;
					}
				}
			}
		}

		.view-check {
			width: 100%;
			font-size: 24rpx;
			color: #999999;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;

			image {
				width: 31rpx;
				height: 31rpx;
				margin-right: 14rpx;
			}

			a {
				text-decoration: none;
				color: #4B9AFF;
			}
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