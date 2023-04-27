<template>
	<view class="page-view">
		<view class="top-search">
			<u-search placeholder="请输入手机号" :focus='true' actionText='取消' clearabled v-model="username"
			  @change="keywordChange" @custom="uni.navigateBack()"></u-search>
		</view>
		<view class="user-list">
			<view class="user-cell" v-for="item in userList.filter(ele=>{return ele.phoneNum != user})" :key="item.id" @click="uni.navigateTo({
				url: '/pages/personal-home-page/personal-home-page?id=' + item.id
			})">
				<view class="line-left">
					<image :src="item.headUrl" mode=""></image>
					<text> {{ item.nickName}} </text>
				</view>
				<view class="line-right" @click.stop="goChart(item)">
					<text>{{ '私信' }}</text>
				</view>
			</view>

			<view class="defalt-show" v-show="userList.length<1">
				<text>{{ username==''? '请输入手机号进行查询':'没有找到该用户' }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				userList: [],
				user: ''
			};
		},
		onShow() {
			this.user = uni.getStorageSync('imUserName')
		},
		methods:{
			keywordChange(value) {
				// console.log(value)
				if(this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(()=>{
					this.search()
				}, 500)
			},

			async search() {
				console.log("搜索的内容", this.username)
				const res = await this.http.postJson('/app/userInfo/getUserByUserIds',[this.username])
				console.log("查询到的用户信息", res)
				this.userList = res.data
			},

			goChart(item) {
				console.log("聊天的对象式", item)
				let data = {
					nickname: item.nickName,
					avatarurl: item.headUrl||'https://img0.baidu.com/it/u=1880899726,3824907986&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
					username: item.phoneNum
				}
				uni.navigateTo({
					url: "/pages/private-letter/private-letter?data=" + encodeURIComponent(JSON.stringify(data))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-view {
	width: 100%;
	min-height: 100vh;
	box-sizing: border-box;
	padding-top: var(--status-bar-height);
}

.top-search {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx 30rpx;
}

.user-cell {
	box-sizing: border-box;
	padding: 0 30rpx;
	width: 100%;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.line-left {
		display: flex;
		align-items: center;
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}
		text {
			margin-left: 20rpx;
			font-size: 28rpx;
			color: #515151;
			font-family: PingFang-SC-Medium;
		}
	}

	.line-right {
		width: 120rpx;
		height: 50rpx;
		font-size: 28rpx;
		border-radius: 10rpx;
		color: #fff;
		background-color: #55aaff;
		display: flex;
		align-items: center;
		justify-content: center;
	}


}

.defalt-show {
	width: 100%;
	min-height: 500rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28rpx;
	color: #dcdcdc;
}
</style>
