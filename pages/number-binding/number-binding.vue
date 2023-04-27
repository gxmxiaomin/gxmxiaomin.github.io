<template>
	<view>
		<!-- <view class="view-item" @click="oauth('weixin')">
			<text class="text-label">绑定微信</text>
			<view class="flex-grow">
			</view>
			<text class="text-value">{{weixin}}</text>
			<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
		</view> -->
		<view class="view-item" @click="oauth('weixin')">
			<text class="text-label">绑定微信</text>
			<view class="flex-grow">
			</view>
			<text class="text-value">{{weixin}}</text>
			<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
		</view>
		<view class="view-item" @click="uni.navigateTo({
			url:'../number-zfb/number-zfb'
		})">
			<text class="text-label">绑定支付宝</text>
			<view class="flex-grow">
			</view>
			<text class="text-value">{{zhifubao}}</text>
			<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
		</view>
		<view class="view-item" @click="uni.navigateTo({
			url:'../number-yinlian/number-yinlian'
		})">
			<text class="text-label">绑定银联</text>
			<view class="flex-grow">
			</view>
			<text class="text-value">{{yinlian}}</text>
			<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
		</view>
		<!-- 弹出框 -->
		<view>
			<u-modal :show="show" :title="title" @cancel="cancel()" @confirm="confirm()" :content='content'
				:showCancelButton="true" :showConfirmButton="true">
			</u-modal>
			<!-- <u-button @click="show = true">打开</u-button> -->
		</view>
		<!-- <u-toast ref="uToast"></u-toast> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				weixin: '未绑定',
				zhifubao: '未绑定',
				yinlian: '未绑定',
				openId: '',
				show: false,
				title: '当前你已经绑定该微信账号',
				content: '你确定要解除绑定吗?如果解除绑定需要在沐星辰所有的金额提现'
			}
		},
		onLoad() {
			this.isweixin();
			// location.reload();
		},
		methods: {
			async isweixin() {
				var that = this;
				let res = await that.http.post('/app/userInfo/isBindWeChat', {});
				console.log(res);
				if (res.code == 200) {
					that.weixin = "已绑定";
				} else {
					that.weixin = "未绑定";
				}
			},
			oauth(provider) {
				var that = this;
				if (that.weixin == "已绑定") {
					console.log("已绑定");
					this.show = true;
				} else {
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							console.log("获取到的微信信息",res)
							if (~res.provider.indexOf(provider)) {
								uni.login({
									provider: provider,
									success: function(loginRes) {
										console.log(loginRes)
										that.openId = loginRes.authResult.openid;
										that.setLogin();
									}
								});
							}
						},
						fail: err => {
							console.log("绑定失败", err)
						}
					});
				}
			},
			
			async setLogin() {
				var that = this;
				const res = await that.http.postJson('/app/userInfo/bindWeChat', {
					openId: that.openId,
				});
				console.log(res);
				if(res.code == 200) {

					this.$toast("绑定成功")
				} else {
					this.$toast(res.msg)
				}
				this.isweixin();
			},
			
			cancel() {
				console.log("取消按钮");
				this.show = false;
			},
			
			async confirm() {
				var that = this;
				const res = await this.http.postJson('/app/userInfo/unBindWeChat', {});
				console.log(res);
				if (res.code == 200) {
					this.$toast("解绑成功");
					that.weixin = "未绑定";
					this.isweixin();
					// this.$toast(res.msg);
				}
				console.log("确认按钮");
				this.show = false;
			}
		}
	}
</script>

<style lang="scss">
	.flex-grow {
		flex-grow: 1;
		flex-shrink: 1;
		margin-left: 61%;
	}

	.text-value {
		font-size: 27rpx;
		font-weight: 400;
		color: #333333;
		margin-right: 20rpx;
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

		// .text-value {
		// 	font-size: 32rpx;
		// 	font-weight: 400;
		// 	color: #333333;
		// 	margin-right: 20rpx;
		// }

		.image-arrow {
			width: 12rpx;
			height: 20rpx;
		}
	}
</style>
