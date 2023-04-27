<template>
	<view class="view-content">
		<view class="view-content-a" 
		@click="download(item.configValue)"
		v-for="(item,index) in list">
			<view class="view-left">
				{{item.description}}
			</view>
			<image src="/static/images/instructorapply.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			async download(url){
				uni.downloadFile({
					url:url,
					success:(result)=>{
						uni.saveFile({
							tempFilePath:result.tempFilePath,
							success:(res)=>{
								this.$toast("保存位置："+res.savedFilePath);
							},
						})
					}
				})
			},
			async getList(){
				let res=await this.http.post('/app/userHome/systemConfigurationList',{
					configOptionId:167,
				});
				if(res.code==200){
					this.list=res.data;
				}else{
				// this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-content {
		box-sizing: border-box;
		padding: 0 30rpx;
		background-color: #FFFFFF;

		.view-content-a {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #EFEFEF;
			box-sizing: border-box;
			padding: 39rpx 0;

			.view-left {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}

			image {
				width: 24rpx;
				height: 28rpx;
			}
		}
	}
</style>
