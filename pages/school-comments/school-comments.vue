<template>
	<view class="view-container">
		<view class="view-comments-content" v-for="(item,index) in list" :key="index">
			<view class="view-content-head">
				<image :src="item.headUrl" mode=""></image>
				<view class="view-name">
					<text>{{item.nickName}}</text>
					<view class="view-ratebox">
						<ice-star v-model="item.productScore"></ice-star>
					</view>
				</view>
			</view>
			<view class="view-comments-info">
				{{item.productScore}}
			</view>
			<view class="view-comments-imagelist">
				<image :src="list" mode="" v-for="(list,index) in item.pics" :key="index"></image>
			</view>
			<view class="view-comments-uptime">
				发布时间：{{item.createTime}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			};
		},
		onLoad(option) {
			this.val = option.id
		},
		onShow() {
			this.getList()
		},
		methods:{
			async getList(){
				let res=await this.http.get('/app/storeProductReply/listUserReply',{
					goodsId:this.val,
					pageNum:1,
					pageSize:10,
				});
				if(res.code==200){
					this.list = res.rows
					for (let item of res.rows) {
						if(item.pics){
							item.pics = item.pics.split(',')
						}else{
							item.pics = item.pics
						}
					}
				}else{
				this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-container {
		width: 100%;
		background-color: #F7F7F7;
		padding-top: 20rpx;

		.view-comments-content {
			background-color: #FFFFFF;
			padding: 30rpx;

			.view-content-head {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					margin-right: 13rpx;
				}

				.view-name {
					display: flex;
					flex-direction: column;

					text {
						font-size: 28rpx;
						color: #999999;
					}

					.view-ratebox {
						display: flex;

						image {
							width: 24rpx;
							height: 22rpx;
							margin-right: 9rpx;
						}
					}
				}
			}

			.view-comments-info {
				font-size: 28rpx;
				color: #333333;
			}

			.view-comments-imagelist {
				display: flex;
				margin-top: 27rpx;
				overflow-x: hidden;

				image {
					width: 160rpx;
					height: 160rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}
			}

			.view-comments-uptime {
				margin: 20rpx 0 30rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}

	}
</style>
