<template>
	<view class="view-container">
		<ice-statusbar :color="scrollTop<300?'rgba(0,0,0,0)':'#FFFFFF'"></ice-statusbar>
		<ice-navbar bgColor="rgba(0,0,0,0)" height="0rpx">
			<view class="view-nav" v-if="scrollTop<300">
				<image class="image1" src="@/static/images/31fanhui1.png" mode="" @click="uni.navigateBack({
				
			})"></image>
				<view class="view-service">
					<image class="image2" src="@/static/images/serve2.png" mode=""></image>
					<text>在线客服</text>
				</view>
			</view>
			<view class="view-nav" v-else style="background-color: #FFFFFF;">
				<image class="image1" src="@/static/images/left.png" mode="" @click="uni.navigateBack({
				
			})"></image>
				<view class="view-service">
					<image class="image2" src="@/static/images/serve.png" mode=""></image>
					<text style="color: #000000;">在线客服</text>
				</view>
			</view>
		</ice-navbar>
		<view class="view-content" :style="'top: -'+height+'px;'">
			<u-swiper :list="schoolImg" height="384" @change="e =>currentBannerNum = e.current" :circular="true"
				indicatorStyle="right: 20rpx">
				<view slot="indicator" class="indicator-num">
					<text class="indicator-num__text">{{ currentBannerNum + 1 }}/{{ schoolImg.length }}</text>
				</view>
			</u-swiper>
			<view class="view-desc">
				<view class="view-product-name">{{schoolInfo.goodsInfo}}</view>
				<view class="view-price">
					<text class="text-price">¥{{schoolInfo.sellPrice}} </text>
					<text class="text-origin-price">¥{{schoolInfo.originalPrice}}</text>
					<view class="flex-grow">
						
					</view>
					<text class="text-sale-count">月销{{schoolInfo.stockNum}}笔</text>
				</view>
				<view class="view-spec">
					<text class="view-spec-title">规格</text>
					<view class="view-spec-name" @click="showPop=true" v-html="spec?spec:'请选择规格'"></view>
					<image src="@/static/images/arrow_right.png" mode=""></image>
				</view>
			</view>
			<view class="view-comments">
				<view class="view-comments-head">
					<view class="view-comments-title">
						商品评论
					</view>
					<view class="view-rate">
						综合评分<text>{{score}}</text>
					</view>
					<view class="view-seemore" @click="uni.navigateTo({
					url:'../school-comments/school-comments?id='+val
				})">查看更多<image src="@/static/images/arrow_right.png" mode=""></image>
					</view>
				</view>
				<view class="view-comments-content" v-for="item in noticeList">
					<view class="view-content-head" >
						<image :src="item.headUrl" mode=""></image>
						<view class="view-name">
							<text>{{item.nickName}}</text>
							<view class="view-ratebox">
								<ice-star v-model="item.productScore"></ice-star>
							</view>
						</view>
					</view>
					<view class="view-comments-info">
						{{item.comment}}
					</view>
					<view class="view-comments-imagelist">
						<image :src="list" mode="" v-for="(list,index) in item.pics" :key="index">
						</image>
					</view>
					<view class="view-comments-uptime">
						发布时间：{{item.createTime}}
					</view>
				</view>
			</view>

			<view class="view-product-details">
				<view class="view-product-details-title">
					商品详情
				</view>
				<image :src="schoolInfo.goodsCover" mode=""></image>
			</view>
		</view>

		<view class="view-bottom">
			<view class="view-bottom-item" @click="collect">
				<image v-if="schoolInfo.collect" src="@/static/images/collect2.png" mode=""></image>
				<image v-else src="@/static/images/shoucang.png"></image>
				<text>收藏</text>
			</view>
			<view class="view-bottom-item">
				<image src="@/static/images/share.png" mode=""></image>
				<text>分享</text>
			</view>
			<view class="view-button" @click="uni.navigateTo({
				url:'../school-submit-order/school-submit-order?id='+val+'&storeType='+schoolInfo.storeType
			})">
				立即购买
			</view>
		</view>
		<u-popup :show="showPop" @close="showPop=false" round="10">
			<view class="view-pop">
				<image class="image-pop-close" src="@/static/images/close.png" mode="" @click="showPop=false"></image>
				<view class="pop-top">
					<image :src="cover" mode=""></image>
					<view class="pop-info">
						<view class="price">
							<text>￥{{schoolInfo.sellPrice}}</text>
							<text class="original-price">￥{{schoolInfo.originalPrice}}</text>
						</view>
						<view class="pop-desc">
							{{schoolInfo.goodsInfo}}
						</view>
					</view>
				</view>
				<view class="" v-for="classify in schoolInfo.bgoodsNormList">
					<view class="view-pop-title">
						{{classify.normName}}
					</view>
					<view class="pop-spec-list">
						<view class="view-spec-item" :class="specIndex===index?'view-spec-active':''"
							v-for="(item,index) in classify.children" :key="index" @click="()=>{
								specIndex=index
								spec=item.normValue
								specId = item.id
								return ''
							}">
							{{item.normValue}}
						</view>
					</view>
				</view>
				<view class="view-pop-title">
					数量<u-number-box v-model="num" @change="numChange"></u-number-box>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				showPop: false,
				currentBannerNum: 0,
				bannerList: [
					require("@/static/images/market-product-banner.png"),
					require("@/static/images/market-product-banner.png"),
					require("@/static/images/market-product-banner.png"),
					require("@/static/images/market-product-banner.png"),
					require("@/static/images/market-product-banner.png"),
				],
				specIndex: 0,
				spec: "",
				specList: ["电池/电源线哆啦A梦礼盒-白色", "充电款礼盒蓝", "电池/电源线哆啦A梦礼盒-粉色", "充电素描款-白色"],
				num: 0,
				height: "",
				schoolInfo:{},
				goodList:[],
				schoolImg:[],
				score:'',   //分数
				val:'',
				noticeList:[],   //评论列表
				cover:'',
			};
		},
		onShow() {
			this.getSchioolInfo()
			this.getNoticeList()
			this.getScore()
			console.log(this.scrollTop);
		},
		onLoad(option) {
			this.val = option.id
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		created() {
			uni.getSystemInfo({
				complete: (res) => {
					this.height = res.statusBarHeight;
					console.log(this.height);
				}
			})
		},
		methods: {
			// 获取用户评论列表
			async getNoticeList(){
				let res=await this.http.get('/app/storeProductReply/listUserReply',{
					goodsId:this.val,
					pageNum:1,
					pageSize:1,
				});
				if(res.code==200){
					this.noticeList = res.rows
					for (let item of res.rows) {
						if(item.pics){
							item.pics = item.pics.split(',')
						}else{
							item.pics = item.pics
						}
					}
				}else{
				this.$toast(res.msg);
				}
			},
			collect(){
				this.postCollect()
			},
			async postCollect(){
				let res=await this.http.post('/app/userHomeNavigation/collectOrUnCollect',{
					parentId:this.val,
					typeId:0,
				});
				if(res.code==200){
					if(res.data==1){
						this.$toast("收藏成功")
						this.getSchioolInfo()
					}else{
						this.$toast("取消收藏")
						this.getSchioolInfo()
					}
				}else{
					this.$toast(res.msg);
				}
			},
			// 获取评论分数
			async getScore(){
				let res=await this.http.get('/app/storeProductReply/replyCompositeScore',{
					goodsId:this.val,
				});
				if(res.code==200){
					this.score = res.data
				}else{
				this.$toast(res.msg);
				}
			},
			// 初始化获取用户信息
			async getSchioolInfo(){
				let res=await this.http.get('/app/goods/info',{
					isShare: 1,
					id:this.val,
					
				});
				if(res.code==200){
					this.schoolInfo = res.data
					this.cover=this.getCover(res.data.goodsImg);
					this.schoolImg = res.data.goodsImg.split(',')
				}else{
					
				}
			},
			numChange() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-container {
		width: 100%;
		font-family: PingFang SC;
		background-color: #F7F7F7;

		.view-nav {
			width: 100%;
			height: 88rpx;
			position: fixed;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 99;
			padding: 0 30rpx;

			.image1 {
				width: 16rpx;
				height: 28rpx;
			}

			.view-service {
				display: flex;
				flex-direction: column;
				align-items: center;

				.image2 {
					width: 46rpx;
					height: 48rpx;
				}

				text {
					font-size: 24rpx;
					color: #FFFFFF
				}
			}
		}

		.indicator-num {
			padding: 2rpx 0;
			background-color: rgba(0, 0, 0, 0.3);
			border-radius: 100rpx;
			width: 80rpx;
			@include flex;
			justify-content: center;

			&__text {
				color: #FFFFFF;
				font-size: 12rpx;
			}
		}

		.view-content {
			position: relative;
		}

		.view-desc {
			background-color: #FFFFFF;
			padding: 0 30rpx;
			margin-bottom: 20rpx;

			.view-product-name {
				padding: 30rpx 0;
				color: #333333;
				border-bottom: 1px solid #EFEFEF;
			}
			
			.view-price{
				margin: 20rpx 0;
				display: flex;
				flex-direction: row;
				align-items: center;
				
				.text-price{
					font-size: 40rpx;
					font-weight: bold;
					color: #FF0000;
				}
				
				.text-origin-price{
					margin-left: 17rpx;
					font-size: 20rpx;
					font-weight: bold;
					text-decoration: line-through;
					color: #999999;
				}
				
				.text-sale-count{
					padding: 0 10rpx;
					height: 36rpx;
					background: rgba(74, 154, 255, 0.05);
					border: 1px solid #4A9AFF;
					border-radius: 3rpx;
					font-size: 20rpx;
					font-weight: bold;
					color: #4A9AFF;
				}
			}

			.view-spec {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				padding: 30rpx 0;

				.view-spec-title {
					margin-right: 33rpx;
					color: #999999;
				}

				.view-spec-name {
					flex-grow: 1;
					color: #1E1E11;
				}

				image {
					width: 13rpx;
					height: 21rpx;
				}
			}
		}

		.view-comments {
			width: 100%;
			background-color: #FFFFFF;
			padding: 30rpx;
			margin-bottom: 20rpx;

			.view-comments-head {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.view-comments-title {
					margin-right: 33rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
				}

				.view-rate {
					flex-grow: 1;
					font-size: 24rpx;
					color: #999999;

					text {
						color: #FF6B35;
						margin-left: 6rpx;
					}
				}

				.view-seemore {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;

					image {
						width: 13rpx;
						height: 21rpx;
						margin-left: 20rpx;
					}
				}
			}

			.view-comments-content {
				.view-content-head {
					display: flex;
					align-items: center;
					margin: 40rpx 0 20rpx;

					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						margin-right: 13rpx;
					}

					.view-name {
						display: flex;
						flex-direction: column;

						text {
							font-size: 28rpx;
							color: #999999;
						}

						.view-ratebox {
							display: flex;

							image {
								width: 24rpx;
								height: 22rpx;
								margin-right: 9rpx;
							}
						}
					}
				}

				.view-comments-info {
					font-size: 28rpx;
					color: #333333;
				}

				.view-comments-imagelist {
					display: flex;
					margin-top: 27rpx;
					overflow-x: hidden;

					image {
						width: 160rpx;
						height: 160rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}
				}

				.view-comments-uptime {
					margin: 20rpx 0 30rpx;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}

		.view-product-details {
			width: 100%;
			padding: 30rpx 30rpx 110rpx;
			background-color: #FFFFFF;

			.view-product-details-title {
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 30rpx;
			}

			image {
				width: 100%;
				height: 1044rpx;
			}
		}

		.view-bottom {
			height: 100rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			z-index: 10080;

			.view-bottom-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 24rpx;
				color: #333333;

				image {
					width: 43rpx;
					height: 43rpx;
					margin-bottom: 8rpx;
				}
			}

			.view-button {
				width: 450rpx;
				height: 80rpx;
				background: #4A9AFF;
				box-shadow: 0px 4rpx 12rpx 0px rgba(19, 98, 198, 0.43);
				border-radius: 40rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}


		.view-pop {
			width: 100%;
			padding: 40rpx 30rpx 380rpx;

			.image-pop-close {
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				top: 40rpx;
				right: 30rpx;
			}

			.pop-top {
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 40rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
				}

				.pop-info {
					flex-shrink: 1;
					flex-grow: 1;

					.price {
						font-size: 40rpx;
						font-weight: bold;
						color: #FF0000;

						.original-price {
							font-size: 20rpx;
							text-decoration: line-through;
							color: #999999;
							margin-left: 20rpx;
						}
					}

					.pop-desc {
						font-size: 24rpx;
						color: #666666;
					}
				}
			}

			.view-pop-title {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
				display: flex;
				margin-bottom: 20rpx;
				justify-content: space-between;
				align-items: center;

				/deep/.u-number-box {
					.u-number-box__input {
						width: 80rpx !important;
						background-color: #F2F3F5 !important;
						font-size: 28rpx !important;
						font-family: Arial;
						font-weight: 400;
						color: #333333 !important;
					}

					.u-number-box__minus,
					.u-number-box__plus {
						width: 32rpx;
						background-color: #FFFFFF !important;
						transform: scale(0.83);
					}

					.u-icon__icon {
						font-size: 24rpx !important;
						font-weight: 400 !important;
						color: #333333 !important;
					}
				}
			}

			.pop-spec-list {
				display: flex;
				flex-wrap: wrap;

				.view-spec-item {
					background: rgba(74, 154, 255, 0.1);
					border-radius: 30rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #111111;
					text-align: center;
					padding: 10rpx 30rpx;
					margin: 0 20rpx 20rpx 0;
				}

				.view-spec-active {
					color: #4A9AFF;
				}
			}
		}
	}
</style>
