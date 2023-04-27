<template>
	<view class="page">
		<rich-text :nodes="agreement"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreement: '',
			};
		},
		onShow() {
			this.postAgreement()
		},
		methods: {
			// 隐私协议
			async postAgreement() {
				let res = await this.http.post('/app/userHome/platformAgreement', {
					protocolType: 'privacyAgreement',
				});
				if (res.code == 200) {
					this.agreement = res.data.protocolContent;
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 30rpx;
	}

	/deep/img {
		display: block;
		margin: 0 auto;
	}
</style>
