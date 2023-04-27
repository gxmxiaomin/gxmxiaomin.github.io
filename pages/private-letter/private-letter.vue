<template>
	<view class="page">
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left" @click="uni.navigateBack()">
				<u-icon name="arrow-left" size="24"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>{{ data.nickname||"" }}</text>
			</view>
			<view class="tab-right" slot="right">
				<u-icon name="setting" size="24"
					@click="uni.navigateTo({url:'/pages/group-info/group-info?groupId=' + data.username})">
				</u-icon>
				<!-- <u-icon name="plus-circle" size="24" @click="uni.navigateTo({url:'/pages/invite-group/invite-group?groupId=' + outherInfo.username})"></u-icon> -->
			</view>
		</TabBar>

		<view class="view-content" :style="showEmoji||showOptions?'height: calc(100% - 400rpx)':''">
			<scroll-view scroll-y="true" class="view-list" show-scrollbar="true" :scroll-into-view="currentMsg"
				@scroll="onScroll" refresher-enabled :refresher-triggered="triggered" @refresherrefresh="scrollRefresh"
				@refresherrestore="onRestore" refresher-background="#F8F8F8">
				<view class="view-item" :id="'scroll-item'+item.id" v-for="(item,index) in msgList" :key="index">
					<view :class="item.from===data.username?'view-left':'view-right'">
						<image :src="data.avatarurl" class="image-avatar" v-if="item.from===data.username"></image>
						<view class="view-msg">
							<view class="view-msg-content" :style="item.contentsType==='IMAGE'? 'padding:0;background:#fff':''">
								<image :src="item.url" class="image-msg" v-if="item.contentsType==='IMAGE'"
									mode="aspectFill" @click="previewImg(item.url)">
								</image>
								<ChatSound ref="chat_sound" v-else-if="item.contentsType==='VOICE'" :url="item.url"
									:duration="item.length" @play="showToast=true" @end="showToast=false"></ChatSound>
								<view class="view-text" v-else>
									<view class="view-text-inner" v-for="(childItem,childIndex) in item.data">
										<text v-if="childItem.type==='txt'">{{childItem.data}}</text>
										<image class="emoji" v-else :src="'../../static/images/faces/'+childItem.data"
											mode=""></image>
									</view>
								</view>
							</view>
							<view class="view-time">{{new Date(Number(item.time)).format("MM-dd HH:mm")}}</view>
						</view>
						<image :src="myInfo.headUrl" class="image-avatar" v-if="item.from!==data.username"></image>
					</view>
				</view>
			</scroll-view>
			<view class="notice" v-show="needNotice&&showNotice" @click="goNewMsg">
				您有新消息,请点击查看
			</view>
		</view>
		<view class="view-footer">
			<view class="view-phone-button" v-if="data.schoolName" @click="uni.makePhoneCall({
				phoneNumber:data.username
			})">
				客服电话
			</view>
			<view class="view-input-bar">
				<image src="../../static/images/yuyin.png" mode="" @click="showPop=true">
				</image>
				<view class="">
					<input type="text" v-model="text" confirm-type="send" @confirm="sendTextMessage()" />
				</view>
				<image src="../../static/images/biaoqing.png" mode="" @click="()=>{
				showEmoji=!showEmoji
				showOptions = false
				return ''
			}"></image>
				<image v-show="text ==''" src="../../static/images/icon_tianjia.png" @click="()=>{
				showOptions=!showOptions
				showEmoji = false
				return ''
			}" mode=""></image>
				<text v-show="text !=''" @click="sendTextMessage">发送</text>
			</view>
			<view class="view-options" v-if="showOptions">
				<view class="view-item" @click="sendImgMessage()">
					<view>
						<image src="../../static/images/zhaopian.png"></image>
						<text>照片</text>
					</view>
				</view>
			</view>
			<view class="view-options" v-if="showEmoji">
				<chatSuitEmoji ref="chatSuitEmoji" @newEmojiStr="emojiAction"></chatSuitEmoji>
			</view>
		</view>
		<view class="view-toast" v-show="showToast">
			播放中
		</view>
		<u-popup :show="showPop">
			<sound-recording :maximum="120" :duration="20" @confirm="(path)=>{
				sendAudio(path)
			 return ''}" @cancel="showPop=false"></sound-recording>
		</u-popup>
	</view>
</template>

<script>
		import TabBar from '@/components/tabBar/tabBar.vue'
	import chatSuitEmoji from "../../components/emoji/emoji";
	import soundRecording from '@/components/sound-recording/sound-recording.vue'
	import ChatSound from './sound.vue'
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		components: {
			chatSuitEmoji: chatSuitEmoji,
			soundRecording: soundRecording,
			ChatSound: ChatSound,
			TabBar:TabBar
		},
		data() {
			return {
				inputText: '',
				showOptions: false,
				showEmoji: false,
				showNotice: false, //显示提示消息
				needNotice: false, //需要提示消息
				showPop: false,
				data: {}, //对方用户信息
				myInfo: {}, //我的信息
				text: "", //文本消息,
				currentMsg: "", //最新一条消息，滚动到这个位置
				msgList: [],
				triggered: true,
				refreshing: false,
				// keyboardHeight: 0, //键盘高度
				showToast: false,
				audioLength: 0, //录音长度
				timer: {}, //录音计时器
				emoji: "",
			};
		},
		onLoad(val) {
			this.data = JSON.parse(decodeURIComponent(val.data))
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.data)
			uni.setStorageSync("nowChatUser", this.data.username)
			uni.$on("newMsg", async (msg) => {
				await this.reciveMsg(msg)
			})
			uni.setNavigationBarTitle({
				title: this.data.schoolName ? this.data.schoolName : this.data.nickname
			});
			this.myInfo = uni.getStorageSync("userInfo")
			console.log(this.myInfo)
			console.log(this.data)
			// uni.onKeyboardHeightChange(res => {
			// 	console.log(res.height)
			// 	this.keyboardHeight = res.height
			// })
		},
		async mounted() {
			await this.IM.resetMessageRoam()
			await this.getHistoryMessage()
		},
		beforeDestroy() {
			uni.removeStorageSync("nowChatUser")
			uni.$off("newMsg")
		},
		watch: {
			async msgList() {
				for (let item of this.msgList) {
					if (item.contentsType === "TEXT") {
						if (typeof(item.data) === "string") {
							item.data = await this.IM.parseEmoji(item.data)
						}
						console.log(typeof(item.data))
					}
				}
				console.log(this.msgList)
			}
		},
		methods: {
			//获取漫游聊天列表
			async getHistoryMessage() {
				let res = await this.IM.messageRoam(this.data.username)
				this.msgList = this.msgList.concat(res)
				if (!(this.msgList && this.msgList.length > 0)) return
				this.$nextTick(() => {
					this.currentMsg = "scroll-item" + this.msgList[this.msgList.length - 1].id
				})
			},
			//接收消息
			async reciveMsg(msg) {
				this.msgList.push(msg)
				console.log(this.msgList)
				await this.IM.readMessage(this.data.username)
				if (this.needNotice) {
					this.showNotice = true
				} else {
					this.$nextTick(() => {
						this.currentMsg = "scroll-item" + this.msgList[this.msgList.length - 1].id
					})
				}
			},
			//发送文本消息
			async sendTextMessage() {
				if (!this.text) {
					this.$toast("请输入内容！")
					return
				}
				let data = {
					msg: this.text,
					toUserName: this.data.username,
				}
				let res = await this.IM.sendPrivateText(data)
				console.log(res)
				if (res.code === 200) {
					this.msgList.push({
						contentsType: "TEXT",
						data: this.text,
						from: this.myInfo.phoneNum,
						to: this.data.username,
						time: Number(new Date()),
						id: res.data.id,
					})
					this.showOptions = false
					this.showEmoji = false
					this.$nextTick(() => {
						this.currentMsg = "scroll-item" + this.msgList[this.msgList.length - 1].id
					})
					console.log(this.msgList)
					this.text = ""
				} else {
					this.$toast("发送失败")
				}
			},
			//选择图片
			sendImgMessage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: async (res) => {
						console.log(res)
						let resUpload = await this.http.upload(res.tempFilePaths[0])
						console.log(resUpload)
						let file = {
							url: resUpload.data,
							username: this.data.username,
							time: new Date().format("yyyyMMddHHmmss")
						}
						console.log(file)
						let resImg = await this.IM.sendPrivateUrlImg(file)
						console.log(resImg)
						this.msgList.push({
							contentsType: "IMAGE",
							url: resUpload.data,
							from: this.myInfo.phoneNum,
							to: this.data.username,
							time: Number(new Date()),
							id: resImg.data.id
						})
						this.showOptions = false
						this.showEmoji = false
						this.$nextTick(() => {
							this.currentMsg = "scroll-item" + this.msgList[this.msgList.length - 1].id
						})
						console.log(this.msgList)
					}
				});
			},
			//自定义下拉刷新被触发
			async scrollRefresh() {
				if (this.refreshing) return;
				this.refreshing = true
				if (!this.triggered) {
					this.triggered = true
				}
				//下拉刷新逻辑
				this.needNotice = true
				let res = await this.IM.messageRoam(this.data.username)
				if (res.length === 0) {
					this.$toast("没有更多了")
					setTimeout(() => {
						this.triggered = false;
						this.refreshing = false;
					}, 500)
					return
				}
				let newIndex = res.length - 2
				this.msgList.unshift.apply(this.msgList, res)
				console.log(this.msgList)
				this.$nextTick(() => {
					this.currentMsg = "scroll-item" + this.msgList[newIndex].id
				})
				//结束下拉刷新状态
				setTimeout(() => {
					this.triggered = false;
					this.refreshing = false;
				}, 500)
			},
			//自定义下拉刷新被复位
			onRestore() {
				this.triggered = "restore" //需要重置，设置为true app上又会执行刷新
			},
			//监听滚动状态
			onScroll(e) {
				this.showOptions = false
				this.showEmoji = false
				if (e.detail.scrollHeight - e.detail.scrollTop > 600) {
					this.needNotice = true
				} else {
					this.needNotice = false
				}
			},
			//查看新消息
			goNewMsg() {
				this.showNotice = false
				this.needNotice = false
				this.currentMsg = "scroll-item" + this.msgList[this.msgList.length - 1].id
			},
			//照片预览
			previewImg(url) {
				uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: '保存',
						success: (data) => {
							uni.saveImageToPhotosAlbum({
								filePath: url,
								success: () => {
									this.$toast('保存成功！')
								}
							})
						}
					}
				})
			},
			// 发送语音
			async sendAudio(path) {
				this.showPop = false
				console.log(path)
				let resUpload = await this.http.upload(path)
				console.log(resUpload)
				innerAudioContext.src = resUpload.data
				innerAudioContext.onCanplay(async () => {
					console.log(innerAudioContext.duration)
					this.audioLength = Number(innerAudioContext.duration.toFixed(0))
					let file = {
						url: resUpload.data,
						username: this.data.username,
						name: new Date().format("yyyyMMddHHmmss"),
						length: this.audioLength,
					}
					console.log(file)
					let resAudio = await this.IM.sendCustomMsg(file)
					console.log(resAudio)
					this.msgList.push({
						contentsType: "VOICE",
						url: resUpload.data,
						from: this.myInfo.phoneNum,
						to: this.data.username,
						time: Number(new Date()),
						id: resAudio.data.id,
						length: this.audioLength,
					})
					this.showOptions = false
					this.showEmoji = false
					this.$nextTick(() => {
						this.currentMsg = "scroll-item" + this.msgList[this.msgList.length - 1].id
					})
					console.log(this.msgList)
				})

			},

			//发送emoji
			async emojiAction(e) {
				// this.$refs.chatSuitMain.emojiAction(evt.msg);
				console.log(e.msg)
				this.text = this.text + e.msg
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: calc(100vh - 70rpx - 43px);
		// background-color: blue;
		background-color: #fff;
	}

	.page {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.view-toast {
		padding: 30rpx;
		text-align: center;
		font-size: 24rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #1d59ff;
		border-radius: 40rpx;
		color: #FFFFFF;
	}

	/deep/.uni-audio-default {
		min-width: 160rpx !important;
		height: 80rpx;

		.uni-audio-left {
			width: 80rpx;
			height: 80rpx;
			background-color: rgba($color: #000000, $alpha: 0);
			display: flex;
			justify-content: center;
			align-items: center;

			.play,
			.pause {
				margin: 0;
			}
		}

		.uni-audio-right {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			margin-left: 20rpx;

			.uni-audio-time {
				margin: 0;
			}

			.uni-audio-info {
				display: none;
			}
		}
	}

	.view-content {
		height: calc(100% - 100rpx);
		background-color: #F8F8F8;

		.notice {
			width: 100%;
			height: 70rpx;
			padding: 0 30rpx;
			font-size: 28rpx;
			background-color: rgb(253, 246, 236);
			line-height: 60rpx;
			color: rgb(249, 174, 61);
			position: relative;
			top: -60rpx;
		}

		.view-list {
			height: 100%;

			.view-item {
				display: flex;
				flex-direction: row;
				padding: 30rpx;

				.image-avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}

				.image-msg {
					width: 300rpx;
					height: 300rpx;
				}

				.image-video {
					width: 390rpx;
					height: 520rpx;
				}

				.view-left {
					display: flex;
					flex-direction: row;

					.view-msg-content {
						margin-left: 20rpx;
						max-width: 500rpx;
						background: #FFFFFF;
						border-radius: 0px 13rpx 13rpx 13rpx;
						padding: 20rpx;
						font-size: 28rpx;

						.emoji {
							width: 54rpx;
							height: 54rpx;
						}
					}

					.view-time {
						margin-top: 10rpx;
						font-size: 24rpx;
					}
				}

				.view-right {
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: flex-end;

					.view-msg-content {
						padding: 20rpx;
						max-width: 500rpx;
						background: #4A9AFF;
						border-radius: 13rpx 0px 13rpx 13rpx;
						margin-right: 20rpx;
						color: #fff;
						font-size: 28rpx;

						.emoji {
							width: 54rpx;
							height: 54rpx;
						}
					}

					.view-time {
						margin-top: 10rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}

	.view-footer {
		// position: fixed;
		// bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
		position: relative;

		.view-phone-button {
			width: 147rpx;
			height: 50rpx;
			background: #E5EEF8;
			border: 1px solid #4A9AFF;
			border-radius: 25rpx;
			font-size: 24rpx;
			color: #4A9AFF;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: -60rpx;
			left: 30rpx;
		}

		.view-input-bar {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;

			image {
				width: 40rpx;
				height: 40rpx;
			}

			view {
				width: 430rpx;
				height: 80rpx;
				// background-color: #00aaff;

				input {
					width: 430rpx;
					height: 70rpx;
					border-radius: 8rpx;
					background-color: #F7F7F7;
				}
			}

			text {
				background-color: #9ecaff;
				width: 100rpx;
				height: 60rpx;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}


	}

	.view-options {
		height: 300rpx;
		background-color: #FFFFFF;

		.view-item {
			display: flex;
			flex-direction: row;
			margin: 30rpx;

			view {
				display: flex;
				align-items: center;
				flex-direction: column;

				image {
					width: 133rpx;
					height: 133rpx;
				}
			}
		}
	}
</style>
