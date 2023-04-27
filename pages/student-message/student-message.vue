<template>
	<view class="page">
		<view class="view-item">
			<text class="text-label">姓名</text>
			<u--input placeholder="请输入姓名" v-model="traineeName"></u--input>
		</view>
		<view class="view-item">
			<text class="text-label">性别</text>
			<ice-selector :range="sexList" v-model="traineeSex" rangeKey="traineeSex" placeholder="请选择性别">
			</ice-selector>
		</view>
		<view class="view-item">
			<text class="text-label">年龄</text>
			<u--input placeholder="请输入年龄" v-model="traineeAge" type="number"></u--input>
		</view>
		<view class="view-item">
			<text class="text-label">身份证号</text>
			<u--input placeholder="请输入身份证号" v-model="traineeCarId"></u--input>
		</view>

		<view class="view-item" v-if="schoolTypeId==4" @click="$refs.selectAddress.show()">
			<text class="text-label">所在城市</text>

			<u--input placeholder="请选择所在城市" disabled disabledColor="#F6F6F6" v-model="address"></u--input>

		</view>

		<view class="view-item" v-if="schoolTypeId==4">
			<text class="text-label">选择分类</text>
			<ice-selector :range="categoryList" rangeKey="description" v-model="description" placeholder="请选择分类">
			</ice-selector>
		</view>

		<view class="view-item" v-if="schoolTypeId==4">
			<text class="text-label">联系方式</text>
			<u--input placeholder="请输入联系方式" v-model="phone"></u--input>
		</view>

		<view class="view-item" v-if="schoolTypeId!=5 && schoolTypeId!=4">
			<text class="text-label">年级</text>
			<ice-selector :range="gradeList" rangeKey="traineeGrade" v-model="traineeGrade" placeholder="请选择年级">
			</ice-selector>
		</view>

		<view class="view-major" v-if="schoolTypeId==1||schoolTypeId==3">
			<text class="text-label">专业</text>
			<view class="view-list">
				<view class="view-item" :class="major==index?'view-items':''" v-for="(item,index) in majorList"
					@click="majors(index,item.tuitionFee,item.id)">
					<text>{{item.disciplineName}}</text>
					<text>¥{{item.tuitionFee}}</text>
				</view>
			</view>
		</view>
		<button class="button-save" @click="payFees">支付学费</button>
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>

	</view>
</template>

<script>
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'

	export default {
		components: {
			selectAddress
		},
		data() {
			return {
				index: '',
				traineeName: '', //姓名
				categoryList: [], // 选择分类
				description: '', //分类
				traineeSex: '', //性别
				traineeAge: '', //年龄
				traineeCarId: '', //身份证号
				address: '', //所在城市
				phone: '', //联系方式
				id: '', //学校id
				traineeGrade: '', //年级
				Info: [],
				major: null,
				sexList: [{
					id: 1,
					traineeSex: '男'
				}, {
					id: 2,
					traineeSex: '女'
				}, ],
				gradeList: [],
				majorList: [], //课程列表
				payFee: '',
				discipline: '6',
				schoolTypeId: '',
			};
		},
		async onShow() {

			await this.getInfo()
			await this.getCategoryList()
			await this.getMajor()
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			this.schoolTypeId = option.schoolTypeId
			this.getGradeList()
		},
		methods: {
			successSelectAddress(address) { //选择成功回调
				if (address.length == 3) {
					this.address = address[0] + '-' + address[1] + '-' + address[2]

					return
				}
				if (address.length == 2) {
					this.address = address[0] + '-' + address[1]

					return
				}
			},
			payFees() {
				if (!this.traineeName) {
					this.$toast('请输入姓名！')
					return
				}
				if (!this.traineeSex) {
					this.$toast('请选择性别！')
					return
				}
				if (!this.traineeAge) {
					this.$toast('请输入年龄！')
					return
				}
				if (!this.traineeCarId) {
					this.$toast('请输入身份证号！')
					return
				}
				if (!uni.$u.test.idCard(this.traineeCarId)) {
					this.$toast('请输入正确的身份证号！')
					return
				}
				if (!this.traineeGrade) {
					this.$toast('请选择年级！')
					return
				}
				if (this.major == null) {
					this.$toast('请选择专业！')
					return
				}
				uni.navigateTo({
					url: '../course-success/course-success?titalPrice=' + this.payFee + '&schoolId=' + this
						.id +
						'&discipline=' + this.discipline + '&traineeGrade=' + this.traineeGrade + '&phone=' + this
						.phone + '&city=' + this.city + '&category=' + this.description + '&traineeName=' + this
						.traineeName+'&traineeSex='+this.traineeSex+'&traineeAge='+this.traineeAge+'&traineeCarId='+this.traineeCarId
				})
			},
			async getMajor() {
				let res = await this.http.get('/app/userHomeNavigation/tuitionProfessionalList', {
					schoolId: this.id
				});
				console.log(res);
				if (res.code == 200) {
					this.majorList = res.data
				} else {
					this.$toast(res.msg);
				}
			},
			async getInfo() {
				let res = await this.http.get('/app/userPersonalCenter/getStudentInformation', {});
				if (res.code == 200) {
					if (res.data) {
						this.Info = res.data
						this.traineeName = res.data.traineeName
						this.traineeSex = res.data.traineeSex
						this.traineeAge = res.data.traineeAge
						this.traineeCarId = res.data.traineeCarId
						this.traineeGrade = res.data.traineeGrade
					}
				} else {
					this.$toast(res.msg);
				}
			},
			majors(ids, price, val) {
				this.major = ids
				this.payFee = price
				this.discipline = val
			},

			// 查询分类
			async getCategoryList() {
				console.log(this.id);
				let res = await this.http.get('/app/userHomeNavigation/tuitionProfessionalList', {
					schoolId: this.id
				});
				console.log('查询分类:', res);
				if (res.code == 200) {
					this.categoryList = res.data;
				} else {
					this.$toast(res.msg)
				}
			},

			async getGradeList() {
				let res = await this.http.post('/app/userHome/systemConfigurationList', {
					configOptionId: 114,
				});
				if (res.code == 200) {
					for (let item of res.data) {
						this.gradeList.push({
							id: item.id,
							traineeGrade: item.description
						})
					}
				} else {

				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding-top: 30rpx;
	}

	.view-major {
		width: 100%;
		padding: 20rpx 30rpx;

		.view-list {
			width: 100%;

			.view-items {
				background: rgba(74, 154, 255, 0.1) !important;
				border: 1px solid #4A9AFF !important;
				border-radius: 40px;
				color: #4A9AFF !important;
			}

			.view-item {
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

	.button-save {
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
