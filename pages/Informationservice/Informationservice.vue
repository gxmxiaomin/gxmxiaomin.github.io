<template>
	<view class="view-content">
		<view class="view-content-a">
			<template>
				<u-search :show-action="false" v-model="searchValue" @search="search()"></u-search>
			</template>
			<view class="view-navigation">
				<view class="view-navigation-a" @click="uni.navigateTo({
					url:'../consult-category/consult-category?id='+item.id+'&name='+item.name
				})" v-for="(item,index) in typeList">
					<image :src="item.img" mode=""></image>
					<view class="view-name">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="view-classification">
				<view class="view-classification-a" @click="clickSort('searchParams.replyTime')">
					<view class="view-name">
						回复及时性
					</view>
					<image :src="searchParams.replyTime | sortIcon" mode=""></image>
				</view>
				<view class="view-classification-a" @click="clickSort('searchParams.consultType')">
					<view class="view-name">
						咨询量
					</view>
					<image :src="searchParams.consultType | sortIcon" mode=""></image>
				</view>
				<view class="view-classification-a" @click="clickSort('searchParams.gradeType')">
					<view class="view-name">
						评分
					</view>
					<image :src="searchParams.gradeType | sortIcon" mode=""></image>
				</view>
				<view class="view-classification-a" @click="clickSort('searchParams.priceType')">
					<view class="view-name">
						价格
					</view>
					<image :src="searchParams.priceType | sortIcon" mode=""></image>
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-physician" v-for="(item,index) in list" @click="uni.navigateTo({
				url:'./details?id='+item.id
			})">
				<view class="view-top">
					<image class="image-a" :src="item.headerImg" mode=""></image>
					<view class="view-introduce">
						<view class="view-one">
							<view class="view-left">
								{{item.name}}
							</view>
							<image class="image-b" src="/static/images/Informationservice.png" mode=""></image>
							<view class="view-right">
								{{item.grade?item.grade:0}}分
							</view>
						</view>
						<view class="view-two">
							个人简介：{{item.userInfo}}
						</view>
					</view>
				</view>
				<view class="view-bottom">
					<image src="/static/images/Informationservice1.png" mode=""></image>
					<view class="view-remarks">
						已有{{item.count}}人咨询
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
		pageNum++
		getList()
		return ''
		}" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [],
				searchParams: {
					replyTime: -1,
					consultType: -1,
					gradeType: -1,
					priceType: -1,
				},
				list: [],
				searchValue: '',
				pageNum: 1,
				user: ''
			}
		},
		mounted() {
			this.user = uni.getStorageSync('userInfo').id || 0
			if (this.user != 0) {
				this.queryTypeList();
				this.getList();
			}
		},
		filters: {
			sortIcon(value) {
				switch (value) {
					case -1:
						return '/static/images/Informationservice2.png'
					case 1:
						return '/static/images/Informationservice3.png'
					case 2:
						return '/static/images/Informationservice4.png'
				}
			},
		},
		watch: {
			searchValue() {
				if (!this.searchValue) {
					this.search()
				}
			}
		},
		methods: {
			clickSort(value) {
				if (eval(`this.${value}`) == -1) {
					eval(`this.${value} = 1`);
				} else if (eval(`this.${value}`) == 1) {
					eval(`this.${value} = 2`);
				} else if (eval(`this.${value}`) == 2) {
					eval(`this.${value} = -1`);
				}
				this.pageNum = 1;
				this.list = []
				this.getList();
			},
			async search() {
				this.list = []
				this.pageNum = 1
				this.getList()
			},

			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/counselorUser/list', {
					pageSize: this.pageSize,
					pageNum: this.pageNum,
					keyName: this.searchValue,
					inquiryVolumeSort: 2,
					scoreSort: 2
				});
				console.log('列表', res);
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.pageNum, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
				} else {
					// this.$toast(res.msg);
					this.$toast('用户信息异常');
				}
			},

			async queryTypeList() {
				let res = await this.http.get('/app/counselorType/list', {
					type: 1,
				});
				if (res.code == 200) {
					this.typeList = res.data;
				} else {
					// this.$toast(res.msg);
					this.$toast('用户信息异常');
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-content {

		.view-content-a {
			background-color: #FFFFFF;
			margin-bottom: 30rpx;
			box-sizing: border-box;
			padding: 15rpx 30rpx;

			.view-top {
				width: 690rpx;
				height: 70rpx;
				background: #F7F9FA;
				border-radius: 7rpx;
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;

				image {
					width: 27rpx;
					height: 27rpx;
					margin-left: 29rpx;
					margin-right: 19rpx;
				}

				input {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #C3C7CB;
				}
			}

			.view-navigation {
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #EFEFEF;
				box-sizing: border-box;
				margin: 30rpx 0;
				flex-wrap: wrap;

				.view-navigation-a {
					width: 25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-bottom: 20rpx;

					image {
						width: 55rpx;
						height: 55rpx;
						margin-bottom: 19rpx;
					}
				}
			}

			.view-classification {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.view-classification-a {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;

					.image-a {
						width: 18rpx;
						height: 11rpx;
						margin-left: 13rpx;
					}

					image {
						width: 11rpx;
						height: 18rpx;
						margin-left: 7rpx;
					}
				}
			}
		}

		.view-content-b {
			padding-bottom: 30rpx;

			.view-physician {
				width: 690rpx;
				height: 208rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin: 0 auto;
				margin-bottom: 30rpx;
				box-sizing: border-box;
				padding: 30rpx;

				.view-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20rpx;

					.image-a {
						width: 100rpx;
						height: 100rpx;
						border-radius: 10rpx;
						background-color: #9ACAFC;
					}

					.view-introduce {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.view-one {
							display: flex;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;

							.image-b {
								width: 20rpx;
								height: 20rpx;
								margin-left: 20rpx;
								margin-top: 7rpx;
							}

							.view-right {
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #FC6129;
								margin-left: 9rpx;
							}
						}

						.view-two {
							width: 516rpx;
							height: 53rpx;
							font-size: 24rpx;
							font-family: PingFang SC;
							color: #666666;
							line-height: 30rpx;
							margin-top: 10rpx;
						}
					}
				}

				.view-bottom {
					display: flex;
					align-items: center;
					height: 23rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					color: #999999;
					line-height: 30rpx;
					margin-left: 120rpx;

					image {
						width: 27rpx;
						height: 23rpx;
						margin-right: 13rpx;
					}
				}
			}
		}
	}
</style>
