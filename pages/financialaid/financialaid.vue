<template>
	<view class="view-content">
		<u-navbar safeAreaInsetTop placeholder fixed title="助学基金" bgColor="#ffffff" @leftClick="uni.navigateBack({
			delta:1
		})">
			<view class="view-right" slot="right" @click="uni.navigateTo({
				url:'./history'
			})">
				历史申请
			</view>
		</u-navbar>
		<view class="view-content-a">
			遵照“安老、扶幼、助学、济困”的宗旨，陕西社会
			公益基金会十分重视智力扶贫。2007年开展慈善
			助学，核心理念是教育扶贫，宗旨是赞助贫困地
			区、贫困家庭、贫困孩子的教育，推广汉语，促进
			民族团结和社会和谐。

			基金成立后将重点用于资助家庭经济困难、失学儿
			童，旨在关心支助贫困地区困难儿童接受小学初中
			教育、未能升学的贫困初高中毕业生接受职业培训
			和农民素质的提高，关注引导有社会责任感的大学
			师生参与促进乡村教育。
		</view>
		<view class="view-content-b">
			申请报名
		</view>
		<view class="view-content-c">
			<view class="view-information">
				<view class="view-line">
					<view class="view-name">
						姓名
					</view>
					<view class="view-right-a">
						<input type="text" value="付辛" />
					</view>
				</view>
				<view class="view-line">
					<view class="view-name">
						性别
					</view>
					<view class="view-right-a">
						<input type="text" value="女" />
						<image src="/static/images/instructorapply1.png" mode=""></image>
					</view>
				</view>
				<view class="view-line">
					<view class="view-name">
						电话
					</view>
					<view class="view-right-a">
						<input type="text" value="17378183981" />
					</view>
				</view>
				<view class="view-line">
					<view class="view-name">
						身份证号
					</view>
					<view class="view-right-a">
						<input type="text" value="411838199903191841" />
					</view>
				</view>
				<view class="view-line">
					<view class="view-name">
						地 址
					</view>
					<view class="view-right-a">
						<input type="text" value="河南省二七区升龙国际C区" />
					</view>
				</view>
			</view>
			<view class="view-document">
				<view class="view-left">
					《申请文书》
				</view>
				<image src="/static/images/financialaid1.png" mode=""></image>
			</view>
			<view class="view-remarks">
				请下载助学基金申请文书，在空白的位置填写相应的信息， 并签字上传
			</view>
			<view class="view-upload">
				<image src="/static/images/financialaid2.png" mode=""></image>
				<view class="view-top">
					申请文书.docx
				</view>
				<view class="view-bottom">
					上传成功
				</view>
			</view>
			<view class="view-button">
				重新上传
			</view>
		</view>
		<view class="view-content-d">
			申请报名
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.view-content {
		background-image: url(../../static/images/financialaid.png);
		background-repeat: no-repeat;
		background-size: 750rpx 2656rpx;
		box-sizing: border-box;
		background-color: #4409BC;
		padding: 0 30rpx;
		padding-top: 424rpx;
		padding-bottom: 23rpx;

		/deep/.u-navbar {

			.uicon-arrow-left {
				color: #333333 !important;
			}

			.u-navbar__content__title {
				color: #333333 !important;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}

			.view-right {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}

		.view-content-a {
			width: 690rpx;
			background: #FFFFFF;
			border: 8rpx solid #0066FF;
			border-radius: 25rpx;
			box-sizing: border-box;
			padding: 43rpx 36rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-bottom: 40rpx;
		}

		.view-content-b {
			width: 347rpx;
			height: 86rpx;
			background: #4A9AFF;
			border: 8rpx solid #0066FF;
			border-radius: 10rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			line-height: 75rpx;
			margin: 0 auto;
			z-index: 10;
			position: relative;
			margin-bottom: -43rpx;
		}

		.view-content-c {
			width: 690rpx;
			background: #FFFFFF;
			border: 8rpx solid #0066FF;
			border-radius: 25rpx;
			box-sizing: border-box;
			padding: 0 54rpx;
			padding-top: 90rpx;
			z-index: 1;

			.view-line {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.view-name {
					width: 120rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.view-right-a {
					width: 478rpx;
					height: 80rpx;
					background: #F8F9FA;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding-left: 30rpx;

					image {
						width: 22rpx;
						height: 13rpx;
						margin-right: 17rpx;
					}

					input {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
			}

			.view-document {
				display: flex;
				align-items: center;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-top: 110rpx;
				margin-bottom: 19rpx;

				image {
					width: 20rpx;
					height: 20rpx;
					margin-left: 34rpx;
				}
			}

			.view-remarks {
				width: 606rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF0000;
				margin-bottom: 50rpx;
			}

			.view-upload {
				width: 400rpx;
				height: 400rpx;
				background: #FFFFFF;
				border: 1rpx solid #999999;
				border-radius: 7rpx;
				margin: 0 auto;
				margin-bottom: 26rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 101rpx;
					height: 124rpx;
					margin-top: 78rpx;
					margin-bottom: 24rpx;
				}

				.view-top {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #A6ACBA;
					margin-bottom: 43rpx;
				}

				.view-bottom {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #A7ADBB;
				}
			}

			.view-button {
				width: 340rpx;
				height: 77rpx;
				background: #4A9AFF;
				border-radius: 7rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				line-height: 77rpx;
				margin: 0 auto;
				margin-bottom: 66rpx;
			}
		}

		.view-content-d {
			width: 630rpx;
			height: 80rpx;
			background: #4A9AFF;
			border-radius: 40rpx;
			margin: 0 auto;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
			margin-top: 57rpx;

		}
	}
</style>
