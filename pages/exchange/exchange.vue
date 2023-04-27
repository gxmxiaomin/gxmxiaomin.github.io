<template>
	<view class="view-container">
		<view  v-if="this.exchange != {}" class="view-list">
			<view class="view-list-content">
				<view class="view-list-item" v-for="(item,index) in exchange" :key="index" @click="uni.navigateTo({
					url:'../starCoinShopDetails/starCoinShopDetails?id='+item.id
				})">
					<image :src="item.goodsCover" mode=""></image>
					<view class="view-info">
						<view class="view-name">
							{{item.goodsName}}
						</view>
						<view class="view-num">
							价值：{{item.originalPrice}}元
						</view>
						<view class="view-price">
							{{item.sellPrice}}星币
						</view>
					</view>
				</view>
			</view>
		</view>
		<view else style="text-align: center;color: #aaa;">
			暂无可换商品
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				exchange:{},
				title:'',
				id:'',
				productList:{},
			};
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			this.page++
			this.getList()
			return ''
		},
		onLoad(option) {
			this.title = option.name
			this.id = option.id
		},
		mounted() {

		},
		methods: {
			leftClick(){
				uni.navigateBack({})
			},
			async getList(){
				this.loadmoreStatus='loading';
				let res=await this.http.get("/app/userScores/scoreGoodsList",{
					pageNum: this.page,
					pageSize: this.pageSize,
					storeType: this.id,
				});
				console.log('商品列表：',res)
				if(res.code==200){
					let {status,list} = await this.$resPage(this.page,this.pageSize,this.productList,res.rows);
					this.loadmoreStatus=status;
					this.productList = list
					this.exchange = this.productList.filter(value => value.sellPrice<=this.id)
				}else{
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F7F7F7;
	}
	.view-wapper{
		width: 100%;
		height: 98rpx;
	}
	/deep/.u-navbar .uicon-arrow-left{
		color: #333333!important;
	}
	/deep/.u-navbar__content__title{
		color: #333333!important;
	}
	.view-container {
		width: 100%;
		font-family: PingFang SC;

		.view-list {
			width: 100%;
			background-color: #F7F7F7;
			padding: 30rpx;
			margin-bottom: 20rpx;
			.view-list-content {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.view-list-item {
					width: 330rpx;
					flex-shrink: 1;
					margin-bottom: 30rpx;
					background-color: #FFFFFF;

					image {
						width: 330rpx;
						height: 330rpx;
					}

					.view-info {
						padding: 20rpx;
						.view-price{
							font-size: 32rpx;
							font-weight: bold;
							color: #FF0000;
							line-height: 40rpx;
						}
						.view-name {
							width: 100%;
							font-size: 28rpx;
							font-weight: bold;
							color: #333333;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							margin-bottom: 10rpx;
						}

						.view-num {
							width: 180rpx;
							height: 34rpx;
							background: rgba(74, 154, 255, 0.05);
							border: 1px solid #4A9AFF;
							border-radius: 4rpx;
							font-size: 24rpx;
							font-weight: bold;
							color: #4A9AFF;
							line-height: 30rpx;
							text-align: center;
							margin-bottom: 10rpx;
						}

						.view-price {
							display: flex;
							font-weight: bold;
							justify-content: space-between;
							align-items: flex-end;

							.text-price {
								font-size: 28rpx;
								color: #FF0000;

								.text-label {
									font-size: 24rpx;
								}
							}

							.text-original-price {
								font-size: 24rpx;
								text-decoration: line-through;
								color: #CCCCCC;
								margin-right: 33rpx;
							}

							image {
								width: 32rpx;
								height: 32rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
