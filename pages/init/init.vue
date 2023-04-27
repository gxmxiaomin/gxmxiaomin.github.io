<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {
			console.log('initinitinitinitinit')
			//判断是否第一次启动
			let notFirstTime = uni.getStorageSync('notFirstTime')
			console.log(notFirstTime)
			if (notFirstTime) {
				uni.switchTab({
					url: '../index/index'
				})
				console.log('notFirstTimenotFirstTime')
			} else {
				uni.redirectTo({
					url: '../guide/guide'
				})
			}
		},
	}
</script>

<style lang="scss">

</style>
