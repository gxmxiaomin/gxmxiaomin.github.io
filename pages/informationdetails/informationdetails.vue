<template>
	<view>
		<view class="view-information">
			<view class="view-substance">
				<text class="text-title">{{messages.title}}</text>
				<text class="text-time">{{messages.createTime}}</text>
				<text class="text-content" v-html="messages.content"></text>
				<view class="view-img" v-if="messages.type==0">
					<image v-for="(image,index) in messages.resource" :src="image" mode=""></image>
				</view>
				<video v-if="messages.type==1" class="video" :src="messages.resource[0]" controls></video>
				<view class="view-article" v-if="messages.type==2">
					<view class="view-item" v-for="(item,index) in messages.content">
						<view class="text-p">
							{{item.content}}
						</view>
						<image :src="item.image" mode=""></image>
					</view>
				</view>
				<view class="view-label" v-for="item in tags">
					<text>{{item.description}}</text>
				</view>
			</view>
		</view>
		<view class="view-content">
			<view class="view-content-a">
			</view>
			<view class="view-content-b">
				<view class="view-summary">
					<view class="view-line">

					</view>
					<text>全部评论</text>
				</view>
				<view class="view-comment" v-for="(item,index) in comment">
					<view class="view-top">
						<image :src="item.headUrl" mode=""></image>
						<view class="view-information">
							<view class="view-name">
								{{item.nickname}}
							</view>
							<view class="view-remarks">
								<view class="view-left">
									{{item.time}}
								</view>
								<view class="view-right" @click="()=>{
									commentId=item.id,
										pinglun='回复@'+item.nickname+'：'
										return ''
									}">
									回复
								</view>
							</view>
						</view>
					</view>
					<view class="view-bottom">
						{{item.content}}
					</view>
					<view class="view-huifu" v-for="reply in item.replyList">
						<view class="view-top">
							<image :src="reply.headUrl" mode=""></image>
							<view class="view-information">
								<view class="view-name">
									{{reply.nickname}}
								</view>
								<view class="view-remarks">
									<view class="view-left">
										{{reply.time}}
									</view>
									<view class="view-right" @click="()=>{
										commentId=reply.id,
										pinglun='回复@'+reply.nickname+'：'
										return ''
									}">
										回复
									</view>
								</view>
							</view>
						</view>
						<view class="view-bottom">
							{{reply.content}}
						</view>
					</view>
				</view>
			</view>
			<view class="view-content-c">
				<view class="view-left">
					<input type="text" value="" v-model="pinglun" placeholder="评论..." />

				</view>
				<button class="button-send u-reset-button" @click="sendNotic(messages.id)">发送</button>
				<view class="view-right">
					<view class="view-one" @click="dianzan(messages.id)">
						<u-icon :name="voteState?'heart-fill':'heart'" :color="voteState?'#FF0000':'#333333'" size="20">
						</u-icon>
						<text>{{messages.voteCount}}</text>
					</view>
					<view class="view-one">
						<image class="collects" @click="collect(messages.id)" v-if="collects==false"
							src="/static/images/collect1.png"></image>
						<image class="collects" @click="quxiao(messages.id)" v-else src="/static/images/collect2.png">
						</image>
						<text>收藏</text>
					</view>
					<view class="view-one" @click="show = true">
						<u-icon name="share" size="20"></u-icon>
						<text>分享</text>
					</view>
				</view>
			</view>
			<u-popup :show="show" @close="show = false" @open="console.log('open')" :round="10" mode="bottom">
				<view class="view-content-d">
					<view class="view-top">
						— 分享至 —
					</view>
					<view class="view-bottom">
						<view class="view-one" @click="share(1)">
							<image src="/static/images/informationdetails1.png" mode=""></image>
							<view class="view-name">
								微信
							</view>
						</view>
						<view class="view-one" @click="share(2)">
							<image src="/static/images/informationdetails4.png" mode=""></image>
							<view class="view-name">
								朋友圈
							</view>
						</view>
						<view class="view-one" @click="share(3)">
							<image src="/static/images/informationdetails2.png" mode=""></image>
							<view class="view-name">
								微博
							</view>
						</view>
						<view class="view-one" @click="share(4)">
							<image src="/static/images/informationdetails3.png" mode=""></image>
							<view class="view-name">
								QQ
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
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
				shareTypes:'WXSceneSession',
				isShare: false
			}
		},
		onLoad(option) {
			this.isShare = options.isShare||false
			this.ids = option.id
			this.getInfo()
		},
		watch: {
			pinglun() {
				if (!this.pinglun) {
					this.commentId = -1;
				}
			},
		},
		methods: {
			share(val) {
				if(val==1){
					this.fenxiang('weixin')
					this.shareTypes = 'WXSceneSession'
				}else if(val==2){
					this.fenxiang('weixin')
					this.shareTypes = 'WXSceneTimeline'
				}else if(val==3){
					this.fenxiang('sinaweibo')
					this.shareTypes = 'WXSceneSession'
				}else{
					this.fenxiang('qq')
					this.shareTypes = 'WXSceneSession'
				}

			},
			fenxiang(shareType){
				uni.share({
					provider: shareType,
					scene: this.shareTypes,
					type: 0,
					// href: "http://47.103.30.184:9227/h5/index.html#/pages/article/article",
					href: this.shareUrlList.hostdetailUrl({
						id: this.ids
					}),
					title: this.messages.title,
					summary: this.messages.title,
					imageUrl: this.messages.resource.length>0? this.messages.resource[0]:'https://img1.baidu.com/it/u=554809536,2732110137&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=560',
				 success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			async dianzan(ids) {
				let res = await this.http.get('/app/forum/topic/voteTopic', {
					id: ids,
				});
				if (res.code == 200) {
					this.$toast(res.msg);
					this.getInfo()
				} else {
					this.$toast(res.msg);
				}
			},
			// 取消收藏
			async quxiao(ids) {
				let res = await this.http.post('/app/forum/topic/deleteCollect', {
					topicId: ids,
				});
				if (res.code == 200) {
					this.getInfo()
				} else {
					this.$toast(res.msg);
				}
			},
			async collect(ids) {
				let res = await this.http.post('/app/forum/topic/collectTopic', {
					topicId: ids,
				});
				if (res.code == 200) {
					this.$toast('收藏成功');
					this.getInfo()
				} else {
					this.$toast(res.msg);
				}
			},
			async sendNotic(ids) {
				let res = await this.http.post('/app/forum/topic/createComment', {
					commentId: this.commentId,
					topicId: ids,
					content: this.pinglun
				});
				if (res.code == 200) {
					this.pinglun='';
					this.$toast('评论成功');
					this.getInfo()
				} else {
					this.$toast(res.msg);
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
				if(this.isShare) {
					submit.shareStatus = true
				}
				let res = await this.http.get('/app/forum/topic/topicInfo', submit);
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
	.view-information {
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
			margin: 30rpx;
			display: flex;
			flex-direction: column;
			.text-content{
				margin-top: 30rpx;
			}
			.text-time{
				font-size: 20rpx;
				color: #999999;
			}
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
					width: 215rpx;
					height: 215rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;

					&:nth-child(3n) {
						margin-right: 0;
					}
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
			background: #FFFFFF;
			margin-bottom: 80rpx;

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
				border-bottom: 1rpx solid #EFEFEF;
				margin-bottom: 36rpx;

				.view-huifu {
					padding-left: 30rpx;
				}

				.view-top {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;

					image {
						background-color: #007AFF;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						margin-right: 17rpx;
					}

					.view-information {
						.view-name {
							height: 27rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #666666;
							line-height: 21rpx;
							margin-bottom: 12rpx;
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
					height: 69rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 42rpx;
					margin-bottom: 20rpx;
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
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 98rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 14rpx 30rpx;
			background-color: #FFFFFF;

			.button-send {
				width: 120rpx;
				height: 66rpx;
				background: #4A9AFF;
				border-radius: 32rpx;
				font-size: 30rpx;
				color: #FFFFFF;
				line-height: 66rpx;
				display: flex;
				margin-left: 10rpx;
				align-items: center;
				justify-content: space-around;
			}

			.view-left {
				width: 380rpx;
				height: 70rpx;
				background: #F7F7F7;
				border-radius: 35rpx;

				input {
					margin-left: 20rpx;
					margin-top: 20rpx;
					height: 27rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 42rpx;
				}
			}

			.view-right {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-around;
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
</style>
