<template>
	<view class="view-content">
		<ice-statusbar :color="scrollTop<200?'rgba(0,0,0,0)':'#FFFFFF'"></ice-statusbar>
		<ice-navbar bgColor="rgba(0,0,0,0)" height="0rpx">
			<view class="view-nav" v-if="scrollTop<200">
				<image class="image1" src="@/static/images/31fanhui1.png" mode="" @click="uni.navigateBack({
				
			})"></image>

			</view>
			<view class="view-nav" v-else style="background-color: #FFFFFF;">
				<image class="image1" src="@/static/images/left.png" mode="" @click="uni.navigateBack({
				
			})"></image>

			</view>
		</ice-navbar>
		<view class="view-content-a" :style="'margin-top:-'+uni.getSystemInfoSync().statusBarHeight+'px;'">
			<view class="view-one">
				<image class="image-b" :src="info.headerImg" mode=""></image>
				<view class="view-right">
					<view class="view-top">
						<view class="view-name">
							{{info.name}}
						</view>
						<view class="view-grade">
							Lv.{{(info.grade/1).toFixed(1)}}
						</view>
					</view>
					<view class="view-bottom">
						<image class="image-c" src="/static/images/details.png" mode=""></image>
						<view class="">
							{{info.userAddress}}
						</view>
					</view>
				</view>
			</view>
			<view class="view-two">
				<view class="view-information">
					<view class="view-top">
						咨询人数
					</view>
					<view class="view-bottom">
						{{info.count}}人
					</view>
				</view>
				<view class="view-division">

				</view>
				<view class="view-information">
					<view class="view-top">
						咨询时间
					</view>
					<view class="view-bottom">
						{{info.timeCount}}分钟
					</view>
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-name">
				个人介绍
			</view>
			<view class="view-introduce">
				{{info.userInfo}}
			</view>
			<image :src="info.userImg" mode=""></image>
		</view>
		<view class="view-content-c">
			<view class="view-name">
				服务项目
			</view>
			<view class="view-project">
				<view class="view-project-item" v-for="(item,index) in projectList">
					<view class="view-one">
						<view class="view-left">
							{{item.projectName}}
						</view>
						<view class="view-right">
							<view class="view-price">
								¥{{item.projectPrice}}
							</view>
							<view class="view-time">
								/{{item.projectTime}}小时
							</view>
						</view>
					</view>
					<view class="view-two">
						<view class="view-left">
							<view class="view-top">
								{{item.projectDesc}}
							</view>
							<view class="view-bottom">
								适用人群：{{item.projectPeople}}
							</view>
						</view>
						<view class="view-right">
							<!-- todo 退费接口无 -->
							<view class="view-right-a" @click="applyReturn(item.id)" v-if="item.applyStatus==1">
								退费
							</view>
							<view class="view-right-b" @click="uni.navigateTo({
								url:'../consult-project-pay/consult-project-pay?projectId='+item.id+'&titalPrice='+item.projectPrice+'&phoneNum'+item.phoneNum
							})" v-if="item.applyStatus==2">
								购买
							</view>
							<view class="view-right-b" v-if="item.applyStatus==1" @click="goLetter()">
								私信
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="view-content-d">
			<view class="view-name">
				服务评价
			</view>
			<view class="view-evaluate" v-for="(item,index) in list">
				<view class="view-one">
					<view class="view-left">
						{{item.nickName}}
					</view>
					<view class="view-right">
						{{item.createTime}}
					</view>
				</view>
				<view class="view-two">
					<ice-star :value="item.productScore"></ice-star>
				</view>
				<view class="view-three">
					{{item.comment}}
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
			page++
			getList()
			return ''
			}" />
		</view>

		<view class="view-content-e">
			<view class="view-button" v-show="false">
				<image src="/static/images/collect1.png" mode=""></image>
				<view class="view-name">
					收藏
				</view>
			</view>
			<view class="view-button">
				<image src="/static/images/fenxiang.png" mode=""></image>
				<view class="view-name">
					分享
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				id: 0,
				projectList: [],
				list: [],
				scrollTop: 0,
			}
		},
		onLoad(data) {
			this.id = data.id;
		},
		onShow() {
			this.queryInfo();
			this.queryProjectList();
			this.page = 1;
			this.getList();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		methods: {
			async applyReturn(id) {
				await this.$alert('立即申请退费?');
				let res = await this.http.get('/app/counselorUserApply/refundOrder', {
					id: id,
				});
				if (res.code == 200) {
					this.$toast('申请成功');
					this.queryProjectList();
				} else {
					this.$toast(res.msg);
				}
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/storeProductReply/listCounSelorReply', {
					pageNum: this.page,
					pageSize: this.pageSize,
					id: this.id,
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
				} else {
					this.$toast(res.msg);
				}
			},

			async queryProjectList() {
				let res = await this.http.get('/app/counselorProject/listUser', {
					counselorId: this.id,
				});
				if (res.code == 200) {
					this.projectList = res.data;
				} else {
					this.$toast(res.msg);
				}
			},

			// 获取详细信息
			async queryInfo() {
				let res = await this.http.get('/app/counselorUser/getInfo', {
					id: this.id,
				});
				if (res.code == 200) {
					this.info = res.data;
				} else {
					this.$toast(res.msg);
				}
			},
			
			//私信
			async goLetter() {
				let res = await this.IM.getUserInfo(this.info.phoneNum)
				let userInfo = res.data[this.info.phoneNum]
				console.log(userInfo)
				let data = {
					username: this.info.phoneNum,
					nickname: userInfo.nickname,
					avatarurl: userInfo.avatarurl,
				}
				let newData = encodeURIComponent(JSON.stringify(data))
				uni.navigateTo({
					url: '../private-letter/private-letter?data=' + newData
				})
			}
		}
	}
</script>

<style lang="scss">
	.view-content {
		background-color: #F7F7F7;

		.view-nav {
			width: 100%;
			height: 88rpx;
			position: fixed;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 99;
			padding: 0 30rpx;

			.image1 {
				width: 16rpx;
				height: 28rpx;
			}
		}

		.view-content-a {
			background-image: url(../../static/images/details2.png);
			background-size: 749rpx 551rpx;
			background-repeat: no-repeat;
			box-sizing: border-box;
			padding: 30rpx;
			padding-top: 180rpx;


			.view-one {
				display: flex;
				align-items: center;
				margin-bottom: 56rpx;

				.image-b {
					width: 140rpx;
					height: 140rpx;
					border-radius: 10rpx;
					margin-right: 27rpx;
					background-color: #BEF5C8;
				}

				.view-right {
					.view-top {
						display: flex;
						font-size: 39rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						margin-bottom: 20rpx;

						.view-grade {
							width: 80rpx;
							height: 30rpx;
							border: 1rpx solid #FFFFFF;
							border-radius: 15rpx;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							margin-left: 20rpx;
							text-align: center;
							line-height: 25rpx;
							margin-top: 15rpx;
						}
					}

					.view-bottom {
						display: flex;
						align-items: center;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;

						.image-c {
							width: 21rpx;
							height: 20rpx;
							margin-right: 13rpx;
						}
					}

				}
			}

			.view-two {
				display: flex;
				align-items: center;
				justify-content: space-around;

				.view-information {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 48rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;

					.view-top {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 0.7);
						margin-bottom: 26rpx;
					}
				}

				.view-division {
					width: 2rpx;
					height: 65rpx;
					background: #FFFFFF;
				}

			}
		}

		.view-content-b {
			width: 750rpx;
			height: 577rpx;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0 0;
			box-sizing: border-box;
			padding: 30rpx;
			margin-top: -10rpx;
			margin-bottom: 20rpx;

			.view-name {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 29rpx;
			}

			.view-introduce {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				margin-bottom: 30rpx;
			}

			image {
				width: 690rpx;
				height: 400rpx;
				background-color: #9ACAFC;
			}
		}

		.view-content-c {
			width: 750rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx;
			margin-bottom: 20rpx;

			.view-name {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 60rpx;
			}

			.view-project {
				border-bottom: 1rpx solid #EFEFEF;
				padding-bottom: 30rpx;

				.view-one {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #111111;
					margin-bottom: 28rpx;

					.view-right {
						display: flex;
						align-items: center;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FF0000;

						.view-time {
							font-size: 28rpx;
							color: #999999;
						}
					}
				}

				.view-two {
					display: flex;
					justify-content: space-between;
					padding-bottom: 20rpx;

					.view-left {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;

						.view-top {
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #666666;
							margin-bottom: 18rpx;
						}
					}

					.view-right {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.view-right-a {
							width: 140rpx;
							height: 56rpx;
							background: rgba(74, 154, 255, 0.1);
							border: 1px solid #4A9AFF;
							border-radius: 10rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #4A9AFF;
							line-height: 56rpx;
							margin-right: 20rpx;
							text-align: center;
						}

						.view-right-b {
							width: 140rpx;
							height: 56rpx;
							background: #4A9AFF;
							border-radius: 10rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 56rpx;
							text-align: center;
						}
					}
				}
			}
		}

		.view-content-d {
			width: 750rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx;
			padding-bottom: 98rpx;
			margin-bottom: 20rpx;

			.view-name {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 60rpx;
			}

			.view-evaluate {
				border-top: 1rpx solid #EFEFEF;
				padding-top: 30rpx;

				.view-one {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-bottom: 20rpx;

					.view-right {
						color: #999999;
					}
				}

				.view-two {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FC6129;
					margin-bottom: 27rpx;
				}

				.view-three {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-bottom: 30rpx;
				}
			}
		}

		.view-content-e {
			position: fixed;
			bottom: 0;
			width: 750rpx;
			height: 98rpx;
			background: #FFFFFF;
			padding-top: 11rpx;
			display: flex;
			justify-content: space-around;

			.view-button {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				image {
					width: 41rpx;
					height: 41rpx;
					margin-bottom: 11rpx;
				}
			}
		}
	}
</style>
