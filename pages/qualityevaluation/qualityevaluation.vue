<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-navigation" @click="uni.navigateTo({
				url:'./instructorapply'
			})">
				<image src="/static/images/qualityevaluation2.png" mode=""></image>
				<view class="view-name">
					教官申请
				</view>
			</view>
			<view class="view-navigation" @click="uni.navigateTo({
				url:'./signup'
			})">
				<image src="/static/images/qualityevaluation1.png" mode=""></image>
				<view class="view-name">
					学生报名
				</view>
			</view>
			<view class="view-navigation" @click="uni.navigateTo({
				url:'./filequery'
			})">
				<image src="/static/images/qualityevaluation.png" mode=""></image>
				<view class="view-name">
					档案查询
				</view>
			</view>
			<view class="view-navigation" @click="uni.navigateTo({
				url:'./datadownload'
			})">
				<image src="/static/images/zhaoziliao.png" mode=""></image>
				<view class="view-name">
					资料下载
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-name">
				教官列表
			</view>
			<view class="view-list">
				<view class="view-instructor" v-for="(item,index) in list" @click="uni.navigateTo({
					url:'./instructordetails?id='+item.id
				})">
					<view class="view-information">
						<image :src="item.headUrl" mode=""></image>
						<view class="view-call">
							{{item.name}}
						</view>
					</view>
					<image src="/static/images/qualityevaluation4.png" mode=""></image>
				</view>
			</view>
		</view>

		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
		page++
		getList()
		return ''
		}" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				user:''
			}
		},
		onShow() {
			this.page = 1;
			this.user = uni.getStorageSync('userInfo').id || 0
			if (this.user != 0) {
				this.getList();
			}
		},
		methods: {
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/studentAssessment/instructorList', {
					pageNum: this.page,
					pageSize: this.pageSize,
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
				} else {
					// this.$toast(res.msg);
					this.$toast('用户信息异常');
				}
			},
		}
	}
</script>

<style lang="scss">
	/deep/.u-loadmore {
		margin: 0 !important;
		padding: 20rpx 0 !important;
	}

	.view-content {
		background-color: #F7F7F7;

		.view-content-a {
			width: 750rpx;
			height: 193rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 30rpx 49rpx;
			margin-bottom: 5rpx;

			.view-navigation {
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 90rpx;
					height: 90rpx;
					margin-bottom: 20rpx;
				}

				.view-name {
					height: 23rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}
		}

		.view-content-b {
			width: 750rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx;

			.view-name {
				height: 31rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 33rpx;
			}

			.view-list {
				display: flex;
				flex-direction: column;

				.view-instructor {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx solid #EFEFEF;
					padding-bottom: 31rpx;

					.view-information {
						display: flex;
						align-items: center;

						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right: 19rpx;
						}

						.view-call {
							height: 26rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 21rpx;
						}
					}

					image {
						width: 11rpx;
						height: 19rpx;
					}
				}
			}
		}
	}
</style>
