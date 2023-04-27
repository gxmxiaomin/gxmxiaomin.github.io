<template>
	<view class="view-container">
		<ice-statusbar></ice-statusbar>
		<ice-navbar>
			<u-navbar safeAreaInsetTop placeholder fixed title="退货退款" @leftClick="uni.navigateBack({
				
			})">
				<view class="u-nav-slot" slot="right">
					<u-button class="nav-button" type="primary" @click="publish">退款</u-button>
				</view>
			</u-navbar>
		</ice-navbar>
		<view class="view-inner">
			<view class="view-order-item">
				<view class="view-body">
					<image class="image-item-img" :src="schoolImg" mode=""></image>
					<view class="view-info">
						<view class="view-top">
							<view class="view-name">
								{{shopInfo.goodsName}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="view-inputer">
				<u--textarea v-model="value" placeholder="请输入退货原因"></u--textarea>
				<view class="view-upload">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="10"></u-upload>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				rateValue: 5,
				val: '',
				fileList1: [],
				shopInfo: {},
				schoolImg:'',
				orderId:'',
				pics:'',   //评价图片
				orderInfo:[],
			};
		},
		onShow() {
			this.getshopInfo()
		},
		onLoad(option) {
			this.val = option.id
			this.orderId = option.orderId
		},
		methods: {
			publish(){
				this.addNevaluate()
			},
			//退货
			async addNevaluate(){
				let res=await this.http.postJson('/app/order/refundApply',{
					refundDesc:this.value,
					refundImg:this.pics,
					orderItemId:this.shopInfoId,
				});
				if(res.code==200){
					this.$toast('退款成功');
					setTimeout(function(){
						uni.navigateTo({
							url:'../my-order/my-order'
						})
					},1000)
				}else{
					this.$toast(res.msg);
				}
			},
			// 新增图片
			async afterRead(event) {
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].thumb)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			async uploadFilePromise(url) {
				let res= await this.http.upload(url)
				this.pics = res.data
			},
			async getshopInfo() {
				let res = await this.http.get('/app/order/info', {
					id: this.val
				});
				if (res.code == 200) {
					this.shopInfo = res.data.orderItems[0]
					this.schoolImg = this.getCover(res.data.orderItems[0].goodsCoverImg)
					this.shopInfoId = res.data.orderItems[0].id
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 30rpx;

		/deep/ .u-navbar {
			.uicon-arrow-left {
				color: #000000 !important;

			}

			.u-navbar__content__title {
				color: #000000 !important;
				line-height: 32rpx;
			}
		}

		.nav-button {
			width: 130rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 80rpx;
		}

		.view-inner {
			width: 100%;
			background: #FFFFFF;
		}

		.view-order-item {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 30rpx;

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
						font-size: 28rpx;

						.view-name {
							font-weight: 500;
							flex-shrink: 1;
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

		.view-inputer {
			width: 100%;
			height: 402rpx;
			border-radius: 10rpx;
			padding: 30rpx;
			margin-bottom: 28rpx;

			/deep/ .u-textarea {
				border: none;
				padding: 0;
				height: 182rpx;

				.uni-textarea-placeholder {
					font-size: 24rpx;
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

		.view-rate {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			margin-bottom: 30rpx;

			.view-rate-title {
				font-weight: bold;
				color: #333333;
				margin-right: 20rpx;
			}

			text {
				font-size: 28rpx;
			}
		}
	}
</style>
