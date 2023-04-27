<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-everylast" v-for="(item,index) in problemList" :key="index">
				<view class="view-head">
					<view class="view-left"></view>
					<view class="view-right">{{item.title}}</view>
				</view>
				<view class="view-option">
					<view class="view-name" @click="item.answerId=child.id"
						:class="item.answerId==child.id?'view-names':'view-name'" v-for="child in item.children">
						{{child.value}}
					</view>
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
						<input type="text" v-model="form.name" placeholder="请输入姓名" />
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						性别
					</view>
					<view class="view-right">
						<ice-selector :range="sexList" rangeKey="name" v-model="form.sex" placeholder="请选择性别">
						</ice-selector>
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						身份证号
					</view>
					<view class="view-right">
						<input type="text" placeholder="请输入身份证号" v-model="form.idCardNum" />
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						所在城市
					</view>
					<view class="view-right">
						<view class="view-input" @click="$refs.selectAddress.show()">
							<text class="address-info" v-if="address">{{address}}</text>
							<text class="address-info-placeholder" v-else>请选择所在地区</text>
						</view>
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						提升方式
					</view>
					<view class="view-right">
						<ice-selector :range="systemLsit" rangeKey="description" v-model="form.liftingMethod"
							placeholder="请选择"></ice-selector>
					</view>
				</view>
				<view class="view-column">
					<view class="view-name">
						联系方式
					</view>
					<view class="view-right">
						<input type="text" v-model="form.contactInformation" placeholder="请输入联系方式" />
					</view>
				</view>
			</view>
		</view>
		<view class="view-button">
			<view class="view-button-a" @click="submit">
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
				sexList: [{
					id: 1,
					name: '男'
				}, {
					id: 2,
					name: '女'
				}, ],

				systemLsit: [],
				problemList: [],
				form: {
					province: '',
					city: '',
					area: '',
					type: 1,
					sex: '',
					name: '',
					idCardNum: "",
					liftingMethod: '',
					contactInformation: '',
				},
			}
		},
		async mounted() {
			await this.getProblem()
		},
		methods: {
			successSelectAddress(address) { //选择成功回调
				if (address.length == 3) {
					this.address = address[0] + '-' + address[1] + '-' + address[2]
					this.form.province = address[0]
					this.form.city = address[1]
					this.form.area = address[2]
					console.log(this.address)
					return
				}
				if (address.length == 2) {
					this.form.address = address[0] + '-' + address[1]
					this.form.province = address[0]
					this.form.city = address[1]
					console.log(this.address)
					return
				}
			},
			async submit() {
				let num = 0
				this.form.formAnswerDataList = this.problemList.map(item => {
					if (item.answerId !== -1) {
						num++
					}
					item.problemId = item.id;
					return {
						problemId: item.id,
						answerId: item.answerId
					};
				});
				if (num !== 5) {
					this.$toast('请选择选项！')
					return
				}
				if (!this.form.name) {
					this.$toast('请输入姓名！')
					return
				}
				if (!this.form.sex) {
					this.$toast('请选择性别！')
					return
				}
				if (!this.form.idCardNum) {
					this.$toast('请输入身份证号！')
					return
				}
				if (!uni.$u.test.idCard(this.form.idCardNum)) {
					this.$toast('身份证号格式不正确！')
					return
				}
				if (!this.form.province) {
					this.$toast('请选择城市！')
					return
				}
				if (!this.form.liftingMethod) {
					this.$toast('请选择提升方式！')
					return
				}
				if (!this.form.contactInformation) {
					this.$toast('请输入联系方式！')
					return
				}
				if (this.form.contactInformation.length != 11) {
					this.$toast("手机号格式不正确");
					return;
				}
				console.log(this.form);
				return
				let res = await this.http.postJson('/app/admissionGuidance/submitSignUpForm', this.form);
				if (res.code == 200) {
					this.$toast(res.msg);
					setTimeout(() => {
						uni.navigateBack({})
					}, 500)
				} else {
					this.$toast(res.msg);
				}
			},
			async getProblem() {
				let res = await this.http.get('/app/admissionGuidance/signUpAnswerQuestions', {});
				if (res.code == 200) {
					res.data.map(item => {
						item.answerId = -1;
					})
					this.problemList = res.data
				} else {
					this.$toast(res.msg);
				}
			},
			async getTypeList() {
				let res = await this.http.post('/app/userHome/systemConfigurationList', {
					configOptionId: 152
				})
				if (res.code === 200) {
					this.systemLsit = res.data
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	/deep/.wrapper {
		bottom: 0rpx;
	}

	/deep/.content_view {
		bottom: -750rpx !important;
	}

	.view-content {
		box-sizing: border-box;
		padding: 30rpx;

		.view-everylast {
			margin-bottom: 10rpx;

			.view-head {
				display: flex;
				align-items: center;
				font-weight: bolder;
				margin-bottom: 30rpx;
				height: 30rpx;
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

			.view-option {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;

				.view-names {
					border: 1rpx solid #4A9AFF !important;
				}

				.view-name {
					width: 330rpx;
					height: 67rpx;
					border-radius: 10rpx;
					font-size: 26rpx;
					text-align: center;
					line-height: 47rpx;
					color: #666666;
					border: 1rpx solid #CCCCCC;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 67rpx;
					margin-bottom: 30rpx;

				}
			}
		}

		.view-content-b {
			margin-bottom: 130rpx;

			.view-head {
				height: 30rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 32rpx;
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
				margin: 20rpx auto;
				text-align: center;
				line-height: 80rpx;
				color: #FFFFFF;
			}
		}


	}
</style>
