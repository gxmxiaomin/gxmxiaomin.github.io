<template>
	<view>
		<image class="img-1" src="../../static/images/guoqing.png" mode=""></image>
		<view class="box-1">
			<view class="box-1-1">
				<view class="box-1-2">
					<view class="box-1-btn">活动优惠</view>
					<view class="box-1-2-text">全网定价：学校 <text>3000</text> 元/年</view>
					<view class="">初期推广首次购买特惠，仅限首次，过后恢复全网定价</view>
					<view class="">首次特惠：</view>
					<view class="">一年： <text>599</text> 元</view>
					<view class="">两年： <text>999</text> 元</view>
					<view class="">三年： <text>1399</text> 元</view>
					<view style="height: 20rpx;"></view>
				</view>
			</view>
		</view>

		<view style='height:80rpx;'></view>

		<view class="box-2">
			<view class="box-2-1">
				<view class="box-2-2">
					<view class="box-2-btn">入驻优势</view>
					<view class="box-2-2-text">往这看！！</view>
					<view class="">沐星辰APP包含：幼儿教育、兴趣培养、民
						办院校、公办院校、职业院校等为您打造一
						站式校区管理体系，实现教育多样化管理模
						式，线上经营，维护长期有效收益，低成本
						扩张之路，为您带来更全面，更便捷的管理
						体系。</view>
					<view>在这里沐星辰APP能够为家长您呈现！</view>
					<view>一键查询附近优质幼儿园：</view>
					<view class="">
						校区环境展示，师资力星，教学质量，课程
						安排；</view>
					<view class="">校园活动，校园社会实践视频图片展示；
						一对一沟通孩子校内上课情况。
						沐星反APP为您解决校园招生问题、学生管
						理、排课管理、校区经营问题、师资配备问
						题等为校园带来线上经营管理模式实现永久
						收益。</view>
					<view style="height: 20rpx;"></view>
				</view>
			</view>
		</view>

		<view style='height:80rpx;'></view>

		<view class="box-3">
			<view class="box-3-1">
				<view class="box-3-2">
					<view class="box-3-btn">现已入驻</view>
					<view class="list">
						<view class="rowup">
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
						</view>
						<view class="rowup">
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
							<view class="">郑州市国茂幼儿园 <text>2022.10.02</text> </view>
						</view>
					</view>
					<view style="height: 20rpx;"></view>
				</view>
			</view>
		</view>

		<view style='height:80rpx;'></view>

		<view class="box-4">
			<view class="box-4-1">
				<view class="box-4-2">
					<view class="box-4-btn">申请入驻</view>
					<view class="view-item">
						<text class="text-label">单位名称</text>
						<u--input placeholder="请输入单位名称"></u--input>
					</view>
					<view class="view-item">
						<text class="text-label">负 &nbsp;责&nbsp; 人</text>
						<u--input placeholder="请输入负责人"></u--input>
					</view>
					<view class="view-item">
						<text class="text-label">联系电话</text>
						<u--input placeholder="请输入联系电话"></u--input>
					</view>
					<view class="view-item">
						<text class="text-label">地 &nbsp;&nbsp;&nbsp;&nbsp; 址</text>
						<u--input placeholder="请输入地址"></u--input>
					</view>
					<view class="baoming">立即报名</view>
					<view style="height: 20rpx;"></view>
				</view>
			</view>
		</view>
		
		<view style="height: 200rpx;"></view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background: red;
	}

	.img-1 {
		width: 100%;
		height: 300rpx;
	}

	.box-1 {
		// height: 400rpx;
		width: 95%;
		border: 1rpx #f56248 solid;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f56248;

		.box-1-btn {
			width: 200rpx;
			height: 60rpx;
			// border: 1rpx #ffe07d solid;
			border-top: 2rpx #ffe07d solid;
			border-left: 2rpx #ffe07d solid;
			border-right: 2rpx #ffe07d solid;
			border-radius: 40rpx;
			position: relative;
			top: -30rpx;
			left: 210rpx;
			background: #f45c47;
			color: #FFF;
			text-align: center;
			line-height: 50rpx;
		}

		.box-1-1 {
			width: 97%;
			height: 95%;
			border: 1rpx #ffe07d solid;
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ffe07d;
			border-radius: 15rpx;

			.box-1-2 {
				width: 98%;
				height: 97%;
				border: 1rpx #ffe07d solid;
				margin: auto;
				background: white;
				border-radius: 15rpx;

				view {
					margin-left: 30rpx;

					text {
						color: #f56248;
					}
				}

				.box-1-2-text {
					// margin-top: 40rpx;
				}

				margin: 10rpx 0 10rpx 0;
			}

			margin: 10rpx 0 10rpx 0;
		}
	}

	.box-2 {
		// height: 1000rpx;
		width: 95%;
		border: 1rpx #f56248 solid;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f56248;

		.box-2-btn {
			width: 200rpx;
			// height: 60rpx;
			// border: 1rpx #ffe07d solid;
			border-top: 2rpx #ffe07d solid;
			border-left: 2rpx #ffe07d solid;
			border-right: 2rpx #ffe07d solid;
			border-radius: 40rpx;
			position: relative;
			top: -30rpx;
			left: 210rpx;
			background: #f45c47;
			color: #FFF;
			text-align: center;
			line-height: 50rpx;
		}

		.box-2-1 {
			width: 97%;
			// height: 95%;
			border: 1rpx #ffe07d solid;
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ffe07d;
			border-radius: 15rpx;

			.box-2-2 {
				width: 98%;
				// height: 97%;
				border: 1rpx #ffe07d solid;
				margin: auto;
				background: white;
				border-radius: 15rpx;

				view {
					margin-left: 30rpx;

					text {
						color: #f56248;
					}
				}

				.box-2-2-text {
					// margin-top: 40rpx;
				}

				margin: 10rpx 0 10rpx 0;
			}

			margin: 10rpx 0 10rpx 0;
		}
	}

	.box-3 {
		// height: 400rpx;
		width: 95%;
		border: 1rpx #f56248 solid;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f56248;

		.box-3-btn {
			width: 200rpx;
			height: 60rpx;
			// border: 1rpx #ffe07d solid;
			border-top: 2rpx #ffe07d solid;
			border-left: 2rpx #ffe07d solid;
			border-right: 2rpx #ffe07d solid;
			border-radius: 40rpx;
			position: relative;
			top: -30rpx;
			left: 240rpx;
			background: #f45c47;
			color: #FFF;
			text-align: center;
			line-height: 50rpx;
		}

		.box-3-1 {
			width: 97%;
			height: 95%;
			border: 1rpx #ffe07d solid;
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ffe07d;
			border-radius: 15rpx;

			.box-3-2 {
				width: 98%;
				height: 97%;
				border: 1rpx #ffe07d solid;
				margin: auto;
				background: white;
				border-radius: 15rpx;

				.box-3-2-text {
					// margin-top: 40rpx;
				}

				margin: 10rpx 0 10rpx 0;
				
				.list {
					.rowup {
						view {
							margin-left: 30rpx;
							padding: 10rpx 0 20rpx 0;
					
							text {
								color: #aaa;
								font-size: 26rpx;
								// display: inline-block;
								float: right;
								margin-right: 20rpx;
							}
						}
					}
				}
				
				@keyframes rowup {
					0% {
						-webkit-transform: translate3d(0, 0, 0);
						transform: translate3d(0, 0, 0);
					}
					100% {
						-webkit-transform: translate3d(0, -300upx, 0);
						transform: translate3d(0, -300upx, 0);
					}
				}
				 
				.list{
					width: 100%;
					position: relative;
					height: 180upx;
					overflow: hidden;
				}
				 
				.list .rowup{
					box-sizing: border-box;
					-webkit-animation: 10s rowup linear infinite normal;
					animation: 10s rowup linear infinite normal;
					position: relative;
				}
				
			}

			margin: 10rpx 0 10rpx 0;
		}
	}

	.box-4 {
		// height: 400rpx;
		width: 95%;
		border: 1rpx #f56248 solid;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f56248;

		.box-4-btn {
			width: 200rpx;
			height: 60rpx;
			// border: 1rpx #ffe07d solid;
			border-top: 2rpx #ffe07d solid;
			border-left: 2rpx #ffe07d solid;
			border-right: 2rpx #ffe07d solid;
			border-radius: 40rpx;
			position: relative;
			top: -30rpx;
			left: 240rpx;
			background: #f45c47;
			color: #FFF;
			text-align: center;
			line-height: 50rpx;
		}

		.box-4-1 {
			width: 97%;
			height: 95%;
			border: 1rpx #ffe07d solid;
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #ffe07d;
			border-radius: 15rpx;

			.box-4-2 {
				width: 98%;
				height: 97%;
				border: 1rpx #ffe07d solid;
				margin: auto;
				background: white;
				border-radius: 15rpx;

				.view-item {
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 0 30rpx;
					margin-bottom: 20rpx;
					position: relative;

					image {
						position: absolute;
						right: 75rpx;
						width: 20rpx;
						height: 15rpx;
					}

					.text-label {
						width: 160rpx;
						font-size: 32rpx;
						font-weight: 400;
						color: #333333;
					}

					/deep/.u-input {
						background-color: #F6F6F6;

						&.u-border {
							border-color: #F6F6F6 !important;
						}
					}

					/deep/.ice-selector {
						flex-grow: 1;
						flex-shrink: 1;
						height: 80rpx;
						background: #F6F6F6;
						border-radius: 10rpx;
						padding: 0 20rpx;

						.input {
							height: 80rpx;
							line-height: 80rpx;
						}
					}
				}
				
				.baoming {
					width: 500rpx;
					height: 80rpx;
					border-radius: 40rpx;
					background: #f45c47;
					margin: auto;
					margin-top: 20rpx;
					color: #FFF;
					text-align: center;
					line-height: 80rpx;
				}

				.box-4-2-text {
					// margin-top: 40rpx;
				}

				margin: 10rpx 0 10rpx 0;
			}

			margin: 10rpx 0 10rpx 0;
		}
	}
</style>
