<template>
	<view class="view-content">
		<u-navbar safeAreaInsetTop placeholder fixed title="报名信息" bgColor="#ffffff" @leftClick="uni.navigateBack({
			delta:1
		})">
			<view class="view-qrcode" slot="right" @click="uni.navigateTo({
				url:'./historicalquery'
			})">
				历史查询
			</view>
		</u-navbar>
		<view class="view-content-a">
			<view class="view-one">
				<view class="view-left">
					
				</view>
				<view class="view-right">
					请输入您的身份证号进行查询
				</view>
			</view>
			<view class="view-two">
				<view class="view-left">
					<input type="text" v-model="idCardNumber" placeholder="请输入您的身份证号" />
				</view>
				<view class="view-right" @click="search">
					查询
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idCardNumber:'',
			}
		},
		methods: {
			async search(){
				if(!this.idCardNumber){
					this.$toast("请输入身份证号");
					return;
				}
				let res=await this.http.post('/app/studentAssessment/signUpInfoQuery',{
					idCardNumber:this.idCardNumber,
				});
				if(res.code==200){
					uni.navigateTo({
						url:'./passageway'
					})
				}else{
				// this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	/deep/.u-navbar {

		.uicon-arrow-left {
			color: #333333 !important;
		}

		.u-navbar__content__title {
			color: #333333 !important;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
		}

		.view-qrcode {
			height: 27rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-bottom: 10rpx;
		}

	}
	.view-content-a{
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 30rpx;
		.view-one{
			display: flex;
			align-items: center;
			margin-bottom: 31rpx;
			.view-left{
				width: 10rpx;
				height: 32rpx;
				background: #4A9AFF;
				margin-right: 20rpx;
			}
			.view-right{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}
		}
	}
	.view-two{
		display: flex;
		align-items: center;
		.view-left{
			width: 505rpx;
			height: 80rpx;
			background: #F3F4FA;
			border-radius: 10rpx;
			margin-right: 20rpx;
			input{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left: 30rpx;
				margin-top: 25rpx;
			}
		}
		.view-right{
			width: 165rpx;
			height: 80rpx;
			background: #4A9AFF;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>
