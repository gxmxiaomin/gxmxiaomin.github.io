<template>
	<view>
		<view class="view-list">
			<view class="view-item" v-for="item in courseList" @click="uni.navigateTo({
				url:'../course/course?id='+item.id
			})">
				<image class="view-shoping" :src="item.logoImgUrl"></image>
				<view class="view-content">
					<text class="text-name">{{item.schoolName}}</text>
					<text class="text-brief">{{item.schoolAddress}}</text>
					<view class="view-contact">
						<view class="text-price">¥<text>{{item.courseAmount}}</text>起</view>
						<button class="u-reset-button button-signup">报名</button>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
				page++
				getList()
				return ''
			}" />
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeId:'',
				schoolId:'',
				list:[],
				courseList:[],
			}
		},
		onLoad(option) {
			this.schoolId = option.schoolId
			this.typeId = option.typeId
		},
		async mounted() {
			await this.getCourseList()
		},
		methods: {
			// 首页课程列表
			async getCourseList(){
				let res=await this.http.get('/app/userHome/recommendedCoursesList',{
					pageNum:1,
					pageSize:4,
					lon:uni.getStorageSync('lng'),
					lat:uni.getStorageSync('lat'),
				});
				if(res.code==200){
					this.courseList = res.rows
				}else{
				this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-list{
		background-color: #F7f7f7;
		padding: 30rpx;
		.view-item{
			margin-top: 30rpx;
			background-color: #FFFFFF;
			padding: 30rpx;
			display: flex;
			border-radius: 10rpx;
			.view-content{
				flex-grow: 1;
				flex-shrink: 1;
				margin-left: 20rpx;
				.text-name{
					display: block;
					font-size: 32rpx;
					font-weight: bold;
					color: #333333;
				}
				.text-brief{
					font-size: 28rpx;
					font-weight: bold;
					color: #666666;
					display: block;
					margin-top: 20rpx;
				}
				.view-contact{
					display: flex;
					margin-top: 20rpx;
					.text-price{
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FF0000;
					}
					.button-signup{
						width: 154rpx;
						height: 50rpx;
						background: #4A9AFF;
						border-radius: 25rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 50rpx;
						margin: 0;
						margin-left: auto!important;
					}
				}
			}
			.view-shoping{
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
			&:first-child{
				margin-top: 0rpx;
			}
		}
	}
</style>
