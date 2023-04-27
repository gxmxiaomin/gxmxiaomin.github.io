<template>
	<view class="page-view">
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()"></text> -->
				<image @click="uni.navigateBack()" src="../../static/images/left-2.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>公办院校</text>
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
			<text>{{Number(items.schoolInfo.schoolInfo.score).toFixed(1)}}分</text>
			<view class="xinxi-s">{{items.schoolInfo.schoolInfo.schoolTitle}}</view>
			<view style="color:#dde1da;" class="xinxi-x">
				<image style="width:30rpx;height: 20rpx;margin-right: 1rpx;" src="../../static/images/dianhua.svg"
					mode=""></image> 报名热线:{{items.schoolInfo.phone}}
			</view>
			<view style="color:#dde1da;" class="xinxi-x">
				<image style="width:15rpx;height: 20rpx;margin-left: 10rpx; margin-right: 6rpx;"
					src="../../static/images/location.png" mode=""></image> {{items.schoolInfo.schoolAddress}}
			</view>
		</view>


		<view class="content-view">
			<view class="title-line">
				<view class="title-cell" v-for="(item, index) in titleList" :key="index" @click="selectTitle(index)">
					<text style="line-height: 70rpx;"
						:style="index == titleIndex? 'color: #2356ff':'#666666'">{{ item.title }}</text>
					<view class="text-line" :class="{'text-line-show': titleIndex == index}"></view>
				</view>
			</view>
			<!-- 介绍模块 -->
			<Interest :interInfo="items" v-if="titleIndex === 0" :sharUrl="sharUrl" :schoolName='items.schoolInfo.schoolInfo.schoolTitle' :isShare='isShare'></Interest>
			<!-- 课程 -->
			<Test :course="courseList" v-if="titleIndex === 1"></Test>
			<!-- 动态 -->
			<Active :schoolDync="dyncList" v-if="titleIndex === 2"></Active>
			<!-- 论坛 -->
			<Forum @test="test" :schoolFurom="furomList" v-if="titleIndex === 3"></Forum>
			<!-- 评价 -->
			<Evaluate :schoolevaluate="evaluateList" v-if="titleIndex === 4"></Evaluate>
		</view>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
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
			Active
		},
		data() {
			return {
				isShare:false,
				//课程
				courseList: {
					classify: {},
					course: {},
					schoolId: {}
				},
				evaluateList: {}, //评价
				//学校论坛
				furomList: [],
				//学校动态
				dyncList: {
					dync: {},
				},
				items: {
					schoolInfo: {},
					teacher: {},
					schoolId: {},
					schoolType: {},
					types: {},
					grade:{}
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

			};
		},
		onLoad(options) {
			this.messageShowTip.showTextMessage(this)
			console.log("传进来的参数", options)
			this.id = options.id
			this.courseList.schoolId = this.id
			// this.items.grade = options.grade
            this.isShare = options.isShare || false
			this.items.schoolId = this.id
			this.items.schoolType = options.schoolType
			this.items.types = options.types
			console.log(this.items,'非官方的放大方法让大幅度反对法 ',options.grade)
			this.sharUrl = this.shareUrlList.publicdetailUrl({
						id:options.id,
						schoolType:options.schoolType,
						types:options.types
					})


			
			this.setTitleList()
			this.goodDirection()
			this.getIntroduce() //介绍
			this.teacher()
			this.getDync()
			this.furom()
			this.evaluate()
			this.classify() //课程分类
			this.allCourse() //全部课程
			// this.titleIndex = 0
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		// onShow() {
		// 	console.log(111111111111111111)
		// 	setTimeout(()=>{
		// 		this.titleIndex = 0
		// 	},500)
		// },
		methods: {
			test() {
				this.furomPage++
				this.furom()
			},
			// setH() {
			// 	return 'height:' + (44 + this.barH) + 'px;padding-top:' + this.barH + 'px'
			// },

			setTitleList() { //设置标题列表
				this.titleList = [{
						title: '介绍'
					},
					{
						title: '课程'
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
				this.titleIndex = index
				if(index === 0){
					this.getIntroduce()
				}else if(index === 1){
					this.classify()
				}else if(index === 2){
					this.getDync()
				}else if(index === 3){
					this.furom()
				}else if(index === 4){
					this.evaluate()
				}
			},

			// 获取自己的擅长方向
			async goodDirection() {
				let res = await this.http.get('/app/userInfo/goodDirectionType')
				console.log('擅长方向', res);
				if (res.code == 200) {
					this.direction = res.data;
				} else {
					// this.$toast(res.msg)
				}
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
				// top: 333rpx;
				// left: 80rpx;
			}

		}

		.xinxi-x {
			font-size: 24rpx;
			min-height: 40rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		.xinxi-s {
			// border: 1rpx solid red;
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
		// background-color: #fff;
		box-sizing: border-box;
		height: calc(44px + var(--status-bar-height));
		padding-top: var(--status-bar-height);
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
				// animation: animatLeft 0.5s linear 1;
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
