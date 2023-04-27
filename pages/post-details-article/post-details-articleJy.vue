<template>
	<view style="position: relative;">
		<view class="view-information">
			
			<view class="view-user">
				<view class="view-userNickname">
					<image :src="details.headUrl||'https://img2.baidu.com/it/u=69251733,2635461543&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'" mode=""></image>
					<view>
						<text class="text-name">{{details.nickName}} <text v-if="false"
								style="padding:0 5rpx;background: #e6e6e6;font-size: 20rpx;border-radius: 10rpx;color: #acacac;">原创</text>
						</text>
						<text>{{details.createTime}} <text>·来自{{details.city}}</text> </text>
					</view>
				</view>
				<view class="view-follow" @click="DownloadMethods(isShare,followUser())" v-if="details.userId != userId" :style="details.guan==null? '':'background-color: #eee;'">
					{{ details.guan==null? '+关注':'已关注'}}
				</view>
			</view>
<view class="title-p"><text>{{details.title}}</text></view>
			<view class="view-substance">

				<!-- <view class="author">
					每经编辑：
					<text>毕陆名</text>
				</view> -->
				<!-- <text class="text-title">教育部答复！一批学校有望“升级”</text> -->
				<!-- <text v-html="details.content"></text> -->
				<u-parse :content="details.content" :selectable="true"></u-parse>
				<br>
				<!-- <view class="view-img">
					<image src="../../static/logo.png" mode=""></image>
				</view> -->
				<view class="view-label">
					<!-- <text>#教育</text> -->
				</view>
			</view>
		</view>
		<view class="view-content">
			<view class="view-content-a">
			</view>
			<view class="view-content-b">
				<view class="view-summary">
					<text>评论 {{details.comment}}</text>
				</view>

				<view class="view-comment" v-for="(item,index) in plList" :key="item.id">
					<view class="view-top">
						<image :src="item.headUrl" mode=""></image>
						<text style="font-size: 32rpx;font-weight: 600; color: #222;"> {{ item.userName }}</text>
						<view class="dianzai">
							<!-- <image src="../../static/images/praise.png" mode="" @click="plGood(item)"></image> -->
							<u-icon name="thumb-up" size="20" @click="DownloadMethods(isShare,plGood(item))" v-show="item.isPraise==0"></u-icon>
							<u-icon name="thumb-up-fill" size="20" @click="DownloadMethods(isShare,plGood(item))" color='#ddb821' v-show="item.isPraise!=0"></u-icon>
							<text> {{ item.praise }} </text>
						</view>
					</view>
					<!-- 评论 -->
					<view class="view-bottom" @click="DownloadMethods(isShare,replayEdit(item, item))">
						<text class="message-text"> {{ item.info }} </text>
					</view>
					<view class="message">
						<text @click="DownloadMethods(isShare,openItem(item))">{{ item.muSchoolDiscusses&&item.muSchoolDiscusses.length }}回复></text>
						<text> {{ item.createTime.split(' ')[1] }}</text>
					</view>
					<!-- 回复的评论 -->
					<view class="replay-list" v-show="item.open != 'false'">
						<view class="replay-line" v-for="replay in (item.muSchoolDiscusses||[])" :key="replay.id">
							<view class="replay-info">
								<image :src="replay.headUrl" mode=""></image>
								<text style="margin-left: 10rpx;">{{ replay.userName }}</text>
								<text v-if="item.id != replay.replyId"> > {{ replay.coverName }}</text>
							</view>
							<view class="replay-message"  @click="DownloadMethods(isShare,replayEdit(replay, item))">
								<text class="message-text">{{ replay.info }}</text>
							</view>
						</view>
					</view>
				</view>


				<view class="view-tail">
					已经没有更多内容了～
				</view>
			</view>

			<u-popup :show="show" @close="show = false" @open="console.log('open')" :round="10" mode="bottom">
				<view class="view-content-d">
					<view class="view-top">
						— 分享至 —
					</view>
					<view class="view-bottom">
						<view class="view-one" @click="share('weixin','WXSceneSession')">
							<image src="@/static/images/informationdetails1.png" mode=""></image>
							<view class="view-name">
								微信
							</view>
						</view>
						<view class="view-one" @click="share('weixin', 'WXSceneTimeline')">
							<image src="@/static/images/informationdetails4.png" mode=""></image>
							<view class="view-name">
								朋友圈
							</view>
						</view>
						<view class="view-one" @click="shareQQ()">
							<image src="@/static/images/informationdetails3.png" mode=""></image>
							<view class="view-name">
								QQ
							</view>
						</view>
						<view class="view-one" @click="share('sinaweibo')">
							<image src="@/static/images/informationdetails2.png" mode=""></image>
							<view class="view-name">
								微博
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>

		<!-- 默认底部操作栏 -->
		<view class="footer-edit-fill"></view>
		<view class="footer-edit">
			<view class="edit-left" @click="DownloadMethods(isShare,editShow=true)">
				 <u--input :placeholder="placeholder ==''? '评论...':placeholder" border="surround" disabled shape='circle' style="background-color: #f5f5f5;"></u--input>
			</view>
			<view class="edit-right">
				<view class="right-cell" v-if="plText==''"  @click="dianzan(details.id)">
						<image src="../../static/images/dianzan.png" v-if="details.dian == 0" ></image>
						<image src="../../static/images/dianzai_1.png" v-if="details.dian == 1" ></image>
				</view>
				<view class="right-cell" v-if="plText==''" @click="shoucang(details.id)">
					<image src="../../static/images/shoucang.png" v-if="details.shou ==0" ></image>
					<image src="../../static/images/shoucang_1.png" v-if="details.shou == 1" ></image>
				</view>
				<view class="right-cell" v-if="plText==''" @click="DownloadMethods(isShare, show=true)">
					<u-icon name="share" size="20"></u-icon>
				</view>
				<text class="send-btn" v-if="plText!=''">发送</text>
			</view>
		</view>


		<!-- 进行评论时候的底部栏 -->
		<u-popup :show="editShow" @close="close">
			<view class="edit-box">
				<u--textarea v-model="plText" count focus height='100px' :placeholder="placeholder ==''? '我来讲两句':placeholder"
				style="background-color: #f5f5f5;"></u--textarea>

				 <view class="edit-btn">
				 	<view></view>
					<view class="edit-confirm" @click="DownloadMethods(isShare ,sendpl())">
						<text>发表</text>
					</view>
				 </view>
			</view>
		</u-popup>


		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				scrollTop: 200,
				show: false,
				details: {},
				id: '',
				plText: "",
				plList: [],
				placeholder: '',
				// 被回复的对象
				replayForm: {},
				// 当前的父对象
				parentForm: {},
				userId: '',
				// 帖子的发布人
				targetId: '',

				// 编辑框的显示
				editShow: false,
				isShare: false
			}
		},
		onLoad(option) {
			this.isShare = option.isShare||false
			console.log(option)
			let user = uni.getStorageSync('userInfo')
			console.log("获取到的用户", user)
			this.userId = user.id
			if(option.targetId == 'undefined' || !option.targetId) {
				this.targetId = this.userId
			} else {
				this.targetId = option.targetId
			}
			this.id = option.id
			this.forumDetails()
			this.getplList()

		},
		onShow() {

		},
		methods: {
			async shoucang(id) {
				const res = await this.http.post('/app/School/insertForumCollection',{
					id:id
				})
				if(res.code == 200) {
					this.details.shou == 0?this.details.shou=1:this.details.shou = 0
				}
			},
			async dianzan(id) {
				const res = await this.http.get('/app/School/like',{
					id:id
				})
				if(res.code == 200) {
					this.details.dian == 0?this.details.dian=1:this.details.dian = 0
				}
			},
			async forumDetails() {
				let submit = {
					id: this.id,
					targetId: this.targetId
				}
				if(this.isShare) submit.shareStatus = true
				let res = await this.http.post('/app/School/selectByIds', submit)
				this.details = res.data
				console.log("》》》》》》》", this.details)
			},

			openItem(item){
				if(item.open == 'false') {
					item.open = 'true'
				} else {
					item.open = 'false'
				}
			},

			close(){
				this.editShow=false
				this.placeholder = ''
			},

			async followUser() {
				const res = await this.http.post('/app/School/insertSchoolForumFollow', {
					targetId: this.details.userId
				})
				console.log("关注的结果为", res)
				if(res.code == 200) {
					this.$refs.uToast.show({
						message: res.msg,
						type: 'success'
					})
				} else {
					this.$refs.uToast.show({
						message: '关注失败',
						type: 'error'
					})
					return
				}
				if(!this.details.guan) {
					this.details.guan = true
				} else {
					this.details.guan = null
				}
			},

			// 图文只能分享到微信和微博
			share( provider='sinaweibo' ,scene='') {
				console.log("分享的结果为", provider, scene)
				let img = this.videoCover||''
				if(img == '') img = 'https://img0.baidu.com/it/u=2725915437,1236608227&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
				else img = img.split(',')[0]
				uni.share({
					provider: provider,
					scene: scene,
					type: 0,
					title: this.details.title,
					imageUrl: img,
					href: this.shareUrlList.schoolForumUrl({
						id: this.id,
						targetId: this.targetId
					}),
					success: (res) => {
						console.log("success:" + JSON.stringify(res));
						this.shareConfirm()
					},
					fail: (err)=> {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

			// qq分享文字
			shareQQ(){
				let img = this.videoCover||''
				if(img == '') img = 'https://img0.baidu.com/it/u=2725915437,1236608227&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
				else img = img.split(',')[0]
				uni.share({
					provider: 'qq',
					type: 1,
					title: this.details.title,
					summary: this.details.title,
					imageUrl: img,
					href: this.shareUrlList.schoolForumUrl({
						id: this.id,
						targetId: this.targetId
					}),
					success: (res)=> {
						console.log("success:" + JSON.stringify(res));
						this.shareCallback()
					},
					fail: (err)=> {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

			async shareCallback(){
				const res = await this.http.post('/app/School/insertForum', {id:this.details.id})
				console.log("分享次数增加的结果为", res)
			},

			async good() {
				const res = await this.http.get('/app/School/vote',{ id:this.id })
				console.log('点赞的结果为', res)
				if(res.code == 200) {
					this.$refs.uToast.show({
						message: res.msg,
						type: 'success'
					})
				} else {
					this.$refs.uToast.show({
						message: res.msg,
						type: 'error'
					})
					return
				}
				if(!this.details.dian) {
					this.details.fabulous += 1
					this.details.dian = 1
				} else {
					this.details.fabulous -= 1
					this.details.dian = null
				}
			},

			async collect() {
				const res = await this.http.post('/app/School/insertForumCollection', { id:this.id })
				console.log("收藏的结果", res)
				if(res.code == 200) {
					this.$refs.uToast.show({
						message: res.msg,
						type: 'success'
					})
				} else {
					this.$refs.uToast.show({
						message: '收藏失败',
						type: 'error'
					})
					return
				}

				if(!this.details.shou) {
					this.details.shou = true
				} else {
					this.details.shou = null
				}
			},

			async plGood(item){
				console.log("点赞的对象", item)
				const res = await this.http.get('/app/Schools/insertMuSchoolFunctionDiscuss', { discussId:item.id })
				console.log("对评论的点赞结果为", res)
				if(res.code != 200) {
					this.$refs.uToast.show({
						message: '点赞失败',
						type: 'error'
					})
					return
				}
				this.$refs.uToast.show({
					message: res.msg,
					type: 'success'
				})
				// item.praise += 1
				if(item.isPraise == 0) {
					item.isPraise = 1
					item.praise += 1
				} else {
					item.isPraise = 0
					item.praise -= 1
				}
			},

			replayEdit(replay, item) {
				console.log("要回复的对象", replay)
				this.placeholder = '@' + replay.userName
				this.replayForm = replay
				this.parentForm = item
			},

			async getplList() {
				const res = await this.http.post('/app/School/getMuSchoolArticleList', {
					articleId: this.id
				})
				console.log("查询到的评论", res)
				this.plList = res.data
			},

			async sendpl() {
				console.log("发送的评论是", this.plText)
				let data = {
					info: this.plText,
					articleId: this.id,
					fatherId: this.parentForm.id||0,
					replyId: this.replayForm.id||0,
				}
				if(this.replayForm.userName) {
					data.coverName = this.replayForm.userName
				}
				const res = await this.http.postJson('/app/School/addDiscussService', data)
				console.log("发送的评论的结果为", res)
				this.getplList()

				this.plText = ''
				this.placeholder = ''
				this.editShow = false
				this.replayForm = {}
				this.parentForm = {}
				this.$toast('发送成功')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-information {
		.title-p {
			font-size: 50rpx;
			margin: 30rpx;
		}

		.view-user {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx;

			.view-userNickname {
				display: flex;
				align-items: center;

				view {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					.text-name {
						font-size: 28rpx;
						color: #666666;
						line-height: 60rpx;
					}

					text {
						font-size: 24rpx;
						color: #999999;
						line-height: 41rpx;
					}
				}

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}

			.view-follow {
				width: 140rpx;
				height: 60rpx;
				background: #4A9AFF;
				border-radius: 10rpx;


				font-size: 28rpx;
				color: #FFFFFF;
				line-height: 36rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
		}

		.view-substance {

			margin: 30rpx;
			display: flex;
			flex-direction: column;

			.text-title {
				font-size: 36rpx;
				color: #333333;
				line-height: 48rpx;
			}

			text {
				font-size: 32rpx;
				color: #333333;
				line-height: 48rpx;
			}

			.view-img {
				image {
					width: 690rpx;
					height: 387rpx;
					border-radius: 10rpx;
				}
			}

			image {
				margin-top: 10rpx;
				width: 218rpx;
				height: 218rpx;
				border-radius: 10rpx;
			}
		}

		.view-label {
			width: 20%;
			margin-top: 20rpx;
			background: #EDEDED;
			border-radius: 20rpx;

			text {
				display: flex;
				align-items: center;
				justify-content: space-around;
				// padding: 27rpx;
				font-size: 20rpx;
				color: #666666;

			}
		}
	}

	.view-content {
		background-color: #F7F7F7;

		.view-content-a {
			box-sizing: border-box;
			padding: 37rpx 30rpx;
			margin-bottom: 20rpx;
			width: 750rpx;

			background: #FFFFFF;

			.view-title {
				width: 666rpx;
				height: 77rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 47rpx;
				margin-bottom: 30rpx;
			}

			.view-time {
				width: 133rpx;
				height: 19rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #999999;
				line-height: 48rpx;
				margin-bottom: 58rpx;
			}

			.view-text {
				width: 691rpx;
				height: 268rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 48rpx;
			}
		}

		.view-content-b {
			box-sizing: border-box;
			padding-left: 30rpx;
			padding-top: 39rpx;
			width: 750rpx;
			min-height: 543rpx;
			background: #FFFFFF;

			.view-summary {
				width: 690rpx;
				height: 60rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 48rpx;
				border-bottom: 1rpx solid #EFEFEF;
				margin-bottom: 30rpx;
				display: flex;
				align-items: center;

				.view-line {
					width: 11rpx;
					height: 32rpx;
					background: #4A9AFF;
					border-radius: 5rpx;
				}

				text {
					margin-left: 20rpx;
				}
			}

			.view-comment {
				// border-bottom: 1rpx solid #EFEFEF;
				margin-bottom: 36rpx;

				.view-top {
					// display: flex;
					// align-items: center;
					margin-bottom: 20rpx;

					.dianzai {
						display: inline-block;
						float: right;
						margin-right: 40rpx;
						font-size: 24rpx;

						image {
							width: 30rpx;
							height: 30rpx;
						}
					}

					text {
						margin-left: 20rpx;
					}

					image {
						// background-color: #007AFF;
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						// margin-right: 17rpx;
						vertical-align: middle;

					}
				}

				.view-bottom {
					margin-left: 80rpx;
				}

				.message {
					font-size: 24rpx;
					margin-top: 20rpx;
					color: #aaa;
					margin-left: 80rpx;

					text {
						&:nth-child(2) {
							display: inline-block;
							margin-left: 20rpx;
						}
					}
				}
			}

			.view-tail {
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 42rpx;
				text-align: center;
			}
		}

		.replay-list {
			box-sizing: border-box;
			padding-left: 80rpx;
			width: 100%;
			.replay-line {
				box-sizing: border-box;
				padding: 20rpx 0;
				width: 100%;
				min-height: 100rpx;
				position: relative;
				.replay-info {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #939393;
					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					}
				}
			}
			.replay-message {
				padding: 10rpx 0 10rpx 60rpx;
				font-size: 28rpx;
				color: #515151;
			}
		}


		.view-content-d {
			box-sizing: border-box;
			padding: 0 50rpx;

			.view-top {

				height: 30rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 28rpx;
				text-align: center;
				margin-bottom: 44rpx;
				margin-top: 44rpx;
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}

			.view-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 108rpx;
				.view-one {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;

					image {
						width: 87rpx;
						height: 87rpx;
						margin-bottom: 26rpx;
					}
				}
			}

		}
	}

	.footer-edit {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		.edit-left {
			width: 451rpx;
			height: 100%;
			display: flex;
			align-items: center;
			input {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				background-color: #bca9f7;
			}
		}
		.edit-right {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.right-cell {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				font-size: 24rpx;
				color: #999999;
					image {
						width: 34rpx;
						height: 34rpx;
					}
				
			}
			.send-btn {
				box-sizing: border-box;
				padding: 10rpx 30rpx;
				border-radius: 50rpx;
				background-color: #4d8ff7;
				color: #FFFFFF;
			}
		}
	}

	.footer-edit-fill{
		width: 100%;
		height: 120rpx;
		background-color: #fff;
	}

	.edit-box {
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;
		.edit-btn {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			.edit-confirm {
				box-sizing: border-box;
				width: 120rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 40rpx;
				background-color: #4A9AFF;
				color: #fff;
				font-size: 26rpx;
				font-weight: 600;
			}
		}
	}


	.message-text {
		font-size: 26rpx;
		color: #515151;
	}
</style>
