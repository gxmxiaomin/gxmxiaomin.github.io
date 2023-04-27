<template>
	<view class="chat-room-view">
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left" @click="uni.navigateBack()">
				<u-icon name="arrow-left" size="24"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>{{ outherInfo.nickname||"" }}</text>
			</view>
			<view class="tab-right" slot="right">
				<u-icon name="plus-circle" size="24"></u-icon>
			</view>
		</TabBar>

		<!-- 聊天列表界面 -->
		<scroll-view scroll-y="true" :scroll-into-view="currentMsg" class="scroll-view" :scroll-top='scrollTop'
			:refresher-enabled="true" :refresher-triggered='triggered' @refresherrefresh='refresherrefresh'>
			<view class="chat-lists">
				<view class="chat-line" v-for="(item, index) in chatList" :key="item.id" :id="'bottom-id' + item.id">
					<view class="chat-time" v-show="isShow(item, index)">
						<text>{{ getTime(item, index) }}</text>
					</view>
					<!-- 对方发送的消息 -->
					<view class="chat-info-outher chat-line-info" v-if="item.from != myInfo.phoneNum">
						<image :src="outherInfo.avatarurl" mode="" class="header-img" @click="goUserHome(item)"></image>
						<view class="message-content" style="margin-left: 20rpx; background-color: #fff" :class="{'img-message':item.contentsType == 'IMAGE'}">
							<view class="text-message" v-if="item.contentsType == 'TEXT'">
								<view v-for="(content,index) in decMessage(item.data)" :key="index">
									<text v-if="content.type=='text'"> {{ content.content }} </text>
									<image v-else :src="require('@/static/images/faces/' + content.content)" style="width: 20px;height: 20px;" mode=""></image>
								</view>
							</view>
							<!-- <text v-if="item.contentsType == 'TEXT'" v-html="setMessageText(item.data)"></text> -->
							<view class="content-img" v-if="item.contentsType == 'IMAGE'"  @click="seeImg(item)">
								<img :src="item.url" alt="">
							</view>
							<!-- <image :src="item.url" v-if="item.contentsType == 'IMAGE'" mode="" class="content-img" @click="seeImg(item)"></image> -->
							<!-- <u-icon name="volume" v-if="item.contentsType == 'VOICE'" size="28" @click="playVideo(item)"></u-icon> -->
							<view v-if="item.contentsType == 'VOICE'" @click="playVideo(item)">
								<image src="@/static/imgs/outher/video.gif" mode="" v-if="item.isPlay" class="icon-image"></image>
								<image src="@/static/imgs/outher/video.png" mode="" v-else class="icon-image"></image>
								<!-- <image src="@/static/imgs/outher/video.gif" mode="" class="icon-image"></image> -->
							</view>
						</view>
					</view>
					<!-- 我发送的消息 -->
					<view class="chat-info-isme chat-line-info" v-else>
						<image :src="myInfo.headUrl" mode="" class="header-img"></image>
						<view class="message-content" style="margin-right: 20rpx;" :class="{'img-message':item.contentsType == 'IMAGE'}">
							<view class="text-message" v-if="item.contentsType == 'TEXT'">
								<view v-for="(content,index) in decMessage(item.data)" :key="index">
									<text v-if="content.type=='text'"> {{ content.content }} </text>
									<image v-else :src="require('@/static/images/faces/' + content.content)" style="width: 20px;height: 20px;" mode=""></image>
								</view>
							</view>
							<!-- <text v-if="item.contentsType == 'TEXT'" v-html="setMessageText(item.data)"></text> -->
							<view class="content-img" v-if="item.contentsType == 'IMAGE'"  @click="seeImg(item)">
								<img :src="item.url" alt="">
							</view>
							<!-- <image :src="item.url" v-if="item.contentsType == 'IMAGE'" mode="" class="content-img" @click="seeImg(item)"></image> -->
							<!-- <u-icon name="volume" v-if="item.contentsType == 'VOICE'" size="28" @click="playVideo(item)"></u-icon> -->
							<view v-if="item.contentsType == 'VOICE'" @click="playVideo(item)">
								<image src="@/static/imgs/outher/video.png" mode="" v-if="!item.isPlay" class="icon-image"></image>
								<image src="@/static/imgs/outher/video.gif" mode="" v-else  class="icon-image"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 提示和底部信息 -->
		<MessageTip ref="messageTip"></MessageTip>

		<view class="foot-box">
			<view class="foot-line">
				<view class="left-img" @click="txtMsg = !txtMsg">
					<image :src="require('@/static/imgs/outher/yuyin.png')" mode="" v-show="txtMsg"></image>
					<image :src="require('@/static/imgs/outher/jianpan.png')" mode="" v-show="!txtMsg"></image>
				</view>
				<view class="center-input">
					<u-input v-model="inputText" v-show="txtMsg" @focus="inputFouce()" @confirm="sendMessage"/>
					<text class="video-input" v-show="!txtMsg" @longpress="getVideo" @touchend="setVideo"> {{ btnText }}</text>
				</view>
				<view class="right-cell">
					<view class="right-img" @click="selectEmo=!selectEmo">
						<image :src="require('@/static/imgs/outher/biaoqing.png')" mode=""></image>
					</view>
					<view class="right-text">
						<text v-show="inputText!=''" @click="sendMessage">发送</text>
						<u-icon name="photo" size="28" v-if="inputText==''" @click="sendImg"></u-icon>
					</view>
				</view>
			</view>
			<view class="emo-select" v-show="selectEmo">
				<chatSuitEmoji ref="chatSuitEmoji" @newEmojiStr="emojiAction"></chatSuitEmoji>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	import chatSuitEmoji from '@/components/emoji/emoji'
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		components: { TabBar, chatSuitEmoji },
		data() {
			return {
				outherInfo:{},
				myInfo:{},
				selectEmo: false,
				// 聊天列表
				chatList: [],
				inputText: "",
				currentMsg:"", //最新的消息
				txtMsg: true, //表示文本信息还是语音信息
				btnText: '按住 说话',
				triggered: false,
				// 语音播放的参数
				isPlay: false,
				currentUrl: "",
				endTime: 0,
				startTime: 0,
				scrollTop: ''
			};
		},
		onLoad(options) {
			this.outherInfo = JSON.parse(decodeURIComponent(options.data))
			console.log("???????", this.outherInfo.username)
			this.myInfo = uni.getStorageSync("userInfo")
			console.log("获取到的用户信息",this.myInfo)
			this.getHistoryMessage()
			this.IM.readMessage(this.outherInfo.username)
			// 监听事件
			this.monitr()
			this.mp3Monitr()

			recorderManager.onStop(function (res) {
				console.log('recorder stop' + JSON.stringify(res));
			});

		},
		onUnload() {
			innerAudioContext.stop()
			uni.$off('havNewMsg', this.newMessage)
		},
		methods: {
			async goUserHome(item) {
				console.log("点击的用户", item)
				const res = await this.http.postJson('/app/userInfo/getUserByUserIds',[item.from])
				console.log("获取到的角色信息", res)
				uni.navigateTo({
					url: '/pages/personal-home-page/personal-home-page?id=' + res.data[0].id
				})
			},

			monitr() { //新消息的监听事件
				uni.$on('havNewMsg', this.newMessage)
			},

			inputFouce() {
				console.log("键盘获得焦距")
				this.selectEmo = false
			},

			mp3Monitr() { //mp3的监听事件
				innerAudioContext.onPlay(() => {
					this.isPlay = true
					console.log('开始播放');
				});
				innerAudioContext.onPause(()=>{
					this.isPlay = false
					this.beginVideo({id:-1})
					console.log("暂停播放")
				})
				innerAudioContext.onStop(()=>{
					this.isPlay = false
					this.beginVideo({id:-1})
					console.log("停止播放")
				})
				innerAudioContext.onEnded(()=>{
					this.isPlay = false
					this.beginVideo({id:-1})
					console.log("播放完成")
				})
				innerAudioContext.onCanplay((msg)=>{
					console.log("当前播放的音频信息", msg)
				})
				innerAudioContext.onError((res) => {
					this.isPlay = false
					this.beginVideo({id:-1})
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},

			getTime(item, index) { //格式化时间
				return new Date(Number(item.time)).format("MM-dd HH:mm")
			},

			isShow(item, index) { //是否显示聊天信息
				if(index < 1) return true
				var usedTime = Number(item.time) - Number(this.chatList[index-1].time);
				return usedTime >= 3600*1000*2
			},

			getEmo(content,emoStyle ,list=[]) {
				const emo = emoStyle.exec(content)
				if(!emo) return list
				list.push(emo[0])
				let arr = content.split(emo[0])
				let str = ""
				for(let i = 1; i < arr.length; i++) str += arr[i]
				list = this.getEmo(str,emoStyle, list)
				return list
			},

			decMessage(content) {
				const emoStyle = /\[[\s\S]{2,4}\]/
				const emo = emoStyle.exec(content)
				const emoList = this.getEmo(content, emoStyle)
				let arr = content.split(emoStyle)
				let i = 0;
				arr = arr.map(ele=>{
					if(ele==""&& i<emoList.length) { //表示表情格式的
						let src = this.IM.setEmoji(emoList[i])
						if(!src) { //表示没有表情
							ele= {
								type: 'text',
								content: emoList[i]
							}
						} else {
							ele = {
								type: 'emo',
								content: src
							}
						}
						i++
					} else {
						ele = {
							type: 'text',
							content: ele
						}
					}
					return ele
				})
				console.log("arr", arr)
				return arr
			},

			setMessageText(content) { //设置文本消息

				let list = this.decMessage(content)

				const emoStyle = /\[[\s\S]{2,4}\]/
				const emo = emoStyle.exec(content)
				const emoList = this.getEmo(content, emoStyle)
				if(!emo) return content
				let src = this.IM.setEmoji(emo)
				if(!src) return content
				src = require("@/static/images/faces/" + src)
				let img = '<img src="https://cdn.uviewui.com/uview/common/logo.png" style="width: 20px;height: 20px;" alt="">'
				// let img = '<image src=' + src + ' style="width: 20px;height: 20px;" alt=""></image>'
				// let img = '<img src=' + src + ' style="width: 20px;height: 20px;" alt="">'
				let str = content.replace(emoStyle, img)
				return str
			},

			newMessage(msg) { //接收到新的消息
				if(msg.from == this.outherInfo.username) {
					this.IM.readMessage(this.outherInfo.username)
					this.chatList.push(msg)
					this.scollToBottom()
				} else {
					this.$refs.messageTip.showTip(msg)
				}
			},

			scollToBottom() { //滚动到最底部
				// this.scrollTop = "9999999999999"
				this.$nextTick(()=>{
					if(this.chatList.length > 0) {
						this.currentMsg = "bottom-id" + this.chatList[this.chatList.length-1].id;
					} else {
						this.currentMsg = ""
					}
				})
			},

			async refresherrefresh() {
				this.triggered = true
				const res = await this.IM.messageRoam(this.outherInfo.username)
				this.chatList = [...res, ...this.chatList]
				this.chatList.forEach(ele=>{
					ele.isPlay = false
				})
				this.$nextTick(()=>{
					if(res.length > 0) {
						this.currentMsg = "bottom-id" + res[res.length-1].id;
					} else {
						this.currentMsg = ""
					}
				})
				this.triggered = false
			},

			async getHistoryMessage() { // 获取历史信息
				await this.IM.resetMessageRoam()
				const res = await this.IM.messageRoam(this.outherInfo.username)
				console.log("获取到的漫游信息", res)
				this.chatList = res
				this.chatList.forEach(ele=>{
					ele.isPlay = false
				})
				this.scollToBottom()
			},

			sendImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: async (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						const data = await this.http.upload(res.tempFilePaths[0])
						console.log("选择的图片路径", data)
						let file = {
							url: data.data,
							time: new Date().getTime(),
							username: this.outherInfo.username
						}
						const result = await this.IM.sendPrivateUrlImg(file)
						this.sendSuccess()
						console.log("发送图片的结果为", result)
						this.addImgMessage(data.data)
					}
				})
			},

			addImgMessage(url) { //发送图片
				let data = {
					contentsType: "IMAGE",
					url: url,
					from: this.myInfo.phoneNum,
					to: this.outherInfo.username,
					id: new Date().getTime(),
					time: new Date().getTime(),
					isPlay: false
				}
				this.chatList.push(data)
				this.scollToBottom()
			},

			async sendMessage() {
				let data = {
					msg: this.inputText,
					toUserName: this.outherInfo.username,
				}
				console.log("发送的消息是", data)
				let res = await this.IM.sendPrivateText(data)
				this.sendSuccess()
				this.addTextMessage()
				this.inputText = ""
				console.log("发送成功", res)
			},

			addTextMessage() {
				let data = {
					contentsType: "TEXT",
					data: this.inputText,
					from: this.myInfo.phoneNum,
					to: this.outherInfo.username,
					id: new Date().getTime(),
					time: new Date().getTime(),
					isPlay: false
				}
				this.chatList.push(data)
				this.scollToBottom()
			},

			getVideo() {
				// #ifdef H5
				return
				// #endif
				recorderManager.start();
				this.btnText = '正在讲话中....'
			},

			setVideo() {
				recorderManager.stop();
				recorderManager.onStop((res)=>{
					console.log("录音结束", res)
					this.btnText = '按住 说话'
					this.sendVideoMessage(res)
				});
			},

			async emojiAction(e) {
				// this.$refs.chatSuitMain.emojiAction(evt.msg);
				console.log(e.msg)
				this.inputText += e.msg
			},

			async sendVideoMessage(res) {
				console.log("发送语音消息", res)
				const data = await this.http.upload(res.tempFilePath)
				console.log("上传的录音文件", data)
				let file = {
					url: data.data,
					time: new Date().getTime(),
					username: this.outherInfo.username,
					length: 1,
					name: new Date().getTime()
				}
				const result = await this.IM.sendCustomMsg(file)
				this.sendSuccess()
				console.log("发送的录音结果为", result)

				this.addVideoMessage(data.data)
			},

			sendSuccess(){
				this.$refs.uToast.show({
					message: '发送成功',
					type: 'success'
				})
			},

			addVideoMessage(url) {
				let data = {
					contentsType: "VOICE",
					url: url,
					from: this.myInfo.phoneNum,
					to: this.outherInfo.username,
					id: new Date().getTime(),
					time: new Date().getTime(),
					isPlay: false
				}
				this.chatList.push(data)
				this.scollToBottom()
			},

			beginVideo(item) {
				this.chatList = this.chatList.map(ele=>{
					ele.isPlay = (ele.id == item.id)
					return ele
				})
			},

			playVideo(item) {
				console.log("播放的语音", item)
				if(item.url != this.currentUrl) {
					this.isPlay = false
					innerAudioContext.stop()
					innerAudioContext.src = item.url;
					this.currentUrl = item.url
					innerAudioContext.play()
					this.beginVideo(item)
				} else { //连续播放
					if(!this.isPlay) {
						innerAudioContext.play()
						this.beginVideo(item)
					} else {
						innerAudioContext.stop()
						this.beginVideo({id:-1})
					}
				}

			},

			seeImg(item) {
				let list = []
				this.chatList.forEach(msg=>{
					if(msg.contentsType == "IMAGE") {
						list.push(msg.url)
					}
				})
				uni.previewImage({
					current: item.url,
					urls: list,
					success: res=>{
						console.log("预览成功")
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
.chat-room-view {
	min-height: 100vh;
	width: 100%;
	background-color: rgba(236, 236, 236, 0.8);
	position: relative;
}

.scroll-view {
	width: 100%;
	height: calc(100vh - 100rpx - 44px - var(--status-bar-height));
}

.chat-lists {
	width: 100%;
	padding: 0 20rpx 100rpx 20rpx;
	box-sizing: border-box;
	.chat-line {
		width: 100%;
		min-height: 120rpx;
		padding: 20rpx 0;
		.chat-time {
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24rpx;
			color: rgba(182, 182, 182, 0.8);
		}
		.chat-info-outher {
			display: flex;
		}
		.chat-info-isme {
			display: flex;
			flex-direction: row-reverse;
		}
		.header-img {
			width: 88rpx;
			height: 88rpx;
			border-radius: 20rpx;
		}
		.message-content {
			max-width: 554rpx;
			min-height: 72rpx;
			font-size: 32rpx;
			line-height: 32rpx;
			color: rgba(51, 51, 51, 0.8);
			font-family: PingFang-SC-Medium;
			border-radius: 15rpx;
			padding: 20rpx;
			background-color: rgba(110, 205, 255, 0.7);
			display: flex;
			align-items: center;
			.text-message {
				display: flex;
			}
			.content-img {
				width: 450rpx;
				img {
					width: 100%;
					height: auto;
				}
			}
			.icon-image {
				width: 30rpx;
				height: 30rpx;
				margin: 0rpx 10rpx 0rpx 20rpx;
			}
		}
		.img-message {
			padding: 0;
		}
	}
}

.foot-box {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	.emo-select {
		width: 100%;
		background-color: #fff;
	}
}

.foot-line {
	width: 100%;
	height: 100rpx;
	background-color: #f0f0f0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
	image {
		width: 66rpx;
		height: 66rpx;
	}
	.center-input {
		margin: 0 20rpx;
		flex: 1;
		display: flex;
		align-items: center;
		background-color: rgba(220, 220, 220, 0.8);
		border-radius: 20rpx;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 10rpx;
		.video-input {
			width: 100%;
			height: 70rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.right-cell {
		height: 100%;
		display: flex;
		align-items: center;
		width: 150rpx;
	}
	.right-text {
		width: 100rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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
</style>
