<template>
	<view class="box1">
		<scroll-view scroll-y="true" :style="{ 'height': getWindowHeight + 'px' }">
			<view v-if="lists.length != 0">
				<view class="tabs" v-for="(item,index) in lists" :key="index">

					<view class="cons">
						{{item.noticeContent}}
						<text style="display: inline-block; color: blue;margin-left: 5px;"
							@click="gos(item)">查看详情</text><text style="float: right;padding-right: 15px;">{{item.createTime}}</text>
					</view>
					
				</view>
				
			</view>
			<view v-else class="none">
				暂无数据
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import tarBar from "@/components/tabBar/tabBar.vue"
	export default {
		data() {
			return {
				lists: [],
				lis: [],
				bJs: '编辑'
			}
		},
		components: {
			tarBar
		},
		onLoad() {
			uni.setStorageSync('lis', [])
			this.getCourseMessage()
		},
		mounted() {

		},
		methods: {
			async getCourseMessage() {

				const res = await this.http.get('/app/userHome/notificationCenter/getMarketingCourseMessage')

				if (res.code === 200) {
					this.lists = res.data
				}
			},
			gos(item) {
				uni.setStorageSync('lis', item)
				uni.navigateTo({
					url: '/pages/gore-qx/gore-qx'

				})
			},
			//删除
			// del(){
			// 	this.bJs = "删除"
			// }
		},
		computed: {
			getWindowHeight() {
				let height = '';
				uni.getSystemInfo({
					success: function(res) {
						height = res.windowHeight
					},
				});
				return height;
			}
		},

	}
</script>

<style lang="scss" scoped>
	.box1 {
		width: 100%;
		background-color: #eee;
		padding: 0 10px;

		.tabs {
			width: 100%;
			height: 70px;
			background-color: #fff;
			margin-top: 10px;
			padding: 18px 0 0 10px;
			border-radius: 10px;

			display: flex;

			.cons {
				width: 100%;
				font-size: 13px;
				height: 20px;
				line-height: 20px;
			}
		}

		.none {
			color: #aaa;
			font-size: 40rpx;
			text-align: center;
			margin-top: 400rpx;
		}
	}
</style>