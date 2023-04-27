<template>
	<view class="com-line" :class="{'com-reversal':isMe}">
		<view class="com-user-header">
			<!-- <image :src="userHeader" mode=""></image>	 -->
			<img :src="userHeader" alt="">
		</view>
		<view class="com-message-content">
			<view class="com-user-nick" v-if="showName">
				<text>姓名</text>
			</view>
			<view class="com-message-text" :class="{'re_set':!showName}">
				<!-- <text>{{ message.data }}</text> -->
				<text>我是一条消息</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"message-line",
		props: {
			message:{
				type: Object,
				default: function() {
					return {}
				}
			},
			userHeader: {
				type: String,
				default: "https://img2.baidu.com/it/u=2890830300,1721859624&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500"
			},
			isMe: {
				type: Boolean,
				default: true
			},
			showName:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				a:'啊打发士大夫'
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

.com-line {
	width: 100%;
	display: flex;
	padding: 10rpx 20rpx;
	.com-user-header {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10rpx;
		margin-left: 0;
		image{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
		img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
	}
	.com-message-content {
		position: relative;
		max-width: calc(100% - 250rpx);
		.com-user-nick {
			font-size: 24rpx;
			color: #818181;
			padding: 5rpx 10rpx;
			width: 100%;
			display: flex;
			margin-bottom: 10rpx;
		}
		.com-message-text {
			max-width: 100%;
			border-radius: 20rpx;
			background-color: #ffffff;
			padding: 20rpx;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #515151;
			text{
				overflow: hidden;
				flex-wrap: wrap;
				word-break: break-word;
			}
		}
		.re_set {
			margin-top: 20rpx;
		}
		.com-message-img {
			max-width: 100%;
			min-height: 100rpx;
			img {
				max-width: 100%;
				height: auto;
			}
		}
	}

}

.com-reversal {
	flex-direction: row-reverse;
	.com-user-header {
		margin-left: 10rpx;
		margin-right: 0;
	}
	.com-message-content {
		.com-user-nick {
			flex-direction: row-reverse;
		}
		.com-message-text {
			background-color: #55aaff;
			flex-direction: row-reverse;
			color: #ffffff;
		}
	}
}
</style>