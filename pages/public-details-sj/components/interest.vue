<template>
	<view class="comp-interest">
		<!-- 公告 -->
		<view class="notic-line">
			<view class="notice-icon">
				<image :src="require('@/static/images/notices.png')" mode=""></image>
			</view>
			<view class="notic-text">
				<text>{{ notice }}</text>
			</view>
		</view>

		<!-- 详细信息 -->
		<view class="inter-box">
			<text class="inter-title">详细信息</text>
			<text class="inter-info">{{ interInfo.schoolInfo.detailedIntroduction }}</text>
			<!-- <text class="inter-info">{{ demo.detailedIntroduction }}</text> -->
		</view>

		<!-- 师资力量 -->
		<view class="inter-box">
			<text class="inter-title">师资力量</text>
			<text class="inter-info">{{ interInfo.schoolInfo.teacherResources }}</text>
		</view>

		<!-- 教官展示 -->
		<view class="inter-box">
			<text class="inter-title">教官展示</text>
			<view class="teacher-list">
				<view class="teacher-cell" v-for="(item,index) in info" :key="index">
					<image :src="item.teacher_url" mode=""></image>
					<text class="text-line-1">{{item.teacher_name}}</text>
					<text class="text-line-1">{{item.teacher_introduce}}</text>
				</view>
			</view>
		</view>

		<!-- 基地成果 -->
		<view class="inter-box">
			<text class="inter-title">基地成果</text>
			<view class="honor-list">
				<view class="honor-cell" v-for="(i,index) in base" :key="index">
					<image @click="showImg(i,index)" :src="i" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 基地环境 -->
		<view class="inter-box">
			<text class="inter-title">基地环境</text>
			<!-- <view class="img">
				<img @click="showImg(interInfo.schoolInfo.environment)" :src="interInfo.schoolInfo.environment"
					alt="">
			</view>
 -->
			<view class="view-education">
				<text class="view-title"></text>
				<u-swiper :list="mechanism" :indicator="true" indicatorMode="dot"
					indicatorInactiveColor="rgba(255, 255, 255, 0.4)" height="350rpx"></u-swiper>
			</view>
		</view>

		<!-- 底部填充 -->
		<view class="footer-fill"></view>
		<!-- 底部固定 -->
		<view class="footer">
			<view class="view-item" @click="collect">
				<image class="image"
					:src="attention==true?'../../static/images/guanzhu2.png':'../../static/images/guanzhu.png'">
				</image>
				<text class="text-collect">关注</text>
			</view>
			<view class="cell" @click="collectible">
				<!-- <u-icon name="star" size="24"></u-icon> -->
				<image class="image"
					:src="collects==true?'../../static/images/collect2.png':'../../static/images/collect1.png'">
				</image>
				<text>收藏</text>
			</view>
			<!-- <view class="cell" @click="show = true"> -->
			<view class="cell" @click="Goshare()">
				<u-icon name="share" size="24"></u-icon>
				<text>分享</text>
			</view>
			<view class="btn" @click="gogogo">
				<u-button text="活动介绍" type="primary" shape="circle"></u-button>
			</view>
		</view>

		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
			<view class="view-share">
				<text class="view-title">— 分享至 —</text>
				<view class="view-locat">
					<view class="view-item" @click="share(1)">
						<image class="image" src="../../../static/images/weixin-2.png"></image>
						<text class="text-name">微信</text>
					</view>
					<view class="view-item" @click="share(2)">
						<image class="image" src="../../../static/images/pengyouquan.png"></image>
						<text class="text-name">朋友圈</text>
					</view>
					<view class="view-item" @click="share(3)">
						<image class="image" src="../../../static/images/weibo.png"></image>
						<text class="text-name">微博</text>
					</view>
					<view class="view-item" @click="share(4)">
						<image class="image" src="../../../static/images/qq.png"></image>
						<text class="text-name">QQ</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		DownloadMethods
	} from '@/static/js/configUrl.js';
	export default {
		props: ['interInfo'],
		data() {
			return {
				//名师展示
				info: [],
				achievement: [],
				base: [],
				mechanism:[],
				notice: "接按揭快速导航飞机喀什的咖啡机哈数据库哈世界的繁华喀什觉得好烦黑暗时代JFK哈萨克京东方asdfasdfassd ",
				// demo:{}
				val: '',
				show: false,
				attention: '', //关注
				collects: '', //收藏
				numbs: 0,
				schoolTypeId: '', // 学校类型
				shareTypes: 'WXSceneSession',
				introduce: {},

			}
		},
		mounted() {

			this.hackReset = false;
			this.$nextTick(() => {
				this.hackReset = true;
			})

		},
		created() {
			setTimeout(() => {
				console.log("组件中接收到的参数", this.interInfo)
				this.info = this.interInfo.teacher
				this.base = this.interInfo.schoolInfo.achievements.split(',')
				this.mechanism = this.interInfo.schoolInfo.environment.split(',')
				this.val = this.interInfo.id
			}, 50)
		},
		async mounted() {
			// await this.getIntroduce()
		},
		methods: {
			// Goshare(){
			// 	DownloadMethods(this.isShare||false,this.show=true)

			// },
			gogogo(){
				console.log('活动介绍')
			},
			
			showImg(e, b) {
				uni.previewImage({
					current: b, //预览图片的下标
					urls: [e] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			},
			// 分享
			share(val) {
				switch (val) {
					case 1:
						// uni.share({
						// 	provider: "weixin",
						// 	scene: "WXSceneSession",
						// 	type: 0,
						// 	href: "http://uniapp.dcloud.io/",
						// 	title: "uni-app分享",
						// 	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
						// 	imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
						// 	success: function (res) {
						// 		console.log("success:" + JSON.stringify(res));
						// 	},
						// 	fail: function (err) {
						// 		console.log("fail:" + JSON.stringify(err));
						// 	}
						// });
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
					href: this.sharUrl,
					title: this.introduce.schoolName,
					summary: this.schoolName || "学校",
					imageUrl: this.introduce.logoImgUrl,
					success: function(res) {
						that.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}

					// href: this.sharUrl,
					// title: this.introduce.schoolName,
					// summary: this.introduce.schoolTitle,
					// imageUrl: this.introduce.logoImgUrl,
					// success: function(res) {
					// 	that.getIntegral(); // 转发成功获取积分
					// 	console.log("success:" + JSON.stringify(res));
					// },
					// fail: function(err) {
					// 	console.log("fail:" + JSON.stringify(err));
					// }
				});
			},

			collect() {
				DownloadMethods(this.isShare || false, this.getcollect())

			},

			//收藏 收藏 收藏




			collectible() {
				this.collectt()
			},

			open() {},
			close() {
				this.show = false
			},

			//关注
			async getcollect() {
				let res = await this.http.post('/app/userHomeNavigation/collectOrUnCollect', {
					parentId: this.val,
					typeId: 2,
				});
				if (res.code == 200) {
					this.$toast(res.msg);
					this.getIntroduce()
				} else {
					this.$toast(res.msg);
				}
			},
			collectt() {
				DownloadMethods(this.isShare || false, this.collectts())
			},

			//收藏 收藏 收藏
			async collectts() {
				let res = await this.http.post('/schoolCollect/selectByschoolIdAndUserId', {
					schoolId: this.val,
					typeId: 2,
				});
				console.log(res)
				if (res.code == 200) {
					this.$toast(res.msg);
					this.getIntroduce()
				} else {
					this.$toast(res.msg);
				}
			},

			// 学校介绍
			async getIntroduce() {
				let res = await this.http.get('/app/userHomeNavigation/schoolIntroduceInfo', {
					id: this.val
				});
				if (res.code == 200) {
					console.log(res)
					// this.collectList = res.data.collect
					this.introduce = res.data.schoolInfo || {}
					this.mechanism = res.data.schoolInfo.institutionsImage.split(',')
					// this.teacherList = res.data.teachersInfoList
					this.schoolTypeId = res.data.schoolInfo.schoolTypeId
					this.collects = res.data.schoolcollect
					this.attention = res.data.collect
					console.log('信息信息信息信息', this.introduce)
				} else {
					// this.$toast(res.msg);
				}
			},

		},
	}
</script>

<style lang="scss" scoped>
	.view-share {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 750rpx;
		height: 409rpx;
		padding: 45rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.view-locat {
			display: flex;
			align-items: center;
			width: 100%;
			margin-top: 86rpx;

			.view-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 86rpx;
					height: 86rpx;
				}

				.text-name {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					margin-top: 14rpx;
				}
			}
		}
	}

	.view-education {
		margin-top: 20rpx;

		/deep/.u-swiper {
			margin-top: 20rpx;
		}

		.video-contents {
			display: none !important;
		}

		.video-content {
			width: 100%;
			height: 390rpx;
			display: block;
			margin-top: 30rpx;
		}

		.view-title {
			font-size: 36rpx;
			font-weight: 500;
			color: #333333;
			display: block;
		}
	}


	.comp-interest {
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.notic-line {
		margin-top: 30rpx;
		display: flex;
		align-content: center;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		background-color: #fff;
		border-radius: 30rpx;

		.notice-icon {
			width: 100rpx;
			height: 30rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.notic-text {
			flex: 1;
			height: 50rpx;
			line-height: 50rpx;
			padding-left: 20rpx;
			flex-wrap: nowrap;
			overflow: hidden;
			font-size: 28rpx;
			color: #8d8d8d;
		}
	}


	.text-line-1 {
		width: 100%;
		line-height: 40rpx;
		height: 40rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical
	}

	.inter-box {
		margin-top: 30rpx;
		padding: 20rpx;
		width: 100%;
		min-height: 100rpx;
		background-color: #fff;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #707070;

		.inter-title {
			font-size: 36rpx;
			font-weight: 900;
			color: #000;
			margin-bottom: 20rpx;
		}
	}

	.teacher-list {
		min-height: 300rpx;
		// background-color: #06238d;
		// display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		display: -webkit-box;
		-webkit-overflow-scrolling: touch;
		// margin: 0.5rem 0.5rem;

		.teacher-cell {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33%;
			padding: 0 10rpx;
			position: relative;
			margin: 0 10rpx;

			image {
				width: 220rpx;
				height: 200rpx;
			}
		}
	}

	.honor-list {
		width: 100%;
		min-height: 300rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.honor-cell {
			padding: 10rpx 0;
			width: 200rpx;
			min-height: 150rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 100%;
				height: 150rpx;
			}
		}
	}

	.img {
		width: 100%;

		// padding: 0 10rpx;
		image {
			width: 100%;
			height: 280rpx;
		}

		img {
			border-radius: 10rpx;
			width: 100%;
			height: auto;
		}
	}

	.footer-fill {
		height: 120rpx;
		width: 100%;
	}

	.footer {
		.view-item {
			display: flex;
			padding: 0 14rpx;
			align-items: center;
			flex-direction: column;
		}

		.image {
			width: 38rpx;
			height: 38rpx;
			margin-top: 10rpx;
		}

		.text-collect {
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;
			display: block;
			text-align: center;
			margin-top: 15rpx;
		}

		width: 100vw;
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;

		.cell {
			width: 100rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			text {
				font-size: 24rpx;
				color: #838383;
			}
		}

		.btn {
			margin-right: 30rpx;
			margin-top: 20rpx;
			width: 60%;
			height: 60%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
