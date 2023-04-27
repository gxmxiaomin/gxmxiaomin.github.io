<template>
	<view>
		<view class="box">
			<view class="type-1" v-for="(item,index) in titleListl" :key="item.title">
				<text class="type-1-1" :style="index == titleIndexl?'background: #4b9bfd;color:#fff':''"
					@click="selectTitlel(index)">{{item.title1}}</text>
			</view><br>
			<view style="height: 20rpx;"></view>

			<view class="type-2" v-for="(item,index) in titleList" :key="item.title">
				<text class="type-2-1" :style="index == titleIndex?'background: #4b9bfd;color:#fff':''"
					@click="selectTitle(index)">{{item.title}}</text>
			</view>

			<view class="course">





			</view>
		</view>


		<view class="view-goods-container">
			<view class="view-goods-list">
				<view class="view-goods-item" v-for="(item,index) in shopLsit">
					<view class="view-goods-cover">
						<image :src="item.goodsCover" mode=""></image>
					</view>
					<view class="view-goods-info">
						<view>
							{{item.goodsName}}
						</view>
						<view class="text">
							<text>{{item.text1}}</text> <text style="margin-left: 12%;">{{item.text2}}</text>
						</view>
						<view>
							<text>{{item.sellPrice}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

<!-- 底部固定 -->
		<view class="footer">
			<view class="cell">
				<u-icon name="heart" size="24"></u-icon>
				<text>点赞</text>
			</view>
			<view class="cell">
				<u-icon name="star" size="24"></u-icon>
				<text>收藏</text>
			</view>
			<view class="cell">
				<u-icon name="share" size="24"></u-icon>
				<text>分享</text>
			</view>
			<view class="btn">
				<u-button text="班级详情" type="primary" shape="circle"></u-button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopLsit: [{
					"id": "1463746212933562518",
					"goodsName": "王欢: 0基础编程入门班",
					"goodsCover": "https://656e-env-9g7egb7q512c4a71-1309923035.tcb.qcloud.la/1647067472(1).jpg?sign=acea9d06d7c815a74e89597e7417544a&t=1660113020",
					"text1": "周一六点-七点",
					"text2": "6155加入学习",
					"sellPrice": '￥1290/节',

				}, {
					"id": "1463746212933562517",
					"goodsName": "王欢: 0基础编程入门班",
					"goodsCover": "https://656e-env-9g7egb7q512c4a71-1309923035.tcb.qcloud.la/1647067472(1).jpg?sign=acea9d06d7c815a74e89597e7417544a&t=1660113020",
					"text1": "周一六点-七点",
					"text2": "6155加入学习",
					"sellPrice": '￥1290/节',
				}, {
					"id": "1463746212933562514",
					"goodsName": "王欢: 0基础编程入门班",
					"goodsCover": "https://656e-env-9g7egb7q512c4a71-1309923035.tcb.qcloud.la/1647067472(1).jpg?sign=acea9d06d7c815a74e89597e7417544a&t=1660113020",
					"text1": "周一六点-七点",
					"text2": "6155加入学习",
					"sellPrice": '￥1290/节',
				}, {
					"id": "1463746212933562513",
					"goodsName": "王欢: 0基础编程入门班",
					"goodsCover": "https://656e-env-9g7egb7q512c4a71-1309923035.tcb.qcloud.la/1647067472(1).jpg?sign=acea9d06d7c815a74e89597e7417544a&t=1660113020",
					"text1": "周一六点-七点",
					"text2": "6155加入学习",
					"sellPrice": '￥1290/节',
				}, {
					"id": "1463746212933562510",
					"goodsName": "王欢: 0基础编程入门班",
					"goodsCover": "https://656e-env-9g7egb7q512c4a71-1309923035.tcb.qcloud.la/1647067472(1).jpg?sign=acea9d06d7c815a74e89597e7417544a&t=1660113020",
					"text1": "周一六点-七点",
					"text2": "6155加入学习",
					"sellPrice": '￥1290/节',
				}, {
					"id": "1463746212933562497",
					"goodsName": "王欢: 0基础编程入门班",
					"goodsCover": "https://656e-env-9g7egb7q512c4a71-1309923035.tcb.qcloud.la/1647067472(1).jpg?sign=acea9d06d7c815a74e89597e7417544a&t=1660113020",
					"text1": "周一六点-七点",
					"text2": "6155加入学习",
					"sellPrice": '￥1290/节',
				}, {
					"id": "1463746212933562490",
					"goodsName": "王欢: 0基础编程入门班",
					"goodsCover": "https://656e-env-9g7egb7q512c4a71-1309923035.tcb.qcloud.la/1647067472(1).jpg?sign=acea9d06d7c815a74e89597e7417544a&t=1660113020",
					"text1": "周一六点-七点",
					"text2": "6155加入学习",
					"sellPrice": '￥1290/节',
				}],

				titleList: [{
						title: '全部'
					},
					{
						title: '绘画班'
					},
					{
						title: '编程班'
					},
					{
						title: '竞赛班'
					},
					{
						title: '影视班'
					},
					{
						title: '钢琴班'
					}
				],
				titleListl: [{
						title1: '全部'
					},
					{
						title1: '免费'
					},
					{
						title1: '付费'
					},
				],
				titleIndex: 0,
				titleIndexl: 0
			};
		},
		onLoad() {

		},
		methods: {
			selectTitle(index) {
				this.titleIndex = index
			},

			selectTitlel(index) {
				this.titleIndexl = index
			}

		}

	}
</script>

<style lang="scss">
	.footer{
		width: 100vw;
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		.cell{
			width: 100rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			text{
				font-size: 24rpx;
				color: #838383;
			}
		}
		.btn{
			width: 40%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.view-goods-container {
		padding: 30rpx;
		background-color: #F7F7F7;

		.view-goods-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-content: flex-start;


            .view-goods-item:last-child{
				margin-bottom: 100rpx;
			}
			.view-goods-item {
				display: flex;
				flex-direction: column;
				width: 340rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 30rpx;

				.view-goods-cover {
					width: 340rpx;
					height: 280rpx;

					image {
						border-radius: 20rpx;
						width: 100%;
						height: 100%;
					}
				}

				.view-goods-info {
					display: flex;
					flex-direction: column;
					padding: 12rpx;

					view {

						&:nth-child(1) {
							font-size: 30rpx;
						}

						&:nth-child(2) {
							// margin: 10rpx 0;

							text {
								font-size: 22rpx;
								color: #aaa;
								// padding: 0 60rpx 0 0;
							}
						}

						&:last-child {
							color: #FC7F52;

							text {

								&:last-child {
									font-family: 'PingFang-SC-Bold';
									font-size: 36rpx;
									margin-left: 6rpx;
								}
							}
						}
					}
				}
			}
		}
	}



	.box {

		.type-1>text {
			display: inline-block;
			margin: 10rpx 10rpx 10rpx 10rpx;
			padding: 0 10rpx 0 10rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			float: left
		}

		.type-1 {
			.type-1-1 {
				// background: #4b9bfd;
				// color: #ffffff;
			}
		}

		.type-2>text {
			display: inline-block;
			margin: 10rpx 10rpx 10rpx 10rpx;
			padding: 0 10rpx 0 10rpx;
			border-radius: 10rpx;
			font-size: 28rpx;
			float: left
		}

		.type-2 {
			// .type-2-1 {
			// 	background: #4b9bfd;
			// 	color: #ffffff;
			// }
		}



		.course {
			margin-top: 80rpx;
		}



		.course-1>image {
			width: 100%;
			height: 260rpx;
		}
	}
</style>
