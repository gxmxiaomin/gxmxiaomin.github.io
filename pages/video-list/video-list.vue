<template>
	<view>
		<!-- 顶部栏 -->
		<view class="view-nav">
			<view class="view-nav-bar">
				<view class="view-back" @click="uni.navigateBack({})">
					<image src="../../static/images/back.png" mode=""></image>
				</view>
				<view class="view-title">
					<text>视频</text>
					<text>({{list.length}}文件)</text>
				</view>
				<view class="view-more" @click="isEdit=!isEdit">
					<text v-if="isEdit">完成</text>
					<image src="../../static/images/icon_edit.png" mode="" v-else></image>
				</view>
			</view>
		</view>

		<view class="view-space"></view>

		<!-- 列表 -->
		<view class="view-list">
			<view class="view-item" v-for="(item,index) in list" :key="index" >
				<video id="video" style="width: 236rpx;height: 236rpx;" :src="item.url" @play="playVideo">
					<cover-view class="view-msk" v-if="isEdit" @click="clickVideo(item,index)">
						<cover-image class="view-choose"
							:src="item.select?'../../static/images/choose_select.png':'../../static/images/choose.png'"
							mode="">
						</cover-image>
					</cover-view>
				</video>
			</view>
		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
		page++
		getList()
		return ''
		}" />

		<!-- 底部操作栏 -->
		<view class="view-tabbar" v-if="isEdit">
			<view class="view-tabbar-item" @click="selectAll">
				<view class="view-image" @click="select = !select">
					<image src="../../static/images/tabbar-choose-select.png" mode="" v-if="isAll"></image>
					<image src="../../static/images/tabbar-choose.png" mode="" v-else></image>
				</view>
				<text>全选</text>
			</view>
			<view class="view-tabbar-item" @click="saveVideo">
				<view class="view-image">
					<image src="../../static/images/tabbar-down.png" mode=""></image>
				</view>
				<text>下载</text>
			</view>
			<view class="view-tabbar-item" @click="delItem">
				<view class="view-image">
					<image src="../../static/images/tabbar-del.png" mode=""></image>
				</view>
				<text>删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				isEdit: false,
				select: false
			}
		},
		onLoad() {
			this.getList();
		},
		computed: {
			isAll() {
				let bool = this.list.every(item => item.select);
				if (bool) {
					return true
				} else {
					return false
				}
			},
		},
		methods: {
			playVideo(){
				this.videoContext = uni.createVideoContext('video');
				this.videoContext.requestFullScreen();
			},
			// 点击视频
			clickVideo(item, index) {
				// 编辑视频
				if (this.isEdit) {
					item.select = !item.select
				} else {

				}
			},

			// 下载视频
			saveVideo() {
				let bool = this.list.some(val => val.select);
				if (!bool) {
					this.$toast('请选择视频');
					return
				}
				for (let item of this.list) {
					console.log(item);
					if (item.select) {

						uni.downloadFile({
							url: item.url,
							success: (res) => {
								// 2 成功下载后而且状态码为200时将视频保存到本地系统
								if (res.statusCode === 200) {
									uni.saveVideoToPhotosAlbum({
										filePath: res.tempFilePath
									})
									uni.hideLoading();
									// 提示用户下载成功
									uni.showToast({
										title: "下载成功",
										icon: "success"
									});
								}
								// 如果该资源不可下载或文件格式出错则提示用户
								else {
									uni.showToast({
										title: "资源格式错误"
									});
								}
							},
							fail: (err) => {
								// 下载失败提醒
								uni.hideLoading();
								uni.showToast({
									title: "下载失败"
								})
							}
						})
					}
				}
			},

			// 全选
			selectAll() {
				if (this.isAll) {
					for (let item of this.list) {
						item.select = false
					}
				} else {
					for (let item of this.list) {
						item.select = true
					}
				}
			},

			// 查询列表
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/userPrivateSpace/list', {
					type: 2,
					pageNum: this.page,
					pageSize: this.pageSize
				});
				console.log('查询列表', res);
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					for (let item of list) {
						item.select = false
					}
					this.list = list;
				} else {
					this.$toast(res.msg);
				}
			},

			// 删除
			delItem() {
				let bool = this.list.some(val => val.select);
				if (!bool) {
					this.$toast('请选择视频');
					return
				}
				let delArr = [];
				for (let item of this.list) {
					if (item.select) {
						delArr.push(item.id);
					}
				}
				console.log(delArr);
				uni.showModal({
					content: `删除${delArr.length}个视频`,
					success: async (res) => {
						if (res.confirm) {
							let result = await this.http.post('/app/userPrivateSpace/deleteFile', {
								ids: delArr
							});
							console.log('删除结果', result);
							if (result.code == 200) {
								this.getList();
								this.$toast('删除成功');
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	#video {
		width: 236rpx;
		height: 236rpx;
	}

	.view-tabbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 50%;
		bottom: 100rpx;
		transform: translateX(-50%);
		width: 630rpx;
		height: 140rpx;
		background: #FFFFFF;
		border-radius: 20rpx;

		.view-tabbar-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;

			text {
				font-size: 28rpx;
				color: #333333;
			}

			.view-image {
				width: 53rpx;
				height: 53rpx;
				margin-bottom: 10rpx;

				image {
					width: 53rpx;
					height: 53rpx;
				}
			}
		}
	}

	.view-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: 8rpx;

		.view-item {
			width: 236rpx;
			height: 236rpx;
			position: relative;
			margin: 5rpx;

			#video {
				width: 236rpx;
				height: 236rpx;
			}

			.view-msk {
				position: relative;
				width: 236rpx;
				height: 236rpx;
			}

			.view-choose {
				position: absolute;
				top: 16rpx;
				right: 16rpx;
				width: 32rpx;
				height: 32rpx;
				z-index: 999;

				image {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.img {
				width: 236rpx;
				height: 236rpx;
			}
		}
	}

	.view-space {
		margin-top: var(--status-bar-height);
		height: 88rpx;
	}

	.view-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-color: #fff;
		padding-top: var(--status-bar-height);

		.view-nav-bar {
			height: 88rpx;
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.view-title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				text {
					color: #333333;

					&:first-child {
						font-size: 36rpx;
						font-weight: 500;
					}

					&:last-child {
						font-size: 24rpx;
					}
				}
			}

			.view-back {
				width: 44rpx;
				height: 44rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 16rpx;
					height: 28rpx;
				}
			}

			.view-more {
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 38rpx;
					height: 38rpx;
				}
			}
		}
	}
</style>
