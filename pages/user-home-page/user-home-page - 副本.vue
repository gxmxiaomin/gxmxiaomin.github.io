<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="view-nav-bar" :style="'background:url('+backgroundImg+')'" @click="chooseImage">
			<view class="view-nav">
				<view class="view-back">
					<image class="image-fanhui" @click.stop="uni.navigateBack({})"
						src="../../static/images/31fanhui1.png">
					</image>
				</view>
				<image class="img-edit" src="../../static/images/ai61.png" mode="" @click.stop="uni.navigateTo({
					url:'../personal-data/personal-data'
				})"></image>
			</view>
		</view>

		<view class="view-content">
			<view class="view-userImg">
				<image :src="userDataImg.headUrl" mode="" @click="getImgas"></image>
				<view>
					<text class="text-name" @click="uni.navigateTo({
						url:'../my-focus/my-focus'
					})">关注</text>
					<text class="text-number">{{userData.focusCount}}</text>
				</view>
				<view @click="uni.navigateTo({
					url:'../my-fans/my-fans'
				})">
					<text class="text-name">粉丝</text>
					<text class="text-number">{{userData.fansCount}}</text>
				</view>
			</view>
			<view class="view-nickname">
				<text class="text-nickname">{{userDataImg.nickName}}</text>
				<text>{{userDataImg.personalitySignature}}</text>
			</view>
			<view class="view-label">
				<view>
					<image :src="userSex==1?'../../static/images/nan (2).png':'../../static/images/nv.png'" mode="">
					</image>
					<text v-show="userData.user.age">{{userData.user.age}}岁</text>
				</view>
				<view v-show="userData.user.city">
					<text v-if="userData.user.province">{{userData.user.province}}·{{userData.user.city}}</text>
					<text v-else>{{userData.user.city}}·{{userData.user.area}}</text>
				</view>
				<view v-show="userData.user.schoolName">
					<image src="../../static/images/xuexiao-2.png" mode=""></image>
					<text>{{userData.user.schoolName}}</text>
				</view>
			</view>
			<!-- <view class="view-button">
				<view class="view-follow">
					<button @click="focus()" v-if="!isFocus" class="button-follow" type="default">+关注</button>
					<button @click="cancelFocus()" v-else class="button-follow" type="default">已关注</button>
				</view>
				<view class="view-private">
					<button type="default">私信</button>
				</view>
			</view>-->

			<!-- tabs切换 -->
			<view class="view-tabs">
				<u-tabs class="top-tabs" ref="u_tab1" lineColor="#4A9AFF"
					:activeStyle="{padding:'5rpx',color: '#4A9AFF'}" :inactiveStyle="{padding:'5rpx', color: '#666666'}"
					@change="change_tabs" :list="tab_list">
				</u-tabs>
			</view>
		</view>

		<view class="view-dynamic">
			<ice-post :item="item" v-for="(item,index) in list" :key="index" @clickPraise="getPraise"
				@clickDelete="clickDeletePost"></ice-post>
		</view>

		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
		page++
		getList()
		return ''
		}" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
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
				userDataImg: {},
				userData: {
					user: {
						province: ''
					}
				},
				isFocus: false,
				list: [],
				backgroundImg: '',
				userSex: 0,
			}
		},
		onShow() {
			this.queryUserInfo();
			this.queryIsFocus();
			this.page = 1;
			this.getList();
		},
		watch: {
			current() {
				this.page = 1;
				this.getList();
			},
		},
		methods: {
			async getImgas(){
				console.log(this.userDataImg.headUrl)
				uni.navigateTo({
					url: '../check-picture/check-getimgs?id=' + this.userDataImg.headUrl
				})
			},
			async getPraise(e) {
				console.log(e);
				let res = await this.http.get('/app/forum/topic/voteTopic', {
					id: e,
				});
				if (res.code == 200) {
					this.getList()
					this.$toast(res.msg);
				} else {
					this.$toast(res.msg);
				}
			},
			async deletePost(id) {
				let res = await this.http.post('/app/forum/topic/deleteTopic', {
					id: id,
				});
				console.log('删除帖子', res);
				if (res.code == 200) {
					this.$toast(res.msg);
					this.getList();
				} else {
					this.$toast(res.msg);
				}
			},

			clickDeletePost(e) {
				console.log(e);
				let that = this;
				uni.showModal({
					title: '删除',
					content: '确定要删除吗?',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.deletePost(e);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			change_tabs(detail) {
				this.current = detail.index
			},
			async submitInfo(img) {
				console.log(img);
				let res = await this.http.postJson('/app/userInfo/editInfo', {
					backgroundImg: img
				});
				if (res.code == 200) {
					await this.queryUserInfo();
				} else {
					this.$toast(res.msg);
				}
			},
			//修改背景
			async chooseImage() {
				uni.chooseImage({
					// count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					crop: {
						width: '500px',
						height: '300px',
					},
					success: async (result) => {
						let res = await this.http.upload(result.tempFilePaths[0]);
						console.log("头像", res)
						if (res.code == 200) {
							this.bg = res.data;
							await this.submitInfo(res.data);
						} else {
							this.$toast(res.msg);
						}
					},
				})
			},

			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get(this.tab_list[this.current].url, {
					pageNum: this.page,
					pageSize: this.pageSize,
					userId: this.id,
				});
				if (res.code == 200) {
					res.rows.map(item => {
						item.resource = this.strToArray(item.resource);
						if (item.type == 2) {
							item.content = JSON.parse(item.content)[0].content;
						}
					})
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
				} else {
					this.$toast(res.msg);
				}
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
					this.$toast(res.msg);
				}
			},

			async queryUserInfo() {
				let res = await this.http.get('/app/forum/user/forumUserInfo', {
					userId: this.id,
				});
				console.log('查询用户信息:', res);
				if (res.code == 200) {
					this.userData = res.data;
					this.userDataImg = res.data.user;
					this.userSex = res.data.user.userSex;
					this.backgroundImg = res.data.user.backgroundImg;
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}

	.view-nav-bar {
		height: 450rpx;
		background-size: cover !important;
		padding: var(--status-bar-height) 30rpx 30rpx;

		.view-nav {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 10rpx;
			height: 88rpx;

			.view-back {
				display: flex;
				align-items: center;
				width: 88rpx;
				height: 88rpx;

				.image-fanhui {
					width: 20rpx;
					height: 32rpx;
				}
			}

			.img-edit {
				width: 40rpx;
				height: 38rpx;
			}
		}
	}

	.view-tabs {
		margin-top: 30rpx;
		border-bottom: 10rpx solid #F7F7F7;
	}

	.view-content {
		background-color: #FFFFFF;
		margin-top: -30rpx;
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

				.text-name {
					font-size: 28rpx;
					color: #666666;
					line-height: 61rpx;
					margin-top: 10rpx;
				}

				.text-number {
					font-weight: bold;
					font-size: 36rpx;
					color: #333333;
				}
			}
		}

		.view-nickname {
			display: flex;
			flex-direction: column;
			margin-left: 33rpx;

			.text-nickname {
				font-weight: bold;
				font-size: 40rpx;
				color: #111111;
				margin-bottom: 16rpx;
			}

			text {
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

	}

	.view-dynamic {
		background-color: #FFFFFF;

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