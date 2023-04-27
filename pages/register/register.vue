<template>
	<view class="view-container">
		<view class="view-title">手机号注册
		</view>
		<view class="view-form">
			<view class="view-form-item">
				<view class="view-name">
					手 机 号
				</view>
				<view class="view-line"></view>
				<input type="text" v-model="phone" placeholder="输入您的手机号" />
			</view>
			<view class="view-form-item">
				<view class="view-name">
					验 证 码
				</view>
				<view class="view-line"></view>
				<input type="text" v-model="code" placeholder="请输入验证码" />
				<ice-button-code @click="getCode()" ref="buttonCode"></ice-button-code>
			</view>
			<view class="view-form-item">
				<view class="view-name">
					密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码
				</view>
				<view class="view-line"></view>
				<input :password="!showPassword" v-model="newPassword" placeholder="6-18位字母数字组合" @blur="onchange()"/>
				<u-icon @click="showPassword=!showPassword" :name="showPassword?'eye-fill':'eye-off'"></u-icon>
			</view>
			<view class="view-form-item">
				<view class="view-name">
					确认密码
				</view>
				<view class="view-line"></view>
				<input :password="!showPassword1" v-model="confirmPassword" placeholder="6-18位字母数字组合" />
				<u-icon @click="showPassword1=!showPassword1" :name="showPassword1?'eye-fill':'eye-off'"></u-icon>
			</view>
		</view>
		<button @click="register"  class="u-reset-button">注册</button>
		<view class="view-have-account" @click="uni.navigateTo({
			url:'../login/login'
		})">有账号，去登录 >
		</view>
		<view class="view-check">
			<image src="@/static/images/check.png" mode=""></image>
			勾选即代表同意<text @click="uni.navigateTo({
				url:'../useragreement/useragreement'
			})">《用户注册协议》</text><text @click="uni.navigateTo({
				url:'../agreement/agreement'
			})">《隐私协议》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				code: "",
				newPassword: "",
				confirmPassword: "",
				showPassword:false,
				showPassword1:false,
			};
		},
		methods:{
			onchange(){
				let a = /^(?=.*[a-zA-Z])(?=.*\d).{1,18}$/
				if(a.test(this.newPassword) == false){
					this.$toast("密码至少包含一个字母和数字");
					return;
				}
			},
			async register(){
				if(!this.phone){
					this.$toast("请输入手机号");
					return;
				}
				if(this.phone.length!=11){
					this.$toast("手机号格式不正确");
					return;
				}
				if(!this.code){
					this.$toast("请输入验证码");
					return;
				}
				if(this.newPassword.length<6){
					this.$toast("密码至少6位");
					return;
				}
				var a = /^(?=.*[a-zA-Z])(?=.*\d).{1,18}$/
				if(a.test(this.newPassword) == false){
					this.$toast("密码至少包含一个字母和数字");
					return;
				}
				if(this.newPassword!=this.confirmPassword){
					this.$toast("两次密码输入不一致");
					return;
				}
				let res=await this.http.post('/app/user/phoneRegister',{
					phone:this.phone,
					code:this.code,
					password:this.newPassword
				});
				if(res.code==200){
					await this.$toast("注册成功");
					await this.registerIM()
				}else{
				this.$toast(res.msg);
				}
			},
			async getCode(){
				if(!this.phone){
					this.$toast("请输入手机号");
					return;
				}
				if(this.phone.length!=11){
					this.$toast("手机号格式不正确");
					return;
				}
				let res=await this.http.post('/app/user/getCode',{
					phone:this.phone,
				});
				if(res.code==200){
					this.$toast("验证码发送成功");
					this.$refs.buttonCode.start();
				}else{
					this.$toast(res.msg);
				}
			},
			//注册用户
			async registerIM() {
				uni.navigateTo({
					url: '../login/login'
				})
				let resIM = await this.IM.register(this.phone)
				console.log(resIM)
				if (resIM.code === 200) {
					await this.checkAuditStatus();
				}else{
					this.$toast(resIM.msg)
				}
			},
			
			// 判断审核状态
			async checkAuditStatus() {
				const token = uni.getStorageSync('token');
				if (token) {
					let res = await this.http.get('/app/userInfo/approvalStatus');
					console.log('审核状态:', res);
					if (res.code == 200) {
						switch (res.data.status) {
							case 0:
								console.log('审核中');
								uni.navigateTo({
									url: '../check-status/check-status?status=checking'
								})
								break;
							case 1:
								console.log('审核通过');
								uni.switchTab({
									url: '../index/index'
								})
								break;
							case 2:
								console.log('审核拒绝');
								uni.navigateTo({
									url: '../check-status/check-status?status=failed'
								})
								break;
							case 3:
								console.log('没有提交审核资料');
								uni.navigateTo({
									url: '../complete-information/complete-information'
								})
								break;
						}
					} else {
						this.$toast(res.msg);
					}
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 186rpx 57rpx 0;
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
				
				/deep/.button-code{
					font-size: 28rpx;
					font-weight: 500;
					color: #4B9AFF;
					text-decoration: underline;
				}

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

				image {
					width: 33rpx;
					height: 27rpx;
				}
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
			margin: 94rpx 0 36rpx;
		}

		.view-have-account {
			font-size: 28rpx;
			color: #333333;
		}

		.view-check {
			width: 100%;
			font-size: 24rpx;
			color: #999999;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 240rpx;

			image {
				width: 31rpx;
				height: 31rpx;
				margin-right: 14rpx;
			}

			text {
				text-decoration: none;
				color: #4B9AFF;
			}
		}
	}
</style>


