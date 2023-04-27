<template>
	<view>
		<!-- <tabBers>
			<template v-slot:left>
				<view>
					<image @click="uni.navigateBack({delta:1})" style="width: 10px;height: 13px;"
						src="../../static/images/back.png" mode=""></image>
				</view>
			</template>
			<template v-slot:center>
				<view>学生资料</view>
			</template>
			<template v-slot:right>
				<view >{{delseg}}</view>
			</template>
		</tabBers> -->
		<u-collapse v-if="student.length != 0" @change="change" @close="close"  @open="open">
			<u-collapse-item  v-for="item in student" :name="item" :title="item.traineeName">
				<view slot="title" >
					<text style="display: inline-block;width: 30px;" v-if="shworrr">
						<u-checkbox-group  placement="column" @change="checkboxChange(item)">
							<u-checkbox :customStyle="{marginBottom: '8px'}"  >
							</u-checkbox>
						</u-checkbox-group>
					</text>
					<text>{{item.traineeName}}</text>
				</view>

				<text class="u-collapse-content">


					<view class="view-list-item">
						<text class="text-list-item">学生姓名</text>
						<text class="input-text">{{item.traineeName}}</text>
					</view>
					<view class="view-list-item">
						<text class="text-list-item">性别</text>
						<text
							class="input-text">{{item.traineeSex === 1 ? '男' : item.traineeSex === 2 ? '女' : ''}}</text>
					</view>
					<view class="view-list-item">
						<text class="text-list-item">年龄</text>
						<text class="input-text">{{item.traineeAge}}</text>
					</view>
					<view class="view-list-item">
						<text class="text-list-item">身份证号</text>
						<text class="input-text">{{item.traineeCarId}}</text>
					</view>
					<view class="view-list-item">
						<text class="text-list-item">学生手机号</text>
						<text class="input-text">{{item.traineeContactInfo}}</text>
					</view>
					<view class="view-list-item">
						<text class="text-list-item">家长姓名</text>
						<text class="input-text">{{item.parentName}}</text>
					</view>
					<view class="view-list-item">
						<text class="text-list-item">家长手机号</text>
						<text class="input-text">{{item.contactInfo}}</text>
					</view>
					<view class="view-list-item">
						<text class="text-list-item">与该生关系</text>
						<text class="input-text">{{item.parentRelation}}</text>
					</view>
					<view class="view-list-item">
						<text class="text-list-item">常住地址</text>
						<text class="input-text">{{item.traineeAddress}}</text>
					</view>
					<view class="view-list-item">
					<u-button style="border-radius: 10px;" @click="ddels(item)" type="error"  text="删除学生"></u-button>
					</view>
						
				</text>
			</u-collapse-item>
		</u-collapse>

		<view v-else class="none">
			暂无学生信息
		</view>
		<u-popup :show="show" mode="bottom" @close="close" @open="open">
			<view class="page">
				<view class="view-item">
					<text class="text-label">学生姓名</text>
					<u--input placeholder="请输入学生姓名" v-model="name"></u--input>
				</view>
				<view class="view-item">
					<text class="text-label">性别</text>
					<ice-selector :range="sexList" v-model="sex" rangeKey="traineeSex" placeholder="请选择性别">
					</ice-selector>
					<image src="../../static/images/Informationservice9.png"></image>
				</view>
				<view class="view-item">
					<text class="text-label">年龄</text>
					<u--input placeholder="请输入年龄" v-model="age" type="number"></u--input>
				</view>
				<view class="view-item">
					<text class="text-label">身份证号</text>
					<u--input placeholder="请输入身份证号" v-model="identity"></u--input>
				</view>
				<view class="view-item">
					<text class="text-label">学生手机号</text>
					<u--input placeholder="请输入学生手机号" v-model="childrenPhone"></u--input>
				</view>
				<view class="view-item">
					<text class="text-label">家长姓名</text>
					<u--input placeholder="请输入家长姓名" v-model="parentName"></u--input>
				</view>
				<view class="view-item">
					<text class="text-label">家长手机号</text>
					<u--input placeholder="请输入家长手机号" v-model="parentPhone"></u--input>
				</view>
				<view class="view-item">
					<text class="text-label">与该学生关系</text>
					<u--input placeholder="与该学生关系" v-model="relationship"></u--input>
				</view>
				<view class="view-item">
					<text class="text-label">常住地址</text>
					<u--input placeholder="常住地址" v-model="address"></u--input>
				</view>
				<!-- <view class="view-item">
					<text class="text-label">年级</text>
					<ice-selector :range="gradeList" v-model="traineeGrade" rangeKey="traineeGrade" placeholder="请选择年级">
					</ice-selector>
					<image src="../../static/images/Informationservice9.png"></image>
				</view> -->
				<button class="button-saves" @click="submit">保存</button>
			</view>
		</u-popup>

		<view style="height: 100rpx;"></view>
		<button class="button-save" @click="Adddels">{{Cousers}}</button>

	</view>
</template>

<script>
	import tabBers from "@/components/tabBar/tabBar.vue"
	export default {
		data() {
			return {
				delseg:'删除',
				uerid:0,
				shworrr:false, //控制删除框显示
				liteegs:[], //选中的
				Cousers: '添加学生',
				student: [], // 学生资料
				title: '111',
				childrenPhone: '', //学生手机号
				parentName: '', //家长姓名
				parentPhone: '', //家长手机号
				relationship: '', //与该学生关系
				address: '', //常住地址
				show: false,
				id: '',
				name: '', //姓名
				sex: '', //性别
				age: '', //年龄
				identity: '', //身份证号
				traineeGrade: '', //年级
				// sexList: '', //性别
				sexList: [{
					id: 1,
					traineeSex: '男'
				}, {
					id: 2,
					traineeSex: '女'
				}, ],
				gradeList: [],

				lise: {}, //编辑所有数据

				options1: [{
					text: '删除'
				}],
			};
		},
		components: {
			tabBers,
		},
		onShow() {

		},
		onLoad(option) {
			this.delseg = '删除'
			console.log(option)
		},
		async mounted() {
			this.getInfo()
			this.getGradeList()
		},
		methods: {
			//选中的
			checkboxChange(n) {
				this.uerid = n.id
				// this.liteegs.push(n)
				// let arre = []
				// this.liteegs.forEach(val =>{
				// 	if(arre.indexOf(val) === -1){
				// 		arre.push(val.id)
				// 	}
				// })
		
				console.log(n.id,'change', this.uerid);
			},
			//确定删除
			// dels(){
			// 	// this.shw = true
			// 	if(this.delseg === '删除'){
			// 		this.shworrr = true
			// 		this.delseg = '确定'
					
			// 	}else if(this.delseg === '确定'){
			// 		this.ddels()
			// 		this.delseg = '删除'
			// 		this.shworrr = false
			// 	}
			// },
			//删除
			 ddels(ite){
				 let then = this
				uni.showModal({
					title: '提示',
					content: '亲，确定是否需要删除该数据？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							then.getfsv(ite)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async getfsv(ite){
				console.log(ite,'55555')
				const res = await this.http.post('/app/schoolTrainee/deleteTrainee',{
					studentId:ite.id
				})
				console.log(res,'99999999999999')
				if(res.code === 200){
					
					this.shworrr = false
					this.getInfo()
					this.$toast(res.msg);
					this.Cousers = '添加学生'
				}else{
					this.$toast(res.msg);
				}
			},
			change(e) {
				e.forEach(item => {

					if (item.status === 'open') {
						this.lise = item.name
						console.log('change', this.lise,'李莉莉')
					}
				})
			},
			//展开列表
			open(e) {
				console.log('111')
				this.Cousers = '编辑学生'

			},
			//隐藏列表
			close() {
				this.show = false
				this.Cousers = '添加学生'
				// this.lise = {}
			},
			//展示编辑或添加模态框
			Adddels() {
				if (this.Cousers === '添加学生') {
					this.show = true
					this.name = ''
					this.sex = ''
					this.age = ''
					this.identity = ''
					this.childrenPhone = ''
					this.parentName = ''
					this.parentPhone = ''
					this.relationship = ''
					this.address = ''
				} else if (this.Cousers === '编辑学生') {
					this.show = true
					// this.emitst()
					console.log(this.lise, '编辑')
					this.name = this.lise.traineeName
					this.sex = this.lise.traineeSex
					this.age = this.lise.traineeAge
					this.identity = this.lise.traineeCarId
					this.childrenPhone = this.lise.traineeContactInfo
					this.parentName = this.lise.parentName
					this.parentPhone = this.lise.contactInfo
					this.relationship = this.lise.parentRelation
					this.address = this.lise.traineeAddress
					this.id = this.lise.id
				}
			},
			submit() {
				if (this.Cousers === '添加学生') {
					this.submitInfo()
				} else if (this.Cousers === '编辑学生') {
					this.emitst()
				}
			},
			//编辑
			async emitst() {
				let res = await this.http.postJson('/app/schoolTrainee/editTrainee', {
					id: this.id,
					traineeName: this.name, //学生姓名
					traineeSex: this.sex, //性别
					traineeAge: this.age, //年两
					traineeCarId: this.identity, //身份证
					traineeContactInfo: this.childrenPhone, //学生手机号
					parentName: this.parentName, //家长姓名
					contactInfo: this.parentPhone, //家长手机号
					parentRelation: this.relationship, //与学生关系
					traineeAddress: this.address, //常住地址
					courseId: 0
				});
				if (res.code == 200) {
					console.log(res)
					this.$toast(res.msg);

					this.show = false
					this.getInfo()
				} else {
					this.$toast(res.msg);
				}
			},
			// 初始化获取用户信息/app/userPersonalCenter/getStudentInformation  列表
			async getInfo() {
				let res = await this.http.get('/app/userPersonalCenter/myStudentList');
				if (res.code == 200) {
					this.student = res.data
				}else{
					this.$toast(res.code);
				}
			},
			// 添加保存学生信息
			async submitInfo() {
				if (!this.name) {
					this.$toast('请输入学生姓名');
					return;
				}
				if (!this.sex) {
					this.$toast('请选择学生性别');
					return;
				}
				if (!this.age) {
					this.$toast('请输入年龄');
					return;
				}
				if (!this.identity) {
					this.$toast('请输入学生身份证号');
					return;
				}
				if (!uni.$u.test.idCard(this.identity)) {
					this.$toast('身份证号格式不正确！')
					return
				}

				if (this.parentPhone.length != 11) {
					this.$toast('家长手机号格式不正确！')
					return
				}
				let res = await this.http.postJson('/app/schoolTrainee/addTrainee', {
					// userId: this.id,
					traineeName: this.name, //学生姓名
					traineeSex: this.sex, //性别
					traineeAge: this.age, //年两
					traineeCarId: this.identity, //身份证
					traineeContactInfo: this.childrenPhone, //学生手机号
					parentName: this.parentName, //家长姓名
					contactInfo: this.parentPhone, //家长手机号
					parentRelation: this.relationship, //与学生关系
					traineeAddress: this.address, //常住地址
					courseId: 0
					// traineeGrade: this.traineeGrade,
				});
				if (res.code == 200) {
					console.log(res)
					this.$toast(res.msg);
					// setTimeout(function() {
					// 	uni.switchTab({
					// 		url: '../mine/mine'
					// 	})
					// }, 500)
					this.show = false
					this.getInfo()
				} else {
					this.$toast(res.msg);
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

	.none {
		color: #aaa;
		font-size: 40rpx;
		text-align: center;
		margin-top: 50rpx;
	}

	.view-list-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		margin: 0 30rpx;

		.view-select-sex {
			display: flex;
			align-items: center;

			/deep/.input-placeholder {
				font-size: 32rpx;
				color: grey;
			}

			/deep/input {
				color: #333333;
				font-size: 32rpx;
			}

			.selector {
				text-align: right;
			}
		}

		.img-avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}

		.img-right {
			margin-left: 18rpx;
			width: 12rpx;
			height: 20rpx;
		}

		.img-right-big {
			margin-left: 18rpx;
			width: 160rpx;
			height: 100rpx;
		}

		.text-list-item {
			flex-grow: 1;
			flex-shrink: 1;
			font-size: 32rpx;
			color: #666666;

			.img {
				width: 80rpx;
				height: 40rpx;
			}
		}

		.address-info-placeholder {
			font-size: 32rpx;
			color: grey;
		}

		.text-value {
			font-size: 32rpx;
			color: #333333;
		}

		.input-text {
			text-align: right;
			font-size: 32rpx;
			color: #333333;
		}
	}

	.view-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 30rpx;
		margin-bottom: 20rpx;
		position: relative;

		image {
			position: absolute;
			right: 75rpx;
			width: 20rpx;
			height: 15rpx;
		}

		.text-label {
			width: 200rpx;
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

	.button-saves {
		width: 590rpx;
		height: 98rpx;
		margin: auto;
		line-height: 98rpx;
		font-size: 32rpx;
		background-color: #4A9AFF;
		border-radius: 49rpx;
		color: #FFFFFF;
		font-weight: 400;
	}

	.button-save {
		width: 590rpx;
		height: 98rpx;
		line-height: 98rpx;
		font-size: 32rpx;
		background-color: #4A9AFF;
		border-radius: 49rpx;
		color: #FFFFFF;
		font-weight: 400;
		position: fixed;
		bottom: 0;
		left: 85rpx;
	}
	::v-deep .u-cell__body{
		padding: 10px 35px;
	}
	::v-deep .u-checkbox-label--left{
		margin-bottom: 0px;
	}
	// ::v-deep .u-cell{
	// 	height: 40px;
	// 	line-height: 30px;
	// }
</style>