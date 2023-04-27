<template>
	<view>
		<view class="view-avatar">
			<image src="../../static/images/editor/muxingchen.png" class="image-avatar" mode=""></image>
			<text class="flex flex-direction text-muxing ">{{text1}}</text>
			<!-- <text class="flex flex-direction text-size">MuXingchen <p>{{edition}}</p></text> -->
			<p class="text-size">{{text2}}</p>
			<p class="text-p2">{{edition}}</p>
		</view>
		<view class="viewJin">
			<view class="view-item" @click="uni.navigateTo({
				url:'about-introduce'
			})">
				<text class="text-label">应用介绍</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				 url:'about-characteristic'
			})">
				<text class="text-label">内容特色</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				 url:'about-product'
			})">
				<text class="text-label">产品简介</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
			<view class="view-item" @click="uni.navigateTo({
				 url:'about-help'
			})">
				<text class="text-label">用户帮助</text>
				<view class="flex-grow">
				</view>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view>
		</view>
		<view class="viewJianJie">
			<text @click="uni.navigateTo({url:'./message-protection'})" class="view-text1"> <a href="javascript:;"
					style="text-decoration: none;color: #343968;font-size: 27rpx;">《未成年人的个人信息保护》</a> </text> </br>
			<text class="view-text2"> <text @click="uni.navigateTo({url:'./privacy-policy'})"> <a href="javascript:;"
					style="text-decoration: none;color: #343968;font-size: 27rpx;">《隐私保护指引摘要》</a></text> &nbsp; | &nbsp;
				<text @click="uni.navigateTo({url:'./privacy-guide'})" > <a href="javascript:;" style="text-decoration: none;color: #343968;font-size: 27rpx;">《隐私保护指引》</a></text>
			</text> </br>
			<text class="view-text3">客服电话：&nbsp; 400-001-3707</text> </br>
			<text class="view-text4">沐星辰公司 &nbsp; 版权所有 &nbsp;&nbsp;&nbsp; copyright@muxingchen</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text1: '沐星辰',
				text2: 'Mustars:',
				edition: '1.0.9',
			}
		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.view-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx;
		// margin-top: 200rpx;
		// width: 100%;
		// height: 5%;

		.text-label {
			font-size: 36rpx;
			font-weight: 300;
			color: #333333;
		}

		.image-arrow {
			width: 12rpx;
			height: 20rpx;
		}
	}

	.viewJin {
		margin-top: 390rpx;
	}

	.view-avatar {
		width: 180rpx;
		height: 180rpx;
		// position: relative;
		border-radius: 20%;
		border: 4rpx solid #ffffff;
		// margin-bottom: 2000rpx;

		.image-avatar {
			width: 100%;
			height: 100%;
			border-radius: 20%;
			margin-left: 294rpx;
			margin-top: 140rpx;
		}

		.text-muxing {
			position: relative;
			top: 20rpx;
			left: 320rpx;
			font-weight: bold;
			font-size: 40rpx;
			font-family: "宋体";
		}

		.text-size {
			font-size: 22rpx;
			position: relative;
			top: 34rpx;
			left: 304rpx;
		}

		.text-p2 {
			float: left;
			position: relative;
			left: 406rpx;
			top: 4rpx;
			font-size: 22rpx;
		}
	}

	.viewJianJie {
		width: 100%;
		margin-top: 200rpx;
	}

	.view-text1 {
		width: 100%;
		text-align: center;
		display: inline-block;
		font-size: 30rpx;
	}

	.view-text2 {
		width: 100%;
		text-align: center;
		display: inline-block;
		font-size: 30rpx;
	}

	.view-text3 {
		width: 100%;
		text-align: center;
		display: inline-block;
		font-size: 20rpx;
	}

	.view-text4 {
		width: 100%;
		text-align: center;
		display: inline-block;
		font-size: 20rpx;
	}
</style>
