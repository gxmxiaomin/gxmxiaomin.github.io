<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()">返回</text> -->
				<image style="width: 20rpx;height: 35rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text v-if="isShare">人人论坛</text>
				<text v-else>帖子详情</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
					<view class="city-rigth">
					</view>
				</view>
			</view>
		</view>

		<view class="view-information">
			<!-- 	<view class="view-user" @click="uni.navigateTo({
				url:'../personal-home-page/personal-home-page?id='+topicUser.id
			})"> -->
			<view class="view-user" @click="Gouser(topicUser.id)">

				<view class="view-userNickname">
					<view class="view-pic">
						<image class="img-avatar" :src="topicUser.headUrl" mode=""></image>
						<image v-if="messages.memberGrade" class="img-icon" src="../../static/images/huiyuan.png"
							mode="">
						</image>
					</view>
					<view class="view-info">
						<view class="view-user-name">
							<text class="text-name">{{topicUser.nickName}}</text>
							<view class="view-level" v-if="messages.identityType!=null">
								<image src="../../static/images/yirenzheng.png" mode=""></image>
								<text>已认证·{{identityType(messages.identityType)}}</text>
							</view>
						</view>
						<view class="view-count">
							<text class="text-time">{{createTime}}</text>
							<text class="text-count">IP：{{messages.position || '未知'}}</text>
							<text class="text-count">阅读量: {{messages.view}}</text>
						</view>
					</view>
				</view>
				<view v-if="isfocus">
					<view class="view-follow" v-if="focus==false" @click.stop="guanzhu(messages.userId)">+关注</view>
					<view class="view-follow" v-else @click.stop="cancelAttention(messages.userId)">取消关注</view>
				</view>
			
			</view>


			<view class="view-substance">

				<!-- 类型·微头条 -->
				<view class="view-container" v-if="messages.type==0">
					<text class="font-content">{{messages.content}}</text>
					<!-- <u-parse :content="messages.content"></u-parse> -->
					<view class="view-item" v-if="messages.resource.length>0" v-for="(img,i) in messages.resource">
						<image @click="$showImg(img,i)" :src="img" mode="widthFix">
						</image>
					</view>
				</view>

				<!-- 类型·短视频 -->
				<view class="view-container" v-if="messages.type==1">
					<text class="font-content">{{messages.content}}</text>
					<!-- <u-parse :content="messages.content"></u-parse> -->
					<video class="video" :src="messages.resource[0]" :poster="messages.videoCover" controls></video>
				</view>

				<!-- 类型·文章 -->
				<view class="view-container" v-if="messages.type==2">
					<text class="text-title">{{messages.title}}</text>
					<!-- 用户上传格式 -->
					<view class="view-article" v-if="Array.isArray(messages.content)">
						<view class="view-item" v-for="(item,index) in messages.content" :key="index">
							<view class="text-p">
								{{item.content}}
							</view>
							<image :src="item.image" mode="widthFix" v-if="item.image"></image>
						</view>
					</view>
					<!-- 富文本格式 -->
					<u-parse :content="messages.content" v-else></u-parse>
				</view>

				<view class="view-label" v-for="item in tags">
					<text>#{{item.description}}</text>
				</view>
			</view>

		</view>

		<!-- 评论 -->
		<view class="view-content">

			<view class="view-content-b">
				<view class="view-summary">
					<view class="view-line"></view>
					<text>全部评论 ({{comment.length}})</text>
				</view>
				<view class="view-comment" v-for="(item,index) in comment" :key="index">
					<view class="view-top">
						<view style="position: relative;">
							<image :src="item.headUrl" mode="" @click="uni.navigateTo({
								url:'../personal-home-page/personal-home-page?id='+item.userId
							})"></image>
							<image v-if="item.memberGrade" class="img-icon" src="../../static/images/huiyuan.png"
								mode="">
							</image>
						</view>
						<view class="view-container">

							<view class="view-nickname">
								<view class="view-name">{{item.nickname}}</view>

								<view class="view-level" v-if="item.identityType">
									<image src="../../static/images/yirenzheng.png" mode=""></image>
									<text>已认证·{{identityType(item.identityType)}}</text>
								</view>

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
								<view style="position: relative;">
									<image :src="reply.headUrl" mode="" @click="uni.navigateTo({
										url:'../personal-home-page/personal-home-page?id='+reply.userId
									})"></image>
									<image v-if="reply.memberGrade" class="img-icon"
										src="../../static/images/huiyuan.png" mode="">
									</image>
								</view>
								<view class="view-information view-reply">
									<view class="view-nickname">
										<view class="view-name">{{reply.nickname}}</view>

										<view class="view-level" v-if="reply.identityType">
											<image src="../../static/images/yirenzheng.png" mode=""></image>
											<text>已认证·{{identityType(reply.identityType)}}</text>
										</view>

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
						<input class="uni-input" cursor-spacing="15" type="text" value="" v-model="pinglun"
							:placeholder="info" />
					</view>
					<button class="button-send u-reset-button" @click="sendNotic">发送</button>
				</view>

				<view class="view-right">
					<view class="view-one" @click="dianzan(messages.id)">
						<u-icon :name="voteState?'heart-fill':'heart'" :color="voteState?'#FF0000':'#333333'" size="20">
						</u-icon>
						<text>{{messages.voteCount}}</text>
					</view>
				<!-- 	<view class="view-one">
						<image class="collects" @click="collect(messages.id)" v-if="collects==false"
							src="/static/images/collect1.png"></image>
						<image class="collects" @click="quxiao(messages.id)" v-else src="/static/images/collect2.png">
						</image>
						<text>收藏</text>
					</view> -->
					<view class="view-one"  @click="gota">
						<image class=" image collects aaa " src="../../static/images/jubao.png"></image>
						<text >举报</text>
						
					</view>
					<!-- <view class="view-one" @click="show = true"> -->
					<view class="view-one" @click="isshow()">
						<image class="image collects" src="../../static/images/fenxiang.png"></image>
						<text class="text-collect">分享</text>
					</view>
				</view>
			</view>

			<u-popup :show="show" @close="close" @open="console.log('open')" :round="10" mode="bottom">
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
	</view>
</template>

<script>
	import {
		convertTree
	} from '../../utils/tree.js';
	import {
		DownloadMethods
	} from '@/static/js/configUrl.js';
	export default {
		data() {
			return {
				isfocus:true,
				createTime:'',
				isFold: false,
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
				memberGrade: null,
				commentType: '',
				isShare: false,
				invitationCode: ''
			}
		},
		onLoad(option) {
		
			this.ids = option.id
			this.invitationCode = option.invitationCode
			this.memberGrade = option.memberGrade
			this.isShare = option.isShare || false
			
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
			//跳到举报页
			gota(){
				 uni.navigateTo({
					url:'/pages/postreport/postreport?ids=' + this.ids
				})
			},
			$showImg(e, b) {
				uni.previewImage({
					current: b, //预览图片的下标
					urls: [e] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			},
			Gouser(topicUser) {
				DownloadMethods(this.isShare, uni.navigateTo({
					url: '../personal-home-page/personal-home-page?id=' + topicUser
				}), this.invitationCode)
			},
			isshow() {
				DownloadMethods(this.isShare, this.show = true, this.invitationCode)
			},
			// 判断类型
			judgeType(type) {
				switch (Number(type)) {
					case 0:
						return '帖子类型·微头条';
					case 1:
						return '帖子类型·短视频';
					case 2:
						return '帖子类型·文章';
				}
			},

			identityType(type) {
				console.log('类型', type);
				switch (Number(type)) {
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
			sendNotic() {
				DownloadMethods(this.isShare, this.sendNotics(), this.invitationCode)
			},
			// 发送评论
			async sendNotics() {
				if (!this.pinglun) {
					this.$toast('请输入评论内容')
					return;
				}
				console.log(this.ids);
				console.log(this.commentType);


				if (this.commentType == 1) {
					this.pinglun = this.info + this.pinglun
					console.log(this.pinglun);
				}

				if (this.commentType == 2) {
					this.pinglun = this.info + this.pinglun
					console.log(this.pinglun);
				}
				console.log(this.pinglun);
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
				let info = ''

				if (this.messages.type == 2) {
					info = this.messages.title;
				} else {
					info = this.messages.content
				}
				console.log('#########################', this.messages)
				console.log(this.messages.title);
				console.log(this.ids)
				uni.share({
					provider: shareType,
					scene: shareTypes,
					type: 0,

					href: this.shareUrlList.postUrl({
						id: this.ids
					}),
					// href: "http://h5.muxingchen.com/index.html#/pages/post-details-article/post-details-article?id="+this.ids,
					title: info,
					// summary: this.messages.schoolTitle,
					imageUrl: this.topicUser.headUrl,
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


			close() {
				this.show = false
			},
			dianzan(ids) {
				DownloadMethods(this.isShare, this.praise(ids), this.invitationCode)
			},
			async praise(ids) {
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
			collect(ids) {
				console.log(this.isShare, ids);
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
			//跳转
			guanzhu(ids) {
				DownloadMethods(this.isShare, this.guanzhus(ids), this.invitationCode)
			},
			guanzhus(ids) {
				console.log(ids)
				this.postfocus(ids)
			},
			//跳转2
			cancelAttention(ids) {
				DownloadMethods(this.isShare, this.cancelAttentions(ids), this.invitationCode)
			},
			async cancelAttentions(ids) {
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

			// 获取帖子详情
			async getInfo() {
				let submit = {
					pageNum: 1,
					pageSize: 10,
					id: this.ids,
				}
				if (this.isShare) submit.shareStatus = true
				let res = await this.http.get('/app/forum/topic/topicInfo', submit);
				console.log(this.judgeType(res.data.topic.type));
				console.log('帖子详情:', res);
				if (res.code == 200) {

					this.collects = res.data.collect; // 收藏
					this.focus = res.data.focus; // 喜欢
					let userId=uni.getStorageSync("userInfo").id //从本地拿到id与调帖子的id进行对比 把关注隐藏
				
                    if(res.data.topic.userId==userId){
						this.isfocus=false
					}
					res.data.topic.resource = this.strToArray(res.data.topic.resource);

					// 文章
					if (res.data.topic.type == 2) {
						if (this.isJSON(res.data.topic.content)) {
							res.data.topic.content = JSON.parse(res.data.topic.content);
						}
					}
					console.log(res);
					this.messages = res.data.topic
					this.createTime = this.messages.createTime.substring(0,10)
					console.log(this.messages);
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

	.view-reply {
		font-size: 24rpx;
		color: #666666;
		padding: 30rpx 0 !important;

		.view-nickname {
			display: flex;
			align-items: center;
			margin-bottom: 8rpx;

			.view-level {
				display: flex;
				align-items: center;
				margin-left: 20rpx;
				padding: 2rpx 16rpx;
				background: #F34E27;
				border-radius: 999rpx;
				height: 40rpx;

				text {
					margin-left: 10rpx;
					font-size: 18rpx;
					color: #FFFFFF;
				}

				image {
					margin-left: -15rpx;
					width: 31rpx !important;
					height: 37rpx !important;
				}
			}

			.view-name {
				font-size: 28rpx;
				font-family: PingFang SC;
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

	.view-item {
		image {
			width: 100%;
			border-radius: 16rpx;
			margin: 20rpx 0;
		}

	}

	.view-fold {
		color: #4A9AFF;
		font-size: 28rpx;
		padding-top: 16rpx;
		padding-left: 30rpx;
	}

	.view-information {
		margin-top: 100rpx;
		background-color: #FFFFFF;
		padding: 30rpx;

		.view-user {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.view-userNickname {
				display: flex;
				align-items: center;

				.view-pic {
					position: relative;

					.img-avatar {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.img-icon {
						width: 30rpx !important;
						height: 30rpx !important;
						position: absolute;
						bottom: 6rpx;
						right: 0;
					}
				}

				.view-info {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					.text-count {
						margin-left: 20rpx;
					}

					.view-user-name {
						display: flex;
						align-items: center;

						.text-name {
							font-size: 28rpx;
							color: #666666;
							line-height: 61rpx;
						}

						.view-level {
							display: flex;
							align-items: center;
							margin-left: 20rpx;
							padding: 2rpx 16rpx;
							background: #F34E27;
							border-radius: 999rpx;

							text {
								margin-left: 10rpx;
								font-size: 20rpx;
								font-weight: 400;
								color: #FFFFFF;
							}

							image {
								margin-left: -15rpx;
								width: 31rpx;
								height: 37rpx;
							}
						}
					}

					text {
						font-size: 24rpx;
						color: #999999;
						line-height: 41rpx;
					}
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
			display: flex;
			flex-direction: column;
			margin: 30rpx 0 0;

			.img-content {
				width: 100%;
				height: 100%;
				margin-top: 10rpx;
				border-radius: 16rpx;
			}

			.text-title {
				display: block;
				font-size: 36rpx;
				color: #333333;
				line-height: 1.5;
				font-weight: bold;
				margin-bottom: 20rpx;
			}

			.font-content {
				color: #333333;
				line-height: 1.5;
				font-weight: 400 !important;
				font-size: 32rpx !important;
				letter-spacing: 1rpx;
			}

			text {
				font-size: 32rpx;
				color: #333333;
				line-height: 48rpx;
			}

			.video {
				width: 100%;
				margin-top: 20rpx;
				border-radius: 16rpx;
			}

			.view-article {
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: 30rpx;
				line-height: 1.5;
				letter-spacing: 1rpx;

				.view-item {
					image {
						width: 100%;
						border-radius: 16rpx;
						margin: 20rpx 0;
					}

					.text-p {
						letter-spacing: 1rpx;
						line-height: 1.5;
						color: #333333;
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
			border-radius: 999rpx;

			text {
				display: flex;
				align-items: center;
				justify-content: space-around;
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
				}

				text {
					display: flex;
					align-items: center;
					margin-left: 20rpx;
				}
			}

			.view-comment {
				border-top: 1rpx solid #EFEFEF;
				padding: 30rpx 0;

				.view-huifu {
					padding: 16rpx 0 0 30rpx;
				}

				.view-top {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					position: relative;

					.img-icon {
						width: 28rpx;
						height: 28rpx;
						position: absolute;
						bottom: 0;
						right: 0;
					}

					image {
						background-color: #EDEDED;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						margin-right: 12rpx;
					}

					.view-container {

						.view-nickname {
							display: flex;
							align-items: center;
							margin-bottom: 8rpx;

							.view-level {
								display: flex;
								align-items: center;
								margin-left: 20rpx;
								padding: 2rpx 16rpx;
								background: #F34E27;
								border-radius: 999rpx;

								text {
									margin-left: 10rpx;
									font-size: 18rpx;
									color: #FFFFFF;
								}

								image {
									margin-left: -15rpx;
									width: 31rpx;
									height: 37rpx;
								}
							}

							.view-name {
								font-size: 28rpx;
								font-family: PingFang SC;
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
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 98rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
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
						width: 100%;
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
					margin-left: 20rpx;
					// margin-bottom: 30rpx;
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
				// margin-bottom: 30rpx;

				.view-one {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-left: 40rpx;

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
	.aaa{
		width: 20px !important;
		height: 20px !important;

	}
</style>
