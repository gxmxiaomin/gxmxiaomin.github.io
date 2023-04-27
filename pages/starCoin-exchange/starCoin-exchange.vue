<template>
	<view>
		<view class="view-collect">
			<view class="view-switch-wrapper">
				<view class="view-switch">
					<view class="view-item" @click="switchs(0)">
						<text class="text-name" :class="curriculum==0?'text-names':''">待发货</text>
						<view class="view-line" v-if="curriculum==0"></view>
					</view>
					<view class="view-item" @click="switchs(1)">
						<text class="text-name" :class="curriculum==1?'text-names':''">待收货</text>
						<view class="view-line" v-if="curriculum==1"></view>
					</view>
					<view class="view-item" @click="switchs(2)">
						<text class="text-name" :class="curriculum==2?'text-names':''">已完成</text>
						<view class="view-line" v-if="curriculum==2"></view>
					</view>
				</view>
			</view>
			<view class="view-lists">
				<view class="view-item" v-for="(item,index) in collectList">
					<image class="view-shoping"  :src="imgList"></image>
					<view class="view-content">
						<text class="text-name">{{item.goodsName}}</text>
						<text class="text-brief">x{{item.goodsNum}}</text>
						<view class="view-contact">
							<view class="text-price">{{item.exchangeScore}}星币</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curriculum: 0,
				show:1,
				subject:1,
				collectList:[],
				imgList:[],
			}
		},
		mounted(){
			this.collection(0)
		},
		methods: {
			switchs(ids) {
				this.curriculum = ids;
				console.log(ids);
				this.collection(ids)
			},
			collect(its){
				this.show = its
			},
			sub(limit){
				this.subject = limit
			},
			async collection(ids){
				let res = await this.http.get('/app/userScores/exchangeScoreGoodsRecordList',{
					exchangeStatus:ids,
					pageNum:1,
					pageSize:10,
				});	
				if(res.code == 200){
					this.collectList = res.rows
					for (let item of res.rows) {
						this.imgList = item.goodsImg.split(',')[0]
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	
	page{
		background-color: #F7F7F7;
	}
	.view-collect {
		width: 100%;
		.view-lists{
			background-color: #F7f7f7;
			padding:20rpx 30rpx;
			.view-item{
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				background-color: #FFFFFF;
				padding: 30rpx;
				display: flex;
				border-radius: 10rpx;
				.view-content{
					flex-grow: 1;
					flex-shrink: 1;
					margin-left: 20rpx;
					.text-name{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}
					.text-brief{
						display: block;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;
						margin-top: 10rpx;
					}
					.view-contact{
						display: flex;
						.text-price{
							font-size: 36rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FF0000;
						}
						
						.view-subject{
						width: 32rpx;
						height: 32rpx;
						margin-left: auto;
						image{
							width: 100%;
							height: 100%;
							display: block;
						}
					}
						.button-signup{
							width: 154rpx;
							height: 50rpx;
							background: #4A9AFF;
							border-radius: 25rpx;
							font-size: 28rpx;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 50rpx;
							margin: 0;
							margin-left: auto!important;
						}
					}
				}
				.view-shoping{
					width: 160rpx;
					height: 160rpx;
					border-radius: 10rpx;
				}
				&:first-child{
					margin-top: 0rpx;
				}
			}
		}
		.view-list {
			display: flex;
			flex-wrap: wrap;
			padding:30rpx;
			.view-item {
				width: 330rpx;
				margin-bottom: 30rpx;
		
				&:nth-child(2n) {
					margin-left: auto;
				}
		
				.image-shopIng {
					width: 100%;
					height: 300rpx;
					border-radius: 10rpx;
				}
		
				.view-name {
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
				}
		
				.view-price {
					font-size: 32rpx;
					font-weight: bold;
					color: #FF0000;
					display: flex;
					align-items: center;
					.view-shoucang{
						width: 32rpx;
						height: 32rpx;
						margin-left: auto;
						image{
							width: 100%;
							height: 100%;
							display: block;
						}
					}
					text {
						font-size: 24rpx;
						font-weight: bold;
						text-decoration: line-through;
						color: #CCCCCC;
					}
				}
		
				.text-sales {
					width: 80rpx;
					color: #4A9AFF;
					text-align: center;
					border: 1px solid #4A9AFF;
					border-radius: 3rpx;
					font-size: 20rpx;
					font-weight: bold;
					color: #4A9AFF;
					margin: 15rpx 0rpx;
				}
			}
		}
		.view-switch-wrapper{
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
