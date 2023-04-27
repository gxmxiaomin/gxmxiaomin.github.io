<template>
	<view class="view-calendar-sign">

		<!-- 日历导航切换 -->
		<view class="view-calendar-nav">
			<u-icon name="arrow-left" size="40rpx" color="#000000" @click="dateUp"></u-icon>
			<view>{{year}} 年 {{month}} 月</view>
			<u-icon name="arrow-right" size="40rpx" color="#000000" @click="dateDown"></u-icon>
		</view>

		<!-- 日历内容 -->
		<view class="view-calendar-content">
			<view class="view-weeks">
				<text v-for="(w,i) in weeks" :key="i">{{w}}</text>
			</view>
			<view class="view-calendar-list">
				<view v-for="(item,index) in data" class="view-calendar-list-item" :key='index'>
					<view class="view-sign-state"
						:class="item.state==0?'state-fail':item.state==1?'state-success':'state-not'"
						:style="{ display: item.date == ''?'none':'block' }"></view>
					<view class="view-date-edit">
						{{ item.year==year && item.date==currentDay?'今天':item.date}}
					</view>
				</view>
			</view>
		</view>

		<view class="view-sign-in-btn">
			<u-button class="integral-btn" shape="circle" color="#0078FF" :disabled="reportState==1"
				:text="reportState==1?'今日已签到':'立即签到'" @click="clickDay(calendarData.label,$event)"></u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data: [],
				weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				calendarData: [],
				currentDay: '', // 当前时间
				year: 0, //当前日期年
				month: 0, //当前日期月数
				date: 0, //当前日期号数
				day: -1, //当前星期几
				time: '',
				timestamp: '',
				reportState: 0, // 签到状态 0:未签到 1:已签到
			};
		},
		created() {
			//判断当天是否签到
			this.isReport();
			// 签到信息
			this.getReportInfo();
			// 获取当前日期数据
			this.getNow();
			// 获取当前月份一号的时间戳
			let firstTime = +new Date(this.year, this.month - 1, 1, 0, 0, 0)
			this.getCalendarDate(uni.$u.timeFormat(this.timestamp, 'yyyy-mm')); // 给calendarData添加当月数据
		},

		methods: {
			// 获取当前时间
			getNow() {
				let now = new Date()
				this.year = +now.getFullYear()
				this.month = +now.getMonth() + 1
				this.month = this.month < 10 ? '0' + this.month : this.month;
				this.date = +now.getDate()
				this.date = this.date < 10 ? '0' + this.date : this.date;
				this.day = +now.getDay()
				this.currentDay = this.month + '.' + this.date;
			},

			// 获取每个月的天数
			monthDay(month) {
				if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
					return 31
				} else if ([4, 6, 9, 11].includes(month)) {
					return 30
				} else if (month === 2) {
					//  判断当年是否为闰年
					if (
						(this.year % 4 === 0 && this.year % 100 !== 0) ||
						this.year % 400 === 0
					) {
						return 29
					} else {
						return 28
					}
				}
			},

			// 添加当月数据
			async getCalendarDate(signTime) {
				let res = await this.http.get('/app/liveUserSign/getMonthList', {
					signTime: signTime
				});

				// 获取当前月份一号星期几
				let firstDay = new Date(this.year + "-" + this.month + "-" + "01").getDay();
				
				
				// this.calendarData = [];

				let num = parseInt(firstDay);
				let nowDays = this.monthDay(this.month);
				let lastMonth = this.month - 1 > 0 ? this.month - 1 : 12;
				let lastDays = this.monthDay(lastMonth);

				//   循环添加上一个月数据
				for (let i = 0; i < num; i++) {
					res.unshift({
						date: '',
						time: '',
						state: 2,
					})
					
					
					// this.calendarData.push({
					// 	label: '',

					// });
				}


				// 循环添加当月数据
				// for (let i = 0; i < nowDays; i++) {
				// 	this.calendarData.push({
				// 		label: i + 1,
				// 	});
				// }
				
				// 循环添加下一个月数据
				if (res.length % 7 !== 0) {
					let surplusDay = 7 - (res.length % 7);
					for (let i = 0; i < surplusDay; i++) {
						res.push({
							date: '',
							time: '',
							state: 2
						});
					}
				}
				console.log('当月数据列表', res);
				this.data = res;
				
				
			// 	if (this.calendarData.length % 7 !== 0) {
			// 		let surplusDay = 7 - (this.calendarData.length % 7);
			// 		for (let i = 0; i < surplusDay; i++) {
			// 			this.calendarData.push({
			// 				label: '',
			// 			});
			// 		}
			// 	 }
			// },

			// 点击切换上个月
			dateUp() {
				this.month--;
				if (this.month <= 0) {
					this.year--;
					this.month = 12;
				}
				this.month = this.month < 10 ? '0' + this.month : this.month;
				console.log(this.year + '-' + this.month);
				this.getCalendarDate(this.year + '-' + this.month);
			},

			// 点击切换下个月
			dateDown() {
				this.month++;
				if (this.month > 12) {
					this.year++;
					this.month = 1;
				}
				this.month = this.month < 10 ? '0' + this.month : this.month;
				console.log(this.year + '-' + this.month);
				this.getCalendarDate(this.year + '-' + this.month);
			},

			// 点击签到
			async clickDay() {
				this.time = uni.$u.timeFormat(this.timestamp, 'yyyy-mm-dd hh:MM:ss');
				console.log(this.time);
				let res = await this.http.postJson('/app/liveUserSign/add', {
					createTime: this.time,
					todayIntegral: 3
				});
				if (res.code == 200) {
					this.$toast('签到成功');
					this.isReport();
					this.getCalendarDate(uni.$u.timeFormat(this.timestamp, 'yyyy-mm'));
				} else {
					this.$toast(res.msg);
				}
			},

			//判断当天是否签到
			async isReport() {
				let res = await this.http.post('/app/liveUserSign/getToday');
				console.log('是否签到?', res);
				if (res.code == 200) {
					console.log('今日未签到');
					this.reportState = 0;
				} else {
					console.log('今日已签到');
					this.reportState = 1;
				}
			},

			// 签到信息
			async getReportInfo() {
				let res = await this.http.get('/app/liveUserSign/list');
				console.log('签到信息:', res)
			},
		}
	};
</script>
<style lang="scss" scoped>
	.view-calendar-sign {
		width: 720rpx;
		margin: 0 auto;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 20rpx;

		.view-calendar-nav {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx 0;
			box-sizing: border-box;
		}

		.view-calendar-content {
			display: flex;
			flex-direction: column;
			border-radius: 30rpx;

			.view-weeks {
				display: flex;
				margin: 40rpx 0;

				text {
					width: 97rpx;
					text-align: center;
					font-size: 20rpx;
					color: #999999;
				}
			}

			.view-calendar-list {
				display: flex;
				flex-wrap: wrap;

				.view-sign-state {
					width: 50rpx;
					height: 50rpx;
					border-radius: 999rpx;
				}

				.state-not {
					background: url(../../static/images/dailysignin/default_icon.png) no-repeat;
					background-size: 100%;
				}

				.state-success {
					background: url(../../static/images/dailysignin/signIn_icon.png) no-repeat;
					background-size: 100%;
				}

				.state-fail {
					background: url(../../static/images/dailysignin/notSignIn_icon.png) no-repeat;
					background-size: 100%;
				}
			}

			.view-calendar-list-item {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				width: 97rpx;
				height: 120rpx;
				text-align: center;
				color: #C9C9C9;
				font-size: 20rpx;
			}

			.view-date-edit {
				margin-bottom: 10px;
			}
		}

		.view-sign-in-btn {
			display: flex;
			margin: 20rpx auto;
			justify-content: center;
			width: 588rpx;
			height: 80rpx;

			.integral-btn {
				margin: 16rpx atuo 36rpx;
				color: #fff;
			}
		}
	}
</style>
