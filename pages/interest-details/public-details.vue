<template>
	<view class="page-view">
		<view class="top-bar">
			<!-- :style="setH()" -->
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()"></text> -->
				<image @click="uni.navigateBack()" src="../../static/images/left-2.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text v-if="items.types == 2">兴趣培养</text>
				<text v-else-if="items.types == 4">公办学校</text>
				<text v-else-if="items.types == 3">民办院校</text>
				<text v-else-if="items.types == 1">幼儿教育</text>
				<!-- <text v-else-if="items.schoolType == 7">河南电视台少儿艺术中心</text> -->
				<text v-else>职业院校</text>
			</view>
			<view class="bar-right bare-cell">
				<!-- <text>发布</text> -->
			</view>
		</view>

		<view class="img-box">
			<image :src="((items.schoolInfo||{}).schoolInfo||{}).logoImgUrl"></image>
		</view>

		<view class="xinxi">
			<text style="font-size: 40rpx;">{{((items.schoolInfo||{}).schoolInfo||{}).schoolName}}</text>
			<text> <image src="../../static/images/retes.png" mode=""></image> {{Number(score).toFixed(1)}}分</text>
			<view class="xinxi-s">{{(items.schoolInfo.schoolInfo||{}).schoolTitle}}</view>
			<view style="color:#dde1da;" class="xinxi-x">
				<image style="width:30rpx;height: 20rpx;margin-right: 1rpx;" src="../../static/images/dianhua.svg"
					mode=""></image> 报名热线:{{(items.schoolInfo.schoolInfo||{}).phone}}
			</view>
			<view style="color:#dde1da;" class="xinxi-x">
				<image @click="location(items.schoolInfo.schoolInfo.latitude,items.schoolInfo.schoolInfo.longitude)"
					style="width:15rpx;height: 20rpx;margin-left: 10rpx; margin-right: 6rpx;"
					src="../../static/images/location.png" mode=""></image>
				{{(items.schoolInfo.schoolInfo||{}).schoolAddress}}
				<image @click="location(items.schoolInfo.schoolInfo.latitude,items.schoolInfo.schoolInfo.longitude)"
					class="img" src="../../static/images/daohang.png" mode=""></image>
			</view>
		</view>




		<view class="content-view">
			<view class="title-line">
				<view class="title-cell" v-for="(item, index) in setV" :key="item.title" @click="selectTitle(item.id)">
					<text style="line-height: 70rpx;"
						:style="item.id == titleIndex? 'color: #2356ff':'#666666'">{{ item.title }}</text>
					<view class="text-line" :class="{'text-line-show': titleIndex == item.id}"></view>
				</view>
			</view>

			<!-- 介绍模块 -->
			<Interest :interInfo="items" v-if="this.titleIndex == 0" :sharUrl="sharUrl" :invitationCode="invitationCode"
				:isShare="isShare" @upDateInfo="getIntroduce"></Interest>
			<!-- 课程 -->
			<Test :isShare="isShare" :invitationCode="invitationCode" :course="courseList"
				v-if="this.titleIndex == 1 && items.schoolType != 5"></Test>
			<!-- 商城 -->
			<Store :storeList="store" v-if='this.titleIndex == 2 && (items.schoolType == 3 || items.schoolType == 1)'>
			</Store>
			<!-- 动态 -->
			<Active :isShare="isShare" :invitationCode="invitationCode" :schoolDync="dyncList"
				v-if="this.titleIndex == 3"></Active>
			<!-- 论坛 师友会 -->
			<!-- <ForumMin @test="test" :schoolType="schoolType" :schoolFurom="furomList" v-if="this.titleIndex == 4"></ForumMin> -->
			<Forum :isShare="isShare" :invitationCode="invitationCode" @test="test" :Type="Type"
				:schoolFurom="furomList" v-if="this.titleIndex == 4"></Forum>
			<!-- 评价 -->
			<Evaluate :schoolevaluate="evaluateList" v-if="this.titleIndex == 5"></Evaluate>
		</view>

	</view>
</template>

<script>
	import ForumMin from '@/components/components/forum-min.vue'
	import Interest from '@/components/components/interest.vue'
	import Test from '@/components/components/test.vue'
	import Store from '@/components/components/store.vue'
	import Forum from '@/components/components/forum.vue'
	import Evaluate from '@/components/components/evaluate.vue'
	import Active from '@/components/components/active.vue'
	export default {
		components: {
			Interest,
			Test,
			Forum,
			Evaluate,
			Active,
			Store,
			ForumMin
		},
		data() {
			return {
				// 全部课程
				courseList: {
					course: {},
					classify: {},
					schoolId: {}
				},
				evaluateList: {}, //评价
				//介绍
				items: {
					schoolInfo: {},
					teacher: {},
					schoolId: {},
					schoolType: {},
					types: {},
					grade: {}
				},
				//学校论坛
				furomList: [],
				Type: [],
				//学校动态
				dyncList: {
					dync: {},
				},
				id: "",
				schoolType: "",
				direction: [],
				schoolInfo: {
					img: 'https://img2.baidu.com/it/u=1572613686,938558453&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=400'
				},
				barH: 0,
				titleList: [],
				titleIndex: 0,
				sharUrl: "",
				furomPage: 1,
				isShare: false,
				store: {
					commodity: {},
					classifyList: {},
					id: {}
				},
				title: {
					0: [{
						title: '介绍',
						id: 0
					}, {
						title: '课程',
						id: 1
					}, {
						title: '动态',
						id: 3
					}, {
						title: '师友会',
						id: 4
					}, {
						title: '评价',
						id: 5
					}], //兴趣
					1: [{
						title: '介绍',
						id: 0
					}, {
						title: '课程',
						id: 1
					}, {
						title: '商城',
						id: 2
					}, {
						title: '动态',
						id: 3
					}, {
						title: '师友会',
						id: 4
					}, {
						title: '评价',
						id: 5
					}], //民办
					2: [{
						title: '介绍',
						id: 0
					}, {
						title: '课程',
						id: 1
					}, {
						title: '动态',
						id: 3
					}, {
						title: '师友会',
						id: 4
					}, {
						title: '评价',
						id: 5
					}], //公办
					3: [{
						title: '介绍',
						id: 0
					}, {
						title: '动态',
						id: 3
					}, {
						title: '师友会',
						id: 4
					}, {
						title: '评价',
						id: 5
					}], //职业
					4: [{
						title: '介绍',
						id: 0
					}, {
						title: '商城',
						id: 2
					}, {
						title: '动态',
						id: 3
					}, {
						title: '师友会',
						id: 4
					}, {
						title: '评价',
						id: 5
					}] //幼儿教育
				},
				keyWord: 1,
				score: '',
				invitationCode: '',
				// enginessInfo: [lat,lng,address],
				curSysPosition: []
			};
		},
		computed: {
			setV() {
				return this.title[this.keyWord]
			}
		},
		onLoad(options) {
			console.log("传进来的参数", options)
			this.id = options.id
			this.store.id = this.id
			this.courseList.schoolId = this.id
			this.items.grade = options.grade
			this.isShare = options.isShare || false
			this.Type = options.schoolType
			this.invitationCode = options.invitationCode

			this.items.schoolId = this.id
			this.items.schoolType = options.schoolType
			this.items.types = options.types
			this.sharUrl = this.shareUrlList.publicdetailUrl({
				id: options.id,
				schoolType: options.schoolType,
				types: options.types
			})
			console.log(this.sharUrl)
			if (options.score) {
				this.score = options.score
			} else {
				this.getScore()
			}
			console.log("分享链接>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.sharUrl)

			console.log(this.id)
			this.setTitleList()
			this.goodDirection()
			this.getIntroduce()
			this.teacher() //名师展示
			this.getDync() //动态
			this.furom() // 论坛
			this.evaluate() //评价
			this.classify() //课程分类
			this.allCourse() //全部课程
			this.storeList()
			this.getShopclassifyList() //商城分类
			this.getplList()
			// this.aaa()
			// this.titleIndex = 0
		},
		onReachBottom() {
			if (this.titleIndex == 4) {
				this.furomPage++
				this.furom()
			}
		},
		methods: {
			// 打开地图导航
			location(lat, lon) {
				console.log(lat,lon)
				// this.handleOpenNavigation()
				// uni.openLocation({
				// 	latitude: lat,
				// 	longitude: lon,
				// 	success: function() {
				// 		console.log('success');
				// 	}
				// });
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function (res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: lat,
							longitude: lon,
							success: function () {
								console.log('success');
							}
						});
					}
				});

			},
			//  打开第三方地图
			async handleOpenNavigation() {
				// let {lat,lng,address} = this.enginessInfo;
				let lat = this.items.schoolInfo.schoolInfo.longitude
				let lng = this.items.schoolInfo.schoolInfo.latitude
				let address = this.items.schoolInfo.schoolInfo.schoolName
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

			//评分
			async getScore() {
				const res = await this.http.get("/app/muSchoolComment/scoreList", {
					schoolId: this.id
				})
				console.log("评分：", res)
				if (res.data == null) {
					this.score = "0.0"
				} else {
					this.score = res.data
				}
			},
			// 商城分类
			async getShopclassifyList() {
				let res = await this.http.get('/app/type/listType', {
					type: 1,
				});
				if (res.code == 200) {
					this.store.classifyList = res.data
					console.log(this.classifyList)
				} else {
					this.$toast(res.msg);
				}
			},
			//商城
			async storeList() {
				let res = await this.http.get('/app/goods/storeList', {
					storeId: this.id
					// userType: 2
				});
				console.log('****************************************************')
				console.log(res)
				this.store.commodity = res.rows
			},

			test() {
				this.furomPage++
				this.furom()
			},
			async aaa() {
				let res = await this.http.get('/app/School/getMuSchoolArticleList', {})
			},
			setH() {
				return 'height:' + (44 + this.barH) + 'px;padding-top:' + this.barH + 'px'
			},

			setTitleList() { //设置标题列表
				if (this.items.schoolType == 2) {
					this.keyWord = 0
				} else if (this.items.schoolType == 4) {
					this.keyWord = 2
				} else if (this.items.schoolType == 3) {
					this.keyWord = 1
				} else if (this.items.schoolType == 5) {
					this.keyWord = 3
				} else if (this.items.schoolType == 1) {
					this.keyWord = 4
				}
				return

			},

			selectTitle(index) {
				if (index > this.titleIndex) {
					console.log("向右")
				}
				if (index < this.titleIndex) {
					console.log("向左")
				}
				this.titleIndex = index
			},

			// 获取自己的擅长方向
			async goodDirection() {
				let res = await this.http.get('/app/userInfo/goodDirectionType')
				console.log('擅长方向', res);
				if (res.code == 200) {
					this.direction = res.data;
				} else {
					this.$toast(res.msg)
				}
			},

			//介绍信息
			async getIntroduce() {
				let submit = {
					id: this.id
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/userHomeNavigation/schoolIntroduceInfo', submit);
				console.log("获取到的数据信息", res)
				if (res.code != 200) {
					this.$toast(res.msg)
					return
				}
				this.items.schoolInfo = res.data
				console.log(this.items)
				// this.$refs.interCom.demo = res.data
				// console.log(this.res)
				// this.schoolInfo = res.data
				// console.log(this.schoolInfo)
			},

			//名师展示
			async teacher() {
				let res = await this.http.get('/app/userHomeNavigation/selectTeachersInfo', {
					schoolId: this.id
				})
				console.log('=====================', res);
				this.items.teacher = res.data
			},

			//动态
			async getDync() {
				const res = await this.http.get("/app/School/selectPage", {
					schoolId: this.id, //187
					pageSize: 2,
					currentPage: 1
				})
				console.log("--------------获取到的动态列表", res)
				if (res.code != 200) {
					return
				}
				this.dyncList.dync = res.rows
			},

			//论坛
			async furom() {
				const res = await this.http.get("/app/School/selectMuSchoolArticle", {
					pageNum: this.furomPage,
					pageSize: 8,
					// navigation: 1, //导航栏类型(文章有，动态没有)
					articleId: 2, //1--动态 2--论坛/
				})
				console.log("获取到的动态列表", res)
				if (res.code != 200) {
					return
				}
				this.furomList = this.furomList.concat(res.rows)
			},

			//评价
			async evaluate() {
				const res = await this.http.get("/app/muSchoolComment/getMuschoolComment", {
					schoolId: this.id //94
				})
				console.log("获取到的评价列表", res)
				this.evaluateList = res.data
			},

			//课程分类
			async classify() {
				const res = await this.http.get("/app/userHomeNavigation/courseTypeList", {
					schoolId: this.id //115
				})
				console.log("获取到的课程类别列表", res)
				this.courseList.classify = res.data
			},

			//全部课程
			async allCourse() { // /app/userHomeNavigation/schoolCourseList
				const res = await this.http.get("/app/userHomeNavigation/schoolCourseLists", {
					schoolId: this.id //115
					//typeId:25
				})
				console.log("获取到的课程列表", res)
				this.courseList.course = res.data
			},
		}

	}
</script>

<style lang="scss" scoped>
	.xinxi {
		width: 85%;
		position: absolute;
		z-index: 999;
		top: 260rpx;
		left: 50rpx;

		view {
			&:nth-child(3) {
				margin-top: 10rpx;
			}

			&:nth-child(4) {
				margin-top: 20rpx;
			}

			color: #FFF;
		}

		text {
			&:nth-child(1) {
				// 	position: absolute;
				// z-index: 999;
				top: 333rpx;
				left: 40rpx;
				color: #FFF;
			}

			&:nth-child(2) {
				// position: absolute;
				display: inline-block;
				background: #f37046;
				padding: 0 20rpx 0 20rpx;
				z-index: 999;
				margin-left: 20rpx;
				color: #FFF;
				border-radius: 20rpx;
				font-size: 26rpx;
				
				image {
					width: 20rpx;
					height: 20rpx;
					margin-right: 5rpx;
				}
			}

		}

		.xinxi-x {
			font-size: 24rpx;
			// min-height: 40rpx;
			min-height: 35rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;

			.img {
				width: 40rpx;
				height: 40rpx;
				float: right;
				position: absolute;
				margin-top: -20rpx;
				right: 0rpx;
			}
		}

		.xinxi-s {
			min-height: 130rpx;
			box-sizing: border-box;
			padding-bottom: 5rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
	}

	.top-bar {
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		height: calc(44px + var(--status-bar-height));
		// padding-top: var(--status-bar-height);
		// background-color: #fff;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.bar-left {
			image {
				width: 20rpx;
				height: 30rpx;
				// top: 50rpx;
				right: 30rpx;
			}

			flex: 2;
			height: 100%;
		}

		.bar-center {
			// margin-top: 50rpx;
			color: #FFF;
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
	}

	.img-box {
		width: 100%;
		height: 600rpx;
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

	// .img-box{
	//     height:100%;
	//     width:100%;
	//     background: rgba(162, 162, 162, 0.4);
	// }

	.content-view {
		width: 100%;
		border-radius: 50rpx 50rpx 0 0;
		min-height: calc(100vh - 275px);
		background-color: #f3f3f3;
		position: absolute;
		top: 550rpx;
		z-index: 3;

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
				animation: animatLeft 0.25s linear 1;
			}

			// @keyframes animatLeft {
			// 	0% {
			// 		opacity: 0;
			// 		transform: translateX(-100%);
			// 	}
			// 	100% {
			// 		opacity: 1;
			// 		transform: translateX(0);
			// 	}
			// }
		}
	}
</style>
