<template>
	<view class="ice-text">
		<text v-if="text==''" class="placeholder">{{placeholder}}</text>
		<text>{{text}}</text>
	</view>
</template>

<script>
	export default {
		name:"ice-text",
		props:{
			placeholder:{
				type:String,
				default:"",
			},
			text:{
				type:String,
				default:'',
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.ice-text{
		font-size: 24rpx;
		font-weight: 500;
		color: #333333;
		.placeholder{
			color: #999999;
		}
	}
</style>
