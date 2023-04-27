<template>
	<view class="view-container">
		<view class="view-form">
			<view class="view-form-item">
				<view class="view-item-name">
					收货人
				</view>
				<view class="view-input">
					<input type="text" v-model="consigneeName" placeholder="请填写收货人姓名" />
				</view>
			</view>
			<view class="view-form-item">
				<view class="view-item-name">
					手机号码
				</view>
				<view class="view-input">
					<input type="number" v-model="consigneePhone" placeholder="请填写收货人手机号" />
				</view>
			</view>
			<view class="view-form-item">
				<view class="view-item-name">
					所在地区
				</view>
				<view class="view-input" @click="$refs.selectAddress.show()">
					<text class="address-info" v-if="address">{{address}}</text>
					<text class="address-info-placeholder" v-else>请选择所在地区</text>
					<image src="@/static/images/right.png" mode=""></image>
				</view>
			</view>
			<view class="view-form-item" style="align-items: flex-start;">
				<view class="view-item-name" style="margin-top: 30rpx;">
					详细地址
				</view>
				<u--textarea v-model="consigneeHouseNumber" placeholder="街道、楼牌号等"></u--textarea>
			</view>
			<view class="view-list">
				<text class="text-default">设置为默认地址</text>
				<u-switch v-model="value" activeColor="#4A9AFF" @change="change"></u-switch>
			</view>
		</view>
		<view class="view-bottom">
			<button class="u-reset-button button-delete" v-if="show==true" @click="deletes">删除</button>
			<button class="u-reset-button button-submit" @click="submits">保存</button>
		</view>
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
	</view>
</template>

<script>
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	export default {
		components: {
			selectAddress
		},
		data() {
			return {
				value: true,
				address: "",
				consigneeHouseNumber: "", //详细地址
				consigneeName: '', //收货人姓名
				consigneePhone: '', //收货人电话
				isDefault: 1,
				id: '',
				show: '',
			}
		},
		onShow() {

		},
		onLoad(option) {
			this.id = option.id
			if (option.id == '' || option.id == undefined) {

			} else {
				this.show = true
				this.getaddressInfo()
			}
		},
		methods: {
			deletes() {
				this.postaddress()
			},
			async postaddress() {
				let res = await this.http.postJson('/app/address/deleteOne', {
					id: this.id
				});
				if (res.code == 200) {
					this.$toast(res.msg);
					// setTimeout(function(){
					// 	uni.navigateTo({
					// 		url:'../market-address/market-address'
					// 	})
					// },500)
					uni.navigateBack({
						delta: 1,
					})
				} else {
					this.$toast(res.msg);
				}
			},
			async getaddressInfo() {
				let res = await this.http.get('/app/address/getInfo', {
					id: this.id
				});
				if (res.code == 200) {
					this.consigneeName = res.data.consigneeName
					this.consigneePhone = res.data.consigneePhone
					this.consigneeHouseNumber = res.data.consigneeHouseNumber
					this.address = res.data.consigneeAddress
					if (res.data.isDefault == 0) {
						this.value = false
					} else {
						this.value = true
					}
				} else {
					this.$toast(res.msg);
				}
			},
			change(e) {
				console.log('change', e);
				if (e == true) {
					this.isDefault = 1
				} else {
					this.isDefault = 0
				}
			},
			successSelectAddress(address) { //选择成功回调
				if (address.length == 3) {
					this.address = address[0] + '-' + address[1] + '-' + address[2]

					return
				}
				if (address.length == 2) {
					this.address = address[0] + '-' + address[1]

					return
				}
			},
			async submitForm() {
				if (!this.consigneeName) {
					this.$toast("请输入收货人姓名");
					return;
				}
				if (!this.consigneePhone) {
					this.$toast("请输入手机号");
					return;
				}
				if (this.consigneePhone.length != 11) {
					this.$toast("手机号格式不正确");
					return;
				}
				if (!this.address) {
					this.$toast("请选择收货地址");
					return;
				}
				if (!this.consigneeHouseNumber) {
					this.$toast("请输入详细地址")
					return;
				}
				let res = await this.http.postJson('/app/address/save', {
					consigneeName: this.consigneeName, //收货人姓名
					consigneePhone: this.consigneePhone, //收货人电话
					consigneeAddress: this.address, //地址
					consigneeHouseNumber: this.consigneeHouseNumber, //详细地址
					isDefault: this.isDefault,
					id: this.id
				});
				if (res.code == 200) {
					this.$toast(res.msg)
					uni.navigateBack({})
				} else {

				}
			},
			submits() {
				this.submitForm()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-bottom {
		width: 100%;
		display: flex;
		justify-content: center;

		.button-delete {
			width: 630rpx;
			height: 80rpx;
			background: #ff0000;
			border-radius: 40rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80rpx;
			position: fixed;
			bottom: 140rpx;
		}

		.button-submit {
			width: 630rpx;
			height: 80rpx;
			background: #4A9AFF;
			border-radius: 40rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80rpx;
			position: fixed;
			bottom: 30rpx;
		}
	}

	.view-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx;

		.view-form-item {
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			.view-item-name {
				width: 130rpx;
				font-size: 28rpx;
				color: #333333;
				margin-right: 31rpx;
			}

			/deep/.u-textarea {
				padding: 30rpx;
				background-color: #F6F6F6;
				border: none;

				.u-textarea__field {
					width: auto;
				}

				.uni-textarea-textarea {
					color: #000000 !important;
				}

				.uni-textarea-placeholder {
					font-size: 28rpx !important;
					color: #999999 !important;
				}
			}

			.view-input {
				width: 100%;
				flex-shrink: 1;
				height: 80rpx;
				background: #F6F6F6;
				border-radius: 10rpx;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				input {
					height: 100%;

					.uni-input-placeholder {
						font-size: 28rpx;
						color: #999999;
					}
				}

				.address-info-placeholder {
					font-size: 28rpx;
					color: #999999;
				}

				.address-info {
					font-size: 28rpx;
				}

				image {
					width: 12rpx;
					height: 20rpx;
					margin-left: 12rpx;
				}
			}
		}

		.view-list {
			display: flex;
			width: 100%;
			align-items: center;
			border-bottom: 3rpx solid #F8F8F8;
			padding: 30rpx 0rpx;

			/deep/ .u-switch {
				margin-left: auto;
			}


			.text-default {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
			}

			.input-details {
				flex-grow: 1;
				flex-shrink: 1;
				text-align: right;

				.input-trip {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}
			}
		}
	}
</style>
