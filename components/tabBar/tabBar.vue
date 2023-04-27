<template>
	<view class="com-tabbar">
		<!-- 导航栏内容 -->
			<view class="tabbar-content" :style="setTabBarStyle()">
				<view class="com-tabbar-left com-tabbar-cell" v-if="$slots.left">
					<slot name="left"></slot>
				</view>
				<view class="com-tabbar-center com-tabbar-cell"
					:style="$slots.left? 'flex:5':'margin-left:25px;flex:8;'">
					<text v-if="title != ''">{{ title }}</text>
					<slot name="center"></slot>
				</view>
				<view class="com-tabbar-right com-tabbar-cell">
					<slot name="right"></slot>
				</view>
			</view>
		
		<!-- 导航栏填充 -->
		<view class="tabbar-content-fill" v-show="isFill"></view>
		<!-- 菜单栏适配 -->
		<view class="tabbar-content-menu-bar" v-show="menuFill && !isFill"></view>
		<view class="tabbar-content-menu-bar-fill" v-show="menuFill && !isFill"></view>
	</view>
</template>

<script>
	export default {
		name: "tabBar",
		props: {
			color: {
				type: String,
				default: '#000'
			},
			backgroundColor: {
				type: String,
				default: '#fff'
			},
			isFill: { // 生成一个元素防止导航栏引起塌陷
				type: Boolean,
				default: false
			},
			menuFill: { //填充手机端的菜单那栏区域
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ""
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			maxTop: { //如果背景透明，设置透明度
				type: Number,
				default: 200
			}
		},
		data() {
			return {

			};
		},
		created() {},
		mounted() {
			console.log("~~~~~~~~~~~~~~~", this.$slots)
		},
		methods: {
			setTabBarStyle() {
				let bg = ""
				if (this.backgroundColor == 'transparent') {
					let opacity = this.scrollTop >= this.maxTop ? 1 : (this.scrollTop / this.maxTop)
					bg = 'background-color:rgba(255,255,255,' + opacity + ');'
				} else {
					bg = "background-color:" + this.backgroundColor + ';'
				}
				let color = ''
				if ((this.backgroundColor == 'transparent' || this.color == '#fff') && this.scrollTop >= this.maxTop) {
					color = 'color: #000;'
				} else {
					color = 'color:' + this.color + ';'
				}
				return bg + color
			}
		}
	}
</script>

<style lang="scss" scoped>
	.com-tabbar {
		width: 100%;

		.tabbar-content-fill {
			width: 100%;
			height: calc(44px + var(--status-bar-height));
		}

		.tabbar-content-menu-bar-fill {
			height: var(--status-bar-height);
			width: 100%;
			background-color: #fff;
		}
	}

	.tabbar-content-menu-bar {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #fff;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.tabbar-content {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: calc(44px + var(--status-bar-height));
		padding-top: var(--status-bar-height);
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		font-size: 28rpx;
		// color: #3d3d3d;
	}

	.com-tabbar-left {
		flex: 2;
		padding-left: 50rpx;
	}

	.com-tabbar-center {
		flex: 5;
		justify-content: center;
		font-weight: 600;
		font-size: 32rpx;
	}

	.com-tabbar-right {
		flex: 2;
		padding-right: 50rpx;
		justify-content: flex-end;
	}

	.com-tabbar-cell {
		height: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
</style>
