<template>
	<view>
		<view class="view-form-item">
			<text class="text-label">问题和意见</text>
			<u--textarea border="none" height="425rpx" v-model="content" placeholder="请填写10个字以上的问题描述，以便我们提供更好的帮助">
			</u--textarea>
		</view>

		<view class="view-form-item">
			<text class="text-label">联系电话</text>
			<u--input border="none" v-model="phone" placeholder="选填，便于我们与您联系"></u--input>
		</view>

		<button class="u-reset-button button-submit" @click="submit">提交反馈</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				phone: '',
			};
		},
		methods: {
			async submit() {
				if (this.content.length < 10) {
					this.$toast("请填写10个字以上的问题描述");
					return;
				}
				if (this.phone.length != 11) {
					this.$toast("手机号格式不正确");
					return;
				}
				let res = await this.http.postJson('/app/userHome/submitFeedback', {
					complaintContent: this.content,
					userPhone: this.phone
				});
				if (res.code == 200) {
					this.$toast(res.msg);
					setTimeout(function() {
						uni.switchTab({
							url: '../mine/mine'
						})
					}, 500)
				} else {
					// this.$toast(res.msg);
				}
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-form-item {
		display: flex;
		flex-direction: column;

		.text-label {
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			padding: 30rpx;
		}

		/deep/.u-input__content__field {
			height: 96rpx;
			padding: 0 30rpx;
			background: #FFFFFF;
		}
	}

	.button-submit {
		margin: auto;
		margin-top: 360rpx;
		width: 633rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: #4A9AFF;
		border-radius: 45rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
