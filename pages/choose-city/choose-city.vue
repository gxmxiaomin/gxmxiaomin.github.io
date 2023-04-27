<template>
	<view class="page">
		<u-index-list :index-list="indexList">
			<view class="view-title">
				<image src="../../static/images/dizhi.png" mode=""></image>
				<text>当前定位</text>
			</view>

			<view class="view-current-city">
				<text class="flex-grow text-current">{{currentCity}}</text>
				<view class="view-title" @click="getLocation">
					<text>重新定位</text>
				</view>
			</view>

			<!-- <view class="view-title">
				<text>常用城市</text>
			</view>

			<view class="view-grid">
				<view class="view-item" v-for="(item,index) in 5" @click="chooseCity(item)">
					北京
				</view>
			</view>

			<view class="view-title">
				<text>热门城市</text>
			</view>
			<view class="view-grid">
				<view class="view-item" v-for="(item,index) in 5" @click="chooseCity(item)">
					北京
				</view>
			</view> -->
			<template v-for="(item, index) in itemArr">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="indexList[index]"></u-index-anchor>
				<!-- #endif -->
				<u-index-item>
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="indexList[index]"></u-index-anchor>
					<!-- #endif -->
					<view class="list-cell" v-for="(childItem, index) in item" @click="chooseCity(childItem.cityName)">
						{{childItem.cityName}}
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
</template>

<script>
	import cities from '../../utils/city.js'
	import citySelect from '../../utils/citySelect.js'
	export default {
		data() {
			return {
				currentCity: "",
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
					"S",
					"T", "U", "V", "W", "X", "Y", "Z"
				],
				itemArr: []
			};
		},
		onLoad(options) {
			this.currentCity = options.city
		},

		mounted() {
			this.filterCity()
		},
		methods: {
			filterCity() {
				let cityList = []
				for (let item of cities) {
					item.letter = citySelect.getFirstLetter(item.cityName).firstletter;
					item.unicode = citySelect.getFirstLetter(item.cityName).unicode;
					cityList.push(item)
				}
				cityList = cityList.sort((a, b) => {
					return a.unicode - b.unicode;
				});
				for (let i of this.indexList) {
					let childItemArr = []
					for (let item of cityList) {
						if (item.letter === i) {
							childItemArr.push(item)
						}
					}
					this.itemArr.push(childItemArr)
				}
			},

			getLocation() {
				let _this = this
				uni.showLoading({
					title: '加载中'
				})
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						uni.hideLoading()
						uni.request({
							url: "https://restapi.amap.com/v3/geocode/regeo",
							data: {
								// key: "0c8155a1d73c6dcd160d405a17da048d",
								key: "af799f08b2d0ad189610bb1b8a5ff99e",
								location: res.longitude + "," + res.latitude,
							},
							method: "GET",
							success: function(res) {
								console.log(res);
								_this.currentCity = res.data.regeocode.addressComponent.city
								uni.$emit("getCity", _this.currentCity)
								setTimeout(() => {
									uni.navigateBack({})
								}, 460)
								uni.hideLoading()
							}
						})
					},
					fail: function(error) {
						console.log(error);
					}
				});
			},

			//选择城市
			chooseCity(city) {
				this.currentCity = city
				console.log('已选择:', city);
				uni.$emit("getCity", city)
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 30rpx;
	}

	.view-title {
		display: flex;
		flex-direction: row;
		align-items: center;

		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 12rpx;
		}

		text {
			font-size: 28rpx;
			font-weight: bold;
			color: #2875EC;
			opacity: 0.8;
		}
	}

	.view-current-city {
		margin-top: 26rpx;
		margin-bottom: 56rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.text-current {
			font-size: 32rpx;
			font-weight: 800;
			color: #333333;
		}
	}

	.view-grid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 30rpx;

		.view-item {
			margin-right: 30rpx;
			margin-bottom: 30rpx;
			width: 210rpx;
			height: 80rpx;
			background: #EFEFEF;
			border-radius: 10rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 28rpx;
			font-weight: 500;
			color: #000000;

			&:nth-child(3n) {
				margin-right: 0;
			}
		}
	}

	.view-list {
		display: flex;
		flex-direction: column;

		.view-item {
			display: flex;
			flex-direction: column;
			border-bottom: 1rpx solid #EFEFEF;
			padding: 26rpx 0;

			.text-letter {
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
				margin-bottom: 26rpx;
			}

			.text-city {
				font-size: 28rpx;
				font-weight: 500;
				color: #333333;
			}
		}
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		font-size: 32rpx;
		padding: 20rpx 24rpx;
		overflow: hidden;
		color: #323233;
		line-height: 24rpx;
		background-color: #fff;
	}
</style>
