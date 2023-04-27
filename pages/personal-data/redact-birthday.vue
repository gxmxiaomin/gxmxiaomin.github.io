<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()">返回</text> -->
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>编辑生日</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
					<view class="city-rigth" @click="ok">
						<text style="color:#428bfa;">保存</text>
					</view>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="view-list-item">
				<text class="text-list-item">生日信息</text>
				<!-- <input class="input-text" type="text" v-model="age" placeholder="请输入生日" /> -->
				<text class="input-text" @click="show = true">{{timestamp}}</text>
				<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
			</view>

			<view class="view-list-item">
				<text class="text-list-item">星座</text>
				<text class="input-text">{{constellation}}</text>
			</view>

			<view class="view-list-item" @click="isShow">
				<text class="text-list-item">个人主页展示</text>
				<u-switch v-model="checked"></u-switch>
			</view>
		</view>

		<u-datetime-picker :minDate="0" :maxDate="1786778555000" :show="show" v-model="value1" mode="date" @confirm="confirm" @cancel="call"></u-datetime-picker>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				constellation:'--',
				timestamp:'选择',
				show: false,
				value1: Number(new Date()),
				birthday: '',
				// show: false,
				checked: false
			}
		},

		methods: {
			change(status) {
				console.log(status);
			},
			isShow() {
				!this.checked
			},
			//日期点击取消
			call(){
				this.show = false
			},
			confirm(e) {
				this.show = false
				console.log(e)
				// this.timestamp = e.value
				this.timestamp = uni.$u.date(e.value, 'yyyy-mm-dd')
				console.log(this.timestamp)
				
				this.xz(e)
			},
			
			xz(e){
				var getMonth = uni.$u.date(e.value, 'mm')
				var getDay = uni.$u.date(e.value, 'dd')
				console.log(getMonth)
				console.log(getDay)
				if ((getMonth == 1 && getDay >= 20 && getDay <= 31)||(getMonth == 2 && getDay <= 18)) {
					console.log('水瓶座♒')
					this.constellation = '水瓶座♒'
				} else if ((getMonth == 2 && getDay >= 19 && getDay <= 31)||(getMonth == 3 && getDay <= 20)) {
					console.log('双鱼座♓')
					this.constellation = '双鱼座♓'
				}else if ((getMonth == 3 && getDay >= 21 && getDay <= 31)||(getMonth == 4 && getDay <= 19)) {
					console.log('白羊座♈')
					this.constellation = '白羊座♈'
				}else if ((getMonth == 4 && getDay >= 20 && getDay <= 31)||(getMonth == 5 && getDay <= 20)) {
					console.log('金牛座♉')
					this.constellation = '金牛座♉'
				}else if ((getMonth == 5 && getDay >= 21 && getDay <= 31)||(getMonth == 6 && getDay <= 21)) {
					console.log('双子座♊')
					this.constellation = '双子座♊'
				}else if ((getMonth == 6 && getDay >= 22 && getDay <= 31)||(getMonth == 7 && getDay <= 22)) {
					console.log('巨蟹座♋')
					this.constellation = '巨蟹座♋'
				}else if ((getMonth == 7 && getDay >= 23 && getDay <= 31)||(getMonth == 8 && getDay <= 22)) {
					console.log('狮子座♌')
					this.constellation = '狮子座♌'
				}else if ((getMonth == 8 && getDay >= 23 && getDay <= 31)||(getMonth == 9 && getDay <= 22)) {
					console.log('处女座♍')
					this.constellation = '处女座♍'
				}else if ((getMonth == 9 && getDay >= 23 && getDay <= 31)||(getMonth == 10 && getDay <= 23)) {
					console.log('天枰座⚖')
					this.constellation = '天枰座⚖'
				}else if ((getMonth == 10 && getDay >= 24 && getDay <= 31)||(getMonth == 11 && getDay <= 22)) {
					console.log('天蝎座♏')
					this.constellation = '天蝎座♏'
				}else if ((getMonth == 11 && getDay >= 23 && getDay <= 31)||(getMonth == 12 && getDay <= 21)) {
					console.log('射手座♐')
					this.constellation = '射手座♐'
				}else if ((getMonth == 12 && getDay >= 22 && getDay <= 31)||(getMonth == 1 && getDay <= 19)) {
					console.log('魔羯座♑')
					this.constellation = '魔羯座♑'
				}
			},
			
			ok(){
				this.submitInfo()
			},
			async submitInfo() {
				if (this.timestamp != '' && this.timestamp != '选择') {
					let res = await this.http.postJson('/app/userInfo/editInfo', {
						birthday: this.timestamp,
						constellation:this.constellation
					});
					if (res.code == 200) {
						this.$refs.uToast.show({
							message: '修改成功',
							type: 'success'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					} else {
						this.$refs.uToast.show({
							message: '修改失败',
							type: 'error'
						})
					}
				} else {
					this.$refs.uToast.show({
						message: '昵称不能为空',
						type: 'error'
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f7f7;
	}

	.top-bar {
		height: 120rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		background-color: #fff;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.bar-left {
			flex: 2;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 2;
			height: 100%;
		}
	}

	.box {
		margin-top: 140rpx;
		background: #FFF;

		.view-list-item {
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			margin: 0 30rpx;

			.view-select-sex {
				display: flex;
				align-items: center;

				/deep/.input-placeholder {
					font-size: 32rpx;
					color: grey;
				}

				/deep/input {
					color: #333333;
					font-size: 32rpx;
				}

				.selector {
					text-align: right;
				}
			}

			.img-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.img-right {
				margin-left: 18rpx;
				width: 12rpx;
				height: 20rpx;
			}

			.text-list-item {
				flex-grow: 1;
				flex-shrink: 1;
				font-size: 32rpx;
				color: #666666;
			}

			.address-info-placeholder {
				font-size: 32rpx;
				color: grey;
			}

			.text-value {
				font-size: 32rpx;
				color: #333333;
			}

			.input-text {
				text-align: right;
				font-size: 32rpx;
				color: #333333;
			}
		}

	}
</style>
