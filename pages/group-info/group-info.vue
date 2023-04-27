<template>
	<view class="setting-view">
		<view class="group-title">
			<image :src="info.headUrl" mode=""></image>
			<view class="group-name-box">
				<text>{{ info.name }}</text>
			</view>
		</view>

		<view class="line"></view>

		<view class="card">
			<view class="card-line">
				<text class="line-left">群成员</text>
				<view class="line-right" @click="uni.navigateTo({
					url: '/pages/invite-group/invite-group?groupId=' + groupId
				})">
					<text>{{ userList.length }}人</text>
					<u-icon name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
			</view>
			<view class="user-list">
				<view class="user-cell" v-for="item in userList.slice(0,4)" :key="item.id">
					<image :src="item.headUrl" mode=""></image>
					<text>{{ item.nickName }}</text>
				</view>
				<view class="user-cell" @click="uni.navigateTo({
					url: '/pages/group-invite-add/group-invite-add?groupId=' + groupId
				})">
					<image :src="require('@/static/imgs/outher/add-box.png')"></image>
					<text>邀请</text>
				</view>
			</view>
		</view>
		<view class="line"></view>

		<view class="card">
			<view class="card-line">
				<text class="line-left">群聊名称</text>
				<view class="line-right" @click="uni.navigateTo({
					url: '/pages/changeName/changeName?groupId=' + groupId + '&groupName=' + info.name
				})">
					<text>{{ info.name }}</text>
					<u-icon name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
			</view>
			<view class="card-line">
				<text class="line-left">群公告</text>
				<view class="line-right" @click="uni.navigateTo({
					url:'/pages/groupNotice-list/groupNotice-list?groupId=' + groupId + '&isOwner=' +(operaType!=2)
				})">
					<text>进群必看</text>
					<u-icon name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
			</view>
			<view class="card-line">
				<text class="line-left">我的本群昵称</text>
				<view class="line-right" @click="uni.navigateTo({
					url:'/pages/changeNickName-group/changeNickName-group?groupId=' + groupId + '&myNickName=我的昵称'
				})">
					<text>我的昵称</text>
					<u-icon name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
			</view>
			<view class="card-line">
				<text class="line-left">群聊备注</text>
				<view class="line-right">
					<text> {{config.remark}} </text>
					<u-icon name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
			</view>
			<view class="card-line">
				<text class="line-left">查找聊天记录</text>
				<view class="line-right">
					<text> 聊天记录 </text>
					<u-icon name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
			</view>
		</view>
		<view class="line"></view>

		<view class="card">
			<view class="card-line">
				<text class="line-left">消息免打扰</text>
				<view class="line-right">
					<u-switch v-model="miandarao" @change="change"></u-switch>
				</view>
			</view>
		</view>
		<view class="line"></view>

		<view class="card-title"  @click="clearShow=true">
			<text>清空聊天记录</text>
		</view>
		<view class="line"></view>
		<view class="card-title"  @click="operaShow=true;">
			<text v-if="operaType==0">解散群聊</text>
			<text v-else>删除并退出群聊</text>
		</view>

		<!-- 弹框部分 -->
		<u-modal :show="clearShow" :showCancelButton="true" :asyncClose="true" content="确定清空聊天记录吗？"
		 @confirm="deleteSession" @cancel='clearShow = false'></u-modal>

		<u-modal :show="operaShow" :showCancelButton="true" :asyncClose="true" :content="operaType=='0'? '确定解散本群吗？':'确定离开本群吗？'"
		  @confirm="operation()" @cancel='operaShow = false'></u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 群的id
				groupId: '',
				// 群聊的信息
				info: {},
				// 群成员的分布
				userList: [],
				// 是否设置了免打扰
				miandarao: false,
				// 我的信息
				userInfo: {},
				// 表示身份
				operaType: 2,
				// 清空聊天记录的提醒
				clearShow: false,
				// 打开的提醒
				operaShow: false,
				// 我对群聊的设置信息
				config:{}
			};
		},
		onLoad(options) {
			this.groupId = options.groupId
			// this.groupId = 15
			this.userInfo = uni.getStorageSync('userInfo')
		},
		onShow() {
			this.getGroupInfo()
			this.getGroupUsers()
			this.getGroupUserConfig()
		},
		methods: {
			async change(key) {
				console.log(key)
				if(key) {
					this.config.inform = 1
				} else {
					this.config.inform = 0
				}
				const res = await this.http.postJson('/app/appGroup/updateUserGroup', this.config)
				if(res.code == 200) {
					this.$refs.uToast.show({
						message: "修改成功",
						type: 'success',
					})
					this.getNoTipGroupList()
					return
				}
				this.$refs.uToast.show({
					message: "修改失败",
					type: 'error',
				})
				this.miandarao = false
			},

			// 获取被我设置为免打扰的群聊列表
			async getNoTipGroupList(){
				if(uni.getStorageSync("token")) {
					const res = await this.http.get("/app/appGroup/getUserGroupWithNoInform", {})
					console.log("获取到的我设置为免打扰的群聊",res)
					uni.setStorageSync("noTipGroupList", res.data||[])
				}
			},

			async getGroupInfo() { //获取群聊的信息
				const res = await this.http.get('/app/appGroup/getGroupInfo', {
					groupId: this.groupId
				})
				console.log("获取到的群聊信息", res)
				this.info = res.data
				console.log(">>>>>>>>>>>>>>>>", this.info)
			},

			async getGroupUsers(){ //获取群聊中的用户列表
				const res = await this.http.get('/app/appGroup/getGroupUserInfo', {
					groupId: this.groupId
				})
				console.log("获取到的群成员有", res)
				this.userList = res.data
				let me = this.userList.find(ele=>{return (ele.userName==this.userInfo.userName)})
				if(me) {
					console.log("我找到我", me)
					this.operaType = me.identity
				}
			},

			async deleteSession() { //清空聊天记录
				const res = await this.IM.deleteSession(this.groupId, 'groupChat', true)
				this.$refs.uToast.show({
					message: "清理成功",
					type: 'success',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
				this.clearShow = false;
			},

			async getGroupUserConfig() { //获取我对群聊的设置
				const res = await this.http.get('/app/appGroup/getGroupUserConfig', {
					groupId: this.groupId
				})
				console.log("我对群聊的设置是", res)
				this.config = res.data
				this.miandarao = res.data.inform!=0
			},

			async operation(type) {

				if(this.operaType == 0) {
					const res = await this.http.postJson("/app/appGroup/dissolveGroup", {
						groupId: this.groupId
					})
					console.log("解散群聊的结果为", res)
					if(res.code != 200) {
						this.operaShow = false
						this.$refs.uToast.show({
							message: "解散群聊失败，请联系开发人员",
							type: 'error',
						})
						return
					}
					this.groupEnd()
				} else {
					const res = await this.http.postJson('/app/appGroup/dropOutGroup',{
						groupId: this.groupId,
						userId: this.userInfo.id
					})
					console.log("离开群聊的结果为", res)
					if(res.code != 200) {
						this.operaShow = false
						this.$refs.uToast.show({
							message: "离开群聊失败，请联系管理员",
							type: 'error',
						})

						return
					}
					this.groupLavel()
				}
			},

			async groupEnd() { //从数据库中解散群聊

				const res = await this.IM.dissolveGroup(this.groupId)

				this.$refs.uToast.show({
					message: "已成功解散群聊",
					type: 'success',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
				setTimeout(()=>{
					this.operaShow = false
					uni.navigateBack({
						delta:2
					})
				},500)
				this.clearShow = false;
			},

			async groupLavel() { //从数据库中离开群聊
				const res = await this.IM.quitGroup(this.groupId)

				this.$refs.uToast.show({
					message: "已成功退出群聊",
					type: 'success',
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
				setTimeout(()=>{
					this.operaShow = false
					uni.navigateBack({
						delta:2
					})
				},500)
			}


		}
	}
</script>

<style lang="scss" scoped>
.setting-view {
	width: 100%;
	min-height: calc(100vh - 44px - var(--status-bar-height));
	background-color: #eee;
	.line {
		width: 100%;
		height: 20rpx;
	}
}
.group-title {
	width: 100%;
	height: 120rpx;
	box-sizing: border-box;
	padding: 10rpx 30rpx;
	display: flex;
	align-items: center;
	background-color: #fff;
	image{
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	.group-name-box {
		height: 100rpx;
		font-weight: bold;
	}
}

.card {
	width: 100%;
	min-height: 120rpx;
	box-sizing: border-box;
	padding: 10rpx 30rpx;
	background-color: #fff;
	.card-line {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.line-left {
			color: #333333;
			font-family: PingFang-SC-Medium;
			font-size: 29rpx;
		}
		.line-right{
			color: #666666;
			font-family: PingFang-SC-Medium;
			font-size: 24rpx;
			display: flex;
			align-items: center;
			text{
				margin-right: 10rpx;
			}
		}
	}

}

.card-title {
	width: 100%;
	height: 100rpx;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 36rpx;
	font-weight: 900;
	color: #F45133;
}

.user-list {
	width: 100%;
	height: 150rpx;
	box-sizing: border-box;
	padding: 10rpx 10rpx 10rpx 0;
	display: flex;
	.user-cell {
		width: 120rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #333333;
		margin-left: 10rpx;
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
		}
		text {
			width: 100%;
			text-align: center;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			line-clamp: 1;
			-webkit-box-orient: vertical;
		}
	}
}
</style>
