<template>
	<view class="view-content">
		<view class="view-content-a">
			<image :src="info.headUrl" mode=""></image>
			<view class="view-name">
				{{info.name}}
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-one">
				基本信息
			</view>
			<view class="view-two">
				{{info.detail}}
			</view>
			<view class="view-three">
				证书
			</view>
			<view class="view-four">
				<image :src="image" v-for="(image,index) in info.certificate"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info:{},
			}
		},
		onLoad(data) {
			this.id = data.id;
		},
		onShow() {
			this.getInfo()
		},
		methods: {
			async getInfo(){
				let res=await this.http.get('/app/studentAssessment/instructorInfo',{
					instructorId:this.id,
				});
				if(res.code==200){
					res.data.certificate=this.strToArray(res.data.certificate);
					this.info=res.data;
				}else{
				this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-content {
		background-image: url(../../static/images/instructordetails1.png);
		background-size: 750rpx 209rpx;
		background-repeat: no-repeat;
		background-color: #F7F7F7;
		overflow: hidden;

		.view-content-a {
			width: 690rpx;
			height: 180rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 0 auto;
			margin-top: 72rpx;
			box-sizing: border-box;
			padding: 30rpx;
			display: flex;
			align-items: center;
			margin-bottom: 27rpx;

			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.view-name {
				height: 30rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}

		.view-content-b {
			width: 690rpx;
			height: 1314rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 30rpx;

			.view-one {
				height: 31rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 29rpx;
			}

			.view-two {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				margin-bottom: 53rpx;
			}

			.view-three {
				height: 31rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 29rpx;
			}

			.view-four {
				width: 630rpx;
				height: 433rpx;
				border-radius: 10rpx;
				
				image{
					width: 100%;
				}
			}
		}

	}
</style>
