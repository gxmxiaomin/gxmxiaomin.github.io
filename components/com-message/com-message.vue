<template>
	<view class="com-view">
		<view class="com-line" @longpress="onLongPress" :class="{'active':pickerUserIndex==index}" :data-index="index"
		 v-for="(item,index) in list" :key="item.userName" @click="$emit('goView', item)">
			<view class="com-line-left">
				<image :src="item.userInfo.headUrl" mode=""></image>
				<view class="user-info">
					<text class="user-name message-line-1"> {{ item.userInfo.nickName }} </text>
					<view class="user-message message-line-1">
						<text style="color: #00aaff;" v-show="item.unread_num>0">[未读]</text>
						<text style="color: #222222;" v-show="item.unread_num<=0">[已读]</text>
						<text style="margin-left: 10rpx;" v-if="item.payload.bodies[0].type==='txt'"> {{ item.text }} </text>
						<text style="margin-left: 10rpx;" v-if="item.payload.bodies[0].type==='img'"> [图片消息] </text>
						<text style="margin-left: 10rpx;" v-if="item.payload.bodies[0].type==='audio'"> [语音消息] </text>
					</view>
				</view>
			</view>
			<view class="com-line-right">
				<text v-if="item.unread_num>0"> {{item.unread_num}} </text>
			</view>
		</view>

		<view class="defalt-show" v-show="list.length < 1">
			<text>暂无好友</text>
		</view>

		<view class="shade" v-show="showShade" @tap="hidePop">
			<view class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu" :data-index="index">{{item}}</view>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		name:"com-message",
		props:{
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
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["收藏", "删除"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1,
			};
		},
		created() {
			this.getListData();
			this.getWindowSize();

			// #ifdef H5
			document.onLong = function(e) {
				var e = e || window.event;
				e.preventDefault();
			};
			// #endif
			this.popupso = false
		},
		methods:{
			// /* 列表触摸事件 */
			// listTap() {
			// 	/* 因弹出遮罩问题，所以需要在遮罩弹出的情况下阻止列表事件的触发 */
			// 	if (this.showShade) {
			// 		return;
			// 	}

			// 	console.log("列表触摸事件触发")
			// },
			/* 获取列表数据 */
			getListData() {
				let list = [];
				for (let i = 0; i < 20; i++) {
					list.push({
						"name": `第${i+1}个用户`,
						"time": '5月20日',
						"info": `这是第${i+1}个用户的聊天信息`
					})
				}
				this.userList = list;
			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"witdh": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
			/* 长按监听 */
			onLongPress(e) {
				let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index];

				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (touches.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-touches.clientY}px;`;
				} else {
					style = `top:${touches.clientY}px;`;
				}
				if (touches.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh-touches.clientX}px`;
				} else {
					style += `left:${touches.clientX}px`;
				}

				this.popStyle = style;
				this.pickerUserIndex = Number(index);
				console.log("点击的目标下标", this.pickerUserIndex)
				this.showShade = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPop = true;
					}, 10);
				});
			},
			/* 隐藏弹窗 */
			hidePop() {
				this.showPop = false;
				this.pickerUserIndex = -1;
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},
			/* 选择菜单 */
			pickerMenu(e) {
				let index = Number(e.currentTarget.dataset.index);
				console.log(`第${this.pickerUserIndex+1}个用户,第${index+1}个按钮`);

				switch(index) {
					case 0:
						console.log("收藏成功")
						break
					case 1:
						this.delMessage(this.pickerUserIndex, index)
						console.log("删除成功")
						break
				}

				// uni.showToast({
				// 	title: `第${this.pickerUserIndex+1}个用户,第${index+1}个按钮`,
				// 	icon: "none",
				// 	mask: true,
				// 	duration: 600
				// });

				/*
				 因为隐藏弹窗方法中会将当前选择的用户下标还原为-1,
				 如果行的菜单方法存在异步情况，请在隐藏之前将该值保存，或通过参数传入异步函数中
				 */
				// this.hidePop();
			},
			async delMessage(index, type) {
				let message = this.list[index]
				// this.list.splice(index, 1)
				this.$emit("delectMessage", index)
				console.log("删除的", index, type, message)
				let groupType = "singleChat"
				if( message.payload.type=="groupchat") groupType = 'groupChat'
				const res = await this.IM.deleteSession(message.userName, groupType, true)
				console.log("删除消息的结果为", res)
				this.$refs.uToast.show({
					message: '删除成功',
					type: 'success'
				})
			}
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
}

	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;

		.pop {
			position: fixed;
			z-index: 101;
			width: 200upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);

			&.show {
				transform: scale(1, 1);
			}

			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;

				&:active {
					background-color: #f3f3f3;
				}
			}
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
	border-bottom: 1rpx solid rgba(53, 53, 53, 0.4);

	.com-line-right {
		width: 50rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		text {
			height: 30rpx;
			min-width: 30rpx;
			border-radius: 30rpx;
			text-align: center;
			line-height: 30rpx;
			background-color: #ff2c07;
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
			.user-name {
				font-size: 30rpx;
				color: #333333;

			}
			.user-message {
				font-size: 26rpx;
				color: #666666;
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
