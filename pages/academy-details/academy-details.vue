<template>
	<view class="comp-interest">
		<view class="view-header" :style="'background: url('+bg+');'">
		<u-navbar title="UI专业">
			<view class="u-nav-slot" slot="left" @click="uni.navigateBack({})">
				<image class="image-fanhui" src="../../static/images/31fanhui1.png"></image>
			</view>
		</u-navbar>
		</view>
		<view class="img-1">
			<image src="../../static/images/ui-img.png" mode=""></image>
		</view>
		<!-- 专业介绍 -->
		
		<view style="margin-top: 150rpx;">
		<view class="inter-box" style="">
			<text class="inter-title">专业介绍</text>
			<text :style="{'height':height.h+'rpx','margin':this.height.m}" class="inter-info zhankai">{{ info.info }}</text>
			<text class="zhanshi-2" v-if="this.show" @click="s">收起</text>
			<text class="zhanshi-2" v-else @click="s">展开</text>
		</view>
		
		<view class="inter-box">
			<text class="inter-title">学生获得证书</text>
			<view class="honor-list">
				<view class="honor-cell" v-for="i in 6" :key="i">
					<image src="https://img2.baidu.com/it/u=436635185,1433075744&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500" mode=""></image>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
		</view>
		
		<!-- 辅导员 -->
		<view class="inter-box">
			<text class="inter-title">辅导员</text>
			<view class="teacher-list">
				<view class="teacher-cell" v-for="item in info.list" :key="item.id">
					<image :src="item.url" mode=""></image>
					<view class="">
						<text style="padding: 10rpx 0 0 10rpx; " class="text-line-1">{{item.name}}</text>
					    <text style="padding: 0 0 10rpx 10rpx;" class="text-line-1">11111111111111000000000</text>
					</view>
					
				</view>
			</view>
			
			<view style="margin: 0;padding: 0;" class="inter-box">
				<text class="inter-title">获得证书</text>
				<view class="honor-list">
					<view class="honor-cell" v-for="i in 6" :key="i">
						<image src="https://img2.baidu.com/it/u=436635185,1433075744&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500" mode=""></image>
					</view>
				</view>
				<view style="height: 20rpx;"></view>
			</view>
		</view>
		
		<view style="margin-bottom: 100rpx;" class="inter-box">
			<text class="inter-title">专业介绍</text>
			<text style="margin: 0 10rpx;padding: 0 10rpx 10rpx 10rpx;" class="inter-info">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptates. Non voluptatum beatae ipsam temporibus sit, reiciendis eveniet error repudiandae debitis facere quas, ducimus voluptate repellat obcaecati! Explicabo, fugiat debitis?</text>
		</view>
		</view>
		
		
		<!-- 底部填充 -->
		<view class="footer-fill"></view>
		<!-- 底部固定 -->
		<view class="footer">
			<view class="btn">
				<u-button text="点击报名" type="primary" shape="circle"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				height:{h:'190',m:'0 10rpx'},
				bg: require('@/static/images/ui-bg-1.png'),
				info:{
					info: `安康士大夫看见哈桑当地警方哈世界的繁华江哈斯的付款计划撒旦发贺卡上按时鉴定会饭卡上打开静安寺的肌肤杀菌的
						哈克收到回复即可贺卡就是反对户籍卡计划和艰苦环境和贺卡是假的回复即可靠靠靠靠靠靠靠卡的首付款课件安康士大夫看见哈桑当地警方哈世界的繁华江哈斯的付款计划撒旦发贺卡上按时鉴定会饭卡上打开静安寺的肌肤杀菌的
						哈克收到回复即可贺卡就是反对户籍卡计划和艰苦环境和贺卡是假的回复即可靠靠靠靠靠靠靠`,
					power: `安康士大夫看见哈桑当地警方哈世界的繁华江哈斯的付款计划撒旦发贺卡上按时鉴定会饭卡上打开静安寺的肌肤杀菌的
						哈克收到回复即可贺卡就是反对户籍卡计划和艰苦环境和贺卡是假的回复即可靠靠靠靠靠靠靠`,
					list:[{
						url:"https://img2.baidu.com/it/u=436635185,1433075744&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500",
						name: '老师1',
						
						id: 0
					}, {
						url:"https://img2.baidu.com/it/u=436635185,1433075744&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500",
						name: '老师3',
						id: 1
					}, {
						url:"https://img2.baidu.com/it/u=436635185,1433075744&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500",
						name: '老师2',
						id: 2
					}, {
						url:"https://img2.baidu.com/it/u=436635185,1433075744&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500",
						name: '老师2',
						id: 3
					}, {
						url:"https://img2.baidu.com/it/u=436635185,1433075744&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500",
						name: '老师2',
						id: 4
					}, {
						url:"https://img2.baidu.com/it/u=436635185,1433075744&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500",
						name: '老师2',
						id: 5
					}]
				},
				notice:"接按揭快速导航飞机喀什的咖啡机哈数据库哈世界的繁华喀什觉得好烦黑暗时代JFK哈萨克京东方asdfasdfassd "
			}
		},
		onShow() {
			
		},
		methods: {
			s() {
				if(this.show){
					this.show = false
					this.height.h = '200'
				}else{
					this.show = true
				this.height.h = '400'
				}
				
			}
		},
	}
</script>

<style>
	page{
		background: #f3f0f3;
	    /* background-color:#aaaa7f; */
	}
</style>

<style lang="scss" scoped>
	/deep/.u-navbar__content {
		background: none !important;
	}
	
	.zhanshi-2 {
		display: inline-block;
		position: relative;
		margin: 10rpx 20rpx 10rpx 20rpx;
		// width: 95%;
		left: 85%;
		
	}
	
	.zhankai {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;

	}
	
	.u-nav-slot-r {
		display: flex;
		// align-items: center;
		position: relative;
	}
	.image-fanhui {
		width: 16rpx;
		height: 28rpx;
	}
	
	.view-header {
		width: 100%;
		height: 400rpx;
		background-size: cover !important;
		padding-top: var(--status-bar-height);
		}
	.comp-interest{
		box-sizing: border-box;
		// padding: 0 30rpx;
		
		.img-1 {
			position: absolute;
			// margin-top: 10rpx;
			// bottom: 160rpx;
			// margin-left: 8%;
			top: 200rpx;
			left: 50%;
			transform: translateX(-50%);
			
			image {
				height: 320rpx;
				width: 700rpx;
			}
		}
	}
	.notic-line{
		margin-top: 30rpx;
		display: flex;
		align-content: center;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		background-color: #fff;
		border-radius: 30rpx;
		.notice-icon{
			width: 100rpx;
			height: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.notic-text{
			flex: 1;
			height: 50rpx;
			line-height: 50rpx;
			padding-left: 20rpx;
			flex-wrap: nowrap;
			overflow: hidden;
			font-size: 28rpx;
			color: #8d8d8d;
		}
	}


	
	.text-line-1 {
		// padding: 10rpx;
		background: #f6f3f7;
		display: inline-block;
		width: 100%;
		line-height: 40rpx;
		// height: 60rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical
	}
	
	.inter-box{
		// padding: 0 30rpx;
		// padding: 0 10rpx 0 10rpx;
		
		// padding: 20rpx;
		margin: auto;
		margin-top: 30rpx;
		width: 95%;
		// width: 100%;
		min-height: 100rpx;
		background-color: #fff;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #707070;
		.inter-title{
			margin: 10rpx;
			font-size: 36rpx;
			font-weight: 900;
			color: #000;
			// margin-bottom: 20rpx;
		}
	}
	
	.teacher-list{
		// background: #000;
		min-height: 300rpx;
		// background-color: #06238d;
		// display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		display: -webkit-box;
		-webkit-overflow-scrolling: touch;
		// margin: 0.5rem 0.5rem;
		.teacher-cell {
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			width: 38%;
			padding: 0 10rpx;
			// margin: 0 20rpx;
			position: relative;
			image {
				width: 100%;
				height: 200rpx;
			}
		}
	}

	.honor-list {
		width: 100%;
		min-height: 300rpx;
		display: flex;
		// justify-content: space-between;
		flex-wrap: wrap;
		margin-left: 20rpx;
		.honor-cell{
			margin: 0 10rpx;
			padding: 10rpx 0;
			width: 205rpx;
			min-height: 150rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 100%;
				height: 150rpx;
			}
		}
	}

	.img{
		width: 100%;
		padding: 0 30rpx;
		image{
			width: 100%;
			height: 300rpx;
		}
		img{
			width: 100%;
			height: auto;
		}
	}
	
	.footer-fill {
		height: 120rpx;
		width: 100%;
	}
	.footer{
		width: 100vw;
		height: 100rpx;
		background-color: #f3f0f3;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		.cell{
			width: 80%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			text{
				font-size: 24rpx;
				color: #838383;
			}
		}
		.btn{
			width: 90%;
			height: 10%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>