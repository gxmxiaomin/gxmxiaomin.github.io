<template>
	<scroll-view class="view-hot-list" scroll-y="true" @refresherrefresh='refresherrefresh'
		:refresher-enabled='true' :refresher-triggered='triggered' @scrolltolower='scrolltolower'>
		<view class="list-box">
			<view class="view-hot-item" v-for="list in hotspotLists" @click="uni.navigateTo({
				url:'../hot-details/hot-details?id='+list.id
			})">
				<u--image :src="list.resource" width="160rpx" height="160rpx"></u--image>
				<view class="view-content">
					<view class="view-title">
						<u--text :lines="2" color="#333" size="28rpx" :text="list.title"></u--text>
					</view>
					<view class="view-info">
						<text>{{list.createTime}}</text>
						<text>阅读量 {{list.view}}</text>
					</view>
				</view>
			</view>
			<u-loadmore v-if="!triggered" :status="loadmoreStatus" @loadmore="()=>{
			page++
			gethotspotLists()
			return ''
			}" />
		</view>

		<MessageTip ref="messageTip"></MessageTip>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				hotspotLists: [],
				triggered: false,
				page:1,
			}
		},
		onLoad() {
			this.messageShowTip.showTextMessage(this)
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		onShow() {
			this.gethotspotLists()
		},
		// onReachBottom() {
		// 	this.page++
		// 	this.gethotspotLists()
		// },
		methods: {
			// 下拉刷新
			refresherrefresh() {
				this.triggered = true
				this.hotspotLists = []
				this.page = 1
				this.gethotspotLists()
			},
			//触底加载
			scrolltolower(){
				this.page++
				this.gethotspotLists()
			},
			// 获取实时热点
			async gethotspotLists() {

				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/userHome/liveHotspotList', {
					pageNum: this.page,
					pageSize: this.pageSize,
				});
				this.triggered = false
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.hotspotLists, res.rows);
					this.loadmoreStatus = status;
					this.hotspotLists = list;
					console.log(this.hotspotLists)
				} else {
					this.$toast(res.msg);
				}

			},
		}
	}
</script>

<style lang="scss">
	.view-hot-list {
		// padding: 30rpx 30rpx 0 30rpx;
		// margin: 30rpx 30rpx 0 30rpx;
		.list-box{
			width: 100vw;
			height: calc(100vh - 1px);
		}

		.view-hot-item {
			width: 95%;
			margin: auto;
			// border: 1rpx solid red;
			display: flex;
			justify-content: space-between;
			margin-bottom: 38rpx;

			.view-content {
				margin-top: 6rpx;
				margin-left: 20rpx;

				.view-title {
					// border: 1rpx solid darkblue;
					width: 540rpx;
					margin-bottom: 16rpx;
					margin-right: 30rpx;
				}

				.view-info {
					display: flex;
					justify-content: space-between;
					margin-top: 10%;

					text {
						&:first-child {
							font-size: 24rpx;
							color: #999999;
							line-height: 48rpx;
						}

						&:last-child {
							font-size: 24rpx;
							color: #666666;
							line-height: 48rpx;
							margin-right: 60rpx;
						}
					}
				}

			}
		}
	}
</style>
