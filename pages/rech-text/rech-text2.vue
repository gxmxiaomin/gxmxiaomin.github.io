<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<text @click="uni.navigateBack()">
					<image src="../../static/images/back.png" mode=""></image>
				</text>
			</view>
			<view class="bar-center bare-cell">
				<!-- <text>文章</text> -->
			</view>
			<view class="bar-right bare-cell">
				<text class="draft" @click="draft">存草稿</text>
				<text class="issue" @click="submit()">发布</text>
			</view>
		</view>

		<view class="box">
			<view class="title">
				{{form.title}}
			</view>

			<view style="height: 1rpx; width: 95%;margin: auto;background: #efefef;margin-top: 20rpx;"></view>

			<view style="box-sizing: border-box;padding: 0 10px;margin-top: 20rpx;">
				<view class="view-upload">
					<view class="tag" style="margin-top: 20rpx;border-top: 0rpx #FFF solid;">
						<text class="text-list-item">
							<image class="img" src="./images/tupian.png" mode=""></image>添加封面图
						</text>
						<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
					</view>
					<!-- <text style="font-size: 10px; color: #aaa;">添加封面图</text> -->
					<view class="view-upload-pic">
						<view class="img-cell" v-for="(item,index) in fileList" :key="item">
							<!-- <img :src="item" alt=""> -->
							<image :src="item"></image>
							<image @click="fileList.splice(index,1)" :src="require('./images/reduce-orange.png')"
								class="image-reduce"></image>
						</view>
						<view class="img-cell" v-if="fileList.length < 3" @click="addImg">
							<image :src="require('./images/image-upload.png')"></image>
						</view>
					</view>
					<view class="view-careful">
						<image src="../../static/images/careful.png" mode=""></image>
						<text>(最多上传3张图片)</text>
					</view>
				</view>
			</view>

			<view @click="show = true" class="tag" style="margin-top: 20rpx;">
				<text class="text-list-item">
					<image class="img" src="./images/jing.png" mode=""></image>添加标签
				</text>
				<!-- <input class="input-text" type="text" v-model="nickname" placeholder="请输入名称" /> -->
				<text class="input-text"># {{tag}}</text>
				<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
			</view>

			<u-picker @cancel="call" :show="show" :columns="columns" @confirm="confirm"></u-picker>

			<view class="tag">
				<text class="text-list-item">
					<image class="img" src="./images/weizhi.png" mode=""></image>你在哪里
				</text>
				<!-- <input class="input-text" type="text" v-model="nickname" placeholder="请输入名称" /> -->
				<text class="input-text">{{city || uni.getStorageSync('userInfo').city}}</text>
				<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
			</view>
			<view class="tag">
				<text class="text-list-item">
					<image class="img" src="./images/naozhong.png" mode=""></image>定时发布
				</text>
				<!-- <input class="input-text" type="text" v-model="nickname" placeholder="请输入名称" /> -->
				<text class="input-text">11月5日 周六 8:30</text>
				<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
			</view>

			<view v-if="false" style="box-sizing: border-box; padding: 0 10px">
				<view class="view-choice">
					<ice-selector v-model="form.tags" placeholder="请选择分类" :range="choiceList" rangeKey="name">
					</ice-selector>
					<view class="view-right">
						<u-icon name="arrow-down" color="#bcbcbc" bold></u-icon>
					</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				fileList: [],
				form: {},
				choiceList: [],
				show: false,
				city: '',
				show: false,
				columns: [
					['情感', '游戏', '抗疫', '娱乐', '科技', '视频', '体育', '财经', '健康', '国际', '军事', '生活', '汽车', '房产']
				],
				tag: '',
				defImg:''
			}
		},
		onLoad(optipns) {
			console.log(optipns)
			this.form.title = optipns.title //标题
			this.form.content = optipns.html //内容
			this.defImg = optipns.img
			this.form.type = 2
			this.form.resource = null

			this.getTypeList()
		},
		async onShow() {
			await this.getLocation()
		},

		methods: {
			confirm(e) {
				this.show = false
				console.log(e)
				this.tag = e.value[0]
				this.form.tags = this.tag
				console.log(this.tag)
			},
			//点击取消
			call() {
				this.show = false
			},
			// 获取当前位置
			getLocation() {
				// uni.showLoading({
				// 	title: '获取位置中...'
				// })
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						// uni.hideLoading()
						uni.setStorageSync('lng', res
							.longitude)
						uni.setStorageSync('lat', res.latitude)
						uni.request({
							url: "https://restapi.amap.com/v3/geocode/regeo",
							data: {
								key: "af799f08b2d0ad189610bb1b8a5ff99e",
								location: res
									.longitude + "," +
									res.latitude,
							},
							method: "GET",
							success: (res) => {
								console.log(res);
								this.city = res
									.data.regeocode
									.addressComponent
									.city
								getApp().globalData
									.city = res
									.data.regeocode
									.addressComponent
									.city
							}
						})
					},
					fail: (error) => {
						console.log(error);
					}
				});
			},
			//草稿
			draft() {
				console.log(this.form)
				uni.setStorageSync('form', this.form)
				console.log('存储成功')
				this.$refs.uToast.show({
					message: '保存成功',
					type: 'success'
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 2
					})
				}, 1000)
			},
			addImg() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						res.tempFilePaths.forEach(async img => {
							const data = await this.http.upload(img)
							console.log(data)
							this.fileList.push(data.data)
						})
					}
				});
			},
			submit() {
				this.form.videoCover = this.fileList.join(",")
				if (this.city == null || this.city == '') {
					this.form.position = uni.getStorageSync('userInfo').city
				} else {
					this.form.position = this.city
				}
				if(	this.fileList.length < 1) {
					this.form.videoCover = this.defImg
				}
				console.log(this.form.position)
				console.log(this.form.videoCover)
				// if (this.form.videoCover == '') {
				// 	this.$refs.uToast.show({
				// 		message: '请添加封面图',
				// 		type: 'warning'
				// 	})
				// } else {
				// 	this.issue()
				// }
				console.log(this.form)
				this.issue()
			},

			async issue() {
				let data = await this.http.postJson('/app/forum/topic/sendTopic', this.form);
				console.log(data);
				this.$refs.uToast.show({
					message: '发布成功',
					type: 'success'
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 2
					})
				}, 1000)
			},

			async getTypeList() {
				let res = await this.http.get('/app/forum/home/selectLunList');
				console.log(res)
				if (res.code == 200) {
					res.data.map(item => {
						item.id = item.name
					})
					this.choiceList = res.data;
					console.log(this.choiceList)
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.top-bar {
		margin-top: 80rpx;
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
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.draft {
			display: inline-block;
			font-size: 28rpx;
			padding: 5rpx 20rpx;
			border-radius: 40rpx;
			color: #000;
			border: 1rpx solid #f3f3f3;
			margin-left: -100rpx;
		}

		.issue {
			font-size: 28rpx;
			display: inline-block;
			padding: 5rpx 20rpx;
			border-radius: 40rpx;
			background: #3c88fa;
			color: #FFF;
			margin-left: 20rpx;
		}

		.bar-left {
			flex: 2;
			height: 100%;

			image {
				width: 20rpx;
				height: 35rpx;
			}
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 2;
			height: 100%;

			.nextStep {
				font-size: 28rpx;
				display: inline-block;
				padding: 5rpx 10rpx;
				border-radius: 40rpx;
				background: #3c88fa;
				color: #FFF;
			}
		}
	}

	.box {
		.title {
			// margin-top: 80rpx;
			font-size: 42rpx;
			margin: 160rpx 10rpx 0 10rpx;
		}

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
				display: flex;

				.img-cell {
					width: 210rpx;
					height: 210rpx;
					margin-left: 20rpx;
					position: relative;

					image {
						width: 100%;
						height: 100%;
					}

					.image-reduce {
						position: absolute;
						top: 10rpx;
						right: 10rpx;
						width: 40rpx;
						height: 40rpx;
						z-index: 20;
					}
				}

				.img-avatar {
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

		.tag {
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			margin: 0 30rpx;
			border-top: 1rpx #efefef solid;

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

				.img {
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle;
					margin-right: 10rpx;
				}
			}

			.input-text {
				text-align: right;
				font-size: 32rpx;
				color: #3c88fa;
			}
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
</style>
