<template>
	<view class="view-container">
		<view class="fill-top"></view>
		<view class="view-content1">
			<view class="view-head">
				<view style="height: 80rpx;" class=""></view>
				<view class="img-1">
					<image @click="uni.navigateBack()" src="../../static/images/left-2.png" mode=""></image> <text class="song">即时送</text>
				</view>
				<view class="img">
					<image src="../../static/images/location.png" mode=""></image>
					<text class="site">北晨公寓</text>
				</view>
				<view class="ipt">
					<view class="btn">搜索</view>
					<view class="" @click="uni.navigateTo({url:'./search'})">
						<u-search placeholder="新人专享低至五折" v-model="searchValue" height="50" disabled
							:show-action="false">
						</u-search>
					</view>
					<!-- 推荐 -->
					<view class="recommend">
						<view class="">生鲜菜</view>
						<view class="">土豆</view>
						<view class="">鸡蛋</view>
						<view class="">大米</view>
						<view class="">食用油</view>
					</view>
				</view>
				<view class="news" @click="uni.navigateTo({url:'./information'})">
					<image src="../../static/images/news.png" mode=""></image>
					<text>5</text>
				</view>
			</view>
		</view>
		<view class="back">
			<view class="" style="height: 250rpx;"></view>
			<view class="lijian">
				<view class="img-1">
					<text class="text-1">新人专区</text>
					<view class="text-2"> <text>￥</text> <text>10</text> </view>
					<view class="text-3">立即领取</view>
					<image src="../../static/images/take-out/lijian.png" mode=""></image>
				</view>
				<view class="img-2">
					<text class="text-1">满100立减</text>
					<view class="text-2"> <text>￥</text> <text>20</text> </view>
					<view class="text-3">立即领取</view>
					<image src="../../static/images/take-out/lijian2.png" mode=""></image>
				</view>
				<view class="img-3">
					<text class="text-1">满200立减</text>
					<view class="text-2"> <text>￥</text> <text>50</text> </view>
					<view class="text-3">立即领取</view>
					<image src="../../static/images/take-out/lijian.png" mode=""></image>
				</view>
			</view>


			<!-- 导航菜单 -->
			<view class="caidan">
				<swiper class="swiper-menu" :circular="true">
					<swiper-item v-for="(i,index) in Math.ceil(menuList.length/10)" :key="i">
						<view class="view-menu">
							<view class="view-item" v-for="item in menuList.slice(index*10, (index+1)*10)" :key="item.id"
							 @click="navpath(item)">
								<image :src="item.icon"></image>
								<view class="wrap">
									<text class="text-name-names">{{item.name}}</text>
								</view>

							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class="tu">
				<image src="../../static/images/take-out/huodong.png" mode=""></image>
			</view>
		</view>

		<view class="cotegory">
			<!-- 类别 -->
			<u-tabs :list="list4" :activeStyle="{
		            color: '#3e91fd',
		            fontWeight: 'bold',
		            transform: 'scale(1.05)'
		        }" :inactiveStyle="{
		            color: '#999999',
		            transform: 'scale(1)'
		        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
				<view slot="right" style="padding-left: 4px;" @tap="$u.toast('插槽被点击')">
					<text style="padding-right: 10rpx;color: #999999;">筛选</text>
				</view>
			</u-tabs>

			<Shop :list="list1"></Shop>
		</view>

		<view style="height: 90rpx;"></view>


		<u-tabbar :value="value6" @change="name => value6 = name" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item text="首页" icon="home" @click="click1(1)"></u-tabbar-item>
			<u-tabbar-item text="分类" @click="click1(2)">
				<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/images/fenlei.png"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/images/fenlei2.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item text="购物车" @click="click1(3)">
				<image class="u-page__item__slot-icon" slot="active-icon" src="../../static/images/gouwuche2.png">
				</image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" src="../../static/images/gouwuche.png">
				</image>
			</u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="click1(4)"></u-tabbar-item>
		</u-tabbar>


	</view>
</template>

<script>
	import Shop from "./components/shop/shop.vue"
	export default {
		components: {
			Shop
		},
		data() {
			return {
				searchValue: '', //搜索
				value6: 0,
				list1: [{
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}, {
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}, {
					name: '【整果】海南鲜橙一箱9.9',
					price: '9.9',
					newprice: '13.9'
				}, {
					name: '【整果】陕西猕猴桃8.9一箱',
					price: '8.9',
					newprice: '13.9'
				}],
				list4: [{
					name: '推荐'
				}, {
					name: '水果',
					// badge: {
					// 	isDot: true
					// }
				}, {
					name: '蔬菜',
				}, {
					name: '生鲜'
				}, {
					name: '甜品'
				}, {
					name: '酒水'
				}],
				navList: [
					[{
						id: 1,
						typeId: 0,
						schoolTypeName: "新鲜蔬菜",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 1,
						isDelete: 0,
						fatherId: null,
						createTime: "2022-09-15 15:12:45",
					}, {
						id: 2,
						typeId: 0,
						schoolTypeName: "甜心水果",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 2,
						isDelete: 0,
						fatherId: -1,
						createTime: "2022-09-16 16:25:07"
					}, {
						id: 3,
						typeId: 0,
						schoolTypeName: "肉蛋水产",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 3,
						isDelete: 0,
						fatherId: -1,
						createTime: "2022-10-09 17:37:50"
					}, {
						id: 4,
						typeId: 0,
						schoolTypeName: "乳品烘焙",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 4,
						isDelete: 0,
						fatherId: -1,
						createTime: "2022-09-27 08:40:48"
					}, {
						id: 5,
						typeId: 0,
						schoolTypeName: "熟食面点",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 5,
						isDelete: 0,
						fatherId: -1,
						createTime: "2022-09-27 08:40:52"
					}, {
						id: 6,
						typeId: 0,
						schoolTypeName: "速冻熟食",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 6,
						isDelete: 0,
						fatherId: null,
						createTime: "2022-09-15 15:12:45"
					}, {
						id: 7,
						typeId: 0,
						schoolTypeName: "酱多点心",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 7,
						isDelete: 0,
						fatherId: -1,
						createTime: "2022-09-16 16:25:07"
					}, {
						id: 8,
						typeId: 0,
						schoolTypeName: "定制饮品",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 8,
						isDelete: 0,
						fatherId: -1,
						createTime: "2022-10-09 17:37:50"
					}, {
						id: 9,
						typeId: 0,
						schoolTypeName: "炸鸡汉堡",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 9,
						isDelete: 0,
						fatherId: -1,
						createTime: "2022-09-27 08:40:48"
					}, {
						id: 10,
						typeId: 0,
						schoolTypeName: "粮油调味",
						icon: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png",
						indexes: 10,
						isDelete: 0,
						fatherId: -1,
						createTime: "2022-09-27 08:40:52"
					}]
				],
				menuList:[]
			}
		},
		
		onLoad() {
			this.getMenuList()
		},

		methods: {
			
			getMenuList() {
				const img = 'https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/11/10/12db450bf854468f8cfb6f624482b027.png'
				this.menuList = [
					{ id:1, name:'新鲜蔬菜', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1, #A1C7F7, #378EFD);",
					textColor:'#A1C7F7'},
					{ id:2, name:'甜心水果', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1, #8785F5, #6B68F5);",
					textColor:'#8785F5'},
					{ id:3, name:'肉蛋水产', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1,#F9B382,#E58842);",
					textColor:'#F9B382'},
					{ id:4, name:'乳品烘焙', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1,#8999D2,#455EA5);",
					textColor:'#8999D2'},
					{ id:5, name:'熟食面点', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1,#E2AA42,#C89029);",
					textColor:'#E2AA42'},
					{ id:6, name:'速冻熟食', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1,#F1898D,#A34946);",
					textColor:'#F1898D'},
					{ id:7, name:'酱多点心', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1,#F7D1CC,#DA9990);",
					textColor:'#F7D1CC'},
					{ id:8, name:'定制饮品', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1,#D1F088,#A5CB4C);",
					textColor:'#D1F088'},
					{ id:9, name:'炸鸡汉堡', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1,#F9A02C,#FB9209);",
					textColor:'#F9A02C'},
					{ id:10, name:'粮油调味', icon: img, pageBg:"background: linear-gradient(to top, #F1F1F1,#9FF9EB,#028A75);",
					textColor:'#05BB9F'}
				]
			},
			navpath(item) {
				console.log(item)
				let defSty = {
					pageBg:"background: linear-gradient(to top, #F1F1F1, #F9B382, #E58842);",
					textColor: item.textColor
				}
				if(item.pageBg&&item.pageBg!="") {
					defSty.pageBg=item.pageBg
					uni.navigateTo({
						url:"/pages/take-out/shop-fruits-page?defSty=" + JSON.stringify(defSty)
					})
				} else {
					return uni.showToast({
						title:"正在开发"
					})
				}
				
				// if (e == 1) {
				// 	uni.navigateTo({
				// 		url: './vegetable'
				// 	})
				// }
				// if(e == 2) {
				// 	uni.navigateTo({
				// 		url:"/pages/take-out/shop-fruits-page"
				// 	})
				// }
			},

			click1(e) {
				console.log(e)
				if (e == 2) {
					// uni.switchTab({
					//     url: '/pages/take-out/classify'
					// });
					uni.redirectTo({
					    url: '/pages/take-out/classify'   
					});
				} else if(e == 3) {
					uni.redirectTo({
					    url: '/pages/take-out/gouwuche'   
					});
				} else if(e == 4) {
					 uni.redirectTo({
					     url: '/pages/take-out/my'   
					 });
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.back {
		// position: relative;
		// background: #2679F7;
		background-image: linear-gradient(#2679F7, #3c8df7, #fff, #a8caf6, #FFF);
		// width: 100%;
		height: 1320rpx;

		.lijian {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			justify-content: center;
			justify-content: space-between;
			justify-content: space-around;

			view {

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.img-1 {
				.text-1 {
					display: inline-block;
					color: #7572f7;
					position: absolute;
					top: 340rpx;
					left: 80rpx;
					z-index: 1;
					font-size: 26rpx;
				}

				.text-2 {
					display: inline-block;
					color: #7572f7;
					position: absolute;
					top: 380rpx;
					left: 80rpx;
					z-index: 1;

					text {
						&:nth-child(1) {
							font-size: 28rpx;

						}

						&:nth-child(2) {
							font-size: 60rpx;

							image {
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
				}

				.text-3 {
					display: inline-block;
					background: #FFF;
					font-size: 26rpx;
					width: 140rpx;
					height: 35rpx;
					text-align: center;
					line-height: 35rpx;
					border-radius: 20rpx;
					color: #7572f7;
					position: absolute;
					top: 480rpx;
					left: 56rpx;
					z-index: 1;
				}
			}

			// 第二个优惠券
			.img-2 {
				.text-1 {
					display: inline-block;
					color: #fff;
					position: absolute;
					top: 340rpx;
					left: 42.5%;
					z-index: 1;
					font-size: 26rpx;
				}

				.text-2 {
					display: inline-block;
					color: #fff;
					position: absolute;
					top: 380rpx;
					left: 44%;
					z-index: 1;

					text {
						&:nth-child(1) {
							font-size: 28rpx;

						}

						&:nth-child(2) {
							font-size: 60rpx;
						}
					}
				}

				.text-3 {
					display: inline-block;
					background: #7572f7;
					font-size: 26rpx;
					width: 140rpx;
					height: 35rpx;
					text-align: center;
					line-height: 35rpx;
					border-radius: 20rpx;
					color: #fff;
					position: absolute;
					top: 480rpx;
					left: 41%;
					z-index: 1;
				}
			}

			// 第三个优惠券
			.img-3 {
				.text-1 {
					display: inline-block;
					color: #7572f7;
					position: absolute;
					top: 340rpx;
					right: 68rpx;
					z-index: 1;
					font-size: 26rpx;
				}

				.text-2 {
					display: inline-block;
					color: #7572f7;
					position: absolute;
					top: 380rpx;
					right: 80rpx;
					z-index: 1;

					text {
						&:nth-child(1) {
							font-size: 28rpx;

						}

						&:nth-child(2) {
							font-size: 60rpx;
						}
					}
				}

				.text-3 {
					display: inline-block;
					background: #FFF;
					font-size: 26rpx;
					width: 140rpx;
					height: 35rpx;
					text-align: center;
					line-height: 35rpx;
					border-radius: 20rpx;
					color: #7572f7;
					position: absolute;
					top: 480rpx;
					right: 56rpx;
					z-index: 1;
				}
			}
		}

		.caidan {
			background-color: aliceblue;
			width: 90%;
			margin: auto;
			border-radius: 10rpx;
		}

		.swiper-menu {
			margin-top: 30rpx;
			height: 340rpx;
		}

		.view-menu {

			display: flex;
			/* 项目在容器中换行显示 */
			flex-wrap: wrap;
			justify-content: flex-end;
			justify-content: center;
			justify-content: space-between;
			justify-content: space-around;

			// display: flex;
			// flex-direction: row;
			// flex-wrap: wrap;
			padding: 0rpx 10rpx;
			margin-top: 20rpx;


			.view-item {
				width: 116rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 16rpx;
				margin-bottom: 29rpx;

				&:nth-child(5n) {
					margin-right: 0;
				}

				image {
					width: 73rpx;
					height: 73rpx;
				}

				.text-name {
					font-size: 24rpx;
					font-weight: 500;
					margin-top: 20rpx;
					font-weight: bold;
					color: #666666;
				}

				.wrap {
					.text-name-names {
						display: inline-block;
						white-space: nowrap;
						font-size: 24rpx;
						font-weight: 500;
						margin-top: 20rpx;
						margin-left: 10rpx;
						font-weight: bold;
						color: #666666;
					}
				}
			}
		}

		.tu {
			width: 100%;
			margin-top: 20rpx;

			image {
				width: 90%;
				position: relative;
				top: 50%;
				left: 50%;
				transform: translate(-50%, 0);
			}
		}
	}

	.cotegory {
		margin-top: 30rpx;
	}

	.u-page__item__slot-icon {
		width: 35rpx;
		height: 35rpx;
	}

	.view-container {
		.fill-top {
			width: 100%;
			height: calc(10px + var(--status-bar-height));
			// background-color: var(--color);
			background-color: #2679F7;
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
				background-color: #3587f7;
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				z-index: 2;


				width: 100%;
				padding: 0 30rpx 20rpx;
				margin-top: -20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				height: 320rpx;

				/deep/.u-search {
					width: 100%;
					flex: 0;

					.u-search__content {
						height: 80rpx !important;
					}
				}

				.img-1 {
					position: absolute;
					top: 100rpx;
					left: 30rpx;

					image {
						width: 20rpx;
						height: 30rpx;
						vertical-align: middle;
					}

					.song {
						font-family: 'zcoolqingkehuangyouti-Regular';
						color: #FFF;
						margin-left: 10rpx;
					}
				}

				.img {
					position: absolute;
					top: 100rpx;
					left: 180rpx;

					image {
						width: 25rpx;
						height: 35rpx;
						// vertical-align: middle;
					}

					.site {
						color: #FFF;
						margin-left: 10rpx;
					}
				}

				.ipt {
					margin-top: 90rpx;
					border-radius: 50%;
					width: 95%;

					.btn {
						display: inline-block;
						padding: 5rpx 20rpx;
						color: #FFF;
						font-size: 22rpx;
						background: #2679F7;
						border-radius: 20rpx;
						position: absolute;
						top: 190rpx;
						right: 10%;
					}

					.recommend {
						margin-top: 10rpx;

						view {
							display: inline-block;
							padding: 5rpx 20rpx;
							color: #FFF;
							font-size: 22rpx;
							background: #5BA1FF;
							border-radius: 20rpx;
							margin-left: 20rpx;
						}
					}
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
		}
	}
</style>
