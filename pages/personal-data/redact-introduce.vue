<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<!-- <text @click="uni.navigateBack()">返回</text> -->
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/back.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<text>编辑介绍</text>
			</view>
			<view class="bar-right bare-cell">
				<view class="city">
					<view class="city-rigth" @click="ok">
						<text style="color:#428bfa;">保存</text>
					</view>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="type">三个月可修改一次</view>
			
			<!-- <input  type="text" v-model="val"> -->
			<view class="input">
				<u--textarea height="140" v-model="value1" placeholder="请输入内容" count ></u--textarea>
			</view>
		</view>


		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				birthday: '',
				show: false,
				value1:'',
			}
		},

		methods: {
			change(status) {
				// console.log(status);
			},
			ok() {
				this.submitInfo()
			},

			async submitInfo() {
				// if (this.value1 != '') {
				// 	// 
				// } else {
				// 	this.$refs.uToast.show({
				// 		message: '昵称不能为空',
				// 		type: 'error'
				// 	})
				// }
				
				let res = await this.http.postJson('/app/userInfo/editInfo', {
					personalitySignature : this.value1
				});
				if (res.code == 200) {
					this.$refs.uToast.show({
						message: '修改成功',
						type: 'success'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {
					this.$refs.uToast.show({
						message: '修改失败',
						type: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f7f7;
	}

	.top-bar {
		height: 120rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		background-color: #fff;
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.bar-left {
			flex: 2;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 2;
			height: 100%;
		}
	}

	.box {
		margin-top: 140rpx;
		
		.type {
			margin-left: 20rpx;
			color: #428bfa;
			font-size: 26rpx;
		}
		
		.input {
			background: #FFF;
			height: 300rpx;
			width: 95%;
			border-radius: 20rpx;
			margin: auto;
			margin-top: 20rpx;
		}
	}
</style>
