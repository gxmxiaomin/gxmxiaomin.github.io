<template>
	<view class="page_view">
		<view class="page_bg" :style="pageBg">
			<view class="tab_cell">
				<u-icon name="arrow-left" color="#fff" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="center">
				<u-icon name="search" color="#999" size="24"></u-icon>
				<text style="margin-left: 10rpx;">请输入要搜索的关键词</text>
			</view>
			<view class="tab_cell">
				<text>搜索</text>
			</view>
		</view>
		
		<view class="page_content">
			<image :src="img" mode="" class="shop-img"></image>
			<text class="shop_name">果蔬(文化路店）</text>
			<view class="star-box">
				<u-icon name="star-fill" color="#FC6129" size="18"></u-icon>
				<text>5.0</text>
			</view>
			<view class="info-box">
				<text>30分钟</text>
				<text style="margin-left: 20rpx;">1.0km</text>
			</view>
			<view class="label_box">
				<text>起送￥50</text>
				<text>免配送费</text>
				<text>月销25283</text>
				<text :style="'color:'+textColor+';'">本月果蔬店排名第一</text>
			</view>
			<view class="tip_box">
				<u-icon name="volume" :color="textColor" size="18"></u-icon>
				<text style="font-weight: 600;margin-left: 5rpx;">公告</text>
				<view class="text_info_box">
					<text>哈哈哈哈</text>
				</view>
				<u-icon name="arrow-right" color="#999" size="16"></u-icon>
			</view>
			
			<!-- 优惠券 -->
			<view class="coupon_box">
				<text class="value_text">10元</text>
				<text class="text_title">新人专享</text>
				<text class="get_btn">立即领取</text>
			</view>
			
			<view class="tab_list" :style="'--textColor:' + textColor">
				<text :class="{'active_tab': current==0}" @click="changeCurrent(0)">商品</text>
				<text :class="{'active_tab': current==1}" @click="changeCurrent(1)">商家</text>
				<text :class="{'active_tab': current==2}" @click="changeCurrent(2)">评价</text>
			</view>
			
			<view class="box_box">
				<shopCom v-show="current==0" :textColor='textColor'></shopCom>
				<shopInfoCom v-show="current==1" :textColor='textColor'></shopInfoCom>
				<shopComPl v-show="current==2" :textColor='textColor'></shopComPl>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	import shopCom from '@/pages/take-out/components/shop-com.vue'
	import shopInfoCom from '@/pages/take-out/components/shop-info-com.vue'
	import shopComPl from '@/pages/take-out/components/shop-com-pl.vue'
	export default {
		components:{ shopCom, shopInfoCom, shopComPl },
		data() {
			return {
				defSty:{},
				img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
				current: 0,
			};
		},
		computed:{
			pageBg() {
				return this.defSty.pageBg||""
			},
			
			textColor() {
				return this.defSty.textColor||''
			}
		},
		onLoad(options) {
			let defSty = options.defSty
			if(defSty) this.defSty=JSON.parse(defSty)
			else this.defSty = {}
			console.log(this.defSty)
		},
		methods:{
			changeCurrent(index){
				this.current = index
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

.page_content {
	width: 100%;
	height: calc(100vh - var(--status-bar-height) - 140px + 40rpx);
	background-color: #fff;
	position: relative;
	border-radius: 20rpx;
	top: -40rpx;
	
	padding: 160rpx 30rpx 0 30rpx;
	.shop-img {
		width: 130rpx;
		height: 130rpx;
		border-radius: 20rpx;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.shop_name {
		position: absolute;
		top: 85rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 24rpx;
		color: #333333;
	}
	.star-box {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		display: flex;
		align-items: center;
		text{
			font-size: 28rpx;
			color: #FC6129;
			margin-left: 5rpx;
		}
		
	}
	.info-box {
		font-size: 24rpx;
		color: #999999;
		position: absolute;
		right: 30rpx;
		top: 85rpx;
	}
	.label_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 30rpx;
		position: absolute;
		top: 120rpx;
		left: 0;
		font-size: 24rpx;
		color: #999999;
	}
	.tip_box {
		margin-top: 20rpx;
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 70rpx;
		border: 1rpx solid rgba(170, 170, 170, 0.3);
		box-sizing: 0 10rpx 10rpx #999;
		box-sizing: border-box;
		padding: 0 20rpx;
		.text_info_box {
			width: calc(100% - 130rpx);
			height: 100%;
			font-size: 26rpx;
			color: #999;
			padding-left: 20rpx;
		}
	}
}

// 优惠券
.coupon_box {
	width: 100%;
	height: 100rpx;
	margin-top: 30rpx;
	background-image: url("@/static/images/take-out/coupon_bg.png");
	background-size: 100% 100%;
	position: relative;
	font-family: PingFang-SC;
	font-weight: Heavy;
	.value_text {
		position: absolute;
		left: 40rpx;
		top: 50%;
		transform: translateY(-50%);
		color: #fff;
		font-size: 70rpx;
	}
	.text_title{
		color: #fff;
		font-size: 40rpx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 210rpx;
	}
	.get_btn {
		padding: 0 10rpx;
		height: 30rpx;
		line-height: 30rpx;
		border-radius: 30rpx;
		text-align: center;
		font-size: 20rpx;
		color: #F63622;
		background-color: #fff;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 30rpx;
	}
}

.tab_list {
	width: 100%;
	height: 88rpx;
	font-size: 32rpx;
	color: #333333;
	font-weight: Bold;
	font-family: PingFang-SC;
	display: flex;
	align-items: center;
	justify-content: space-around;
	letter-spacing: 4rpx;
	.active_tab {
		// color: #716DF5;
		color: var(--textColor);
		transition: 0.3s;
	}
}

.box_box {
	width: 100%;
	height: calc(100% - 100rpx - 88rpx - 30rpx - 70rpx - 20rpx);
}
</style>
