<template>
	<view>
		<view class="child-nav" :style="'top:'+statusBarHeight+'rpx;'">
			<image class="image-fanhui" src="../../static/images/31fanhui1.png" @click="uni.navigateBack({})"></image>
			<view class="view-customer" @click="goLetter()">
				<image class="image-customer" src="../../static/images/kefu.png" mode=""></image>
				<view class="text-customer">在线客服</view>
			</view>
		</view>
		<view class="view-background">
			<image class="image-background" :src="introduce.backgroundImage"></image>
			<view class="view-brief">
				<view class="view-title">
					<text class="text-title">{{introduce.schoolName}}</text>
					<view class="view-grade">Lv.<text>{{introduce.level}}</text></view>
					<view class="view-rate">
						<image class="image-rate" src="../../static/images/retes.png" mode=""></image>
						<text class="text-rate">{{Number(introduce.score).toFixed(1)}}分</text>
					</view>
				</view>
				<view class="view-propagate">{{introduce.schoolTitle}}</view>
				<view class="view-contact">
					<text class="text-phone">联系电话：{{introduce.phone}}</text>
					<view class="view-address">
						<text class="text-address">{{introduce.schoolAddress}}</text>
						<image class="image-avatar" src="../../static/images/location.png"
							@click="location(introduce.latitude,introduce.longitude)"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="view-switch">
			<view class="view-tab1">
				<u-tabs :current="numbs" :list="tab1List" :activeStyle="{color:'#4A9AFF',fontSize: '32rpx',
			fontWeight: '500'}" :inactiveStyle="{ fontSize: '32rpx', color: '#999999' }" @change="(e)=>{
				bridf(e.index+1)
				return ''
			}"></u-tabs>
			</view>
			<view class="view-content" v-if="tabIndex==1">
				
					<view class="view-introduction">
						<text class="text-title">详细介绍</text>
						<view class="view-details">
							<view class="view-line"></view>
							<view class="view-describe u-line-5">
								{{introduce.detailedIntroduction}}
							</view>
						</view>
					</view>
					<view class="view-introduction">
						<text class="text-title">师资力量</text>
						<view class="view-details">
							<view class="view-line"></view>
							<view class="view-describe u-line-5">
								{{introduce.faculty}}
							</view>
						</view>
					</view>
					<view class="view-teacher" v-if="teacherList!=null">
						<text class="view-title">名师展示</text>
						<view class="view-list">
							<view class="view-item" v-for="item in teacherList" @click="uni.navigateTo({
							url:'../teacher/teacher?teacherId='+item.id
						})">
								<image class="image-avatar" :src="item.teacherUrl"></image>
								<view class="view-name">{{item.teacherName}}</view>
								<text class="text-brief u-line-2">{{item.teacherIntroduce}}</text>
							</view>
						</view>
					</view>
					<view class="view-education">
						<text class="view-title">教育环境</text>
						<image class="video-content" :class="zhanshi==0?'':'video-contents'" v-if="zhanshi==0"
							@click="bofang" src="../../static/images/16411961745.jpg"></image>
						<video class="video-content shipin" :autoplay="zhanshi!=0?'autoplay':''" v-else
							:src="introduce.environmentVideo" controls show-fullscreen-btn></video>
					</view>
					<view class="view-education">
						<text class="view-title">机构照片</text>
						<u-swiper :list="mechanism" :indicator="true" indicatorMode="dot"
							indicatorInactiveColor="rgba(255, 255, 255, 0.4)" height="350rpx"></u-swiper>
					</view>
			</view>
			<view class="view-content" v-if="tabIndex==2">
				<view class="view-tab2">
					<u-tabs :list="classifyList" keyName="label" :activeStyle="{color:'#4A9AFF',lineColor:'#4A9AFF',fontSize: '28rpx',
				fontWeight: '400'}" :inactiveStyle="{ fontSize: '28rpx', color: '#999999' }" @click="(e)=>{
				shopClick(e.id)
				return ''
			}"></u-tabs>
				</view>
				<view class="view-lists" v-if="shopList.length != 0">
					<view class="view-item" v-for="item in shopList" @click="uni.navigateTo({
						url:'../school-product-info/school-product-info?id='+item.id
					})">
						<image class="image-shopIng" :src="item?item.goodsImg.split(',')[0]:''"></image>
						<view class="view-name u-line-1">{{item.goodsDesc}}</view>
						<text class="text-sales">销量{{item.salesNum}}</text>
						<view class="view-price">￥{{item.sellPrice}}<text>￥{{item.originalPrice}}</text></view>
					</view>
				</view>
				<view v-else class="none">
					暂无数据
				</view>
			</view>
			<view class="view-content" v-if="tabIndex==3">
				<view v-if="evaluateList.length != 0">
				<view class="view-rate" v-for="item in evaluateList">
					<image class="image-person" :src="item.headUrl"></image>
					<view class="view-brief">
						<view class="view-person">{{item.nickName}}</view>
						<view class="view-time">2021-08-18 14:58:21</view>
						<view class="view-details u-line-1">{{item.schoolContent}}</view>
					</view>
				</view>
				</view>
				<view class="none" v-else>
					暂无数据
				</view>
			</view>
			<view class="view-content" v-if="tabIndex==4">
				<view class="view-curriculum">
					<view class="view-item" v-for="item in courseList" @click="uni.navigateTo({
						url:'../course-list/course-list?typeId='+item.id+'&schoolId='+val
					})">
						<text class="text-name">{{item.school_type_name}}</text>
						<image class="image-avatar" src="../../static/images/arrow_right.png"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="view-bottom">
			<view class="view-item" @click="collect">
				<image class="image"
					:src="collects==true?'../../static/images/collect2.png':'../../static/images/shoucang.png'">
				</image>
				<text class="text-collect">关注</text>
			</view> -->
		<!-- <view class="view-item" @click="show = true"> -->
		<!-- 	<view class="view-item" @click="Goshare()">
				<image class="image" src="../../static/images/fenxiang.png"></image>
				<text class="text-collect">分享</text>
			</view>
			<view class="view-item-last" v-show="introduce.schoolTypeId!=='2'" @click="to">
				<text class="text-pay">缴纳学费</text>
			</view>
		</view> -->
		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
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

	</view>
</template>

<script>
	// const subNVue_share = uni.getSubNVueById('child-details-share')
	import {
		DownloadMethods
	} from '@/static/js/configUrl.js';
	export default {
		data() {
			return {
				phone: '110010',
				bannerList: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				zhanshi: 0,
				screens: 1,
				show: false,
				course: false,
				collects: '',
				numbs: 0,
				tabIndex: 1,
				tab1List: [{
						name: '介绍',
					}, {
						name: '商城',
					},
					{
						name: '评价'
					},
					{
						name: '课程'
					},
				],
				val: '',
				introduce: {},
				evaluateList: [],
				courseList: [],
				teacherList: [], //教师列表
				mechanism: [], //机构轮播
				classifyList: [], //商城
				shopList: [], //商品
				valId: "",
				schoolTypeId: '', // 学校类型
				collectList: {}, //商品
				shareTypes: 'WXSceneSession',
				isShare: false,
			}
		},
		onLoad(options) {
			this.isShare = options.isShare || false
			console.log(">>>>>>>>>>>>>", this.isShare)
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$$', options)
			this.val = options.id
			this.numbs = options.schoolType
			this.types = options.types
			if (this.types == 1) {
				this.tab1List.length = 3
			}
			if (this.types == 2) {
				this.tab1List.length = 4
			}
			if (this.types == 3) {
				this.tab1List.length = 1
			}
			if (this.types == 4) {
				this.tab1List.length = 4
			}
			if (this.types == 5) {
				this.tab1List.length = 1
			}
			this.tabIndex = Number(options.typeId) + 1 || 1
		},
		async mounted() {
			console.log(this.tabIndex)
			await this.getIntroduce()
			await this.getevaluate()
			await this.getcourse()
			await this.getShopclassifyList()
			await this.getshopList()
			// uni.$on("toStudentMessage", (res) => {
			// 	uni.navigateTo({
			// 		url: '../student-message/student-message?id='+this.val+'&schoolTypeId='+this.introduce.schoolTypeId
			// 	})
			// })
			// // 打开 nvue 子窗体
			// subNVue_share.setStyle({
			// 	position: 'dock',
			// 	dock: "bottom",
			// 	left: '0px',
			// 	right: '0px',
			// 	width: '100%',
			// })
			// uni.$on("showShare", () => {
			// 	subNVue_share.show('slide-in-bottom', 300, function() {
			// 	});
			// })
			// const subNVue_footer = uni.getSubNVueById('child-details-footer')
			// subNVue_footer.setStyle({
			// 	position: 'dock',
			// 	dock: "bottom",
			// 	left: '0px',
			// 	right: '0px',
			// 	width: '100%',
			// 	height: '50rpx',
			// });

			// uni.$on("collect", () => {
			// 	// console.log("调用收藏接口");
			// 	this.getcollect()
			// 	this.getIntroduce()
			// 	// console.log("收藏接口返回");
			// 	uni.$emit("collectResult", this.collectList);
			// });
		},
		methods: {
			Goshare() {
				DownloadMethods(this.isShare, this.show = true)

			},
			// 打开地图导航
			location(lat, lon) {
				uni.openLocation({
					latitude: lat,
					longitude: lon,
					success: function() {
						console.log('success');
					}
				});
			},

			// 分享
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
				let that = this;
				uni.share({
					provider: shareType,
					scene: shareTypes,
					type: 0,
					// href: "http://47.103.30.184:9227/h5/index.html#/pages/course-details/course-details?id=" + this
					// 	.val + "&typeId=" + this.numbs,
					href: this.shareUrlList.academylUrl({
						id: this.val,
						"typeId": this.numbs
					}),
					title: this.introduce.schoolName,
					summary: this.introduce.schoolTitle,
					imageUrl: this.introduce.logoImgUrl,
					success: function(res) {
						that.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},


			// 转发成功获取积分
			async getIntegral() {
				let res = await this.http.post('/app/forum/topic/rePostTopic', {
					topicId: this.ids,
					platform: ''
				});
				if (res.code == 200) {
					this.$toast('分享成功');
					this.show = false
				} else {
					// this.$toast(res.msg);
					// this.$toast('已取消');
					this.show = false
					console.log(res)
					console.log(res.msg)
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
			collect() {
				DownloadMethods(this.isShare, this.getcollect())

			},
			to() {
				DownloadMethods(this.isShare, uni.navigateTo({
					url: '../student-message/student-message?id=' + this.val + '&schoolTypeId=' + this
						.introduce
						.schoolTypeId
				}))

			},
			bofang() {
				this.zhanshi = 1
			},
			async shopClick(val) {
				this.valId = val
				console.log(this.valId)
				await this.getshopList()
			},
			async getcollect() {
				let submit = {
					parentId: this.val,
					typeId: 2,
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.post('/app/userHomeNavigation/collectOrUnCollect', submit);
				if (res.code == 200) {
					this.$toast(res.msg);
					this.getIntroduce()
				} else {
					this.$toast(res.msg);
				}
			},
			bridf(ids) {
				console.log(ids, '5555555')
				this.tabIndex = ids
				if (ids === 1) {
					this.getIntroduce()
				} else if (ids === 2) {
					this.getShopclassifyList()
				} else if (ids === 3) {
					this.getevaluate()
				}
			},
			screen(type) {
				this.screens = type
			},
			open() {},
			close() {
				this.show = false
			},

			// 商城商品
			async getshopList() {
				let submit = {
					storeType: 2,
					pageSize: 10,
					pageNum: 1,
					typeId: this.valId,
					storeId: this.val,
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/goods/list', submit);
				if (res.code == 200) {
					this.shopList = res.rows
				} else {
					this.$toast(res.msg);
				}
			},

			// 商城分类
			async getShopclassifyList() {
				let submit = {
					type: 1,
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/type/listType', submit);
				if (res.code == 200) {
					this.classifyList = res.data
				} else {
					this.$toast(res.msg);
				}
			},

			// 学校介绍
			async getIntroduce() {
				let submit = {
					id: this.val
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/userHomeNavigation/schoolIntroduceInfo', submit);
				if (res.code == 200) {
					console.log(res, '111111111111')
					this.collectList = res.data.collect
					this.introduce = res.data.schoolInfo
					this.mechanism = res.data.schoolInfo.institutionsImage.split(',')
					this.teacherList = res.data.teachersInfoList
					this.schoolTypeId = res.data.schoolInfo.schoolTypeId
					this.collects = res.data.collect
					console.log('信息信息信息信息', this.introduce)
				} else {
					this.$toast(res.msg);
				}
			},

			// 评论列表
			async getevaluate() {
				let res = await this.http.get('/app/userHomeNavigation/schoolCommentList', {
					id: this.val
				});
				if (res.code == 200) {
					console.log(res.data)
					this.evaluateList = res.data
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取课程列表
			async getcourse() {
				let submit = {
					schoolId: this.val
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/userHomeNavigation/courseTypeList', submit);
				if (res.code == 200) {
					console.log(res.data)
					this.courseList = res.data
				} else {
					this.$toast(res.msg);
				}
			},

			//私信
			async goLetter() {
				if (this.isShare) {
					if (uni.getSystemInfoSync().platform == 'android') {

						uni.redirectTo({
							url: '/pages/downloadAorI/downloadAorI?href=' + "https://www.pgyer.com/NgGP"
						})
					} else if (uni.getSystemInfoSync().platform == 'ios') {
						uni.redirectTo({
							url: '/pages/downloadAorI/downloadAorI?href=' +
								"itms-apps://itunes.apple.com/cn/app/iduni.UNI419986E?mt=8"
						})
					}

				} else {
					let res = await this.IM.getUserInfo(this.introduce.phone)
					let userInfo = res.data[this.introduce.phone]
					let data = {
						username: this.introduce.phone,
						nickname: userInfo.nickname,
						avatarurl: userInfo.avatarurl,
						schoolName: this.introduce.schoolName
					}
					console.log(data)
					let newData = encodeURIComponent(JSON.stringify(data))
					uni.navigateTo({
						url: '../private-letter/private-letter?data=' + newData
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.view-share {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		height: 409rpx;
		padding: 45rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.view-locat {
			display: flex;
			align-items: center;
			width: 100%;
			margin-top: 86rpx;

			.view-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 86rpx;
					height: 86rpx;
				}

				.text-name {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					margin-top: 14rpx;
				}
			}
		}
	}

	.view-bottom {
		width: 750rpx;
		height: 98rpx;
		flex-direction: row;
		background-color: #FFFFFF;
		z-index: 999;
		align-items: center;
		padding: 0rpx 30rpx;
		position: fixed;
		bottom: 0rpx;
		display: flex;
	}

	.text-pay {
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
	}

	.view-item {
		display: flex;
		padding: 0 14rpx;
		align-items: center;
		flex-direction: column;
	}

	.view-item-last {
		width: 500rpx;
		height: 74rpx;
		padding: 14rpx;
		background: #4A9AFF;
		box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(19, 98, 198, 0.43);
		border-radius: 40rpx;
		margin-left: 45rpx;
		align-items: center;
		text-align: center;
		flex-direction: column;
		justify-content: center;
	}

	.image {
		width: 40rpx;
		height: 40rpx;
	}

	.text-collect {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		display: block;
		text-align: center;
		margin-top: 4rpx;
	}

	/deep/.u-tabs__wrapper__nav__line {
		background-color: #007AFF !important;
	}


	/deep/.u-popup__content {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
	}


	.view-switch {
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0px 0px;
		margin-top: -50rpx;
		background-color: #FFFFFF;
		position: relative;
		z-index: 99;
		padding-bottom: 130rpx !important;

		.view-content {

			.view-curriculum {
				.view-item {
					display: flex;
					align-items: center;
					width: 100%;
					height: 80rpx;
					background: #F6F6F6;
					border-radius: 10rpx;
					padding: 0rpx 30rpx;
					margin-top: 30rpx;
					flex-direction: inherit !important;

					.image-avatar {
						width: 13rpx;
						height: 21rpx;
						margin-left: auto;
					}
				}
			}

			.view-rate {
				width: 100%;
				display: flex;
				margin-top: 30rpx;
				border-bottom: 1rpx solid #EFEFEF;
				padding-bottom: 30rpx;

				.image-person {
					width: 60rpx;
					height: 60rpx;
					border-radius: 10rpx;
				}

				.view-brief {
					flex-grow: 1;
					flex-shrink: 1;
					margin-left: 20rpx;

					.view-person {
						font-size: 28rpx;
						font-weight: 400;
						color: #666666;
					}

					.view-time {
						font-size: 20rpx;
						font-weight: 400;
						color: #999999;
					}

					.view-details {
						font-size: 28rpx;
						font-weight: 400;
						color: #333333;
					}
				}
			}

			.view-lists {
				display: flex;
				flex-wrap: wrap;

				.view-item {
					width: 330rpx;
					margin-top: 30rpx;

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
						padding: 0rpx 10rpx;
					}
				}
			}

			.view-education {
				margin-top: 40rpx;

				/deep/.u-swiper {
					margin-top: 40rpx;
				}

				.video-contents {
					display: none !important;
				}

				.video-content {
					width: 100%;
					height: 390rpx;
					display: block;
					margin-top: 30rpx;
				}

				.view-title {
					font-size: 36rpx;
					font-weight: 500;
					color: #333333;
					display: block;
				}
			}
			.none {
				width: 200rpx;
				height: 30px;
				color: #aaa;
				font-size: 40rpx;
				text-align: center;
				margin: 100rpx auto;
			}
			.view-teacher {
				font-size: 36rpx;
				font-weight: 500;
				color: #333333;
				margin-top: 40rpx;

				.view-list {
					margin-top: 30rpx;
					display: flex;
					overflow-x: scroll;

					.view-item {
						width: 276rpx;
						margin-left: 20rpx;

						&:first-child {
							margin-left: 0rpx;
						}

						.image-avatar {
							width: 276rpx;
							height: 240rpx;
							border-radius: 10rpx 10rpx 0rpx 0rpx
						}

						.view-name {
							font-size: 28rpx;
							font-weight: 500;
							color: #333333;
						}

						.text-brief {
							font-size: 24rpx;
							font-weight: 400;
							color: #666666;
						}
					}
				}
			}

			.view-introduction {
				margin-top: 40rpx;

				.view-details {
					margin-top: 26rpx;
					display: flex;

					.view-describe {
						flex-grow: 1;
						flex-shrink: 1;
						margin-left: 12rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #333333;
					}

					.view-line {
						width: 16rpx;
						height: 16rpx;
						margin-top: 15rpx;
						border-radius: 50%;
						background: #4A9AFF;
					}
				}

				.text-title {
					font-size: 36rpx;
					font-weight: 500;
					color: #333333;
				}
			}
		}

		.view-tab2 {

			/deep/.u-tabs__wrapper__nav {
				.u-tabs__wrapper__nav__item {
					flex: 0;
				}
			}
		}
	}

	.view-background {
		width: 100%;

		.image-background {
			width: 100%;
			height: 679rpx;
		}

		.view-brief {
			position: absolute;
			width: 100%;
			top: 350rpx;
			padding: 30rpx;

			.view-contact {
				margin-top: 40rpx;

				.text-phone {
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.7);
				}

				.view-address {
					display: flex;

					.text-address {
						font-size: 24rpx;
						font-weight: 400;
						color: rgba(255, 255, 255, 0.7);
					}

					.image-avatar {
						width: 29rpx;
						height: 36rpx;
						margin-left: auto;
					}
				}
			}

			.view-propagate {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.8);
				margin-top: 25rpx;
			}

			.view-title {
				display: flex;
				align-items: center;

				.text-title {
					font-size: 40rpx;
					font-weight: 500;
					color: #FFFFFF;
				}

				.view-rate {
					display: flex;
					align-items: center;
					background: #FC6129;
					border-radius: 15rpx;
					padding: 2rpx 20rpx;
					margin-left: 20rpx;

					.image-rate {
						width: 20rpx;
						height: 20rpx;
						display: block;
					}

					.text-rate {
						color: #FFFFFF;
						font-size: 14rpx;
					}
				}

				.view-grade {
					padding: 4rpx 20rpx;
					background: #4A9AFF;
					border-radius: 15rpx;
					color: #FFFFFF;
					font-size: 14rpx;
					text-align: center;
					line-height: 26rpx;
					margin-left: 20rpx;
				}
			}
		}
	}

	.child-nav {
		position: fixed;
		width: 100%;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		z-index: 999;

		.image-fanhui {
			width: 16rpx;
			height: 28rpx;
		}

		.view-customer {
			margin-left: auto;

			.image-customer {
				width: 46rpx;
				height: 48rpx;
				margin: 0 auto;
				display: block;
			}

			.text-customer {
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
			}

		}
	}
</style>