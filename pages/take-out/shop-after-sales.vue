<template>
	<view class="page_view">
		<view class="top_bar">
			<view>
				<u-icon name="arrow-left" color="#515151" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="page_title">
				<text>售后服务</text>
			</view>
			<view></view>
		</view>
		<view class="tabs_box">
			<view class="tab_cell" v-for="(item,index) in tabsList" :key="index" :class="{'active_style':current==index}" @click="current=index">
				<text>{{item.name}}</text>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="scroll-content">
				<view class="cell_box" v-for="item in orderList" :key="item.id">
					<AfterSalesCell :info='item' @goView='goView'></AfterSalesCell>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import AfterSalesCell from './components/after-sales-cell/after-sales-cell.vue'
	export default {
		components: { AfterSalesCell },
		data() {
			return {
				current: 0,
				tabsList:[],
				list:[]
			};
		},
		computed:{
			orderList(){
				if(this.current==0) return this.list
				else if (this.current==1) return this.list.filter(ele=> ele.statu==0 )
				else return this.list.filter(ele=>ele.statu==1)
			}
		},
		onLoad(){
			this.getTabList()
			this.getList()
		},
		methods:{
			getTabList(){
				this.tabsList = [
					{name: '全部'},
					{name: '处理中'},
					{name: '已完成'}
				]
			},
			async getList() {
				this.list = [
					{
						id: 0, 
						time:'2022.11.08  3:02', 
						order:'158594539', 
						img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
						statu: 0,
						name:'每日鲜蔬(文化路店）',
						price: 98.9
					},
					{
						id: 1, 
						time:'2022.11.08  3:02', 
						order:'158594539', 
						img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
						statu: 0,
						name:'每日鲜蔬(文化路店）',
						price: 98.9
					},
					{
						id: 2, 
						time:'2022.11.08  3:02', 
						order:'158594539', 
						img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
						statu: 0,
						name:'每日鲜蔬(文化路店）',
						price: 98.9
					},
					{
						id: 3, 
						time:'2022.11.08  3:02', 
						order:'158594539', 
						img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
						statu: 1,
						name:'自然鲜(文化路店）',
						price: 98.9
					},
					{
						id: 4, 
						time:'2022.11.08  3:02', 
						order:'158594539', 
						img:'https://img0.baidu.com/it/u=3357540995,2256631031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
						statu: 1,
						name:'自然鲜(文化路店）',
						price: 98.9
					}
				]
			},
			goView() {
				uni.navigateTo({
					url:"./shop-sales-progress"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.page_view {
	width: 100%;
	height: 100vh;
	position: relative;
}
.top_bar {
	width: 100%;
	height: calc(var(--status-bar-height) + 44px);
	box-sizing: border-box;
	padding: 0 20rpx;
	padding-top: var(--status-bar-height);
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 36rpx;
	color: #333333;
	font-family: PingFang-SC-Medium;
	font-weight: Medium;
}

.tabs_box {
	width: 100%;
	height: 88rpx;
	box-sizing: border-box;
	padding: 0 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.tab_cell {
		font-size: 28rpx;
		color: #999999;
		font-family: PingFang-SC;
		font-weight: Medium;
	}
	.active_style {
		font-size: 32rpx;
		color: #378EFD;
		font-weight: bold;
		transition: 0.3s;
	}
}

.scroll-box {
	width: 100%;
	height: calc(100vh - var(--status-bar-height) - 44px - 88rpx);
	.scroll-content {
		width: 100%;
		min-height: 100%;
		background-color: #F1F1F1;
		box-sizing: border-box;
		padding: 30rpx;
		padding-bottom: 0;
		.cell_box {
			width: 100%;
			padding-bottom: 30rpx;
		}
	}
}
</style>
