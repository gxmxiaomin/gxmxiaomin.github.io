<template>
	<view class="page-view">
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()"></text> -->
				<image @click="uni.navigateBack()" src="../../static/images/left-2.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>社会实践</text>
			</view>
			<view class="bar-right bare-cell">
				<!-- <text>发布</text> -->
			</view>
		</view>

		<view class="img-box">
			<image :src="item.coverImg"></image>
		</view>

		<view class="xinxi">
			<text style="font-size: 40rpx;">{{item.name}}</text>
			<text>4.9分</text>
			<view class="xinxi-s"> {{item.details}}</view>
			<view style="color:#dde1da;" class="xinxi-x">
				<image style="width:30rpx;height: 20rpx;margin-right: 1rpx;" src="../../static/images/dianhua.svg"
					mode=""></image> 报名热线:{{item.hotline}}
			</view>
			<view style="color:#dde1da;" class="xinxi-x">
				<image style="width:15rpx;height: 20rpx;margin-left: 10rpx; margin-right: 6rpx;"
					src="../../static/images/location.png" mode=""></image>
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
			<Interest :interInfo="items" v-if="this.titleIndex == 0"></Interest>
			<!-- 课程 -->
			<!-- <Test v-if="this.titleIndex == 1"></Test> -->
			<!-- 商城 -->
			<Store :storeList="store" v-if='this.titleIndex == 1'></Store>
			<!-- 动态 -->
			<Active :schoolDync="dyncList" v-if="this.titleIndex == 2"></Active>
			<!-- 论坛 -->
			<Forum @test="test" :schoolFurom="furomList" v-if="this.titleIndex == 3"></Forum>
			<!-- 评价 -->
			<Evaluate :schoolevaluate="evaluateList" v-if="this.titleIndex == 4"></Evaluate>
		</view>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
	</view>
</template>

<script>
	import Interest from './components/interest.vue'
	import Store from './components/store.vue'
	import Forum from './components/forum.vue'
	import Evaluate from './components/evaluate.vue'
	import Active from './components/active.vue'
	export default {
		components: {
			Interest,
			Forum,
			Evaluate,
			Active,
			Store
		},
		data() {
			return {
				schoolId:'',
				isShare: false,
				titleList: [],
				titleIndex: 0,
				id: '',
				//详情数据
				item: '',
				items:{
					schoolInfo:{},
					teacher:{},
					id:{}
				},
				store: {
					commodity: {},
					classifyList: {},
					id:{}
				},
				//学校动态
				dyncList: {
					dync: {},
				},
				//学校论坛
				furomList: [],
				furomPage:1,
				evaluateList:{}, //评价
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.items.id = this.id
			this.store.id = this.id
			this.schoolId = option.schoolId
			console.log(option.id);
			this.setTitleList()
			this.getIntroduce() //详情
			this.introduce() // 介绍
			this.teacherShow() //教官展示
			this.storeList()
			this.getShopclassifyList() //商城分类
			this.getDync() //动态
			this.furom()//论坛
			this.evaluate() //评价
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},

		methods: {
			test(){
				this.furomPage++
				this.furom()
			},
			//教官展示
			async teacherShow() {
				let res = await this.http.get('/app/userHomeNavigation/selectTeachersInfo', {
					schoolId: this.schoolId
				});
				this.items.teacher = res.data
			},
			
			//详情
			async getIntroduce() {
				let res = await this.http.get('/app/socialPractice/info', {
					id: this.id,

				});
				console.log(res, '1111111111');
				this.item = res.data
			},
			
			//介绍
			async introduce() {
				console.log(this.id)
				let res = await this.http.get('/app/socialPractice/selectSocialPracticeVo', {
					id: this.id,

				});
				// console.log(res, '000000000');
				this.items.schoolInfo = res.data
				console.log(this.items)
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
					storeId: this.schoolId
					// userType: 2
				});
				console.log('****************************************************')
				console.log(res)
				this.store.commodity = res.rows
			},
			
			//动态
			async getDync() {
				const res = await this.http.get("/app/School/selectPage", {
					schoolId: this.schoolId, //187
					pageSize: 2,
					currentPage:1
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
					schoolId:this.schoolId //94
				})
				console.log("获取到的评价列表", res)
				this.evaluateList = res.data
			},

			test() {
				this.furomPage++
				this.furom()
			},

			setTitleList() { //设置标题列表
				this.titleList = [{
						title: '介绍'
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
				this.titleIndex = index
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
