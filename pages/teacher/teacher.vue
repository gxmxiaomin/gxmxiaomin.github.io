<template>
	<view>
		<view class="view-teacher">
			<image src="../../static/images/teacher-bg.png" class="image-teacherBg" ></image>
			<view class="view-navbar">
				<image src="../../static/images/31fanhui1.png" @click="uni.navigateBack({})"></image>
				<text class="text-name">{{teacherItem.teacherName}}</text>
			</view>
			<view class="view-person">
				<image class="image-avatar" src="https://cdn.uviewui.com/uview/swiper/swiper2.png"></image>
				<text class="text-phone">{{teacherItem.phone}}</text>
				<view class="view-sex">
					<image class="" src="../../static/images/nv-2.png"></image>
					<image class="" src="../../static/images/nan.png"></image>
				</view>
			</view>
			<view class="view-brief">
				<view class="view-title">个人简介</view>
				<view class="view-content">{{teacherItem.teacherIntroduce}}</view>
				<view class="view-avatar">
					<image :src="teacherItem.teacherUrl"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teacherId:'',
				teacherItem:[],
			}
		},
		onLoad(option) {
			this.teacherId = option.teacherId
		},
		async mounted() {
			await this.getItem()
		},
		methods: {
			async getItem(){
				let res=await this.http.get('/app/userHomeNavigation/getTeachersInfo',{
					teacherId:this.teacherId
				});
				if(res.code==200){
					this.teacherItem = res.data
				}else{
				this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-teacher {
		position: relative;
		background-color: #F7F7F7;
		height: 100vh;
		.view-brief{
			background-color: #FFFFFF;
			padding: 30rpx;
			margin: 30rpx;
			border-radius: 10px;
			.view-avatar{
				margin-top: 30rpx;
				display: flex;
				image{
					width: 196rpx;
					height: 196rpx;
					margin-left: 20rpx;
					border-radius: 10rpx;
					&:first-child{
						margin-left: 0rpx;
					}
				}
			}
			.view-title{
				font-size: 36rpx;
				font-weight: 500;
				color: #333333;
			}
			.view-content{
				margin-top: 26rpx;
				font-weight: 400;
				color: #333333;
			}
		}
		.view-person{
			position: absolute;
			top: 160rpx;
			width: 100%;
			.view-sex{
				display: flex;
				position: absolute;
				bottom: 30%;
				left: 57%;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-left: 20rpx;
					&:first-child{
						margin-left: 0rpx;
					}
				}
			}
			.text-phone{
				text-align: center;
				display: block;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
				margin-top: 25rpx;
			}
			.image-avatar{
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				margin: 0 auto;
				display: block;
			}
		}
		.view-navbar {
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			width: 100%;
			height: 88rpx;
			display: flex;
			align-items: center;
			z-index: 9;
			padding: 30rpx;
			image {
				width: 16rpx;
				height: 28rpx;
			}
			.text-name {
				margin-left: 278rpx;
				font-size: 36rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		.image-teacherBg {
			width: 100%;
			height: 555rpx;
		}
	}
</style>
