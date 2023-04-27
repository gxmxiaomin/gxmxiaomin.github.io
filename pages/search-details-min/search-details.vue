<template>
	<view class="">
		<tabBar color="#000" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot='left'>
				<image class="image-fanhui" src="../../static/images/back.png"></image>
			</view>
			<view class="tab-center" slot="center">
				<!-- <text>年级详情</text> -->
				<!-- <view class="view-search">
					<image src="../../static/images/search.png" class="image-search"></image>
					<text>请输入关键词搜索</text>
				</view> -->
				<u-search style='margin-left: 40rpx; width: 640rpx;' action-text='取消' v-model="value"></u-search>
			</view>
			<view class="tab-left" slot='right' style="flex:1">
				<!-- <image class="image-fanhui-2" src="../../static/images/homeeducation.png"></image> -->
			</view>
		</tabBar>

		<view>
			<view class="view-scoll">
				<view class="view-item" v-for="(item,index) in schoolType" @click="tabbar(index,item.configValue)">
					<text class="text-title" :class="show==index?'text-titles':''">{{item.description}}</text>
					<view class="view-line" v-if="show==index"></view>
				</view>
			</view>
		</view>

		<view class="" style="margin-top: 80rpx;">
			<view class="view-switch-wrapper">
				<view class="view-switch">
					<view class="view-item" @click="showSki=!showSki">
						<view style="display: flex;align-items: center;">
							智能排序
							<image src="../../static/images/arrow-down.png" mode=""
								:style="showSki?'transform: rotate(180deg);':''"></image>
						</view>
						<view class="view-popupType" v-if="showSki==true">
							<view class="view-name" v-for="item in shanchangList">
								{{item.schoolTypeName}}
							</view>
						</view>
					</view>

					<view class="view-item" @click="showSkil=!showSkil">
						<view style="display: flex;align-items: center;">
							位置距离
							<image src="../../static/images/arrow-down.png" mode=""
								:style="showSkil?'transform: rotate(180deg);':''"></image>
						</view>
						<view class="view-popupType" v-if="showSkil==true">
							<view class="view-name" v-for="item in shanchangList">
								{{item.schoolTypeName}}
							</view>
						</view>
					</view>

					<view class="view-item" @click="showSkill=!showSkill">
						<view style="display: flex;align-items: center;">
							星级排序
							<image src="../../static/images/arrow-down.png" mode=""
								:style="showSkill?'transform: rotate(180deg);':''"></image>
						</view>
						<view class="view-popupType" v-if="showSkill==true">
							<view class="view-name" v-for="item in shanchangList">
								{{item.schoolTypeName}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="box">
			<view class="box-1">
				<text>热榜</text>
				<text>清空</text>
			</view>
			<view class="box-2">
				<text>1-1-1-1-1-1-1-1-1-1-*-*-*-*-*-*-*-*-*</text>
				<text>222222222</text>
				<text>111111111111111000</text>
				<text>99999</text>
			</view>
		</view>
		
		<view class="box-b">
			<view class="box-1">
				<text>历史记录</text>
				<text>清空</text>
			</view>
			<view class="box-2">
				<text>1-1-1-1-1-1-1-1-1-1-*-*-*-*-*-*-*-*-*</text>
				<text>222222222</text>
				<text>111111111111111000</text>
				<text>99999</text>
			</view>
		</view>

	</view>
</template>

<script>
	import TabBar from '../../components/tabBar/tabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				showSki: false, //擅长方向
				showSkil: false,
				showSkill: false,
				value: '',
				show: 0,
				schoolType: [{
					configValue: 0,
					description: '民办院校'
				}, {
					configValue: 1,
					description: '公办院校'
				}, {
					configValue: 2,
					description: '职业院校'
				}, {
					configValue: 3,
					description: '兴趣培养'
				}, {
					configValue: 4,
					description: '社会实践'
				}, {
					configValue: 5,
					description: '幼儿教育'
				}, ],
				shanchangList: [{
					id: 0,
					schoolTypeName: '智能排序'
				}, {
					id: 0,
					schoolTypeName: '好评优选'
				}, {
					id: 0,
					schoolTypeName: '直线距离 近-远'
				}, ]
			}
		},
		onShow() {

		},
		methods: {
			tabbar(ids, val) {
				this.show = ids
				this.val = val
				this.page = 1
			},
		},
	}
</script>

<style>
	page {
		background: #f8f8f8;
	}
</style>

<style lang='scss'>
	.image-fanhui {
		width: 16rpx;
		height: 28rpx;
	}

	.image-fanhui-2 {
		width: 30rpx;
		height: 30rpx;
	}

	.view-search {
		width: 500rpx;
		flex-grow: 1;
		flex-shrink: 1;
		height: 58rpx;
		background: #F7F9FA;
		border-radius: 40rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20rpx;

		.image-search {
			width: 25rpx;
			height: 25rpx;
		}

		text {
			font-size: 28rpx;
			font-weight: 500;
			margin-left: 10rpx;
			color: #999999;
		}
	}

	.view-scoll {
		position: fixed;
		z-index: 10;
		background-color: #FFFFFF;
		width: 100%;
		display: flex;
		overflow-x: auto;
		/* border-bottom: 15rpx solid #F7F7F7; */
		height: 88rpx;
		// margin-top: 130rpx;

		.view-item {
			padding: 0 30rpx;

			.text-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
			}

			.text-titles {
				color: #4A9AFF !important;
			}

			.view-line {
				display: block;
				margin: 0 auto;
				width: 40rpx;
				height: 8rpx;
				margin-top: 10rpx;
				background: #4A9AFF;
				border-radius: 4rpx;
			}
		}
	}

	.view-switch-wrapper {
		height: 88rpx;

		.view-switch {
			display: flex;
			padding: 20rpx 30rpx;
			// position: fixed;
			z-index: 9999;
			background-color: #FFFFFF;
			width: 100%;
			justify-content: space-around;

			.view-item {
				font-size: 28rpx;
				font-weight: 400;
				color: #000;
				position: relative;

				.view-popupType {
					width: 240rpx;
					height: 240rpx;
					background-color: #FFFFFF;
					/* box-shadow: 0rpx 0rpx 10rpx #999999; */
					position: absolute;
					top: 56rpx;
					left: -50rpx;
					z-index: 999;
					overflow-y: scroll;

					.view-name {
						width: 80%;
						height: 70rpx;
						line-height: 70rpx;
						margin-left: 10rpx;
						/* text-align: center; */
						/* border-bottom: 1rpx solid #f1f1f1; */
					}
				}

				image {
					width: 14rpx;
					height: 8rpx;
					margin-left: 10rpx;
				}
			}

			.view-item {
				margin-left: 60rpx;

				.text-titles {
					color: #4A9AFF !important;
				}

				.text-title {
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
				}

				.view-line {
					width: 40rpx;
					height: 8rpx;
					background: #4A9AFF;
					border-radius: 4rpx;
					margin: 0 auto;
					margin-top: 10rpx !important;
				}

				&:first-child {
					margin-left: 0rpx;
				}
			}
		}

	}


	.box {
		width: 90%;
		height: 220rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: auto;

		.box-1 {
			text {
				color: #aaa;
				display: inline-block;
				margin: 10rpx;
				&:nth-child(2) {
					 position: absolute;
					  right: 0;
					  margin: 0 50rpx 0 0;
				}
			}

		}
		
		.box-2 {
			text {
				color: #FFFFFF;
				display: inline-block;
				background: #4A9AFF;
				padding: 5rpx 10rpx 5rpx 10rpx;
				border-radius: 20rpx;
				margin-left: 40rpx;
				font-size: 24rpx;
				justify-content: space-around;
				/* margin-top: 20rpx; */
				margin-bottom: 20rpx;
			}
		}
	}
	
	.box-b {
		width: 90%;
		height: 220rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: auto;
		margin-top: 40rpx;
	
		.box-1 {
			text {
				color: #aaa;
				display: inline-block;
				margin: 10rpx;
				&:nth-child(2) {
					 position: absolute;
					  right: 0;
					  margin: 0 50rpx 0 0;
				}
			}
	
		}
		
		.box-2 {
			text {
				color: #000;
				display: inline-block;
				background: #f3f0f3;
				padding: 5rpx 10rpx 5rpx 10rpx;
				border-radius: 20rpx;
				margin-left: 40rpx;
				font-size: 24rpx;
				justify-content: space-around;
				/* margin-top: 20rpx; */
				margin-bottom: 20rpx;
			}
		}
	}
</style>
