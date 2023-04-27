<template>
	<view>
		<view class="view-list" v-for="item in list" @click="uni.navigateTo({
			url:'../child-details/child-details?id='+item.id
		})">
			<view class="view-item">
				<image class="image-recommend" :src="'https://images898.oss-cn-'+item.logoImgUrl" mode="">
				</image>
				<view class="view-brief">
					<view class="view-name">{{item.schoolName}}</view>
					<view class="view-rate">
						<ice-star v-model="item.score"></ice-star>
						<view class="view-price">￥{{item.courseAmount}}<text>起</text></view>
					</view>
					<view class="view-address">
						<text class="text-address">{{item.schoolAddress}}</text>
						<text class="text-distance">距你{{(item.distance/1000).toFixed(2)}}km</text>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
			page++
			getCourseList()
			return ''
		}" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				count: 5,
				value: 2,
				allowHalf: false
			}
		},
		async onShow() {
			await this.getCourseList()
		},
		methods: {
			async getCourseList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/userHome/recommendedCoursesList", {
					pageNum: 1,
					pageSize: 10,
					lon:113.64523933884813,
					lat:34.72524240001642,
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

			.image-recommend {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}

			.view-brief {
				margin-left: 20rpx;
				flex-grow: 1;
				flex-shrink: 1;

				.view-name {
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
				}

				.view-address {
					display: flex;
					align-items: center;

					.text-address {
						font-size: 24rpx;
						font-weight: bold;
						color: #666666;
					}

					.text-distance {
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
						margin-left: auto;
					}
				}

				.view-rate {
					display: flex;
					margin: 20rpx 0rpx;

					.text-rate {
						color: #FC6129;
					}

					.view-price {
						font-size: 36rpx;
						font-weight: bold;
						color: #FC6129;

						text {
							font-size: 24rpx;
							color: #999;
						}
					}

					/deep/.uicon-star {
						padding: 0rpx !important;
					}

					.view-price {
						margin-left: auto;
					}
				}
			}
		}
	}
</style>
