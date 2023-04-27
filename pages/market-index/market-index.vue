<template>
	<view class="view-container">
		<ice-statusbar :color="bg" v-show="false"></ice-statusbar>
		<ice-navbar :bgColor="bg" v-show="false">
			<view class="view-nav-head" :style="'background-color:'+bg+''">
				<text>商城</text>
			</view>
		</ice-navbar>
		<view class="fill-top" :style="'--color:'+ bg"></view>
		<view class="view-content1">
			<view class="view-head" :style="'background-color: '+bg+';'">
				<view style="height: 80rpx;" class=""></view>
				<image class="img-1" src="../../static/images/saoyisao.png" mode=""></image>
				<view class="ipt">
					<u-search @click="uni.navigateTo({
					url:'../market-search/market-search'
				})" placeholder="请输入商品名称进行搜索" v-model="searchValue" :show-action="false" disabled></u-search>
				</view>
				<image class="img" src="../../static/images/take.png" mode=""></image>
				<view class="news" @click="uni.navigateTo({url:''})">
					<image src="../../static/images/news.png" mode=""></image>
					<text>5</text>
				</view>
			</view>
			<view class="view-round" :style="'background-color: '+bg+';'">
			</view>
			<view class="view-inner">

				<!-- 轮播图 -->
				<view class="view-swiper" :style="'background-color:'+bg+''">
					<swiper class="swiper" autoplay :circular="true" @change="changeIndicatorDots"
						:indicator-dots="true" indicator-active-color="#FFFFFF">
						<swiper-item v-for="(item,index) in bannerList" :key="index" @click="swiperNav(item)">
							<image :src="item.carouselImgUrl"></image>
						</swiper-item>
					</swiper>
				</view>

				<swiper class="swiper-menu" indicator-dots circular>
					<swiper-item v-for="(item,index) in classList">
						<view class="view-menu">
							<view class="view-item" v-for="child in item" @click="skip(child.label,child.id)">
								<image :src="child.imgUrl"></image>
								<text class="text-name">{{child.label}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<!-- <view class="view-rush-buy" v-show="show" @click="uni.navigateTo({
					url:'../market-rush-buy/market-rush-buy'
				})" :style="'background-image:url('+require('@/static/images/market-miaosha.png')+');'">
					<view class="view-rush-buy-button">
						<view class="view-rush-buy-button-left">
							结束时间
						</view>
						<text>16:00:00</text>
					</view>
				</view> -->

				<view class="box">
					<view class="view-rush-buy-1">
						<view class="type"> <text> </text> 限时秒杀 <text>双十一更划算</text> </view>
						<view class="box-img">
							<view class="">
								<image src="../../static/images/cart2.png" mode=""></image>
								<text class="" class="label label-1">超低价</text>
							</view>

							<view class="">
								<image src="../../static/images/cart2.png" mode=""></image>
								<text class="label label-2">限时疯抢</text>
							</view>

						</view>
					</view>

					<view class="view-rush-buy-2">
						<view class="type"> <text class="x1"> </text> <text class="x2"> <text>双11</text>
								<text>好物节</text> </text> <text class="x3">GOOD</text>
						</view>
						<view class="box-img">
							<view class="">
								<image src="../../static/images/cart2.png" mode=""></image>
								<text class="label label-3">8456人推荐</text>
							</view>

							<view class="">
								<image src="../../static/images/cart2.png" mode=""></image>
								<text class="label label-4">8456人推荐</text>
							</view>

						</view>
					</view>

					<view class="view-rush-buy-1">
						<view class="type"> <text> </text> 人气榜单 <text style="background: #238efc;">HOT</text> </view>
						<view class="box-img">
							<view class="">
								<image src="../../static/images/cart2.png" mode=""></image>
								<text class="label label-5">高品好物</text>
							</view>

							<view class="">
								<image src="../../static/images/cart2.png" mode=""></image>
								<text class="label label-6">86万人购买</text>
							</view>

						</view>
					</view>

					<view class="view-rush-buy-2">
						<view class="type">
							<text class="x1"> </text> <text class="x2"> <text>双11</text>
								<text>好物节</text> </text> <text class="x4">NEW</text>
						</view>
						<view class="box-img">
							<view class="">
								<image src="../../static/images/cart2.png" mode=""></image>
								<text class="label label-7">8650人围观</text>
							</view>

							<view class="">
								<image src="../../static/images/cart2.png" mode=""></image>
								<text class="label label-8">8450人围观</text>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="view-gap"></view>
		<!-- <view class="view-list">
			<view class="view-list-head" @click="uni.navigateTo({
				url:'../market-product-list/market-product-list'
			})">
				<text class="view-list-title">精品优选</text>
				<view class="view-right">
					更多
					<image src="../../static/images/right.png" mode=""></image>
				</view>
			</view>
			<view class="view-list-content">
				<view class="view-list-item" v-for="(item,index) in schoolList" :key="index" @click="uni.navigateTo({
					url:'../market-product-details/market-product-details?id='+item.id
				})">
					<view class="view-img">
						<image :src="item?item.goodsImg.split(',')[0]:''" mode="widthFix"></image>
					</view>
					<view class="view-info">
						<view class="view-name">{{item.goodsDesc}}</view>
						<view class="view-price">
							<text class="text-price"><text class="text-label">￥</text>{{item.sellPrice}}</text>
							<text class="text-original-price">月售{{item.stockNum}}件</text>
							<image src="@/static/images/ddd.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<view class="view-list">
			<view class="view-list-content">
				<view class="view-list-item" v-for="(item,index) in list" :key="index" @click="uni.navigateTo({
					url:'../market-product-details/market-product-details?id='+item.id
				})">
					<image :src="item?item.goodsImg.split(',')[0]:''" mode=""></image>
					<view class="view-info">
						<view class="view-name">{{item.goodsDesc}}</view>
						<view class="view-name">
							{{item.goodsName}}
						</view>
						<!-- <view class="view-num">
							销量{{item.stockNum}}
						</view> -->
						<view class="view-price">
							<text class="text-price"><text class="text-label">￥</text>{{item.sellPrice}}</text>
							<text class="text-original-price">月售{{item.stockNum}}件</text> <!-- originalPrice -->
							<image src="@/static/images/ddd.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore v-if="user != 0" :status="loadmoreStatus" loadingText="点击加载更多" @loadmore="()=>{
			page++
			getList()
			return ''
		}" />

			<u-loadmore v-else :status="loadmoreStatus" loadingText="点击加载更多" @loadmore="()=>{
			page++
			getlistss()
			return ''
		}" />
		</view>



		<view class="view-gap"></view>
		<view class="view-list list2" v-if="false">
			<view class="view-list-head" @click="uni.navigateTo({
				url:'../market-shop-list/market-shop-list'
			})">
				<text class="view-list-title">优质商家</text>
				<view class="view-right">
					全部商家
					<image src="../../static/images/right.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="view-list-content">
				<view class="view-list-item" v-for="(item,index) in businessList" :key="index" @click="uni.navigateTo({
					url:'../market-shop-details/market-shop-details?id='+item.id
				})">
					<image :src="item.storeImg" mode=""></image>
					<view class="view-info">
						<view class="view-name">{{item.storeName}}
							<view class="view-level">
								Lv.5
							</view>
						</view>
						<view class="view-num">
							月销{{item.volume}}
						</view>
						<view class="view-text">
							<view class="view-desc">
								{{item.storeDesc}}
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
					page++
					getBusinessList()
					return ''
				}" />
			</view>
		</view>
		<view class="view-cart2" v-show="isShow">
			<image class="image-cart" src="../../static/images/top.png" @click="backtop" mode=""></image>
		</view>

		<view class="view-cart">
			<image class="image-cart" @click="uni.navigateTo({
			url:'../cart/cart'
		})" src="@/static/images/cart.png" mode=""></image>
			<u-badge bgColor="#FF6D42" max="99" :value="cartNum" showZero :absolute="true" :offset="[8,8]"></u-badge>
		</view>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'error',
				value: 100,
				show: 1,
				classList: [], //金刚栏
				searchValue: "",
				businessList: [], //商家列表
				schoolList: [],
				bg: '',
				background: ['color1', 'color2', 'color3'],
				colorList: [],
				bannerList: [],
				swiperList: [
					require("@/static/images/market-banner.png"),
					require("@/static/images/market-banner.png"),
					require("@/static/images/market-banner.png"),
					require("@/static/images/market-banner.png"),
				],
				timeList: [],
				tabList: [{
						name: "学习文具",
						img: require("@/static/images/market-tab1.png"),
					},
					{
						name: "儿童玩具",
						img: require("@/static/images/market-tab2.png"),
					},
					{
						name: "早教启智",
						img: require("@/static/images/market-tab3.png"),
					},
					{
						name: "笔类",
						img: require("@/static/images/market-tab4.png"),
					},
					{
						name: "画具画材",
						img: require("@/static/images/market-tab5.png"),
					},
				],
				cartNum: 0,
				list: [],
				page: 1,
				loadmoreStatus: 'loadmore',
				pageSize: 20,
				user: '',
				isShow: false
			};
		},
		onPageScroll(e) {
			// console.log('e:',e)
			if (e.scrollTop >= 200) {
				// 显示
				this.isShow = true
			} else {
				// 隐藏
				this.isShow = false
			}
		},
		onLoad() {
			this.messageShowTip.showTextMessage(this)
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		onReachBottom() {
			this.page++
			// this.getList()
			if (this.user == 0) {
				this.getlistss()
			} else {
				this.getList()
			}
		},
		async mounted() {
			await this.getClassList()
			await this.getShopList(); // 精品优选
			await this.getBusinessList()
			await this.getTime()
		},
		async onShow() {
			// await this.getList()
			await this.getBannerList()
			// await this.getCartList()

			this.user = uni.getStorageSync('userInfo').id || 0
			console.log('#####################', this.user)
			// this.test()
			if (this.user == 0) {
				await this.getlistss()
				await this.getCartListss()
			} else {
				await this.getList()
				await this.getCartList()
			}
		},
		onPullDownRefresh() {
			//刷新后的效果
			uni.reLaunch({
				url: '../market-index/market-index',
				success(res) {
					console.log(res)
				}
			})
			console.log('刷新成功！！！！！！！！！！！！！！！！！！！！！！！！！')
			uni.stopPullDownRefresh() //刷新数据之后停止刷新效果
		},
		methods: {
			skip(x, y) {
				if (y == 61) {
					uni.navigateTo({
						url: '../take-out/take-out'
					})
				} else {
					uni.navigateTo({
						url: '../market-product-menu/market-product-menu?name=' + x + '&id=' + y
					})
				}
			},
			// 点击返回顶部按钮 跳回顶部
			backtop() {
				uni.pageScrollTo({
					scrollTop: 0
				});
			},

			//未登录时的购物车列表
			async getCartListss() {
				let res = await this.http.get('/app/car/listss', {
					userId: 0
				})
				if (res.code == 200) {
					this.cartNum = res.data.length
					console.log(this.cartNum)
				} else {
					// this.$toast(res.msg);
				}
			},
			//未登录的全部商品
			async getlistss() {
				this.loadmoreStatus = 'loading'
				let res = await this.http.get('/app/goods/listss', {
					pageNum: this.page,
					pageSize: this.pageSize,
					userId: 0
				});
				console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@', res)
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
					console.log(this.list)
				} else {
					// this.$toast(res.msg);
				}
			},
			//全部商品
			async getList() {
				this.loadmoreStatus = 'loading'
				let res = await this.http.get('/app/goods/list', {
					pageNum: this.page,
					pageSize: this.pageSize,
					isShowQuality: 0,
					storeType: 1
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
					console.log(this.list)
				} else {
					// this.$toast(res.msg);
				}
			},
			// 轮播图跳转导航
			swiperNav(e) {
				console.log('swiperItem:', e);
				console.log('advertiseType:', e.advertiseType);
				switch (Number(e.advertiseType)) {
					case 0:
						uni.navigateTo({
							url: '../swiper-details/swiper-details?id=' + e.id
						})
						break;
					case 1:
						uni.navigateTo({ // 活动详情页面
							url: '../activity-details/activity-details?id=' + e.linkId
						})
						break;
					case 2:
						uni.navigateTo({ // 商品详情页面
							url: '../market-product-details/market-product-details?id=' + e.linkId
						})
						break;
					case 3:
						uni.navigateTo({ // 咨询师个人介绍页面
							url: '../Informationservice/details?id=' + e.linkId
						})
						break;
					case 4:
						uni.navigateTo({ // 学生报名页面
							url: '../qualityevaluation/signup?id=' + e.linkId
						})
						break;
					case 5:
						uni.navigateTo({ // 学校和培训机构的基本信息页面
							url: '../child-details/child-details?id=' + e.linkId
						})
						break;
					case 6:
						uni.navigateTo({ // 商家店铺页面
							url: '../market-shop-details/market-shop-details?id=' + e.linkId
						})
						break;
					case 7:
						uni.navigateTo({ // 学校和培训机构的课程介绍页面
							url: '../course-list/course-list?typeId=' + e.linkId
						})
						break;
					case 8:
						uni.navigateTo({ // 星币商城·兑换礼品的详情页
							url: '../starCoinShopDetails/starCoinShopDetails?id=' + e.linkId
						})
						break;
					case 9:
						uni.navigateTo({ // 职位的详情介绍页面
							url: '../employment-details/employment-details?id=' + e.linkId
						})
						break;
					case 10:
						uni.navigateTo({ // 代理加盟页面
							url: '../agent-joining/agent-joining'
						})
						break;
					case 11:
						uni.navigateTo({ // 家庭教育付费视频详情页面
							url: '../homeeducation/videoscreen?id=' + e.linkId
						})
						break;
					case 12:
						uni.navigateTo({ // 限时秒杀的产品详情页面
							url: '../seckill-details/seckill-details?id=' + e.linkId
						})
						break;
				}
			},

			changeIndicatorDots(e) {
				this.bg = this.colorList[e.detail.current]
			},

			// 精品优选
			async getShopList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/goods/qualityList", {
					pageNum: 1,
					pageSize: 20
				});
				console.log('精品优选', res);
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.schoolList, res.rows);
					this.loadmoreStatus = status;
					this.schoolList = list;
				} else {
					// this.$toast(res.msg);
				}
			},
			async getClassList() {
				let res = await this.http.get('/app/type/listType', {
					type: 1,
				});
				console.log(res)
				if (res.code == 200) {
					this.classList = [];
					for (var i = 0; i < res.data.length; i++) {
						if (i % 10 == 0) {
							this.classList.push([]);
						}
						this.classList[this.classList.length - 1].push(res.data[i])
					}
					console.log('@@@@@@@@@@@@@@@@@@@@@@', this.classList)
				} else {

				}
			},
			async getTime() {
				let res = await this.http.get('/app/storeSeckillConfig/listAll', {});
				if (res.code == 200) {
					this.timeList = res.data
				} else {

				}
			},

			// 轮播图
			async getBannerList() {
				this.bannerList = [];
				let res = await this.http.get('/app/userHome/homeBannerList', {
					type: 4
				});
				console.log('轮播图', res);
				if (res.code == 200) {
					this.bannerList = res.data;
				}
				for (let item of res.data) {
					this.colorList.push(item.backgroundColor)
				}
				this.bg = this.colorList[0];
			},

			// 获取商家列表
			async getBusinessList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/goodsStore/list", {
					pageNum: 1,
					pageSize: 10,
					isQualityStore: 1
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.businessList = list;
				} else {
					// this.$toast(res.msg);
				}
			},

			// 获取购物车列表
			async getCartList() {
				let res = await this.http.get('/app/car/list', {});
				if (res.code == 200) {
					this.cartNum = res.data.length
					console.log(this.cartNum)
				} else {
					// this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 自定义字体引入 */
	@font-face {
		font-family: 'HappyZcool-2016';
		src: url('../../static/ziti/HappyZcool-2016.ttf') format("truetype");
	}

	// page {
	// 	background: #f7f7f7;
	// }
	.label-1 {
		background: #fe4144;
		color: #fff;
		border-radius: 0 20rpx 20rpx 20rpx;
	}

	.label-2 {
		color: #ff0839;
		// background-color: rgba(255,1,51,0.6);
		background: #ffebee;
		border-radius: 20rpx;
	}

	.label-3 {
		color: #53bdff;
		background: #e0f3ff;
		border-radius: 20rpx;
	}

	.label-4 {
		color: #53bdff;
		background: #e0f3ff;
		border-radius: 20rpx;
	}

	.label-5 {
		color: #FFF;
		background: #bc0304;
		border-radius: 0 20rpx 20rpx 20rpx;
	}

	.label-6 {
		color: #b748fe;
		background: #f8ecff;
		border-radius: 20rpx;
	}

	.label-7 {
		color: #FFF;
		background: #fd721a;
		border-radius: 20rpx;
	}

	.label-8 {
		color: #FFF;
		background: #fd721a;
		border-radius: 20rpx;
	}

	.view-swiper {
		// position: relative;
		// top: -40rpx;
		margin-top: 40rpx;
		border-radius: 10rpx;
		overflow: hidden;
		transform: translateY();

		.swiper {
			width: 100%;
			height: 320rpx;
			border-radius: 20rpx;
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

	.view-nav-head {
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		text {
			color: #FFFFFF;
			font-weight: 700;
		}
	}

	.view-container {
		.fill-top {
			width: 100%;
			height: calc(10px + var(--status-bar-height));
			background-color: var(--color);
		}

		// padding-top: calc(10px + var(--status-bar-height));
		width: 100%;
		font-family: PingFang SC;
		display: flex;
		flex-direction: column;
		position: relative;

		.view-gap {
			width: 100%;
			height: 20rpx;
			background-color: #F7F7F7;
		}

		.view-content1 {
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow-x: hidden;

			.view-head {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				z-index: 2;


				width: 100%;
				padding: 0 30rpx 20rpx;
				margin-top: -1rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				// position: relative;
				height: 180rpx;

				/deep/.u-search {
					width: 100%;
					flex: 0;

					.u-search__content {
						height: 80rpx !important;
					}
				}

				.img-1 {
					width: 45rpx;
					height: 40rpx;
					position: absolute;
					top: 100rpx;
					left: 20rpx;
				}

				.img {
					width: 40rpx;
					height: 30rpx;
					position: absolute;
					top: 105rpx;
					right: 18%;
				}

				.ipt {
					border-radius: 50%;
					width: 80%;
				}

				.news {
					display: inline-block;
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					top: 100rpx;
					right: 2%;

					image {
						width: 40rpx;
						height: 45rpx;
						position: absolute;
					}

					text {
						display: inline-block;
						width: 30rpx;
						height: 30rpx;
						font-size: 24rpx;
						text-align: center;
						background: red;
						color: #FFFFFF;
						border-radius: 50%;
						margin-left: 20rpx;
						position: absolute;
						top: -8rpx;
					}
				}
			}

			.view-round {
				position: relative;
				background: #2679F7;
				width: 110%;
				height: 340rpx;
				border-radius: 0 0 10% 10%;
			}

			.view-inner {
				background: #f7f7f7;

				.box {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
				}

				width: 100%;
				padding: 0 30rpx;
				margin-top: -260rpx;

				/deep/ .u-swiper-indicator__wrapper__dot,
				.u-swiper-indicator__wrapper__dot--active {
					width: 13rpx;
					height: 13rpx;
				}

				.view-notice {
					display: flex;
					align-items: center;
					padding: 30rpx;
					color: #000000 !important;

					.swiper {
						height: 40rpx !important;
						width: 580rpx !important;
						font-size: 28rpx;
						font-weight: bold;
						color: #333333;
						padding: 0 10rpx;

					}
				}

				.view-tab {
					width: 100%;
					display: flex;
					margin-top: 41rpx;
					flex-wrap: wrap;

					.view-tab-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						margin: 5rpx 39rpx;

						image {
							width: 88rpx;
							height: 88rpx;
							margin-bottom: 17rpx;
							border-radius: 10rpx;
						}

						.view-tab-name {
							font-size: 24rpx;
							color: #333333;
						}
					}
				}

				.swiper-menu {
					margin-top: 20rpx;
					height: 300rpx;

					//设置轮播的指示点大小
					/deep/ .uni-swiper-dots {
						// 指示点整个区域的位置
						top: 290rpx;
					}

					/deep/ .uni-swiper-dot {
						// 指示点元素默认样式
						width: 52upx !important;
						height: 10upx !important;
						background: #e4e4e4 !important;
						border-radius: 4rpx;
					}

					/deep/ .uni-swiper-dot-active {
						// 指示点元素激活（当前选中）状态样式
						width: 52upx !important;
						height: 10upx !important;
						background: #4a9aff !important;
						border-radius: 4rpx;
					}
				}

				.view-menu {
					width: 100%;
					// padding: 0rpx 30rpx;
					display: grid;
					grid-template-columns: repeat(5, 20%);

					.view-item {
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						// margin-bottom: 29rpx;

						&:nth-child(5n) {
							margin-right: 0;
						}

						image {
							width: 93rpx;
							height: 93rpx;
						}

						.text-name {
							font-size: 24rpx;
							font-weight: 500;
							// margin-top: 20rpx;
							font-weight: bold;
							color: #666666;
						}
					}
				}

				.view-rush-buy {
					width: 100%;
					height: 220rpx;
					background-size: 100%;
					margin: 20rpx 0 34rpx;

					.view-rush-buy-button {
						position: relative;
						top: 35rpx;
						left: 347rpx;
						width: 314rpx;
						height: 60rpx;
						background: linear-gradient(180deg, #FDFF35 0%, #FFAE3A 100%);
						border-radius: 30rpx;
						display: flex;
						align-items: center;
						font-weight: 500;
						color: #DB6D1C;

						.view-rush-buy-button-left {
							width: 148rpx;
							height: 60rpx;
							background: #DB6D1C;
							border-radius: 30rpx;
							font-size: 24rpx;
							font-weight: 500;
							color: #FFFFFF;
							text-align: center;
							line-height: 60rpx;
							margin-right: 15rpx;
						}
					}
				}

				.view-rush-buy-1 {
					background: #fff;
					display: inline-block;
					width: 47%;
					margin-top: 40rpx;
					border-radius: 20rpx;

					.type {
						border-top-left-radius: 10rpx;
						border-top-right-radius: 10rpx;
						background-image: linear-gradient(to bottom, #e3edf9, #FFF);
						font-weight: 600;
						margin-bottom: 10rpx;

						text {
							&:nth-child(1) {
								padding: 0 5rpx;
							}

							&:nth-child(2) {
								display: inline-block;
								background: #fb3f3d;
								color: #FFF;
								font-size: 14rpx;
								border-radius: 20rpx;
								padding: 0 2rpx;
								margin-left: 20rpx;
							}
						}
					}

					.box-img {
						background: #FFF;
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
						border-radius: 20rpx;

						// width: 40%;
						view {
							width: 150rpx;
							height: 200rpx;

							image {
								width: 100%;
								height: 90%;
							}

							text {
								display: inline-block;
								top: -50rpx;
								left: 10rpx;
								position: relative;
								font-size: 20rpx;
								padding: 0 10rpx;
							}
						}

					}

					.label {}
				}

				.view-rush-buy-2 {
					background: #fff;
					display: inline-block;
					width: 47%;
					margin-top: 40rpx;
					border-radius: 20rpx;

					.type {
						border-top-left-radius: 10rpx;
						border-top-right-radius: 10rpx;
						background-image: linear-gradient(to bottom, #e3edf9, #FFF);
						font-weight: 600;
						margin-bottom: 10rpx;

						.x1 {
							padding: 0 5rpx;
						}

						.x2 {
							text {
								&:nth-child(1) {
									font-family: HappyZcool-2016;
									font-size: 36rpx;
									font-weight: 300;
									color: #bc0304;
								}

								&:nth-child(2) {
									font-family: HappyZcool-2016;
									font-size: 36rpx;
									font-weight: 300;
									color: #e05e0b;
								}
							}
						}

						.x3 {
							background: #238efc;
							display: inline-block;
							// background: #fb3f3d;
							color: #FFF;
							font-size: 14rpx;
							border-radius: 20rpx;
							padding: 0 2rpx;
							margin-left: 20rpx;
						}
						.x4 {
							background: #fd761d;
							display: inline-block;
							// background: #fb3f3d;
							color: #FFF;
							font-size: 14rpx;
							border-radius: 20rpx;
							padding: 0 2rpx;
							margin-left: 20rpx;
						}
					}

					.box-img {
						background: #FFF;
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
						border-radius: 20rpx;

						// width: 40%;
						view {
							width: 150rpx;
							height: 200rpx;

							image {
								width: 100%;
								height: 90%;
							}

							text {
								display: inline-block;
								top: -50rpx;
								left: 10rpx;
								position: relative;
								font-size: 20rpx;
								padding: 0 10rpx;
							}
						}

					}

					.label {}
				}

			}
		}



		.view-list {
			width: 100%;
			background-color: #f7f7f7;
			padding: 0 30rpx;


			.view-list-head {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 30rpx 0;

				.view-list-title {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
				}

				.view-right {
					font-size: 24rpx;
					color: #999999;
					display: flex;
					justify-content: space-between;
					align-items: center;

					image {
						width: 14rpx;
						height: 22rpx;
						margin-left: 20rpx;
					}
				}
			}

			.view-list-content {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.view-list-item {
					border-radius: 20rpx;
					background: #FFF;
					width: 330rpx;
					flex-shrink: 1;
					margin-bottom: 30rpx;

					.view-img {
						width: 330rpx;
						height: 330rpx;
						overflow: hidden;
					}

					image {
						width: 330rpx;
						height: 330rpx;
						border-radius: 10rpx;
					}

					.view-info {
						padding: 20rpx;

						.view-name {
							width: 100%;
							font-size: 28rpx;
							// font-weight: bold;
							color: #333333;
							// overflow: hidden;
							// white-space: nowrap;
							// text-overflow: ellipsis;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							margin-bottom: 10rpx;
						}

						.view-num {
							width: 120rpx;
							height: 30rpx;
							background: rgba(74, 154, 255, 0.05);
							border: 1px solid #4A9AFF;
							border-radius: 4rpx;
							font-size: 20rpx;
							font-weight: bold;
							color: #4A9AFF;
							line-height: 30rpx;
							text-align: center;
							margin: 20rpx 0rpx;
						}

						.view-price {
							display: flex;
							font-weight: bold;
							justify-content: space-between;
							align-items: flex-end;

							.text-price {
								font-size: 36rpx;
								color: #FF4E31;
								font-weight: 500;

								.text-label {
									font-size: 24rpx;
								}
							}

							.text-original-price {
								font-size: 22rpx;
								// text-decoration: line-through;
								color: #CCCCCC;
								margin-right: 33rpx;
							}

							image {
								width: 32rpx;
								height: 12rpx;
								margin-bottom: 10rpx;
							}
						}
					}
				}
			}
		}

		.list2 {

			.view-list-content {
				.view-list-item {
					width: 100%;
					display: flex;

					image {
						width: 160rpx;
						height: 160rpx;
					}

					.view-info {
						width: calc(100% - 160rpx);
						padding: 16rpx;

						.view-name {
							display: flex;
							align-items: center;

							.view-level {
								width: 65rpx;
								height: 28rpx;
								background: #4A9AFF;
								border-radius: 14rpx;
								font-size: 20rpx;
								font-weight: bold;
								color: #FFFFFF;
								text-align: center;
								line-height: 28rpx;
								margin-left: 20rpx;
							}
						}

						.view-num {
							width: 130rpx;
						}

						.view-text {
							display: flex;
							justify-content: space-between;
							font-size: 24rpx;
							font-weight: bold;
							color: #666666;

							.view-desc {
								flex-shrink: 1;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.view-location {
								color: #999999;
								margin-left: 30rpx;
							}
						}
					}
				}
			}
		}


		.view-cart {
			position: fixed;
			right: 0;
			bottom: 100rpx;

			image {
				width: 140rpx;
				height: 140rpx;
			}
		}

		.view-cart2 {
			position: fixed;
			right: 0;
			bottom: 240rpx;

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

	}
</style>
