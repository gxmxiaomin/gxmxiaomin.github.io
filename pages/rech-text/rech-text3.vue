<template>
	<view>
		<view class="top-bar" :style="setH()">
			<view class="bar-left bare-cell">
				<text @click="uni.navigateBack()">返回</text>
			</view>
			<view class="bar-center bare-cell">
				<text>文章</text>
			</view>
			<view class="bar-right bare-cell">
				<text class="draft" @click="del">删除</text>
				<text class="issue" @click="submit">发布</text>
			</view>
		</view>
		<view class="top-bar-fill" :style="setH()"></view>

		<view style="box-sizing: border-box; padding: 0 10px">
			<view class="view-choice">
				<ice-selector v-model="form.tags" placeholder="请选择分类" :range="choiceList" rangeKey="name">
				</ice-selector>
				<view class="view-right">
					<u-icon name="arrow-down" color="#bcbcbc" bold></u-icon>
				</view>
			</view>
		</view>

		<view style="box-sizing: border-box;padding: 0 10px;">
			<view class="view-upload">
				<text style="font-size: 10px; color: #aaa;">封面图</text>
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

		<!-- <button @click="aaa()">000000</button> -->


		<view class="title">
			<input type="textarea" v-model="title" placeholder='请输入标题'>
		</view>

		<view class="content">
			<editor id="editor" placeholder="请输入正文" @ready="onEditorReady" @focus='focus' show-img-size show-img-toolbar
				show-img-resize>
			</editor>
		</view>

		<view class="foot-btn-fill"></view>

		<view class="foot-btn">
			<view class="icon-box">
				<u-icon name="photo-fill" size='24' @click='choose(0)'></u-icon>
				<!-- 字体大小 -->
				<u-icon name="order" size='24' @click='choose(1)' :color="chooseIndex == 1? '#f00':'#000'"></u-icon>
				<!-- 字体颜色 -->
				<u-icon name="list-dot" size='24' @click='choose(2)' :color="chooseIndex == 2? '#f00':'#000'"></u-icon>
				<u-icon name="arrow-left" size='24' @click='choose(3)'></u-icon>
				<u-icon name="arrow-right" size='24' @click='choose(4)'></u-icon>
			</view>
			<view class="select-box">
				<scroll-view scroll-y="true" v-if="chooseIndex == 1" class="choose-size">
					<view class="choose-box">
						<text class="text-css">文字颜色</text>
						<view class="choose-line color-line">
							<view class="color-cell" v-for="item in colorList" :style="'background-color:' + item.color"
								:class="{'current-color': item.color == color}" @click="selectColor(item.color)"></view>
						</view>
						<text class="text-css">字体大小</text>
						<view class="choose-line font-size-line">
							<view class="font-size-cell" v-for="item in sizeList" :key="item.size"
								:style="'fontSize:' + item.size" :class="{'current-size': item.size==fontSize}"
								@click="selectFontSize(item.size)"> {{ item.title }}</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" class="choose-color" v-if="chooseIndex == 2">
					<view class="choose-box">
					</view>
				</scroll-view>

			</view>
		</view>

		<u-toast ref="uToast"></u-toast>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				barH: 0,
				html: "",
				chooseIndex: -1,
				fontSize: '16px',
				sizeList: [{
						size: '12px',
						title: '小'
					},
					{
						size: '16px',
						title: '标准'
					},
					{
						size: '18px',
						title: '大'
					},
					{
						size: '22px',
						title: "超大"
					}
				],
				color: '#000',
				colorList: [{
						color: '#f0f'
					},
					{
						color: '#f00'
					},
					{
						color: '#ff0'
					},
					{
						color: '#0ff'
					},
					{
						color: '#0f0'
					},
					{
						color: '#00f'
					},
					{
						color: '#000'
					}
				],
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false
				},
				show: false,
				choiceList: [],
				form: {},
				fileList: []
			};
		},
		onLoad() {
			this.getTypeList()
			this.form = uni.getStorageSync('form')
			console.log(this.form)
			this.title = this.form.title
			this.html = this.form.content
			// 将数据渲染到富文本内
			this.form.resource = setInterval(() => {
				if (this.html) {
					clearInterval(this.form.resource)
					this.editorCtx.setContents({
						html: this.html,
						success(res) {}
					})
				}
			}, 100)
		},
		created() {
			uni.getSystemInfo({
				success: res => {
					console.log(res.statusBarHeight)
					this.barH = res.statusBarHeight
				}
			})
		},
		methods: {
			//删除草稿
			del(){
				uni.removeStorageSync('form')
				this.$refs.uToast.show({
					message: '删除成功',
					type: 'success'
				})
				setTimeout(() => {
					uni.navigateBack({
						delta:1
					})
				}, 1000)
			},
			setH() {
				return 'height:' + (44 + this.barH) + 'px;padding-top:' + this.barH + 'px'
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

			// async aaa() {
			// 	const res = await this.http.get('/app/Schools/insertschoolBanner', {
			// 		carouselImgUrl: this.fileList,
			// 		linkId: 555
			// 	})
			// 	console.log(res)
			// },

			submit() {
				console.log(this.title)
				console.log(this.html)
				console.log(this.form.tags)
				console.log(this.fileList.length)
				this.editorCtx.getContents({
					success: async res => {
						console.log(res)
						this.form.type = 2
						this.form.content = res.html
						this.form.resource = null
						this.form.videoCover = this.fileList.join(",")
						this.form.title = this.title
						let data = await this.http.postJson('/app/forum/topic/sendTopic', this.form);
						console.log(data);
						this.$refs.uToast.show({
							message: '发布成功',
							type: 'success'
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					}
				})
			},

			selectFontSize(size) {
				this.editorCtx.format('fontSize', size)
				this.fontSize = size
			},

			selectColor(color) {
				this.editorCtx.format('color', color)
				this.color = color
			},

			focus() {
				this.chooseIndex = -1
				this.editorCtx.scrollIntoView()
			},

			choose(index) { //选择的下标

				switch (index) {
					case 0:
						console.log("选择图片")
						this.chooseImg()
						break
					case 1:
						if (this.chooseIndex == index) {
							this.chooseIndex = -1
							return
						}
						this.chooseIndex = index
						break
					case 2:
						if (this.chooseIndex == index) {
							this.chooseIndex = -1
							return
						}
						this.chooseIndex = index
						break
					case 3:
						this.editorCtx.undo()
						console.log("回退")
						break
					case 4:
						console.log("恢复")
						this.editorCtx.redo()
						break
				}
			},

			async getTypeList() {
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

			chooseImg() {
				console.log("选择图片")
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						res.tempFilePaths.forEach(async img => {
							const data = await this.http.upload(img)
							this.editorCtx.insertText({
								text: "\n"
							})
							this.editorCtx.insertImage({
								src: data.data,
								width: '100%'
							})
							this.editorCtx.insertText({
								text: "\n"
							})
						})
					}
				});
			},

			onEditorReady() { //初始化模板
				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					this.editorCtx.format('fontSize', '16px')
					this.editorCtx.format('color', '#000')
				}).exec()
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-bar {
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
		}
	}

	.top-bar-fill {
		box-sizing: border-box;
		width: 100%;
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

	.title {
		width: 100%;
		padding: 20rpx;
		background-color: #fff;

		input {
			font-size: 40rpx !important;
			// color: #515151;
			font-weight: 900;
		}
	}

	.content {
		#editor {
			width: 100%;
			height: 1400rpx;
			box-sizing: border-box;
			padding: 20rpx;
			background-color: #fff;
		}
	}

	.foot-btn-fill {
		width: 100%;
		height: 100rpx;
		background-color: #fff;
	}

	.foot-btn {
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		width: 100%;

		.icon-box {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 100rpx;
			width: 100%;
		}

		.isSelect {
			color: #f00;
		}
	}

	.select-box {
		width: 100%;

		// background-color: antiquewhite;
		.choose-size {
			width: 100%;
			height: 500rpx;
		}

		.choose-color {
			width: 100%;
			height: 500rpx;
		}

		.choose-box {
			box-sizing: border-box;
			padding: 30rpx;
		}

		.text-css {
			line-height: 100rpx;
			font-size: 28rpx;
			color: #505050;
		}

		.choose-line {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;
			padding: 20rpx;
			background-color: #bababa;
			border-radius: 10rpx;
		}

		.color-line {
			.color-cell {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				border: 1rpx solid #7c7c7c;
			}

			.current-color {
				border: 4rpx solid #ffffff;
			}
		}

		.font-size-line {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.font-size-cell {
				width: 25%;
				height: 100%;
				text-align: center;
				color: #3e3e3e;
			}

			.current-size {
				color: #f00;
			}
		}
	}
</style>
