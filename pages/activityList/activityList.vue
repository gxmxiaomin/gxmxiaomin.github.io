<template>
	<view class="page-view">
		<view class="content" v-for="item of list" @click="goDetail(item)" v-if="item.qljyAdvertisementInfoEntity && item.qljyAdvertisementEnrollEntity">
			<view class="left">
				<u-image class="image" radius="5px" :src="item.qljyAdvertisementInfoEntity.img" width="90px" height="90px"></u-image>
			</view>
			<view class="right">
				<view class="name">{{ item.qljyAdvertisementInfoEntity.adTitle }}</view>
				<u--text class="desc" :lines="2" :text="item.qljyAdvertisementInfoEntity.adDesc"></u--text>
				<view class="time">报名时间：{{ item.qljyAdvertisementEnrollEntity.createTime }}</view>
			</view>
		</view>
		<!-- <view class="content" v-for="item of list1">
			<view class="left">
				<u-image class="image" radius="5px" :src="item.img" width="90px" height="90px"></u-image>
			</view>
			<view class="right">
				<view class="name">{{ item.adTitle }}</view>
				<u--text class="desc" :lines="2" :text="item.adDesc"></u--text>
				<view class="time">报名时间：{{ item.createTime }}</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1:[
					{
						img:'https://img2.baidu.com/it/u=3635204433,939208923&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500',
						adTitle:'活动标题',
						adDesc:'活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介',
						createTime:'2023-04-15 17:03:04',
					}
				],
				list:[
				],
			}
		},
		onLoad() {
			this.getActivityList()
		},
		methods: {
			async getActivityList(){
				let res = await this.http.post('/app/advertisement/myAd')
				if(res.code == 200){
					
					this.list = res.data
				}
			},
			goDetail(item){
				uni.navigateTo({
					url:`/pages/event-details/event-details?item=${JSON.stringify(item)}`
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.page-view{
		width: 100%;
		height: auto;
		.content{
			width: 90%;
			height: 100px;
			border-radius: 10px;
			border: 1px solid gray;
			margin: 10px 5%;
			display: flex;
			flex-direction: row;
			.left{
				width: 40%;
				height: 100px;
				.image{
					margin-top: 5px;
					margin-left: 10%;
				}
			}
			.right{
				width: 60%;
				height: 100px;
				.name{
					font-weight: bold;
					margin-top: 5px;
					margin-bottom: 5px;
				}
				.desc{
					width: 80%;
					height: 40px;
					font-size: 10rpx;
				}
				.time{
					font-size: 10px;
					margin-top: 8px;
				}
			}
			
		}
	}
</style>
