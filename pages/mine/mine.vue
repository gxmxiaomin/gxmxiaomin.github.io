<template>
	<view class="view-mine">
		<view class="view-top" :style="'background: url('+bg+');padding-top:'+statusBarHeight+'rpx'">
			<view class="view-icon">
				<image @click="jump" src="../../static/images/setting.png"></image>
				<!-- <text v-if="update" class="hongdian"></text>
				<image @tap="uni.navigateTo({
					url:'../service/service'
				})" src="../../static/images/kefu.png"></image> -->
				<!-- <image @tap="makePhone" src="../../static/images/kefu.png"></image> -->
			</view>
			<view class="view-user">

				<view class="view-avatar">
					<image v-if="userInfo.head_url" :src="userInfo.head_url" class="image-avatar" mode="" @click="uni.navigateTo({
						url:'../personal-data/personal-data'
					})"></image>
					<image v-else src="../../static/images/instructorapply2.png" class="image-avatar" mode=""></image>
					<image :src="userInfo.icon!=null?userInfo.icon:'../../static/images/user-info.png'"
						class="image-user-info"></image>
				</view>
				<view class="view-center">
					<view class="view-person" @click="personalhomepage">个人主页 ></view>
					<view class="view-nickname">
						<text class="text-nickname">{{userInfo.nick_name}}</text>
						<view v-if="shows">
							<view @click="gotiao" style="font-size: 20px;color: #fff;font-weight: 400;">
								登录/注册
							</view>
						</view>
						<view v-else>
							<image src="../../static/images/auth_fail.png" class="image-auth"></image>
							<text v-if="userInfo.isCertification==false" class="text-auth">未认证</text>
							<text v-else class="text-auth">已认证·
								<text v-if="userInfo.Identity_type==0">用户</text>
								<text v-if="userInfo.Identity_type==1">学校</text>
								<text v-if="userInfo.Identity_type==2">商家</text>
								<text v-if="userInfo.Identity_type==3">心理咨询师</text>
								<text v-if="userInfo.Identity_type==4">律师</text>
								<text v-if="userInfo.Identity_type==5">医生</text>
								<text v-if="userInfo.Identity_type==6">自媒体</text>
								<text v-if="userInfo.Identity_type==7">学校(机构)</text>
								<text v-if="userInfo.Identity_type==8">商家(网店)</text>
							</text>
						</view>
					</view>

					<!-- <text class="text-id">ID:{{userInfo.user_name}}</text> -->
				</view>
			</view>

			<view class="view-data">
				<!-- 展示隐藏 -->
				<view v-if="false" class="view-item" @click="uni.navigateTo({
					url:'../my-wallet/my-wallet'
				})">
					<text class="text-data">{{userInfo.now_money || 0}}</text>
					<text class="text-label">余额(元)</text>
				</view>

				<view class="view-item" @click="starnote">
					<text class="text-data">{{userInfo.score || 0}}</text>
					<text class="text-label">星币</text>
				</view>
				<view class="view-item" @click="shoucang">
					<text class="text-data">{{userInfo.collectCount || 0}}</text>
					<text class="text-label">收藏</text>
				</view>

				<view class="view-item" @click="attentions">
					<text class="text-data">{{userInfo.focusOnCount || 0}}</text>
					<text class="text-label">关注</text>
				</view>
			</view>

		</view>

		<view v-if="true" class="view-vip" :style="'background: url('+bgVip+');'">
			<!-- 	@click="uni.navigateTo({
				url:'../vip-center/vip-center'
			})" -->
			<view>
				<image src="../../static/images/vip.png" class="image-vip"></image>
				<text class="text-name">会员中心</text>
				<view class="text-level">|
					当前等级：<text>{{userInfo.member_grade==null ? '普通用户':userInfo.member_grade}}</text>
				</view>
			</view>
			<!-- <view class="u-reset-button button-read">立即查看 ></view> -->
		</view>

		<!-- 暂时不展示 -->
		<view class="view-order" v-if="false">
			<view class="view-item" @click="uni.navigateTo({
				url:'../my-order/my-order?index=0'
			})">
				<image src="../../static/images/order1.png"></image>
				<text>全部订单</text>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				url:'../my-order/my-order?index=1'
			})">
				<image src="../../static/images/order2.png"></image>
				<text>待付款</text>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				url:'../my-order/my-order?index=2'
			})">
				<image src="../../static/images/order3.png"></image>
				<text>待发货</text>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				url:'../my-order/my-order?index=3'
			})">
				<image src="../../static/images/order4.png"></image>
				<text>待收货</text>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				url:'../after-sale-order/after-sale-order'
			})">
				<image src="../../static/images/order5.png"></image>
				<text>售后</text>
			</view>
		</view>

		<view class="view-module">
			<text class="text-title">我的服务</text>
			<view class="view-grid">
				<view class="view-item" @click="ketiao">
					<image src="../../static/images/service1.png"></image>
					<text>我的课程</text>
				</view>
				<view v-if="false" class="view-item" @click="uni.navigateTo({
					url:'../my-wallet/my-wallet'
				})">
					<image src="../../static/images/service2.png"></image>
					<text>钱包</text>
				</view>
				<view class="view-item" @click="qianda">
					<image src="../../static/images/qiandao.png"></image>
					<text>签到</text>
				</view>
				<view v-if="false" class="view-item" @click="uni.navigateTo({
					url:'../market-address/market-address'
				})">
					<image src="../../static/images/service4.png"></image>
					<text>收货地址</text>
				</view>
				<view v-if="false" class="view-item" @click="uni.navigateTo({
					url:'../coupon/coupon'
				})">
					<image src="../../static/images/service5.png"></image>
					<text>优惠券</text>
				</view>
				<view class="view-item" @click="ziliao">
					<image src="../../static/images/service6.png"></image>
					<text>学生资料</text>
				</view>
				<view v-if="false" class="view-item" @click="uni.navigateTo({
					url:'../honor/honor'
				})">
					<image src="../../static/images/service7.png"></image>
					<text>我的荣誉</text>
				</view>
				<view class="view-item" @click="shoucang">
					<image src="../../static/images/service8.png"></image>
					<text>收藏</text>
				</view>
				<view class="view-item" @click="guazhu">
					<image src="../../static/images/service9.png"></image>
					<text>关注</text>
				</view>
				<view class="view-item" @click="userse">
					<image src="../../static/images/service10.png"></image>
					<text>个人资料</text>
				</view>
				<view class="view-item" @click="myActivity">
					<image src="../../static/images/activity.png"></image>
					<text>我的活动</text>
				</view>
			</view>
		</view>


		<view class="view-module" v-if="false">
			<text class="text-title">加入我们</text>
			<view class="view-grid">
				<view class="view-item" @click="merchants">
					<image src="../../static/images/share1.png"></image>
					<text>商家入驻</text>
				</view>
				<view class="view-item" @click="institutions">
					<image src="../../static/images/share2.png"></image>
					<text>学校入驻</text>
				</view>
				<view class="view-item" @click="consultant">
					<image src="../../static/images/share3.png"></image>
					<text>咨询师申请</text>
				</view>
				<view class="view-item" @click="uni.navigateTo({
					url:'../agent-joining/agent-joining'
				})">
					<image src="../../static/images/share4.png"></image>
					<text>代理加盟</text>
				</view>
				<view class="view-item" @click="uni.navigateTo({
					url:'../extension-center/extension-center'
				})">
					<image src="../../static/images/share5.png"></image>
					<text>推广中心</text>
				</view>
				<view class="view-item" @click="uni.navigateTo({
					url:'../ad-cooperation/ad-cooperation'
				})">
					<image src="../../static/images/share6.png"></image>
					<text>广告合作</text>
				</view>
			</view>
		</view>

		<view class="view-module">
			<text class="text-title">其他功能</text>
			<view class="view-grid">
				<view class="view-item" @click="uni.navigateTo({
					url:'../complaint-suggest/complaint-suggest'
				})">
					<image src="../../static/images/other1.png"></image>
					<text>投诉建议</text>
				</view>
				<view class="view-item" @click="uni.navigateTo({
					url:'../about-us/about-us'
				})">
					<image src="../../static/images/other2.png"></image>
					<text>关于我们</text>
				</view>
				<view v-if="false" class="view-item" @click="uni.navigateTo({
					url:'../private-space/private-space'
				})">
					<image src="../../static/images/other3.png"></image>
					<text>私密空间</text>
				</view>
			</view>
		</view>

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shows: false,
				phone: '110010',
				bg: require('@/static/images/bg_mine.png'),
				bgVip: require('@/static/images/bg_vip.png'),
				userInfo: {},
				is_certification: '',
				user: '',
				update: false
			};
		},

		onLoad() {
			// this.shows = false

			let token = uni.getStorageSync('token')
			if (token === '') {
				this.shows = true
			} else if (token != '') {
				this.shows = false
			}


			this.messageShowTip.showTextMessage(this)
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		async onShow() {
			this.user = uni.getStorageSync('userInfo').id || 0
			if (this.user != 0) {
				await this.queryUserInfo();
			} else {
				this.shows = true
			}
			this.checkUpdates()
		},
		methods: {
			myActivity(){
				if(uni.getStorageSync('token')== ''){
					uni.navigateTo({
						url: '../login/login'
					})
				}else{
					uni.navigateTo({
						url: '/pages/activityList/activityList'
					})
				}
			},
			//跳转
			gotiao() {
				uni.navigateTo({
					url: "../login/login"
				})
				this.shows = false
			},
			//课程跳转
			ketiao() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
					this.shows = false
				} else {
					uni.navigateTo({
						url: '/pages/Allschools/Allschools'
					})
				}

			},
			//签到
			qianda() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../report/report'
					})
				}
				this.shows = false
			},
			//关注
			attentions() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../follow/follow'
					})
				}
			},
			//个人主页
			personalhomepage() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../user-home-page/user-home-page'
					})
				}
			},
			//星币
			starnote() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../starCoin/starCoin'
					})
				}
			},
			//学生资料
			ziliao() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../student-info/student-info'
					})
				}
				this.shows = false
			},
			//收藏
			shoucang() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../collection/collection'
					})
				}
				this.shows = false

			},
			//关注
			guazhu() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../follow/follow'
					})
				}
				this.shows = false

			},
			//个人资料
			userse() {
				if (uni.getStorageSync('token') === '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../personal-data/personal-data'
					})
				}
				this.shows = false
			},
			// 检查更新
			async checkUpdates() {
				// console.log(uni.getSystemInfoSync().appWgtVersion)
				let res = await this.http.get('/app/userHome/checkUpdate', {
					name: 'userApp',
					version: uni.getSystemInfoSync().appWgtVersion
				});
				console.log('检查更新', res);
				this.update = res.data.update
				console.log('是否更新', this.update);
			},

			jump() {
				// 	if (this.user != 0) {
				uni.navigateTo({
					url: '../setting/setting'
				})
				// }
			},
			merchants() {
				// 跳转外部链接h5
				// #ifdef H5
				window.location.href = 'https://www.pgyer.com/RPf8';
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL('https://www.pgyer.com/RPf8') //不需要拼接
				// plus.runtime.openURL(`http://${jumpUrl}`)//需要拼接
				// #endif
			},
			institutions() {
				// 跳转外部链接h5
				// #ifdef H5
				window.location.href = 'https://www.pgyer.com/xyR7';
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL('https://www.pgyer.com/xyR7') //不需要拼接
				// plus.runtime.openURL(`http://${jumpUrl}`)//需要拼接
				// #endif
			},
			consultant() {
				// 跳转外部链接h5
				// #ifdef H5
				window.location.href = 'https://www.pgyer.com/b3BH';
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL('https://www.pgyer.com/b3BH') //不需要拼接
				// plus.runtime.openURL(`http://${jumpUrl}`)//需要拼接
				// #endif
			},
			makePhone() {
				// 导入Activity、Intent类
				var Intent = plus.android.importClass("android.content.Intent");
				var Uri = plus.android.importClass("android.net.Uri");
				// 获取主Activity对象的实例
				var main = plus.android.runtimeMainActivity();
				// 创建Intent
				var uri = Uri.parse("tel:" + this.phone); // 这里可修改电话号码
				var call = new Intent("android.intent.action.CALL", uri);
				// 调用startActivity方法拨打电话
				main.startActivity(call);
			},

			// 查询用户信息
			async queryUserInfo() {
				let res = await this.http.get('/app/userHome/userInfo');
				console.log(res);
				if (res.code == 200) {
					this.userInfo = res.data;
				} else {
					// this.$toast(res.msg);
				}
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-mine {
		padding-bottom: 50rpx;
	}

	.view-top {
		display: flex;
		flex-direction: column;
		height: 530rpx;
		background-size: cover !important;

		.view-icon {
			margin-top: 20rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			padding-right: 28rpx;

			image {
				width: 48rpx;
				margin-left: 43rpx;
				height: 48rpx;
			}

			.hongdian {
				display: inline-block;
				width: 18rpx;
				height: 18rpx;
				background: red;
				border-radius: 50%;
				position: absolute;
				right: 120rpx;
			}
		}

		.view-user {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-left: 30rpx;
			margin-top: 24rpx;

			.view-avatar {
				width: 140rpx;
				height: 140rpx;
				position: relative;
				border-radius: 50%;
				border: 4rpx solid #ffffff;

				.image-avatar {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}

				.image-user-info {
					width: 29rpx;
					height: 29rpx;
					position: absolute;
					right: 0;
					bottom: 0;
				}
			}

			.view-center {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
				align-items: flex-start;
				position: relative;

				.view-person {
					position: absolute;
					right: 0rpx;
					top: 55%;
					width: 197rpx;
					height: 60rpx;
					background: #2B4CB7;
					border-radius: 30rpx 0px 0px 30rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}

				.view-nickname {
					display: flex;
					flex-direction: row;
					align-items: center;
					letter-spacing: 1rpx;

					.text-nickname {
						font-size: 36rpx;
						font-weight: 500;
						color: #FFFFFF;
					}

					.image-auth {
						width: 31rpx;
						height: 37rpx;
						margin-left: 6rpx;
					}

					.text-auths {
						padding: 0 20rpx;
						height: 36rpx;
						line-height: 36rpx;
						background: #F34E27;
						border-radius: 14rpx;
						font-size: 20rpx;
						font-weight: 400;
						color: #FFFFFF;
						margin-left: -20rpx;
					}

					.text-auth {
						padding: 0 20rpx 0 26rpx;
						height: 36rpx;
						line-height: 36rpx;
						background: #F34E27;
						border-radius: 999rpx;
						font-size: 20rpx;
						font-weight: 400;
						color: #FFFFFF;
						margin-left: -22rpx;
					}
				}

				.text-id {
					height: 40rpx;
					line-height: 40rpx;
					background: #7EA8E2;
					border-radius: 20rpx;
					padding: 0 25rpx;
					font-size: 24rpx;
					margin-top: 20rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.7);
					letter-spacing: 1rpx;
				}
			}
		}

		.view-data {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 40rpx;

			.view-item {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;
				align-items: center;

				.text-data {
					font-size: 36rpx;
					font-weight: bold;
					color: #FFFFFF;
				}

				.text-label {
					margin-top: 5rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.6);
				}
			}
		}
	}


	.view-vip {
		margin: auto;
		width: 690rpx;
		height: 100rpx;
		margin-top: -50rpx;
		background-size: cover !important;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;

		>view {
			display: flex;
			align-items: center;
		}

		.image-vip {
			width: 67rpx;
			height: 67rpx;
		}

		.text-name {
			font-size: 32rpx;
			font-weight: 500;
			color: #674E30;
			margin-left: 15rpx;
		}

		.text-level {
			margin-left: 10rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #B07D3F;
		}

		.button-read {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 155rpx;
			height: 55rpx;
			background: linear-gradient(0deg, #D1B289 0%, #C7A273 100%);
			border-radius: 999rpx;
			font-size: 24rpx;
			color: #674E30;
			line-height: 55rpx;

		}

	}

	.view-order {
		margin: auto;
		margin-top: 30rpx;
		width: 690rpx;
		height: 147rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.view-item {
			flex-grow: 1;
			flex-shrink: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 43rpx;
				height: 43rpx;
				margin-bottom: 15rpx;
			}

			text {
				font-size: 24rpx;
				font-weight: 400;
				color: #666666;
			}
		}


	}

	.view-module {
		margin: auto;
		margin-top: 30rpx;
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 30rpx 20rpx;
		display: flex;
		flex-direction: column;

		.text-title {
			font-size: 36rpx;
			font-weight: 500;
			color: #333333;
		}

		.view-grid {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.view-item {
				width: 20%;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 30rpx;

				image {
					width: 43rpx;
					height: 43rpx;
				}

				text {
					margin-top: 15rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
				}
			}
		}
	}
</style>