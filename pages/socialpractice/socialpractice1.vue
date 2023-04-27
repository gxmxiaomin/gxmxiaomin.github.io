<template>
	<view class="view-content">
		<u-navbar safeAreaInsetTop placeholder fixed title="社会实践" bgColor="#ffffff" @leftClick="uni.navigateBack({
			delta:1
		})">
			<image slot="right" src="/static/images/socialpractice.png" class="image-qrcode" @click="uni.navigateTo({
				url:'../qualityevaluation/filequery'
			})">
			</image>
		</u-navbar>
		<view class="view-content-a">
			<view class="view-top">
				<image src="/static/images/homeeducation.png" mode=""></image>
				<input type="text" value="" v-model="searchTerm" placeholder="请输入关键词搜索" />
				<button class="u-reset-button sousuo" @click="sousuo">搜索</button>
			</view>
		</view>
		<view class="view-content-b" v-for="(item,index) in shopList" @click="uni.navigateTo({
			url:'./practicedetails?id='+item.id
		})">
			<view class="view-introduce">
				<image :src="item.coverImg" mode=""></image>
				<view class="view-right">
					<view class="view-one">
						{{item.name}}
					</view>
					<view class="view-two">
						{{item.details}}
					</view>
					<view class="view-remarks">
						<image src="/static/images/socialpractice2.png" mode=""></image>
						<view class="view-time">
							活动时间：{{item.createTime}}
						</view>
					</view>
					<view class="view-remarks">
						<image src="/static/images/socialpractice1.png" mode=""></image>
						<view class="view-position">
							具体位置：{{item.address}}
						</view>
					</view>
				</view>
			</view>
			<view class="view-button">
				已有{{item.signUpNum}}人报名
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchTerm: '',
				keyName: '集体',
				shopList: [],
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			async sousuo() {
				let res = await this.http.get('/app/socialPractice/list', {
					keyName: this.searchTerm,
					pageNum: 1,
					pageSize: 10,
				});
				if (res.code == 200) {
					this.shopList = res.rows
				} else {

				}
			},
			async getList() {
				let res = await this.http.get('/app/socialPractice/list', {
					keyName: this.keyName,
					pageNum: 1,
					pageSize: 10,
				});
				if (res.code == 200) {
					this.shopList = res.rows
					console.log(this.shopList)
				} else {

				}
			}
		}
	}
</script>

<style lang="scss">
	.view-content {
		/deep/.u-navbar {

			.uicon-arrow-left {
				color: #333333 !important;
			}

			.u-navbar__content__title {
				color: #333333 !important;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}

			.image-qrcode {
				width: 44rpx;
				height: 44rpx;
			}
		}

		.view-content-a {
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 0 30rpx;

			.view-top {
				width: 690rpx;
				height: 70rpx;
				background: #F7F9FA;
				border-radius: 7rpx;
				display: flex;
				align-items: center;
				margin-bottom: 15rpx;

				.sousuo {
					width: 130rpx;
					height: 60rpx;
					line-height: 60rpx;
					background-color: #2979FF;
					color: #FFFFFF;
					margin: 0!important;
					margin-left: auto!important;
				}

				image {
					width: 27rpx;
					height: 27rpx;
					margin-left: 29rpx;
					margin-right: 19rpx;
				}

				input {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #C3C7CB;
				}
			}
		}

		.view-content-b {
			box-sizing: border-box;
			padding: 30rpx;

			.view-introduce {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 15rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 20rpx;
					background-color: #9ACAFC;
				}

				.view-right {
					height: 200rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.view-one {
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}

					.view-two {
						width: 467rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #666666;
					}

					.view-remarks {
						display: flex;
						align-items: center;

						image {
							width: 21rpx;
							height: 21rpx;
							margin-right: 15rpx;
							background-color: #FFFFFF;
						}

						.view-time {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #999999;
						}

						.view-position {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #999999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}

			.view-button {
				width: 200rpx;
				height: 40rpx;
				background: rgba(74, 154, 255, 0.1);
				border: 1rpx solid #4A9AFF;
				border-radius: 20rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #4A9AFF;
				text-align: center;
				line-height: 40rpx;
				margin-left: 230rpx;
			}
		}
	}
</style>
