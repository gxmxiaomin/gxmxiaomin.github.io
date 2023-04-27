<template>
	<view class="tu">
		<image :src="src" class="image-check"></image>
		<button @click="change">更换头像</button>
	</view>
	
</template>

<script>
	export default {
	   data() {
	   			return {
	   				src:'',
	   			}
	   		},
			onLoad(options) {//options接收上一个页面传的参数
						this.src = options.id;
						console.log(options)
					},
		methods:{
			change(){
				   //这里是获取页面栈 调用上一个页面的方法实现更新
				      let pages = getCurrentPages();//获取页面栈  当前页面
				      let beforePage = pages[pages.length - 2];//上一页
					  beforePage.$vm.chooseImage()  //上一页的方法名
					  uni.navigateBack({ //返回
					    delta: 1
					  })
					  
			}
		}
	  }
</script>

<style>
	button {
			position: fixed;
			bottom: 30rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 590rpx;
			height: 98rpx;
			line-height: 98rpx;
			margin: auto;
			font-size: 32rpx;
			margin-top: 557rpx;
			background-color: #4A9AFF;
			border-radius: 49rpx;
			color: #FFFFFF;
		padding: 0;
		width: 400rpx;
		
	}
	.image-check{
		display: table;
		width: 100%;
		height: 720rpx;
		position: absolute;
		top: 45%;
		transform: translateY(-50%);
	}
</style>