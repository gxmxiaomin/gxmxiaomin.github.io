<template>
	<view class="view-container">
		<ice-statusbar :color="scrollTop<300?'rgba(0,0,0,0)':'#FFFFFF'"></ice-statusbar>
		<ice-navbar bgColor="rgba(0,0,0,0)" height="0rpx">
			<view class="view-nav" v-if="scrollTop<300">
				<image class="image1" src="@/static/images/31fanhui1.png" mode="" @click="uni.navigateBack({

			})"></image>
				<!-- <view class="view-service" @click="goLetter()">
					<image class="image2" src="@/static/images/serve2.png" mode=""></image>
					<text>在线客服</text>
				</view> -->
				<view style="margin-left: 80%;" class="view-service" @click="show = true">
					<image class="image2" src="@/static/images/fenxiang.svg" mode=""></image>
					<!-- <text>分享</text> -->
				</view>
				<view @click="show = true" style="margin-left: 20rpx;" class="view-service">
					<image class="image2" src="@/static/images/more.svg" mode=""></image>
					<!-- 更多 -->
				</view>
			</view>
			<view class="view-nav" v-else style="background-color: #FFFFFF;">
				<image class="image1" src="@/static/images/left.png" mode="" @click="uni.navigateBack({

			})"></image>
				<view class="view-service">
					<image class="image2" src="@/static/images/share.png" @click="show = true" mode=""></image>
					<text style="color: #000000;">分享</text>
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


			<view style="margin-top:20rpx;" class="view-desc">
				<view class="view-price">
					<text>￥</text><text class="text-price">{{schoolInfo.sellPrice}}</text>
					<text class="view-original-price">原价￥{{schoolInfo.originalPrice}}</text>
				</view>

				<view class="view-goods-name">{{schoolInfo.goodsDesc}}</view>
				<view class="view-rush-buy-price">
					<image class="rrr" src="@/static/images/r.svg" mode=""></image>
					<view style="margin-right: 40rpx;">
						<!-- <text class="text-right">月销30笔</text>goodsSellStatus -->
						<!-- <image class="rrr" src="@/static/images/rrr.jpg" mode=""></image> -->
						<text class="text-right">品牌保障</text>
					</view>
					<image class="rrr" src="@/static/images/77.svg" mode=""></image>
					<view style="margin-right: 40rpx;">
						<!-- <text class="text-right">月销30笔</text>goodsSellStatus -->
						<text class="text-right">七天无理由退货</text>
					</view>
					<view>
						<!-- <text class="text-right">月销30笔</text>goodsSellStatus -->
						<text class="text-right">月销售{{schoolInfo.monthSalesNum}}笔</text>
					</view>
				</view>
				<!-- <view class="view-spec">
					<text class="view-spec-title">规格</text>
					<view class="view-spec-name" @click="showPop=true" v-html="spec?spec:'请选择规格'"></view>
					<image src="@/static/images/arrow_right.png" mode=""></image>
				</view> -->
			</view>


			<view style="margin-top:20rpx;" class="view-desc">
				<view class="view-spec">
					<text class="view-spec-title">规格</text>
					<view class="view-spec-name" @click="showPop=true" v-html="spec?spec:'请选择规格'"></view>
					<image src="@/static/images/arrow_right.png" mode=""></image>
				</view>
				<view class="view-spec">
					<text class="view-spec-title">发货</text>
					<view class="view-spec-name">浙江杭州 | 包邮</view>
				</view>
				<view class="view-spec" @click="uni.navigateTo({url:'../delivery-site/delivery-site'})">
					<text class="view-spec-title">送达</text>
					<view style="color: #ababab; font-size: 24rpx;" class="view-spec-name">
						{{value}}
					</view>
					<image src="@/static/images/arrow_right.png" mode=""></image>
				</view>
			</view>


			<view class="view-comments">
				<view class="view-comments-head">
					<view class="view-comments-title">
						商品评价
					</view>
					<view class="view-rate">
						综合评分<text>{{score}}</text>
					</view>
					<view class="view-seemore" @click="uni.navigateTo({
					url:'../market-comments/market-comments?id='+schoolInfo.id+'&storeId='+schoolInfo.storeId
				})">查看全部<image src="@/static/images/arrow_right.png" mode=""></image>
					</view>
				</view>
				<view class="view-comments-content" v-for="item in noticeList">
					<view class="view-content-head">
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

			<view class="view-product-details" v-if="false">
				<view class="view-shop-intro" @click="uni.navigateTo({
				url:'../market-shop-details/market-shop-details?id='+businessInfo.id
			})">
					<image :src="businessInfo.storeImg" mode=""></image>
					<view class="view-shop-info">
						<view class="view-shop-name">
							{{businessInfo.storeName}}
						</view>
						<!-- <view class="view-shop-desc">
							{{businessInfo.storeDesc}}
						</view> -->
						<view>
							<text style="font-size: 26rpx;margin-right:20rpx;">宝贝描述<text
									style="color:#4a9aff">5.0</text></text>
							<text style="font-size: 26rpx;margin-right:20rpx;">卖家服务<text
									style="color:#4a9aff">5.0</text></text>
							<text style="font-size: 26rpx;margin-right:20rpx;">物流服务<text
									style="color:#4a9aff">5.0</text></text>
						</view>
						<view class="view-shop-button">
							进店逛逛
						</view>
						<view class="view-shop-button2">
							全部宝贝
						</view>
					</view>
				</view>

			</view>
			<view style="margin-top: 20rpx;" class="view-product-details">
				<view class="view-product-details-title">
					商品详情
				</view>
				<view class="view-product-details-content" v-html="schoolInfo.goodsInfo"></view>
				<image :src="img" mode="widthFix" v-for="(img,i) in coverA" :key="i"></image>
			</view>

		</view>

		<view class="view-bottom">
			<view class="view-bottom-item" @click="goLetter()">
				<image src="@/static/images/kefu.svg" mode=""></image>
				<text>客服</text>
			</view>
			<view class="view-bottom-item" @click="collect">
				<image v-if="schoolInfo.collect" src="@/static/images/shoucangxiao-cheng.png" mode=""></image>
				<image v-else src="@/static/images/shoucang.png"></image>
				<text>收藏</text>
			</view>
			<!-- 	<view class="view-bottom-item" @click="uni.navigateTo({
			url:'../cart/cart'
		})"> -->
			<view class="view-bottom-item" @click="Gocart()">
				<image style="width: 70rpx;" src="@/static/images/cart2.png"></image>
				<text>购物车</text>
			</view>
			<!-- <view class="view-bottom-item">
				<image src="@/static/images/shoucang.png" mode=""></image>
				<text>收藏</text>
			</view> -->
			<!-- 	<view class="view-button" @click="showPop=true">
				加入购物车
			</view> -->
			<view class="view-button" @click="Goaddcart()">
				加入购物车
			</view>

			<view class="view-button" @click="shopInfo">
				立即购买
			</view>
		</view>
		<u-popup :show="show" :round="10" mode="bottom" @close="close">
			<view class="view-share">
				<text class="view-title">— 分享至 —</text>
				<view class="view-locat">
					<view class="view-item" @click="share(1)">
						<image class="image" src="../../static/images/weixin-2.png"></image>
						<text class="text-name">微信</text>
					</view>
					<view class="view-item" @click="share(2)">
						<image class="image" src="../../static/images/pengyouquan.png"></image>
						<text class="text-name">朋友圈</text>
					</view>
					<view class="view-item" @click="share(3)">
						<image class="image" src="../../static/images/weibo.png"></image>
						<text class="text-name">微博</text>
					</view>
					<view class="view-item" @click="share(4)">
						<image class="image" src="../../static/images/qq.png"></image>
						<text class="text-name">QQ</text>
					</view>
				</view>
			</view>
		</u-popup>


		<u-popup :show="show" :round="10" mode="bottom" @close="close">
			<!-- <view style="margin-bottom: 80rpx;" class="view-share">
				<text class="view-title">更多</text>
				<view class="view-locat">
					<view class="view-item" @click="share(1)">
						<image class="image" src="../../static/images/weixin-2.png"></image>
						<text class="text-name">微信</text>
					</view>
					<view class="view-item" @click="share(2)">
						<image class="image" src="../../static/images/pengyouquan.png"></image>
						<text class="text-name">朋友圈</text>
					</view>
					<view class="view-item" @click="share(3)">
						<image class="image" src="../../static/images/weibo.png"></image>
						<text class="text-name">微博</text>
					</view>
					<view class="view-item" @click="share(4)">
						<image class="image" src="../../static/images/qq.png"></image>
						<text class="text-name">QQ</text>
					</view>
				</view>
			</view> -->
			<view style="height: 280rpx;" class="view-share">
				<text class="view-title">更多</text>
				<!-- //////////////////////////////////////////// -->
				<view class="view-locat">
					<view @click="share(1)" class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/weixin2.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">微信好友</text>
					</view>
					<view @click="share(2)" class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/pyquan.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">朋友圈</text>
					</view>
					<view class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/kongjian.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">QQ空间</text>
					</view>
					<view @click="share(4)" class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/qq2.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">QQ好友</text>
					</view>
					<view class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/xinxi.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">私信</text>
					</view>
					<view @click="share(3)" class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/weibo2.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">微博</text>
					</view>
				</view>
			</view>
			<view style="height: 160rpx;" class="view-share">
				<view class="view-locat">
					<view class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/lianjie2.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">复制链接</text>
					</view>

					<view class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;margin-left: 20rpx;margin-top: 10rpx;">
							<image class="image" src="../../static/images/xiaoxi2.png"></image>
						</view>
						<text style="font-size: 26rpx;margin-top: 5rpx;" class="text-name">消息</text>
					</view>
					<view class="view-item" @click="goindex">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/shouye.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">回到首页</text>
					</view>
					<view class="view-item" @click="uni.navigateTo({url:'../cart/cart'})">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/cart3.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">购物车</text>
					</view>
					<view class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/zuji.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">足迹</text>
					</view>
					<view class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/kefu3.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">在线客服</text>
					</view>


					<!-- <view class="view-item">
						<image class="image" src="../../static/images/pengyouquan.png"></image>
						<text class="text-name">消息</text>
					</view>
					<view class="view-item">
						<image class="image" src="../../static/images/weibo.png"></image>
						<text class="text-name">回到首页</text>
					</view>
					<view class="view-item">
						<image class="image" src="../../static/images/qq.png"></image>
						<text class="text-name">购物车</text>
					</view>
					<view class="view-item">
						<image class="image" src="../../static/images/qq.png"></image>
						<text class="text-name">足迹</text>
					</view> -->
				</view>
			</view>

			<view style="margin-bottom: 80rpx;" class="view-share">
				<view class="view-locat">
					<view class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/yijian.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">意见反馈</text>
					</view>
					<view style="margin-right: 500rpx;" class="view-item">
						<view class="" style="width: 80rpx;height: 80rpx;">
							<image style="width: 100%;height: 100%;position: relative;top: 20%;left: 20%;" class="image"
								src="../../static/images/jubao.png"></image>
						</view>
						<text style="font-size: 26rpx;" class="text-name">举报</text>
					</view>

				</view>
			</view>
		</u-popup>



		<u-popup :show="showPop" @close="showPop=false" round="10">
			<view class="view-pop">
				<image class="image-pop-close" src="@/static/images/close.png" mode="" @click="showPop=false"></image>
				<view class="pop-top">
					<image :src="cover" mode=""></image>
					<view class="pop-info">
						<view class="price">
							<text>￥{{totalPrices.toFixed(2)}}</text>
							<text class="original-price">￥{{schoolInfo.originalPrice}}</text>
						</view>
						<view class="pop-desc">
							{{schoolInfo.goodsName}}
						</view>
					</view>
				</view>
				<view class="">
					<view class="view-pop-title">
						{{color.normName}}
					</view>
					<view class="pop-spec-list">
						<view class="view-spec-item" :class="specIndex===index?'view-spec-active':''"
							v-for="(item,index) in color.children" :key="index" @click="()=>{
								specIndex=index
								spec=item.normValue
								specId = item.id
								return ''
							}">
							{{item.normValue}}
						</view>
					</view>
				</view>

				<!-- 尺码 尺码 尺码 尺码 尺码 尺码 尺码 -->
				<view class="">
					<view class="view-pop-title">
						{{size.normName}}
					</view>
					<view class="pop-spec-list">
						<view class="view-spec-item" :class="specIndexs===index?'view-spec-active':''"
							v-for="(item,index) in size.children" :key="index" @click="()=>{
								specIndexs=index
								specs=item.normValue
								specIds = item.id
								return ''
							}">
							{{item.normValue}}
						</view>
					</view>
				</view>
				<view class="view-pop-title">
					数量<u-number-box v-model="num" :min="1" @change="numChange"></u-number-box>
				</view>
				<view class="view-button2" @click="addCart(schoolInfo.id,schoolInfo.storeId)">
					确定
				</view>
			</view>
		</u-popup>


		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	import {
		userDownloadAndriod,
		userDownloadIOS,
		DownloadMethods
	} from '@/static/js/configUrl.js'
	export default {
		data() {
			return {
				value: '',
				coverA: [],
				phone: '110010',
				scrollTop: 0,
				show: false,
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
				specIndexs: 0,
				spec: "", //颜色
				specs: "", //尺码
				specId: '', //颜色ID
				specIds: '', //尺码ID
				specList: ["电池/电源线哆啦A梦礼盒-白色", "充电款礼盒蓝", "电池/电源线哆啦A梦礼盒-粉色", "充电素描款-白色"],
				num: 1,
				height: "",
				schoolInfo: {},
				schoolImg: [],
				score: '',
				id: '',
				noticeList: [],
				storeId: '',
				businessInfo: {}, //商家信息
				cover: '',
				shareTypes: 'WXSceneSession',
				isShare: false,
				device: '',
				invitationCode: '',
				user: '',
				price: '',
				color: {},
				size: {}
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		onShow() {
			this.user = uni.getStorageSync('userInfo').id || 0
			// 获取评论分数
			this.getScore()
			// 获取评论列表
			this.getNoticeList()
			console.log(this.id)
			if (this.value == '') {
				if (this.user != 0)
					this.getList()
			}


			/////
			let that = this
			uni.$on('updateData', function(data) {
				console.log(data.value)
				that.value = data.value
			})
		},
		onLoad(option) {
			this.id = option.id
			this.invitationCode = option.invitationCode
			this.isShare = option.isShare || false
			// console.log(">>>>>>>>>>>>>", this.isShare)
			this.getShopList() //获取商品信息
			this.messageShowTip.showTextMessage(this)
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
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

			Goaddcart() {
				DownloadMethods(this.isShare, this.showPop = true, this.invitationCode)

			},
			Gocart() {
				console.log(this.isShare);
				DownloadMethods(this.isShare, uni.navigateTo({
					url: '../cart/cart'
				}), this.invitationCode)
			},
			//收货地址
			async getList() {
				let res = await this.http.get('/app/address/list', {});
				console.log(res)
				if (res.code == 200) {
					let value = res.data.filter(item => item.isDefault == 1)
					console.log(value)
					this.value = value[0].consigneeHouseNumber
				} else {

				}
			},
			goindex() {
				// console.log(111111)
				uni.navigateTo({
					url: '../index/index'
				})
				// console.log(22222)
			},
			share(val) {
				if (val == 1) {
					this.fenxiang('weixin')
					this.shareTypes = 'WXSceneSession'
				} else if (val == 2) {
					this.fenxiang('weixin')
					this.shareTypes = 'WXSceneTimeline'
				} else if (val == 3) {
					this.fenxiang('sinaweibo')
					this.shareTypes = 'WXSceneSession'
				} else {
					this.fenxiang('qq')
					this.shareTypes = 'WXSceneSession'
				}
			},
			share(val) {
				switch (val) {
					case 1:
						this.fenxiang('weixin', 'WXSceneSession')
						break;
					case 2:
						this.fenxiang('weixin', 'WXSceneTimeline')
						break;
					case 3:
						this.fenxiang('sinaweibo', '')
						break;
					case 4:
						this.fenxiang('qq', '')
						break;
				}
			},
			fenxiang(shareType, shareTypes) {
				uni.share({
					provider: shareType,
					scene: shareTypes,
					type: 0,
					href: this.shareUrlList.marketUrl({
						id: this.id
					}),
					title: this.schoolInfo.goodsInfo,
					summary: this.schoolInfo.goodsDesc,
					imageUrl: this.schoolInfo.goodsCover,
					success: (res) => {
						this.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// 转发成功获取积分
			async getIntegral() {
				let res = await this.http.post('/app/forum/topic/rePostTopics', {
					topicId: this.id,
					platform: ''
				});
				console.log(21323123213, res);
				if (res.code == 200) {
					// this.$toast(res.msg);
					// this.show = false
				} else {
					this.$toast('分享失败');
				}
			},
			shopInfo() {
				DownloadMethods(this.isShare, this.shopInfos(), this.invitationCode)
			},
			shopInfos() {
				if (this.num == 1) {
					uni.navigateTo({
						url: '../market-submit-order/market-submit-order?id=' + this.id + '&storeType=' + this
							.schoolInfo.storeType + '&numbers=' + this.num
					})
				} else {
					this.$toast('请先选择规格后购买');
				}
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
			// 添加购物车
			addCart(val, storeId) {
				if (this.num == 0) {
					this.showPop = true
					this.$toast('请先选择商品数量');
				} else {
					this.postAddCart(storeId)
				}
			},
			// 添加购物车
			async postAddCart(storeId) {
				let res = await this.http.postJson('/app/car/save', {
					addNum: this.num,
					goodsId: this.id,
					normValueId: this.specId,
					storeId: storeId,
				});
				if (res.code == 200) {
					this.$toast(res.msg)
					this.showPop = false
				} else {
					this.$toast(res.msg);
				}
			},

			// 收藏
			collect() {
				//调用是否分享判断方法
				DownloadMethods(this.isShare, this.postCollect(), this.invitationCode)

			},
			// 收藏
			async postCollect() {
				let res = await this.http.post('/app/userHomeNavigation/collectOrUnCollect', {
					parentId: this.id,
					typeId: 0,
				});
				if (res.code == 200) {
					if (res.data == 1) {
						this.$toast("收藏成功")
						this.getShopList()
					} else {
						this.$toast("取消收藏")
						this.getShopList()
					}
				} else {
					this.$toast(res.msg);
				}
			},
			// 获取评论列表
			async getNoticeList() {
				let res = await this.http.get('/app/storeProductReply/listUserReply', {
					goodsId: this.id,
					pageNum: 1,
					pageSize: 1,
				});
				if (res.code == 200) {
					this.noticeList = res.rows
					for (let item of res.rows) {
						if (item.pics) {
							item.pics = this.strToArray(item.pics)
						} else {
							item.pics = item.pics
						}
					}
				} else {
					// this.$toast(res.msg);
				}
			},
			// 获取商品信息
			async getShopList() {

				let data = {
					isShare: 1,
					id: this.id,
				}
				if (this.isShare) {
					data.shareStatus = true
				}
				let res = await this.http.get('/app/goods/info', data);
				console.log('获取商品信息', res);
				if (res.code == 200) {
					this.storeId = res.data.storeId
					this.schoolInfo = res.data
					console.log('@@@@@@@@@@@@@@@@@@@@', this.schoolInfo.bgoodsNormList)
					this.color = this.schoolInfo.bgoodsNormList[0]
					console.log('111111111', this.color)
					console.log(this.schoolInfo.bgoodsNormList)
					if (this.schoolInfo.bgoodsNormList.length > 1) {
						this.size = this.schoolInfo.bgoodsNormList[1]
					} else {
						this.size = this.schoolInfo.bgoodsNormList[0]
					}
					console.log('222222222222222', this.size)
					//商品价格
					this.price = this.schoolInfo.sellPrice
					this.cover = this.getCover(res.data.goodsCover);
					this.coverA = res.data.goodsCover.split(',');
					this.schoolImg = this.strToArray(res.data.goodsImg);
					for (let item of this.schoolImg) {
						if (item == '') {
							this.schoolImg = this.schoolImg.splice(0, this.schoolImg.length - 1)
						} else {
							this.schoolImg = this.schoolImg
						}
					}
					console.log(this.schoolImg)
					this.getBusinessInfo()
				} else {
					this.$toast(res.msg);
					// this.$toast('用户信息异常');
				}
			},
			// 获取商家信息
			async getBusinessInfo() {
				let res = await this.http.get('/app/goodsStore/getInfo', {
					isShare: 1,
					id: this.storeId
				});
				if (res.code == 200) {
					this.businessInfo = res.data
				} else {
					// this.$toast(res.msg);
					this.$toast('用户信息异常');
				}
			},
			close() {
				this.show = false
			},
			// 获取评论分数
			async getScore() {
				let res = await this.http.get('/app/storeProductReply/replyCompositeScore', {
					goodsId: this.id,
				});
				if (res.code == 200) {
					this.score = res.data
				} else {
					// this.$toast(res.msg);
				}
			},
			numChange() {

			},
			goLetter() {
				//调用是否分享判断方法
				DownloadMethods(this.isShare, this.goLetters(), this.invitationCode)
			},
			//私信
			async goLetters() {
				let res = await this.IM.getUserInfo(this.businessInfo.phoneNum)
				let userInfo = res.data[this.businessInfo.phoneNum]
				console.log(userInfo)
				let data = {
					username: this.businessInfo.phoneNum,
					nickname: userInfo.nickname,
					avatarurl: userInfo.avatarurl,
				}
				let newData = encodeURIComponent(JSON.stringify(data))
				uni.navigateTo({
					url: '../private-letter/private-letter?data=' + newData
				})
			}
		},
		computed: {
			totalPrices() {
				return this.num * this.price
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rrr {
		// display: inline-block;
		// vertical-align: middle;
		position: relative;
		bottom: 5rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.view-button2 {
		width: 90%;
		margin: auto;
		text-align: center;
		background-color: #4a9aff;
		line-height: 60rpx;
		border-radius: 30rpx;
		position: relative;
		top: 200rpx;



		background: #4A9AFF;
		box-shadow: 0px 4rpx 12rpx 0px rgba(19, 98, 198, 0.43);
		border-radius: 40rpx;
		text-align: center;
		line-height: 70rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
	}

	.view-share {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: #f3f3f3;
		width: 750rpx;
		height: 180rpx;
		padding: 0 10rpx;
		flex-direction: column;
		align-items: center;

		.view-title {
			text-align: center;
			display: block;
			margin: 50rpx auto;
		}

		.view-locat {
			width: 750rpx;
			height: 60rpx;
			flex-direction: row;
			align-items: center;
			// margin-top: 66rpx;
			display: flex;

			.image {
				width: 87rpx;
				height: 87rpx;
			}

			.text-name {
				text-align: center;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				margin-top: 14rpx;
				display: block;
			}

			.view-item {
				flex: 1;
				flex-direction: column;
				align-items: center;

				&:first-child {
					margin-left: 0rpx;
				}

				image {
					width: 86rpx;
					height: 86rpx;
				}

				view {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}
			}
		}

	}


	.text-price {
		font-size: 48rpx;
		line-height: 48rpx;
	}

	.view-price {
		font-size: 40rpx;
		font-weight: bold;
		color: #FF0000;
		line-height: 40rpx;
	}

	.view-original-price {
		font-size: 20rpx;
		font-weight: bold;
		text-decoration: line-through;
		color: #999999;
		line-height: 40rpx;
	}

	.view-rush-buy-price {
		display: flex;
		padding: 30rpx 0rpx;
		// justify-content: space-between;

		// .view-price {
		// 	font-size: 40rpx;
		// 	font-weight: bold;
		// 	color: #FF0000;
		// 	line-height: 40rpx;
		// }

		// .view-original-price {
		// 	font-size: 20rpx;
		// 	font-weight: bold;
		// 	text-decoration: line-through;
		// 	color: #999999;
		// 	line-height: 40rpx;
		// }

		.text-right {
			// background: rgba(74, 154, 255, 0.05);
			// border: 1rpx solid #4A9AFF;
			// border-radius: 3rpx;
			// margin-left: 40rpx;
			display: flex;
			align-items: center;
			padding: 0 5rpx;
			// margin-right: 40rpx;
			font-size: 24rpx;
			color: #ababab;
			line-height: 20rpx;
		}
	}

	.view-container {
		width: 100%;
		font-family: PingFang SC;
		background-color: #F7F7F7;

		.view-nav {
			width: 100%;
			height: 88rpx;
			position: fixed;
			display: flex;
			// justify-content: space-between;
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
				// margin-left: 200rpx;
				margin-left: 90%;

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

		.view-rush-buy {
			width: 100%;
			height: 110rpx;
			background: linear-gradient(90deg, #E1438F 0%, #E93560 100%);

			.view-rush-buy-inner {
				width: 100%;
				height: 100%;
				background-size: 100%;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				image {
					width: 70rpx;
					height: 70rpx;
					margin-right: 22rpx;
				}

				.view-rush-buy-price {
					width: 100%;
					display: flex;
					flex-direction: column;
					color: #FFFFFF;
					flex-grow: 1;

					text {
						font-size: 30rpx;
					}

					.view-price {
						display: flex;

						text {
							height: 48rpx;
							line-height: 60rpx;
						}

						// .text-price {
						// 	font-size: 48rpx;
						// 	line-height: 48rpx;
						// }
					}

					.view-original-price {
						font-size: 20rpx;
						line-height: 36rpx;
						opacity: 0.5;
					}
				}

				.view-rush-time {
					font-size: 24rpx;
					color: #E93560;

					.view-rush-timebox {
						display: flex;
						font-weight: bold;
						align-items: center;
						margin-top: 10rpx;

						text {
							margin: 0 4rpx;
							display: block;
							width: 36rpx;
							height: 44rpx;
							background: #E93560;
							border-radius: 4rpx;
							font-family: PingFang;
							color: #FFFFFF;
							line-height: 44rpx;
							text-align: center;
						}
					}
				}

			}

		}

		.view-desc {
			width: 95%;
			margin: auto;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			padding: 0 30rpx;
			margin-bottom: 20rpx;

			.view-goods-name {
				font-weight: 600;
				font-size: 31rpx;
				padding: 20rpx 0 0;
			}

			.view-product-name {
				padding: 30rpx 0;
				color: #333333;
				border-bottom: 1px solid #EFEFEF;
			}

			.view-spec {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				padding: 14rpx 0;

				.view-spec-title {
					margin-right: 33rpx;
					color: #999999;
				}

				.view-spec-name {
					width: 80%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
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
			margin: auto;
			border-radius: 20rpx;
			width: 95%;
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
			width: 95%;
			margin: auto;
			border-radius: 20rpx;
			padding: 30rpx 30rpx 10rpx;
			background-color: #FFFFFF;

			.view-shop-intro {
				display: flex;
				margin-bottom: 50rpx;

				image {
					width: 140rpx;
					height: 140rpx;
					margin-right: 20rpx;
				}

				.view-shop-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.view-shop-name {
						font-size: 36rpx;
						font-weight: bold;
						color: #333333;
					}

					.view-shop-desc {
						font-size: 24rpx;
						font-weight: bold;
						color: #666666;
					}

					.view-shop-button {
						width: 120rpx;
						height: 40rpx;
						border: 1px solid #4a9aff;
						// background: #4A9AFF;
						border-radius: 20rpx;
						color: #4A9AFF;
						border-radius: 20rpx;
						text-align: center;
						line-height: 40rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						position: relative;
						left: 30rpx;
						top: 40rpx;
					}

					.view-shop-button2 {
						width: 120rpx;
						height: 40rpx;
						border: 1px solid #4a9aff;
						// background: #4A9AFF;
						border-radius: 20rpx;
						color: #4A9AFF;
						border-radius: 20rpx;
						text-align: center;
						line-height: 40rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: bold;
						position: relative;
						left: 200rpx;
					}
				}
			}

			.view-product-details-title {
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 30rpx;
			}

			image {
				width: 100%;
				height: 1044rpx;
				vertical-align: bottom;
			}
		}

		.view-bottom {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 30rpx 10rpx;
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

			.view-button:active {
				background-color: #0055ff;
			}

			.view-button {
				margin-top: 5rpx;
				width: 220rpx;
				height: 70rpx;
				background: #4A9AFF;
				box-shadow: 0px 4rpx 12rpx 0px rgba(19, 98, 198, 0.43);
				border-radius: 40rpx;
				text-align: center;
				line-height: 70rpx;
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
