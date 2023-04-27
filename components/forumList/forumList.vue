<template>
	<view class="com-forum">
		<view class="com-list-cell" v-for="(item, index) in list" :key="index" @click="uni.navigateTo({url:'../personal-home-page/personal-home-page?id='+item.userId})">
			
			<view class="com-cell-one" v-if="item.content == ''">
				<view class="com-cell-one-title">
					<text>{{item.title}}</text>
				</view>
				<image v-if="item.videoCover == ''" src="https://img2.baidu.com/it/u=2045019318,65348288&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" mode=""></image>
				<image v-else :src="item.videoCover" mode=""></image>
				<view class="com-cell-one-bottom">
					<text>每日经济新闻</text>
					<text style="margin-left: 10px;">{{item.comment}}评论</text>
					<text style="margin-left: 10px;">{{item.createTime}}</text>
				</view>
			</view>
			
			<!-- v-if="item.content == ''" -->
			<view class="com-cell-two">
				<view class="com-cell-two-title">
					<text>{{item.title}}</text>
				</view>
				<view class="img">
					<image v-if="item.videoCover == ''" src="https://img2.baidu.com/it/u=2045019318,65348288&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" mode=""></image>
					<image v-else :src="item.videoCover" mode=""></image>
				</view>
				<view class="com-cell-two-bottom">
					<text>每日经济新闻</text>
					<text style="margin-left: 20rpx;">{{item.comment}}评论</text>
					<text style="margin-left: 20rpx;">{{item.createTime}}</text>
				</view>
			</view>
			
			<view style="height:30rpx; width:200rpx;"></view>
			
			<view class="com-cell-three" v-if="item.videoCover == '' && item.content == ''">
				<view class="com-cell-three-top">
					<view class="header-img">
						<image :src="item.headUrl" mode=""></image>
					</view>
					<text class="com-user-name">{{item.nickName}}</text>
					<view class="com-user-info">
						<text>{{item.createTime}}</text>
						<text style="margin-left: 20rpx;">{{item.city}}</text>
					</view>
					<view class="com-dync-see-num">
						<u-icon name="eye" size="18"></u-icon>
						<text style="margin-left: 20rpx;">{{item.browse}}</text>
					</view>
				</view>
				<view class="com-cell-three-title">
					<text>{{item.title}}</text>
				</view>
				<view class="com-cell-three-bottom">
					<view class="com-action-cell">
						<u-icon name="share-square" size="20"></u-icon>
						<text class="com-action-num"> {{item.forward}} </text>
					</view>
					<view class="com-action-cell">
						<u-icon name="star" size="20"></u-icon>
						<text class="com-action-num"> {{item.collection}} </text>
					</view>
					<view class="com-action-cell">
						<u-icon name="more-circle" size="20"></u-icon>
						<text class="com-action-num"> {{item.comment}} </text>
					</view>
					<view class="com-action-cell">
						<u-icon name="thumb-up" size="20"></u-icon>
						<text class="com-action-num"> {{item.fabulous}} </text>
					</view>
				</view>
			</view>
		
			<view class="com-cell-four" v-if="item.videoCover.indexOf(',') >=1 ">
				<view class="com-cell-four-title">
					<text>中华五千年文明留下来的历史文化遗产如源头活水请问滋养着华夏大地卡萨丁解放路口进去哦为偶数的身份卡的很技术的风口浪尖lads进服务器二啥地方立刻就我上帝就发临时搭建</text>
				</view>
				<view class="com-cell-four-imgList">
					<view class="com-cell-four-img" @click="$showImg(imgUrl, curUrl)">
						<image src="https://img2.baidu.com/it/u=4134684418,1778896974&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500" mode=""></image>
					</view>
					<view class="com-cell-four-img"  @click="$showImg(imgUrl, curUrl)">
						<image src="https://img1.baidu.com/it/u=4049022245,514596079&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500" mode=""></image>
					</view>
					<view class="com-cell-four-img"  @click="$showImg(imgUrl, curUrl)">
						<image src="https://img2.baidu.com/it/u=4010367258,1752169979&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ForumList",
		props:{
			list:{
				type: Array,
				default: [],
				required: true,
				validator: function(value) {
					return Array.isArray(value)
				}
			}
		},
		data() {
			return {
				imgUrl: ['https://img2.baidu.com/it/u=4134684418,1778896974&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500'],
				curUrl: 'https://img2.baidu.com/it/u=4134684418,1778896974&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500'
			};
		},
		created() {
			console.log('000000000000000000000000000000000000000000000000')
			setTimeout(()=>{
				console.log("组件中接收到的参数", this.list)
			},500)
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.com-list-cell{
	position: relative;
	padding: 26rpx 20rpx;
	border-bottom: 1rpx solid rgba(25, 25, 25, 0.1);
}

.com-cell-one {
	width: 100%;
	.com-cell-one-title {
		overflow: hidden;
		text-overflow: -o-ellipsis-lastline;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 28rpx;
		font-family: PingFang-SC-Bold;
		color: #333333;
	}
	
	image {
		width: 100%;
		margin-top: 10rpx;
	}
	
	.com-cell-one-bottom {
		margin-top: 20rpx;
		display: flex;
		width: 100%;
		color: #666666;
		font-size: 24rpx;
		font-family: PingFang-SC-Medium;
	}
}

.com-cell-two {
	width: 100%;
	height: 200rpx;
	padding: 25rpx 20rpx;
	position: relative;
	.com-cell-two-title {
		width: 410rpx;
		position: absolute;
		top: 25rpx;
		left: 0;
		font-size: 28rpx;
		color: #333333;
		font-family: PingFang-SC-Bold;
		overflow: hidden;
		text-overflow: -o-ellipsis-lastline;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	
	.img {
		position: absolute;
		right: 0;
		width: 224rpx;
		height: 150rpx;
		border-radius: 10rpx;
		overflow: hidden;
		image{
			width: 100%;
		}
	}
	
	.com-cell-two-bottom {
		width: 410rpx;
		display: flex;
		position: absolute;
		bottom: 20rpx;
		left: 0;
		font-size: 24rpx;
		color: #666666;
		font-family: PingFang-SC-Medium;
	}
}

.com-cell-three {
	.com-cell-three-top {
		position: relative;
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		padding-bottom: 12rpx;
		border-bottom: 1rpx solid rgba(25, 25, 25, 0.02);
		.header-img {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
			overflow: hidden;
			position: absolute;
			image {
				width: 100%;
			}
		}
		.com-user-name {
			position: absolute;
			top: 5rpx;
			left: 120rpx;
			font-size: 32rpx;
			font-family: PingFang-SC-Medium;
			color: #333333;
		}
		.com-user-info {
			position: absolute;
			bottom: 15rpx;
			left: 120rpx;
			font-size: 24rpx;
			color: #999999;
			font-family: PingFang-SC-Medium;
		}
		.com-dync-see-num {
			position: absolute;
			width: 180rpx;
			right: 0;
			top: 24rpx;
			display: flex;
			color: #666666;
			font-size: 24rpx;
			font-family: PingFang-SC-Medium;
		}
	}
	.com-cell-three-title {
		margin-top: 20rpx;
		color: #333333;
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
	}
	.com-cell-three-bottom {
		margin-top: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.com-action-cell {
			display: flex;
			align-items: center;
			.com-action-num {
				margin-left: 10rpx;
				font-size: 28rpx;
			}
		}
	}
}

.com-cell-four {
	width: 100%;
	position: relative;
	.com-cell-four-title {
		font-size: 28rpx;
		font-family: PingFang-SC-Bold;
		color: #333333;
		overflow: hidden;
		text-overflow: -o-ellipsis-lastline;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.com-cell-four-imgList {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
		.com-cell-four-img {
			width: 226rpx;
			height: 226rpx;
			border-radius: 10rpx;
			overflow: hidden;
			image {
				height: 100%;
			}
		}
	}
}

</style>