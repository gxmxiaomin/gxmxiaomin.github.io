<template>
	<view class="view-private-space-more">
		<view class="view-item" @click="$refs.oldPwdRef.show = true">
			<text>修改密码</text>
			<image class="img-more" src="../../static/images/arrow_right.png" mode=""></image>
		</view>

		<input-pwd ref="oldPwdRef" title="请输入原密码" @confirm="setOldPwd"></input-pwd>
		<input-pwd ref="newPwdRef" :isWarning="false" title="请输入新密码" @confirm="setNewPwd"></input-pwd>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPwd: '',
				newPwd: ''
			}
		},
		methods: {
			// 输入原密码
			async setOldPwd(e) {
				console.log(e);

				let res = await this.http.post('/app/userInfo/loginSpace', {
					password: e
				});
				console.log('输入原密码', res);
				if (res.code == 200) {
					if (res.data) {
						this.$refs.oldPwdRef.show = false;
						this.$refs.newPwdRef.show = true;
						this.$refs.newPwdRef.tips = '请输入6位新密码'
					} else {
						this.$refs.oldPwdRef.tips = '密码错误，请重新输入'
						this.$refs.oldPwdRef.value = ''
					}
				} else {
					this.$toast(res.msg);
				}
			},

			// 输入新密码
			async setNewPwd(e) {
				console.log(e);
				let res = await this.http.post('/app/userInfo/settingSpacePassword', {
					password: e
				});
				console.log('输入新密码', res);
				if (res.code == 200) {
					if (res.data) {
						this.$refs.newPwdRef.show = false;
						this.$toast('修改成功');
					}
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-private-space-more {
		background-color: #fff;

		.view-item {
			padding: 0 30rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #333333;
			font-size: 28rpx;

			.img-more {
				width: 12rpx;
				height: 21rpx;
			}
		}
	}
</style>
