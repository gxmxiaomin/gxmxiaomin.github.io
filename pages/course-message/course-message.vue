<template>
	<view class="page">
		<view class="view-item">
			<text class="text-label">姓名</text>
			<u--input placeholder="请输入姓名" v-model="traineeName"></u--input>
		</view>
		<view class="view-item">
			<text class="text-label">性别</text>
			<ice-selector :range="sexList" v-model="traineeSex" rangeKey="traineeSex" placeholder="请选择性别"></ice-selector>
		</view>
		<view class="view-item">
			<text class="text-label">年龄</text>
			<u--input placeholder="请输入年龄" v-model="traineeAge" type="number"></u--input>
		</view>
		<view class="view-item">
			<text class="text-label">身份证号</text>
			<u--input placeholder="请输入身份证号" v-model="traineeCarId"></u--input>
		</view>
		<view class="view-item" v-if="schoolTypeId!=5">
			<text class="text-label">年级</text>
			<ice-selector :range="gradeList" rangeKey="traineeGrade" v-model="traineeGrade" placeholder="请选择年级"></ice-selector>
		</view>
		<view class="view-major" v-if="schoolTypeId==1||schoolTypeId==3||schoolTypeId==4">
			<text class="text-label">专业</text>
			<view class="view-list">
				<view class="view-item" :class="major==index?'view-items':''" v-for="(item,index) in majorList" @click="majors(index,item.tuitionFee,item.id)">
					<text>{{item.disciplineName}}</text>
					<text>¥{{item.tuitionFee}}</text>
				</view>
			</view>
		</view>
		<button class="button-save"  @click="payFees">购买课程</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:'',
				traineeName:'',   //姓名
				traineeSex:'',    //性别
				traineeAge:'',   //年龄
				traineeCarId:'',   //身份证号
				id:'',   //学校id
				traineeGrade:'',    //年级
				Info:[],
				major:1,
				sexList: [{
					id: 1,
					traineeSex: '男'
				}, {
					id: 2,
					traineeSex: '女'
				}, ],
				gradeList: [],
				majorList:[],   //课程列表
				payFee:'123',
				discipline:'6',
				schoolTypeId:'',
				list:[],
			};
		},
		async onShow() {
			await this.getInfo()
			await this.getCourse()
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.schoolTypeId = option.schoolTypeId
		},
		methods:{
			payFees(){
				// uni.navigateTo({
				// 	url:'../course-success/course-success?titalPrice='+this.list.courseAmount+'&schoolId='+this.id+'&discipline='+this.discipline+'&traineeGrade='+this.traineeGrade
				// })
				uni.navigateTo({
					url:'../pay-success/pay-success?titalPrice='+this.list.courseAmount+'&id='+this.id+'&discipline='+this.discipline+'&traineeGrade='+this.traineeGrade
				})
			},
			// 商品详情
			async getCourse() {
				let res = await this.http.get("/app/userHomeNavigation/courseInfo", {
					courseId: this.id,
				});
				if (res.code == 200) {
					this.list = res.data;
					this.bannerList = this.strToArray(res.data.courseImg);
				} else {
					this.$toast(res.msg);
				}
			},
			async getInfo(){
				let res=await this.http.get('/app/userPersonalCenter/getStudentInformation',{});
				if(res.code==200){
					if(res.data==null){
						uni.navigateTo({
							url:'../student-info/student-info'
						})
					}
					this.Info = res.data
					this.traineeName = res.data.traineeName
					this.traineeSex = res.data.traineeSex
					this.traineeAge = res.data.traineeAge
					this.traineeCarId = res.data.traineeCarId
					this.traineeGrade = res.data.traineeGrade
					this.getGradeList()
				}else{
					this.$toast(res.msg);
				}
			},
			majors(ids,price,val){
				this.major = ids
				this.payFee = price
				this.discipline = val
			},
			async getGradeList(){
				let res=await this.http.post('/app/userHome/systemConfigurationList',{
					configOptionId:114,
				});
				if(res.code==200){
					for (let item of res.data) {
						this.gradeList.push({id:item.id,traineeGrade:item.description})
					}
				}else{
					
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding-top: 30rpx;
	}
	.view-major{
		width: 100%;
		padding: 20rpx 30rpx;
		.view-list{
			width: 100%;
			.view-items{
				background: rgba(74, 154, 255, 0.1)!important;
				border: 1px solid #4A9AFF!important;
				border-radius: 40px;
				color: #4A9AFF!important;
			}
			.view-item{
				background: rgba(247, 247, 247, 0.1);
				border: 1rpx solid #CCCCCC;
				border-radius: 40rpx;
				margin-top: 30rpx;
				padding: 20rpx 30rpx;
			}
		}
	}
	.view-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 30rpx;
		margin-bottom: 20rpx;
		
		.text-label {
			width: 140rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
		}

		/deep/.u-input {
			background-color: #F6F6F6;

			&.u-border {
				border-color: #F6F6F6 !important;
			}
		}

		/deep/.ice-selector {
			flex-grow: 1;
			flex-shrink: 1;
			height: 80rpx;
			background: #F6F6F6;
			border-radius: 10rpx;
			padding: 0 20rpx;

			.input {
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
	
	.button-save{
		width: 590rpx;
		height: 98rpx;
		line-height: 98rpx;
		margin: auto;
		font-size: 32rpx;
		margin-top: 110rpx;
		background-color: #4A9AFF;
		border-radius: 49rpx;
		color: #FFFFFF;
	}
</style>
