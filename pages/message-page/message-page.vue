<template>
	<view class="page-view">
		<view class="page-top">
			<view class="top-left">
				<u-tabs :list="list" :activeStyle='activeStyle' :inactiveStyle='inactiveStyle' lineWidth="10"
					:current='current' @click="tabChange"></u-tabs>
			</view>

			<view v-if="currentBtn==3" @click="uni.navigateTo({url:'/pages/createGroup/createGroup'})" class="top-right">
				<u-icon name="plus-circle" color="#343434" size="24"></u-icon>
			</view>


			<view class="top-right" v-else @click="uni.navigateTo({
				url:'/pages/add-user/add-user'
			})">
				<u-icon name="search" color="#343434" size="28"></u-icon>
			</view>
		</view>

		<!-- 列表内容 -->
		<scroll-view scroll-y="true" class="scroll-box" :refresher-enabled="true" :refresher-triggered="trigger"
			@refresherrefresh="refresherrefresh" @scrolltolower='scrolltolower'>
			<view class="scroll-content">
				<ComMessage v-if="current==0" :list="messageList" @goView="goView" @delectMessage="delectMessage"></ComMessage>
				<ComUserList v-else :list="userList" :currentBtn='currentBtn' @changeBtn="changeBtn" @goChart="goChart"
					@goDetial='goDetial'></ComUserList>
			</view>
		</scroll-view>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	import ComMessage from '@/components/com-message/com-message.vue'
	import ComUserList from '@/components/com-userList/com-userList.vue'
	export default {
		components: {
			ComMessage,
			ComUserList
		},
		data() {
			return {
				list: [{
						name: '消息'
					},
					{
						name: '通讯录'
					}
				],
				activeStyle: {
					color: '#00aaff',
					fontWeight: 'bold',
					"letter-spacing": '2rpx',
					transform: 'scale(1.05)'
				},
				inactiveStyle: {
					color: '#626468',
					"letter-spacing": '2rpx',
					transform: 'scale(1)'
				},
				current: 0,
				trigger: false,
				messageList: [],
				userList: [],
				fancePage: 1,
				currentBtn: 0,
				userPhone: "",
				groupList:[]
			};
		},
		onLoad() {
			this.getGroupList()
			this.messageShowTip.showTextMessage(this)
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		onShow() {
			this.userPhone = uni.getStorageSync('imUserName')
			this.requireData()
		},
		methods: {
			tabChange(info) {
				this.current = info.index
				this.requireData()
			},

			changeBtn(index) {
				console.log("触发的", index)
				this.currentBtn = index
				this.requireData(index)
			},

			refresherrefresh() {
				this.trigger = true
				console.log("下拉刷新")
				this.requireData()

			},

			scrolltolower() {
				if (this.current == 1 && this.currentBtn == 0) {
					this.getFollowList()
				} else if (this.current == 1 && this.currentBtn == 1) {
					this.getFanceList()
				}
			},

			requireData() {
				if (this.current == 0) { //获取信息列表
					this.getMessageList()
				} else {
					if (this.currentBtn == 0) { //获取好友列表
						this.fancePage = 1
						this.getList()
						// this.getFollowList() //关注
					} else if (this.currentBtn == 1) { //获取关注列表
						this.fancePage = 1
						// this.getFanceList()  //粉丝
						this.getFollowList()
					} else if (this.currentBtn == 2) { //获取粉丝列表
						this.fancePage = 1
						this.getFanceList()
					} else { //获取群聊列表
						this.fancePage = 1
						this.qunLiao()
					}
				}
			},

			// 获取我加入的群聊列表
			async getGroupList() {
				const res = await this.http.get("/app/appGroup/getUserGroup", {})
				// console.log("获取到的群聊列表", res)
				this.groupList = res.data
			},

			async getMessageList() { //获取聊天列表
				const res = await this.IM.getSessionList()
				console.log("获取到的聊天列表", res)
				this.processInfo(res.data.channel_infos)
			},

			processInfo(data) { //处理信息
				if (!Array.isArray(data)) return

				let list = {}
				let user = new Set()
				data.forEach(ele => {
					let obj = {}
					obj.unread_num = ele.unread_num
					if (ele.channel_id.indexOf('@easemob.com') > -1) { //表示单聊
						obj.type = 0
						obj.userName = JSON.parse(ele.meta.payload).from
						if (obj.userName == this.userPhone) {
							obj.userName = JSON.parse(ele.meta.payload).to
						}
					} else { //表示群聊
						obj.type = 1
						obj.userName = JSON.parse(ele.meta.payload).to
					}
					obj.time = ele.meta.timestamp
					obj.text = JSON.parse(ele.meta.payload).bodies[0].msg
					obj.payload = JSON.parse(ele.meta.payload)
					obj.show = false
					if (obj.userName != this.userPhone) { //判断这个消息是不是自己发给自己的
						if (!list[obj.userName]) list[obj.userName] = obj
						else list[obj.userName] = (list[obj.userName].time > obj.time ? list[obj.userName] : obj)

						user.add(obj.userName)
					}
				})
				this.getUserListInfo([...user], list)
			},

			async getUserListInfo(userNo, message) { //获取用户的列表信息

				const res = await this.http.postJson('/app/userInfo/getUserByUserIds', userNo)
				console.log("获取到的用户信息列表", res)
				let userArr = {}
				this.messageList = []
				if (res.code == 200) {
					res.data.forEach(user => {
						userArr[user.userName] = user
					})
				}
				this.messageList = userNo.map(no => {
					// message[no].userInfo = {src:'https://cdn.uviewui.com/uview/common/logo.png'}||{}
					message[no].userInfo = userArr[no] || {
						headUrl: 'https://img0.baidu.com/it/u=1880899726,3824907986&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
						nickName: no
					}
					return message[no]
				})
				console.log("消息列表", this.messageList)
				// this.messageList = arr
				this.messageList = this.messageList.map(ele=>{
					if(ele.type == 1) {
						let group = this.groupList.find(group=>{
							return group.groupId == ele.userName
						})
						if(group) {
							console.log("有这个")
							ele.userInfo = {
								headUrl: group.headUrl,
								nickName: group.name
							}
						}
					}
					return ele
				})
				this.trigger = false
			},

			async goView(item) {
				console.log("跳转的页面", item)
				await this.IM.readMessage(item.userName)

				let data = {
					nickname: (item.userInfo || {}).nickName || "未命名",
					avatarurl: (item.userInfo || {}).headUrl ||
						"https://img0.baidu.com/it/u=1880899726,3824907986&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
					username: item.userName
				}
				// uni.navigateTo({
				// 	url: "/pages/private-letter/private-letter?data=" + encodeURIComponent(JSON.stringify(
				// 		data))
				// })
				if (item.type == 0) {
					uni.navigateTo({
						url: "/pages/chat-room/chat-room?data=" + encodeURIComponent(JSON.stringify(data))
					})
				} else {
					uni.navigateTo({
						url: "/pages/group-room/group-room?data=" + encodeURIComponent(JSON.stringify(data))
					})
				}

			},

			delectMessage(index) {
				console.log("删除的下标是",index)
				this.messageList.splice(index, 1)
			},

			goChart(item) {
				console.log("私信的", item)
				let data = {
					nickname: item.nickName,
					avatarurl: item.headUrl ||
						'https://img0.baidu.com/it/u=1880899726,3824907986&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
					username: String(item.userName)
				}
				uni.navigateTo({
					url: "/pages/chat-room/chat-room?data=" + encodeURIComponent(JSON.stringify(data))
				})
			},

			goDetial(item) {
				console.log("展示详情", item)

				uni.navigateTo({
					url: "/pages/personal-home-page/personal-home-page?id=" + item.id
				})
			},

			async getFanceList() { //获取粉丝列表
				const res = await this.http.get('/app/forum/topic/selectForumFocusList', {
					pageNum: this.fancePage,
					pageSize: 10,
					focusId: (uni.getStorageSync("userInfo")||{}).id
				})
				console.log("获取到的粉丝列表", res)
				this.trigger = false
				if (res.code != 200) return

				if (this.fancePage == 1) {
					this.userList = res.rows || []
					this.fancePage++
				} else if (this.userList.length + res.rows <= res.total) {
					this.userList = [...this.userList, ...res.rows]
					this.fancePage++
				}
			},

			async getFollowList() {
				const res = await this.http.get('/app/forum/topic/selectuserIdList', {
					pageNum: this.fancePage,
					pageSize: 10
				}) //triggered
				this.trigger = false
				console.log("获取到的关注列表", res)
				if (res.code != 200) return
				if (this.fancePage == 1) {
					this.userList = res.rows || []
					this.fancePage++
				} else if (this.userList.length + res.rows <= res.total) {
					this.userList = [...this.userList, ...res.rows]
					this.fancePage++
				}
			},

			async qunLiao() {
				this.userList = []
				const res = await this.http.get("/app/appGroup/getUserGroup", {})
				console.log("获取到的群聊列表", res)
				this.userList = res.data
				this.trigger = false
			},

			async getList() {
				const res = await this.http.get('/app/forum/topic/selectForumFocusLists',{
					pageNum:1,
					pageSize:99999999,
					focusId: uni.getStorageSync("userInfo").id
				})
				console.log(res)
				this.trigger = false
				this.userList = res.rows||[]
				// if(res.code != 200) return
				// if(this.pageNum == 1) {
				// 	this.pageNum++
				// 	this.countList = res.rows
				// }
				// else if (this.countList.length + res.rows.length <= res.total) {
				// 	this.pageNum++
				// 	this.countList = [...this.countList, ...res.rows]
				// }
				// console.log("获取到的好友列表", res.rows)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-view {
		width: 100%;
		/* #ifdef H5 */
		height: calc(100vh - 50px);
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;

		/* #endif */
		.page-top {
			width: 100%;
			height: calc(44px + var(--status-bar-height));
			background-color: #fff;
			box-sizing: border-box;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			// align-items: center;
			align-items: flex-end;
			.top-right {
				transform: translateY(-10rpx);
			}
		}
	}

	.scroll-box {
		width: 100%;
		/* #ifdef H5 */
		height: calc(100vh - 44px - 50px - var(--status-bar-height));
		/* #endif */
		/* #ifndef H5 */
		height: calc(100vh - 44px - var(--status-bar-height));

		/* #endif */
		.scroll-content {
			width: 100%;
		}
	}
</style>
