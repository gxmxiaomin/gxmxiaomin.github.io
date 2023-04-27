<template>
	<view class="page_view">
		<view class="page_bg" :style="pageBg">
			<view class="tab_cell">
				<u-icon name="arrow-left" color="#fff" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="center">
				<u--input placeholder="请输入内容" prefixIcon="search" border="surround" v-model="value" ></u--input>
			</view>
			<view class="tab_cell">
				<text>搜索</text>
			</view>
		</view>
		
		<view class="list-box">
			<scroll-view scroll-y="true" class="scroll-box">
				<view class="scroll-content">
					
					<view class="search-box">
						<view class="box-title">
							<text>热门搜索</text>
							<view class="hot_bg">
								<text>HOT</text>
							</view>
						</view>
						<view class="search-list">
							<view class="search-cell" v-for="item in hotList" :key="item">
								<text>{{item}}</text>
							</view>
						</view>
					</view>
					
					<view class="search-box" style="margin-top: 80rpx;">
						<view class="box-title" style="justify-content: space-between;">
							<text>搜索历史</text>
							<u-icon name="trash" color="#999" size="24" @click="clearList"></u-icon>
						</view>
						<view class="search-list">
							<view class="search-cell" v-for="item in historyList" :key="item">
								<text>{{item}}</text>
							</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:"",
				hotList:[
					'果蔬(文化路）','小多优选','疯狂生鲜(文化路）','自然鲜言(文化路店）','满柚香(东风路店）','小小鲜蔬(文化路店'
				],
				historyList:[
					'果蔬(文化路）','小多优选','疯狂生鲜(文化路）'
				],
				defSty:{}
			};
		},
		computed:{
			pageBg() {
				return this.defSty.pageBg||""
			}
		},
		onLoad(options) {
			let defSty = options.defSty
			if(defSty) this.defSty=JSON.parse(defSty)
			else this.defSty = {}
		},
		methods:{
			clearList() {
				this.historyList=[]
			}
		}
	}
</script>

<style lang="scss" scoped>
.page_view {
	width: 100%;
	height: 100vh;
	background-color: #f1f1f1;
	position: relative;
	font-family: PingFang-SC;
	font-weight: Medium;
	.page_bg {
		width: 100%;
		height: calc(var(--status-bar-height) + 140px);
		padding: 0 20rpx;
		padding-top: var(--status-bar-height);
		padding-bottom: 96px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		background: linear-gradient(to top, #F1F1F1, #8785F5, #6B68F5);
		.tab_cell {
			font-size: 32rpx;
			color: #fff;
		}
		.center {
			width: 564rpx;
			height: 66rpx;
			background-color: #fff;
			border-radius: 66rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 20rpx;
			font-size: 32rpx;
			color: #999999;
			line-height: 66rpx;
		}
	}
}

.list-box {
	width: 100%;
	height: calc(100vh - var(--status-bar-height) - 44px - 20rpx);
	position: absolute;
	top: calc(var(--status-bar-height) + 44px + 20rpx);
	left: 0;
	background-color: #fff;
	border-radius: 20rpx 20rpx 0 0;
	overflow: hidden;
}

.scroll-box {
	width: 100%;
	height: 100%;
}
.scroll-content {
	width: 100%;
	min-height: 100%;
	padding: 30rpx 0;
}

.search-box {
	width: 100%;
	min-height: 50rpx;
	padding-left: 30rpx;
	.box-title {
		font-size: 32rpx;
		line-height: 36rpx;
		color: #999999;
		display: flex;
		padding-right: 30rpx;
		align-items: center;
		.hot_bg {
			width: 80rpx;
			height: 36rpx;
			line-height: 36rpx;
			text-align: center;
			color: #fff;
			font-size: 24rpx;
			background: linear-gradient(to bottom,#F8C489,#EE8C47);
			border-radius: 20rpx 0 20rpx 0;
			margin-left: 30rpx;
		}
	}
	.search-list {
		margin-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
		.search-cell {
			height: 50rpx;
			padding: 0 20rpx;
			line-height: 50rpx;
			border-radius: 50rpx;
			margin-bottom: 20rpx;
			margin-right: 30rpx;
			font-size: 28rpx;
			color: #515151;
			background-color: #F1F1F1;
		}
	}
}

</style>
