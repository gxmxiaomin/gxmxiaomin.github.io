<template>
	<view class="view-activity-apply">
		<view class="view-form">
			<view class="view-form-item">
				<text>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 名</text>
				<view class="view-input">
					<u--input placeholder="请填写姓名" v-model="userInfo.name"></u--input>
				</view>
			</view>
			<view class="view-form-item" @click="showSex = true">
				<text>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 别</text>
				<view class="view-input">
					<u--input placeholder="请选择性别" v-model="sex" suffixIcon="arrow-down"
						suffixIconStyle="color: #909399;font-size: 14px;">
					</u--input>
				</view>
			</view>
			<view class="view-form-item">
				<text>身份证号</text>
				<view class="view-input">
					<u--input placeholder="请输入身份证号" v-model="userInfo.cardId"></u--input>
				</view>
			</view>
			<view class="view-form-item">
				<text>联系电话</text>
				<view class="view-input">
					<u--input placeholder="请输入联系电话" v-model="userInfo.phone"></u--input>
				</view>
			</view>
			<view class="view-form-item">
				<text>居住地址</text>
				<view class="view-textarea">
					<u--textarea v-model="userInfo.address" placeholder="请输入居住地址" autoHeight>
					</u--textarea>
				</view>
			</view>
		</view>
		<!-- 报名按钮 -->
		<view class="view-apply-btn">
			<u-button color="#4A9AFF" shape="circle" text="立即报名" @click="baoming"></u-button>
			<!-- uni.navigateTo({url:'../apply-result/apply-result'}) -->
			<!-- <u-button color="#ccc" shape="circle" text="立即报名"></u-button> -->
		</view>
		<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false" @select="sexSelect">
		</u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					name: '', // 姓名
					sex: '', // 性别
					cardId: '', // 身份证号
					phone: '', // 联系电话
					address: '', // 居住地址
				},
				sex: '',
				showSex: false, // 选择性别弹框
				actions: [{
						id: 1,
						name: '男',
					},
					{
						id: 2,
						name: '女',
					},
				],
			}
		},
		methods: {
			// 选择性别
			sexSelect(e) {
				this.sex = e.name;
				this.userInfo.sex = e.id
			},

			async baoming() {
				if (!this.userInfo.name) {
					this.$toast("请输入姓名");
					return;
				}

				if (!this.userInfo.sex) {
					this.$toast("请选择性别");
					return;
				}

				if (!uni.$u.test.idCard(this.userInfo.cardId)) {
					this.$toast('身份证号格式不正确');
					return;
				}

				if (!this.userInfo.phone) {
					this.$toast("请输入手机号");
					return;
				}

				if (!uni.$u.test.mobile(this.userInfo.phone)) {
					this.$toast("手机号格式不正确");
					return;
				}

				if (!this.userInfo.address) {
					this.$toast("请输入居住地址");
					return;
				}

				console.log(this.userInfo)
				let res = await this.http.postJson('/app/platformActivities/signUpActivities', this.userInfo);
				if (res.code == 200) {
					this.$toast(res.msg);
					setTimeout(function() {
						uni.navigateTo({
							url: '../apply-result/apply-result'
						})
					}, 500)
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-activity-apply {
		.view-form {
			padding: 30rpx;

			.view-form-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.view-input {
					width: 530rpx;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 10rpx;
					background: #F6F6F6;
				}

				.view-textarea {
					width: 530rpx;
					min-height: 80rpx;
					border-radius: 10rpx;
				}

				/deep/.u-textarea {
					background-color: #F6F6F6;
				}
			}
		}
	}

	.view-apply-btn {
		display: flex;
		align-items: center;
		width: 100%;
		height: 98rpx;
		background-color: #fff;
		padding: 0 60rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
