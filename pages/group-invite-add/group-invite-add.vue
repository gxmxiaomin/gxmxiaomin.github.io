<template>
	<view class="page-view">
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left" @click="uni.navigateBack()">
				<u-icon name="arrow-left" size="24"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>邀请好友</text>
			</view>
			<view class="tab-right" slot="right" @click="confirmBtn">
				<text>确认</text>
			</view>
		</TabBar>
		
		<view class="search-input">
			<u--input placeholder="搜索好友" border="surround" v-model="userName"></u--input>
		</view>
		
		<view class="user-list">
			<view class="user-cell" v-for="item in searchList" :key="item.id" @click="selectItem(item)">
				<view class="select-box" :class="{'is-select': isSelect(item)}">
					<u-icon name="checkbox-mark" color="#fff" size="18"></u-icon>
				</view>
				<image :src="item.headUrl" mode=""></image>
				<view class="user-info">
					<text>{{ item.nickName }}</text>
				</view>
			</view>
		</view>
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	export default {
		components: { TabBar },
		data() {
			return {
				groupId: '',
				countList: [],
				// 选择的用户
				userList: [],
				pageNum: 1,
				userName: ""
			};
		},
		computed:{
			searchList() {
				if(this.userName=="") {
					return this.countList
				}
				return this.countList.filter(ele=>{
					return (ele.nickName.indexOf(this.userName) > -1)
				})
			}
		},
		onLoad(options) {
			this.groupId = options.groupId
			this.getList()
		},
		methods: {
			selectItem(item) {
				try{
					this.userList.forEach((ele, index)=>{
						if(ele.id==item.id) {
							this.userList.splice(index, 1)
							throw new Error('已存在')
						}
					})
					this.userList.push(item)
				}catch(e){
					if(e.message !== '已存在') throw e
				}
			},

			isSelect(item) {
				let a = this.userList.find(ele=>{
					return ele.id==item.id
				})
				if(a) return true
				return false
			},

			async getList() {
				const res = await this.http.get('/app/forum/topic/selectForumFocusLists', {
					pageNum:this.pageNum,
					pageSize: 99999,
					focusId: uni.getStorageSync("userInfo").id
				})
				console.log(res)
				this.countList = res.rows
			},

			async confirmBtn() {
				if(this.userList.length < 1) {
					this.$refs.uToast.show({
						message: "请选择要添加的好友",
						type: "error"
					})
					return
				}
				let userNames = []
				this.userList.forEach(ele=>{
					userNames.push(ele.userName)
				})
				this.addImGroup(...new Set(userNames))
			},
			
			async addImGroup(...list) {
				let data = {
					groupId: this.groupId,
					users: list
				}
				console.log(data)
				try{
					const res = await this.IM.inviteToGroup(data)
					console.log("邀请好友的结果为", res)
					this.addUserToGroup()
				}catch(e){
					//TODO handle the exception
					console.log(">>>>>>>>>0", e)
					this.$refs.uToast.show({
						message: "请不要拉取重复人员",
						type: "error"
					})
				}
			},
			
			async addUserToGroup() { //向数据库中的群组中添加群成员
				let ids = []
				this.userList.forEach(ele=>{
					ids.push(ele.id)
				})
				const res = await this.http.postJson('/app/appGroup/addGroupUser',{
					groupId: this.groupId,
					userId: ids[0]
				})
				this.$refs.uToast.show({
					message: "邀请成功",
					type: "success"
				})
				setTimeout(()=>{
					uni.navigateBack();
				},1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.page-view {
		width: 100%;
		height: 100vh;
		background-color: #eee;
	}
	
.user-list{
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
	min-height: calc(100vh - 44px - var(--status-bar-height) - 140rpx);
	background-color: #fff;
	margin-top: 20rpx;
	.user-cell {
		display: flex;
		align-items: center;
		width: 100%;
		height: 120rpx;
		padding: 10rpx 0;
		border: 1 solid rgba(97, 97, 97, 1);
		.select-box {
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			border-bottom: 1rpx solid rgba(97, 97, 97, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
		}
		.user-info {
			margin-left: 20rpx;
			height: 100%;
			display: flex;
			align-items: center;
		}
		.is-select{
			background-color: #6487e6;
			// width: 20rpx;
			// height: 20rpx;
			// border-radius: 50%;

		}
	}
}

.search-input {
	margin-top: 20rpx;
	width: 100%;
	height: 100rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 0 30rpx;
}
</style>
