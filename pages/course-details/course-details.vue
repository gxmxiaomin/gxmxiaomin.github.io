<template>
	<view class="content">
		<view>
			<!-- 日历 -->
			<uni-calendar :insert="true" :showMonth="false" @change="change" :selected="infos" />
		</view>


		<view v-for="(item,index) in lists" :key="index">
			<view class="view-painting">
				<view class="view-title">
					<view class="view-name">
						<view>
							<view class="text-left">{{item.courseName}}</view>
						</view>
					</view>
					<view class="view-hour">
						<text>总课时：{{item.courseHour ? item.courseHour : 0}}</text>
						<text>已上课：{{item.attendClassSize ? item.attendClassSize : 0}}</text>
						<text>剩余课时：{{item.courseHour -  item.attendClassSize}}</text>
					</view>
				</view>

				<view class="view-list">
					<view class="view-item">
						<image src="../../static/images/banji.png" mode=""></image>
						<text>所在班级：{{item.clas}}</text>
					</view>
					<view class="view-item">
						<image src="../../static/images/shijian (2).png" mode=""></image>
						<text>排课时间：{{dates}}</text>
					</view>
				</view>
			</view>

			<view class="backst">
				<view class="my-backst">
					<u-steps :current="sta" direction="column">
						<u-steps-item v-for="(item,index) in arrs" :key="index" >
							<view slot="desc">第{{arr[item.classPeriod - 1]}}课时 <text v-if="item.state === 0 || item.state === '0'" class="weiwancheng">待销课</text><text v-if="item.state === 1 || item.state === '1'" class="yiwancheng">已完成</text><text v-if="item.state === 2 || item.state === '2'" class="queke">缺课</text><text v-if="item.state === 3 || item.state === '3'" class="buke">待补课</text><text v-if="item.state ===4 || item.state === '4'" class="yibuke">已补课</text></view>
								<view slot="desc" style="margin: 5px 0;margin-left: -3px;">任课老师：{{item.teacherName}}</view>
							<view slot="desc" style="margin-left: -3px;">上课时间:{{item.startTime}} - {{item.endTime}}</view>
						
						</u-steps-item>
					</u-steps>
					<!-- <view class="lefts">
						<view class="dians " :class="types >= index+1 ? 'a' :''"></view>
						<view class="xis":class="item.state === 1 ? 'b' :''"></view>
					</view>
					<view class="rightse">
						<view >10月19日  17:30开课</view>
						<view class="ks">第{{arr[index]}}课时<view class="fass" v-if="item.state === 0">未完成</view><view class="fase" v-if="item.state === 1">已完成</view></view>
						<view>上课时间：{{dats}}    {{item.schooltime.start}} - {{item.schooltime.end}}</view>
					</view> -->
				</view>
			</view>

		</view>
		<view v-if="lists.length" class="view-button" @click="uni.navigateTo({
					url:'../apply-drop-out/apply-drop-out'
				})">
			<!-- <button @click="show = true">申请退课</button> -->
		</view>

		<view style="margin: 30px 10px 0 25px;" v-else>
			{{mags}}
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				sta:0, //状态
				arr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
				arrs: [],
				dats: uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd'),
				dates: uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd'), //当天时间
				id: '',
				info: [],
				showQrcode: false,
				show: false,
				code: '', // 二维码
				kcId: '', //课程id
				uerId: '', //用户id
				lists: {},
				//上课时间
				TimeRangess: [],
				//日期
				infos: [],
				// dates: '',
				mags: '',
				// uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd')  //当天日期
				//学校id
				schoolIds:'',
			}
		},
		onLoad(option) {
			
			this.kcId = option.kcId
			this.uerId = option.uerId
			this.schoolIds = option.schoolIds
			this.getParticulars()
			this.getarticulars()
		},
		onShow() {
			// this.getInfo();
			// this.getCode();
		},
		methods: {
			//获取当月所有排课日期
			async getParticulars() {
				// uni.showLoading({
				// 	title:'加载中...'
				// })
				const res = await this.http.get('/app/userPersonalCenter/getCourseAllRowDate', {
					courseId: this.kcId,
					studentId: this.uerId,
					schoolId:this.schoolIds, //学校id
					date: this.dates || uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd'),
				})

				if (res.code === 200) {
					let lise = res.data.map((item) => {
						return {
							date: item.curTime,
							info: '已排课'
						}
					})
					this.infos = lise
				}

			},
			//获取当天排课信息
			async getarticulars() {
				// /app/userPersonalCenter/myCourseParticulars
				const res = await this.http.get('/app/userPersonalCenter/myCourseParticulars', {
					courseId: this.kcId,
					studentId: this.uerId,
					schoolId:this.schoolIds,
					date: this.dates || uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd'),
				})
				if (res.code === 200) {
					this.lists = res.data
					this.lists.forEach((item, inde) => {
				
						this.arrs = item.muClassTimeStudentTeacherDtos.sort((a,b) =>{
							return a.classPeriod - b.classPeriod
						})
						console.log(this.arrs,'烈火边坡')
					})
					this.arrs.forEach((it,inde) =>{
							console.log(it ,' 11111')
						this.sta = it.state
					})
				} else {
					this.mags = res.msg
				}
			},

			//选中的日期
			change(e) {
				this.dates = e.fulldate
				this.lists = {}
				this.getParticulars()
				this.getarticulars()
			},



			// 课程状态
			finishStatus(status) {
				switch (status) {
					case 1:
						return '未销课'
						break;
					case 2:
						return '待销课'
						break;
					case 3:
						return '缺课'
						break;
				}
			},

			// // 我的课程详情
			// async getInfo() {
			// 	let res = await this.http.get('/app/userPersonalCenter/myCourseInfo', {
			// 		courseId: this.id,
			// 	});
			// 	this.info = res

			// },

			// 获取二维码
			// async getCode() {
			// 	let res = await this.http.get('/app/userPersonalCenter/getCourseQrCode', {
			// 		courseId: this.id,
			// 	});
			// 	// console.log('获取二维码', res);
			// 	if (res.code == 200) {
			// 		this.code = res.data;
			// 	}
			// },

			leftClick() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style lang="scss">
	.slot-icon {
		width: 21px;
		height: 21px;
		background-color: $u-warning;
		border-radius: 100px;
		font-size: 12px;
		color: #fff;
		line-height: 21px;
		text-align: center;
	}

	page {
		background-color: #F7F7F7;
	}

	.view-buke {
		width: 712rpx;
		display: flex;
		margin-top: 20rpx;
		align-items: center;
		font-size: 24rpx;

		image {
			width: 44rpx;
			height: 44rpx;
			margin-right: 15rpx;
		}

		.view-right-side {
			display: flex;
			flex-direction: column;

			.view-top {
				width: 520rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;

				>view {
					&:last-child {
						color: red;
					}
				}
			}

		}
	}

	/deep/.u-navbar {

		.uicon-arrow-left {
			color: #333333 !important;
		}

		.u-navbar__content__title {
			color: #333333 !important;
		}

		.image-qrcode {
			width: 44rpx;
			height: 44rpx;
		}
	}

	.view-step-list {
		width: 690rpx;
		margin: auto;
		margin-top: 30rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;

		.view-step-item {
			display: flex;
			flex-direction: row;
		}

		.view-step-title {
			display: flex;
			flex-direction: row;
		}

		.view-step-icon {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 15rpx;
		}

		.view-step-right {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			flex-shrink: 1;
			margin-bottom: 30rpx;

			.text-name {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
			}

			.text-status {
				background-color: red;
				color: #FFFFFF;
				border-radius: 999rpx;
				font-size: 18rpx;
				padding: 4rpx 12rpx;
				margin-left: 10rpx;
			}

			.bg-yellow {
				background-color: #F68711;
			}

			.bg-blue {
				background-color: #5198F7;
			}

			.bg-red {
				background-color: #FE0000;
			}

			.text-time-group {
				font-size: 24rpx;
				font-weight: 400;
				color: #666666;
				margin-top: 10rpx;
			}

			.text-time {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				margin-bottom: 20rpx;
			}

			.text-context {
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
				margin-top: 50rpx;
				margin-bottom: 30rpx;
			}
		}


		.view-line {
			width: 4rpx;
			flex-grow: 1;
			flex-shrink: 1;
			background: #4A9AFF;
		}

		.view-dot {
			width: 30rpx;
			height: 30rpx;
			background-color: #4A9AFF;
			border-radius: 50%;
		}
	}


	.content {
		background-color: #F7F7F7;
		overflow: hidden;

		.backst {
			width: 100%;
			height: 100%;
			padding: 20px 10px;
			padding-top: 20px;

			.my-backst {
				width: 100%;
				padding: 0 10px;
				background-color: #fff;
				border-radius: 5px;
				overflow: hidden;
				// margin: 10px 0;
				display: flex;
				.yibuke{
					display: inline-block;
					width: 60px;
					height: 20px;
					line-height: 21px;
					margin-left: 10px;
					text-align: center;
					border-radius: 20px;
					color: #fff;
					font-size: 10px;
					background-color: #0d5ea6;
				}
				.weiwancheng{
					display: inline-block;
					width: 60px;
					height: 20px;
					line-height: 21px;
					margin-left: 10px;
					text-align: center;
					border-radius: 20px;
					color: #fff;
					font-size: 10px;
					background-color: red;
				}
				.yiwancheng{
					display: inline-block;
					width: 60px;
					height: 20px;
					line-height: 21px;
					margin-left: 10px;
					text-align: center;
					border-radius: 20px;
					color: #fff;
					font-size: 10px;
					background-color: #4a99fe;
				}
				.queke{
					display: inline-block;
					width: 60px;
					height: 20px;
					line-height: 21px;
					margin-left: 10px;
					text-align: center;
					border-radius: 20px;
					color: #fff;
					font-size: 10px;
					background-color:#f28716;
				}
				.buke{
					display: inline-block;
					width: 60px;
					height: 20px;
					line-height: 21px;
					margin-left: 10px;
					text-align: center;
					border-radius: 20px;
					color: #fff;
					font-size: 10px;
					background-color:#478557;
				}
				// .lefts {
				// 	// padding-top: 13px;

				// 	.dians {
				// 		width: 10px;
				// 		height: 10px;
				// 		border-radius: 10px;
				// 		margin-bottom: -2px;
				// 		margin-left: -5px;
				// 	}

				// 	.xis {
				// 		width: 3rpx;
				// 		height: 92px;
				// 		background-color: #ccc;
				// 		margin-top: -10px;
				// 	}
				// }

				// .rightse {
				// 	margin: 8px 0 0 5px;

				// 	.ks {
				// 		display: flex;
				// 		width: 150px;
				// 		height: 22px;
				// 		justify-content: space-between;
				// 		margin: 5px 0;

				// 		.fase {
				// 			padding: 8px;
				// 			line-height: 6px;
				// 			background-color: #edf5ff;
				// 			border-radius: 10px;
				// 			color: #4A9AFF;
				// 			border: 1px solid #68aaff;
				// 			font-size: 10px;
				// 		}

				// 		.fass {
				// 			padding: 8px;
				// 			line-height: 6px;
				// 			background-color: #edf5ff;
				// 			border-radius: 10px;
				// 			color: #da5045;
				// 			border: 1px solid #da5045;
				// 			font-size: 10px;
				// 		}
				// 	}
				// }
			}
		}
	}

	::v-deep .u-steps-item__line--column[data-v-73722340] {
		margin-left: 20px;
	}



	.view-painting {
		background-color: #FFFFFF;
		padding: 44rpx 44rpx 0 44rpx;

		.view-title {
			border-bottom: 1rpx solid #EFEFEF;
			padding: 0 0rpx 29rpx 0rpx;

			.view-name {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.text-left {
					font-size: 40rpx;
					font-weight: 500;
					color: #333333;
					line-height: 21rpx;
					margin-bottom: 29rpx;
				}

				.text-price {
					font-size: 40rpx;
					font-weight: 500;
					color: #F68710;
					line-height: 32rpx;
				}
			}

			.view-hour {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				line-height: 21rpx;
			}
		}
	}

	.view-list {
		display: flex;
		flex-direction: column;
		// margin: 35rpx 0;
		padding: 35rpx 0;
		padding-top: 15rpx;
		border-bottom: 1rpx solid #EFEFEF;

		.view-item {
			margin-top: 20rpx;
			display: flex;
			align-items: center;

			image {
				margin-right: 10rpx;
				height: 46rpx;
				width: 46rpx;
			}

			text {
				font-size: 24rpx;
				font-weight: 400;
				color: #666666;
				line-height: 32rpx;
			}
		}
	}

	.view-user {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 31rpx 0;

		.img-lt {
			width: 80rpx;
			height: 80rpx;
			margin-right: 19rpx;
			border-radius: 50%;
		}

		.text-name {
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			line-height: 20rpx;
			margin-right: 20rpx;
		}

		.img-gt {
			width: 36rpx;
			height: 36rpx;
		}
	}

	.view-button {
		margin: 60rpx;

		button {
			background: #4A9AFF;
			border-radius: 66rpx;
			color: #FFFFFF;
			margin-top: 92rpx;
		}
	}

	.view-popup {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 560rpx;
		border-radius: 10rpx;
		background: #FFFFFF;

		.view-top {
			display: flex;
			flex-direction: row;
			align-items: center;

			.img-guanbi {
				width: 49rpx;
				height: 49rpx;
			}

			.text-writeoff {
				font-size: 36rpx;
				font-weight: 500;
				color: #333333;
			}
		}

		.image-qrcode {
			width: 357rpx;
			height: 357rpx;
		}

		.text-tips {
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
			margin-top: 20rpx;
		}

		.view-center {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
		}

		.view-writeoff {
			font-size: 32rpx;
			font-weight: 400;
			color: #666666;

			&.blue {
				color: #4A9AFF;
			}
		}

		view {
			margin: 38rpx;
		}
	}

	.set-2:last-child::after {
		display: none;
	}

	.set-2 {
		border-radius: 10rpx;
		width: 600rpx;
		margin-left: 100rpx;
		margin-top: 60rpx;
		position: relative;

		.view-set {
			width: 493rpx;

			.view-test {
				margin: 0 auto;
				padding-top: 26rpx;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #EFEFEF;

				.view-test2 {
					width: 100%;
					height: 26rpx;
					font-family: Gibson;
					font-size: 32rpx;
					color: #333333;
				}
			}

			.view-test3 {
				margin: 0 auto;
				font-size: 26rpx;
				color: #999;
			}
		}
	}

	.set-2 .view-border {
		width: 18rpx;
		height: 17rpx;
		background: gray;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		margin-top: -1rpx;
		left: -58rpx;
		z-index: 100;
	}

	.a {
		background-color: #3589ff;
	}

	.b {
		background-color: #3589ff;
	}
</style>
