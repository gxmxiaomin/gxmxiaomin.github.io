<template>
	<view>
		<view class="view-header-wrapper">
			<view class="view-header">
				<view class="view-addressInfo" @click="uni.navigateTo({
					url:'../choose-city/choose-city?city='+city
				})">
					<image src="../../static/images/weizhi-xianxing.png"></image>
					<view class="view-city-name">{{city}}</view>
					<image class="img-xiala" src="../../static/images/xiala.png"></image>
				</view>

				<view class="view-search">
					<u-search class="search" bgColor="#F7F9FA" :show-action="false" v-model="searchValue"
						@search="search()"></u-search>
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
			<!-- ../child-details/child-details -->
			<view class="view-item" v-for="item in list" @click="uni.navigateTo({
				url:'../interest-details/public-details?id='+item.id+'&schoolType='+item.schoolTypeId+'&types='+1
			})">
				<image class="image-school" :src="item?item.institutionsImage.split(',')[0]:''"></image>
				<view class="view-brief">
					<view class="view-name">
						<text class="text-name">{{item.schoolName}}</text>
						<image class="image-rate" src="../../static/images/pingfen.png" mode=""></image>
						<text class="text-rate">{{Number(item.score).toFixed(1)}}分</text>
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
				list: [],
				city: '',
				searchValue: '',
			}
		},

		onLoad(options) {
			this.city = options.address
			uni.$on("getCity", (msg) => {
				this.city = msg
				this.$forceUpdate()
			})
			// console.log(options.city)
		},

		async mounted() {
			await this.getList()
		},
		methods: {
			async switchs(ids) {
				this.types = ids
				await this.getList()
			},
			async search() {
				this.list = []
				this.pageNum = 1
				this.getList()
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/userHomeNavigation/preschoolEducationList", {
					pageNum: 1,
					pageSize: 10,
					type: this.types,
					schoolName: this.searchValue,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
				} else {
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

	.view-switch-wrapper {
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
			justify-content: space-between;
			width: 100%;
			height: 88rpx;
			flex-direction: row;
			align-items: center;
			padding: 0 30rpx;
			z-index: 10;
			color: #333333;

			.view-addressInfo {
				display: flex;
				align-items: center;
				max-width: 200rpx;
				margin-right: 20rpx;

				image {
					width: 26rpx;
					height: 30rpx;
				}

				.view-city-name {
					margin-left: 10rpx;
					font-size: 28rpx;
					color: #141414;
					min-width: 50rpx;
					max-width: 110rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.img-xiala {
					width: 16rpx;
					height: 11rpx;
					margin-left: 10rpx;
				}
			}

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
				display: flex;
				align-items: center;
				background-color: #F7F9FA;
				// width: 525rpx;
				height: 70rpx;
				flex: 1;

				.search {
					background-color: #F7F9FA !important;
				}
			}
		}

	}
</style>
