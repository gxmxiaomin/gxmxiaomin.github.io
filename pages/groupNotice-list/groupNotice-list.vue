<template>
	<view class="page-view">
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left">
				<u-icon name="arrow-left" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>群公告</text>
			</view>
			<view class="tab-right" slot="right">
				<!-- <text class="confirm-btn">确认</text> -->
				<view class="confirm-btn" @click="submit" v-if="isOwner">
					<text>确认</text>
				</view>
			</view>
		</TabBar>

		<scroll-view scroll-y="true" :refresher-enabled="true" :refresher-triggered="trigger"
		 @refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower" class="scroll-box">
			<view class="notice-list">

				<!-- 群主和管理员可以添加公告 -->
				<view class="nodice-add" v-if="isOwner">
					<u--textarea v-model="newNotice" placeholder="新增公告" count autoHeight style="min-height: 200rpx;"></u--textarea>
				</view>

				<!-- 公告列表 -->
				<view class="notice-cell" v-for="item in noticeList" :key="item.createTime">
					<text> {{item.text}} </text>
					<text class="notice-time">{{item.createTime}}</text>
				</view>

				<view class="notice-def" v-if="noticeList.length < 1">
					<text>----- 暂时还没有公告 -----</text>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	export default {
		components: { TabBar },
		data() {
			return {
				newNotice: "",
				groupId: "",
				isOwner: false,
				noticeList: [],
				trigger: false
			};
		},
		onLoad(options) {
			console.log("修改的群", options)
			this.groupId = options.groupId
			this.isOwner = options.isOwner
			this.getNotice()
		},
		methods:{
			async submit(){
				const res = await this.http.postJson('/app/appGroup/setNotice', {
					groupId: this.groupId,
					text: this.newNotice
				})
				console.log("添加群公告的结果为", res)
			},
			refresherrefresh() {
				this.trigger = true
				setTimeout(()=>{
					this.trigger = false
				},1000)
			},

			async getNotice() {
				const res = await this.http.get('/app/appGroup/getNotice', {
					groupId: this.groupId
				})
				console.log("获取到的群公告是", res)
				this.noticeList = res.data
			},

			scrolltolower() {
				console.log("触底加载")
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-view {
	width: 100%;
	height: 100vh;
}

.scroll-box {
	width: 100%;
	height: calc(100vh - 44px - var(--status-bar-height));
}

.notice-list {
	width: 100%;
	min-height: calc(100vh - 44px - var(--status-bar-height));
	background-color: #f8f8e8;
	box-sizing: border-box;
	padding: 10rpx 30rpx;

	.nodice-add {
		width: 100%;
		margin-bottom: 20rpx;
		min-height: 200rpx;
	}

	.notice-cell {
		width: 100%;
		min-height: 200rpx;
		font-size: 28rpx;
		color: #515151;
		box-sizing: border-box;
		padding: 20rpx 10rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		position: relative;
		.notice-time {
			position: absolute;
			bottom: 0;
			right: 10rpx;
		}
	}
	.notice-def {
		width: 100%;
		min-height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(179, 179, 179, 0.5);
		font-size: 28rpx;
		letter-spacing: 2rpx;
	}
}
</style>
