<template>
	<view class="view-rule">
		<view v-html="content">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		onShow() {
			this.getScoreRule();
		},
		methods: {
			async getScoreRule() {
				let res = await this.http.post('/app/userHome/platformAgreement?protocolType=scoreRule');
				console.log('规则:', res);
				if (res.code == 200) {
					this.content = res.data.protocolContent;
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-rule {
		padding: 30rpx;
	}
</style>
