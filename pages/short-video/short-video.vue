<template>
	<view>
		<ice-statusbar></ice-statusbar>
		<ice-navbar>
			<view class="top">
				<view class="view-left" @click="uni.switchTab({
					url:'../information/information'
				})">
					<u-icon name='arrow-left' size="44rpx"></u-icon>
				</view>
				<view class="view-center">
					<text>发帖</text>
				</view>
				<view class="view-button" @click="fabu">
					<button type="default">发布</button>
				</view>
			</view>
		</ice-navbar>

		<view class="view-classification">
			<text>选择分类</text>
			<view class="view-choice" @click="pickerShow=true">
				<input type="text" placeholder="请选择分类" disabled placeholder-style="color:#999" v-model="form.tags" />
				<u-picker @confirm="confirm" @cancel="pickerShow=false" :show="pickerShow" :columns="[choiceList]"
					keyName="name">
				</u-picker>

				<view class="view-right">
					<u-icon name="arrow-down" color="#bcbcbc" bold></u-icon>
				</view>
			</view>
		</view>

		<view class="view-maintext">
			<text>添加标题</text>
			<view class="view-textarea">
				<u-textarea v-model="form.content" placeholder="请输入标题内容" placeholderStyle="color:#999" count
					maxlength="200" height="400rpx"></u-textarea>
			</view>
		</view>

		<view class="view-upload">
			<view class="view-upload-pic">
				<image @click="chooseVideo" src="../../static/images/image-upload.png"></image>
			</view>
			<view v-if="!pickerShow">
				<video v-if="form.resource" class="video" :src="form.resource" controls></video>
			</view>
			<view class="view-careful">
				<image src="../../static/images/careful.png" mode=""></image>
				<text>（仅支持上传1个视频）</text>
			</view>
		</view>

		<view class="view-cover">
			<ice-upload-image class="img-photo" v-model="form.videoCover" width="218rpx" height="218rpx"
				:defaultImage="require('@/static/images/image-upload.png')"></ice-upload-image>
			<text>上传视频封面</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerShow: false, // 选择分类
				choiceList: [],
				form: {
					tags: '', // 分类
					content: '', // 帖子内容
					resource: '', // 视频
					videoCover: '' // 视频封面
				},
			}
		},
		onLoad() {
			this.getNavTag()
		},
		methods: {
			// 选择分类
			confirm(e) {
				this.form.tags = e.value[0].id
				this.pickerShow = false;
				console.log(`已选分类:${this.form.tags}`);
			},

			async chooseVideo() {
				uni.chooseVideo({
					success: async (result) => {
						let res = await this.http.upload(result.tempFilePath);
						if (res.code == 200) {
							this.form.resource = res.data;
						} else {
							this.$toast(res.msg)
						}
					}
				})
			},
			async getNavTag() {
				let res = await this.http.get('/app/forum/home/forumHomeTag', {});
				if (res.code == 200) {
					res.data.map(item => {
						item.id = item.name
					})
					this.choiceList = res.data;
				} else {
					this.$toast(res.msg);
				}
			},

			// 发布
			async fabu() {
				if (!this.form.tags) {
					this.$toast('请选择分类');
					return
				}
				if (!this.form.content) {
					this.$toast('请输入帖子内容');
					return
				}
				if (!this.form.resource) {
					this.$toast('请上传视频');
					return
				}
				if (!this.form.videoCover) {
					this.$toast('请上传视频封面');
					return
				}

				this.form.type = 1;
				let res = await this.http.postJson('/app/forum/topic/sendTopic', this.form);
				if (res.code == 200) {
					await this.$toast('发布成功');
					uni.switchTab({
						url: '../information/information'
					})
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-cover {
		width: 218rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 60rpx 30rpx 0;

		text {
			font-size: 24rpx;
			color: #999999;
			margin-top: 16rpx;
		}
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 30rpx;

		.view-left {
			width: 20%;

			/deep/.u-icon {
				display: flex;
			}
		}


		.view-center {
			font-size: 36rpx;
			color: #333333;
		}

		.view-button {
			button {
				width: 140rpx;
				height: 60rpx;
				background: #4A9AFF;
				border-radius: 30rpx;
				font-size: 30rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.view-classification {
		margin: 30rpx;

		text {
			font-size: 24rpx;
			color: #333333;
			line-height: 6rpx;
		}

		.view-choice {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx 0;
			padding: 30rpx;
			border-radius: 10px;
			background-color: #F6F6F6;

			text {
				font-size: 28rpx;
				color: #999999;
				line-height: 6rpx;
			}
		}
	}


	.view-maintext {
		margin: 30rpx;

		text {
			font-size: 24rpx;
			color: #333333;
			line-height: 6rpx;
		}

		.view-textarea {
			/deep/.u-textarea {
				width: 690rpx;
				height: 436rpx;
				background: #F6F6F6;
				border-radius: 10rpx;
				font-size: 28rpx;
				margin: 30rpx 0;
			}

			/deep/.u-textarea__count {
				padding: 16rpx 4rpx;
				background-color: #F3F4F7 !important;
			}

		}

		/deep/.u-textarea {
			background-color: #F6F6F6;
			// color: #F6F6F6;


		}
	}

	.view-upload {
		margin: 30rpx;

		.view-careful {
			display: flex;
			align-items: center;
			margin-top: 30rpx;

			image {
				width: 28rpx;
				height: 28rpx;
			}

			text {
				font-size: 24rpx;
				color: #999999;
				line-height: 6rpx;
			}
		}

		.view-upload-pic {

			image {
				width: 218rpx;
				height: 218rpx;
				border-radius: 10px;
			}

		}

		.video {
			width: 100%;
		}
	}
</style>
