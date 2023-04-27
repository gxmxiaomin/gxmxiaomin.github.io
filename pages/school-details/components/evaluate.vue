<template>
	<view>
		<view class="box" v-for="item in schoolevaluate">
			<view class="score">
				<view>5.0</view>
				<text>分</text>
				<view class="count">2668条评论</view>
				<view class="fen">
					<image src="../../../static/images/shoucang.svg" mode=""></image>
					<image src="../../../static/images/shoucang.svg" mode=""></image>
					<image src="../../../static/images/shoucang.svg" mode=""></image>
					<image src="../../../static/images/shoucang.svg" mode=""></image>
					<image src="../../../static/images/shoucang.svg" mode=""></image>
				</view>
			</view>
			<view class="score-comment">
				<view>老师体贴(120)</view>
				<view>老师体贴(120)</view>
				<view>老师体贴(120)</view>
				<view>老师体贴(120)</view>
				<view>老师体贴(120)</view>
			</view>
			
			<view class="box-1">
				<image :src="item.headUrl" mode=""></image>
				<view class="box-1-text">
					<view>{{item.nickName}}</view>
					<view class="box-1-text2">
						<text>{{item.createTime}}</text>
						<text>来自{{item.city}}</text>
					</view>
				</view>
				<view class="">
					{{item.content}}
				</view>
				<view class="box-3">
					<view class="tb1">
						<image src="../../../static/images/praise.png" mode=""></image>
						<text>{{item.praise}}</text>
					</view>
					<view class="tb1">
						<image src="../../../static/images/xiaoxi.svg" mode=""></image>
						<text>98</text>
					</view>
					
					<view class=""><text>回复(0)</text></view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props:['schoolevaluate'],
		data() {
			return {
				images:'https://img2.baidu.com/it/u=1572613686,938558453&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=400'
			};
		},
		
		created(){
			setTimeout(()=>{
				console.log('evaluate接收到的参数',this.schoolevaluate)
			},500)
		},
		
		methods:{	
			},
			}
</script>

<style lang="scss">
	
	.box {
		
		.score-comment {
			
			view {
				font-size: 24rpx;
				margin: 20rpx 10rpx 0 40rpx;
				display: inline-block;
				padding: 10rpx 20rpx 10rpx 20rpx;
				background: #f3f0f3;
				border-radius: 40rpx;
			}
		}
		
		.score{
			view {
				&:nth-child(1) {
					margin-left: 20rpx;
					font-weight: 600;
					font-size: 50rpx;
					color: #5ba3f4;
					display: inline-block;
				}
				
			}
			text {
				display: inline-block;
				margin-left: 10rpx;
				color: #5ba3f4;
			}
			
			.count {
				display: inline-block;
				font-size: 24rpx;
				position: relative;
				top: -20rpx;
				left: 30rpx;
				color: #aaa;
			}
			.fen {
				display: inline-block;
				position: relative;
				top: 20rpx;
				right: 110rpx;
				
				image {
					width: 30rpx;
					height: 30rpx;
					margin: 0 0 0 10rpx;
				}
			}
		}
		
		.box-3 {
			view {
				&:nth-child(2) {
                    margin-left: 60rpx;
				}
				
				&:nth-child(3) {
					width: 100%;
					text-align: right;
					// display: block;
					
					text {
						background: #f3f0f3;
						border-radius: 40rpx;
						font-size: 26rpx;
						padding: 10rpx 30rpx 10rpx 30rpx;
						position: relative;
						left: 200rpx;
						
					}
				}
			}
			width: 40%;
			 display: flex;
			   //          flex-flow: row wrap;
			   //          margin-top: 10rpx;
						// margin-bottom: 20rpx;
						// justify-content: space-around;
						margin: 40rpx 0 0 0;
			
			image {
				width: 30rpx;
				height: 30rpx;
			}
			
			view {
				// display: inline-block;
				// justify-content: space-around;
				// margin: 10rpx 20rpx 20rpx 20rpx;
			}
			.tb1 {
				text{
					font-size: 24rpx;
					display: inline-block;
					position: relative;
					bottom: 5rpx;
					left: 10rpx;
					font-size: 28rpx;
					color: #aaa;
				}
			}
		}
		
		
		.box-1 > image {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 10rpx;
			border-radius: 50%;
			// margin-top: 20rpx;
		}
		
		.box-1 {
			border-top: 1rpx solid #f3f0f3;
			margin: 20rpx 0 40rpx 20rpx;
			.box-1-text {
				height: 100rpx;
				
				.box-1-text2 {
					
					text {
						&:nth-child(2) {
							margin-left: 40rpx;
						}
					}
				}
				display: inline-block;
				margin: 20rpx 0  0 20rpx;
				
				view {
					font-size: 30rpx;
					// position: relative;
					// margin-top: 10rpx;
					padding: 0 0 10rpx 0;
					
					&:nth-child(2) {
						// margin-top: -10rpx;
						margin: 0 0 10rpx 0;
						// display: inline-block;
						// margin-bottom: 10rpx;
						position: relative;
						bottom: 20rpx;
						
					}
				}
				text {
					font-size: 24rpx;
					color: #aaa;
				}
			}
		}
	}
</style>