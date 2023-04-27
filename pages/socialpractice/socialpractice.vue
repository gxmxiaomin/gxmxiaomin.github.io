<template>
	<view>
		<!-- <view style="margin-top: 80rpx;" class="nav-bar">
			<uni-nav-bar dark backgroundColor="#fff" shadow left-icon="left" rightWidth="180rpx" size="19"
					@clickLeft="uni.navigateBack()">
				<view class="title-middle">
					<span style="color: #515151;">社会实践</span>
				</view>
				<block slot="right">
					<view class="city">
						<uni-icons custom-prefix="iconfont" type="icon-31sousuo" size="22" color="#515151"></uni-icons>
						<view class="city-rigth">
							<text style="color: #515151;">筛选</text>
							<uni-icons custom-prefix="iconfont" type="icon-shaixuan" size="22" color="#515151"
								@click="showMenu"></uni-icons>

						</view>
					</view>
				</block>
			</uni-nav-bar>
			<uni-drawer ref="menu" maskClick mode="right">
				<uni-nav-bar dark backgroundColor="#3f87fc" shadow left-icon="left" title="筛选" 
					size="19" @clickLeft="hideMenu()" />

			</uni-drawer>
		</view> -->
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()">返回</text> -->
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>社会实践</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
					<view class="city-rigth">
						<uni-icons custom-prefix="iconfont" type="icon-31sousuo" size="22" color="#515151"></uni-icons>
						<text style="color: #515151;">筛选</text>
						<uni-icons custom-prefix="iconfont" type="icon-shaixuan" size="22" color="#515151"
							@click="showMenu"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 二楼 -->
		<view class="nav-card">
			<uni-list>
				<!-- 第一个商品开始 -->
				<uni-list-item clickable @click="onClick(item.id,item.schoolInfoId)" v-for="(item,index) in shopList">
					<view class="header" slot="header">
						<!-- <image src="../../static/images/16411961745.jpg" mode="widthFix"></image> -->
						<img :src="item.coverImg" alt="">
					</view>
					<view class="body" slot="body">
						<view class="top">
							<view class="top-left">
								<text>{{item.name}}</text>
							</view>
							<view class="top-right">
								<img src="../../static/images/start2.png" alt="">
								<span>8.7</span>
							</view>
						</view>
						<view class="middle">
							<text>{{item.details}}</text>
						</view>
						<view class="bottom">
							<text class="bottom-left">{{item.address}}</text>
							<text class="bottom-right">150km</text>
						</view>
					</view>
				</uni-list-item>
				<!-- 第一个商品结束 -->
			</uni-list>
		</view>
		<!-- 二楼结束 -->
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
			// async sousuo() {
			// 	let res = await this.http.get('/app/socialPractice/list', {
			// 		keyName: this.searchTerm,
			// 		pageNum: 1,
			// 		pageSize: 10,
			// 	});
			// 	if (res.code == 200) {
			// 		this.shopList = res.rows
			// 	} else {

			// 	}
			// },
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
			},
			onClick(id,schoolId) {
				// console.log('1111')
				uni.navigateTo({
					url: '../public-details-sj/public-details?id=' + id + '&schoolId=' + schoolId
				})
			},
			showMenu() {
				//打开抽屉
				this.$refs.menu.open();
			},
			hideMenu() {
				//关闭抽屉
				this.$refs.menu.close()
			}


		}

	}
</script>

<style lang="scss" scoped>
	@import url(@/static/ziti/iconfont.css);
	.top-bar {
		height: 120rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		background-color: #fff;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
	
		.bare-cell {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	
		.bar-left {
			flex: 2;
			height: 100%;
		}
	
		.bar-center {
			flex: 5;
			height: 100%;
		}
	
		.bar-right {
			flex: 2;
			height: 100%;
		}
	}
	
	.nav-card {
		margin-top: 120rpx;
	}
	
	.title-middle {
		width: 100%;

		display: flex;

		span {
			margin: 0 auto;
			font-size: 18px;
			height: 43px;
			line-height: 43px;

		}
	}

	.city {
		flex: 1;
		width: 100px;

		display: flex;
		justify-content: space-between;

		text {
			font-size: 16px;
			vertical-align: middle;
		}
	}

	.header {
		width: 117px;
		margin-right: 13px;

		img {
			border-radius: 16rpx;
			width: 100%;
			height: 100%;
			// margin-left: -15rpx;
			// margin-top: -10rpx;
			// margin-bottom: 20rpx;
			// margin-right: 15rpx;
		}
	}

	.body {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.top {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.top-left {
				width: 300rpx;

				white-space: nowrap;

				text-overflow: ellipsis;

				overflow: hidden;
				font-size: 17px;
				font-family: "微软雅黑";

			}

			.top-right {

				img {
					width: 20px;
					vertical-align: middle;

				}

				color:#ef662c;

				span {
					vertical-align: middle;
					margin-left: 2px;
				}
			}
		}

		.middle {
			margin-top: 2px;
			margin-bottom: 10px;
			overflow: hidden;

			text-overflow: ellipsis;

			display: -webkit-box;

			-webkit-box-orient: vertical;

			-webkit-line-clamp: 2;

			text {
				line-height: 23px;
				color: #6d6d6d;
				font-size: 15px;
			}

		}

		.bottom {
			width: 100%;
			display: flex;
			justify-content: space-between;
			color: #aeaeae;

			.bottom-left {
				width: 150px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.bottom-right {
				width: 80px;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
</style>
