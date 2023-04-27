<template>
	<view>
		<view class="view-school">
			<view class="view-scoll">
				<view class="view-item" v-for="(item,index) in schoolType" @click="tabbar(index,item.configValue)">
					<text class="text-title" :class="show==index?'text-titles':''">{{item.description}}</text>
					<view class="view-line" v-if="show==index"></view>
				</view>
			</view>
			<view class="view-list ">
				<view class="view-item" v-for="item in schoolList" @click="uni.navigateTo({
					url:'../child-details/child-details?id='+item.id+'&schoolType='+item.schoolTypeId+'&types='+1
				})">
					<image class="image-school" :src="item.logoImgUrl"></image>
					<view class="view-brief">
						<view class="view-name">
							<text class="text-name">{{item.schoolName}}</text>
							<view class="view-ratebox">
								<ice-star v-model="item.score"></ice-star>
							</view>
						</view>
						<view class="view-content u-line-2">{{item.schoolTitle}}</view>
						<view class="view-address">
							<text class="text-address u-line-1">{{item.schoolAddress}}</text>
							<!-- <text class="text-distance">{{((item.distance||10000)/1000).toFixed(2)}}km</text> -->
							<text class="text-distance">{{item.distance}}km</text>
						</view>
					</view>
				</view>
				<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
					page++
					getSchoolList()
					return ''
				}" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: 0,
				schoolType: [{
					configValue: 0,
					description: '全部'
				}],
				schoolList: [],
				val: 0,
				timer: null
			}
		},
		async mounted() {
			await this.getSchoolType()
			await this.getSchoolList()
		},
		onShow() {
			this.page = 1
			this.timeGetLocation()
		},
		onHide() {
			if(this.timer) clearInterval(this.timer)
		},
		onReachBottom() {
			this.page++
			this.getSchoolList()
		},
		methods: {
			tabbar(ids, val) {
				this.show = ids
				this.val = val
				this.page = 1
				this.getSchoolList()
			},
			async getSchoolType() {
				let res = await this.http.post('/app/userHome/qualitySchoolTypeList', {});
				if (res.code == 200) {
					for (let item of res.data) {
						this.schoolType.push(item)
					}
					console.log(this.schoolType)
				} else {
					this.$toast(res.msg);
				}
			},
			async getSchoolList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.post("/app/school/qualitySchool", {
					pageNum: this.page,
					pageSize: this.pageSize,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
					schoolTypeId: this.val,
				});
				console.log('------------------------------------')
				console.log(res)
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.schoolList, res.rows);
					this.loadmoreStatus = status;
					// this.schoolList = list;
					this.schoolList = this.setSchoolDis(this.deepCopy(list))
				} else {
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
							if (Array.isArray(this.schoolList) && this.schoolList.length > 0)
								this.schoolList = this.setSchoolDis(this.deepCopy(this.schoolList));
						}
					})
				}, 1000 * 5)
			},

			//根据两点计算距离
			countDis(lat1, lng1, lat2, lng2) {
				if (!lat1 || !lng1 || !lat2 || !lng2) {
					return 999999
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
	.view-ratebox {
		display: flex;
		margin-left: auto;

		image {
			width: 24rpx;
			height: 22rpx;
			margin-right: 9rpx;
		}
	}

	.view-school {
		width: 100%;

		.view-scoll {
			position: fixed;
			z-index: 10;
			background-color: #FFFFFF;
			width: 100%;
			display: flex;
			overflow-x: auto;
			border-bottom: 15rpx solid #F7F7F7;
			height: 88rpx;

			.view-item {
				padding: 0 30rpx;

				.text-title {
					font-size: 28rpx;
					font-weight: 400;
					color: #666666;
				}

				.text-titles {
					color: #4A9AFF !important;
				}

				.view-line {
					display: block;
					margin: 0 auto;
					width: 40rpx;
					height: 8rpx;
					margin-top: 10rpx;
					background: #4A9AFF;
					border-radius: 4rpx;
				}
			}
		}

		.view-list {
			padding: 30rpx;
			padding-top: 118rpx;

			.view-item {
				display: flex;
				margin-top: 60rpx;

				&:first-child {
					margin-top: 0rpx;
				}

				.view-brief {
					flex-grow: 1;
					flex-shrink: 1;
					margin-left: 20rpx;

					/deep/.u-icon__icon {
						padding: 0 !important;
						font-size: 30rpx !important;
					}

					.view-address {
						margin-top: 25rpx;
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

						/deep/.u-rate {
							margin-left: auto;
						}

						image {
							width: 19rpx;
							height: 19rpx;
						}

						.text-name {
							font-size: 36rpx;
							font-weight: bold;
							color: #333333;
						}

						.text-rate {
							font-size: 24rpx;
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
</style>
