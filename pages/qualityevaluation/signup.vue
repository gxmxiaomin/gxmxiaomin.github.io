<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-line">
				<view class="view-name">
					姓名
				</view>
				<view class="view-right-a">
					<input type="text" placeholder="请输入姓名" v-model="form.name" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					性别
				</view>
				<view class="view-right-a">
					<ice-selector :range="sexList" rangeKey="name" v-model="form.sex" placeholder="请选择性别">
					</ice-selector>
					<image src="/static/images/instructorapply1.png" mode=""></image>
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					年龄
				</view>
				<view class="view-right-a">
					<input type="text" placeholder="请输入年龄" v-model="form.age" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					身份证号
				</view>
				<view class="view-right-a">
					<input type="text" placeholder="请输入身份证号" v-model="form.idCardNumber" />
				</view>
			</view>
			<view class="view-line" @click="$refs.selectAddress.show()">
				<view class="view-name">
					所在城市
				</view>
				<view class="view-right-a">
					<ice-text placeholder="请选择城市" :text="form.province+form.city+form.area"></ice-text>
					<image src="/static/images/instructorapply1.png" mode=""></image>
					<selectAddress ref='selectAddress' @selectAddress="(address)=>{
						form.province=address[0]
						form.city=address[1]
						form.area=address[2]?address[2]:''
					}"></selectAddress>
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					申请类别
				</view>
				<view class="view-right-a">
					<ice-selector :range="typeList" rangeKey="description" placeholder="请选择申请类别"
						v-model="form.applicationTypeId"></ice-selector>
					<image src="/static/images/instructorapply1.png" mode=""></image>
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					联系方式
				</view>
				<view class="view-right-a">
					<input type="text" v-model="form.phone" placeholder="请输入联系方式" />
				</view>
			</view>
			<view class="view-line">
				<view class="view-name">
					报名机构
				</view>
				<view class="view-right-a">
					<input type="text" v-model="form.registrationAgencyName" placeholder="请输入报名机构" />
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-button" @click="submit">
				提交资料
			</view>
		</view>
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
				typeList: [],
				sexList: [{
					id: 1,
					name: '男',
				}, {
					id: 2,
					name: '女',
				}, ],
				form: {
					province: '',
					city: '',
					area: '',
					type: 2,
				},
			}
		},
		onShow() {
			this.queryTypeList();
		},
		methods: {
			async submit() {
				if(!this.form.name){
					this.$toast('请输入姓名！')
					return
				}
				if(!this.form.sex){
					this.$toast('请选择性别！')
					return
				}
				if(!this.form.age){
					this.$toast('请输入年龄！')
					return
				}
				if(!this.form.idCardNumber){
					this.$toast('请输入身份证号！')
					return
				}
				if(!uni.$u.test.idCard(this.form.idCardNumber)){
					this.$toast('身份证号格式不正确！')
					return
				}
				if(!this.form.province){
					this.$toast('请选择城市！')
					return
				}
				if(!this.form.applicationTypeId){
					this.$toast('请选择申请类别！')
					return
				}
				if(!this.form.phone){
					this.$toast('请输入联系方式！')
					return
				}
				if(!uni.$u.test.mobile(this.form.phone)){
					this.$toast('手机号格式不正确！')
					return
				}
				if(!this.form.registrationAgencyName){
					this.$toast('请输入报名机构！')
					return
				}
				let res = await this.http.postJson('/app/studentAssessment/studentSignUp', this.form);
				if (res.code == 200) {
					await this.$toast('报名成功');
					uni.navigateBack({

					})
				} else {
					this.$toast(res.msg);
				}
			},
			async queryTypeList() {
				let res = await this.http.post('/app/userHome/systemConfigurationList', {
					configOptionId: 165,
				});
				if (res.code == 200) {
					this.typeList = res.data;
				} else {
					// this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	/deep/.uni-input-input {
		color: #333333;
		font-size: 28rpx;
	}

	/deep/.placeholder {
		span {
			color: #c0c4cc;
			font-size: 28rpx;
		}
	}

	/deep/.uni-input-placeholder {
		color: #c0c4cc;
		font-size: 28rpx;
	}

	.view-content {
		.view-content-a {
			width: 750rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx 31rpx;
			margin-bottom: 280rpx;

			.view-line {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.view-name {
					height: 27rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.view-right-a {
					width: 559rpx;
					height: 80rpx;
					background: #F8F9FA;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding-left: 30rpx;
					padding-right: 30rpx;

					image {
						width: 22rpx;
						height: 13rpx;
					}

					input {
						height: 27rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
			}
		}

		.view-content-b {
			width: 750rpx;
			height: 98rpx;
			background: #FFFFFF;
			overflow: hidden;

			.view-button {
				width: 690rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 40rpx;
				margin: 0 auto;
				margin-top: 9rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 80rpx;
				text-align: center;
			}
		}
	}
</style>
