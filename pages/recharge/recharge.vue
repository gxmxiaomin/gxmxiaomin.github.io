<template>
	<view class="page">
		<text class="text-title">充值金额</text>
		<view class="view-input">
			<text class="text-unit">¥</text>
			<u--input 
			border="none"
			type="digit"
			v-model="form.amount"
			placeholder="请输入金额"></u--input>
		</view>
		
		<text class="text-title">充值方式</text>
		
		<view class="view-type">
			<view @click="form.rechargeType='alipay'" class="view-item">
				<image src="../../static/images/alipay.png" class="image-logo"></image>
				<text class="text-name flex-grow">支付宝</text>
				<image :src="form.rechargeType=='alipay'?'../../static/images/check.png':'../../static/images/nocheck.png'" class="image-check"></image>
			</view>
			<view class="view-item" @click="form.rechargeType='wxpay'">
				<image src="../../static/images/wechat.png" class="image-logo"></image>
				<text class="text-name flex-grow">微信</text>
				<image :src="form.rechargeType=='wxpay'?'../../static/images/check.png':'../../static/images/nocheck.png'" class="image-check"></image>
			</view>
		</view>
		
		<button 
		@click="charge"
		class="u-reset-button button-ok">确认充值</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					amount:'',
					rechargeType:'',
					orderType:4,
				}
			};
		},
		methods:{
			async charge(){
				console.log(this.form);
				if(!this.form.amount){
					this.$toast('请输入金额');
					return ;
				}
				let res=await this.http.post('/app/userInfo/rechargeVIP',this.form);
				// console.log(res);
				if(res.code==200){
					console.log(res);
					uni.requestPayment({
					    provider: this.form.rechargeType,
					    orderInfo: this.form.rechargeType=='wxpay'?JSON.parse(res.data):res.data, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
					    _debug:1, 
						success: async (result)=>{
							
							await this.$toast('支付成功')
							uni.navigateBack({})
					    },
					    fail: async (err)=>{
					        console.log('fail:' + JSON.stringify(err));
					    }
					});
				}else{
					this.$toast(res.msg);
				}
			},
		},
	}
</script>

<style lang="scss">
	.page{
		padding: 30rpx;
	}
	
	.text-title{
		font-size: 32rpx;
		font-weight: 500;
		color: #111734;
		margin-bottom: 22rpx;
		display: block;
	}
	
	.view-input{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx 20rpx;
		width: 690rpx;
		height: 88rpx;
		background: #F2F4F7;
		border-radius: 10rpx;
		margin-bottom: 130rpx;
		
		.text-unit{
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			margin-right: 15rpx;
		}
	}
	
	.view-type{
		display: flex;
		flex-direction: column;
		
		.view-item{
			margin-top: 34rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			
			.image-logo{
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;
			}
			
			.text-name{
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}
			
			.image-check{
				width: 29rpx;
				height: 29rpx;
			}
		}
	}
	
	.button-ok{
		width: 633rpx;
		height: 90rpx;
		background: #4A9AFF;
		border-radius: 45rpx;
		margin: auto;
		margin-top: 500rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 90rpx;
	}
</style>