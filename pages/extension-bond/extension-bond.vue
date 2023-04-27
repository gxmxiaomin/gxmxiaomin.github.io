<template>
	<view>
		<u-navbar safeAreaInsetTop placeholder title="保证金/代理费提成" @leftClick="uni.navigateBack({
			
		})" fixed bgColor="#ffffff">
			<image @click="show=true" slot="right" class="image-date" src="../../static/images/date_filter.png"></image>
		</u-navbar>

		<view class="view-item" v-for="(item,index) in list">
			<view class="view-row">
				<text class="text-remark">{{item.name}}</text>
				<view class="text-money"><text v-if="item.pm==0">-</text><text v-else>+</text> {{item.number}}</view>
			</view>
			<view class="view-row">
				<view class="view-total-money">
					<text class="text-label" v-if="item.type==5">保证金</text>
					<text class="text-label" v-if="item.type==1||item.type==2||item.type==3||item.type==4||item.type==8">交易额</text>
					<text class="text-total-money">¥{{item.number}}</text>
				</view>
				<text class="text-time">{{item.createTime}}</text>
			</view>
		</view>

		<u-datetime-picker :show="show" v-model="value1" @confirm="confirm" mode="datetime"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				time:'2021-01-01 10:10:10',
				value1: Number(new Date()),
				list:[],
			};
		},
		onShow() {
			this.getList()
		},
		methods: {
			confirm(e) {
				let time =  new Date(e.value).format("yyyy-MM-dd HH:mm:ss")
				console.log(time)
				this.show = false
				this.getList()
			},
			async getList(){
				this.loadmoreStatus='loading';
				let res=await this.http.post("/app/userPersonalCenter/securityDepositNumList",{
					pageNum:1,
					pageSize:10,
					startDate:this.time,
				});
				if(res.code==200){
					let {status,list} = await this.$resPage(this.page,this.pageSize,this.list,res.rows);
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
	page {
		background-color: #F7F7F7;
	}

	/deep/.u-navbar {
		.u-navbar__content__title {
			color: #333333 !important;
			font-size: 36rpx;
			font-weight: 500;
		}

		.uicon-arrow-left {
			color: #333333 !important;
		}
	}

	.image-date {
		width: 40rpx;
		height: 40rpx;
	}

	.view-item {
		margin: auto;
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 30rpx;
		padding: 30rpx;
		display: flex;
		flex-direction: column;

		.view-row {
			display: flex;
			flex-direction: row;
			align-items: center;

			&:nth-child(2) {
				margin-top: 20rpx;
			}

			.text-remark {
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
				flex-grow: 1;
				flex-shrink: 1;
			}

			.text-money {
				font-size: 32rpx;
				font-weight: 500;
				color: #FF6B35;
			}

			.view-total-money {
				flex-grow: 1;
				flex-shrink: 1;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;

				.text-total-money {
					color: #669CFF;
				}
			}

			.text-time {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
			}
		}
	}
</style>
