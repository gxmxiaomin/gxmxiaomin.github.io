<template>
	<view>
		<view style="margin-top: 20rpx;background-color: #ffffff;">

			<view class="view-item" @click="this.payment">
				<text class="text-label">设置支付密码</text>
				<view class="flex-grow">
				</view>
				<text style='margin-right: 10rpx;' class="text-label">{{this.value?'已设置':''}}</text>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
			<view class="view-item" @click="uni.navigateTo({
			url:'../modify-pay-pwd/modify-pay-pwd'
		})">
				<text class="text-label">修改支付密码</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
		</view>

		<view style="margin-top: 20rpx;background-color: #ffffff;">

			<view class="view-item" @click="uni.navigateTo({
			url:'../payment-code/payment-code'
		})">
				<text class="text-label">找回支付密码</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:true
			};
		},
		onShow(){
			this.set()
		},
		methods: {
			async set(){
				let res = await this.http.get('/app/userInfo/isSettingPaymentPassword');
				if(res.data){
				console.log('有密码')
				}else{
					console.log('没有密码')
					this.value = false
				}
				console.log(res)
			},
			payment(){
			if(this.value == false){
					uni.navigateTo({
					   url:'../pay-pwd/pay-pwd'
					})
			} else {
				console.log(11111111)
				this.$toast('已设置支付密码')
			 }
		   }
		},
	}
</script>

<style lang="scss">
	page {

		background-color: #e8e8e8;

	}

	.view-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx;

		.text-label {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
		}

		.text-value {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			margin-right: 20rpx;
		}

		.image-arrow {
			width: 12rpx;
			height: 20rpx;
		}
	}
</style>
