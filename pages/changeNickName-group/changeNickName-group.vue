<template>
	<view class="page-view">
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left">
				<u-icon name="arrow-left" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>我的昵称</text>
			</view>
			<view class="tab-right" slot="right">
				<!-- <text class="confirm-btn">确认</text> -->
				<view class="confirm-btn" @click="submit">
					<text>确认</text>
				</view>
			</view>
		</TabBar>

		<view class="input-box">
			<u--input placeholder="我在群内的昵称" border="bottom" focus v-model="config.userRemark" suffixIcon="edit-pen" class="input"></u--input>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	export default {
		components: { TabBar },
		data() {
			return {
				myNickName: "",
				groupId: "",
				config:{}
			};
		},
		onLoad(options) {
			console.log("修改的群", options)
			this.groupId = options.groupId
			this.myNickName = options.myNickName
			this.getGroupConfig()
		},
		methods:{
			async submit(){
				console.log("修改完毕")
				const res = await this.http.postJson('/app/appGroup/updateUserGroup', this.config)
				console.log("修改的结果为", res)
				if(res.code != 200) {
					this.$refs.uToast.show({
						message: res.msg,
						type: 'error'
					})
					return
				}
				this.$refs.uToast.show({
					message: "修改成功",
					type: 'success'
				})
				setTimeout(()=>{uni.navigateBack()},1000)
			},

			async getGroupConfig() {
				const res = await this.http.get('/app/appGroup/getGroupUserConfig', {
					groupId: this.groupId
				})
				this.config = res.data
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-view {
	width: 100%;
	height: 100vh;
	.input-box {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30rpx;
		.input {
			border-bottom: 1rpx solid #eee;
		}
	}
}
</style>
