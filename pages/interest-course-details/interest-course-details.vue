<template>
	<view class="box">
		<!-- <view style="margin-top: 40rpx;"></view> -->
		<view class='box-1'>
			<view class="img">
				<image :src="urlse" mode=""></image>
			</view>
			<view class="text-1">
				<text></text>
				<text></text>
				<text>已有{{nus || 0}}人报名</text>
			</view>

			<view class="boxs">
				<view class="text-2  ">
					<text>课程：</text>
					<text>{{detailslist.courseName}}</text>
				</view>
				<view class="" style="width: 100%;height: 200rpx;">
					<view>
							<u-picker  @cancel="flag = false" :show="flag" @confirm="confirms" keyName="traineeName" :columns="columns"></u-picker>
						<u-button @click="btn">{{word}}</u-button>
						<!-- <u-picker  @cancel="flags = false" :show="flags" @confirm="selsKc" keyName="courseName" :columns="columnsts"></u-picker>
						<u-button style="margin-top: 20px;" @click="goKc">{{words}}</u-button> -->
						
						<u-picker ref="xxx"  @cancel="flagse = false" @confirm="goscdc" :show="flagse" keyName="setmealName" :columns="columnss"></u-picker>
						<u-button style="margin-top: 20px;" @click="taocans">{{wordse}}</u-button>
					</view>
				</view>
				<view style="height: 10rpx;position: relative; margin-top: 20rpx;"></view>
			</view>
		</view>
		<!-- 底部固定 -->
		<view class="footer">
			<view class="btn" @click="btnClick">
				    <u-toast ref="uToast" />
				<u-button :text="texts" shape="circle"  :class="texts === '点击报名' ? 'str' : texts === '报名成功' ? 'strs' : ''"></u-button>
			</view>
		</view>


		<!-- //弹出层 mode可选 top、bottom、left、right、center -->
		<!-- 	<u-popup :show="show" mode="bottom" @close="close">
			<view>
				<view class="box-u">
					
					<view class="box-u1">
						<img :src="detailslist.courseImg" alt="">
						<view class="">
							<text>￥120-￥1200</text>
							<text>可使用优惠券</text>
						</view>
					</view> -->

		<!-- <view :class="{'stateStyle1': currentBtn==item.id}" @click="select(item.id,item.price)"
						class="box-u2" v-for="item in list" :key="item.id">
						<text>{{item.period}}</text>
						<text>￥{{item.price}}</text>
					</view> -->
		<!--  <view class="">
					
				</view>

					<view style="width: 90%;margin: auto;">
						<view style="text-align: center;color: crimson;">￥{{price}}</view>
						<u-button @click="purchase(addressInfo.id,detailslist.id,detailslist.schoolId)" text="立即购买"
							type="primary" shape="circle"></u-button>
						<view style="height: 40rpx;"></view>
					</view>


				</view>
			</view>
			<u-toast ref="uToast" />
		</u-popup> -->
	</view>

</template>

<script>
	export default {
		data() {
			return {
				texts:'点击报名' ,
				value: 0, //商品数量
				addressInfo: {},
				isAddress: false,
				//详情信息
				detailslist: {},
				id: '',
				show: false,
				name: '1',
				// list: [{
				// 		id: 1,
				// 		period: '一课时',
				// 		price: 120,
				// 		style: true
				// 	}
				// ],
				currentBtn: '',
				unitPrice: '', //单价
				totalPrice: '',
				student: [],
				traineeId: '', //学生id

				value: 0,
				columns: [],  //所有学生
				flag: false,
				word: "请选择学生信息",

				//选择学生的id
				usersIds:'',
				
				//课程
				words:'请选择学生课程',
				flags:false,
				columnsts:[], //所有课程
				// selectId:'', //选中的课程
				courseId:'',//课程id
				//学生套餐
				wordse:"请选择学生套餐",
				columnss:[],
				flagse:false, //套餐显示
				selsId:'',
				usert:[],
				
				//学校id
				ids:'',
				
				urlse:'',
				nus:0,
			}
		},
	
			
		onShow() {
			this.getDefaultaddress()
		},

		onLoad(options) {
			console.log(options,'\\\\\\\\\\\\\\\\')
			this.id = options.id
			this.ids = options.ids
			this.urlse = options.urls
			this.nus = options.nums
			// this.courseDetails()
			this.getInfo()
			this.getCourseLists()
			this.btnClick()
		},
		mounted() {
			uni.setStorageSync('BM',[])
			this.getInfo()
		
			
		},
		methods: {
			//点击开启模态框
			btn(){
				this.flag = true
				this.columns = []
				this.getInfo()
				uni.setStorageSync('BM',[])
				this.texts = '点击报名'
			},
			//点击去顶获取学生
			confirms(e){
				this.texts = '点击报名'
				this.usersIds = e.value[0].id
				  this.word = e.value[0].traineeName
				this.flag = false
			},
			//获取所有学生
			async getInfo() {
				let res = await this.http.get('/app/userPersonalCenter/myStudentList');
				if (res.code == 200) {
				this.columns.push(res.data)
				// let arr = []
				// res.data.forEach((item,index) =>{
				// 	if(! arr.includes(item)){
				// 		arr.push(item)
				// 	}
				// })
					
				// 	this.columns = arr
				// 	console.log(this.columns,'666666')
				}

			},
			//选择课程
			// goKc(){
			// 	this.flags = true
			// 	this.columnsts = []
			// 	this.getCourseLists()
			// },
			//选中的课程id
			// selsKc(e){
			// 	this.selectId = e.value[0].courseId
			// 	this.flags = false
			// },
			//套餐
			taocans(){
				
				this.flagse = true
				 this.columnss = []
				this.courseDetails()
			},
			//选中的套餐
			goscdc(e){
				this.flagse = false
				this.selsId = e.value[0].id
				this.wordse = e.value[0].setmealName
			},
			//获取所有套餐
			async getCourseLists(){
				let res = await this.http.get('/app/userHomeNavigation/schoolCourseLists',{
					schoolId:this.id
				});
				if(res.code === 200){
					this.columnsts.push(res.data.data)
				}
			},
			confirm(item) {
				console.log(item);
				this.word = item.value[0].name
				this.flag = false
				this.id = item.value[0].name
			},
			select(a, b) {
				this.currentBtn = a
				this.unitPrice = b
			},
			//获取套餐
			async courseDetails() {
				const res = await this.http.get("/app/userHomeNavigation/muSchoolCourseParticulars", {
					courseId: this.id,
					schoolId:this.ids
				})
				
				this.detailslist = res.data.data
				this.courseId = res.data.data.courseId
				if(this.detailslist.schoolCourseSetmealList === null || this.detailslist.schoolCourseSetmealList.length === 0){
					this.$toast('暂无套餐')
					return
				}
				this.detailslist.schoolCourseSetmealList.forEach((item,index)=>{
					this.columnss.push(item)
				})
				
				this.columnss=[this.columnss]
			},
			//点击报名
			async btnClick() {
				let att = uni.getStorageSync('BM')
				if(att === '报名成功'){
					this.$refs.uToast.show({
						message: '已报名',
					})
					return
				}
				if(this.usersIds === '' || this.usersIds === null){
					this.$refs.uToast.show({
						message: '请选择学生信息',
					})
				}else{
					const res = await this.http.postJson('/app/userPersonalCenter/studentApplyCourse',{
						traineeId:this.usersIds,
						courseId:this.courseId,
						setmealId:this.selsId,
					})
					console.log(res,'报名')
					if(res.code === 200){
						this.$refs.uToast.show({
							message: '报名成功',
						})
						this.texts = '报名成功'
						uni.setStorageSync('BM',this.texts)
					}else{
						this.$refs.uToast.show({
							message: res.msg,
						})
					}
				}
				

			},
			names() {
				if (this.name > 1) {
					this.name--
				} else {
					return
				}
			},

			//立即购买
			purchase(address, shop, storeId) {
				if (this.price == 0) {
					this.$refs.uToast.show({
						message: '请选择课时',
					})
				} else {
					console.log(address, shop, storeId)
					this.postOrder(address, shop, storeId)
				}

			},

			// 领取优惠券
			receives(ids, reduce, zong) {
				this.couponId = ids
				this.titlePrices = reduce
				this.show = false
				if (this.shopInfo.sellPrice * this.value < zong) {
					this.$toast('优惠券不可用');
					this.titlePrices = '0'
				}
			},


			// 点击提交订单
			// submitOrder(address, shop, storeId) {
			// 	this.postOrder(address, shop, storeId)
			// },

			async postOrder(address, shop, storeId) {
				let res = await this.http.postJson('/app/order/save', {
					addressId: address,
					orderType: this.storeType == 1 ? 1 : 3,
					storeId: storeId,
					couponId: this.couponId,
					totalPrice: this.price, //总价
					orderItems: [{
						goodsCount: this.value,
						goodsId: shop,
						// normValueId: this.shopGoodid,
					}]
				});
				// if (res.code == 200) {
				// 	this.$toast(res.msg)
				var totalPrice = this.price
				uni.navigateTo({
					url: '../school-pay-success/school-pay-success?orderId=' + res.data + '&totalPrice=' +
						totalPrice
				})
				// } else {
				// 	this.$toast(res.msg);
				// }
			},

			// 初始化获取默认收货地址
			async getDefaultaddress() {
				let res = await this.http.get('/app/address/default', {});
				if (res.code == 200) {
					if (res.data == null) {
						this.isAddress = false
					} else {
						this.isAddress = true
						this.addressInfo = res.data
						console.log('参数1收获地址', this.addressInfo)
					}
				} else {
					this.$toast(res.msg);
				}
			},
		},
		computed: {
			price() {
				return this.name * this.unitPrice
			}
		}

	}
</script>

<style>
	page {
		background: #f3f0f3;
	}
</style>


<style lang="scss">
	.box-u {
		.stateStyle1 {
			border: 1rpx #4a9aff solid;
		}

		.text {
			padding: 20rpx;
		}

		.box-u1 {
			width: 100%;
			height: 200rpx;
			padding-top: 40rpx;

			img {
				width: 200rpx;
				height: 100rpx;
				border-radius: 10rpx;
				margin-left: 40rpx;
			}

			view {
				display: inline-block;
				color: #fc8555;
				font-size: 24rpx;
				margin: 10rpx;

				text {
					&:nth-child(1) {
						display: inline-block;
						position: relative;
						top: -30rpx;
					}

					&:nth-child(2) {
						display: inline-block;
						position: relative;
						// top: 10rpx;
						right: 145rpx;
					}
				}
			}
		}

		.box-u2 {
			background: #f3f0f3;
			width: 85%;
			margin: auto;
			border-radius: 5rpx;
			// margin: 10rpx 0 20rpx 0;
			margin-top: 40rpx;

			text {
				&:nth-child(1) {
					display: inline-block;
					margin: 5rpx 20rpx;
				}

				&:nth-child(2) {
					float: right;
					display: inline-block;
					color: #fc8555;
					margin: 5rpx 20rpx;
				}
			}
		}

		.box-u3 {
			width: 85%;
			margin: auto;
			border-radius: 5rpx;
			margin-top: 100rpx;

			view {
				display: inline-block;

				&:nth-child(1) {
					padding: 5rpx 45rpx;
					background: #f3f0f3;
					border-radius: 5rpx;
				}

				&:nth-child(3) {
					color: #fc8555;
					font-size: 24rpx;
				}
			}
		}

		.box-u4 {
			width: 85%;
			margin: auto;
			border-radius: 5rpx;
			// margin-top: 20rpx;
			margin-bottom: 40rpx;

			view {

				// display: inline-block;
				&:nth-child(1) {
					display: inline-block;
					// background: #f3f0f3;
					border-radius: 5rpx;
				}

				&:nth-child(2) {
					float: right;
					width: 40rpx;
					height: 40rpx;
					background: #f3f0f3;
					margin: 0 5rpx;
				}

				&:nth-child(3) {
					float: right;
					width: 40rpx;
					height: 40rpx;
					background: #f3f0f3;
					margin: 0 5rpx;
				}

				&:nth-child(4) {
					float: right;
					width: 40rpx;
					height: 40rpx;
					background: #f3f0f3;
					margin: 0 5rpx;
				}
			}
		}
	}

	.box {
		background: #FFF;
		width: 95%;
		margin: auto;
		border-radius: 0 0 30rpx 30rpx;
		padding-bottom: 50px;
	}

	.box-1 {
		width: 95%;
		// height: 380rpx;
		background: #FFF;
		margin: auto;

		.img {
			width: 100%;
			height: 400rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 80rpx;
				margin-top: 40rpx;
			}
		}

		.text-1 {
			margin-top: 70rpx;

			text {
				&:nth-child(1) {
					font-size: 35rpx;
					color: #fc8555;
				}

				&:nth-child(2) {
					color: #fc8555;
				}

				&:nth-child(3) {
					display: inline-block;
					float: right;
					color: #aaa;
					font-size: 24rpx;
				}
			}
		}

		.boxs {
			margin-top: 87px !important;
		}

		.text-2 {
			margin: 40rpx 0 40rpx 0;
			margin-bottom: 30rpx;
			border-bottom: 1rpx solid #f8f8f8;
			// margin-top: 14px;

			text {
				&:nth-child(1) {
					color: #aaa;
					font-size: 26rpx;
				}

				&:nth-child(2) {
					font-size: 30rpx;
					font-weight: 530;
				}
			}
		}
	}

	.footer {
		width: 100vw;
		height: 100rpx;
		// background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;

		.cell {
			width: 100rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;

			text {
				font-size: 24rpx;
				color: #838383;
			}
		}

		.btn {
			margin-bottom: 200rpx;
			width: 50%;
			// height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.str{
		background-color: #3c9cff;
		color: #FFF;
	}
	.strs{
		background-color: #ccc;
		color: #FFF;
	}
	::v-deep .box-1 .img uni-image{
		border-radius: 10px;
	}
</style>
