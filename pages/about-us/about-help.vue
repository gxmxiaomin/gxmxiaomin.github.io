<template>
	<view style="margin-left: 30rpx;margin-right: 30rpx;">
		<view class="view-yyjs">{{msg}}</view>
		<view style="text-align: center;">============联系我们===========</view>
		<view>官方网站：{{guanwang}}</view>
		<view>微信公众号：{{gongzhnghao}}</view>
		<view>邮箱：{{youxiang}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:'感谢您使用沐星辰手机客户端，使用中有任何问题可通过以下方式查询解决;',
				guanwang:'http://www.muxingchen.com',
				gongzhnghao:'北京沐星辰',
				youxiang:'beijingmuxingchen@126.com'
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.view-yyjs{
		text-indent: 2em;
	}
</style>
