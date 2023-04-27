<template>
	<view>
		<view class="view-follow">
			<view class="view-switch-wrapper">
				<view class="view-switch">
					<view class="view-item" @click="switchs(2)">
						<text class="text-name" :class="curriculum==2?'text-names':''">学校</text>
						<view class="view-line" v-if="curriculum==2"></view>
					</view>
					<view class="view-item" @click="switchs(3)">
						<text class="text-name" :class="curriculum==3?'text-names':''">商家</text>
						<view class="view-line" v-if="curriculum==3"></view>
					</view>
				</view>
			</view>
			<view class="view-list " v-if="curriculum==2">
				<view v-if="courseList.length != 0">
					<view class="view-item" v-for="(item,index) in courseList" @click="uni.navigateTo({
					url:'../child-details/child-details?id='+item.id+'&typeId='+3
				})">
						<image class="image-school"
							:src="item.logoImgUrl?item.logoImgUrl.split(',')[0]:item.institutionsImage"></image>
						<view class="view-brief">
							<view class="view-name">
								<text class="text-name">{{item.schoolName}}</text>
								<image class="image-rate" src="../../static/images/pingfen.png" mode=""></image>
								<text class="text-rate">{{(item.score/1).toFixed(0)}}分</text>
							</view>
							<view class="view-content u-line-2">{{item.schoolTitle}}</view>
							<view class="view-star">
								<view class="view-subject" @click="sub(index)">
									<image class="" src="../../static/images/shoucangxiao-cheng.png"></image>
								</view>
							</view>
							<view class="view-address">
								<text class="text-address u-line-1">{{item.schoolAddress}}</text>
								<text class="text-distance">{{(item.distance/1000).toFixed(2)}}m</text>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="none">
					暂无数据
				</view>
			</view>
			<view class="view-lists" v-if="curriculum==3">
				<view v-if="courseList.length != 0">
					<view class="view-rate" v-for="(item,index) in courseList" @click="uni.navigateTo({
					url:'../market-shop-details/market-shop-details?id='+item.id
				})">
						<image class="image-person" :src="item.storeImg"></image>
						<view class="view-brief">
							<view class="view-person">{{item.storeName}}<text>Lv.{{(item.score/1).toFixed(0)}}</text>
								<view class="view-subject" @click="sub(index)">
									<image class="" src="../../static/images/shoucangxiao-cheng.png"></image>
								</view>
							</view>
							<view class="view-time">月销{{item.monthSalesNum}}</view>
							<view class="view-address">
								<text class="text-address u-line-1">{{item.storeDesc}}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="none">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curriculum: 2,
				show: 1,
				subject: 1,

				courseList: [],
			}
		},
		mounted() {
			this.follow(2)
		},
		methods: {
			switchs(ids) {
				this.curriculum = ids;
				console.log(ids);
				this.follow(ids)
			},
			collect(its) {
				this.show = its
			},
			sub(limit) {
				this.subject = limit
			},
			async follow(typeId) {
				let res = await this.http.get('/app/userHome/collectOrFocusOnList', {
					typeId: typeId,
					pageNum: 1,
					pageSize: 10,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
				})
				if (res.code == 200) {
					this.courseList = res.rows
				} else {
					// this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-follow {
		width: 100%;

		.view-lists {
			// background-color: #F7f7f7;
			padding: 30rpx;

			.view-rate {
				width: 100%;
				display: flex;
				margin-top: 30rpx;
				border-bottom: 1rpx solid #EFEFEF;
				padding-bottom: 30rpx;

				.image-person {
					width: 160rpx;
					height: 160rpx;
					border-radius: 10rpx;
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

					.view-person {
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
						display: flex;
						align-items: center;

						text {
							background: #4A9AFF;
							border-radius: 13rpx;
							font-size: 20rpx;
							font-weight: bold;
							color: #FFFFFF;
							margin-left: 20rpx;
							padding: 2rpx 10rpx;
						}

						.view-subject {
							width: 32rpx;
							height: 32rpx;
							margin-left: auto;

							image {
								width: 100%;
								height: 100%;
								display: block;
							}
						}
					}

					.view-time {
						background: rgba(74, 154, 255, 0.05);
						border: 1rpx solid #4A9AFF;
						border-radius: 3rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #4A9AFF;
						margin-top: 20rpx;
						padding: 2rpx 15rpx;
						display: inline-block;
					}

					.view-details {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
					}
				}
			}

			.none {
				width: 200rpx;
				height: 30px;
				color: #aaa;
				font-size: 40rpx;
				text-align: center;
				margin: 200rpx auto;
			}
		}

		.view-list {
			border-top: 20rpx solid #F7F7F7;
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

					.view-star {
						display: flex;

						.view-type {
							text {
								width: 78rpx;
								height: 36rpx;
								background: #E5EEF8;
								border: 1rpx solid #4A9AFF;
								border-radius: 18rpx;
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #4A9AFF;
								line-height: 20rpx;
								padding: 0rpx 16rpx;
								margin-left: 10rpx;

								&:first-child {
									margin-left: 0rpx;
								}
							}
						}

						.view-subject {
							width: 32rpx;
							height: 32rpx;
							margin-left: auto;

							image {
								width: 100%;
								height: 100%;
								display: block;
							}
						}
					}

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
							margin-left: auto;
							width: 19rpx;
							height: 19rpx;
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

			.none {
				width: 200rpx;
				height: 30px;
				color: #aaa;
				font-size: 40rpx;
				text-align: center;
				margin: 200rpx auto;
			}
		}

		.view-switch-wrapper {
			height: 88rpx;

			.view-switch {
				display: flex;
				padding: 20rpx 30rpx;
				position: fixed;
				width: 100%;
				z-index: 9;
				background-color: #FFFFFF;

				.view-item {
					flex: 1;

					.text-name {
						font-size: 28rpx;
						font-weight: 400;
						color: #999999;
						text-align: center;
						display: block;
					}

					.text-names {
						color: #4A9AFF !important;
					}

					.view-line {
						width: 40rpx;
						height: 8rpx;
						background: #4A9AFF;
						border-radius: 4rpx;
						margin: 0 auto;
						margin-top: 10rpx !important;
					}
				}
			}
		}
	}
</style>