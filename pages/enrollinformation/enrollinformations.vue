<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-column">
				<view class="view-top">
					<view class="view-left">

					</view>
					<view class="view-right">
						请选择高考省份
					</view>
				</view>
				<view class="view-bottom">
					<view class="view-input" @click="$refs.selectAddress.show()">
						<text class="address-info" v-if="address">{{address}}</text>
						<text class="address-info-placeholder" v-else>请选择所在地区</text>
					</view>
				</view>
			</view>
			<view class="view-column">
				<view class="view-top">
					<view class="view-left">

					</view>
					<view class="view-right">
						预估高考总分
					</view>
				</view>
				<view class="view-bottom">
					<input type="number" value="" placeholder="请输入您的预估高考总分" v-model="examinationFraction" />
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-head">
				基本信息
			</view>
			<view class="view-information">
				<view class="view-column">
					<view class="view-name">
						姓名
					</view>
					<view class="view-right">
						<input type="text" placeholder="请输入姓名" v-model="name" />
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						性别
					</view>
					<view class="view-right" @click="show = true">
						<ice-selector v-model="sex" :range="sexList" rangeKey="traineeSex" placeholder="请选择性别"
							placeholder-class="selects"></ice-selector>
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						身份证号
					</view>
					<view class="view-right">
						<input type="text" placeholder="请输入身份证号" value='' v-model="idCardNum" />
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						所在城市
					</view>
					<view class="view-right">
						<input type="text" placeholder="请输入所在城市" value='' v-model="examinationProvince" />
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						提升方式
					</view>
					<view class="view-right">
						<ice-selector v-model="liftingMethod" :range="systemLsit" rangeKey="description"
							placeholder="请选择性别" placeholder-class="selects"></ice-selector>
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						联系方式
					</view>
					<view class="view-right">
						<input type="text" placeholder="请输入联系方式" value='' v-model="contactInformation" />
					</view>
				</view>
			</view>
		</view>
		<view class="view-button">
			<view class="view-button-a" @click="tjForm">
				提交信息
			</view>
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
				address: "",
				sex: '',
				contactInformation: '', //联系方式
				province: '', //省
				city: '', //市
				area: '', //区
				idCardNum: '', //身份证号
				liftingMethod: '', //提升方法
				examinationProvince: '', //所在城市
				name: '', //姓名
				examinationFraction: '', //预估分数
				show: false,
				sexList: [{
					id: 1,
					traineeSex: '男'
				}, {
					id: 2,
					traineeSex: '女'
				}, ],
				systemLsit: [],
			}
		},
		onLoad() {
			this.getProblem()
		},
		methods: {
			confirm(e) {
				console.log(e.value)
				this.show = false
				this.sex = e.value
			},
			successSelectAddress(address) { //选择成功回调
				if (address.length == 3) {
					this.address = address[0] + '-' + address[1] + '-' + address[2]
					this.province = address[0]
					this.city = address[1]
					this.area = address[2]
					console.log(this.address)
					return
				}
				if (address.length == 2) {
					this.address = address[0] + '-' + address[1]
					this.province = address[0]
					this.city = address[1]
					console.log(this.address)
					return
				}
			},
			async getProblem() {
				let res = await this.http.post('/app/userHome/systemConfigurationList', {
					configOptionId: 152,
				});
				if (res.code == 200) {
					this.systemLsit = res.data
				} else {
					this.$toast(res.msg);
				}
			},
			// 提交报名
			async tjForm() {
				if (!this.examinationFraction) {
					this.$toast('请输入预估分数');
					return;
				}
				if (!this.name) {
					this.$toast('请输入姓名');
					return;
				}
				if (!this.sex) {
					this.$toast('请选择性别');
					return;
				}
				if (!this.idCardNum) {
					this.$toast('请输入身份证号');
					return;
				}
				if (!uni.$u.test.idCard(this.idCardNum)) {
					this.$toast('身份证号格式不正确！')
					return
				}
				if (!this.examinationProvince) {
					this.$toast('请输入所在城市');
					return;
				}
				if (!this.liftingMethod) {
					this.$toast('请选择提升方式');
					return;
				}
				if (!this.contactInformation) {
					this.$toast('请输入联系方式');
					return;
				}
				let res = await this.http.postJson('/app/admissionGuidance/submitSignUpForm', {
					province: this.province,
					name: this.name,
					area: this.area,
					city: this.city,
					sex: this.sex,
					type: '2',
					contactInformation: this.contactInformation,
					idCardNum: this.idCardNum,
					liftingMethod: this.liftingMethod,
					examinationFraction: this.examinationFraction,
					examinationProvince: this.examinationProvince,
				});
				if (res.code == 200) {
					this.$toast(res.msg);
					setTimeout(function() {
						uni.navigateTo({
							url: '../volunteer/volunteer'
						})
					}, 1000)
				} else {

				}
			},
		}
	}
</script>

<style lang="scss">
	/deep/.uni-input-placeholder {
		font-size: 26rpx;
		color: #c0c4cc;
	}

	.view-content {
		box-sizing: border-box;
		padding: 30rpx;

		.view-content-a {
			.view-column {
				margin-bottom: 40rpx;

				.view-top {
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;
					height: 31rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 32rpx;

					.view-left {
						width: 10rpx;
						height: 32rpx;
						background-color: #4A9AFF;
						margin-right: 20rpx;
					}
				}

				.view-bottom {
					width: 690rpx;
					height: 80rpx;
					background: #FFFFFF;
					border: 1rpx solid #CCCCCC;
					border-radius: 10rpx;

					.view-input {
						width: 100%;
						height: 100%;
						display: flex;
						align-items: center;
						padding-left: 30rpx;
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;

						.address-info-placeholder {
							line-height: 100%;
						}
					}

					input {
						margin-left: 20rpx;
						margin-top: 20rpx;
						height: 26rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}
				}
			}
		}

		.view-content-b {
			margin-bottom: 257rpx;

			.view-head {
				height: 30rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 30rpx;
			}

			.view-column {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 20rpx 0;

				.view-name {
					height: 27rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.view-right {
					width: 559rpx;
					height: 80rpx;
					background: #F6F6F6;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					padding-left: 20rpx;
				}
			}
		}

		.view-button {
			width: 750rpx;
			height: 98rpx;
			background: #FFFFFF;
			position: fixed;
			left: 0;
			bottom: 0;

			.view-button-a {
				width: 630rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 40rpx;
				margin: 9rpx auto;
				background-color: #4A9AFF;
				text-align: center;
				line-height: 80rpx;
				color: #FFFFFF;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
