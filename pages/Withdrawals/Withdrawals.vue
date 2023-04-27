<template>
	<view class="page">
		<text class="text-title">提现金额</text>
		<view class="view-input">
			<text class="text-unit">¥</text>
			<u--input 
			border="none"
			type="digit"
			placeholder="请输入金额" v-model="balance"></u--input>
		</view>
		
		<view class="view-tips">
			<text class="text-tips">可提现收益¥{{userInfo.brokeragePrice}}</text>
			<text class="text-all" @click="mores">全部提现</text>
		</view>
		
		<text class="text-title">提现到</text>
		
		<view class="view-type">
			<view class="view-item" @click="change('alipay')">
				<image src="../../static/images/alipay.png" class="image-logo"></image>
				<text class="text-name flex-grow">支付宝</text>
				<image :src="payType=='alipay'?'../../static/images/check.png':'../../static/images/nocheck.png'" class="image-check"></image>
			</view>
			<view class="view-item" @click="change('wx')">
				<image src="../../static/images/wechat.png" class="image-logo"></image>
				<text class="text-name flex-grow">微信</text>
				<image :src="payType=='wx'?'../../static/images/check.png':'../../static/images/nocheck.png'" class="image-check"></image>
			</view>
		</view>
		
		<button class="u-reset-button button-ok" @click="withdraw">确认提现</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				balance:'',
				payType:'wx',
			};
		},
		onShow() {
			this.getInfo()
		},
		methods:{
			change(e){
				this.payType = e
				console.log(this.payType)
			},
			mores(){
				this.balance = this.userInfo.nowMoney
			},
			withdraw(){
				this.submit()
			},
			async getInfo(){
				let res = await this.http.post('/app/userPersonalCenter/popularizeCenterInfo', {
					
				});
				if (res.code == 200) {
					this.userInfo = res.data
				} else {
					
				}
			},
			async submit(){
				if(this.balance==0){
					this.$toast('请输入正确的金额');
					return;
				}
				let res=await this.http.postJson('/app/userExtract/withdraw',{
					extractPrice:this.balance,
					extractType:this.payType,
					withdrawalType:2,
					userType:1,
				});
				if(res.code==200){
					this.$toast('提现成功');
					setTimeout(function(){
						uni.navigateTo({
							url:'../extension-center/extension-center'
						})
					},1000)
				}else{
					this.$toast(res.msg);
				}
			}
		}
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
		
		.text-unit{
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			margin-right: 15rpx;
		}
	}
	
	.view-tips{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 30rpx;
		font-size: 28rpx;
		font-weight: 400;
		margin-bottom: 130rpx;
		
		
		.text-tips{
			color: #666666;
		}
		
		.text-all{
			color: #4A9AFF;
			text-decoration: underline;
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
