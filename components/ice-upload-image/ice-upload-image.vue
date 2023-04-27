<template>
	<view class="ice-upload-image">
		<image @click="upload()" :src="value?value:defaultImage" :style="style" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		name:"ice-upload-image",
		data() {
			return {
				
			};
		},
		methods:{
			async upload(){
				uni.chooseImage({
					count:1,
					success: async (result) => {
						let res=await this.http.upload(result.tempFilePaths[0]);
						if(res.code==200){
							this.$emit('input',res.data);
						}else{
							this.$toast(res.msg);
						}
					},
				})
			},
		},
		computed:{
			style(){
				return {
					width:this.width,
					height:this.height
				};
			},
		},
		props:{
			defaultImage:{
				type:String,
				default:'',
			},
			value:{
				type:String,
				default:'',
			},
			width:{
				type:String,
				default:'0rpx',
			},
			height:{
				type:String,
				default:'0rpx',
			},
		},
	}
</script>

<style lang="scss" scoped>

</style>
