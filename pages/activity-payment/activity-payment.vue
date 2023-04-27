<template>
	<view class="view-page">
		<view class="page-title">
			<view class="left">
				<u-image class="image" radius="5px" :src="info.img" width="100px" height="100px"></u-image>
			</view>
			<view class="right">
				<view class="name">{{ info.adTitle }}</view>
				<u--text class="desc" :lines="2" :text="info.adDesc"></u--text>
			</view>
		</view>
		<view class="page-content">
			<view class="content-item" @click="show = true">
				<view class="title">
					<text>活动套餐</text>
				</view>
				<view class="icon">
					<view class="">
						{{ mealTitle }}
					</view>
					<view class="arrow">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			<view class="content-item1">
				<view class="title">
					活动时间
				</view>
				<view class="money">
					{{ info.createTime }}
				</view>
			</view>
			<view class="content-item2">
				<view class="" style="margin-left: 20px;">报名信息</view>
				<view class="content-info">
					<text class="info1">单位名称</text>
					<text class="info2">{{ form.company_name }}</text>
				</view>
				<view class="content-info">
					<text class="info1">联&nbsp;&nbsp;系&nbsp;&nbsp;人</text>
					<text class="info2">{{ form.contacts }}</text>
				</view>
				<view class="content-info">
					<text class="info1">联系电话</text>
					<text class="info2">{{ form.mobile }}</text>
				</view>
				<view class="content-info">
					<text class="info1">报名时间</text>
					<text class="info2">{{ form.createTime }}</text>
				</view>
			</view>
		</view>
		<view class="page-bottom">
			<view class="" style="width: 65%;">
				<text style="margin-left: 10px;"> 总计：<text style="color: red;">￥{{ money }}</text></text>
			</view>
			<view class="" style="width:35%">
				<u-button shape="circle" style="background-color: #5e98f9;color: white;width:90%" @click="openPai">立即支付</u-button>
			</view>
		</view>
		<u-popup :show="show1" mode="bottom" @close="show1 = false">
			<view class="openPay">
				<view class="title">
					<view class="icon">
						<u-icon name="arrow-left" @click="show1 = false"></u-icon>
					</view>
					<view class="text">
						<text>请选择支付方式</text>
					</view>
				</view>
				<view class="">
					<radio-group @change="checkPay">
						<view class="content" v-for="(item, index) in list" :key="item.value">
							<view class="content-item">
								<u-image class="image" :src="item.icon" width="30px" height="30px" radius="5px"></u-image>
								<text>{{ item.name }}</text>
							</view>
							<view class="radio">
								<radio :value="item" :checked="index === payCurrent" />
							</view>
							
						</view>
					</radio-group>
				</view>
				<view style="margin-top: 10px;width: 80%;margin-left: 10%;">
					<!-- <radio :checked="value" @click="changeRadio"></radio>勾选代表同意已<text style="color: blue;" @click="show2 = true">协议内容</text> -->
					<view style="display: flex;flex-direction: row;margin-bottom: 10px;">
						<view @click="changeRadio" style="width: 10px;height: 10px;border-radius: 10px;border: 1rpx solid black;margin-right: 5px;margin-top: 5px;" :class="value?'Blue':''"></view>
						<view class="">勾选代表已同意</view>
						<view style="color: blue;" @click="show2 = true">协议内容</view>
					</view>
					<u-button shape="circle" color="#5e98f9" @click="openAgreement">立即支付</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 协议弹框 -->
		<u-popup :show="show2" @close="close" mode="center" style="background-color: transparent;">
			<view class="popup-box">
				<view class="popup-title">
					<!-- <text>{{openType=='settled'? "学校端入驻协议":"学校端隐私协议"}}</text> -->
					<text>活动缴费须知</text>
				</view>
				
				<scroll-view scroll-y="true" class="scroll-box" @scrolltolower="scrollBottom=false">
					<view class="scroll-content">
						<view style="width: 100%;height: 80px;font-size: 10px;color: #8e8e8e;" v-for="item of 20">
							<text>
								1.保证金满半年可以申请退款，但是退款后店铺将自动关闭,保证金满半年可以申请退款，但是退款后店铺将自动关闭
								2.服务费缴纳后，将不能申请退款 
								3.保证金和服务费二者选择其一缴纳，不能两者都缴纳 
								4.本次活动仅限第一次，第二次缴纳将恢复原价
							</text>
						</view>
					</view>
				</scroll-view>
				
				<view class="popup-btn">
					<u-button type="info" style="width: 30%;" text="取消" @click="close"></u-button>
					<u-button type="primary" style="width: 30%;" text="同意" :disabled='scrollBottom' @click="agreeType"></u-button>
				</view>
			</view>
		</u-popup>
		<!-- <u-popup :show="show2" closeable="true" @close="show2 = false">
			<view style="width: 100%; height: 500px;overflow: scroll;margin-top: 30px;">
				<view style="width: 100%;height: 160px;" v-for="item of 10">
					<text>
						1.保证金满半年可以申请退款，但是退款后店铺将自动关闭 
						2.服务费缴纳后，将不能申请退款 
						3.保证金和服务费二者选择其一缴纳，不能两者都缴纳 
						4.本次活动仅限第一次，第二次缴纳将恢复原价
					</text>
				</view>
			</view>
		</u-popup> -->
		<!-- 年限弹出层 -->
		<u-popup  :show="show" mode="bottom" @close="show = false" >
		            <view class="popop">
						<view class="" style="display: flex;flex-direction: row;">
							<u-icon style="margin-left: auto;margin-top: 5px;margin-right: 5px;"  @click="show = false" name="close"></u-icon>
						</view>
						<radio-group @change="radioChange">
							<!-- <view :class="item.check?'pop-item':'pop-items'" v-for="(item, index) in form.setMeal" :key="item.id"> -->
							<view class="pop-items" v-for="(item, index) in form.setMeal" :key="item.id">
								<view class="radio">
									<radio :value="item" :checked="index === current" />
								</view>
								<view class="content">
									<text class="menuName">{{item.menuName}}</text>
									<text class="price">￥：{{item.price}}</text>
								</view>
							</view>
						</radio-group>
						<view class="" style="width: 80%;margin-left: 10%;margin-top: 5px;">
							<u-button type="primary" shape="circle" @click="show = false">确定</u-button>
						</view>
		            </view>
				</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					img:'https://img2.baidu.com/it/u=3635204433,939208923&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500',
					adTitle:'活动标题',
					adDesc:'活动简介活动简介活动简介活动简介活动简介活动简介',
					createTime:'2023-04'
				},
				mealTitle:'未选择',
				scrollBottom:true,
				value:false,
				current:null,
				payCurrent:null,
				pay:null,
				money:'0',
				payType:'',
				text:'河南省郑州市金水区',
				beginDate:'5月1日',
				endDate:'5月20日',
				time:'',
				show:false,
				show1:false,
				show2:false,
				payForm:{
					adDetailId:'',
					adId:'',
					payType:'',
				},
				form:{
					
				},
				list:[
					{
						id:1,
						name:'支付宝',
						icon:'../../static/images/zhiPay.png',
						payType:'alipay',
					},
					{
						id:2,
						name:'微 信',
						icon:'../../static/images/weixinPay.png',
						payType:'wxpay',
					}
				],
				ls:[
					{
						id:1,
						menuName:'标准版',
						price:'199.00',
						check:false
					},
					{
						id:2,
						menuName:'豪华版',
						price:'399.00',
						check:false,
					},
					{
						id:3,
						menuName:'至尊版',
						price:'999.00',
						check:false,
					}
				],
			}
		},
		mounted() {
			this.time = `<img style="vertical-align:middle" src='../../static/images/calendar.png' width="20" height='20'/>&nbsp;&nbsp;<span style="vertical-align:middle">开始日期：<span style='color:#759cec'>${this.beginDate}</span>  结束日期：<span style='color:#759cec'>${this.endDate}</span></span>`
			// console.log(this.money.indexOf('.') == -1)
			if(this.scrollBottom){
				// console.log(this.value)
				this.value = false
			}
			if(this.money.split('.')[0].split('').length>=5){
				this.money = Number(this.money)/10000+'万'
			}
			// console.log(this.money)
		},
		onLoad(option) {
			let obj = JSON.parse(option.item)
			this.form = obj
			// console.log(obj,123)
			this.payForm.adId = obj.adId
			this.info = obj.info
			// this.getPayDeatail()
		},
		methods: {
			agreeType(){
				this.show2 = false
			},
			close(){
				this.show2 = false
				this.scrollBottom = true
			},
			async getPayDeatail(form){
				// this.form.adId = 1
				let res = await this.http.postJson('/app/advertisement/adPay',form)
				// console.log(res,'json')
				if(res.code == 200){
					uni.requestPayment({
						provider: form.payType,
						orderInfo: form.payType == 'wxpay' ? JSON.parse(res.data) : res.data,
						_debug: 1,
						success(res) {
							console.log(res,'成功')
							uni.redirectTo({
								url:'/pages/activityList/activityList'
							})
						},
						fail(err) {
							console.log(err,'错误信息')
						}
					})
				}
			},
			changeRadio(){
				// console.log(123,this.value)
				if(this.scrollBottom){
					this.$toast('请先阅读协议内容')
				}else{
					this.value = !this.value
				}
			},
			openAgreement(){
				if(this.value){
					if(this.payForm.adDetailId !== '' && this.payForm.adId !== '' && this.payForm.payType !== ''){
						// console.log(this.payForm,123123123)
						this.getPayDeatail(this.payForm)
					}else{
						this.$toast('是否选择了套餐和支付方式')
					}
				}else{
					this.$toast('请勾选上方选择框')
				}
			},
			checkPay(e){
				// console.log(e,2333)
				this.list.forEach((item,index)=>{
					if(item.id == e.detail.value.id){
						this.payForm.payType = item.payType
						this.payCurrent = index
					}
				})
			},
			openPai(){
				this.show1 = true
			},
			radioChange(e){
				this.form.setMeal.forEach((item,index)=>{
					if(item.id == e.detail.value.id){
						item.check = true
						this.money = item.price
						this.payForm.adDetailId = item.id
						this.mealTitle = item.menuName
						this.current = index
					}else{
						item.check = false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view-page{
		width: 100%;
		height: 621px;
		background-color: white;
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
		.page-content{
			.content-item{
				width: 100%;
				height:60px;
				background-color: white;
				// border-top:1px solid #5e98f9;
				// border-bottom:1px solid #5e98sf9;
				display: flex;
				flex-direction: row;
				.title{
					width: 50%;
					height: 60px;
					margin: 15px 20px;
				}
				.icon{
					height: 60px;
					margin-left: auto;
					margin-top: 20px;
					display: flex;
					flex-direction: row;
					.arrow{
						margin-top: 5px;
						margin-left: 5px;
						margin-right: 5px;
					}
				}
			}
			.content-item1{
				width: 100%;
				height:60px;
				background-color: white;
				// border-bottom:1px solid #5e98f9;
				display: flex;
				flex-direction: row;
				.title{
					width: 20%;
					height: 60px;
					margin: 15px 20px;
				}
				.money{
					// width: 30%;
					height: 60px;
					line-height: 60px;
					margin-left: auto;
					margin-right: 10px;
					// margin-left: 60%;
					// margin-top: 25px;
				}
			}
			.content-item2{
				width: 100%;
				height:auto;
				.content-info{
					margin-left: 30px;
					font-size: 15px;
					color: #4b4b4b;
					margin-top: 15px;
					.info2{
						// width: 50%;
						margin-left: 40%;
					}
				}
			}
		}
		.page-bottom{
			width: 100%;
			height: 40px;
			background-color: white;
			line-height: 40px;
			position: fixed;
			bottom: 0px;
			display: flex;
			flex-direction: row;
		}
		.popop{
			width: 100%;
			height: 350px;
			// background:linear-gradient(#e9e9e9,#d3d3d3);
			.pop-item{
				width: 80%;
				height: 80px;
				margin-left: 10%;
				margin-top: 10px;
				background-color: white;
				display: flex;
				flex-direction: row;
				.radio{
					margin-left: 20px;
					margin-top: 25px;
				}
				.content{
					display: flex;
					flex-direction: column;
					.menuName{
						margin-top: 20px;
					}
					.price{
						color: red;
						margin-top: 5rpx;
					}
				}
			}
			.pop-items{
				width: 90%;
				height: 80px;
				margin-left: 5%;
				margin-top: 10px;
				// border: 1px solid #5e98f9;
				border: 1px solid #cdcdcd;
				border-radius: 5px;
				background-color: white;
				display: flex;
				flex-direction: row;
				.radio{
					margin-left: 20px;
					margin-top: 25px;
				}
				.content{
					display: flex;
					flex-direction: column;
					.menuName{
						margin-top: 20px;
					}
					.price{
						color: red;
						margin-top: 5rpx;
					}
				}
			}
		}
		.openPay{
			width: 100%;
			height: 260px;
			background-color: white;
			border-top-left-radius: 50px !important;
			border-top-right-radius: 50px !important;
			.title{
				display: flex;
				flex-direction: row;
				margin-bottom: 20px;
				.icon{
					margin-top: 15px;
					margin-left: 20px;
				}
				.text{
					margin-top: 15px;
					margin-left: 30%;
				}
			}
			.content{
				width: 100%;
				height: 60px;
				border-bottom:1px solid gray ;
				display: flex;
				flex-direction: row;
				line-height: 60px;
				.content-item{
					display: flex;
					flex-direction: row;
					.image{
						margin-top: 15px;
						margin-left: 20px;
						margin-right: 20px;
					}
				}
				.radio{
					margin-left: auto;
					margin-right: 10px;
				}
			}
		}
		::v-deep .u-popup__content {
			border-top-left-radius: 5px !important;
			border-top-right-radius: 5px !important;
		}
	}
.popup-box {
	width: 600rpx;
	height: 60vh;
	// background-color: #dcfefd;
	background-color: #fff;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 10rpx;
	display: flex;
	flex-direction: column;
	.popup-title {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
	}
	.scroll-box {
		width: 100%;
		height: calc(60vh - 88rpx - 88rpx - 20rpx - 20rpx);
		.scroll-content {
			width: 100%;
			min-height: 100%;
		}
	}
	.popup-btn {
		width: 100%;
		height: 88rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
}
.Blue{
	background-color: #55aaff;
}
// /deep/ .u-popup__content{
// 	border-radius: 5rpx;
// 	background-color: transparent;
// }
</style>
