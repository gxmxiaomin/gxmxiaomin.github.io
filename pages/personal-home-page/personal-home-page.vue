<template>
	<view>
		<view class="top" :style="'background:url('+bg+')'">
			<view class="view-icon">
				<image class="image-fanhui" @click="uni.navigateBack({

				})" src="../../static/images/31fanhui1.png"></image>
			</view>
		</view>
		
		<view class="view-info">
			<!-- <image :src="userDataImg.headUrl" mode="" @click="getImgas"></image> -->
			<image :src="userDataInfo.headUrl" mode="" @click="showImg(userDataInfo.headUrl,0)"></image>
		</view>
		
		<view class="view-info-2">
			<view class="text-nickname">{{userDataInfo.nickName}}</view>
			<view class="text-2">ID:{{userDataInfo.userName}}</view>
			<view class="text-1">生日：{{userDataInfo.birthday}} 归属地：{{userDataInfo.city}} <!-- <image src="../../static/images/Informationservice.png" mode=""></image> --> </view>
		</view>
		
		<view class="view-info-3">
			<view class="view-box1" @click="uni.navigateTo({
						url:'../my-focus/my-focus'
					})">
				<text class="text-1">{{userData.focusCount}}</text>
				<text class="text-2">关注</text>
			</view>
			
			<view class="view-box2" @click="uni.navigateTo({
					url:'../my-fans/my-fans'
				})">
				<text class="text-1">{{userData.fansCount}}</text>
				<text class="text-2">粉丝</text>
			</view>
			
			<view class="view-box3">
				<text class="text-1">0</text>
				<text class="text-2">获赞</text>
			</view>
		</view>
		
		<view class="introduce">
			<!-- 每天更新美食视频<br>
			各种甜品、糕点、零食、小吃、面食的各种做法和吃法
			做法简单家常，详细见解，毫无保留，保证你一看就会，
			绝对原创！！ -->
			{{userDataInfo.personalitySignature}}
		</view>
		
		<view class="btn">
			<!-- 关注按钮 -->
			<view class="btn-1" @click="focus()" v-if="!isFocus">+关注</view>
			<view @click="cancelFocus()" v-else class="btn-1">已关注</view>
			
			<view class="btn-2" @click="goLetter()">私信</view>
		</view>

		<view class="view-content">
			<!-- tabs切换 -->
			<view class="view-tabs">
				<u-tabs class="top-tabs" ref="u_tab1" lineColor="#4A9AFF"
					:activeStyle="{padding:'5rpx',color: '#4A9AFF'}" :inactiveStyle="{padding:'5rpx', color: '#666666'}"
					@change="change_tabs" :list="tab_list">
				</u-tabs>
			</view>
		</view>

		<view class="view-dynamic">
			<!-- <ice-post :item="item" v-for="(item,index) in list"></ice-post> -->
			<ForumCell :item="item" v-for="(item,index) in list"></ForumCell>
		</view>

		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
		page++
		getList()
		return ''
		}" />

	</view>
</template>

<script>
	import ForumCell from '@/pages/information/forum-cell.vue'
	export default {
		components: {
			ForumCell
		},
		data() {
			return {
				id: 0,
				current: 0,
				bg: require('@/static/images/homepage.png'),
				tab_list: [{
						name: '帖子',
						url: '/app/forum/user/forumUserTopicList',
					},
					{
						name: '喜欢',
						url: '/app/forum/user/forumUserVoteList',
					},
					{
						name: '收藏',
						url: '/app/forum/user/forumUserCollectsList',
					}
				],

				userData: {},
				userDataInfo: {},
				isFocus: false,
				list: [],
			}
		},
		onLoad(data) {
			this.id = data.id;
			this.getList();
		},
		onShow() {
			this.queryUserInfo();
			this.queryIsFocus();
			this.page = 1;
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		watch: {
			current() {
				this.list = []
				this.page = 1;
				this.getList();
			},
		},
		methods: {
			showImg(e, b) {
				uni.previewImage({
					current: b, //预览图片的下标
					urls: [e] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			},
			change_tabs(detail) {
				this.current = detail.index
			},
			async getList() {
				// this.list = []
				this.loadmoreStatus = 'loading';
				let res = await this.http.get(this.tab_list[this.current].url, {
					pageNum: this.page,
					pageSize: this.pageSize,
					userId: this.id,
				});
				console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', res)
				// if (res.code == 200) {
				// res.rows.map(item => {
				// 	item.resource = this.strToArray(item.resource);
				// 	if (item.type == 2) {
				// 		item.content = JSON.parse(item.content)[0].content;
				// 	}
				// })
				let {
					status,
					list
				} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
				this.loadmoreStatus = status;
				// this.list = list;
				this.list = this.list.concat(res.rows)
				console.log('!!!!!!!!!!!!!!!!!!!!!!!', this.list)
				// } else {
				// 	this.$toast(res.msg);
				// }
			},
			async focus() {
				let res = await this.http.post('/app/forum/topic/focusOnUser', {
					userId: this.id,
				});
				if (res.code == 200) {
					this.queryIsFocus();
				} else {
					this.$toast(res.msg);
				}
			},
			async cancelFocus() {
				let res = await this.http.post('/app/forum/topic/deleteFocus', {
					userId: this.id,
				});
				if (res.code == 200) {
					this.queryIsFocus();
				} else {
					this.$toast(res.msg);
				}
			},
			async queryIsFocus() {
				let res = await this.http.get('/app/forum/user/isFocus', {
					userId: this.id,
				});
				if (res.code == 200) {
					this.isFocus = res.data;
				} else {
					// this.$toast(res.msg);
				}
			},

			// 查询用户信息
			async queryUserInfo() {
				let res = await this.http.get('/app/forum/user/forumUserInfo', {
					userId: this.id,
				});
				console.log('用户信息:', res);
				if (res.code == 200) {
					this.userData = res.data;
					this.userDataInfo = res.data.user;
				} else {
					// this.$toast(res.msg);
				}
				if(this.userDataInfo.backgroundImg){
					this.bg = this.userDataInfo.backgroundImg
				}
			},

			//私信
			async goLetter() {
				let user = this.userData.user
				let data = {
					username: String(user.userName),
					nickname: user.nickName,
					avatarurl: user.headUrl,
				}
				let newData = encodeURIComponent(JSON.stringify(data))
				uni.navigateTo({
					url: '/pages/chat-room/chat-room?data=' + newData
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #dfdfdf;
	}
</style>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}

	.image-fanhui {
		width: 16rpx;
		height: 28rpx;
	}

	.top {
		height: 770rpx;
		background-size: cover !important;
		padding: 30rpx;
		padding-top: var(--status-bar-height);

		.view-icon {
			display: flex;
			align-items: center;
			width: 100%;
			height: 88rpx;
		}
	}
	
	.view-info {
		display: inline-block;
		position: absolute;
		top: 180rpx;
		left: 20rpx;
	
		image {
	
			width: 154rpx;
			height: 154rpx;
			border-radius: 50%;
			// border: 6rpx solid #ffffff;
		}
	}
	
	.view-info-2 {
		
		.text-nickname {
			font-size: 40rpx;
			color: #FFF;
		}
		.text-1 {
			font-size: 28rpx;
			color: #FFF;
			
			image {
				width: 25rpx ;
				height: 25rpx;
			}
		}
		
		.text-2 {
			font-size: 28rpx;
			color: #FFF;
		}
		position: absolute;
		top: 190rpx;
		left: 200rpx;
	}
	
	.view-info-3 {
		
		position: absolute;
		top: 350rpx;
		left: 200rpx;
		
		.view-box1 {
			width: 240rpx;
			display: inline-block;
			position: absolute;
			left: -200rpx;
			text-align: center;
			.text-1 {
				color: #FFF;
				font-size:42rpx;
			}
			.text-2 {
				color: #FFF;
				font-size: 26rpx;
			}
		}
		
		.view-box2 {
			width: 240rpx;
			display: inline-block;
			position: absolute;
			left: 40rpx;
			text-align: center;
			.text-1 {
				color: #FFF;
				font-size: 42rpx;
			}
			.text-2 {
				color: #FFF;
				font-size: 26rpx;
			}
		}
		
		.view-box3 {
			width: 240rpx;
			display: inline-block;
			position: absolute;
			left: 290rpx;
			text-align: center;
			.text-1 {
				color: #FFF;
				font-size: 42rpx;
			}
			.text-2 {
				color: #FFF;
				font-size: 26rpx;
			}
		}
	}
	
	.introduce {
		position: absolute;
		top: 420rpx;
		left: 20rpx;
		color: #FFF;
		font-size: 28rpx;
		margin: 0 10rpx;
	}
	
	.btn {
		position: absolute;
		top: 600rpx;
		
		.btn-1 {
			width: 300rpx;
			display: inline-block;
			background: #3d88f9;
			padding: 10rpx 60rpx;
			margin-left: 50rpx;
			border-radius: 40rpx;
			color: #FFF;
			text-align: center;
		}
		
		.btn-2 {
			width: 300rpx;
			display: inline-block;
			background: #FFF;
			padding: 10rpx 90rpx;
			margin-left: 40rpx;
			border-radius: 40rpx;
			text-align: center;
		}
	}


	.view-content {
		margin: 0 20rpx;
		background-color: #FFFFFF;
		margin-top: -110rpx;
		border-radius: 20rpx 20rpx 0 0;

		.view-userImg {
			display: flex;
			justify-content: space-between;
			margin: 0 107rpx 24rpx 32rpx;
			align-items: center;

			image {
				margin-top: -50rpx;
				width: 164rpx;
				height: 164rpx;
				border-radius: 50%;
				border: 6rpx solid #ffffff;
			}

			view {
				display: flex;
				align-items: center;
				flex-direction: column;
				margin-top: 10rpx;

				.text-name {
					font-size: 28rpx;
					color: #666666;
				}

				.text-number {
					font-size: 36rpx;
					color: #333333;
					font-weight: bold;
				}
			}
		}

		.view-nickname {
			display: flex;
			flex-direction: column;
			margin-left: 33rpx;

			.text-nickname {
				font-size: 40rpx;
				color: #111111;
				font-weight: bold;
			}

			.text-tips {
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #666666;
			}
		}

		.view-label {
			display: flex;

			view {
				padding: 10rpx 13rpx;
				background: #F1F1F1;
				border-radius: 7rpx;
				margin-top: 30rpx;
				margin-left: 30rpx;
				color: #333333;
				font-size: 24rpx;

				image {
					margin-right: 10rpx;
					width: 20rpx;
					height: 20rpx;
				}
			}
		}

		.view-button {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 40rpx 0;

			uni-button:after {
				border: none;
			}

			view {
				button {
					width: 330rpx;
					height: 80rpx;
					background: #F1F1F1;
					border-radius: 7rpx;

					font-size: 32rpx;
					color: #333333;
					line-height: 61rpx;

					display: flex;
					align-items: center;
					justify-content: space-around;
				}

				.button-follow {
					background: #4A9AFF;
					border-radius: 7rpx;

					font-size: 32rpx;
					color: #FFFFFF;
					line-height: 61rpx;
				}
			}
		}

		.view-tabs {
			margin-top: 30rpx;
			border-bottom: 10rpx solid #F7F7F7;
		}

	}

	.view-dynamic {
		// margin-top: 10rpx;
		// background-color: #FFFFFF;
		
		background: #FFF;
		margin: 0 20rpx;
		

		.view-item {
			margin-top: 20rpx;
			border-bottom: 1rpx solid #EFEFEF;
			padding: 30rpx;

			.view-broadcast {
				height: 388rpx;
				background-size: cover !important;
				display: flex;
				align-items: center;
				justify-content: space-around;
				border-radius: 20rpx;
				margin-top: 30rpx;

				image {
					width: 44rpx;
					height: 56rpx;
				}
			}
		}

		.view-time {
			display: flex;
			align-items: center;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 40rpx;
			}

			view {
				margin-left: 20rpx;
				display: flex;
				flex-direction: column;

				.text-name {
					font-size: 28rpx;
					color: #666666;
					line-height: 41rpx;
				}

				.text-time {
					font-size: 24rpx;
					color: #999999;
					line-height: 41rpx;
				}
			}
		}

		.view-substance {
			margin-top: 30rpx;
			display: flex;
			flex-direction: column;

			text {
				text-align: left;
				font-size: 32rpx;
				color: #333333;
				line-height: 48rpx;
			}

			.view-img {
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			image {
				width: 218rpx;
				height: 218rpx;
				border-radius: 10rpx;
			}
		}

		.view-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;

			.view-left {
				background: #EDEDED;
				border-radius: 18rpx;
				padding: 8rpx 28rpx;
				display: flex;
				align-items: center;

				text {
					font-size: 20rpx;
					color: #666666;
				}
			}

			.view-right {
				width: 40%;
				display: flex;
				align-items: center;
				justify-content: space-around;

				image {
					margin-right: 10rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>
