<template>
	<view>
		<!-- <view class="view-left-a" @click="isshow()">
			<image src="/static/images/fenxiang.png" mode=""></image>
			<view class="view-name" >
				分享
			</view>
		</view> -->
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()">返回</text> -->
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>代理加盟</text>
			</view>
			<view class="bar-right bare-cell">
				<text @click="isshow()">分享</text>
			</view>
		</view>
		<!-- 分享 -->
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
		<view class="view-content" :style="'background:url('+bg+')'">
			<view class="view-condition">
				<view class="view-top" :style="'background:url('+bgPar+')'">
					<text class="text-title">代理加盟条件</text>
				</view>
				
				<view class="view-version">
					<text>1. 遵守总公司制定的各项规则，在签订《代理经销合同》时，应同时签订《售后服务承诺书》:</text>
					<text>2. 加盟者必须为独立的法人，无论是国营、还是民营企业;</text>
					<text>3. 有一定的社会销售网络，有销售类似产品经验;</text>
					<text>4. 有一定的经济实力和经营管理能力，能完成年代理任务，信誉好;</text>
					<text>5. 对公司产品、文化、经营理念充分认同</text>
					<text>6. 有固定的办公场所或营业场所</text>
				</view>
			</view>
			<swiper class="view-user" vertical="true" :autoplay="true" :interval="5000" :duration="1000">
				<swiper-item class="view-item" v-for="item in scollList">
					<image src="../../static/images/instructorapply2.png" mode=""></image>
					<view class="view-center">
						<view class="view-top">
							<text class="text-name">{{item.name}}</text>
							<text class="text-region">区域：{{item.province}}{{item.city}}</text>
						</view>
						<view class="view-bottom">
							<text>加盟时间：{{item.createTime}}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>

			<view class="view-already">
				<view class="view-top" :style="'background:url('+bgPar+')'">
					<text class="text-title">已经加盟地区</text>
				</view>
				<view class="view-list">
					<scroll-view scroll-y="true" scroll-top="right">
						<view class="view-item">
							<text v-for="list in addressList">{{list.province}}-{{list.city}}-{{list.area}}</text>
						</view>
					</scroll-view>
				</view>

			</view>

			<view class="view-apply">
				<view class="view-top" :style="'background:url('+bgPar+')'">
					<text class="text-title">申请加盟</text>
				</view>
				<view class="view-list">

					<view class="view-item">
						<text class="text-left">姓名</text>
						<input type="text" value="" v-model="params.name" placeholder="请输入申请人姓名" />
					</view>

					<view class="view-item">
						<text class="text-left">性别</text>
						<view class="view-sex">
							<view class="radio-content">
								<view class="radio-content" @click="changeRadio1">
									<view class="radio" :class="radio1 == 1 ? 'radio-default':''">
										<view :class="radio1 == 1 ? 'radio-active':''"></view>
									</view>
									<text>男</text>
								</view>
								<view class="radio-content radio-right" @click="changeRadio2">
									<view class="radio" :class="radio1 == 2 ? 'radio-default':''">
										<view :class="radio1 == 2 ? 'radio-active':''"></view>
									</view>
									<text>女</text>
								</view>
							</view>
						</view>
					</view>

					<view class="view-item">
						<text class="text-left">电话</text>
						<input type="text" value="" v-model="params.phone" placeholder="请输入可联系的电话" />
					</view>

					<view class="view-item">
						<text class="text-left">年龄</text>
						<input type="text" value="" v-model="params.age" placeholder="请输入你的年龄" />
					</view>

					<view class="view-item">
						<text class="text-left">区域</text>
						<view class="view-input" @click="$refs.selectAddress.show()">
							<text class="address-info" v-if="address">{{address}}</text>
							<text class="address-info-placeholder" v-else>请选择所在地区</text>
						</view>
					</view>

					<button class="u-reset-button button-invinte" @click="postJoinInfos">申请加盟</button>
					<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
		import {DownloadMethods} from '@/static/js/configUrl.js'
	export default {
		components: {
			selectAddress
		},
		data() {
			return {
				isShare: false,
				show: false,
				radio1: 1,
				bg: require('@/static/images/bg_agent-joining.png'),
				bgPar: require('@/static/images/bg_participate.png'),
				bgQrc: require('@/static/images/bg_qrcode.png'),
				addressList: [], //地址信息
				scollList: [], //滚动信息
				address: '',
				params: {
					name: '',
					phone: '',
					age: '',
					sex: 1,
					address: '',
					province: '',
					city: '',
					area: '',
					invitationCode:''
				},
			};
		},
		onShow() {
			this.getareaInfo()
			this.postScollInfo()
		},
		onLoad(option) {
			this.invitationCode = option.invitationCode
			this.isShare = option.isShare || false
		
			
		},
		methods: {
			close() {
				this.show = false
				
			},
			open() {
				this.show=true
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
					// href:"http://uniapp.dcloud.io/",
					href:this.shareUrlList.minelUrl({
						
					}),
					title: "代理加盟",
					summary:"活动详情",
					// imageUrl:this.bannerList[0].carouselImgUrl || '',
					imageUrl:'',
					success: function(res) {
						that.getIntegral(); // 转发成功获取积分
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			isshow() {
				// DownloadMethods(this.isShare, this.show = true)
				this.show=true
			},
			
			// 提交信息
			async postJoinInfos() {
				if (!this.params.name) {
					this.$toast('请输入姓名');
					return
				}
				if (!this.params.phone) {
					this.$toast('请输入手机号');
					return
				}
				if (!this.address) {
					this.$toast('请选择区域');
					return
				}
				let res = await this.http.postJson('/app/userPersonalCenter/applicationProxyJoin', this.params);
				if (res.code == 200) {
					this.$toast(res.msg)
					setTimeout(()=> {
						if(this.isShare) {
							this.$toast('报名成功')
						} else {
							uni.switchTab({
								url: '../mine/mine'
							})
						}
						
					}, 500)
				} else {
					// this.$toast(res.msg);
					this.$toast('请去下载')
					DownloadMethods(this.isShare,console.log('11111'),this.invitationCode)
				}
			},
			successSelectAddress(address) { //选择成功回调
				console.log(address)
				if (address.length == 3) {
					this.address = address[0] + '-' + address[1] + '-' + address[2]
					this.params.province = address[0]
					this.params.city = address[1]
					this.params.area = address[2]
					return
				}
				if (address.length == 2) {
					this.address = address[0] + '-' + address[1]
					this.params.province = address[0]
					this.params.city = address[1]
					return
				}
			},
			// 地区信息
			async getareaInfo() {
				let res = await this.http.post('/app/userPersonalCenter/applicationProxyJoinInfoArea', {
					pageSize: 10,
					pageNum: 1
				});
				console.log('###################',res)
				if (res.code == 200) {
					this.addressList = res.rows
				} else {
					this.$toast(res.msg);
				}
			},
			// 滚动信息
			async postScollInfo() {
				
				
				let res = await this.http.post('/app/userPersonalCenter/applicationProxyJoinInfoScroll', {
					pageSize: 10,
					pageNum: 1
				});
				if (res.code == 200) {
					this.scollList = res.rows
				} else {
					this.$toast(res.msg);
				}
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			changeRadio1() {
				this.radio1 = 1;
				this.params.sex = 1
				console.log("男")
			},
			changeRadio2() {
				this.radio1 = 2;
				this.params.sex = 2
				console.log("女")
			},
		}
	}
</script>

<style lang="scss">
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
	.view-left-a {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-right: 74rpx;
		
		image {
			width: 43rpx;
			height: 43rpx;
			margin-bottom: 10rpx;
		}
	}
	/deep/.wrapper {
		top: 0 !important;
		position: fixed !important;
	}

	.view-content {
		margin-top: 40rpx;
		background-size: cover !important;
		padding: 806rpx 36rpx 64rpx 36rpx;

		.button-invinte {
			width: 558rpx;
			height: 82rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: #FFFFFF;
			line-height: 82rpx;
			margin-top: 85rpx;
			background: linear-gradient(0deg, #FE7954 0%, #EB3506 100%);
			border-radius: 41rpx;
		}

		.view-condition {
			box-shadow: 16rpx 19rpx 1rpx #BA7292;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			padding: 65rpx 40rpx;

			.view-top {
				box-shadow: 4rpx 8rpx 1rpx #FFDC7D;
				border-radius: 41rpx;
				margin: -100rpx auto 0;
				width: 562rpx;
				height: 93rpx;
				background-size: cover !important;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.text-title {

					font-size: 40rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			.view-version {
				margin-top: 41rpx;
				display: flex;
				flex-direction: column;

				text {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					line-height: 42rpx;
				}
			}


		}

		.view-user {
			height: 160rpx;
			margin-top: 65rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			padding-left: 30rpx;
			display: flex;
			align-items: center;

			.view-item {
				display: flex;
				align-items: center;

				image {
					border-radius: 50rpx;
					width: 100rpx;
					height: 100rpx;
				}

				.view-center {
					display: flex;
					flex-direction: column;
					margin-left: 19rpx;

					.view-top {
						display: flex;

						text {
							font-size: 32rpx;
							font-weight: 400;
							color: #333333;
							line-height: 42rpx;
						}

						.text-region {
							margin-left: auto;
						}
					}

					.view-bottom {
						margin-top: 18rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 42rpx;
					}
				}

			}

		}


		.view-already {
			box-shadow: 16rpx 19rpx 1rpx #BA7292;
			margin-top: 80rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			padding: 65rpx 40rpx;

			.view-top {
				box-shadow: 4rpx 8rpx 1rpx #FFDC7D;
				border-radius: 41rpx;
				margin: -100rpx auto 0;
				width: 562rpx;
				height: 93rpx;
				background-size: cover !important;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.text-title {

					font-size: 40rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			.view-list {
				height: 200rpx;
				overflow-y: scroll;

				.view-item {
					margin: 41rpx 53rpx 0 40rpx;
					display: flex;

					text {
						margin-bottom: 20rpx;
						font-size: 28rpx;
						color: #333333;
						line-height: 42rpx;
					}

					justify-content: space-between;
					flex-wrap: wrap;
				}

			}


		}

		.view-apply {

			box-shadow: 16rpx 19rpx 1rpx #BA7292;
			margin-top: 80rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			padding: 65rpx 40rpx;

			.view-top {
				box-shadow: 4rpx 8rpx 1rpx #FFDC7D;
				border-radius: 41rpx;
				margin: -100rpx auto 0;
				width: 562rpx;
				height: 93rpx;
				background-size: cover !important;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.text-title {

					font-size: 40rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #FFFFFF;
				}
			}



			.view-list {
				.view-item {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-top: 30rpx;

					.view-sex {
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-left: 30rpx;

						.radio-content {
							height: 40rpx;
							display: flex;
							align-items: center;
						}

						.radio {
							width: 24rpx;
							height: 24rpx;
							border-radius: 50%;
							border: 2rpx solid #CCCCCC;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							margin: 0rpx 26rpx 0rpx 15rpx;
						}

						.radio-active {
							width: 16rpx;
							height: 16rpx;
							border-radius: 50%;
							background-color: #F23A79;
						}

						.radio-default {
							border: 2rpx solid #F23A79;
						}

						.radio-right {
							margin-left: 56rpx;
						}

						// /deep/.u-radio-group {
						// 	.u-radio {
						// 		margin-right: 30rpx;
						// 	}
						// }
						// .img-one {
						// 	width: 18rpx;
						// 	height: 18rpx;
						// }

						// .img-two {
						// 	width: 18rpx;
						// 	height: 18rpx;
						// }

						// .view-one {
						// 	margin-right: 30rpx;

						// 	text {
						// 		margin-left: 15rpx;
						// 	}
						// }

						// /deep/.checkbox {
						// 	border-radius: 50rpx;
						// }
					}

					.text-left {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 6rpx;
					}

					.view-input {
						display: flex;
						align-items: center;
						padding-left: 26rpx;
						width: 499rpx;
						height: 80rpx;
						margin-left: 35rpx;
						font-size: 28rpx;
						font-weight: 400;
						background-color: #F6F6F6;
						border-radius: 10rpx;

						.address-info-placeholder {
							color: grey;
						}
					}

					input {
						font-size: 28rpx;
						padding-left: 30rpx;
						margin-left: 34rpx;
						width: 500rpx;
						height: 80rpx;
						background: #F6F6F6;
						border-radius: 10rpx;
					}
				}
			}
		}
	}
</style>
