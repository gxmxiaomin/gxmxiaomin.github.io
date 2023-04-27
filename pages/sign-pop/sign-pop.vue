<template>
	<view>
		<view class="view-header" :style="'background: url('+bg+');'">
			<u-navbar title="签到" :safeAreaInsetTop="true">
				<view class="u-nav-slot" slot="left" @click="uni.navigateBack({})">
					<image class="image-fanhui" src="../../static/images/31fanhui1.png"></image>
				</view>
				<view class="u-nav-slot u-nav-slot-r" slot="right">
					<image class="image-more" src="../../static/images/gengduo.png" @click="showMore = !showMore">
					</image>
					<view v-show="showMore" class="view-pop-more" :style="'background: url('+topBg+');'">
						<view class="view-more-item" @click="uni.navigateTo({
							url:'../message-notice/message-notice'
						})">
							<image src="../../static/images/msg_icon.png" mode=""></image>
							<text>消息通知</text>
						</view>
						<view class="view-more-item" @click="uni.navigateTo({
							url:'../starCoinShop/starCoinShop'
						})">
							<image src="../../static/images/goods_icon.png" mode=""></image>
							<text>兑换物品</text>
						</view>
						<view class="view-more-item" @click="uni.navigateTo({
							url:'../starCoin-exchange/starCoin-exchange'
						})">
							<image src="../../static/images/exchange_icon.png" mode=""></image>
							<text>已兑换</text>
						</view>
						<view class="view-more-item" @click="uni.navigateTo({
							url:'../starCoinrRule/starCoinrRule'
						})">
							<image src="../../static/images/star_icon.png" mode=""></image>
							<text>星币规则</text>
						</view>
					</view>
				</view>
			</u-navbar>

			<view class="view-block">
				<view class="view-item">
					<view class="view-title">我的星币</view>
					<view class="view-num">{{userInfo.score}}<text>星币</text></view>
				</view>
				<view class="view-item">
					<view class="view-title">每日签到</view>
					<view class="view-info" @click="showSignInInfo = !showSignInInfo">
						<view class="view-report">本月我签到了<text>{{dayInfo}}</text>天</view>
						<image class="view-right image-right" src="../../static/images/31fanhui11.png"></image>
					</view>
				</view>

			</view>

			<view class="view-process" @click="show=!show">
				<view class="view-process-title">已连续签到<text>{{dayInfo}}</text>天，明天签到+10星币</view>
				<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
				<u-steps activeColor="#4B9AFF" inactiveColor="#E7E8E7" current="1">
					<u-steps-item title="" desc="1天">
						<text class="slot-icon" slot="icon">+{{dayScore.one_day_score}}</text>
					</u-steps-item>
					<u-steps-item error title="" desc="2天">
						<text class="slot-icon" slot="icon">+{{dayScore.two_day_score}}</text>
					</u-steps-item>
					<u-steps-item title="" desc="3天">
						<text class="slot-icon" slot="icon">+{{dayScore.three_day_score}}</text>
					</u-steps-item>
					<u-steps-item title="" desc="4天">
						<text class="slot-icon" slot="icon">+{{dayScore.four_day_score}}</text>
					</u-steps-item>
					<u-steps-item title="" desc="5天">
						<text class="slot-icon" slot="icon">+{{dayScore.five_day_score}}</text>
					</u-steps-item>
					<u-steps-item title="" desc="6天">
						<text class="slot-icon" slot="icon">+{{dayScore.six_day_score}}</text>
					</u-steps-item>
					<u-steps-item title="" desc="7天">
						<text class="slot-icon" slot="icon">+{{dayScore.seven_day_score}}</text>
					</u-steps-item>
				</u-steps>
			</view>

			<!-- 公告 -->
			<view class="view-notice">
				<image src="../../static/images/announcement_icon.png" mode=""></image>
				<u-notice-bar icon="" :text="announcement"></u-notice-bar>
			</view>

			<!-- 连续签到赢大礼 -->
			<view class="view-award">
				<view class="view-award-title">连续签到赢大礼</view>
				<view class="view-award-info">
					<view class="view-award-item" v-for="(item,index) in giftList">
						<view>
							<image :src="item.goodsImg" mode=""></image>
							<view class="view-state" v-if="item.exchangeStatus==0">未领取</view>
							<view class="view-state" v-else>已领取</view>

						</view>
						<!-- <view class="bg-blue"></view> -->
						<view class="bg-gray"></view>
						<!-- <text class="text-gray">30天</text> -->
						<text class="text-black">{{item.signNum}}天</text>
					</view>
					<view class="view-line"></view>
				</view>
			</view>

		</view>

		<!-- 星币收支明细 -->
		<view class="view-list-box">
			<view class="view-title">
				<text>星币收支明细</text>
				<text @click="uni.navigateTo({
					url:'../starCoin/starCoin'
				})">查看全部 ></text>
			</view>
			<view class="view-list">
				<view class="view-item" v-for="(item,index) in RecordList">
					<view class="view-left">
						<text class="text-remark">{{item.title}}</text>
						<text class="text-time">{{item.createTime}}</text>
					</view>
					<view>
						<image class="image-icons" src="../../static/images/icon.png"></image>
						<view class="text-money">
							<text class="text-pm" v-if="item.pm==1">+</text>
							<text class="text-pm" v-else>-</text>
							<text class="text-count">{{item.number}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 	<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
				page++
				getcommissionList()
				return ''
			}" /> -->
		</view>

		<!-- 星币商品 -->
		<view class="view-goods-container">
			<view class="view-title">
				<text>星币商城</text>
				<text @click="uni.navigateTo({
					url:'../starCoinShop/starCoinShop'
				})">查看全部 ></text>
			</view>
			<view class="view-goods-list">
				<view class="view-goods-item" v-for="(item,index) in shopLsit" @click="uni.navigateTo({
					url:'../starCoinShopDetails/starCoinShopDetails?id='+item.id
				})">
					<view class="view-goods-cover">
						<image :src="item.goodsCover" mode=""></image>
					</view>
					<view class="view-goods-info">
						<view>
							<u--text block lines="1" color="#333" size="28rpx" bold mode="text" :text="item.goodsName">
							</u--text>
						</view>
						<view>
							<text>{{item.goodsDesc}}</text>
						</view>
						<view>
							<text>{{item.sellPrice}}</text>
							<text>星币</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="view-calendar-sign">
			<u-popup :show="show" @close="show=false" @open="show=true" round="20rpx">
				<view class="view-box">
					<!-- 日历导航切换 -->
					<view class="view-calendar-nav">
						<image src="../../static/images/dailysignin/arrow_left.png" @click="dateUp"></image>
						<view>{{year}} 年 {{month}} 月</view>
						<image src="../../static/images/dailysignin/arrow_right.png" @click="dateDown"></image>
					</view>
		
					<!-- 日历内容 -->
					<view class="view-calendar-info">
						<view class="view-weeks">
							<text v-for="(w,i) in weeks" :key="i">{{w}}</text>
						</view>
						<view class="view-list">
							<view class="view-item" v-for="(item,index) in calendarData" :key='index'>
								<view class="view-sign-state" :style="{ display: item.label == ''?'none':'block' }">
									<image v-if="" src="../../static/images/truess.png"></image>
									<image src="../../static/images/filess.png"></image>
								</view>
								<view class="view-date">
									{{item.label}}
								</view>
							</view>
						</view>
					</view>
		
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bg: require('@/static/images/roport-bg.png'),
				topBg: require('@/static/images/bg_release.png'),
				announcement: '用户XX已成功兑换价值1888元的豆浆机一台',
				showMore: false, // 顶部右上角更多
				date: '', //签到时间
				showSignInInfo: false, // 显示签到弹窗信息
				userInfo: [],
				dayInfo: '', //本月签到天数
				dayScore: [],
				RecordList: [],
				giftList: [], //签到礼物列表
				shopLsit: [],
				cover: '',

				show: false, // 是否弹框
				data: [],
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				calendarData: [],
				currentDay: '', // 当前时间
				year: 0, //当前日期年
				month: 0, //当前日期月数
				date: 0, //当前日期号数
				day: -1, //当前星期几
				time: '',
				timestamp: '',
				reportState: 0, // 签到状态 0:未签到 1:已签到
			}
		},
		onLoad() {
			this.getReportInfo()
			this.getShopList()
			
		},
		created() {
			// 签到信息
			// this.getReportInfo();
			this.getNow(); // 获取当前日期数据
			// 获取当前月份一号的时间戳
			let firstTime = +new Date(this.year, this.month - 1, 1, 0, 0, 0)
			this.getCalendarDate(uni.$u.timeFormat(this.timestamp, 'yyyy-mm')); // 给calendarData添加当月数据
		},
		methods: {
			//打开签到弹窗
			open() {
				this.$refs.calendar.open();
			},
			// 获取当前时间
			getNow() {
				let now = new Date()
				this.year = +now.getFullYear()
				this.month = +now.getMonth() + 1
				// this.month = this.month < 10 ? '0' + this.month : this.month;
				this.date = +now.getDate()
				// this.date = this.date < 10 ? '0' + this.date : this.date;
				this.day = +now.getDay()
				this.currentDay = this.month + '.' + this.date;
				this.getCalendarDate(this.year + '-' + this.month)
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
				this.calendarData = [];

				// 获取当前月份一号星期几
				let firstDay = new Date(this.year + "-" + this.month + "-" + "1").getDay();
				console.log(firstDay)
				let num = parseInt(firstDay);
				let nowDays = this.monthDay(this.month);
				let lastMonth = this.month - 1 > 0 ? this.month - 1 : 12;
				let lastDays = this.monthDay(lastMonth);
				//   循环添加上一个月数据
				for (let i = 0; i < num; i++) {
					this.calendarData.push({
						label: '',

					});
				}
				// 循环添加当月数据
				for (let i = 0; i < nowDays; i++) {
					this.calendarData.push({
						label: i + 1,
					});
				}
				console.log(this.calendarData);
			},

			// 点击切换上个月
			dateUp() {
				this.month--;
				if (this.month <= 0) {
					this.year--;
					this.month = 12;
				}
				// this.month = this.month < 10 ? '0' + this.month : this.month;
				this.getCalendarDate(this.year + '-' + this.month);
				
			},

			// 点击切换下个月
			dateDown() {
				this.month++;
				if (this.month > 12) {
					this.year++;
					this.month = 1;
				}
				// this.month = this.month < 10 ? '0' + this.month : this.month;
				this.getCalendarDate(this.year + '-' + this.month)
				
			},
			// 签到当月
			async getMonth(date) {
				let res = await this.http.post('/app/userScores/checkMonthSign', {
					date:date
				});
				if (res.code == 200) {
					this.calendarData = res.data.dateList
				} else {
				}
			},
			
			// 签到信息
			// async getReportInfo() {
			// 	let res = await this.http.get('/app/liveUserSign/list');
			// 	console.log('签到信息:', res)
			// },
			async getReportInfo() {
				let res = await this.http.get('/app/userScores/userSignInfo', {});
				if (res.code == 200) {
					this.userInfo = res.data;
					this.dayInfo = res.data.sevenDaySignData.day;
					this.dayScore = res.data.sevenDaySignData.signConfigMap
					this.RecordList = res.data.scoresInfo
					this.giftList = res.data.userSignGifts
					console.log(res)
				} else {
					this.$toast(res.msg);
				}
			},
			// 积分商品列表
			async getShopList() {
				let res = await this.http.get('/app/userScores/scoreGoodsList', {
					pageNum: 1,
					pageSize: 10,
				});
				if (res.code == 200) {
					this.shopLsit = res.rows
				} else {
					this.$toast(res.msg);
				}
			},
			async postReport() {
				let res = await this.http.post('/app/userScores/sign', {
					day: this.dayInfo,
				});
				if (res.code == 200) {
					// this.userInfo = res.data;
					this.$toast('签到成功');
					this.getReportInfo()
					console.log(res)
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-calendar-sign {
	
		.view-box {
			background-color: #F7F7F7;
			padding: 40rpx;
			border-radius: 20rpx 20rpx 0 0;
		}
	
		.view-calendar-nav {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
			align-items: center;
	
			image {
				width: 56rpx;
				height: 56rpx;
			}
		}
	
		.view-calendar-info {
			display: flex;
			flex-direction: column;
			border-radius: 20rpx;
			background-color: #fff;
	
			.view-weeks {
				display: flex;
				margin: 40rpx 0;
	
				text {
					width: 14%;
					text-align: center;
					font-size: 20rpx;
					color: #999999;
				}
			}
	
			.view-list {
				display: flex;
				flex-wrap: wrap;
	
				.view-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					width: 14%;
					height: 120rpx;
					text-align: center;
					color: #C9C9C9;
					font-size: 20rpx;
	
					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
	
				.view-sign-state {
					line-height: 50rpx;
					text-align: center;
					width: 50rpx;
					height: 50rpx;
					border-radius: 999rpx;
					background-color: #F6F6F5;
					color: #999999;
					font-size: 20rpx;
					display: flex;
					align-items: center;
					image{
						width: 23rpx;
						height: 24rpx;
						margin: 0 auto;
					}
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
			.view-date {
				margin-bottom: 10px;
			}
		}
	}
	.view-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
		margin-bottom: 30rpx;

		text {
			&:first-child {
				font-weight: 600;
				color: #111734;
			}

			&:last-child {
				font-size: 28rpx;
				color: #666666;
			}
		}
	}

	.u-nav-slot-r {
		display: flex;
		align-items: center;
		position: relative;
	}

	.view-pop-more {
		width: 255rpx;
		height: 446rpx;
		position: absolute;
		top: 30rpx;
		right: 0rpx;
		z-index: 999;
		background-size: 100% !important;
		background-repeat: no-repeat !important;
		padding-top: 18rpx;

		.view-more-item+.view-more-item {
			border-top: 1px solid #4A4A4A;
		}

		.view-more-item {
			display: flex;
			align-items: center;
			padding: 16rpx;
			font-size: 32rpx;
			color: #fff;

			image {
				width: 44rpx;
				height: 44rpx;
				margin-right: 20rpx;
			}
		}
	}

	.bg-blue {
		background-color: #4B9AFF;
	}

	.bg-gray {
		background-color: #E7E8E7;
	}

	.text-black {
		color: #333333;
	}

	.text-gray {
		color: #E7E8E7;
	}

	/deep/.slot-icon span {
		font-size: 20rpx;
		color: #999999;
	}

	.view-award {
		width: 690rpx;
		height: 289rpx;
		background: #FFFFFF;
		box-shadow: 0px 1px 33rpx 0px rgba(33, 102, 197, 0.22);
		border-radius: 10rpx;
		margin: 0 auto;

		.view-award-title {
			font-weight: bold;
			padding: 30rpx;
		}

		.view-award-info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			padding: 6rpx 30rpx 0;

			.view-line {
				width: 100%;
				height: 1rpx;
				background-color: #F7F7F7;
				position: absolute;
				left: 0;
				bottom: 48rpx;
			}

			.view-award-item {
				display: flex;
				flex-direction: column;
				align-items: center;

				view {
					&:first-child {
						border-radius: 10rpx;
						overflow: hidden;
						position: relative;

						.view-state {
							width: 100%;
							height: 26rpx;
							background: rgba(0, 0, 0, 0.2);
							position: absolute;
							bottom: 0;
							color: #fff;
							font-size: 16rpx;
							line-height: 26rpx;
							text-align: center;
						}

						image {
							width: 80rpx;
							height: 80rpx;
						}
					}

					&:nth-child(2) {
						width: 14rpx;
						height: 14rpx;
						border-radius: 999rpx;
						margin: 8rpx 0;
						z-index: 9;
					}
				}

				text {
					font-size: 24rpx;
					color: #333333;
				}
			}
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

			.view-goods-item {
				display: flex;
				flex-direction: column;
				width: 330rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 30rpx;

				.view-goods-cover {
					width: 330rpx;
					height: 330rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.view-goods-info {
					display: flex;
					flex-direction: column;
					padding: 12rpx;

					view {
						&:nth-child(2) {
							margin: 10rpx 0;

							text {
								font-size: 20rpx;
								color: #4A9AFF;
								background-color: rgba(74, 154, 255, 0.05);
								border: 1px solid #4A9AFF;
								border-radius: 6rpx;
								padding: 3rpx 10rpx;
							}
						}

						&:last-child {
							color: #FF0000;

							text {
								&:first-child {
									font-size: 36rpx;
									font-weight: bold;
								}

								&:last-child {
									font-size: 30rpx;
									margin-left: 6rpx;
								}
							}
						}
					}
				}
			}
		}
	}

	.view-list-box {
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		margin-top: -20rpx;
		background-color: #F7F7F7;

		.view-list {
			border-radius: 10rpx;
			background-color: #fff;
		}

		.view-item+.view-item {
			border-top: 1px solid #f7f7f7;
		}

		.view-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 0 30rpx;
			padding: 30rpx 0;

			view {

				&:nth-child(2) {
					display: flex;
					align-items: center;
					color: #F68F4A;
					font-family: Impact;

					.text-pm {
						margin: 0 16rpx;
					}

					.text-count {
						width: 50rpx;
						font-size: 34rpx;
						text-align: center;
					}
				}
			}


			.image-icons {
				width: 28rpx;
				height: 28rpx;
				margin-left: auto;
			}

			.view-left {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;

				.text-remark {
					font-size: 28rpx;
					font-weight: 400;
					color: #111734;
				}

				.text-time {
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 6rpx;
				}
			}

			.text-money {
				font-size: 28rpx;
				font-weight: 500;
				color: #FF6B35;
			}
		}
	}

	/deep/.u-navbar__content {
		background: none !important;
	}

	.view-notice {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
		padding: 0 30rpx;

		image {
			width: 102rpx;
			height: 34rpx;
		}
	}

	.u-notice-bar {
		background: none !important;
	}

	/deep/.u-notice__content__text {
		color: #FFFFFF !important;
	}

	/deep/.u-steps-item__wrapper__circle {}

	/deep/.u-steps-item__content {
		margin-top: 20rpx !important;
	}

	/deep/.u-icon__icon {
		font-size: 30rpx !important;
	}

	/deep/.u-steps-item__line--row {
		top: 30rpx !important;
	}

	/deep/.slot-icon {
		display: flex;
		align-items: center;
	}

	/deep/.u-steps-item__wrapper {
		width: 70rpx;
		height: 60rpx !important;
		background: #F5F5F4;
		border: 1rpx solid #E8E9E8;
		opacity: 0.9;
		border-radius: 50%;
	}

	/deep/.u-steps-item__wrapper__circle__text {
		font-size: 30rpx !important;
	}

	.view-header {
		width: 100%;
		height: 1073rpx;
		background-size: cover !important;

		.view-process {
			width: 690rpx;
			background: #FFFFFF;
			margin: 0 auto;
			box-shadow: 0rpx 1rpx 33rpx 0rpx rgba(33, 102, 197, 0.22);
			border-radius: 10rpx;
			padding: 30rpx;



			.u-steps {
				margin-top: 36rpx;
			}

			.view-process-title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #131313;

				text {
					color: #4B9AFF;
					font-size: 38rpx;
					font-family: Impact;
					margin: 0 12rpx;
				}
			}
		}

		.view-block {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 30rpx;



			.view-right {
				display: flex;
				align-items: center;
			}

			.view-item {

				.view-info {
					display: flex;
					align-items: center;
					margin-top: 14rpx;
				}

				.image-right {
					width: 13rpx;
					height: 23rpx;
				}

				.view-report {
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #FFFFFF;
					margin-right: 40rpx;
					letter-spacing: 1rpx;

					text {
						margin: 0 10rpx;
						font-size: 34rpx;
						font-family: Impact;
					}
				}

				.view-title {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.5);
				}

				.view-num {
					font-size: 56rpx;
					font-family: Impact;
					font-weight: 400;
					color: #FFFFFF;

					text {
						font-size: 28rpx;
						font-family: Impact;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
		}

		.image-fanhui {
			width: 16rpx;
			height: 28rpx;
		}

		.image-more {
			width: 33rpx;
			height: 7rpx;
		}
	}
</style>
