<template>
	<view>
		<view class="view-nav">

			<view class="view-nav-bar">
				<image src="../../static/images/left.png" mode="" @click="uni.navigateBack({

				})"></image>
				<text>公办学校</text>
			</view>

			<view class="view-search">
				<u-search class="search" placeholder="请输入关键词搜索" placeholderColor="#C3C7CB" bgColor="#F9F9FB"
					:show-action="false" v-model="searchValue" @search="search()">
				</u-search>
			</view>

			<view class="view-switch-wrapper">

				<view class="view-switch">
					<view class="view-item" @click="clickCchoolType(item,index)" v-for="(item,index) in schoolType"
						:key="index">
						<text class="text-title" :class="item.select?'text-titles':''">{{item.description}}</text>
						<view class="view-line" v-if="item.select==1"></view>
					</view>
				</view>

				<view class="view-filter" @click="show=true">{{name}}</view>
				<u-picker :show="show" :columns="columns" keyName="label" @confirm="confirm" @cancel="show=false">
				</u-picker>
				<!-- <view class="view-switch">
					<view class="view-item" @click="switchs(1)">
						<text class="text-title" :class="types==1?'text-titles':''">综合排序</text>
						<view class="view-line" v-if="types==1"></view>
					</view>
					<view class="view-item" @click="switchs(2)">
						<text class="text-title" :class="types==2?'text-titles':''">距离优先</text>
						<view class="view-line" v-if="types==2"></view>
					</view>
					<view class="view-item" @click="switchs(3)">
						<text class="text-title" :class="types==3?'text-titles':''">好评优先</text>
						<view class="view-line" v-if="types==3"></view>
					</view>
				</view> -->
			</view>
		</view>

		<view class="view-space"></view>

		<view class="view-list">
			<!-- url ---  ../interest/interest-details/interest-details -->
			<!-- ../public-details/public-details -->
			<view class="view-item" v-for="item in list" @click="uni.navigateTo({
				url:'../interest-details/public-details?id='+item.id+'&schoolType='+item.schoolTypeId+'&types='+4 + '&grade='+ grade
			})">
				<image class="image-school" :src="item?item.institutionsImage.split(',')[0]:''"></image>
				<view class="view-brief">
					<view class="view-name">
						<text class="text-name">{{item.schoolName}}</text>
						<image class="image-rate" src="../../static/images/pingfen.png" mode=""></image>
						<text class="text-rate">{{Number(item.score).toFixed(1)}}分</text>
					</view>
					<view class="view-content u-line-2">{{item.schoolTitle}}</view>
					<view class="view-phone">
						<image src="../../static/images/dianhua.png" mode=""></image>
						<text>联系电话：{{item.phone}}</text>
					</view>
					<view class="view-address">
						<text class="text-address u-line-1">{{item.schoolAddress}}</text>
						<!-- <text class="text-distance">{{(item.distance/1000).toFixed(2)}}km</text> -->
						<text class="text-distance">{{item.distance}}km</text>
					</view>
				</view>
			</view>

		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
			page++
			getList()
			return ''
		}" />

		<MessageTip ref="messageTip"></MessageTip>
	</view>
</template>
<!-- todo   筛选   地址暂无对接 -->
<script>
	export default {
		data() {
			return {
				//年级
				grade: '',
				cnm: '110',
				timer: null,
				show: false,
				searchValue: '',
				name: '综合排序',
				types: 1,
				list: [],
				schoolType: [],
				schoolId: '',
				columns: [
					[{
							label: '综合排序',
							id: 1
						},
						{
							label: '距离优先',
							id: 2
						},
						{
							label: '好评优先',
							id: 3
						},
					]
				],
			}
		},
		onHide() {
			if (this.timer) clearInterval(this.timer)
		},
		async onLoad() {
			this.messageShowTip.showTextMessage(this)
			await this.getitemId();
		},
		onUnload() {
			this.messageShowTip.showTextMessage(this, "off")
		},
		async onShow() {
			await this.configurationList();
			await this.getList()
			this.timeGetLocation()
		},
		onReachBottom() {
			this.page++
			this.getList()
		},
		methods: {
			getitemId() {
				var that = this;
				console.log(that.cnm);
				if (that.schoolId == "") {
					that.schoolId = that.cnm;
				}
			},
			confirm(e) {
				this.show = false;
				this.name = e.value[0].label;
				console.log(e.value[0].id);
				this.types = e.value[0].id
				this.getList()
			},
			clickCchoolType(item, i) {
				this.schoolId = item.id;
				this.grade = item.description
				this.list = []
				this.page = 1
				console.log(item);
				item.select = true;
				this.schoolType.forEach((val, i) => {
					if (item.id != val.id) {
						val.select = false;
					}
				})
				this.getList();
			},
			async configurationList() {
				let res = await this.http.post("/app/userHome/systemConfigurationList", {
					configOptionId: 109,
				});
				console.log('121212', res);
				if (res.code == 200) {
					res.data.forEach((item, i) => {
						item['select'] = false;
					})
					res.data[0].select = true;
					this.schoolType = res.data;
					console.log(this.schoolType)
				}
			},

			fieldType(e) {
				console.log(e);
			},
			async search() {
				this.list = []
				this.pageNum = 1
				this.getList()
			},
			async switchs(ids) {
				this.types = ids
				await this.getList()
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/userHomeNavigation/publicSchoolList", {
					pageNum: this.page,
					pageSize: 10,
					fieldTypeId: this.schoolId,
					schoolName: this.searchValue,
					type: this.types,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
				});
				if (res.code == 200) {
					console.log(res);
					// let {
					// 	status,
					// 	list
					// } = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					// this.list = list;
					this.list = this.setSchoolDis(this.deepCopy(list))
					console.log(this.list)
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
	.view-nav {
		padding-top: var(--status-bar-height);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-color: #ffffff;

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
			}

			image {
				width: 20rpx;
				height: 32rpx;
			}
		}
	}

	.view-space {
		margin-top: var(--status-bar-height);
		height: 252rpx;
	}

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

					image {
						width: 19rpx;
						height: 19rpx;
						margin-left: auto;
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

	.view-switch-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 88rpx;
		position: relative;
		background-color: #FFFFFF;

		.view-filter {
			position: absolute;
			top: 26%;
			right: 30rpx;
			// transform: translateY(-50%);
			color: #333333;
			font-size: 28rpx;
		}

		.view-switch {
			display: flex;
			padding: 20rpx 30rpx;
			width: 60%;

			.view-item {
				margin-left: 60rpx;

				.text-titles {
					color: #4A9AFF !important;
				}

				.text-title {
					font-size: 28rpx;
					font-weight: 400;
					color: #999999;
				}

				.view-line {
					width: 40rpx;
					height: 8rpx;
					background: #4A9AFF;
					border-radius: 4rpx;
					margin: 0 auto;
					margin-top: 10rpx !important;
				}

				&:first-child {
					margin-left: 0rpx;
				}
			}
		}

	}

	/deep/.u-navbar__content__left {
		width: 100%;
		padding: 0rpx;
	}

	.view-header-wrapper {
		height: 88rpx;

		.view-header {
			position: fixed;
			background-color: #FFFFFF;
			display: flex;
			width: 100%;
			height: 88rpx;
			flex-direction: row;
			align-items: center;
			padding: 0 30rpx;
			z-index: 10;
			color: #333333;

			.image-location {
				width: 22rpx;
				height: 30rpx;
			}

			.text-city {
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				margin-left: 10rpx;
			}


		}

	}

	.view-search {
		display: flex;
		align-items: center;
		margin: 0 auto;
		width: 690rpx;
		height: 70rpx;
		background: #F7F9FA;
		border-radius: 10rpx;

		.image-search {
			width: 25rpx;
			height: 25rpx;
		}

		text {
			font-size: 28rpx;
			font-weight: 500;
			margin-left: 10rpx;
			color: #999999;
		}
	}
</style>
