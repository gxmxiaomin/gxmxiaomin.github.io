<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-line">
				<view class="view-name">
					姓名
				</view>
				<view class="view-right-a">
					<input type="text" v-model="name" placeholder="请输入" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					性别
				</view>
				<view class="view-right-a">
					<ice-selector v-model="sex" :range="sexList" rangeKey="traineeSex" placeholder="请选择性别"
						placeholder-class="selects"></ice-selector>
					<image src="/static/images/instructorapply1.png" mode=""></image>
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					年龄
				</view>
				<view class="view-right-a">
					<input type="text" v-model="age" placeholder="请输入" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					联系方式
				</view>
				<view class="view-right-a">
					<input type="text" v-model="phone" placeholder="请输入" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					身份证号
				</view>
				<view class="view-right-a">
					<input type="text" v-model="idNumber" placeholder="请输入" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					地址
				</view>
				<view class="view-right-a">
					<input type="text" v-model="address" placeholder="请输入" />
				</view>
			</view>
		</view>
		<view class="view-content-c">
			<view class="view-button" @click="payOrder">
				支付学费￥{{prices}}
			</view>
		</view>

		<input-pwd ref="pwdRef" title="请输入支付密码" @confirm="confirm"></input-pwd>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex: '',
				sexList: [{
					id: 1,
					traineeSex: '男'
				}, {
					id: 2,
					traineeSex: '女'
				}, ],
				name: "",
				address: '', //地址
				idNumber: '', //身份证号
				phone: '', //电话
				age: '', //年龄
				prices: '', //价格
				payType: 'wxpay',
			}
		},
		onLoad(option) {
			this.prices = option.peice
		},
		methods: {
			async confirm(e) {
				let result = await this.http.post('/app/userInfo/verifyPaymentPassword', {
					password: e
				});
				console.log(result);
				if (result.code == 200) {
					if (result.data) {
						this.pay();
					} else {
						this.$refs.pwdRef.tips = '密码错误';
					}
				}
			},

			// 输入支付密码
			async pay() {
				let res = await this.http.postJson('/app/socialPractice/signUp', {
					rechargeType: this.payType,
					socialPracticeList: [{
						address: this.address,
						age: this.age,
						idCardNumber: this.idNumber,
						name: this.name,
						phone: this.phone,
						sex: this.sex,
					}],
					totalPrice: this.prices,
					paySide: 'user',
				})
				if (res.code == 200) {
					uni.requestPayment({
						provider: this.payType,
						orderInfo: this.payType == 'wxpay' ? JSON.parse(res.data) : res
							.data, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
						_debug: 1,
						success: async (result) => {
							this.getPersonInfo()
							this.$toast(res.msg)
							setTimeout(function() {
								uni.navigateTo({
									url: 'socialpractice/socialpractice'
								})
							}, 500)
						},
						fail: async (err) => {
							console.log(err)
							console.log('fail:' + JSON.stringify(err));
						}
					});
					this.messInfo = res.data
				} else {

				}
			},

			async payOrder() {
				// if (this.phone.length != 11) {
				// 	this.$toast("手机号格式不正确");
				// 	return;
				// }
				// if (!uni.$u.test.idCard(this.idNumber)) {
				// 	this.$toast('身份证号格式不正确！')
				// 	return
				// }
				this.$refs.pwdRef.show = true;
			}
		}
	}
</script>

<style lang="scss">
	.view-content {
		background-color: #F7F7F7;

		.view-content-a {
			width: 750rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx 31rpx;

			.view-line {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.view-name {
					height: 27rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.view-right-a {
					width: 559rpx;
					height: 80rpx;
					background: #F8F9FA;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding-left: 30rpx;

					image {
						width: 22rpx;
						height: 13rpx;
						margin-right: 17rpx;
					}

					input {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
			}
		}

		.view-content-b {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			text-decoration: underline;
			color: #4A9AFF;
			text-align: center;
			background-color: #FFFFFF;
		}

		.view-content-c {
			width: 750rpx;
			height: 98rpx;
			background: #FFFFFF;
			position: fixed;
			left: 0;
			bottom: 0;
			box-sizing: border-box;
			padding-top: 9rpx;

			.view-button {
				width: 690rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 40rpx;
				margin: 0 auto;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 80rpx;
				text-align: center;
			}
		}
	}
</style>
