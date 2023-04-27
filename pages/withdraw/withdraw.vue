<template>
	<view class="page">
		<text class="text-title">提现金额</text>
		<view class="view-input">
			<text class="text-unit">¥</text>
			<u--input border="none" type="digit" placeholder="请输入金额" v-model="balance"></u--input>
		</view>

		<view class="view-content">
			<view class="view-tips">
				<text class="text-tips">可提现收益¥{{userInfo.nowMoney}}</text>
				<text class="text-all" @click="mores">全部提现</text>
			</view>

			<view style="">
				手续费:￥{{poundage}}
			</view>

			<view style="">
				<rich-text :nodes="agreement"></rich-text>
			</view>
		</view>


		<text class="text-title">提现到</text>

		<view class="view-type">
			<view class="view-item" @click="change('alipay')">
				<image src="../../static/images/alipay.png" class="image-logo"></image>
				<text class="text-name flex-grow">支付宝</text>
				<image :src="payType=='alipay'?'../../static/images/check.png':'../../static/images/nocheck.png'"
					class="image-check"></image>
			</view>
			<view class="view-item" @click="change('wx')">
				<image src="../../static/images/wechat.png" class="image-logo"></image>
				<text class="text-name flex-grow">微信</text>
				<image :src="payType=='wx'?'../../static/images/check.png':'../../static/images/nocheck.png'"
					class="image-check"></image>
			</view>
		</view>

		<button class="u-reset-button button-ok" @click="withdraw">确认提现</button>

		<!-- <input-pwd ref="pwdRef" title="请输入支付密码" @confirm="confirm"></input-pwd> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreement: '', // 协议
				poundage: 0, // 手续费
				userInfo: {},
				balance: '',
				payType: 'wx',
			};
		},
		onShow() {
			this.getInfo()
			this.getSpec()
			this.getPoundage() // 查询手续费
		},
		methods: {
			// 提现手续费协议
			async getSpec() {
				let res = await this.http.post('/app/userHome/platformAgreement', {
					protocolType: 'withdrawalFeeAgreement'
				});
				console.log('提现手续费协议', res);
				if (res.code == 200) {
					this.agreement = res.data.protocolContent;
				} else {
					this.$toast(res.msg);
				}
			},
			// 查询支付密码
			// async confirm(e) {
			// 	let result = await this.http.post('/app/userInfo/verifyPaymentPassword', {
			// 		password: e
			// 	});
			// 	if (result.code == 200) {
			// 		if (result.data) {
			// 			this.submit()
			// 		} else {
			// 			this.$refs.pwdRef.tips = '密码错误';
			// 		}
			// 	}
			// },
			// 判断是微信还是支付宝
			change(e) {
				this.payType = e
				console.log(this.payType)
			},

			// 全部提现
			mores() {
				console.log(this.userInfo.nowMoney);
				this.balance = this.userInfo.nowMoney
			},
			// 确认提现按钮
			async withdraw() {
				// this.$refs.pwdRef.show = true;
				
				let res = await this.http.postJson('/app/userExtract/withdraw', {
					// uid: uni.getStorageSync('userInfo').id,
					uid: 559,
					extractPrice: this.balance * 100,
					// alipay = 支付宝 wx=微信
					extractType: this.payType,
					// 用户分类 1-用户 2-机构/学校 3-商家 4-销售 5-咨询师
					userType: 1,
					withdrawalType: 1,
				});
				if (res.code == 200) {
					await this.$toast('提现成功');
					uni.navigateBack()
				} else {
					this.$toast(res.msg);
				}
				
				// this.submit();
			},
			
			// 查询余额
			async getInfo() {
				let res = await this.http.get('/app/userInfo/getInfo', {});
				// console.log(res);
				if (res.code == 200) {
					this.userInfo = res.data;
				} else {
					this.$toast(res.msg);
				}
			},

			// 查询手续费
			async getPoundage() {
				let res = await this.http.post('/app/userHome/platformAgreement', {
					protocolType: 'withdrawalFee'
				});
				console.log('查询手续费', res);
				if (res.code == 200) {
					this.poundage = res.data.protocolContent;
				} else {
					this.$toast(res.msg);
				}
			},

			// 确认提现按钮后的确认按钮
			async submit() {
				let that = this;
				// balance 输入的金额
				//  payType 判断是微信还是支付宝
				if (Number(that.balance) < 0.01) {
					that.$toast('请输入正确大于3的金额');
					return;
				}
				console.log(that.balance);
				console.log(that.payType);
				if (that.payType == 'wx') {
					let res = await that.http.post('/app/wxPay/transfer', {
						amount: that.balance,
						type: 1
					});
					console.log(res);
					if (res.code == 200) {
							this.$toast('提现成功');
						// 	setTimeout(function() {
						// 		uni.navigateBack({

						// 		})
						// 	}, 1000)
					} else {
						that.$toast(res.msg);
					}
				}
				// let res = await this.http.postJson('/w/transfer', {
				// 	extractPrice: this.balance,
				// 	extractType: this.payType,
				// 	userType: 1,
				// 	withdrawalType: 1,
				// });
				// if (res.code == 200) {
				// 	this.$toast('提现成功');
				// 	setTimeout(function() {
				// 		uni.navigateBack({

				// 		})
				// 	}, 1000)
				// } else {
				// 	this.$toast(res.msg);
				// }
			},
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 30rpx;
	}

	.view-content {
		margin-bottom: 70rpx;
		color: #666666;
		font-size: 28rpx;

		.view-tips {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 30rpx;
			font-size: 28rpx;
			font-weight: 400;
			margin-bottom: 16rpx;

			.text-tips {
				color: #666666;
			}

			.text-all {
				color: #4A9AFF;
				text-decoration: underline;
			}
		}
	}

	.text-title {
		font-size: 32rpx;
		font-weight: 500;
		color: #111734;
		margin-bottom: 22rpx;
		display: block;
	}

	.view-input {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx 20rpx;
		width: 690rpx;
		height: 88rpx;
		background: #F2F4F7;
		border-radius: 10rpx;

		.text-unit {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			margin-right: 15rpx;
		}
	}

	.view-type {
		display: flex;
		flex-direction: column;

		.view-item {
			margin-top: 34rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.image-logo {
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;
			}

			.text-name {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}

			.image-check {
				width: 29rpx;
				height: 29rpx;
			}
		}
	}

	.button-ok {
		width: 633rpx;
		height: 90rpx;
		background: #4A9AFF;
		border-radius: 45rpx;
		margin: auto;
		margin-top: 500rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 90rpx;
	}
</style>
