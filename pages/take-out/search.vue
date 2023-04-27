<template>
	<view>
		<view class="fill-top"></view>
		<view class="view-content1">
			<view class="view-head">
				<view style="height: 80rpx;" class=""></view>
				<view class="img-1">
					<image src="../../static/images/left-2.png" mode=""></image> <text class="song">即时送</text>
				</view>
				<view class="img">
					<image src="../../static/images/location.png" mode=""></image>
					<text class="site">北晨公寓</text>
				</view>
				<view class="ipt">
					<view class="btn">搜索</view>
					<u-search placeholder="新人专享低至五折" v-model="searchValue" height="50" :show-action="false"></u-search>
				</view>
				<view class="box-1">
					<view class="title">热门搜索</view>
					<image class="hot" src="../../static/images/sousuopai.png" mode=""></image>
					<view style="height: 10rpx;" class=""></view>
					<view class="sousuo">
						<view class=""> <text>1</text> 百果园(文华路店) </view>
						<view class=""> <text>2</text> 百果园(文华路店) </view>
						<view class=""> <text>3</text> 百果园(文华路店) </view>
						<view class="">  百果园(文华路店) </view>
						<view class="">  包菜 </view>
						<view class="">  生菜 </view>
					</view>
				</view>
				<!-- 历史搜索 -->
				<view class="box-2">
					<view class="title">搜索历史</view>
					<image @click="show = false" class="del" src="../../static/images/clear.png" mode=""></image>
					<view style="height: 10rpx;" class=""></view>
					<view class="sousuo" v-show="show">
						<view class="">  百果园(文华路店) </view>
						<view class="">  百果园(文华路店) </view>
						<view class="">  百果园(文华路店) </view>
						<view class="">  百果园(文华路店) </view>
						<view class="">  包菜 </view>
						<view class="">  生菜 </view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:true
			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	.view-content1 {
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-x: hidden;

		.view-head {
			background-color: #3587f7;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 2;


			width: 100%;
			// padding: 0 30rpx 20rpx;
			margin-top: -20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			height: 320rpx;

			/deep/.u-search {
				width: 100%;
				flex: 0;

				.u-search__content {
					height: 80rpx !important;
				}
			}

			.img-1 {
				position: absolute;
				top: 100rpx;
				left: 30rpx;

				image {
					width: 20rpx;
					height: 30rpx;
					vertical-align: middle;
				}

				.song {
					font-family: 'zcoolqingkehuangyouti-Regular';
					color: #FFF;
					margin-left: 10rpx;
				}
			}

			.img {
				position: absolute;
				top: 100rpx;
				left: 180rpx;

				image {
					width: 25rpx;
					height: 35rpx;
					// vertical-align: middle;
				}

				.site {
					color: #FFF;
					margin-left: 10rpx;
				}
			}

			.ipt {
				margin-top: 90rpx;
				border-radius: 50%;
				width: 95%;

				.btn {
					display: inline-block;
					padding: 5rpx 20rpx;
					color: #FFF;
					font-size: 22rpx;
					background: #2679F7;
					border-radius: 20rpx;
					position: absolute;
					top: 190rpx;
					right: 10%;
				}
			}
		}
	}

	.box-1 {
		width: 100%;
		border-radius: 20rpx 20rpx 0 0;
		z-index: -1;
		background-color: #FFF;
		margin-top: 30rpx;

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
