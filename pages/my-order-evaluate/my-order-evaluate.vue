<template>
	<view class="view-container">
		<ice-statusbar></ice-statusbar>
		<ice-navbar>
			<u-navbar safeAreaInsetTop placeholder fixed title="发表评价" @leftClick="uni.navigateBack({
				
			})">
				<view class="u-nav-slot" slot="right">
					<u-button class="nav-button" type="primary" @click="addNevaluate">发表</u-button>
				</view>
			</u-navbar>
		</ice-navbar>

		<view class="view-inner" v-for="(item,index) in goodsInfo" :key="index">
			<view class="view-order-item">
				<view class="view-body">
					<image class="image-item-img" :src="item.goodsCoverImg" mode=""></image>
					<view class="view-info">
						<view class="view-top">
							<view class="view-name">
								{{item.goodsName}}
							</view>
						</view>
						<view class="view-spec">
							<text v-for="(norm,i) in item.normValue" :key="i">{{norm.normValue}}</text>
							<view class="view-num">
								￥{{item.sellingPrice}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="view-rate">
				<view class="view-rate-title">
					评价商品
				</view>
				<u-rate count="5" v-model="item.productScore" active-color="#ffcc00" inactive-color="#b2b2b2"></u-rate>
				<text>{{item.productScore}}.0分</text>
			</view>
			<view class="view-inputer">
				<u--textarea v-model="item.comment" placeholder="从多个角度评价宝贝,可以帮助更多想买的人..."></u--textarea>
				<view class="view-upload">

					<u-upload :fileList="fileList1" previewFullImage @afterRead="afterRead" @delete="deletePic" name="1"
						multiple :maxCount="10"></u-upload>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: [], // 商品信息
				storeId: '', // 店铺id
				orderId: '', // 订单id

				fileList1: [],

				value: "", // 评论
				rateValue: 5,
				val: '',

				pics: '', //评价图片

				shopInfo: {},
			};
		},

		onLoad(option) {
			this.storeId = option.storeId; // 店铺id
			let goodsInfo = JSON.parse(decodeURIComponent(option.goodsinfo));
			goodsInfo.forEach((item, index) => {
				item['fileList'] = [];
				item['productScore'] = 5;
				item['comment'] = '';
			})
			this.goodsInfo = goodsInfo;
			console.log('接收到的商品列表:', this.goodsInfo);
			this.orderId = goodsInfo[0].orderId; // 订单id
		},
		methods: {
			score(e) {
				console.log(e);
				console.log(this.goodsInfo);
			},
			// 新增评论
			async addNevaluate() {
				console.log(this.fileList1);
				let picfile = [];
				this.fileList1.forEach((val, i) => {
					picfile.push(val.thumb)
				})
				let str = picfile.join(',');
				let goodsArr = [];
				this.goodsInfo.forEach((item, index) => {
					goodsArr.push({
						oid: item.orderId, // 订单id
						storeId: this.storeId, // 店铺id
						comment: item.comment, // 评论内容
						productId: item.goodsId, // 商品id
						productScore: item.productScore, // 商品分数
						replyType: 1,
						pics: str, //评价图片
					});
				})
				console.log(this.goodsInfo);
				console.log('将要提交的商品', goodsArr);
				let arr = JSON.stringify(goodsArr)
				let res = await this.http.postJson('/app/order/toEvaluate', arr);
				if (res.code == 200) {
					this.$toast('发表成功');
					setTimeout(() => {
						// uni.navigateBack({})
						uni.navigateTo({
							url:'../my-order/my-order'
						})
					}, 1000)
				} else {
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
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
				console.log(this.goodsInfo);
			},
			async uploadFilePromise(url) {
				let res = await this.http.upload(url)
				console.log(res);
				this.pics = res.data
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},

			// async getshopInfo() {
			// 	console.log(this.val);
			// 	let res = await this.http.get('/app/goods/info', {
			// 		id: this.val
			// 	});
			// 	console.log('1111111111111111',res);
			// 	if (res.code == 200) {

			// 		this.shopInfo = res.data
			// 	} else {
			// 		this.$toast(res.msg);
			// 	}
			// }
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
