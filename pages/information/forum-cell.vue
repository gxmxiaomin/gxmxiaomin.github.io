<template>
	<view class="com-list-cell" >

		<!-- 只有两张封面 -->
		<view class="com-cell-one" v-if="isText&&videoCover.length == 2" @click="clickgo(item.id,item.userId,item.which)">
			<view class="com-cell-one-title">
				<text>{{ title }}</text>
			</view>
			<!-- @click.stop="$showImg(videoCover, videoCover[0])" -->
			<image :src="videoCover[0]" mode=""></image>
			<view class="com-cell-one-bottom">
				<text> {{setValue('nickName')}} </text>
				<text style="margin-left: 10px;">{{ comment }}评论</text>
				<!-- {{setTime(item.createTime)}} -->
				<text style="margin-left: 10px;">{{ createTime }}</text>
				<text style="margin-left: 10px;">{{position}}</text>
				
			</view>
			<view v-if="item.isMe == 1" class="com-action-cell-0" @tap.stop="del(item.id)">
				<u-icon name="trash" size="20"></u-icon>
			</view>
			
		</view>

		<!-- 一张封面 -->
		<view class="com-cell-two" v-if="isText&&videoCover.length==1" @click="clickgo(item.id,item.userId,item.which)">
			<view class="com-cell-two-title">
				<text>{{ title }}</text>
			</view>
			<view class="img">
				<img :src="videoCover[0]" alt="">
			</view>
			<view class="com-cell-two-bottom">
				<text v-if="position == '' || position == null">每日经济新闻</text>
				<text style="margin-left: 20rpx;">{{ comment }}评论</text>
				<text style="margin-left: 20rpx;">{{ createTime }}</text>
				<text style="margin-left: 10px;">{{position}}</text>
				
			</view>

			<view v-if="item.isMe == 1" class="com-action-cell-1" @tap.stop="del(item.id)">
				<u-icon name="trash" size="20"></u-icon>
			</view>
		</view>

		<!-- 没有封面的 -->
		<view class="com-cell-three" v-if="isText&&videoCover.length==0" @click="clickgo(item.id,item.userId,item.which)">
			<view class="com-cell-three-top">
				<view class="header-img">
					<img :src="headUrl" alt="">
				</view>
				<text class="com-user-name">{{ nickName }}</text>
				<view class="com-user-info">
					<text>{{ createTime }}</text>
					<!-- <text style="margin-left: 10px;">{{position}}</text> -->
					<text style="margin-left: 20rpx;">{{ city }}</text>
				</view>
				<view class="com-dync-see-num">
					<u-icon name="eye" size="18"></u-icon>
					<text style="margin-left: 20rpx;">{{ browse }}</text>
				</view>
			</view>
			<view class="com-cell-three-title">
				<text>{{ title }}</text>
			</view>
			<view v-if="item.isMe == 1" class="com-action-cell" @tap.stop="del(item.id)">
				<u-icon name="trash" size="20"></u-icon>
			</view>
			<view class="com-cell-three-bottom" v-if="false">
				<view class="com-action-cell">
					<u-icon name="share-square" size="20"></u-icon>
					<text class="com-action-num"> {{ forward }} </text>
				</view>
				<view class="com-action-cell">
					<u-icon name="star" size="20" v-if="!show"></u-icon>
					<u-icon name="star-fill" color='#ddb821' size="20" v-else></u-icon>
					<text class="com-action-num"> {{ collection }} </text>
				</view>
				<view class="com-action-cell">
					<u-icon name="more-circle" size="20"></u-icon>
					<text class="com-action-num"> {{ comment }} </text>
				</view>
				<view class="com-action-cell">
					<u-icon name="thumb-up" size="20" v-if="!dian"></u-icon>
					<u-icon name="thumb-up-fill" size="20" color='#ddb821' v-else></u-icon>
					<text class="com-action-num"> {{ fabulous }} </text>
				</view>
			</view>
		</view>

		<!-- 三张封面 -->
		<view class="com-cell-four" v-if="isText&&videoCover.length >= 3 " @click="clickgo(item.id,item.userId,item.which)">
			<view class="com-cell-four-title">
				<text>{{ title }}</text>
			</view>
			<view class="com-cell-four-imgList">
				<view class="com-cell-four-img" v-for="(item, imgIndex) in item.resource" :key="imgIndex">
					<image  :src="item" mode=""></image>
				</view>
			</view>

			<view v-if="item.isMe == 1" class="com-action-cell-0" @tap.stop="del(item.id)">
				<u-icon name="trash" size="20"></u-icon>
			</view>
		</view>

		<!-- 视频文件 -->
		<view class="com-cell-one" v-if="!isText" @click="clickgo(item.id,item.userId,item.which)">
			<view class="com-cell-one-title">
				<text>{{ title }}</text>
			</view>
			<view class="img-box">
				<image :src="setValue('videoCover')" mode=""></image>
				<u-icon name="play-right-fill" color="#fff" class="video-icon" size="36"></u-icon>
			</view>
			<!-- <video :src="setValue('videoCover')"></video> -->
			<view class="com-cell-one-bottom">
				<text> {{setValue('nickName')}} </text>
				<text style="margin-left: 10px;">{{ comment }}评论</text>
				<text style="margin-left: 10px;">{{ createTime }}</text>
				<text style="margin-left: 10px;">{{position}}</text>
			</view>

			<view v-if="item.isMe == 1" class="com-action-cell-0" @tap.stop="del(item.id)">
				<u-icon name="trash" size="20"></u-icon>
			</view>
		</view>

        <view class="dislike" @click="dislike(item)" v-if="item.isMe != 1" >
			<image src="../../static/images/more (2).png" mode="" style="width: 25rpx;height: 25rpx;margin-left: 40rpx;"></image>
		</view>
			<view>
				<u-popup :show="popup" @close="close" :round="10">
		            <view style="margin: 40rpx 100rpx;">
		                <view class="dont_lick" @click="delItem(item,index)">减少此类型文章</view>
						<view class="dont_lick">内容重复</view>
						<view class="dont_lick">内容质量差</view>
		            </view>
				</u-popup>
			</view>
	</view>
</template>

<script>
	export default {
		name: "forum-cell",
		props: {
			item: {
				type: Object,
				default: {},
				required: true,
				validator: function(value) {
					return true
				}
			},
		    index:{
				default:''
			},
			isMe: {
				type: Boolean,
				default: false
			},
			footerShow: {
				type: Boolean,
				default: true
			},
			keys: {
				type: Object,
				default: function() {
					return {}
				}
			},
			isText: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
			
            popup : false,
			};
		},
		mounted() {
			
				console.log("------------------拿到的item---------",this.item);		
			
		},
		computed: {
			videoCover() {
				let value = ""
				if (this.keys.videoCover) value = this.item[this.keys.videoCover]
				else value = this.item.videoCover
				if (Array.isArray(value)) return value
				if (value == '' || value == null) return []
				return value.split(',')

			},
			comment() {
				if (this.keys.comment) return this.item[this.keys.comment] || 0
				return this.item.comment || 0
			},
			createTime() {
				if (this.keys.createTime) return (this.item[this.keys.createTime] || '').slice(0, 10)
				return (this.item.createTime || '').slice(0, 10)
			},
			title() {
				if (this.keys.title) return this.item[this.keys.title]
				return this.item.title
			},
			headUrl() {
				if (this.keys.headUrl) return this.item[this.keys.headUrl]
				return this.item.headUrl
			},
			nickName() {
				if (this.keys.nickName) return this.item[this.keys.nickName]
				return this.item.nickName
			},
			city() {
				if (this.keys.city) return this.item[this.keys.city]
				return this.item.city
			},
			browse() {
				if (this.keys.browse) return this.item[this.keys.browse] || 0
				return this.item.browse || 0
			},
			forward() {
				if (this.keys.forward) return this.item[this.keys.forward] || 0
				return this.item.forward || 0
			},
			collection() {
				if (this.keys.collection) return this.item[this.keys.collection] || 0
				return this.item.collection || 0
			},
			fabulous() {
				if (this.keys.fabulous) return this.item[this.keys.fabulous] || 0
				return this.item.fabulous || 0
			},
			dian() {
				if (this.keys.dian) return this.item[this.keys.dian]
				return this.item.dian
			},
			show() {
				if (this.keys.show) return this.item[this.keys.show]
				return this.item.show
			},
			position() {
				if (this.keys.position) return this.item[this.keys.position]
				return this.item.position
			}
		},

		methods: {
			async delItem(item) {
				let res=await this.http.post('/app/forum/home/dislikeInvitation',{
					talkId:item.id
				})
				if(res.code==200){
				   this.$emit('clickDslike',item)
				}
				this.popup = false;
				// let dislike = []
				// console.log(item);
				// uni.getStorage({
				// 	key:"dislike",
				// 	success: (res) => {
				// 		dislike = res.data
				// 	}
				// })
				// dislike.push(item.id)
				// uni.setStorageSync("dislike",dislike)
				// console.log(dislike);
				// this.popup = false;
			    // this.$emit('clickDslike')
				
			},
			del(id) {
				console.log(id)
				this.$emit('clickDelete', id);
			},
			dislike( ) {
				this.popup = true
			},
			close() {
				this.popup = false
			},
			// 跳转详情
			clickgo(a, b, c) {
				console.log(a, b, c)
				if (!this.isText) {
					uni.navigateTo({
						url: '../playVideo/playVideo?id=' + a + '&targetId=' + b
					})
				} else {
					uni.navigateTo({
						url: '../post-details-article/post-details-article?id=' + a + '&targetId=' + b
					})
				}
				// if (c == 'school') {
				// 	console.log('11111111111111')
				// 	if (!this.isText) {
				// 		uni.navigateTo({
				// 			url: '../playVideo/playVideoSchool?id=' + a + '&targetId=' + b
				// 		})
				// 	} else {
				// 		uni.navigateTo({
				// 			url: '../post-details-article/post-details-articleJy?id=' + a + '&targetId=' + b
				// 		})
				// 	}
				// } else {
				// 	console.log('222222222222222')
				// 	if (!this.isText) {
				// 		uni.navigateTo({
				// 			url: '../playVideo/playVideo?id=' + a + '&targetId=' + b
				// 		})
				// 	} else {
				// 		uni.navigateTo({
				// 			url: '../post-details-article/post-details-article?id=' + a + '&targetId=' + b
				// 		})
				// 	}
				// }
			},
			setValue(key) {
				if (this.keys[key]) return this.item[this.keys[key]]
				return this.item[key]
			},
			showImg(e, b) {
				uni.previewImage({
					current: b, //预览图片的下标
					urls: [e] //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dont_lick {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 2rpx solid #e6e6e6;
		color: #999999;
		
	}
	.img_del {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		width: 80rpx;
		height: 80rpx;
	}
	.com-list-cell {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding: 25rpx 20rpx  40rpx 20rpx;
		border-bottom: 1rpx solid rgba(102, 102, 102, 0.1);
		.dislike {
			position: absolute;
			right: 30rpx;
			bottom: 2rpx;
			width: 80rpx;
			height: 40rpx;
			
		}
	}

	.com-default {
		width: 100%;
		min-height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(130, 130, 130, 0.8);
		font-size: 36rpx;
	}

	.bottom-line {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: rgba(190, 190, 190, 0.8);
	}

	.com-cell-one {
		width: 100%;

		.com-cell-one-title {
			overflow: hidden;
			letter-spacing: 1rpx;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			-webkit-box-orient: vertical;
			font-size: 32rpx;
			line-height: 40rpx;
			font-weight: bold;
			font-family: PingFang-SC-Bold;
			color: #333333;
		}

		image,
		video {
			width: 100%;
			margin-top: 10rpx;
		}

		.img-box {
			position: relative;
		}

		.video-icon {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.com-cell-one-bottom {
			margin-top: 20rpx;
			display: flex;
			width: 100%;
			color: #666666;
			font-size: 24rpx;
			font-family: PingFang-SC-Medium;
		}

		.com-action-cell-0 {
			position: relative;
			margin-left: 93%;
		}
	}

	.com-cell-two {
		width: 100%;
		height: 150rpx;
		position: relative;

		.com-cell-two-title {
			width: 410rpx;
			position: absolute;
			line-height: 40rpx;
			top: 0;
			left: 0;
			font-size: 30rpx;
			color: #333333;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			-webkit-box-orient: vertical;
		}

		.img {
			position: absolute;
			right: 0;
			top: 0;
			width: 224rpx;
			height: 140rpx;
			border-radius: 10rpx;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			top: -20rpx;

			image {
				width: 100%;
			}

			img {
				width: 100%;
				height: auto;
			}
		}

		.com-cell-two-bottom {
			width: 410rpx;
			display: flex;
			position: absolute;
			bottom: 0rpx;
			left: 0;
			font-size: 24rpx;
			color: #666666;
			font-family: PingFang-SC-Medium;
		}

		.com-action-cell-1 {
			position: relative;
			top: 130rpx;
			margin-left: 93%;
		}
	}

	.com-cell-three {
		.com-cell-three-top {
			position: relative;
			width: 100%;
			height: 100rpx;
			box-sizing: border-box;
			padding-bottom: 12rpx;

			.header-img {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				overflow: hidden;
				position: absolute;

				image {
					width: 100%;
				}

				img {
					width: 100%;
					height: auto;
				}
			}

			.com-user-name {
				position: absolute;
				top: 5rpx;
				left: 120rpx;
				font-size: 32rpx;
				font-family: PingFang-SC-Medium;
				color: #333333;
			}

			.com-user-info {
				position: absolute;
				bottom: 15rpx;
				left: 120rpx;
				font-size: 24rpx;
				color: #999999;
				font-family: PingFang-SC-Medium;
			}

			.com-dync-see-num {
				position: absolute;
				max-width: 180rpx;
				min-width: 100rpx;
				right: 0;
				top: 24rpx;
				display: flex;
				color: #666666;
				font-size: 24rpx;
				font-family: PingFang-SC-Medium;
			}
		}

		.com-cell-three-title {
			margin-top: 20rpx;
			color: #333333;
			font-family: PingFang-SC-Medium;
			font-size: 32rpx;
			font-weight: bold;
		}
      .com-action-cell {
      			position: relative;
      			margin-left: 93%;
      }
      	
		.com-cell-three-bottom {
			margin-top: 24rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.com-action-num {
					margin-left: 10rpx;
					font-size: 28rpx;
				}
			
		}
	}

	.com-cell-four {
		width: 100%;
		position: relative;

		.com-cell-four-title {
			font-size: 32rpx;
			font-weight: bold;
			letter-spacing: 1rpx;
			font-family: PingFang-SC-Bold;
			color: #333333;
			overflow: hidden;
			text-overflow: -o-ellipsis-lastline;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			-webkit-box-orient: vertical;
		}

		.com-cell-four-imgList {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-around;

			.com-cell-four-img {
				width: 226rpx;
				height: 226rpx;
				border-radius: 10rpx;
				overflow: hidden;

				img {
					height: 100%;
					width: auto;
				}

				image {
					height: 100%;
					width: 100%;
				}
			}
		}

		.com-action-cell-0 {
			position: relative;
			margin-left: 93%;
		}
	}

	.com-cell-video {
		width: 100%;
	}
</style>
