<template>
		<view v-if="item.which" class="ice-post">
			<!-- <ForumList :list='[item]'></ForumList> -->
			<view class="view-item" @click="clickgo(item.id,item.userId)">
				<!-- 头像信息	 -->
				<view class="view-time" v-if="item.type!=4">
					<view class="view-pic">
						<image :src="item.headUrl" mode="" @click.stop="uni.navigateTo({
							url:'../personal-home-page/personal-home-page?id='+item.userId
						})"></image>
						<image v-if="item.memberGrade !=null" class="img-icon" src="../../static/images/huiyuan.png"
							mode=""></image>
					</view>

					<view class="view-nickname">

						<view class="view-authentication">
							<text class="text-name">{{item.userName}}</text>

							<view v-if="item.identityType !=null">
								<image src="../../static/images/yirenzheng.png" mode=""></image>
								<text>已认证·{{identityType(item.identityType)}}</text>
							</view>

						</view>

						<text class="text-time">{{item.createTime}}</text>
					</view>

				</view>
				<!-- 内容 -->
				<view class="view-substance">

					<!-- 类型·微头条 -->
					<view class="view-container" v-if="item.type==0">
						<!-- 正文 -->
						<text class="text-paragraph" v-html="item.content"></text>
						<!-- 图片 -->
						<view class="view-img" v-if="item.type==0&&item.resource.length>0">
							<image :src="image" v-for="(image,index) in item.resource" mode="aspectFill"></image>
						</view>
					</view>

					<!-- 类型·短视频 -->
					<view class="view-container" v-if="item.type==1">
						<!-- 正文 -->
						<text class="text-paragraph" v-html="item.content"></text>
						<!-- 视频 -->
						<view class="view-video">
							<image class="video" :src="item.videoCover" mode="heightFix">
							</image>
							<cover-view class="controls-title"></cover-view>
							<view class="view-mask"></view>
							<image class="img-play" src="../../static/images/play.png" mode=""></image>
						</view>
					</view>

					<!-- 类型·文章 -->
					<view class="view-container" v-if="item.type==2">
						<!-- 标题 -->
						<text class="text-title">{{item.title}}</text>
						<!-- <view class="view-img" v-if="item.content.image"> -->
						<!-- <view class="view-imgage" id="setImage" v-for="(image,index) in item.content" v-if="index < 3">
							<image class="setImages" :src="image.image" mode="aspectFill"></image>
						</view> -->
						<view class="view-imgage" v-if="this.image1 != '' ">
							<image class="setImages" :src="image1" mode="aspectFill"></image>
							<image class="setImages" :src="image2" mode="aspectFill"></image>
							<image class="setImages" :src="image3" mode="aspectFill"></image>
						</view>
						<!--  -->
						<view class="uni-padding-wrap" v-if="this.image1 == '' ">
							<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
								<rich-text :nodes="this.strings"></rich-text>
							</view>
						</view>
						<!--  -->
						<!-- 正文 -->
						<text class="text-paragraph" v-if="!item.content.image" v-html="item.content.content"></text>
					</view>

					<!-- 类型·热点 -->
					<view class="view-container" v-if="item.type==4">
						<!-- 标题 -->
						<text class="text-title">{{item.title}}</text>
						<!-- <view class="view-img"> -->
						<view class="view-img">
							<image :src="item.resource[0]" mode="aspectFill"></image>
						</view>
						<!-- 正文 -->
						<text class="text-paragraph" v-if="item.resource.length==0" v-html="item.content"></text>
					</view>

				</view>

				<!-- 底部按钮 -->
				<view class="view-bottom">
					<view class="view-left">
						<text>#{{item.tagName}}</text>
					</view>
					<view class="view-right">
						<view @click.stop="dianzan(item.id)">
							<image
								:src="item.voteStatus?'../../static/images/xihuan.png':'../../static/images/like.png'"
								mode=""></image>
							<text>{{item.voteCount}}</text>
						</view>
						<view>
							<image src="../../static/images/discuss.png" mode=""></image>
							<text>{{item.comment}}</text>
						</view>
						<view>
							<image src="../../static/images/share-2.png" mode=""></image>
						</view>
						<view class="view-delete" @click.stop="clickDeletePost(item.id)" v-if="item.isMe==1">
							<u-icon name="trash" size="21" color="#323233"></u-icon>
						</view>
						<view v-if="configValue==0" class="more" @click.stop="show=true">
							<u-icon name="more-dot-fill"></u-icon>
						</view>
					</view>
				</view>

			</view>
			<u-picker title="举报" :show="show1" :columns="columns" @confirm="confirm" @cancel="show1=false"></u-picker>
			<u-popup :show="show" mode="bottom" @close="show=false">
				<view class="view-side">
					<view @click.stop="()=>{
						show=false;
						show1=true;
					}">
						<image src="../../static/images/jvbao.png" mode=""></image>
						<text>举报</text>
					</view>
					<view @click.stop="()=>{
						show=false;
						uni.showToast({
							title: '屏蔽成功',
							duration: 2000
						});
					}">
						<image src="../../static/images/pingbi.png" mode=""></image>
						<text>屏蔽此条动态</text>
					</view>
					<view @click.stop="()=>{
						show=false;
						uni.showToast({
							title: '屏蔽成功',
							duration: 2000
						});
					}">
						<image src="../../static/images/pingbi.png" mode=""></image>
						<text>屏蔽他人动态</text>
					</view>
				</view>
			</u-popup>
		</view>
		
		
		<!-- 其他列表 -->
		<view v-else class="ice-post">
			<!-- <ForumList :list='[item]'></ForumList> -->
			<view class="view-item" @click="click">
				<!-- 头像信息	 -->
				<view class="view-time" v-if="item.type!=4">
					<view class="view-pic">
						<image :src="item.headUrl" mode="" @click.stop="uni.navigateTo({
							url:'../personal-home-page/personal-home-page?id='+item.userId
						})"></image>
						<image v-if="item.memberGrade !=null" class="img-icon" src="../../static/images/huiyuan.png"
							mode=""></image>
					</view>
		
					<view class="view-nickname">
		
						<view class="view-authentication">
							<text class="text-name">{{item.userName}}</text>
		
							<view v-if="item.identityType !=null">
								<image src="../../static/images/yirenzheng.png" mode=""></image>
								<text>已认证·{{identityType(item.identityType)}}</text>
							</view>
		
						</view>
		
						<text class="text-time">{{item.createTime}}</text>
					</view>
		
				</view>
				<!-- 内容 -->
				<view class="view-substance">
		
					<!-- 类型·微头条 -->
					<view class="view-container" v-if="item.type==0">
						<!-- 正文 -->
						<text class="text-paragraph" v-html="item.content"></text>
						<!-- 图片 -->
						<view class="view-img" v-if="item.type==0&&item.resource.length>0">
							<image :src="image" v-for="(image,index) in item.resource" mode="aspectFill"></image>
						</view>
					</view>
		
					<!-- 类型·短视频 -->
					<view class="view-container" v-if="item.type==1">
						<!-- 正文 -->
						<text class="text-paragraph" v-html="item.content"></text>
						<!-- 视频 -->
						<view class="view-video">
							<image class="video" :src="item.videoCover" mode="heightFix">
							</image>
							<cover-view class="controls-title"></cover-view>
							<view class="view-mask"></view>
							<image class="img-play" src="../../static/images/play.png" mode=""></image>
						</view>
					</view>
		
					<!-- 类型·文章 -->
					<view class="view-container" v-if="item.type==2">
						<!-- 标题 -->
						<text class="text-title">{{item.title}}</text>
						<!-- <view class="view-img" v-if="item.content.image"> -->
						<!-- <view class="view-imgage" id="setImage" v-for="(image,index) in item.content" v-if="index < 3">
							<image class="setImages" :src="image.image" mode="aspectFill"></image>
						</view> -->
						<view class="view-imgage" v-if="this.image1 != '' ">
							<image class="setImages" :src="image1" mode="aspectFill"></image>
							<image class="setImages" :src="image2" mode="aspectFill"></image>
							<image class="setImages" :src="image3" mode="aspectFill"></image>
						</view>
						<!--  -->
						<view class="uni-padding-wrap" v-if="this.image1 == '' ">
							<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
								<rich-text :nodes="this.strings"></rich-text>
							</view>
						</view>
						<!--  -->
						<!-- 正文 -->
						<text class="text-paragraph" v-if="!item.content.image" v-html="item.content.content"></text>
					</view>
		
					<!-- 类型·热点 -->
					<view class="view-container" v-if="item.type==4">
						<!-- 标题 -->
						<text class="text-title">{{item.title}}</text>
						<!-- <view class="view-img"> -->
						<view class="view-img">
							<image :src="item.resource[0]" mode="aspectFill"></image>
						</view>
						<!-- 正文 -->
						<text class="text-paragraph" v-if="item.resource.length==0" v-html="item.content"></text>
					</view>
		
				</view>
		
				<!-- 底部按钮 -->
				<view class="view-bottom">
					<view class="view-left">
						<text>#{{item.tagName}}</text>
					</view>
					<view class="view-right">
						<view @click.stop="dianzan(item.id)">
							<image
								:src="item.voteStatus?'../../static/images/xihuan.png':'../../static/images/like.png'"
								mode=""></image>
							<text>{{item.fabulous}}</text>
						</view>
						<view>
							<image src="../../static/images/discuss.png" mode=""></image>
							<text>{{item.commentCount}}</text>
						</view>
						<view>
							<image src="../../static/images/share-2.png" mode=""></image>
						</view>
						<view class="view-delete" @click.stop="clickDeletePost(item.id)" v-if="item.isMe==1">
							<u-icon name="trash" size="21" color="#323233"></u-icon>
						</view>
						<view v-if="configValue==0" class="more" @click.stop="show=true">
							<u-icon name="more-dot-fill"></u-icon>
						</view>
					</view>
				</view>
		
			</view>
			<u-picker title="举报" :show="show1" :columns="columns" @confirm="confirm" @cancel="show1=false"></u-picker>
			<u-popup :show="show" mode="bottom" @close="show=false">
				<view class="view-side">
					<view @click.stop="()=>{
						show=false;
						show1=true;
					}">
						<image src="../../static/images/jvbao.png" mode=""></image>
						<text>举报</text>
					</view>
					<view @click.stop="()=>{
						show=false;
						uni.showToast({
							title: '屏蔽成功',
							duration: 2000
						});
					}">
						<image src="../../static/images/pingbi.png" mode=""></image>
						<text>屏蔽此条动态</text>
					</view>
					<view @click.stop="()=>{
						show=false;
						uni.showToast({
							title: '屏蔽成功',
							duration: 2000
						});
					}">
						<image src="../../static/images/pingbi.png" mode=""></image>
						<text>屏蔽他人动态</text>
					</view>
				</view>
			</u-popup>
		</view>

</template>

<script>
	import ForumList from "@/components/forumList/forumList.vue"
	export default {
		components: { ForumList },
		name: "ice-post",
		data() {
			return {
				configValue: '',
				nodes: [{
					name: 'div',

				}],
				strings: '',

				show: false,
				image1: '',
				image2: '',
				image3: '',
				show1: false,
				columns: [
					['色情低俗', '政治敏感', '广告', '令人恶心', '违纪违法', '其他']
				]
			};
		},
		props: {
			item: {
				type: Object,
				default: () => {
					return {};
				}
			},
		},
		mounted() {
			this.checkStatus();
			// console.log(2222222222, this.item);
			// console.log(3333333, this.item.content);
			this.getVideoCover(this.item);
			this.videoCtx = uni.createVideoContext('demoVideo')
		},
		methods: {
			getVideoCover(videoCover) {
				var listes = [];
				// 判断为封面图还是内容里面的图片
				if (videoCover.videoCover != "" && videoCover.videoCover != null) {
					let str = videoCover.videoCover.split(",");
					this.image1 = str[0];
					this.image2 = str[1];
					this.image3 = str[2];
				} else {
					// 判断是数组格式还是富文本格式
					if (!Array.isArray(videoCover.content)) {
						console.log(1111111, videoCover);
						this.strings = videoCover.content;
						let srcArr = this.strings.match(/<img\b.*?(?:\>|\/>)/g).map(item => JSON.parse(item.match(
							/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/g)[0].replace('src=', '')))

						this.image1 = srcArr[0];
						this.image2 = srcArr[1];
						this.image3 = srcArr[2];
					} else {
						// for循环拿里面所有的图片
						for (var i = 0; i < videoCover.content.length; i++) {
							if (videoCover.content[i].image != "") {
								listes.push(videoCover.content[i].image);
								this.image1 = listes[0];
								this.image2 = listes[1];
								this.image3 = listes[2];
							}
						}
					}
				}
			},
			confirm(e) {
				console.log(e);
				this.show1 = false;
				uni.showToast({
					title: '举报成功',
					duration: 2000
				});
			},
			async checkStatus() {
				let res = await this.http.post('/app/userHome/systemConfigurationInformation?key=appleLoginIsShowWX');
				if (res.code == 200) {
					this.configValue = res.data.configValue;
				}
			},
			click() {
				console.log(this.item.id)
				// if(this.item.)
				if (this.item.type == 4) {
					uni.navigateTo({
						url: '../hot-details/hot-details?id=' + this.item.id
					})
				} else {
					uni.navigateTo({
						url: '../post-details-article/post-details-article?id=' + this.item.id
					})
				}
			},
			
			// 教育
			clickgo(a, b) {
				console.log(a,b)
				uni.navigateTo({
					url: '../post-details-article/post-details-articleJy?id=' + a + '&targetId=' + b
				})
			},
			// clickgo(){
			// 	console.log(this.item.id)
			// 	uni.navigateTo({
			// 		url: '../post-details-article/post-details-articleJy?id=' + this.item.id + '&targetId=' + this.userId.id
			// 	})
			// },
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

			clickDeletePost(id) {
				this.$emit('clickDelete', id);
			},

			async dianzan(ids) {
				this.$emit('clickPraise', ids);
			},
			play() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-container {}

	.view-imgage {
		height: 180rpx;
		width: 218rpx;
		// 行内元素
		display: inline;
	}

	.setImages {}

	.ice-post {
		padding: 0 30rpx;

		.view-side {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 30rpx;

			>view {
				width: 200rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 20rpx;
				color: #666;
			}

			image {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
			}
		}

		.view-item {
			border-bottom: 1rpx solid #EFEFEF;
			padding: 30rpx 0;

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



	.com-cell-three {
		border-bottom: 1rpx solid rgba(25, 25, 25, 0.02);

		.com-cell-three-top {
			position: relative;
			width: 100%;
			height: 100rpx;
			box-sizing: border-box;
			padding-bottom: 12rpx;

			// border-bottom: 1rpx solid rgba(25, 25, 25, 0.02);
			.header-img {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				overflow: hidden;
				position: absolute;

				image {
					width: 100%;
				}
			}

			.com-user-name {
				position: absolute;
				top: 5rpx;
				left: 120rpx;
				font-size: 32rpx;
				font-family: PingFang-SC-Medium;
				color: #333333;
				display: inline-block;
				width: 300rpx;
				overflow: hidden;
			}

			.com-user-info {
				position: absolute;
				bottom: 15rpx;
				left: 120rpx;
				font-size: 24rpx;
				color: #999999;
				font-family: PingFang-SC-Medium;
			}

			.com-dync-see-num {
				position: absolute;
				width: 180rpx;
				right: 0;
				top: 24rpx;
				display: flex;
				color: #666666;
				font-size: 24rpx;
				font-family: PingFang-SC-Medium;
			}
		}

		.com-cell-three-title {
			margin-top: 10rpx;
			color: #333333;
			font-family: PingFang-SC-Medium;
			font-size: 28rpx;
		}

		.com-cell-three-bottom {
			margin-top: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.com-action-cell {
				display: flex;
				align-items: center;

				.com-action-num {
					margin-left: 10rpx;
					font-size: 28rpx;
				}
			}
		}
	}

	.view-time {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		position: relative;

		.more {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			bottom: 28rpx;
			right: 0;
		}

		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 40rpx;
		}

		.view-nickname {
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;

			.view-authentication {
				display: flex;
				align-items: center;

				view {
					display: flex;
					align-items: center;
					margin-left: 20rpx;
					padding: 0 10rpx 0 16rpx;
					background: #F34E27;
					height: 30rpx;
					border-radius: 999rpx;
					position: relative;

					text {
						margin-left: 10rpx;
						font-size: 20rpx;
						color: #FFFFFF;
					}
				}

				image {
					position: absolute;
					top: 50%;
					left: -10rpx;
					transform: translateY(-50%);
					width: 32rpx;
					height: 38rpx;
				}

			}

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
		display: flex;
		flex-direction: column;

		.text-paragraph {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 5;
			overflow: hidden;
		}

		.text-title {
			display: block;
			font-weight: bold;
			font-size: 36rpx;
			color: #333333;
			margin-bottom: 12rpx;
		}

		.video-img {
			width: 100%;
			height: 400rpx;
		}

		text {
			text-align: left;
			font-size: 32rpx;
			color: #333333;
			letter-spacing: 1rpx;
			line-height: 1.5;
		}

		.view-img {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			flex-wrap: wrap;
		}

		.view-video {
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			background-color: #000000;
			border-radius: 16rpx;
			overflow: hidden;
			margin: 20rpx 0;

			.video {
				margin-top: 30rpx;
				width: 100%;
				height: 400rpx;
			}

			.img-play {
				width: 100rpx;
				height: 100rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 2;
			}

			.view-mask {
				width: 100%;
				height: 100%;
				background-color: #000000;
				opacity: 0.4;
				position: absolute;
				top: 0;
				z-index: 1;
			}
		}


		image {
			width: 215rpx;
			height: 215rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;

			&:nth-child(3n) {
				margin-right: 0;
			}
		}
	}

	.view-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 40rpx;

		.view-left {
			background: #EDEDED;
			border-radius: 999rpx;
			padding: 8rpx 28rpx;
			display: flex;
			align-items: center;

			text {
				font-size: 20rpx;
				color: #666666;
			}
		}

		.view-right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: 26rpx;
			color: #333333;

			.view-delete {
				color: #DC4C40;
			}

			>view {
				display: flex;
				align-items: center;
				margin-left: 30rpx;
			}

			image {
				margin-right: 10rpx;
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
</style>
