<template>
	
	<scroll-view scroll-x="true" scroll-y="true" @scroll="scrollDown($event)" @scrolltolower="loadmore(titleIndex)">
	<view class="page-view">
		<a href="#topPosition">
			<view class="back_top" v-if="isShow" >
				<image  src="../../static/images/backtop.png"></image>
			</view>
		</a>
		<view id="topPosition"></view>
		<!-- <view :class="{'top-bar':true,'top-bar1':!(scroll<240)}" id="topPosition">
			<view class="bar-left bare-cell">
				<image @click="uni.navigateBack()" src="../../static/images/left-2.png" v-if="scroll<240"></image>
				<image @click="uni.navigateBack()" src="../../static/images/left.png" v-else></image>
			</view>
			<view :class="{'bar-center':scroll<240,'bare-cell':true,'bar-center1':!(scroll<240)}">
				<text >河南电视台少儿艺术合作基地</text>
			</view>
			<view class="bar-right bare-cell">
			</view>
		</view> -->
		<view class="imas">
			<image @click="uni.navigateBack()" style="width: 10px;height: 15px;flex-shrink: 0;" src="../../static/images/left-2.png" ></image>
			<!-- <image @click="uni.navigateBack()" src="../../static/images/left.png" v-else></image> -->
			<view class="test">河南电视台少儿艺术合作基地</view>
		</view>
		<view class="img-box">
			<image :src="list.backgroundImage"></image>
		</view>
		
		<view class="xinxi">
			<text style="font-size: 40rpx;margin-bottom: 20rpx;">{{this.list.schoolName}}</text>
			<view class="xinxi-s">
			<text class="schoolTitle">
				{{this.list.schoolTitle}}
			</text>
			<text class="score"><image style="width: 19.33rpx;height: 19.33rpx;" src="../../static/images/score.png"/>&nbsp;{{Number(score).toFixed(1)}}分</text>
			</view>
			<view class="xinxi-x">
				<view class="xinxi-x-s" >
					<image src="../../static/images/dianhua.svg"></image>
					{{this.list.phone}}
				</view>
				<view class="xinxi-x-s" @click="location(list.latitude,list.longitude)" >
					<image style="width:22.5rpx;height: 30rpx;margin-left: 12rpx; margin-right: 14rpx;margin-bottom:5rpx;vertical-align: middle;" src="../../static/images/weizhis.png"></image>
					{{this.list.schoolAddress}}
				</view>
			</view>
		</view>
		<view class="content-view">
			<!-- <view class="title-line">
				<view class="title-cell" v-for="(item, index) in titleList" :key="index" @click="selectTitle(index)">
					<text style="line-height: 70rpx;"
						:style="index == titleIndex? 'color: #2356ff':'#666666'">{{ item.title }}</text>
					<view class="text-line" :class="{'text-line-show': titleIndex == index}"></view>
				</view>
			</view> -->
			<view class="tabs_box">
				<u-sticky bgColor="#f3f3f3" >
				    <u-tabs :list="titleList" :current="tabIndex" @click="selectTitle" :scrollable='false' :activeStyle="{color:'#4A9AFF'}" :inactiveStyle="{color:'#A1A1A1'}"></u-tabs>
				  </u-sticky> 
			</view>
			<!-- 介绍模块 -->
			<Introduce :info="items" v-show="this.titleIndex == 0" :flag="flag"></Introduce>
			<!-- 课程模块 -->
			<Curriculum :curriculum="courseList" :ids="id" v-show="this.titleIndex == 1" :flag="flag"></Curriculum>
			<!-- 动态 -->
			<!-- <Dynamic :dynamic="dyncList" v-show="this.titleIndex == 2" :flag="flag"></Dynamic> -->
			<!-- 论坛 -->
			<!-- <ForumParams :list="furomList" :total="total" v-show="this.titleIndex == 3" @dianzan="dianzan" @shoucang="shoucang"></ForumParams> -->
			<!-- 论坛 -->
			<!-- <Forums :forums="furomList" v-if="this.titleIndex == 3"></Forums> -->
			<!-- 评价 -->
			<!-- <Evaluates :pevaluates="evaluateList" v-on:pChangeType="changeType" v-if="this.titleIndex == 4"></Evaluates> -->
		</view>
	</view>
	
	</scroll-view>
</template>

<script>
	import Introduce from '@/components/introduce/introduce.vue'
	import Curriculum from '@/components/curriculum/curriculum.vue'
	import Dynamic from '@/components/dynamic/dynamic.vue'
	import ForumParams from "@/components/ForumParams/ForumParams.vue"
	// import Forums from '@/components/forums/forums.vue'
	import Evaluates from '@/components/evaluates/evaluates.vue'
import { log } from 'util'

	export default {
		components: {
			Introduce,
			Curriculum,
			Dynamic,
			// Forums,
			ForumParams,
			Evaluates
		},
		data() {
			return {
				topItem:'',
				isShow:false,
				scroll:0,
				total:0,
				flag:false,
				items: {
					teacher: {},
					schoolInfo: {},
					notics: {},
					instructions: {},
					announcement:{}
				},
				courseList: {
					course: {},
				},
				// courseList:[], //所有数据
				tabIndex: 0,
				dyncList: [],
				furomList: [],
				evaluateList: {
					score: "0.0",
					evaluate: {},
					userId: '',
				},
				userId: {},
				msg: '介绍',
				list: {},
				titleList: [{
						name: '介绍'
					},
					{
						name: '课程'
					},
					// {
					// 	name: '动态'
					// },
					// {
					// 	name: '校友会'
					// },
					// {
					// 	name: '评价'
					// }
				],
				titleIndex: 0,
				id: '', //学校id
				schoolType: '',
				types: '',
				score: "",
				current: 1,
				currentPage: [1, 1, 1],
				// 当前页
				pageNum: [1, 1, 1],
				typeId: 0,
				curSysPosition: [],
			}
		},
		onLoad(options) {
			console.log("传进来的参数99999999999999999999", options)
			this.id = options.id
			this.evaluateList.userId = this.id
			this.schoolType = options.schoolType
			this.types = options.types
			if (options.score) {
				this.score = options.score
			}
			this.getIntroduce();
			this.teacher()
			this.allCourse()
			this.getDync()
			this.furom()
			this.evaluate()
			this.getList()
			// this.getScore() //评分
			this.evaluate()
			this.getAllUserIdToComment()
			this.getAnnouncement()
			
		},
		onShow() {
			this.notic()
		},
		onHide() {

		},
		mounted(){

		},
		methods: {
			shoucang(index) {
				this.furomList[index].shou==0 ? this.furomList[index].shou =1 :this.furomList[index].shou=0
				if(this.furomList[index].shou ==1 ) {
					this.furomList[index].collection++
				}else{
					this.furomList[index].collection--
				}
			},
			dianzan(index){
				
				this.furomList[index].dian==0 ? this.furomList[index].dian =1 :this.furomList[index].dian=0
				if(this.furomList[index].dian ==1 ) {
					this.furomList[index].fabulous++
				}else{
					this.furomList[index].fabulous--
				}
			},
			backTop(e){
				console.log("---------------现在的高度",e);
				this.topItem = "topPosition"
			},
			scrollDown(e){
				this.scroll = e.detail.scrollTop
				this.isShow = this.scroll>280
				this.topItem = ''
			},
			// 打开地图导航
			location(lat, lon) {
				
				//判断用户是否开启定位功能
				let system = uni.getSystemInfoSync();// 获取系统信息
				  	if (system.platform === 'android') { // 判断平台
					    var context = plus.android.importClass("android.content.Context");
				    	var locationManager = plus.android.importClass("android.location.LocationManager");
				    	var main = plus.android.runtimeMainActivity();
				    	var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
				    	if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
				      		uni.showModal({
				        		title: '提示',
				        		content: '请打开定位服务功能',
				        		showCancel: false, // 不显示取消按钮
				        		success() {
				          			if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
				            			var Intent = plus.android.importClass('android.content.Intent');
				            			var Settings = plus.android.importClass('android.provider.Settings');
				            			var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS); 
				            			main.startActivity(intent); // 打开系统设置GPS服务页面
				          			} else {
				            			console.log('GPS功能已开启');
				          			}
				        		}
				      		});	
				    	}else {
							this.handleOpenNavigation()
						}
				 	}else if(system.platform === 'ios'){
						var cllocationManger = plus.ios.import("CLLocationManager");
				        var enable = cllocationManger.locationServicesEnabled();
				        var status = cllocationManger.authorizationStatus();
				        plus.ios.deleteObject(cllocationManger);
				        if (enable && status != 2) {
							this.handleOpenNavigation()
				            console.log("手机系统的定位已经打开");
				        } else {
				            console.log("手机系统的定位没有打开");
				            uni.showModal({
				                title: '提示',
				                content: '请打开定位服务功能',
				                showCancel: false, // 不显示取消按钮
				                success() {
				                    var UIApplication = plus.ios.import("UIApplication");
				                    var application2 = UIApplication.sharedApplication();
				                    var NSURL2 = plus.ios.import("NSURL");
				                    // var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");
				                    // var setting2 = NSURL2.URLWithString("App-Prefs:root=LOCATION_SERVICES");
				                    // var setting2 = NSURL2.URLWithString("app-settings");
				                    var setting2 = NSURL2.URLWithString("App-Prefs:root=Privacy&path=LOCATION");
				                    // var setting2 = NSURL2.URLWithString("App-Prefs:root=Privacy&path=LOCATION_SERVICES");
				                    application2.openURL(setting2);
				                    plus.ios.deleteObject(setting2);
				                    plus.ios.deleteObject(NSURL2);
				                    plus.ios.deleteObject(application2);
				                }
				            });
				        }
					}

				
				
				// uni.openLocation({
				// 	latitude: lat,
				// 	longitude: lon,
				// 	success: function() {
				// 		console.log('success');
				// 	}
				// });
				
			},
			//  打开第三方地图
			async handleOpenNavigation() {
				// let {lat,lng,address} = this.enginessInfo;
				let lat = this.list.longitude
				let lng = this.list.latitude
				let address = this.list.schoolName
				console.log(lat, lng, address)
				// #ifdef APP-PLUS
				if (!this.judgeHasExistNavignation()) {
					
					return this.$showToast("该设备上不存在第三方导航APP");
					
				}
				
				await this.getPosition();
				
				let {
					latitude,
					longitude
				} = this.curSysPosition;
				let tLngLat = new plus.maps.Point(lat, lng); // 目的地
				let oLngLat = new plus.maps.Point(longitude, latitude); // 起始地
				console.log(tLngLat, address, oLngLat)
				plus.maps.openSysMap(tLngLat, address, oLngLat);
				// #endif
				// #ifdef MP-WEIXIN
				let oMap = uni.createMapContext("navMap", this)
			
				oMap.openMapApp({
					longitude: lng,
					latitude: lat,
					destination: address,
					fail: (e) => {
						this.$showToast("该设备上不存在第三方导航APP")
					}
				});
				// #endif
			},
			// 判断是否存在导航软件
			judgeHasExistNavignation() {
				let navAppParam = [{
						pname: 'com.baidu.BaiduMap',
						action: 'baidumap://'
					}, // 百度
					{
						pname: 'com.autonavi.minimap',
						action: 'iosamap://'
					}, // 高德
					{
						pname: 'com.tencent.map',
						action: 'tencentmap://'
					}, // 腾讯
				];
				return navAppParam.some(param => {
					return plus.runtime.isApplicationExist(param);
				})
			},
			getPosition() {
				let that = this;
				return new Promise(resolve => {
					uni.getLocation({
						type: 'gcj02',
						geocode: true, //设置该参数为true可直接获取经纬度及城市信息
						success: function(res) {
							let {
								latitude,
								longitude
							} = res
							that.curSysPosition.latitude = latitude;
							that.curSysPosition.longitude = longitude;
							resolve();
							
						}
					});
				})
			},
			changeType: function(type) {
				console.log("子穿父", type)
				this.fabulous(type)
			},
			async fabulous(type) {
				console.log(type)
				const res = await this.http.get("/app/muSchoolComment/vote", {
					id: type
				})
				console.log(res)
				console.log(res.msg)
				if (res.msg == "点赞成功") {
					this.typeId = type;
					console.log(111111)
					this.changeDyncList(1)
				} else if (res.msg == "取消点赞") {
					this.typeId = type;
					console.log(222222)
					this.changeDyncList(-1)
				}
			},
			changeDyncList(e) {
				console.log(this.evaluateList.evaluate)
				this.evaluateList.evaluate.forEach((ele, index) => {
					console.log(ele)
					console.log(index)
					if (ele.id == this.typeId) {
						let newEle = JSON.parse(JSON.stringify(ele))
						console.log("newEles", newEle)
						newEle.praise = newEle.praise * 1 + e
						if (e == 1) newEle.sort = 1
						if (e == -1) newEle.sort = null
						this.$set(this.evaluateList.evaluate, index, newEle)
					}
				})
			},
			async loadmore() {
				switch (this.titleIndex) {
					case 2:
						this.getDync()
						console.log('2')
						break;
					case 3:
						this.furom()
						console.log('3')
						
						break;
					case 4:
						console.log('4')
						break
					default:
						console.log("123")
				}
			},
			setH() {
				return 'height:' + (44 + this.barH) + 'px;padding-top:' + this.barH + 'px'
			},
			selectTitle(item) {
				console.log('点击')
				if(item.name === '介绍'){
					this.getIntroduce()
				}else if(item.name === '课程'){
					this.allCourse()
				}else if(item.name === '动态'){
					this.getDync()
				}else if(item.name === '大论坛'){
					this.furom()
				}else if(item.name === '评价'){
					this.evaluate()
				}
				// if (index > this.titleIndex) {
				// 	console.log("向右")
				// }
				// if (index < this.titleIndex) {
				// 	console.log("向左")
				// }
				// this.titleIndex = index
				console.log("-------------------------------",item);
				this.titleIndex = item.index
			},
			//介绍
			async getIntroduce() {
				let res = await this.http.get('/app/userHomeNavigation/schoolIntroduceInfo', {
					id: this.id
				});
				if (res.code != 200) {
					this.$toast(res.msg)
					return
				}
				this.items.schoolInfo = res.data
				this.list = res.data.schoolInfo
				let timer = null
				if(!this.flag) {
					timer = setTimeout(()=> {
						this.flag = true
					},800)
				}
				console.log(this.list)
			},
			//公告
			async getAnnouncement() {
				const res = await this.http.get("/user/homeNotice/artList")
				console.log("---------获取的公告",res);
				if(res.code == 200){
					this.items.announcement = res.rows
				}
				console.log("------------公告",this.items.announcement);
			},
			// 报名须知
			async getList() {
				const res = await this.http.get("/app/userHomeNavigation/selectAboutList", {})
				console.log(res);
				if (res.code == 200) {
					this.items.instructions = res.data[0]
				}
			},
			// 评分
			async getScore() {
				const res = await this.http.get("/app/muSchoolComment/scoreList", {
					schoolId: this.id
				})
				console.log("评分：", res)
				if (res.data == null) {
					this.score = "0.0"
				} else {
					this.score = res.data
					this.evaluateList.score = res.data
				}
			},
			//评价
			async evaluate() {
				const res = await this.http.get("/app/muSchoolComment/selectAllComment", {
					schoolId: this.id, //94
					pageNum: 1,
					pageSize: 10
				})
				console.log("获取到的评价列表", res)
				this.evaluateList.evaluate = res.data.twoComment
			},
			//名师展示
			async teacher() {
				let res = await this.http.get('/app/userHomeNavigation/selectTeachersInfo', {
					schoolId: this.id
				})
				console.log('=====================', res);
				this.items.teacher = res.data
			},
			//全部课程
			async allCourse() { // /app/userHomeNavigation/schoolCourseList
				const res = await this.http.get("/app/userHomeNavigation/schoolCourseLists", {
					schoolId: this.id //115
					//typeId:25
				})
				
				if(res.code === 200){
					this.courseList.course = res.data
				}
				// else if(res.data.code === 500){
				// 	console.log(res.data.code,'limumu')
					// uni.showToast({
					//     title:res.data.msg,
					//     duration: 1000
					// });
				// }
			},
			//动态
			async getDync() {
				console.log(this.currentPage[this.current])
				const res = await this.http.get("/app/School/selectPage", {
					schoolId: this.id, //187
					pageSize: 7,
					currentPage: this.currentPage[this.current]
				})
				console.log("--------------获取到的动态列表", res)
				// this.dyncList = res.rows
				var rows = res.rows.filter(item => item.top != 1) || []
				var top = res.rows.filter(item => item.top == 1)
			
				console.log(this.currentPage[this.current])
				if (this.currentPage[this.current] == 1) {
					this.dyncList = res.rows
					this.topList = top
					this.currentPage[this.current]++
				} else {
					if (res.total >= (this.dyncList.length + this.topList.length + res.rows.length)) {
						this.dyncList = [...this.dyncList, ...res.rows]
						this.topList = [...this.topList, ...top]
						this.currentPage[this.current]++
					}
				}
				// console.log("获取到的列表", res)
				if (res.code != 200) {
					return
				}
			},
			//论坛
			async furom(val) { 
				const res = await this.http.get("/app/School/selectMuSchoolArticle", {
					pageNum: this.pageNum[this.current],
					pageSize: 7,
					// navigation: 1, //导航栏类型(文章有，动态没有)
					articleId: 2, //1--动态 2--论坛/
					status: 2
				})
				console.log("获取到的论坛列表", res)
				var rows = res.rows.filter(item => item.top != 1) || []
				var top = res.rows.filter(item => item.top == 1)
				if (this.pageNum[this.current] == 1) {
					this.furomList = res.rows
					this.topList = top
					this.pageNum[this.current]++
				} else {
					if (res.total >= (this.furomList.length + this.topList.length + res.rows.length)) {
						this.furomList = [...this.furomList, ...res.rows]
						this.topList = [...this.topList, ...top]
						this.pageNum[this.current]++
					}
				}
				this.total = res.total
				console.log("获取到的列表", res)
				if (res.code != 200) {
					return
				}
			},
			// 是否点赞
			async getAllUserIdToComment() {
				const res = await this.http.get("/app/muSchoolComment/getAllUserIdToComment")
				console.log(res)
			},
			// 公告
			async notic() {
				// const res = await this.http.get("/app/school/selectNoticeList", {
				// 	schoolId: this.id
				// })
				// console.log("公告：", res)
				// if (res.code == 200) {
				// 	this.items.notics = res.data
				// } else {
				// 	return null;
				// }
			},


		}
	}
</script>

<style lang="scss" scoped>
	.back_top {
		width: 60rpx;
		height: 60rpx;
		opacity:0.8;
		border-radius: 50%;
	    background-color: #e1e1e1;
		position: fixed;
		bottom: 200rpx;
		right: 50rpx;
		z-index: 9999;
		text-align: center;
		line-height: 60rpx;
		image {
			width: 50%;
			height: 50%;
			position: relative;
			top: 5rpx;
		}
	}
	.xinxi {
		width: 85%;
		position: absolute;
		z-index: 999;
		top: 220rpx;
		left: 50rpx;

		view {
			&:nth-child(3) {
				margin-top: 10rpx;
			}
			&:nth-child(4) {
				margin-top: 20rpx;
			}
		}
      
		text {
			&:nth-child(1) {
				// 	position: absolute;
				// z-index: 999;
				// top: 333rpx;
				// left: 40rpx;
				color: #FFF;
			}


		}

		.xinxi-x {
			// background-color: black; 
			// padding-top: 40rpx;
			position: relative;
			// height: 120rpx;
			width: 100%;
			color: #FFF;
			.xinxi-x-s {
				width: 95%;
				// height: 44rpx;
				font-size: 24rpx;
				line-height: 44rpx;
				image {
					vertical-align:bottom;
					width: 45rpx;
					height: 45rpx;
				}
			}
			
		}
		.xinxi-x1 {
		
			font-size: 24rpx;
			position: absolute;
			top: 320rpx;
		}

		.xinxi-s {
			// border: 1rpx solid red;
			line-height: 30rpx;
			margin-top: 20rpx;
			font-size: 28rpx;
			height: 130rpx;
			color: #FFF;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			.schoolTitle {
				
			}
			.score {
				font-size: 24rpx;
				width: 110rpx;
				height: 30rpx;
				line-height: 30rpx;
				border-radius: 15rpx;
				text-align: center;
				float: right;
				background-color: #FC6129;
			}
		}

	}
    .top-bar1 {
		background-color: #f3f3f3;
	}
	.top-bar {
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		height: 160rpx;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
        text-align: center;
		.bare-cell {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.bar-left {
			position: relative;
			top: -16rpx;
			image {
				width: 20rpx;
				height: 30rpx;
				top: 50rpx;
				right: 30rpx;
			}

			flex: 2;
			height: 100%;
		}

		.bar-center {
			margin-top: 32rpx;
			font-size: 36rpx;
			color: #FFF;
			flex: 5;
			height: 100%;
		}
        .bar-center1 {
			margin-top: 32rpx;
			font-size: 36rpx;
			color: #333;
			flex: 5;
			height: 100%;
		}
		.bar-right {
			flex: 2;
			height: 100%;
		}
	}

	.top-bar-fill {
		box-sizing: border-box;
		width: 100%;
	}

	.page-view {
		width: 100%;
		min-height: 100vh;
		position: relative;
		.imas{
			position: absolute;
			top: 47px;
			left: 15px;
			z-index: 2;
			display: flex;
			align-items: center;
			.test{
				margin: 0 75px;
				color: #FFF;
			}
		}
	}

	.img-box {
		width: 100%;
		height: 630rpx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.img-box:after {
		position: absolute;
		top: 0;
		left: 0;
		content: "";
		background: linear-gradient(rgba(0, 0, 0, 0), rgba(70, 70, 70, 1.0));
		// opacity: 0.2;
		z-index: 1;
		width: 100%;
		height: 99%;
	}

	.content-view {
		width: 100%;
		border-radius: 50rpx 50rpx 0 0;
		min-height: calc(100vh - 275px);
		background-color: #f3f3f3;
		position: absolute;
		top: 580rpx;
		z-index: 3;
		overflow: hidden;
		//下面的样式为旧版tabs
		.title-line {
			display: flex;
			box-sizing: border-box;
			padding: 0 30rpx;
			justify-content: space-around;
			.title-cell {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.text-line {
				height: 6rpx;
				width: 50rpx;
			}
			.text-line-show {
				background-color: #2356ff;
				animation: animatLeft 0.5s linear 1;
			}
			@keyframes animatLeft {
				0% {
					opacity: 0;
					
				}

				100% {
					opacity: 1;
				}
			}
		}
	}

	.img-box ::v-deep image {
		width: 100%;
		height: 100%;
	}
</style>
