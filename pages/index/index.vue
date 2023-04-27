<template>
	<view class="content">
		<u-popup :show="show1" mode="center" :closeable="closeables" @close="closes">
			<view class="my-centers">
				<view class="tents">
					<view style="margin-bottom: 3px;color: #000000;font-weight: 1000;font-size: 20px;">
						新版本来袭
					</view>
					<view style="color: #909090;font-size: 15px;margin: 4px 0;" v-for="(item,index) in listyy"
						:key="index">{{item}}</view>
					<u-button class="btn" text="立即更新" @click="gxtye"></u-button>
				</view>

			</view>
		</u-popup>
		<!-- 进度条 -->
		<u-popup :show="show2" mode="center">
			<view class="progress">
				<view class="app">
					<text style="font-size: 20px;">升级app</text>
				</view>
				<view class="update">
					<text>正在为您更新，请耐心等待</text>
				</view>
				<view class="lineProgress">
					<u-line-progress :percentage="progress" activeColor="red"></u-line-progress>
				</view>
			</view>
		</u-popup>
		<view class="nav-bar" :style="'background-color:'+bg+''">
			<view class="status-bar"></view>
			<view class="view-header">
				<image @click="uni.navigateTo({
				url:'../choose-city/choose-city?city='+city
			})" src="../../static/images/weizhis.png" class="image-location"></image>
				<text class="text-city" @click="uni.navigateTo({
				url:'../choose-city/choose-city?city='+city
			})">{{city}}</text>
				<view class="view-search" @click="uni.navigateTo({
				url:'../search/search'
			})">
					<image src="../../static/images/search.png" class="image-search"></image>
					<text>搜索</text>
				</view>
				<image class="image-top-right" src="../../static/images/rili.png" @click="uni.navigateTo({
				url:'../report/report'
			})"></image>
				<image class="image-top-right-add" src="../../static/images/add1.png"
					@click="popHeight=popHeight===0?335:0"></image>
			</view>

			<view class="view-pop" :style="'height:'+ popHeight+'rpx'">
				<view class="view-items" @click="uni.scanCode({

			})">
					<image src="../../static/images/scan.png"></image>
					<text class="">扫一扫</text>
				</view>
				<view class="view-items" @click="deal">
					<image src="../../static/images/fabujishu.png"></image>
					<text class="">发表帖子</text>
				</view>
				<view class="view-items" @click="uni.switchTab({ url:'../message-center/message-center' })">
					<image src="../../static/images/msg_icon.png"></image>
					<text class="">我的通知</text>
				</view>
			</view>
		</view>
		<view class="view-mask" v-show="popHeight===320" @touchstart="popHeight=0">
		</view>

		<view class="view-space"></view>

		<!-- 轮播图 -->
		<view class="view-swiper" :style="'background-color:'+bg+''">
			<swiper class="swiper" autoplay :circular="true" @change="changeIndicatorDots" :indicator-dots="true"
				indicator-active-color="#FFFFFF">
				<swiper-item v-for="(item,index) in bannerList" :key="index" @click="swiperNav(item)">
					<image :src="item.carouselImgUrl"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 导航菜单 -->
		<swiper class="swiper-menu" :indicator-dots="true" indicator-color="rgba(74, 154, 255, 0.2)"
			indicator-active-color="#4A9AFF">
			<swiper-item v-for="(item,index) in navList" :key="index">
				<view class="view-menu">
					<view class="view-item" v-for="child in item" @click="navpath(child.id)">
						<image :src="child.icon"></image>
						<view class="wrap" v-if="child.id == 40">
							<text
								class="text-name-name">{{child.schoolTypeName}}&nbsp;&nbsp;&nbsp;{{child.schoolTypeName}}</text>
							<!-- <text v-else class="text-name-names">{{child.schoolTypeName}}</text> -->
						</view>

						<view class="wrap" v-else>
							<!-- <text v-if="child.id == 40" class="text-name-name">{{child.schoolTypeName}}{{child.schoolTypeName}}</text> -->
							<text class="text-name-names">{{child.schoolTypeName}}</text>
						</view>

					</view>
				</view>
			</swiper-item>
		</swiper>

		<!-- 公告 -->
		<view class="view-notice">
			<image class="image-noticeds" src="../../static/images/notices.png"></image>
			<swiper class="swiper" :autoplay="autoplay" :circular="true" :interval="interval" :vertical="vertical"
				:duration="duration">
				<swiper-item v-for="(list,index) in noticeList" :key="index" @click="uni.navigateTo({
					url:'../notice-message/notice-message?id='+list.id
				})">
					<view class="">{{list.noticeTitle}}</view>
				</swiper-item>
			</swiper>
			<image class="image-right" src="../../static/images/arrow_right.png"></image>
		</view>

		<!-- 热点 -->
		<view class="view-grid">
			<view class="view-recommend">
				<view class="view-title">
					<image class="image-redian" src="../../static/images/redian.png" mode=""></image>
					<view class="view-more" @click="uni.navigateTo({
						url:'../hot-list/hot-list'
					})">
						<text class="text-more">更多</text>
						<image class="image-right" src="../../static/images/arrow_right.png"></image>
					</view>
				</view>
				<view class="view-list" v-for="(list,index) in hotspotLists" :key="index" v-if="index<3" @click="uni.navigateTo({
					url:'../hot-details/hot-details?id='+list.id
				})">
					<view class="view-item">
						<view class="title_img">
							<!-- <image class="image-recommend" :src="list.resource" mode="aspectFit"></image> -->
							<img :src="list.resource" alt="">
						</view>
						<view class="view-brief">
							<view class="view-name biaoti u-line-3">
								{{list.title}}
							</view>
							<view class="view-address">
								<text class="text-address">{{list.createTime}}</text>
								<text class="text-distance">阅读量{{list.view}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 优质学校 -->
			<view class="view-quality">
				<view class="view-title">
					<text class="text-school">优质学校</text>
					<image class="image-school" src="../../static/images/xuexiao.png"></image>
					<view class="view-more" @click="uni.navigateTo({
						url:'../highquality-school-list/highquality-school-list'
					})">
						<text class="text-more">更多</text>
						<image class="image-right" src="../../static/images/arrow_right.png"></image>
					</view>
				</view>
				<view class="view-list">
					<view style="width: 100%;height: 30rpx;" class=""></view>
					<view class="view-item" v-for="(item,index) in qualityList" :key="index"
						@click="gogogo(item.id,item.schoolTypeId,item.score)">
						<image class="image-school" :src="item.logoImgUrl"></image>
						<view class="view-brief">
							<view style="height: 80rpx;" class="view-name">{{item.schoolName}}</view>
							<view class="view-distance"><text>{{(item.distance/1000).toFixed(2)}}</text>km</view>
							<view class="view-ratebox">
								<!-- <ice-star :value="Number(item.score).toFixed(0)"></ice-star> -->
								<!-- <image style="width: 35rpx;height: 35rpx;margin-top: 5rpx;"
									src="../../static/images/collection_fill.png" mode=""></image> -->
								<!-- <u-rate :value="Number(item.score)" disabled activeColor="#fad13b" size="12" :allowHalf="false"></u-rate> -->
								<image style="width: 23rpx;height: 23rpx;margin-left: 70rpx;"
									src="../../static/images/collection_fill.png" mode=""></image>
								<text style="font-size: 24rpx;" class="">{{ Number(item.score).toFixed(1) }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 推荐课程 -->
			<view class="view-recommend" v-if="!courseList">
				<view class="view-title">
					<text class="text-school">推荐课程</text>
					<image class="image-school" src="../../static/images/pinzhi.png"></image>
					<view class="view-more" @click="uni.navigateTo({
						url:'../recommended-courses/recommended-courses?typeId='+1+'&schoolId='+5
					})">
						<text class="text-more">更多</text>
						<image class="image-right" src="../../static/images/arrow_right.png"></image>
					</view>
				</view>
				<view class="view-list" v-for="(list,index) in courseList" :key="index" @click="uni.navigateTo({
					url:'../child-details/child-details?id='+list.id+'&typeId='+3
				})">
					<view class="view-item">
						<view class="title_img">
							<!-- <image class="image-recommend" :src="list.logoImgUrl" mode=""></image> -->
							<img :src="list.resource" alt="">
						</view>
						<view class="view-brief">
							<view class="view-name">{{list.schoolName}}</view>
							<view class="view-rate">
								<ice-star :value="Number(list.score).toFixed(0)"></ice-star>
								<text class="text-rate">{{Number(list.score).toFixed(1)}}分</text>
								<view class="view-price">￥{{list.courseAmount}}<text>起</text></view>
							</view>
							<view class="view-address">
								<text class="text-address">{{list.schoolAddress}}</text>
								<!-- <text class="text-distance">距你{{(list.distance/1000).toFixed(2)}}km</text> -->
								<text class="text-distance">距你{{list.distance}}km</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 限时秒杀 -->
			<view class="view-shopIng" v-if="seckillList.length != 0">
				<view class="view-title">
					<text class="text-school">限时秒杀</text>
					<image class="image-school" src="../../static/images/miaosha.png"></image>
					<view class="view-more" @click="uni.navigateTo({
						url:'../market-rush-buy/market-rush-buy'
					})">
						<text class="text-more">更多</text>
						<image class="image-right" src="../../static/images/arrow_right.png"></image>
					</view>
				</view>
				<!-- <view class="view-list">
					<view class="view-item" v-for="(item,index) in seckillList" :key="index" @click="uni.navigateTo({
						url:'../seckill-details/seckill-details?id='+item.id
					})">
						<image class="image-shopIng" :src="item.image"></image>
						<view class="view-name u-line-1">{{item.title}}</view>
						<text class="text-sales">销量{{item.sales}}</text>
						<view class="view-price">￥{{item.price}}<text>￥{{item.otPrice}}</text></view>
					</view>
				</view> -->
			</view>

			<!-- 报名活动 -->
			<!-- <view class="view-signup-activity" v-if="hotspotList.length != 0"
				:style="'background: url('+activityBg+')'">
				<view class="view-img">
					<image src="../../static/images/activity_title.png" mode=""></image>
				</view>
				<view class="view-list">
					<view class="view-item" v-show="item.status==1" :class="item.status==2?'bg-gray':''"
						v-for="(item,index) in hotspotList" :key="index" @click="uni.navigateTo({
						url:'../activity-details/activity-details?id='+item.id
					})">
						<view class="view-item-l">
							<view class="view-item-title">{{item.activitiesName}}</view>
							<view class="view-info">
								<text v-show="item.lastTime">报名时间：{{item.lastTime}}</text>
								<text v-show="item.signUpTargetNumber">报名人数：{{item.signUpTargetNumber}}人</text>
							</view>
						</view>
						<view class="view-item-r">
							<view class="view-state">
								<image v-if="item.status==1"
									:src="index==1?'../../static/images/activity_yell.png':'../../static/images/activity_blue.png'"
									mode="">
								</image>
								<text v-else>已结束</text>
							</view>
							<view class="view-count">
								已报名{{item.signUpNumber}}人
							</view>
						</view>
					</view>
				</view>
			</view> -->

			<!-- 报名系统 -->
			<view class="view-signup-system" v-if="false">
				<view class="view-title">
					报名系统
				</view>
				<image src="../../static/images/signup_system_bg.png" mode="" @click="uni.navigateTo({
					url:'../system-signup/system-signup'
				})"></image>
			</view>
		</view>

		<view class="activity">
			<view class="activity-box">
				<!-- <view class="activity-box-text"> <text>报名活动</text> <text @click="goMore">更多 ></text> </view> -->
				<view class="activity-box-text"> <text>报名活动</text></view>
				<view class="borderBottom"></view>
				<!-- #ifndef APP-NVUE || MP-TOUTIAO -->
				<view class="u-demo-block">
					<u-swiper @click="click" :list="list3" keyName="banner" current="id" previousMargin="30" nextMargin="30" :autoplay="false" radius="5"
						bgColor="#ffffff"></u-swiper>
				</view>
				<!-- #endif -->
			</view>
		</view>

		<!-- 弹出层开始 -->
		<view>
			<u-popup :show="show" :round="10" mode="center" @close="close" @open="open">
				<view style="width: 500rpx;height: 700rpx;">
					<view class="pop-up">
						<image style="width: 240rpx; height: 180rpx; margin-left: 270rpx;"
							src="../../static/images/editor/zizhi.png" mode=""></image>
						<text style="font-size: 40rpx; position: relative; left: 50rpx; bottom: 80rpx;">企业认证</text>
						<p style="position: relative; left: 50rpx; bottom: 70rpx; font-size: 20rpx;">
							QUALIFLCATION CERTLFICATION</p>

						<view style="margin-top: -20rpx; margin-left: 40rpx; padding-bottom: 20rpx;">
							您还未开启实名认证</view>
						<view style="margin-left: 40rpx; padding-bottom: 20rpx;">请及时经行实名认证</view>
						<view style="margin-left: 40rpx; padding-bottom: 20rpx;">开启多种功能</view>
						<button class="but" @click="uni.navigateTo({
											url:'###'
												})">立即认证 ></button>
					</view>
				</view>
			</u-popup>
		</view>
		<view>
			<image v-if="shous" src="../../static/images/editor/chahao1.png" class="chahaoimages"
				style="width: 70rpx;height: 70rpx;left: 310rpx;top: -100rpx;position: absolute;" mode="">
			</image>
		</view>
		<!-- <button @click="buttons">123</button> -->
		<!-- 弹出层结束 -->

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				closeables: true,
				show1: false,
				show2: false,
				progress: 0,
				list3: [
					// 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					// 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					// 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				add: false,
				bg: '',
				num: 5,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				vertical: true,
				interval: 2000,
				duration: 500,
				activityBg: require('@/static/images/activity_bg.png'),
				indicator: true,
				text1: [
					'义务教育阶段“双减”政策出台专家解...',
					'义务教育阶段“双减”政策出台专家解...',
				],
				allowHalf: true,
				qualityList: [], //优质学校
				noticeList: [],
				courseList: [], //推荐课程
				city: '', //位置
				bannerList: [], //banner
				schoolImg: '',
				cover: '',
				navList: [], //导航栏所有数据
				hotspotList: [],
				hotspotLists: [],
				seckillList: [], // 限时秒杀
				colorList: [], // 背景颜色
				popHeight: 0,
				show: false,
				shous: false,
				timer: null,

				version: '', // 当前应用版本号
				netWork: '', //手机端的网络信号
				lit: [], //存放更新的apk包
				listyy: [], //展示
			}
		},
		async onLoad() {
			let then = this
			then.getActivityList()
			//自动更新
			uni.getSystemInfo({ //获取当前版本号以及名称
				success(res) {
					then.version = res.appVersionCode
					if (res.platform == 'android') {
						then.gpostappends()
					} else {
						then.gpostappends()
					}
				}
			});
			//获取手机信号
			uni.getNetworkType({ //获取手机的网络信号
				success(res) {
					then.netWork = res.networkType
				}
			});

			setTimeout(() => {
				plus.runtime.getProperty(plus.runtime.appid, (info) => {
					if (then.lit.versionCode > info.versionCode) {
						this.show1 = true
					}
				})
			}, 1000)

			uni.$on("getCity", (msg) => {
				then.city = msg
				uni.setStorageSync('city', then.city)
			})
			if (!uni.getStorageSync('token')) {
				return
			}
			if (uni.getStorageSync('imUserName')) {
				then.IM.login(uni.getStorageSync('imUserName'))
			}
			then.messageShowTip.showTextMessage(then)
			// 判断审核状态
			// await checkAuditStatus();

		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		async onShow() {
			this.getNavList()
			this.getBannerList()
			await this.getLocation()
			this.getSchoolList(); // 优质学校
			this.getseckill(); // 限时秒杀
			this.getNotice();
			await this.gethotspotLists() // 实时热点
			this.getCourseList(); // 推荐课程
			this.gethotspotList();

			// this.isSetPayPwd();
			this.popHeight = 0
			this.add = false
			// if (!uni.getStorageSync('token')) {
			// 	this.$toast('请登录！')
			// 	setTimeout(() => {
			// 		uni.redirectTo({
			// 			url: '../login/login'
			// 		})
			// 	}, 1000)
			// }
			this.timeGetLocation()
		},
		onHide() {
			if (this.timer) clearInterval(this.timer)
		},
		onPullDownRefresh() {
			uni.reLaunch({
				url: '../index/index',
				success(res) {
					console.log(res)
				}
			})
			setTimeout(() => {
				uni.stopPullDownRefresh()
				console.log('stopPullDownRefresh')
			}, 500)
		},
		methods: {
			async getActivityList(){
							let res = await this.http.get('/app/advertisement/advertisementList')
							if(res.code == 200){
								console.log(res.data,'list3')
								// this.list3 = res.data.map(item=>{return item.banner})
								this.list3 = res.data
							}else if(res.msg){
								this.$toast(res.msg)
							}
						},
			//关系取消按钮
			closes() {
				this.show1 = false
			},
			//更新
			autoupdate(url) {
				let thats = this
				let dtask = plus.downloader.createDownload(url, {}, function(d, status) {
					// 下载完成 
					if (status == 200) {
						plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(
							error) {
							uni.showToast({
								title: '安装失败',
								mask: false,
								duration: 1500
							});
						})
					} else {

						uni.showToast({
							title: '更新失败',
							mask: false,
							duration: 1500
						});
					}
				});
				dtask.start();
				dtask.addEventListener('statechanged', function(task, status) {
					console.log(task.state, 1111)
					console.log(this, 'this')
					if (task.state == 3) {
						thats.show1 = false
						thats.show2 = true
						thats.progress = parseInt(task.downloadedSize / task.totalSize * 100)
						console.log(this.progress, '进度')

					}
					if (task.state == 4) {
						thats.show = false
					}
				})
			},
			//下载wgt包
			autoupdateste(wgtUrl) {
				//下载wgt包
				let that = this
					uni.downloadFile({
						url: wgtUrl,
						success: downloadResult => {
							//安装wgt包
							plus.runtime.install(
								downloadResult.tempFilePath, {
									force: true
								},
								() => {
									// 应用热重启，重新启动进入首页。
									plus.runtime.restart();
									that.show2 = false
									console.log('下载成功')
								});

						}
					})
			},
			//自动更新
			async gpostappends() {
				let that = this
				let res = await this.http.post('/app/update/version', {
					apptype: 1,
					type: 0,
				})
				if (res.code === 200) {
					that.lit = res.data
					that.listyy = res.data.versionContent.split(';')
				}

			},
			//点击立即更新
			gxtye() {
				console.log('111')
				let that = this
				// if (that.version < that.lit.versionCode) {
				that.show1 = true
				let downloadUrl = that.lit.url //存放apk文件
				let isForced = that.lit.isForced //是否强制更新 0 否  1 是
				if (downloadUrl.slice(-3) === 'apk') {
					if (isForced === 0) {
						that.autoupdate(downloadUrl)
						that.show1 = false
					} else {
						that.autoupdate(downloadUrl)
						that.show1 = false
						this.closeables = false
					}
					
				} else if (downloadUrl.slice(-3) === 'wgt') {
					if (isForced === 0) {
						console.log(downloadUrl, 'wgt包')
						that.autoupdateste(downloadUrl)
						that.show1 = false
					} else {
						console.log(downloadUrl, 'wgt包1')
						that.autoupdateste(downloadUrl)
						that.show1 = false
						that.closeables = false
					}
					// }

				}
			},



			click(e) {
							
				console.log(this.list3[e])
				
				const obj = {
					id:this.list3[e].id,
					adTitle:this.list3[e].adTitle,
					adDesc:this.list3[e].adDesc
				}
				uni.navigateTo({
					// url:`/pages/activity-details/activity-details3?id=${this.list3[e].id}&adTitle=${this.list3[e].adTitle}&adDesc=${this.list3[e].adDesc}`
					// url:`/pages/activity-details/activity-details3?item=${JSON.stringify(obj)}`
					url:`/pages/activity-details/activity-details3?id=${this.list3[e].id}`
				})
				console.log(123,'nav ')
			},
			//发帖子 判断本地储存有没有保存的帖子
			deal() {
				if (uni.getStorageSync('form') == '') {
					uni.navigateTo({
						url: '../rech-text/rech-text'
					})
				} else {
					uni.navigateTo({
						url: '../rech-text/rech-text3'
					})
				}
			},
			//跳转优质学校
			// '../child-details/child-details?id='+item.id
			gogogo(a, b, c) {
				console.log(a, b)
				if (b == 2) {
					uni.navigateTo({
						url: '../interest-details/public-details?id=' + a + '&schoolType=' + b + '&types=' + 2 +
							'&score=' + c
					})
				} else if (b == 3) {
					uni.navigateTo({
						// ../school-details/school-details
						url: '../interest-details/public-details?id=' + a + '&schoolType=' + b + '&types=' + 3 +
							'&score=' + c
					})
				} else if (b == 4) {
					uni.navigateTo({
						// ../public-details/public-details
						url: '../interest-details/public-details?id=' + a + '&schoolType=' + b + '&types=' + 4 +
							'&score=' + c
					})
				} else if (b == 5) {
					uni.navigateTo({
						// ../occupation-details/public-details
						url: '../child-details/child-details?id=' + a + '&schoolType=' + b + '&types=' + 5 +
							'&score=' + c
					})
				} else {
					uni.navigateTo({
						url: '../juvenile/juvenile-introduce?id=' + a + '&schoolType=' + b + '&types=' + 1 +
							'&score=' + c
					})
				}
			},
			// 弹出层
			open() {
				this.show = true
				// console.log('open');
			},
			close() {
				this.show = false
				this.shous = false
				// console.log('close');
			},
			buttons() {
				this.shous = true
				this.show = true
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

			// 轮播图
			async getBannerList() {
				let res = await this.http.get('/app/userHome/homeBannerList', {
					type: 1
				});
				if (res.code == 200) {
					for (let item of res.data) {
						this.colorList.push(item.backgroundColor)
					}
					console.log(this.colorList)
					this.bg = this.colorList[0];
					this.bannerList = res.data
				} else {
					// this.$toast(res.msg)
				}
			},

			changeIndicatorDots(e) {
				// console.log(e);
				this.bg = this.colorList[e.detail.current]
			},
			async navpath(val) {

				// if (uni.getStorageSync('token') === '') {
				// 	uni.navigateTo({
				// 		url: '/pages/login/login'
				// 	})
				// 	return
				// }
				if (val == 40) {
					uni.navigateTo({
						url: '../juvenile/juvenile'
					})
				}
				// else {
				// 	this.$toast('模块开发中')
				// }
				if (val == 1) {
					uni.navigateTo({
						url: '../child/child?address=' + this.city
					})
				} else if (val == 2) {
					uni.navigateTo({
						url: '../interest/interest'
					})
				} else if (val == 3) {
					uni.navigateTo({
						url: '../civilian/civilian'
					})
				} else if (val == 4) {
					uni.navigateTo({
						url: '../public-institutions/public-institutions'
					})
				} else if (val == 5) {
					uni.navigateTo({
						url: '../vocational-education/vocational-education'
					})
				} else if (val == 16) {
					uni.navigateTo({
						url: '../entranceguidance/entranceguidance'
					})
				} else if (val == 17) {
					uni.navigateTo({
						url: '../employment-guide/employment-guide'
					})
				} else if (val == 18) {
					uni.navigateTo({
						url: '../qualityevaluation/qualityevaluation'
					})
				} else if (val == 19) {
					uni.navigateTo({
						url: '../homeeducation/homeeducation'
					})
				} else if (val == 20) {
					uni.navigateTo({
						url: '../Informationservice/Informationservice'
					})
				} else if (val == 21) {
					uni.navigateTo({
						url: '../socialpractice/socialpractice'
					})
				} else if (val == 22) {
					uni.navigateTo({
						url: '../financialaid/applicationrecord'
					})
				} else if (val == 40) {
					uni.navigateTo({
						url: '../juvenile/juvenile'
					})
				}
			},
			async getNavList() {
				let res = await this.http.get('/app/userHomeNavigation/navigationIconList', {});
				if (res.code == 200) {
					this.navList = [];
					for (var i = 0; i < res.data.length; i++) {
						if (i % 10 == 0) {
							this.navList.push([]);
						}
						this.navList[this.navList.length - 1].push(res.data[i]);

					}
				} else {
					// this.$toast(res.msg)
				}
			},

			// 秒杀商品列表
			async getseckill() {
				let res = await this.http.get('/app/yxStoreSeckill/list');
				console.log('限时秒杀', res);
				if (res.code == 200) {
					this.seckillList = res.data
					console.log("限时秒杀————————————", this.seckillList);
				} else if (res.code == 10001) {
					this.$toast('请先登录')
				} else {
					// this.$toast(res.msg)
				}
			},

			// 优质学校
			async getSchoolList() {
				console.log(uni.getStorageSync('lng'));
				console.log(uni.getStorageSync('lat'));
				let res = await this.http.post('/app/userHome/qualitySchoolList', {
					pageNum: 1,
					pageSize: 4,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
				});
				console.log('优质学校', res);
				if (res.code == 200) {
					// this.qualityList = res.rows;
					this.qualityList = this.setSchoolDis(this.deepCopy(res.rows));
				} else if (res.code == 10001) {
					this.$toast('请先登录')
				} else {
					// this.$toast(res.msg)
				}
			},

			setSchoolDis(list) { //更新学校距离
				// console.log("学校的列表", list)
				if (!Array.isArray(list)) {
					console.log("不是个列表")
					return
				}
				let lng = uni.getStorageSync('lng')
				let lat = uni.getStorageSync('lat')
				let arr = list.map(item => {
					item.distance = this.countDis(lat, lng, item.latitude, item
						.longitude)
					return item
				})
				return arr
			},

			deepCopy(obj) {
				return JSON.parse(JSON.stringify(obj))
			},

			timeGetLocation() { //定时获取当前位置
				this.timer = setInterval(() => {
					uni.getLocation({
						type: 'wgs84',
						success: (res) => {
							uni.setStorageSync('lng', res.longitude)
							uni.setStorageSync('lat', res.latitude)
							if (Array.isArray(this.schoolList) && this
								.schoolList.length > 0)
								this.schoolList = this.setSchoolDis(this
									.deepCopy(this.schoolList));
						}
					})
				}, 1000 * 5)
			},

			//根据两点计算距离
			countDis(lat1, lng1, lat2, lng2) {
				if (!lat1 || !lng1 || !lat2 || !lng2) {
					return 999999
				}
				// console.log(lat1, lng1, lat2, lng2)
				var radLat1 = lat1 * Math.PI / 180.0;
				var radLat2 = lat2 * Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(
						radLat1) * Math.cos(radLat2) * Math
					.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				// 保留后两位的正则表达式
				var re = /([0-9]+\.[0-9]{2})[0-9]*/;
				return s.toString().replace(re, "$1") // 单位千米
			},


			// 首页平台公告
			async getNotice() {
				let res = await this.http.get('/app/userHome/homeBulletin', {});
				this.noticeList = res.data
			},

			// 获取报名信息
			async gethotspotList() {
				let res = await this.http.get('/app/platformActivities/list', {
					pageNum: 1,
					pageSize: 4,
				});
				console.log('获取报名信息>>>>>>>>>>>>>>>>>>', res);
				if (res.code == 200) {
					this.hotspotList = res.rows
					this.hotspotList.forEach(item => {
						item.lastTime = item.signUpStartTime.split(' ')[
							0] + '-' + item.signUpEndTime.split(
							' ')[0]
					})
					console.log(this.hotspotList)
				} else {
					// this.$toast(res.msg)
				}
			},

			// 获取实时热点
			async gethotspotLists() {
				let res = await this.http.get(
					'/app/userHome/liveHotspotList', {
						pageNum: 1,
						pageSize: 4,
					});
				if (res.code == 200) {
					this.hotspotLists = res.rows
				} else {
					// this.$toast(res.msg)
				}
			},

			// 首页课程列表
			async getCourseList() {
				let res = await this.http.get(
					'/app/userHome/recommendedCoursesList', {
						pageNum: 1,
						pageSize: 4,
						lon: uni.getStorageSync('lng'),
						lat: uni.getStorageSync('lat'),
					});
				console.log('推荐课程', res);
				// console.log(res);
				if (res.code == 200) {
					console.log(res.rows)
					this.courseList = res.rows
				} else {
					// this.$toast(res.msg)
				}
			},

			// 获取当前位置
			getLocation() {
				// uni.showLoading({
				// 	title: '获取位置中...'
				// })
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						// uni.hideLoading()
						uni.setStorageSync('lng', res
							.longitude)
						uni.setStorageSync('lat', res.latitude)
						uni.request({
							url: "https://restapi.amap.com/v3/geocode/regeo",
							data: {
								key: "af799f08b2d0ad189610bb1b8a5ff99e",
								location: res
									.longitude + "," +
									res.latitude,
							},
							method: "GET",
							success: (res) => {
								console.log(res);
								this.city = res
									.data.regeocode
									.addressComponent
									.city
								getApp().globalData
									.city = res
									.data.regeocode
									.addressComponent
									.city
							}
						})
					},
					fail: (error) => {
						console.log(error);
					}
				});
			},
			// 判断审核状态
			// async checkAuditStatus() {
			// 	const token = uni.getStorageSync('token');
			// 	if (token) {
			// 		let res = await this.http.get('/app/userInfo/approvalStatus');
			// 		console.log('审核状态:', res);
			// 		if (res.code == 200) {
			// 			switch (res.data.status) {
			// 				case 0:
			// 					console.log('审核中');
			// 					uni.navigateTo({
			// 						url: '../check-status/check-status?status=checking'
			// 					})
			// 					break;
			// 				case 1:
			// 					console.log('审核通过');
			// 					uni.switchTab({
			// 						url: '../index/index'
			// 					})
			// 					break;
			// 				case 2:
			// 					console.log('审核拒绝');
			// 					uni.navigateTo({
			// 						url: '../check-status/check-status?status=failed'
			// 					})
			// 					break;
			// 				case 3:
			// 					console.log('没有提交审核资料');
			// 					uni.navigateTo({
			// 						url: '../complete-information/complete-information'
			// 					})
			// 					break;
			// 			}
			// 		} else {
			// 			this.$toast(res.msg);
			// 		}
			// 	}
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.my-centers {
			position: relative;
			width: 289px;
			height: 320px;
			border-radius: 20px !important;
			background-size: 450px 600px;
			background-position: 51% 50%;
			background-repeat: no-repeat;
			flex-shrink: 0;
			filter: alpha(Opacity=80);
			-moz-opacity: 0.5;
			opacity: 1;
			background-image: url(../../static/images/banben2.png);

			.tents {

				text-align: center;
				// position: absolute;
				margin-top: 150px;
			}

			.btn {

				width: 160px;
				height: 35px;

				border-radius: 20px;
				background-color: #2578f9;
				border: 1px solid #2578f9;
				color: #fff;
				top: 20px;
				// bottom: 2px;
				// left: 68px;
			}
		}

		.progress {
			width: 289px;
			height: 320rpx;
			background-color: #fff;
			border-radius: 10px;

			.app {
				width: 40%;
				margin: 20rpx auto;
			}

			.update {
				width: 70%;
				margin: 10rpx auto;
			}

			.lineProgress {
				width: 90%;
				margin: 20px auto 0px;
			}
		}
	}

	::v-deep .u-popup__content {
		border-radius: 20px !important;
		background-color: transparent;
	}

	::v-deep .u-icon--right {
		margin-top: 25px;
	}

	.wrap {
		position: relative;
		width: 120rpx;
		overflow: hidden;
	}

	.text-name-name {
		display: inline-block;
		white-space: nowrap;
		font-size: 24rpx;
		font-weight: 500;
		margin-top: 20rpx;
		margin-left: 10rpx;
		font-weight: bold;
		color: #666666;
	}

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

	.text-name-name {
		// animation: move 12s infinite alternate linear;
		animation: move 9s linear infinite;
	}

	@keyframes move {
		0% {
			// transform: translate(calc(0 + -50px), 0);
			transform: translateX(0%);
		}

		100% {
			// transform: translate(calc(-100% + 50px), 0);
			transform: translateX(-51%);
		}
	}


	.view-space {
		margin-top: var(--status-bar-height);
		height: 88rpx;
	}

	.view-mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.view-pop {
		width: 255rpx;
		display: flex;
		overflow: hidden;
		flex-direction: column;
		background-image: url(../../static/images/tianjias.png);
		background-size: cover !important;
		transition: 0.3s;
		position: absolute;
		z-index: 99;
		right: 20rpx;
		align-items: center;

		>view {
			&:first-child {
				margin-top: 10rpx;
			}
		}

		.view-items+.view-items {
			border-top: 1px solid rgba(255, 255, 255, 0.05);
		}

		.view-items {
			display: flex;
			align-items: center;
			padding: 34rpx 0rpx;

			image {
				width: 43rpx;
				height: 43rpx;
			}

			text {
				width: 140rpx;
				text-align: center;
				display: block;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 6rpx;
				margin-left: 20rpx;
			}
		}
	}

	.activity{
		width: 100%;
		height: 220px;
		background-color: #f4f4f7;
		margin-bottom: 10px;
		.activity-box {
			width: 94%;
			height: 200px;
			margin-left: 3%;
			background: #FFF;
			margin-bottom: 20px;
			.u-demo-block{
				margin-top: 10px;
			}
			.activity-box-text {
				width: 90%;
				margin-left: 5%;
				border-bottom:1px solid #efefef ;
				
				text {
					&:nth-child(1) {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						display: inline-block;
						margin: 20rpx 20rpx;
					}
		
					&:nth-child(2) {
						color: #aaa;
						font-size: 24rpx;
						text-align: right;
						float: right;
						margin: 30rpx 20rpx 0 0;
					}
				}
			}
		}
	}

	.view-signup-activity {
		width: 690rpx;
		background-color: red;
		margin-top: 30rpx;
		border-radius: 10rpx;
		background-size: cover !important;

		.view-img {
			display: flex;
			justify-content: center;
			padding-top: 50rpx;

			image {
				width: 545rpx;
				height: 99rpx;

			}

		}

		.view-list {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 30rpx;

			.bg-gray {
				background-color: #DFE6F0 !important;
			}


			.view-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 634rpx;
				height: 196rpx;
				background: #FFFFFF;
				border: 2rpx solid #000000;
				border-radius: 8rpx;
				padding: 30rpx;
				margin-bottom: 30rpx;

				.view-item-l {
					display: flex;
					flex-direction: column;

					.view-item-title {
						font-size: 32rpx;
						color: #000000;
						margin-bottom: 40rpx;
						width: 440rpx;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.view-info {
						display: flex;
						flex-direction: column;
						color: #999999;
						font-size: 24rpx;
					}
				}

				.view-item-r {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;

					.view-state {
						width: 140rpx;
						height: 90rpx;
						text-align: right;

						image {
							width: 140rpx;
							height: 90rpx;
						}

						text {
							font-size: 32rpx;
							font-weight: 600;
							color: #999999;

						}
					}

					.view-count {
						background: rgba(74, 154, 255, 0.05);
						border: 1px solid #4A9AFF;
						border-radius: 3rpx;
						font-size: 20rpx;
						color: #4A9AFF;
						padding: 2rpx 6rpx;
						margin-top: 20rpx;
					}
				}
			}
		}
	}

	.view-signup-system {
		width: 690rpx;
		background-color: #fff;
		margin-top: 30rpx;
		border-radius: 10rpx;
		padding: 30rpx;

		.view-title {
			display: flex;
			align-items: center;
			font-weight: bold;
			padding-bottom: 30rpx;
			border-bottom: 1px solid #eee;
			margin-bottom: 30rpx;
		}

		image {
			width: 630rpx;
			height: 250rpx;
		}
	}

	// .view-ratebox {
	// 	display: flex;
	// 	align-items: center;

	// 	image {
	// 		width: 24rpx;
	// 		height: 22rpx;
	// 		margin-right: 9rpx;
	// 	}
	// }

	.view-ratebox {
		display: inline-block;
		position: relative;
		top: -50rpx;
		margin-left: 30rpx;
		// display: flex;
		// margin-left: auto;

		text {
			color: #FC6129;
			font-size: 28rpx;
			margin-top: 5rpx;
		}

		image {
			width: 22rpx;
			height: 20rpx;
			margin-right: 9rpx;
		}

		.name {
			font-size: 24rpx;
			display: inline-block;
			margin-left: 30rpx;
		}
	}

	.view-grid {
		background-color: #F4F4F7;
		padding: 30rpx;
		padding-top: 2rpx !important;

		.view-shopIng {
			background-color: #FFFFFF;
			padding: 30rpx;
			margin-top: 30rpx;
			border-radius: 10rpx;

			.view-list {
				display: flex;
				flex-wrap: wrap;

				.view-item {
					width: 300rpx;
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
						// font-size: 28rpx;
						// font-weight: bold;
						// color: #333333;

						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
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
						border: 1rpx solid #4A9AFF;
						border-radius: 3rpx;
						font-size: 20rpx;
						font-weight: bold;
						color: #4A9AFF;
						margin: 15rpx 0rpx;
					}
				}
			}

			.view-title {
				display: flex;
				align-items: center;
				padding-bottom: 25rpx;
				border-bottom: 2rpx solid #EFEFEF;

				.text-school {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #111111;
					background: linear-gradient(0deg, #F39400 0%, #E2333F 99.0478515625%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.view-more {
					display: flex;
					align-items: center;
					margin-left: auto;

					.text-more {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #999999;
					}

					.image-right {
						width: 12rpx;
						height: 20rpx;
						margin-left: 22rpx;
					}
				}

				.image-school {
					width: 53rpx;
					height: 24rpx;
					margin-left: 20rpx;
				}
			}
		}

		.view-recommend {
			margin-top: 30rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;

			.view-list {
				// padding: 30rpx;
				margin-top: 40rpx;

				.view-item {
					display: flex;

					.title_img {
						width: 160rpx;
						height: 160rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						overflow: hidden;
						border-radius: 10rpx;
					}

					.image-recommend {
						width: 160rpx;
						height: 160rpx;
						// height: auto;
					}

					img {
						height: 100%;
						width: auto;
					}

					.view-brief {
						margin-left: 20rpx;
						flex-grow: 1;
						flex-shrink: 1;

						.biaoti {
							height: 110rpx;
							overflow: hidden;
						}

						.view-name {
							font-size: 28rpx;
							font-weight: bold;
							color: #333333;
						}

						.view-address {
							display: flex;
							align-items: center;
							margin-top: 30rpx;

							.text-address {
								font-size: 24rpx;
								font-weight: bold;
								color: #666666;
							}

							.text-distance {
								font-size: 24rpx;
								font-weight: bold;
								color: #999999;
								margin-left: auto;
							}
						}

						.view-rate {
							display: flex;
							margin: 20rpx 0rpx;

							.text-rate {
								margin-top: 4rpx;
								color: #FC6129;
							}

							.view-price {
								font-size: 36rpx;
								font-weight: bold;
								color: #FC6129;

								text {
									font-size: 24rpx;
									color: #999;
								}
							}

							/deep/.uicon-star {
								padding: 0rpx !important;
							}

							.view-price {
								margin-left: auto;
							}
						}
					}
				}
			}

			.view-title {
				display: flex;
				align-items: center;
				padding-bottom: 24rpx;
				border-bottom: 1px solid #EFEFEF;

				.image-redian {
					width: 150rpx;
					height: 56rpx;
				}

				.text-school {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #111111;
				}

				.view-more {
					display: flex;
					align-items: center;
					margin-left: auto;

					.text-more {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #999999;
					}

					.image-right {
						width: 12rpx;
						height: 20rpx;
						margin-left: 22rpx;
					}
				}

				.image-school {
					width: 53rpx;
					height: 24rpx;
					margin-left: 20rpx;
				}
			}
		}

		.view-quality {
			margin-top: 30rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;

			.view-list {
				display: flex;
				flex-wrap: wrap;
				border-radius: 10rpx;

				.view-item {
					width: 300rpx;
					height: 140rpx;
					display: flex;
					margin-left: 10rpx;
					// margin-top: 30rpx;

					&:nth-child(2n) {
						margin-right: 0rpx;
					}

					/deep/.uicon-star-fill {
						padding: 0rpx !important;
					}

					.image-school {
						width: 110rpx;
						height: 110rpx;
						border-radius: 10rpx;
					}

					.view-brief {
						margin-left: 13rpx;
						width: 172rpx;

						.view-name {
							font-size: 28rpx;
							font-weight: bold;
							color: #333333;
						}

						.view-distance {
							display: inline-block;
							font-size: 20rpx;
							font-weight: bold;
							color: #999999;
							position: relative;
							bottom: 8rpx;
							// margin: 5rpx 0rpx;
							// margin-top: 10rpx;
						}
					}
				}
			}

			.view-title {
				display: flex;
				align-items: center;
				padding-bottom: 25rpx;
				border-bottom: 2rpx solid #EFEFEF;

				.text-school {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #111111;
				}

				.view-more {
					display: flex;
					align-items: center;
					margin-left: auto;

					.text-more {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #999999;
					}

					.image-right {
						width: 12rpx;
						height: 20rpx;
						margin-left: 22rpx;
					}
				}

				.image-school {
					width: 53rpx;
					height: 24rpx;
					margin-left: 20rpx;
				}
			}
		}
	}

	.view-notice {
		display: flex;
		align-items: center;
		padding: 30rpx 30rpx;
		color: #000000 !important;

		.swiper {
			height: 40rpx !important;
			width: 580rpx !important;
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			padding: 0rpx 10rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.image-noticeds {
			width: 100rpx;
			height: 27rpx;
		}

		image {
			width: 12rpx;
			height: 20rpx;
		}

		/deep/.uicon-volume {
			color: #Ff0000 !important;
		}
	}

	.swiper-menu {
		margin-top: 150rpx;
		height: 380rpx;
	}

	.view-menu {

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0rpx 30rpx;


		.view-item {
			width: 116rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 25rpx;
			margin-bottom: 29rpx;

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
				margin-top: 20rpx;
				font-weight: bold;
				color: #666666;
			}
		}
	}

	.view-swiper {
		width: 100%;
		padding: 30rpx;
		height: 280rpx;

		.swiper {
			width: 100%;
			height: 350rpx;
			border-radius: 10rpx;
			overflow: hidden;
			transform: translateY(0);
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

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

	.nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;

		/deep/.u-transition {
			background-color: rgba(0, 0, 0, 0.1) !important;
		}

		/deep/.u-popup__content {
			width: 255rpx;
			height: 335rpx;
			background-color: rgba(0, 0, 0, 0);
			background-size: cover !important;
			background-image: url(../../static/images/tianjias.png);
			top: -32% !important;
			right: -30% !important;
			padding: 40rpx 20rpx;

			.view-items {
				display: flex;
				align-items: center;
				padding: 20rpx 0rpx;

				image {
					width: 43rpx;
					height: 43rpx;
				}

				text {
					width: 140rpx;
					text-align: center;
					display: block;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 6rpx;
					margin-left: 20rpx;
				}
			}
		}

		.status-bar {
			height: var(--status-bar-height);
		}
	}

	.view-header {
		display: flex;
		width: 100%;
		height: 88rpx;
		flex-direction: row;
		align-items: center;
		padding: 0 30rpx;
		z-index: 1;

		.image-location {
			width: 30rpx;
			height: 40rpx;
		}

		.text-city {
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			margin-left: 10rpx;
		}

		.image-top-right-add {
			width: 55rpx;
			height: 55rpx;
			margin-left: 20rpx;
		}

		.image-top-right {
			width: 40rpx;
			height: 40rpx;
			margin-left: 20rpx;
		}

		.view-search {
			flex-grow: 1;
			flex-shrink: 1;
			height: 58rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 20rpx;

			.image-search {
				width: 25rpx;
				height: 25rpx;
			}

			text {
				font-size: 28rpx;
				font-weight: 500;
				margin-left: 10rpx;
				color: #999999;
			}
		}

		.view-header-icon {
			width: 43rpx;
			height: 43rpx;
			margin-left: 32rpx;
		}
	}

	.but {
		width: 360rpx;
		height: 80rpx;
		margin-top: 60rpx;
		background-image: linear-gradient(to right, rgba(255, 160, 12, 255), rgba(255, 207, 132, 255));
		color: white;
		border-radius: 40rpx;
	}

	.pop-up {
		width: 500rpx;
		height: 620rpx;
		position: fixed;
		left: 120rpx;
		z-index: 999
	}
</style>