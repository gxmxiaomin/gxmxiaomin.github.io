<template>
	<view>
		<view class="box">
			<view class="score">
				<view>{{ this.scores }}</view>
				<text>分</text>
				<view class="count">{{ this.lent }}条评论</view>
				<view class="fen">
					<image
						:src="this.a >= 1 ? '../../static/images/shoucangxiao-cheng.png' : '../../static/images/shoucangxiao-hei.png' ">
					</image>
					<image
						:src="this.a >= 2 ? '../../static/images/shoucangxiao-cheng.png' : '../../static/images/shoucangxiao-hei.png' ">
					</image>
					<image
						:src="this.a >= 3 ? '../../static/images/shoucangxiao-cheng.png' : '../../static/images/shoucangxiao-hei.png' ">
					</image>
					<image
						:src="this.a >= 4 ? '../../static/images/shoucangxiao-cheng.png' : '../../static/images/shoucangxiao-hei.png' ">
					</image>
					<image
						:src="this.a >= 5 ? '../../static/images/shoucangxiao-cheng.png' : '../../static/images/shoucangxiao-hei.png' ">
					</image>
				</view>
			</view>
			<view class="score-comment">
				<view>老师体贴(120)</view>
				<view>老师体贴(120)</view>
				<view>老师体贴(120)</view>
				<view>老师体贴(120)</view>
				<view>老师体贴(120)</view>
			</view>

			<!-- <view class="box-1" v-for="item in evaluatess">
				<image :src="item.headUrl" mode=""></image>
				<view class="box-1-text">
					<view>{{item.nickName}}</view>
					<view class="box-1-text2">
						<text>{{item.createTime}}</text>
						<text>来自{{item.city}}</text>
					</view>
				</view>
				<view class="contents">
					{{item.content}}
				</view>
				<view class="box-3">
					<view class="tb1">
						<image
							:src="item.sort == null ? '../../static/images/like.png' : '../../static/images/xihuan.png'"
							@tap="changeType(item.id)"></image>
						<text>{{item.praise}}</text>
					</view>
					<view class="tb1">
						<image src="../../static/images/xiaoxi.svg" mode=""></image>
						<text v-text="item.size == null ? '0' : item.size"> </text>
					</view>

					<view class="">
						<text v-text="item.size == null ? '回复(0)' : '回复('+ item.size +')'  "></text>
					</view>
				</view>

				<view class="huifus">
					<view class="view-coun" v-for="(i,index) in huifu">
						<view>{{i.name}}:</view>
						<view>{{i.content}}</view>
					</view>
				</view>



			</view>
			<view class="view-left">
				<view class="view-input">
					<input type="text" value="" v-model="pinglun" :placeholder="info" />
				</view>
				<button class="button-send u-reset-button" @click="sendNotic(userId)">发送</button>
			</view> -->
            <view v-show="!flag">
            		<u-loading-icon></u-loading-icon>
            	</view>
			<view class="view-content">
				<!-- <view class="view-content-a">
				</view> -->
				<view class="view-content-b" v-show="flag">
					<!-- <view class="view-summary">
						<text>评论 {{details.comment}}</text>
					</view> -->

					<view class="view-comment" v-for="(item,index) in evaluatess" :key="item.id">
						<view style="height: 120rpx;" class="view-top" >
							<image :src="item.headUrl" mode=""></image>
							<text style="font-size: 32rpx;font-weight: 600; color: #222;"> {{ item.nickName }}</text>
							<text class="time">{{formatItem(item.createTime)}}<text>来自{{item.city}}</text></text>
							<!-- <view class="dianzai">
								<image src="../../static/images/praise.png" mode="" @click="plGood(item)"></image>
								<u-icon name="thumb-up" size="20" @click="DownloadMethods(isShare,plGood(item))" v-show="item.isPraise==0"></u-icon>
								<u-icon name="thumb-up-fill" size="20" @click="DownloadMethods(isShare,plGood(item))" color='#ddb821' v-show="item.isPraise!=0"></u-icon>
								<text> {{ item.praise }} </text>
							</view> -->
						</view>
						<!-- 评论 -->
						<view style="font-size: 28rpx;">
							{{item.content}}
						</view>
						
						<view class="box-3">
							<view class="tb1">
								<image
									:src="item.sort == null ? '../../static/images/dianzan1_1.png' : '../../static/images/dianzan1.png'"
									@tap="changeType(item.id)"></image>
								<text>{{item.praise}}</text>
							</view>
							<view class="tb1" @click="DownloadMethods(isShare,openItem(item))" > 
								<image src="../../static/images/xiaoxi.svg" mode=""></image>
								<text> 
								{{ item.muSchoolComment&&item.muSchoolComment.length }}
								</text>
							</view>
							<view class="huifu" @tap="tapReply(item)">
								<text v-text="item.size == null ? '回复' : '回复('+ item.size +')'  "></text>
							</view>
						</view>
						
						<!-- <view class="message">
							<text
								@click="DownloadMethods(isShare,openItem(item))">{{ item.muSchoolComment&&item.muSchoolComment.length }}回复></text>
						</view> -->
						<!-- 回复的评论 -->
						<view class="replay-list" v-show="item.open != 'false'">
							<view class="replay-line" v-for="replay in (item.muSchoolComment||[])" :key="replay.id">
								<view class="replay-info">
									<image :src="replay.headUrl" mode=""></image>
									<text style="margin-left: 10rpx;">{{ replay.nickName }}</text>
									<text v-if="item.id != replay.replyId"> > {{ replay.userName }}</text>
								</view>
								<view class="replay-message" @click="tapReply(replay,item)">
									<text class="message-text">{{ replay.content }}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="view-tail">
						已经没有更多内容了～
					</view>
				</view>
			</view>

			<!-- 默认底部操作栏 -->
			<view class="footer-edit-fill"></view>
			<view class="footer-edit">
				<view class="edit-left" @click="DownloadMethods(isShare,editShow=true)">
					<input :placeholder="placeholder ==''? '评论...':placeholder" border="surround" disabled
						shape='circle' style="background-color: #f5f5f5;width: 350px;"></input>
				</view>
				<!-- <view class="edit-right"> -->
					<!-- <view class="right-cell" v-if="plText==''">
						<u-icon name="thumb-up" size="20" @click="DownloadMethods(isShare,good())" v-show="details.dian==null"></u-icon>
						<u-icon name="thumb-up-fill" size="20" @click="DownloadMethods(isShare,good())" color='#ddb821' v-show="details.dian!=null"></u-icon>
						<text> {{ details.fabulous }} </text>
					</view>
					<view class="right-cell" v-if="plText==''">
						<u-icon name="star" size="20" @click="DownloadMethods(isShare,collect())" v-show="details.shou==null"></u-icon>
						<u-icon name="star-fill" size="20" @click="DownloadMethods(isShare,collect())" color='#ddb821' v-show="details.shou!=null"></u-icon>
						<text>{{ details.shou==null? '收藏':'已收藏'}}</text>
					</view>
					<view class="right-cell" v-if="plText==''" @click="DownloadMethods(isShare, show=true)">
						<u-icon name="share" size="20"></u-icon>
						<text>分享</text>
					</view> -->

					<!-- <text class="send-btn" v-if="plText!=''">发送</text> -->
				<!-- </view> -->
			</view>
			<!-- 进行评论时候的底部栏 -->
			<u-popup :show="editShow" @close="close">
				<view class="edit-box">
					<u--textarea v-model="plText" count focus height='100px'
						:placeholder="placeholder ==''? '我来讲两句':placeholder" style="background-color: #f5f5f5;">
					</u--textarea>

					<view class="edit-btn">
						<view></view>
						<view class="edit-confirm" @click="DownloadMethods(isShare ,sendpl())">
							<text>发表</text>
						</view>
					</view>
				</view>
			</u-popup>
			<u-toast ref="uToast"></u-toast>


		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pevaluates: {
				type: Object,
				default: {},
				required: true,
				validator: function(value) {
					return true
				}
			}
		},
		data() {
			return {
				flag:true,
				images: 'https://img2.baidu.com/it/u=1572613686,938558453&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=400',
				evaluatess: [],
				scores: '0.0',
				lent: '0000',
				a: 0,
				info: '谨言慎行...',
				pinglun: '',
				itemId: 0,
				huifu: [{
						name: '张三',
						content: '回复内容'
					},
					{
						name: '李四',
						content: '回复内容'
					}
				],
				// 编辑框的显示
				editShow: false,
				plText: "",
				placeholder: '',
				parentForm: {},
				isShare: false,
				// 被回复的对象
				replayForm: {},
			};
		},

		created() {
			setTimeout(() => {
				console.log('1-1-1-1-1-1-1-1-1-1-1-1-evaluate接收到的参数', this.pevaluates)
				console.log(this.id)
				this.evaluatess = this.pevaluates.evaluate
				this.scores = this.pevaluates.score
				this.lent = this.pevaluates.evaluate.length
				this.scoresIoc(this.pevaluates.score)
			}, 0)
		},
		methods: {
			formatItem(item) {
				
				let data = new Date(item)
			
				let dataA = data.getTime()
				let newData = Date.now()
				let tem =  (newData - dataA)/(60*60*1000)
				if(tem>24) {
					let day = parseInt(tem/24)
					return day+'天前'
				}else{
					let hours = parseInt(tem)
					return  hours+"小时前"
				}
			},
			tapReply(item){
				this.replayEdit(item,item)
				this.editShow = true
			},
			close() {
				this.editShow = false
				this.placeholder = ''
			},
			openItem(item){
				if(item.open == 'false') {
					item.open = 'true'
				} else {
					item.open = 'false'
				}
			},
			replayEdit(replay, item) {
				console.log("要回复的对象", replay)
				this.placeholder = '@' + replay.userName
				this.replayForm = replay
				this.parentForm = item
			},
			sendNotic(id) {
				this.evaluate(id)
			},
			async evaluate(id) {
				console.log(id)
				const res = await this.http.get("/app/muSchoolComment/insert", {
					userId: id,
					content: this.pinglun
				})
				console.log(res)
			},
			scoresIoc(e) {
				console.log(e)
				if (e >= 0.5 && e <= 1) {
					this.a = 1;
					console.log(this.a)
					console.log("一颗星")
				} else if (e >= 1.5 && e <= 2) {
					this.a = 2;
					console.log(this.a)
					console.log("二颗星")
				} else if (e >= 2.5 && e <= 3) {
					this.a = 3;
					console.log(this.a)
					console.log("三颗星")
				} else if (e >= 3.5 && e <= 4) {
					this.a = 4;
					console.log(this.a)
					console.log("四颗星")
				} else if (e >= 4.5) {
					this.a = 5;
					console.log(this.a)
					console.log("五颗星")
				} else {
					this.a = 0;
					console.log(this.a)
					console.log("没有星")
				}
			},
			changeType: function(type) {
				this.$emit("pChangeType", type)
			},
			async sendpl() {
				console.log("发送的评论是", this.plText)
				console.log(this.pevaluates.userId)
				let data = {
					content: this.plText,
					userId: this.pevaluates.userId,
					// replyId: this.parentForm.id || 0,
					// fatherId: this.replayForm.id || 0
					fatherId: this.parentForm.id||0, 
					replyId: this.replayForm.id||0,
				}
				if (this.replayForm.userName) {
					data.coverName = this.replayForm.userName
				}
				// const res = await this.http.postJson('/app/School/addDiscussService', data)
				// console.log("发送的评论的结果为", res)
				
				const res = await this.http.postJson("/app/muSchoolComment/insert",{
					content: this.plText,
					userId: uni.getStorageSync('userInfo').id,
					schoolId: this.pevaluates.userId,
					replyId: this.parentForm.id || 0,
					fatherId: this.replayForm.id || 0
				})
				
				this.getplList()

				this.plText = ''
				this.placeholder = ''
				this.editShow = false
				this.replayForm = {}
				this.parentForm = {}
				this.$toast('发送成功')
			},
			//评价
			async getplList() {
				const res = await this.http.get("/app/muSchoolComment/selectAllComment", {
					schoolId: this.pevaluates.userId, //94
					pageNum: 1,
					pageSize: 10
				})
	
				console.log("获取到的评价列表", res)
				this.evaluatess = res.data.twoComment
			
			},
		},
	}
</script>

<style lang="scss">
	.footer-edit {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;

		.edit-left {
			width: 451rpx;
			height: 100%;
			display: flex;
			align-items: center;

			input {
				padding-left: 20rpx;
				border-radius: 30rpx;
				width: 400rpx;
				height: 60%;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				background-color: #bca9f7;
			}
		}

		.edit-right {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.right-cell {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				font-size: 24rpx;
				color: #999999;
			}

			.send-btn {
				box-sizing: border-box;
				padding: 10rpx 30rpx;
				border-radius: 50rpx;
				background-color: #4d8ff7;
				color: #FFFFFF;
			}
		}
	}

	.footer-edit-fill {
		width: 100%;
		height: 120rpx;
		background-color: #fff;
	}

	.edit-box {
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx;

		.edit-btn {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;

			.edit-confirm {
				box-sizing: border-box;
				width: 120rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 40rpx;
				background-color: #4A9AFF;
				color: #fff;
				font-size: 26rpx;
				font-weight: 600;
			}
		}
	}

	.view-content {
		background-color: #F7F7F7;

		.view-content-a {
			box-sizing: border-box;
			padding: 37rpx 30rpx;
			margin-bottom: 20rpx;
			width: 750rpx;

			background: #FFFFFF;

			.view-title {
				width: 666rpx;
				height: 77rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 47rpx;
				margin-bottom: 30rpx;
			}

			.view-time {
				width: 133rpx;
				height: 19rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #999999;
				line-height: 48rpx;
				margin-bottom: 58rpx;
			}

			.view-text {
				width: 691rpx;
				height: 268rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 48rpx;
			}
		}

		.view-content-b {
			box-sizing: border-box;
			padding-left: 30rpx;
			padding-top: 39rpx;
			width: 750rpx;
			min-height: 543rpx;
			background: #FFFFFF;

			.view-summary {
				width: 690rpx;
				height: 60rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 48rpx;
				border-bottom: 1rpx solid #EFEFEF;
				margin-bottom: 30rpx;
				display: flex;
				align-items: center;

				.view-line {
					width: 11rpx;
					height: 32rpx;
					background: #4A9AFF;
					border-radius: 5rpx;
				}

				text {
					margin-left: 20rpx;
				}
			}

			.view-comment {
				// border-bottom: 1rpx solid #EFEFEF;
				margin-bottom: 36rpx;

				.view-top {
					// display: flex;
					// align-items: center;
					margin-bottom: 20rpx;

					.dianzai {
						display: inline-block;
						float: right;
						margin-right: 40rpx;
						font-size: 24rpx;

						image {
							width: 30rpx;
							height: 30rpx;
						}
					}

					text {
						margin-left: 20rpx;
					}

					image {
						// background-color: #007AFF;
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						// margin-right: 17rpx;
						vertical-align: middle;
						margin-top: 20rpx;

					}
					
					
					.time {
				
						font-size: 22rpx;
						color: #A1A1A1;
						// display: inline-block;
						position: relative;
						// left: -9%;
						display: flex;
						top: -30rpx;
						left: 80rpx;
						// text-align: left;
						// top: 40rpx;
					}
				}

				.view-bottom {
					margin-left: 80rpx;
				}

				.message {
					font-size: 24rpx;
					margin-top: 20rpx;
					color: #aaa;
					display: inline-block;
					margin-left: 80rpx;
					// text-align: left;
					// width: 300rpx;

					text {
						&:nth-child(2) {
							display: inline-block;
							margin-left: 20rpx;
						}
					}
				}
			}

			.view-tail {
				height: 23rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 42rpx;
				text-align: center;
			}
		}

		.replay-list {
			box-sizing: border-box;
			padding-left: 80rpx;
			width: 100%;

			.replay-line {
				box-sizing: border-box;
				padding: 20rpx 0;
				width: 100%;
				min-height: 100rpx;
				position: relative;

				.replay-info {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #939393;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
					}
				}
			}

			.replay-message {
				padding: 10rpx 0 10rpx 60rpx;
				font-size: 28rpx;
				color: #515151;
			}
		}


		.view-content-d {
			box-sizing: border-box;
			padding: 0 50rpx;

			.view-top {

				height: 30rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 28rpx;
				text-align: center;
				margin-bottom: 44rpx;
				margin-top: 44rpx;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}

			.view-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 108rpx;

				.view-one {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;

					image {
						width: 87rpx;
						height: 87rpx;
						margin-bottom: 26rpx;
					}
				}
			}

		}
	}





	.view-left {
		display: flex;
		align-items: center;

		.view-input {
			display: flex;
			align-items: center;
			width: 520rpx;
			height: 70rpx;
			background-color: #F7F7F7;
			border-radius: 999rpx;
			overflow: hidden;
			padding: 0 20rpx 0 20rpx;

			input {
				width: 100%;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}

		.button-send {
			width: 120rpx;
			height: 66rpx;
			background: #4A9AFF;
			border-radius: 999rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			line-height: 66rpx;
			display: flex;
			margin-left: 10rpx;
			align-items: center;
			justify-content: space-around;
		}
	}

	.huifus {
		background-color: #ededee;
		width: 90%;
		margin-top: 20rpx;
	}

	.view-coun view {
		padding: 10rpx 0rpx 0rpx 0rpx;
		display: inline-block;
	}

	.box {

		.score-comment {

			view {
				font-size: 24rpx;
				margin: 20rpx 10rpx 0 40rpx;
				display: inline-block;
				padding: 10rpx 20rpx 10rpx 20rpx;
				background: #f3f0f3;
				border-radius: 40rpx;
			}
		}

		.score {
			padding: 0rpx 0rpx 0rpx 40rpx;

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

			.count {
				display: inline-block;
				font-size: 24rpx;
				position: relative;
				top: -20rpx;
				left: 90rpx;
				color: #aaa;
			}

			.fen {
				display: inline-block;
				position: relative;
				top: 20rpx;
				right: 50rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin: 0 0 0 10rpx;
				}
			}
		}

		.box-3 {
			.tb1 {
				margin-right: 66rpx;
				width: 86.67rpx;
				height: 34rpx;
				image {
					width: 34rpx;
					height: 34rpx;
				}
				text {
					margin-left: 10rpx;
					position: relative;
					color: #939393;
				}
			}
            .huifu {
            	width: 178rpx;
            	height: 53.33rpx;
            	background: #F1F1F1;
            	border-radius: 27rpx;
            	font-size: 24rpx;
				line-height: 53.33rpx;
				text-align: center;
            	// padding: 5rpx 20rpx 5rpx 20rpx;
            	position: absolute;
            	left: 550rpx;
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

			
		}


		.box-1>image {
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 10rpx;
			border-radius: 50%;
			// margin-top: 20rpx;
		}

		.contents {
			margin-left: 6rpx;
		}

		.box-1 {
			border-top: 1rpx solid #f3f0f3;
			margin: 20rpx 0 40rpx 20rpx;

			.box-1-text {
				height: 100rpx;

				.box-1-text2 {

					text {
						&:nth-child(2) {
							margin-left: 40rpx;
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
		}
	}
</style>
