<template>
	<view>
		<view class="box">
			<view class="type-1" v-for="(item,index) in titleListl" :key="item.title">
				<text class="type-1-1" :style="index == titleIndexl?'background: #4b9bfd;color:#fff':''"
					@click="selectTitlel(index)">{{item.title1}}</text>
			</view><br>
			<view style="height: 20rpx;"></view>
			
			<view class="type-2">
				<text class="type-2-1" :style="9 == titleIndex?'background: #4b9bfd;color:#fff':''" @click="quanbu">全部</text>
			</view>

			<view class="type-2" v-for="(item,index) in titleList" :key="item.id">
				<text class="type-2-1" :style="index == titleIndex?'background: #4b9bfd;color:#fff':''"
					@click="selectTitle(index,item.id)">{{item.school_type_name}}</text>
			</view>

			<view class="course">





			</view>
		</view>


		<view class="view-goods-container">
			<view class="view-goods-list">
				<view class="view-goods-item" v-for="(item,index) in shopLsit" :key='item.id' @click="uni.navigateTo({url:'../interest-course-details/interest-course-details?id='+item.id})">
					<view class="view-goods-cover">
						<image :src="item.courseImg" mode=""></image>
					</view>
					<view class="view-goods-info">
						<view>
							{{item.courseName}}
						</view>
						<view class="text">
							<text>{{item.courseStartTime}}</text> <text style="margin-left: 12%;">{{item.signUpNum}}加入学习</text>
						</view>
						<view>
							<text>￥{{item.courseAmount}}/节</text>
						</view>
					</view>
				</view>
			</view>
		</view>

<!-- 底部固定 -->
		<view class="footer">
			<view class="cell">
				<u-icon name="heart" size="24"></u-icon>
				<text>点赞</text>
			</view>
			<view class="cell">
				<u-icon name="star" size="24"></u-icon>
				<text>收藏</text>
			</view>
			<view class="cell">
				<u-icon name="share" size="24"></u-icon>
				<text>分享</text>
			</view>
			<view class="btn">
				<u-button text="点击报名" type="primary" shape="circle"></u-button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		props:['course'],
		data() {
			
			return {
				//课程
				shopLsit: [],
				//课程分类
				titleList: [],
				titleListl: [{
						title1: '全部'
					},
					{
						title1: '免费'
					},
					{
						title1: '付费'
					},
				],
				titleIndex: 9,
				titleIndexl: 0
			};
		},
		
		created() {
			setTimeout(()=>{
				console.log("test组件中接收到的参数", this.course)
				this.titleList = this.course.classify
				this.shopLsit = this.course.course
				
			},50)
		},
		
		methods: {
			quanbu(){
				this.titleIndex = 9
				this.allCourse()
			},
			//全部课程
			async allCourse() {           // /app/userHomeNavigation/schoolCourseList
				const res = await this.http.get("/app/userHomeNavigation/schoolCourseLists", {
					schoolId:this.course.schoolId  //99
					//typeId:25
				})
				console.log("获取到的课程列表", res)
				this.shopLsit = res.data
			},
			
			async selectTitle(index,id) {
				this.titleIndex = index
				console.log(this.titleIndex)
				console.log(id)
				//课程分类
				
					const res = await this.http.get("/app/userHomeNavigation/schoolCourseList", {
						schoolId:this.course.schoolId,
						typeId:id
					})
					console.log("获取到的课程列表", res)
					this.shopLsit = res.data
				
			},

			selectTitlel(index) {
				this.titleIndexl = index
			}

		}

	}
</script>

<style lang="scss">
	.footer{
		width: 100vw;
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		.cell{
			width: 100rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			text{
				font-size: 24rpx;
				color: #838383;
			}
		}
		.btn{
			margin-right:20rpx;
			width: 60%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.view-goods-container {
		padding: 30rpx;
		background-color: #F7F7F7;

		.view-goods-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-content: flex-start;


            .view-goods-item:last-child{
				margin-bottom: 100rpx;
			}
			.view-goods-item {
				display: flex;
				flex-direction: column;
				width: 340rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 30rpx;

				.view-goods-cover {
					width: 340rpx;
					height: 280rpx;

					image {
						border-radius: 20rpx;
						width: 100%;
						height: 100%;
					}
				}

				.view-goods-info {
					display: flex;
					flex-direction: column;
					padding: 12rpx;

					view {

						&:nth-child(1) {
							font-size: 30rpx;
						}

						&:nth-child(2) {
							// margin: 10rpx 0;

							text {
								font-size: 22rpx;
								color: #aaa;
								// padding: 0 60rpx 0 0;
							}
						}

						&:last-child {
							color: #FC7F52;

							text {

								&:last-child {
									font-family: 'PingFang-SC-Bold';
									font-size: 36rpx;
									margin-left: 6rpx;
								}
							}
						}
					}
				}
			}
		}
	}



	.box {

		.type-1>text {
			display: inline-block;
			margin: 10rpx 10rpx 10rpx 10rpx;
			padding: 0 10rpx 0 10rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			float: left
		}

		.type-1 {
			.type-1-1 {
				// background: #4b9bfd;
				// color: #ffffff;
			}
		}

		.type-2>text {
			display: inline-block;
			margin: 10rpx 10rpx 10rpx 10rpx;
			padding: 0 10rpx 0 10rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			float: left
		}

		.type-2 {
			// .type-2-1 {
			// 	background: #4b9bfd;
			// 	color: #ffffff;
			// }
		}



		.course {
			margin-top: 80rpx;
		}



		.course-1>image {
			width: 100%;
			height: 260rpx;
		}
	}
</style>
