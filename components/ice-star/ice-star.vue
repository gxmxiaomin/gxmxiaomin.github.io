<template>
	<view class="ice-star">
		<u-icon v-for="(item,index) in 5" :key="index" :color="index<value?'#FF6B35':'#CCCCCC'" name="star-fill"></u-icon>
	</view>
</template>

<script>
	export default {
		name: "ice-star",
		data() {
			return {
			};
		},
		props:{
			value:{
				default:0,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ice-star {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
