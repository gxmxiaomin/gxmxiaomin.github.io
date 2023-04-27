<template>
	<view>
		<view class="box">
			<u--textarea height="250" v-model="value2" placeholder="请输入您想要备注的订单信息，如：该商品放在什么位置" count></u--textarea>
		</view>
		<view class="btn">
			<u-button shape="circle" type="primary" text="完成"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value2: '',
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.box {
		width: 95%;
		margin: auto;
		height: 500rpx;
		border-radius: 20rpx;
		margin-top: 20rpx;
	}
	.btn {
		width: 95%;
		margin: auto;
		border-radius: 20rpx;
		margin-top: 120rpx;
	}
</style>
