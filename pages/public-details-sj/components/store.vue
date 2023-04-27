<template>
	<view>
		<view class="box">
			<!-- <view class="type-1" v-for="(item,index) in titleListl" :key="item.title">
				<text class="type-1-1" :style="index == titleIndexl?'background: #4b9bfd;color:#fff':''"
					@click="selectTitlel(index)">{{item.title1}}</text>
			</view> -->
			<u-tabs :list="classifyList" keyName="label" :activeStyle="{color:'#4A9AFF',lineColor:'#4A9AFF',fontSize: '28rpx',
				fontWeight: '400'}" :inactiveStyle="{ fontSize: '28rpx', color: '#999999' }" @click="(e)=>{
				shopClick(e.id)
				return ''
			}"></u-tabs>

			<view class="course">
				<u-search bg-color='#FFF' style='margin-left: 40rpx; width: 90%;' action-text='筛选'></u-search>
			</view>
		</view>


		<view class="view-goods-container">
			<view class="view-goods-list">
				<view class="view-goods-item" v-for="(item,index) in shopLsit">
					<view class="view-goods-cover">
						<image :src="item.goodsImg" mode=""></image>
					</view>
					<view class="view-goods-info">
						<view>
							{{item.goodsDesc}}
						</view>
						<view class="text">
							<text>运费{{item.freight}}</text> <text style="margin-left: 12%;">七天无理由</text>
						</view>
						<view>
							<text>{{item.sellPrice}}</text>
							<text class="name">{{item.salesNum}}人付款</text>
						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		props:['storeList'],
		data() {
			return {
				classifyList:[],
				shopLsit: [],
				// titleListl: [{
				// 		title1: '推荐'
				// 	},
				// 	{
				// 		title1: '书包'
				// 	},
				// 	{
				// 		title1: '乐器'
				// 	},{
				// 		title1: '教材'
				// 	},{
				// 		title1: '教具'
				// 	},
				// ],
				// titleIndex: 0,
				// titleIndexl: 0,
				valId:'',
				id:''
			};
		},
		onLoad() {

		},
		created() {
			setTimeout(()=>{
				console.log("商城组件中接收到的参数", this.storeList)
				this.shopLsit = this.storeList.commodity
				this.classifyList = this.storeList.classifyList
				this.id = this.storeList.id
			},50)
		},
		
		methods: {
			async shopClick(val) {
				this.valId = val
				console.log(this.valId)
				await this.getshopList()
			},
			
			//商品
			async getshopList() {
				let res = await this.http.get('/app/goods/storeList', {
					storeId: this.id,
					typeId:this.valId
				});
				console.log('****************************************************')
				console.log(res)
				this.shopLsit= res.rows
			},
			
			// selectTitle(index) {
			// 	this.titleIndex = index
			// },

			// selectTitlel(index) {
			// 	this.titleIndexl = index
			// }

		}

	}
</script>

<style lang="scss">
	.view-goods-container {
		padding: 30rpx;
		background-color: #F7F7F7;

		.view-goods-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-content: flex-start;


            .view-goods-item:last-child{
				margin-bottom: 100rpx;
			}
			.view-goods-item {
				display: flex;
				flex-direction: column;
				width: 340rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 30rpx;

				.view-goods-cover {
					width: 340rpx;
					height: 280rpx;

					image {
						border-radius: 20rpx;
						width: 100%;
						height: 100%;
					}
				}

				.view-goods-info {
					display: flex;
					flex-direction: column;
					padding: 12rpx;

					view {

						&:nth-child(1) {
							font-size: 30rpx;
						}

						&:nth-child(2) {
							// margin: 10rpx 0;

							text {
								font-size: 22rpx;
								color: #aaa;
								// padding: 0 60rpx 0 0;
							}
						}

						&:last-child {
							color: #FC7F52;

							text {

								&:last-child {
									font-family: 'PingFang-SC-Bold';
									font-size: 36rpx;
									margin-left: 6rpx;
								}
							}
						}
						
						.name {
							font-size: 20rpx !important;
							color: #aaa;
							display: inline-block;
							float:right;
							margin-top: 10rpx;
						}
					}
				}
			}
		}
	}



	.box {

		.type-1>text {
			display: inline-block;
			margin: 10rpx 10rpx 10rpx 10rpx;
			padding: 0 10rpx 0 10rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			float: left
		}

		.type-1 {
			.type-1-1 {
				// background: #4b9bfd;
				// color: #ffffff;
			}
		}

		.type-2>text {
			display: inline-block;
			margin: 10rpx 10rpx 10rpx 10rpx;
			padding: 0 10rpx 0 10rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			float: left
		}

		.type-2 {
			// .type-2-1 {
			// 	background: #4b9bfd;
			// 	color: #ffffff;
			// }
		}



		.course {
			// margin-top: 80rpx;
		}



		.course-1>image {
			width: 100%;
			height: 260rpx;
		}
	}
</style>
