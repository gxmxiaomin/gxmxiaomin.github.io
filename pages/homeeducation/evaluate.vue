<template>
	<view class="view-content">
		<view class="view-content-a">
			<image :src="info.videoCover" mode=""></image>
			<view class="view-introduce">
				{{info.videoName}}
			</view>
		</view>
		<view class="view-content-b">
			<textarea class="textarea" v-model="content" placeholder="宝贝满足您的期待吗？说说它的优点吧！" />
		</view>
		<view class="view-content-c">
			<view class="view-button" @click="evaluate">
				发表评价
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info: {},
				content: '',
			}
		},
		onLoad(data) {
			this.id = data.id;
		},
		onShow() {
			this.queryInfo();
		},
		methods: {
			async evaluate(){
				if(!this.content){
					this.$toast('请输入评价内容');
					return;
				}
				let res=await this.http.post('/app/familyEducation/evaluation',{
					payVideoId:this.id,
					content:this.content,
				});
				if(res.code==200){
					await this.$toast('评价成功');
					uni.navigateBack({
						
					})
				}else{
				this.$toast(res.msg);
				}
			},
			async queryInfo() {
				let res = await this.http.get('/app/familyEducation/info', {
					id: this.id,
				});
				if (res.code == 200) {
					this.info = res.data;
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-content {
		background-color: #F7F7F7;

		.view-content-a {
			width: 750rpx;
			height: 264rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				background: #4A9AFF;
				border-radius: 10rpx;
			}

			.view-introduce {
				width: 420rpx;
				margin-top: 27rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		}

		.view-content-b {
			width: 690rpx;
			height: 331rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 0 auto;
			box-sizing: border-box;
			padding: 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #CCCCCC;
			margin-bottom: 530rpx;
			
			.textarea{
				color: #333333;
			}
		}

		.view-content-c {
			width: 750rpx;
			height: 98rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 9rpx 30rpx;

			.view-button {
				width: 690rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 40rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
