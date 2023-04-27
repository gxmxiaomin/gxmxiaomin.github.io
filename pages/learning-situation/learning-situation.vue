<template>
	<view>
		<view class="view-list" v-if="sysInfo.length != 0">
			<view class="view-item" v-for="(item,index) in sysInfo">
				<view class="view-top">
					<text class="text-title">{{item.title}}</text>
					<text class="text-time">{{item.createTime}}</text>
				</view>
				<view class="view-center">
					<image :src="cover" mode=""></image>
					<text>{{item.goodsName}}</text>
				</view>
				<view class="view-bottom">
					<text>查看详情</text>
					<image src="../../static/images/right.png" mode=""></image>
				</view>
			</view>
		</view>
		<view v-else class="none">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sysInfo:[],
				cover:{},
			}
		},
		onShow() {
			this.getSystemMessage()
		},
		methods: {
			async getSystemMessage() {
				let res = await this.http.get('/app/userHome/notificationCenter/actionMessageList', {
					pageNum: 1,
					pageSize: 10,
					type:3,
				});
				if (res.code == 200) {
					this.sysInfo = res.rows
					for (let list of res.rows) {
						this.cover = this.getCover(list.goodsCoverImg);
					}
				} else {
				}
			},
		}
	}
</script>

<style lang="scss">

page{
	background-color: #F7F7F7;
}

.view-list{
	margin: 30rpx;
	.view-item{
		margin-bottom: 30rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		.view-top{
			display: flex;
			flex-direction: column;
			
			.text-title{
				font-size: 32rpx;
				color: #333333;
			}
			text{
				font-size: 24rpx;
				color: #999999;
			}
		}
		.view-center{
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1rpx solid #EFEFEF;
			image{
				width: 120rpx;
				height: 121rpx;
			}
			text{
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #333333;
			}
		}
		.view-bottom{
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			justify-content: space-between;
			image{
				width: 11rpx;
				height: 19rpx;
			}
			text{
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}
		}
	}
}
.none {
		color: #aaa;
		font-size: 40rpx;
		text-align: center;
		margin-top: 400rpx;
	}
</style>
