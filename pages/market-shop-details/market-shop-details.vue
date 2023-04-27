<template>
	<view class="view-container">
		<ice-statusbar></ice-statusbar>
		<ice-navbar bgColor="#F7F7F7">
			<u-navbar safeAreaInsetTop placeholder fixed title="商家详情" bgColor="#F7F7F7" @leftClick="uni.navigateBack({
				
			})">
				<view class="u-nav-slot" slot="right">
					<view class="view-service" @click="goLetter()">
						<image class="image2" src="@/static/images/serve.png" mode=""></image>
						<text>在线客服</text>
					</view>
				</view>
			</u-navbar>
		</ice-navbar>
		<view class="view-head">
			<image :src="messageInfo.storeImg" mode=""></image>
			<view class="view-info">
				<view class="view-name">
					<text class="text-name">{{messageInfo.storeName}}</text>
					<view class="view-level">Lv.{{messageInfo.level}}</view>
					<view v-if="messageInfo.guarantee" class="view-money">已交保证金</view>
					<view v-else class="view-moneys">未交保证金</view>
				</view>
				<view class="view-desc">
					{{messageInfo.storeDesc}}
				</view>
				<view class="view-num">
					<view class="view-fans">粉丝数:{{messageInfo.fans}}</view>
					<view class="view-rate">
						<image src="@/static/images/retes.png" mode=""></image>
						<text>4.9分</text>
					</view>
				</view>
			</view>
			<!-- <view class="view-collect">
				<image v-if="messageInfo.collect" src="@/static/images/collect2.png" mode=""></image>
				<image v-else src="@/static/images/collect1.png" mode=""></image>
			</view> -->
			<view class="view-collect" @click="collect">
				<image v-if="messageInfo.collect" src="@/static/images/collect2.png" mode=""></image>
				<image v-else src="@/static/images/shoucang.png"></image>
			</view>
		</view>
		<view class="view-tab1">
			<view class="view-tab1-item" :class="tab1Index===index?'tab1-active':''"
				v-for="(item,index) in tab1.tabList" :key="index" @click="tab1Click(index)">
				{{item}}
			</view>
			<image v-if="tab1Index===2" :src="tab1Img" mode=""></image>
		</view>
		<view class="view-content">

			<view class="view-tab2">
				<u-tabs :list="classifyList" v-if="classifyList.length>0" keyName="label" :activeStyle="{color:'#4A9AFF',fontSize: '28rpx',
				fontWeight: '500'}" :inactiveStyle="{ fontSize: '28rpx', color: '#999999' }" @click="click_tabs2"></u-tabs>
			</view>

			<view class="view-list">
				<view class="view-list-content">
					<view class="view-list-item" v-for="(item,index) in businessList" :key="index" @click="uni.navigateTo({
						url:'../market-product-details/market-product-details?id='+item.id+'&storeId='+item.storeId
					})">
						<image :src="item.goodsImg?item.goodsImg.split(',')[0]:''" mode=""></image>
						<view class="view-info">
							<view class="view-name">{{item.goodsDesc}}</view>
							<view class="view-name">
								{{item.goodsName}}
							</view>
							<view class="view-num">
								销量{{item.salesNum}}
							</view>
							<view class="view-price">
								<text class="text-price"><text class="text-label">￥</text>{{item.sellPrice}}</text>
								<text class="text-original-price">￥{{item.originalPrice}}</text>
								<image src="@/static/images/add.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadmoreStatus" loadmoreText="点击加载更多" @loadmore="()=>{
					page++
					getBusinessList()
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
				phone: '110010',
				height: "",
				tab1Index: 0,
				tab1ImgNum: 0,
				businessList: [],
				tab1Img: require("@/static/images/filter-up.png"),
				tab1: {
					img: [
						require("@/static/images/filter-up.png"),
						require("@/static/images/filter-down.png"),
						require("@/static/images/filter-none.png"),
					],
					tabList: ["综合销量", "新品", "价格"]
				},
				idb: '',
				classifyList: [],
				messageInfo: {},
				valId: 1,
				pageNum: 1,
				loamdmoreStatus: 'loadmore',
				storeId: '',
			}
		},
		onLoad(option) {
			this.idb = option.id
		},
		async onShow() {
			await this.getBusinessInfo()
			await this.getBusinessList()
			await this.getshopclassify()
		},

		methods: {
			click_tabs2(e) {
				console.log(e.id);
				this.getBusinessList(e.id)
			},
			makePhone() {
				// 导入Activity、Intent类
				var Intent = plus.android.importClass("android.content.Intent");
				var Uri = plus.android.importClass("android.net.Uri");
				// 获取主Activity对象的实例  
				var main = plus.android.runtimeMainActivity();
				// 创建Intent  
				var uri = Uri.parse("tel:" + this.phone); // 这里可修改电话号码  
				var call = new Intent("android.intent.action.CALL", uri);
				// 调用startActivity方法拨打电话  
				main.startActivity(call);
			},
			// 收藏
			collect() {
				this.postCollect()
			},
			// 收藏
			async postCollect() {
				let res = await this.http.post('/app/userHomeNavigation/collectOrUnCollect', {
					parentId: this.idb,
					typeId: 3,
				});
				if (res.code == 200) {
					if (res.data == 1) {
						this.$toast("收藏成功")
						this.getBusinessInfo()
					} else {
						this.$toast("取消收藏")
						this.getBusinessInfo()
					}
				} else {
					this.$toast(res.msg);
				}
			},
			shopClick(val) {
				this.valId = val
				console.log(this.valId)
				this.getBusinessList()
			},
			tab1Click(index) {
				console.log(index);
				this.tab1Index = index
				this.tab1ImgNum === 3 ? this.tab1ImgNum = 0 : this.tab1ImgNum
				this.tab1Img = this.tab1.img[this.tab1ImgNum]
				this.tab1ImgNum++
				this.getshopType()
			},

			// 综合分类
			async getshopType(index) {
				if (index == 0) {
					let res = await this.http.get('/app/goods/storeList', {
						pageNum: this.page,
						pageSize: this.pageSize,
						typeId: this.valId,
						sales: 1,
						storeId: this.idb,
						// newType:1,
						// priceType:1,
					});
					if (res.code == 200) {
						let {
							status,
							list
						} = await this.$resPage(this.pageNum, this.pageSize, this.businessList, res.rows)
						this.businessList = list
						this.loadmoreStatus = status
					} else {
						this.$toast(res.msg);
					}
				} else if (index == 1) {
					let res = await this.http.get('/app/goods/storeList', {
						pageNum: this.page,
						pageSize: this.pageSize,
						typeId: this.valId,
						newType: 1,
						storeId: this.idb
					});
					if (res.code == 200) {
						let {
							status,
							list
						} = await this.$resPage(this.pageNum, this.pageSize, this.businessList, res.rows)
						this.businessList = list
						this.loadmoreStatus = status
					} else {
						this.$toast(res.msg);
					}
				} else {
					let res = await this.http.get('/app/goods/storeList', {
						pageNum: this.page,
						pageSize: this.pageSize,
						storeId: this.idb,
						typeId: this.valId,
						priceType: this.tab1ImgNum,
					});
					console.log(res);
					if (res.code == 200) {
						let {
							status,
							list
						} = await this.$resPage(this.pageNum, this.pageSize, this.businessList, res.rows)
						this.businessList = list
						this.loadmoreStatus = status
					} else {
						this.$toast(res.msg);
					}
				}

			},

			// 商品分类
			async getshopclassify() {
				console.log(this.storeId);
				let res = await this.http.get('/app/type/storeListType', {
					storeId: this.storeId,
				});

				console.log('商品分类:', res);
				if (res.code == 200) {
					this.classifyList = res.data
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取商品列表
			async getBusinessList(id) {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/goods/list", {
					pageNum: this.page,
					pageSize: this.pageSize,
					storeType: id,
					storeId: this.idb
				});
				console.log('商品列表', res);
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.businessList, res.rows);
					this.loadmoreStatus = status;
					this.businessList = list;
				} else {
					this.$toast(res.msg);
				}
			},


			async getBusinessInfo() {
				let res = await this.http.get('/app/goodsStore/getInfo', {
					isShare: 1,
					id: this.idb
				});
				if (res.code == 200) {
					this.messageInfo = res.data
					this.storeId = res.data.id
				} else {
					this.$toast(res.msg);
				}
			},

			//私信
			async goLetter() {
				let res = await this.IM.getUserInfo(this.messageInfo.phoneNum)
				let userInfo = res.data[this.messageInfo.phoneNum]
				console.log(userInfo)
				let data = {
					username: this.messageInfo.phoneNum,
					nickname: userInfo.nickname,
					avatarurl: userInfo.avatarurl,
				}
				let newData = encodeURIComponent(JSON.stringify(data))
				uni.navigateTo({
					url: '../private-letter/private-letter?data=' + newData
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-container {
		width: 100%;
		background-color: #F7F7F7;
		font-family: PingFang SC;

		/deep/ .u-navbar {
			.uicon-arrow-left {
				color: #000000 !important;

			}

			.u-navbar__content__title {
				color: #000000 !important;
				line-height: 32rpx;
			}
		}

		.view-service {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;

			.image2 {
				width: 46rpx;
				height: 48rpx;
			}
		}

		.view-head {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 30rpx 0;

			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			.view-info {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.view-name {
					display: flex;
					align-items: center;
					flex-shrink: 1;

					.text-name {
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
						margin-right: 20rpx;
						flex-shrink: 1;
					}

					.view-level {
						width: 66rpx;
						height: 28rpx;
						background: #4A9AFF;
						border-radius: 14rpx;
						font-size: 20rpx;
						font-weight: bold;
						color: #FFFFFF;
						text-align: center;
						line-height: 28rpx;
					}

					.view-moneys {
						padding: 0rpx 10rpx;
						height: 28rpx;
						background: rgba(252, 97, 41, 0.1);
						border: 1px solid #4A9AFF;
						border-radius: 14rpx;
						font-size: 16rpx;
						color: #4A9AFF;
						line-height: 24rpx;
						text-align: center;
						margin-left: 10rpx;
					}

					.view-money {
						padding: 0rpx 10rpx;
						height: 28rpx;
						background: rgba(252, 97, 41, 0.1);
						border: 1px solid #FC6129;
						border-radius: 14rpx;
						font-size: 16rpx;
						color: #FC6129;
						line-height: 24rpx;
						text-align: center;
						margin-left: 10rpx;
					}
				}

				.view-desc {
					font-size: 24rpx;
					font-weight: bold;
					color: #666666;
				}

				.view-num {
					display: flex;
					position: relative;

					.view-fans {
						width: 154rpx;
						height: 30rpx;
						background: rgba(74, 154, 255, 0.05);
						border: 1px solid #4A9AFF;
						border-radius: 3rpx;
						font-size: 20rpx;
						font-weight: bold;
						color: #4A9AFF;
						text-align: center;
						line-height: 28rpx;
					}

					.view-rate {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 108rpx;
						height: 30rpx;
						background: #FC6129;
						border: 1px solid #FC6129;
						border-radius: 15rpx;
						font-size: 20rpx;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 28rpx;
						margin-left: 10rpx;

						image {
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			}

			.view-collect {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 10rpx;

				image {
					width: 33rpx;
					height: 33rpx;
					margin-top: 16rpx;
				}
			}
		}

		.view-tab1 {
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			margin: 40rpx 0 20rpx;

			.view-tab1-item {
				font-size: 28rpx;
				font-weight: bold;
				color: #999999;
				margin-right: 85rpx;
			}

			.tab1-active {
				color: #333333;
			}

			image {
				position: relative;
				left: -80rpx;
				width: 13rpx;
				height: 20rpx;
				margin-left: 7rpx;
			}
		}

		.view-content {
			background-color: #FFFFFF;

			.view-tab2 {
				padding: 0 8rpx;
				border-bottom: 1px solid #EFEFEF;

				/deep/.u-tabs__wrapper__nav {
					.u-tabs__wrapper__nav__item {
						flex: 0;
					}

					.u-tabs__wrapper__nav__line {
						height: 8rpx !important;
					}
				}
			}

			.view-list {
				width: 100%;
				padding: 30rpx;
				margin-bottom: 20rpx;

				.view-list-content {
					width: 100%;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					.view-list-item {
						width: 330rpx;
						flex-shrink: 1;
						margin-bottom: 30rpx;
						background-color: #FFFFFF;

						image {
							width: 330rpx;
							height: 330rpx;
						}

						.view-info {
							padding: 20rpx;

							.view-name {
								width: 100%;
								font-size: 28rpx;
								font-weight: bold;
								color: #333333;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								margin-bottom: 10rpx;
							}

							.view-num {
								width: 94rpx;
								height: 36rpx;
								background: rgba(74, 154, 255, 0.05);
								border: 1px solid #4A9AFF;
								border-radius: 5rpx;
								font-size: 24rpx;
								font-weight: bold;
								color: #4A9AFF;
								line-height: 36rpx;
								text-align: center;
								margin-bottom: 10rpx;
								transform: scale(0.83);
								position: relative;
								left: -6rpx;
							}

							.view-price {
								display: flex;
								font-weight: bold;
								justify-content: space-between;
								align-items: center;

								.text-price {
									font-size: 28rpx;
									color: #FF0000;

									.text-label {
										font-size: 24rpx;
									}
								}

								.text-original-price {
									font-size: 24rpx;
									text-decoration: line-through;
									color: #CCCCCC;
									margin-right: 33rpx;
								}

								image {
									width: 32rpx;
									height: 32rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
