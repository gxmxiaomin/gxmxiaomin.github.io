<template>
	<view>
		<view class="view-header-wrapper">
			<view class="view-header" @click="">
				<view class="view-search" @click="uni.navigateTo({url:'../search-details/search-details'})">
					<image src="../../static/images/search.png" class="image-search"></image>
					<text>请输入关键词搜索</text>
				</view>
			</view>
		</view>
		<view class="view-switch-wrapper">
			<view class="view-switch">
				<view class="view-item" @click="switchs(1)">
					<text class="text-title" :class="types==1?'text-titles':''">综合排序</text>
					<view class="view-line" v-if="types==1"></view>
				</view>
				<view class="view-item" @click="switchs(2)">
					<text class="text-title" :class="types==2?'text-titles':''">距离优先</text>
					<view class="view-line" v-if="types==2"></view>
				</view>
				<view class="view-item" @click="switchs(3)">
					<text class="text-title" :class="types==3?'text-titles':''">好评优先</text>
					<view class="view-line" v-if="types==3"></view>
				</view>
			</view>
		</view>
		<view class="view-list">
			<!-- ../occupation-details/public-details -->
			<view class="view-item" v-for="item in list" @click="uni.navigateTo({
				url:'../interest-details/public-details?id='+item.id+'&schoolType='+item.schoolTypeId+'&types='+5
			})">
				<image class="image-school" :src="item?item.institutionsImage.split(',')[0]:''"></image>
				<view class="view-brief">
					<view class="view-name">
						<text class="text-name">{{item.schoolName}}</text>
						<image class="image-rate" src="../../static/images/pingfen.png" mode=""></image>
						<text class="text-rate">{{Number(item.score)}}分</text>
					</view>
					<view class="view-content u-line-2">{{item.schoolTitle}}</view>
					<view class="view-address">
						<text class="text-address u-line-1">{{item.schoolAddress}}</text>
						<text class="text-distance">{{(item.distance/1000).toFixed(2)}}km</text>
					</view>
				</view>
			</view>
			
		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
			page++
			getList()
			return ''
		}" />
	</view>
</template>
<!-- todo   筛选   地址暂无对接 -->
<script>
	export default {
		data() {
			return {
				types: 1,
				list:[],
			}
		},
		async mounted() {
			await this.getList()
		},
		methods: {
			async switchs(ids) {
				this.types = ids
				await this.getList()
			},
			async getList(){
				this.loadmoreStatus='loading';
				let res=await this.http.get("/app/userHomeNavigation/vocationalEducationList",{
					pageNum:1,
					pageSize:10,
					type:this.types,
					lon:uni.getStorageSync('lng'),
					lat:uni.getStorageSync('lat'),
				});
				if(res.code==200){
					let {status,list} = await this.$resPage(this.page,this.pageSize,this.list,res.rows);
					this.loadmoreStatus=status;
					this.list=list;
					console.log(this.list)
				}else{
					this.$toast(res.msg);
				}
			}
			
		}
	}
</script>

<style lang="scss">
	.view-list {
		padding: 30rpx;

		.view-item {
			display: flex;
			margin-top: 60rpx;

			&:first-child {
				margin-top: 0rpx;
			}

			.view-brief {
				flex-grow: 1;
				flex-shrink: 1;
				margin-left: 20rpx;

				.view-address {
					margin-top: 25rpx;
					display: flex;

					.text-address {
						width: 340rpx;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
					}

					.text-distance {
						margin-left: auto;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
					}
				}

				.view-content {
					font-size: 28rpx;
					font-weight: bold;
					color: #666666;
					margin-top: 20rpx;
				}

				.view-name {
					display: flex;
					align-items: center;

					image {
						width: 19rpx;
						height: 19rpx;
						margin-left: auto;
					}

					.text-name {
						font-size: 36rpx;
						font-weight: bold;
						color: #333333;
					}

					.text-rate {
						font-size: 24rpx;
						font-weight: 500;
						color: #FC6129;
						margin-left: 5rpx;
					}
				}
			}

			.image-school {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
	}

	.view-switch-wrapper{
		height: 88rpx;
		
		.view-switch {
			display: flex;
			padding: 20rpx 30rpx;
			position: fixed;
			z-index: 9999;
			background-color: #FFFFFF;
			width: 100%;
			.view-item {
				margin-left: 60rpx;
				.text-titles {
					color: #4A9AFF !important;
				}
				.text-title {
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
				}
				.view-line {
					width: 40rpx;
					height: 8rpx;
					background: #4A9AFF;
					border-radius: 4rpx;
					margin: 0 auto;
					margin-top: 10rpx !important;
				}
				&:first-child {
					margin-left: 0rpx;
				}
			}
		}
		
	}
	/deep/.u-navbar__content__left {
		width: 100%;
		padding: 0rpx;
	}

	.view-header-wrapper {
		height: 88rpx;

		.view-header {
			position: fixed;
			background-color: #FFFFFF;
			display: flex;
			width: 100%;
			height: 88rpx;
			flex-direction: row;
			align-items: center;
			padding: 0 30rpx;
			z-index: 10;
			color: #333333;

			.image-location {
				width: 22rpx;
				height: 30rpx;
			}

			.text-city {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				margin-left: 10rpx;
			}

			.view-search {
				flex-grow: 1;
				flex-shrink: 1;
				height: 58rpx;
				background: #F7F9FA;
				border-radius: 10rpx;
				margin-left: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 20rpx;

				.image-search {
					width: 25rpx;
					height: 25rpx;
				}

				text {
					font-size: 28rpx;
					font-weight: 500;
					margin-left: 10rpx;
					color: #999999;
				}
			}
		}

	}
</style>
