<template>
	<view>
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
				<view class="view-button" @click="fabu">
					<button type="default">发布</button>
				</view>
			</view>
		</ice-navbar>

		<view class="view-classification" >
			<text>选择分类</text>
			<view class="view-choice" @click="showPicker = true">
				<ice-selector 
				v-model="form.tags"
				placeholder="请选择分类" :range="choiceList" rangeKey="name"></ice-selector>
				<view class="view-right" >
					<u-icon name="arrow-down" color="#bcbcbc" bold @click="showPicker = true"></u-icon>
				</view>
			</view>
		</view>
		<view class="view-maintext">
			<text>添加正文</text>
			<view class="view-textarea">
				<u--textarea v-model="form.content" placeholder="请输入帖子的内容" count maxlength="200"></u--textarea>
			</view>
		</view>

		<view class="view-upload">
			<view class="view-upload-pic">
				<ice-upload-multi-image 
				:max="9"
				v-model="form.resource"></ice-upload-multi-image>
			</view>
			<view class="view-careful">
				<image src="../../static/images/careful.png" mode=""></image>
				<text>(最多上传9张图片)</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				choiceList: [],
				form:{},
			}
		},
		onLoad() {
			this.getNavTag()
		},
		methods: {
			async getNavTag() {
				let res = await this.http.get('/app/forum/home/forumHomeTag', {});
				if (res.code == 200) {
					res.data.map(item=>{
						item.id=item.name
					})
					this.choiceList=res.data;
				} else {
					this.$toast(res.msg);
				}
			},
			async fabu() {
				this.form.type=0;
				let res = await this.http.postJson('/app/forum/topic/sendTopic', this.form);
				if (res.code == 200) {
					await this.$toast('发布成功');
					uni.switchTab({
						url:'../information/information'
					})
					console.log(this.form)
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.uni-input-input{
		width: 600rpx;
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
</style>
