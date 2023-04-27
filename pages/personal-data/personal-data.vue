<template>
	<view class="content">
		<view class="view-list">
			
			<view class="view-list-itemImg">
				<!-- <text class="text-list-item">头像</text>
			
				<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image> -->
			
				<view class="imgTop">
					<image :src="personInfo.headUrl" mode="" @click="changeUserHeader"></image>
				</view>
				<!-- <view class="imgbot">
					ID: {{userInfo.phoneNum}}
				</view> -->
			</view>

			<!-- <view class="view-list-item">
				<text class="text-list-item">头像</text>
				<image class="img-avatar" :src="personInfo.headUrl" mode="" @click="chooseImage"></image>
				<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
			</view> -->
			
			<!-- <view class="view-item">
				<text class="text-label">头像</text>
				<view class="flex-grow">
				</view>
				<image :src="personInfo.headUrl" class="image-check" @click="skip"></image>
				<image src="../../static/images/arrow_right.png" class="image-arrow"></image>
			</view> -->

			<!-- <view class="view-list-item">
				<text class="text-list-item">账号</text>
				<text class="text-value">{{personInfo.userName}}</text>
			</view> -->

			<view class="view-list-item" @click="uni.navigateTo({url:'./redact-name'})">
				<text class="text-list-item">昵称</text>
				<!-- <input class="input-text" type="text" v-model="nickname" placeholder="请输入名称" /> -->
				<text class="input-text">{{nickname}}</text>
				<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
			</view>
			
			<view class="view-list-item">
				<text class="text-list-item">性别</text>
				<view class="view-select-sex">
					<ice-selector class="selector" v-model="sex" :range="sexList" rangeKey="traineeSex"
						placeholder="请选择性别" placeholder-class="selects"></ice-selector>
					<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
				</view>
			</view>
			
			<view class="view-list-item" @click="uni.navigateTo({url:'./redact-birthday'})">
				<text class="text-list-item">生日</text>
				<!-- <input class="input-text" type="text" v-model="age" placeholder="请输入生日" /> -->
				<text class="input-text">{{birthday}} {{constellation}}</text>
				<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
			</view>
			
			<!-- <view class="view-list-item">
				<text class="text-list-item">归属地</text>
				<input class="input-text" type="text" v-model="age" placeholder="" />
			</view> -->
			<view class="view-list-item">
				<text class="text-list-item">归属地</text>
				<view class="view-input" @click="$refs.selectAddress.show()">
					<text class="address-info" v-if="address">{{address}}</text>
					<text class="address-info-placeholder" v-else>请选择所在地区</text>
					<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
				</view>
			</view>
			
			

			<view class="view-list-item" @click="uni.navigateTo({url:'./redact-introduce'})">
				<text class="text-list-item">简介</text>
				<input class="input-text" type="text" v-model="personalitySignature" placeholder="请输入个人签名" />
			</view>
			
			<view class="view-list-item">
				<text class="text-list-item">背景图</text>
				<image class="img-right-big" :src="backgroundImg" mode=""></image>
			</view>
			
			<view class="view-list-item">
				<text class="text-list-item">学校</text>
				<input class="input-text" type="text" v-model="school" placeholder="填写学校,发现校友" />
			</view>
			
			<view class="view-list-item">
				<text class="text-list-item">公司</text>
				<input class="input-text" type="text" v-model="company" placeholder="填写公司,发现同事" />
			</view>
			
			<view class="view-list-item">
				<text class="text-list-item">注册时间</text>
				<text class="input-text">{{createTime}}</text>
			</view>
			



			<!-- <view class="view-list-item">
				<text class="text-list-item">城市</text>
				<view class="view-input" @click="$refs.selectAddress.show()">
					<text class="address-info" v-if="address">{{address}}</text>
					<text class="address-info-placeholder" v-else>请选择所在地区</text>
					<image class="img-right" src="../../static/images/arrow_right.png" mode=""></image>
				</view>
			</view> -->

			

		</view>
		<button class="button-save" @click="submitInfo(personInfo.id)">保存</button>

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
				constellation:'',//星座
				birthday:'',//生日
				company:'', //公司
				backgroundImg:'',//背景图
				createTime:'', //注册时间
				nickname: '', //昵称
				personalitySignature: '', //个人简介
				sex: '', // 性别
				age: '', // 年龄
				address: '', // 城市
				school: '', // 学校
				// province: '', // 省
				// city: '', // 市
				// area: '', // 区
				deletable: false,
				personInfo: {}, //用户信息
				sexList: [{
					id: 1,
					traineeSex: '男'
				}, {
					id: 2,
					traineeSex: '女'
				}, ],
			}
		},
		onShow() {
			this.getUserInfo();
			this.queryUserInfo()
			// let that = this
			// uni.$on('updateData', function(data) {
			// 	console.log(data.value)
			// 	that.nickname = data.value
			// })
		},
		methods: {
			changeUserHeader() { //改变用户头像
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera '],
					crop:{
						quality: 100,
						width:375,
						height:375
					},
					success: async res => {
						console.log(JSON.stringify(res.tempFilePaths));
						const data = await this.http.upload(res.tempFilePaths[0])
						console.log("上传图片的结果为", data)
						this.personInfo.headUrl = data.data
						uni.setStorageSync('img',this.personInfo.headUrl)
					}
				})
				console.log(this.personInfo.headUrl)
			},
			skip(){
				console.log(99999999,this.personInfo.headUrl)
				uni.navigateTo({
					url:'../check-picture/check-picture?id='+this.personInfo.headUrl
				})
				// this.chooseImage();
			},
			//修改背景图的
			async queryUserInfo() {
				let res = await this.http.get('/app/forum/user/forumUserInfo', {
					userId: this.id,
				});
				console.log('查询用户信息:', res);
				if (res.code == 200) {
					this.backgroundImg = res.data.user.backgroundImg;
				} else {
					// this.$toast(res.msg);
				}
				// this.backgroundImg = uni.getStorageSync('backgroundImg')
			},
			async getUserInfo() {
				let res = await this.http.get('/app/userInfo/getInfo', {});
				console.log('用户信息', res);
				if (res.code == 200) {
					this.constellation = res.data.constellation
					this.birthday = res.data.birthday
					this.personInfo = res.data
					this.nickname = res.data.nickName
					this.personalitySignature = res.data.personalitySignature
					this.sex = res.data.userSex
					this.age = res.data.age
					this.school = res.data.schoolName
					this.createTime = res.data.createTime
					this.company = res.data.company
					if (res.data.province) {
						this.address = res.data.province + '-' + res.data.city + '-' + res.data.area
					} else {
						this.address = res.data.city + '-' + res.data.area
					}
					console.log(this.address);

				} else {
					// this.$toast(res.msg);
				}
			},

			// 修改用户信息
			async submitInfo(ids) {
				console.log(this.address);
				let arr = this.address.split('-')
				console.log(arr);
				let province = '';
				let city = '';
				let area = '';
				if (arr.length == 3) {
					province = arr[0]
					city = arr[1]
					area = arr[2]
				}else{
					city = arr[0]
					area = arr[1]
				}
				let res = await this.http.postJson('/app/userInfo/editInfo', {
					id: ids,
					headUrl: this.personInfo.headUrl,
					nickName: this.nickname,
					personalitySignature: this.personalitySignature,
					userSex: this.sex,
					age: this.age,
					province: province,
					city: city,
					area: area,
					schoolName: this.school,
					company:this.company
				});
				if (res.code == 200) {
					let userinfo = uni.getStorageSync('userInfo')
					userinfo.headUrl = this.personInfo.headUrl
					uni.setStorageSync('userInfo', userinfo)
					this.$toast(res.msg);
					setTimeout(() => {
						uni.navigateBack({})
					}, 500)
				} else {
					this.$toast(res.msg);
				}
			},

			successSelectAddress(address) { //选择成功回调
				console.log(address);
				if (address.length == 3) {
					this.address = address[0] + '-' + address[1] + '-' + address[2]
					return
				}
				if (address.length == 2) {
					this.address = address[0] + '-' + address[1]
					return
				}
			},

			async chooseImage() {
				console.log(this.personInfo.headUrl)
				uni.chooseImage({
					// count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					crop: {
						width: '300px',
						height: '300px',
					},
					success: async (result) => {
						console.log(result);
						let res = await this.http.upload(result.tempFilePaths[0]);
						console.log("头像", res)
						if (res.code == 200) {
							this.personInfo.headUrl = res.data;
							console.log("回显-头像", this.personInfo.headUrl)
						} else {
							this.$toast(res.msg);
						}

					},
				})
			},
		}
	}
</script>

<style lang="scss">
	.image-check {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	.view-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 30rpx;
	
		.text-label {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
		}
	
		.text-value {
			font-size: 32rpx;
			font-weight: 400;
			color: #333333;
			margin-right: 20rpx;
		}
	
		.image-arrow {
			width: 12rpx;
			height: 20rpx;
		}
	}
	page {
		background-color: #FFFFFF;
	}

	/deep/.uni-input-input {
		text-align: right;
	}

	/deep/.u-upload__wrap__preview__other {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	/deep/.u-upload__deletable {
		display: none;
	}

	.content {
		background-color: #FFFFFF;
	}

	.selects {
		text-align: right;
	}

	.view-list {
		display: flex;
		flex-direction: column;
		
		.view-list-itemImg {
			display: flex;
			flex-direction: column;
		
			.imgTop {
				position: relative;
				margin: auto;
				background-color: #eee;
				width: 170rpx;
				height: 170rpx;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
		
				.big {
					width: 170rpx;
					height: 170rpx;
				}
		
				.small {
					width: 51rpx;
					height: 51rpx;
					position: absolute;
					top: 127rpx;
					left: 107rpx;
				}
			}
		
			.imgbot {
				width: 240rpx;
				height: 50rpx;
				margin: auto;
				border: 1rpx solid #8C8C8C;
				border-radius: 22rpx;
				font-size: 26rpx;
				color: #8C8C8C;
				font-family: PingFang-SC-Medium;
				text-align: center;
				line-height: 50rpx;
				margin-top: 25rpx;
			}
		}
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

	.button-save {
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 590rpx;
		height: 98rpx;
		line-height: 98rpx;
		margin: auto;
		font-size: 32rpx;
		margin-top: 557rpx;
		background-color: #4A9AFF;
		border-radius: 49rpx;
		color: #FFFFFF;
	}
</style>