<template>
	<view>
		<web-view :src="href"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: ''
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: "加载中"
			})
			setTimeout(() => {
				uni.hideLoading()
			}, 3000)
			this.href = e.href
			console.log(e.href);
		},
		methods: {

		}
	}
</script>

<style>

</style>
