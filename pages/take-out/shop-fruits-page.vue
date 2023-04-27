<template>
	<view class="page_view">
		<view class="page_bg" :style="pageBg">
			<view class="tab_cell">
				<u-icon name="arrow-left" color="#fff" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="center" @click="goSearch">
				<u-icon name="search" color="#999" size="24"></u-icon>
				<text style="margin-left: 10rpx;">请输入要搜索水果的关键词</text>
			</view>
			<view class="tab_cell">
				<text>搜索</text>
			</view>
		</view>
		
		<view class="list-box">
			<scroll-view scroll-y="true" class="scroll-box">
				<view class="scroll-content">
					<view v-for="i in 10" :key="i" @click="clickShop(i)">
						<shopCell :showTime="false" :labelBg='labelBg'></shopCell>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import shopCell from './components/shop-cell.vue'
	export default {
		components: { shopCell },
		data() {
			return {
				defSty:{}
			};
		},
		computed:{
			pageBg() {
				return this.defSty.pageBg||""
			},
			labelBg() {
				console.log(this.defSty.textColor)
				return this.defSty.textColor||'#A1C7F7'
			}
		},
		onLoad(options) {
			let defSty = options.defSty
			if(defSty) this.defSty=JSON.parse(defSty)
			else this.defSty = {}
		},
		methods:{
			clickShop(i){
				console.log("点击的商店",i)
				// uni.navigateTo({
				// 	url:"/pages/take-out/store"
				// })
				
				uni.navigateTo({
					url:'/pages/take-out/shop-info-page?defSty=' + JSON.stringify(this.defSty)
				})
			},
			
			
			goSearch() {
				uni.navigateTo({
					url:'/pages/take-out/shop-search-page?defSty=' + JSON.stringify(this.defSty)
				})
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

.list-box {
	width: calc(100% - 40rpx);
	height: calc(100vh - var(--status-bar-height) - 44px - 20rpx);
	position: absolute;
	left: 20rpx;
	top: calc(var(--status-bar-height) + 44px + 20rpx);
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
}
</style>
