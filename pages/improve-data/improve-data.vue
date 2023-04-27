<template>
	<view class="view-container">
		<view class="view-top-wapper">
			<u-navbar title="完善资料" :safeAreaInsetTop="false">
				<view class="u-nav-slot" slot="left">
					<image src="../../static/images/left.png"></image>
				</view>
				<view class="u-nav-slot" slot="right">
					<text class="">跳过</text>
				</view>
			</u-navbar>
		</view>
		<view class="view-form">
			<view class="view-form-item">
				<view class="view-item-name">
					学校名称
				</view>
				<view class="view-input">
					<input type="text" placeholder="请输入" />
				</view>
			</view>
			<view class="view-form-item">
				<view class="view-item-name">
					学校地址
				</view>
				<view class="view-input">
					<input type="text" placeholder="请输入" />
				</view>
			</view>
			<view class="view-form-item">
				<view class="view-item-name">
					所属领域
				</view>
				<view class="view-input">
					<text class="area" v-if="area">{{area}}</text>
					<text class="area-info-placeholder" v-else>请选择</text>
					<image src="@/static/images/right.png" mode=""></image>
				</view>
			</view>
			<view class="view-form-item">
				<view class="view-item-name">
					选择分类
				</view>
				<view class="view-input">
					<text class="area" v-if="classification">{{classification}}</text>
					<text class="area-info-placeholder" v-else>请选择</text>
					<image src="@/static/images/right.png" mode=""></image>
				</view>
			</view>
			<view class="view-form-item up-down">
				<view class="view-item-name">
					擅长方向<text>(可多选)</text>
				</view>
				<view class="view-checkbox">
					<view class="view-checkbox-item" :class="item.checked?'active':''" v-for="(item,index) in checkList"
						:key="index" @click="item.checked = !item.checked">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="view-form-item">
				<view class="view-item-name">
					师资力量
				</view>
				<view class="view-input">
					<input type="text" placeholder="请输入" />
				</view>

			</view>
			<view class="view-form-item up-down">
				<view class="view-item-name">
					教育环境
				</view>
				<view class="view-choose-video" @click="chooseVideo" :style="videoSrc?'width:100%;height:400rpx':''">
					<video class="view-choose-inner" v-if="videoSrc" :src="videoSrc" controls></video>
					<view class="view-choose-inner" v-else>
						<view class="is-add">
							<view class="icon-add"></view>
							<view class="icon-add rotate"></view>
						</view>
						<text>请上传视频</text>
					</view>
				</view>
			</view>
			<view class="view-form-item up-down">
				<view class="view-item-name">
					机构照片(9张)
				</view>
				<uni-file-picker v-model="imageValue1" fileMediatype="image" mode="grid" @select="select"
					@progress="progress" @success="success" @fail="fail" :auto-upload="false" />
			</view>
			<view class="view-form-item up-down">
				<view class="view-item-name">
					机构logo
				</view>
				<uni-file-picker v-model="imageValue2" limit="1" fileMediatype="image" mode="grid" @select="select"
					@progress="progress" @success="success" @fail="fail" :auto-upload="false" />
			</view>
		</view>
		<view class="view-bottom">
			<button  class="u-reset-button">提交审核</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				area: "",
				classification: "",
				checkList: [{
						name: "乐器",
						checked: true
					},
					{
						name: "美术",
						checked: false
					},
					{
						name: "书法",
						checked: false
					}, {
						name: "手工",
						checked: false
					}, {
						name: "声乐",
						checked: false
					},
				],
				imageValue1: [],
				imageValue2: [],
				videoSrc: ""
			};
		},
		methods: {
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},
			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			chooseVideo() {
				let _this = this
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: (res) => {
						console.log(res)
						_this.videoSrc = res.tempFilePath
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-nav-slot{
		image{
			width: 16rpx;
			height: 28rpx;
		}
		
	}
	/deep/.u-navbar__content__title{
		color: #000000!important;
	}
	.view-container {
		padding-bottom: 90rpx;

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

					.area-info-placeholder {
						font-size: 28rpx;
						color: #999999;
					}

					.area-info {
						font-size: 28rpx;
					}

					image {
						width: 12rpx;
						height: 20rpx;
						margin-left: 12rpx;
					}
				}

			}

			.up-down {
				flex-direction: column;
				align-items: flex-start;

				.view-item-name {
					width: 100%;
					margin-bottom: 27rpx;

					text {
						font-size: 24rpx;
					}
				}

				.view-checkbox {
					display: flex;

					.view-checkbox-item {
						width: 100rpx;
						height: 60rpx;
						background: #F6F6F6;
						border: 1px solid #CCCCCC;
						border-radius: 10rpx;
						text-align: center;
						line-height: 60rpx;
						font-size: 28rpx;
						color: #333333;
						margin-right: 23rpx;
					}

					.active {
						color: #4B9AFF;
						background: rgba(74, 154, 255, 0.1);
					}
				}



				.view-choose-video {
					width: 200rpx;
					height: 200rpx;
					background: #FFFFFF;
					border: 1px solid #CCCCCC;
					border-radius: 10rpx;

					.view-choose-inner {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.is-add {
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 30rpx 0;
							padding-top: 12rpx;

							.icon-add {
								width: 40rpx;
								height: 4rpx;
								background-color: #333333;
								border-radius: 2rpx;
							}

							.rotate {
								position: absolute;
								transform: rotate(90deg);
							}
						}

						text {
							font-size: 24rpx;
							color: #666666;
						}
					}




				}

				/deep/.uni-file-picker {
					width: 100%;

					.uni-file-picker__container {
						margin: 0;

						.file-picker__box {
							width: 200rpx !important;
							height: 200rpx !important;
							padding: 0;
							background: #FFFFFF;
							border: 1px solid #CCCCCC;
							border-radius: 10rpx;

							.file-picker__box-content {
								width: 100%;
								height: 100%;
								border: none !important;
								margin: 0;

								.icon-add {
									width: 40rpx;
									height: 4rpx;
									background-color: #333333;
								}
							}
						}
					}
				}
			}
		}

		.view-bottom {
			width: 100%;
			height: 100rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			bottom: 0;

			.u-reset-button {
				width: 633rpx;
				height: 90rpx;
				background: #4B9AFF;
				border-radius: 45rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 90rpx;
				text-align: center;
			}
		}

	}
</style>
