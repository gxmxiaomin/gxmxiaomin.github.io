<template>
	<view class="create-group-view">
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left">
				<u-icon name="arrow-left" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>新建群聊</text>
			</view>
			<view class="tab-right" slot="right">
				<!-- <text class="confirm-btn">确认</text> -->
				<view class="confirm-btn" @click="confirmCreate">
					<text>确认</text>
				</view>
			</view>
		</TabBar>
		<view class="group-name">
			<u--input placeholder="群聊名称" border="surround" inputAlign='center' style="background-color: #fff;" v-model="groupname"></u--input>
		</view>
		<view class="line-item">
			<text>群头像</text>
			<image :src="groupImg" mode="" @click="changeImg"></image>
		</view>
		<view class="select-user">
			<!-- 用户的头像列表 -->
			<view class="user-imgs">
				<scroll-view scroll-x="true" class="user-scroll-box">
					<view style="display: flex;align-items: center;">
						<view class="img-box" v-for="item in userList" :key="item.id" @click="selectItem(item)">
							<image :src="item.headUrl" mode=""></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 输入框 -->
			<u--input placeholder="搜索好友" border="surround" v-model="userName"></u--input>
		</view>

		<scroll-view scroll-y="true" class="user-list-box">
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
		</scroll-view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	export default {
		components: { TabBar },
		data() {
			return {
				groupname: "",
				groupImg: "https://img2.baidu.com/it/u=1010328615,2032873142&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=790",
				countList: [],
				// 选择的用户
				userList: [],
				userName: ""
			};
		},
		onLoad() {
			this.getList()
		},
		computed:{
			searchList(){
				if(this.userName=="") {
					return this.countList
				}
				return this.countList.filter(ele=>{
					return (ele.nickName.indexOf(this.userName) > -1)
				})
			}
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

			// async getList() { //从im上获取好友列表
			// 	console.log(">>>>>>>>>>")
			// 	const res = await this.IM.getRoster()
			// 	console.log("获取的好友列表", res)
			// 	const data = await this.http.postJson('/app/userInfo/getUserByUserIds', res.data)
			// 	this.countList = data.data||[]
			// },

			async getList() { //从数据库中获取好友列表/app/Schools/selectMuSchoolFunctionLists
				const res = await this.http.get('/app/forum/topic/selectForumFocusLists',{
					pageNum: 1,
					pageSize: 999999,
					focusId: uni.getStorageSync("userInfo").id
				})
				console.log("获取到的好友列表", res)
				this.countList = res.rows||[]
			},

			async changeImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					crop:{
						width:375,
						height:375,
						quality: 100
					},
					success: async (res) => {
						console.log(JSON.stringify(res.tempFilePaths));
						// const data = await this.http.upload(res.tempFilePaths[0])
						// console.log("上传的结果为", data)
						// this.groupImg = data.data
						res.tempFilePaths.forEach(async ele=>{
							const data = await this.http.upload(ele)
							console.log("上传的结果为", data)
							this.groupImg = data.data
						})
					}
				})
			},

			async confirmCreate() {
				if(this.groupname == "") {
					this.$refs.uToast.show({
						message: "请输入群聊名称",
						type: "error"
					})
					return
				}
				let phones = []
				this.userList.forEach(ele=>{
					phones.push(String(ele.userName))
				})
				console.log("手机号列表", new Set(phones))
				this.imCreateGroup(...new Set(phones))

			},

			async createGroup(id) {
				let ids = []
				this.userList.forEach(ele=>{
					ids.push(ele.id)
				})
				const res = await this.http.postJson('/app/appGroup/addGroup',{
					headUrl: this.groupImg,
					intro: "",
					name: this.groupname,
					account: id,
					userIds: [...new Set(ids)]
				})
				console.log("群聊的创建之数据库内的群聊", res)

				this.$refs.uToast.show({
					message: "群聊"+ this.groupname +"创建成功",
					type: "success"
				})
				setTimeout(()=>{
					uni.navigateBack({})
				},1000)
			},

			async imCreateGroup(...list) {
				let user = uni.getStorageSync('userInfo')
				let username = user.phoneNum
				let data = {
					groupname: this.groupname,
					desc: '暂无描述',
					members: [username,...list],
					public: true,
					approval: false,
					allowinvites: true,
					inviteNeedConfirm: false
				}
				let options = {
					data:data,
					success: res=>{
						console.log("创建群聊成功")
					},
					error: err=> {
						console.log("创建群聊失败")
					}
				}
				const {data: res} = await this.IM.createGroupNew(options)
				console.log("群聊的创建结果", res)
				this.createGroup(res.groupid)
			},
		}
	}
</script>

<style lang="scss" scoped>
.create-group-view {
	width: 100%;
	min-height: 100vh;
	background-color: #eee;
	.group-name{
		margin-top: 20rpx;
		background-color: #fff;
		width: 100%;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.confirm-btn {
		padding: 10rpx 0;
		box-sizing: border-box;
		height: 60rpx;
		width: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(87, 125, 250, 0.8);
		border: 1rpx solid rgba(87, 125, 250, 0.8);
		border-radius: 10rpx;
	}
}


.line-item {
	margin-top: 20rpx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	height: 120rpx;
	align-items: center;
	padding: 0 30rpx;
	background-color: #fff;
	font-size: 28rpx;
	color: #515151;
	image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
}

.select-user {
	margin-top: 20rpx;
	width: 100%;
	height: 100rpx;
	box-sizing: border-box;
	padding: 0 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	.user-scroll-box {
		width: 100%;
		height: 100%;
	}
	.user-imgs {
		max-width: 400rpx;
		.img-box {
			width: 100rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: 1rpx solid #c4ca7f;
			}
		}
	}
}

.user-list-box {
	margin-top: 20rpx;
	width: 100%;
	height: calc(100vh - var(--status-bar-height) - 44px - 370rpx);
}

.user-list{
	width: 100%;
	box-sizing: border-box;
	min-height: calc(100vh - var(--status-bar-height) - 44px - 370rpx);
	padding: 0 30rpx;
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
</style>
