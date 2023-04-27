<template>
	<view class="page-view">
		<view class="top-bar" :style="setH()">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()"></text> -->
				<image @click="uni.navigateBack()" src="../../static/images/left-2.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>民办院校</text>
				<!-- <button @click="uni.navigateTo({
					url:'../interest-details/public-details'
				})">兴趣培养</button> -->
			</view>
			<view class="bar-right bare-cell">
				<!-- <text>发布</text> -->
			</view>
		</view>

		<view class="img-box">
			<image :src="items.schoolInfo.schoolInfo.logoImgUrl"></image>

		</view>

		<view class="xinxi">
			<text style="font-size: 40rpx;">{{items.schoolInfo.schoolInfo.schoolName}}</text>
			<text>4.9分</text>
			<view class="xinxi-s">{{items.schoolInfo.schoolInfo.schoolTitle}}</view>
			<view style="color:#dde1da;" class="xinxi-x">
				<image style="width:30rpx;height: 20rpx;margin-right: 1rpx;" src="../../static/images/dianhua.svg"
					mode=""></image> 报名热线:{{items.schoolInfo.schoolInfo.phone}}
			</view>
			<view style="color:#dde1da;" class="xinxi-x">
				<image style="width:15rpx;height: 20rpx; margin-left: 10rpx; margin-right: 6rpx;"
					src="../../static/images/location.png" mode=""></image>
				{{items.schoolInfo.schoolInfo.schoolAddress}}
			</view>
		</view>


		<view class="content-view">
			<view class="title-line">
				<view class="title-cell" v-for="(item, index) in titleList" :key="item.title"
					@click="selectTitle(index)">
					<text style="line-height: 70rpx;"
						:style="index == titleIndex? 'color: #2356ff':'#666666'">{{ item.title }}</text>
					<view class="text-line" :class="{'text-line-show': titleIndex == index}"></view>
				</view>
			</view>
			<!-- 介绍模块 -->
			<Interest :interInfo="items" v-if="this.titleIndex == 0"></Interest>
			<!-- 课程模块 -->
			<Test :course="courseList" v-if='this.titleIndex == 1'></Test>
			<!-- 商城 -->
			<Store :storeList="store" v-if='this.titleIndex == 2'></Store>
			<!-- 动态 -->
			<Active :schoolDync="dyncList" v-if="this.titleIndex == 3"></Active>
			<!-- 论坛 -->
			<Forum :schoolFurom="furomList" v-if="this.titleIndex == 4"></Forum>
			<!-- 评价 -->
			<Evaluate :schoolevaluate="evaluateList" v-if="this.titleIndex == 5"></Evaluate>
		</view>

	</view>
</template>

<script>
	import Store from './components/store.vue'
	import Interest from './components/interest.vue'
	import Test from './components/test.vue'
	import Forum from './components/forum.vue'
	import Evaluate from './components/evaluate.vue'
	import Active from './components/active.vue'
	export default {
		components: {
			Interest,
			Test,
			Forum,
			Evaluate,
			Active,
			Store
		},
		data() {
			return {
				// 全部课程
				courseList: {
					course: {},
					classify: {},
					schoolId: {}
				},
				items: {
					schoolInfo: {},
					teacher: {},
					schoolId: {},
					schoolType: {},
					types: {}
				},
				evaluateList: {}, //评价
				//学校论坛
				furomList: {},
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
				val: 233,

				store: {
					commodity: {},
					classifyList: {},
					id:{}
				},
			};
		},
		onLoad(options) {
			this.aaa()
			uni.getSystemInfo({
				success: res => {
					console.log(res.statusBarHeight)
					this.barH = res.statusBarHeight
				}
			})
			console.log("传进来的参数", options)
			this.id = options.id
			this.courseList.schoolId = this.id
			this.items.schoolId = this.id
			this.items.schoolType = options.schoolType
			this.items.types = options.types
			this.store.id = this.id
			this.setTitleList()
			this.goodDirection()
			this.getIntroduce()
			this.teacher() //名师展示
			this.classify() //课程分类
			this.allCourse() //全部课程
			this.getDync() //动态
			this.furom() // 论坛
			this.evaluate() //评价
			this.storeList()
			this.getShopclassifyList() //商城分类
			// this.getList()
			// this.titleIndex = 0
		},
		// onShow() {
		// 	console.log(111111111111111111)
		// 	setTimeout(()=>{
		// 		this.titleIndex = 0
		// 	},500)
		// },
		methods: {
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

			// async storeList(){
			// 	let res = await this.http.get('/app/type/listType',{
			// 		type:
			// 		userType:2,
			// 		storeType:2
			// 	})
			// 	console.log(res)
			// },
			async aaa() {
				let res = await this.http.get('/app/School/vote', {
					id: 2,
				})
				console.log(res)
			},
			setH() {
				return 'height:' + (44 + this.barH) + 'px;padding-top:' + this.barH + 'px'
			},

			setTitleList() { //设置标题列表
				this.titleList = [{
						title: '介绍'
					},
					{
						title: '课程'
					},
					{
						title: '商城'
					},
					{
						title: '动态'
					},
					{
						title: '论坛'
					},
					{
						title: '评价'
					}
				]
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

			// 介绍
			async getIntroduce() {
				let res = await this.http.get('/app/userHomeNavigation/schoolIntroduceInfo', {
					id: this.id
				});
				if (res.code != 200) {
					this.$toast(res.msg)
					return
				}
				this.items.schoolInfo = res.data
				// this.$refs.interCom.demo = res.data
				// console.log(this.res)
				// this.schoolInfo = res.data
				console.log(this.items)
			},

			//名师展示
			async teacher() {
				let res = await this.http.get('/app/userHomeNavigation/selectTeachersInfo', {
					schoolId: this.id
				})
				console.log('=====================', res);
				this.items.teacher = res.data
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
					pageNum: 1,
					pageSize: 2,
					// navigation: 1, //导航栏类型(文章有，动态没有)
					articleId: 2, //1--动态 2--论坛/
				})
				console.log("获取到的动态列表", res)
				if (res.code != 200) {
					return
				}
				this.furomList = res.rows
			},

			//评价
			async evaluate() {
				const res = await this.http.get("/app/muSchoolComment/getMuschoolComment", {
					schoolId: this.id //94
				})
				console.log("获取到的评价列表", res)
				this.evaluateList = res.data
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
				// top: 333rpx;
				// left: 80rpx;
			}

		}

		.xinxi-x {
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			font-size: 24rpx;
		}

		.xinxi-s {
			// border: 1rpx solid red;
			height: 120rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			color: #e8e7e8;
			font-size: 28rpx;
		}
	}

	.top-bar {
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
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
				top: 50rpx;
				right: 30rpx;
			}

			flex: 2;
			height: 100%;
		}

		.bar-center {
			margin-top: 50rpx;
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

	.content-view {
		width: 100%;
		border-radius: 50rpx 50rpx 0 0;
		min-height: calc(100vh - 275px);
		background-color: #f3f3f3;
		position: absolute;
		top: 550rpx;

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
					transform: translateX(-100%);
				}

				100% {
					opacity: 1;
					transform: translateX(0);
				}
			}
		}
	}
</style>
