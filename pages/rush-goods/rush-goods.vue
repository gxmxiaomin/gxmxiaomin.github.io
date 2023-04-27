<template>
	<view>
		<view class="view-list">
			<view class="view-item" v-for="item in 4">
				<image class="image-shopIng" src="https://cdn.uviewui.com/uview/swiper/swiper1.png"></image>
				<view class="view-name u-line-1">欧美外教1对1英语欧美外教1对1英语欧美外教1对1英语欧美外教1对1英语...</view>
				<text class="text-sales">销量11111</text>
				<view class="view-price">￥199<text>￥299</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.view-list {
		display: flex;
		flex-wrap: wrap;
		padding:0 30rpx;
		.view-item {
			width: 330rpx;
			margin-top: 30rpx;

			&:nth-child(2n) {
				margin-left: auto;
			}

			.image-shopIng {
				width: 100%;
				height: 300rpx;
				border-radius: 10rpx;
			}

			.view-name {
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
			}

			.view-price {
				font-size: 32rpx;
				font-weight: bold;
				color: #FF0000;

				text {
					font-size: 24rpx;
					font-weight: bold;
					text-decoration: line-through;
					color: #CCCCCC;
				}
			}

			.text-sales {
				width: 80rpx;
				color: #4A9AFF;
				text-align: center;
				border: 1px solid #4A9AFF;
				border-radius: 3px;
				font-size: 20rpx;
				font-weight: bold;
				color: #4A9AFF;
				margin: 15rpx 0rpx;
			}
		}
	}
</style>
