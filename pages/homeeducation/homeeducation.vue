<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-top">
				<image src="/static/images/homeeducation.png" mode=""></image>
				<u-search placeholder="请输入关键词搜索" v-model="searchValue" :showAction="false" @search="search()">
				</u-search>
			</view>
			<view class="view-bottom">
				<view :class="state==1?'view-navigation':'view-navigation-a'" @click="state=1">
					<view class="view-one">
						付费视频
					</view>
					<view class="view-two">

					</view>
				</view>
				<view :class="state==2?'view-navigation':'view-navigation-a'" @click="state=2">
					<view class="view-one">
						书籍商品
					</view>
					<view class="view-two">

					</view>
				</view>
			</view>
		</view>
		<view class="view-content-b" v-if="state==1">
			<view class="view-video" v-for="(item,index) in list" @click="uni.navigateTo({
				url:'./videoscreen?id='+item.id
			})">
				<view class="view-a" :style="'background-image: url('+item.videoCover+');'" mode="">
					<image class="image-b" src="/static/images/homeeducation1.png" mode=""></image>
				</view>
				<view class="view-introduce">
					<view class="view-top">
						{{item.videoName}}
					</view>
					<view class="view-bottom">
						<view class="view-left">
							¥{{item.sellPrice}}
						</view>
						<view class="view-right">
							<image src="/static/images/homeeducation2.png" mode=""></image>
							<view class="view-remarks">
								已有{{item.viewers}}人观看
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="view-content-c" v-if="state==2">
			<view class="commodity" @click="uni.navigateTo({
				url:'../market-product-details/market-product-details?id='+item.id
			})" v-for="(item,index) in list">
				<image :src="item.goodsCover" mode=""></image>
				<view class="view-one">
					{{item.goodsDesc}}
				</view>
				<view class="view-two">
					销量{{item.salesNum}}
				</view>
				<view class="view-three">
					<view class="view-left">
						¥{{item.sellPrice}}
					</view>
					<view class="view-right">
						¥{{item.originalPrice}}
					</view>
				</view>
			</view>
		</view>

		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
		pageNum++
		getList()
		return ''
		}" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: 1,
				list: [],
				searchValue: '',
				pageNum: 1,
				loadmoreStatus: 'loadmore'
			}
		},
		mounted() {
			this.getList();
		},
		watch: {
			state() {
				this.pageNum = 1;
				this.list = [];
				this.getList();
			},
			searchValue(){
				if(!this.searchValue){
					this.search()
				}
			}
		},
		methods: {
			search() {
				console.log(this.searchValue)
				this.goodList = []
				this.pageNum = 1
				this.getList()
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let url = "/app/familyEducation/payVideoList";
				if (this.state == 2) {
					url = "/app/goods/list";
				}
				let res = await this.http.get(url, {
					pageNum: this.page,
					pageSize: 10,
					storeType: 3,
					keyName: this.searchValue
				});
				if (res.code == 200) {
					if (this.state == 2) {
						res.rows.map(item => {
							item.goodsCover = this.getCover(item.goodsImg);
						})
					}
					let {
						status,
						list
					} = await this.$resPage(this.pageNum, 10, this.list, res.rows);
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
	page {
		background-color: #F7F7F7;
	}

	.view-content {

		.view-content-a {
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 0 30rpx;
			padding-top: 15rpx;
			margin-bottom: 20rpx;

			.view-top {
				width: 690rpx;
				height: 70rpx;
				background: #F7F9FA;
				border-radius: 7rpx;
				display: flex;
				align-items: center;
				margin-bottom: 15rpx;

				image {
					width: 27rpx;
					height: 27rpx;
					margin-left: 29rpx;
					margin-right: 19rpx;
				}

				input {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #C3C7CB;
				}
			}

			.view-bottom {
				height: 81rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.view-navigation {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #4A9AFF;

					.view-two {
						width: 40rpx;
						height: 8rpx;
						background: #4A9AFF;
						border-radius: 4rpx;
						margin-top: 19rpx;
					}
				}

				.view-navigation-a {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;

					.view-two {
						width: 40rpx;
						height: 8rpx;
						background: #FFFFFF;
						border-radius: 4rpx;
						margin-top: 19rpx;
					}
				}
			}
		}

		.view-content-b {
			background-color: #FFFFFF;

			.view-video {
				width: 750rpx;
				height: 261rpx;
				box-sizing: border-box;
				padding: 30rpx;
				display: flex;

				.view-a {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
					background-size: cover !important;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-right: 20rpx;

					.image-b {
						width: 52rpx;
						height: 52rpx;
					}
				}

				.view-introduce {
					.view-top {
						width: 429rpx;
						height: 86rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
						line-height: 50rpx;
						margin-top: 18rpx;
						margin-bottom: 49rpx;
					}

					.view-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.view-left {
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FF0000;
						}

						.view-right {
							display: flex;
							align-items: center;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #999999;

							image {
								width: 23rpx;
								height: 23rpx;
								margin-right: 12rpx;
							}
						}
					}
				}
			}
		}

		.view-content-c {
			display: flex;
			flex-wrap: wrap;

			.commodity {
				width: 331rpx;
				height: 487rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-top: 30rpx;
				margin-left: 30rpx;

				image {
					width: 330rpx;
					height: 330rpx;
					border-radius: 10rpx 10rpx 0px 0px;
				}

				.view-one {
					width: 269rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-bottom: 19rpx;
					margin-left: 19rpx;
				}

				.view-two {
					width: 77rpx;
					height: 27rpx;
					background: rgba(74, 154, 255, 0.05);
					border: 1px solid #4A9AFF;
					border-radius: 3rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #4A9AFF;
					text-align: center;
					line-height: 22rpx;
					margin-bottom: 21rpx;
					margin-left: 19rpx;
				}

				.view-three {
					display: flex;
					margin-left: 19rpx;

					.view-left {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FF0000;
						margin-right: 11rpx;
					}

					.view-right {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: bold;
						text-decoration: line-through;
						color: #CCCCCC;
					}
				}
			}
		}
	}
</style>
