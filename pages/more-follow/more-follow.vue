<template>
	<view class="page-view">
		<TabBar :isFill="true">
			<view slot="left">
				<u-icon name="arrow-left" color="#515151" size="24"></u-icon>
			</view>
			<view slot="center">
				<text>更多关注</text>
			</view>
			<view slot="right">
				<u-icon name="search" color="#515151" size="24"></u-icon>
			</view>
		</TabBar>
		<view class="box">
			<scroll-view scroll-y="true" class="left-scroll-box">
				<view class="scroll-content">
					<!-- 选中区域的上部分 -->
					<view class="tabs-top">
						<view class="tabs-cell" v-for="(item,index) in tabs.slice(0,current)" :key="item.id" @click="current=index">
							<text>{{item.name}}</text>
						</view>
					</view>
					<!-- 选中的 -->
					<view class="tabs-current">
						<view v-for="item in tabs.slice(current,current+1)" :key="item.id">
							<text>{{item.name}}</text>
						</view>
					</view>
					<!-- 选中的后面部分 -->
					<view class="tabs-bottom">
						<view class="tabs-cell" v-for="(item,index) in tabs.slice(current+1, tabs.length)" :key="item.id" @click="current=current+1+index">
							<text>{{item.name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="right-scroll-box">
				<view class="scroll-content">
					<!-- 用户列表 -->
					<view class="user-cell" v-for="item in userList" :key="item.id">
						<image :src="item.headerUrl" mode=""></image>
						<view class="user-info">
							<text style="font-size: 26rpx; color: #515151;font-weight: bold;">{{item.name}}</text>
							<text> {{ item.inder }} </text>
							<text>{{ (item.fans/10000)>1? (item.fans/10000).toFixed(1) + '万': item.fans }}粉丝</text>
						</view>
						<view class="status" :class="{'alery-follow': item.isFollow}">
							<text>{{item.isFollow? '已关注':'关注'}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	export default {
		components: { TabBar },
		data() {
			return {
				tabs:[],
				userList:[],
				current: 0,
			};
		},
		
		onLoad() {
			this.getTabs()
			this.getUserList()
		},
		
		methods:{
			getTabs() {
				this.tabs = [
					{ id:1, name:'推荐' },
					{ id:2, name:'职场' },
					{ id:3, name:'育儿' },
					{ id:4, name:'教育' },
					{ id:5, name:'时尚' },
					{ id:6, name:'财经' },
					{ id:7, name:'宠物' },
					{ id:8, name:'科学' }
				]
			},
			
			getUserList() {
				this.userList = [
					{ 
						id:1, 
						name:'绘画家', 
						headerUrl:"https://img2.baidu.com/it/u=3992399634,997460352&fm=253&fmt=auto&app=120&f=JPEG?w=680&h=454",
						inder:'每日分享一些绘画技巧',
						fans: 25000,
						isFollow: false
					},
					{
						id:2, 
						name:'收藏家', 
						headerUrl:"https://img2.baidu.com/it/u=3992399634,997460352&fm=253&fmt=auto&app=120&f=JPEG?w=680&h=454",
						inder:'每日分享一些绘画技巧',
						fans: 2000,
						isFollow: true
					},
				]
			},
		}
	}
</script>

<style lang="scss" scoped>
.page-view {
	width: 100%;
	min-height: 100vh;
	.box {
		display: flex;
		width: 100%;
		height: calc( 100vh - var(--status-bar-height) - 44px );
	}
}
.left-scroll-box {
	width: 30%;
	height: 100%;
	.tabs-top {
		background-color: #F7F7F7;
		border-bottom-right-radius: 20rpx;
	}
	.tabs-bottom {
		background-color: #F7F7F7;
		border-top-right-radius: 20rpx;
	}
	.tabs-cell {
		width: 100%;
		height: 100rpx;
		font-size: 32rpx;
		color: #808080;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tabs-current {
		background-color: #fff;
		width: 100%;
		height: 100rpx;
		font-size: 32rpx;
		color: #4A9AFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.right-scroll-box {
	width: 70%;
	height: 100%;
	.user-cell {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		border-bottom: 1rpx solid rgba(206, 206, 206, 0.5);
		display: flex;
		align-items: center;
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
		.user-info {
			margin-left: 20rpx;
			margin-right: 10rpx;
			flex: 1;
			line-height: 33rpx;
			display: flex;
			flex-direction: column;
			text{
				width: 100%;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical;
				font-size: 24rpx;
				color: #666666;
			}
		}
		.status {
			width: 100rpx;
			height: 50rpx;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #4A9AFF;
			text{
				font-size: 24rpx;
				color: #fff;
				font-family: PingFang-SC;
				font-weight: Medium;
			}
		}
		.alery-follow {
			border: 1rpx solid rgba(185, 185, 185, 0.5);
			background-color: #fff;
			text{
				color: #999999;
			}
		}
		
	}
}

.scroll-content {
	width: 100%;
	min-height: calc( 100vh - var(--status-bar-height) - 44px );
}
</style>
