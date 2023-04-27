<template>
	<view>
		<web-view :webview-styles="webviewStyles"
			src="https://100954.kefu.easemob.com/webim/im.html?configId=40ee9f34-0dde-4042-bf7b-8de32b1c4c1c">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			};
		}
	}
</script>

<style lang="scss">

</style>
