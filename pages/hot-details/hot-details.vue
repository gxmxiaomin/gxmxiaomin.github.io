<template>
	<view class="view-hot-details">
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()">返回</text> -->
				<image style="width: 20rpx;height: 35rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text v-if="isShare">人人论坛</text>
				<text v-else>热点详情</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
					<view class="city-rigth">
					</view>
				</view>
			</view>
		</view>
		
		<view class="view-information">
			<view class="view-substance">
				<text class="text-title">{{messages.title}}</text>
				<view class="view-lists">
					<text class="text-time">{{messages.createTime}}</text>
					<text class="text-read">阅读量：{{messages.view}}</text>
				</view>

				<u-parse class="text-content" :content="messages.content"></u-parse>

				<view class="view-label" v-for="item in tags">
					<text>{{item.description}}</text>
				</view>
			</view>
		</view>

		<!-- 评论 -->
		<view class="view-content">
			<view class="view-content-b">
				<view class="view-summary">
					<!-- <view class="view-line"></view> -->
					<text>共{{comment.length}}条评论</text>
				</view>
				<view class="view-comment" v-for="(item,index) in comment" :key="index">
					<view class="view-top">
						<view class="view-pic">
							<image :src="item.headUrl" mode=""></image>
							<!-- <image v-if="item.memberGrade" class="img-icon" src="../../static/images/huiyuan.png"
								mode=""></image> -->
						</view>
						<view class="view-information">

							<view class="view-nickname">
								<view class="view-name">{{item.nickname}}</view>
								<view class="view-author" v-if="item.isAuthor">作者</view>
							</view>

							<view class="view-remarks">
								<view class="view-left">
									{{item.time}}
								</view>
								<view class="view-right" @click="clickComment(item,1)">
									回复
								</view>
							</view>
						</view>
					</view>
					<view class="view-bottom">
						{{item.content}}
					</view>
					<view class="view-reply-list">
						<view class="view-huifu" v-for="(reply,i) in item.replyList" :key="i" v-if="i<item.num">
							<view class="view-top">
								<view class="view-pic">
									<image :src="reply.headUrl" mode=""></image>
									<!-- <image v-if="reply.memberGrade" class="img-icon"
										src="../../static/images/huiyuan.png" mode=""></image> -->
								</view>
								<view class="view-information">
									<view class="view-nickname">
										<view class="view-name">{{reply.nickname}}</view>
										<view class="view-author" v-if="reply.isAuthor">作者</view>
									</view>
									<view class="view-remarks">
										<view class="view-left">
											{{reply.time}}
										</view>
										<view class="view-right" @click="clickReply(item,2)">
											回复
										</view>
									</view>
								</view>
							</view>
							<view class="view-bottom">
								{{reply.content}}
							</view>
						</view>

						<view class="view-fold" v-if="item.replyList.length>2">
							<view v-if="item.isFold" @click="()=>{
										item.isFold = false;
										item.num=item.replyList.length
										$forceUpdate()
									}">
								展开剩余{{item.replyList.length-2}}条
							</view>
							<view v-else @click="()=>{
										item.isFold = true;
										item.num=2
										$forceUpdate()
									}">
								收起评论
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="view-content-c">

				<view class="view-left">
					<view class="view-input">
						<input class="uni-input" cursor-spacing="15" type="text" value="" v-model="pinglun" :placeholder="info" />
					</view>
					<button class="button-send u-reset-button" @click="sendNotic">发送</button>
				</view>

				<view class="view-right">

					<view class="view-one" @click="dianzan(messages.id)">
						<image class="collects" src="../../static/images/praise_fill.png" mode="" v-if="voteState">
						</image>
						<image class="collects" src="../../static/images/praise.png" mode="" v-else></image>
						<text>{{messages.voteCount}}</text>
					</view>

					<view class="view-one">
						<image class="collects" @click="collect(messages.id)" v-if="collects==false"
							src="/static/images/collect1.png"></image>
						<image class="collects" @click="quxiao(messages.id)" v-else src="/static/images/collect2.png">
						</image>
						<text>收藏</text>
					</view>

					<!-- <view class="view-one" @click="show = true"> -->
					<view class="view-one" @click="Goshare()">
						<image class="image collects" src="../../static/images/fenxiang.png"></image>
						<text class="text-collect">分享</text>
					</view>

				</view>
			</view>

			<u-popup :show="show" @open="console.log('open')" @close="show=false" :round="10" mode="bottom">
				<view class="view-content-d">
					<view class="view-top">
						— 分享至 —
					</view>
					<view class="view-bottom">
						<view class="view-one" @click="share(1)">
							<image class="image" src="../../static/images/weixin-2.png"></image>
							<text class="view-name">微信</text>
						</view>
						<view class="view-one" @click="share(2)">
							<image class="image" src="../../static/images/pengyouquan.png"></image>
							<text class="view-name">朋友圈</text>
						</view>
						<view class="view-one" @click="share(3)">
							<image class="image" src="../../static/images/weibo.png"></image>
							<text class="view-name">微博</text>
						</view>
						<view class="view-one" @click="share(4)">
							<image class="image" src="../../static/images/qq.png"></image>
							<text class="view-name">QQ</text>
						</view>
					</view>
				</view>
			</u-popup>
		</view>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	import {
		DownloadMethods
	} from '@/static/js/configUrl.js';
	import {
		convertTree
	} from '../../utils/tree.js';
	export default {
		data() {
			return {
				show: false,
				ids: '',
				messages: [],
				tags: [],
				comment: [],
				collects: '',
				focus: '',
				pinglun: '',
				topicUser: {},
				voteState: false,
				commentId: -1,
				info: '说点什么...',
				shareTypes: 'WXSceneSession',
				commentType: '',
				isShare: false,
				invitationCode: '',
			}
		},
		onLoad(option) {
			console.log(option)
			this.ids = option.id
			this.invitationCode = option.invitationCode
			console.log(this.invitationCode)
			this.isShare = option.isShare || false
			// console.log(">>>>>>>>>>>>>", this.isShare)
			this.getInfo()
			this.messageShowTip.showTextMessage(this)
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		watch: {
			pinglun() {
				if (!this.pinglun) {
					this.commentId = -1;
				}
			},
		},
		methods: {
			Goshare() {
				DownloadMethods(this.isShare, this.show = true, this.invitationCode)

			},

			identityType(type) {
				switch (type) {
					case 0:
						return '用户';
					case 1:
						return '学校';
					case 2:
						return '商家';
					case 3:
						return '心理咨询师';
					case 4:
						return '律师';
					case 5:
						return '医生';
					case 6:
						return '自媒体';
					case 7:
						return '学校(机构)';
					case 8:
						return '商家(网店)';
				}
			},

			// 是否折叠
			clickIsFold(item) {
				console.log(item);
				this.comment.forEach((val, i) => {
					if (item.id == val.id) {
						val.isFold = false;
						val.num = 2;
					}
				})
			},

			// 分享
			share(val) {
				switch (val) {
					case 1:
						this.fenxiang('weixin', 'WXSceneSession')
						break;
					case 2:
						this.fenxiang('weixin', 'WXSceneTimeline')
						break;
					case 3:
						this.fenxiang('sinaweibo', '')
						break;
					case 4:
						this.fenxiang('qq', '')
						break;
				}
			},

			fenxiang(shareType, shareTypes) {
				let that = this;
				uni.share({
					provider: shareType,
					scene: shareTypes,
					type: 0,
					href: this.shareUrlList.hostdetailUrl({
						id: this.ids
					}), //http://47.103.30.184:9227/h5/index.html#/pages/article/article
					title: this.messages.title,
					summary: '我曾踏足山巅，吾亦深入低谷，二者皆使我收益良多',
					imageUrl: this.messages.resource,
					success: function(res) {
						that.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

			// 转发成功获取积分
			async getIntegral() {
				let res = await this.http.post('/app/forum/topic/rePostTopic', {
					topicId: this.ids,
					platform: ''
				});
				console.log(21323123213, res);
				if (res.code == 200) {

				} else {
					this.$toast(res.msg);
				}
			},
			//点赞跳转
			dianzan(ids) {
				DownloadMethods(this.isShare, this.dianzans(ids), this.invitationCode)

			},

			async dianzans(ids) {
				let res = await this.http.get('/app/forum/topic/voteTopic', {
					id: ids,
				});
				if (res.code == 200) {
					this.$toast(res.msg);
					this.getInfo()
				} else {
					// this.$toast(res.msg);
				}
			},

			//取消收藏跳转
			quxiao(ids) {
				DownloadMethods(this.isShare, quxiaos(ids), this.invitationCode)
			},
			// 取消收藏
			async quxiaos(ids) {
				let res = await this.http.post('/app/forum/topic/deleteCollect', {
					topicId: ids,
				});
				if (res.code == 200) {
					this.getInfo()
				} else {
					this.$toast(res.msg);
				}
			},

			//收藏跳转
			collect(ids) {
				DownloadMethods(this.isShare, this.collectp(ids), this.invitationCode)
			},
			async collectp(ids) {
				let res = await this.http.post('/app/forum/topic/collectTopic', {
					topicId: ids,
				});
				if (res.code == 200) {
					this.$toast('收藏成功');
					this.getInfo()
				} else {
					// this.$toast(res.msg);
				}
			},

			clickComment(e, type) {
				console.log(e);
				this.commentType = type
				this.commentId = e.id
				this.info = '回复@' + e.nickname + '：'
				return ''
			},

			async clickReply(e, type) {
				console.log(e);
				this.commentType = type
				this.commentId = e.id
				this.info = '回复@' + e.nickname + '：'
				return ''

				let content = '回复@' + e.nickname + '：' + this.pinglun
				console.log(content);

			},
			//发送跳转
			sendNotic(ids) {
					DownloadMethods(this.isShare, this.sendNotics(ids), this.invitationCode)

			},
			async sendNotics(ids) {

				if (!this.pinglun) {
					this.$toast('请输入评论内容')
					return;
				}

				if (this.commentType == 1) {
					this.pinglun = this.info + this.pinglun
					console.log(this.pinglun);
				}

				if (this.commentType == 2) {
					this.pinglun = this.info + this.pinglun
					console.log(this.pinglun);
				}

				let res = await this.http.post('/app/forum/topic/createComment', {
					commentId: this.commentId,
					topicId: this.ids,
					content: this.pinglun
				});
				if (res.code == 200) {
					this.pinglun = '';
					this.commentType = '';
					this.info = '说点什么...';
					this.$toast('评论成功');
					this.getInfo()
				} else {
					// this.$toast(res.msg);
				}
			},
			guanzhu(ids) {
				console.log(ids)
				this.postfocus(ids)
			},
			async cancelAttention(ids) {
				let res = await this.http.post('/app/forum/topic/deleteFocus', {
					userId: ids,
				});
				if (res.code == 200) {
					this.$toast(res.msg);
					this.getInfo()
				} else {
					this.$toast(res.msg);
				}
			},
			async postfocus(ids) {
				let res = await this.http.post('/app/forum/topic/focusOnUser', {
					userId: ids,
				});
				if (res.code == 200) {
					this.$toast('关注成功');
					this.getInfo()
				} else {
					this.$toast(res.msg);
				}
			},
			async getInfo() {
				let submit = {
					pageNum: 1,
					pageSize: 10,
					id: this.ids,
				}
				if (this.isShare) {
					submit.shareStatus = true
				}
				let res = await this.http.get('/app/forum/topic/topicInfo', submit);
				console.log('信息', res);
				if (res.code == 200) {
					this.collects = res.data.collect
					this.focus = res.data.focus
					res.data.topic.resource = this.strToArray(res.data.topic.resource);
					if (res.data.topic.type == 2) {
						res.data.topic.content = JSON.parse(res.data.topic.content);
					}
					this.messages = res.data.topic
					this.tags = res.data.tags
					this.comment = convertTree(res.data.comments);
					this.comment.forEach((item, index) => {
						item['isFold'] = true;
						item['num'] = 2;
					})
					console.log(this.comment);
					this.topicUser = res.data.topicUser
					this.voteState = res.data.vote
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}
	
	.top-bar {
		height: 120rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		background-color: #fff;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
	
		.bare-cell {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	
		.bar-left {
			flex: 2;
			height: 100%;
		}
	
		.bar-center {
			flex: 5;
			height: 100%;
		}
	
		.bar-right {
			flex: 2;
			height: 100%;
		}
	}

	.view-information {
		margin-top: 100rpx;
		background-color: #FFFFFF;

		.view-user {
			display: flex;
			align-items: center;
			justify-content: space-between;


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
						line-height: 61rpx;
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
					border-radius: 50rpx;
				}
			}

			.view-follow {
				width: 140rpx;
				height: 60rpx;
				background: #4A9AFF;
				border-radius: 30rpx;


				font-size: 28rpx;
				color: #FFFFFF;
				line-height: 36rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
			}
		}

		.view-substance {
			padding: 30rpx;
			display: flex;
			flex-direction: column;

			.text-content {
				margin-top: 30rpx;
				letter-spacing: 1rpx;
				line-height: 1.5;
				color: #333333;
			}

			.view-lists {
				display: flex;

				.text-time {
					font-size: 20rpx;
					color: #999999;
				}

				.text-read {
					margin-left: auto;
					font-size: 20rpx;
					color: #999999;
				}
			}

			.text-title {
				font-weight: bold;
				font-size: 36rpx;
				color: #333333;
				line-height: 48rpx;
			}

			text {
				font-size: 32rpx;
				color: #333333;
				line-height: 48rpx;
			}

			.video {
				margin-top: 20rpx;
				width: 100%;
			}

			.view-article {
				width: 100%;
				display: flex;
				flex-direction: column;

				.view-item {
					width: 100%;
					margin-top: 20rpx;

					.text-p {
						width: 100%;
					}

					image {
						width: 100%;
						margin-top: 20rpx;
					}
				}
			}

			.view-img {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				align-items: center;

				image {
					margin-top: 10rpx;
					width: 100%;
					border-radius: 10rpx;
					margin: 20rpx 0;
				}
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
		padding-bottom: 50rpx;
		margin-top: 10rpx;

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
			padding: 0 30rpx;
			width: 750rpx;
			background: #FFFFFF;
			margin-bottom: 80rpx;

			.view-summary {
				display: flex;
				align-items: center;
				width: 690rpx;
				height: 90rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 48rpx;

				.view-line {
					width: 11rpx;
					height: 32rpx;
					background: #4A9AFF;
					border-radius: 5rpx;
					margin-right: 20rpx;
				}

				text {
					display: flex;
					align-items: center;
				}
			}

			.view-comment {
				border-top: 1rpx solid #EFEFEF;
				padding: 30rpx 0;

				.view-huifu {
					padding: 16rpx 0 16rpx 30rpx;
				}

				.view-top {
					display: flex;
					align-items: center;
					margin-bottom: 18rpx;

					.view-pic {
						// position: relative;

						// .img-icon {
						// 	width: 30rpx !important;
						// 	height: 30rpx !important;
						// 	position: absolute;
						// 	bottom: 6rpx;
						// 	right: 0;
						// }
					}

					image {
						display: flex;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						margin-right: 14rpx;
					}

					.view-information {
						.view-nickname {
							display: flex;
							align-items: center;
							margin-bottom: 10rpx;

							.view-name {
								font-size: 28rpx;
								color: #666666;
							}

							.view-author {
								padding: 2rpx 10rpx;
								border-radius: 999rpx;
								background-color: #4A9AFF;
								font-size: 20rpx;
								color: #FFFFFF;
								margin-left: 12rpx;
							}

							// .view-certification {
							// 	display: flex;
							// 	align-items: center;
							// 	margin-left: 20rpx;
							// 	padding: 0 10rpx 0 16rpx;
							// 	background: #F34E27;
							// 	height: 30rpx;
							// 	border-radius: 999rpx;
							// 	position: relative;

							// 	text {
							// 		margin-left: 10rpx;
							// 		font-size: 20rpx;
							// 		color: #FFFFFF;
							// 	}
							// }

							// image {
							// 	position: absolute;
							// 	top: 50%;
							// 	left: -10rpx;
							// 	transform: translateY(-50%);
							// 	width: 32rpx;
							// 	height: 38rpx;
							// }
						}



						.view-remarks {
							display: flex;
							align-items: center;
							font-size: 20rpx;
							height: 19rpx;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #4A9AFF;
							line-height: 21rpx;

							.view-left {
								color: #999999;
								margin-right: 28rpx;
							}
						}
					}
				}

				.view-bottom {
					width: 670rpx;
					// height: 69rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #333333;
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

		.view-content-c {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 750rpx;
			height: 98rpx;
			padding: 14rpx 30rpx;
			background-color: #FFFFFF;

			.view-left {
				display: flex;
				align-items: center;

				.view-input {
					display: flex;
					align-items: center;
					width: 320rpx;
					height: 70rpx;
					background-color: #F7F7F7;
					border-radius: 999rpx;
					overflow: hidden;
					padding: 0 20rpx;

					input {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}

				.button-send {
					width: 120rpx;
					height: 66rpx;
					background: #4A9AFF;
					border-radius: 999rpx;
					font-size: 30rpx;
					color: #FFFFFF;
					line-height: 66rpx;
					display: flex;
					margin-left: 10rpx;
					align-items: center;
					justify-content: space-around;
				}
			}

			.view-right {
				display: flex;
				align-items: center;
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 42rpx;

				.view-one {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-left: 30rpx;

					.collects {
						width: 30rpx;
						height: 30rpx;
						margin-bottom: 8rpx;
					}
				}
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

	.view-pic {
		position: relative;

		.img-icon {
			width: 30rpx !important;
			height: 30rpx !important;
			position: absolute;
			bottom: 6rpx;
			right: 0;
		}
	}
</style>
