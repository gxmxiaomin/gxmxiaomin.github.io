<template>
	<view class="com-forum">
		<view class="com-default" v-show="list.length < 1">
			<text>暂无内容</text>
		</view>

		<!-- <view class="com-list-cell" v-for="(item, index) in list" :key="index" @click="gogogo(item.id,item.userId,item.texts)">
			只有两张封面
			<view class="com-cell-one" v-if="(item.videoCover||'').split(',').length == 2 || item.texts != 2">
				<view class="com-cell-one-title">
					<text>{{item.title}}</text>
				</view>
				<image :src="item.videoCover.split(',')[0]" mode=""></image>
				<u-icon v-if="item.texts != 2" name="play-right-fill" color="#fff" class="video-icon" size="36"></u-icon>
				<view class="com-cell-one-bottom">
					<text>每日经济新闻</text>
					<text style="margin-left: 10px;">{{item.comment}}评论</text>
					<text style="margin-left: 10px;">{{setTime(item.createTime)}}</text>
				</view>

				<view v-if="item.userId == userId" class="com-action-cell-0" @tap.stop="del(item.id)">
					<u-icon name="trash" size="20"></u-icon>
				</view>
			</view>
		
			一张封面
			<view class="com-cell-two" v-if="item.videoCover != '' && (item.videoCover||'').split(',').length==1 && item.texts == 2">
				<view class="com-cell-two-title">
					<text>{{item.title}}</text>
				</view>
				<view class="img">
	
					<img :src="item.videoCover" alt="">
				</view>
				<view class="com-cell-two-bottom">
					<text>每日经济新闻</text>
					<text style="margin-left: 20rpx;">{{item.comment}}评论</text>
					<text style="margin-left: 20rpx;">{{setTime(item.createTime)}}</text>
				</view>

				<view v-if="item.userId == userId" class="com-action-cell-1" @tap.stop="del(item.id)">
					<u-icon name="trash" size="20"></u-icon>
				</view>
			</view>
			<view style="height:30rpx; width:200rpx;"></view>
			没有封面的
			<view class="com-cell-three" v-if="item.videoCover == '' || item.videoCover==null && item.texts == 2">
				<view class="com-cell-three-top">
					<view class="header-img">
					
						<img :src="item.headUrl" alt="">
					</view>
					<text class="com-user-name">{{item.nickName}}</text>
					<view class="com-user-info">
						<text>{{setTime(item.createTime)}}</text>
						<text style="margin-left: 20rpx;">{{item.city}}</text>
					</view>
					<view class="com-dync-see-num">
						<u-icon name="eye" size="18"></u-icon>
						<text style="margin-left: 20rpx;">{{item.browse}}</text>
					</view>
				</view>
				<view class="com-cell-three-title">
					<text>{{item.title}}</text>
				</view>
				<view class="com-cell-three-bottom">
					<view class="com-action-cell">
						<u-icon name="share-square" size="20"></u-icon>
						<text class="com-action-num"> {{item.forward}} </text>
					</view>
					<view class="com-action-cell">
						<u-icon name="star" size="20" v-if="item.show == null"></u-icon>
						<u-icon name="star-fill" color='#ddb821' size="20" v-else></u-icon>
						<text class="com-action-num"> {{item.collection}} </text>
					</view>
					<view class="com-action-cell">
						<u-icon name="more-circle" size="20"></u-icon>
						<text class="com-action-num"> {{item.comment}} </text>
					</view>
					<view class="com-action-cell">
						<u-icon name="thumb-up" size="20" v-if="item.dian == null"></u-icon>
						<u-icon name="thumb-up-fill" size="20" color='#ddb821' v-else></u-icon>
						<text class="com-action-num"> {{item.fabulous}} </text>
					</view>

					<view v-if="item.userId == userId" class="com-action-cell" @tap.stop="del(item.id)">
						<u-icon name="trash" size="20"></u-icon>
					</view>
				</view>
			</view>
			三张封面
			<view class="com-cell-four" v-if="(item.videoCover||'').split(',').length >= 3 && item.texts == 2">
				<view class="com-cell-four-title">
					<text>{{ item.title }}</text>
				</view>
				<view class="com-cell-four-imgList">
					<view class="com-cell-four-img" v-for="(imgurl, imgIndex) in item.videoCover.split(',').slice(0,3)"
						:key="imgIndex" @click.stop="$showImg(item.videoCover.split(','), imgurl)">
						<img :src="imgurl" alt="">
					</view>
				</view>

				<view v-if="item.userId == userId" class="com-action-cell-0" @tap.stop="del(item.id)">
					<u-icon name="trash" size="20"></u-icon>
				</view>
			</view>
		</view> -->
		<view class="luntan_list" v-for="(item,index) in list">
			<view class="luntan_list_header">
				<view class="header_img">
					<image :src="item.headUrl"></image>
				</view>
				<view class="header_text">
					<view class="header_text_user">
						<!-- 用户名-->
						<text>{{item.nickName}}</text>
					</view>
					<view class="header_text_time">
						<text style="margin-right: 30rpx;display: inline-block;
    margin-bottom: 6px;">{{'发表于'+timerss(item.createTime)}}</text>
						<text class="froms">{{"来自"+item.city}}</text>
					</view>
				</view>
				<view class="header_look">
					<image src="../../static/images/look.png" style="width: 35rpx;height: 35rpx;"></image>
					<text style="position: relative;top: -8rpx;margin-left: 8rpx;">{{item.browse}}</text>
				</view>
			</view>
			<view class="luntan_list_content" @click="gogogo(item.id,item.userId,item.texts)">
				<view :style="item.videoCover? 'width:460rpx' : 'width:98%'"><text>{{item.title}}</text></view>
				<view v-if="item.videoCover">
					<image :src="images(item.videoCover)" style="height: 145rpx;width: 206rpx;"></image>
				</view>
			</view>
			<view class="luntan_list_floot">
				<view class="floot_praise" @click="isshow(item)">
					<!-- 分享 -->
					<image src="../../static/images/fenxiang_1.png"></image>
				</view>
				<view class="floot_praise" @click="shoucang(index,item.id)">
					<image src="../../static/images/shoucang.png" v-if="item.shou ==0"></image>
					<image src="../../static/images/shoucang_1.png" v-if="item.shou == 1"></image>
					<text>{{item.collection}}</text>
				</view>
				<view class="floot_praise" @click="gogogo(item.id,item.userId,item.texts)">
					<image src="../../static/images/pinglun.png"></image>
					<text>{{item.comment}}</text>
				</view>
				<view class="floot_praise" @click="dianzan(index,item.id)">
					<image src="../../static/images/dianzan.png" v-if="item.dian == 0"></image>
					<image src="../../static/images/dianzai_1.png" v-if="item.dian == 1"></image>
					<text>{{item.fabulous}}</text>
				</view>
			</view>
			<view class="luntan_list_comment" v-if="item.comment > 0">
				<view class="comment_list">
					<view v-for="(list,index) in item.muSchoolDiscusses" style="margin-bottom: 10rpx;">
						<text class="comment_list_user">{{list.userName}}:</text>
						<text class="comment_list_info">{{list.info}}</text>
					</view>
					<text class="comment_list_user"
						@click="gogogo(item.id,item.userId,item.texts)">点击查看{{item.comment}}条回复</text>
				</view>
			</view>
		</view>
		<u-popup :show="show" @close="close = show = false" @open="console.log('open')" :round="10" mode="bottom">
			<view class="view-content-d">
				<view class="view-top">
					— 分享至 —
				</view>
				<view class="view-bottom">
					<view class="view-one" @click="shares(1)">
						<image class="image" src="../../static/images/weixin-2.png"></image>
						<text class="view-name">微信</text>
					</view>
					<view class="view-one" @click="shares(2)">
						<image class="image" src="../../static/images/pengyouquan.png"></image>
						<text class="view-name">朋友圈</text>
					</view>
					<view class="view-one" @click="shares(3)">
						<image class="image" src="../../static/images/weibo.png"></image>
						<text class="view-name">微博</text>
					</view>
					<view class="view-one" @click="shares(4)">
						<image class="image" src="../../static/images/qq.png"></image>
						<text class="view-name">QQ</text>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 现在论坛总数total返回79，实际只有77,已经修复 -->
		<view v-if="list.length < total">
			<u-loading-icon></u-loading-icon>
		</view>
		<view class="bottom-line" v-if="list.length == total">
			<text>----没有更多了---</text>
		</view>
	</view>
</template>

<script>
	import {
		DownloadMethods
	} from '@/static/js/configUrl.js';
	export default {
		name: "forumParams",
		props: {
			flag: {
				type: Boolean,
			},
			list: {
				type: Array,
				default: [],
				required: true,
				validator: function(value) {
					return Array.isArray(value)
				}
			},
			total: {
				type: Number,
			}
		},
		data() {
			return {
				id: 0,
				title: '',
				imageUrl: '',
				show: false, //分享控制
				collect: false, // 收藏控制
				comment: false, //评论控制
				praise: false, //点赞控制
				id: '',
				userId: '',
				imgUrl: ['https://img2.baidu.com/it/u=4134684418,1778896974&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500'],
				curUrl: 'https://img2.baidu.com/it/u=4134684418,1778896974&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500',
				currentTime: ""
			};
		},
		created() {
			console.log("------------------list------需要渲染的数据", this.list);
			this.currentTime = new Date().getTime()
			this.userId = uni.getStorageSync('userInfo').id
		},
		methods: {
			async shoucang(index, id) {
				const res = await this.http.post('/app/School/insertForumCollection', {
					id: id
				})
				console.log("shoucang", res);
				if (res.code == 200) {
					this.$emit("shoucang", index)
				}


			},
			async dianzan(index, id) {
				const res = await this.http.get('/app/School/like', {
					id: id
				})
				if (res.code == 200) {
					this.$emit("dianzan", index)
				}
			},
			//分享功能
			isshow(item) {
				console.log(item);
				this.show = true,
					this.title = item.title
				this.id = item.id
				this.targetId = item.userId
				this.imageUrl = item.videoCover
			},
			shares(val) {
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
			//封装分享
			fenxiang(shareType, shareTypes) {

				uni.share({
					provider: shareType,
					scene: shareTypes,
					type: 0,
					title: this.title,
					href: "http://h5.muxingchen.com/index.html#/pages/fourm-school/fourm-school?invitationCode=25323&id=" +
						this.id + "&targetId=" + this.targetId,
					summary: this.title,
					imageUrl: this.imageUrl ||
						'https://img0.baidu.com/it/u=2725915437,1236608227&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
					success: function(res) {
						// 转发成功获取积分
						this.shareConfirm()
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// 对论坛列表渲染的时间格式化
			timerss(text) {
				let res = ""
				const arr = ["年", "月", "日"]
				text.split(" ")[0].split("-").forEach((item, i) => {
					res += item + arr[i]
				})
				return res + '\xa0' + '\xa0' + text.split(" ")[1]
			},
			//对论坛图片的处理
			images(url) {
				let imageUrl = url.split(',')[0]
				console.log("url", url, "---------------------url");
				console.log("imageUrl", imageUrl, "-----imageUrl");
				return imageUrl
			},
			//删除
			del(d) {

				this.d = d

				uni.showModal({
					title: '确认删除',
					content: '确认要删除该项吗？',
					success: (res) => {
						if (res.confirm) {

							this.dele()
						} else {

						}
					}
				})

			},
			async dele() {
				const res = await this.http.post('/app/School/deleteArticleByIds', {
					id: this.d
				})

				uni.showToast({
					title: '删除成功',
					icon: 'success', //将值设置为 success 或者 ''
					duration: 2000 //持续时间为 2秒
				})
			},
			setTime(time) {
				let dt = new Date(time)
				const y = dt.getFullYear()
				const m = this.padZero(dt.getMonth() + 1)
				const d = this.padZero(dt.getDate())

				const hh = this.padZero(dt.getHours())
				const mm = this.padZero(dt.getMinutes())
				const ss = this.padZero(dt.getSeconds())

				if (this.currentTime - dt.getTime() > 3600 * 24) {
					return `${y}-${m}-${d}`
				} else {
					return `${m}-${d} ${hh}:${mm}`
				}
			},

			padZero(str) {
				return str > 9 ? str : '0' + str
			},

			gogogo(a, b, c) {
				if (c != 2) {
					uni.navigateTo({
						url: '../playVideo/playVideoSchool?id=' + a + '&targetId=' + b
					})
				} else {
					uni.navigateTo({
						url: '../post-details-article/post-details-articleJy?id=' + a + '&targetId=' + b
					})
				}
				// uni.navigateTo({
				// 	url: '../../pages/post-details-article/post-details-articleJy?id=' + a + '&targetId=' + b
				// })
				this.id = a
				this.addHistory()

			},
			async addHistory() {
				const res = await this.http.get('/shcool/muSchoolHistory/insertHistory', {
					id: this.id,
					userId: this.userId
				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	.com-forum {
		background-color: #fff;
		margin: 20rpx;
		border-radius: 20rpx;

		.luntan_list {
			border-bottom: 1px solid #F1F1F1;
			padding: 20rpx 12.67rpx;
			box-sizing: border-box;

			.luntan_list_header {

				display: flex;
				justify-content: space-around;
				align-items: center;

				.header_img {
					width: 96rpx;
					height: 96rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.header_text {
					width: 500rpx;
					height: 60rpx;

					.header_text_user {
						// width: 96rpx;
						height: 30rpx;
						color: #4A9AFF;
						font-size: 32rpx;
						font-weight: 500;
						line-height: 21rpx;
					}

					.header_text_time {
						margin-top: 12rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #A1A1A1;
						line-height: 21rpx;

						.froms {
							display: inline-block;
							margin-bottom: 5px;
						}
					}
				}

				.header_look {
					transform: scale(0.9);
					display: inline-block;
					text-align: center;
					position: relative;
					top: -20rpx;
					font-size: 24rpx;
					right: 30rpx
				}
			}

			.luntan_list_content {
				margin-top: 20rpx;
				height: 145rpx;
				font-size: 30rpx;
				font-weight: 500;
				display: flex;
				justify-content: space-around;
			}

			.luntan_list_floot {
				margin-top: 40rpx;
				display: flex;
				justify-content: space-around;
				font-size: 28rpx;
				margin-bottom: 28.67rpx;

				.floot_praise {
					width: 86.67rpx;
					height: 34rpx;

					image {
						width: 34rpx;
						height: 100%;
						margin-right: 10rpx;
					}

					text {
						position: relative;
						top: -5rpx;
					}
				}
			}

			.luntan_list_comment {
				margin: 0 auto;
				width: 648rpx;

				background: #F1F1F1;
				border-radius: 7rpx;
				padding: 20rpx 11.33rpx;

				.comment_list {
					font-size: 26rpx;
					font-weight: 500;

					.comment_list_user {
						color: #4A9AFF;
						margin-right: 20rpx;
					}

					.comment_list_info {}
				}
			}
		}
	}

	// 分享弹出层
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


	.com-list-cell {
		position: relative;
		padding: 26rpx 20rpx;
		border-bottom: 1rpx solid rgba(25, 25, 25, 0.1);
	}

	.com-default {
		width: 100%;
		min-height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(130, 130, 130, 0.8);
		font-size: 36rpx;
	}

	.bottom-line {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: rgba(190, 190, 190, 0.8);
	}

	.com-cell-one {
		width: 100%;

		.com-cell-one-title {
			overflow: hidden;
			letter-spacing: 1rpx;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			-webkit-box-orient: vertical;
			font-size: 32rpx;
			font-weight: bold;
			font-family: PingFang-SC-Bold;
			color: #333333;
		}

		image {
			width: 100%;
			margin-top: 10rpx;
		}

		.com-cell-one-bottom {
			margin-top: 20rpx;
			display: flex;
			width: 100%;
			color: #666666;
			font-size: 24rpx;
			font-family: PingFang-SC-Medium;
		}

		.com-action-cell-0 {
			position: relative;
			margin-left: 90%;
		}

		.video-icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.com-cell-two {
		width: 100%;
		height: 200rpx;
		padding: 25rpx 20rpx;
		position: relative;

		.com-cell-two-title {
			width: 410rpx;
			position: absolute;
			top: 25rpx;
			left: 0;
			font-size: 30rpx;
			color: #333333;
			font-family: PingFang-SC-Bold;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			-webkit-box-orient: vertical;
		}

		.img {
			position: absolute;
			right: 0;
			width: 224rpx;
			height: 150rpx;
			border-radius: 10rpx;
			overflow: hidden;

			image {
				width: 100%;
			}

			img {
				// width: auto;
				// height: 100%;
				width: 100%;
				height: auto;
			}
		}

		.com-cell-two-bottom {
			width: 410rpx;
			display: flex;
			position: absolute;
			bottom: 20rpx;
			left: 0;
			font-size: 24rpx;
			color: #666666;
			font-family: PingFang-SC-Medium;
		}

		.com-action-cell-1 {
			position: relative;
			top: 180rpx;
			margin-left: 90%;
		}
	}

	.com-cell-three {
		.com-cell-three-top {
			position: relative;
			width: 100%;
			height: 100rpx;
			box-sizing: border-box;
			padding-bottom: 12rpx;
			border-bottom: 1rpx solid rgba(25, 25, 25, 0.02);

			.header-img {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				overflow: hidden;
				position: absolute;

				image {
					width: 100%;
				}

				img {
					width: 100%;
					height: auto;
				}
			}

			.com-user-name {
				position: absolute;
				top: 5rpx;
				left: 120rpx;
				font-size: 32rpx;
				font-family: PingFang-SC-Medium;
				color: #333333;
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
			margin-top: 20rpx;
			color: #333333;
			font-family: PingFang-SC-Medium;
			font-size: 32rpx;
			font-weight: bold;
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

	.com-cell-four {
		width: 100%;
		position: relative;

		.com-cell-four-title {
			font-size: 32rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
			font-family: PingFang-SC-Bold;
			color: #333333;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			-webkit-box-orient: vertical;
		}

		.com-cell-four-imgList {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-around;

			.com-cell-four-img {
				width: 226rpx;
				height: 226rpx;
				border-radius: 10rpx;
				overflow: hidden;

				img {
					height: 100%;
					width: auto;
				}

				image {
					height: 100%;
					width: 100%;
				}
			}
		}

		.com-action-cell-0 {
			position: relative;
			margin-left: 90%;
		}
	}
</style>
