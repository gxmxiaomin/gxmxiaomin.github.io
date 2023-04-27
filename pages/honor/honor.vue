<template>
	<view>
		<ice-statusbar></ice-statusbar>
		<ice-navbar>
			<u-navbar safeAreaInsetTop placeholder fixed title="我的荣誉" @leftClick="uni.navigateBack({
				
			})">
				<view class="u-nav-slot" slot="right">
					<image src="../../static/images/file.png" mode="" @click="uni.navigateTo({
						url:'../file-template/file-template'
					})" v-if="curriculum===0"></image>
				</view>
			</u-navbar>
		</ice-navbar>
		<view class="view-collect">
			<view class="view-switch-wrapper">
				<view class="view-switch">
					<view class="view-item" @click="switchs(0)">
						<text class="text-name" :class="curriculum==0?'text-names':''">学生档案</text>
						<view class="view-line" v-if="curriculum==0"></view>
					</view>
					<view class="view-item" @click="switchs(1)">
						<text class="text-name" :class="curriculum==1?'text-names':''">我的证书</text>
						<view class="view-line" v-if="curriculum==1"></view>
					</view>
				</view>
			</view>
			<view class="view-list" v-if="curriculum==0">
				<view class="view-item" 
				@click="clickItem(item)"
				v-for="item in list">
					<view class="view-block">
						<text class="view-card">身份证号：{{item.queryContent}}</text>
						<text class="view-status">{{item.status?'已查询':'查询中'}}</text>
					</view>
					<view class="view-timer">查询时间：{{item.createTime}}</view>
				</view>
			</view>
			<view class="view-list" v-if="curriculum==1">
				<view class="view-item" 
				@click="clickItem(item)"
				v-for="item in list">
					<view class="view-block">
						<text class="view-card">身份证号：{{item.idCardNumber}}</text>
						<text class="view-status">{{item.status?'已查询':'查询中'}}</text>
					</view>
					<view class="view-timer">查询时间：{{item.createTime}}</view>
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
				curriculum: 0,
				list: [],
			}
		},
		onShow() {
			this.page=1;
			this.getList();
		},
		watch:{
			curriculum(){
				this.page=1;
				this.getList();
			},
		},
		methods: {
			async clickItem(item){
				if(item.status==1){
					uni.navigateTo({
						url:'../qualityevaluation/queryresults?id='+item.id
					})
				}
				
			},
			switchs(ids) {
				this.curriculum = ids;
				console.log(ids);
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let url='/app/studentAssessment/signUpInfoQueryList';
				if(this.curriculum==1){
					url="/app/studentAssessment/certificateList";
				}
				let res = await this.http.get(url, {
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
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	/deep/ .u-navbar {
		.uicon-arrow-left {
			color: #000000 !important;

		}

		.u-navbar__content__title {
			color: #000000 !important;
			line-height: 32rpx;
		}

		.u-nav-slot {
			image {
				width: 40rpx;
				height: 36rpx;
			}
		}
	}

	.view-collect {
		width: 100%;

		.view-list {
			background-color: #F7f7f7;
			padding: 20rpx 30rpx;

			.view-item {
				width: 690rpx;
				height: 132rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-top: 30rpx;
				padding: 30rpx;

				.view-timer {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #999999;
					line-height: 40rpx;
				}

				.view-block {
					display: flex;

					.view-card {
						font-size: 28rpx;
						color: #333333;
						line-height: 40rpx;
					}

					.view-status {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #4A9AFF;
						line-height: 40rpx;
						margin-left: auto;
					}
				}
			}
		}

		.view-switch-wrapper {
			height: 88rpx;

			.view-switch {
				display: flex;
				padding: 20rpx 30rpx;
				position: fixed;
				width: 100%;
				z-index: 9;
				background-color: #FFFFFF;

				.view-item {
					flex: 1;

					.text-name {
						font-size: 28rpx;
						font-weight: 400;
						color: #999999;
						text-align: center;
						display: block;
					}

					.text-names {
						color: #4A9AFF !important;
					}

					.view-line {
						width: 40rpx;
						height: 8rpx;
						background: #4A9AFF;
						border-radius: 4rpx;
						margin: 0 auto;
						margin-top: 10rpx !important;
					}
				}
			}
		}
	}
</style>
