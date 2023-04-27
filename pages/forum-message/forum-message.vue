<template>
	<view>
		<ice-navbar>
			<view class="view-tabs">
				<u-tabs class="top-tabs" ref="u_tab1" lineColor="#4A9AFF"
					:activeStyle="{padding:'5rpx',color: '#4A9AFF'}" :inactiveStyle="{padding:'5rpx', color: '#666666'}"
					:list="tab_list">
				</u-tabs>
			</view>
		</ice-navbar>

		<view class="view-list">
			<view class="view-item">
				<view class="view-top">
					<view class="view-user">
						<image src="../../static/logo.png" mode=""></image>
						<view class="view-nickname">
							<text class="text-name">-今天也要多喝水-</text>
							<text>10-9 13:28</text>
						</view>
					</view>

					<view class="view-reply">
						回复<text> @是未未呢：哪有，小辫都扎起来了</text>
					</view>
				</view>
				<view class="view-center">
					<text>@是未未呢：笑死了，贵娃略显潦草</text>
					<view class="view-posts">
						<image src="../../static/logo.png" mode=""></image>
						<view class="view-right">
							<text class="text-name">@是未未呢</text>
							<text>长草娃娃千万不能没有水，这个时候就可以放 出实验室门口的小辫娃娃了</text>
						</view>
					</view>
				</view>
			</view>
			<view class="view-item">
				<view class="view-top">
					<view class="view-user">
						<image src="../../static/logo.png" mode=""></image>
						<view class="view-nickname">
							<text class="text-name">-今天也要多喝水-</text>
							<text>10-9 13:28</text>
						</view>
					</view>
					<view class="view-reply">
						<text>点赞了你的帖子</text>
					</view>
				</view>
				<view class="view-center">
					<view class="view-posts">
						<image src="../../static/logo.png" mode=""></image>
						<view class="view-right">
							<text class="text-name">@是未未呢</text>
							<text>长草娃娃千万不能没有水，这个时候就可以放 出实验室门口的小辫娃娃了</text>
						</view>
					</view>
				</view>
			</view>
			<view class="view-item">
				<view class="view-top">
					<view class="view-user">
						<view class="view-nickname">
							<text class="text-name">-今天也要多喝水-</text>
							<text>10-9 13:28</text>
						</view>
						<view class="view-reply">
							<text>关注了你</text>
						</view>
					</view>
				</view>
			</view>
			<view class="view-item">
				<view class="view-top">
					<view class="view-user">
						<image src="../../static/logo.png" mode=""></image>
						<view class="view-nickname">
							<text class="text-name">-今天也要多喝水-</text>
							<text>10-9 13:28</text>
						</view>
					</view>
					<view class="view-reply">
						<text>转发了你的帖子</text>
					</view>
				</view>
				<view class="view-center">
					<view class="view-posts">
						<image src="../../static/logo.png" mode=""></image>
						<view class="view-right">
							<text class="text-name">@是未未呢</text>
							<text>长草娃娃千万不能没有水，这个时候就可以放 出实验室门口的小辫娃娃了</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab_list: [{
						name: '全部消息',
					},
					{
						name: '点赞',
					},
					{
						name: '评论',
					},
					{
						name: '关注',
					},
					{
						name: '转发',
					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.view-list {

		.view-item {
			background-color: #FFFFFF;
			padding-bottom: 30rpx;
			margin-top: 30rpx;

			.view-top {
				padding: 30rpx;
				background-color: #FFFFFF;

				.view-user {
					display: flex;
					align-items: center;

					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}

					.view-nickname {
						margin-left: 20rpx;
						display: flex;
						flex-direction: column;
						text-align: left;
					}
				}

				.view-reply {
					margin-top: 20rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 21rpx;

					text {
						color: #333333;
					}
				}
			}

			.view-center {
				background-color: #F7F7F7;
				padding: 30rpx;

				.view-posts {
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					background-color: #FFFFFF;
					padding: 20rpx;

					image {
						width: 140rpx;
						height: 140rpx;
					}

					.view-right {
						display: flex;
						flex-direction: column;
						margin-left: 21rpx;

						.text-name {
							font-size: 28rpx;
							font-weight: 500;
							color: #333333;
							line-height: 21rpx;
						}

						text {
							margin-top: 19rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #666666;
							line-height: 30rpx;
							max-width: 450rpx;
						}
					}
				}
			}
		}
	}
</style>
