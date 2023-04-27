<template>
	<view>
		<view class="view-nav">
			<view class="view-nav-bar">
				<image src="../../static/images/practicedetails2.png" mode="" @click="uni.navigateBack({

				})"></image>
				<text>优质学校</text>
			</view>

			<view class="view-search">
				<!-- <u-search class="search" placeholder="请输入关键词搜索" placeholderColor="#C3C7CB" bgColor="#F9F9FB"
					:show-action="false" v-model="searchValue" @search="search()">
				</u-search> -->
				<text style="display: inline-block; width: 20rpx;"></text>
				<text class="site">郑州</text>
				<image class="img" src="../../static/images/xiasanjiao.png" mode=""></image>
				<input @click="search" class="ipt" type="text" placeholder="请输入关键词搜索" :value="val">
			</view>

			<view class="Filter" @click="uni.navigateTo({url:'./filter-school'})">筛选</view>

			<view class="view-switch-wrapper">
				<!-- <view class="box-1">
					<view class="navigation" :class="{'active-btn': currentBtn==0}" @click="cut(0)">公办院校</view>
					<view class="navigation" :class="{'active-btn': currentBtn==1}" @click="cut(1)">职业院校</view>
					<view class="navigation" :class="{'active-btn': currentBtn==2}" @click="cut(2)">社会实践</view>
				</view> -->
				<view class="view-tabs">
					<u-tabs class="top-tabs" ref="u_tab1" lineColor="#FFF" @click="click"
						:current="tabIndex" :activeStyle="{padding:'5rpx',color: '#ffffff'}"
						:inactiveStyle="{padding:'5rpx', color: '#b2cafc'}" :list="tab_list">
					</u-tabs>
				</view>
			</view>
			<view class="perch"></view>
		</view>

		<view class="view-space"></view>


		<view class="view-school">
			<view class="view-list ">
				<!-- 跳转路径 '../child-details/child-details?id='+item.id+'&schoolType='+item.schoolTypeId+'&types='+1 -->
				<view class="view-item" v-for="(item,index) in schoolList" :key="index" @click="gogogo(item.id,item.schoolTypeId)">
					<image class="image-school" :src="item.logoImgUrl"></image>
					<view class="view-brief">
						<view class="view-name">
							<text class="text-name">{{item.schoolName}}</text>
							<view class="view-ratebox">
								<!-- <ice-star v-model="item.score"></ice-star> -->
								<image style="width: 35rpx;height: 35rpx;margin-top: 5rpx;" src="../../static/images/collection_fill.png" mode=""></image>
								<text>{{ Number(item.score).toFixed(1) }}</text>
							</view>
						</view>
						<view class="view-content u-line-2">{{item.schoolTitle}}</view>
						<view class="view-address">
							<text class="text-address u-line-1">{{item.schoolAddress}}</text>
							<text class="text-distance">{{(item.distance/1000).toFixed(2)}}km</text>
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
				val:'',
				schoolList: [], // 学校列表
				timer: null,
				searchValue: '',
				// currentBtn:0,
				tabIndex: 0,
				tab_list: [{
					id: '1',
					name: '全部'
				}, {
					id: '2',
					name: '幼儿教育'
				}, {
					id: '3',
					name: '兴趣培养'
				}, {
					id: '4',
					name: '少儿艺术'
				}, {
					id: '5',
					name: '民办院校'
				}, {
					id: '6',
					name: '公办院校'
				}, {
					id: '7',
					name: '职业院校'
				}, {
					id: '8',
					name: '社会实践'
				}],
			}
		},
		onLoad() {
			this.getSchoolList(); // 获取优质学校列表
		},
		onShow() {
			this.timeGetLocation()
		},
		onHide() {
			if (this.timer) clearInterval(this.timer)
		},
		methods: {
			//搜索
			search(){
				uni.navigateTo({
					url:'./qualitySchool'
				})
			},
			click(item, index) {
				this.page = 1;
				this.show = false
				console.log('当前页', this.page);
				console.log('item', item);
				this.tabIndex = item.index
				this.ids = item.id
				this.getSchoolList(); // 获取优质学校列表
				// this.getInfo()
			},
			// cut(e) {
			// 	this.currentBtn = e
			// },
			//跳转
			gogogo(a, b) {
				// console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
				console.log(a, b)
				if (b == 2) {
					uni.navigateTo({
						url: '../interest-details/public-details?id=' + a + '&schoolType=' + b + '&types=' + 2
					})
				} else if (b == 3) {
					uni.navigateTo({
						url: '../school-details/school-details?id=' + a + '&schoolType=' + b + '&types=' + 3
					})
				} else if (b == 4) {
					uni.navigateTo({
						url: '../public-details/public-details?id=' + a + '&schoolType=' + b + '&types=' + 4
					})
				} else if (b == 5) {
					uni.navigateTo({
						url: '../occupation-details/public-details?id=' + a + '&schoolType=' + b + '&types=' + 5
					})
				} else {
					uni.navigateTo({
						url: '../child-details/child-details?id=' + a + '&schoolType=' + b + '&types=' + 1
					})
				}

			},
			async getSchoolList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.post("/app/userHome/qualitySchoolList", {
					pageNum: this.page,
					pageSize: this.pageSize,
					isShowQuality: 0,
					schoolTypeId: 0,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
				});
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
	.view-nav {
		padding-top: var(--status-bar-height);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-color: #3c88fa;

		.view-nav-bar {
			width: 100%;
			height: 88rpx;
			display: flex;
			align-items: center;
			padding: 0 26rpx;
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
		}

		.view-search {
			width: 80%;
			height: 60rpx;
			background: #FFF;
			border-radius: 30rpx;
			margin-left: 20rpx;
			display: inline-block;

			.site {
				// line-height: 60rpx;
				position: relative;
				top: -20rpx;
			}

			.img {
				width: 20rpx;
				height: 20rpx;
				top: -20rpx;
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
	}

	.view-space {
		margin-top: var(--status-bar-height);
		height: 252rpx;
	}

	.view-switch-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 88rpx;
		position: relative;
		background-color: #3c88fa;

		.box-1 {
			.navigation {
				font-size: 28rpx;
				color: #fff;
				display: inline-block;
				padding: 10rpx 48rpx;
				border-radius: 10rpx;
				// background: #378efc;
			}

			.active-btn {
				color: black;
				font-size: 28rpx;
				// background-color: #53a6f9;
			}
		}

		.view-tabs {
			background-color: #3c88fa;
			height: 88rpx;

			/deep/.u-tabs {
				width: 100%;
				height: 88rpx;
				background-color: #3c88fa;
				position: fixed;
				z-index: 10;
				// border-bottom: 1rpx solid #EFEFEF;
			}
		}
	}

	.perch {
		width: 100%;
		height: 30rpx;
		border-top-left-radius:20rpx;
		border-top-right-radius:20rpx;
		background: #FFF;
	}

	.view-ratebox {
		display: flex;
		margin-left: auto;

		text {
			color: #FC6129;
		}

		image {
			width: 24rpx;
			height: 22rpx;
			margin-right: 9rpx;
		}
	}

	.view-school {
		width: 100%;

		.view-list {
			padding: 30rpx;

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
