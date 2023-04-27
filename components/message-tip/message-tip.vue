<template>
	<view class="com-message-tip" v-show="show">
		<view class="com-message-content" @click="goChart">
			<view class="com-user-header">
				<image :src="user.headUrl" mode=""></image>
			</view>
			<view class="com-user-info">
				<text style="font-weight: 900"> {{ user.nickName }} </text>
				<text style="font-size: 26rpx;color: #7c7c7c;"> {{ message }} </text>
			</view>
		</view>
	</view>
</template>

<script>

	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();

	export default {
		name:"message-tip",
		data() {
			return {
				show: false,
				message: "",
				user: {
					nickName: "",
					headUrl: "",
					userName: ""
				},
				userName: "",
				type: "chat"
			};
		},
		methods: {
			async showTip(data) {
				console.log("消息提醒", data)
				if(uni.getStorageSync('msgNotTip')) {
					console.log("不需要消息提示")
					return
				}
				if(data.from == uni.getStorageSync("imUserName")) return
				if(data.type == "groupchat") {
					this.setGroupInfo(data)
					return
				}
				this.userName = data.from||""
				const res = await this.http.post("/app/userInfo/selectPhone", {
					userName: data.from||""
				})
				if(res.code != 200) return

				this.user = {
					userName: String(res.data.userName),
					nickName: res.data.nickName||"未知联系人",
					headUrl: res.data.headUrl||'https://msn-img-nos.yiyouliao.com/inforec-20220914-9388140c3d635e7c6cb7bd51002aec85.jpg'
				}

				if(data.contentsType == 'TEXT') {
					this.message = data.data||'有一条新消息'
				} else if(data.contentsType == "IMAGE") {
					this.message = "[图片]"
				} else if (data.contentsType == "VOICE") {
					this.message = "[语音]"
				} else {
					this.message = "其它消息"
				}
				console.log("接受到来自", res)
				innerAudioContext.src = require("@/static/mp3/message.mp3")
				innerAudioContext.play()
				this.show = true
				setTimeout(()=>{
					innerAudioContext.stop()
					this.show = false
				}, 1000 * 2)
			},

			async setGroupInfo(msg, end=false) {
				console.log("群聊消息", msg)
				let noTipGroupList = uni.getStorageSync("noTipGroupList")||[]
				let allGroupList = uni.getStorageSync("allGroupList")||[]
				let noTip = noTipGroupList.find(ele=>{
					return msg.to == ele.groupId
				})
				if(noTip) return
				let tip = allGroupList.find(group=>{
					return msg.to == group.groupId
				})
				if(!tip&&end) return
				if(!tip) {
					const res = await this.http.get("/app/appGroup/getUserGroup", {})
					console.log("获取到的群聊列表", res)
					uni.setStorageSync("allGroupList", res.data)
					this.setGroupInfo(msg, true)
					return
				}
				tip = tip||{}

				this.user = {
					userName: msg.to,
					nickName: tip.name||"未知联系人",
					headUrl: tip.headUrl||'https://msn-img-nos.yiyouliao.com/inforec-20220914-9388140c3d635e7c6cb7bd51002aec85.jpg'
				}

				if(msg.contentsType == 'TEXT') {
					this.message = msg.data||'有一条新消息'
				} else if(msg.contentsType == "IMAGE") {
					this.message = "[图片]"
				} else if (msg.contentsType == "VOICE") {
					this.message = "[语音]"
				} else {
					this.message = "其它消息"
				}
				innerAudioContext.src = require("@/static/mp3/message.mp3")
				innerAudioContext.play()
				this.show = true
				setTimeout(()=>{
					innerAudioContext.stop()
					this.show = false
				}, 1000 * 2)
			},



			goChart() {
				console.log("跳转到聊天界面去")
				let data = {
					username: this.user.userName,
					nickname: this.user.nickName,
					avatarurl: this.user.headUrl
				}
				if(this.type == "chat") {
					this.IM.readMessage(this.userName)
					uni.navigateTo({
						url: "/pages/chat-room/chat-room?data=" + encodeURIComponent(JSON.stringify(data))
					})
				} else {
					this.$toast("群聊正在开发")
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.com-message-tip {
	width: 100%;
	height: calc(80px + var(--status-bar-height));
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
}

.com-message-content {
	width: 90%;
	height: 120rpx;
	background-color: #fff;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 0 20rpx;
	justify-content: space-between;
	animation: anima 2s linear infinite;
	.com-user-header {
		image {
			width: 90rpx;
			height: 90rpx;
			border-radius: 20rpx;
		}
	}
	.com-user-info {
		height: 90rpx;
		flex: 1;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 28rpx;
		color: #515151;
	}
}
@keyframes anima {
	0% {
		opacity: 0;
		transform: translateY(-100%);
	}
	20% {
		opacity: 1;
		transform: translate(0, 0);
	}
	80% {
		opacity: 1;
		transform: translate(0, 0);
	}
	100% {
		opacity: 0;
		transform: translateY(-100%);
	}
}
</style>
