<template>
	<!-- 首页下拉消息 -->
	<view>
		<view class="top">
			<view @click="orderS">
				<image src="../../static/images/dingdanxiangqing.png" mode=""></image>
				<text>订单消息</text>
			</view>
			<view @click="courses">
				<image src="../../static/images/kecheng.png" mode=""></image>
				<text>课程报名</text>
			</view>

			<view @click="learningconditions ">
				<image src="../../static/images/xuexi.png" mode=""></image>
				<text>学习情况</text>
			</view>
		</view>

		<!-- 消息列表 -->
		<view class="view-chat-list">
			<view class="view-chat-item" v-for="(item,index) in chatList" :key="index" @click="navTo(item)">
				<image :src="item.avatarurl" mode=""></image>
				<view class="view-item-content">
					<text>{{item.nickname}}</text>
					<text v-if="item.payload.bodies[0].type==='img'">[图片]</text>
					<text v-if="item.payload.bodies[0].type==='audio'">[语音]</text>
					<text v-else>{{item.payload.bodies[0].msg}}</text>
				</view>
				<view class="view-num" v-if="item.unreadnum>0">
					{{item.unreadnum}}
				</view>
			</view>
		</view>
		<view class="view-list">

			<view class="view-item" @click="systems">
				<view class="view-left">
					<image src="../../static/images/xitongxiaoxi.png" mode=""></image>
					<view class="">
						<text class="text-title">系统消息</text>
						<text>{{sysInfo.noticeTitle}}{{sysInfo.createTime}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="view-list">
			<view class="view-item" @click="Marketingcourse">
				<view class="view-left">
					<image src="../../static/images/xitongxiaoxi.png" mode=""></image>
					<view class="">
						<text class="text-title">销课消息</text>
						<text>{{listse}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatList: [], //聊天列表
				sysInfo: {},
				listse: ''
			}
		},
		onLoad() {
			this.getCourseMessages()
			uni.$on("refreshSessionList", (msg) => {
				console.log(msg)
				if (msg) {
					this.getSessionList()
				}
			})
		},
		async mounted() {
			await this.getSystemMessage()
			await this.getSessionList()
			this.getCourseMessages()
		},
		beforeDestroy() {
			uni.$off("refreshSessionList")
		},
		async onPullDownRefresh() {
			await this.getSessionList()
			uni.stopPullDownRefresh()
		},
		methods: {
			//订单消息
			orderS() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../order-message/order-message'
					})
				}
			},
			//课程报名
			courses() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../registration-information/registration-information'
					})
				}
			},
			//系统
			systems() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../system-message/system-message'
					})
				}
			},
			//学习情况
			learningconditions() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../learning-situation/learning-situation'
					})
				}
			},
			//销课
			Marketingcourse() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '/pages/marketingcourse/marketingcourse'
					})
				}
			},
			//获取销课信息时间
			async getCourseMessages() {
				const res = await this.http.get('/app/userHome/notificationCenter/getMarketingCourseMessage')

				if (res.code === 200) {
					this.listse = res.data[0].createTime
				}
			},
			async getSystemMessage() {
				let res = await this.http.get('/app/userHome/notificationCenter/systemMessageList', {
					pageNum: 1,
					pageSize: 10,
				});
				if (res.code == 200) {
					this.sysInfo = res.rows[0] || {}
				} else {}
			},
			//获取会话列表
			async getSessionList() {
				this.chatList = []
				let res = await this.IM.getSessionList()
				console.log("获取到的会话列表", res)
				let sessionList = res.data.channel_infos
				let userList = []
				let chatList = []
				for (let item of sessionList) {
					console.log(item)
					// let pattern = /(?<=_).*(?=@)/
					let pattern = /_(\d+)@/
					let userId = item.channel_id.match(pattern)
					let userID = userId[0].replace("_", "").replace("@", "")
					console.log(userID)
					userList.push(userID)
					chatList.push({
						username: userID,
						payload: JSON.parse(item.meta.payload),
						unreadnum: item.unread_num
					})
				}
				console.log(userList, '李木木')
				//查找用户信息
				let userInfo = await this.IM.getUserInfo(userList)
				let userInfoList = userInfo.data
				console.log(userInfoList)
				for (let item in userInfoList) {
					//在聊天列表中查找用户id，并把用户信息push进聊天列表
					let chatItem = chatList.find(itemValue => itemValue.username === item)
					let newChatItem = Object.assign(chatItem, userInfoList[item])
					this.chatList.push(newChatItem)
				}
				console.log(this.chatList)
			},
			async navTo(item) {
				console.log(item)
				await this.IM.readMessage(item.username)
				let data = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: '../private-letter/private-letter?data=' + data
				})
				await this.getSessionList()
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.top {
		background-color: #FFFFFF;
		padding: 54rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-around;

		view {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 80rpx;
				height: 80rpx;
			}

			text {
				margin-top: 20rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				line-height: 21rpx;
			}
		}

	}

	.view-chat-list {
		background-color: #FFFFFF;
		margin-top: 20rpx;

		.view-chat-item {
			border-bottom: 2rpx solid #EFEFEF;
		}

		.view-chat-item {
			display: flex;
			align-items: center;
			margin: 0 30rpx;
			padding: 30rpx 0;
			justify-content: space-between;

			.view-num {
				width: 40rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				border-radius: 50%;
				background-color: red;
				color: #FFFFFF;
				font-size: 24rpx;
			}

			image {
				width: 100rpx;
				height: 100rpx;
			}

			.view-item-content {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;
				margin-left: 22rpx;

				text {
					font-size: 28rpx;
					color: #999999;

					&:first-child {
						font-size: 32rpx;
						color: #333333;
						font-weight: bold;
						margin-bottom: 14rpx;
					}
				}
			}
		}
	}

	.view-list {
		// margin-top: 30rpx;
		background-color: #FFFFFF;

		.view-item {
			margin: 0 30rpx;
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #EFEFEF;

			.view-left {
				display: flex;
				align-content: center;

				view {
					margin-left: 22rpx;
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					flex-shrink: 1;

					text {
						margin-top: 12rpx;
						font-size: 28rpx;
						color: #999999;
						line-height: 30rpx;
					}

					.text-title {
						margin-bottom: 22rpx;
						font-size: 32rpx;
						color: #333333;
						line-height: 21rpx;
					}
				}
			}

			image {
				width: 100rpx;
				height: 100rpx;
			}

		}

		.view-right {
			text {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 40rpx;
				height: 40rpx;
				background: #EA3527;
				border-radius: 50%;

				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 21rpx;
			}
		}


	}
</style>