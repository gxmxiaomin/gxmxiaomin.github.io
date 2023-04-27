<template>
	<view class="page-view">
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left">
				<u-icon name="arrow-left" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>修改群名</text>
			</view>
			<view class="tab-right" slot="right">
				<!-- <text class="confirm-btn">确认</text> -->
				<view class="confirm-btn" @click="submit">
					<text>确认</text>
				</view>
			</view>
		</TabBar>

		<view class="input-box">
			<u--input placeholder="群聊名称" border="bottom" focus v-model="info.name" suffixIcon="edit-pen" class="input"></u--input>
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
				groupName: "",
				groupId: "",
				info:{}
			};
		},
		onLoad(options) {
			console.log("修改的群", options)
			this.groupId = options.groupId
			this.groupName = options.groupName
			this.getGroupInfo()
		},
		methods:{
			async submit(){
				console.log("修改完毕")
				const res = await this.http.postJson('/app/appGroup/updateGroup', this.info)
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
			async getGroupInfo() {
				const res = await this.http.get('/app/appGroup/getGroupInfo', {
					groupId: this.groupId
				})
				console.log("获取到的群聊信息", res)
				this.info = res.data
			},
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
