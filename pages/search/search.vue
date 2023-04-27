<template>
	<view>
		<ice-statusbar color="#ffffff"></ice-statusbar>
		<ice-navbar>
			<view class="view-navBar">
				<image class="image-left" src="../../static/images/left.png" @click="uni.navigateBack({})"></image>
				<u-search :show-action="true" actionText="搜索" v-model="val" :animation="true" @custom="custom"></u-search>
			</view>
		</ice-navbar>
		<view class="view-history" v-if="list.length==0">
			<view class="view-title">
				<text class="text-history">历史搜索</text>
				<image class="image-clear" @click="clearHistory" src="../../static/images/clear.png"></image>
			</view>
			<view class="view-list">
				<view class="view-item" 
				@click="()=>{
					page=1
					val=item
					search(item)
					return ''
				}"
				v-for="item in historyList">{{item}}</view>
			</view>
		</view>
		<view class="view-list ">
			<view class="view-item" v-for="item in schoolList" @click="uni.navigateTo({
				url:'../child-details/child-details?id='+item.id+'&schoolType='+item.schoolTypeId+'&types='+1
			})">
				<image class="image-school" :src="item.logoImgUrl"></image>
				<view class="view-brief">
					<view class="view-name">
						<text class="text-name">{{item.schoolName}}</text>
						<view class="view-ratebox">
							<ice-star v-model="item.score"></ice-star>
						</view>
					</view>
					<view class="view-content u-line-2">{{item.schoolTitle}}</view>
					<view class="view-address">
						<text class="text-address u-line-1">{{item.schoolAddress}}</text>
						<text class="text-distance">{{(item.distance/1000).toFixed(2)}}km</text>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
				page++
				search()
				return ''
			}" />
		</view>
		<view class="view-history" v-if="list.length==0">
			<view class="view-title">
				<text class="text-history">猜你想搜</text>
			</view>
			<view class="view-list">
				<!-- <view class="view-item" 
				@click="()=>{
					page=1
					keyword=item
					search(item)
					return ''
				}"
				v-for="item in recommend">{{item.configValue}}</view> -->
				<view class="view-item"
				@click="()=>{
					page=1
					val=item.configValue
					search(item)
					return ''
				}"
				v-for="item in recommend">{{item.configValue}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				types:1,
				val:'', //搜索
				schoolList:[],
				historyList:[],
				list:[],
				keyword:'',
				recommend:[]
			}
		},
		onShow() {
			this.queryHistoryList()
			this.getRecommend()
		},
		methods: {
			chenge(ids){
				this.types = ids
			},
			custom(){
				this.search()
			},
			async clearHistory() {
				await this.$alert('清空历史记录');
				let res = await this.http.get('/app/userHomeNavigation/homeDeleteSearchHistory', {});
				if (res.code == 200) {
					this.queryHistoryList();
					this.$toast(res.msg);
				} else {
					this.$toast(res.msg);
				}
			},
			//历史搜索
			async queryHistoryList() {
				let res = await this.http.get('/app/userHomeNavigation/homeSearchHistory', {});
				if (res.code == 200) {
					console.log('历史搜索')
					console.log(res)
					this.historyList = res.data;
				} else {
					this.$toast(res.msg);
				}
			},
			// 推荐
			async getRecommend(){
				let res = await this.http.post('/app/userHome/systemConfigurationList',{
					configOptionId:176  
				})
				if(res.code==200){
					this.recommend = res.data
				}
			},
			async search(keyword) {
				this.loadmoreStatus = 'loading';
				let res = await this.http.post('/app/userHomeNavigation/homeSearch', {
					pageNum:1,
					pageSize:10,
					lon:uni.getStorageSync('lng'),
					lat:uni.getStorageSync('lat'),
					schoolName:this.val,
				});
				console.log('11111111111111111111111111111112',res);
				if (res.code == 200) {
					this.schoolList = res.rows
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
		}
	}
</script>

<style lang="scss">
	.view-history {
		margin-top: 20rpx;
		padding: 0 30rpx;
	
		.view-list {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			max-width: 100%;
			flex-wrap: wrap;
			
			.view-item {
				background: #F6F8F9;
				border-radius: 10rpx;
				padding: 10rpx 30rpx;
				margin-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;
				margin-top: 20rpx!important;
	
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
	.view-list {
		padding: 30rpx;
		.view-item {
			display: flex;
			margin-top: 60rpx;
	
			&:first-child {
				margin-top: 0rpx;
			}
	
			.view-brief {
				flex-grow: 1;
				flex-shrink: 1;
				margin-left: 20rpx;
	
				/deep/.u-icon__icon {
					padding: 0 !important;
					font-size: 30rpx !important;
				}
	
				.view-address {
					margin-top: 25rpx;
					display: flex;
	
					.text-address {
						width: 340rpx;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
					}
	
					.text-distance {
						margin-left: auto;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
					}
				}
	
				.view-content {
					font-size: 28rpx;
					font-weight: bold;
					color: #666666;
					margin-top: 20rpx;
				}
	
				.view-name {
					display: flex;
					align-items: center;
	
					/deep/.u-rate {
						margin-left: auto;
					}
	
					image {
						width: 19rpx;
						height: 19rpx;
					}
	
					.text-name {
						font-size: 36rpx;
						font-weight: bold;
						color: #333333;
					}
	
					.text-rate {
						font-size: 24rpx;
						font-weight: 500;
						color: #FC6129;
						margin-left: 5rpx;
					}
				}
			}
	
			.image-school {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
	}
	.view-guess {
		margin-top: 20rpx;
		padding: 0 30rpx;

		.view-list {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			.view-items{
				background: rgba(71, 152, 255, 0.1);
				border: 1px solid #4798FF!important;
				color: #4798FF!important;
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
</style>
