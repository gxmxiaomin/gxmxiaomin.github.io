<template>
	<view class="comp-interest">
		<tabBar color="#000" backgroundColor="#fff" :isFill="true">
			<view class="tab-left" slot='left'>
				<image @click="uni.navigateBack()" class="image-fanhui" src="../../static/images/back.png"></image>
			</view>
			<view class="tab-center" slot="center">
				<text>院系详情</text>
			</view>
			<view class="tab-left" slot='right'>
				<image class="image-fanhui-2" src="../../static/images/homeeducation.png"></image>
			</view>
		</tabBar>

		<view>
			<view class="view-scoll">
				<view class="view-item" v-for="(item,index) in schoolType" @click="tabbar(index,item.configValue)">
					<text class="text-title" :class="show==index?'text-titles':''">{{item.description}}</text>
					<view class="view-line" v-if="show==index"></view>
				</view>
			</view>
		</view>



		<!-- <view style="height: 80rpx;" class='view'></view> -->

		<view class="box">
			<view class="view-box">
				<view class="box-1">
					<text style="font-size: 30rpx;">1<br>班</text>
				</view>
				<view class="box-2">
					<text>60</text><br>
					<text>预收人</text>
				</view>

				<view class="box-2">
					<text>6</text><br>
					<text>现收人</text>
				</view>

				<view class="box-3">
					<text>现收率</text>
					<text>10%</text>
					<view class="jdt">
						<view></view>
					</view>
				</view>
			</view>

			<view class="view-box">
				<view class="box-1">
					<text style="font-size: 30rpx;">2<br>班</text>
				</view>
				<view class="box-2">
					<text>60</text><br>
					<text>预收人</text>
				</view>

				<view class="box-2">
					<text>20</text><br>
					<text>现收人</text>
				</view>

				<view class="box-3">
					<text>现收率</text>
					<text>20%</text>
					<view class="jdt">
						<view></view>
					</view>
				</view>
			</view>

		</view>

		<u-popup :show="show" mode="bottom" @close="close" @open="open">
			<view class="page">
				<view class="tag" @click="shows = true">
					<text class="text-list-item">
						选择专业
					</text>
					<text class="input-text">{{major}}</text>
					<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
				</view>
				<view class="tag" @click="showss = true">
					<text class="text-list-item">
						选择学生
					</text>
					<text class="input-text">{{name}}</text>
					<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
				</view>
				<view class="tag" @click="">
					<text class="text-list-item">

					</text>
					<text @click="uni.navigateTo({url:'../student-info/student-info'})" class="input-text-1">添加学生</text>
					<!-- <image class="img-right" src="../../static/images/arrow_right.png" mode=""></image> -->
				</view>

				<view style="height: 30rpx;"></view>

				<!-- <u-radio-group v-model="value" placement="row">
					<u-radio activeColor="#54a6f9" label="线上缴费"></u-radio>
					<text style="display: inline-block;width: 30rpx;"></text>
					<u-radio activeColor="#54a6f9" label="线下缴费"></u-radio>
				</u-radio-group> -->

				<u-radio-group v-model="radiovalue1" placement="row" @change="groupChange">
					<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist1" :key="index"
						:label="item.name" :name="item.name" @change="radioChange">
					</u-radio>
				</u-radio-group>



				<u-picker @cancel="showss = false" @confirm="confirms" :show="showss" :columns="student"></u-picker>
				<u-picker @cancel="shows = false" @confirm="confirm" :show="shows" :columns="columns"></u-picker>
				<button class="button-saves" @click="baoming">报名</button>
			</view>
		</u-popup>



		<view class="footer">
			<view class="btn" @click="show = true">
				<u-button text="点击报名" type="primary" shape="circle"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import TabBar from '../../components/tabBar/tabBar.vue'
	export default {
		components: {
			TabBar
		},
		data() {
			return {
				// 基本案列数据
				radiolist1: [{
						name: '线上缴费',
						disabled: false
					},
					{
						name: '线下缴费',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '线上缴费',
				value: '',
				name: '', //选择的学生
				student: [], //学生列表
				major: '',
				show: 0,
				columns: [
					['信息工程系', '机电系', '艺术系', '经管系', '体育系']
				],
				schoolType: [{
					configValue: 1,
					description: '信息工程系'
				}, {
					configValue: 2,
					description: '机电系'
				}, {
					configValue: 3,
					description: '艺术系'
				}, {
					configValue: 4,
					description: '经管系'
				}, {
					configValue: 5,
					description: '体育系'
				}, {
					configValue: 6,
					description: '教育系'
				}, ],
				navigation: [],
				val: '',
				show: false,
				shows: false,
				showss: false,
				students: [],
				studentId: []
			}
		},
		onLoad(options) {
			console.log(options)
			this.val = options.id
		},
		onShow() {
			this.grade()
			this.apply()
			this.getInfo()
		},
		methods: {
			baoming() {
				if (this.major == '') {
					this.$toast('请选择专业');
				} else if (this.name == '') {
					this.$toast('请选择报名学生');
				} else {
					console.log(this.val)
					let a = this.students.filter(value => value.name == this.name)
					console.log(a)
					this.studentId = a[0].id
					console.log(this.studentId)
					this.baomingg()
				}
			},
			async baomingg() {
				let res = await this.http.get('/app/muSchoolChildren/addClaToStudentId', {
					id: this.studentId,
					schoolId: this.val,
				});
				console.log('报名')

			},
			groupChange(n) {
				this.value = n
				console.log('groupChange', this.value);
			},
			radioChange(n) {
				this.value = n
				console.log('groupChange', this.value);
			},
			confirm(e) {
				console.log('confirm', e)
				this.major = e.value[0]
				console.log(this.major)
				this.shows = false
			},
			confirms(e) {
				console.log('confirm', e)
				this.name = e.value[0]
				console.log(this.name)
				this.showss = false
			},
			change(e) {
				// console.log('change', e)
			},

			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			async apply() {
				let res = await this.http.get('/app/muUserChildren/selectByUserIdToList');
				console.log(res)
			},

			tabbar(ids, val) {
				this.show = ids
				this.val = val
				this.page = 1
			},
			async grade() {
				// schoolId:this.val
				let res = await this.http.post('/app/schoolMadep/getAllByIdToTeacherName');
				// this.navigation = res.data
				console.log(res)
			},
			async getInfo() {
				let res = await this.http.get('/app/muUserChildren/selectByUserIdToList', {

				});
				console.log(res)
				if (res.code == 200) {
					this.students = res.data
					console.log(this.students)
					if (this.student.length < 1) {
						for (let item of res.data) {
							this.student.push(item.name)
						}
						this.student = [this.student]
					}
					console.log(this.student)
				}
			},
		},
	}
</script>

<style>
	page {
		background: #f3f0f3;
	}
</style>

<style lang="scss" scoped>
	.image-fanhui {
		width: 16rpx;
		height: 28rpx;
	}

	.page {
		height: 600rpx;
		margin: 20rpx 0 0 20rpx;
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
		position: fixed;
		bottom: 0;
		margin-left: 60rpx;
	}

	.tag {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		margin: 0 30rpx;
		border-top: 1rpx #efefef solid;

		.img-right {
			margin-left: 18rpx;
			width: 12rpx;
			height: 20rpx;
		}


		.text-list-item {
			flex-grow: 1;
			flex-shrink: 1;
			font-size: 32rpx;
			color: #666666;

			.img {
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
				margin-right: 10rpx;
			}
		}

		.input-text {
			text-align: right;
			font-size: 32rpx;
			color: #3c88fa;
		}

		.input-text-1 {
			display: inline-block;
			border: 1rpx black solid;
			border-radius: 25rpx;
			padding: 5rpx 10rpx;
			text-align: right;
			font-size: 32rpx;
		}
	}

	.image-fanhui-2 {
		width: 30rpx;
		height: 30rpx;
	}


	.view-scoll {
		position: fixed;
		z-index: 10;
		background-color: #FFFFFF;
		width: 100%;
		display: flex;
		overflow-x: auto;
		border-bottom: 15rpx solid #F7F7F7;
		height: 88rpx;
		// margin-top: 130rpx;

		.view-item {
			padding: 0 30rpx;

			.text-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
			}

			.text-titles {
				color: #4A9AFF !important;
			}

			.view-line {
				display: block;
				margin: 0 auto;
				width: 40rpx;
				height: 8rpx;
				margin-top: 10rpx;
				background: #4A9AFF;
				border-radius: 4rpx;
			}
		}
	}


	.image-fanhui {
		width: 16rpx;
		height: 28rpx;
	}

	.box {
		// background: #f9f8f9;
		width: 100%;
		display: flex;
		// justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 80rpx;
	}

	.box :nth-child(even) {
		.box-1 {
			background: #59c185;
		}

		.box-3 {
			.jdt {
				view {
					background: #59c185;
				}
			}
		}

	}

	.view-box {
		background: #FFF;
		margin: 10rpx 0 10rpx 30rpx;
		width: 44%;
		height: 220rpx;
		border-radius: 20rpx;
		border: 1rpx solid #8daec8;

		.box-1 {
			background: #4d9afe;
			text-align: center;
			width: 100rpx;
			height: 100rpx;
			margin: 10rpx;
			display: inline-block;
			border-radius: 50%;

			text {
				color: #FFF;
			}
		}

		.box-2 {
			display: inline-block;
			// border: 1rpx solid black;
			width: 90rpx;
			text-align: center;

			text {
				display: inline-block;

				&:nth-child(1) {
					position: relative;
					// top: 10rpx;
				}

				&:nth-child(3) {
					color: #b1b0b2;
					position: relative;
					bottom: 10rpx;
					font-size: 24rpx;
				}


			}
		}

		.box-3 {
			// border: 1rpx solid black;
			width: 95%;
			height: 80rpx;
			margin: auto;
			// margin-top: 30rpx;

			text {
				font-size: 24rpx;

				&:nth-child(1) {
					color: #b1b0b2;
				}

				&:nth-child(2) {
					display: inline-block;
					width: 70%;
					// margin-left: 160rpx; 
					text-align: right;
				}
			}

			.jdt {
				width: 95%;
				height: 20rpx;
				// border: 1rpx solid black;
				background: #eeeeef;
				border-radius: 20rpx;
				// margin-top: 10rpx;

				view {
					background: #4d9afe;
					width: 66%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
		}
	}

	.footer {
		width: 100vw;
		height: 100rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;

		.btn {
			margin-right: 30rpx;
			margin-top: 20rpx;
			width: 90%;
			height: 60%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
