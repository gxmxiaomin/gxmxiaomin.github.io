<template>
	<view>
		<!-- <view class="view-header-wrapper">
			<view class="view-header">
				<view class="view-search">
					<image src="../../static/images/search.png" class="image-search"></image>
					<text>请输入关键词搜索</text>
				</view>
			</view>
		</view> -->
		<view class="view-header">

			<view class="view-nav">
				<image src="../../static/images/back.png" mode="" @click="uni.navigateBack({})"></image>
				<text>兴趣培养</text>
			</view>


			<view class="view-search">
				<u-search class="search" bgColor="#F9F9FB" :show-action="false" v-model="searchValue"
					@search="search()"></u-search>
			</view>

			<view class="view-switch-wrapper">
				<view class="view-switch">
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

					<view class="view-item" @click="showSkill=!showSkill">
						<view style="display: flex;align-items: center;">
							擅长方向
							<image src="../../static/images/arrow-down.png" mode=""
								:style="showSkill?'transform: rotate(180deg);':''"></image>
						</view>
						<view class="view-popupType" v-if="showSkill==true">
							<view class="view-name" v-for="item in shanchangList" @click="goods(item.id)">
								{{item.schoolTypeName}}
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- <button @click="uni.navigateTo({url:'../interest-details/public-details'})">兴趣详情</button> -->
		</view>



		<view class="view-space"></view>

		<view class="view-list">   <!-- interest-details/interest-details -->
			<view class="view-item" v-for="item in list" @click="uni.navigateTo({
				url:'../interest-details/public-details?id='+item.id+'&schoolType='+item.schoolTypeId+'&types='+2
			})">
				<image class="image-school" :src="item?item.institutionsImage.split(',')[0]:''"></image>
				<view class="view-brief">
					<view class="view-name">
						<text class="text-name">{{item.schoolName}}</text>
						<image class="image-rate" src="../../static/images/pingfen.png" mode=""></image>
						<text class="text-rate">{{Number(item.score).toFixed(1)}}</text>
					</view>
					<view class="view-content u-line-2">{{item.schoolTitle}}</view>
					<view class="view-details">
						<view class="view-label" v-for="(val,i) in item.goodAtDirection" :key="i">
							{{val}}
						</view>
					</view>
					<view class="view-address">
						<text class="text-address u-line-1">{{item.schoolAddress}}</text>
						<text class="text-distance">{{(item.distance/1000).toFixed(2)}}km</text>
					</view>
				</view>
			</view>

		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
			page++
			getList()
			return ''
		}" />
		<!-- <button @click="uni.navigateTo({
					url:'../public-details/components/test'
				})">课程</button>
				<button @click="uni.navigateTo({
							url:'../public-details/components/active'
						})">动态</button>
						<button @click="uni.navigateTo({
									url:'../public-details/components/forum'
								})">论坛</button>
								<button @click="uni.navigateTo({
											url:'../public-details/components/evaluate'
										})">评价</button> -->
	</view>
</template>
<!-- todo   筛选   地址暂无对接 -->
<script>
	export default {
		data() {
			return {
				direction: [],
				types: 1,
				list: [],
				showSkill: false, //擅长方向
				shanchangList: [],
				searchValue: '',
			}
		},
		async mounted() {
			await this.goodDirection()
			await this.getList()
			await this.getShanchangList()
		},
		methods: {

			async search() {
				this.list = []
				this.pageNum = 1
				this.getList()
			},
			async getShanchangList() {
				let res = await this.http.get('/app/userHomeNavigation/goodAtDirectionTypeList', {
					typeId: 2,
				});
				if (res.code == 200) {
					this.shanchangList = res.data
				} else {
					this.$toast(res.msg);
				}
			},
			async switchs(ids) {
				this.types = ids
				await this.getList()
			},
			async goods() {
				await this.getList()
			},

			// 擅长方向
			async goodDirection() {
				let res = await this.http.get('/app/userInfo/goodDirectionType')
				console.log('擅长方向', res);
				if (res.code == 200) {
					this.direction = res.data;
				} else {
					this.$toast(res.msg)
				}
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get("/app/userHomeNavigation/interestEducationList", {
					pageNum: 1,
					pageSize: 10,
					type: this.types,
					schoolName: this.searchValue,
					lon: uni.getStorageSync('lng'),
					lat: uni.getStorageSync('lat'),
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
					this.list.forEach(data => {
						let text = [];
						let goodAtDirection = data.goodAtDirection;

						if (goodAtDirection != null) {
							let goodAtDirectionText = goodAtDirection.split(",");

							this.direction.forEach(data => {

								goodAtDirectionText.forEach(val => {

									if (data.id == val) {

										text.push(data.schoolTypeName);
									}
								})
							})
						}
						data.goodAtDirection = text;
					})
					console.log(this.list);

				} else {
					this.$toast(res.msg);
				}
			}

		}
	}
</script>

<style lang="scss">
	.view-header {
		position: fixed;
		top: 0;
		background-color: #FFFFFF;
		width: 100%;
		padding-top: var(--status-bar-height);
		z-index: 10;
		color: #333333;

		.view-nav {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 88rpx;
			padding: 0 30rpx;
			position: relative;

			text {}

			image {
				position: absolute;
				left: 30rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 18rpx;
				height: 30rpx;
			}
		}

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

		.view-search {
			padding: 0 30rpx;
			border-radius: 6rpx;

			.search {
				background-color: #F9F9FB;
			}
		}
	}

	.view-details {
		display: flex;
		overflow: scroll;
	}

	.view-label {
		background-color: #E5EEF8;
		border: 1px solid #4A9AFF;
		color: #4A9AFF;
		border-radius: 999rpx;
		padding: 5rpx 14rpx;
		font-size: 20rpx;
		margin-right: 20rpx;
	}

	.view-space {
		margin-top: var(--status-bar-height);
		height: 248rpx;
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
		height: 88rpx;

		.view-switch {
			display: flex;
			padding: 20rpx 30rpx;
			// position: fixed;
			z-index: 9999;
			background-color: #FFFFFF;
			width: 100%;

			.view-item {
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
				position: relative;

				.view-popupType {
					width: 240rpx;
					height: 240rpx;
					background-color: #FFFFFF;
					box-shadow: 0rpx 0rpx 10rpx #999999;
					position: absolute;
					top: 56rpx;
					left: -50rpx;
					z-index: 999;
					overflow-y: scroll;

					.view-name {
						width: 100%;
						height: 70rpx;
						line-height: 70rpx;
						text-align: center;
					}
				}

				image {
					width: 14rpx;
					height: 8rpx;
					margin-left: 10rpx;
				}
			}

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
	}
</style>
