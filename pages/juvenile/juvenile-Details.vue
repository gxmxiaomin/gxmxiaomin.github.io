<template>
	<!-- 动态详情页 -->
	<view>
		<view class="user-top">
			<view class="user-header">
				<image :src="dync.headUrl" mode=""></image>
			</view>
			<view class="user-info">
				<text>{{ dync.nickName }}</text>
				<text style="font-size: 24rpx;color: rgba(139, 139, 139, 0.8);">2022-09-02 &nbsp; IP：{{dync.city || '未知'}} </text>
			</view>
		</view>

		<view class="dync-content">
			<text> {{ dync.content }} </text>
		</view>
		<view class="img-list">
			<view class="image"
				v-for="(item, index) in (dync.videoCover||'').split(',').filter(ele=>{return ele != ''})"
				:key="item+index">
				<image :src="item" mode=""
					@click="$showImg((dync.videoCover||'').split(',').filter(ele=>{return ele != ''}),item)"></image>
			</view>
		</view>

		<view class="line"></view>

		<view class="ping">
			<view class="pinglun-title">
				<text>评论</text>
				<text style="margin-left: 5rpx;">({{ dync.comment||0 }})</text>
			</view>

			<view class="view-comment" v-for="(item,index) in plList" :key="item.id">
				<view class="view-top">
					<image :src="item.headUrl" mode=""></image>
					<text style="font-size: 32rpx;font-weight: 600; color: #222;"> {{ item.userName }}</text>
					<view class="dianzai">
						<!-- <image src="../../static/images/praise.png" mode="" @click="plGood(item)"></image> -->
						<u-icon name="thumb-up" size="20" @click="plGood(item)" v-show="item.isPraise==0"></u-icon>
						<u-icon name="thumb-up-fill" size="20" @click="plGood(item)" color='#ddb821'
							v-show="item.isPraise!=0"></u-icon>
						<text> {{ item.praise }} </text>
					</view>
				</view>
				<view class="view-bottom" @click="replayEdit(item, item)">
					<text class="message-text"> {{ item.info }} </text>
				</view>
				<view class="message">
					<text @click="openItem(item)">{{ item.muSchoolDiscusses&&item.muSchoolDiscusses.length }}回复></text>
					<text> {{ item.createTime.split(' ')[1] }}</text>
				</view>
				<view class="replay-list" v-show="item.open != 'false'">
					<view class="replay-line" v-for="replay in (item.muSchoolDiscusses||[])" :key="replay.id">
						<view class="replay-info">
							<image :src="replay.headUrl" mode=""></image>
							<text style="margin-left: 10rpx;">{{ replay.userName }}</text>
							<text v-if="item.id != replay.replyId"> > {{ replay.coverName }}</text>
						</view>
						<view class="replay-message" @click="replayEdit(replay, item)">
							<text class="message-text">{{ replay.info }}</text>
						</view>
					</view>
				</view>
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

		<!-- 默认底部操作栏 -->
		<view class="footer-edit-fill"></view>
		<view class="footer-edit">
			<view class="edit-left" @click="editShow=true">
				<u--input :placeholder="placeholder ==''? '评论...':placeholder" border="surround" disabled shape='circle'
					style="background-color: #f5f5f5;"></u--input>
			</view>
			<view class="edit-right">
				<view class="right-cell" v-if="plText==''">
					<u-icon name="thumb-up" size="20" @click="good()" v-show="dync.dian==null"></u-icon>
					<u-icon name="thumb-up-fill" size="20" @click="good()" color='#ddb821' v-show="dync.dian!=null">
					</u-icon>
					<text> {{ dync.fabulous }} </text>
				</view>
				<view class="right-cell" v-if="plText==''">
					<u-icon name="star" size="20" @click="collect()" v-show="dync.shou==null"></u-icon>
					<u-icon name="star-fill" size="20" @click="collect()" color='#ddb821' v-show="dync.shou!=null">
					</u-icon>
					<text>{{ dync.shou==null? '收藏':'已收藏'}}</text>
				</view>
				<view class="right-cell" v-if="plText==''" @click="isShow()">
					<u-icon name="share" size="20"></u-icon>
					<text>分享</text>
				</view>

				<text class="send-btn" v-if="plText!=''">发送</text>
			</view>
		</view>


		<!-- 进行评论时候的底部栏 -->
		<u-popup :show="editShow" @close="close">
			<view class="edit-box">
				<u--textarea v-model="plText" count focus height='100px'
					:placeholder="placeholder ==''? '我来讲两句':placeholder" style="background-color: #f5f5f5;">
				</u--textarea>

				<view class="edit-btn">
					<view></view>
					<view class="edit-confirm" @click="sendNotic">
						<text>发表</text>
					</view>
				</view>
			</view>
		</u-popup>

		<u-toast ref="uToast"></u-toast>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	import {
		DownloadMethods
	} from '@/static/js/configUrl.js';
	export default {
		data() {
			return {
				id: '',
				targetId: '',
				dync: {},
				plText: '',
				show: false,
				placeholder: '',
				plList: [],
				// 被回复的对象
				replayForm: {},
				// 当前的父对象
				parentForm: {},
				editShow: false,
				invitationCode: '',
				isShare: false
			};
		},
		onLoad(options) {
			console.log(options)
			this.isShare = options.isShare || false
			this.id = options.id
			if (options.targetId == 'undefined') {
				this.targetId = uni.getStorageSync('userInfo').id
			} else {
				this.targetId = options.targetId
			}
			this.getDync()
			this.getplList()
			this.invitationCode = option.invitationCode
			// 消息提示
			this.messageShowTip.showTextMessage(this)
		},
		methods: {
			isShow() {
				console.log(this.isShare)
				DownloadMethods(this.isShare, this.show = true, this.invitationCode)
			},
			async getDync() {
				let res = await this.http.post('/app/School/selectByIds', {
					id: this.id,
					targetId: this.targetId
				})
				console.log(res)
				this.dync = res.data
			},

			close() {
				this.placeholder = ''
				this.editShow = false
			},

			sendNotic() {
				DownloadMethods(this.isShare, this.sendpl(), this.invitationCode)
			},

			async sendpl() {
				console.log("发送的评论是", this.plText)
				let data = {
					info: this.plText,
					articleId: this.id,
					fatherId: this.parentForm.id || 0,
					replyId: this.replayForm.id || 0,
				}
				if (this.replayForm.userName) {
					data.coverName = this.replayForm.userName
				}
				const res = await this.http.postJson('/app/School/addDiscussService', data)
				console.log("发送的评论的结果为", res)
				this.getplList()

				this.$toast('发送成功')
				this.plText = ''
				this.placeholder = ''
				this.replayForm = {}
				this.parentForm = {}
			},

			replayEdit(replay, item) {
				console.log("要回复的对象", replay)
				this.placeholder = '@' + replay.userName
				this.replayForm = replay
				this.parentForm = item
			},

			openItem(item) {
				if (item.open == 'false') {
					item.open = 'true'
				} else {
					item.open = 'false'
				}
			},

			async getplList() {
				const res = await this.http.post('/app/School/getMuSchoolArticleList', {
					articleId: this.id
				})
				console.log("查询到的评论", res)
				this.plList = res.data
			},

			good() {
				DownloadMethods(this.isShare, this.goods(), this.invitationCode)
			},

			async goods() {
				const res = await this.http.get('/app/School/vote', {
					id: this.id
				})
				console.log('点赞的结果为', res)
				if (res.code == 200) {
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
				if (!this.dync.dian) {
					this.dync.fabulous += 1
					this.dync.dian = 1
				} else {
					this.dync.fabulous -= 1
					this.dync.dian = null
				}
			},

			collect() {
				DownloadMethods(this.isShare, this.collects(), this.invitationCode)
			},

			async collects() {
				const res = await this.http.post('/app/School/insertForumCollection', {
					id: this.id
				})
				console.log("收藏的结果", res)
				if (res.code == 200) {
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

				if (!this.dync.shou) {
					this.dync.shou = true
				} else {
					this.dync.shou = null
				}
			},

			plGood() {
				DownloadMethods(this.isShare, this.plGoods(), this.invitationCode)
			},

			async plGoods(item) {
				console.log("点赞的对象", item)
				const res = await this.http.get('/app/Schools/insertMuSchoolFunctionDiscuss', {
					discussId: item.id
				})
				console.log("对评论的点赞结果为", res)
				if (res.code != 200) {
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
				if (item.isPraise == 0) {
					item.isPraise = 1
					item.praise += 1
				} else {
					item.isPraise = 0
					item.praise -= 1
				}
			},

			// 图文只能分享到微信和微博
			share(provider = 'sinaweibo', scene = '') {
				console.log("分享的结果为", provider, scene)
				let img = this.videoCover || ''
				if (img == '') img =
					'https://img0.baidu.com/it/u=2725915437,1236608227&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
				else img = img.split(',')[0]
				uni.share({
					provider: provider,
					scene: scene,
					type: 0,
					title: this.dync.title,
					imageUrl: img,
					href: this.shareUrlList.postUrls({
						id: this.id,
						targetId: this.targetId
					}),
					success: (res) => {
						console.log("success:" + JSON.stringify(res));
						this.shareConfirm()
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

			// qq分享文字
			shareQQ() {
				let img = this.videoCover || ''
				if (img == '') img =
					'https://img0.baidu.com/it/u=2725915437,1236608227&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
				else img = img.split(',')[0]
				uni.share({
					provider: 'qq',
					type: 1,
					title: this.dync.title,
					summary: this.dync.title,
					imageUrl: img,
					href: this.shareUrlList.postUrls({
						id: this.id,
						targetId: this.targetId
					}),
					success: (res) => {
						console.log("success:" + JSON.stringify(res));
						this.shareCallback()
					},
					fail: (err) => {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

			async shareCallback() {
				const res = await this.http.post('/app/School/insertForum', {
					id: this.dync.id
				})
				console.log("分享次数增加的结果为", res)
			},


		}
	}
</script>

<style lang="scss" scoped>
	.user-top {
		width: 100%;
		height: 130rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 10rpx 30rpx;

		.user-header {
			width: 80rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.user-info {
			margin-left: 20rpx;
			flex: 1;
			height: 80rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-content: flex-start;
			font-size: 28rpx;
			color: #515151;
		}
	}

	.dync-content {
		padding: 20rpx 30rpx;
		line-height: 40rpx;
		font-size: 30rpx;
	}

	.img-list {
		width: 100%;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;

		.image {
			width: 230rpx;
			box-sizing: border-box;
			justify-content: center;
			align-items: center;
			padding: 10rpx;
			height: 230rpx;

			image {
				width: 210rpx;
				height: 210rpx;
				border-radius: 10rpx;
			}
		}
	}

	.line {
		width: 100%;
		height: 2rpx;
		background-color: rgba(153, 153, 153, 0.5);
	}

	.ping {
		margin-top: 20rpx;
		width: 100%;
	}

	.view-comment {
		box-sizing: border-box;
		padding: 20rpx 30rpx;

		.view-top {
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


	.pinglun-title {
		width: 100%;
		border-bottom: 1rpx solid rgba(139, 139, 139, 0.1);
		box-sizing: border-box;
		padding: 10rpx 30rpx;
		font-weight: 900;
		font-size: 32rpx;
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

	.footer-edit-fill {
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
