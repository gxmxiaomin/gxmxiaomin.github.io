<template>
	<view class="ice-statusbar" >
		<view class="statusbar" :style="'background-color:'+color">
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"ice-statusbar",
		data() {
			return {
				height:0,
			};
		},
		props:{
			color:{
				type:String,
				default:'#fff',
			},
		},
		created() {
			uni.getSystemInfo({
				complete: (res) => {
					this.height=res.statusBarHeight;
				}
			})
		},
	}
</script>

<style lang="scss" scoped>
	.ice-statusbar{
		height: var(--status-bar-height);
		width: 100%;
	}
	
	.statusbar{
		width: 100%;
		height: var(--status-bar-height);
		position: fixed;
		z-index: 10;
	}
</style>
