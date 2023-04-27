<template>
	<view class="view-content">
		<view class="view-content-a">
			<view class="view-title">
				基本信息
			</view>
			<view class="view-subject">
				<view class="view-line">
					<view class="view-name">
						头像
					</view>
					<view class="view-right">
						<image :src="form.headUrl" mode=""></image>
						<view class="view-upload" @click="chooseAvatar()">
							上传
						</view>
					</view>
				</view>
				<view class="view-line">
					<view class="view-name">
						姓名
					</view>
					<view class="view-right-a">
						<input type="text" v-model="form.name" placeholder="请输入姓名" />
					</view>
				</view>
				<view class="view-line">
					<view class="view-name">
						性别
					</view>
					<view class="view-right-a">
						<ice-selector :range="sexList" rangeKey="name" v-model="form.sex"></ice-selector>
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
						<selectAddress ref='selectAddress' @selectAddress="(address)=>{
							form.province=address[0]
							form.city=address[1]
							form.area=address[2]
						}"></selectAddress>
						<image src="/static/images/instructorapply1.png" mode=""></image>
					</view>
				</view>
				<view class="view-line">
					<view class="view-name">
						申请类别
					</view>
					<view class="view-right-a">
						<ice-selector :range="typeList" rangeKey="description" 
						placeholder="请选择申请类别"
						v-model="form.applicationTypeId"></ice-selector>
						<image src="/static/images/instructorapply1.png" mode=""></image>
					</view>
				</view>
				<view class="view-line">
					<view class="view-name">
						联系方式
					</view>
					<view class="view-right-a">
						<input type="text" placeholder="请输入联系方式" v-model="form.phone" />
					</view>
				</view>
			</view>
		</view>
		<view class="view-content-b">
			<view class="view-one">
				<view class="view-left">
					教官申请文件
				</view>
				<image 
				@click="download"
				src="/static/images/instructorapply.png" mode=""></image>
			</view>
			<view class="view-two">
				请下载文件，并完整填写资料后，上传到平台
			</view>
			<view class="view-three" @click="upload">
				上传文件
			</view>
			<view class="view-four" v-if="form.fileUrl">
				教官申请文件.docx
			</view>
		</view>
		<view class="view-content-c">
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
				sexList: [{
					id: 1,
					name: '男',
				}, {
					id: 2,
					name: '女',
				}, ],
				form: {
					age: '',
					applicationTypeId: 0,
					province: '',
					city: '',
					city: '',
					area: '',
					fileUrl: '',
					headUrl: '/static/images/instructorapply2.png',
					idCardNumber: '',
					name: '',
					phone: '',
					sex: 1,
					type: 1,
				},
				typeList: [],
				templateUrl:'',
			}
		},
		onShow() {
			this.queryTypeList();
			this.getFileUrl();
		},
		methods: {
			async submit(){
				let res=await this.http.postJson('/app/studentAssessment/instructorApply',this.form);
				if(res.code==200){
					await this.$toast('提交成功');
					uni.navigateBack({
						
					})
				}else{
				this.$toast(res.msg);
				}
			},
			async upload() {
				// #ifndef H5
				var filePicker = uni.requireNativePlugin("Yunzan-FilePicker");
				filePicker.chooseFile({}, async (result) => {
					if (result.code == 200) {
						let res = await this.http.upload(result.data);
						if (res.code == 200) {
							this.status = 1;
							this.form.fileUrl = res.data;
						} else {
							this.$toast(result.msg);
						}
					}
			
				})
				// #endif
				// #ifdef H5
				uni.chooseFile({
					count: 1,
					success: async (result) => {
						let res = await this.http.upload(result.tempFilePaths[0]);
						if (res.code == 200) {
							this.status = 1;
							this.form.fileUrl = res.data;
						} else {
							this.$toast(res.msg);
						}
					}
				});
				// #endif
			
			},
			async download(){
				uni.downloadFile({
					url:this.templateUrl,
					success:(result)=>{
						uni.saveFile({
							tempFilePath:result.tempFilePath,
							success:(res)=>{
								this.$toast("保存位置："+res.savedFilePath);
							},
						})
					}
				})
			},
			async getFileUrl(){
				let res=await this.http.post('/app/userHome/platformAgreement',{
					protocolType:'instructorApplyFile'
				});
				if(res.code==200){
					this.templateUrl=res.data.protocolContent;
				}else{
				// this.$toast(res.msg);
				}
			},
			async queryTypeList() {
				let res = await this.http.post('/app/userHome/systemConfigurationList', {
					configOptionId: 160,
				});
				if (res.code == 200) {
					this.typeList = res.data;
				} else {
					// this.$toast(res.msg);
				}
			},
			async chooseAvatar() {
				uni.chooseImage({
					count: 1,
					success: async (result) => {
						let res = await this.http.upload(result.tempFilePaths[0]);
						if (res.code == 200) {
							this.form.headUrl = res.data;
						} else {
							this.$toast(res.msg);
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.view-content {
		background-color: #F7F7F7;

		.view-content-a {
			width: 750rpx;
			height: 930rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding: 30rpx 31rpx;
			margin-bottom: 30rpx;

			.view-title {
				height: 31rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 49rpx;
			}

			.view-subject {
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

					.view-right {
						display: flex;
						align-items: center;
						width: 559rpx;
						height: 80rpx;

						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right: 20rpx;
						}

						.view-upload {
							height: 29rpx;
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							text-decoration: underline;
							color: #4A9AFF;
							line-height: 6rpx;
							border-bottom: 1rpx solid #4A9AFF;
						}
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
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}
					}
				}
			}
		}

		.view-content-b {
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin: 0 auto;
			margin-bottom: 30rpx;
			box-sizing: border-box;
			padding: 30rpx;

			.view-one {
				display: flex;
				align-items: center;
				margin-bottom: 19rpx;

				.view-left {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-right: 20rpx;
				}

				image {
					width: 20rpx;
					height: 20rpx;
				}
			}

			.view-two {
				width: 630rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF0000;
				box-sizing: border-box;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #EFEFEF;
				margin-bottom: 30rpx;

			}

			.view-three {
				width: 630rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 40rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 80rpx;
				text-align: center;
				margin-bottom: 27rpx;
			}

			.view-four {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				text-align: center;
			}
		}

		.view-content-c {
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
