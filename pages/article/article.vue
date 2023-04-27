<template>
	<view class="container">
		<ice-statusbar></ice-statusbar>
		<ice-navbar>
			<view class="top">
				<view class="view-left" @click="uni.switchTab({
					url:'../information/information'
				})">
					<u-icon name='arrow-left'></u-icon>
				</view>
				<view class="view-center">
					<text>发帖</text>
				</view>
				<view class="view-button">
					<button @click="submits">发布</button>
				</view>
			</view>
		</ice-navbar>

		<view class="view-classification" @click="showPicker = true">
			<text>选择分类</text>
			<view class="view-choice">
				<ice-selector v-model="form.tags" placeholder="请选择分类" :range="choiceList" rangeKey="name">
				</ice-selector>
				<view class="view-right">
					<u-icon name="arrow-down" color="#bcbcbc" bold></u-icon>
				</view>
			</view>
		</view>

		<view class="view-maintext">
			<view>
				<text>文章标题</text>
				<view class="view-textarea">
					<u--textarea v-model="form.title" placeholder="请输入文章标题" count maxlength="200"></u--textarea>
				</view>
			</view>
			<!-- 文章封面图 -->
			<view class="view-upload">
				<text>封面图</text>
				<view class="view-upload-pic">
					<ice-upload-multi-image :max="3" v-model="form.videoCover"></ice-upload-multi-image>
				</view>
				<view class="view-careful">
					<image src="../../static/images/careful.png" mode=""></image>
					<text>(最多上传3张图片)</text>
				</view>
			</view>
			
			<view class="view-articel" v-for="(item,index) in list">
				<text>文章段落 - {{index+1}}</text>

				<view class="view-textarea">
					<u--textarea v-model="item.content" maxlength="-1" height="400rpx" placeholder="请输入内容">
					</u--textarea>
				</view>

				<view class="view-image" v-if="item.image">
					<image :src="item.image" mode=""></image>
					<text @click="chooseImage(index)" class="text-reupload">重新上传</text>
				</view>
			</view>

			<u-button style="margin-top: 20rpx;" @click="()=>{
				list.push({
					image:'',
					content:'',
				})
				return ''
			}" text="添加段落"></u-button>

		</view>

		<view class="view-footer" @click="chooseImage(list.length-1)">
			<u-icon name="photo" size="30"></u-icon>
			<text>添加图片</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choiceList: [],
				list: [{
					image: '',
					content: "",
				}],
				form: {},
			}
		},
		mounted() {
			this.getNavTag()
		},
		methods: {
			async chooseImage(index) {
				uni.chooseImage({
					count: 1,
					success: async (result) => {
						console.log(result);
						let res = await this.http.upload(result.tempFilePaths[0]);
						if (res.code == 200) {
							this.list[index].image = res.data;
						} else {
							this.$toast(res.msg);
						}
					}
				})
			},
			// 标签
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
			async submits() {
				this.form.type = 2;
				this.form.content = JSON.stringify(this.list);
				console.log(this.form.content);
				console.log(this.form);
				console.log(this.form.videoCover.length);
				let res = await this.http.postJson('/app/forum/topic/sendTopic', this.form);
				console.log(res);
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
	.view-upload {
		// margin: 30rpx;
	
		.view-careful {
			display: flex;
			align-items: center;
			margin-top: 30rpx;
	
			image {
				width: 28rpx;
				height: 28rpx;
			}
	
			text {
				margin-left: 28rpx;
				font-size: 24rpx;
				color: #999999;
				line-height: 6rpx;
			}
		}
	
		.view-upload-pic {
			.img-avatar{
				width: 210rpx;
				height: 210rpx;
			}
			/deep/ .image {
				width: 210rpx;
				height: 210rpx;
			}
	
			/deep/ .view-item {
				width: 210rpx;
				height: 210rpx;
			}
	
		}
	}
	.container {
		padding-bottom: 88rpx;
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

				font-size: 28rpx;
				color: #FFFFFF;
				line-height: 36rpx;

				display: flex;
				align-items: center;
				justify-content: space-around;
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
				height: 236rpx;
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

		.view-articel {
			/deep/.u-textarea {
				width: 690rpx;
				height: 436rpx;
				background: #F6F6F6;
				border-radius: 10rpx;
				font-size: 28rpx;
				margin: 30rpx 0;
			}

			.view-image {
				position: relative;
				width: 100%;
				height: 360rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}

				.text-reupload {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					font-size: 32rpx;
					font-weight: 400;
					color: #FFFFFF;
					background: rgba(0, 0, 0, 0.5);
				}
			}
		}

		/deep/.u-textarea {
			background-color: #F6F6F6;
			// color: #F6F6F6;


		}
	}

	.view-footer {
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 88rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		text {
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
		}
	}
</style>
