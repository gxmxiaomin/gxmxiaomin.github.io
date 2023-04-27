<template>
	<!-- 多图不裁剪 -->
	<view class="view-upload-multi-image">
		<view class="view-item" v-for="(item,index) in fileList">
			<image class="image" :src="item"></image>
			<image @click="fileList.splice(index,1)" :src="require('./images/reduce-orange.png')" class="image-reduce"></image>
		</view>
		<image 
		v-if="max>fileList.length"
		class="image" @click="chooseImage" :src="require('./images/image-upload.png')"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
			};
		},
		props: {
			value: '',
			max:{
				type:Number,
				default:9,
			},
		},
		mounted() {
			this.fileList = [];
			if (this.value) {
				this.fileList = this.value.split(",");
			}
		},
		methods: {
			async chooseImage(){
				uni.chooseImage({
					count:1,
					success: async (result) => {
						let res=await this.http.upload(result.tempFilePaths[0]);
						if(res.code==200){
							this.fileList.push(res.data);
						}else{
							this.$toast(res.msg);
						}
					},
				})
			},
		},
		watch: {
			value() {
				this.fileList = [];
				if (this.value) {
					this.fileList = this.value.split(",");
				}
			},
			fileList() {
				if (this.fileList.length > 0) {
					this.$emit("input", this.fileList.join(","));
				} else {
					this.$emit("input", "");
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.view-upload-multi-image {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		overflow-x: hidden;

		.image {
			width: 100rpx;
			height: 100rpx;
		}

		.view-item {
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			position: relative;

			.image-reduce {
				width: 30rpx;
				height: 30rpx;
				position: absolute;
				right: 0rpx;
				top: 0;
			}
		}
	}
</style>
