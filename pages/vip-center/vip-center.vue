<template>
	<view>
		<view class="view-top" :style="'background: url('+bg+');'">
			<image :src="userInfo.head_url" class="image-avatar"></image>
			<view class="view-center">
				<text class="text-nickname">{{userInfo.nick_name}}</text>

				<view class="view-vip">
					<image src="../../static/images/vip_gold.png" mode=""></image>
					<text>{{userInfo.member_grade==null?'普通用户':userInfo.member_grade}}</text>
				</view>
			</view>

		<!--	<view class="view-line">

			</view>

			 <view class="view-right" @click="uni.navigateTo({
				url:'../my-direct-fans-list/my-direct-fans-list'
			})">
				<text class="text-fans-count">{{vipinfo.directFans}}</text>
				<text class="text-label">直推粉丝</text>
			</view> -->
		</view>

		<view class="view-level">
			<view class="view-item" v-for="(item,index) in vipLevel" @click="tabbar(index,item.configValue)">
				<text class="text-title" :class="show==index?'text-titles':''">{{item.memberGradeName}}</text>
				<view class="view-line" v-if="show==index"></view>
			</view>
		</view>
		<view class="view-item" v-for="(item,index) in vipLevel" v-if="show==index">
			<view class="view-module">
				<text class="text-title">尊享特权</text>
				<view class="view-grid">
					<view class="view-item" v-for="(list,index) in item.memberPrivileges" @click="panduan(list.name)">
						<u-popup :show="popupsd" v-if="padds==list.name" mode="center" @open="open">
							<view>
								<text v-html="list.content"></text>
							</view>
						</u-popup>
						<image :src="list.icon"></image>
						<text>{{list.name}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="view-module">
				<text class="text-title">{{platformAgreement.protocolNameZh}}</text>
				<view class="view-details" v-html="platformAgreement.protocolContent"></view>
			</view> -->
			<button class="u-reset-button button-open" @click="clear(item.memberPrice,item.id)"
				v-if="item.level>userInfo.level">{{item.memberLabel}}</button>
			<button class="u-reset-button button-open" v-if="item.level<=userInfo.level">已开通</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				vipLevel: [],
				vipinfo: {},
				show: 0,
				popupsd: false,
				popup: false,
				bg: require('@/static/images/bg_vip_2.png'),
				tabIndex: 0,
				vipName: '白银会员',
				padds: '',
				platformAgreement: '',
			};
		},
		async mounted() {
			await this.getInfo()
			await this.queryUserInfo()
		},
		onShow() {
			this.getVipLevel()
		},
		methods: {
			// 会员等级晋升
			async getVipLevel() {
				let res = await this.http.post('/app/userHome/platformAgreement', {
					protocolType: 'membershipLevelPromotion'
				});
				console.log('会员等级晋升', res);
				if (res.code == 200) {
					this.platformAgreement = res.data;
				} else {
					this.$toast(res.msg);
				}
			},

			panduan(ssd) {
				console.log(ssd)
				this.padds = ssd
				this.popupsd = !this.popupsd
				console.log(this.padds)
			},
			clear(val, ids) {
				uni.navigateTo({
					url: '../openMember/openMember?titalPrice=' + val + '&transactionId=' + ids
				})
			},
			tabbar(ids, val) {
				this.show = ids
			},
			click(item) {
				console.log('item', item);
				this.vipName = item.name
			},
			async queryUserInfo() {
				let res = await this.http.get('/app/userHome/userInfo', {});
				if (res.code == 200) {
					this.userInfo = res.data;
				} else {
					this.$toast(res.msg);
				}
			},
			async getInfo() {
				let res = await this.http.get('/app/userHome/memberCentreInfo', {});
				console.log('会员信息:', res);
				if (res.code == 200) {
					this.vipLevel = res.data.memberTypes
					this.vipinfo = res.data.userLevelInfo
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

	/deep/.u-popup__content {
		width: 70%;
		padding: 40rpx;
		border-radius: 30rpx;
	}

	.view-level {
		display: flex;
		justify-content: space-around;
		padding: 20rpx 0px;

		.view-item {
			padding: 0 30rpx;

			.text-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
			}

			.text-titles {
				color: #4A9AFF !important;
			}

			.view-line {
				display: block;
				margin: 0 auto;
				width: 40rpx;
				height: 8rpx;
				margin-top: 10rpx;
				background: #4A9AFF;
				border-radius: 4rpx;
			}
		}
	}

	.view-top {
		height: 265rpx;
		background-size: cover !important;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 36rpx;

		.image-avatar {
			width: 113rpx;
			height: 113rpx;
			background: #FFFFFF;
			border-radius: 50%;
			margin-right: 25rpx;
		}

		.view-center {
			flex-grow: 1;
			flex-shrink: 1;
			display: flex;
			flex-direction: column;

			.text-nickname {
				font-size: 36rpx;
				font-weight: bold;
				color: #FFFFFF;
			}

			.view-vip {
				margin-top: 15rpx;
				width: 185rpx;
				height: 40rpx;
				background: linear-gradient(90deg, #E5D0B0 0%, #DDC19B 100%);
				border-radius: 20rpx;
				line-height: 40rpx;

				image {
					width: 39rpx;
					height: 26rpx;
					margin-left: 13rpx;
				}

				text {
					font-size: 24rpx;
					font-weight: bold;
					color: #674E30;
					margin-left: 10rpx;
				}
			}
		}

		.view-line {
			width: 1px;
			height: 48rpx;
			background: #EFEFEF;
		}

		.view-right {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-left: 40rpx;

			.text-fans-count {
				font-size: 40rpx;
				font-weight: bold;
				color: #FFFFFF;
			}

			.text-label {
				margin-top: 10rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}

	/deep/.u-tabs {
		border-radius: 20rpx 20rpx 0px 0px;
		margin-top: -20rpx;
		background-color: #fff;
	}

	.view-module {
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: auto;
		padding-bottom: 30rpx;
		display: flex;
		flex-direction: column;

		.text-title {
			margin-left: 30rpx;
			margin-top: 30rpx;
			font-size: 36rpx;
			font-weight: 500;
			color: #333333;
		}

		.view-grid {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.view-item {
				margin-top: 30rpx;
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 89rpx;
					height: 89rpx;
					margin-bottom: 20rpx;
				}

				text {
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
				}
			}
		}

		.view-details {
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			line-height: 42rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 24rpx;
		}
	}

	.button-open {
		margin: auto;
		margin-top: 200rpx;
		width: 630rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: #E8AA3C;
		border-radius: 44rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
