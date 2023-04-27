<template>
	<view class="comp-interest">
		<tabBar color="#000" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot='left'>
				<image class="image-fanhui" src="../../static/images/back.png"></image>
			</view>
			<view class="tab-center" slot="center">
				<text>院系详情</text>
			</view>
			<view class="tab-left" slot='right'>
				<image class="image-fanhui-2" src="../../static/images/homeeducation.png"></image>
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



		<!-- <view style="height: 80rpx;" class='view'></view> -->

		<view class="box">
			<view class="view-box">
				<view class="box-1">
					<text style="font-size: 30rpx;">UI<br>专业</text>
				</view>
				<view class="box-2">
					<text>60</text><br>
					<text>预收人</text>
				</view>

				<view class="box-2">
					<text>40</text><br>
					<text>现收人</text>
				</view>

				<view class="box-3">
					<text>现收率</text>
					<text>66%</text>
					<view class="jdt">
						<view></view>
					</view>
				</view>
			</view>

			<view class="view-box">
				<view class="box-1">
					<text style="font-size: 30rpx;">电商<br>专业</text>
				</view>
				<view class="box-2">
					<text>60</text><br>
					<text>预收人</text>
				</view>

				<view class="box-2">
					<text>40</text><br>
					<text>现收人</text>
				</view>

				<view class="box-3">
					<text>现收率</text>
					<text>66%</text>
					<view class="jdt">
						<view></view>
					</view>
				</view>
			</view>

			<view class="view-box">
				<view class="box-1">
					<text style="font-size: 30rpx;">数媒<br>专业</text>
				</view>
				<view class="box-2">
					<text>60</text><br>
					<text>预收人</text>
				</view>

				<view class="box-2">
					<text>40</text><br>
					<text>现收人</text>
				</view>

				<view class="box-3">
					<text>现收率</text>
					<text>66%</text>
					<view class="jdt">
						<view></view>
					</view>
				</view>
			</view>

			<view class="view-box">
				<view class="box-1">
					<text style="font-size: 30rpx;">开发<br>专业</text>
				</view>
				<view class="box-2">
					<text>60</text><br>
					<text>预收人</text>
				</view>

				<view class="box-2">
					<text>40</text><br>
					<text>现收人</text>
				</view>

				<view class="box-3">
					<text>现收率</text>
					<text>66%</text>
					<view class="jdt">
						<view></view>
					</view>
				</view>
			</view>

			<view class="view-box">
				<view class="box-1">
					<text style="font-size: 30rpx;">软件<br>专业</text>
				</view>
				<view class="box-2">
					<text>60</text><br>
					<text>预收人</text>
				</view>

				<view class="box-2">
					<text>40</text><br>
					<text>现收人</text>
				</view>

				<view class="box-3">
					<text>现收率</text>
					<text>66%</text>
					<view class="jdt">
						<view></view>
					</view>
				</view>
			</view>
		</view>


		<view class="footer">
			<view class="btn" @click="uni.navigateTo({url:'../grade-details/grade-details'})">
				<u-button text="点击报名" type="primary" shape="circle"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import TabBar from '../../components/tabBar/tabBar.vue'
	export default {
		components: { TabBar },
		data() {
			return {
				show: 0,
				schoolType: [{
					configValue: 0,
					description: '全部'
				}, {
					configValue: 1,
					description: '信息工程系'
				}, {
					configValue: 2,
					description: '机电系'
				}, {
					configValue: 3,
					description: '艺术系'
				}, {
					configValue: 4,
					description: '经管系'
				},],
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
		background: #f3f0f3;
	}
</style>

<style lang="scss" scoped>
	.image-fanhui {
		width: 16rpx;
		height: 28rpx;
	}
	
	.image-fanhui-2 {
		width: 30rpx;
		height: 30rpx;
	}


	.view-scoll {
		position: fixed;
		z-index: 10;
		background-color: #FFFFFF;
		width: 100%;
		display: flex;
		overflow-x: auto;
		border-bottom: 15rpx solid #F7F7F7;
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


	.image-fanhui {
		width: 16rpx;
		height: 28rpx;
	}

	.box {
		// background: #f9f8f9;
		width: 100%;
		display: flex;
		// justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 80rpx;
	}

	.box :nth-child(even) {
		.box-1 {
			background: #59c185;
		}

		.box-3 {
			.jdt {
				view {
					background: #59c185;
				}
			}
		}

	}

	.view-box {
		background: #FFF;
		margin: 10rpx 0 10rpx 30rpx;
		width: 44%;
		height: 220rpx;
		border-radius: 20rpx;
		border: 1rpx solid #8daec8;

		.box-1 {
			background: #4d9afe;
			text-align: center;
			width: 100rpx;
			height: 100rpx;
			margin: 10rpx;
			display: inline-block;
			border-radius: 50%;

			text {
				color: #FFF;
			}
		}

		.box-2 {
			display: inline-block;
			// border: 1rpx solid black;
			width: 90rpx;
			text-align: center;

			text {
				display: inline-block;

				&:nth-child(1) {
					position: relative;
					// top: 10rpx;
				}

				&:nth-child(3) {
					color: #b1b0b2;
					position: relative;
					bottom: 10rpx;
					font-size: 24rpx;
				}


			}
		}

		.box-3 {
			// border: 1rpx solid black;
			width: 95%;
			height: 80rpx;
			margin: auto;
			// margin-top: 30rpx;

			text {
				font-size: 24rpx;

				&:nth-child(1) {
					color: #b1b0b2;
				}

				&:nth-child(2) {
					display: inline-block;
					width: 70%;
					// margin-left: 160rpx; 
					text-align: right;
				}
			}

			.jdt {
				width: 95%;
				height: 20rpx;
				// border: 1rpx solid black;
				background: #eeeeef;
				border-radius: 20rpx;
				// margin-top: 10rpx;

				view {
					background: #4d9afe;
					width: 66%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
		}
	}

	.footer {
		width: 100vw;
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;

		.btn {
			margin-right: 30rpx;
			margin-top: 20rpx;
			width: 90%;
			height: 60%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
