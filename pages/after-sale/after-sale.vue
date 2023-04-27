<template>
	<view class="view-container">
		<view class="view-order-item">
			<view class="view-body">
				<image class="image-item-img" :src="goodsInfo.goodsCoverImg" mode=""></image>
				<view class="view-info">
					<view class="view-top">
						<view class="view-name">
							{{goodsInfo.goodsName}}
						</view>
						<view class="view-price">
							{{goodsInfo.sellingPrice}}
						</view>
					</view>
					<view class="view-spec">
						{{goodsInfo.normValue[0].normName}}/{{goodsInfo.normValue[0].normValue}}
						<view class="view-num">
							x{{goodsInfo.goodsCount}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="view-form">
			<view class="view-form-inner">
				<view class="view-form-item">
					<view class="view-form-name">
						申请原因:
					</view>
					<text @click="showPopup=true" v-html="reason?reason:'请选择申请原因'"></text>
					<image src="@/static/images/arrow_right.png" mode=""></image>
				</view>
				<view class="view-form-textaera">
					<u--textarea v-model="refundDesc" placeholder="请描述申请售后服务的具体原因"></u--textarea>
					<view class="view-upload">
						<ice-upload-multi-image v-model="refundImg"></ice-upload-multi-image>
					</view>
				</view>
			</view>
		</view>
		<view class="button" @click="afterSale">
			确认提交
		</view>
		<u-popup :show="showPopup" @close="showPopup=false" :round="10">
			<view class="pop-head">
				<text @click="showPopup=false">取消</text>
				<text @click="showPopup=false">确定</text>
			</view>
			<view class="pop-form">
				<u-radio-group v-model="reason" placement="column" @change="groupChange" iconPlacement="right">
					<u-radio :customStyle="{marginBottom: '40rpx'}" v-for="(item, index) in popList" :key="index"
						:label="item.name" :name="item.name" @change="radioChange">
					</u-radio>
				</u-radio-group>
			</view>

		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reason: "", //退款原因
				desc: "", //退款说明
				showPopup: false,
				goodsId:'',//订单id
				refundDesc:'',//退款说明
				refundImg:'',//图片
				goofInfo:{},//商品信息
				
				popList: [{
						name: "商品质量有问题",
						value: 0
					},
					{
						name: "商品数量不对",
						value: 1
					},
					{
						name: "物流太慢",
						value: 2
					},
					{
						name: "暂时不需要了",
						value: 3
					},
				]
			};
		},
		onLoad(option) {
			console.log(option.storeId);
			this.storeId = option.storeId;
			console.log(JSON.parse(decodeURIComponent(option.goodsinfo)))
			// this.val = option.id
			let goodsInfo = JSON.parse(decodeURIComponent(option.goodsinfo));
			goodsInfo.forEach((item,index)=>{
				item['fileList'] = [];
				item['productScore'] = 5;
			})
			this.goodsInfo= goodsInfo[0];
			console.log(goodsInfo);
			this.id = goodsInfo[0].id;
		
		},
		// onShow() {
		// 	this.afterSale()
		// },
		methods: {
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			async afterSale(){
				let res =await this.http.postJson('/app/order/refundApply',{
					orderItemId:this.id,//订单id
					refundDesc:this.refundDesc,//退款原因描述
					refundImg:this.refundImg,//退款原因图片
				})
				console.log(res);
				if(res.code==200){
					this.$toast('申请成功')
					setTimeout(()=>{
						uni.navigateBack({
							
						})
					},1000)
				}else{
					this.$toast(res.msg)
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #F8F8F8;

		.view-order-item {
			width: 100%;
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			padding: 30rpx;
			margin-bottom: 40rpx;

			.view-body {
				width: 100%;
				display: flex;

				.image-item-img {
					width: 120rpx;
					height: 120rpx;
					margin-right: 20rpx;
				}

				.view-info {
					display: flex;
					flex-direction: column;
					flex-grow: 1;
					flex-shrink: 1;

					.view-top {
						display: flex;
						justify-content: space-between;
						margin-bottom: 20rpx;


						.view-name {
							width: 300rpx;
							font-weight: 500;
						}

						.view-price {
							font-weight: bold;
						}
					}

					.view-spec {
						display: flex;
						justify-content: space-between;
						font-size: 24rpx;
						font-weight: 500;
						color: #999999;
					}
				}
			}
		}

		.view-form {
			width: 100%;
			padding: 0 30rpx;
		}

		.view-form-inner {
			padding: 30rpx;
			background: #FFFFFF;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #666666;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border-radius: 20rpx;

			.view-form-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.view-form-name {
					width: 200rpx;
				}

				text {
					flex-grow: 1;
					color: #999999;
					text-align: right;
				}

				image {
					margin-left: 20rpx;
					width: 12rpx;
					height: 22rpx;
				}
			}

			/deep/ .u-textarea {
				width: 690rpx;
				height: 402rpx;
				border-radius: 10rpx;
				margin-top: 30rpx;
				border: none;

				.uni-textarea-placeholder {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}
			}

			.view-upload {
				image {
					width: 160rpx;
					height: 160rpx;
				}
			}
		}

		.button {
			position: absolute;
			bottom: 80rpx;
			width: 590rpx;
			height: 80rpx;
			background: #4b9aff;
			border-radius: 48rpx;
			font-weight: 800;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}

		.pop-head {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 32rpx;
		}

		.pop-form {
			width: 750rpx;
			height: 600rpx;
			background: #FFFFFF;
			color: #333333;
			font-weight: 500;
			padding: 40rpx 32rpx 0;
		}
	}
</style>
