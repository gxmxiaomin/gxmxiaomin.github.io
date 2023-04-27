<template>
	<view>
		<view class="view-list">
			<view class="view-item" v-for="item in list" @click="uni.navigateTo({
				url:'../course/course?id='+item.id
			})">
				<image class="view-shoping" :src="item.courseImg"></image>
				<view class="view-content">
					<text class="text-name">{{item.courseName}}</text>
					<text class="text-brief">{{item.courseDetails}}</text>
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
			}
		},
		onLoad(option) {
			this.schoolId = option.schoolId
			this.typeId = option.typeId
		},
		async mounted() {
			await this.getList()
		},
		methods: {
			async getList(){
				this.loadmoreStatus='loading';
				let res=await this.http.get("/app/userHomeNavigation/schoolCourseList",{
					schoolId:this.schoolId,
					typeId:this.typeId,
				});
				if(res.code==200){
					let {status,list} = await this.$resPage(this.page,this.pageSize,this.list,res.data);
					this.loadmoreStatus=status;
					this.list=list;
				}else{
					this.$toast(res.msg);
				}
			}
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
