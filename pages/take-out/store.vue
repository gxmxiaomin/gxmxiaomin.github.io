<template>
	<view>
		<view class="top-bar">
			<view class="bar-left bare-cell">
				<image style="width: 20rpx;height: 30rpx;" @click="uni.navigateBack()"
					src="../../static/images/details1.png" mode=""></image>
			</view>
			<view class="bar-center bare-cell">
				<u-search placeholder="请输入要搜索蔬菜的关键字" v-model="searchValue" height="70" :show-action="false"></u-search>
			</view>
			<view class="bar-right bare-cell">
				<view class="city-rigth">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<view class="back"></view>

		<view class="box">
			<image src="../../static/logo.png" mode=""></image>
		</view>
		<view class="box-1">
			<view class="position">
				<text>
					<image src="../../static/images/Informationservice.png" mode=""></image> 5.0
				</text>
			</view>
			<view class="text">
				<view class="">果蔬(文华路店)</view>
				<view class="">30分钟 1.0km</view>
			</view>
			<view class="text-1">
				<view class="">起送￥50</view>
				<view class="">免费配送</view>
				<view class="">月销2593</view>
				<view class="">本月果蔬店排行第一</view>
			</view>

			<view class="gonggao">
				<image class="image-1" src="../../static/images/laba.png" mode=""></image>
				<text>公告</text>
				<text>为迎接双11购物节，本店铺今日全场九折</text>
				<image class="image-2" src="../../static/images/arrow_right.png"></image>
			</view>

			<view class="tu">
				<image src="../../static/images/youhui.jpg" mode=""></image>
			</view>

			<view class="title">
				<view @click="click(1)" :style="{'color' : (style == 1 ? '#4796fc' : 'black')}">商品</view>
				<view @click="click(2)" :style="{'color' : (style == 2 ? '#4796fc' : 'black')}">商家</view>
				<view @click="click(3)" :style="{'color' : (style == 3 ? '#4796fc' : 'black')}">评价</view>
			</view>

			<!-- style == 1 -->
			<view v-show="style == 1" class="box-2">
				<view class="type">
					<view @click="cut(1)" :class="{'stateStyle1': style1 == 1}"> <text v-show="style1 == 1"></text> 热销推荐
					</view>
					<view @click="cut(2)" :class="{'stateStyle1': style1 == 2}"> <text v-show="style1 == 2"></text> 国产精品
					</view>
					<view @click="cut(3)" :class="{'stateStyle1': style1 == 3}"> <text v-show="style1 == 3"></text> 进口优惠
					</view>
					<view @click="cut(4)" :class="{'stateStyle1': style1 == 4}"> <text v-show="style1 == 4"></text> 限时特价
					</view>
					<view @click="cut(5)" :class="{'stateStyle1': style1 == 5}"> <text v-show="style1 == 5"></text> 冬季蔬菜
					</view>
					<view @click="cut(4)" :class="{'stateStyle1': style1 == 6}"> <text v-show="style1 == 6"></text> 夏季蔬菜
					</view>
					<view @click="cut(7)" :class="{'stateStyle1': style1 == 7}"> <text v-show="style1 == 7"></text> 秋季蔬菜
					</view>
					<view @click="cut(8)" :class="{'stateStyle1': style1 == 8}"> <text v-show="style1 == 8"></text> 春季蔬菜
					</view>
					<view @click="cut(9)" :class="{'stateStyle1': style1 == 9}"> <text v-show="style1 == 9"></text> 安心蔬菜
					</view>
					<view @click="cut(10)" :class="{'stateStyle1': style1 == 10}"> <text v-show="style1 == 10"></text>
						火锅专区</view>
					<view @click="cut(11)" :class="{'stateStyle1': style1 == 11}"> <text v-show="style1 == 11"></text>
						团购专区</view>
					<view @click="cut(12)" :class="{'stateStyle1': style1 == 12}"> <text v-show="style1 == 12"></text>
						国产精品</view>
					<view @click="cut(13)" :class="{'stateStyle1': style1 == 13}"> <text v-show="style1 == 13"></text>
						进口优惠</view>
					<view @click="cut(14)" :class="{'stateStyle1': style1 == 14}"> <text v-show="style1 == 14"></text>
						限时特价</view>
				</view>

				<view class="shangpin">
					<view class="tabs">
						<u-tabs :list="list4" :activeStyle="{
					        color: '#3e91fd',
					        fontWeight: 'bold',
					        transform: 'scale(1.05)'
					    }" :inactiveStyle="{
					        color: '#999999',
					        transform: 'scale(1)'
					    }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
							<!-- <view slot="right" style="padding-left: 4px;" @tap="$u.toast('插槽被点击')">
						<text style="padding-right: 10rpx;color: #999999;">筛选</text>
					</view> -->
						</u-tabs>
					</view>


					<Commodity :list="list"></Commodity>

				</view>

				<view class="" style="height: 100rpx;"></view>

				<view class="shopping">
					<image src="../../static/images/peisong.png" mode=""></image>
					<view class="price"> <text>￥</text> <text>{{totalPrice == 0 ?'0' : totalPrice}}</text>
						<text>免配送费</text>
					</view>
					<view class="qi">￥50元起</view>
				</view>
			</view>

			<!-- style == 2 -->
			<view v-show="style == 2" class="merchant">
				<view style="height: 1rpx;width: 90%;margin: auto;background-color: #f8f8f8;"></view>
				<!-- 第一部分 -->
				<view class="merchant-box">
					<view class="box-1">
						<view style="height: 10rpx;"></view>
						<image class="image-1" src="../../static/images/dizhi.png" mode=""></image>
						<text>郑州市金水区文化路85号</text>
						<image class="image-2" src="../../static/images/dh.png" mode=""></image>
					</view>
					<view class="box-2">
						<image src="../../static/logo.png" mode=""></image>
						<image src="../../static/logo.png" mode=""></image>
						<image src="../../static/logo.png" mode=""></image>
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="box-3">
						<image class="image-1" src="../../static/images/anquan.png" mode=""></image>
						<text>食品安全证书</text>
						<image src="../../static/images/arrow_right.png" class="image-2"></image>
					</view>
					<view style="height: 20rpx;"></view>
				</view>
				<!-- 第二部分 营业时间 -->
				<view style="height: 40rpx;"></view>
				<view class="time">
					<view style="height: 10rpx;"></view>
					<view class="box-1">
						<image class="image-1" src="../../static/images/sj.png" mode=""></image>
						<text>营业时间：0:00-24:00</text>
					</view>
					<view style="height: 1rpx;width: 90%;background-color: #f8f8f8;"></view>
					<view class="box-2">
						<image class="image-1" src="../../static/images/yysj.png" mode=""></image>
						<text>营业时间：0:00-24:00</text>
					</view>
					<view style="height: 10rpx;"></view>
				</view>
				<!-- 第三部分 -->
				<view style="height: 40rpx;"></view>
				<view class="hint">
					<view style="height: 10rpx;"></view>
					<view class="box-1">
						<image class="image-1" src="../../static/images/lb.png" mode=""></image>
						<text>公告：为迎接双11购物节，本店铺今日…</text>
					</view>
					<view style="height: 1rpx;width: 90%;background-color: #f8f8f8;"></view>
					<view class="box-2">
						<image class="image-1" src="../../static/images/quan.png" mode=""></image>
						<text>新人专享券：满200减30</text>
						<image src="../../static/images/arrow_right.png" class="image-2"></image>
					</view>
					<view style="height: 10rpx;"></view>
				</view>
				<view style="height: 140rpx;"></view>
			</view>

			<!-- style == 3 -->
			<view style="height: 40rpx;"></view>
			<view v-show="style == 3" class="evaluate">
				<view class="score">
					<view>5.0</view>
					<view class="fen">
						<image src="@/static/images/shoucang.svg" mode=""></image>
						<image src="@/static/images/shoucang.svg" mode=""></image>
						<image src="@/static/images/shoucang.svg" mode=""></image>
						<image src="@/static/images/shoucang.svg" mode=""></image>
						<image src="@/static/images/shoucang.svg" mode=""></image>
					</view>
					<view class="count">2668条评论</view>
				</view>
				<view class="score-comment">
					<view class="cla">非常新鲜(200)</view>
					<view>服务非常棒(120)</view>
					<view>店面整洁(10)</view>
					<view>性价比贼高(220)</view>
					<view>水果可甜可甜(170)</view>
				</view>
				<view style="height: 1rpx; width: 95%; margin: auto;background-color: #f8f8f8;margin-top: 30rpx;">
				</view>
				<view class="box-1" v-for="item in schoolevaluate">
					<image :src="item.headUrl" mode=""></image>
					<view class="box-1-text">
						<view>{{item.nickName}}</view>
						<view class="box-1-text2">
							<text>{{item.createTime}}</text>
							<text>{{item.number}}浏览</text>
						</view>
					</view>
					<view class="">
						{{item.content}}
					</view>
					<view class="box-3">
						<view class="tb1">
							<image src="@/static/images/praise.png" mode=""></image>
							<text>{{item.praise}}</text>
						</view>
						<view class="tb1">
							<image src="@/static/images/xiaoxi.svg" mode=""></image>
							<text>98</text>
						</view>

						<view class="reply"><text>回复</text></view>
					</view>
				</view>

				<view class="box-2-2">
					<view class="">
						<text>麻辣毛蛋:</text>
						<text>很好吃</text>
					</view>
					<view class="">
						<text>怪味胡豆:</text>
						<text>回购！回购！</text>
					</view>
					<view class="box-2-3">
						展开更多评论
					</view>
					<view style="height: 20rpx;"></view>
				</view>

				<view class="box-z">
					展开更多评论
				</view>
				<view style="height: 50rpx;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import Commodity from "./components/commodity/commodity.vue"
	export default {
		components: {
			Commodity
		},
		data() {
			return {
				searchValue:"",
				schoolevaluate: [{
					content: "西葫芦也太新鲜了吧，好喜欢啊！！！这是我网购买西葫芦最好吃的一次， 会一直回购冲冲冲！！！ ",
					createTime: "11.15 20:22",
					praise: '105',
					number: '2214',
					nickName: "山药",
					headUrl: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/10/24/7c8206df13de4fb2b8a6a5169da7d052.jpg",
				}, {
					content: "已经回购过无数次啦，他们家的菜品每次购买都很新鲜，会一直回购冲冲冲！！！",
					createTime: "11.15 20:22",
					praise: '75',
					number: '1214',
					nickName: "芋头",
					headUrl: "https://qljy-resource.oss-cn-beijing.aliyuncs.com/2022/10/24/7c8206df13de4fb2b8a6a5169da7d052.jpg",
				}],
				list: [{
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 1,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥133.9',
					newPrice: '99.9',
					id: 2,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥19.9',
					newPrice: '12.9',
					id: 3,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 4,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥13.9',
					newPrice: '9.9',
					id: 5,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥10.9',
					newPrice: '8.9',
					id: 6,
					quantity: 0,
				}, {
					name: '果蔬(文化路)',
					serve: '起送￥50',
					sales: '月销1989',
					price: '￥21.9',
					newPrice: '19.9',
					id: 7,
					quantity: 0,
				}],
				list4: [{
					name: '热卖'
				}, {
					name: '销量',
					// badge: {
					// 	isDot: true
					// }
				}, {
					name: '价格'
				}],
				style: 1,
				color: '#4796fc',
				price: 0,
				style1: 1,
			}
		},

		methods: {
			click(e) {
				this.style = e
			},
			cut(e) {
				this.style1 = e
			},
		},
		computed: {
			totalPrice() {
				// return this.price
				let sum = 0
				this.list.forEach(value => {
					sum += value.newPrice * value.quantity
				});
				return sum.toFixed(1)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eeeff1;
	}

	.top-bar {
		height: 160rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 98;
		background-image: linear-gradient(#579efc, #89baf9);
		top: 0%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.bare-cell {
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #FFF;
		}

		.bar-left {
			flex: 1;
			height: 100%;
		}

		.bar-center {
			flex: 5;
			height: 100%;
		}

		.bar-right {
			flex: 1;
			height: 100%;

			.city-rigth {
				color: #4796fc;
				font-size: 30rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-left: 20rpx;
					vertical-align: middle;
					margin-top: -5rpx;
				}
			}
		}
	}

	.back {
		height: 100rpx;
		background-image: linear-gradient(#83b4ef, #f1f1f1);
		margin-top: 150rpx;
	}

	.box {
		border-radius: 20rpx 20rpx 0 0;
		background-color: #FFF;
		text-align: center;

		image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
			display: inline-block;
			top: -80rpx;

		}
	}

	.box-1 {
		background-color: #FFF;

		.position {
			position: relative;
			// display: inline-block;
			// display: flex;
			float: right;
			right: 30rpx;
			top: -150rpx;

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}

		.text {

			view {
				display: inline-block;
				position: absolute;
				top: 340rpx;

				&:nth-child(1) {
					// text-align: center;
					left: 270rpx;
					// transform: translate(125%, 0);
				}

				&:nth-child(2) {
					// text-align: right;
					left: 74%;
					font-size: 28rpx;
					color: #aaa;
				}
			}
		}

		.text-1 {
			top: -30rpx;
			position: relative;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			justify-content: center;
			justify-content: space-between;
			justify-content: space-around;


			view {
				// display: inline-block;
				font-size: 28rpx;
				color: #aaa;

				&:nth-child(4) {
					color: #4796fc;
				}
			}
		}

		.gonggao {
			position: relative;
			top: -10rpx;
			width: 90%;
			height: 70rpx;
			// border: 1rpx solid black;
			// border-bottom: 1rpx #4796fc solid;
			// border-left: 1rpx #4796fc solid;
			// border-right: 1rpx #4796fc solid;
			box-shadow: 5rpx 5rpx 5px rgba(182, 213, 254, 0.9);
			border-radius: 40rpx;
			margin: auto;

			.image-1 {
				// margin-top: 20rpx;
				margin-left: 20rpx;
				width: 30rpx;
				height: 30rpx;
				vertical-align: middle;
			}

			.image-2 {
				width: 12rpx;
				height: 20rpx;
				float: right;
				margin-top: 25rpx;
			}

			text {
				&:nth-child(2) {
					display: inline-block;
					margin-top: 10rpx;
					margin-left: 10rpx;
				}

				&:nth-child(3) {
					display: inline-block;
					margin-left: 10rpx;
					margin-top: 10rpx;
					font-size: 26rpx;
				}
			}
		}

		.tu {
			width: 92%;
			margin: auto;

			image {
				width: 100%;
				height: 100rpx;
				margin-top: 20rpx;
				border-radius: 10rpx;
			}
		}

		.title {
			display: flex;
			justify-content: space-around;
			border-bottom: 1rpx solid #f8f8f8;
		}

		.box-2 {
			// height: 900rpx;
			// background-color: #89baf9;
		}

		.merchant {

			.merchant-box {
				border-radius: 10rpx;
				width: 90%;
				// height: 300rpx;
				margin: auto;
				box-shadow: 3rpx 5rpx 5px rgba(182, 213, 254, 0.9);

				.box-1 {
					margin: 20rpx 0 20rpx 20rpx;

					.image-1 {
						width: 25rpx;
						height: 35rpx;
						position: relative;
						top: 10rpx;
					}

					.image-2 {
						width: 35rpx;
						height: 40rpx;
						float: right;
						margin-right: 20rpx;
						position: relative;
						top: 10rpx;
					}

					text {
						display: inline-block;
						position: relative;
						left: 10rpx;
						top: 5rpx;
					}
				}

				.box-2 {
					margin-top: 20rpx;

					image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 20rpx;
						margin-left: 20rpx;
					}
				}

				.box-3 {
					.image-1 {
						width: 30rpx;
						height: 35rpx;
						position: relative;
						top: 10rpx;
						left: 20rpx;
					}

					.image-2 {
						width: 12rpx;
						height: 20rpx;
						float: right;
						margin-right: 20rpx;
						position: relative;
						top: 30rpx;
					}

					text {
						display: inline-block;
						position: relative;
						margin-left: 30rpx;
						top: 5rpx;
					}
				}
			}

			.time {
				width: 90%;
				// height: 300rpx;
				border-radius: 10rpx;
				margin: auto;
				box-shadow: 3rpx 5rpx 5px rgba(182, 213, 254, 0.9);

				.box-1 {
					margin: 20rpx 0 30rpx 20rpx;

					image {
						width: 35rpx;
						height: 35rpx;
						position: relative;
						top: 5rpx;
					}

					text {
						display: inline-block;
						margin-left: 10rpx;
					}
				}

				.box-2 {
					margin: 20rpx 0 20rpx 20rpx;

					image {
						width: 35rpx;
						height: 35rpx;
						position: relative;
						top: 5rpx;
					}

					text {
						display: inline-block;
						margin-left: 10rpx;
					}
				}
			}

			.hint {
				width: 90%;
				// height: 300rpx;
				border-radius: 10rpx;
				margin: auto;
				box-shadow: 3rpx 5rpx 5px rgba(182, 213, 254, 0.9);

				.box-1 {
					margin: 20rpx 0 30rpx 20rpx;

					image {
						width: 35rpx;
						height: 35rpx;
						position: relative;
						top: 5rpx;
					}

					text {
						display: inline-block;
						margin-left: 10rpx;
					}
				}

				.box-2 {
					margin: 20rpx 0 20rpx 20rpx;

					.image-1 {
						width: 35rpx;
						height: 35rpx;
						position: relative;
						top: 5rpx;
					}

					.image-2 {
						width: 12rpx;
						height: 20rpx;
						float: right;
						margin-right: 20rpx;
						position: relative;
						top: 30rpx;
					}

					text {
						display: inline-block;
						margin-left: 10rpx;
					}
				}
			}
		}

		.evaluate {
			width: 95%;
			margin: auto;
			box-shadow: 3rpx 5rpx 5px rgba(182, 213, 254, 0.9);

			.score {
				view {
					&:nth-child(1) {
						margin-left: 20rpx;
						font-weight: 600;
						font-size: 50rpx;
						color: #5ba3f4;
						display: inline-block;
					}

				}

				text {
					display: inline-block;
					margin-left: 10rpx;
					color: #5ba3f4;
				}

				.fen {
					display: inline-block;
					position: relative;
					top: 5rpx;
					// right: 10rpx;

					image {
						width: 30rpx;
						height: 30rpx;
						margin: 0 0 0 10rpx;
					}
				}

				.count {
					display: inline-block;
					font-size: 24rpx;
					position: relative;
					top: 35rpx;
					right: 20rpx;
					// left: 30rpx;
					float: right;
					color: #aaa;
				}
			}

			.score-comment {

				.cla {
					font-size: 24rpx;
					margin: 20rpx 10rpx 0 20rpx;
					display: inline-block;
					padding: 10rpx 20rpx 10rpx 20rpx;
					background: #9bc6fe;
					border-radius: 40rpx;
					color: #edf4fe;
				}

				view {
					font-size: 24rpx;
					margin: 20rpx 10rpx 0 20rpx;
					display: inline-block;
					padding: 10rpx 20rpx 10rpx 20rpx;
					background: #f1f1f1;
					border-radius: 40rpx;
					color: #a0a0a0;
				}
			}

			.box-1>image {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 10rpx;
				border-radius: 50%;
				// margin-top: 20rpx;
			}

			.box-1 {
				border-top: 1rpx solid #f3f0f3;
				margin: 20rpx 0 40rpx 20rpx;

				.box-1-text {
					height: 100rpx;

					.box-1-text2 {

						text {
							&:nth-child(2) {
								// margin-left: 40rpx;
								display: inline-block;
								position: relative;
								right: -340rpx;
							}
						}
					}

					display: inline-block;
					margin: 20rpx 0 0 20rpx;

					view {
						font-size: 30rpx;
						// position: relative;
						// margin-top: 10rpx;
						padding: 0 0 10rpx 0;

						&:nth-child(2) {
							// margin-top: -10rpx;
							margin: 0 0 10rpx 0;
							// display: inline-block;
							// margin-bottom: 10rpx;
							position: relative;
							bottom: 20rpx;

						}
					}

					text {
						font-size: 24rpx;
						color: #aaa;
					}
				}

				.box-3 {
					view {
						&:nth-child(2) {
							margin-left: 60rpx;
						}

						&:nth-child(3) {
							width: 100%;
							text-align: right;
							// display: block;

							text {
								background: #f3f0f3;
								border-radius: 40rpx;
								font-size: 24rpx;
								padding: 5rpx 20rpx 5rpx 20rpx;
								position: relative;
								left: 200rpx;

							}
						}
					}

					width: 40%;
					display: flex;
					//          flex-flow: row wrap;
					//          margin-top: 10rpx;
					// margin-bottom: 20rpx;
					// justify-content: space-around;
					margin: 40rpx 0 0 0;

					image {
						width: 30rpx;
						height: 30rpx;
					}

					view {
						// display: inline-block;
						// justify-content: space-around;
						// margin: 10rpx 20rpx 20rpx 20rpx;
					}

					.tb1 {
						text {
							font-size: 24rpx;
							display: inline-block;
							position: relative;
							bottom: 5rpx;
							left: 10rpx;
							font-size: 28rpx;
							color: #aaa;
						}
					}

					// .reply {
					// 	font-size: 24rpx;

					// }
				}
			}

			.box-2-2 {
				margin-top: 30rpx;
				border-radius: 10rpx;
				background: #f3f0f3;
				width: 95%;
				margin: auto;

				text {
					display: inline-block;
					padding: 10rpx 0 10rpx 20rpx;

					&:nth-child(1) {
						color: #4a9dfd;
						font-size: 26rpx;
					}

					&:nth-child(2) {
						font-size: 24rpx;
						// margin-left: 10rpx;
						color: #a1a1a1;
					}
				}

				.box-2-3 {
					text-align: center;
					color: #4a9dfd;
					font-size: 26rpx;
				}
			}

			.box-z {
				background-color: #f1f1f1;
				text-align: center;
				margin-top: 40rpx;
				height: 80rpx;
				line-height: 80rpx;
			}
		}

		.stateStyle1 {
			color: #4796fc !important;
			font-size: 34rpx;
		}

		.type {
			// background-color: #aaa;
			display: inline-block;
			width: 200rpx;
			border-right: 1rpx solid #f5f5f5;
			height: 900rpx;
			overflow-y: auto;

			view {
				// display: inline-block;
				text-align: center;
				margin: 30rpx 0;
				color: #a1a1a1;

				text {
					display: inline-block;
					width: 6rpx;
					height: 30rpx;
					background-color: #4796fc;
					margin-right: 15rpx;
					position: relative;
					top: 5rpx;
				}

				// &:nth-child(1) {
				// 	color: #4796fc;
				// 	font-size: 34rpx;
				// }
			}
		}

		.shangpin {
			width: 72%;
			height: 900rpx;
			float: right;
			overflow-y: auto;
			
			.tabs {
				position: relative;
				z-index: 99;
			}

			// .commodity-single {
			// 	width: 95%;
			// 	height: 170rpx;
			// 	margin: auto;

			// 	image {
			// 		height: 150rpx;
			// 		width: 150rpx;
			// 	}

			// 	.tag {
			// 		display: inline-block;
			// 		width: 100rpx;
			// 		background: #fb7a4c;
			// 		border-radius: 20rpx 0 20rpx 0;
			// 		position: relative;
			// 		display: flex;
			// 		top: 180rpx;
			// 		z-index: 9;
			// 		font-size: 22rpx;
			// 		color: #FFF;

			// 		text {
			// 			display: inline-block;
			// 			margin: auto;
			// 		}
			// 	}

			// 	.commodity-text {
			// 		display: inline-block;
			// 		margin-left: 20rpx;
			// 		margin-top: 10rpx;

			// 		.text-1 {
			// 			text {
			// 				&:nth-child(1) {
			// 					display: inline-block;
			// 					width: 340rpx;
			// 					// overflow: hidden;
			// 					// Text-overflow:ellipsis;
			// 					overflow: hidden;
			// 					text-overflow: ellipsis;
			// 					display: -webkit-box;
			// 					-webkit-line-clamp: 1;
			// 					-webkit-box-orient: vertical;
			// 					position: relative;
			// 					top: 50rpx;
			// 					left: -4rpx;
			// 					font-size: 32rpx;
			// 					font-weight: 500;
			// 				}
			// 			}
			// 		}

			// 		.text-2 {
			// 			text {
			// 				&:nth-child(1) {
			// 					font-size: 26rpx;
			// 					color: #aaa;
			// 					display: inline-block;
			// 					position: relative;
			// 					top: 10rpx;
			// 				}
			// 			}
			// 		}

			// 		.text-3 {
			// 			text {
			// 				&:nth-child(1) {
			// 					font-size: 26rpx;
			// 					color: #aaa;
			// 					display: inline-block;
			// 					position: relative;
			// 					// top: -10rpx;
			// 				}
			// 			}
			// 		}

			// 		.text-4 {
			// 			// display: inline-block;
			// 			// width: 180rpx;

			// 			text {

			// 				// display: inline-block;
			// 				&:nth-child(1) {
			// 					display: inline-block;
			// 					// width: 110rpx;
			// 					position: relative;
			// 					font-size: 34rpx;
			// 					color: #fc7d4f;
			// 					top: -10rpx;
			// 					// margin-right: 20rpx;
			// 				}

			// 				&:nth-child(2) {
			// 					display: inline-block;
			// 					// width: 90rpx;
			// 					position: relative;
			// 					font-size: 24rpx;
			// 					color: #aaa;
			// 					top: -10rpx;
			// 					text-decoration: line-through;
			// 					// margin-right: 20rpx;
			// 				}
			// 			}
			// 		}

			// 		.text-5 {
			// 			display: inline-block;
			// 			// right: 10rpx;
			// 			z-index: 9;
			// 			float: right;
			// 			position: relative;
			// 			top: -50rpx;
			// 			display: flex;

			// 			.img {
			// 				width: 40rpx;
			// 				height: 40rpx;
			// 				// position: relative;
			// 				// float: right;
			// 				// z-index: 9;
			// 			}

			// 			view {
			// 				display: inline-block;
			// 				width: 60rpx;
			// 				text-align: center;
			// 				// font-size: 26rpx;
			// 			}
			// 		}
			// 	}
			// }
		}

		.shopping {
			background-color: #666666;
			height: 90rpx;
			width: 95%;
			border-radius: 50rpx;
			position: fixed;
			bottom: 10rpx;
			bottom: 10rpx;
			left: 50%;
			transform: translateX(-50%);
			margin: auto;
			font-size: 32rpx;
			margin-top: 557rpx;
			z-index: 9;

			image {
				margin-left: 50rpx;
				margin-top: 20rpx;
				width: 60rpx;
				height: 50rpx;
				vertical-align: middle;
			}

			.price {
				display: inline-block;

				text {
					&:nth-child(1) {
						color: #FFF;
						font-size: 26rpx;
						font-weight: 700;
						display: inline-block;
						margin-left: 30rpx;
						position: relative;
						top: 15rpx;
					}

					&:nth-child(2) {
						color: #FFF;
						font-size: 40rpx;
						font-weight: 700;
						position: relative;
						top: 18rpx;
					}

					&:nth-child(3) {
						color: #929292;
						display: inline-block;
						margin-left: 20rpx;
						font-size: 26rpx;
						position: relative;
						top: 15rpx;
					}
				}
			}

			.qi {
				display: inline-block;
				float: right;
				margin-top: 20rpx;
				margin-right: 20rpx;
				color: #FFF;
				font-size: 34rpx;
			}
		}
	}
</style>
