<template>
	<view class="view-container">
		<ice-statusbar></ice-statusbar>
		<ice-navbar>
			<view class="view-header">
				<image @click="uni.navigateBack({
					
				})" src="../../static/images/left.png" class="image-location"></image>
				<u-search placeholder="请输入关键词搜索" v-model="searchValue" :showAction="false" @search="search()">
				</u-search>
			</view>
		</ice-navbar>
		<view class="view-content">
			<view class="view-head">
				<u-tabs :list="tabList" :activeStyle="{color:'#4A9AFF'}" :inactiveStyle="{
					color:'#999999'
				}" lineColor="#4A9AFF" @click="click"></u-tabs>
				<view class="view-filter">
					<view class="view-item" @click="()=>{
						showSkill = !showSkill
						showType=false
						return ''
					}">
						{{shanchang}}
						<image src="../../static/images/arrow-down.png" mode=""
							:style="showSkill?'transform: rotate(180deg);':''"></image>
						<view class="view-popupType" v-if="showSkill==true">
							<view class="view-name" v-for="item in shanchangList" @click="goods(item)">
								{{item.schoolTypeName}}
							</view>
						</view>
					</view>
					<view class="view-item" @click="()=>{
						showType=!showType
						showSkill = false
						return ''
					}">
						{{leixings}}
						<image src="../../static/images/arrow-down.png" mode=""
							:style="showType?'transform: rotate(180deg);':''"></image>
						<view class="view-popupType" v-if="showType==true">
							<view class="view-name" v-for="item in sysTemList" @click="descrip(item)">
								{{item.description}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="view-swiper">
				<u-swiper :list="bannerList" :indicator="true" indicatorMode="dot"
					indicatorInactiveColor="rgba(255, 255, 255, 0.4)" height="350rpx"></u-swiper>
			</view>
			<view class="view-gap"></view>
			<view class="view-list">
				<view class="view-item" v-for="(item,index) in goodList" :key="index" @click="uni.navigateTo({
					url:'../employment-details/employment-details?id='+item.id
				})">
					<view class="view-top">
						<text class="text-title">{{item.positionName}}</text>
						<text class="text-price">{{item.salary}}k</text>
					</view>
					<view class="view-center">
						<text class="text-item" v-for="(taps,index) in item.jobRequirements.split(',')"
							:key="index">{{taps}}</text>
					</view>
					<view class="view-bottom">
						<text class="text-name">{{item.companyAddrest}}</text>
						<view class="text-company">{{item.description}}</view>
						<text class="text-distance">距我{{(item.goodAtDirection/1000).toFixed(2)}}km</text>
					</view>
				</view>
				<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
				pageNum++
				getList()
				return ''
				}" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: "",
				tabList: [{
						id: 1,
						name: "综合排序"
					},
					{
						id: 2,
						name: "距离优先"
					}
				],
				shanchang: '擅长方向',
				leixings: '职位类型',
				showSkill: false, //擅长方向
				showType: false, //职位类型
				bannerList: [], //banner
				sysTemList: [], //职位类型
				goodList: [], //职位列表
				companyTypeId: '',
				goodAtDirection: '',
				shanchangList: "",
				pageNum: 1,
				loadmoreStatus: 'loadmore'
			};
		},
		async onLoad() {
			await this.getBannerList()
			await this.getNavList()
			await this.getShanchangList()
			await this.getList()
		},
		watch:{
			searchValue(){
				if(!this.searchValue){
					this.search()
				}
			}
		},
		methods: {
			click(item) {
				console.log('item', item);
				this.type = item.id
				this.getList()
			},
			async descrip(ids) {
				this.leixings = ids.description
				this.companyTypeId = ids.id
				this.getList()
			},
			async goods(ids) {
				this.shanchang = ids.schoolTypeName
				this.goodAtDirection = ids.id
				this.getList()
			},
			//搜索
			search() {
				this.goodList = []
				this.pageNum = 1
				this.getList()
			},
			async getBannerList() {
				let res = await this.http.get('/app/userHome/homeBannerList', {});
				if (res.code == 200) {
					for (let item of res.data) {
						this.bannerList.push(item.carouselImgUrl)
					}
				} else {
					this.$toast(res.msg);
				}
			},
			async getNavList() {
				let res = await this.http.post('/app/userHome/systemConfigurationList', {
					configOptionId: 155,
				});
				if (res.code == 200) {
					this.sysTemList = res.data
				} else {
					this.$toast(res.msg);
				}
			},
			async getShanchangList() {
				let res = await this.http.get('/app/userHomeNavigation/goodAtDirectionTypeList', {
					typeId: 2,
				});
				if (res.code == 200) {
					this.shanchangList = res.data
				} else {
					this.$toast(res.msg);
				}
			},
			async getList(ids, val) {
				let res = await this.http.get('/app/employmentPosition/list', {
					pageSize: 10,
					pageNum: this.pageNum,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
					keyName: this.searchValue,
					type: 1,
					companyTypeId: this.companyTypeId,
					goodAtDirection: this.goodAtDirection,
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.pageNum, 10, this.goodList, res.rows)
					this.goodList = list
					this.loadmoreStatus = status
					console.log(this.goodList)
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-container {
		/deep/.u-navbar__content__left {
			padding: 0 !important;
		}

		/deep/.u-navbar__content__left--hover {
			opacity: 1 !important;
		}

		/deep/.u-navbar__content {
			width: 100% !important;
		}

		/deep/.u-navbar__content__left {
			width: 100%;
		}

		.view-header {
			background-color: #FFFFFF;
			display: flex;
			width: 100%;
			height: 88rpx;
			flex-direction: row;
			align-items: center;
			padding: 0 30rpx;
			z-index: 1;

			.image-location {
				width: 16rpx;
				height: 28rpx;
				margin-right: 20rpx;
			}
		}

		.view-swiper {
			padding: 0 30rpx;
		}

		.view-content {

			.view-head {
				display: flex;
				align-items: center;
				width: 100%;
				margin-bottom: 30rpx;
				padding: 0 30rpx;

				.view-filter {
					width: 50%;
					display: flex;
					align-items: center;
					justify-content: space-around;

					.view-item {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						color: #333333;
						position: relative;

						.view-popupType {
							width: 240rpx;
							height: 240rpx;
							background-color: #FFFFFF;
							box-shadow: 0rpx 0rpx 10rpx #999999;
							position: absolute;
							top: 56rpx;
							left: -30rpx;
							z-index: 999;
							overflow-y: scroll;

							.view-name {
								width: 100%;
								height: 70rpx;
								line-height: 70rpx;
								text-align: center;
							}
						}

						image {
							width: 14rpx;
							height: 8rpx;
							margin-left: 10rpx;
						}
					}
				}
			}

			.view-gap {
				background-color: #F7F7F7;
				height: 10rpx;
				margin-top: 30rpx;
			}

			.view-list {
				.view-item {
					width: 100%;
					border-bottom: 1px solid #F7F7F7;
					padding: 40rpx 30rpx;
					display: flex;
					flex-direction: column;

					.view-top {
						width: 100%;
						display: flex;
						justify-content: space-between;
						font-size: 36rpx;
						font-weight: 500;
						line-height: 40rpx;

						.text-title {
							color: #333333;
						}

						.text-price {
							color: #FF0000;
						}
					}

					.view-center {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						margin: 20rpx 0;

						.text-item {
							font-size: 24rpx;
							color: #666666;
							line-height: 40rpx;
							padding: 14rpx;
							background-color: #F6F6F6;
							margin-bottom: 10rpx;
							margin-right: 20rpx;
						}

						&:last-child {
							margin-right: 0;
						}
					}

					.view-bottom {
						display: flex;
						align-items: center;

						.text-company {
							width: 50rpx;
							height: 30rpx;
							background-color: #007AFF;
							color: #FFFFFF;
							text-align: center;
							line-height: 30rpx;
							font-size: 16rpx;
							margin-right: 30rpx;
						}

						.text-name {
							font-size: 28rpx;
							color: #666666;
							line-height: 40rpx;
							margin-right: 10rpx;
						}

						image {
							width: 44rpx;
							height: 28rpx;
						}

						.text-distance {
							flex: 1;
							text-align: right;
							font-size: 24rpx;
							color: #999999;
							line-height: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
