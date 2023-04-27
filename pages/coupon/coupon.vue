<template>
	<view>
		<view class="view-coupon">
			<view class="view-switch-wrapper">
				<view class="view-switch">
					<view class="view-item" @click="switchs(0)">
						<text class="text-name" :class="curriculum==0?'text-names':''">待领取</text>
						<view class="view-line" v-if="curriculum==0"></view>
					</view>
					<view class="view-item" @click="switchs(1)">
						<text class="text-name" :class="curriculum==1?'text-names':''">待使用</text>
						<view class="view-line" v-if="curriculum==1"></view>
					</view>
					<view class="view-item" @click="switchs(2)">
						<text class="text-name" :class="curriculum==2?'text-names':''">不可用</text>
						<view class="view-line" v-if="curriculum==2"></view>
					</view>
				</view>
			</view>
			<view class="view-girl" v-for="item in coupnList">
				<view class="view-item">
					<view class="view-title">
						<image :src="item.storeImg"></image>
						<text class="">{{item.storeName}}</text>
					</view>
					<view class="view-block" :style="'background: url('+bgHeader+');'">
						<view class="view-block-price">
							<view class="view-block-jiage">￥<text>{{item.couponPrice}}</text></view>
							<view v-if="item.type==3" class="view-block-title">平台优惠券</view>
							<view v-else class="view-block-title">店铺优惠券</view>
						</view>
						<view class="view-block-item">
							<view class="mingzi">满{{item.useMinPrice}}可用</view>
							<view class="youxiao">有效期至{{item.endTime}}</view>
						</view>
						<!-- type 优惠券类型 0-店铺通用券 1-商品券 3-平台通用券 -->
						<!-- coupon_type 优惠卷分类：1：多商户优惠卷  2：机构优惠卷 -->
						<view class="view-block-button">
							<view v-if="curriculum==0">
								<button class="u-reset-button receive" @click="receives(item.id)">领取</button>
							</view>
							<view v-else-if="curriculum==1">
								<view v-if="item.type">
									<button class="u-reset-button receive-gf" v-if="item.type==0" @click="uni.navigateTo({
										url:'../market-shop-details/market-shop-details?id='+item.storeId
									})">去使用</button>
									<button class="u-reset-button receive-gf" v-if="item.type==1" @click="uni.navigateTo({
										url:'../market-product-details/market-product-details?id='+item.storeId
									})">去使用</button>
								</view>
								<view v-if="item.couponType">
									<button class="u-reset-button receive-gf" v-if="item.couponType==1" @click="uni.switchTab({
										url:'../market-index/market-index'
									})">去使用</button>
									<button class="u-reset-button receive-gf" v-if="item.couponType==2" @click="uni.navigateTo({
										url:'../child-details/child-details?id='+item.storeId+'&typeId='+item.status
									})">去使用</button>
								</view>
							</view>
							<image v-else src="../../static/images/yishiyong.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
			page++
			getCoupnList()
			return ''
		}"></u-loadmore>
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
				bgHeader: require('@/static/images/conpon-b.png'),
				bgGanfang: require('@/static/images/conpon-s.png'),
				qualityList: [],
				coupnList: [],
				pageNum: 1,
				pageSzie: 10
			}
		},
		onShow() {
			// this.page=1
			this.page = 1
			this.getCoupnList(); // 获取优惠券列表
		},
		methods: {
			async receives(ids) {
				let res = await this.http.get('/app/yxStoreCoupon/getCoupons', {
					cid: ids
				});
				if (res.code == 200) {
					this.messages = res.rows
					this.$toast('领取成功');
					this.getCoupnList()
				} else {

				}
			},
			switchs(ids) {
				this.curriculum = ids;
				this.getCoupnList()
			},

			// 获取优惠券列表
			async getCoupnList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/yxStoreCouponUser/list', {
					pageNum: this.page,
					pageSize: this.pageSzie,
					status: this.curriculum
				});
				console.log('优惠券', res);
				if (res.code == 200) {
					// this.qualityList = res.rows
					this.coupnList = res.rows
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSzie, this.coupnList, res.rows)
					this.loadmoreStatus = status;
					this.coupnList = list;
				} else {
					// this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-coupon {
		width: 100%;

		.view-girl {
			width: 100%;
			background-color: #F7F7F7;
			padding: 0rpx 30rpx;
			padding-bottom: 30rpx !important;

			.view-item {
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-top: 50rpx;
				padding: 30rpx;

				.view-block {
					width: 626rpx;
					height: 145rpx;
					margin-top: 30rpx;
					display: flex;
					align-items: center;
					background-size: cover !important;

					.view-block-item {
						margin-left: 40rpx;

						.mingzi {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #3D371E;
							line-height: 36rpx;
						}

						.youxiao-Gf {
							color: #B6885D;
							font-size: 24rpx;
							line-height: 50rpx;
						}

						.youxiao {
							font-size: 24rpx;
							color: #CCCCCC;
							line-height: 50rpx;
						}
					}

					.view-block-button {
						image {
							width: 79rpx;
							height: 60rpx;
						}

						.tubiao {
							margin-left: 50rpx;
							width: 85rpx;
							height: 64rpx;
						}

						.receive-gf {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							padding: 10rpx 10rpx;
							line-height: 27rpx;
							background: #BD7A3A;
							// margin-left: 30rpx;
							border-radius: 20rpx;
						}

						.receive {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							padding: 10rpx 20rpx;
							line-height: 27rpx;
							background: #4A9AFF;
							// margin-left: 30rpx;
							border-radius: 20rpx;
						}
					}

					.view-block-price {
						margin-left: 30rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						.view-block-jiage {
							// width: 140rpx;
							height: 35rpx;
							overflow: hidden;
							max-width: 200rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 35rpx;

							text {
								font-size: 35rpx;
							}
						}

						.view-block-title {
							font-size: 24rpx;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 40rpx;
						}
					}
				}

				.view-title {
					display: flex;
					height: 60rpx;
					align-items: center;

					text {
						margin-left: 30rpx;
					}

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 10rpx;
					}
				}
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
