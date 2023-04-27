<template>
	<view>
		<ice-statusbar color="#4A9AFF"></ice-statusbar>
		<ice-navbar>
			<view class="view-header">
				<view class="view-search" @click="uni.navigateTo({
					url:'../forum-search/forum-search'
				})">
					<image src="../../static/images/search.png" class="image-search"></image>
					<text>请输入关键字搜索</text>
				</view>
				<image @click="show = !show" src="../../static/images/add1.png" mode=""></image>
				<!-- @open="open" -->
				<view class="view-share" v-show="show">
					<view class="view-release" :style="'background:url('+bgRelease+')'">
						<view class="view-item" @click="uni.navigateTo({
							url:'../micro-headlines/micro-headlines'
						})">
							<image src="../../static/images/toutiao.png" mode=""></image>
							<text>微头条</text>
						</view>
						<view class="view-item" @click="uni.navigateTo({
							url:'../short-video/short-video'
						})">
							<image src="../../static/images/luzhishipin.png" mode=""></image>
							<text>短视频</text>
						</view>
						<view class="view-item" @click="deal">
							<image src="../../static/images/wenzhang2.png" mode=""></image>
							<text>文章</text>
						</view>
					</view>
				</view>
			</view>
		</ice-navbar>
		<!-- 分类栏 -->
		<view class="view-tabs">
			<u-tabs v-if="tab_list.length>2" class="top-tabs" ref="u_tab1" lineColor="#4A9AFF" @click="click"
				:current="tabIndex" :activeStyle="tabsActive" :inactiveStyle="{padding:'5rpx', color: '#666666'}"
				:list="tab_list" :style="ids==23||ids==1? 'background-color: #4A9AFF;':''">
			</u-tabs>
		</view>

		<!-- <view class="view-list">
			<view class="view-item" v-for="(item,index) in topList" @click="uni.navigateTo({
						url:'../post-details-article/post-details-article?id='+item.id+'&memberGrade='+item.memberGrade
							})">
				<image v-if="index==0" src="../../static/images/first.png" mode=""></image>
				<image v-if="index==1" src="../../static/images/second.png" mode=""></image>
				<image v-if="index==2" src="../../static/images/third.png" mode=""></image>
				<view class="view-title" v-if="item.type==2">{{item.title}}</view>
				<view class="view-title" v-else>{{item.content}}</view>
				<view class="view-heat">
					<text>热</text>
				</view>
			</view>
		</view> -->
		<!-- 帖子内容 -->
		<view class="view-content">
			<!--  v-if="ids == 0" -->
			<!-- <view class="view-dynamic">
				<ice-post :item="item" v-for="item in infoList" @clickPraise="getPraise" @clickDelete="clickDeletePost">
				</ice-post>
			</view> -->

			<!-- <view v-else class="view-dynamic">
				<ice-post :item="item" v-for="item in infoList" @clickPraise="getPraise" @clickDelete="clickDeletePost">
				</ice-post>
			</view> -->
			<!-- 关注 -->
			<view class="view-dynamic" v-if="this.ids == 24">
				<ForumCellSchool :item="item" v-for="item in infoList" :keys="setKeys(item)" :isText="item.texts == 2"
					@clickDelete="clickDeletePost">
				</ForumCellSchool>
			</view>

			<view class="view-dynamic" v-else-if="this.ids == 20">
				<view class="follow-title">
					<text>我的关注</text>
					<view class="title-right" @click="uni.navigateTo({
										url:'/pages/more-follow/more-follow'
									})">
						<text>更多关注</text>
						<u-icon name="arrow-right" color="#515151" size="16" style="margin-left: 5rpx;"></u-icon>
					</view>
				</view>
				<view class="follow-list">
					<view class="follow_cell" v-for="item in attention" :key="item.id" @click="uni.navigateTo({
						url:'../personal-home-page/personal-home-page?id=' + item.userId
					})">
						<image :src='item.headUrl' mode=""></image>
						<text class="follow-name"> {{ item.userName }} </text>
					</view>
				</view>
				<ForumCell :item="item"  v-for="(item,index) in infoList" :keys="setKeys(item)" :isText="item.type != 1"
					@clickDelete="clickDeletePost"  @clickDslike="clickDslike">
				</ForumCell>
			</view>

			<view class="view-dynamic" v-else-if="this.ids == 1">
				<!-- 同城的顶部栏 -->
				<CityList></CityList>
				<ForumCell :item="item" v-for="item in infoList" :keys="setKeys(item)" :isText="item.type != 1"
					@clickDelete="clickDeletePost" @clickDslike="clickDslike">
				</ForumCell>
			</view>

			<view class="view-dynamic" v-else-if="this.ids == 23">
				<!-- 热榜的论坛列表 -->
				<HotList ref="hotList" :list='infoList'></HotList>
			</view>

			<view class="view-dynamic" v-else>
				<ForumCell :item="item" v-for="item in infoList" :keys="setKeys(item)" :isText="item.type != 1"
					@clickDelete="clickDeletePost"  @clickDslike="clickDslike">
				</ForumCell>    
			</view>
		</view>
		<!-- 底部提示：没有更多了 -->
		<u-loadmore :status="loadmoreStatus" height="40" @loadmore="()=>{
					page++
					getInfo()
					return '' }" />
		<view class="view-mask" v-show="show" @tap="show=false">
		</view>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	import CityList from './cityList.vue'
	import HotList from "@/components/hotList/hotList.vue"
	import ForumCell from '@/pages/information/forum-cell.vue'
	import ForumCellSchool from '@/pages/information/forum-cellSchool.vue'
	export default {
		components: {
			ForumCell,
			ForumCellSchool,
			HotList,
			CityList
		},
		data() {
			return {
				show: false,
				bg: require('@/static/images/homepage.png'),
				bgRelease: require('@/static/images/bg_release.png'),
				infoList: [],
				tab_list: [],
				tabIndex: 1,
				ids: '',
				topList: [],
				// 测试1
				getlist: [],
				user: '',
			}
		},

		onLoad() {
			this.user = uni.getStorageSync('userInfo').id || 0
			console.log('#####################', this.user)
			if (this.user == 0) {
				this.test()
			} else {
				this.getInfo()
			}
			this.getNavTag()
			// this.getInfo()
			this.queryTopList()
			this.messageShowTip.showTextMessage(this)
			let dislike = []
			uni.setStorageSync("dislike",dislike)
			
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		onReachBottom() {
			this.page++
			if (this.ids === 24) {
				this.forumData()
			} else
			if (this.user == 0) {
				this.test()
			} else {
				this.getInfo()
			}
			// this.getInfo()
		},
		onShow() {
			this.show = false
			// this.user = uni.getStorageSync('userInfo').id || 0
			// console.log('#####################', this.user)
			// this.test()
			// if (this.user == 0) {
			// 	this.test()
			// } else {
			// 	this.getInfo()
			// }
		},
		async onPullDownRefresh() {
			this.page = 1
			this.infoList = []
			if (this.ids === 24) {
				this.forumData()
				uni.stopPullDownRefresh()
			} else
			if (this.user == 0) {
				this.test()
			} else {
				this.getInfo()
			}
			// await this.getInfo()
			uni.stopPullDownRefresh()
		},
		watch: {
			// dislike(newlist,old) {
			// 	this.page++
			// 	this.getInfo()
			// }
		},
		computed: {

			tabsActive() { //激活的样式
				if (this.ids != 23 && this.ids != 1) return {
					color: '#55aaff',
					fontSize: '32rpx',
					fontWeight: "900"
				}
				return {
					color: '#fff',
					fontSize: '32rpx',
					fontWeight: "900"
				}
			},
			// keys(type): {
			// 	if(type == 0 || type == 1){
			// 		return {
			// 			'title': 'content'
			// 		}
			// 	}
			// }
		},
		methods: {
			// clikd(){
			// 	console.log('111')
			// 	uni.getLocation({
			// 		type: 'wgs84',
			// 		success: function (res) {
			// 			console.log('当前位置的经度：' + res.longitude);
			// 			console.log('当前位置的纬度：' + res.latitude);
			// 		}
			// 	});
			// },
			clickDslike(item) {
			   console.log("666666666",item);
			   console.log( "indexindex",this.infoList.indexOf(item));
			  let index=this.infoList.indexOf(item)
			 this.infoList.splice(index,1)
			},
			//判断本地是否保存草稿
			deal() {
				if (uni.getStorageSync('form') == '') {
					console.log('没有草稿')
					uni.navigateTo({
						url: '../rech-text/rech-text'
					})
				} else {
					console.log('有草稿')
					uni.navigateTo({
						url: '../rech-text/rech-text3'
					})
				}
			},
			setKeys(item) {
				let keys = {}
				// 表示用户端微头条
				if (item.type == '0' && !item.which) return {
					title: 'content',
					videoCover: 'resource'
				}
				// 表示用户端视频
				if (!item.which && item.type == '1') return {
					title: 'content'
				}
				// 表示用户端的文章
				if (!item.which && item.type == '2') return {
					nickName: 'userName',
					city: 'position',
					browse: 'view'
				}

				return keys
			},
			//ceshi 
			async test() {
				this.loadmoreStatus = 'loading'
				let res = await this.http.get('/app/forum/home/forumHomePagess', {
					pageNum: this.page,
					pageSize: this.pageSize,
					userId: 0
				});
				console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@', res)
				if (res.code == 200) {
					res.rows.map(item => {
						// console.log(11111111,item)
						item.resource = this.strToArray(item.resource);
						if (item.type == 2) {
							try {
								// 热点  显示一张图片 【0】
								// console.log(88888888,item.content)
								// let arr = JSON.parse(item.content)[0];
								let arr = JSON.parse(item.content);
								// console.log(arr);
								item.content = arr;
							} catch (e) {
								console.log(e);
							}
						}
					})
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.infoList, res.rows);
					// console.log(this.loadmoreStatus);
					this.loadmoreStatus = status;
					this.infoList = list;
					console.log(this.infoList)
				} else {
					// this.$toast(res.msg);
				}
			},


			async deletePost(id) {
				let res = await this.http.post('/app/forum/topic/deleteTopic', {
					id: id,
				});
				console.log('删除帖子', res);
				if (res.code == 200) {
					this.$toast(res.msg);
					this.getInfo();
				} else {
					// this.$toast(res.msg);
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
			// 点赞
			async getPraise(e) {
				console.log(e);
				let res = await this.http.get('/app/forum/topic/voteTopic', {
					id: e,
				});
				if (res.code == 200) {
					this.getInfo()
					this.$toast(res.msg);
				} else {
					// this.$toast(res.msg);
				}
			},
			// 论坛首页置顶
			async queryTopList() {
				let res = await this.http.get('/app/forum/home/forumHomeTop', {});
				if (res.code == 200) {
					this.topList = res.data;
				} else {
					// this.$toast(res.msg);
				}
			},

			// open() {
			// 	console.log('open');
			// },

			// 点击tabs
			click(item, index) {
				this.page = 1;
				this.show = false
				console.log('当前页', this.page);
				// console.log('item', item);
				this.tabIndex = item.index
				
				if (item.id == 22) {
					this.ids = ''
				} else {
					this.ids = item.id
				}

				console.log('/*-/*-/*-/*-/*-/*/-*/', this.tabIndex, this.ids)
				if (this.ids === 24) {
					this.infoList = []
					this.forumData()
				} else {
					if (this.user == 0) {
						this.test()
					} else {
						this.infoList = []
						this.getInfo()
					}
					// this.getInfo()
				}
			},

			// async forumData() { // 获取教育的论坛列表
			// 	this.loadmoreStatus = 'loading'
			// 	let res = await this.http.get('/app/School/selectMuSchoolArticle', {
			// 		articleId: 2,
			// 		pageNum: this.page,
			// 		pageSize: 10,
			// 		status: 2
			// 	});
			// 	this.loadmoreStatus = status
			// 	console.log(">>>>>>>>>>>>>>>>", res)
			// 	this.infoList = this.infoList.concat(res.rows)
			// },

			async forumData() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/School/selectMuSchoolArticle', {
					articleId: 2,
					pageNum: this.page,
					pageSize: 10,
					status: 2
				});
				// console.log(res)
				if (res.code == 200) {

					res.rows.map(item => {
						item.resource = this.strToArray(item.resource);
						if (item.type == 2) {
							try {

								let arr = JSON.parse(item.content);
								// console.log(arr);
								item.content = arr;
							} catch (e) {
								console.log(e);
							}
						}
					})
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.infoList, res.rows);
					// console.log(this.loadmoreStatus);
					this.loadmoreStatus = status;
					this.infoList = list;
					console.log(this.infoList,'数据')

				} else {

				}
			},




			// 论坛首页标签
			async getNavTag() {
				let res = await this.http.get('/app/forum/home/forumHomeTag', {});
				if (res.code == 200) {
					this.tab_list = this.tab_list.concat(res.data);
					// this.tab_list = res.data
					console.log(this.tab_list)
				} else {
					// this.$toast(res.msg);
				}
			},

			// 判断是否为JSON格式
			isJSON(str) {
				try {
					JSON.parse(str)
					return true
				} catch (err) {
					return false
				}
			},
			// 论坛首页
			async getInfo() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/forum/home/forumHomePage', {
					pageNum: this.page,
					pageSize: this.pageSize,
					tagId: this.ids,
				});
				// console.log(res)
				if (res.code == 200) {
					// let obj = {};
					// for (var i = 0; i < res.rows.length; i++) {
					// 	obj = res.rows[i];
					// 	this.getlist.push(obj)
					// }

					res.rows.map(item => {
						// 自写已认证用户
						// let identityType = 0;
						// item.identityType = identityType;

						// console.log(11111111,item)
						item.resource = this.strToArray(item.resource);
						if (item.type == 2) {
							try {
								// 热点  显示一张图片 【0】
								// console.log(88888888,item.content)
								// let arr = JSON.parse(item.content)[0];
								let arr = JSON.parse(item.content);
								// console.log(arr);
								item.content = arr;
							} catch (e) {
								console.log(e);
							}
						}
					})
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.infoList, res.rows);
					// console.log(this.loadmoreStatus);
					this.loadmoreStatus = status;
					this.infoList = list;
					console.log(this.infoList)
					if (this.ids == 20) {
						const a = new Map();
						this.attention = list.filter((list) => !a.has(list.userId) && a.set(list.userId, 1))
						console.log(this.attention)
					}
					// console.log(this.infoList[0].content)
					// console.log(this.infoList[1].content)
					// console.log(this.infoList[0].content.image)
				} else {
					// this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-header {
		background-color: #4A9AFF;
		display: flex;
		width: 100%;
		height: 88rpx;
		flex-direction: row;
		align-items: center;
		padding: 0 30rpx;
		z-index: 1;

		.view-search {
			flex-grow: 1;
			flex-shrink: 1;
			height: 60rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 20rpx;
			width: 615rpx;
			height: 70rpx;
			background: #F7F9FA;
			border-radius: 35px;

			.image-search {
				width: 27rpx;
				height: 27rpx;
			}

			text {
				font-size: 28rpx;
				font-weight: 500;
				margin-left: 10rpx;
				color: #999999;
			}
		}

		.view-share {
			.view-release {
				padding: 20rpx 0 0;
				z-index: 2;
				position: absolute;
				right: 15rpx;
				width: 285rpx;
				height: 355rpx;
				top: 80rpx;
				background-size: 100% 100% !important;

				.view-item+.view-item {
					border-top: 1rpx solid rgba(255, 255, 255, 0.05);
				}

				.view-item {
					display: flex;
					align-items: center;
					height: 110rpx;

					text {
						margin-left: 25rpx;
						font-size: 32rpx;
						color: #FFFFFF;
						line-height: 6rpx;
					}
				}
			}
		}

		image {
			margin-left: 30rpx;
			height: 50rpx;
			width: 50rpx;
		}
	}

	.view-tabs {
		background-color: #4A9AFF;
		height: 88rpx;

		/deep/.u-tabs {
			width: 100%;
			background-color: #FFFFFF;
			position: fixed;
			z-index: 10;
			// border-bottom: 1rpx solid #EFEFEF;
		}
	}

	.view-list {
		background-color: #FFFFFF;
		padding: 0 26rpx;

		.view-item+.view-item {
			border-top: 1rpx solid #EFEFEF;
		}

		.view-item {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			width: 100%;
			padding: 30rpx 0;

			image {
				width: 69rpx;
				height: 34rpx;
			}

			.view-title {
				color: #333333;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				max-width: 600rpx;
				padding: 0 20rpx;
				font-size: 30rpx;
				letter-spacing: 1rpx;
			}

			.view-heat {
				width: 36rpx;
				height: 36rpx;
				border-radius: 6rpx;
				text-align: center;
				line-height: 36rpx;
				background: linear-gradient(90deg, #F1A13D 0%, #F3B446 100%);
				font-size: 20rpx;
				color: #FFFFFF;
				font-weight: bold;
			}
		}
	}

	.view-content {
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0 0;
		margin-top: -5rpx;
		min-height: 20rpx;
	}

	.view-dynamic {
		background-color: #FFFFFF;

		.follow-title {
			width: 100%;
			display: flex;
			box-sizing: border-box;
			padding: 10rpx 30rpx;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-weight: bold;

			.title-right {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				color: #666666;
				font-weight: normal;
			}
		}

		.follow-list {
			width: 100%;
			min-height: 170rpx;
			box-sizing: border-box;
			padding: 10rpx 30rpx;
			display: flex;
			align-items: center;

			.follow_cell {
				margin-right: 20rpx;
				width: 100rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.follow-name {
					font-size: 26rpx;
					color: #515151;
					width: 100%;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					line-clamp: 1;
					-webkit-box-orient: vertical
				}
			}
		}
	}

	.view-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
</style>
