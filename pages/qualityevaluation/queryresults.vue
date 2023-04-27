<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-one">
				<view class="view-left">

				</view>
				<view class="view-right">
					身份证号：{{info.idCardNumber}}
				</view>
			</view>
			<view class="view-two">
				<view class="view-line">
					<view class="view-left">
						姓名：
					</view>
					<view class="view-right">
						{{info.name}}
					</view>
				</view>
				<view class="view-line">
					<view class="view-left">
						身份证号：
					</view>
					<view class="view-right">
						{{info.idCardNumber}}
					</view>
				</view>
				<view class="view-line">
					<view class="view-left">
						查询日期：
					</view>
					<view class="view-right">
						{{info.createTime}}
					</view>
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-name">
				证书
			</view>
			<!-- <view class="view-certificate">
				<view class="view-title">
					<view class="view-left">

					</view>
					<view class="view-right">
						英语四级证书
					</view>
				</view>
				<image src="" mode=""></image>
			</view> -->
			
			<rich-text :nodes="info.certificate"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				id: 0,
			}
		},
		onLoad(data) {
			this.id = data.id;
		},
		onShow() {
			this.getInfo();
		},
		methods: {
			async getInfo() {
				let res = await this.http.get('/app/studentAssessment/searchResult', {
					id: this.id,
				});
				if (res.code == 200) {
					this.info=res.data;
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-content {
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 30rpx;

		.view-content-a {
			margin-bottom: 60rpx;

			.view-one {
				display: flex;
				align-items: center;
				margin-bottom: 60rpx;

				.view-left {
					width: 10rpx;
					height: 32rpx;
					background: #4A9AFF;
					margin-right: 20rpx;
				}

				.view-right {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}
			}

			.view-two {
				.view-line {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}

		.view-content-b {
			.view-name {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 28rpx;
			}

			.view-certificate {
				margin-bottom: 35rpx;

				.view-title {
					display: flex;
					align-items: center;
					margin-bottom: 30rpx;

					.view-left {
						width: 10rpx;
						height: 32rpx;
						background: #4A9AFF;
						margin-right: 20rpx;
					}

					.view-right {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}

				image {
					width: 690rpx;
					height: 400rpx;
					background-color: #9ACAFC;
				}
			}
		}
	}
</style>
