<template>
	<view>
		<view class="view-form-list">

			<view class="view-form-item">
				<text>姓名</text>
				<view>
					<u--input placeholder="请输入内容" v-model="form.name"></u--input>
				</view>
			</view>

			<view class="view-form-item">
				<text>性别</text>
				<view class="view-input-box">
					<ice-selector :range="sexList" rangeKey="name" v-model="form.sex" placeholder="请选择性别"></ice-selector>
					<u-icon class="arrow-down-b" name="arrow-down" size="20rpx" color="#999999"></u-icon>
				</view>
			</view>

			<view class="view-form-item">
				<text>年龄</text>
				<view>
					<u--input type="number" placeholder="请输入内容" v-model="form.age"></u--input>
				</view>
			</view>

			<view class="view-form-item">
				<text>身份证号</text>
				<view>
					<u--input type="number" placeholder="请输入内容" v-model="form.idCardNumber"></u--input>
				</view>
			</view>

			<view class="view-form-item" @click="$refs.selectAddress.show()">
				<text>所在城市</text>
				<view class="view-input-box">
					<ice-text placeholder="请选择" :text="form.province+form.city+form.area"></ice-text>
					<u-icon class="arrow-down-b" name="arrow-down" size="20rpx" color="#999999"></u-icon>
				</view>
			</view>

			<view class="view-form-item" @click="showCategory =true">
				<text>申请类别</text>
				<view class="view-input-box">
					<!-- <ice-selector :range=""></ice-selector> -->
					<u-icon class="arrow-down-b" name="arrow-down" size="20rpx" color="#999999"></u-icon>
				</view>
			</view>


			<view class="view-form-item">
				<text>联系方式</text>
				<view>
					<u--input type="number" placeholder="请输入基本信息" v-model="form.phone"></u--input>
				</view>
			</view>
		</view>

		<!-- 保存信息 -->
		<view class="view-save">
			<text>注意：届时会联系您到线下测评</text>
			<u-button shape="circle" color="#4A9AFF" text="立即报名" @click="submit"></u-button>
		</view>

		<selectAddress ref='selectAddress' @selectAddress="(address)=>{
			form.province=address[0]
			form.city=address[1]
			form.area=address[2]
		}"></selectAddress>
	</view>
</template>

<script>
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	export default {
		components: {
			selectAddress
		},
		data() {
			return {
				form: {
					name: '', // 姓名
					sex: '', // 性别
					age: '', // 年龄
					prpvince: '', 
					city: '', // 所在城市
					area: '',
					category: '', //申请类别
					phone: '', // 联系方式
				},
				title: '请选择',
				sexList: [{
						id: 0,
						name: '男'
					},
					{
						id: 1,
						name: '女'
					}
				],
				// 申请类别
				typeList:[],
			}
		},
		onShow() {

		},
		methods: {
			// 立即报名
			async submit() {},

			async queryTypeList(){
				let res=await this.http.post('/app/userHome/systemConfigurationList',{
					
				});
				if(res.code==200){
				
				}else{
				this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-form-list {
		display: flex;
		flex-direction: column;
		padding: 30rpx;

		.view-form-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;

			view {
				&:first-child {
					width: 560rpx;
					height: 74rpx;
					background: #F3F4F7;
					border-radius: 10rpx;
					margin-top: 10rpx;
				}
			}

			.view-upload-pic {
				margin-top: 20rpx;
				display: flex;

				image {
					width: 170rpx;
					height: 170rpx;
					margin-right: 20rpx;
					border-radius: 10rpx;
				}

				/deep/ .image {
					width: 170rpx;
					height: 170rpx;
					border-radius: 10rpx;
				}

				/deep/ .view-item {
					width: 180rpx;
					height: 180rpx;
				}

			}

			.view-input-box {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				position: relative;
				align-items: center;
				
				/deep/.ice-selector{
					input{
						height: 74rpx;
						padding-left: 30rpx;
					}
				}

				.arrow-down-b {
					position: absolute;
					top: 48%;
					right: 20rpx;
				}

				.picker-pop {
					position: relative;
				}
			}

			text {
				color: #333333;
				font-size: 24rpx;
			}



			.arrow-down {
				position: absolute;
				top: 40%;
				right: 20rpx;
			}
		}
	}

	.view-save {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 30rpx;
		display: flex;
		align-items: center;
		padding: 0 60rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;

		text {
			font-size: 24rpx;
			color: #FF0000;
			margin-bottom: 20rpx;
		}
	}
</style>
