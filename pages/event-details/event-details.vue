<template>
	<view class="page-view">
		<TabBar color="#515151" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot="left">
				<u-icon name="arrow-left" size="24" @click="uni.navigateBack()"></u-icon>
			</view>
			<view class="tab-center" slot="center">
				<text>活动详情</text>
			</view>
			<!-- <view class="tab-right" slot="right">
				<view class="confirm-btn" @click="">
					<u-icon name="server-fill"></u-icon>
				</view>
			</view> -->
		</TabBar>
		<!-- 活动内容 -->
		<view class="page-title">
			<view class="left">
				<u-image class="image" radius="5px" :src="obj.qljyAdvertisementInfoEntity.img" width="100px" height="100px"></u-image>
			</view>
			<view class="right">
				<view class="name">{{ obj.qljyAdvertisementInfoEntity.adTitle }}</view>
				<u--text class="desc" :lines="2" :text="obj.qljyAdvertisementInfoEntity.adDesc"></u--text>
			</view>
		</view>
		<!-- 活动凭证 -->
		<view class="proof">
			<view class="title">活动凭证</view>
			<view class="content">
				<canvas canvas-id="qrcode" style="width: 140px;margin: 0 auto;"/>
			</view>
			<view class="copy">活动编号:{{ obj.qljyAdvertisementEnrollEntity.adMark?obj.qljyAdvertisementEnrollEntity.adMark:adMark }}<u-image @click="copy" style="margin-left: 5px;" src="../../static/images/copy.png" width="15px" height="15px"></u-image></view>
		</view>
		<!-- 参与信息 -->
		<view class="info">
			<view class="title"> 参与信息 </view>
			<view class="content">
				<view class="content-item">
					<view>
						单位名称
					</view>
					<view class="infos">
						{{ obj.qljyAdvertisementEnrollEntity.companyName }}
					</view>
				</view>
				<view class="content-item">
					<view>
						联&nbsp;&nbsp;系&nbsp;&nbsp;人
					</view>
					<view class="infos">
						{{  obj.qljyAdvertisementEnrollEntity.contacts}}
					</view>
				</view>
				<view class="content-item">
					<view>
						联系电话
					</view>
					<view class="infos">
						{{ obj.qljyAdvertisementEnrollEntity.mobile }}
					</view>
				</view>
				<view class="content-item">
					<view>
						报名时间
					</view>
					<view class="infos">
						{{ obj.qljyAdvertisementEnrollEntity.createTime.split(' ')[0] }}
					</view>
				</view>
			</view>
		</view>
		<!-- 活动须知 -->
		<view class="notice">
			<view class="title"> 活动须知 </view>
			<view class="content">
				<u-parse class="parse" :content="obj.qljyAdvertisementInfoEntity.adNotice?obj.qljyAdvertisementInfoEntity.adNotice:contents" :previewImg="false"></u-parse>
				<!-- <u-parse class="parse" :content="content" :previewImg="false"></u-parse> -->
			</view>
		</view>
	</view>
</template>

<script>
	import TabBar from '@/components/tabBar/tabBar.vue'
	import UQrcode from './uqrcode.js'
	export default {
		components: { 
			TabBar,
		},
		data() {
			return {
				obj:{},
				adMark:'Mxc1000000756158616',
				contents:`<p>1.活动须知...</p>
				<p>2.请在活动时间内使用</p>
				<p>3.活动须知,活动须知,活动须知,</p>
				`,
				content:`<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />`
			}
		},
		onLoad(option) {
			this.obj = JSON.parse(option.item)
			console.log(this.obj,123)
			this.qrFun(this.obj.qljyAdvertisementEnrollEntity.adMark)
		},
		methods: {
			qrFun: function(text) {
				UQrcode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: text,
					size: 140,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: UQrcode.errorCorrectLevel.H,
					success: res => {}
				})
			},
			copy(){
				uni.setClipboardData({
					data:this.obj.qljyAdvertisementEnrollEntity.adMark,
					success(res) {
						console.log(res,'res')
					},
					fail(err) {
						console.log(err,'err')
					}
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
.page-view{
	.page-title{
		width: 96%;
		height: 120px;
		margin-left: 2%;
		border-radius: 5px;
		border: 1px solid #cdcdcd;
		// background-color: #f0ebe5;
		display: flex;
		flex-direction: row;
		.left{
			width: 40%;
			height: 100px;
			.image{
				margin-top: 10px;
				margin-left: 10%;
			}
		}
		.right{
			width: 60%;
			height: 100px;
			.name{
				font-weight: bold;
				margin-top: 5px;
				margin-bottom: 10px;
			}
			.desc{
				width: 80%;
				height: 40px;
				font-size: 10rpx;
			}
			.time{
				font-size: 10px;
				margin-top: 8px;
			}
		}
	}
	.proof{
		width: 100%;
		height: 200px;
		// border: 1px solid #cdcdcd;
		.title{
			margin-top: 5px;
			margin-left: 10px;
			font-weight:bold;
		}
		.content{
			width: 40%;
			height: 140px;
			margin-left: 30%;
			// border: 1px solid red;
		}
		.copy{
			font-size: 10px;
			margin-top: 5px;
			margin-left: 20px;
			display: flex;
			flex-direction: row;
		}
	}
	.info{
		width: 100%;
		height: 180px;
		// border: 1px solid #cdcdcd;
		.title{
			margin-top: 5px;
			margin-left: 10px;
			font-weight: bold;
		}
		.content{
			.content-item{
				width: 90%;
				margin: 15px 20px;
				display: flex;
				flex-direction: row;
				border-bottom:1px solid #cdcdcd ;
				.infos{
					width: 90%;
					height: 20px;
					text-align: center;
				}
			}
		}
	}
	.notice{
		width: 100%;
		height: 120px;
		// border: 1px solid #cdcdcd;
		.title{
			margin-top: 5px;
			margin-left: 10px;
			font-weight:bold;
		}
		.content{
			display: flex;
			flex-direction: column;
			.parse{
				margin: 5rpx 20px;
			}
		}
		
	}
}
</style>
