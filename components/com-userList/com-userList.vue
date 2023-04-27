<template>
	<view class="com-view">
		<view class="com-top-btn">
			<view class="com-btn" :class="{'active-btn': currentBtn==0}" @click="$emit('changeBtn', 0)">
				<text>好友</text>
			</view>
			<view class="com-btn" :class="{'active-btn': currentBtn==1}" @click="$emit('changeBtn', 1)">
				<text>关注</text>
			</view>
			<view class="com-btn" :class="{'active-btn': currentBtn==2}" @click="$emit('changeBtn', 2)">
				<text>粉丝</text>
			</view>
			<view class="com-btn" :class="{'active-btn': currentBtn==3}" @click="$emit('changeBtn', 3)">
				<text>群聊</text>
			</view>
		</view>

		<!-- 好友----------好友 -->
		<view v-if="false" class="">
			<view class="friend-1" v-for="item in list" :key="item.id"
			 @click="$emit('goChart', item)">
				<image :src="item.headUrl" mode=""></image>
				<text> {{ item.nickName }} </text>
				<!-- <image src="../../static/images/huangguan.png" mode="" v-show="false"></image> -->
				<view style="margin: auto; width: 90%;height: 1rpx;background: #f6f4f7;"></view>
			</view>
			<view class="friend-1-fill" v-if="list.length < 1">
				<text>暂无好友</text>
			</view>
		</view>

		<view v-if="currentBtn == 3" class="">

			<view class="group-chat-1" v-for="item in list" :key="item.id" @click="intoGroupView(item)">
				<image style="border-radius: 50%;" :src="item.headUrl" mode=""></image>
				<text> {{ item.name }} </text>
				<view style="margin: auto; width: 90%;height: 1rpx;background: #f6f4f7;"></view>
			</view>

			<view class="friend-1-fill" v-if="list.length < 1">
				<text>暂无群聊</text>
			</view>

		</view>

		<view v-else class="com-line" v-for="item in list" :key="item.id" @click="$emit('goDetial', item)">
			<view class="com-line-left">
				<image :src="item.headUrl" mode=""></image>
				<view class="user-info">
					<text class="message-line-1 com-user-name"> {{ item.nickName }} </text>
					<text class="is-friend"> {{ item.isFriend==0? '':'好友' }} </text>
				</view>
			</view>
			<view class="com-line-right" @click.stop="$emit('goChart', item)">
				<text> 私信 </text>
			</view>

			<view class="defalt-show" v-show="list.length < 1">
				<text>暂无好友</text>
			</view>
		</view>

		<!-- <view class="defalt-show" v-show="list.length < 1">
			<text>暂无好友</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		name:"com-userList",
		props:{
			currentBtn:{
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default: [],
				required: true,
				validator: function(value) {
					return Array.isArray(value)
				}
			}
		},
		data() {
			return {

			};
		},
		methods:{
			intoGroupView(item){
				console.log("点击的群聊", item)
				let data = {
					username: item.groupId,
					nickname: item.name,
					avatarurl: item.headUrl||"https://img2.baidu.com/it/u=69251733,2635461543&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
				}
				console.log(data)
				uni.navigateTo({
					url: "/pages/group-room/group-room?data=" + encodeURIComponent(JSON.stringify(data))
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
.com-view {
	width: 100%;
	/* #ifdef H5 */
	min-height: calc(100vh - 44px - 50px - var(--status-bar-height));
	/* #endif */
	/* #ifndef H5 */
	min-height: calc(100vh - 44px - var(--status-bar-height));
	/* #endif */
	position: relative;
	box-sizing: border-box;
	padding: 0 20rpx;

	.group-chat-1 {
		margin-bottom: 40rpx;

		image {
			&:nth-child(1) {
				width: 80rpx;
				height: 80rpx;
				vertical-align: middle;
				// margin-left: 15rpx;
				margin: 0 15rpx;
			}

			&:nth-child(3) {
				width: 15rpx;
				height: 20rpx;
				float: right;
				margin-right: 40rpx;
				margin-top: 40rpx;
			}

		}
	}

	.friend-1 {
		margin-bottom: 40rpx;

		image {
			&:nth-child(1) {
				width: 80rpx;
				height: 80rpx;
				vertical-align: middle;
				// margin-left: 15rpx;
				margin: 0 15rpx;
			}

			&:nth-child(3) {
				width: 30rpx;
				height: 30rpx;
				// margin-top: 50rpx;

			}

		}
	}

}

.com-top-btn {
	width: 100%;
	display: flex;
	box-sizing: border-box;
	padding: 30rpx 30rpx;
	// margin-bottom: 20rpx;
	.com-btn {
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 60rpx;
		font-size: 28rpx;
		color: #000;
		background-color: rgba(238, 238, 238, 0.6);
		margin-right: 20rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
	}
	.active-btn {
		color: #fff;
		background-color: #53a6f9;
	}
}

.com-line {
	width: 100%;
	height: 120rpx;
	box-sizing: border-box;
	padding: 0 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid rgba(211, 211, 211, 0.4);
	.com-line-right {
		width: 150rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text {
			height: 50rpx;
			width: 100rpx;
			border-radius: 50rpx;
			text-align: center;
			line-height: 50rpx;
			background-color: #55aaff;
			color: #fff;
			font-size: 24rpx;
		}
	}
	.com-line-left {
		flex: 1;
		display: flex;
		image {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
		}
		.user-info {
			flex: 1;
			height: 90rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.message-line-1 {
				width: 100%;
				font-family: PingFang-SC-Medium;
				font-weight: Medium;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				line-clamp: 1;
				-webkit-box-orient: vertical
			}
			.com-user-name {
				font-size: 30rpx;
				font-family: PingFang-SC-Medium;
				font-weight: Medium;
				color: #333333;
			}
			.is-friend {
				font-size: 24rpx;
				background: linear-gradient(to right,  rgba(199, 166, 84, 1), rgba(199, 166, 84, 1));
				-webkit-background-clip: text;
				color: transparent;
			}
		}
	}
}

.defalt-show {
	width: 100%;
	min-height: 500rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 35rpx;
	font-family: PingFang-SC-Medium;
	color: rgba(93, 93, 93, 0.5);
}
</style>
