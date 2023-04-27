<template>
	
	<view class="comp-interest">
		<!-- 公告 -->
		<!-- <view class="notic-line">
			<view class="notice-icon">
				<image :src="require('@/static/images/notices.png')" mode=""></image>
			</view>
			<view class="notic-text">
				<text v-for="(item,index) in notic">{{ item.announcement }}</text>
			</view>
		</view> -->
	<view v-show="!flag">
		<u-loading-icon></u-loading-icon>
	</view>
		<view  v-show="flag">
			
			<!-- 此处为原代码客服图标  cyl注 -->
			<!-- <view class="view-cart2">
				<image class="image-cart" src="../../static/images/schoolKefu.png" ></image>
			</view> -->
			<!-- 公告 -->
			<view class="bulletin">
				<view style="padding-top: 12rpx;box-sizing: border-box;">
					<image style="width: 38rpx;height: 38rpx;" src="../../static/images/bulletin.png">&nbsp;</image>
				</view>
				<view style="margin-right: 10rpx;">
					<text class="inter-title" direction="column_list">公告</text>
				</view>
				<swiper :autoplay="true" :circular="true" :duration="300" class="swiper" :vertical="true">
					<swiper-item v-for="(list,index) in announcement" :key="list.id" @click="uni.navigateTo({
					url:'../notice-message/notice-message?id='+list.id})">
						<view>{{list.noticeTitle}}</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 详细信息 -->
			<view class="inter-box" v-if="xiangqing">
				<text class="inter-title">学校简介</text>
				<text class="inter-info">{{ xiangqing }}</text>
				<!-- <text class="inter-info">{{ demo.detailedIntroduction }}</text> -->
			</view>
			<!-- 师资力量 -->
			<view class="inter-box" v-if="shizi">
				<text class="inter-title">师资力量</text>
				<text class="inter-info">{{ shizi }}</text>
				<!-- <text class="inter-info">{{ demo.detailedIntroduction }}</text> -->
			</view>
			<!-- 名师展示 -->
			<view class="inter-box" v-if="teachers.length">
				<text class="inter-title">名师展示</text>
				<view class="teacher-list">
					<view class="teacher-cell" v-for="item in teachers" :key="item.id">
						<image :src="item.teacher_url" mode=""></image>
						<view class="teacher_depict">
							<text class="text-line-1">{{item.teacher_name}}</text>
							<view class="text-line-2">{{item.teacher_introduce}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 基地荣誉 -->
			<view class="inter-box" v-if="schoolHonorsImage.length > 0">
				<text class="inter-title">基地荣誉</text>
				<view class="honor-list">
					<view class="honor-cell" v-for="i in schoolHonorsImage" :key="i">
						<image @click="showImg(i)" :src="i" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 教学照片 -->
			<view class="inter-box" v-if="institutionsImage.length > 0">
				<text class="inter-title">教学照片</text>
				<view class="img" v-for="(item,index) in institutionsImage" :key="item">
					<img style="object-fit: cover;" @click="showImg(item,index)" :src="item" alt="">
				</view>
			</view>
			<!-- 报名须知 -->
			<view class="inter-box" v-if="xvzhi">
				<text class="inter-title">报名须知</text>
				<text class="inter-info" v-html="xvzhi"></text>
			</view>
			
			<!-- 底部填充 -->
			<view class="footer-fill"></view>
			<!-- 底部固定 -->
			<view class="footer">
				<view class="view-item" @click="collect">
					<image class="image"
						:src="collects==true?'../../static/images/guanzhu2.png':'../../static/images/guanzhu.png'">
					</image>
					<text class="text-collect">关注</text>
				</view>
				<view class="cell" @click="collectible">
					<!-- <u-icon name="star" size="24"></u-icon>
					<text>收藏</text> -->
					<image class="image"
						:src="attention==true?'../../static/images/collect2.png':'../../static/images/collect1.png'">
					</image>
					<text class="text-collect">收藏</text>
				</view>
				<view class="cell" @click="show = true">
					<u-icon name="share" size="24"></u-icon>
					<text>分享</text>
				</view>
				<view class="btn">
					<u-button text="立即咨询" type="primary" shape="circle"></u-button>
				</view>
			</view>
			
			<u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
				<view class="view-share">
					<text class="view-title">— 分享至 —</text>
					<view class="view-locat">
						<view class="view-item" @click="share(1)">
							<image class="image" src="../../static/images/weixin-2.png"></image>
							<text class="text-name">微信</text>
						</view>
						<view class="view-item" @click="share(2)">
							<image class="image" src="../../static/images/pengyouquan.png"></image>
							<text class="text-name">朋友圈</text>
						</view>
						<view class="view-item" @click="share(3)">
							<image class="image" src="../../static/images/weibo.png"></image>
							<text class="text-name">微博</text>
						</view>
						<view class="view-item" @click="share(4)">
							<image class="image" src="../../static/images/qq.png"></image>
							<text class="text-name">QQ</text>
						</view>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>
<script>
	export default {
		props: {
			flag: {
				type:Boolean,
			},
			info: {
				type: Object,
				default: {},
				required: true,
				validator: function(value) {
					return true
				}
			},
			
		},
		data() {
			return {
				text1:[
					"123654879765465464dsaad56",
					"123654879765465464dsaad56",
					"123654879765465464dsaad56"
				],
				// notice: "接按揭快速导航飞机喀什的咖啡机哈数据库哈世界的繁华喀什觉得好烦黑暗时代JFK哈萨克京东方asdfasdfassd ",
				xiangqing: '',
				shizi: '',
				teachers: [],
				achievement: [],
				imags: [],
				// xvzhi: '',
				attention: '', //收藏
				collects: '', //关注
				show: false,
				val: '',
				shareTypes: 'WXSceneSession',
				notic: {},
				announcement:[]
			};
		},
		computed: {
			institutionsImage() {
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.info)
				if(!this.info.schoolInfo) return []
				if(this.info.schoolInfo&&!this.info.schoolInfo.schoolInfo) return []
				if(!this.info.schoolInfo.schoolInfo.institutionsImage) return []
				return this.info.schoolInfo.schoolInfo.institutionsImage.split(',')
			},
			schoolHonorsImage(){
				if(!this.info.schoolInfo) return []
				if(this.info.schoolInfo&&!this.info.schoolInfo.schoolInfo) return []
				if(!this.info.schoolInfo.schoolInfo.schoolHonorsImage) return []
				return this.info.schoolInfo.schoolInfo.schoolHonorsImage.split(',')
			},
			xvzhi(){
				if(!this.info.instructions) return []
				if(this.info.instructions&&!this.info.instructions.instructions) return []
				return this.info.instructions.instructions
			}
			
		},
		created() {
			setTimeout(() => {
				console.log("组件中接收到的参数", this.info)
				this.teachers = this.info.teacher
				this.xiangqing = this.info.schoolInfo.schoolInfo.detailedIntroduction
				this.shizi = this.info.schoolInfo.schoolInfo.faculty
				this.val = this.info.schoolInfo.schoolInfo.id
				// this.achievement = this.info.schoolInfo.schoolInfo.schoolHonorsImage.split(',')
				// this.imags = this.info.schoolInfo.schoolInfo.backgroundImage.split(',')
				this.notic = this.info.notics
				this.announcement = this.info.announcement
				console.log("接受到的公告", this.announcement);
				// this.xvzhi = this.info.instructions.instructions
				// console.log("1111111111", this.info.notics)
				// console.log("基地荣誉",this.info.schoolInfo.schoolInfo.schoolHonorsImage.split(','))
				// console.log("名师展示",this.info.teacher)
				// console.log("详细介绍",this.info.schoolInfo.schoolInfo.detailedIntroduction)
				// console.log("教学照片",this.info.schoolInfo.schoolInfo.backgroundImage.split(','))
			}, 1000)
		},
		methods: {
			showImg(e, b) {
				uni.previewImage({
					current: b, //预览图片的下标
					urls: [e] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			},
			
			collect() {
				this.getcollect()
			},
			collectible() {
				this.collectt()
			},
			open() {},
			close() {
				this.show = false
			},
			
			//收藏
			async collectt() {
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
				
			//关注
			async getcollect() {
				console.log("id:",this.val)
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
			// 学校介绍
			async getIntroduce() {
				let res = await this.http.get('/app/userHomeNavigation/schoolIntroduceInfo', {
					id: this.val
				});
				if (res.code == 200) {
					this.collects = res.data.collect
					this.attention = res.data.schoolcollect
					console.log('信息信息信息信息', this.introduce)
				} else {
					// this.$toast(res.msg);
				}
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
				console.log(shareType,shareTypes,'2222')
				let that = this;
				uni.share({
					provider: shareType,
					scene: shareTypes,
					type: 0,
					href: "http://47.103.30.184:9227/h5/index.html#/pages/course-details/course-details?id=" + this
						.val + "&typeId=" + this.numbs,
					title: this.info.schoolInfo.schoolInfo.schoolName,
					summary: this.info.schoolInfo.schoolInfo.schoolTitle,
					imageUrl: this.info.schoolInfo.schoolInfo.logoImgUrl,
					success: function(res) {
						that.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	.view-title {
		font-size: 36rpx;
		font-weight: 500;
		color: #333333;
		display: block;
	}

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

	.footer {
		z-index: 2;
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

	.footer-fill {
		height: 120rpx;
		width: 100%;
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
			height: 320rpx;
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

	.teacher-cell {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 33%;
		padding: 0 10rpx;
		position: relative;
		top: -25rpx;
		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.text-line-1 {
		color: #000;
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
		-webkit-box-orient: vertical;
	}
	.text-line-2 {
		color: #666666;
		font-size: 24rpx;
		text-align: center;
		width: 100%;
		line-height: 40rpx;
		// height: 40rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow-wrap:anywhere;
	}

	.comp-interest {
		box-sizing: border-box;
		padding: 0 20rpx;
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
    .bulletin {
		padding-left: 10rpx;
		margin-top: 30rpx;
		width: 100%;
		height: 79.33rpx;
		line-height: 79.33rpx;
		text-align: center;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		.inter-title {
			font-size: 36rpx;
			font-weight: 550;
			color: #000;
			margin-bottom: 20rpx;
		}
		.swiper{
			font-size: 28rpx;
			text-align: left;
			width: 80%;
			height: 100%;
		}
	}
	.inter-box {
		margin-top: 26rpx;
		padding: 27.33rpx 14rpx;
		width: 100%;
		min-height: 100rpx;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #333333 ;
		.inter-title {
			font-size: 36rpx;
			font-weight:bold;
			color: #000;
			margin-bottom: 20rpx;
		}
	}
	.teacher-list {
		overflow-x: auto;
		display: -webkit-box;
		-webkit-overflow-scrolling: touch;
		// margin: 0.5rem 0.5rem;
		height: 300rpx;
		display: flex;
		flex-wrap: nowrap;
		.teacher-cell {
			margin-top: 76rpx;
			background: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33%;
			padding: 0 10rpx;
			position: relative;
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				z-index: 1;
			}
			.teacher_depict {
				width: 100%;
				background-color: #FAFAFA;
				height: 200rpx;
				position: relative;
				top: -30rpx;
				box-sizing: border-box;
				padding-top: 40rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
