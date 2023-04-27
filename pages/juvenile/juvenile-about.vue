<template>
	<view class="page-view">
		<view class="header">
			<image @click="uni.navigateBack()" src="../../static/images/dailysignin/arrow_left_icon.png"></image>
			<text>关于我们</text>
			<text> </text>
		</view>
		<view class="img-box">
			<image :src="this.list.img"></image>
		</view>
		<view class="desEnd">
			<view class="inter-box">
				<text class="inter-title">简介</text>
				<text class="inter-info" v-html="this.list.jianjie"></text>
			</view>
			<view class="inter-box">
				<text class="inter-title">三大优势</text>
				<text class="inter-info" v-html="this.list.youshi"></text>
			</view>
			<view class="inter-box">
				<text class="inter-title">我们的成就</text>
				<text class="inter-infos" v-html="list.chengjiu"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {
					img: '',
					jianjie: '',
					youshi: '',
					chengjiu: '',
				},
			}
		},
		onLoad() {
		
		},
		onShow() {
			this.getList()
		},
		onHide() {

		},
		methods: {
			async getList() {
				const res = await this.http.get("/app/userHomeNavigation/selectAboutList",{})
				if(res.code == 200){
					this.list.img = res.data[0].backImg;
					// this.list.chengjiu = res.data[0].achievement;
					this.list.youshi = res.data[0].advantage;
					this.list.jianjie = res.data[0].introduction;
					this.list.chengjiu = res.data[0].achievement;
				}
				console.log(res)
				console.log(res.data[0].achievement)
			}
		}
	}
</script>

<style>
	page {
		background: #e5e5e5;
	}
</style>

<style lang="scss" scoped>
	.header {
		position: fixed;
		z-index: 99;
		height: 160rpx;
		left: 0;
		width: 100%;
		// background-color: #000;
		display: flex;
		justify-content: space-between;
		padding-top: 100rpx;
		font-weight: 500;
		
		image {
			width: 20rpx;
			height: 30rpx;
			margin-left: 20rpx;
		}
		text {
			color: #fff;
			margin-right: 20rpx;
		}
	}
	.page-view {
		width: 100%;
		min-height: 100vh;
	}

	.img-box {
		width: 100%;
		height: 465rpx;
		position: relative;
	}
	
	.img-box:after {
		position: absolute;
		top: 0;
		left: 0;
		content: "";
		background-color:rgba(0, 0, 0, 0.3);
		// opacity: 0.2;
		z-index: 1;
		width: 100%;
		height: 99%;
	}

	.img-box>image {
		width: 100%;
		height: 100%;
	}

	.inter-box {
		margin-top: 30rpx;
		padding: 20rpx;
		width: 100%;
		min-height: 100rpx;
		background-color: #fff;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		color: #707070;

		.inter-title {
			font-size: 36rpx;
			font-weight: 900;
			color: #000;
			// margin-bottom: 20rpx;
		}
	}

	.inter-info ::v-deep p {
		text-indent: 2em;
		/*em是相对单位，2em即现在一个字大小的两倍*/
	}

	.inter-infos ::v-deep img {
		width: 100%;
		height: 400rpx;
		// margin-bottom: 10rpx;
		margin: 20rpx 0;
	}
</style>
