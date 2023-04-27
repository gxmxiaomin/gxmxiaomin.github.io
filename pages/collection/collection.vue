<template>
	<view>
		<view class="view-collect">
			<view class="view-switch-wrapper">
				<view class="view-switch">
					<view class="view-item" @click="switchs(0)">
						<text class="text-name" :class="curriculum==0?'text-names':''">商品</text>
						<view class="view-line" v-if="curriculum==0"></view>
					</view>
					<view class="view-item" @click="switchs(1)">
						<text class="text-name" :class="curriculum==1?'text-names':''">课程</text>
						<view class="view-line" v-if="curriculum==1"></view>
					</view>

					<view class="view-item" @click="switchs(2)">
						<text class="text-name" :class="curriculum==2?'text-names':''">学校</text>
						<view class="view-line" v-if="curriculum==2"></view>
					</view>

				</view>
			</view>

			<view class="view-listt " v-if="curriculum==2">
				<view v-if="courseList.length != 0">
					<view class="view-item" v-for="(item,index) in courseList" @click="uni.navigateTo({
						url:'../interest-details/public-details?id='+item.id+'&schoolType='+item.schoolTypeId+'&types='+2
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


			<view class="view-list" v-if="curriculum==0">
				<view v-if="collectList.length != 0">
					<view class="view-item" v-for="(item,index) in collectList">
						<image class="image-shopIng" :src="item.goodsImg?item.goodsImg.split(',')[0]:''" @click="uni.navigateTo({
						url:'../market-product-details/market-product-details?id='+item.id
					})"></image>
						<view class="view-name u-line-1">{{item.goodsName}}</view>
						<text class="text-sales">销量{{item.salesNum}}</text>
						<view class="view-price">
							￥{{item.sellPrice}}<text>￥{{item.originalPrice}}</text>
							<view class="view-shoucang" @click="collect(item.id)">
								<image class="" src="../../static/images/shoucangxiao-cheng.png"></image>
							</view>
						</view>
					</view>
				</view>
				<view v-else class="none">
					暂无数据
				</view>
			</view>
			<view class="view-lists" v-if="curriculum==1">
				<view v-if="collectList.length != 0">
					<view class="view-item" v-for="(limit,index) in collectList">
						<image class="view-shoping" :src="limit.courseImg?limit.courseImg.split(',')[0]:''" @click="uni.navigateTo({
						url:'../course/course?id='+limit.id
					})"></image>
						<view class="view-content">
							<text class="text-name">{{limit.courseName}}</text>
							<text class="text-brief">{{limit.courseDetails}}</text>
							<view class="view-contact">
								<view class="text-price">¥{{limit.courseAmount}}<text>起</text></view>
								<view class="view-subject" @click="sub(limit.id)">
									<image class="" src="../../static/images/shoucangxiao-cheng.png"></image>
								</view>
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
				curriculum: 0,
				show: 1,
				subject: 1,
				collectList: [],
				cover: {},
				id: '',
				courseList: [],
			}
		},
		mounted() {
			this.collection(0)
		},
		methods: {
			switchs(ids) {
				this.curriculum = ids;
				console.log(ids);
				if (ids == 2) {
					this.follow(ids)
				}
				this.collection(ids)
			},

			//学校
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
					this.$toast(res.msg);
				}
			},

			async collect(its) {
				console.log(its);
				this.show = its
				let res = await this.http.post('/app/userHomeNavigation/collectOrUnCollect', {
					parentId: its,
					typeId: 0
				})
				if (res.code == 200) {
					this.$toast('已取消收藏')
					this.switchs(0)
				} else {
					this.$toast(res.msg)
				}
			},
			async sub(limit) {
				this.subject = limit
				let res = await this.http.post('/app/userHomeNavigation/collectOrUnCollect', {
					parentId: limit,
					typeId: 1
				})
				if (res.code == 200) {
					this.$toast('已取消收藏')
					this.switchs(1)
				} else {
					this.$toast(res.msg)
				}
			},

			async collection(ids) {
				let res = await this.http.get('/app/userHome/collectOrFocusOnList', {
					typeId: ids,
					pageNum: 1,
					pageSize: 11,
				});
				if (res.code == 200) {
					this.collectList = res.rows
					console.log(res.rows);

					for (let list of res.rows) {
						this.cover = this.getCover(list.goodsImg);
					}
					console.log(this.cover)
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-collect {
		width: 100%;

		.view-lists {
			background-color: #F7f7f7;
			padding: 20rpx 30rpx;

			.view-item {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				padding: 30rpx;
				display: flex;
				border-radius: 10rpx;

				.view-content {
					flex-grow: 1;
					flex-shrink: 1;
					margin-left: 20rpx;

					.text-name {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}

					.text-brief {
						display: block;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
						margin-top: 10rpx;
					}

					.view-contact {
						display: flex;
						margin-top: 16rpx;

						.text-price {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FF0000;

							text {
								font-size: 24rpx;
								color: #999999;
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

						.button-signup {
							width: 154rpx;
							height: 50rpx;
							background: #4A9AFF;
							border-radius: 25rpx;
							font-size: 28rpx;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 50rpx;
							margin: 0;
							margin-left: auto !important;
						}
					}
				}

				.view-shoping {
					width: 160rpx;
					height: 160rpx;
					border-radius: 10rpx;
				}

				&:first-child {
					margin-top: 0rpx;
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
			display: flex;
			flex-wrap: wrap;
			padding: 30rpx;

			.view-item {
				width: 330rpx;
				margin-bottom: 30rpx;

				&:nth-child(2n) {
					margin-left: auto;
				}

				.image-shopIng {
					width: 100%;
					height: 300rpx;
					border-radius: 10rpx;
				}

				.view-name {
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
				}

				.view-price {
					font-size: 32rpx;
					font-weight: bold;
					color: #FF0000;
					display: flex;
					align-items: center;

					.view-shoucang {
						width: 32rpx;
						height: 32rpx;
						margin-left: auto;

						image {
							width: 100%;
							height: 100%;
							display: block;
						}
					}

					text {
						font-size: 24rpx;
						font-weight: bold;
						text-decoration: line-through;
						color: #CCCCCC;
					}
				}

				.text-sales {
					width: 80rpx;
					color: #4A9AFF;
					text-align: center;
					border: 1px solid #4A9AFF;
					border-radius: 3rpx;
					font-size: 20rpx;
					font-weight: bold;
					color: #4A9AFF;
					margin: 15rpx 0rpx;
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

		.view-listt {
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
	}
</style>