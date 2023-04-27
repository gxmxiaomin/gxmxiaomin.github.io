<template>
	<view>
		<view class="gaojias">
			你觉得这个稿件有什么问题？
		</view>
		<u-radio-group v-model="value" placement="column" @change="changes">
			<u-radio v-for="(item, index) in radiolist1" shape="circle" :label="item.name" :name="item.name"></u-radio>
		</u-radio-group>
		<view class="tis">
			为了帮助审核人员更快处理,请补充来源的详细信息
		</view>
		<u--textarea v-model="value1" placeholder="多行文本框限300" maxlength="300"></u--textarea>
		<view class="btn">
			<u-button type="error" @click="sunbers" text="确定"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				value1: '',
				ids: '', //该文章id
				radiolist1: [{
						name: '违法违禁',
					},
					{
						name: '低俗',
					},
					{
						name: '赌博诈骗',
					},
					{
						name: '人身攻击',
					},
					{
						name: '不良封面/标题',
					},
					{
						name: '虚假不实信息',
					},
					{
						name: '有其他问题',
					}
				],

			};
		},
		onLoad(opens) {
			this.ids = opens.ids
		},
		mounted() {
			this.value = ''

		},
		methods: {
			changes() {
				console.log(this.value, '555')
			},
			//提交
			async sunbers() {
				if (this.value1 === "") {
					uni.showToast({
					    title: '请输入举报内容',
					    duration: 1000
					});
					return

				}
				const res = await this.http.post('/app/forum/home/dislikeInvitation', {
					talkId: this.ids
				})
				if(res.code === 200){
					uni.showToast({
					    title: '举报成功',
					    duration: 500
					});
					setTimeout(function(){
						    		uni.switchTab({
						    			url:'/pages/information/information'
						    		})
						       },1000)
						
				}
				

			}
		}
	}
</script>

<style lang="scss" scoped>
	.gaojias {
		width: 100%;
		height: 30px;
		// line-height: 30rpx;
		border-bottom: 1px solid #ccc;
		padding-left: 20px;
	}

	::v-deep .u-radio {
		margin: 15px 20px;
	}

	::v-deep .u-radio__text {
		font-weight: 580;
	}

	.tis {
		font-size: 10px;
		color: #a9a9a9;
		margin-left: 20px;
		margin-top: 15px;
	}

	.btn {
		width: 300px;
		margin: 115px auto;
	}

	::v-deep .uni-textarea-wrapper {
		width: 330px;
		height: 100px;
		background-color: #f4f4f4;
		margin-left: 10px;
		margin-top: 10px;

	}
</style>
