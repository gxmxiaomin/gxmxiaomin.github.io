<template>
	<view>
		<image style="margin-bottom: 100rpx	; margin-top: 150rpx; margin-left: 25%; width:50%;height:400rpx" src="../../static/images/phone.png"></image>
		<view class='phone'>
			<text>已绑定手机号码：{{this.phoneNum}}</text>
		</view>
		<view class='text'>
			<text>您可使用绑定的手机号码登录沐星辰所有账号</text>
		</view>
		<view class="view-goOut">
			<button class="u-reset-button" @tap="replace">更换绑定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum:'',
			}
		},
		onShow() {
			this.phone()
		},
		//获取手机号
		onLoad(options) {
			console.log(options)
			this.phoneNum = options.id
		},
		methods: {
			replace(){
				uni.navigateTo({
					url:'../change-phone/change-phone'
				})
			},
		}
	}
</script>

<style lang='scss'>
	.phone{
		text-align: center;
		margin-top: 10rpx;
	}
	.text{
		text-align: center;
		margin-top: 20rpx;
		font-size: 26rpx;
		color: #999999;
	}
	
	.view-goOut {
		height: 88rpx;
		background: #F6F6F6;
		border-radius: 44rpx;
		/* line-height: 88rpx; */
		width: 90%;
		margin: 0 auto;
		margin-top: 30% !important;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 80rpx;
	}
</style>