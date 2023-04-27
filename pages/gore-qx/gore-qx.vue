<template>
	<view class="headers">
		<view class="boxs" v-for="(itw,ind) in listse" :key="ind">
			<view>
				<image class="ims" :src="itw.headUrl" mode=""></image>
			</view>
			<view class="ris">
				<view class="rig">
					<view>{{itw.nickName}}</view>
					<view>{{itw.createTime}}</view>
				</view>
				<view>
					<view style="margin: 5px 0;">{{itw.noticeTitle}}</view>
					<view style="width: 250px;line-height: 20px;">{{itw.noticeContent}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listse: [],
			}
		},
		mounted() {
			// this.getCourseMessages()
			this.listse.push(uni.getStorageSync('lis'))
			console.log(this.listse, '6666666')
		},
		methods: {
			// async getCourseMessages() {

			// 	const res = await this.http.get('/app/userHome/notificationCenter/getMarketingCourseMessage')

			// 	if (res.code === 200) {
			// 		this.listse = res.data
			// 	}
			// },
		}

	}
</script>

<style lang="scss" scoped>
	.headers {
		width: 100%;
		height: calc(100vh - 0px);
		box-sizing: border-box;
		background-color: #eee;
		padding: 0 10px;
		overflow: hidden;
		padding: 10px;

		.boxs {
			padding: 10px;
			background-color: #fff;
			border-radius: 5px;
			display: flex;
			margin-top: 5px;
			.ims {
				width: 80px;
				height: 80px;
			}
			.ris{
				margin-left: 5px;
				color: #7f7f7f;
				font-size: 13px;
				.rig{
					display: flex;
					justify-content: space-between;
					padding-right: 15px;
				}
			}
		}
	}
</style>
