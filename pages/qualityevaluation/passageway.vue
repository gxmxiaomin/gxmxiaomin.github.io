<template>
	<view class="view-content">
		<view class="view-content-a">
			<image src="../../static/images/passageway.png" mode=""></image>
			<view>
				后台查询中，请稍候 ...
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
		onLoad() {
			// this.queryresults()
		},
		methods: {
			// queryresults() {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: './queryresults'
			// 		})
			// 	}, 2000)
			// }
		}
	}
</script>

<style lang="scss">
	.view-content {
		width: 750rpx;
		background: #FFFFFF;
		overflow: hidden;

		.view-content-a {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 0 auto;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 140rpx;

			image {
				width: 103rpx;
				height: 103rpx;
				margin-bottom: 19rpx;
			}
		}

	}
</style>
