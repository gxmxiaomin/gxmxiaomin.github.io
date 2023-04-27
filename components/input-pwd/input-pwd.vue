<template>
	<view class="input-pwd">
		<u-popup :show="show" round="20" @close="show=false">
			<view class="view-content">
				<view class="view-title">
					<text class="title">{{title}}</text>
					<view class="view-close" @click="show=false">
						<image src="../../static/images/icon_close.png" mode=""></image>
					</view>
				</view>

				<view class="view-input">
					<u-code-input v-model="value" size="50" focus dot color="#5996F5" borderColor="#5996F5"
						:maxlength="6" @change="change"></u-code-input>
					<text class="text-check" :class="!isWarning?'tips':''">{{tips}}</text>
				</view>

				<view class="view-btn" @click="confirm">确认</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "input-pwd",
		props: {
			title: {
				type: String,
				default: ''
			},
			val: {
				type: String,
				default: ''
			},
			isWarning: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false,
				tips: this.val,
				value: ''
			};
		},
		methods: {
			change(e) {
				this.$emit('getNum', e)
				this.value = e
			},
			confirm() {
				if (this.value.length != 6) {
					this.$toast('请输入6位密码')
				} else {
					this.$emit('confirm', this.value)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input-pwd {
		.view-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 60rpx 30rpx;
			position: relative;

			.view-input {
				margin: 60rpx 0;
				height: 200rpx;

				/deep/.u-code-input__item {
					border-radius: 10rpx !important;
				}

				/deep/.u-code-input__item__dot {
					width: 40rpx;
					height: 40rpx;
					background-color: #4A9AFF;
				}

				.text-check {
					display: block;
					margin: 30rpx auto 0;
					text-align: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #FF0000;
				}

				.tips {
					color: rgb(0, 176, 80) !important;
				}
			}

			.view-btn {
				width: 630rpx;
				height: 80rpx;
				background: #4A9AFF;
				border-radius: 999rpx;
				text-align: center;
				line-height: 80rpx;
				color: #fff;
			}

			.view-title {
				display: flex;
				align-items: center;


				.title {
					margin: 0 auto;
					font-size: 36rpx;
					font-weight: 500;
					color: #333333;
				}

				.view-close {
					position: absolute;
					top: 60rpx;
					right: 30rpx;
					width: 26rpx;
					height: 26rpx;

					image {
						width: 26rpx;
						height: 26rpx;
					}
				}
			}
		}
	}
</style>
