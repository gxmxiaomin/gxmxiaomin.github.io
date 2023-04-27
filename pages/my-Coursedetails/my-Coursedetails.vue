<template>
	<view class="reportDetails">
		<view v-if="columns.length != 0">
			<view style="margin-top: 10px; " class="tab" v-for="(item,index) in columns" :key="index"
				@click="confirmse(item)">
				<text class="swipe-action__content__text">{{item.traineeName}}</text>
			</view>
		</view>
		<view  style="margin:30px 30px;text-align: center;" v-else >
		 {{txets}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: [],
				options1: [{
					text: '删除'
				}],
				txets:'',
			};
		},
		mounted() {
			this.gettudentList()
		},
		methods: {

			async gettudentList() {
				const res = await this.http.get('/app/userPersonalCenter/myStudentList')

				if (res.code === 200) {
					this.columns = res.data
				}else{
					this.txets = res.msg
				}
			},
			//确定
			confirmse(ite) {
				// uni.navigateTo({
				// 	url: '/pages/my-course/my-course?uerId=' + ite.id
				// })
				uni.navigateTo({
					url: '/pages/Allschools/Allschools?uerId=' + ite.id
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.reportDetails {
		width: 100%;
		height: calc(100vh - 0px);
		background-color: #eee;
		box-sizing: border-box;
		overflow: hidden;
		padding: 0 10px;
		.tab {
			width: 100%;
			height: 50px;
			padding-left: 10px;
			line-height: 50px;
			margin-top: 10px;
			background-color: #fff;
			border-radius: 5px;
		}
	
	}
</style>