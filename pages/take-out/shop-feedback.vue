<template>
	<view class="page_view">
		<view class="top_bar">
			<view >
				<u-icon name="arrow-left" color="#515151" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="center">
				<text>意见反馈</text>
			</view>
			<view>
				<text style="font-size: 28rpx;color: #333333;" @click="uni.navigateTo({
					url:'./shop-feedback-record'
				})">反馈记录</text>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="scroll_content">
				<view class="card">
					<u--textarea v-model="textValue" placeholder="请输入反馈建议..." height="200" count style="background-color: #f1f1f1;height: 600rpx;"></u--textarea>
					<view class="img_area">
						<text>添加图片(6张)</text>
						<view class="img_list">
							<view class="img_cell" v-for="(item,index) in imgList" :key="item" :style="index==0?'':'margin-left:10rpx;'">
								<image :src="item" mode=""></image>
							</view>
							<view class="img_cell upLoad_box" :style="imgList.length==0? '':'margin-left:10rpx;'">
								<u-icon name="plus" color="#515151" size="32"></u-icon>
							</view>
						</view>
					</view>
				</view>
				
				<view class="feedBack_box" @click="show=true">
					<text :style="!feedBackType? 'color:#999':''">{{feedBackType||'反馈类型'}}</text>
					<u-icon name="edit-pen" color="#515151" size="24"></u-icon>
				</view>
				
				<view class="phone_box">
					<view class="title">
						<text>联系方式</text>
					</view>
					<u--textarea v-model="phone" placeholder="请填写您的联系方式，便于我们与您联系" maxlength="20" count style="background-color: #f1f1f1;"></u--textarea>
				</view>
				
				<view class="button_box">
					<u-button type="primary" shape="circle">
						<text style="font-size: 32rpx;color: #fff;font-weight: Medium;font-family: PingFang-SC;">提交</text>
					</u-button>
				</view>
			</view>
		</scroll-view>
		
		
		
		<u-picker :show="show" :columns="columns" :defaultIndex="defaultIndex"
			@cancel="show=false" @close='show=false'	@confirm="selectType"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textValue:"",
				phone:"",
				show: false,
				imgList:['https://img1.baidu.com/it/u=2155912277,1796243231&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=499'],
				columns:[
					[]
				],
				defaultIndex: [],
				feedBackType: null
			};
		},
		onLoad() {
			this.getColumns()
		},
		methods:{
			getColumns() {
				this.columns=[
					['功能异常','产品建议','其它问题']
				]
			},
			
			selectType(item) { //选择器
				console.log("获取到的", item)
				this.feedBackType = item.value[0]
				this.defaultIndex = item.index
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.page_view {
	width: 100%;
	height: 100vh;
	background-color: #fff;
	position: relative;
}
.top_bar {
	width: 100%;
	height: calc(var(--status-bar-height) + 44px);
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
	padding-top: var(--status-bar-height);
	.center{
		color: #333333;
		font-size: 36rpx;
		font-weight: Medium;
		font-family: PingFang-SC-Medium;
	}
}

.scroll-box {
	width: 100%;
	height: calc(100vh - var(--status-bar-height) - 44px);
	background-color: #fff;
	.scroll_content {
		width: 100%;
		min-height: 100%;
		padding: 25rpx;
	}
}

.card {
	width: 100%;
	min-height: 88rpx;
	border-radius: 20rpx;
	background-color: #F1F1F1;
	box-sizing: border-box;
	padding: 20rpx;
	.img_area {
		width: 100%;
		color: #333333;
		font-size: 32rpx;
		font-family: PingFang-SC-Regular;
		font-weight: 600;
		padding-left: 10rpx;
		position: absolute;
		top: 400rpx;
	}
	.img_list {
		margin-top: 20rpx;
		width: 100%;
		height: 120rpx;
		display: flex;
		.img_cell {
			width: 120rpx;
			height: 120rpx;
			position: relative;
			image {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
		.upLoad_box {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			border-radius: 10rpx;
		}
	}
}

.feedBack_box {
	width: 100%;
	min-height: 88rpx;
	background-color: #f1f1f1;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 30rpx;
	padding: 0 20rpx;
	color: #333;
	font-family: PingFang-SC-Regular;
	.title {
		padding-left: 10rpx;
	}
}

.phone_box {
	width: 100%;
	min-height: 88rpx;
	background-color: #f1f1f1;
	border-radius: 20rpx;
	margin-top: 30rpx;
	padding: 20rpx;
	color: #333333;
	font-family: PingFang-SC-Regular;
	.title {
		padding-left: 10rpx;
	}
}

.button_box {
	margin-top: 50rpx;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
