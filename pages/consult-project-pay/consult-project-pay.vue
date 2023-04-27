<template>
	<view>
		<view class="view-pay">
			<view class="view-amount">
				<text class="text-number">￥{{total}}</text>
				<text class="text-pay">需支付金额</text>
			</view>
			<view class="view-payType">
				<view class="view-trip">请选择支付方式</view>
				<view class="view-selects">
					<view class="view-item">
						<image class="image-type" src="../../static/images/zhifu-yue.png"></image>
						<view class="view-text">
							<text class="text-types">余额支付</text>
							<view class="text-amount">当钱余额<text>{{balance}}元</text></view>
						</view>
						<view class="view-tabber" @click="selects(1)">
							<image :src="zhong==1?'../../static/images/xuanzhong.png':'../../static/images/xuanze.png'">
							</image>
						</view>
					</view>
					<view class="view-item">
						<image class="image-type" src="../../static/images/weixin-2.png"></image>
						<view class="view-text">
							<text class="">微信支付</text>
						</view>
						<view class="view-tabber" @click="selects(2)">
							<image :src="zhong==2?'../../static/images/xuanzhong.png':'../../static/images/xuanze.png'">
							</image>
						</view>
					</view>
					<view class="view-item">
						<image class="image-type" src="../../static/images/zhifupingtai-zhifubao.png"></image>
						<view class="view-text">
							<text class="">支付宝支付</text>
						</view>
						<view class="view-tabber" @click="selects(3)">
							<image :src="zhong==3?'../../static/images/xuanzhong.png':'../../static/images/xuanze.png'">
							</image>
						</view>
					</view>
				</view>
			</view>
			<view class="view-button">
				<button class="button-type" @click="toPay">支付 ¥{{total}}</button>
				<!-- uni.navigateTo({
					url:'../success/success'
				}) -->
			</view>
		</view>

		<input-pwd ref="pwdRef" title="请输入支付密码" @confirm="confirm"></input-pwd>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				zhong: 1,
				show: false,
				projectId: '', //项目id
				total: '', //总价
				balance: '', //账户余额
				payType: 'balance', //支付方式
			}
		},
		onShow() {
			this.getPersonInfo()
		},
		onLoad(option) {
			this.projectId = option.projectId
			this.total = option.titalPrice
		},
		methods: {
			async confirm(e) {
				let result = await this.http.post('/app/userInfo/verifyPaymentPassword', {
					password: e
				});
				console.log(result);
				if (result.code == 200) {
					if (result.data) {
						this.postPay();
					} else {
						this.$refs.pwdRef.tips = '密码错误';
					}
				}
			},
			// 去支付
			toPay() {
				this.$refs.pwdRef.show = true;
			},
			async postPay() {
				let res = await this.http.postJson('/app/counselorUserApply/add', {
					projectId: this.projectId,
				});
				if (res.code == 200) {
					res = await this.http.postJson('/app/counselorUserApply/payOrder', {
						orderNo: res.data.orderNo,
						payType: this.payType,
						paySide: 'user',
					});
					if (res.code == 200) {
						if (this.payType == 'balance') {
							await this.$toast(res.msg)
							uni.navigateBack({

							})
							return;
						}
						uni.requestPayment({
							provider: this.payType,
							orderInfo: this.payType == 'wxpay' ? JSON.parse(res.data) : res
								.data, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
							_debug: 1,
							success: async (result) => {
								await this.$toast(res.msg)
								uni.navigateBack({

								})
							},
							fail: async (err) => {
								console.log(err)
								console.log('fail:' + JSON.stringify(err));
							}
						});
					} else {
						this.$toast(res.msg);
					}


				} else {
					this.$toast(res.msg);
					setTimeout(function() {
						uni.navigateTo({
							url: '../my-order/my-order?index=' + 0
						})
					}, 500)
				}
			},
			// 获取用户详细信息
			async getPersonInfo() {
				let res = await this.http.get('/app/userInfo/getInfo', {});
				if (res.code == 200) {
					this.balance = res.data.nowMoney
				} else {
					this.$toast(res.msg);
				}
			},
			selects(type) {
				this.zhong = type
				if (this.zhong == 1) {
					this.payType = 'balance'
				}
				if (this.zhong == 2) {
					this.payType = 'wxpay'
				}
				if (this.zhong == 3) {
					this.payType = 'alipay'
				}
			},
			open() {},
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	.view-pay {
		width: 100%;

		.view-button {
			margin-top: 300rpx;

			.button-type {
				width: 630rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 40rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.view-payType {
			margin-top: 130rpx;
			padding: 30rpx;

			.view-selects {
				margin-top: 60rpx;

				.view-item {
					width: 100%;
					height: 75rpx;
					display: flex;
					align-items: center;
					margin-top: 40rpx;

					.image-type {
						width: 75rpx;
						height: 75rpx;
					}

					.view-text {
						margin-left: 20rpx;

						.text-amount {
							font-size: 20rpx;
							font-weight: 400;
							color: #999999;

							text {
								color: #FF0000;
							}
						}

						.text-types {
							font-size: 28rpx;
							font-weight: 400;
							color: #333333;
							display: block;
						}
					}

					.view-tabber {
						width: 33rpx;
						height: 33rpx;
						margin-left: auto;

						image {
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}
			}

			.view-trip {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}

		.view-amount {
			padding-top: 120rpx;

			.text-number {
				display: block;
				font-size: 60rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				text-align: center;
			}

			.text-pay {
				display: block;
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}
		}
	}
</style>
