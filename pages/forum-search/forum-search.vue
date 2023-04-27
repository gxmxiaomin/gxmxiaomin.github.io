<template>
	<view>
		<ice-statusbar color="#ffffff"></ice-statusbar>
		<ice-navbar>
			<view class="view-navBar">
				<image class="image-left" src="../../static/images/left.png" @click="uni.navigateBack({})"></image>
				<u-search v-model="keyword" :show-action="true" actionText="搜索" :animation="true" @search="(value)=>{
					page=1
					search(value)
					return ''
				}" @custom="(value)=>{
					page=1
					search(value)
					return ''
				}"></u-search>
			</view>
		</ice-navbar>
		<view class="view-history" v-if="list.length==0">
			<view class="view-title">
				<view class="view-right">
					<image class="img-icon" src="../../static/images/history.png" mode=""></image>
					<text class="text-history">历史搜索</text>
				</view>
				<image class="image-clear" @click="clearHistory" src="../../static/images/clear.png"></image>
			</view>
			<view class="view-list">
				<view class="view-item" @click="()=>{
					page=1
					keyword=item
					search(item)
					return ''
				}" v-for="item in historyList">{{item}}</view>
			</view>
		</view>
		
		<!-- 帖子内容 -->
		<!-- <view class="view-content">
			<view class="view-dynamic">
				<ice-post :item="item" v-for="item in infoList" @clickPraise="getPraise" @clickDelete="clickDeletePost">
				</ice-post>
			</view>
		</view> -->

		<view class="view-dynamic">
			<ice-post :item="item" v-for="item in list"></ice-post>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sb:'测试',
				historyList: [],
				list: [],
				keyword: '',
			}
		},
		onShow() {
			this.queryHistoryList();
			// this.test()
		},
		methods: {
			// async test(){
			// 	let res = await this.http.postJson('/app/applyHistory/userTopicSearch', {
			// 		currentPage:1,
			// 		keyword:this.sb,
			// 		pageSize:10,
			// 		})
			// 		console.log(res)
			// 		console.log(res.rows)
			// 		this.list = res.rows
			// 		console.log('------------------------------------------',this.list)
			// },
			
			async clearHistory() {
				await this.$alert('清空历史记录');
				let res = await this.http.get('/app/forum/home/deleteSearchHistory', {});
				if (res.code == 200) {
					this.queryHistoryList();
				} else {
					this.$toast(res.msg);
				}
			},
			async search(keyword) {
				if (!keyword) {
					this.list = [];
					return ''
				}
				this.loadmoreStatus = 'loading';
				// let res = await this.http.get('/app/forum/home/forumHomePage', {
				// 	pageNum: this.page,
				// 	pageSize: this.pageSize,
				// 	keyName: keyword,
				// });
				let res = await this.http.postJson('/app/applyHistory/userTopicSearch', {
					currentPage:this.page,
					keyword:keyword,
					pageSize: this.pageSize
				});
				console.log(res)
				this.list = res.rows
				if (res.code == 200) {
					this.queryHistoryList();
					res.rows.map(item => {
						item.resource = this.strToArray(item.resource);
						if (item.type == 2) {
							item.content = JSON.parse(item.content)[0].content;
						}
					})
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
			async queryHistoryList() {
				let res = await this.http.get('/app/forum/home/searchHistory', {});
				if (res.code == 200) {
					this.historyList = res.data;
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-guess {
		margin-top: 20rpx;
		padding: 0 30rpx;

		.view-list {
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.view-items {
				background: rgba(71, 152, 255, 0.1);
				border: 1px solid #4798FF !important;
				color: #4798FF !important;
				padding: 10rpx 30rpx;
				margin-left: 20rpx;
				font-size: 24rpx;
			}

			.view-item {
				background: #F6F8F9;
				border: 1px solid #F6F8F9;
				border-radius: 10rpx;
				padding: 10rpx 30rpx;
				margin-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;

				&:first-child {
					margin-left: 0rpx;
				}
			}
		}



		.view-title {
			display: flex;
			align-items: center;

			.image-clear {
				width: 20rpx;
				height: 23rpx;
				margin-left: auto;
			}



			.text-history {
				font-size: 32rpx;
				font-weight: 500;
				color: #111111;
			}
		}
	}

	.view-history {
		margin-top: 20rpx;
		padding: 0 30rpx;

		.view-list {
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.view-item {
				background: #F6F8F9;
				border-radius: 10rpx;
				padding: 10rpx 30rpx;
				margin-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;

				&:first-child {
					margin-left: 0rpx;
				}
			}
		}

		.view-title {
			display: flex;
			align-items: center;

			.image-clear {
				width: 20rpx;
				height: 23rpx;
				margin-left: auto;
			}

			.text-history {
				font-size: 32rpx;
				font-weight: 500;
				color: #111111;
			}
		}
	}

	.view-dynamic {

		background-color: #FFFFFF;

	}

	.view-navBar {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;

		.u-search {
			margin-left: 27rpx !important;
		}

		.image-left {
			width: 16rpx;
			height: 28rpx;
		}
	}

	.view-right {
		display: flex;
		align-items: center;
	}

	.img-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 16rpx;
	}
</style>
