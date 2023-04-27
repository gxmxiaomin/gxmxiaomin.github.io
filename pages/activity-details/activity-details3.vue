<template>
	<view :class="scrool?'page-view':'page-view-scroll'">
		<!-- 头部 -->
		<view class="img">
			<u-image :src="bgImg" width="100%" height="270rpx"></u-image>
		</view>
		<!-- 正文 -->
		<view class="content" v-for="item of info.contentsList">
			<view class="content-item">
				<view class="">
					<u-button style="width: 100px;background-color: #f5634c;color: white;margin-top:-20px ;border-top: 2px solid #fce990;letter-spacing: 2px;" shape="circle">{{ item.title }}</u-button>
				</view>
				<view class="">
					<!-- {{ item.content }} -->
					<u-parse class="parse" :content="item.content" :previewImg="false"></u-parse>
				</view>
			</view>
		</view>
		<!-- 参与用户 -->
		<view class="content-items">
			<view class="">
				<u-button style="width: 100px;background-color: #f5634c;color: white;margin-top:-20px ;border-top: 2px solid #fce990;letter-spacing: 2px;" shape="circle">{{ info.joinInfo?info.joinInfo:'参与用户' }}</u-button>
			</view>
			<!-- 浏览量和购买量 -->
			<view class="part">
				<view class="buy">
					<text style="color: red;">{{ info.adUserVo.enrollNum }}+</text>已购买
				</view>
				<view class="browse">
					<text style="color: red;">{{ info.adUserVo.lookNum }}+</text>访问
				</view>
			</view>
			<!-- 购买两和浏览量数据 -->
			<view class="list1" v-if="look">
				<view class="user1">
					<view class="user-item1" v-for="item of info.adUserVo.userList">
						<view class="imgs1">
							<u--image :src="item.userImg?item.userImg:defaultImg" width="40px" height="40px" shape="circle"></u--image>
						</view>
						<view class="texts1">
							<text >{{ item.userName }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="list" v-else>
				<view class="user">
					<view class="user-item" v-for="item of info.adUserVo.userList">
						<view class="imgs">
							<u--image :src="item.userImg?item.userImg:defaultImg" width="40px" height="40px" shape="circle"></u--image>
						</view>
						<view class="texts">
							<text >{{ item.userName }}</text>
						</view>
					</view>
					<view class="user-item" v-for="item of info.adUserVo.userList">
						<view class="imgs">
							<u--image :src="item.userImg?item.userImg:defaultImg" width="40px" height="40px" shape="circle"></u--image>
						</view>
						<view class="texts">
							<text >{{ item.userName }}</text>
						</view>
					</view>
					<view class="user-item" v-for="item of info.adUserVo.userList">
						<view class="imgs">
							<u--image :src="item.userImg?item.userImg:defaultImg" width="40px" height="40px" shape="circle"></u--image>
						</view>
						<view class="texts">
							<text >{{ item.userName }}</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 报名 -->
		<view class="apply" ref="UI">
			<view class="">
				<u-button style="width: 100px;background-color: #f5634c;color: white;margin-top:-20px;letter-spacing: 2px;" shape="circle">{{ info.applyInfo?info.applyInfo:'申请入驻' }}</u-button>
			</view>
			<!-- 单位名称 -->
			<view class="apply-item">
				<view class="apply-item-title" >
					<text>单位名称</text>
				</view>
				<view class="">
					<u--input
						v-model="form.company_name"
						style="background-color: #f6f6f6;width: 230px;"
					    placeholder="请输入单位名称"
					    border="surround"
					  ></u--input>
				</view>
			</view>
			<!-- 负责人 -->
			<view class="apply-item">
				<view class="apply-item-title" >
					<text>负&nbsp;&nbsp;责&nbsp;&nbsp;人</text>
				</view>
				<view class="">
					<u--input
						v-model="form.contacts"
						style="background-color: #f6f6f6;width: 230px;"
					    placeholder="请输入负责人"
					    border="surround"
					  ></u--input>
				</view>
			</view>
			<!-- 联系电话 -->
			<view class="apply-item">
				<view class="apply-item-title" >
					<text>联系电话</text>
				</view>
				<view class="">
					<u--input
						v-model="form.mobile"
						type="number"
						style="background-color: #f6f6f6;width: 230px;"
					    placeholder="请输入联系电话"
					    border="surround"
					  ></u--input>
				</view>
			</view>
			<!-- 地址 -->
			<view class="apply-item">
				<view class="apply-item-title" >
					<text>地&emsp;&emsp;址</text>
				</view>
				<view class="" style="width: 230px;height: 70rpx;background-color:#f6f6f6 ;display: flex;flex-direction: column;" @click="GoMap">
					<view style="display: flex;flex-direction: row;margin-top: 10px;">
						<text style="font-size: 15px;width: 200px; overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">{{form.address }}</text>
						<u-icon name="map-fill" style="margin-left: auto;margin-right: 5rpx;"></u-icon>
					</view>
					
					<!-- <u--input
						v-model="form.address"
						style="background-color: #f6f6f6;width: 230px;"
					    placeholder="点击定位地址"
					    border="surround"
						suffixIcon="map-fill"
					  ></u--input> -->
				</view>
			</view>
			<!-- 报名按钮 -->
			<view class="" style="display: flex;flex-direction: row;">
				<view class="" style="width: 80%;margin-left: 15px;">
					<u-button style="width: 100%;background-color: #f5634c;color: white;" shape="circle" @click="submit" v-if="!info.isEnroll">立即报名</u-button>
					<u-button style="width: 100%; background-color: #f5634c;" shape="circle" :disabled="true" v-else>已报名</u-button>
				</view>
				<view class="" style="width: 15%;margin-left: 10px;">
					<view class="" style="display: flex;flex-direction: column;">
						<u-icon @click="share" name="share-square" size="30"></u-icon>
						<text style="margin-top: -5px;">海报</text>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="width: 100%;height: 10px;"></view>
		<view v-if="show" class="content-bottom">
			<view class="bottom-title">
				<text>--邀请好友--</text>
			</view>
			<view class="bottom-content">
				<view class="bottom-item" @click="aaa('weixin')">
					<u-icon class="icon" size="45px" name='weixin-circle-fill' color='green'></u-icon>
					<view class="text">分享好友</view>
				</view>
				<view class="bottom-item"  @click="aaa('weibo')">
					<u-icon class="icon" size="45px" name='weibo-circle-fill' color='#dd5b59'></u-icon>
					<view class="text">分享微博</view>
				</view>
				<view class="bottom-item"  @click="aaa('pengyouquan')">
					<u-icon class="icon" size="45px" name='moments-circel-fill' color='#51ae70'></u-icon>
					<view class="text">分享朋友圈</view>
				</view>
				<view class="bottom-item"  @click="aaa('qq')">
					<u-icon class="icon" size="45px" name='qq-circle-fill' color='#669dd4'></u-icon>
					<view class="text">分享QQ</view>
				</view>
				<view class="bottom-item" @click="test">
					<u-icon class="icon" size="45px" name='weibo-circle-fill' color='#e08b38'></u-icon>
					<view class="text">生成海报</view>
				</view>
			</view>
			<view class="">
				<u-button @click="cancel">取消</u-button>
			</view>
		</view>
		<qrcode-poster ref="poster" :title="title" :subTitle="subTitle" :headerImg="headerImg"
		            :content="content"></qrcode-poster>
		<view class="" style="margin-top: 200px;">
			<canvas canvas-id="qrcode" v-show="uqrcode" style="width: 150px;margin: 0 auto;"/>
		</view>
	</view>
</template>

<script>
	import QrcodePoster from '@/components/poster/poster.vue'
	import UQrcode from '../event-details/uqrcode.js'
	export default{
	    components:{
	        QrcodePoster
	    },
		data() {
			return {
				scrool:true,
				look:false,
				uqrcode:false,
				invitationCode:null,//邀请码
				content:'五一大酬宾活动开始了，快来参加吧，五一大酬宾活动开始了，快来参加吧',
				title:'五一活动，五一活动，五一活动，五一活动，五一活动，五一活动，五一活动',
				subTitle:'快来参加吧',
				headerImg:'../../static/images/goods_cover.png',
				logo:'https://img95.699pic.com/xsj/0u/f0/23.jpg%21/fh/300',
				activityId:'',
				bgImg:'../../static/images/activity_bg.jpg',
				// adUserVo:'',
				isLogin:1,
				// defaultImg:'https://img95.699pic.com/xsj/0u/f0/23.jpg%21/fh/300',
				defaultImg:'https://pic.90sheji.com/design/01/11/96/52/58cf6a696f7fc.png%21/fw/315/quality/90/unsharp/true/compress/true/canvas/315x315a0a0/cvscolor/FFFFFFFF',
				form:{
					company_name:'',//公司名称
					contacts:'',//负责人
					mobile:'',//联系电话
					address:'',//地址
				},
				setMeal:[],
				list:[
				],
				show:false,
				bottom:'40px',
				obj:{},
				info:{ 
					adDetailList:[],//套餐数据
					contentsList:[],//标题内容数据
					adUserVo:{},//参与用户数据
				},
				adTitle:'',
				adDesc:'',
				web:null,
				incode:null,
			}
		},
		computed:{
			
		},
		onShow() { 
			// this.getContent()
		},
		onLoad(option) {
			this.show = false
			if(option.invitationCode){
				this.web = true
				this.incode = option.invitationCode
			}
			this.invitationCode = uni.getStorageSync('invitationCode')
			let a = uni.getStorageSync('token')
			if(a){
				// console.log(123)
				this.isLogin = 0
			}
			// this.obj = {
			// 	id:option.id,
			// 	adTitle:option.adTitle,
			// 	adDesc:option.adDesc
			// }
			// this.obj = JSON.parse(option.item)
			this.obj.id = option.id
			this.activityId = option.id
			this.getContent()
			// uni.$on('activity',function(data){
			// 	this.$nextTick(()=>{
			// 		_this.obj = data
			// 		_this.activityId = data.id
			// 		_this.getContent()
			// 	})
			// })
		},
		onUnload() {
			// uni.off('activity')
		},
		// watch: {
		// 	'show'(val,old){
		// 		console.log(val,old,'old')
		// 		this.uqrcode = val
		// 	},
		// },
		
		methods: {
			// 根据链接生成二维码
			qrFun: function(text) {
				console.log(text,'text')
				let _this = this
				_this.uqrcode = true
				UQrcode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: text,
					size: 150,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: UQrcode.errorCorrectLevel.H,
					success: res => {
						_this.getImage()
					},
					fail:res => {
						console.log(res,'err')
					}
				})
			},
			getImage(){
				let  _this = this
				uni.canvasToTempFilePath({
					 x: 0,
					  y: 0,
					  width: 150,
					  height: 150,
					  destWidth: 150,
					  destHeight: 150,
					  canvasId: 'qrcode',
					  quality:1,
					  success: function(res) {
					    // 在H5平台下，tempFilePath 为 base64
						console.log(res,'图片')
					    console.log(res.tempFilePath,'图片')
						_this.$refs.poster.showCanvas(_this.info.img, res.tempFilePath)
						// _this.uqrcode = false
					  } 
				})
				// console.log(this.$refs['poster'],123)
				if(_this.$refs['poster'].isShow){
					_this.uqrcode = false
				}
				
			},
			test(){
				this.scrool = false
				console.log(this.info,1234556)
				let url = `http://h5.muxingchen.com/index.html#/pages/activity-details/activity-details3?invitationCode=${this.invitationCode}&id=${this.obj.id}`
				this.headerImg = this.info.img
				this.title = this.obj.adTitle
				this.content = this.obj.adDesc
				if(this.title.length>13){
					this.title = this.title.slice(0,12)+'...'
				}
				if(this.content.length>20){
					this.content = this.content.slice(0,19)+'...'
				}
				console.log(this.isLogin,'islogin')
				if(this.isLogin == 0){
					// this.uqrcode = true
					this.qrFun(url)
					// this.$refs.poster.showCanvas(this.headerImg, this.logo)
					
					
				}else{
					console.log('login')
					this.checkLogin()
				}
			},
			// 分享
			aaa(val){ 
				switch(val){
					case 'weixin':
						// console.log('微信')
						this.fenxiang('weixin','WXSceneSession')
						break
					case 'pengyouquan':
						// console.log('朋友圈','WXSceneTimeLine')
						this.fenxiang('weixin','WXSceneTimeline')
						break
					case 'weibo':
						// console.log('微博')
						this.fenxiang('sinaweibo')
						break
					case 'qq':
						// console.log('qq')
						this.fenxiang('qq')
						break
				}
			},
			fenxiang(shareType,shareTypes){
				console.log(shareType,shareTypes,222222)
				console.log(this.obj,1212121)
				if(this.isLogin == 0){
					uni.share({
						provider:shareType,
						scene:shareTypes,
						type:0,
						title:this.obj.adTitle,
						href:`http://h5.muxingchen.com/index.html#/pages/activity-details/activity-details3?invitationCode=${this.invitationCode}&id=${this.obj.id}`,
						summary:'活动开始了，赶紧来参加吧！',
						success(res) {
							console.log('success',JSON.stringify(res))
						},
						fail(err) {
							console.log('error',JSON.stringify(err))
						}
					})
				}else{
					// uni.navigateTo({
					// 	url:'/pages/login/login'
					// })
					this.checkLogin()
				}
				
			},
			async getContent(){
				console.log(this,123456)
				let res = await this.http.get('/app/advertisement/advertisementDetailed',{
					id:this.obj.id,
					isLogin:this.isLogin,
				})
				if(res.code == 200){
					console.log(res,'res')
					// this.adUserVo = res.data.adUserVo
					// this.list = res.data.contentsList
					// this.setMeal = res.data.adDetailList 
					this.info = res.data
					if(this.info.adUserVo.lookNum<=15){
						this.look = true
					}else{
						this.info.adUserVo.lookNum = parseInt(res.data.adUserVo.lookNum)*3
					}
					console.log(this.info,'info')
					this.obj.adTitle = this.info.adTitle
					this.obj.adDesc = this.info.adDesc
					if(res.data.img){
						this.bgImg = res.data.img
					}
				}
			},
			cancel(){
				this.scrool = true
				this.show = false
				this.bottom = '20px'
				this.$refs.UI.$el.style.setProperty('--bottom',this.bottom)
			},
			share(){
				this.show = true
				this.bottom = '160px'
				this.$refs.UI.$el.style.setProperty('--bottom',this.bottom)
			},
			GoMap(){
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success(res) {
						console.log(res,'位置信息')
					},
					fail(err) {
						console.log(err,'错误信息')
						if(err.errMsg.indexOf(12) !== -1 ){
							uni.showToast({
								title:'请打开定位',
								icon:'error',
								duration:2000,
							})
						}
					}
				})
				uni.chooseLocation({
					success: res => {
						this.form.address = res.address
						
					}
				});
			},
			checkLogin(){
				if(this.web){
					console.log(this.invitationCode,123)
					uni.navigateTo({
						url:`/pages/login/login?web=${this.web}&invitationCode=${this.incode}`
					})
				}
				else{
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			},
			deal(time){
				let aa = time.split(' ')[0].split('-')
				let b = aa.join('/')
				return b
			},
			async submit(){
				if(this.isLogin == 0){
					// uni.navigateTo({
					// 	url:'/pages/activity-payment/activity-payment'
					// })
					if(this.form.company_name && this.form.contacts && this.form.mobile && this.form.address){
						this.form.adId = this.activityId
						console.log(this.form)
						let res = await this.http.postJson('/app/advertisement/adEnroll',this.form)
						if(res.code == 200){
							// this.$toast('报名成功')
							if(res.data.createTime.indexOf(' ')!== -1){
								this.form.createTime = res.data.createTime.split(' ')[0]
							}
							if(this.info.adDetailList.length == 0){
								this.form ={
									company_name:'',//公司名称
									contacts:'',//负责人
									mobile:'',//联系电话
									address:'',//地址
								}
							}else{
								let info = {
									img:this.bgImg,
									adTitle:this.obj.adTitle,
									adDesc:this.obj.adDesc,
									createTime:`${this.deal(this.info.starTime)}-${this.deal(this.info.endTime)}`,
								}
								let obj = {...this.form,setMeal:this.info.adDetailList,info:info}
								uni.navigateTo({
									url:`/pages/activity-payment/activity-payment?item=${JSON.stringify(obj)}`
								})
							}
						}
						
					}else{
						this.$toast('请完善入驻信息')
					}
				}else{
					// uni.navigateTo({
					// 	url:'/pages/login/login'
					// })
					this.checkLogin()
				}
				// if(this.form.company_name && this.form.contacts && this.form.mobile){
				// 		console.log(this.form)
				// 		uni.navigateTo({
				// 			url:`/pages/activity-payment/activity-payment?item=${JSON.stringify(this.form)}`
				// 		})
				// 	}else{
				// 		this.$toast('请完善入驻信息')
				// 	}
				
			},
		
		}
		
	}
</script>
<style scoped lang="scss">
.page-view-scroll{
	width: 100%;
	// min-height: 800px;
	// height: auto;
	height: 600px;
	background-color: red;
	overflow: hidden;
	.img{
		width: 100%;
		height: 270rpx;
		object-fit: cover;
		margin-bottom: 30px;
		.btn{
			width: 24%;
			height: 35px;
			margin-left: 60px;
			border-radius: 12px;
			background-color: #fce990;
			display: flex;
			flex-direction: row;
		}
	}
	.content{
		.content-item{
			width: 90%;
			height: 200px;
			height: auto;
			border: 5px solid yellow;
			border-radius: 5px;
			background-color: white;
			margin-bottom: 40px;
			margin-left: 5%;
			.parse{
				margin-left: 10rpx;
				font-size: 15px;
			}
		}
	
	}
	.content-items{
		width: 90%;
		border: 5px solid yellow;
		border-radius: 5px;
		background-color: white;
		margin-bottom: 40px;
		margin-left: 5%;
		.list1{
			width: 100%;
			height: 180px;
			overflow: hidden;
			.user1{
				width: 100%;
				height: 180px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.user-item1{
					width: 50px;
					height: 60px;
					margin-left: 12px;
					// border: 1px solid blue;
					.imgs1{
						width: 40px;
						height: 40px;
						// border: 1px solid black;
						margin-left: 5px;
					}
					.texts1{
						width: 50px;
						height: 20px;
						// border: 1px solid red;
						font-size: 10rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
		.list{
			width: 100%;
			height: 180px;
			overflow: hidden;
			.user{
				width: 100%;
				height: 180px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				// animation: user 7s infinite;
				animation-timing-function: ease-out;
				-webkit-animation:user 5s infinite   ;
				animation:user 5s infinite   ;
				.user-item{
					width: 50px;
					height: 60px;
					margin-left: 12px;
					// border: 1px solid blue;
					.imgs{
						width: 40px;
						height: 40px;
						// border: 1px solid black;
						margin-left: 5px;
					}
					.texts{
						width: 50px;
						height: 20px;
						// border: 1px solid red;
						font-size: 10rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
		@keyframes user {
			 0%{
				 transform: translateY(0px);
			 }
			 20%{
				 transform: translateY(-10%);
			 }
			 40%{
				 transform: translateY(-25%);
			 }
			 60%{
				 transform: translateY(-50%);
			 }
			 80%{
					transform: translateY(-75%);
			 }
			 100%{
					transform: translateY(-100%);     
				}
		}
		.part{
			width: 100%;
			height: 20px;
			display: flex;
			margin-top: -10px;
			flex-direction: row;
			.buy{
				width: 50%;
				height: 20px;
				text-align: center;
				font-size: 10rpx;
			}
			.browse{
				width: 50%;
				height: 20px;
				text-align: center;
				font-size: 10rpx;
			}
		}
	}
	.apply{
		width: 90%;
		height: 280px;
		border: 5px solid yellow;
		border-radius: 5px;
		background-color: white;
		margin-bottom: var(--bottom);
		margin-left: 5%;
		.apply-item{
			display: flex;
			flex-direction: row;
			margin: 10px 0px;
			.apply-item-title{
				margin-top: 8px;
				margin-left: 5px;
				margin-right: 10px;
			}
		}
	}
	.content-bottom{
		width: 100%;
		height: 160px;
		position: fixed;
		bottom: 0px;
		background-color: white;
		.bottom-title{
			width: 100%;
			margin-top: 5px;
			text-align: center;
			letter-spacing: 2px;
		}
		.bottom-content{
			width: 100%;
			height: 90px;
			display: flex;
			flex-direction: row;
			font-size: 10rpx;
			.bottom-item{
				width: 20%;
				height: 90px;
				.icon{
					width: 60%;
					height: 50px;
					margin-left: 20%;
				}
				.text{
					width: 100%;
					height: 20px;
					text-align: center;
				}
			}
		}
	}
}
.page-view{
	width: 100%;
	// min-height: 800px;
	// height: auto;
	height: 800px;
	background-color: red;
	// overflow: hidden;
	overflow: scroll;
	// letter-spacing: 2px;
	.img{
		width: 100%;
		height: 270rpx;
		object-fit: cover;
		margin-bottom: 30px;
		.btn{
			width: 24%;
			height: 35px;
			margin-left: 60px;
			border-radius: 12px;
			background-color: #fce990;
			display: flex;
			flex-direction: row;
		}
	}
	.content{
		.content-item{
			width: 90%;
			height: 200px;
			height: auto;
			border: 5px solid yellow;
			border-radius: 5px;
			background-color: white;
			margin-bottom: 40px;
			margin-left: 5%;
			.parse{
				margin-left: 10rpx;
				font-size: 15px;
			}
		}
	
	}
	.content-items{
		width: 90%;
		border: 5px solid yellow;
		border-radius: 5px;
		background-color: white;
		margin-bottom: 40px;
		margin-left: 5%;
		.list1{
			width: 100%;
			height: 180px;
			overflow: hidden;
			.user1{
				width: 100%;
				height: 180px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.user-item1{
					width: 50px;
					height: 60px;
					margin-left: 12px;
					// border: 1px solid blue;
					.imgs1{
						width: 40px;
						height: 40px;
						// border: 1px solid black;
						margin-left: 5px;
					}
					.texts1{
						width: 50px;
						height: 20px;
						// border: 1px solid red;
						font-size: 10rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
		.list{
			width: 100%;
			height: 180px;
			overflow: hidden;
			.user{
				width: 100%;
				height: 180px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				// animation: user 7s infinite;
				animation-timing-function: ease-out;
				-webkit-animation:user 5s infinite   ;
				animation:user 5s infinite   ;
				.user-item{
					width: 50px;
					height: 60px;
					margin-left: 12px;
					// border: 1px solid blue;
					.imgs{
						width: 40px;
						height: 40px;
						// border: 1px solid black;
						margin-left: 5px;
					}
					.texts{
						width: 50px;
						height: 20px;
						// border: 1px solid red;
						font-size: 10rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
		}
		@keyframes user {
			 0%{
				 transform: translateY(0px);
			 }
			 20%{
				 transform: translateY(-10%);
			 }
			 40%{
				 transform: translateY(-25%);
			 }
			 60%{
				 transform: translateY(-50%);
			 }
			 80%{
					transform: translateY(-75%);
			 }
			 100%{
					transform: translateY(-100%);     
				}
		}
		.part{
			width: 100%;
			height: 20px;
			display: flex;
			margin-top: -10px;
			flex-direction: row;
			.buy{
				width: 50%;
				height: 20px;
				text-align: center;
				font-size: 10rpx;
			}
			.browse{
				width: 50%;
				height: 20px;
				text-align: center;
				font-size: 10rpx;
			}
		}
	}
	.apply{
		width: 90%;
		height: 280px;
		border: 5px solid yellow;
		border-radius: 5px;
		background-color: white;
		margin-bottom: var(--bottom);
		margin-left: 5%;
		.apply-item{
			display: flex;
			flex-direction: row;
			margin: 10px 0px;
			.apply-item-title{
				margin-top: 8px;
				margin-left: 5px;
				margin-right: 10px;
			}
		}
	}
	.content-bottom{
		width: 100%;
		height: 160px;
		position: fixed;
		bottom: 0px;
		background-color: white;
		.bottom-title{
			width: 100%;
			margin-top: 5px;
			text-align: center;
			letter-spacing: 2px;
		}
		.bottom-content{
			width: 100%;
			height: 90px;
			display: flex;
			flex-direction: row;
			font-size: 10rpx;
			.bottom-item{
				width: 20%;
				height: 90px;
				.icon{
					width: 60%;
					height: 50px;
					margin-left: 20%;
				}
				.text{
					width: 100%;
					height: 20px;
					text-align: center;
				}
			}
		}
	}
}

</style>
