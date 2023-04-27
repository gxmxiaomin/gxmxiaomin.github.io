<template>
	<view class="view-container">
		<view class="view-no-data" v-if="list.length===0">
			<image src="@/static/images/no_address.png" mode=""></image>
			<text>你还没有添加地址呢，快去添加一个！</text>
		</view>
		<view class="view-address-list">
			<view class="view-address-item" v-for="(item,index) in list" :key="index">
				<!-- <image src="../../static/images/cgenggong.png" mode="" v-if="checked" @click="checked=!checked"></image>
				<image src="../../static/images/nocheck.png" mode="" v-else @click="checked=!checked"></image> -->
				<view class="view-address-inner" @click="select(item.id)">
					<view class="view-user-info">
						<view class="view-user-name">
							{{item.consigneeName}}
						</view>
						<view class="view-user-phone">
							{{item.consigneePhone}}
						</view>
						<view v-if="item.isDefault == 1" class="moren">
							默认地址
						</view>
					</view>
					<view class="view-address-info">
						{{item.consigneeAddress}}
					</view>
				</view>
				<image src="@/static/images/edit.png" mode="" @click="uni.navigateTo({
					url:'../market-add-address/market-add-address?id='+item.id
				})"></image>
			</view>
		</view>
		<view class="bottom">
			<view class="button" @click="uni.navigateTo({
					url:'../market-add-address/market-add-address'
				})">
				新增收货地址
			</view>
		</view>
		<u-modal :show="showModal" content='是否删除地址?' :showCancelButton="true" confirmColor="#00CCCE"
			cancelColor="#333333" @cancel="showModal=false"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false, //展示确认框
				list: [],
				checked: false,
				mydata: {
					value: '',
				}
			}
		},
		onLoad(option) {
			if (option.loca) {

			}
		},
		async onShow() {
			await this.getList()
		},
		methods: {
			async getList() {
				let res = await this.http.get('/app/address/list', {});
				console.log(res)
				if (res.code == 200) {
					this.list = res.data
				} else {

				}
			},

			async select(id) {
				let res = await this.http.get('/app/address/getInfo', {
					id: id
				});
				console.log(res)
				this.mydata.value = res.data.consigneeHouseNumber

				uni.$emit('updateData', this.mydata)
								uni.navigateBack({
									delta: 1
								})
				//这里是获取页面栈 调用上一个页面的方法实现更新
				// let pages = getCurrentPages();//获取页面栈  当前页面
				// let beforePage = pages[pages.length - 2];//上一页
				// 		  // beforePage.$vm.chooseImage()  //上一页的方法名
				// 		  uni.navigateBack({ //返回
				// 		    delta: 1
				// 		  })
			}
		}
	}
</script>

<style lang="scss">
	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		.view-no-data {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 350rpx;
				height: 230rpx;
				margin: 180rpx 0 60rpx;
			}

			text {
				font-weight: 500;
				color: #999999;
			}
		}

		.view-address-list {
			width: 100%;

			.view-address-item {
				width: 100%;
				padding: 40rpx 30rpx;
				background: #FFFFFF;
				font-weight: 500;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;

				image {
					width: 33rpx;
					height: 33rpx;
				}

				.view-address-inner {
					.view-user-info {
						display: flex;
						font-size: 32rpx;
						font-weight: 500;
						color: #333333;
						margin-bottom: 10rpx;

						.view-user-name {
							margin-right: 34rpx;
						}
						.moren {
							border: 1rpx solid #4A9AFF;
							padding: 3rpx 10rpx ;
							font-size: 24rpx;
							color: #4A9AFF;
							margin-left: 20rpx;
						}
					}

					.view-address-info {
						font-size: 28rpx;
						color: #999999;
					}
				}

			}
		}

		.bottom {
			width: 100%;
			position: fixed;
			background-color: #FFFFFF;
			bottom: 0;
			display: flex;
			justify-content: center;
			padding: 30rpx 0;

			.button {
				width: 630rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 40rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 80rpx;
				position: fixed;
				bottom: 30rpx;
				text-align: center;
			}
		}

		/deep/ .u-modal {
			width: 600rpx !important;
			height: 264rpx;
			background: #FFFFFF;
			border-radius: 24rpx;

			.u-modal__content {
				padding-top: 80rpx !important;
				border-bottom: 2rpx solid #EFEFEF;

				.u-modal__content__text {
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					text-align: center;
				}
			}

			.u-line {
				display: none;
			}

			.u-modal__button-group__wrapper__text {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-weight: 500;
			}

			.u-modal__button-group__wrapper--cancel {
				border-right: 1rpx solid #EFEFEF;
			}

			.u-modal__button-group__wrapper--confirm {
				border-left: 1rpx solid #EFEFEF;
			}
		}

	}
</style>
