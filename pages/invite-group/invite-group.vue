<template>
	<view>
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left" @click="uni.navigateBack()">
				<u-icon name="arrow-left" size="24"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>{{ groupInfo.name||"群名称" }}</text>
			</view>
			<view class="tab-right" slot="right" @click="uni.navigateTo({
				url: '/pages/group-invite-add/group-invite-add?groupId=' + groupId
			})">
				<text>邀请好友</text>
			</view>
		</TabBar>
		<view class="view-content">
			<view class="list">
				<text class="list-title">群主</text>
				<view class="list-cell" v-for="item in userList.filter(ele=>{return (ele.identity == 0)})" :key="item.id">
					<image :src="item.headUrl" mode=""></image>
					<text class="list-name">{{ item.nickName }}</text>
				</view>
			</view>
			<view class="list" v-if="userList.filter(ele=>{return (ele.identity == 1)}).length > 0">
				<text class="list-title">群管理</text>
				<view class="list-cell" v-for="item in userList.filter(ele=>{return (ele.identity == 1)})" :key="item.id">
					<image :src="item.headUrl" mode=""></image>
					<text class="list-name">{{ item.nickName }}</text>
				</view>
			</view>
			<view class="list">
				<text class="list-title">群成员</text>
				<view class="list-cell" v-for="item in userList.filter(ele=>{return (ele.identity == 2)})" :key="item.id">
					<image :src="item.headUrl" mode=""></image>
					<text class="list-name">{{ item.nickName }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	export default {
		components: { TabBar },
		data() {
			return {
				groupId: null,
				groupInfo: {},
				// 用户列表
				userList: []
			};
		},
		onLoad(options) {
			this.groupId = options.groupId
		},
		onShow() {
			// this.getGroupInfo()
			this.getGrountUsers()
		},
		methods: {
			async getGroupInfo() { //获取群聊信息
				const res = await this.IM.getGroupInfo(this.groupId)
				console.log("获取到的群聊信息", res)
				this.groupInfo = res.data[0]
				this.getUserList(this.groupInfo.affiliations)
			},

			async getGrountUsers() {
				const res = await this.http.get('/app/appGroup/getGroupUserInfo', {
					groupId: this.groupId
				})
				console.log("获取到的群成员有", res)
				this.userList = res.data
			},

			async getUserList(list) { //获取群聊成员信息
				if( !Array.isArray(list)) {
					this.userList = []
					return
				}
				console.log(list)
				let arr = []
				let userObj = {}
				list.forEach(ele=>{
					let key = Object.keys(ele)[0]
					arr.push(ele[key])
					userObj[ele[key]] = key
				})
				const res = await this.http.postJson('/app/userInfo/getUserByUserIds',arr)
				let userArr = res.data.map(ele=>{
					ele.idType = userObj[ele.phoneNum||ele.userName]
					return ele
				})
				console.log("用户的详细信息", userArr)
				this.userList = userArr
			}
		}
	}
</script>

<style lang="scss" scoped>
.view-content {
	width: 100%;
	.list {
		width: 100%;
		padding: 0 30rpx;
		.list-title {
			font-size: 36rpx;
			font-family: PingFang-SC-Bold;
			color: #000;
			height: 80rpx;
			line-height: 80rpx;
		}
		.list-cell {
			width: 100%;
			height: 120rpx;
			box-sizing: border-box;
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid rgba(0,0,0,0.1);
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
			}
			.list-name {
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #515151;
			}
		}
	}
}
</style>
