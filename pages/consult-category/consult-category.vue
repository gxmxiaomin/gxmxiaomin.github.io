<template>
	<view>
		<view class="view-content-b">
			<view class="view-physician" v-for="(item,index) in list" @click="uni.navigateTo({
				url:'../Informationservice/details?id='+item.id
			})">
				<view class="view-top">
					<image class="image-a" :src="item.headerImg" mode=""></image>
					<view class="view-introduce">
						<view class="view-one">
							<view class="view-left">
								{{item.name}}
							</view>
							<image class="image-b" src="/static/images/Informationservice.png" mode=""></image>
							<view class="view-right">
								{{item.grade}}分
							</view>
						</view>
						<view class="view-two">
							个人简介：{{item.userInfo}}
						</view>
					</view>
				</view>
				<view class="view-bottom">
					<image src="/static/images/Informationservice1.png" mode=""></image>
					<view class="view-remarks">
						已有{{item.count}}人咨询
					</view>
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
				id: 0,
				list: [],
				searchParams:{},
			};
		},
		onLoad(data) {
			this.id = data.id;
			uni.setNavigationBarTitle({
				title: data.name
			})
		},
		onShow() {
			this.page = 1;
			this.getList();
		},
		methods: {
			async getList() {
				this.loadmoreStatus = 'loading';
				this.searchParams.pageNum = this.page;
				this.searchParams.pageSize = this.pageSize;
				this.searchParams.userType = this.id;
				this.searchParams.inquiryVolumeSort = 2;
				this.searchParams.scoreSort =2
				let res = await this.http.get('/app/counselorUser/list', this.searchParams);
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
		},
	}
</script>

<style lang="scss">
	.view-content-b {
		padding-bottom: 30rpx;

		.view-physician {
			width: 690rpx;
			height: 208rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 0 auto;
			margin-bottom: 30rpx;
			box-sizing: border-box;
			padding: 30rpx;

			.view-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.image-a {
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx;
					background-color: #9ACAFC;
				}

				.view-introduce {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.view-one {
						display: flex;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;

						.image-b {
							width: 20rpx;
							height: 20rpx;
							margin-left: 20rpx;
							margin-top: 7rpx;
						}

						.view-right {
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FC6129;
							margin-left: 9rpx;
						}
					}

					.view-two {
						width: 516rpx;
						height: 53rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #666666;
						line-height: 30rpx;
					}
				}
			}

			.view-bottom {
				display: flex;
				align-items: center;
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #999999;
				line-height: 30rpx;
				margin-left: 120rpx;

				image {
					width: 27rpx;
					height: 23rpx;
					margin-right: 13rpx;
				}
			}
		}
	}
</style>
