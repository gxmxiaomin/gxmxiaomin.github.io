<template>
	<view>
		<view class="view-money" :style="'background-image: url('+bg+');'">
			<view class="view-left">
				<text class="text-title">账户余额（元）</text>
				<text class="text-money">{{userInfo.nowMoney}}</text>
			</view>
			<button 
			@click="uni.navigateTo({
				url:'../withdraw/withdraw'
			})"
			class="u-reset-button">提现 ></button>
		</view>
		
		<image 
		@click="uni.navigateTo({
			url:'../recharge/recharge'
		})"
		class="image-recharge" src="../../static/images/to_recharge.png" mode=""></image>
		
		<view class="view-list">
			<text class="text-title">余额明细</text>
			<view class="view-item" v-for="(item,index) in list" :key="index">
				<view class="view-left">
					<text class="text-remark">{{item.mark}}</text>
					<text class="text-time">{{item.createTime}}</text>
				</view>
				<view class="text-money add">
					<text v-if="item.pm==0">-</text>
					<text v-else>+</text>
					{{item.number}}
				</view>
			</view>
			<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
				pageNum++
				getList()
				return ''
			}"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bg:require('@/static/images/bg_wallet.png'),
				list:[],
				userInfo:{},
				pageNum:1,
				loadmoreStatus:'loadmore'
			};
		},
		onShow() {
			this.getList()
			this.getInfo()
		},
		methods:{
			
			async getInfo(){
				
				let res=await this.http.get('/app/userInfo/getInfo',{});
				if(res.code==200){
					this.userInfo=res.data;
				}else{
				// this.$toast(res.msg);
				}
			},
			async getList(){
				this.loadmoreStatus='loading';
				let res=await this.http.get("/app/userBill/list",{
					pageNum:this.pageNum,
					pageSize:10,
				});
				if(res.code==200){
					let {status,list} = await this.$resPage(this.pageNum,10,this.list,res.rows);
					this.loadmoreStatus=status;
					this.list=list;
				}else{
					// this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-money{
		margin: auto;
		width: 721rpx;
		height: 231rpx;
		background-size: cover !important;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		.view-left{
			display: flex;
			flex-direction: column;
			margin-left: 51rpx;
			
			.text-title{
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
			}
			
			.text-money{
				margin-top: 20rpx;
				font-size: 53rpx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		
		button{
			width: 125rpx;
			height: 42rpx;
			background: #AFC7FA;
			border-radius: 21rpx;
			line-height: 42rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #FFFFFF;
		}
		
	}
	
	.image-recharge{
		margin: auto;
		width: 690rpx;
		height: 130rpx;
		margin-top: 11rpx;
		display: block;
		margin-bottom: 30rpx;
	}
	
	.view-list{
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		
		.text-title{
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			margin-bottom: 30rpx;
		}
		
		.view-item{
			padding: 30rpx 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			
			.view-left{
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				flex-shrink: 1;
				
				.text-remark{
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
					margin-bottom: 15rpx;
				}
				
				.text-time{
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
				}
			}
			
			.text-money{
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				
				&.add{
					color: #FF0000;
				}
			}
		}
		
	}
</style>
