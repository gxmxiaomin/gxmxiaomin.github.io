<template>
	<view class="comp-interest">
		<view v-if="interInfo != 0">
			
		
		<!-- 公告 -->
		<view class="notic-line" v-if="false">
			<view class="notice-icon">
				<image :src="require('@/static/images/notices.png')" mode=""></image>
			</view>
			<view class="notic-text">
				<text>{{ notice }}</text>
			</view>
		</view>
		
		<view class="view-cart2">
			<!-- <image class="image-cart" src="../../static/images/schoolKefu.png" mode=""></image> -->
		</view>

		<!-- 详细信息 -->
		<view class="inter-box">
			<text class="inter-title">详细信息</text>
			<text class="inter-info">{{ (interInfo.schoolInfo.schoolInfo||{}).detailedIntroduction }}</text>
			<!-- <text class="inter-info">{{ demo.detailedIntroduction }}</text> -->
		</view>

		<!-- 师资力量 -->
		<view class="inter-box">
			<text class="inter-title">师资力量</text>
			<text class="inter-info">{{ (interInfo.schoolInfo.schoolInfo||{}).faculty }}</text>
		</view>

		<!-- 名师展示 -->
		<view class="inter-box" v-if="this.interInfo.teacher[0]">
			<text class="inter-title">名师展示</text>
			<view v-if="this.interInfo.schoolType == 3 || this.interInfo.schoolType == 5" class="teacher-list3">
				<view class="teacher-cell" v-for="item in interInfo.teacher||[]" :key="item.id">
					<image :src="item.teacher_url" mode=""></image>
					<text class="text-line-1">{{item.teacher_name}}</text>
					<text class="text-line-1">{{item.teacher_introduce}}</text>
				</view>
			</view>

			<view v-else class="teacher-list">
				<view class="teacher-cell" v-for="item in interInfo.teacher||[]" :key="item.id">
					<image :src="item.teacher_url" mode=""></image>
					<text class="text-line-1">{{item.teacher_name}}</text>
					<text class="text-line-1">{{item.teacher_introduce}}</text>
				</view>
			</view>
		</view>

		<!-- 学校荣誉 -->
		<view class="inter-box" v-if="achievement.length > 0">
			<text class="inter-title">学校荣誉</text>
			<view class="honor-list">
				<view class="honor-cell" v-for="i in achievement" :key="i.id">
					<image @click="showImg(i,index)" :src="i" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 校园环境 -->
		<view class="inter-box">
			<text v-if="this.interInfo.schoolType == 5" class="inter-title">教育环境</text>
			<text v-else class="inter-title">机构照片</text>
			<view class="img">
				<img @click="showImg((interInfo.schoolInfo.schoolInfo||{}).backgroundImage)"
					:src="(interInfo.schoolInfo.schoolInfo||{}).backgroundImage" alt="">
			</view>

			<view class="view-education" v-if="mechanism.length > 0">
				<text class="view-title"></text>
				<u-swiper :list="mechanism" :indicator="true" indicatorMode="dot"
					indicatorInactiveColor="rgba(255, 255, 255, 0.4)" height="350rpx"></u-swiper>
			</view>
		</view>

		<!-- 校园风采 -->
		<view class="inter-box">
			<text v-if="this.interInfo.schoolType == 5" class="inter-title">教育环境</text>
			<text v-else class="inter-title">校园风采</text>
			<view class="img">
				<img @click="showImg((interInfo.schoolInfo.schoolInfo||{}).schoolIcon)"
					:src="(interInfo.schoolInfo.schoolInfo||{}).schoolIcon" alt="">
			</view>
		</view>

		<!-- 入学要求 -->
		<view class="inter-box" v-if="false">
			<text class="inter-title">校园风采</text>
			<view class="ruxue">
				<text></text>
			</view>
		</view>

		<!-- 底部填充 -->
		<view class="footer-fill"></view>
		<!-- 底部固定 -->
		<!-- <view class="footer">
			<view class="cell" @click="DownloadMethods(isShare, getcollect,invitationCode)">
				<u-icon name="heart-fill" size="24" color="#f73812" v-if="collect"></u-icon>
				<u-icon name="heart" size="24" v-else></u-icon> -->
				<!-- 	<image class="image"
					:src="collect?'../../static/images/guanzhu2.png':'../../static/images/guanzhu.png'">
				</image> -->
			<!-- 	<text>关注</text>
			</view>
			<view class="cell" @click="DownloadMethods(isShare, collectible,invitationCode)"> -->
				<!-- <image class="image"
					:src="schoolcollect?'../../static/images/collect2.png':'../../static/images/collect1.png'">
				</image> -->
				<!-- <u-icon name="star-fill" size="24" color="#e6c715" v-if="schoolcollect"></u-icon>
				<u-icon name="star" size="24" v-else></u-icon>

				<text>收藏</text>
			</view>
			<view class="cell" @click="DownloadMethods(isShare, show=true,invitationCode)">
				<u-icon name="share" size="24"></u-icon>
				<text>分享</text>
			</view>
			<view class="btn" @click="go()">
				<u-button v-if="this.interInfo.schoolType == 4 || this.interInfo.schoolType == 3" text="年级详情"
					type="primary" shape="circle"></u-button>
				<u-button v-else-if="this.interInfo.schoolType == 2" text="特色课程" type="primary" shape="circle">
				</u-button>
				<u-button v-else-if="this.interInfo.schoolType == 1" text="班级介绍" type="primary" shape="circle"> -->
				<!-- <u-button v-else-if="this.interInfo.schoolType == 1" text="缴纳学费" type="primary" shape="circle"> -->
			<!-- 	</u-button>
				<u-button v-else text="院系详情" type="primary" shape="circle"></u-button>
			</view>
		</view> -->

		<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
			<view class="view-share">
				<text class="view-title">— 分享至 —</text>
				<view class="view-locat">
					<view class="view-item" @click="share(1)">
						<image class="image" src="@/static/images/weixin-2.png"></image>
						<text class="text-name">微信</text>
					</view>
					<view class="view-item" @click="share(2)">
						<image class="image" src="@/static/images/pengyouquan.png"></image>
						<text class="text-name">朋友圈</text>
					</view>
					<view class="view-item" @click="share(3)">
						<image class="image" src="@/static/images/weibo.png"></image>
						<text class="text-name">微博</text>
					</view>
					<view class="view-item" @click="share(4)">
						<image class="image" src="@/static/images/qq.png"></image>
						<text class="text-name">QQ</text>
					</view>
				</view>
			</view>
		</u-popup>
		</view>
		<view v-else>
			12222
		</view>
	</view>
</template>

<script>
	export default {
		props: ['interInfo', 'sharUrl', 'isShare',"invitationCode"],
		data() {
			return {
				notice: "接按揭快速导航飞机喀什的咖啡机哈数据库哈世界的繁华喀什觉得好烦黑暗时代JFK哈萨克京东方asdfasdfassd ",
				show: false,
				attention: '', //关注
				collects: '', //收藏
				schoolTypeId: '', // 学校类型
				shareTypes: 'WXSceneSession',
				introduce: {},
				val: ''
			}
		},
		created() {
			setTimeout(() => {
				console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", this.interInfo.schoolInfo.schoolInfo.institutionsImage.split(','))
				console.log(this.interInfo)
				this.val = this.interInfo.schoolId
			}, 50)
		},
		mounted() {

			this.hackReset = false;
			this.$nextTick(() => {
				this.hackReset = true;
			})

		},

		computed: {
			mechanism() {
				if (!this.interInfo.schoolInfo) return []
				if (!this.interInfo.schoolInfo.schoolInfo) return []
				if (this.interInfo.schoolInfo.schoolInfo.institutionsImage) return []
				return this.interInfo.schoolInfo.schoolInfo.institutionsImage.split(',')
			},
			achievement() {
				if (!this.interInfo.schoolInfo) return []
				if (!this.interInfo.schoolInfo.schoolInfo) return []
				if(this.interInfo.schoolInfo.schoolInfo.institutionsImage) return []
				return this.interInfo.schoolInfo.schoolInfo.schoolHonorsImage.split(',')
			},
			schoolcollect() {
				if (!this.interInfo.schoolInfo) return false
				return this.interInfo.schoolInfo.schoolcollect || false
			},
			collect() {
				if (!this.interInfo.schoolInfo) return false
				return this.interInfo.schoolInfo.collect || false
			}
		},

		methods: {
			go() {
				if (this.interInfo.schoolType == 3 || this.interInfo.schoolType == 4) {
					if (this.interInfo.grade == '' || this.interInfo.grade == '小学') {
						uni.navigateTo({
							url: '../grade-details/grade-details?id=' + this.val
						})
					} else if (this.interInfo.grade == '大学') {
						uni.navigateTo({
							url: '../grade-details/grade-details2'
						})
					}
					return uni.navigateTo({
						url: '../grade-details/grade-details?id=' + this.val
					})
				} else if(this.interInfo.schoolType == 5){
					uni.navigateTo({
						url: '../grade-details/grade-details2?id=' + this.interInfo.schoolId
					})
				}
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
					href: that.sharUrl,
					title: that.interInfo.schoolInfo.schoolInfo.schoolName || "学校名字",
					summary: that.interInfo.schoolInfo.schoolInfo.schoolName || "学校名字",
					imageUrl: that.interInfo.schoolInfo.schoolInfo.logoImgUrl,
					success: function(res) {
						that.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
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
					parentId: this.interInfo.schoolId,
					typeId: 2,
				});
				if (res.code == 200) {
					this.$toast(res.msg);
					this.$emit("upDateInfo")
				} else {
					this.$toast(res.msg);
				}
			},

			//收藏 收藏 收藏
			async collectt() {
				let res = await this.http.post('/schoolCollect/selectByschoolIdAndUserId', {
					schoolId: this.interInfo.schoolId,
					typeId: 2,
				});
				console.log(res)
				if (res.code == 200) {
					this.$toast(res.msg);
					this.$emit("upDateInfo")
				} else {
					this.$toast(res.msg);
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

	.ruxue {}

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
			margin-bottom: 20rpx;

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
	
	.view-cart2 {
		position: fixed;
		right: 0;
		bottom: 540rpx;
	
		image {
			width: 100rpx;
			height: 100rpx;
		}
	}


	.text-line-1 {
		text-align: center;
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
		overflow-x: auto;
		display: -webkit-box;
		-webkit-overflow-scrolling: touch;
		margin: 0.5rem 0.5rem;
		min-height: 220rpx;
		// background-color: #06238d;
		display: flex;
		flex-wrap: nowrap;

		.teacher-cell {
			background: #f1f1f1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33%;
			padding: 0 10rpx;
			margin: 0 10rpx;
			border-radius: 10rpx;
			position: relative;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
		}
	}

	// schoolTypeId == 3
	.teacher-list3 {
		overflow-x: auto;
		display: -webkit-box;
		-webkit-overflow-scrolling: touch;
		margin: 0.5rem 0.5rem;
		min-height: 300rpx;
		// background-color: #06238d;
		display: flex;
		flex-wrap: nowrap;

		.teacher-cell {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33%;
			padding: 0 10rpx;
			position: relative;

			image {
				width: 200rpx;
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
			margin-right: 2rpx;
			width: 60%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
