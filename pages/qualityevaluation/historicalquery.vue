<template>
	<view class="view-content">
		<view class="view-content-a" 
		@click="clickItem(item)"
		v-for="(item,index) in list">
			<view class="view-top">
				<view class="view-left">
					身份证号：{{item.queryContent}}
				</view>
				<view class="view-right">
					{{item.status?'已查询':'查询中'}}
				</view>
			</view>
			<view class="view-bottom">
				查询时间：{{item.createTime}}
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
			}
		},
		onShow() {
			this.page = 1;
			this.getList()
		},
		methods: {
			async clickItem(item){
				if(item.status==1){
					uni.navigateTo({
						url:'queryresults?id='+item.id
					})
				}
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/studentAssessment/signUpInfoQueryList', {
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
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-content {
		background-color: #F7F7F7;
		box-sizing: border-box;
		padding: 30rpx;

		.view-content-a {
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 30rpx;

			.view-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				margin-bottom: 40rpx;

				.view-left {
					color: #333333;
				}

				.view-right {
					color: #FF0000;
				}
			}

			.view-bottom {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
	}
</style>
