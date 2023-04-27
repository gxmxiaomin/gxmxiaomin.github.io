<template>
	<view class="com_view">
		<view class="com_statu_box">
			<view class="com_time">
				<text>订单时间：{{info.time}}</text>
			</view>
			<view class="com_statu">
				<text v-if="info.statu==0">处理中</text>
				<text v-else>退款成功</text>
			</view>
		</view>
		<scroll-view scroll-x="true" class="com_scroll_box">
			<view class="com_scroll_content">
				<view class="com_img_box" v-for="item in 10" :key="item">
					<image :src="img" mode=""></image>
					<view class="com_discount" v-if="item%2==0">
						<text>9.99折</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="com_info_box">
			<view class="com_order">
				<text>订单编号:{{info.order}}</text>
			</view>
			<view class="com_btns">
				<view class="com_btn com_cacncel">
					<text v-if="info.statu==0" @click="showModel(0)">取消订单</text>
					<text v-else @click="showModel(1)">删除记录</text>
				</view>
				<view class="com_btn com_rate" @click="$emit('goView')">
					<text>查看进度</text>
				</view>
			</view>
		</view>
		<view class="com_shop_box">
			<view class="com_shop">
				<image :src="info.img" mode=""></image>
				<text>{{info.name}}</text>
			</view>
			<view class="com_mooney" v-if="info.statu==1">
				<text>￥{{info.price}}</text>
			</view>
		</view>
		
		<u-modal :show="show" title="提示" :content='content' :asyncClose="true" showCancelButton
		@confirm="confirm" @cancel="show=false"></u-modal>
		
	</view>
</template>

<script>
	export default {
		props:{
			info:{
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		data(){
			return {
				show: false,
				content:"",
				img:'https://img0.baidu.com/it/u=3328239284,2138751657&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=890'
			}
		},
		methods:{
			showModel(type) {
				if(type==0){
					this.content = "是否确定取消退款"
				}else {
					this.content = "是否确定删除退款记录"
				}
				this.show = true
			},
			
			confirm() {
				setTimeout(()=>{
					this.show = false
				},1000)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.com_view{
		width: 100%;
		min-height: 420rpx;
		border-radius: 15rpx;
		background-color: #ffffff;
		padding: 30rpx;
		font-family: PingFang-SC;
	}
	
	.com_statu_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: Medium;
		.com_time {
			font-size: 24rpx;
			color: #999;
		}
		.com_statu{
			font-size: 28rpx;
			color: #378EFD;
		}
	}
	
	.com_scroll_box {
		margin-top: 30rpx;
		width: 100%;
		height: 130rpx;
		.com_scroll_content {
			min-width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			.com_img_box {
				width: 130rpx;
				height: 130rpx;
				position: relative;
				margin-right: 30rpx;
				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
				.com_discount {
					box-sizing: border-box;
					padding: 0 12rpx;
					height: 30rpx;
					line-height: 30rpx;
					font-size: 20rpx;
					border-radius: 12rpx 0 12rpx 0;
					background-color: #FB7A4C;
					color: #ffffff;
					position: absolute;
					bottom: 0;
					left: 0;
					letter-spacing: 1.5rpx;
				}
			}
		}
	}
	
	.com_info_box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 50rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid rgba(188, 188, 188, 0.3);
		.com_order {
			font-size: 24rpx;
			font-weight: Medium;
			color: #999;
		}
		.com_btns {
			display: flex;
			align-items: center;
			.com_btn {
				width: 140rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				font-size: 24rpx;
				font-weight: Medium;
				margin-left: 28rpx;
				border-radius: 40rpx;
			}
			.com_cacncel {
				color: #999999;
				background-color: #F1F1F1;
			}
			.com_rate {
				color: #ffffff;
				background-color: #378EFD;
			}
		}
	}
	
	.com_shop_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		.com_shop {
			display: flex;
			align-items: center;
			image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}
			text{
				font-size: 24rpx;
				color: #333333;
				margin-left: 16rpx;
				font-weight: Medium;
			}
		}
		.com_mooney {
			font-size: 32rpx;
			color: #FC6129;
		}
	}
	
</style>