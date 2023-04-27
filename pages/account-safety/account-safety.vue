<template>
	<view>
		<view style="margin-top: 20rpx;background-color: #ffffff;">

			<view style="margin-top: 20rpx;background-color: #ffffff;">
				<view class="view-item" @click="shiMing">
					<text class="text-label">实名认证</text>
					<view class="flex-grow">
					</view>
					<text class="text-value">{{shiming}}</text>
					<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
				</view>
				<!-- <view class="view-item" @click="uni.navigateTo({
				url:'../number-qualifications/number-qualifications'
			})"> -->
				<view class="view-item" @click="ziZhiRenZheng">
					<text class="text-label">资质认证</text>
					<view class="flex-grow">
					</view>
					<text class="text-value">{{zizhi}}</text>
					<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
				</view>
			</view>

		</view>


		<view style="margin-top: 20rpx;background-color: #ffffff;">
			<view class="view-item" @click="uni.navigateTo({
			url:'../phone-number/phone-number?id='+phoneNum
		})">
				<text class="text-label">手机号码</text>
				<view class="flex-grow">
				</view>
				<text style="margin-right: 10rpx;">{{this.phoneNum}}</text>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>

			<view class="view-item" @click="uni.navigateTo({
				url:'../reset-password/reset-password'
			})">
				<text class="text-label">修改密码</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
		</view>
		<view style="margin-top: 20rpx;background-color: #ffffff;">
			<view class="view-item" @click="clickAccountCancellation">
				<text class="text-label">账号注销</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
		</view>
		


	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum: '',
				storageSize: '',
				shiming: '未实名',
				zizhi: '未认证',
				sta: '',
			};
		},
		onShow() {
			this.phone()
			this.getRenZheng();
		},
		onLoad() {
			// this.getRenZheng();
		},
		methods: {
			shiMing(){
				if(this.shiming == '未实名'){
					uni.navigateTo({
						url:'../number-userreal/number-userreal'
					})
				}else{
					uni.navigateTo({
						url:'../number-userreal/number-userreal2'
					})
					 // return this.$toast('一个账号仅限一次认证机会');
				}
			},
			//获取手机号
			async phone() {
				let res = await this.http.post('/app/user/obtainPhoneNum')
				console.log(res)
				console.log(this.phoneNum)
				var tel = res.data
				tel = "" + tel;
				var newTel = tel.substr(0, 3) + "****" + tel.substr(7)
				console.log(newTel);
				this.phoneNum = newTel


			},

			// 账号注销
			clickAccountCancellation() {
				
				// let that = this;
				// that.sshoef = true
				uni.navigateTo({
					url:'/pages/my-zhux/my-zhux'
				})
				// uni.showModal({
				// 	title: '账号注销',
				// 	content: '确定注销账号吗？',
				// 	success(res) {
				// 		if (res.confirm) {
				// 			that.accountCancellation();
				// 		}
				// 	}
				// })
			},

			async accountCancellation() {
				let res = await this.http.post('/app/userInfo/userLogOutInfo');
				console.log('账号注销', res);
				if (res.code == 200) {
					uni.clearStorageSync('token');
					this.$toast('注销成功')
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},

			async getRenZheng() {
				let that = this;
				let res = await that.http.post('/app/userInfo/selectUserPerfectInformation', {});
				console.log(res);
				if (res.code == 200 && res.data != null) {
					console.log(res);
					this.getAuditStatus(res.data.auditStatus);
					this.sta = res.data.auditStatus;
				}
			},
			
			getAuditStatus(status) {
			    var that = this;
			    if (status == 0) {
			     that.shiming = '已实名';
			     that.zizhi = '审核中';
			    }
			    if (status == 1) {
			     that.shiming = '已实名';
			     that.zizhi = '已认证';
			    }
			    if (status == 2) {
			     that.shiming = '已实名';
			     that.zizhi = '认证失败';
			    }
			    if (status == 3) {
			     that.shiming = '未实名';
			     that.zizhi = '未实名';
			    }
			    if (status == 4) {
			     that.shiming = '已实名';
			     that.zizhi = '未认证';
			    }
			    
			   },
			   ziZhiRenZheng() {
			    if (this.sta == 3) {
			     return this.$toast('未实名认证');
			    }
			    if (this.sta == 0) {
			     return this.$toast('审核中，无法更改');
			    }
			    uni.navigateTo({
			     url: '../number-qualifications/number-qualifications'
			    })
			   }
			
			// async clearCahce(){
			// 	this.$toast("清理成功");
			// 	this.showClearCache=false;
			// },
		},
	}
</script>

<style lang="scss">
	page {

		background-color: #e8e8e8;

	}

	.view-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx;

		.text-label {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
		}

		.text-value {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			margin-right: 20rpx;
		}

		.image-arrow {
			width: 12rpx;
			height: 20rpx;
		}
	}
	.view-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 98rpx 57rpx 0;
		font-family: PingFang SC;
	
		.view-title {
			width: 100%;
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 40rpx;
			margin-bottom: 106rpx;
		}
	
		.view-form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
	
			.view-form-item {
				width: 100%;
				height: 110rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #F7F9FA;
	
				.view-name {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					width: 112rpx;
					text-align: justify;
					align-items: center;
				}
	
				.view-line {
					width: 1px;
					height: 40rpx;
					background: #EFEFEF;
					margin: 0 30rpx;
				}
	
				uni-input {
					flex-grow: 1;
					flex-shrink: 1;
				}
	
				.uni-input-placeholder {
					font-size: 28rpx;
					font-weight: 400;
					color: #CCCCCC;
				}
	
				/deep/.button-code {
					font-size: 28rpx;
					font-weight: 500;
					color: #4B9AFF;
					text-decoration: underline;
				}
	
				image {
					width: 33rpx;
					height: 27rpx;
				}
			}
		}
	
		.u-reset-button {
			width: 100%;
			height: 90rpx;
			background: #4B9AFF;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 90rpx;
			text-align: center;
			margin: 94rpx 0 36rpx;
		}
	
		.view-service {
			font-size: 24rpx;
			color: #999999;
	
			a {
				margin-left: 10rpx;
				color: #4B9AFF;
				text-decoration: none;
			}
		}
	}
</style>
