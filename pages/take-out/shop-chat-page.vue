<template>
	<view class="page_view">
		<!-- 顶部消息区域 -->
		<view class="top_bar">
			<view >
				<u-icon name="arrow-left" color="#515151" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="center">
				<text>果蔬(文化路店）</text>
			</view>
			<view></view>
		</view>
		<!-- 聊天信息区域 -->
		<view class="page_center">
			<scroll-view scroll-y="true" class="scroll_box" :refresher-enabled="true" :refresher-triggered="trigger"
			:scroll-into-view="currentMsg"	@refresherrefresh="refresherrefresh">
				<view class="scroll_content">
					<messageLine v-for="item in messageList" :key="item.id" :message="item" :isMe="item.isMe" :id="'scorll-bottom-' + item.id"></messageLine>
				</view>
			</scroll-view>
		</view>
		
		<view class="bottom_box">
			<!-- 默认显示的盒子 -->
			<view class="def_box">
				<u-icon :name="require('@/static/images/take-out/video.png')" color="#515151" size="20"></u-icon>
				<!-- 富文本输入框 -->
				<view class="input_box">
					<!-- <editor id="editor" :placeholder="placeholder" @ready="onEditorReady"></editor> -->
					<u--input placeholder="请输入内容" border="surround" v-model="messageText"></u--input>
				</view>
				
				<u-icon :name="require('@/static/images/take-out/smile.png')" color="#515151" size="20" style="margin-left: 25rpx;"></u-icon>
				<u-icon name="plus-circle" color="#515151" size="24" style="margin-left: 25rpx;"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import messageLine from '@/pages/take-out/components/message-linel/message-linel.vue'
	export default {
		components:{ messageLine },
		data() {
			return {
				messageList: [],
				trigger: false,
				currentMsg:"",
				placeholder:'请输入...',
				editorCtx: null,
				messageText:""
			};
		},
		onLoad() {
			this.getMessageList()
		},
		methods:{
			getMessageList() {
				this.messageList = [
					{id: 1, data: "我是一个文本消息", type: "TEXT",isMe: false},
					{id: 2, data: "https://img1.baidu.com/it/u=2967349000,151382135&fm=253&fmt=auto&app=138&f=JPEG", type:"IMAGE",isMe: true},
					{id: 3, data: "我是一个文本消息", type: "TEXT",isMe: true},
					{id: 4, data: "https://img1.baidu.com/it/u=2774261946,3406162344&fm=253&fmt=auto&app=138&f=JPEG", type:"IMAGE",isMe: false},
					{id: 5, data: "我是一个文本消息", type: "TEXT",isMe: true},
					{id: 6, data: "我是一个文本消息", type: "TEXT",isMe: false},
					{id: 7, data: "我是一个语音消息", type: "VIDEO",isMe: true},
					{id: 8, data: "我是一个语音消息", type: "VIDEO",isMe: false},
					{id: 9, data: "我是一个文本消息", type: "TEXT",isMe: true},
					{id: 10, data: "我是一个文本消息", type: "TEXT",isMe: false},
					{id: 11, data: "我是一个文本消哈萨克发挥空间按时到货付款京哈速度放缓息", type: "TEXT",isMe: false},
					{id: 12, data: "我是一个文本消哈萨克发挥空间按时到货付款京哈速度放缓息", type: "TEXT",isMe: true},
					{id: 13, data: "我是一个文本消息", type: "TEXT",isMe: false},
					{id: 14, data: "我是一个文本消息", type: "TEXT",isMe: true},
					{id: 15, data: "我是一个文本消息", type: "TEXT",isMe: false},
				]
				this.scollToBottom()
			},
			
			scollToBottom() {
				console.log("滚动到底部")
				this.$nextTick(()=>{
					if(this.messageList.length > 0) {
						this.currentMsg = "scorll-bottom-" + this.messageList[this.messageList.length-1].id;
						console.log(this.currentMsg)
					} else {
						this.currentMsg = ""
					}
				})
			},
			
			refresherrefresh() {
				this.trigger = true
				setTimeout(()=>{
					this.trigger = false
				},1000)
			},
			
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					this.editorCtx.format('fontSize','14px')
					this.editorCtx.format('color','#333333')
					this.editorCtx.format('lineHeight','30px')
				}).exec()
			},
		},
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}
.page_view {
	width: 100%;
	height: 100vh;
	position: relative;
	.top_bar {
		width: 100%;
		height: calc(var(--status-bar-height) + 44px + 100rpx);
		padding: 0 20rpx;
		padding-top: var(--status-bar-height);
		padding-bottom: 100rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 36rpx;
		color: #fff;
		font-weight: Medium;
		background-image: linear-gradient(to top,#F1F1F1,#A1C7F7,#378EFD);
	}
	.page_center {
		width: 100%;
		height: calc(100vh - var(--status-bar-height) - 44px - 100rpx);
		background-color: #fff;
		position: relative;
		top: -100rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
	}

}

.scroll_box {
	width: 100%;
	height: 100%;
	.scroll_content {
		width: 100%;
		min-height: 100%;
		background-color: #f1f1f1;
	}
}


.bottom_box {
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	.def_box {
		width: 100%;
		height: 100rpx;
		padding: 0 25rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.input_box {
			margin-left: 25rpx;
			flex: 1;
			height: 80rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			border-radius: 80rpx;
			background-color: #fff;
			border: 1rpx solid rgba(115, 115, 115, 0.8);
			overflow: hidden;
			#editor {
				width: 100%;
				height: 60rpx;
			}
		}
	}
}
</style>
