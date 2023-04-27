<template>
	<view class="content">
	

		<!-- <view class="jinwan">
			<view @click="goclocl('1')">
				<text class="text-titles"><i style="font-style: normal;" :class="types==1 ? 'cles' :''">进行中</i></text>
				<view class="colos" v-if="types==1">
				</view>
			</view>
			<view @click="goclocl('2')">
				<text class="text-titles"> <i style="font-style: normal;" :class="types==2 ? 'cles' :''">已完成</i></text>
				<view class="colos" v-if="types==2">
				</view>
			</view>
		</view> -->
		<!-- 进行中与已完成 -->
		<mycoursexs :types="types" @gotiao="gotiao" :ordList="ordList" :mags="mags" :showfals="showfals" ></mycoursexs>
		<!-- <u-loadmore v-if="!showfals"  :line="true" :status="load" ></u-loadmore> -->
	</view>
</template>

<script>
	import mycoursexs from "../../components/my-coursexs/my-coursexs.vue"
	export default {
		data() {
			return {
				types: '1',
				ordList: [],  //所有数据
				load:'loadmore', //加载数据
				uerId:"",  //该学生id
				showfals:false,
				mags:'',
				schoolIds:'', //学校id
			}
		},
		components:{
			mycoursexs
		},
		mounted() {
			// this.courseList(1);
		},
		onLoad(opens) {
			// console.log(opens,'333333333333')
			this.uerId = opens.user
			this.schoolIds = opens.schoolIds
			this.getrseList()
		},
		methods: {
			//获取所有学生课程
			async getrseList(){
				uni.showLoading({
					title: '加载中'
				});
				const res = await this.http.get('/app/userPersonalCenter/myUserCourseList',{
					studentId:this.uerId,
					schoolId:this.schoolIds
				})
			
				if(res.code === 200){
					uni.hideLoading()
					this.ordList = res.data
				}else if(res.code === 500 && res.msg === '还没有报名课程哦~'){
					uni.hideLoading()
					this.showfals = true
					this.mags = res.msg
				}
			},
			goclocl(ids) {
				this.types = ids;
				// this.load = 'loading'
				setTimeout(()=>{
					this.getrseList()
					this.load = 'loadmore'
					
				},1000)
			},
			//课程跳转
			gotiao(id){
				uni.navigateTo({
					url:'/pages/course-details/course-details?uerId=' + this.uerId + '&kcId=' + id +"&schoolIds=" + this.schoolIds
				})
			}
			// async courseList() {
				// this.loadmoreStatus = 'loading';
				// let res = await this.http.get("/app/userPersonalCenter/myCourseList", {
				// 	pageNum: 1,
				// 	pageSize: 10,
				// 	type: this.types,
				// 	lon: uni.getStorageSync('lng'),
				// 	lat: uni.getStorageSync('lat'),
				// });
			// 	if (res.code == 200) {
			// 		let {
			// 			status,
			// 			list
			// 		} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
			// 		this.loadmoreStatus = status;
			// 		this.ordList = list;
			// 	} else {
			// 		// this.$toast(res.msg);
			// 	}
			// }
			// async courseList(type){
			// 	this.loadmoreStatus="loading"
			// 	let res = await this.http.get('/app/userPersonalCenter/myCourseList',{
			// 		// pageSize:this.pageSize,
			// 		pageSize:5,
			// 		pageNum:1,
			// 		type:type,
			// 	});
			// 	if(res.code == 200){
			// 		this.ordList = res.rows
			// 	}else{

			// 	}
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		width: 100%;
		min-height: calc(100vh - 0px);
		background-color: #eee;
		box-sizing: border-box;

		.cles {
			color: #5b9deb;
		}

		.contents {
			overflow: hidden;
			width: 100%;
			// background-color: #eee;
			padding: 0 10px;

			.boxflex {
				display: flex;
				justify-content: space-between;
				width: 100%;
				height: 80px;
				background-color: #fff;
				margin: 15px 0;
				border-radius: 10px;

				.header--circles {
					width: calc(100% - 20%);
					height: 80px;
					border-radius: 10px 0 0 10px;
					padding: 15px 20px;

					.hhuas {
						font-size: 15px;
						font-weight: 800;

						.gojins {
							display: inline-block;
							font-size: 8px;
							padding: 1px 10px;
							height: 20px;
							line-height: 20px;

							color: #fff;
							border-radius: 30px;
							margin-left: 10px;
						}

					}

					.zongks {
						font-size: 10px;
						display: flex;

						.course {
							margin-top: 10px;
						}
					}
				}

				.incons {
					width: 10%;
					height: 80px;
					line-height: 80px;
					text-align: center;
					border-radius: 0 10px 10px 0;
					flex-shrink: 0;
				}
			}
		}

		.jinwan {
			width: 100%;
			height: 50px;
			line-height: 40px;
			display: flex;
			background-color: #fff;
			justify-content: space-around;
			text-align: center;

			.text-titles {
				font-size: 15px;

			}

			.colos {
				width: 25px;
				height: 3px;

				background-color: #5b9deb;
				margin: 0 9px;
				border-radius: 3px;
			}
		}

	}

	

	// page {
	// 	background-color: #F5F6FA;
	// }

	// .content {
	// 	background-color: #F5F6FA;
	// }

	// .view-switch {
	// 	position: fixed;
	// 	width: 100%;
	// 	display: flex;
	// 	justify-content: space-around;
	// 	flex-direction: column;
	// 	background-color: #FFFFFF;
	// 	height: 88rpx;
	// 	margin-top:-10px;
	// 	.view-title {
	// 		display: flex;
	// 		justify-content: space-around;

	// 		.text-titles {
	// 			color: #4A9AFF !important;
	// 		}

	// 		.text-title {
	// 			font-size: 32rpx;
	// 			font-weight: 500;
	// 			color: #999999;
	// 			line-height: 21rpx;
	// 		}

	// 		.view-line {
	// 			width: 40rpx;
	// 			height: 8rpx;
	// 			background: #4A9AFF;
	// 			border-radius: 4rpx;
	// 			margin: 0 26rpx;
	// 			margin-top: 21rpx !important;
	// 		}

	// 		&:first-child {
	// 			margin-left: 0rpx;
	// 		}
	// 	}
	// }

	// .view-replace {
	// 	display: flex;
	// 	flex-direction: column;
	// 	padding-top: 88rpx;

	// 	.view-list {
	// 		margin: 15rpx 30rpx;
	// 	}

	// 	.view-item {
	// 		margin-top: 31rpx;
	// 		background-color: #FFFFFF;
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-items: center;
	// 		padding: 29rpx 33rpx 36rpx 29rpx;
	// 		border-radius: 15rpx;

	// 		.view-left {
	// 			flex-grow: 1;
	// 			flex-shrink: 1;

	// 			.text-name {
	// 				font-size: 36rpx;
	// 				font-weight: 500;
	// 				color: #333333;
	// 				line-height: 21rpx;
	// 				line-height: 21rpx;
	// 			}

	// 			.view-bottom {
	// 				display: flex;
	// 				flex-wrap: wrap;
	// 				font-size: 28rpx;
	// 				font-weight: 400;
	// 				color: #666666;
	// 				margin-top: 29rpx;

	// 				text {
	// 					margin-right: 20rpx;
	// 				}
	// 			}
	// 		}

	// 		.text-painting {
	// 			font-size: 36rpx;
	// 			font-weight: 500;
	// 			color: #333333;
	// 			line-height: 21rpx;
	// 			padding: 35rpx 0;
	// 		}

	// 		.view-dropout {
	// 			display: flex;
	// 			align-items: center;
	// 			flex-grow: 1;
	// 			flex-shrink: 1;
	// 			margin-left: 28rpx;

	// 			.drop-out {
	// 				border-radius: 15rpx;
	// 				padding: 5rpx 16rpx 6rpx 17rpx;
	// 				background-color: #F68710;
	// 				font-size: 20rpx;
	// 				font-weight: 400;
	// 				color: #FFFFFF;
	// 				line-height: 21rpx;
	// 			}
	// 		}

	// 	}

	// 	.img-gt {
	// 		width: 12rpx;
	// 		height: 20rpx;
	// 	}

	// }
</style>
