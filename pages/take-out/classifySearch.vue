<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<u-search placeholder="请输入要搜索蔬菜的关键字" v-model="searchValue" height="70" :show-action="false"></u-search>
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth" @click="uni.navigateTo({
					url:'./classifySearchResult'
				})">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<view class="back"></view>
		
		<view class="box-1">
			<view class="title">热门搜索</view>
			<image class="hot" src="../../static/images/sousuopai.png" mode=""></image>
			<view style="height: 10rpx;" class=""></view>
			<view class="sousuo">
				<view class="">  安心蔬菜 </view>
				<view class="">  有机蔬菜 </view>
				<view class=""> 香蕉 </view>
				<view class=""> 辣条  </view>
				<view class="">  三花淡奶 </view>
				<view class="">  生菜 </view>
			</view>
		</view>
		<!-- 历史搜索 -->
		<view class="box-2">
			<view class="title">搜索历史</view>
			<image @click="show = false" class="del" src="../../static/images/clear.png" mode=""></image>
			<view style="height: 10rpx;" class=""></view>
			<view class="sousuo" v-if="show">
				<view class=""> 三花淡奶 </view>
				<view class="">  香菇酱 </view>
			</view>
			<view class="sousuo" v-else>
				<view class="">  无 </view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:true,
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	.top-bar {
		height: 160rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#f7b380, #fccca8);
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;
	
		.bare-cell {
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFF;
		}
	
		.bar-left {
			flex: 1;
			height: 100%;
		}
	
		.bar-center {
			flex: 5;
			height: 100%;
		}
	
		.bar-right {
			flex: 1;
			height: 100%;
	
			.city-rigth {
				color: #FFF;
				font-size: 30rpx;
	
				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
					vertical-align: middle;
					margin-top: -5rpx;
				}
			}
		}
	}
	
	.back {
		height: 100rpx;
		background-image: linear-gradient(#fccca8, #fccca8);
		margin-top: 100rpx;
	}
	
	.box-result {
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		z-index: 9;
		background-color: #FFF;
		position: relative;
		top: -20rpx;
	}
	
	.box-1 {
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		z-index: 9;
		background-color: #FFF;
		position: relative;
		top: -20rpx;
		// margin-top: 150rpx;

		.title {
			display: inline-block;
			color: #aaa;
			font-size: 32rpx;
			margin: 30rpx 0 0 30rpx;
		}

		.hot {
			width: 80rpx;
			height: 40rpx;
			margin-left: 20rpx;
			vertical-align: middle;
		}

		.sousuo {
			
			view {
				display: inline-block;
				padding: 5rpx 20rpx;
				background-color: #f1f1f1;
				border-radius: 30rpx;
				margin: 30rpx 20rpx 0 20rpx;
				font-size: 28rpx;
				color: #3e3e3e;

				text {
					color: #f19755;
					display: inline-block;
					margin-right: 10rpx;

				}
			}
		}
	}
	
	.box-2 {
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		z-index: -1;
		background-color: #FFF;
		margin-top: 50rpx;
	
		.title {
			display: inline-block;
			color: #aaa;
			font-size: 32rpx;
			margin: 30rpx 0 0 30rpx;
		}
	
		.del {
			width: 35rpx;
			height: 35rpx;
			float: right;
			margin-top: 20rpx;
			margin-right: 30rpx;
		}
	
		.sousuo {
			
			view {
				display: inline-block;
				padding: 5rpx 20rpx;
				background-color: #f1f1f1;
				border-radius: 30rpx;
				margin: 30rpx 20rpx 0 20rpx;
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #3e3e3e;
			}
		}
	}
</style>
