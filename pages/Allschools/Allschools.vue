<template>
	<view class="box1s">
		<!-- 内容 -->
		<view class="my-conten" v-if="list.length">
			<view class="view-item" v-for="(item,index) in list" @click="goto(item)" :key="index">
				<view class="leftse">
					<image :src="item?item.institutionsImage.split(',')[0]:''"
						style="width: 100px;height: 100px;flex-shrink: 0;" mode=""></image>
				</view>
				<view class="rightse">
					<view class="my-tops">
						<view style="font-weight: 700;">{{item.schoolName}}</view>
						<!-- <view class="tops">
							<image style="width: 15px;height: 15px;" src="../../static/images/pingfen.png" mode="">
							</image>
							<text style="display: inline-block;color: #fc6129;"> {{Number(item.score)}} 分</text>
						</view> -->
					</view>
					<view style="margin: 5px 0;color: #7e6666;">{{item.name}} </view>
					<!-- <view >{{item.name}} </view> -->
					<view class="my-bom" >
						<view style="overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;font-size: 10px;width: 110px;
						font-size: 24rpx;
						font-weight: bold;
						color: #999999;">{{item.schoolAddress}}</view>
						<!-- <view style="font-size: 10px;margin-left: 57px;">{{item.distance}}km</view> -->
					</view>
				</view>

				
			</view>


		</view>
		<view v-else style="margin:20px auto; height: 180px;height: 30px;text-align: center;align-items: center;">
			该学生尚未报名 <text style="display: inline-block;color: #1f9ce5;" @click="uni.navigateTo({
				url:'/pages/highquality-school-list/highquality-school-list'
			})">      点我报名</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				popHeight: 0,
				val: "",
				schoolModel: "", //搜索框
				list: [],
				types: 1,
				schoolType: [],
				schoolId: '',
				uerId:'', //学生id
			}
		},
		onLoad(opes) {
			
		console.log(opes,'6666666666')
		// this.uerId = opes.uerId
		this.getList()
		},
		onShow() {

		},
		onHide() {
			if (this.timer) clearInterval(this.timer)
		},
		onPullDownRefresh() {
			this.getList()
		},
		 mounted() {
			 this.getList()
		},
		methods: {
			//跳转
			goto(items){
				console.log(items,'99999')
				uni.navigateTo({
						url:'/pages/my-course/my-course?schoolIds=' + items.id + '&user=' + items.traineeId
					})
			},
			async switchs(ids) {
				this.types = ids
				await getList();
			},
			async search() {
				this.list = []
				this.pageNum = 1
				this.getList()
			},
			async getList() {
				let res = await this.http.get("/app/userPersonalCenter/mySchoolById");
				if (res.code == 200) {
					this.list = res.data
				}else if(res.code === 444){
					this.$toast(res.msg);
				}else  {
					this.$toast(res.msg);
				}
			},
			setSchoolDis(list) { //更新学校距离
				// console.log("学校的列表", list)
				if (!Array.isArray(list)) {
					console.log("不是个列表")
					return
				}
				let lng = uni.getStorageSync('lng')
				let lat = uni.getStorageSync('lat')
				let arr = list.map(item => {
					item.distance = this.countDis(lat, lng, item.latitude, item.longitude)
					return item
				})
				return arr
			},

			deepCopy(obj) {
				return JSON.parse(JSON.stringify(obj))
			},

			timeGetLocation() { //定时获取当前位置
				this.timer = setInterval(() => {
					uni.getLocation({
						type: 'wgs84',
						success: (res) => {
							uni.setStorageSync('lng', res.longitude)
							uni.setStorageSync('lat', res.latitude)
							if (Array.isArray(this.list) && this.list.length > 0)
								this.list = this.setSchoolDis(this.deepCopy(this.list));
						}
					})
				}, 1000 * 5)
			},

			//根据两点计算距离
			countDis(lat1, lng1, lat2, lng2) {
				if (!lat1 || !lng1 || !lat2 || !lng2) {
					return 99999
				}
				// console.log(lat1, lng1, lat2, lng2)
				var radLat1 = lat1 * Math.PI / 180.0;
				var radLat2 = lat2 * Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math
					.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				// 保留后两位的正则表达式
				var re = /([0-9]+\.[0-9]{2})[0-9]*/;
				return s.toString().replace(re, "$1") // 单位千米
			},

		}
	}
</script>

<style lang="scss">
	.box1s {
		width: 100%;
		height: calc(100vh - 0px);
		background-color: #fff;

		.view-nav {
			// padding-top: var(--status-bar-height);
			// position: fixed;
			top: 0;
			left: 0;
			right: 0;
			// z-index: 999;
			background-color: #3c88fa;
			height: 50px;

			.view-nav-bar {
				width: 100%;
				height: 88rpx;
				line-height: 88rpx;
				display: flex;
				align-items: center;
				padding: 50px 26rpx 0 26rpx;
				position: relative;

				text {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					color: #fff;
				}

				image {
					width: 20rpx;
					height: 32rpx;
				}

				.image-top-right-add {
					width: 55rpx;
					height: 55rpx;
					margin-left: 620rpx;
				}
			}

			.view-search {
				width: 80%;
				height: 60rpx;
				background: #FFF;
				border-radius: 30rpx;
				// margin-left: 20rpx;
				display: inline-block;

				.site {
					// line-height: 60rpx;
					position: relative;
					top: -20rpx;
				}

				.img {
					width: 25rpx;
					height: 25rpx;
					top: -18rpx;
					left: 15rpx;
				}

				.ipt {
					display: inline-block;
					// background: #333333 !important;
					width: 70%;
					height: 60rpx;
					margin-left: 30rpx;
				}
			}

			.Filter {
				display: inline-block;
				margin-left: 30rpx;
				color: #FFF;
				position: relative;
				top: -15rpx;
			}

			.view-pop {
				// height: 220rpx !important;
				width: 255rpx;
				display: flex;
				overflow: hidden;
				flex-direction: column;
				background-image: url(../../static/images/tianjias.png);
				background-size: cover !important;
				transition: 0.3s;
				position: absolute;
				z-index: 99;
				right: 25rpx;
				// top: 90rpx;
				margin-top: 30rpx;
				align-items: center;
				border-radius: 10rpx;

				>view {
					&:first-child {
						margin-top: 10rpx;
					}
				}

				.view-items+.view-items {
					border-top: 1px solid rgba(255, 255, 255, 0.05);
				}

				.view-items {
					display: flex;
					align-items: center;
					align-content: center;
					justify-content: space-around;
					font-size: 40rpx;
					padding: 34rpx 0rpx;

					image {
						width: 36rpx;
						height: 36rpx;
					}

					text {
						text-align: center;
						padding-left: 30rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 6rpx;

					}
				}
			}

			// .view-pop {
			// 	width: 255rpx;
			// 	display: flex;
			// 	overflow: hidden;
			// 	flex-direction: column;
			// 	background-image: url(../../static/images/shaoerheitu.png);
			// 	background-size: cover !important;
			// 	transition: 0.3s;
			// 	position: absolute;
			// 	z-index: 99;
			// 	right: 20rpx;
			// 	align-items: center;

			// 	>view {
			// 		&:first-child {
			// 			margin-top: 10rpx;
			// 		}
			// 	}

			// 	.view-items+.view-items {
			// 		border-top: 1px solid rgba(255, 255, 255, 0.05);
			// 	}

			// 	.view-items {
			// 		display: flex;
			// 		align-items: center;
			// 		padding: 34rpx 0rpx;

			// 		image {
			// 			width: 49rpx;
			// 			height: 43rpx;
			// 		}

			// 		text {
			// 			width: 140rpx;
			// 			text-align: center;
			// 			display: block;
			// 			font-size: 32rpx;
			// 			font-family: PingFang SC;
			// 			font-weight: 400;
			// 			color: #FFFFFF;
			// 			line-height: 6rpx;
			// 			margin-left: 20rpx;
			// 		}
			// 	}
			// }

		}

		.my-conten {
			width: 100%;
			// height: 150px;
			background-color: #FFF;
			padding: 0 15px;

			.view-item {
				padding: 10px;
				background-color: #fff;
				display: flex;

				// justify-content: space-between;
				// border-bottom: 1px solid #ccc;
				.leftse {
					width: 35%;
					// background-color: #ccc;
				}

				.rightse {
					width: 65%;
					position: relative;

					.my-tops {
						display: flex;
						justify-content: space-between;
					}

					.my-bom {
						display: flex;
						color: #999999;
						position: absolute;
						bottom: 10px;
						// justify-content: space-between;

					}
				}


				&:first-child {
					margin-top: 0rpx;
				}

				.view-brief {
					flex-grow: 1;
					flex-shrink: 1;
					margin-left: 10rpx;

					.view-address {
						margin-top: 35px;
						display: flex;

						.text-address {
							width: 340rpx;
							font-size: 24rpx;
							font-weight: bold;
							color: #999999;
						}

						.text-distance {
							margin-left: auto;
							font-size: 24rpx;
							font-weight: bold;
							color: #999999;
							margin-left: 20px;
						}
					}

					.view-phone {
						display: flex;
						align-items: center;
						color: #4A9AFF;
						font-size: 24rpx;
						margin-top: 10rpx;

						image {
							width: 28rpx;
							height: 28rpx;
							margin-right: 10rpx;
						}

					}

					.view-content {
						font-size: 28rpx;
						font-weight: bold;
						color: #666666;
						margin-top: 20rpx;
					}

					.view-name {
						display: flex;
						align-items: center;

						// justify-content: space-between;
						.image-rate {
							// position: absolute;
							margin-left: 38px;
							align-items: center;
						}

						image {
							width: 29rpx;
							height: 29rpx;
							margin-left: auto;
						}

						.text-name {
							font-size: 36rpx;
							font-weight: bold;
							color: #333333;
							display: inline-block;
							width: 170px;
						}

						.text-rate {
							font-size: 30rpx;
							// margin-top: 20rpx;
							font-weight: 500;
							color: #FC6129;
							margin-left: 5rpx;
						}
					}
				}

				.image-school {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	::v-deep .u-loadmore__content {
		margin-top: 25px;
	}
</style>
